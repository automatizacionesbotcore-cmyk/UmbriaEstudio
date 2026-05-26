# AGENTS.md — Umbría Studio · Handoff para Codex / agentes AI

> Leer este archivo completo antes de tocar cualquier código.
> Todo el contexto necesario para continuar está aquí.

---

## 1. Qué es este proyecto

**Prototipo de alta fidelidad** del sitio web de Umbría Studio — marca audiovisual chilena en Buin, RM.
Owners: **Emmanuel** (fotografía bodas/retrato) y **Rosa** (maquillaje/hair).

Cinco unidades de negocio:
| # | Marca | Servicio |
|---|-------|---------|
| 01 | Emmanuel Umbría | Bodas y retrato editorial |
| 02 | Fotito Estudio | Familia, embarazo, smash cake |
| 03 | Rosa Umbría | Makeup & Hair (novias y sesiones) |
| 04 | Vida Grado | Graduaciones (colegios, institutos, universidades) |
| 05 | Audiovisual | Podcasts, eventos, contenido para redes |

Contacto real: WhatsApp **+56 9 5833 5416**

---

## 2. Stack técnico — MUY IMPORTANTE

```
CDN React 18.3.1 + Babel Standalone 7.29.0
SIN bundler. SIN npm. SIN build step.
```

Todos los scripts son `type="text/babel"` — Babel compila JSX en el navegador.
El entry point es `index v2.html` (con espacio en el nombre).

**Orden de carga en `index v2.html`:**
1. CSS links (`styles-v2.css`, `magazine-styles.css`)
2. Loader inline CSS + `#umbria-loader` div
3. Script dismiss del loader (espera evento `fm-ready`)
4. React + ReactDOM + Babel (CDN `unpkg.com`)
5. **FM Proxy fallback** (script sync — `window.motion` como Proxy)
6. **FM ESM import** (`<script type="module">` desde `esm.sh/framer-motion@11`)
7. `placeholders.js` (sin Babel — JS puro)
8. Claude API mock (sin Babel — JS puro)
9. Todos los `.jsx` con `type="text/babel"`
10. `app-v2.jsx` último (renderiza todo)

### Framer Motion en CDN (patrón crítico)

`window.motion` es un `Proxy` que:
- **Antes de que FM cargue**: devuelve componentes fallback que descartan props de FM (`initial`, `animate`, etc.) y renderizan el elemento HTML nativo.
- **Después de que FM cargue** (`window.__fmSetReal(fm)`): delega a `fm.motion.*`.

En cada archivo JSX:
```jsx
const motion = window.motion;       // captura el Proxy — funciona al render time
const motion2 = window.motion;      // sections-2.jsx usa motion2
const motion3 = window.motion;      // sections-3-v2.jsx usa motion3
```

`window.AnimatePresence` sigue el mismo patrón — accederlo como `window.AnimatePresence` dentro del componente (no al scope del módulo) para siempre tener la versión real.

### Patrón de exportación de componentes

**No hay imports entre archivos.** Todo se exporta via `window.*`:
```jsx
// Al final de cada archivo:
window.UmbriaHeader = Header;
window.UmbriaHero = Hero;
// etc.
```

`app-v2.jsx` los consume como `<window.UmbriaHero ... />`.

---

## 3. Estructura de archivos

```
PrototipoClaudeDesign/
├── index v2.html           ← Entry point PRINCIPAL (con espacio)
├── index.html              ← Versión v1 — no tocar
│
├── app-v2.jsx              ← Root app, render tree, tweaks panel wiring
├── sections-1-v2.jsx       ← Header, Hero, Universo, Historia
├── sections-2.jsx          ← Bodas, Paquetes, Proceso, RosaUmbria, VidaGrado, Audiovisual
├── sections-3-v2.jsx       ← Biblioteca editorial, Testimonios v2, Instagram, Contacto, Footer
├── flipbook.jsx            ← Flipbook 3D (drag + click/teclado)
├── floats.jsx              ← Chatbot IA + botón WhatsApp
├── magazine-page.jsx       ← Renderer de páginas de revista (9 layouts)
├── tweaks-panel.jsx        ← Panel de tweaks del harness
│
├── styles-v2.css           ← TODO el CSS (~2600 líneas) — no hay Tailwind
├── magazine-styles.css     ← CSS específico del flipbook y páginas de revista
│
├── placeholders.js         ← Sistema de fotos Unsplash por categoría
├── magazines-data.js       ← 9 catálogos editoriales con precios y layouts
│
├── assets/
│   ├── logos/              ← Logos reales de todas las unidades (PNGs)
│   │   ├── umbria-estudio-cream.png
│   │   ├── umbria-estudio-dark-text.png
│   │   ├── emmanuel-umbria.png / -ink.png / -terra.png
│   │   ├── fotitos-estudio.png / -ink.png / -terra.png
│   │   ├── rosa-umbria.png / -ink.png / -terra.png
│   │   └── vida-grado.png / -ink.png / -terra.png
│   └── team/               ← ⚠️ CARPETA VACÍA — el cliente debe colocar aquí:
│       ├── equipo-formal.jpg      → Team de 5, pose formal en parque
│       ├── equipo-divertidos.jpg  → Team de 5, poses divertidas en parque
│       ├── rosa-evento.jpg        → Rosa con lentes, outfit negro, pulgares arriba
│       └── trabajando.jpg         → Rosa + Emmanuel con gimbal, arrodillados
│
└── AGENTS.md               ← Este archivo
```

