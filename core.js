/* Shared behavior: i18n, theme, rendering, counters, reveal-on-scroll, filters, nav.
   No dependencies. Each site sets data-site / data-default-theme on <html>
   and optional window.SITE_OPTS before this script runs. */
(function () {
  "use strict";
  var R = window.RESUME, T = window.I18N;
  var root = document.documentElement;
  var OPTS = Object.assign({ bullets: 3, tags: "names" }, window.SITE_OPTS || {});
  var SITE = root.getAttribute("data-site") || "resume";
  var mq = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : { matches: false };
  var reduced = function () { return mq.matches; };

  var store = {
    get: function (k) { try { return localStorage.getItem(SITE + ":" + k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(SITE + ":" + k, v); } catch (e) {} }
  };
  var params = new URLSearchParams(location.search);

  // English by default on first visit (browser language is ignored);
  // a visitor's explicit choice is remembered, and ?lang=es still works for sharing.
  var lang = params.get("lang") || store.get("lang") || "en";
  if (lang !== "es") lang = "en";
  var theme = params.get("theme") || store.get("theme") || root.getAttribute("data-default-theme") || "dark";
  if (theme !== "light") theme = "dark";

  var state = { counted: {}, expanded: {}, revealed: {}, cat: "all" };

  function t(key) {
    var v = (T[lang] && T[lang][key]);
    if (v == null) v = T.en[key];
    return v == null ? key : v;
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  var skillById = {};
  R.skills.forEach(function (s) { skillById[s.id] = s; });

  var ICONS = {
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M10 8.5v7l5.5-3.5z" fill="currentColor"/></svg>',
    trace: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="6" r="2.2" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="19" cy="6" r="2.2" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="12" cy="18" r="2.2" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M7 7l4 9M17 7l-4 9M7.2 6h9.6" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>',
    app: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4.5" width="18" height="15" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M3 9h18M7 13h6M7 16h4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>',
    cert: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="9" r="5.5" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8.5 13.5L7 21l5-2.5 5 2.5-1.5-7.5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>',
    degree: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 9L12 4.5 21.5 9 12 13.5z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M6.5 11v5c1.5 1.5 3.5 2.2 5.5 2.2s4-.7 5.5-2.2v-5M21.5 9v5" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>',
    lang: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M2.5 12h19M12 2.5c2.6 2.8 3.8 6 3.8 9.5s-1.2 6.7-3.8 9.5c-2.6-2.8-3.8-6-3.8-9.5S9.4 5.3 12 2.5z" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>'
  };

  /* ---------- Renderers ---------- */
  var renderers = {
    stats: function (el) {
      el.innerHTML = R.stats.map(function (s, i) {
        var final = s.prefix + s.value + s.suffix;
        var shown = state.counted[s.id] || reduced() ? final : (s.prefix ? "0–0" : "0" + s.suffix);
        return '<li class="stat reveal" style="--i:' + i + '" data-stat="' + s.id + '">' +
          '<p class="stat-num"><span class="sr-only">' + esc(final) + '</span>' +
          '<span class="stat-val" aria-hidden="true" data-count="' + s.value + '" data-lo="' + (s.prefix ? parseInt(s.prefix, 10) : "") +
          '" data-suffix="' + esc(s.suffix) + '" data-id="' + s.id + '">' + esc(shown) + '</span></p>' +
          '<p class="stat-label">' + esc(t("stats." + s.id)) + '</p></li>';
      }).join("");
    },
    experience: function (el) {
      el.innerHTML = R.experience.map(function (x, i) {
        var b = x.bullets[lang], n = OPTS.bullets;
        var first = b.slice(0, n), rest = b.slice(n);
        var open = !!state.expanded[x.id];
        var org = x.url
          ? '<a href="' + x.url + '" target="_blank" rel="noopener">' + esc(x.org) + '<span class="sr-only"> ' + esc(t("ui.opensNew")) + '</span></a>'
          : esc(x.org);
        var tags = "";
        if (OPTS.tags === "chips" && x.chips) {
          tags = '<ul class="tl-chips" aria-label="' + esc(t("ui.chips")) + '">' + x.chips.slice(0, 5).map(function (c) {
            return "<li>" + esc(skillById[c] ? skillById[c][lang] : c) + "</li>";
          }).join("") + "</ul>";
        } else if (OPTS.tags !== "none" && OPTS.tags !== "chips") {
          tags = '<ul class="tl-tags" aria-label="' + esc(t("ui.relatedSkills")) + '">' + x.traces.map(function (id) {
            var s = skillById[id];
            return OPTS.tags === "ids"
              ? '<li data-skill="' + id + '" title="' + esc(s[lang]) + '"><span aria-hidden="true">' + id + '</span><span class="sr-only">' + esc(s[lang]) + '</span></li>'
              : '<li data-skill="' + id + '">' + esc(s[lang]) + '</li>';
          }).join("") + "</ul>";
        }
        return '<li class="tl-item reveal' + (x.url ? " tl-featured" : "") + (state.revealed[x.id] ? " in" : "") + '" style="--i:' + i + '" data-exp="' + x.id + '" data-reveal-id="' + x.id + '">' +
          '<span class="tl-node" aria-hidden="true"></span>' +
          '<article class="tl-card" aria-labelledby="' + x.id + '-role">' +
          '<p class="tl-meta"><span class="tl-id">' + x.id + '</span><span class="tl-dates">' + esc(x.dates[lang]) + '</span>' + (x.url ? '<a class="tl-badge" href="#bookroom">★ ' + esc(t("tl.featured")) + "</a>" : "") + '</p>' +
          '<h3 class="tl-role" id="' + x.id + '-role">' + esc(x.role[lang]) + '</h3>' +
          '<p class="tl-org"><span class="tl-company">' + org + '</span><span class="tl-place">' + esc(x.place[lang]) + '</span></p>' +
          '<ul class="tl-bullets">' + first.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul>" +
          (rest.length ? '<div class="tl-more" id="' + x.id + '-more"' + (open ? "" : " hidden") + '><ul class="tl-bullets">' +
            rest.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul></div>" +
            '<button type="button" class="tl-toggle" aria-expanded="' + open + '" aria-controls="' + x.id + '-more" data-exp-toggle="' + x.id + '">' +
            '<span>' + esc(t(open ? "ui.showLess" : "ui.showMore")) + '</span><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6"/></svg></button>' : "") +
          tags + "</article></li>";
      }).join("");
    },
    skills: function (el) {
      var cats = R.skillCategories;
      var filters = '<div class="sk-filters" role="group" aria-label="' + esc(t("ui.filterLabel")) + '">' +
        ["all"].concat(cats).map(function (c) {
          var count = c === "all" ? R.skills.length : R.skills.filter(function (s) { return s.cat === c; }).length;
          return '<button type="button" class="sk-filter" data-cat="' + c + '" aria-pressed="' + (state.cat === c) + '">' +
            '<span class="sk-filter-label">' + esc(c === "all" ? t("ui.all") : t("cat." + c)) + '</span><span class="sk-count" aria-hidden="true">' + count + "</span></button>";
        }).join("") + "</div>";
      var groups = '<div class="sk-groups">' + cats.map(function (c) {
        var list = R.skills.filter(function (s) { return s.cat === c; });
        var hide = state.cat !== "all" && state.cat !== c;
        return '<section class="sk-group" data-cat="' + c + '" aria-labelledby="skcat-' + c + '"' + (hide ? " hidden" : "") + '>' +
          '<h3 class="sk-cat" id="skcat-' + c + '">' + esc(t("cat." + c)) + '</h3><ul class="sk-tags">' +
          list.map(function (s, i) {
            return '<li class="sk-tag" style="--i:' + i + '" data-skill="' + s.id + '"><span class="sk-name">' + esc(s[lang]) + "</span></li>";
          }).join("") + "</ul></section>";
      }).join("") + "</div>";
      el.innerHTML = filters + '<p class="sr-only" aria-live="polite" data-sk-status></p>' + groups;
    },
    education: function (el) {
      el.innerHTML = R.education.map(function (e, i) {
        return '<li class="edu-item reveal" style="--i:' + i + '" data-kind="' + e.kind + '">' +
          '<span class="edu-icon">' + (ICONS[e.kind] || ICONS.cert) + '</span>' +
          '<div class="edu-body"><p class="edu-kind"><span class="edu-id">' + e.id + '</span>' + esc(t("edu." + e.kind)) + '</p>' +
          '<h3 class="edu-title">' + esc(e.title[lang]) + '</h3>' +
          '<p class="edu-meta"><span>' + esc(e.org) + '</span><span class="edu-date">' + esc(e.date[lang]) + "</span></p>" +
          (e.note ? '<p class="edu-note">' + esc(e.note[lang]) + "</p>" : "") +
          (e.verify ? '<a class="edu-verify" href="' + esc(e.verify) + '" target="_blank" rel="noopener" aria-label="' + esc(t("edu.verifyLabel")) + '">' + esc(t("edu.verify")) + ' <span aria-hidden="true">↗</span></a>' : "") + "</div></li>";
      }).join("");
    },
    languages: function (el) {
      el.innerHTML = R.languages.map(function (l) {
        return '<li class="lang-item"><span class="lang-name">' + esc(l.name[lang]) + '</span><span class="lang-level">' + esc(l.level[lang]) + "</span></li>";
      }).join("");
    },
    portfolio: function (el) {
      el.innerHTML = R.portfolio.map(function (p, i) {
        return '<li class="pf-card reveal" style="--i:' + i + '">' +
          '<div class="pf-media" aria-hidden="true"><span class="pf-icon">' + ICONS[p.icon] + '</span></div>' +
          '<div class="pf-body"><p class="pf-badge">' + esc(t("port.badge")) + '</p>' +
          '<h3 class="pf-title">' + esc(p.title[lang]) + '</h3><p class="pf-text">' + esc(p.body[lang]) + "</p></div></li>";
      }).join("");
    }
  };

  function renderAll() {
    var api = { lang: lang, t: t, esc: esc, R: R, reduced: reduced(), icons: ICONS };
    var extras = window.ResumeExtras || {};
    document.querySelectorAll("[data-render]").forEach(function (el) {
      var name = el.getAttribute("data-render");
      var fn = renderers[name] || extras[name];
      if (fn) fn(el, api);
    });
    observeReveals();
    observeCounters();
    updateSkillStatus(false);
    document.dispatchEvent(new CustomEvent("resume:render", { detail: { lang: lang } }));
  }

  /* ---------- i18n ---------- */
  function applyLang() {
    root.lang = lang;
    document.title = t("meta.title");
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute("content", t("meta.description"));
    document.querySelectorAll("[data-i18n]").forEach(function (el) { el.textContent = t(el.getAttribute("data-i18n")); });
    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr").split(";").forEach(function (pair) {
        var p = pair.split(":"); if (p.length === 2) el.setAttribute(p[0].trim(), t(p[1].trim()));
      });
    });
    document.querySelectorAll("[data-lang-btn]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-lang-btn") === lang));
    });
    renderAll();
    applyThemeLabel();
  }
  function setLang(l) { if (l === lang) return; lang = l; store.set("lang", l); applyLang(); }

  /* ---------- Theme ---------- */
  function applyTheme() {
    root.setAttribute("data-theme", theme);
    var mc = document.querySelector('meta[name="theme-color"]');
    if (mc) mc.setAttribute("content", getComputedStyle(root).getPropertyValue("--bg").trim() || (theme === "dark" ? "#000" : "#fff"));
    applyThemeLabel();
  }
  function applyThemeLabel() {
    document.querySelectorAll("[data-theme-toggle]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(theme === "dark"));
      var lbl = b.querySelector("[data-theme-label]");
      if (lbl) lbl.textContent = t(theme === "dark" ? "ui.themeLight" : "ui.themeDark");
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealIO = ("IntersectionObserver" in window) ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        en.target.classList.add("in");
        var rid = en.target.getAttribute("data-reveal-id");
        if (rid) state.revealed[rid] = true;
        revealIO.unobserve(en.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }) : null;

  function observeReveals() {
    document.querySelectorAll(".reveal:not(.in)").forEach(function (el) {
      if (!revealIO || reduced()) el.classList.add("in"); else revealIO.observe(el);
    });
  }

  /* ---------- Counters ---------- */
  function finalText(el) {
    var lo = el.getAttribute("data-lo"), v = el.getAttribute("data-count"), suf = el.getAttribute("data-suffix") || "";
    return (lo ? lo + "–" : "") + v + suf;
  }
  function runCounter(el) {
    var id = el.getAttribute("data-id");
    if (state.counted[id]) { el.textContent = finalText(el); return; }
    state.counted[id] = true;
    if (reduced()) { el.textContent = finalText(el); return; }
    var end = +el.getAttribute("data-count"), lo = el.getAttribute("data-lo"), suf = el.getAttribute("data-suffix") || "";
    var loN = lo ? +lo : 0, dur = 1700, t0 = null;
    function step(now) {
      if (t0 === null) t0 = now;
      var p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 4);
      el.textContent = (lo ? Math.round(loN * e) + "–" : "") + Math.round(end * e) + suf;
      if (p < 1) requestAnimationFrame(step); else el.textContent = finalText(el);
    }
    requestAnimationFrame(step);
  }
  var countIO = ("IntersectionObserver" in window) ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { runCounter(en.target); countIO.unobserve(en.target); } });
  }, { threshold: 0.6 }) : null;
  function observeCounters() {
    document.querySelectorAll("[data-count]").forEach(function (el) {
      if (!countIO || state.counted[el.getAttribute("data-id")]) runCounter(el); else countIO.observe(el);
    });
  }

  /* ---------- Skills filter ---------- */
  function updateSkillStatus(announce) {
    var st = document.querySelector("[data-sk-status]");
    if (!st) return;
    var n = state.cat === "all" ? R.skills.length : R.skills.filter(function (s) { return s.cat === state.cat; }).length;
    st.textContent = announce ? t("ui.showing").replace("{n}", n) : "";
  }
  function setFilter(cat) {
    state.cat = cat;
    document.querySelectorAll(".sk-filter").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-cat") === cat)); });
    document.querySelectorAll(".sk-group").forEach(function (g) {
      var show = cat === "all" || g.getAttribute("data-cat") === cat;
      if (show) {
        var wasHidden = g.hidden;
        g.hidden = false;
        if (wasHidden || cat !== "all") { g.classList.remove("pop"); void g.offsetWidth; g.classList.add("pop"); }
      } else g.hidden = true;
    });
    updateSkillStatus(true);
    document.dispatchEvent(new CustomEvent("resume:filter", { detail: { cat: cat } }));
  }

  /* ---------- Timeline progress + page progress ---------- */
  var ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      var vh = window.innerHeight, doc = document.documentElement;
      var max = doc.scrollHeight - vh;
      root.style.setProperty("--scroll", max > 0 ? (window.scrollY / max).toFixed(4) : "0");
      document.querySelectorAll("[data-progress]").forEach(function (tl) {
        var r = tl.getBoundingClientRect();
        var p = reduced() ? 1 : (vh * 0.62 - r.top) / Math.max(1, r.height);
        tl.style.setProperty("--progress", Math.max(0, Math.min(1, p)).toFixed(4));
      });
      var hdr = document.querySelector("[data-header]");
      if (hdr) hdr.classList.toggle("scrolled", window.scrollY > 12);
    });
  }

  /* ---------- Nav ---------- */
  function initNav() {
    var btn = document.querySelector("[data-menu-toggle]");
    var nav = document.getElementById(btn ? btn.getAttribute("aria-controls") : "");
    function close() { if (!btn) return; btn.setAttribute("aria-expanded", "false"); nav.classList.remove("open"); root.classList.remove("menu-open"); }
    if (btn && nav) {
      btn.addEventListener("click", function () {
        var open = btn.getAttribute("aria-expanded") !== "true";
        btn.setAttribute("aria-expanded", String(open)); nav.classList.toggle("open", open); root.classList.toggle("menu-open", open);
      });
      nav.addEventListener("click", function (e) { if (e.target.closest("a")) close(); });
      document.addEventListener("keydown", function (e) { if (e.key === "Escape" && nav.classList.contains("open")) { close(); btn.focus(); } });
      window.addEventListener("resize", function () { if (window.innerWidth > 960) close(); });
    }
    var links = {};
    document.querySelectorAll("[data-nav] a[href^='#']").forEach(function (a) { links[a.getAttribute("href").slice(1)] = a; });
    if (!("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        Object.keys(links).forEach(function (k) { links[k].removeAttribute("aria-current"); });
        var a = links[en.target.id]; if (a) a.setAttribute("aria-current", "location");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("main section[id]").forEach(function (s) { io.observe(s); });
  }

  /* ---------- Events ---------- */
  document.addEventListener("click", function (e) {
    var lb = e.target.closest("[data-lang-btn]");
    if (lb) { setLang(lb.getAttribute("data-lang-btn")); return; }
    var tb = e.target.closest("[data-theme-toggle]");
    if (tb) { theme = theme === "dark" ? "light" : "dark"; store.set("theme", theme); applyTheme(); document.dispatchEvent(new CustomEvent("resume:theme")); return; }
    var fb = e.target.closest(".sk-filter");
    if (fb) { setFilter(fb.getAttribute("data-cat")); return; }
    var xb = e.target.closest("[data-exp-toggle]");
    if (xb) {
      var id = xb.getAttribute("data-exp-toggle"), more = document.getElementById(id + "-more");
      var open = xb.getAttribute("aria-expanded") !== "true";
      state.expanded[id] = open; more.hidden = !open;
      xb.setAttribute("aria-expanded", String(open));
      xb.querySelector("span").textContent = t(open ? "ui.showLess" : "ui.showMore");
      document.dispatchEvent(new CustomEvent("resume:layout"));
    }
  });
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  if (mq.addEventListener) mq.addEventListener("change", function () { observeReveals(); onScroll(); });

  /* ---------- Boot ---------- */
  root.classList.add("js");
  applyTheme();
  applyLang();
  initNav();
  onScroll();
  window.Resume = { t: t, get lang() { return lang; }, get theme() { return theme; }, reduced: reduced, skillById: skillById, esc: esc };
})();
