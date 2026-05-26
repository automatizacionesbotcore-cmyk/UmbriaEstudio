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
const motion = window.motion;       // sections-1-v2.jsx
const motion2 = window.motion;      // sections-2.jsx
const motion3 = window.motion;      // sections-3-v2.jsx
const motionF = window.motion;      // floats.jsx
```

`window.AnimatePresence` — accederlo **dentro del componente** (no a scope de módulo):
```jsx
function MiComponente() {
  const AnimPres = window.AnimatePresence;  // ✅ siempre real al render time
  ...
}
```

### Patrón de exportación de componentes

**No hay imports entre archivos.** Todo se exporta via `window.*`:
```jsx
window.UmbriaHeader = Header;
window.UmbriaHero = Hero;
// etc.
```

`app-v2.jsx` los consume como `<window.UmbriaHero ... />`.

---

## 3. Estructura de archivos

```
PrototipoClaudeDesign/
├── index v2.html           ← Entry point PRINCIPAL (con espacio — NO renombrar)
├── index.html              ← Versión v1 — no tocar
│
├── app-v2.jsx              ← Root app, render tree, tweaks panel wiring
├── sections-1-v2.jsx       ← Header, Hero (con ER carousel), Universo, Historia (card stack), Equipo
├── sections-2.jsx          ← Bodas, Paquetes (tabs auto-cycling), Proceso, RosaUmbria, VidaGrado, Audiovisual
├── sections-3-v2.jsx       ← Testimonios v3, Biblioteca editorial, Instagram, Contacto, Footer
├── flipbook.jsx            ← Flipbook 3D (drag + click/teclado)
├── floats.jsx              ← Chatbot IA + botón WhatsApp
├── magazine-page.jsx       ← Renderer de páginas de revista (9 layouts)
├── tweaks-panel.jsx        ← Panel de tweaks del harness
│
├── styles-v2.css           ← TODO el CSS (~3100 líneas) — no hay Tailwind
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
│   └── team/               ← Fotos reales del cliente — YA TIENE CONTENIDO:
│       ├── er-01.jpeg      → Silueta/atardecer Emmanuel & Rosa (79KB) — Hero principal
│       ├── er-02.jpeg      → Playa caminando de frente (359KB) — Hero carousel
│       ├── er-03.jpeg      → Caminando en la playa (459KB) — Historia card 1
│       ├── er-04.jpeg      → Abrazo en la playa (482KB) — Historia card 2
│       ├── rosa-evento.jpeg → Rosa en evento — Rosa Umbría section
│       └── trabajando.jpeg  → Equipo trabajando — Audiovisual bg
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
--copper:         #C97846   /* alias de --champagne — usar en badges/pills pkc */
--terracotta:     #B8765A
--muted:          #6b5e51

