// ============================================
// UMBRÍA STUDIO — Sections (Bodas, Packs, Proceso)
// ============================================

const { useState: useState2, useEffect: useEffect2 } = React;
const motion2 = window.motion;

// ============== BODAS ==============
function Bodas() {
  const masonryImages = [
    window.umbriaImg("weddingBW", 41),
    window.umbriaImg("weddingGolden", 42),
    window.umbriaImg("weddingMoody", 43),
    window.umbriaImg("weddingBW", 44),
    window.umbriaImg("weddingGolden", 45),
    window.umbriaImg("weddingMoody", 46),
    window.umbriaImg("weddingGolden", 47),
    window.umbriaImg("weddingBW", 48),
  ];

  return (
    <section className="weddings" id="bodas">
      <div className="weddings__hero">
        <div className="weddings__bg" style={{ backgroundImage: `url(${window.umbriaImg("weddingBW", 40)})` }} />
        <div className="weddings__hero-inner">
          <div className="reveal">
            <div className="eyebrow">El corazón de Umbría</div>
            <h2>
              BODAS<br/>
              <em>2026·2027</em>
            </h2>
            <p>
              Para Emmanuel, cada boda comienza con una conversación de tú a tú. Reserva tu reunión personal — ninguna boda se gestiona por un formulario.
            </p>
            <div className="ctas">
              <a href="#contacto" className="btn btn--gold">Agendar con Emmanuel</a>
              <a href="#revistas" className="link-arrow" style={{ color: "var(--cream)" }}>
                Ver portafolio <span className="arrow" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="masonry">
        {masonryImages.map((src, i) => (
          <div key={i} className="masonry__cell" style={{ backgroundImage: `url(${src})` }} />
        ))}
      </div>
    </section>
  );
}

// ============== PAQUETES ==============
const TABS = [
  { id: "familiar", label: "Estudio Familiar" },
  { id: "marca", label: "Marca Personal" },
  { id: "cumple", label: "Cumpleaños" },
  { id: "parejas", label: "Parejas" },
  { id: "makeup", label: "Maquillaje" },
];

const PACKS = {
  familiar: [
    { cat: "Fotito Estudio", name: ["ESENCIA", "Familiar"], price: "70.000",
      list: ["Sesión estudio o locación", "10 fotos editadas", "Hasta 4 personas", "Galería web privada"] },
    { cat: "Fotito Estudio", name: ["ARMONÍA", "Familiar"], price: "120.000", featured: true, badge: "Más elegido",
      list: ["Sesión estudio o locación", "20 fotos editadas", "Hasta 5 personas", "Galería web privada", "Asesoría de poses"] },
    { cat: "Fotito Estudio", name: ["LEGADO", "Signature"], price: "200.000",
      list: ["Sesión 2 horas, estudio + locación", "40 fotos editadas", "Photobook físico 25x25", "Sin límite de personas"] },
  ],
  marca: [
    { cat: "Marca Personal", name: ["BÁSICO"], price: "80.000",
      list: ["Estudio o locación", "15 imágenes editadas", "Asesoría de poses", "Portal digital"] },
    { cat: "Marca Personal", name: ["PROFESIONAL"], price: "150.000",
      list: ["Estudio o locación", "25 imágenes", "Maquillaje y peinado básico", "Asesoría completa"] },
    { cat: "Marca Personal", name: ["PREMIUM"], price: "250.000", featured: true, badge: "Recomendado",
      list: ["1h estudio + 1h locación", "40 imágenes", "Maquillaje y peinado pro", "Asesoría de marca", "Entrega 7 días"] },
  ],
  cumple: [
    { cat: "Cumpleañeras", name: ["DULCE"], price: "80.000",
      list: ["Sesión en estudio", "15 imágenes editadas", "1 outfit", "Guía de poses"] },
    { cat: "Cumpleañeras", name: ["FIESTA"], price: "150.000", featured: true, badge: "Más elegido",
      list: ["Sesión estudio", "25 imágenes", "Hasta 2 outfits", "Asesoría de vestuario", "Maquillaje social"] },
    { cat: "Cumpleañeras", name: ["CELEBRACIÓN"], price: "200.000",
      list: ["Sesión 2h estudio o exterior", "35 imágenes", "Hasta 3 outfits", "Maquillaje y peinado pro"] },
  ],
  parejas: [
    { cat: "Parejas", name: ["AMOR"], price: "60.000",
      list: ["Sesión en estudio", "15 imágenes editadas", "Asesoría de poses para parejas"] },
    { cat: "Parejas", name: ["ROMANCE"], price: "100.000", featured: true, badge: "Recomendado",
      list: ["Sesión en estudio", "25 imágenes", "Maquillaje y peinado básico por @rosaumbria"] },
  ],
  makeup: [
    { cat: "Rosa Umbría", name: ["NOVIA", "Esencial"], price: "180.000",
      list: ["Prueba previa", "Maquillaje el día de la boda", "Peinado completo", "Retoque primer baile"] },
    { cat: "Rosa Umbría", name: ["NOVIA", "Atelier"], price: "280.000", featured: true, badge: "Más elegido",
      list: ["Prueba previa completa", "Maquillaje y peinado", "2 retoques durante el día", "Mamá de la novia incluida"] },
    { cat: "Rosa Umbría", name: ["SESIÓN"], price: "60.000",
      list: ["Maquillaje social", "Peinado básico", "Para sesiones de Fotito"] },
  ],
};