**Archivos v1 (legacy, no tocar):** `app.jsx`, `sections-1.jsx`, `sections-3.jsx`, `styles.css`

---

## 4. Sistema de diseño

### Variables CSS (en `:root` de `styles-v2.css`)

```css
--ink:            #0A0A0A   /* negro principal */
--ink-soft:       #1a1614   /* negro suave */
--cream:          #F7F1E8   /* crema claro */
--cream-deep:     #EFE6D5   /* crema profundo */
--champagne:      #C97846   /* COBRE OFICIAL — color del chevron del logo */
--champagne-deep: #A86038   /* cobre oscuro */
--terracotta:     #B8765A
--muted:          #6b5e51

--magazine: "Bodoni Moda", serif    /* titulares */
--script:   "Allura", cursive       /* frases script */
--sans:     "Inter", system-ui      /* cuerpo y UI */
```

### Color crítico
`--champagne: #C97846` es el cobre del logo. **No usar #D97B46** (incorrecto).

### Convenciones tipográficas
- Títulos: Bodoni Moda, uppercase, `font-weight: 900`
- Cursivas en títulos: `<em>` dentro del `<h2>` = Bodoni italic
- Frases de apoyo: Allura script, color champagne
- Labels/eyebrow: Inter, `letter-spacing: 0.28em`, uppercase, `font-size: 11px`

---

## 5. Sistema de fotos placeholder

`placeholders.js` expone:
```js
window.umbriaImg(category, seed)       // foto rectangular
window.umbriaImgSquare(category, seed) // foto cuadrada (Instagram)
```

Categorías disponibles: `weddingGolden`, `weddingBW`, `weddingMoody`, `family`,
`smashCake`, `prenatal`, `makeup`, `portrait`, `graduation`, `audiovisual`,
`parejas`, `landscape`

Cada seed produce la misma foto determinista. Usar seeds únicas por sección para no repetir fotos.

**Patrón CSS double-background** (local real + Unsplash fallback):
```jsx
style={{ backgroundImage: `url(assets/team/rosa-evento.jpg), url(${window.umbriaImg("makeup", 91)})` }}
```
El browser usa la primera URL que carga. Si la local no existe, usa Unsplash.

---

## 6. Componentes implementados — estado actual

### ✅ Completos y funcionando

**Header** (`sections-1-v2.jsx` → `window.UmbriaHeader`)
- Sticky con blur al scroll, logo dual (claro/oscuro), nav desktop + drawer mobile
- Burger animado, lock scroll cuando abierto

**Hero** (`sections-1-v2.jsx` → `window.UmbriaHero`)
- Parallax bg a 0.4x, overlay + grain
- FM animations: masthead, h1, sub, lede, CTAs con stagger
- Prop `heroImage` desde tweaks panel

**Universo** (`sections-1-v2.jsx` → `window.UmbriaUniverso`)
- Grid 5 cards con logo dual (ink/light), foto hover, links a secciones

**Historia** (`sections-1-v2.jsx` → `window.UmbriaHistoria`)
- Foto equipo formal + foto flotante (divertidos) — stacked editorial effect
- FM whileInView: imagen slide desde izquierda, contenido desde derecha
- Fotos: `assets/team/equipo-formal.jpg` + `assets/team/equipo-divertidos.jpg` (con fallback Unsplash)

**Bodas** (`sections-2.jsx` → `window.UmbriaBodas`)
- Hero dark con foto de fondo + masonry de 8 imágenes

**Paquetes** (`sections-2.jsx` → `window.UmbriaPaquetes`)
- 5 tabs: Familiar, Marca Personal, Cumpleaños, Parejas, Maquillaje
- Tab indicator animado con FM `layoutId="pack-tab-ind"`
- Checkmarks SVG champagne en feature list
- Cards con featured dark card

