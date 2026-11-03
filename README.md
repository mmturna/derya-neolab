# derya-neolab

The public Derya website: a home page (`app/page.tsx`), Vision, Principles and About pages, and an engraved sea (`app/components/sea.tsx`). Five Bell Labs versions (memo, manual, journal, printout, drawing) live under `app/bell/`, indexed at `/bell/`; each is a full four-page site built from `app/bell/sections.ts`. Both read their copy from `app/content.ts`. Every push to main deploys to GitHub Pages (`.github/workflows/pages.yml`).

```
npm install
npm run dev
```
