# amanigloria69-coder.github.io

My personal portfolio site. Hand-built with plain HTML, CSS and a little
JavaScript — no frameworks and no build step.

**Live site:** https://amanigloria69-coder.github.io

## Editing

| File | What's in it |
|---|---|
| `index.html` | All page content. Look for `<!-- EDIT: ... -->` comments. |
| `styles.css` | Theme colours live in `:root` at the top — change `--accent` to re-theme everything. |
| `script.js` | Scroll reveals, nav highlighting, copy-email button. |

## Preview locally

Just open `index.html` in a browser, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy

GitHub Pages serves the `main` branch automatically. Push and it updates:

```bash
git add -A && git commit -m "update" && git push
```

## Placeholders to replace

- [ ] About text — city, hobbies, current status
- [ ] Project cards — titles, descriptions, tags, links
- [ ] Skills list — keep only what you're comfortable being asked about