--magazine: "Bodoni Moda", serif    /* titulares */
--script:   "Allura", cursive       /* frases script */
--sans:     "Inter", system-ui      /* cuerpo y UI */
```

### Color crítico
`--champagne` y `--copper` son **exactamente el mismo valor `#C97846`**.
**No usar `#D97B46`** (incorrecto).

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
style={{ backgroundImage: `url(assets/team/rosa-evento.jpeg), url(${window.umbriaImg("makeup", 91)})` }}
```

---

## 6. Componentes implementados — estado actual (Mayo 2026)

### ✅ Completos y funcionando

**Header** (`sections-1-v2.jsx` → `window.UmbriaHeader`)
- Sticky con blur al scroll, logo dual (claro/oscuro), nav desktop + drawer mobile
- Burger animado, lock scroll cuando abierto
- Detecta secciones oscuras via `querySelectorAll('.weddings, .section--dark, .tsv3')` → cambia logo

**Hero** (`sections-1-v2.jsx` → `window.UmbriaHero`)
- Foto principal: `assets/team/er-01.jpeg`
- FM: masthead, h1, sub, lede, CTAs con stagger de entrada
- **ER Photo Carousel** (derecha): frame flotante con 4 fotos ER cycling cada 3.6s
  - CSS: `.hero__er-frame`, `.hero__er-photo-wrap`, `.hero__er-photo`, `.hero__er-label`, `.hero__er-footer`, `.hero__er-dots`, `.hero__er-dot`
  - `hero__meta-right` oculto en ≥861px (el carousel ocupa ese espacio)

**Universo** (`sections-1-v2.jsx` → `window.UmbriaUniverso`)
- Grid 5 cards con logo dual (ink/light), foto hover, links a secciones
- FM `whileInView` stagger + `whileHover { y: -7 }`

**Historia** (`sections-1-v2.jsx` → `window.UmbriaHistoria`)
- **Card stack carousel** con 2 fotos ER (`er-03.jpeg`, `er-04.jpeg`)
- Auto-avance cada 4s, click en card o en dots para avanzar manualmente
- Animación: front card entra desde la posición de la back card (rotada 5°, scale 0.90, offset x:24 y:-16) → se endereza y escala a 1:1. Exit: desliza hacia adelante-izquierda con contra-rotación
- Back card siempre visible detrás con `rotate: 5, scale: 0.90`
- CSS: `.story__card-stack`, `.story__card`, `.story__card--back`, `.story__card--front`, `.story__card-badge`, `.story__card-next`, `.story__card-dots`, `.story__dot`

**Equipo** (`sections-1-v2.jsx` → `window.UmbriaEquipo`)
- Slider de miembros del equipo con thumbnails
- Fotos de `assets/team/` con fallbacks Unsplash

**Bodas** (`sections-2.jsx` → `window.UmbriaBodas`)
- Hero dark con foto de fondo scale-in FM
- Masonry 8 celdas: `whileInView` stagger + `whileHover scale(1.04)`

**Paquetes** (`sections-2.jsx` → `window.UmbriaPaquetes`)
- 5 tabs: Familiar, Marca Personal, Cumpleaños, Parejas, Maquillaje
- **Auto-cycling** cada 5.5s: `setInterval` en `useEffect2`, se resetea al click manual
- **Dirección de slide**: `dir` state (1=forward, -1=backward) → FM `custom` prop
- **Variants**: `enter (x:±56, opacity:0)` → `center (x:0, opacity:1)` → `exit (x:∓56, opacity:0)`
- **Progress bar**: `motion2.span.pkc__tab-progress` → `scaleX: 0→1` en 5.5s linear, key reseteado por tab
- Pill tab activa: `layoutId="pkc-pill"`, background `var(--copper)` (copper definido en `:root`)
- Precios en `var(--champagne)` tanto en cards normales como featured
- CSS clave: `.pkc__tabs`, `.pkc__tab`, `.pkc__pill`, `.pkc__tab-progress`, `.pkc__grid`, `.pkc__card`, `.pkc__card--featured`, `.pkc__amount`, `.pkc__cur`, `.pkc__badge`
- hooks: `useState2`, `useEffect2`, `useRef2`

**Proceso** (`sections-2.jsx` → `window.UmbriaProceso`)
- 5 pasos con línea vertical, FM `whileInView` stagger

**Rosa Umbría** (`sections-2.jsx` → `window.UmbriaRosaUmbria`)
- Foto `assets/team/rosa-evento.jpeg` + fallback
- Servicios con FM `whileInView` slide + `whileHover { x: 4 }`

**Vida Grado** (`sections-2.jsx` → `window.UmbriaVidaGrado`)
- Layout dark con 2 paquetes, FM `whileInView` + `whileHover { y: -5 }`

**Audiovisual** (`sections-2.jsx` → `window.UmbriaAudiovisual`)
- 3 servicios en grid
- Foto `assets/team/trabajando.jpeg` como bg atmosférico (opacity 0.12, double-background pattern)
- FM `whileInView` stagger + `whileHover { y: -4 }`

**Testimonios v3** (`sections-3-v2.jsx` → `window.UmbriaTestimonios`)
- Layout 3 columnas: `[counter + thumbnails] | [imagen principal] | [quote + nav]`
- 4 testimonios con fotos Unsplash
- Auto-play 6s, prev/next arrows
- Blur-word animation: cada palabra del quote = `motion3.span` con `blur(8px)→0` stagger 24ms
- CSS: `.tsv3`, `.tsv3__inner`, `.tsv3__left`, `.tsv3__main`, `.tsv3__right`, `.tsv3__thumb`, `.tsv3__arrow`

**Biblioteca** (`sections-3-v2.jsx` → `window.UmbriaBiblioteca`)
- Grid 9 magazines, cada card abre flipbook modal
- FM `whileInView` + `whileHover { y: -10, scale: 1.02 }`

**Flipbook** (`flipbook.jsx` → `window.FlipBook`)
- Doble modo: CSS keyframe (click/teclado) + drag rAF imperativo
- Snap-back si drag < 15%, completar si ≥ 15%

**Instagram** (`sections-3-v2.jsx` → `window.UmbriaInstagram`)
- 3 columnas: @emmanuelumbriafotografia, @fotitosestudio_, @rosaumbria_
- FM `whileInView` stagger por columna + `whileHover { scale: 1.06 }` por foto

**Contacto** (`sections-3-v2.jsx` → `window.UmbriaContacto`)
- Formulario + aside con datos de contacto

**Footer** (`sections-3-v2.jsx` → `window.UmbriaFooter`)
- Logo, nav, redes, tagline

**Chatbot + WhatsApp** (`floats.jsx` → `window.UmbriaFloats`)
- Chatbot con `AnimatePresence` slide-up (motionF.div)
- Burbujas de chat: `motionF.div` con enter animation
- Float buttons: `motionF.button/a` con `whileHover/whileTap spring`
- Llama `window.claude.complete(prompt)` — mock actual en `index v2.html`
- WhatsApp → `https://wa.me/56958335416`