function Paquetes() {
  const [tab, setTab] = useState2("familiar");

  return (
    <section className="section section--cream" id="estudio">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">Sesiones · Precios 2026</div>
          <h2>
            SESIONES QUE<br/>
            <em>se ajustan a tu momento</em>
          </h2>
        </div>

        <div className="packs__tabs">
          {TABS.map(t => (
            <button
              key={t.id}
              className={`packs__tab ${tab === t.id ? "is-active" : ""}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
              {tab === t.id && (
                <motion2.span
                  layoutId="pack-tab-ind"
                  className="packs__tab-indicator"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="packs__grid stagger in" key={tab}>
          {PACKS[tab].map((p, i) => (
            <div key={i} className={`pack ${p.featured ? "is-featured" : ""}`}>
              {p.badge && <div className="pack__badge">★ {p.badge}</div>}
              <div className="pack__cat">{p.cat}</div>
              <h3 className="pack__name">
                {p.name.map((n, j) =>
                  j === 1
                    ? <em key={j}> {n}</em>
                    : <span key={j}>{j > 0 ? " " : ""}{n}</span>
                )}
              </h3>
              <div className="pack__price"><span className="cur">$</span>{p.price}</div>
              <ul className="pack__includes">
                {p.list.map((it, j) => (
                  <li key={j}>
                    <span className="pack__check">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1.5 5 L4 7.5 L8.5 2"/>
                      </svg>
                    </span>
                    {it}
                  </li>
                ))}
              </ul>
              <div className="pack__cta">
                <button className={`btn ${p.featured ? "btn--gold" : ""}`}>
                  {p.cat.includes("Novia") ? "Reservar prueba" : "Reservar este pack"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============== PROCESO ==============
const STEPS = [
  { n: "01", title: "Primer contacto", desc: "WhatsApp o formulario. Te respondemos Emmanuel o Rosa en persona." },
  { n: "02", title: "Reserva", desc: "50% de adelanto para fijar tu fecha. Saldo antes de la sesión o evento." },
  { n: "03", title: "Asesoría", desc: "Reunión virtual o presencial. Planeamos vestuario, locación y momentos." },
  { n: "04", title: "El día", desc: "Llegamos con tiempo, con equipo profesional y mucha paciencia." },
  { n: "05", title: "Entrega", desc: "Galería web privada en 30 días. Tuyas para siempre." },
];

function Proceso() {
  return (
    <section className="section section--cream-deep" id="proceso">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">Cómo funciona</div>
          <h2>
            CINCO PASOS,<br/>
            <em>una experiencia editorial</em>
          </h2>
        </div>

        <div className="process">
          <div className="process__line" />
          <div className="process__grid stagger reveal">
            {STEPS.map(s => (
              <div className="step" key={s.n}>
                <div className="step__num">{s.n}</div>
                <h4 className="step__title">{s.title}</h4>
                <p className="step__desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============== ROSA UMBRÍA ==============
function RosaUmbria() {
  return (
    <section className="section rosa-section" id="maquillaje">
      <div className="container">
        <div className="rosa-grid stagger reveal">

          <motion2.div
            className="rosa-image-wrap"
            initial={{ opacity: 0, scale: 0.96, x: -24 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="rosa-image"
              style={{ backgroundImage: `url(assets/team/rosa-evento.jpg), url(${window.umbriaImg("makeup", 91)})` }}
            >
              <div className="rosa-image__badge">Rosa Umbría · Makeup & Hair ✨</div>
            </div>
          </motion2.div>

          <div className="rosa-content">
            <div className="eyebrow" style={{ color: "var(--champagne-deep)" }}>@rosaumbria_</div>
            <h2>
              ROSA<br/>
              <em>Makeup & Hair</em>
            </h2>
            <p>
              Rosa lleva años maquillando novias y modelos en Buin y Santiago. Su sello es la luminosidad natural — pieles que se ven piel, no máscaras, incluso al final de la noche.
            </p>
            <div className="rosa-services">
              {[
                { price: "$60.000", name: "Sesión" },
                { price: "$180.000", name: "Novia Esencial" },
                { price: "$280.000", name: "Novia Atelier ★", featured: true },
              ].map((s, i) => (
                <div className={`rosa-svc ${s.featured ? "is-featured" : ""}`} key={i}>
                  <div className="rosa-svc__price">{s.price}</div>
                  <div className="rosa-svc__name">{s.name}</div>
                </div>
              ))}
            </div>
            <div className="hero__ctas" style={{ marginTop: 32 }}>
              <a href="#contacto" className="btn">Reservar maquillaje</a>
              <a href="#estudio" className="link-arrow" onClick={() => {}}>
                Ver todos los precios <span className="arrow" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ============== VIDA GRADO ==============
function VidaGrado() {
  return (
    <section className="section section--dark" id="graduaciones">
      <div className="container">
        <div className="grado-layout reveal">

          <div className="grado-head">
            <div className="eyebrow" style={{ color: "var(--champagne)" }}>Vida Grado</div>
            <h2 style={{ color: "var(--cream)" }}>
              VIDA<br/>
              <em>Grado</em>
            </h2>
            <p style={{ color: "rgba(247,241,232,0.72)", fontSize: 15, lineHeight: 1.7, marginTop: 20, maxWidth: 400 }}>
              Cubrimos graduaciones de colegios, institutos y universidades. Estilo editorial y emocional — no solo el diploma, también el abrazo del papá y la lágrima de la profesora.
            </p>
          </div>

          <div className="grado-packs stagger">
            {[
              { no: "01", price: "$350.000", name: "Cobertura Esencial",
                details: "2h · 2 fotógrafos · 100+ imágenes · portal web privado" },
              { no: "02", price: "$650.000", name: "Cobertura Completa ★", featured: true,
                details: "4h · 3 fotógrafos · 300+ imágenes · video resumen · photobook" },
            ].map((p, i) => (
              <div className={`grado-pack ${p.featured ? "is-featured" : ""}`} key={i}>
                <div className="grado-pack__no">{p.no}</div>
                <div className="grado-pack__price">{p.price}</div>
                <div className="grado-pack__name">{p.name}</div>
                <div className="grado-pack__details">{p.details}</div>
              </div>
            ))}
          </div>

          <div className="grado-photo-col">
            <div
              className="grado-photo"
              style={{ backgroundImage: `url(${window.umbriaImg("graduation", 101)})` }}
            />
            <a href="#contacto" className="btn btn--gold" style={{ marginTop: 24, width: "100%", justifyContent: "center" }}>
              Cotizar para mi colegio
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

// ============== AUDIOVISUAL ==============
const AV_SERVICES = [
  { icon: "🎙", title: "Grabación de podcasts",
    desc: "Estudio con equipos de audio y video profesionales. Tu contenido, con producción de nivel." },
  { icon: "🎬", title: "Producción de eventos",
    desc: "Cobertura fotográfica y videográfica para eventos corporativos, lanzamientos y conferencias." },
  { icon: "📱", title: "Contenido para redes",
    desc: "Producción de Reels, TikToks y contenido audiovisual para Instagram y YouTube." },
];

function Audiovisual() {
  return (
    <section className="section section--cream-deep" id="audiovisual">
      {/* Real team photo — atmospheric, low opacity, positioned right */}
      <div
        className="av-team-photo"
        style={{ backgroundImage: `url(assets/team/trabajando.jpg), url(${window.umbriaImg("audiovisual", 111)})` }}
      />
      <div className="container">
        <div className="av-layout reveal">

          <div className="av-head">
            <div className="eyebrow" style={{ color: "var(--champagne-deep)" }}>Línea audiovisual</div>
            <h2>
              AUDIO<br/>
              <em>visual</em>
            </h2>
          </div>

          <div className="av-services stagger reveal">
            {AV_SERVICES.map((s, i) => (
              <div className="av-item" key={i}>
                <div className="av-item__icon">{s.icon}</div>
                <h4 className="av-item__title">{s.title}</h4>
                <p className="av-item__desc">{s.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ alignSelf: "end" }}>
            <a href="#contacto" className="btn">Cotizar producción</a>
          </div>

        </div>
      </div>
    </section>
  );
}

window.UmbriaBodas = Bodas;
window.UmbriaPaquetes = Paquetes;
window.UmbriaProceso = Proceso;
window.UmbriaRosaUmbria = RosaUmbria;
window.UmbriaVidaGrado = VidaGrado;
window.UmbriaAudiovisual = Audiovisual;
