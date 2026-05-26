// ============================================
// UMBRÍA STUDIO — Sections (Hero, Universo, Historia)
// ============================================

const { useState: useState1, useEffect: useEffect1, useRef: useRef1 } = React;
const motion = window.motion;

// ============== HEADER ==============
const NAV_LINKS = [
  { href: "#bodas", label: "Bodas" },
  { href: "#estudio", label: "Estudio" },
  { href: "#maquillaje", label: "Maquillaje" },
  { href: "#graduaciones", label: "Graduaciones" },
  { href: "#audiovisual", label: "Audiovisual" },
  { href: "#revistas", label: "Revistas" },
];

function Header({ scrolled, isDark }) {
  const [menuOpen, setMenuOpen] = useState1(false);

  const close = () => setMenuOpen(false);

  // Lock body scroll when menu open
  useEffect1(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header className={`nav ${scrolled ? "is-scrolled" : ""} ${isDark ? "is-dark" : ""}`}>
        <a href="#top" className="brand" onClick={close}>
          <img className="brand__logo brand__logo--light" src="assets/logos/umbria-estudio-cream.png" alt="Umbría Studio" />
          <img className="brand__logo brand__logo--dark" src="assets/logos/umbria-estudio-dark-text.png" alt="Umbría Studio" />
        </a>
        <nav className="nav-menu">
          {NAV_LINKS.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <a href="#contacto" className="nav__cta">Contacto</a>
          <button
            className={`nav__burger ${menuOpen ? "nav__burger--open" : ""}`}
            aria-label={menuOpen ? "Cerrar menú" : "Menú"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(v => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* Mobile nav drawer */}
      {menuOpen && (
        <div className="mobile-nav" aria-modal="true" role="dialog">
          {/* Background click closes */}
          <div className="mobile-nav__bg" onClick={close} />
          <nav className="mobile-nav__menu">
            {NAV_LINKS.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                className="mobile-nav__link"
                style={{ animationDelay: `${i * 60}ms` }}
                onClick={close}
              >
                {l.label}
              </a>
            ))}
            <a href="#contacto" className="mobile-nav__cta" onClick={close}>
              Contacto
            </a>
          </nav>
        </div>
      )}
    </>
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
        <div className="hero__bg-image" style={{ backgroundImage: heroImage }} />
        <div className="hero__bg-overlay" />
        <div className="hero__grain" />
      </div>

      <div className="hero__inner">
        <motion.div
          className="hero__masthead"
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        >
          <span>UMBRÍA STUDIO · EST. CHILE</span>
          <div className="hero__masthead-mid">
            <span>BODAS</span><span>ESTUDIO</span><span>MAQUILLAJE</span><span>GRADO</span><span>AUDIOVISUAL</span>
          </div>
          <span>VOL. XXVI · ED. 2026</span>
        </motion.div>

        <motion.h1
          className="hero__headline"
          initial={{ opacity: 0, y: 56 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
        >
          TU HISTORIA<br/>
          <em>en portada</em>
        </motion.h1>

        <motion.div
          className="hero__sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.72 }}
        >
          Emmanuel y Rosa — fotógrafos de la vida
        </motion.div>

        <motion.p
          className="hero__lede"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.92 }}
        >
          Bodas, estudio, maquillaje, graduaciones y producción audiovisual con la sensibilidad de quienes tratan a cada cliente como familia.
        </motion.p>

        <motion.div
          className="hero__ctas"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 1.12 }}
        >
          <a href="#contacto" className="btn btn--cream">Reservar mi sesión</a>
          <a href="#universo" className="link-arrow" style={{ color: "var(--cream)" }}>
            Explorar el universo <span className="arrow" />
          </a>
        </motion.div>
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
    logo: "assets/logos/emmanuel-umbria-ink.png",
    logoLight: "assets/logos/emmanuel-umbria.png",
    tag: "Tu boda contada con sensibilidad",
    desc: "Atención personal de Emmanuel — ninguna boda se gestiona por formulario.",
    href: "#bodas",
    img: () => window.umbriaImg("weddingBW", 11),
  },
  {
    n: "02", icon: "📸", name: "FOTITO", italic: "Estudio",
    logo: "assets/logos/fotitos-estudio-ink.png",
    logoLight: "assets/logos/fotitos-estudio.png",
    tag: "Familia, embarazo, recién nacidos",
    desc: "Estudio fotográfico para los momentos que te importan, en Buin.",
    href: "#estudio",
    img: () => window.umbriaImg("family", 12),
  },
  {
    n: "03", icon: "💄", name: "ROSA", italic: "Umbría",
    logo: "assets/logos/rosa-umbria-ink.png",
    logoLight: "assets/logos/rosa-umbria.png",
    tag: "Makeup & Hair para novias",
    desc: "Maquillaje y peinado para novias, sesiones y eventos.",
    href: "#maquillaje",
    img: () => window.umbriaImg("makeup", 13),
  },
  {
    n: "04", icon: "🎓", name: "VIDA", italic: "Grado",
    logo: "assets/logos/vida-grado-ink.png",
    logoLight: "assets/logos/vida-grado.png",
    tag: "El logro que dura para siempre",
    desc: "Cobertura para colegios, institutos y universidades.",
    href: "#graduaciones",
    img: () => window.umbriaImg("graduation", 14),
  },
  {
    n: "05", icon: "🎬", name: "AUDIO", italic: "visual",
    logo: null,  // No real logo for audiovisual yet
    logoLight: null,
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
              {u.logo ? (
                <div className="universe-card__logo-wrap">
                  <img className="universe-card__logo universe-card__logo--ink" src={u.logo} alt={`${u.name} ${u.italic}`} />
                  <img className="universe-card__logo universe-card__logo--light" src={u.logoLight} alt="" aria-hidden="true" />
                </div>
              ) : (
                <h3 className="universe-card__title">
                  {u.name} <em>{u.italic}</em>
                </h3>
              )}
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
          {/* Stacked editorial photo: formal team + playful overlay */}
          <div className="story__image-wrap">
            <motion.div
              className="story__image"
              style={{ backgroundImage: `url(assets/team/equipo-formal.jpeg), url(${window.umbriaImg("parejas", 71)})` }}
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.95, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="badge">Emmanuel & Rosa · Buin · 2024</div>
            </motion.div>
            <motion.div
              className="story__image-float"
              style={{ backgroundImage: `url(assets/team/equipo-divertidos.jpeg)` }}
              initial={{ opacity: 0, y: 24, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.38 }}
            />
          </div>

          <motion.div
            className="story__content"
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.95, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
          >
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}

window.UmbriaHeader = Header;
window.UmbriaHero = Hero;
window.UmbriaUniverso = Universo;
window.UmbriaHistoria = Historia;