---

## 7. Hook aliases por archivo

```js
// sections-1-v2.jsx
const { useState: useState1, useEffect: useEffect1, useRef: useRef1 } = React;
const motion = window.motion;

// sections-2.jsx
const { useState: useState2, useEffect: useEffect2, useRef: useRef2 } = React;
const motion2 = window.motion;

// sections-3-v2.jsx
const { useState: useState3, useEffect: useEffect3, useRef: useRef3 } = React;
const motion3 = window.motion;

// floats.jsx
const { useState: useStateF, useRef: useRefF, useEffect: useEffectF } = React;
const motionF = window.motion;
```

**Nunca usar `useState` sin alias** — colisiona entre archivos en scope global de Babel.

---

## 8. CSS — namespaces por sección

| Prefijo | Sección |
|---------|---------|
| `.hero__*` | Hero + ER carousel |
| `.story__*` | Historia card stack |
| `.eqslider__*` | Equipo slider |
| `.pkc__*` | Paquetes pricing |
| `.tsv3__*` | Testimonios v3 |
| `.weddings__*`, `.masonry__*` | Bodas |
| `.step__*` | Proceso |
| `.rosa-*` | Rosa Umbría |
| `.grado-*` | Vida Grado |
| `.av-*` | Audiovisual |
| `.library__*` | Biblioteca |
| `.ig-*` | Instagram |
| `.chatbot__*`, `.float-btn` | Floats |

Todo el CSS está en `styles-v2.css`. Para nuevos estilos: agregar al final del archivo.
**No hay Tailwind. No hay CSS modules.**

---

## 9. Pendiente / próximos pasos

### Inmediato (cliente)
- [ ] Reemplazar fotos Unsplash con fotos reales del portafolio en Bodas, Testimonios, Universo
- [ ] Confirmar precios en `magazines-data.js` y `sections-2.jsx`
- [ ] Fotos equipo completo (si quiere mostrar al equipo en la sección Equipo)

### Desarrollo (siguiente fase)
- [ ] Conectar chatbot a API real de Claude (`window.claude.complete` → fetch real)
- [ ] Formulario de contacto → backend (emailjs o endpoint propio)
- [ ] Botón "Descargar PDF" en flipbook → generar PDF real
- [ ] Despliegue: el sitio es estático puro → Vercel / Netlify / GitHub Pages
- [ ] SEO: meta tags OG, sitemap, schema.org (LocalBusiness + Photographer)

### Mejoras opcionales
- [ ] Dark mode toggle
- [ ] Video hero (reemplazar foto por video corto de bodas)
- [ ] Galería de fotos reales en masonry de Bodas
- [ ] Más testimonios reales (actualmente 4 Unsplash)
- [ ] Animación de contador en sección Equipo o Estadísticas

---

## 10. Datos de contenido clave

### Precios actuales (en `sections-2.jsx` → `PACKS`)
```
Familiar:     Esencia $70k | Armonía $120k (featured) | Legado $200k
Marca:        Básico $80k  | Profesional $150k | Premium $250k (featured)
Cumpleaños:   Dulce $80k   | Fiesta $150k (featured) | Celebración $200k
Parejas:      Amor $60k    | Romance $100k (featured)
Maquillaje:   Sesión $60k  | Novia Esencial $180k | Novia Atelier $280k (featured)
Bodas:        Esencial $1.290.000
Graduaciones: Esencial $350k | Completa $650k (featured)
```

