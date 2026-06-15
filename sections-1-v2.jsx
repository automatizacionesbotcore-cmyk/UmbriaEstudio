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

// ── ER Carousel photos ──
const ER_PHOTOS = [
  { src: "assets/team/er-01.jpeg", label: "Junto al mar" },
  { src: "assets/team/er-02.jpeg", label: "Emmanuel & Rosa" },
  { src: "assets/team/er-03.jpeg", label: "Nuestra historia" },
  { src: "assets/team/er-04.jpeg", label: "Buin · Chile" },
];

// ============== HERO ==============
function Hero({ heroImage }) {
  const ref = useRef1(null);
  const [erIdx, setErIdx] = useState1(0);
  const erTimerRef = useRef1(null);
  const AnimPresHero = window.AnimatePresence;

  // Parallax scroll
  useEffect1(() => {
    const onScroll = () => {
      if (!ref.current) return;
      ref.current.style.transform = `translateY(${window.scrollY * 0.4}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-advance ER carousel
  useEffect1(() => {
    erTimerRef.current = setInterval(() => {
      setErIdx(v => (v + 1) % ER_PHOTOS.length);
    }, 3600);
    return () => clearInterval(erTimerRef.current);
  }, []);

  const goErTo = (i) => {
    clearInterval(erTimerRef.current);
    setErIdx(i);
    erTimerRef.current = setInterval(() => setErIdx(v => (v + 1) % ER_PHOTOS.length), 3600);
  };

  return (
    <section className="hero" id="top">
      <div className="hero__bg" ref={ref}>
        <AnimPresHero initial={false}>
          <motion.div
            key={`hero-bg-${erIdx}`}
            className="hero__bg-image"
            style={{ backgroundImage: `url(${ER_PHOTOS[erIdx].src}), ${heroImage}` }}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.15, ease: [0.4, 0, 0.2, 1] }}
          />
        </AnimPresHero>
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
          <span className="hero__headline-desktop">TU HISTORIA</span>
          <span className="hero__headline-mobile">TU<br/>HISTORIA</span><br/>
          <em>en portada</em>
        </motion.h1>

        <motion.div
          className="hero__sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.72 }}
        >
          Emmanuel y Rosa, fotógrafos de la vida
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

      {/* ── ER Photo carousel frame ── */}
      <motion.div
        className="hero__er-frame"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 1.4 }}
      >
        {/* Photo area */}
        <div className="hero__er-photo-wrap">
          <AnimPresHero initial={false}>
            <motion.div
              key={erIdx}
              className="hero__er-photo"
              style={{ backgroundImage: `url(${ER_PHOTOS[erIdx].src})` }}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
            />
          </AnimPresHero>
          {/* Label overlay */}
          <div className="hero__er-label">
            <span className="hero__er-label-text">{ER_PHOTOS[erIdx].label}</span>
          </div>
        </div>

        {/* Footer: counter + dots */}
        <div className="hero__er-footer">
          <span className="hero__er-count">
            {String(erIdx + 1).padStart(2, "0")} / {String(ER_PHOTOS.length).padStart(2, "0")}
          </span>
          <div className="hero__er-dots">
            {ER_PHOTOS.map((_, di) => (
              <button
                key={di}
                className={`hero__er-dot ${di === erIdx ? "is-active" : ""}`}
                onClick={() => goErTo(di)}
                aria-label={`Foto ${di + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.div>

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

// ============== PROOF STRIP ==============
const PROOF_ITEMS = [
  {
    k: "01",
    title: "Reunión personal",
    text: "Cada boda y sesión importante parte con una conversación real con Emmanuel o Rosa.",
  },
  {
    k: "02",
    title: "Dirección cercana",
    text: "Guía de poses, vestuario y ritmo para que la experiencia se sienta natural.",
  },
  {
    k: "03",
    title: "Entrega editorial",
    text: "Galerías privadas, selección cuidada y piezas pensadas para conservar.",
  },
  {
    k: "04",
    title: "Cinco líneas",
    text: "Bodas, estudio, maquillaje, graduaciones y audiovisual bajo una sola mirada.",
  },
];

function ProofStrip() {
  return (
    <section className="proof-strip" aria-label="Experiencia Umbría">
      <div className="container">
        <div className="proof-strip__grid">
          <motion.div
            className="proof-strip__lead"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="eyebrow">La diferencia Umbría</div>
            <h2>
              MÁS QUE FOTOS,<br/>
              <em>una experiencia guiada</em>
            </h2>
          </motion.div>

          <div className="proof-strip__items">
            {PROOF_ITEMS.map((item, i) => (
              <motion.article
                className="proof-strip__item"
                key={item.k}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.58, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.22 } }}
              >
                <span className="proof-strip__num">{item.k}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
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
    href: "servicios/bodas/index.html",
    img: () => window.umbriaImg("weddingBW", 11),
  },
  {
    n: "02", icon: "📸", name: "FOTITO", italic: "Estudio",
    logo: "assets/logos/fotitos-estudio-ink.png",
    logoLight: "assets/logos/fotitos-estudio.png",
    tag: "Familia, embarazo, recién nacidos",
    desc: "Estudio fotográfico para los momentos que te importan, en Buin.",
    href: "servicios/estudio/index.html",
    img: () => window.umbriaImg("family", 12),
  },
  {
    n: "03", icon: "💄", name: "ROSA", italic: "Umbría",
    logo: "assets/logos/rosa-umbria-ink.png",
    logoLight: "assets/logos/rosa-umbria.png",
    tag: "Makeup & Hair para novias",
    desc: "Maquillaje y peinado para novias, sesiones y eventos.",
    href: "servicios/maquillaje/index.html",
    img: () => window.umbriaImg("makeup", 13),
  },
  {
    n: "04", icon: "🎓", name: "VIDA", italic: "Grado",
    logo: "assets/logos/vida-grado-ink.png",
    logoLight: "assets/logos/vida-grado.png",
    tag: "El logro que dura para siempre",
    desc: "Cobertura para colegios, institutos y universidades.",
    href: "servicios/graduaciones/index.html",
    img: () => window.umbriaImg("graduation", 14),
  },
  {
    n: "05", icon: "🎬", name: "AUDIO", italic: "visual",
    logo: null,  // No real logo for audiovisual yet
    logoLight: null,
    tag: "Podcasts, eventos y producción",
    desc: "Línea audiovisual para marcas, eventos y creadores.",
    href: "servicios/audiovisual/index.html",
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

        <div className="universe-grid">
          {UNIVERSE.map((u, uIdx) => (
            <motion.a
              href={u.href}
              className="universe-card"
              key={u.n}
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.08 }}
              transition={{ duration: 0.68, ease: [0.25, 0.46, 0.45, 0.94], delay: uIdx * 0.1 }}
              whileHover={{ y: -7, transition: { duration: 0.28, ease: "easeOut" } }}
            >
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
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============== HISTORIA ==============
const STORY_PHOTOS = [
  { src: "assets/team/er-03.jpeg", label: "Emmanuel & Rosa · Buin" },
  { src: "assets/team/er-04.jpeg", label: "Nuestra historia · 2024" },
];

function Historia() {
  const [activeIdx, setActiveIdx] = useState1(0);
  const timerRef = useRef1(null);
  const AnimPresH = window.AnimatePresence;

  function startTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIdx(p => (p + 1) % STORY_PHOTOS.length);
    }, 4000);
  }

  useEffect1(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  function goTo(idx) {
    if (idx === activeIdx) return;
    setActiveIdx(idx);
    startTimer();
  }

  const backIdx = (activeIdx + 1) % STORY_PHOTOS.length;

  return (
    <section className="section section--cream-deep" id="historia">
      <div className="container">
        <div className="story stagger reveal">

          {/* ── Card stack ── */}
          <motion.div
            className="story__card-stack"
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Back card — offset, always peeking behind */}
            <motion.div
              key={`back-${backIdx}`}
              className="story__card story__card--back"
              style={{ backgroundImage: `url(${STORY_PHOTOS[backIdx].src})` }}
              animate={{ rotate: 5, scale: 0.90, x: 24, y: -16 }}
              transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            />

            {/* Front card — slides from back position to front, exits forward */}
            <AnimPresH mode="wait">
              <motion.div
                key={`front-${activeIdx}`}
                className="story__card story__card--front"
                style={{ backgroundImage: `url(${STORY_PHOTOS[activeIdx].src})` }}
                initial={{ opacity: 0.5, rotate: 5, scale: 0.90, x: 24, y: -16 }}
                animate={{ opacity: 1, rotate: 0, scale: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, scale: 1.06, x: -32, rotate: -4, y: 10 }}
                transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="story__card-badge">{STORY_PHOTOS[activeIdx].label}</div>
              </motion.div>
            </AnimPresH>

            {/* Invisible click zone to advance */}
            <button
              className="story__card-next"
              onClick={() => goTo((activeIdx + 1) % STORY_PHOTOS.length)}
              aria-label="Ver siguiente foto"
            />

            {/* Dot indicators */}
            <div className="story__card-dots">
              {STORY_PHOTOS.map((_, di) => (
                <button
                  key={di}
                  className={`story__dot ${di === activeIdx ? "is-active" : ""}`}
                  onClick={(e) => { e.stopPropagation(); goTo(di); }}
                  aria-label={`Foto ${di + 1}`}
                />
              ))}
            </div>
          </motion.div>

          {/* ── Text content ── */}
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

// ============== EQUIPO ==============
const EQUIPO_SLIDES = [
  {
    id: 1,
    title: "Emmanuel & Rosa",
    sub: "Fundadores · Directores creativos",
    desc: "Cada imagen nace de su visión. Llevan la cámara, la dirección y esa mirada única que convierte instantes en arte que se atesora para siempre.",
    img: "assets/team/trabajando.jpeg",
  },
  {
    id: 2,
    title: "El equipo completo",
    sub: "5 profesionales · 1 solo objetivo",
    desc: "Técnicos de iluminación, asistentes de producción y editores que trabajan en silencio para que el día más importante de tu vida salga perfecto.",
    img: "assets/team/equipo-formal.jpeg",
  },
  {
    id: 3,
    title: "La energía que nos mueve",
    sub: "Detrás de cámara",
    desc: "Detrás de cada sesión hay un equipo que ríe, improvisa y lo da todo. Esa misma energía auténtica se lee en cada foto que entregamos.",
    img: "assets/team/equipo-divertidos.jpeg",
  },
];

function Equipo() {
  const [activeIdx, setActiveIdx] = useState1(0);
  const [dir, setDir] = useState1("next");
  const timerRef = useRef1(null);
  const n = EQUIPO_SLIDES.length;

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDir("next");
      setActiveIdx(v => (v + 1) % n);
    }, 7000);
  };
  useEffect1(() => { startTimer(); return () => clearInterval(timerRef.current); }, []);

  const goNext = () => { setDir("next"); setActiveIdx(v => (v + 1) % n); startTimer(); };
  const goPrev = () => { setDir("prev"); setActiveIdx(v => (v - 1 + n) % n); startTimer(); };
  const goTo = (i) => {
    setDir(i > activeIdx ? "next" : "prev");
    setActiveIdx(i);
    startTimer();
  };

  const slide = EQUIPO_SLIDES[activeIdx];
  const thumbs = EQUIPO_SLIDES.filter((_, i) => i !== activeIdx);
  const AnimPres = window.AnimatePresence;

  const imgVar = {
    enter: (d) => ({ y: d === "next" ? "110%" : "-110%", opacity: 0 }),
    center: { y: 0, opacity: 1 },
    exit:  (d) => ({ y: d === "next" ? "-110%" : "110%", opacity: 0 }),
  };
  const txtVar = {
    enter: (d) => ({ x: d === "next" ? 38 : -38, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:  (d) => ({ x: d === "next" ? -38 : 38, opacity: 0 }),
  };

  return (
    <section className="section eqslider" id="equipo">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">Nuestro equipo</div>
          <h2>LAS PERSONAS<br/><em>detrás de cada foto</em></h2>
        </div>

        <div className="eqslider__grid">

          {/* Left: counter + thumbs */}
          <div className="eqslider__left">
            <div className="eqslider__counter">
              <span className="eqslider__num">{String(activeIdx + 1).padStart(2, "0")}</span>
              <span className="eqslider__sep"> / </span>
              <span className="eqslider__tot">{String(n).padStart(2, "0")}</span>
            </div>
            <div className="eqslider__thumbs">
              {thumbs.map(item => {
                const oi = EQUIPO_SLIDES.findIndex(x => x.id === item.id);
                return (
                  <button
                    key={item.id}
                    className="eqslider__thumb"
                    onClick={() => goTo(oi)}
                    aria-label={`Ver ${item.title}`}
                  >
                    <div className="eqslider__thumb-img" style={{ backgroundImage: `url(${item.img})` }} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center: main image with vertical slide */}
          <div className="eqslider__img-wrap">
            <AnimPres initial={false} custom={dir}>
              <motion.div
                key={activeIdx}
                className="eqslider__img"
                style={{ backgroundImage: `url(${slide.img})` }}
                custom={dir}
                variants={imgVar}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
              />
            </AnimPres>
          </div>

          {/* Right: text + nav */}
          <div className="eqslider__content">
            <AnimPres initial={false} custom={dir} mode="wait">
              <motion.div
                key={activeIdx}
                custom={dir}
                variants={txtVar}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="eqslider__text"
              >
                <div className="eqslider__sub">{slide.sub}</div>
                <h3 className="eqslider__title">{slide.title}</h3>
                <p className="eqslider__desc">{slide.desc}</p>
              </motion.div>
            </AnimPres>

            <div className="eqslider__nav">
              <button className="eqslider__arrow" onClick={goPrev} aria-label="Anterior">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 3 L5 9 L11 15"/>
                </svg>
              </button>
              <button className="eqslider__arrow eqslider__arrow--next" onClick={goNext} aria-label="Siguiente">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 3 L13 9 L7 15"/>
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

window.UmbriaHeader = Header;
window.UmbriaHero = Hero;
window.UmbriaProofStrip = ProofStrip;
window.UmbriaUniverso = Universo;
window.UmbriaHistoria = Historia;
window.UmbriaEquipo = Equipo;
