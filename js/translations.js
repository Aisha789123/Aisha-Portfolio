/**
 * Aisha — Portfolio translations
 *
 * English is the text written in index.html. "nl" holds the Dutch version of
 * every element marked with data-i18n (its HTML) or data-i18n-attr (an
 * attribute such as alt or aria-label). "ui" holds text that js/script.js
 * creates itself, in both languages.
 */
window.PORTFOLIO_TRANSLATIONS = {
  nl: {
    // Page & navigation
    "meta.description": "Portfolio van Aisha, student Software Development aan het ROC van Amsterdam, op zoek naar een stage Software Development. Webapplicaties en API's met PHP, Laravel, Python en JavaScript.",
    "skip": "Naar de inhoud",
    "nav.label": "Hoofdnavigatie",
    "nav.logo": "Aisha, terug naar boven",
    "nav.about": "Over mij",
    "nav.stack": "Tech Stack",
    "nav.projects": "Projecten",
    "nav.achievements": "Prestaties",
    "nav.contact": "Contact",
    "lang.label": "Taal",

    // Hero
    "hero.greeting": "Hoi, ik ben Aisha.",
    "hero.text": "Ik ben student Software Development met een passie voor het bouwen van webapplicaties, API's en praktische softwareoplossingen. Ik los graag problemen op en maak van ideeën werkende projecten.",
    "hero.projects": "Bekijk mijn projecten",
    "hero.contact": "Neem contact op",
    "hero.highlight": "<strong>1e plaats</strong> · Skills Heroes 2026, voorronde Webdeveloper",
    "hero.scroll": "Scroll naar Over mij",

    // Hero code card (string values and comments only; code stays English)
    "code.role": "\"Student Software Development\"",
    "code.seeking": "\"Stage Software Development\"",
    "code.taxflow": "// Laravel-webapp",
    "code.round": "\"Voorronde\"",
    "code.result": "\"1e plaats\"",
    "code.format": "\"Solo, 3 uur\"",

    // About
    "about.title": "Over mij",
    "about.p1": "Ik ben Aisha en ik volg de opleiding Software Development aan het <strong>ROC van Amsterdam</strong>. Ik bouw vooral voor het web: de frontend maak ik met HTML, CSS en JavaScript, de backend met PHP en Laravel of met Python.",
    "about.p2": "Ik heb gewerkt met MySQL-databases en REST API's gebouwd, en ik gebruik Git voor versiebeheer, zowel zelfstandig als in teamverband. Daarnaast heb ik Docker gebruikt om projecten in een consistente omgeving te draaien.",
    "about.p3": "Ik ben nu op zoek naar een stage Software Development waarin ik aan echte projecten kan werken, kan leren van ervaren developers en mezelf verder kan ontwikkelen.",
    "about.facts": "Kerngegevens",
    "about.studying": "Opleiding",
    "about.lookingFor": "Op zoek naar",
    "about.lookingForValue": "Een stage Software Development",
    "about.achievement": "Recente prestatie",
    "about.achievementValue": "1e plaats, Skills Heroes 2026 (voorronde Webdeveloper)",

    // Tech stack
    "stack.intro": "De talen, frameworks en tools die ik in mijn projecten heb gebruikt.",
    "stack.data": "Database &amp; tools",
    "stack.extra": "Aanvullende technologieën",

    // Projects (shared)
    "projects.title": "Projecten",
    "projects.intro": "Webapplicaties, API's, een AI-project en een game.",
    "projects.badge": "Uitgelicht",
    "projects.select": " (toon als uitgelicht project)",
    "projects.contribution": "Mijn bijdrage",
    "projects.tags": "Gebruikte technologieën",
    "projects.hint": "Uitlichten",

    // A.I. FARID
    "farid.status": "In ontwikkeling",
    "farid.alt": "Chatinterface van A.I. FARID met een zijbalk met opgeslagen chats. De assistent beantwoordt drie vragen over programmeertalen en Python, inclusief een Python-codevoorbeeld voor \"Hello, World!\".",
    "farid.desc": "Een full-stack AI-applicatie. De frontend is gebouwd met Next.js en communiceert met een Python-backend in FastAPI. Die backend gebruikt Ollama om taalmodellen lokaal te draaien in plaats van via een externe dienst.",
    "farid.contribution": "Ik ontwikkel dit project zelfstandig. Ik bouw de chatinterface met Next.js en koppel die aan een Python FastAPI-backend. Daarnaast heb ik Ollama geïntegreerd om AI-modellen lokaal te draaien, en heb ik chatgeschiedenis en gespreksbeheer geïmplementeerd.",

    // TaxFlow
    "taxflow.type": "Schoolproject in teamverband&nbsp;· Webapplicatie",
    "taxflow.alt": "Homepage van TaxFlow NL in het Nederlands met de kop \"Uw toeslagen overzichtelijk op één plek\", knoppen om in te loggen of een account aan te maken, en kaarten voor huurtoeslag, zorgtoeslag, kinderopvangtoeslag en persoonsgegevens.",
    "taxflow.desc": "TaxFlow is een Laravel-webapplicatie voor het beheren van toeslagaanvragen. De applicatie bevat gebruikersauthenticatie, aanvraagformulieren en een dashboard. Gegevens worden opgeslagen in een MySQL-database en de applicatie draait in Docker.",
    "taxflow.contribution": "Ontwikkeld als onderdeel van een schoolproject in teamverband.",

    // Music REST API
    "music.type": "Schoolproject in teamverband&nbsp;· Backend",
    "music.preview": "API-responseviewer met demodata, geen echte response van de applicatie: GET /api/artists/1 geeft 200 OK terug met een JSON-object voor een artiest met id 1, naam Coldplay, land GB en een created_at-timestamp.",
    "music.previewLabel": "JSON-response · Demodata",
    "music.desc": "Een REST API voor muziekgegevens, gebouwd met Laravel als schoolproject in teamverband voor het vak DevOps Advanced.",
    "music.contribution": "Ik heb timestamps toegevoegd aan <code>AlbumResource</code> en <code>ArtistResource</code>, en heb gewerkt aan het veld <code>country</code> voor artiesten.",

    // Geometry Rush
    "geometry.type": "Gameontwikkeling",
    "geometry.alt": "Gameplay van Geometry Rush: een wit vierkant als speler springt boven drie rode spikes op een witte vloer, met linksboven drie rode vierkanten voor de levens van de speler en bovenaan het scherm een groene balk.",
    "geometry.desc": "Een 2D-game gemaakt in Unity en geschreven in C#. De speler beweegt automatisch vooruit en springt om obstakels te ontwijken op weg naar het einde van het level.",
    "geometry.contribution": "Ik heb de gameplay in C# geïmplementeerd: automatische beweging van de speler, springen, obstakels, een systeem met drie levens en respawnen, het voltooien van het level en de game-UI.",

    // Achievements
    "achievements.title": "Prestaties",
    "achievement.title": "Winnaar &mdash; Voorronde Webdeveloper",
    "achievement.desc": "Skills Heroes is de Nederlandse vakwedstrijd voor mbo-studenten. In de voorronde Webdeveloper bouwde ik in drie uur zelfstandig een webapplicatie met HTML, CSS, JavaScript, PHP en MySQL. Daarmee behaalde ik de eerste plaats.",
    "achievement.category": "Categorie",
    "achievement.year": "Jaar",
    "achievement.result": "Resultaat",
    "achievement.resultValue": "1e plaats",

    // Contact & footer
    "contact.title": "Op zoek naar een stage Software Development",
    "contact.text": "Ik zoek een stage waarin ik kan meewerken in een echt team en kan blijven leren. Heeft u een stageplek beschikbaar of wilt u meer weten over mijn werk? Dan hoor ik graag van u.",
    "contact.email": "Stuur een e-mail",
    "footer.built": "Gebouwd met HTML, CSS &amp; JavaScript.",
    "footer.top": "Terug naar boven &uarr;"
  },

  ui: {
    en: {
      "menu.open": "Open menu",
      "menu.close": "Close menu",
      "code.pause": "Pause code animation",
      "code.play": "Play code animation",
      "projects.announce": "{title} is now the featured project.",
      "contact.copy": "Copy email",
      "contact.copied": "Copied!",
      "contact.copiedAnnounce": "Email address copied to the clipboard."
    },
    nl: {
      "menu.open": "Menu openen",
      "menu.close": "Menu sluiten",
      "code.pause": "Code-animatie pauzeren",
      "code.play": "Code-animatie afspelen",
      "projects.announce": "{title} is nu het uitgelichte project.",
      "contact.copy": "Kopieer e-mailadres",
      "contact.copied": "Gekopieerd!",
      "contact.copiedAnnounce": "E-mailadres gekopieerd naar het klembord."
    }
  }
};
