# Warm personal portfolio

A responsive single-page portfolio built with Vite, React 18, TypeScript, and plain CSS. It includes light/dark themes, a loading sequence, animated hero, active-section navigation, a small Q&A interaction, and fully responsive portfolio sections.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. For a production check:

```bash
npm run lint
npm run build
npm run preview
```

## Edit the content

All portfolio copy and links live in `src/data`:

- `site.ts` — name, role, contact details, location/timezone, about copy, navigation, social links, and explore cards
- `projects.ts` — project titles, descriptions, tags, links, and preview colors
- `skills.ts` — skill pills
- `answers.ts` — hero question keywords, responses, and section destinations

Update the matching title, description, Open Graph URL, and preview image details in `index.html` before publishing. The current portrait and project art are intentionally image-free gradients, so they do not cause layout shift.

## Deploy

### Vercel

Import the repository at [vercel.com/new](https://vercel.com/new). Vercel detects Vite automatically. Use `npm run build` as the build command and `dist` as the output directory.

### Netlify

Import the repository in Netlify and use:

- Build command: `npm run build`
- Publish directory: `dist`

No redirect configuration is required because this portfolio uses anchor navigation rather than client-side routes. The three “More to explore” links are placeholders; replace them in `src/data/site.ts` when those pages exist.
