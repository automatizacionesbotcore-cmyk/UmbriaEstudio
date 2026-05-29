// ============================================
// UMBRÍA STUDIO — Sections (Library, Testimonios, IG, Contacto, Footer)
// ============================================

const { useState: useState3, useEffect: useEffect3, useRef: useRef3 } = React;
const motion3 = window.motion;

// ============== BIBLIOTECA EDITORIAL ==============
function Biblioteca({ onOpenMagazine }) {
  const mags = window.UMBRIA_MAGAZINES;

  return (
    <section className="section library" id="revistas">
      <div className="container">
        <div className="section-head is-dark reveal">
          <div className="eyebrow">El efecto wow</div>
          <h2>
            NUESTRAS<br/>
            <em>revistas</em>
          </h2>
          <div className="script">hojea nuestros catálogos como una revista impresa</div>
        </div>

        <div className="library__grid">
          {mags.map((m, i) => (
            <motion3.div
              className="mag-card"
              key={m.id}
              onClick={() => onOpenMagazine(m.id)}
              initial={{ opacity: 0, y: 44, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.08 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.1 }}
              whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.3 } }}
            >
              <div className="mag-cover">
                <div className="mag-cover__inner" style={{ backgroundImage: `url(${m.coverImage})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                  <div className="mag-cover__top">
                    <span>UMBRÍA · STUDIO</span>
                    <span>ED. {m.id === "rosa" || m.id === "grado" ? "2025" : "2026"}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 14, color: "var(--champagne)", opacity: 0.95 }}>
                      {m.unit}
                    </div>
                    <div className="mag-cover__title">
                      {m.title.split("·").map((t, j) =>
                        j === 1
                          ? <em key={j}><br/>{t.trim()}</em>
                          : <span key={j}>{t.trim()}</span>
                      )}
                    </div>
                    <div className="mag-cover__sub">{m.icon}</div>
                  </div>
                  <div className="mag-cover__bottom">
                    <span>No · 0{i + 1}</span>
                    <span>{m.pages.length} pp.</span>
                  </div>
                </div>
              </div>
              <div className="mag-meta">
                <div>
                  <div className="mag-meta__title">{m.title.split("·")[0].trim()}</div>
                  <div className="mag-meta__brand">{m.brand}</div>
                </div>
                <div className="mag-meta__pages">Hojear ↗</div>
              </div>
            </motion3.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============== TESTIMONIOS ==============
const TESTIMONIES_V3 = [
  {
    id: 1,
    name: "Paulina",
    role: "Sesión Familiar · 2024",
    quote: "Quedamos muy felices con la sesión. Nos encantó su buena onda, paciencia y profesionalismo. Definitivamente volveremos.",
    img: () => window.umbriaImg("parejas", 201),
    thumb: () => window.umbriaImg("parejas", 231),
  },
  {
    id: 2,
    name: "Fernanda & Oscar",
    role: "Boda · 2024",
    quote: "Muy agradecidos por el trabajo que hacen juntos, amamos todas las fotos. Estamos muy emocionados — terminamos siendo familia.",
    img: () => window.umbriaImg("weddingGolden", 202),
    thumb: () => window.umbriaImg("weddingGolden", 232),
  },
  {
    id: 3,
    name: "Camila",
    role: "Smash Cake · 2024",
    quote: "Pensé que iba a llorar. Se rió y comió torta dos horas. Las fotos son una obra de arte. Gracias por la paciencia infinita.",
    img: () => window.umbriaImg("smashCake", 203),
    thumb: () => window.umbriaImg("smashCake", 233),
  },
  {
    id: 4,
    name: "Valentina",
    role: "Maquillaje Novia · 2024",
    quote: "Rosa tiene magia en sus manos. Mi look de novia superó todas mis expectativas. Mis invitados no me reconocían.",
    img: () => window.umbriaImg("portrait", 204),
    thumb: () => window.umbriaImg("portrait", 234),
  },
];

function Testimonios() {
  const [activeIdx, setActiveIdx] = useState3(0);
  const [dir, setDir] = useState3("next");
  const timerRef = useRef3(null);
  const n = TESTIMONIES_V3.length;
  const AnimPres = window.AnimatePresence;

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDir("next");
      setActiveIdx(v => (v + 1) % n);
    }, 6000);
  };
  useEffect3(() => { startTimer(); return () => clearInterval(timerRef.current); }, [n]);

  const goNext = () => { setDir("next"); setActiveIdx(v => (v + 1) % n); startTimer(); };
  const goPrev = () => { setDir("prev"); setActiveIdx(v => (v - 1 + n) % n); startTimer(); };

  const t = TESTIMONIES_V3[activeIdx];
  const thumbs = TESTIMONIES_V3.filter((_, i) => i !== activeIdx).slice(0, 3);

  const imgVar = {
    enter:  (d) => ({ y: d === "next" ? "110%" : "-110%", opacity: 0 }),
    center: { y: 0, opacity: 1 },
    exit:   (d) => ({ y: d === "next" ? "-110%" : "110%", opacity: 0 }),
  };
  const txtVar = {
    enter:  (d) => ({ x: d === "next" ? 46 : -46, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (d) => ({ x: d === "next" ? -46 : 46, opacity: 0 }),
  };

  return (
    <section className="section tsv3" id="testimonios">
      <div className="container">
        <div className="tsv3__grid">

          {/* Left — counter + label + thumbs */}
          <div className="tsv3__left">
            <div className="tsv3__meta">
              <span className="tsv3__counter">
                {String(activeIdx + 1).padStart(2, "0")} <span className="tsv3__sep">/</span> {String(n).padStart(2, "0")}
              </span>
              <span className="tsv3__label">RESEÑAS</span>
            </div>
            <div className="tsv3__thumbs">
              {thumbs.map(item => {
                const oi = TESTIMONIES_V3.findIndex(x => x.id === item.id);
                return (
                  <button
                    key={item.id}
                    className="tsv3__thumb"
                    onClick={() => { setDir(oi > activeIdx ? "next" : "prev"); setActiveIdx(oi); startTimer(); }}
                    aria-label={`Ver reseña de ${item.name}`}
                  >
                    <img src={item.thumb()} alt={item.name} className="tsv3__thumb-img" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center — main image with vertical slide */}
          <div className="tsv3__img-wrap">
            <AnimPres initial={false} custom={dir}>
              <motion3.img
                key={activeIdx}
                src={t.img()}
                alt={t.name}
                custom={dir}
                variants={imgVar}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
                className="tsv3__img"
              />
            </AnimPres>
          </div>

          {/* Right — text + blur words + nav */}
          <div className="tsv3__content">
            <AnimPres initial={false} custom={dir} mode="wait">
              <motion3.div
                key={activeIdx}
                custom={dir}
                variants={txtVar}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                className="tsv3__text"
              >
                <div className="tsv3__role">{t.role}</div>
                <div className="tsv3__name">{t.name}</div>
                <blockquote className="tsv3__quote">
                  ❝{" "}{t.quote.split(" ").map((word, wi) => (
                    <motion3.span
                      key={wi}
                      initial={{ filter: "blur(8px)", opacity: 0, y: 5 }}
                      animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                      transition={{ duration: 0.22, ease: "easeInOut", delay: 0.024 * wi }}
                      style={{ display: "inline-block", marginRight: "0.25em" }}
                    >
                      {word}
                    </motion3.span>
                  ))}
                </blockquote>
              </motion3.div>
            </AnimPres>

            <div className="tsv3__nav">
              <button className="tsv3__arrow" onClick={goPrev} aria-label="Anterior">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 3 L5 9 L11 15"/>
                </svg>
              </button>
              <button className="tsv3__arrow tsv3__arrow--next" onClick={goNext} aria-label="Siguiente">
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

// ============== INSTAGRAM ==============
const IG_ACCOUNTS = [
  {
    handle: "emmanuelumbriafotografia",
    name: "Emmanuel Umbría",
    bio: "Bodas · Retrato editorial",
    followers: "2.4K",
    link: "https://www.instagram.com/emmanuelumbriafotografia/",
    avatarFn: () => window.umbriaImgSquare("weddingBW", 401),
    photos: [
      { fn: () => window.umbriaImgSquare("weddingGolden", 301) },
      { fn: () => window.umbriaImgSquare("weddingBW", 302) },
      { fn: () => window.umbriaImgSquare("weddingMoody", 303) },
      { fn: () => window.umbriaImgSquare("weddingGolden", 304) },
      { fn: () => window.umbriaImgSquare("weddingBW", 305) },
      { fn: () => window.umbriaImgSquare("weddingMoody", 306) },
    ],
  },
  {
    handle: "fotitosestudio_",
    name: "Fotito Estudio",
    bio: "Familia · Embarazo · Smash Cake",
    followers: "1.9K",
    link: "https://www.instagram.com/fotitosestudio_/",
    avatarFn: () => window.umbriaImgSquare("family", 402),
    photos: [
      { fn: () => window.umbriaImgSquare("family",    311) },
      { fn: () => window.umbriaImgSquare("smashCake", 312) },
      { fn: () => window.umbriaImgSquare("prenatal",  313) },
      { fn: () => window.umbriaImgSquare("family",    314) },
      { fn: () => window.umbriaImgSquare("smashCake", 315) },
      { fn: () => window.umbriaImgSquare("prenatal",  316) },
    ],
  },
  {
    handle: "rosaumbria_",
    name: "Rosa Umbría",
    bio: "Makeup & Hair Artist ✨",
    followers: "1.7K",
    link: "https://www.instagram.com/rosaumbria_/",
    avatarFn: () => window.umbriaImgSquare("makeup", 403),
    photos: [
      { fn: () => window.umbriaImgSquare("makeup",   321) },
      { fn: () => window.umbriaImgSquare("portrait", 322) },
      { fn: () => window.umbriaImgSquare("makeup",   323) },
      { fn: () => window.umbriaImgSquare("portrait", 324) },
      { fn: () => window.umbriaImgSquare("makeup",   325) },
      { fn: () => window.umbriaImgSquare("portrait", 326) },
    ],
  },
];

// SVG Instagram icon
function IgIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function Instagram() {
  return (
    <section className="section section--cream" id="instagram">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">@umbriaestudio · día a día</div>
          <h2>
            SÍGUENOS<br/>
            <em>en instagram</em>
          </h2>
          <p style={{ maxWidth: 460, margin: "16px auto 0", color: "var(--ink-soft)", fontSize: 15 }}>
            Tres cuentas, una sola familia. Bodas, estudio y maquillaje en vivo.
          </p>
        </div>

        <div className="ig-preview-cols">
          {IG_ACCOUNTS.map((acc, igIdx) => (
            <motion3.div
              className="ig-col"
              key={acc.handle}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.72, ease: [0.25, 0.46, 0.45, 0.94], delay: igIdx * 0.13 }}
            >
              {/* Account header */}
              <div className="ig-col__header">
                <div className="ig-col__avatar" style={{ backgroundImage: `url(${acc.avatarFn()})` }} />
                <div className="ig-col__meta">
                  <div className="ig-col__handle">@{acc.handle}</div>
                  <div className="ig-col__bio">{acc.bio}</div>
                  <div className="ig-col__followers">
                    <IgIcon /> <span>{acc.followers} seguidores</span>
                  </div>
                </div>
              </div>

              {/* 3×2 photo grid */}
              <div className="ig-col__grid">
                {acc.photos.map((p, j) => (
                  <motion3.a
                    key={j}
                    className="ig-col__photo"
                    href={acc.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Post de @${acc.handle}`}
                    style={{ backgroundImage: `url(${p.fn()})` }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: j * 0.06 }}
                    whileHover={{ scale: 1.06, transition: { duration: 0.28 } }}
                  >
                    <div className="ig-col__photo-overlay">
                      <IgIcon />
                    </div>
                  </motion3.a>
                ))}
              </div>

              {/* Follow CTA */}
              <a
                className="ig-col__follow"
                href={acc.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IgIcon />
                <span>Seguir en Instagram</span>
              </a>
            </motion3.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============== CONTACTO ==============
function Contacto() {
  return (
    <section className="section contact" id="contacto">
      <div className="container">
        <div className="section-head is-dark reveal">
          <div className="eyebrow">Reserva</div>
          <h2>
            HABLEMOS<br/>
            <em>cuéntanos tu historia</em>
          </h2>
          <div className="script">primer contacto · sin compromiso</div>
        </div>

        <div className="contact__grid">
          <form className="form" onSubmit={(e) => e.preventDefault()}>
            <div className="field-row">
              <div className="field">
                <label>Nombre</label>
                <input type="text" placeholder="Tu nombre completo" />
              </div>
              <div className="field">
                <label>WhatsApp</label>
                <input type="tel" placeholder="+56 9 ..." />
              </div>
            </div>
            <div className="field-row">
              <div className="field">
                <label>Servicio</label>
                <select>
                  <option>Bodas — Emmanuel Umbría</option>
                  <option>Estudio — Fotito Estudio</option>
                  <option>Maquillaje — Rosa Umbría</option>
                  <option>Graduaciones</option>
                  <option>Audiovisual</option>
                </select>
              </div>
              <div className="field">
                <label>Fecha tentativa</label>
                <input type="text" placeholder="DD / MM / AAAA" />
              </div>
            </div>
            <div className="field">
              <label>Mensaje (opcional)</label>
              <textarea placeholder="Cuéntanos brevemente qué tienes en mente" />
            </div>
            <div style={{ marginTop: 8 }}>
              <button className="btn btn--gold" type="submit">Enviar mensaje</button>
            </div>
          </form>

          <aside className="contact__aside">
            <div className="block">
              <div className="label">WhatsApp directo</div>
              <div className="value">
                <em>+56 9</em> 5833 5416
              </div>
            </div>
            <div className="block">
              <div className="label">Email</div>
              <div className="value" style={{ fontSize: 20 }}>contacto@<em>umbriaestudio</em>.cl</div>
            </div>
            <div className="block">
              <div className="label">Ubicación</div>
              <div className="value"><em>Buin</em> · RM</div>
              <div style={{ fontSize: 13, color: "rgba(247,241,232,0.6)", marginTop: 4 }}>
                Estudio en Buin · cubrimos toda RM y regiones bajo solicitud
              </div>
              <div className="contact__map">
                <div className="pin" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

// ============== FOOTER ==============
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <img className="brand__logo" src="assets/logos/umbria-estudio-dark-text.png" alt="Umbría Studio" />
          <div className="footer__tag">Los fotógrafos de tu historia</div>
          <div className="footer__blurb">
            Bodas, estudio, maquillaje, graduaciones y producción audiovisual desde Buin para toda Región Metropolitana y Chile.
          </div>
        </div>

        <div className="footer__col">
          <h4>Universo</h4>
          <ul>
            <li><a href="servicios/bodas/index.html">Emmanuel Umbría — Bodas</a></li>
            <li><a href="servicios/estudio/index.html">Fotito Estudio</a></li>
            <li><a href="servicios/maquillaje/index.html">Rosa Umbría — Makeup</a></li>
            <li><a href="servicios/graduaciones/index.html">Vida Grado</a></li>
            <li><a href="servicios/audiovisual/index.html">Audiovisual</a></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Empresa</h4>
          <ul>
            <li><a href="#historia">Quiénes somos</a></li>
            <li><a href="#revistas">Revistas</a></li>
            <li><a href="#contacto">Contacto</a></li>
            <li><a>Portal privado clientes</a></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Redes</h4>
          <ul>
            <li><a>@umbriaestudio</a></li>
            <li><a>@emmanuelumbriafotografia</a></li>
            <li><a>@fotitosestudio_</a></li>
            <li><a>@rosaumbria_</a></li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div>© 2026 Umbría Studio — Hecho con cariño por familia, para familias</div>
        <div className="footer__pay">
          <span>Efectivo</span>
          <span>Débito</span>
          <span>Crédito</span>
          <span>Transferencia</span>
        </div>
      </div>
    </footer>
  );
}

window.UmbriaBiblioteca = Biblioteca;
window.UmbriaTestimonios = Testimonios;
window.UmbriaInstagram = Instagram;
window.UmbriaContacto = Contacto;
window.UmbriaFooter = Footer;
