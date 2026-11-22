# ADR 0001 — Publish the notes as a documentation site

- **Status:** Proposed (awaiting go-ahead)
- **Date:** 2026-11-22
- **Deciders:** Atul Kumar Awasthi
- **Scope:** Repository layout, docs framework, demo handling, deployment

---

## Context

This repository is a JavaScript interview-prep knowledge base, currently readable only as Markdown files on GitHub.

| Thing                   | Count                                                        |
| :---------------------- | :----------------------------------------------------------- |
| Markdown notes          | 79 files, ~900 KB                                            |
| Code demos              | 504 `.js`, 75 `.html`, 16 `.css`                             |
| Top-level topic folders | 60+ (`DataTypes`, `Promises`, `DOM`, `WebAPIs`, `Arrays`, …) |
| Remote                  | `github.com/kumaratul60/javascript-interview`, branch `main` |

The content is deep but un-navigable:

- 60+ flat folders with no ordering, grouping, or search.
- Long pages carry hand-written "Table of Contents" blocks (e.g. `Arrays/array.md` has two, ~120 lines) that duplicate what a docs site generates.
- 13 links point at `file:///Users/atulkumarawasthi/...` and are dead for every other reader.
- 9 links point at raw `.js` files that render as plain text in the browser.
- 7 directories contain spaces (`Design Patterns`, `DSA implimentation`, `All Timeoutes`, `Promise APIs types`, …), producing unusable URLs.
- Q&A material is buried 1,000+ lines into pages with repeated `## Answer` headings.

The goal is a public, linkable web documentation site with the familiar layout of `react.dev`: sidebar navigation, per-page table of contents, search, dark mode, and runnable examples.

---

## Decision

Build the site with **VitePress**, move all notes into **`docs/`**, serve the existing demos as **live static pages**, add a **runnable snippet component**, and deploy to **GitHub Pages** from `main`.

| Decision       | Value                                                                          |
| :------------- | :----------------------------------------------------------------------------- |
| Framework      | VitePress (Vue-powered, static output)                                         |
| Notes location | `/docs` — all 79 `.md` files `git mv`'d there, history preserved               |
| Demos          | 504 JS / 75 HTML stay in place; copied into `docs/public/demos/` at build time |
| Runnable code  | Sandboxed `<JsRunner>` component (iframe, `allow-scripts`, console captured)   |
| Deploy         | GitHub Actions → GitHub Pages on push to `main`                                |
| Site URL       | `https://kumaratul60.github.io/javascript-interview/`                          |

### Why VitePress

- Markdown-first: the 79 existing files become pages with almost no rewriting.
- Ships the target layout (sidebar, right-hand TOC, ⌘K local search, dark mode, prev/next) with zero custom UI work.
- Code blocks get syntax highlighting and copy buttons for free.
- Fast static output, trivial GitHub Pages deploy.
- Vue components can be registered globally, which is what the runnable-snippet component needs.

---

## Target layout

```
┌──────────────────────────────────────────────┐
│ logo  Playbook   Guides  Practice   🔍  🌙   │  navbar
├───────────────┬──────────────────┬───────────┤
│ sidebar       │  page content    │ On this   │
│ (7 sections)  │  + code blocks   │ page TOC  │
│               │  + live demos    │           │
└───────────────┴──────────────────┴───────────┘
```

---

## Information architecture (79 pages)

| #   | Section                                                                                                                             | Pages              |
| :-- | :---------------------------------------------------------------------------------------------------------------------------------- | :----------------- |
| 1   | **Start Here** — landing, overview, study evaluation, 2026 question set, clean code                                                 | 5                  |
| 2   | **Fundamentals** — Variables & Scope (4), DataTypes (16), Numbers, Objects, `this`/bind, OOPS, Prototypal Inheritance, Date, RegExp | 26                 |
| 3   | **Arrays & Data Structures** — Arrays, ArrayBeast, Map/Set (2), Polyfills (3), ESSENTIALS Promise APIs                              | 7                  |
| 4   | **Async JavaScript** — Promises (4), Event Loop, Debounce (2), Throttle, Timers                                                     | 9                  |
| 5   | **Browser & Web APIs** — DOM/BOM/CSSOM/DevTools/QnA (6), WebAPIs (6), JSEvents, WebStorage, Shadow DOM, Proxies, CSS Units          | 16                 |
| 6   | **Performance, Patterns & Internals** — Memoization, Design Patterns (2), Tricks (2), Closures, JSNotes (6), Payment Strategy       | 13                 |
| 7   | **Interview Practice** — every Q&A page surfaced as a grouped index (Arrays Q&A, OOPS, Map-Set, DOM, Promises, Functions, Debounce) | index + deep links |

Q&A-heavy pages get an extra sidebar group so a topic is one click away instead of buried in a 1,300-line file.

---

## Content fixes performed during migration

