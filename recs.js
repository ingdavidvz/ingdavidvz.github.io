/* Recommendations. Each quote is shown in the page language:
   Matthew wrote in English (typos corrected at David's request), Alejandro in Spanish;
   the other-language versions are faithful translations. */
(function () {
  window.RESUME = window.RESUME || {};
  window.RESUME.recs = [
    {
      id: "REC-01",
      name: "Matthew Malczyk",
      url: "https://www.linkedin.com/in/matthew-malczyk-98698630/",
      headline: "Sr. Systems Engineer (DO178, MIL, ASPICE), Requirements & Architecture Tooling Expert",
      date: "2026-04-16",
      rel: {
        en: "Matthew was senior to David but didn't manage David directly",
        es: "Matthew tenía un puesto de mayor nivel que David, pero no lo supervisaba directamente"
      },
      context: { en: "Bose Automotive Systems Division", es: "Bose Automotive Systems Division" },
      orig: "en",
      text: {
        en: "David was fantastic to work with during my time at Bose in the Automotive System Division. David supported multiple global programs as a Requirements Engineer, providing expertise in RM using Jama to several program teams. He led requirements development, organized peer reviews, gathered/processed metrics, and supported a core committee whose charter was to improve our overall Requirements Methodology. He is an effective communicator, a responsible team leader, and an experienced engineer in Systems & Software development processes (e.g. ASPICE). I'd love to work with David again and strongly recommend for any requirements, tooling, or process-based role.",
        es: "Fue fantástico trabajar con David durante mi tiempo en Bose, en la Automotive System Division. David apoyó múltiples programas globales como Requirements Engineer, aportando su experiencia en gestión de requerimientos (RM) con Jama a varios equipos de programa. Lideró el desarrollo de requerimientos, organizó revisiones entre pares, recopiló y procesó métricas, y apoyó a un comité central cuyo propósito era mejorar nuestra metodología general de requerimientos. Es un comunicador efectivo, un líder de equipo responsable y un ingeniero con experiencia en procesos de desarrollo de sistemas y software (p. ej., ASPICE). Me encantaría volver a trabajar con David y lo recomiendo ampliamente para cualquier puesto de requerimientos, herramientas o procesos."
      },
      pull: { en: "strongly recommend for any requirements, tooling, or process-based role", es: "lo recomiendo ampliamente para cualquier puesto de requerimientos, herramientas o procesos" }
    },
    {
      id: "REC-02",
      name: "Alejandro Romero",
      url: "https://www.linkedin.com/in/alejandro-romero-navarro-26861a28b/",
      headline: "Leader Network Engineer with experience on Dell, Cisco, Aruba, Fortinet & Sophos Technology",
      date: "2023-11-24",
      rel: { en: "Alejandro was David's mentor", es: "Alejandro fue mentor de David" },
      orig: "es",
      text: {
        es: "David ha demostrado ser capaz de lograr y adaptarse a la industria que más requiera de sus conocimientos. He sido testigo de su curiosidad y de su rápido aprendizaje, así como de sus habilidades ingenieriles y lingüísticas, las cuales le permiten ejecutar conversaciones con diferentes clientes/ejecutivos sin tener la barrera del lenguaje de por medio. ¡No se arrepentirán de incluirlo en su equipo!",
        en: "David has shown that he is able to succeed in and adapt to whichever industry most needs his knowledge. I have witnessed his curiosity and his fast learning, as well as his engineering and language skills, which allow him to hold conversations with different clients/executives without a language barrier getting in the way. You won't regret including him on your team!"
      },
      pull: { es: "¡No se arrepentirán de incluirlo en su equipo!", en: "You won't regret including him on your team!" }
    }
  ];

  var add = function (lang, obj) { for (var k in obj) window.I18N[lang][k] = obj[k]; };
  add("en", {
    "nav.recs": "Recommendations",
    "rc.kicker": "Recommendations",
    "rc.title": "Reviewed and signed off",
    "rc.lede": "Two recommendations from people I have worked and learned with. Each record lists the reviewer, their relationship to me, and the date it was written.",
    "rc.record": "Review record",
    "rc.stamp": "Signed off",
    "rc.reviewer": "Reviewer",
    "rc.headline": "Headline",
    "rc.relationship": "Relationship",
    "rc.context": "Context",
    "rc.date": "Date",
    "rc.profile": "LinkedIn profile, opens in a new tab",
    "rc.aboutLink": "2 recommendations on record",
    "rc.verbatim": "Recommendations appear in the language of the page."
  });
  add("es", {
    "nav.recs": "Recomendaciones",
    "rc.kicker": "Recomendaciones",
    "rc.title": "Revisado y aprobado",
    "rc.lede": "Dos recomendaciones de personas con las que he trabajado y aprendido. Cada registro indica quién la escribió, su relación conmigo y la fecha.",
    "rc.record": "Registro de revisión",
    "rc.stamp": "Aprobado",
    "rc.reviewer": "Revisor",
    "rc.headline": "Titular",
    "rc.relationship": "Relación",
    "rc.context": "Contexto",
    "rc.date": "Fecha",
    "rc.profile": "Perfil de LinkedIn, se abre en una pestaña nueva",
    "rc.aboutLink": "2 recomendaciones registradas",
    "rc.verbatim": "Las recomendaciones se muestran en el idioma de la página."
  });

  var MONTHS = {
    en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    es: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
  };
  function fmtDate(iso, L) {
    var p = iso.split("-"), m = MONTHS[L][+p[1] - 1], d = +p[2];
    return L === "es" ? d + " de " + m + " de " + p[0] : m.charAt(0).toUpperCase() + m.slice(1) + " " + d + ", " + p[0];
  }

  function quoteHTML(r, sl, esc) {
    var txt = r.text[sl], ph = r.pull[sl], i = txt.indexOf(ph);
    if (i < 0) return esc(txt);
    return esc(txt.slice(0, i)) + '<mark class="rc-hl">' + esc(ph) + "</mark>" + esc(txt.slice(i + ph.length));
  }

  function card(r, n, api) {
    var L = api.lang, t = api.t, esc = api.esc;
    var rows =
      '<div class="rc-cell rc-c-name"><dt>' + esc(t("rc.reviewer")) + '</dt><dd><a href="' + esc(r.url) + '" target="_blank" rel="noopener" id="rc-name-' + n + '">' + esc(r.name) +
        '<span class="sr-only"> (' + esc(t("rc.profile")) + ')</span><span class="rc-ext" aria-hidden="true">↗</span></a></dd></div>' +
      '<div class="rc-cell rc-c-date"><dt>' + esc(t("rc.date")) + '</dt><dd><time datetime="' + r.date + '">' + esc(fmtDate(r.date, L)) + "</time></dd></div>" +
      '<div class="rc-cell rc-c-head"><dt>' + esc(t("rc.headline")) + '</dt><dd lang="en">' + esc(r.headline) + "</dd></div>" +
      '<div class="rc-cell rc-c-rel"><dt>' + esc(t("rc.relationship")) + "</dt><dd>" + esc(r.rel[L]) +
        (r.context ? '<span class="rc-ctx">' + esc(t("rc.context")) + ": " + esc(r.context[L]) + "</span>" : "") + "</dd></div>";
    return '<li class="rc-card reveal" style="--i:' + n + '"><article aria-labelledby="rc-name-' + n + '">' +
      '<header class="rc-strip"><span class="rc-id">' + esc(r.id) + '</span><span class="rc-type">' + esc(t("rc.record")) + '</span>' +
        '<span class="rc-stamp"><svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M3 8.5l3.2 3L13 4.5"/></svg>' + esc(t("rc.stamp")) + "</span></header>" +
      '<p class="rc-pull" aria-hidden="true">' + esc(r.pull[L]) + "</p>" +
      '<blockquote class="rc-quote"><p>' + quoteHTML(r, L, esc) + "</p></blockquote>" +
      '<dl class="rc-block">' + rows + "</dl>" +
      "</article></li>";
  }

  window.ResumeExtras = window.ResumeExtras || {};
  window.ResumeExtras.recs = function (el, api) {
    el.innerHTML = window.RESUME.recs.map(function (r, i) { return card(r, i + 1, api); }).join("");
  };
})();