**Rosa Umbría** (`sections-2.jsx` → `window.UmbriaRosaUmbria`)
- Foto `assets/team/rosa-evento.jpg` + fallback
- FM whileInView: scale + slide
- Precios servicios inline

**Vida Grado** (`sections-2.jsx` → `window.UmbriaVidaGrado`)
- Layout dark con 2 paquetes de graduación

**Audiovisual** (`sections-2.jsx` → `window.UmbriaAudiovisual`)
- 3 servicios en grid
- Foto `assets/team/trabajando.jpg` como background atmosférico (opacity 0.12)

**Proceso** (`sections-2.jsx` → `window.UmbriaProceso`)
- 5 pasos con línea vertical

**Biblioteca** (`sections-3-v2.jsx` → `window.UmbriaBiblioteca`)
- Grid de 9 magazines, cada card abre el flipbook modal
- Prop `onOpenMagazine(id)`

**Flipbook** (`flipbook.jsx` → `window.FlipBook`)
- Doble modo: CSS keyframe (click/teclado) + drag rAF imperativo
- Estado: `flipping` (CSS) XOR `drag` (rAF) — nunca simultáneos
- Refs críticos: `flyingRef`, `bookRef`, `isDragging`, `dragProgress`, `dragDir`
- Flying page: fwd origin `left center`, back origin `right center`
- Snap-back si drag < 15%, completar si ≥ 15%

**Testimonios v2** (`sections-3-v2.jsx` → `window.UmbriaTestimonios`)
- 3D fan: 3 fotos simultáneas, left/right con `rotateY(±13deg) scale(0.83)`
- Blur-in por palabra: cada `<motion3.span>` con `blur(8px)→0` stagger 22ms
- AnimatePresence en el bloque de quote
- First slot: `assets/team/equipo-formal.jpg` (Emmanuel & Rosa)
- Nav: flechas circulares ink/champagne, counter `N / total`

**Instagram** (`sections-3-v2.jsx` → `window.UmbriaInstagram`)
- 3 columnas: @emmanuelumbriafotografia, @fotitosestudio_, @rosaumbria_
- Cada columna: avatar, grid 3×2, botón follow
- FM stagger whileInView por columna (delay 0.13s × idx)

**Contacto** (`sections-3-v2.jsx` → `window.UmbriaContacto`)
- Formulario + aside con datos de contacto

**Footer** (`sections-3-v2.jsx` → `window.UmbriaFooter`)
- Logo, nav, redes, tagline

**Chatbot + WhatsApp** (`floats.jsx` → `window.UmbriaFloats`)
- Chatbot llama `window.claude.complete(prompt)` — mock con 7 keywords en español
- Logo Umbría como avatar + botón chevron
- WhatsApp link directo a +56958335416

**Page Loader**
- Inline CSS + div `#umbria-loader`
- Logo PNG con fallback SVG chevron animado (stroke-dashoffset)
- Desaparece al `fm-ready` + 180ms (loader espera a que FM cargue)

---

## 7. Pendiente / próximos pasos

### Inmediato (cliente)
- [ ] Colocar 4 fotos en `assets/team/` con los nombres exactos (ver sección 3)
- [ ] Confirmar precios en `magazines-data.js` y `sections-2.jsx`
- [ ] Reemplazar fotos Unsplash con fotos reales del portafolio

### Desarrollo (siguiente fase)
- [ ] Conectar chatbot a API real de Claude (`window.claude.complete` → fetch real)
- [ ] Formulario de contacto → backend (emailjs o endpoint propio)
- [ ] Botón "Descargar PDF" en flipbook → generar PDF real
- [ ] Despliegue: el sitio es estático puro — puede ir directo a Vercel/Netlify/GitHub Pages
- [ ] SEO: meta tags OG, sitemap, schema.org (LocalBusiness + Photographer)

### Mejoras opcionales
- [ ] Dark mode toggle
- [ ] Más testimonios reales (actualmente 3)
- [ ] Video hero (reemplazar foto por video corto de bodas)
- [ ] Galería de fotos reales en sección Bodas (masonry actual usa Unsplash)

---

## 8. Git workflow

```
main     ← producción estable
develop  ← desarrollo activo (aquí trabajar)
```

Repo: `https://github.com/automatizacionesbotcore-cmyk/UmbriaEstudio.git`

Siempre trabajar en `develop`. Merge a `main` solo cuando esté listo para mostrar al cliente.

---

## 9. Cómo correr localmente

Requiere servidor HTTP (no funciona como `file://` por CORS en las imágenes).

