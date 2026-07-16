# Rotunda Galleries

An immersive image-gallery interface built around a three-dimensional hero rotunda. Selecting a collection opens a full-page editorial gallery with deliberately varied image sizes, responsive layouts, keyboard navigation, and fullscreen viewing.

## Run locally

Requirements: Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite.

## Production build

```bash
npm run build
```

The primary implementation lives in:

- `app/page.tsx` — galleries, interactions, keyboard controls, and lightbox
- `app/globals.css` — rotunda geometry, protected layout containers, responsive gallery grid, and motion

The sample photographs are loaded from Unsplash URLs and can be replaced in the `galleries` array inside `app/page.tsx`.