### `magazines-data.js` — 9 revistas
IDs: `bodas`, `familiar`, `embarazo`, `smash`, `marca`, `cumple`, `parejas`, `rosa`, `grado`
Cada una tiene ~8-12 páginas con layouts variados (portada, precios, galería, etc.)

---

## 11. Patrones críticos — NO romper

### 1. Nombre del archivo con espacio
`index v2.html` — NO renombrar.

### 2. `window.*` exports — nunca imports entre JSX
```jsx
// ✅ Correcto (al final de cada archivo)
window.UmbriaX = X;

// ❌ Rompe todo
export default X;
import X from './X';
```

### 3. FM motion via `window.motion` — no import directo
```jsx
// ✅
const motion = window.motion;
<motion.div animate={{ opacity: 1 }}>

// ❌ Rompe todo
import { motion } from 'framer-motion';
```

### 4. AnimatePresence — acceder dentro del componente
```jsx
// ✅
function MiComponente() {
  const AnimPres = window.AnimatePresence;
  return <AnimPres>...</AnimPres>;
}

// ❌ (puede capturar antes de que FM cargue)
const AnimPres = window.AnimatePresence;
```

### 5. Double-background pattern para fotos con fallback
```jsx
style={{ backgroundImage: `url(assets/team/foto.jpeg), url(${window.umbriaImg("category", seed)})` }}
```

### 6. `SectionBoundary` en app-v2.jsx
Cada sección está envuelta en un error boundary. Si una sección desaparece en blanco, revisar consola — habrá un error de JS aislado al boundary.

### 7. Overflow visible para FM hover lift
Los contenedores de grids necesitan `overflow: visible` para que el `translateY` en hover no se corte:
```css
.pkc__grid, .universe-grid, .library__grid, .masonry, .grado-packs { overflow: visible; }
```

---

## 12. Git workflow

```
main     ← producción estable (mostrar al cliente)
develop  ← desarrollo activo (aquí trabajar)
```

Repo: `https://github.com/automatizacionesbotcore-cmyk/UmbriaEstudio.git`

Siempre trabajar en `develop`. Merge a `main` solo cuando esté listo para mostrar al cliente.

---

## 13. Cómo correr localmente

Requiere servidor HTTP (no funciona como `file://` por CORS).

```bash
# Opción 1: wamp64 (ya configurado en la máquina del cliente)
# http://localhost/umbria/PrototipoClaudeDesign/index%20v2.html

# Opción 2: Python
cd PrototipoClaudeDesign
python -m http.server 8080
# http://localhost:8080/index%20v2.html

# Opción 3: VS Code Live Server
# Click derecho en "index v2.html" → Open with Live Server
```

---

## 14. Conexión Automatizatech

Este proyecto es un **entregable del pipeline de Automatizatech**.

```
Paso 1 ✅  Demo con Emmanuel & Rosa
Paso 2 ✅  Propuesta generada (precio de desarrollo)
Paso 3 ✅  Prototipo Claude Design entregado  ← ESTE REPO
Paso 4 🔄  Revisión & aprobación cliente (pendiente)
Paso 5 ⏳  Ejecución → invocar skill at-dev-kickoff
Paso 6 ⏳  Conversión a cliente definitivo
```

Cuando el cliente apruebe → invocar `/at-dev-kickoff` en Claude Code.

### Memoria y contexto compartido

- **Claude memory:** `C:\Users\luis_\.claude\projects\C--Users-luis-\memory\project_umbria_studio.md`
- **Obsidian vault:** `C:\Users\luis_\Documents\Codex\AI-Memory-Vault\10-Projects\Umbria-Studio.md`

### Agentes en paralelo

| Agente | Cómo trabaja |
|--------|-------------|
| **Claude** | Diseño, arquitectura, sesiones largas de refinamiento |
| **Codex** | Features nuevos, lee este AGENTS.md, hace commits a `develop` |
| **GitHub Copilot** | Completions inline, code review |

---

*Última actualización: Mayo 26, 2026 — Sesión de refinamiento v2*
*Claude Sonnet 4.6 + Luis Gómez · Automatizatech*
