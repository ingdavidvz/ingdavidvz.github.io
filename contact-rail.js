/* Persistent contact access: a fixed right-edge rail on desktop (>=1100px) and a
   floating "Contact" button that expands on tablet/mobile. Shown after the hero,
   hidden while the Contact section itself is on screen. */
(function () {
  var T = window.I18N = window.I18N || {};
  function add(l, o) { T[l] = T[l] || {}; for (var k in o) T[l][k] = o[k]; }
  add("en", { "cr.aria": "Quick contact", "cr.label": "Let's talk", "cr.email": "Email", "cr.phone": "Phone",
    "cr.linkedin": "LinkedIn", "cr.pdf": "Download PDF", "cr.pdfV": "Resume · PDF", "cr.copy": "Copy",
    "cr.copyEmail": "Copy email address", "cr.copied": "Copied", "cr.fab": "Contact", "cr.close": "Close contact options" });
  add("es", { "cr.aria": "Contacto rápido", "cr.label": "Hablemos", "cr.email": "Correo", "cr.phone": "Teléfono",
    "cr.linkedin": "LinkedIn", "cr.pdf": "Descargar PDF", "cr.pdfV": "Currículum · PDF", "cr.copy": "Copiar",
    "cr.copyEmail": "Copiar correo", "cr.copied": "Copiado", "cr.fab": "Contacto", "cr.close": "Cerrar opciones de contacto" });

  var EMAIL = "ing.david.vz@gmail.com", PHONE = "+52 664 427 7191", TEL = "tel:+526644277191",
      LI = "https://www.linkedin.com/in/david-vazquez-sandoval-125633194/", LIV = "linkedin.com/in/david-vazquez-sandoval-125633194";
  var I = {
    email: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5.5" width="18" height="13" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M3.5 6.5l8.5 6.5 8.5-6.5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
    phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 3.5h3l1.5 4.2-2 1.3a11 11 0 0 0 5.9 5.9l1.3-2 4.2 1.5v3a2 2 0 0 1-2.1 2A16.5 16.5 0 0 1 4.6 5.6a2 2 0 0 1 2-2.1z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 10.5V16M8 7.6v.2M11.5 16v-5.5M11.5 13c0-1.6 1-2.6 2.3-2.6s2.2.9 2.2 2.6V16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    pdf: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5v11M7.5 10l4.5 4.5 4.5-4.5M4.5 19.5h15" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
    copy: '<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="5" y="5" width="8.5" height="8.5" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M3 10.5V2.5h8" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>',
    chat: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H9l-4 3.5V16H4z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>'
  };
  var ITEMS = [
    { k: "email", href: "mailto:" + EMAIL, v: EMAIL, copy: true },
    { k: "phone", href: TEL, v: PHONE },
    { k: "linkedin", href: LI, v: LIV, ext: true },
    { k: "pdf", href: "resume.pdf", dl: true, vKey: "cr.pdfV" }
  ];
  function attrs(it) {
    return 'href="' + it.href + '"' + (it.ext ? ' target="_blank" rel="noopener"' : "") + (it.dl ? ' download="David-Vazquez-Resume.pdf"' : "");
  }
  function val(it) { return it.vKey ? '<span data-i18n="' + it.vKey + '"></span>' : it.v; }
  function copyBtn(cls) {
    return '<button type="button" class="' + cls + '" data-cr-copy data-i18n-attr="aria-label:cr.copyEmail;title:cr.copyEmail">' + I.copy + '<span data-cr-copy-txt data-i18n="cr.copy"></span></button>';
  }

  var rail = document.createElement("aside");
  rail.className = "crail"; rail.setAttribute("data-i18n-attr", "aria-label:cr.aria");
  rail.innerHTML = '<span class="crail-label" aria-hidden="true" data-i18n="cr.label"></span><ul class="crail-list">' +
    ITEMS.map(function (it) {
      return '<li class="crail-item"><a class="crail-btn" ' + attrs(it) + ' aria-describedby="crtip-' + it.k + '">' + I[it.k] +
        '<span class="sr-only" data-i18n="cr.' + it.k + '"></span></a>' +
        '<div class="crail-tip" id="crtip-' + it.k + '" role="tooltip"><span class="crail-tip-k" data-i18n="cr.' + it.k + '"></span>' +
        '<span class="crail-tip-v">' + val(it) + '</span>' + (it.copy ? copyBtn("crail-copy") : "") + '</div></li>';
    }).join("") + "</ul>";

  var fab = document.createElement("div");
  fab.className = "cfab";
  fab.innerHTML = '<div class="cfab-menu" id="cfab-menu" hidden><ul>' + ITEMS.map(function (it) {
      return '<li><a class="cfab-link" ' + attrs(it) + '>' + I[it.k] + '<span class="cfab-txt"><span class="cfab-k" data-i18n="cr.' + it.k + '"></span><span class="cfab-v">' + val(it) + '</span></span></a>' +
        (it.copy ? copyBtn("cfab-copy") : "") + "</li>";
    }).join("") + '</ul></div>' +
    '<button type="button" class="cfab-btn" aria-expanded="false" aria-controls="cfab-menu">' + I.chat + '<span data-i18n="cr.fab"></span></button>';

  document.body.appendChild(rail);
  document.body.appendChild(fab);

  var t = function (k) { var l = document.documentElement.lang === "es" ? "es" : "en"; return (T[l] && T[l][k]) || k; };

  // copy-to-clipboard (with a fallback for non-secure contexts)
  function copyText(s) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(s);
    return new Promise(function (res, rej) {
      var ta = document.createElement("textarea"); ta.value = s; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy") ? res() : rej(); } catch (e) { rej(e); } document.body.removeChild(ta);
    });
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-cr-copy]");
    if (!b) return;
    e.preventDefault();
    copyText(EMAIL).then(function () {
      var txt = b.querySelector("[data-cr-copy-txt]");
      b.classList.add("ok"); txt.textContent = t("cr.copied");
      clearTimeout(b._t); b._t = setTimeout(function () { b.classList.remove("ok"); txt.textContent = t("cr.copy"); }, 1600);
    }, function () {});
  });

  // floating button
  var fbtn = fab.querySelector(".cfab-btn"), menu = fab.querySelector(".cfab-menu");
  function setOpen(o) {
    fab.classList.toggle("open", o); fbtn.setAttribute("aria-expanded", String(o));
    menu.hidden = !o; fbtn.setAttribute("aria-label", o ? t("cr.close") : t("cr.fab"));
  }
  fbtn.addEventListener("click", function () { setOpen(!fab.classList.contains("open")); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && fab.classList.contains("open")) { setOpen(false); fbtn.focus(); } });
  document.addEventListener("click", function (e) { if (fab.classList.contains("open") && !fab.contains(e.target)) setOpen(false); });
  menu.addEventListener("click", function (e) { if (e.target.closest(".cfab-link")) setOpen(false); });
  document.addEventListener("resume:render", function () { if (!fab.classList.contains("open")) fbtn.removeAttribute("aria-label"); });

  // visibility: after the hero, hidden while #contact is on screen
  var hero = document.querySelector(".hero"), contact = document.getElementById("contact"), ticking = false;
  function update() {
    ticking = false;
    var vh = window.innerHeight;
    var pastHero = hero ? hero.getBoundingClientRect().bottom < vh * 0.35 : window.scrollY > 400;
    var atContact = contact ? contact.getBoundingClientRect().top < vh * 0.8 : false;
    var show = pastHero && !atContact;
    document.documentElement.classList.toggle("cr-show", show);
    rail.setAttribute("aria-hidden", String(!show)); rail.inert = !show;
    fab.inert = !show;
    if (!show && fab.classList.contains("open")) setOpen(false);
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
})();