1. **13 dead `file:///Users/atulkumarawasthi/...` links** (`DOM/*.md`, `WebAPIs/*.md`) → real site or demo routes. These are broken on GitHub today too.
2. **9 relative `.js` links** (`./LRU/LRUCacheFinal.js`, `./DSA%20implimentation/...`) → `/demos/...` served pages.
3. **7 directories with spaces** (`Design Patterns`, `DSA implimentation`, `All Timeoutes`, `Promise APIs types`, …) → kebab-case slugs for clean URLs.
4. **Root `README.md`** → `docs/overview.md` (manual TOC removed); a short new root `README.md` points at the site.
5. **Hand-written "Table of Contents" blocks** inside pages → stripped; the site TOC replaces them.
6. **Duplicate `## Answer` headings** in Q&A files → auto-numbered so anchors do not collide.
7. **Filenames normalized** (`CSS Units.md` → `css-units.md`, `js_ui_skill.md` → `webapis-ui.md`).
8. Frontmatter added to every page: `title`, `description`, `outline: deep` for long pages.

All prose is preserved. Demo files are not modified.

---

## Implementation plan

### Phase 1 — Scaffold

- `npm init -y`, install `vitepress` and `vue`.
- `docs/.vitepress/config.mts`, `docs/.vitepress/theme/index.ts`, custom CSS.
- Scripts: `docs:dev`, `docs:build`, `docs:preview`.
- **Done when:** dev server serves a page with sidebar, search, and dark mode.

### Phase 2 — Move and rewrite content

- `git mv` all 79 `.md` files into `docs/` using the slug map.
- `scripts/rewrite-links.mjs` applies fixes 1–7 and prints a report of every rewrite.
- `scripts/sync-demos.mjs` copies JS/HTML/CSS demos into `docs/public/demos/` (gitignored).
- **Done when:** `docs:build` succeeds with zero dead-link errors.

### Phase 3 — Landing page and navigation

- `docs/index.md`: hero, Beginner/Intermediate/Advanced cards, hot-topic tables, search CTA.
- Full sidebar and navbar config, footer, per-section index pages.
- **Done when:** all 79 pages are reachable in ≤2 clicks.

### Phase 4 — Live demos and runnable snippets

- `docs/demos/index.md`: generated gallery of all 75 HTML demos with iframe preview and "open full page".
- `<JsRunner>`: Run/Reset, sandboxed iframe, console output panel; applied to the Playground page and to self-contained snippets (currying, debounce, `this` binding, closures).
- **Done when:** a demo opens inside the docs and a snippet runs in-browser.

### Phase 5 — Deploy

- `.github/workflows/deploy.yml` (build → Pages artifact → deploy).
- `docs/.vitepress/dist` gitignored.
- **Done when:** the site is live on push to `main`.

### Files created or changed

```
+ package.json  package-lock.json  .gitignore additions
+ scripts/rewrite-links.mjs
+ scripts/sync-demos.mjs
+ scripts/build-demos-index.mjs
+ docs/.vitepress/config.mts
+ docs/.vitepress/theme/index.ts
+ docs/.vitepress/theme/custom.css
+ docs/.vitepress/theme/components/JsRunner.vue
+ docs/index.md  docs/playground.md  docs/demos/index.md
+ .github/workflows/deploy.yml
~ README.md            (replaced with a short pointer; content moved, not lost)
→ 79 x .md             git mv into docs/, links and TOCs rewritten
```

---

## Consequences

**Positive**

- One public URL with search, navigation, and per-page anchors — the notes become shareable.
- Broken-path and raw-file links finally resolve.
- URLs are stable and human-readable; deep links can be shared in interviews, resumes, and chat.
- Content stays plain Markdown, so the repo remains editable without the framework.

**Negative / accepted trade-offs**

- Renaming folders changes GitHub URLs, breaking old bookmarks.
- Repository gains a Node toolchain (`package.json`, `node_modules`) it did not have before.
- `docs/public/demos` duplicates demo files at build time (gitignored, not committed).
- The site build must be maintained when VitePress majors change.

**Out of scope**

- Rewriting or expanding prose.
- Converting the 504 JS files into hand-written doc pages.
- Inventing notes for code-only folders (`Adv`, `Algorithms`, `Testing`, `Performance`, `CompanySpecific`); they stay linked from GitHub.

---

## Verification

- `npm run docs:build` — VitePress fails on broken internal links, so this is the real check.
- Spot-check five heavy pages: Arrays, `DOM/DOM`, Promises Q&A, `DataTypes/Map`, WebAPIs.
- Confirm every section is reachable and the 13 previously-dead links now resolve.
- Compare line counts before/after migration and report deltas so no content is lost.

---

## Alternatives considered

| Option                               | Why not chosen                                                                                                                 |
| :----------------------------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| **Docusaurus**                       | React-based and heavier; more config than the notes need. Reconsider only if pages must embed custom React components.         |
| **Astro Starlight**                  | Strong choice, but Markdown-first Vue/Vite workflow and local search are already sufficient here.                              |
| **Plain HTML export**                | No search, navigation, or maintainable structure across 79 pages.                                                              |
| **Keep notes in place, add `/site`** | Zero URL churn, but splits content from docs and doubles the link-rewriting problem. Rejected to keep one canonical docs tree. |
| **GitHub Wiki / README only**        | No sidebar, truncation, and poor mobile reading for 900 KB of notes.                                                           |
