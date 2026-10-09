/* Interactive "methods" components: V-Model, career Gantt, DFMEA matrix, soft-skill cards.
   Registers renderers on window.ResumeExtras (called by core.js) and wires interactions
   with event delegation. Vanilla JS + inline SVG, no dependencies. */
(function () {
  "use strict";
  var X = window.ResumeExtras = window.ResumeExtras || {};
  var R = window.RESUME;
  var state = { phase: "P1", pinned: null, hover: null };
  var lastApi = null;
  var MONTHS = {
    en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    es: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"]
  };
  var expById = {};
  R.experience.forEach(function (x) { expById[x.id] = x; });
  var phaseById = {};
  R.vmodel.phases.forEach(function (p) { phaseById[p.id] = p; });

  var SS_ICONS = {
    people: '<path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM16.5 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM2.5 19c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5M13.5 14.6c.9-.6 1.9-.9 3-.9 2.3 0 4.2 1.5 4.8 4.3"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 3.6 5.7 3.6 9s-1.1 6.3-3.6 9c-2.5-2.7-3.6-5.7-3.6-9S9.5 5.7 12 3z"/>',
    mentor: '<path d="M12 4l9 4.5-9 4.5-9-4.5zM6.5 10.5v4.2c1.5 1.4 3.4 2.1 5.5 2.1s4-.7 5.5-2.1v-4.2M21 8.5v5"/>',
    demo: '<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8 20h8M12 16v4M10 8l4 2-4 2z"/>',
    video: '<rect x="3" y="6" width="13" height="12" rx="1.5"/><path d="M16 10.5l5-3v9l-5-3z"/>',
    team: '<circle cx="12" cy="7" r="2.6"/><circle cx="5.5" cy="9.5" r="2"/><circle cx="18.5" cy="9.5" r="2"/><path d="M7.5 19c.4-3 2.2-4.8 4.5-4.8s4.1 1.8 4.5 4.8M2.5 17.5c.3-2 1.4-3.3 3-3.5M21.5 17.5c-.3-2-1.4-3.3-3-3.5"/>',
    lang: '<path d="M4 5h9M8.5 3v2M6 5c.8 3.3 2.9 5.8 6 7.2M11 5c-.9 3.6-3.4 6.4-7 7.6M13 21l4-9 4 9M14.4 18h5.2"/>'
  };
  function svgIcon(name) { return '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' + SS_ICONS[name] + "</svg>"; }

  /* ---------------- V-Model ---------------- */
  var HALF_W = 9.5; // node half-width in % of stage
  X.vmodel = function (el, api) {
    lastApi = api;
    var L = api.lang, t = api.t, esc = api.esc, VM = R.vmodel;
    var pts = VM.phases.filter(function (p) { return p.side !== "trace"; })
      .map(function (p) { return (p.x * 10) + "," + (p.y * 4.6); }).join(" ");
    var lines = VM.links.map(function (l) {
      var a = phaseById[l[0]], b = phaseById[l[1]], y = a.y * 4.6;
      return '<line class="vm-link" data-a="' + a.id + '" data-b="' + b.id + '" x1="' + (a.x + HALF_W) * 10 + '" y1="' + y + '" x2="' + (b.x - HALF_W) * 10 + '" y2="' + y + '" vector-effect="non-scaling-stroke"/>';
    }).join("");
    var labels = VM.links.map(function (l) {
      return '<span class="vm-link-label" aria-hidden="true" style="top:' + phaseById[l[0]].y + '%">' + esc(t("vm.verifies")) + "</span>";
    }).join("");
    var nodes = VM.phases.filter(function (p) { return p.side !== "trace"; }).map(function (p, i) {
      var orgs = [];
      p.ev.forEach(function (e) { var o = expById[e.exp].org; if (orgs.indexOf(o) < 0) orgs.push(o); });
      return '<div class="vm-node vm-' + p.side + '" data-phase="' + p.id + '" title="' + esc(t("vm.tip") + ": " + orgs.join(" · ")) + '" ' +
        'style="--x:' + p.x + '%;--y:' + p.y + '%;--lvl:' + p.lvl + ';--i:' + i + '">' +
        '<span class="vm-code">' + esc(p.code) + '</span><span class="vm-name">' + esc(p.name[L]) + "</span></div>";
    }).join("");
    el.innerHTML =
      '<div class="vm-head" aria-hidden="true"><span class="vm-dir vm-dir-l">' + esc(t("vm.left")) + '</span><span class="vm-dir vm-dir-r">' + esc(t("vm.right")) + "</span></div>" +
      '<div class="vm-stage">' +
      '<svg class="vm-lines" viewBox="0 0 1000 460" preserveAspectRatio="none" aria-hidden="true" focusable="false">' +
      '<polyline class="vm-v" points="' + pts + '" vector-effect="non-scaling-stroke"/>' + lines + "</svg>" +
      labels + nodes + "</div>";
    paintVM();
  };

  // Diagram only: hovering a phase highlights it and its traceability link; no detail panel.
  function paintVM() {
    var host = document.querySelector('[data-render="vmodel"]');
    if (!host) return;
    var id = state.hover;
    if (id) host.setAttribute("data-active", id); else host.removeAttribute("data-active");
    host.querySelectorAll(".vm-node").forEach(function (b) { b.classList.toggle("is-active", b.getAttribute("data-phase") === id); });
    host.querySelectorAll(".vm-link").forEach(function (ln) {
      ln.classList.toggle("on", !!id && (ln.getAttribute("data-a") === id || ln.getAttribute("data-b") === id));
    });
  }

  /* ---------------- Gantt ---------------- */
  function mIdx(s) { var p = s.split("-"); return (+p[0]) * 12 + (+p[1] - 1); }
  function fmt(s, L) { var p = s.split("-"); return MONTHS[L][+p[1] - 1] + " " + p[0]; }

  X.gantt = function (el, api) {
    var L = api.lang, t = api.t, esc = api.esc, G = R.gantt;
    var now = new Date(), nowIdx = now.getFullYear() * 12 + now.getMonth() + now.getDate() / 31;
    var start = mIdx(G.axisStart);
    var end = Math.max(Math.ceil(nowIdx) + 3, mIdx("2026-12") + 1);
    end = Math.ceil(end / 3) * 3;
    var total = end - start;
    var pct = function (i) { return ((i - start) / total * 100); };
    var rowIndex = {};
    G.rows.forEach(function (r, i) { rowIndex[r.id] = i; });
    var years = "", grid = "";
    for (var y = Math.floor(start / 12); y * 12 < end; y++) {
      var x0 = pct(Math.max(y * 12, start)), x1 = pct(Math.min((y + 1) * 12, end));
      years += '<span class="gt-year" style="left:' + x0.toFixed(3) + "%;width:" + (x1 - x0).toFixed(3) + '%">' + (Math.min((y + 1) * 12, end) - Math.max(y * 12, start) >= 4 ? y : "") + "</span>";
      if (y * 12 > start) grid += '<span class="gt-vline" style="left:' + pct(y * 12).toFixed(3) + '%"></span>';
      for (var q = 3; q < 12; q += 3) { var qi = y * 12 + q; if (qi > start && qi < end) grid += '<span class="gt-vline q" style="left:' + pct(qi).toFixed(3) + '%"></span>'; }
    }
    var todayX = pct(Math.min(nowIdx, end));
    var mid = function (s) { var p = s.split("-"); return mIdx(s) + (p[2] ? (+p[2] - 1) / 31 : 0.5); };
    var rows = G.rows.map(function (r, i) {
      var org = typeof r.org === "string" ? r.org : r.org[L];
      var track, startTxt, endTxt;
      if (r.kind === "task") {
        var s = mid(r.start), e = r.end ? mid(r.end) : nowIdx;
        startTxt = fmt(r.start, L); endTxt = r.end ? fmt(r.end, L) : t("gt.present");
        track = '<span class="gt-bar' + (r.end ? "" : " ongoing") + ((e - s) < 6 ? " short" : "") + '" style="left:' + pct(s).toFixed(3) + "%;width:" + (pct(e) - pct(s)).toFixed(3) + '%;--d:' + i + '"><span class="gt-bar-txt">' + esc(r.id) + "</span></span>";
      } else {
        startTxt = endTxt = fmt(r.at, L);
        track = '<span class="gt-ms" style="left:' + pct(mid(r.at)).toFixed(3) + '%;--d:' + i + '"></span><span class="gt-ms-txt" style="left:' + pct(mid(r.at)).toFixed(3) + '%">' + esc(fmt(r.at, L)) + "</span>";
      }
      var feat = r.id === "EXP-04";
      return '<li class="gt-row is-' + r.kind + (r.critical ? " is-critical" : "") + (feat ? " is-featured" : "") + '" data-id="' + r.id + '" style="--r:' + i + '">' +
        '<div class="gt-cols"><span class="gt-name" title="' + esc(r.name[L]) + '"><span class="gt-id">' + (r.kind === "milestone" ? "◆ " : "") + esc(r.id) + '</span><span class="gt-title">' + (feat ? '<a href="#bookroom">★ ' + esc(r.name[L]) + "</a>" : esc(r.name[L])) + '</span><span class="gt-org">' + esc(org) + '</span><span class="gt-dates-m">' + esc(startTxt === endTxt ? startTxt : startTxt + " – " + endTxt) + "</span></span>" +
        '<span class="gt-start">' + esc(startTxt) + '</span><span class="gt-finish">' + esc(endTxt) + "</span></div>" +
        '<div class="gt-track">' + track + "</div></li>";
    }).join("");
    var links = G.path.map(function (pr, k) {
      var a = rowIndex[pr[0]], b = rowIndex[pr[1]], next = G.rows[b];
      return '<span class="gt-link" style="left:' + pct(mid(next.start)).toFixed(3) + "%;--a:" + a + ";--b:" + b + ";--d:" + (k + 4) + '"></span>';
    }).join("");
    el.innerHTML =
      '<div class="gt-legend" aria-hidden="true"><span class="lg lg-crit"><i></i>' + esc(t("gt.critical")) + '</span><span class="lg lg-ms"><i></i>' + esc(t("gt.milestone")) + '</span><span class="lg lg-today"><i></i>' + esc(t("gt.today")) + "</span></div>" +
      '<div class="gt" role="group" aria-label="' + esc(t("gt.label")) + '">' +
      '<div class="gt-headrow" aria-hidden="true"><div class="gt-cols"><span class="gt-name">' + esc(t("gt.task")) + "</span><span class=\"gt-start\">" + esc(t("gt.start")) + '</span><span class="gt-finish">' + esc(t("gt.finish")) + '</span></div><div class="gt-axis">' + years + "</div></div>" +
      '<div class="gt-body" style="--rows:' + G.rows.length + '">' +
      '<div class="gt-overlay" aria-hidden="true">' + grid + links + '<span class="gt-today" style="left:' + todayX.toFixed(3) + '%"><span>' + esc(t("gt.today")) + "</span></span></div>" +
      '<ol class="gt-rows">' + rows + "</ol></div></div>";
  };

  /* ---------------- DFMEA ---------------- */
  X.dfmea = function (el, api) {
    var L = api.lang, t = api.t, esc = api.esc;
    var cols = ["mode", "effect", "cause", "action", "result"];
    el.innerHTML = '<div class="fm-scroll"><table class="fm"><caption class="sr-only">' + esc(t("fm.title")) + "</caption><thead><tr>" +
      '<th scope="col" class="fm-c-id">' + esc(t("fm.id")) + "</th>" +
      cols.map(function (c) { return '<th scope="col" class="fm-c-' + c + '">' + esc(t("fm." + c)) + "</th>"; }).join("") +
      "</tr></thead><tbody>" +
      R.dfmea.map(function (r, i) {
        var x = expById[r.exp];
        return '<tr class="fm-row" style="--i:' + i + '" data-exp="' + r.exp + '"><th scope="row" class="fm-c-id"><span class="fm-id">' + r.id + '</span><span class="fm-tag">' + esc(r.tag[L]) + '</span><span class="fm-src">' + esc(x.org) + "</span></th>" +
          cols.map(function (c) { return '<td class="fm-c-' + c + '" data-label="' + esc(t("fm." + c)) + '"><span>' + esc(r[c][L]) + "</span></td>"; }).join("") + "</tr>";
      }).join("") + '</tbody></table></div><p class="fm-note">' + esc(t("fm.note")) + "</p>";
  };

  /* ---------------- Soft skills ---------------- */
  var openCards = {};
  X.soft = function (el, api) {
    var L = api.lang, t = api.t, esc = api.esc;
    el.innerHTML = R.soft.map(function (s, i) {
      var open = !!openCards[s.id];
      return '<li class="ss-card' + (open ? " open" : "") + '" style="--i:' + i + '" data-ss="' + s.id + '"><article class="ss-inner" aria-labelledby="' + s.id + '-t">' +
        '<div class="ss-front"><span class="ss-icon">' + svgIcon(s.icon) + '</span><p class="ss-metric">' + esc(s.metric) + '</p><h3 class="ss-title" id="' + s.id + '-t">' + esc(s.title[L]) + '</h3><p class="ss-sub">' + esc(s.sub[L]) + "</p></div>" +
        '<div class="ss-back" id="' + s.id + '-ev"><p class="ss-ev-k">' + esc(t("ss.evidence")) + '</p><p class="ss-ev">' + esc(s.ev[L]) + "</p></div>" +
        '<button type="button" class="ss-toggle" aria-expanded="' + open + '" aria-controls="' + s.id + '-ev"><span>' + esc(t(open ? "ss.hide" : "ss.show")) + '</span><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 3v10M3 8h10" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></button>' +
        "</article></li>";
    }).join("");
  };

  /* ---------------- Bookroom featured spotlight ---------------- */
  var BK_ICONS = {
    cal: '<rect x="3.5" y="5" width="17" height="15" rx="1.5"/><path d="M3.5 9.5h17M8 3v4M16 3v4M7.5 13h3M7.5 16.5h6"/>',
    patient: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20c.8-3.8 3.6-6 7-6s6.2 2.2 7 6"/>',
    admin: '<rect x="4" y="3.5" width="16" height="17" rx="1.5"/><path d="M8 8h8M8 12h8M8 16h5"/>',
    mobile: '<rect x="7" y="2.5" width="10" height="19" rx="2"/><path d="M11 18.5h2"/>'
  };
  function bkIcon(n) { return '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' + BK_ICONS[n] + "</svg>"; }
  X.bookroom = function (el, api) {
    var t = api.t, esc = api.esc;
    var metric = function (id, n, k) {
      return '<li class="bk-metric"><p class="bk-num"><span class="sr-only">' + n + '</span><span aria-hidden="true" data-count="' + n + '" data-lo="" data-suffix="" data-id="' + id + '">' + n + '</span></p>' +
        '<p class="bk-mlabel">' + esc(t(k)) + '</p><p class="bk-mdesc">' + esc(t(k + "d")) + "</p></li>";
    };
    var steps = [1, 2, 3, 4].map(function (i) {
      return '<li class="bk-step' + (i === 4 ? " is-now" : "") + '" style="--i:' + i + '"><span class="bk-dot" aria-hidden="true"></span>' +
        '<p class="bk-step-t">' + esc(t("bk.j" + i)) + (i === 4 ? ' <span class="bk-now">' + esc(t("bk.now")) + "</span>" : "") + '</p><p class="bk-step-d">' + esc(t("bk.j" + i + "d")) + "</p></li>";
    }).join("");
    var covers = [["cal", "bp.wf1"], ["patient", "bp.wf2"], ["admin", "bp.wf3"], ["mobile", "bp.wf4"]].map(function (c) {
      return '<li><span class="bk-ic">' + bkIcon(c[0]) + "</span><span>" + esc(t(c[1])) + "</span></li>";
    }).join("");
    var roles = [1, 2, 3, 4, 5].map(function (i) { return "<li>" + esc(t("bk.r" + i)) + "</li>"; }).join("");
    el.innerHTML =
      '<div class="bk">' +
        '<div class="bk-top">' +
          '<div class="bk-intro">' +
            '<p class="bk-badge"><span aria-hidden="true">★</span> ' + esc(t("bk.badge")) + "</p>" +
            '<h2 class="bk-title" id="book-title">Bookroom</h2>' +
            '<p class="bk-role">' + esc(t("book.role").split(" · ")[0]) + "</p>" +
            '<p class="bk-story">' + esc(t("bk.story")) + "</p>" +
            '<div class="bk-ctas"><a class="bk-cta" href="https://bookroom.mx" target="_blank" rel="noopener">' + esc(t("book.cta")) +
              '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 11L11 5M6 5h5v5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg><span class="sr-only"> ' + esc(t("ui.opensNew")) + "</span></a>" +
              '<span class="bk-meta">' + esc(t("bk.meta")) + "</span></div>" +
          "</div>" +
          '<ul class="bk-metrics">' + metric("bk-team", 7, "bk.m1") + metric("bk-orgs", 5, "bk.m2") + metric("bk-users", 7, "bk.m3") + "</ul>" +
        "</div>" +
        '<div class="bk-lineage" data-lineage>' +
          '<div class="bk-ln-head"><p class="bk-ln-k">' + esc(t("ln.kicker")) + '</p><p class="bk-ln-lede">' + esc(t("ln.lede")) + "</p></div>" +
          '<svg class="bk-ln-svg" aria-hidden="true" focusable="false"></svg>' +
          '<ol class="bk-ln-src">' + R.lineage.map(function (l, i) {
            return '<li class="bk-ln-item" style="--i:' + i + '" data-ln="' + l.id + '"><p class="bk-ln-when"><span class="bk-ln-id">' + l.id + "</span> " + esc(l.when) + " · " + esc(l.org) + "</p>" +
              '<p class="bk-ln-from"><span class="bk-ln-lab">' + esc(t("ln.learned")) + "</span>" + esc(l.from[api.lang]) +
                (l.link && document.querySelector(l.link) ? ' <a class="bk-ln-more" href="' + l.link + '">' + esc(t("ln.more")) + " →</a>" : "") + "</p>" +
              '<p class="bk-ln-to"><span class="bk-ln-lab">' + esc(t("ln.became")) + "</span>" + esc(l.to[api.lang]) + "</p></li>";
          }).join("") + "</ol>" +
          '<div class="bk-ln-hub"><span class="bk-ln-ring" aria-hidden="true"></span><p class="bk-ln-hub-t">Bookroom</p><p class="bk-ln-hub-s">' + esc(t("ln.hub")) + '</p><p class="bk-ln-hub-d">' + esc(t("ln.hubSub")) + "</p></div>" +
        "</div>" +
        '<ol class="bk-journey">' + steps + "</ol>" +
        '<div class="bk-cards">' +
          '<section class="bk-card" aria-labelledby="bk-covers-t"><h3 id="bk-covers-t" class="bk-h">' + esc(t("bk.covers")) + '</h3><ul class="bk-covers">' + covers + '</ul><p class="bk-note">' + esc(t("bk.coversNote")) + "</p></section>" +
          '<section class="bk-card" aria-labelledby="bk-stack-t"><h3 id="bk-stack-t" class="bk-h">' + esc(t("bk.stack")) + "</h3>" +
            '<div class="bk-stack"><span class="bk-blk">' + esc(t("bp.webapp")) + '</span><span class="bk-wire" aria-hidden="true"></span><span class="bk-blk">' + esc(t("bp.api")) + '</span><span class="bk-wire" aria-hidden="true"></span><span class="bk-pair"><span class="bk-blk">PostgreSQL</span><span class="bk-blk">Redis</span></span></div>' +
            '<p class="bk-note">' + esc(t("bk.stackNote")) + "</p></section>" +
          '<section class="bk-card" aria-labelledby="bk-role-t"><h3 id="bk-role-t" class="bk-h">' + esc(t("bk.role")) + '</h3><ul class="bk-roles">' + roles + "</ul></section>" +
        "</div>" +
      "</div>";
  };

  /* Converging lines from each earlier chapter into the Bookroom hub (desktop only) */
  var NSL = "http://www.w3.org/2000/svg";
  function drawLineage() {
    var box = document.querySelector("[data-lineage]");
    if (!box) return;
    var svg = box.querySelector(".bk-ln-svg"), hub = box.querySelector(".bk-ln-hub");
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    if (!window.matchMedia("(min-width: 901px)").matches) return;
    var br = box.getBoundingClientRect(), hr = hub.getBoundingClientRect();
    svg.setAttribute("viewBox", "0 0 " + br.width + " " + br.height);
    var hx = hr.left - br.left, hy = hr.top + hr.height / 2 - br.top;
    var items = box.querySelectorAll(".bk-ln-item");
    items.forEach(function (it, i) {
      var r = it.getBoundingClientRect();
      var sx = r.right - br.left, sy = r.top + r.height / 2 - br.top;
      var ty = hy + (i - (items.length - 1) / 2) * 10;
      var dx = (hx - sx) * 0.55;
      var p = document.createElementNS(NSL, "path");
      p.setAttribute("d", "M" + sx + "," + sy + " C" + (sx + dx) + "," + sy + " " + (hx - dx) + "," + ty + " " + hx + "," + ty);
      p.setAttribute("pathLength", "1");
      p.setAttribute("class", "bk-ln-path");
      p.style.setProperty("--i", i);
      svg.appendChild(p);
      var c = document.createElementNS(NSL, "circle");
      c.setAttribute("cx", sx); c.setAttribute("cy", sy); c.setAttribute("r", "3.5"); c.setAttribute("class", "bk-ln-node");
      svg.appendChild(c);
    });
  }
  var lnRaf = null;
  function scheduleLineage() { if (lnRaf) cancelAnimationFrame(lnRaf); lnRaf = requestAnimationFrame(function () { lnRaf = null; drawLineage(); }); }
  document.addEventListener("resume:render", scheduleLineage);
  window.addEventListener("resize", scheduleLineage);
  window.addEventListener("load", scheduleLineage);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(scheduleLineage);
  if ("ResizeObserver" in window) {
    var lnRO = new ResizeObserver(scheduleLineage);
    document.addEventListener("resume:render", function () { var b = document.querySelector("[data-lineage]"); if (b) lnRO.observe(b); });
  }

  /* ---------------- Interactions ---------------- */
  document.addEventListener("resume:render", function () { paintVM(); });
  document.addEventListener("click", function (e) {
    var b = e.target.closest(".ss-toggle");
    if (b) {
      var card = b.closest(".ss-card"), sid = card.getAttribute("data-ss");
      var open = !card.classList.contains("open");
      openCards[sid] = open;
      card.classList.toggle("open", open);
      b.setAttribute("aria-expanded", String(open));
      b.querySelector("span").textContent = window.Resume.t(open ? "ss.hide" : "ss.show");
    }
  });
  function hoverPhase(e) {
    var n = e.target.closest && e.target.closest(".vm-node");
    var next = n ? n.getAttribute("data-phase") : null;
    if (next !== state.hover) { state.hover = next; paintVM(); }
  }
  document.addEventListener("mouseover", function (e) { if (e.target.closest && e.target.closest(".vm-stage")) hoverPhase(e); });
  document.addEventListener("mouseout", function (e) {
    if (e.target.closest && e.target.closest(".vm-stage") && !(e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest(".vm-node"))) { if (state.hover) { state.hover = null; paintVM(); } }
  });
  document.addEventListener("focusin", function (e) { if (e.target.classList && e.target.classList.contains("vm-node")) hoverPhase(e); });
  document.addEventListener("focusout", function (e) { if (e.target.classList && e.target.classList.contains("vm-node") && state.hover) { state.hover = null; paintVM(); } });
})();
