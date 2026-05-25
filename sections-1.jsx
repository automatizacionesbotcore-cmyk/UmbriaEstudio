// ============================================
// UMBRÍA STUDIO — Sections (Hero, Universo, Historia)
// ============================================

const { useState: useState1, useEffect: useEffect1, useRef: useRef1 } = React;

// ============== HEADER ==============
function Header({ scrolled, isDark }) {
  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""} ${isDark ? "is-dark" : ""}`}>
      <a href="#top" className="brand">
        <span className="brand__mono">U</span>
        <span className="brand__name">Umbría · Studio</span>
      </a>
      <nav className="nav-menu">
        <a href="#bodas">Bodas</a>
        <a href="#estudio">Estudio</a>
        <a href="#maquillaje">Maquillaje</a>
        <a href="#graduaciones">Graduaciones</a>
        <a href="#audiovisual">Audiovisual</a>
        <a href="#revistas">Revistas</a>
      </nav>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <a href="#contacto" className="nav__cta">Contacto</a>
        <button className="nav__burger" aria-label="Menú">
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}

// ============== HERO ==============
function Hero({ heroImage }) {
  const ref = useRef1(null);
  useEffect1(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const y = window.scrollY;
      ref.current.style.transform = `translateY(${y * 0.4}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="hero" id="top">
      <div className="hero__bg" ref={ref}>
        <div className="hero__bg-image" style={{ backgroundImage: `url(${heroImage})` }} />
        <div className="hero__bg-overlay" />
        <div className="hero__grain" />
      </div>

      <div className="hero__inner">
        <div className="hero__masthead">
          <span>UMBRÍA STUDIO · EST. CHILE</span>
          <div className="hero__masthead-mid">
            <span>BODAS</span><span>ESTUDIO</span><span>MAQUILLAJE</span><span>GRADO</span><span>AUDIOVISUAL</span>
          </div>
          <span>VOL. XXVI · ED. 2026</span>
        </div>

        <h1 className="hero__headline">
          TU HISTORIA<br/>
          <em>en portada</em>
        </h1>
        <div className="hero__sub">Emmanuel y Rosa — fotógrafos de la vida</div>

        <p className="hero__lede">
          Bodas, estudio, maquillaje, graduaciones y producción audiovisual con la sensibilidad de quienes tratan a cada cliente como familia.
        </p>

        <div className="hero__ctas">
          <a href="#contacto" className="btn btn--cream">Reservar mi sesión</a>
          <a href="#universo" className="link-arrow" style={{ color: "var(--cream)" }}>
            Explorar el universo <span className="arrow" />
          </a>
        </div>
      </div>

      <div className="hero__meta-right">
        <span className="num">01</span>
        Cinco unidades<br/>una sola familia
      </div>

      <div className="scroll-cue" style={{ color: "var(--cream)" }}>
        Scroll
      </div>
    </section>
  );
}

// ============== UNIVERSO ==============
const UNIVERSE = [
  {
    n: "01", icon: "💍", name: "EMMANUEL", italic: "Umbría",
    tag: "Tu boda contada con sensibilidad",
    desc: "Atención personal de Emmanuel — ninguna boda se gestiona por formulario.",
    href: "#bodas",
    img: () => window.umbriaImg("weddingBW", 11),
  },
  {
    n: "02", icon: "📸", name: "FOTITO", italic: "Estudio",
    tag: "Familia, embarazo, recién nacidos",
    desc: "Estudio fotográfico para los momentos que te importan, en Buin.",
    href: "#estudio",
    img: () => window.umbriaImg("family", 12),
  },
  {
    n: "03", icon: "💄", name: "ROSA", italic: "Umbría",
    tag: "Makeup & Hair para novias",
    desc: "Maquillaje y peinado para novias, sesiones y eventos.",
    href: "#maquillaje",
    img: () => window.umbriaImg("makeup", 13),
  },
  {
    n: "04", icon: "🎓", name: "VIDA", italic: "Grado",
    tag: "El logro que dura para siempre",
    desc: "Cobertura para colegios, institutos y universidades.",
    href: "#graduaciones",
    img: () => window.umbriaImg("graduation", 14),
  },
  {
    n: "05", icon: "🎬", name: "AUDIO", italic: "visual",
    tag: "Podcasts, eventos y producción",
    desc: "Línea audiovisual para marcas, eventos y creadores.",
    href: "#audiovisual",
    img: () => window.umbriaImg("audiovisual", 15),
  },
];

function Universo() {
  return (
    <section className="section section--cream" id="universo">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">El universo Umbría</div>
          <h2>
            UNA SOLA FAMILIA<br/>
            <em>cinco formas de acompañarte</em>
          </h2>
          <div className="script">desde el sí, acepto hasta su graduación</div>
        </div>

        <div className="universe-grid stagger reveal">
          {UNIVERSE.map((u) => (
            <a href={u.href} className="universe-card" key={u.n}>
              <div className="universe-card__num">{u.n} ·</div>
              <div className="universe-card__icon" aria-hidden>{u.icon}</div>
              <h3 className="universe-card__title">
                {u.name} <em>{u.italic}</em>
              </h3>
              <p className="universe-card__desc">{u.desc}</p>
              <span className="universe-card__cta">Explorar <span className="arrow" /></span>
              <div className="universe-card__photo" style={{ backgroundImage: `url(${u.img()})` }} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============== HISTORIA ==============
function Historia() {
  return (
    <section className="section section--cream-deep" id="historia">
      <div className="container">
        <div className="story stagger reveal">
          <div className="story__image" style={{ backgroundImage: `url(${window.umbriaImg("portrait", 71)})` }}>
            <div className="badge">Emmanuel & Rosa · Buin · 2024</div>
          </div>
          <div className="story__content">
            <div className="script" style={{ fontSize: 36, color: "var(--champagne-deep)", marginBottom: 10 }}>
              Quiénes somos
            </div>
            <h2>
              EMMANUEL Y ROSA<br/>
              <em>fotógrafos y papás</em>
            </h2>
            <p>
              Umbría Studio nació de nuestro deseo de guardar los momentos más reales y hermosos de cada familia.
              Lo que empezó con la fotografía de bodas creció hasta convertirse en un universo audiovisual completo —
              siempre con la misma promesa: el trato humano nunca se reemplaza por automatización.
            </p>
            <div className="story__quote">
              <div className="q">"Terminamos siendo familia de quienes confían en nosotros."</div>
              <div className="by">— Emmanuel & Rosa · Fundadores</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.UmbriaHeader = Header;
window.UmbriaHero = Hero;
window.UmbriaUniverso = Universo;
window.UmbriaHistoria = Historia;
