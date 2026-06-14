# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Read `AGENTS.md` first.** It is the canonical handoff: full component inventory, CSS namespaces, hook-alias rules, design tokens, and content data (prices, magazines). This file is the architectural map; AGENTS.md is the detail.

## What this is

High-fidelity prototype site for **Umbría Studio** (Buin, Chile) — a photo/video brand with five sub-units: Emmanuel Umbría (bodas), Fotito Estudio (familia), Rosa Umbría (maquillaje), Vida Grado (graduaciones), Corporativo (ex-"Audiovisual", renamed per the 4-jun-2026 client meeting). Delivered through the Automatizatech client pipeline (see AGENTS.md §14).

There is **no build step, no bundler, no npm runtime**. Everything is CDN + browser-compiled. `package.json` exists only to pin `framer-motion` for editor tooling; it is not used at runtime.

## Three independent rendering systems

This repo is not one app — it is three separate front-ends that share assets, fonts, and the copper palette but **do not share a runtime**. Know which one you are editing before changing anything.

1. **Home SPA — `index v2.html`** (entry point, the space in the filename is load-bearing, NO renombrar)
   - React 18.3.1 + Babel Standalone, all `.jsx` are `type="text/babel"` compiled in-browser.
   - **No imports between files.** Components are published as `window.UmbriaX` globals and consumed as `<window.UmbriaHero/>` in `app-v2.jsx`.
   - **Framer Motion is `window.motion`, a Proxy** (sync fallback that strips FM props pre-load, delegates to real FM post-load via `window.__fmSetReal`). Never `import` FM. Access `window.AnimatePresence` *inside* the component, never at module scope.
   - Hooks are aliased per file (`useState1/2/3/F`) to avoid global-scope collisions under Babel. Never use bare `useState`.
   - Each section is wrapped in `SectionBoundary` (app-v2.jsx): a blank section = an isolated JS error, check console.
   - v1 legacy (do not touch): `index.html`, `app.jsx`, `sections-1.jsx`, `sections-3.jsx`, `styles.css`.

2. **Service one-pages — `servicios/<id>/index.html`** (`id` = bodas | estudio | maquillaje | graduaciones | audiovisual)
   - A *different* stack: rendered by **`service-page.js`** using plain `React.createElement` (NOT JSX/Babel), so these pages also work over `file://`.
   - Each HTML sets `window.UMBRIA_SERVICE_ID` and `window.UMBRIA_BASE_PATH="../../"`, pulls React via the ESM shims (`react-esm-shim.js`, `react-dom-esm-shim.js`), and uses its own FM proxy in **`service-motion.js`** (`window.__serviceFmSetReal`, event `service-fm-ready`).
   - Content lives in **`service-data.js`**; styles in **`service-styles.css`** (separate from the home CSS).

3. **Standalone cinematic intros — `intro.html` (v1) and `intro-v2.html` (v2)**
   - **No React, no Framer Motion, no shared CSS.** Pure Three.js 0.160 (importmap) + GSAP/ScrollTrigger + Lenis, all CDN, zero deps. Each is fully self-contained in one file.
   - Both load `assets/models/AntiqueCamera.glb` (~20MB, local) and scroll-drive its pose to reveal the five services, then link into `index v2.html`.
   - `intro-v2.html` is the WebGI-style comparison build (camera as centered hero, full-rotation sweep, UnrealBloom + contact shadow + fog, plus an OrbitControls "Explora la cámara" mode). It is a parallel file for A/B comparison — it does **not** replace `intro.html`.
   - **Resilience pattern (do not weaken):** WebGL absent → redirect home; GLB textures stall (some browsers throw `GLTFLoader: Couldn't load texture blob`) → after 12s show a procedural camera and swap in the real model when it arrives; 18s hard safety-redirect to home (disabled with `?record=1`); `history.scrollRestoration='manual'`; honors `prefers-reduced-motion`; `window.__lenis` / `window.__readyAt` hooks exist for automated recording.

## Running locally

Must be served over HTTP (CORS blocks `file://` for the home SPA; service pages tolerate `file://`).

```bash
# WAMP (client machine, primary): http://localhost/umbria/PrototipoClaudeDesign/index%20v2.html
# Python (matches .claude/launch.json): python -m http.server 8099  → http://localhost:8099/index%20v2.html
```

Key URLs: home `index%20v2.html` · intros `intro.html` / `intro-v2.html` · a service page `servicios/bodas/index.html`.

There is no lint or test setup (`npm test` is a placeholder that exits 1).

## Demo video

`demo/` holds a Playwright recorder (`demo/record.mjs`) that drives the intro and produces `demo/umbria-demo.mp4`. Requires WAMP running. Regenerate: `cd demo && node record.mjs`, then mux audio with ffmpeg. (Note: the client rejected voiceover narration — captions only.)

## Design tokens (canonical values)

- Copper accent is **`#C97846`** — `--champagne` and `--copper` are the same value (NOT `#D97B46`).
- Home/v1 type stack: Bodoni Moda (display) + Allura (script) + Inter (UI).
- **Combo A** is the post-meeting decision: **Fraunces (display) + Inter (UI) + Dancing Script (script)** — already applied in `intro-v2.html`; still pending across `index v2.html`, the service pages, and `intro.html`.
- Home CSS is one ~3100-line file `styles-v2.css` (no Tailwind, no CSS modules); add new styles at the end. Grid containers that lift on hover need `overflow: visible`.

## Git

Work on `develop`; merge to `main` only when ready to show the client. Repo: `automatizacionesbotcore-cmyk/UmbriaEstudio`.
