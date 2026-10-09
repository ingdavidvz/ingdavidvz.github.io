/* Blueprint extras: skills "traceability view".
   Roles (left) link to the skills they exercised (right). Connectors are routed orthogonally
   through gutters only: role port -> its own lane in the column gutter -> the channel just below
   the chip's row -> a short stub into the chip's left edge. They are drawn behind opaque chips, so
   they never cross text. Each role has its own color (lines, card accent, matched chips, dots).
   On narrow screens lines are hidden and only chips highlight. */
(function () {
  "use strict";
  var R = window.RESUME, trace = document.querySelector("[data-trace]");
  if (!trace || !window.Resume) return;
  var svg = trace.querySelector(".trace-svg");
  var list = trace.querySelector("[data-trace-sources]");
  var clearBtn = trace.querySelector("[data-trace-clear]");
  var status = trace.querySelector("[data-trace-status]");
  var bar = trace.querySelector("[data-trace-bar]");
  var NS = "http://www.w3.org/2000/svg";
  var selected = null, hover = null;
  var wideMQ = window.matchMedia("(min-width: 961px)");

  function expById(id) { for (var i = 0; i < R.experience.length; i++) if (R.experience[i].id === id) return R.experience[i]; }
  function t(k) { return window.Resume.t(k); }

  function renderSources() {
    var lang = window.Resume.lang, esc = window.Resume.esc;
    list.innerHTML = R.experience.map(function (x) {
      return '<li><button type="button" class="src" data-src="' + x.id + '" aria-pressed="' + (selected === x.id) + '">' +
        '<span class="src-role">' + esc(x.role[lang]) + '</span>' +
        '<span class="src-org">' + esc(x.org) + ' · ' + esc(x.dates[lang]) + '</span>' +
        '<span class="src-n">' + esc(t("trace.n").replace("{n}", x.traces.length)) + '</span>' +
        '<span class="src-port" aria-hidden="true"></span></button></li>';
    }).join("");
    var std = trace.querySelector('.sk-group[data-cat="standards"] .sk-cat');
    if (std) std.setAttribute("data-note", t("trace.untraced"));
    // Small role-colored dots on each chip (shown in the default state)
    trace.querySelectorAll(".sk-tag").forEach(function (tag) {
      var id = tag.getAttribute("data-skill");
      var old = tag.querySelector(".sk-dots"); if (old) old.remove();
      var users = R.experience.filter(function (x) { return x.traces.indexOf(id) >= 0; });
      if (!users.length) return;
      var d = document.createElement("span");
      d.className = "sk-dots"; d.setAttribute("aria-hidden", "true");
      d.innerHTML = users.map(function (x) { return '<i data-role="' + x.id + '"></i>'; }).join("");
      tag.appendChild(d);
    });
    highlight();
    schedule();
  }

  /* Path with rounded orthogonal elbows through a list of points */
  function roundedPath(pts, r) {
    var d = "M" + pts[0][0].toFixed(1) + "," + pts[0][1].toFixed(1);
    for (var i = 1; i < pts.length - 1; i++) {
      var p0 = pts[i - 1], p1 = pts[i], p2 = pts[i + 1];
      var l1 = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]), l2 = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]);
      var rr = Math.min(r, l1 / 2, l2 / 2);
      if (rr < 0.5) { d += " L" + p1[0].toFixed(1) + "," + p1[1].toFixed(1); continue; }
      var a = [p1[0] - (p1[0] - p0[0]) / l1 * rr, p1[1] - (p1[1] - p0[1]) / l1 * rr];
      var b = [p1[0] + (p2[0] - p1[0]) / l2 * rr, p1[1] + (p2[1] - p1[1]) / l2 * rr];
      d += " L" + a[0].toFixed(1) + "," + a[1].toFixed(1) + " Q" + p1[0].toFixed(1) + "," + p1[1].toFixed(1) + " " + b[0].toFixed(1) + "," + b[1].toFixed(1);
    }
    var e = pts[pts.length - 1];
    return d + " L" + e[0].toFixed(1) + "," + e[1].toFixed(1);
  }

  function draw() {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    if (!wideMQ.matches) return;
    var cr = trace.getBoundingClientRect();
    svg.setAttribute("viewBox", "0 0 " + cr.width + " " + cr.height);
    var srcCol = trace.querySelector(".trace-sources").getBoundingClientRect();
    var tgtCol = trace.querySelector(".trace-targets").getBoundingClientRect();
    var gutL = srcCol.right - cr.left, gutR = tgtCol.left - cr.left;
    var n = R.experience.length;
    // Lanes in the gutter: top role gets the rightmost lane
    var laneGap = Math.min(9, (gutR - gutL - 16) / (n + 1));
    // Row channels: the gap just below each wrapped row of chips
    var rowsByTag = {};
    trace.querySelectorAll(".sk-group:not([hidden]) .sk-tags").forEach(function (ul) {
      var tags = Array.prototype.slice.call(ul.querySelectorAll(".sk-tag"));
      var rows = [];
      tags.forEach(function (tg) {
        var r = tg.getBoundingClientRect();
        var row = rows.filter(function (rw) { return Math.abs(rw.top - r.top) < 4; })[0];
        if (!row) { row = { top: r.top, bottom: r.bottom }; rows.push(row); }
        row.bottom = Math.max(row.bottom, r.bottom);
        rowsByTag[tg.getAttribute("data-skill")] = { rect: r, row: row };
      });
    });
    var frag = document.createDocumentFragment();
    var k = 0;
    R.experience.forEach(function (x, i) {
      var b = list.querySelector('[data-src="' + x.id + '"]');
      if (!b) return;
      var br = b.getBoundingClientRect();
      var sx = br.right - cr.left, sy = br.top + br.height / 2 - cr.top;
      var lane = gutL + 12 + (n - 1 - i) * laneGap; // distinct x per role
      x.traces.forEach(function (id) {
        var info = rowsByTag[id]; if (!info) return;
        var tr = info.rect;
        var chY = info.row.bottom - cr.top + 4;          // channel under the row (in the 8px row gap)
        var stubX = tr.left - cr.left - 4;                // inside the gap left of the chip
        var midY = tr.top + tr.height / 2 - cr.top;
        var pts = [[sx, sy], [lane, sy], [lane, chY], [stubX, chY], [stubX, midY], [tr.left - cr.left, midY]];
        var p = document.createElementNS(NS, "path");
        p.setAttribute("d", roundedPath(pts, 5));
        p.setAttribute("pathLength", "1");
        p.setAttribute("class", "tr-path");
        p.setAttribute("data-from", x.id);
        p.style.setProperty("--d", (k++ * 12) + "ms");
        frag.appendChild(p);
      });
    });
    svg.appendChild(frag);
    highlight();
  }

  function highlight() {
    var active = hover || selected;
    if (active) trace.setAttribute("data-active", active); else trace.removeAttribute("data-active");
    var x = active ? expById(active) : null;
    var set = {};
    if (x) x.traces.forEach(function (id) { set[id] = true; });
    trace.querySelectorAll(".sk-tag").forEach(function (el) { el.classList.toggle("traced", !!set[el.getAttribute("data-skill")]); });
    svg.querySelectorAll(".tr-path").forEach(function (p) {
      var on = p.getAttribute("data-from") === active;
      p.classList.toggle("on", on);
      if (on) p.parentNode.appendChild(p); // keep active lines on top of other lines (still behind chips)
    });
    list.querySelectorAll(".src").forEach(function (b) {
      var id = b.getAttribute("data-src");
      b.setAttribute("aria-pressed", String(id === selected));
      b.classList.toggle("hot", id === hover);
    });
    if (bar) {
      bar.classList.toggle("on", !!x);
      if (x) bar.setAttribute("data-role", x.id); else bar.removeAttribute("data-role");
      bar.innerHTML = x
        ? '<span class="ts-dot"></span>' + window.Resume.esc(t("trace.count").replace("{org}", x.org).replace("{n}", x.traces.length))
        : window.Resume.esc(t("trace.hint"));
    }
    clearBtn.hidden = !selected;
  }

  function announce() {
    if (!selected) { status.textContent = ""; return; }
    var x = expById(selected), lang = window.Resume.lang;
    var names = x.traces.map(function (id) { return window.Resume.skillById[id][lang]; }).join(", ");
    status.textContent = t("trace.selected").replace("{role}", x.role[lang]).replace("{n}", x.traces.length) + ": " + names;
  }

  list.addEventListener("click", function (e) {
    var b = e.target.closest(".src"); if (!b) return;
    var id = b.getAttribute("data-src");
    selected = selected === id ? null : id;
    hover = null;
    highlight(); announce();
  });
  list.addEventListener("mouseover", function (e) {
    if (!window.matchMedia("(hover: hover)").matches) return;
    var b = e.target.closest(".src"); if (b && hover !== b.getAttribute("data-src")) { hover = b.getAttribute("data-src"); highlight(); }
  });
  list.addEventListener("mouseleave", function () { if (hover) { hover = null; highlight(); } });
  clearBtn.addEventListener("click", function () { selected = null; highlight(); announce(); });

  var raf = null;
  function schedule() { if (raf) cancelAnimationFrame(raf); raf = requestAnimationFrame(function () { raf = null; draw(); }); }
  document.addEventListener("resume:render", renderSources);
  document.addEventListener("resume:filter", function () { setTimeout(schedule, 0); });
  document.addEventListener("resume:layout", schedule);
  window.addEventListener("resize", schedule);
  if (wideMQ.addEventListener) wideMQ.addEventListener("change", schedule);
  if ("ResizeObserver" in window) new ResizeObserver(schedule).observe(trace);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(schedule);
  // Draw-in once the view scrolls into place
  if ("MutationObserver" in window) {
    new MutationObserver(function () {
      if (trace.classList.contains("in") && !trace.classList.contains("drawn")) requestAnimationFrame(function () { trace.classList.add("drawn"); });
    }).observe(trace, { attributes: true, attributeFilter: ["class"] });
  }
  if (trace.classList.contains("in")) trace.classList.add("drawn");
  renderSources();
})();
