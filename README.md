# Aisha — Portfolio

Personal portfolio website. Plain HTML, CSS and JavaScript — no build step, GitHub Pages compatible.

## Structure

```
index.html        Page markup (all sections)
css/style.css     Styles (CSS variables at the top)
js/script.js      Language switch, navigation, code card, scroll effects, project switching
js/translations.js Dutch text for the EN/NL switch (English is in index.html)
assets/           Favicon and project screenshots
```

## Preview locally

Open `index.html` directly in a browser, or run a small local server from this folder:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

In VS Code you can also use the "Live Server" extension (right-click `index.html` → Open with Live Server).

## Still to fill in

- Screenshots for TaxFlow, Music REST API and Geometry Rush (see `assets/projects/README.md`)
- Canonical URL and Open Graph image once the site is published (see `TODO` in `index.html`)
- Optional: your individual responsibilities in TaxFlow
