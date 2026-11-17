# Aisha — Portfolio

Personal portfolio website of Aisha, Software Development student at ROC van Amsterdam,
looking for a Software Development internship.

**Live site:** https://aisha789123.github.io/Aisha-Portfolio/

Plain HTML, CSS and JavaScript: no frameworks, no libraries and no build step.
Hosted on GitHub Pages.

## Sections

- **Hero:** introduction, location, school and languages, the Skills Heroes 2026 result
  and a code card (`aisha.js`)
- **About me:** background, work experience at Albert Heijn and quick facts
- **Tech Stack:** seven groups: Languages, Frameworks & Libraries, Databases,
  Tools & DevOps, AI, Game Development and Other
- **Projects:** A.I. FARID as the large featured project, with TaxFlow, Music REST API
  and Geometry Rush below it
- **Achievements:** 1st place in the Skills Heroes 2026 Webdeveloper preliminary round
- **Contact:** email, LinkedIn and GitHub, a "Copy email" button, and what I bring
  and want to learn during an internship

## Features

- English / Dutch language switch (the choice is remembered in the browser)
- Responsive layout for mobile, tablet and desktop
- Mobile menu, header background on scroll and the active menu link highlighted
- Fade-in animations on scroll
- Accessible: keyboard navigation, skip link, screen reader labels and
  support for `prefers-reduced-motion`
- Works without JavaScript: all content stays visible (in English)

## Structure

```
index.html          Page markup (all sections)
css/style.css       Styles (CSS variables at the top)
js/script.js        Language switch, mobile menu, header, active menu link,
                    scroll animations, copy email and the footer year
js/translations.js  Dutch text for the EN/NL switch (English is in index.html)
assets/favicon.svg  Favicon
assets/projects/    Project screenshots (see assets/projects/README.md)
```

## Adding or changing text

English text is written in `index.html`. Every element with visible text that should
change language gets a `data-i18n="some.key"` attribute, and the Dutch version goes in
`js/translations.js` under the same key. For attributes such as `alt` or `aria-label`,
use `data-i18n-attr="alt:some.key"`.

## Preview locally

Open `index.html` directly in a browser, or run a small local server from this folder:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

In VS Code you can also use the "Live Server" extension (right-click `index.html` → Open with Live Server).

## Deployment

The site is published with GitHub Pages from the `main` branch (root folder).
All paths are relative, so it works under `/Aisha-Portfolio/`.
