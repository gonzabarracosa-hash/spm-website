# SPM Design Solutions — website

Next.js (App Router) implementation of the `SPM Home.html` design from the
`project/` Claude Design handoff bundle. Same visual output and interactions
as the prototype (i18n in EN/ES/NL/DE/FR, hero logo video, interactive
lattice background, draggable workflow-widget demo, scroll-tilt contact
card, FAQ accordion), rebuilt as React components instead of vanilla
DOM-query JS.

## Develop

```
npm install
npm run dev
```

## Build / run production

```
npm run build
npm run start
```

## Contact & newsletter forms

Both forms submit to [Formspree](https://formspree.io). Create a form for
each, then set the endpoint URLs in `.env.local` (copy `.env.example`):

```
NEXT_PUBLIC_FORMSPREE_CONTACT_ENDPOINT=https://formspree.io/f/xxxxxxxx
NEXT_PUBLIC_FORMSPREE_NEWSLETTER_ENDPOINT=https://formspree.io/f/yyyyyyyy
```

Until these are set, both forms still validate and show their normal
success state — they just don't send anywhere yet.

## Explainer demos

The five `Video Explicativo *.dc.html` files under `public/explainer/` are
kept as-is from the design bundle and embedded via `<iframe>`, exactly like
the original prototype. They're self-contained Claude Design "canvas"
exports that load React/Babel from unpkg.com at runtime to render their
animations — that requires outbound internet access to unpkg.com wherever
this site is deployed.

## Pages

- `/` — the home page (`SPM Home.html`)
- `/work/docvault-case-study` — the DocVault case study, reusing the shared
  Header/Footer (updated to drop the old "Courses" nav item and Training
  copy, matching the final state of the home page rather than the stale
  standalone file it was ported from). Header/Footer links use `/#section`
  so in-page navigation still works when you're on this subpage.

## SEO

- `NEXT_PUBLIC_SITE_URL` (see `.env.example`) drives canonical links, Open
  Graph/Twitter URLs, `sitemap.xml` and `robots.txt` — set it in Vercel to
  the real domain once one is connected (falls back to a placeholder
  otherwise).
- `app/layout.js` sets title/description/keywords, Open Graph + Twitter
  card metadata, and JSON-LD `ProfessionalService` structured data
  (`lib/site.js` holds the shared copy).
- `app/opengraph-image.jsx` generates the social-preview image (1200×630)
  on the fly — no static asset to keep in sync.
- `app/robots.js` and `app/sitemap.js` generate `/robots.txt` and
  `/sitemap.xml`.
- Not done: the site is one URL with client-side language switching
  (EN/ES/NL/DE/FR), so there's no per-language URL to give Google separate
  indexable pages or `hreflang` tags for. Real multilingual SEO would need
  routing each language to its own path (e.g. `/es`, `/de`) — a bigger
  change than adding meta tags, worth a separate task if it matters for
  ranking in non-English markets.

## Not included

The language-variant/shareable/standalone home files (`SPM Home (logo +
video banner).html`, `SPM Home (shareable).html`, `SPM Home
(standalone).html`) were out of scope for this port (see chat history) —
only `SPM Home.html` was implemented as the canonical home page.
