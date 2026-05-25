// ============================================
// UMBRÍA STUDIO — Sections (Library, Testimonios, IG, Contacto, Footer)
// ============================================

const { useState: useState3, useEffect: useEffect3 } = React;

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

        <div className="library__grid stagger reveal">
          {mags.map((m, i) => (
            <div className="mag-card" key={m.id} onClick={() => onOpenMagazine(m.id)}>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============== TESTIMONIOS ==============
const TESTIMONIES = [
  {
    name: "Paulina",
    role: "Sesión Familiar · 2024",
    quote: "Quedamos muy felices con la sesión. Nos encantó su buena onda, paciencia y profesionalismo. Definitivamente volveremos.",
    avatar: () => window.umbriaImg("family", 201),
  },
  {
    name: "Fernanda & Oscar",
    role: "Boda · 2024",
    quote: "Muy agradecidos por el trabajo que hacen juntos, amamos todas las fotos. Estamos muy emocionados — terminamos siendo familia.",
    avatar: () => window.umbriaImg("weddingGolden", 202),
  },
  {
    name: "Camila",
    role: "Smash Cake · 2024",
    quote: "Pensé que iba a llorar. Se rió y comió torta dos horas. Las fotos son una obra de arte. Gracias por la paciencia infinita.",
    avatar: () => window.umbriaImg("smashCake", 203),
  },
];

function Testimonios() {
  const [i, setI] = useState3(0);
  useEffect3(() => {
    const id = setInterval(() => setI(v => (v + 1) % TESTIMONIES.length), 6500);
    return () => clearInterval(id);
  }, []);
  const t = TESTIMONIES[i];

  return (
    <section className="section testimonials" id="testimonios">
      <div className="container">
        <div className="section-head reveal" style={{ textAlign: "center" }}>
          <div className="eyebrow">Lo que dicen</div>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
            HISTORIAS <em>contadas</em>
          </h2>
        </div>

        <div className="testimonial" key={i}>
          <div className="testimonial__avatar" style={{ backgroundImage: `url(${t.avatar()})` }} />
          <div>
            <div className="testimonial__quote">{t.quote}</div>
            <div className="testimonial__by">
              <strong>{t.name}</strong> · {t.role}
            </div>
          </div>
        </div>

        <div className="testimonials__dots">
          {TESTIMONIES.map((_, k) => (
            <button key={k} className={`dot ${k === i ? "is-active" : ""}`} onClick={() => setI(k)} aria-label={`Testimonio ${k + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============== INSTAGRAM ==============
function Instagram() {
  const tiles = [
    { src: () => window.umbriaImg("weddingGolden", 301), label: "@emmanuelumbriafotografia" },
    { src: () => window.umbriaImg("family", 302), label: "@fotitosestudio_" },
    { src: () => window.umbriaImg("makeup", 303), label: "@rosaumbria_" },
    { src: () => window.umbriaImg("weddingBW", 304), label: "@emmanuelumbriafotografia" },
    { src: () => window.umbriaImg("smashCake", 305), label: "@fotitosestudio_" },
    { src: () => window.umbriaImg("prenatal", 306), label: "@fotitosestudio_" },
  ];

  const accounts = [
    { handle: "@emmanuelumbriafotografia", bio: "Fotógrafo de Bodas y Retrato", followers: "2.4K seguidores", av: () => window.umbriaImg("weddingBW", 401) },
    { handle: "@fotitosestudio_", bio: "Historias de Familias ✨", followers: "1.9K seguidores", av: () => window.umbriaImg("family", 402) },
    { handle: "@rosaumbria_", bio: "Makeup & Hair ✨", followers: "1.7K seguidores", av: () => window.umbriaImg("makeup", 403) },
  ];

  return (
    <section className="section section--cream" id="instagram">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">@umbriaestudio · día a día</div>
          <h2>
            SÍGUENOS<br/>
            <em>en instagram</em>
          </h2>
        </div>

        <div className="instagram__grid stagger reveal">
          {tiles.map((t, i) => (
            <div className="ig-tile" key={i} style={{ backgroundImage: `url(${t.src()})` }}>
              <div className="ig-tile__overlay">{t.label}</div>
            </div>
          ))}
        </div>

        <div className="ig-accounts reveal">
          {accounts.map((a, i) => (
            <a className="ig-account" key={i}>
              <div className="ig-account__avatar" style={{ backgroundImage: `url(${a.av()})` }} />
              <div>
                <div className="ig-account__handle">{a.handle}</div>
                <div className="ig-account__bio">{a.bio}</div>
                <div className="ig-account__followers">{a.followers}</div>
              </div>
            </a>
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
          <span className="brand__mono">U</span>
          <div className="footer__tag">Los fotógrafos de tu historia</div>
          <div className="footer__blurb">
            Bodas, estudio, maquillaje, graduaciones y producción audiovisual desde Buin para toda Región Metropolitana y Chile.
          </div>
        </div>

        <div className="footer__col">
          <h4>Universo</h4>
          <ul>
            <li><a href="#bodas">Emmanuel Umbría — Bodas</a></li>
            <li><a href="#estudio">Fotito Estudio</a></li>
            <li><a href="#maquillaje">Rosa Umbría — Makeup</a></li>
            <li><a href="#graduaciones">Vida Grado</a></li>
            <li><a href="#audiovisual">Audiovisual</a></li>
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