```bash
# Opción 1: wamp64 (ya configurado)
# Abrir: http://localhost/umbria/PrototipoClaudeDesign/index%20v2.html

# Opción 2: Python
cd PrototipoClaudeDesign
python -m http.server 8080
# Abrir: http://localhost:8080/index%20v2.html

# Opción 3: VS Code Live Server
# Click derecho en "index v2.html" → Open with Live Server
```

---

## 10. Patrones críticos — NO romper

### 1. El nombre del archivo tiene espacio
`index v2.html` — así está en producción. No renombrar.

### 2. `window.*` exports — nunca imports entre JSX
Cada archivo es un script independiente. No usar `import`/`export`.

### 3. FM motion via `window.motion` — no import directo
```jsx
// ✅ Correcto
const motion = window.motion;
<motion.div animate={{ opacity: 1 }}>

// ❌ Rompe todo
import { motion } from 'framer-motion';
```

### 4. React hooks destructurados por archivo con alias
Cada JSX usa su propio alias para evitar colisiones:
```js
// sections-1-v2.jsx
const { useState: useState1, useEffect: useEffect1, useRef: useRef1 } = React;
// sections-2.jsx  
const { useState: useState2, useEffect: useEffect2 } = React;
// sections-3-v2.jsx
const { useState: useState3, useEffect: useEffect3, useRef: useRef3 } = React;
// app-v2.jsx, flipbook.jsx, floats.jsx usan React directo sin alias
```

### 5. CSS — no hay Tailwind, no hay CSS modules
Todo el CSS está en `styles-v2.css`. BEM-style con modificadores `is-*`.
Para nuevos estilos: agregar al final de `styles-v2.css`.

### 6. Imágenes de fondo — patrón double-background
```jsx
// Foto real + fallback Unsplash
style={{ backgroundImage: `url(assets/team/foto.jpg), url(${window.umbriaImg("category", seed)})` }}
```

---

## 11. Datos de contenido clave

### Precios actuales (en sections-2.jsx → PACKS)
```
Familiar:  Esencia $70k | Armonía $120k (featured) | Legado $200k
Marca:     Básico $80k | Profesional $150k | Premium $250k (featured)
Cumpleaños: Dulce $80k | Fiesta $150k (featured) | Celebración $200k
Parejas:   Amor $60k | Romance $100k (featured)
Maquillaje: Sesión $60k | Novia Esencial $180k | Novia Atelier $280k (featured)
Bodas:     Esencial $1.290.000
Graduaciones: Esencial $350k | Completa $650k (featured)
```

### magazines-data.js — 9 revistas
IDs: `bodas`, `familiar`, `embarazo`, `smash`, `marca`, `cumple`, `parejas`, `rosa`, `grado`
Cada una tiene ~8-12 páginas con layouts variados (portada, precios, galería, etc.)

---

---

## 12. Conexión Automatizatech

Este proyecto es un **entregable del pipeline de Automatizatech** — la agencia de automatización IA que generó y gestiona este cliente.

### Posición en el pipeline AT

```
Paso 1 ✅  Demo con Emmanuel & Rosa
Paso 2 ✅  Propuesta generada (precio de desarrollo)
Paso 3 ✅  Prototipo Claude Design entregado  ← ESTE REPO
Paso 4 🔄  Revisión & aprobación cliente (pendiente)
Paso 5 ⏳  Ejecución → invocar skill at-dev-kickoff
Paso 6 ⏳  Conversión a cliente definitivo
```

### Cuando el cliente apruebe

Invocar skill `at-dev-kickoff` en el entorno de Claude Code:
```
/at-dev-kickoff
```
Esto inicia la definición técnica del scope real de desarrollo.

### Memoria y contexto compartido

- **Claude memory:** `C:\Users\luis_\.claude\projects\C--Users-luis-\memory\project_umbria_studio.md`
- **Obsidian vault:** `C:\Users\luis_\Documents\Codex\AI-Memory-Vault\10-Projects\Umbria-Studio.md`
- **Project Index:** `C:\Users\luis_\Documents\Codex\AI-Memory-Vault\10-Projects\Project-Index.md`

### Agentes en paralelo

| Agente | Cómo trabaja |
|--------|-------------|
| **Claude** | Diseño, arquitectura, sesiones largas |
| **Codex** | Features nuevos, lee este AGENTS.md, hace PRs a `develop` |
| **GitHub Copilot** | Completions inline, code review |

> Todos hacen PRs o commits a `develop`. Merge a `main` solo cuando estable.

---

*Generado automáticamente al cierre de la sesión de diseño — Mayo 2026*
*Claude Sonnet 4.6 + Luis Gómez · Automatizatech*
