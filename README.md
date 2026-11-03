# derya-neolab

The public Derya website: a home page (`app/page.tsx`), Vision, Principles and About pages, and an engraved sea (`app/components/sea.tsx`). Five Bell Labs versions (memo, manual, journal, printout, drawing) live under `app/bell/`, indexed at `/bell/`; each is a full site built from `app/bell/sections.ts`, except Manual, which has its own six-page list (adds Research and Who we help, an animated ASCII sea with a ship and leaping dolphins (`scene.tsx`) and four colour themes) in `app/bell/manual/pages.ts`. Both read their copy from `app/content.ts`. Every push to main deploys to GitHub Pages (`.github/workflows/pages.yml`).

```
npm install
npm run dev
```
