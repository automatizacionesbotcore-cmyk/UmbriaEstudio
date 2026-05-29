// ============================================
// UMBRIA STUDIO — One page service data
// Frontend-only content, ready to map to subdomains later.
// ============================================

window.UMBRIA_SERVICE_ORDER = ["bodas", "estudio", "maquillaje", "graduaciones", "audiovisual"];

window.UMBRIA_SERVICES = {
  bodas: {
    id: "bodas",
    no: "01",
    eyebrow: "Emmanuel Umbría",
    title: "Bodas",
    subtitle: "Una cobertura editorial para el día que no se repite.",
    logo: "assets/logos/emmanuel-umbria-ink.png",
    logoFallback: "assets/logos/emmanuel-umbria-ink.png",
    heroLocal: "assets/pdf-frames/bodas/emmanuel-06.jpg",
    sessionLocal: "assets/pdf-frames/bodas/emmanuel-05.jpg",
    imageKind: "weddingGolden",
    services: "Fotografía, dirección, historia",
    client: "Parejas y familias",
    year: "Agenda 2026",
    cta: "Hablar de mi boda",
    whatsapp: "https://wa.me/56958335416?text=Hola%20Umbria%2C%20quiero%20informacion%20para%20mi%20boda",
    intro: [
      "Una boda no se cubre por formulario. Se conversa, se entiende y se acompaña. Emmanuel trabaja cada historia desde la confianza: los tiempos, las personas importantes y esos gestos que no se pueden repetir.",
      "La mirada combina fotografía documental, dirección editorial y una entrega cuidada para que el resultado se sienta elegante, humano y profundamente personal."
    ],
    highlights: ["Reunión previa con Emmanuel", "Cobertura emocional y editorial", "Galería web privada", "Dirección amable durante el día"],
    packages: [
      { name: "Boda Esencial", price: "$1.290.000", detail: "Cobertura base para ceremonias íntimas y celebraciones cuidadas." },
      { name: "Boda Editorial", price: "A cotizar", detail: "Cobertura extendida, preparativos, ceremonia, fiesta y momentos familiares." },
      { name: "Boda Signature", price: "A cotizar", detail: "Experiencia completa con mirada de revista, video y acompañamiento ampliado." }
    ],
    processTitle: "Cómo se vive",
    process: [
      "Conversamos la fecha, lugar y tipo de celebración.",
      "Definimos momentos clave, personas importantes y estilo visual.",
      "El día de la boda se cubre con calma, dirección y sensibilidad.",
      "Reciben una galería privada para revivir y compartir la historia."
    ],
    gallery: [
      { local: "assets/pdf-frames/bodas/emmanuel-05.jpg" },
      { local: "assets/pdf-frames/bodas/emmanuel-03.jpg" },
      { local: "assets/pdf-frames/bodas/emmanuel-06.jpg" },
      { local: "assets/team/er-beso-olas.jpeg" }
    ],
    quote: "No buscamos solo fotos lindas. Buscamos que al mirarlas vuelvas a sentir lo que paso.",
    next: "estudio"
  },

  estudio: {
    id: "estudio",
    no: "02",
    eyebrow: "Fotito Estudio",
    title: "Estudio",
    subtitle: "Familia, embarazo, smash cake e infancias con calma.",
    logo: "assets/logos/fotitos-estudio-ink.png",
    logoFallback: "assets/logos/fotitos-estudio-ink.png",
    heroLocal: "assets/pdf-frames/estudio/familia-01.jpg",
    sessionLocal: "assets/pdf-frames/estudio/familia-01.jpg",
    imageKind: "family",
    services: "Familia, prenatal, infancia",
    client: "Familias en Buin y RM",
    year: "Packs 2026",
    cta: "Reservar una sesión",
    whatsapp: "https://wa.me/56958335416?text=Hola%20Fotito%20Estudio%2C%20quiero%20reservar%20una%20sesion",
    intro: [
      "Fotito Estudio nació del deseo de guardar los momentos más reales de cada familia. Las sesiones están pensadas para ser naturales, cálidas y guiadas, sin poses incómodas ni presión.",
      "Los PDFs de producción definen una experiencia clara: primer contacto, reserva, asesoría personalizada, día de sesión y entrega en portafolio web privado."
    ],
    highlights: ["Asesoria de vestuario", "Estudio o exteriores", "Portafolio web privado", "Video reel en packs seleccionados"],
    packages: [
      { name: "Esencia Familiar", price: "$70.000", detail: "10 fotografías editadas, hasta 4 personas, sesión en estudio." },
      { name: "Armonía Familiar", price: "$120.000", detail: "20 fotografías, hasta 5 personas, 2 cambios de ropa y video reel." },
      { name: "Legado Familiar Signature", price: "$200.000", detail: "40 fotografías, estudio o exterior, photobook físico y dirección editorial." },
      { name: "Smash Cake", price: "$90.000 - $160.000", detail: "Minimalista, premium o temático signature con pastel y set decorado." },
      { name: "Prenatal", price: "$70.000 - $200.000", detail: "Luz, Esencia o Aurora Maternal con edición profesional y opción maquillaje." },
      { name: "Ocasiones", price: "$250.000", detail: "4 horas de cobertura para ceremonia o celebración familiar." }
    ],
    processTitle: "La experiencia familiar",
    process: [
      "Nos escribes y elegimos el tipo de sesión ideal.",
      "Reservas fecha con 50% de abono.",
      "Definimos estilo, colores, vestuario y energía.",
      "Llegan y disfrutan; guiamos luz, ritmo y poses.",
      "Seleccionan favoritas y reciben portafolio web privado."
    ],
    gallery: [
      { local: "assets/pdf-frames/estudio/familia-01.jpg" },
      { local: "assets/pdf-frames/estudio/familia-04.jpg" },
      { local: "assets/pdf-frames/estudio/familia-05.jpg" },
      { local: "assets/pdf-frames/estudio/familia-03.jpg" }
    ],
    quote: "Lo que hoy parece cotidiano, mañana será un recuerdo invaluable.",
    next: "maquillaje"
  },

  maquillaje: {
    id: "maquillaje",
    no: "03",
    eyebrow: "Rosa Umbría",
    title: "Makeup",
    subtitle: "Piel luminosa, peinado cuidado y presencia natural.",
    logo: "assets/logos/rosa-umbria-ink.png",
    logoFallback: "assets/logos/rosa-umbria-ink.png",
    heroLocal: "assets/pdf-frames/maquillaje/rosa-01.jpg",
    sessionLocal: "assets/pdf-frames/maquillaje/rosa-01.jpg",
    imageKind: "makeup",
    services: "Makeup, hair, novias",
    client: "Novias, sesiones, eventos",
    year: "Agenda 2026",
    cta: "Reservar maquillaje",
    whatsapp: "https://wa.me/56958335416?text=Hola%20Rosa%2C%20quiero%20informacion%20de%20maquillaje",
    intro: [
      "Rosa trabaja una belleza que se siente cercana: pieles que siguen viéndose piel, luz controlada y un acabado que acompaña la fotografía, la ceremonia y la noche.",
      "La experiencia se piensa alrededor de la persona: vestido, tono de piel, peinado, horario, clima y tipo de registro visual."
    ],
    highlights: ["Makeup & hair", "Look de novia", "Sesiones editoriales", "Preparacion fotografica"],
    packages: [
      { name: "Sesión", price: "$60.000", detail: "Maquillaje para sesión fotográfica, marca personal o evento breve." },
      { name: "Novia Esencial", price: "$180.000", detail: "Look de novia natural, luminoso y preparado para fotografía." },
      { name: "Novia Atelier", price: "$280.000", detail: "Experiencia completa para novia con mayor preparación y acompañamiento." }
    ],
    processTitle: "Ritual de preparacion",
    process: [
      "Conversamos ocasion, horario, piel, vestido y estilo.",
      "Definimos referencias sin perder naturalidad.",
      "Rosa prepara piel, maquillaje y peinado con calma.",
      "El resultado queda listo para cámara, movimiento y emoción."
    ],
    gallery: [
      { local: "assets/pdf-frames/maquillaje/rosa-01.jpg" },
      { local: "assets/pdf-frames/maquillaje/rosa-02.jpg" },
      { local: "assets/pdf-frames/maquillaje/rosa-04.jpg" },
      { local: "assets/pdf-frames/maquillaje/rosa-06.jpg" }
    ],
    quote: "El maquillaje no debe esconderte. Debe hacer que te reconozcas mas linda.",
    next: "graduaciones"
  },

  graduaciones: {
    id: "graduaciones",
    no: "04",
    eyebrow: "Vida Grado",
    title: "Grado",
    subtitle: "El logro, el abrazo y la memoria institucional.",
    logo: "assets/logos/vida-grado-ink.png",
    logoFallback: "assets/logos/vida-grado-ink.png",
    heroLocal: "assets/pdf-frames/graduaciones/vida-grado-06.jpg",
    sessionLocal: "assets/pdf-frames/graduaciones/vida-grado-01.jpg",
    imageKind: "graduation",
    services: "Fotografía, video, colegios",
    client: "Colegios e instituciones",
    year: "Packs 2026",
    cta: "Cotizar para mi colegio",
    whatsapp: "https://wa.me/56958335416?text=Hola%20Vida%20Grado%2C%20quiero%20cotizar%20una%20graduacion",
    intro: [
      "Vida Grado está pensado para ceremonias donde el orden importa tanto como la emoción. No se trata solo del diploma: también están las familias, los profesores y ese cierre de etapa.",
      "La cobertura mezcla ritmo documental, retratos cuidados y una entrega clara para instituciones que necesitan confianza y buena organización."
    ],
    highlights: ["Cobertura institucional", "Galería web privada", "Equipo coordinado", "Video resumen opcional"],
    packages: [
      { name: "Cobertura Esencial", price: "$350.000", detail: "2 horas, 2 fotógrafos, 100+ imágenes y portal web privado." },
      { name: "Cobertura Completa", price: "$650.000", detail: "4 horas, 3 fotógrafos, 300+ imágenes, video resumen y photobook." }
    ],
    processTitle: "Flujo institucional",
    process: [
      "Levantamos cantidad de alumnos, tiempos y lugar.",
      "Definimos protocolo, fotos oficiales y momentos familiares.",
      "Cubrimos ceremonia con equipo coordinado.",
      "Entregamos galería privada para compartir y descargar."
    ],
    gallery: [
      { local: "assets/pdf-frames/graduaciones/vida-grado-01.jpg", fit: "contain" },
      { local: "assets/pdf-frames/graduaciones/vida-grado-04.jpg", fit: "contain" },
      { local: "assets/pdf-frames/graduaciones/vida-grado-05.jpg", fit: "contain" },
      { local: "assets/pdf-frames/graduaciones/vida-grado-06.jpg", fit: "contain" }
    ],
    quote: "Una graduación es una meta colectiva: estudiante, familia e institución en una sola escena.",
    next: "audiovisual"
  },

  audiovisual: {
    id: "audiovisual",
    no: "05",
    eyebrow: "Línea audiovisual",
    title: "Audiovisual",
    subtitle: "Contenido con mirada editorial para marcas, eventos y creadores.",
    logo: "assets/logos/umbria-estudio-dark-text.png",
    heroLocal: "assets/team/trabajando.jpeg",
    sessionLocal: "assets/team/trabajando.jpeg",
    imageKind: "audiovisual",
    services: "Podcast, eventos, redes",
    client: "Marcas y creadores",
    year: "Producción 2026",
    cta: "Cotizar producción",
    whatsapp: "https://wa.me/56958335416?text=Hola%20Umbria%2C%20quiero%20cotizar%20una%20produccion%20audiovisual",
    intro: [
      "La línea audiovisual traduce ideas a piezas concretas: entrevistas, podcasts, lanzamientos, eventos corporativos y contenido para redes.",
      "La propuesta no es grabar por grabar. Es ordenar el mensaje, encontrar el encuadre y producir una pieza que se pueda usar con intención."
    ],
    highlights: ["Grabación de podcasts", "Producción de eventos", "Reels y TikToks", "Highlights para marca"],
    packages: [
      { name: "Podcast / entrevista", price: "A cotizar", detail: "Audio y video profesional para conversaciones, cápsulas y contenido experto." },
      { name: "Evento / lanzamiento", price: "A cotizar", detail: "Cobertura fotográfica y videográfica para activaciones, lanzamientos y conferencias." },
      { name: "Social / campaña", price: "A cotizar", detail: "Reels, TikToks y piezas verticales con hook, acción y cierre de marca." }
    ],
    processTitle: "Producción con guion",
    process: [
      "Aterrizamos objetivo, audiencia y piezas necesarias.",
      "Definimos formato, guion, ritmo y locación.",
      "Grabamos con mirada cinemática y control técnico.",
      "Entregamos piezas listas para publicar."
    ],
    gallery: [
      { local: "assets/team/trabajando.jpeg" },
      { local: "assets/team/equipo-formal.jpeg" },
      { local: "assets/team/equipo-divertidos.jpeg" },
      { local: "assets/team/er-03.jpeg" }
    ],
    quote: "Una buena pieza audiovisual no solo se ve bien: deja claro que hay una marca pensando detrás.",
    next: "bodas"
  }
};
