# Project screenshots

Screenshots used on the project cards in `index.html`:

| File                | Project       | Size (px)   |
| ------------------- | ------------- | ----------- |
| `ai-farid.png`      | A.I. FARID    | 1830 × 1032 |
| `taxflow.png`       | TaxFlow       | 1825 × 1032 |
| `geometry-rush.png` | Geometry Rush | 1085 × 548  |

The Music REST API card has no screenshot. It shows a JSON preview with demo data
that is written in HTML and CSS (`.api-preview` in `index.html`).

## Adding or replacing a screenshot

Put the image in this folder (about 16:9 works best) and use it in the project card's
`project-card__media project-card__media--screenshot` element, with its real width and
height so the page doesn't jump while it loads:

```html
<img src="assets/projects/your-image.png" width="1600" height="900" loading="lazy"
     data-i18n-attr="alt:your-project.alt"
     alt="Describe what the screenshot shows">
```

Add the Dutch alt text under the same key (`your-project.alt`) in `js/translations.js`.
