# Mukund M K — Personal Portfolio

An advanced, single-page personal portfolio built with **plain HTML, CSS, and
JavaScript** — no build tools. Features an interactive animated background
(particle network + drifting aurora), glassmorphism, a custom cursor, 3D tilt
cards, scroll-reveal animations, and a cosmic violet / cyan / magenta theme.

## Run it

Just open `index.html` in your browser.

For a live-reload dev server (optional):

```bash
npx serve .
# or
python -m http.server 8000
```

> Note: icons (Font Awesome + Devicon) and fonts (Google Fonts) load from CDNs,
> so an internet connection is needed to see them. Everything else works offline.

## Add your images

Put these files in the `assets/` folder (see `assets/README.txt`). Until you do,
the site shows tasteful gradient placeholders automatically.

| File                 | Used for                                    |
|----------------------|---------------------------------------------|
| `profile.jpg`        | Your photo (hero circle)                    |
| `desmoslab-logo.png` | DESMOSLAB internship logo                   |
| `college.jpg`        | SNS College of Technology photo             |
| `school.jpg`         | Dr. P.G.V Matric Hr. Sec. School photo      |

## Files

| File         | Purpose                                             |
|--------------|-----------------------------------------------------|
| `index.html` | Page structure & all your content                   |
| `styles.css` | Theme + all styling (color tokens at top of file)   |
| `script.js`  | Particles, custom cursor, tilt, reveal, rotator     |
| `assets/`    | Your images                                         |

## Customize

- **Theme color** — edit the `--violet`, `--cyan`, `--magenta`, and `--grad`
  variables in `:root` at the top of `styles.css`.
- **Rotating hero words** — edit the `words` array in `script.js`.
- **Projects** — the Projects section is a "coming soon" placeholder; send your
  project details and they'll be added as cards.
- **Résumé button** — point the nav "Résumé" link to your PDF.
- **Drawing gallery link** — in the Hobbies section, the "View my artwork" link
  (`<a href="#" class="hobby-link">`) is a placeholder; replace `#` with your
  Google Drive link once you have it.

## Deploy

- **GitHub Pages**: push to a repo → Settings → Pages → deploy from `main`.
- **Netlify / Vercel**: drag-and-drop the folder — no build step needed.

---
Sections: Hero · About · Experience · Skills · Projects · Education · Achievements · Contact
