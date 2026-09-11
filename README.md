# tomsuhapbia's Geometry

A complete, responsive monochrome mathematics journal. Includes six full Markdown articles, KaTeX mathematics, highlighted JavaScript examples, client-side topic filtering and search, saved light/dark preference, and four original three-page PDF notes with preview, zoom, fullscreen, and downloads.

## Run locally

Use Node.js 22 or newer.

```sh
npm ci
npm run build
npm run dev
```

Open the address printed by the server (normally http://127.0.0.1:4173). Set `PORT` to select another port. Stop the server with Ctrl+C.

## Deploy

The complete website is the **dist/** directory. It contains the authored site, articles, actual PDFs, local fonts, and local browser libraries. No backend, database, API key, or external CDN is required. Serve it over HTTP(S); browser modules cannot run by double-clicking index.html.

- **Netlify:** import this repository. The included netlify.toml sets the build command and publish directory. Alternatively, upload the built dist directory.
- **Vercel:** import this repository. The included vercel.json configures the static output.
- **Cloudflare Pages:** build command `npm run build`, output directory `dist`.
- **GitHub Pages or any static host:** publish the contents of dist. Relative asset paths support hosting in a subdirectory.

Routes use URL fragments (`#/topics`, `#/archive`, `#/article/the-euler-line`). They work on static hosts without rewrite rules. Route titles and descriptions update in the browser; search-engine and social crawlers that do not execute JavaScript see the homepage metadata. Per-article server-rendered SEO can be added if needed.

## Edit the content

- **Articles:** edit dist/posts/*.md. Add corresponding metadata in dist/content.js. Dollar-delimited inline and display mathematics are supported. Callouts use `<div class="theorem">`, `<div class="proof">`, and `<div class="note">` with a `callout-title` span. Markdown is sanitized before display.
- **PDFs:** replace or add files in dist/pdf, update the `pdfs` list in dist/content.js, and record real byte sizes and page counts in dist/pdf/manifest.json. Keep each id aligned with its PDF filename.
- **Contact and About:** edit `aboutPage()` and `addContact()` in dist/app.js. The current public contacts are tomsuhapbia@gmail.com and the supplied Art of Problem Solving profile.
- **Design:** dist/styles.css contains both theme palettes and responsive layouts; dist/diagrams.js contains mathematical SVG constructions.
- **Navigation and interactions:** dist/app.js.

The opening articles and notes are introductory sample editorial content about classical results, written for this site. Review and replace them with your own work as the journal grows. No qualifications, awards, institutional affiliations, or personal history have been invented.

## Rebuild the PDF notes

The four finished PDFs are already included; Python is not needed to build or deploy the site. To regenerate the notes after editing the source:

```sh
python -m pip install reportlab pypdf
python scripts/generate_pdfs.py
```

The generator creates three-page notes and updates the byte-size manifest. It embeds Times New Roman from Windows; on other platforms, set `GEOMETRY_FONT_DIR` to a directory containing `times.ttf`, `timesbd.ttf`, `timesi.ttf`, and `timesbi.ttf`. Render changed PDFs with Poppler and review their layout before publication.

## Validation

`npm run build` copies exact lockfile-pinned dependencies into dist/vendor and checks local assets, JavaScript syntax, article completeness, and PDF signatures. `npm run check` runs the checks without copying dependencies.

All fonts, KaTeX, Marked, DOMPurify, Prism, and PDF.js are served locally. Theme preference is the only persistent browser data. Search and filtering run entirely in the browser. There are no analytics, cookies, contact-form submissions, or login requirements built into the site.

Vendor dependencies keep their upstream licenses; see dist/vendor/THIRD_PARTY_NOTICES.txt and package-lock.json.
