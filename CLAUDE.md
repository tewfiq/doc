# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A bilingual (FR/EN) documentation site for Tewfiq Ferahi ("Knowledge Engineering"), built as a personal portfolio showcasing product design, documentation systems, and AI expertise. Deployed at https://doc.tfq.one/.

## Commands

- `npm run dev` — start dev server (http://localhost:3000)
- `npm run build` — production build
- `npm start` — serve production build

No tests or linter are configured.

## Architecture

**Next.js Pages Router** with JSX (no TypeScript), Tailwind CSS v4 (via `@tailwindcss/postcss`), no component library.

### Key pattern: Content-driven shell

All pages are thin wrappers that pass a `pageKey` to a single monolithic component:

```
pages/philosophy.jsx  →  <DocsPage pageKey="philosophy" />
```

- **`components/DocsShell.jsx`** (~2000 lines) — the entire UI: sidebar, header, search, theme/language toggle, page content rendering, navigation, footer. Every page section is rendered here based on the `pageKey`.
- **`lib/docsContent.js`** — all site content as structured data: routes, navigation groups, page metadata, bilingual strings (FR/EN), experience cards, metrics, tokens, etc. This is the single source of truth for all text and page definitions.

### Adding a new page

1. Add route entry and page data to `lib/docsContent.js` (in `routes`, `pages`, and appropriate `navGroups`)
2. Create a thin page file in `pages/` that renders `<DocsPage pageKey="yourKey" />`
3. Add rendering logic for the new `pageKey` in `DocsShell.jsx` if it needs custom layout

### Bilingual content

All user-facing strings use `{ FR: '...', EN: '...' }` objects. The active language is managed via React context (`LanguageContext`) in `DocsShell.jsx`, defaulting to `'FR'`.

### Theming

Light/dark mode via CSS custom properties defined in `styles/globals.css` (`:root` and `html.dark`). Theme state managed via `ThemeContext` in `DocsShell.jsx`.

### Design tokens

- Warm palette: `--bg: #fffaf3`, `--accent: #ff6b35`, `--text: #17130f`
- Font: Inter / ui-sans-serif
- All CSS variables are in `styles/globals.css`

### Static assets

- `public/images/` — photos (WebP)
- `public/trackrecord_screenshots/` — evidence screenshots (PNG)
- `public/gradients/` — gradient assets
