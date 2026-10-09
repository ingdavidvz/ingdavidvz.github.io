/* CM2 chapter: PMBOK process-group strip + interactive CM2 closed-loop change process.
   Redrawn from the IpX CM2 closed-loop concept (no third-party artwork embedded).
   Nodes marked "mine" are only those the resume supports (Configuration Analyst, Bose, Dec 2024 – Oct 2025). */
(function () {
  "use strict";
  var NS = "http://www.w3.org/2000/svg";
  var R = window.RESUME;

  // col/row place the node on the desktop grid (5 columns x 7 rows); DOM order = flow order (mobile list).
  R.cm2 = {
    nodes: [
      { id: "AO", col: 1, row: 2, kind: "doc", name: { en: "Application Orders", es: "Órdenes de aplicación" },
        d: { en: "Orders that put released information to work: building, buying, operating, or maintaining the product.", es: "Órdenes que ponen en uso la información liberada: fabricar, comprar, operar o mantener el producto." } },
      { id: "RES", col: 3, row: 3, kind: "result", code: "▸", name: { en: "Results: As-Built / As-Maintained", es: "Resultados: As-Built / As-Maintained" }, via: { en: "Execution", es: "Ejecución" },
        d: { en: "Execution produces as-built and as-maintained results; when they differ from what was planned, that gap feeds the change loop.", es: "La ejecución genera resultados as-built y as-maintained; cuando difieren de lo planeado, esa diferencia alimenta el ciclo de cambio." } },
      { id: "IR", col: 1, row: 3, kind: "doc", name: { en: "Investigation Request", es: "Solicitud de investigación" },
        d: { en: "Raised when a problem or opportunity needs investigating before a change can be requested.", es: "Se levanta cuando un problema u oportunidad debe investigarse antes de solicitar un cambio." } },
      { id: "CR", col: 1, row: 4, kind: "doc", mine: true, name: { en: "Change Request", es: "Solicitud de cambio" }, via: { en: "Continual improvement", es: "Mejora continua" },
        d: { en: "The formal request to change released information, opened from results or from an investigation.", es: "La solicitud formal para cambiar información liberada, a partir de resultados o de una investigación." },
        work: [
          { en: "Coordinated change intake with project management and engineering teams.", es: "Coordiné la recepción de cambios con los equipos de gestión de proyectos e ingeniería." }
        ] },
      { id: "CL", col: 1, row: 5, kind: "role", name: { en: "Change Leader", es: "Change Leader (líder de cambio)" },
        d: { en: "Manages IRs and CRs through the analysis half of the process, so assessment and decisions happen at the right time.", es: "Gestiona IR y CR durante la fase de análisis, para que la evaluación y las decisiones lleguen a tiempo." } },
      { id: "ECA", col: 1, row: 6, kind: "role", name: { en: "Enterprise Change Assessment", es: "Evaluación de cambio empresarial" },
        d: { en: "Assesses the impact of the change across the enterprise and sets its track: full-track or fast-track.", es: "Evalúa el impacto del cambio en toda la empresa y define su ruta: full-track o fast-track." } },
      { id: "CRB", col: 3, row: 6, kind: "brd", name: { en: "Change Review Board", es: "Change Review Board (comité de revisión)" }, via: { en: "Full-track · ~20%", es: "Full-track · ~20%" }, tag: { en: "Business decision", es: "Decisión de negocio" },
        d: { en: "Makes the business decision on full-track changes.", es: "Toma la decisión de negocio sobre los cambios full-track." } },
      { id: "CIL", col: 4, row: 6, kind: "role", name: { en: "Change Implementation Leader", es: "Change Implementation Leader (líder de implementación)" },
        d: { en: "Uses Change Notices to manage the implementation of approved changes and leads the CIB.", es: "Usa los Change Notices para gestionar la implementación de los cambios aprobados y dirige el CIB." } },
      { id: "CU", col: 3, row: 7, kind: "role", code: "C&U", name: { en: "Creator & User", es: "Creador y usuario" }, via: { en: "Fast-track · ~80%", es: "Fast-track · ~80%" },
        d: { en: "On fast-track changes, the dataset's creator and its user work the change directly, without a board review.", es: "En los cambios fast-track, el creador del dataset y su usuario atienden el cambio directamente, sin revisión de comité." } },
      { id: "CUP", col: 4, row: 7, kind: "doc", code: "PLAN", name: { en: "Implementation plan", es: "Plan de implementación" },
        d: { en: "Creator and user agree on the implementation plan for the fast-track change.", es: "Creador y usuario acuerdan el plan de implementación del cambio fast-track." } },
      { id: "CN", col: 5, row: 5, kind: "doc", mine: true, name: { en: "Change Notice", es: "Change Notice (aviso de cambio)" },
        d: { en: "Authorizes and documents the implementation work for an approved change.", es: "Autoriza y documenta el trabajo de implementación de un cambio aprobado." },
        work: [
          { en: "Processed 30–35 change notices per month within a 2-day turnaround, in Windchill and SAP S/4HANA.", es: "Procesé de 30 a 35 change notices al mes con un ciclo de respuesta de 2 días, en Windchill y SAP S/4HANA." },
          { en: "Reviewed engineering documents, BOMs, and mechanical and software change packages.", es: "Revisé documentos de ingeniería, BOMs y paquetes de cambios mecánicos y de software." },
          { en: "Coordinated SME reviews, approval routing, and implementation documentation.", es: "Coordiné revisiones con SMEs, el ruteo de aprobaciones y la documentación de implementación." }
        ] },
      { id: "CIB", col: 5, row: 4, kind: "brd", name: { en: "Change Implementation Board", es: "Change Implementation Board (comité de implementación)" },
        d: { en: "Cross-functional board that plans the implementation, its effectivity, and the capacity and priorities behind it.", es: "Comité multifuncional que planea la implementación, su efectividad y la capacidad y prioridades que la respaldan." } },
      { id: "CRT", col: 5, row: 3, kind: "role", code: "CREATORS", name: { en: "New or revised datasets", es: "Datasets nuevos o revisados" },
        d: { en: "Creators produce the new or revised datasets called for in the Change Notice.", es: "Los creadores generan los datasets nuevos o revisados que pide el Change Notice." } },
      { id: "USR", col: 5, row: 2, kind: "role", code: "USERS", name: { en: "Validation of datasets", es: "Validación de datasets" },
        d: { en: "Users validate the datasets before they are released.", es: "Los usuarios validan los datasets antes de su liberación." } },
      { id: "ARA", col: 5, row: 1, kind: "role", name: { en: "Audit & Release Analyst", es: "Audit & Release Analyst (analista de auditoría y liberación)" },
        d: { en: "Audits the change package and authorizes the release of qualified datasets.", es: "Audita el paquete de cambio y autoriza la liberación de los datasets calificados." } },
      { id: "EIR", col: 3, row: 1, kind: "repo", code: "REPO", name: { en: "Enterprise Information Repository", es: "Repositorio de información empresarial" }, via: { en: "Release", es: "Liberación" }, tag: { en: "Requirements · datasets · baselines · history", es: "Requerimientos · datasets · líneas base · historial" },
        d: { en: "One home for requirements, supporting datasets, baselines, and history.", es: "Un solo lugar para requerimientos, datasets de soporte, líneas base e historial." } },
      { id: "REF", col: 1, row: 1, kind: "ref", code: "REF", name: { en: "Referenced datasets", es: "Datasets referenciados" },
        d: { en: "Released datasets that the next application orders reference, closing the loop.", es: "Datasets liberados que referencian las siguientes órdenes de aplicación, cerrando el ciclo." } }
    ],
    // [from, to, fromSide, toSide, route, style, labelKey(node id whose "via" labels the edge)]
    edges: [
      ["REF", "AO", "b", "t", "v"],
      ["AO", "RES", "r", "t", "hv", "", "RES"],
      ["RES", "IR", "l", "r", "h", "dash"],
      ["RES", "CR", "b", "r", "vh", "", "CR"],
      ["IR", "CR", "b", "t", "v", "dot"],
      ["CR", "CL", "b", "t", "v"],
      ["CL", "ECA", "b", "t", "v"],
      ["ECA", "CRB", "r", "l", "h", "", "CRB"],
      ["ECA", "CU", "b", "l", "vh", "fast", "CU"],
      ["CRB", "CIL", "r", "l", "h"],
      ["CU", "CUP", "r", "l", "h", "fast"],
      ["CIL", "CN", "r", "b", "hv"],
      ["CUP", "CN", "r", "b", "hv", "fast"],
      ["CN", "CIB", "t", "b", "v"],
      ["CIB", "CRT", "t", "b", "v"],
      ["CRT", "USR", "t", "b", "v"],
      ["USR", "ARA", "t", "b", "v"],
      ["ARA", "EIR", "l", "r", "h", "", "EIR"],
      ["EIR", "REF", "l", "r", "h"]
    ]
  };

  var add = function (lang, obj) { for (var k in obj) window.I18N[lang][k] = obj[k]; };
  add("en", {
    "nav.cm2": "CM2",
    "cm.kicker": "Change control · CM2",
    "cm.title": "How change actually gets controlled",
    "cm.lede": "CM2 is the closed-loop change and configuration management process from the Institute for Process Excellence (IpX). As a Configuration Analyst at Bose, I governed engineering Change Notices under CM2 principles, and I hold the CM2-Core certification (IpX × Fort Hays State University, Oct 2025). Below, the process redrawn; select any step for a one-line explanation.",
    "cm.pmK": "PMI process groups",
    "cm.pm1": "Initiating", "cm.pm2": "Planning", "cm.pm3": "Executing", "cm.pm4": "Monitoring & Controlling", "cm.pm5": "Closing",
    "cm.pmNote": "In PMBOK terms, this is Perform Integrated Change Control; CM2 is how that change control is run in practice.",
    "cm.pmTrain": "35 contact hours of PMP® exam-prep training · Oct 2026",
    "cm.flowK": "CM2 closed-loop change process",
    "cm.mine": "My work",
    "cm.mineLegend": "Steps I worked in as Configuration Analyst",
    "cm.fastLegend": "Fast-track path",
    "cm.select": "Select a step",
    "cm.step": "Step",
    "cm.myWork": "What I did here",
    "cm.loop": "Back to Application Orders",
    "cm.role": "Configuration Analyst · Bose Automotive / Luxshare-ICT · Dec 2024 – Oct 2025",
    "cm.f1": "change notices per month", "cm.f2": "day turnaround", "cm.f3": "Windchill · SAP S/4HANA", "cm.f4": "Change Notices governed under CM2 principles",
    "cm.ops": "I also set up how the role operates: governance, a SIPOC, approval workflows, and onboarding documentation.",
    "cm.src": "Diagram redrawn for this site from the IpX CM2 closed-loop change process; track percentages are approximate, as in the reference.",
    "cm.aria": "CM2 change process diagram",
    "cm.credK": "Verified credential",
    "cm.cred": "CM2-Core Certified · IpX × Fort Hays State University · Oct 2025"
  });
  add("es", {
    "nav.cm2": "CM2",
    "cm.kicker": "Control de cambios · CM2",
    "cm.title": "Cómo se controla un cambio en la práctica",
    "cm.lede": "CM2 es el proceso de ciclo cerrado para gestión de cambios y configuración del Institute for Process Excellence (IpX). Como Configuration Analyst en Bose, gestioné los Change Notices de ingeniería bajo principios CM2, y cuento con la certificación CM2-Core (IpX × Fort Hays State University, oct 2025). Abajo, el proceso redibujado; elige cualquier paso para ver una explicación breve.",
    "cm.pmK": "Grupos de procesos del PMI",
    "cm.pm1": "Inicio", "cm.pm2": "Planificación", "cm.pm3": "Ejecución", "cm.pm4": "Monitoreo y control", "cm.pm5": "Cierre",
    "cm.pmNote": "En términos del PMBOK, esto es Realizar el Control Integrado de Cambios; CM2 es la forma de llevar ese control de cambios a la práctica.",
    "cm.pmTrain": "35 horas de contacto de preparación para el examen PMP® · oct 2026",
    "cm.flowK": "Proceso de cambio de ciclo cerrado CM2",
    "cm.mine": "Mi trabajo",
    "cm.mineLegend": "Pasos en los que trabajé como Configuration Analyst",
    "cm.fastLegend": "Ruta fast-track",
    "cm.select": "Elige un paso",
    "cm.step": "Paso",
    "cm.myWork": "Lo que hice aquí",
    "cm.loop": "De vuelta a órdenes de aplicación",
    "cm.role": "Configuration Analyst · Bose Automotive / Luxshare-ICT · dic 2024 – oct 2025",
    "cm.f1": "change notices al mes", "cm.f2": "días de ciclo de respuesta", "cm.f3": "Windchill · SAP S/4HANA", "cm.f4": "Change Notices gestionados bajo principios CM2",
    "cm.ops": "También definí cómo opera el rol: gobernanza, un SIPOC, flujos de aprobación y documentación de onboarding.",
    "cm.src": "Diagrama redibujado para este sitio a partir del proceso de cambio de ciclo cerrado CM2 de IpX; los porcentajes de cada ruta son aproximados, como en la referencia.",
    "cm.aria": "Diagrama del proceso de cambios CM2",
    "cm.credK": "Credencial verificada",
    "cm.cred": "Certificación CM2-Core · IpX × Fort Hays State University · oct 2025"
  });

  var byId = {};
  R.cm2.nodes.forEach(function (n) { byId[n.id] = n; });
  var st = { sel: "CN", hover: null, api: null };

  function nodeHTML(n, i, api) {
    var L = api.lang, esc = api.esc, t = api.t;
    var code = n.code || n.id;
    return '<li class="cm-cell" style="grid-column:' + n.col + ";grid-row:" + n.row + '">' +
      (n.via ? '<p class="cm-via" aria-hidden="true">↓ ' + esc(n.via[L]) + "</p>" : "") +
      '<button type="button" class="cm-node cm-' + n.kind + (n.mine ? " is-mine" : "") + '" data-cm="' + n.id + '" aria-pressed="' + (st.sel === n.id) + '" aria-controls="cm-panel" style="--i:' + i + '">' +
      '<span class="cm-code">' + esc(code) + "</span>" +
      '<span class="cm-name">' + esc(n.name[L]) + "</span>" +
      (n.tag ? '<span class="cm-tag">' + esc(n.tag[L]) + "</span>" : "") +
      (n.mine ? '<span class="cm-mine"><span aria-hidden="true">DV</span><span class="sr-only">' + esc(t("cm.mine")) + "</span></span>" : "") +
      "</button>" +
      '<div class="cm-inline"><p class="cm-desc">' + esc(n.d[L]) + "</p>" +
      (n.work ? '<ul class="cm-p-work">' + n.work.map(function (w) { return "<li>" + esc(w[L]) + "</li>"; }).join("") + "</ul>" : "") + "</div>" +
      "</li>";
  }

  window.ResumeExtras = window.ResumeExtras || {};
  window.ResumeExtras.cm2 = function (el, api) {
    st.api = api;
    var t = api.t, esc = api.esc;
    var pm = [1, 2, 3, 4, 5].map(function (k) {
      return '<li class="cm-pg' + (k === 4 ? " is-on" : "") + '"' + (k === 4 ? ' aria-current="true"' : "") + '><span class="cm-pg-n">0' + k + '</span><span>' + esc(t("cm.pm" + k)) + "</span></li>";
    }).join("");
    el.innerHTML =
      '<div class="cm-pm"><p class="cm-k">' + esc(t("cm.pmK")) + '</p><ol class="cm-pgs">' + pm + '</ol><p class="cm-pm-note"><span class="cm-pm-arrow" aria-hidden="true">↳</span>' + esc(t("cm.pmNote")) + '</p><p class="cm-pm-train">' + esc(t("cm.pmTrain")) + "</p></div>" +
      '<div class="cm-board">' +
        '<div class="cm-flow-wrap"><div class="cm-flow-head"><p class="cm-k">' + esc(t("cm.flowK")) + '</p><ul class="cm-legend" aria-hidden="true"><li><i class="lg-mine">DV</i>' + esc(t("cm.mineLegend")) + '</li><li><i class="lg-fast"></i>' + esc(t("cm.fastLegend")) + "</li></ul></div>" +
        '<div class="cm-stage" role="group" aria-label="' + esc(t("cm.aria")) + '"><svg class="cm-svg" aria-hidden="true" focusable="false"><defs><marker id="cm-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,1 L9,5 L0,9 z" class="cm-arr"/></marker><marker id="cm-arr-f" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,1 L9,5 L0,9 z" class="cm-arr-f"/></marker></defs></svg>' +
          '<ol class="cm-grid">' + R.cm2.nodes.map(function (n, i) { return nodeHTML(n, i, api); }).join("") + "</ol>" +
          '<p class="cm-loop-m" aria-hidden="true">↺ ' + esc(t("cm.loop")) + "</p>" +
        "</div></div>" +
        '<aside class="cm-side"><div class="cm-panel" id="cm-panel" aria-live="polite"></div>' +
          '<div class="cm-cred"><span class="cm-cred-seal" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 2.5l2.3 1.7 2.8-.1.9 2.7 2.3 1.6-.9 2.7.9 2.7-2.3 1.6-.9 2.7-2.8-.1L12 19.5l-2.3-1.7-2.8.1-.9-2.7-2.3-1.6.9-2.7-.9-2.7 2.3-1.6.9-2.7 2.8.1z"/><path d="M8.6 11.2l2.3 2.2 4.5-4.6"/></svg></span><div><p class="cm-cred-k">' + esc(t("cm.credK")) + '</p><p class="cm-cred-t">' + esc(t("cm.cred")) + "</p></div></div>" +
          '<div class="cm-facts"><p class="cm-k">' + esc(t("cm.role")) + '</p><ul>' +
            '<li><b>30–35</b><span>' + esc(t("cm.f1")) + '</span></li><li><b>2</b><span>' + esc(t("cm.f2")) + '</span></li>' +
            '<li class="w"><span>' + esc(t("cm.f3")) + '</span></li><li class="w"><span>' + esc(t("cm.f4")) + "</span></li></ul>" +
            '<p class="cm-ops">' + esc(t("cm.ops")) + "</p></div>" +
        "</aside>" +
      "</div>" +
      '<p class="cm-src">' + esc(t("cm.src")) + "</p>";
    paint();
    schedule();
  };

  function paint() {
    var host = document.querySelector('[data-render="cm2"]');
    if (!host || !st.api) return;
    var api = st.api, L = api.lang, t = api.t, esc = api.esc;
    var id = st.hover || st.sel, n = byId[id];
    host.querySelectorAll(".cm-node").forEach(function (b) {
      var me = b.getAttribute("data-cm");
      b.classList.toggle("is-active", me === id);
      b.setAttribute("aria-pressed", String(me === st.sel));
    });
    host.querySelectorAll(".cm-edge").forEach(function (p) {
      p.classList.toggle("on", p.getAttribute("data-a") === id || p.getAttribute("data-b") === id);
    });
    var panel = host.querySelector(".cm-panel");
    panel.innerHTML =
      '<p class="cm-p-code">' + esc(t("cm.step")) + " · " + esc(n.code && n.code.length > 1 && n.code !== "▸" ? n.code : n.id) + (n.mine ? ' <span class="cm-p-mine">' + esc(t("cm.mine")) + "</span>" : "") + "</p>" +
      '<h3 class="cm-p-title">' + esc(n.name[L]) + "</h3>" +
      '<p class="cm-p-d">' + esc(n.d[L]) + "</p>" +
      (n.work ? '<p class="cm-p-k">' + esc(t("cm.myWork")) + '</p><ul class="cm-p-work">' + n.work.map(function (w) { return "<li>" + esc(w[L]) + "</li>"; }).join("") + "</ul>" : "");
  }

  function anchor(r, side, br) {
    var x = r.left - br.left, y = r.top - br.top;
    if (side === "t") return [x + r.width / 2, y];
    if (side === "b") return [x + r.width / 2, y + r.height];
    if (side === "l") return [x, y + r.height / 2];
    return [x + r.width, y + r.height / 2];
  }

  function draw() {
    var host = document.querySelector('[data-render="cm2"]');
    if (!host) return;
    var stage = host.querySelector(".cm-stage"), svg = host.querySelector(".cm-svg");
    if (!stage || !svg) return;
    Array.prototype.slice.call(svg.querySelectorAll(".cm-edge, .cm-elabel")).forEach(function (p) { p.remove(); });
    if (!window.matchMedia("(min-width: 1001px)").matches) return;
    var br = stage.getBoundingClientRect();
    svg.setAttribute("viewBox", "0 0 " + br.width + " " + br.height);
    var rect = {};
    host.querySelectorAll(".cm-node").forEach(function (b) { rect[b.getAttribute("data-cm")] = b.getBoundingClientRect(); });
    R.cm2.edges.forEach(function (e) {
      var a = anchor(rect[e[0]], e[2], br), b = anchor(rect[e[1]], e[3], br), d;
      if (e[4] === "v" || e[4] === "h") {
        // straight; align on the shared axis
        if (e[4] === "v") { b[0] = a[0]; }
        else { b[1] = a[1]; }
        d = "M" + a[0] + "," + a[1] + " L" + b[0] + "," + b[1];
      } else if (e[4] === "hv") {
        d = "M" + a[0] + "," + a[1] + " L" + b[0] + "," + a[1] + " L" + b[0] + "," + b[1];
      } else {
        d = "M" + a[0] + "," + a[1] + " L" + a[0] + "," + b[1] + " L" + b[0] + "," + b[1];
      }
      var p = document.createElementNS(NS, "path");
      p.setAttribute("d", d);
      p.setAttribute("class", "cm-edge" + (e[5] ? " " + e[5] : ""));
      p.setAttribute("data-a", e[0]); p.setAttribute("data-b", e[1]);
      p.setAttribute("marker-end", e[5] === "fast" ? "url(#cm-arr-f)" : "url(#cm-arr)");
      svg.appendChild(p);
      if (e[6] && byId[e[6]].via) {
        var lx, ly, anchorT = "middle";
        if (e[4] === "h") { lx = (a[0] + b[0]) / 2; ly = a[1] - 8; }
        else if (e[4] === "hv") { lx = (a[0] + b[0]) / 2; ly = a[1] - 8; }
        else { lx = (a[0] + b[0]) / 2; ly = b[1] - 8; }
        if (e[0] === "ECA" && e[1] === "CU") { lx = a[0] + 12; ly = (a[1] + b[1]) / 2 + 4; anchorT = "start"; }
        var tx = document.createElementNS(NS, "text");
        tx.setAttribute("x", lx); tx.setAttribute("y", ly);
        tx.setAttribute("text-anchor", anchorT);
        tx.setAttribute("class", "cm-elabel" + (e[5] ? " " + e[5] : ""));
        tx.textContent = byId[e[6]].via[st.api.lang];
        svg.appendChild(tx);
      }
    });
  }
  var raf = null;
  function schedule() { if (raf) cancelAnimationFrame(raf); raf = requestAnimationFrame(function () { raf = null; draw(); }); }
  window.addEventListener("resize", schedule);
  window.addEventListener("load", schedule);
  document.addEventListener("resume:render", schedule);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(schedule);
  if ("ResizeObserver" in window) {
    var ro = new ResizeObserver(schedule);
    document.addEventListener("resume:render", function () { var s = document.querySelector(".cm-stage"); if (s) ro.observe(s); });
  }

  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest(".cm-node");
    if (!b) return;
    st.sel = b.getAttribute("data-cm"); st.hover = null; paint();
  });
  document.addEventListener("mouseover", function (e) {
    var b = e.target.closest && e.target.closest(".cm-node");
    var id = b ? b.getAttribute("data-cm") : null;
    if (!b && !(e.target.closest && e.target.closest(".cm-stage"))) id = null;
    if (id !== st.hover) { st.hover = id; paint(); }
  });
  document.addEventListener("focusin", function (e) {
    var b = e.target.closest && e.target.closest(".cm-node");
    if (b) { st.hover = b.getAttribute("data-cm"); paint(); }
  });
  document.addEventListener("focusout", function (e) {
    if (e.target.closest && e.target.closest(".cm-node") && st.hover) { st.hover = null; paint(); }
  });
})();
