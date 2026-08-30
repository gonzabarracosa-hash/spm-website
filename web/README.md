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

## Not included

The DocVault case-study page (`project/SPM Work (DocVault case study).html`)
and the language-variant/shareable/standalone home files were out of scope
for this port (see chat history) — only `SPM Home.html` was implemented.
The "Read the full case study" link in the Work section points to
`/work/docvault-case-study`, which doesn't exist yet.
