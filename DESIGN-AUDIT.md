# DESIGN-AUDIT.md — Umbría Studio · Revisión de diseño v2

> Auditoría de diseño del prototipo. Rama: `design/audit-refinement`.
> Marco: DFII (Design Feasibility & Impact Index) + principios de pulido de interfaz.
> Fecha: 2026-05-29 · Claude Opus 4.8 · Automatizatech

---

## 1. Dirección estética — diagnóstico

**Movimiento:** *Editorial Magazine* (revista de moda impresa traducida a web).
**Anclas de identidad:**
- Tipografía Bodoni Moda condensada (display) + Allura (script) + Inter (UI) — fuerte, no genérica
- Paleta dominante cobre `#C97846` sobre crema `#F7F1E8` e ink `#0A0A0A` — un dominante + un acento + neutro
- Grain overlay, parallax, masthead tipo portada ("VOL. XXVI · ED. 2026"), counters editoriales
- Movimiento Framer Motion con stagger orquestado

**DFII estimado:** 12/15 (Impacto 4 · Fit 4 · Feasibility 3 · Performance 3 − Consistency Risk 2).
**Veredicto:** dirección sólida y memorable. NO es "AI slop". El trabajo es refinar, no rediseñar.

**Ancla diferenciadora** (la cosa que se recuerda): el masthead de portada de revista + el cobre sobre fotografía con grain. Conservar a toda costa.

---

## 2. Bugs de diseño encontrados y corregidos en esta rama

| # | Hallazgo | Impacto | Fix aplicado |
|---|----------|---------|--------------|
| 1 | `var(--display)` usado en tarjetas pkc (nombre, $, monto) pero **NO definido** en `:root` → fallback a serif del navegador (Times) | Alto — rompía Bodoni en toda la sección Paquetes | Añadido `--display` como alias de `--magazine` en `:root` |
| 2 | `var(--ink-muted)` sin definir (solo con fallback) | Bajo | Añadido `--ink-muted` como alias de `--muted` |
| 3 | `var(--copper)` sin definir → pill de tab activo transparente, texto cream invisible (sesión previa) | Alto | `--copper` definido en `:root` |
| 4 | Montos de precio saltaban al cambiar de tab (ancho de dígito variable) | Medio | `font-variant-numeric: tabular-nums` en `.pkc__amount` y `.hero__er-count` |

---

## 3. Refinamientos recomendados

### Aplicados en esta rama (commit 2)
- [x] **Foco accesible** — `:focus-visible` con anillo cobre (`--focus-ring`) en tabs, dots, botones flotantes, flechas, links, inputs. Halo interior se invierte a ink en fondos oscuros/hero. WCAG ✓
- [x] **Reduced motion** — `@media (prefers-reduced-motion: reduce)` neutraliza animaciones, transiciones, auto-cycles y el parallax del hero.
- [x] **Sombras tokenizadas** — escala de 3 niveles en `:root` (`--shadow-sm/md/lg`); aplicada a story stack y pkc featured (valores idénticos a los previos → sin cambio visual, solo consistencia).
- [x] **Espaciado entre secciones** — verificado: `.section` ya usa `clamp(80px,14vh,160px)` uniforme. Ritmo correcto, no requiere cambio.

### Pendientes — requieren validación visual en navegador
- [ ] **Contraste del lede del hero** sobre foto — overlay gradiente ayuda, pero validar AA del crema sobre zonas claras de cada foto ER.
- [ ] **Optical alignment** — auditar tabular-nums en counters de historia/testimonios (hecho en hero + pkc).

### Baja prioridad / opcional
- [ ] Cursor personalizado en desktop (punto cobre) — encaja con el mood editorial, refuerza el ancla.
- [ ] Transición de página al abrir flipbook (view-transition o fade orquestado).
- [ ] Hover en cards del Universo: el `y: -7` está bien; considerar revelado sutil del logo light.

---

## 3.b Auditoría de responsividad (medición DOM en navegador real)

Método: servidor estático local + Chromium headless (Claude Preview), medición de
layout con `getBoundingClientRect` a 375px (mobile), 768px (tablet) y verificación
de scroll horizontal — el bug #1 en móvil. Cubre `index v2.html` + páginas de servicio
(comparten `service-styles.css` + `service-page.js`, una es representativa de las 5).

| Check | 375px | 768px | Resultado |
|-------|-------|-------|-----------|
| Scroll horizontal de página (`scrollWidth > vw`) | NO | NO | ✓ contenido |
| Nav → burger en móvil, menú completo en tablet+ | burger | menú | ✓ correcto |
| `.tsv3__grid` (testimonios 3-col) colapsa | 1 col | — | ✓ |
| Tarjeta visible de Paquetes en viewport | sí (l16→359) | — | ✓ |
| Página servicio (bodas) — render + sin h-scroll | OK | — | ✓ |

**Veredicto responsividad:** sólida. Sin overflow horizontal en ningún breakpoint.
Los elementos que sobresalen del viewport son **hermanos de carrusel** (cards de
Paquetes/Rosa/servicios fuera de pantalla) correctamente clipeados — no generan scroll.

### Hallazgo de resiliencia (no es bug en wamp, pero anotado)
Cuando el import ESM de Framer Motion (`esm.sh`) **no carga** (red bloqueada / sandbox sin
internet), ocurren dos cosas en el primer render:
1. Los contenedores grid envueltos en `motion.div` (ej. `.pkc__grid`) pierden `display:grid`
   en modo fallback hasta un reload (los grids NO envueltos, como `.tsv3__grid`, sí aplican bien).
2. `Floats` no está dentro de un `SectionBoundary` → si lanza durante la carrera de render,
   puede dejar `#root` vacío hasta recargar.

En producción (wamp + internet) FM carga y todo renderiza. Mejora futura sugerida:
envolver `Floats` en `SectionBoundary` y/o garantizar `window.AnimatePresence` fallback
**antes** del primer `ReactDOM.render` para tolerar fallos de CDN.

---

## 4. Lo que NO se debe tocar

- El masthead de portada del hero (ancla diferenciadora)
- Paleta cobre/crema/ink — un dominante, un acento, un neutro (correcto)
- Trío tipográfico Bodoni + Allura + Inter
- Grain overlay + parallax del hero
- Arquitectura `window.UmbriaX` + Proxy de Framer Motion (ver AGENTS.md)

---

## 5. Cómo continuar

1. Revisar esta lista con el usuario → marcar qué refinamientos aplicar.
2. Aplicar en `design/audit-refinement`, un commit por grupo de cambios.
3. PR a `develop` cuando el usuario apruebe.
4. Merge a `main` solo para mostrar al cliente.

*Las correcciones de la sección 2 ya están en esta rama.*
