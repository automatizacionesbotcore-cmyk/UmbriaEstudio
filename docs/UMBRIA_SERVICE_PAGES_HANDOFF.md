# Umbria Studio - Service Pages Handoff

Fecha: 2026-05-28  
Rama: `develop`  
Proyecto: `C:\wamp64\www\umbria\PrototipoClaudeDesign`

## Alcance

Se actualizo el prototipo frontend de Umbria Studio, manteniendo todo como fase 1 sin backend ni API. El trabajo se concentro en:

- Landing principal `index v2.html`.
- Secciones responsivas del home.
- Botones flotantes de WhatsApp/chatbot.
- Hero con rotacion visual.
- One-pages de servicios en `servicios/*/index.html`.
- Pagina de Vida Grado con parallax, videos y assets responsivos.
- Pagina de Audiovisual con frame cinematografico despues de Opciones.

## Archivos principales

- `index v2.html`
- `app-v2.jsx`
- `sections-1-v2.jsx`
- `sections-2.jsx`
- `sections-3-v2.jsx`
- `floats.jsx`
- `flipbook.jsx`
- `styles-v2.css`
- `service-data.js`
- `service-motion.js`
- `service-page.js`
- `service-styles.css`
- `servicios/bodas/index.html`
- `servicios/estudio/index.html`
- `servicios/maquillaje/index.html`
- `servicios/graduaciones/index.html`
- `servicios/audiovisual/index.html`

## Assets agregados

- Logos por servicio en `assets/logos/`.
- Frames extraidos desde PDFs en `assets/pdf-frames/`.
- Imagenes de equipo y pareja en `assets/team/`.
- Set parallax optimizado de Vida Grado en `assets/vida-grado-parallax/`.
- Videos de Vida Grado y Audiovisual en `assets/videos/`.

## Cambios destacados

### Home

- Hero mejorado con imagenes rotativas.
- Carrusel lateral reducido y condicionado para pantallas grandes.
- WhatsApp real en boton izquierdo.
- Chatbot flotante separado a la derecha.
- Secciones revisadas para mejor responsividad.
- Seccion audiovisual convertida en experiencia mas cinematografica.
- Cards de precios y paquetes ajustadas para pantallas medianas y pequenas.
- Flipbook con interaccion tactil/mouse y menor dependencia de botones.

### Servicios

- Se crearon one-pages para Bodas, Estudio, Maquillaje, Graduaciones y Audiovisual.
- Cada servicio tiene hero minimalista, logo, imagen destacada y CTA.
- Se corrigieron rutas para que `servicios/<servicio>/` cargue `index.html`.
- Se reviso ortografia visible y textos principales.
- Se agregaron animaciones CSS/Framer Motion con fallback local.

### Vida Grado

- Se agrego `ZoomParallax` solo para Graduaciones.
- Se reemplazaron imagenes del parallax por un set optimizado:
  - `assets/vida-grado-parallax/grado-ceremonia-03.jpg`
  - `assets/vida-grado-parallax/grado-cierre-02.jpg`
  - `assets/vida-grado-parallax/grado-fiesta-05.jpg`
  - `assets/vida-grado-parallax/grado-ceremonia-04.jpg`
  - `assets/vida-grado-parallax/grado-pack-06.jpg`
  - `assets/vida-grado-parallax/grado-cierre-01.jpg`
  - `assets/vida-grado-parallax/grado-editorial-07.jpg`
- Se agrego cierre con video y ticker.
- El video final alterna por refresh entre dos versiones.
- Se generaron versiones mobile 9:16 con lienzo vertical, fondo expandido y video completo encima:
  - `vida-grado-final-a-vertical.mp4`
  - `vida-grado-final-b-vertical.mp4`
  - `vida-grado-parallax-bg-vertical.mp4`

### Audiovisual

- Se agrego un frame cinematografico despues de `Opciones`.
- El frame usa video desktop y mobile:
  - desktop: `assets/videos/vida-grado-final-a.mp4`
  - mobile: `assets/videos/vida-grado-final-a-vertical.mp4`
- Incluye copy editorial, CTA y HUD tipo produccion.

## URLs de revision

Home:

`http://localhost/umbria/PrototipoClaudeDesign/index%20v2.html`

Servicios:

- `http://localhost/umbria/PrototipoClaudeDesign/servicios/bodas/index.html`
- `http://localhost/umbria/PrototipoClaudeDesign/servicios/estudio/index.html`
- `http://localhost/umbria/PrototipoClaudeDesign/servicios/maquillaje/index.html`
- `http://localhost/umbria/PrototipoClaudeDesign/servicios/graduaciones/index.html`
- `http://localhost/umbria/PrototipoClaudeDesign/servicios/audiovisual/index.html`

Usar cache-buster durante QA:

`?v=claude-design-review`

## Verificacion realizada

- `node --check service-page.js`
- Revision de dimensiones de videos verticales con `ffprobe`.
- Revision manual en navegador local durante iteraciones.
- Validacion de rutas estaticas para one-pages.

## Pendientes sugeridos para Claude

Claude debe revisar y mejorar solo si aplica:

1. Pulir equilibrio visual en pantallas notebook entre 1280 y 1440 px.
2. Revisar microcopy de CTAs para cada servicio.
3. Ajustar contraste de textos sobre video en mobile.
4. Revisar si el frame audiovisual despues de Opciones deberia usar otro video especifico del rubro.
5. Revisar el ritmo del parallax de Vida Grado en mobile para evitar saturacion visual.
6. Revisar performance de assets pesados antes de produccion.
7. Confirmar que el estilo minimalista se mantenga coherente entre home y one-pages.

## Notas de implementacion

- No se agrego backend.
- No se agrego API.
- `framer-motion` esta instalado en `package.json`, pero las paginas de servicios funcionan con fallback local si el CDN no carga.
- Las paginas usan React UMD + `service-motion.js`.
- Para produccion con subdominios, cada `servicios/<id>/index.html` puede mapearse a una ruta o subdominio independiente.
