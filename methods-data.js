/* Data for the "methods" components (V-Model, Gantt, DFMEA, soft skills).
   Every statement is drawn from David Vazquez's resume. */
(function () {
  var R = window.RESUME;
  R.vmodel = {
    // x/y are percentages of the stage (viewBox 1000 x 460); lvl drives the mobile stacked "V" indentation
    phases: [
      { id: "P1", side: "left", x: 11, y: 12, lvl: 0, code: "SYS1 · SYS2",
        name: { en: "Stakeholder & system requirements", es: "Requerimientos de stakeholders y de sistema" },
        ev: [
          { exp: "EXP-01", en: "Owned system-level requirements governance across 2 core automotive projects and supported 6+ additional programs (ASPICE, V-Model).", es: "Gobernanza de requerimientos a nivel sistema en 2 proyectos automotrices clave y soporte a más de 6 programas adicionales (ASPICE, Modelo V)." },
          { exp: "EXP-01", en: "Managed customer specification imports in Jama Connect, SME reviews, and approval and rejection workflows.", es: "Importación de especificaciones del cliente en Jama Connect, revisiones con SMEs y flujos de aprobación y rechazo." },
          { exp: "EXP-01", en: "Owned the ACE process (Assumptions, Clarifications, Exceptions) with discipline SMEs and client counterparts.", es: "Responsable del proceso ACE (Assumptions, Clarifications, Exceptions) con SMEs de cada disciplina y contrapartes del cliente." },
          { exp: "EXP-04", en: "Define product scope and prioritize features for Bookroom.", es: "Defino el alcance del producto y priorizo funcionalidades en Bookroom." }
        ] },
      { id: "P2", side: "left", x: 22, y: 35.9, lvl: 1, code: "SYS3",
        name: { en: "System architectural design", es: "Diseño de arquitectura del sistema" },
        ev: [
          { exp: "EXP-03", en: "Translated engineering workflows into data models, traceability structures, and governance processes for 15+ clients.", es: "Traducción de flujos de ingeniería a modelos de datos, estructuras de trazabilidad y procesos de gobernanza para más de 15 clientes." }
        ] },
      { id: "P3", side: "left", x: 33, y: 59.8, lvl: 2, code: "SWE1 · SWE2",
        name: { en: "Software requirements", es: "Requerimientos de software" },
        ev: [
          { exp: "EXP-01", en: "Designed ASPICE-aligned dashboards with the Jama Connect API and Power BI across SYS1, SYS2, SWE1, SWE2, and test phases.", es: "Dashboards alineados a ASPICE con la API de Jama Connect y Power BI para SYS1, SYS2, SWE1, SWE2 y pruebas." },
          { exp: "EXP-04", en: "Translate beta feedback and usability issues into prioritized product improvements.", es: "Convierto la retroalimentación beta y los problemas de usabilidad en mejoras priorizadas del producto." }
        ] },
      { id: "P4", side: "bottom", x: 50, y: 85.9, lvl: 3, code: "BUILD",
        name: { en: "Implementation", es: "Implementación" },
        ev: [
          { exp: "EXP-04", en: "AI-assisted implementation and bug fixes across the web application and backend API, working with PostgreSQL and Redis.", es: "Implementación y corrección de errores con desarrollo asistido por IA en la aplicación web y la API de backend, con PostgreSQL y Redis." },
          { exp: "EXP-03", en: "Built an internal API-based automation skill to create prospect-oriented demo projects.", es: "Desarrollé una skill interna de automatización basada en API para crear proyectos demo a la medida de cada prospecto." }
        ] },
      { id: "P5", side: "right", x: 67, y: 59.8, lvl: 2, code: "INT",
        name: { en: "Integration & release testing", es: "Pruebas de integración y de versión" },
        ev: [
          { exp: "EXP-03", en: "Performed release testing and platform administration.", es: "Pruebas de versiones y administración de la plataforma." },
          { exp: "EXP-04", en: "Reproduce defects and coordinate fixes and release readiness.", es: "Reproduzco defectos y coordino correcciones y la preparación de cada entrega." }
        ] },
      { id: "P6", side: "right", x: 78, y: 35.9, lvl: 1, code: "SYS TEST",
        name: { en: "System test", es: "Pruebas de sistema" },
        ev: [
          { exp: "EXP-03", en: "Black-box testing, defect reporting, and functional validation; supported risk and DFMEA workflows.", es: "Pruebas de caja negra, reporte de defectos y validación funcional; soporte a flujos de riesgo y DFMEA." },
          { exp: "EXP-04", en: "Validate scheduling, patient management, administrative, and mobile workflows.", es: "Valido los flujos de agenda, gestión de pacientes, administración y app móvil." }
        ] },
      { id: "P7", side: "right", x: 89, y: 12, lvl: 0, code: "VAL",
        name: { en: "Validation", es: "Validación" },
        ev: [
          { exp: "EXP-01", en: "Restored end-to-end traceability across 2 related programs, coordinating closure of coverage gaps through validation.", es: "Restablecí la trazabilidad de punta a punta en 2 programas relacionados, coordinando el cierre de brechas hasta la validación." },
          { exp: "EXP-04", en: "External beta testing with 5 healthcare organizations and 7 beta users.", es: "Pruebas beta externas con 5 organizaciones de salud y 7 usuarios beta." }
        ] },
      { id: "T", side: "trace", x: 50, y: 35.9, lvl: 0, code: "TRACE",
        name: { en: "Traceability across the V", es: "Trazabilidad a lo largo de la V" },
        ev: [
          { exp: "EXP-01", en: "Delivered traceability matrices and restored end-to-end traceability across 2 related automotive programs.", es: "Entregué matrices de trazabilidad y restablecí la trazabilidad de punta a punta en 2 programas automotrices relacionados." },
          { exp: "EXP-03", en: "Led migrations from Excel, IBM DOORS, Jira, and ReqIF-compatible tools for 15+ clients, preserving requirements, relationships, and traceability.", es: "Migraciones desde Excel, IBM DOORS, Jira y herramientas compatibles con ReqIF para más de 15 clientes, conservando requerimientos, relaciones y trazabilidad." },
          { exp: "EXP-03", en: "Delivered 5–12 tailored walkthroughs per month focused on traceability, impact analysis, and lifecycle management.", es: "De 5 a 12 recorridos personalizados al mes enfocados en trazabilidad, análisis de impacto y gestión del ciclo de vida." }
        ] }
    ],
    links: [["P1", "P7"], ["P2", "P6"], ["P3", "P5"]]
  };

  // Gantt: months are "YYYY-MM"; end null = ongoing
  R.gantt = {
    axisStart: "2023-01",
    rows: [
      { id: "EXP-01", kind: "task", critical: true, start: "2023-04", end: "2024-12", name: { en: "Systems / Requirements Lead", es: "Líder de Sistemas / Requerimientos" }, org: "Bose Automotive / Luxshare-ICT" },
      { id: "MS-01", kind: "milestone", at: "2023-08", name: { en: "B.Eng. Mechatronics (CETYS) + B.A. Management (City University of Seattle)", es: "Ing. en Mecatrónica (CETYS) + Lic. en Administración (City University of Seattle)" }, org: { en: "Both degrees", es: "Ambas licenciaturas" } },
      { id: "MS-05", kind: "milestone", at: "2024-10-22", name: { en: "Requirements Writing course certificate", es: "Certificado del curso Requirements Writing" }, org: "UNSW Sydney · Coursera" },
      { id: "EXP-02", kind: "task", critical: true, start: "2024-12", end: "2025-10", name: { en: "Configuration Analyst", es: "Analista de Configuración" }, org: "Bose Automotive / Luxshare-ICT" },
      { id: "MS-02", kind: "milestone", at: "2025-10-17", name: { en: "CM2-Core Certification", es: "Certificación CM2-Core" }, org: "IpX × Fort Hays State University" },
      { id: "EXP-03", kind: "task", critical: true, start: "2025-10", end: "2026-09", name: { en: "Requirements Manager / ALM Consultant", es: "Gerente de Requerimientos / Consultor ALM" }, org: "Visure Solutions" },
      { id: "MS-03", kind: "milestone", at: "2026-07", name: { en: "Bookroom founded", es: "Fundación de Bookroom" }, org: "bookroom.mx" },
      { id: "EXP-04", kind: "task", critical: true, start: "2026-07", end: null, name: { en: "Founder & CEO / Product & Technology Lead", es: "Fundador y CEO / Líder de Producto y Tecnología" }, org: "Bookroom" },
      { id: "MS-04", kind: "milestone", at: "2026-10-08", name: { en: "PMP® exam prep: 35 contact hours", es: "Preparación PMP®: 35 horas de contacto" }, org: "ThorTeaches · PMI R.E.P. 4906" }
    ],
    path: [["EXP-01", "EXP-02"], ["EXP-02", "EXP-03"], ["EXP-03", "EXP-04"]]
  };

  R.dfmea = [
    { id: "FM-01", exp: "EXP-01", tag: { en: "Traceability", es: "Trazabilidad" },
      mode: { en: "End-to-end traceability broken across 2 related automotive programs", es: "Trazabilidad de punta a punta rota en 2 programas automotrices relacionados" },
      effect: { en: "Coverage gaps: requirements could not be shown to be validated", es: "Brechas de cobertura: no se podía demostrar que los requerimientos estuvieran validados" },
      cause: { en: "Requirement sets of the related programs had to be compared and reconciled", es: "Había que comparar y conciliar los requerimientos de ambos programas" },
      action: { en: "Compared requirements, identified coverage gaps, and coordinated their closure through validation", es: "Comparé requerimientos, identifiqué brechas de cobertura y coordiné su cierre hasta la validación" },
      result: { en: "End-to-end traceability restored across both programs", es: "Trazabilidad de punta a punta restablecida en ambos programas" } },
    { id: "FM-02", exp: "EXP-02", tag: { en: "Process", es: "Proceso" },
      mode: { en: "New Configuration Analyst role with no defined operating process", es: "Nuevo puesto de Analista de Configuración sin un proceso operativo definido" },
      effect: { en: "No standard path for change intake, SME review, and approval", es: "Sin una ruta estándar para la recepción, revisión con SMEs y aprobación de cambios" },
      cause: { en: "The role's processes had not been established yet", es: "Los procesos del puesto aún no estaban establecidos" },
      action: { en: "Established governance, SIPOC, approval workflows, and onboarding documentation", es: "Establecí la gobernanza, el SIPOC, los flujos de aprobación y la documentación de onboarding" },
      result: { en: "30–35 change notices per month processed within a 2-day turnaround cycle", es: "De 30 a 35 change notices al mes procesados en un ciclo de 2 días" } },
    { id: "FM-03", exp: "EXP-03", tag: { en: "Migration", es: "Migración" },
      mode: { en: "Client requirements spread across Excel, IBM DOORS, Jira, and ReqIF-compatible tools", es: "Requerimientos de clientes repartidos entre Excel, IBM DOORS, Jira y herramientas compatibles con ReqIF" },
      effect: { en: "Risk of losing requirements, relationships, and traceability when adopting an ALM", es: "Riesgo de perder requerimientos, relaciones y trazabilidad al adoptar un ALM" },
      cause: { en: "Migration from legacy tools into Visure ALM", es: "Migración de herramientas anteriores a Visure ALM" },
      action: { en: "Led the migrations for 15+ clients", es: "Lideré las migraciones de más de 15 clientes" },
      result: { en: "Requirements, relationships, and traceability preserved", es: "Requerimientos, relaciones y trazabilidad conservados" } },
    { id: "FM-04", exp: "EXP-01", tag: { en: "Visibility", es: "Visibilidad" },
      mode: { en: "Limited visibility of ASPICE progress across SYS1, SYS2, SWE1, SWE2, and test phases", es: "Poca visibilidad del avance ASPICE en SYS1, SYS2, SWE1, SWE2 y pruebas" },
      effect: { en: "Hard to track requirements status phase by phase", es: "Difícil dar seguimiento al estado de los requerimientos fase por fase" },
      cause: { en: "Requirements data in Jama Connect had to be reported per ASPICE phase", es: "Los datos de requerimientos en Jama Connect debían reportarse por fase de ASPICE" },
      action: { en: "Designed ASPICE-aligned dashboards with the Jama Connect API and Power BI", es: "Diseñé dashboards alineados a ASPICE con la API de Jama Connect y Power BI" },
      result: { en: "Framework replicated across projects", es: "Esquema replicado en otros proyectos" } },
    { id: "FM-05", exp: "EXP-03", tag: { en: "Enablement", es: "Habilitación" },
      mode: { en: "Sales demo preparation needed to be faster and tailored per prospect", es: "La preparación de demos de ventas debía ser más rápida y a la medida de cada prospecto" },
      effect: { en: "Demo preparation effort on top of 5–12 walkthroughs per month", es: "Esfuerzo de preparación además de 5 a 12 recorridos al mes" },
      cause: { en: "Demo projects were prepared for each prospect", es: "Los proyectos demo se preparaban para cada prospecto" },
      action: { en: "Built an internal API-based automation skill with AI-assisted development", es: "Desarrollé una skill interna de automatización basada en API con desarrollo asistido por IA" },
      result: { en: "Prospect-oriented demo projects created automatically; demo preparation streamlined", es: "Proyectos demo por prospecto generados automáticamente; preparación de demos agilizada" } },
    { id: "FM-06", exp: "EXP-04", tag: { en: "Product", es: "Producto" },
      mode: { en: "Feedback and usability issues from external beta users", es: "Retroalimentación y problemas de usabilidad de los usuarios beta externos" },
      effect: { en: "Risk of shipping workflows that don't fit healthcare teams", es: "Riesgo de lanzar flujos que no se ajusten a los equipos de salud" },
      cause: { en: "Real-world use by 5 healthcare organizations and 7 beta users", es: "Uso real por 5 organizaciones de salud y 7 usuarios beta" },
      action: { en: "Translated feedback into prioritized improvements; reproduced defects and coordinated fixes and release readiness", es: "Convertí la retroalimentación en mejoras priorizadas; reproduje defectos y coordiné correcciones y entregas" },
      result: { en: "Scheduling, patient management, administrative, and mobile workflows validated", es: "Flujos de agenda, gestión de pacientes, administración y app móvil validados" } }
  ];

  R.soft = [
    { id: "SS-01", icon: "people", metric: "10+", title: { en: "Stakeholder leadership", es: "Liderazgo con stakeholders" },
      sub: { en: "Workshops & alignment", es: "Talleres y alineación" },
      ev: { en: "Led workshops with 10+ stakeholders and delivered traceability matrices; coordinated change intake, SME reviews, and approval routing with project management and engineering teams.", es: "Dirigí talleres con más de 10 stakeholders y entregué matrices de trazabilidad; coordiné la recepción de cambios, revisiones con SMEs y rutas de aprobación con gestión de proyectos e ingeniería." } },
    { id: "SS-02", icon: "globe", metric: "3", title: { en: "Cross-cultural coordination", es: "Coordinación intercultural" },
      sub: { en: "Regions coordinated", es: "Regiones coordinadas" },
      ev: { en: "Coordinated teams in Japan, Europe, and the United States on automotive requirements work.", es: "Coordiné equipos en Japón, Europa y Estados Unidos en proyectos de requerimientos automotrices." } },
    { id: "SS-03", icon: "mentor", metric: "1:1", title: { en: "Mentoring", es: "Mentoría" },
      sub: { en: "Growing others", es: "Desarrollo de otros" },
      ev: { en: "Mentored junior colleagues as Systems / Requirements Lead and wrote the onboarding documentation for the Configuration Analyst role.", es: "Fui mentor de colegas junior como Líder de Sistemas / Requerimientos y escribí la documentación de onboarding del puesto de Analista de Configuración." } },
    { id: "SS-04", icon: "demo", metric: "5–12", title: { en: "Customer enablement & pre-sales", es: "Habilitación de clientes y preventa" },
      sub: { en: "Tailored demos per month", es: "Demos personalizadas al mes" },
      ev: { en: "As product SME and pre-sales demonstration lead, delivered 5–12 tailored walkthroughs per month and led ALM onboarding for 15+ active clients.", es: "Como experto del producto y líder de demos de preventa, di de 5 a 12 recorridos personalizados al mes y lideré el onboarding de ALM de más de 15 clientes activos." } },
    { id: "SS-05", icon: "video", metric: "~20", title: { en: "Teaching & content creation", es: "Enseñanza y creación de contenido" },
      sub: { en: "Narrated tutorial videos", es: "Videos tutoriales narrados" },
      ev: { en: "Created approximately 20 narrated tutorial and demo videos (3–5 minutes on average), plus web-based guides, practical use cases, and visual learning resources.", es: "Creé alrededor de 20 videos narrados de tutoriales y demos (de 3 a 5 minutos en promedio), además de guías web, casos de uso prácticos y recursos visuales." } },
    { id: "SS-06", icon: "team", metric: "7", title: { en: "Team leadership", es: "Liderazgo de equipo" },
      sub: { en: "Contributors at Bookroom", es: "Colaboradores en Bookroom" },
      ev: { en: "Lead 7 contributors across product, operations, sales, and customer-facing work; prepare the team for sales with discovery conversations, product positioning, and technical demo training.", es: "Lidero a 7 colaboradores en producto, operaciones, ventas y atención a clientes; preparo al equipo para vender con conversaciones de descubrimiento, posicionamiento y capacitación en demos técnicas." } },
    { id: "SS-07", icon: "lang", metric: "ES · EN", title: { en: "Bilingual communication", es: "Comunicación bilingüe" },
      sub: { en: "Native · C1", es: "Nativo · C1" },
      ev: { en: "Spanish (native) and English (professional working proficiency, C1); worked remotely for a US-based company and with teams in Japan, Europe, and the United States.", es: "Español (nativo) e inglés (competencia profesional, C1); trabajé de forma remota para una empresa de EE. UU. y con equipos en Japón, Europa y Estados Unidos." } }
  ];

  // How each earlier chapter carries into Bookroom (resume facts + David's framing)
  R.lineage = [
    { id: "EXP-01", when: "2023 – 2024", org: "Bose Automotive / Luxshare-ICT",
      from: { en: "Requirements governance & end-to-end traceability", es: "Gobernanza de requerimientos y trazabilidad de punta a punta" },
      to: { en: "How I define product scope and validate releases", es: "Cómo defino el alcance del producto y valido cada entrega" } },
    { link: "#cm2", id: "EXP-02", when: "2024 – 2025", org: "Bose Automotive / Luxshare-ICT",
      from: { en: "CM2 change management: 30–35 change notices a month", es: "Gestión de cambios CM2: de 30 a 35 change notices al mes" },
      to: { en: "Release coordination and change control", es: "Coordinación de entregas y control de cambios" } },
    { id: "EXP-03", when: "2025 – 2026", org: "Visure Solutions",
      from: { en: "ALM consulting, pre-sales demos, and onboarding for 15+ clients", es: "Consultoría ALM, demos de preventa y onboarding de más de 15 clientes" },
      to: { en: "Beta coordination, demos, and sales training", es: "Coordinación de la beta, demos y capacitación en ventas" } },
    { id: "EDU", when: "2023", org: "CETYS University · City University of Seattle",
      from: { en: "Mechatronics engineering + management degrees", es: "Ingeniería en Mecatrónica + Licenciatura en Administración" },
      to: { en: "An engineer-founder who builds the product and leads the company", es: "Un fundador ingeniero que construye el producto y dirige la empresa" } }
  ];

  var add = function (lang, obj) { for (var k in obj) window.I18N[lang][k] = obj[k]; };
  add("en", {
    "nav.impact": "Impact", "nav.strengths": "How I work",
    "vm.kicker": "Method · V-Model",
    "vm.title": "My experience, mapped onto the V-Model",
    "vm.lede": "Where my work sits across the V-Model. Dashed lines are the traceability links between each definition level and the test level that verifies it.",
    "vm.left": "Definition & decomposition", "vm.right": "Integration & verification",
    "vm.verifies": "verifies", "vm.roles": "Related roles", "vm.evidence": "Achievements", "vm.phase": "Phase",
    "vm.count": "{n} items",
    "vm.tip": "Evidence from",
    "ln.more": "See the CM2 chapter",
    "vm.key": "Dashed lines are traceability links: each definition level is verified by the test level opposite it.",
    "vm.keyBtn": "Show my traceability work",
    "vm.converge": "Every phase of the V now converges in one product",
    "gt.kicker": "Career schedule",
    "gt.title": "Career plan, project-style",
    "gt.lede": "Roles as bars, milestones as diamonds, and the critical path of my career progression highlighted.",
    "gt.task": "Task", "gt.start": "Start", "gt.finish": "Finish", "gt.present": "Present",
    "gt.critical": "Critical path", "gt.milestone": "Milestone", "gt.today": "Today", "gt.label": "Career Gantt chart from April 2023 to today",
    "exp.detail": "Role details",
    "fm.kicker": "Impact",
    "fm.title": "Problems solved, DFMEA-style",
    "fm.lede": "A narrative take on a DFMEA worksheet: each row is a real problem from my resume, what it put at risk, and what I did about it.",
    "fm.note": "Format inspired by DFMEA. No RPN scores; each row frames a real item from my resume.",
    "fm.id": "ID", "fm.mode": "Failure mode", "fm.effect": "Effect", "fm.cause": "Cause / context", "fm.action": "Action taken", "fm.result": "Result",
    "ss.kicker": "How I work",
    "ss.title": "Soft skills, with evidence",
    "ss.lede": "Hover, focus, or tap a card to see the proof from my experience.",
    "ss.evidence": "Evidence", "ss.show": "Show evidence", "ss.hide": "Hide evidence"
    ,"bk.badge": "Featured project",
    "bk.story": "Founded in July 2026 in Tijuana, Bookroom is a healthcare SaaS platform for clinics. As Founder & CEO and Product & Technology Lead, I took it from development through production launch and into external beta testing.",
    "bk.meta": "Tijuana, Mexico · Since Jul 2026",
    "bk.j1": "Founded", "bk.j1d": "Jul 2026 · Tijuana",
    "bk.j2": "Development", "bk.j2d": "Scope, priorities, AI-assisted build",
    "bk.j3": "Production launch", "bk.j3d": "Releases and release readiness",
    "bk.j4": "External beta", "bk.j4d": "5 organizations · 7 beta users",
    "bk.now": "Now",
    "bk.covers": "What it covers", "bk.coversNote": "Workflows I validate before each release",
    "bk.stack": "Stack I work in", "bk.stackNote": "AI-assisted implementation and bug fixes across the web app and backend API.",
    "bk.role": "My role",
    "bk.r1": "Product scope and feature priorities",
    "bk.r2": "Responsibilities, releases, and team alignment",
    "bk.r3": "Validation, defect reproduction, and release readiness",
    "bk.r4": "Beta feedback turned into prioritized improvements",
    "bk.r5": "Sales training: cold calling, warm outreach, discovery, positioning, and technical demos",
    "bk.m1": "Contributors", "bk.m1d": "Product, operations, sales, and customer-facing",
    "bk.m2": "Healthcare organizations", "bk.m2d": "In external beta testing",
    "bk.m3": "Beta users", "bk.m3d": "Feedback feeds the roadmap priorities",
    "tl.featured": "Featured project",
    "hero.featured": "Featured project: Bookroom",
    "ln.kicker": "Where it all comes together",
    "ln.lede": "Bookroom is the culmination of my career so far: each earlier role shaped how I build and run it.",
    "ln.learned": "Learned", "ln.became": "At Bookroom",
    "ln.hub": "Engineer-founder", "ln.hubSub": "Bookroom · since Jul 2026"
  });
  add("es", {
    "nav.impact": "Impacto", "nav.strengths": "Cómo trabajo",
    "vm.kicker": "Método · Modelo V",
    "vm.title": "Mi experiencia, mapeada en el Modelo V",
    "vm.lede": "Dónde se ubica mi trabajo a lo largo del Modelo V. Las líneas punteadas son los vínculos de trazabilidad entre cada nivel de definición y el nivel de prueba que lo verifica.",
    "vm.left": "Definición y descomposición", "vm.right": "Integración y verificación",
    "vm.verifies": "verifica", "vm.roles": "Roles relacionados", "vm.evidence": "Logros", "vm.phase": "Fase",
    "vm.count": "{n} puntos",
    "vm.tip": "Respaldado por",
    "ln.more": "Ver el capítulo de CM2",
    "vm.key": "Las líneas punteadas son vínculos de trazabilidad: cada nivel de definición se verifica con el nivel de prueba opuesto.",
    "vm.keyBtn": "Ver mi trabajo de trazabilidad",
    "vm.converge": "Hoy todas las fases del V convergen en un solo producto",
    "gt.kicker": "Cronograma de carrera",
    "gt.title": "Mi carrera, como un plan de proyecto",
    "gt.lede": "Roles como barras, hitos como rombos y la ruta crítica de mi progresión profesional resaltada.",
    "gt.task": "Tarea", "gt.start": "Inicio", "gt.finish": "Fin", "gt.present": "Actualidad",
    "gt.critical": "Ruta crítica", "gt.milestone": "Hito", "gt.today": "Hoy", "gt.label": "Diagrama de Gantt de mi carrera, de abril de 2023 a hoy",
    "exp.detail": "Detalle por rol",
    "fm.kicker": "Impacto",
    "fm.title": "Problemas resueltos, al estilo DFMEA",
    "fm.lede": "Una versión narrativa de una hoja DFMEA: cada fila es un problema real de mi currículum, lo que ponía en riesgo y lo que hice al respecto.",
    "fm.note": "Formato inspirado en DFMEA. Sin calificaciones RPN; cada fila parte de un punto real de mi currículum.",
    "fm.id": "ID", "fm.mode": "Modo de falla", "fm.effect": "Efecto", "fm.cause": "Causa / contexto", "fm.action": "Acción tomada", "fm.result": "Resultado",
    "ss.kicker": "Cómo trabajo",
    "ss.title": "Habilidades blandas, con evidencia",
    "ss.lede": "Pasa el cursor, enfoca o toca una tarjeta para ver la evidencia de mi experiencia.",
    "ss.evidence": "Evidencia", "ss.show": "Ver evidencia", "ss.hide": "Ocultar evidencia"
    ,"bk.badge": "Proyecto destacado",
    "bk.story": "Fundé Bookroom en julio de 2026 en Tijuana: una plataforma SaaS de salud para clínicas. Como fundador y CEO, y líder de producto y tecnología, la llevé del desarrollo al lanzamiento a producción y a las pruebas beta externas.",
    "bk.meta": "Tijuana, México · Desde jul 2026",
    "bk.j1": "Fundación", "bk.j1d": "jul 2026 · Tijuana",
    "bk.j2": "Desarrollo", "bk.j2d": "Alcance, prioridades y desarrollo asistido por IA",
    "bk.j3": "Lanzamiento a producción", "bk.j3d": "Entregas y preparación de cada versión",
    "bk.j4": "Beta externa", "bk.j4d": "5 organizaciones · 7 usuarios beta",
    "bk.now": "Hoy",
    "bk.covers": "Qué cubre", "bk.coversNote": "Flujos que valido antes de cada entrega",
    "bk.stack": "Stack en el que trabajo", "bk.stackNote": "Implementación y corrección de errores con desarrollo asistido por IA en la app web y la API de backend.",
    "bk.role": "Mi rol",
    "bk.r1": "Alcance del producto y prioridades de funcionalidades",
    "bk.r2": "Responsabilidades, entregas y alineación del equipo",
    "bk.r3": "Validación, reproducción de defectos y preparación de cada entrega",
    "bk.r4": "Retroalimentación beta convertida en mejoras priorizadas",
    "bk.r5": "Capacitación en ventas: llamadas en frío, seguimiento a prospectos, descubrimiento, posicionamiento y demos técnicas",
    "bk.m1": "Colaboradores", "bk.m1d": "Producto, operaciones, ventas y atención a clientes",
    "bk.m2": "Organizaciones de salud", "bk.m2d": "En pruebas beta externas",
    "bk.m3": "Usuarios beta", "bk.m3d": "Su retroalimentación define prioridades",
    "tl.featured": "Proyecto destacado",
    "hero.featured": "Proyecto destacado: Bookroom",
    "ln.kicker": "Donde todo se une",
    "ln.lede": "Bookroom es la culminación de mi carrera hasta hoy: cada rol anterior definió cómo la construyo y la dirijo.",
    "ln.learned": "Aprendí", "ln.became": "En Bookroom",
    "ln.hub": "Fundador ingeniero", "ln.hubSub": "Bookroom · desde jul 2026"
  });
})();
