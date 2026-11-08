# Aisha — Portfolio

Personal portfolio website of Aisha, Software Development student at ROC van Amsterdam,
looking for a Software Development internship.

**Live site:** https://aisha789123.github.io/Aisha-Portfolio/

Plain HTML, CSS and JavaScript: no frameworks, no libraries and no build step.
Hosted on GitHub Pages.

## Features

- English / Dutch language switch (the choice is remembered in the browser)
- Responsive layout for mobile, tablet and desktop
- Projects section where any project can be shown as the featured project
- Contact section with an email link, a "Copy email" button, LinkedIn and GitHub
- Accessible: keyboard navigation, skip link, screen reader announcements and
  support for `prefers-reduced-motion`
- Works without JavaScript: all content stays visible

## Structure

```
index.html          Page markup (all sections)
css/style.css       Styles (CSS variables at the top)
js/script.js        Language switch, navigation, code card, scroll effects,
                    project switching and copy email
js/translations.js  Dutch text for the EN/NL switch (English is in index.html)
assets/favicon.svg  Favicon
assets/projects/    Project screenshots (see assets/projects/README.md)
```

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
