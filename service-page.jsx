// ============================================
// UMBRIA STUDIO — Service one-page renderer
// ============================================

const { useEffect: useEffectSvc, useState: useStateSvc } = React;

function serviceAsset(path) {
  if (!path) return "";
  if (/^(https?:)?\/\//.test(path)) return path;
  return `${window.UMBRIA_BASE_PATH || ""}${path}`;
}

function serviceImage(item, wide = true) {
  if (item && item.local) return serviceAsset(item.local);
  const fn = wide ? window.umbriaImgWide : window.umbriaImg;
  return fn(item.kind, item.seed || 1);
}

function serviceById(id) {
  const services = window.UMBRIA_SERVICES || {};
  return services[id] || services.bodas;
}

function ServicePage() {
  const [, setFmTick] = useStateSvc(0);
  const params = new URLSearchParams(window.location.search);
  const id = window.UMBRIA_SERVICE_ID || params.get("service") || "bodas";
  const service = serviceById(id);
  const next = serviceById(service.next);
  const homeUrl = serviceAsset("index%20v2.html");
  const servicePath = (sid) => serviceAsset(`servicios/${sid}/`);
  const motionS = window.motion;

  const fadeUp = {
    hidden: { opacity: 0, y: 42 },
    show: { opacity: 1, y: 0 }
  };

  useEffectSvc(() => {
    const onReady = () => setFmTick(v => v + 1);
    window.addEventListener("service-fm-ready", onReady);
    return () => window.removeEventListener("service-fm-ready", onReady);
  }, []);

  useEffectSvc(() => {
    document.title = `${service.eyebrow} — ${service.title} | Umbria Studio`;
    document.body.classList.add("service-page-body");
    return () => document.body.classList.remove("service-page-body");
  }, [service.id]);

  const heroFallback = window.umbriaImgWide(service.imageKind, 12);
  const logoSrc = service.logo || service.logoFallback || "assets/logos/umbria-estudio-dark-text.png";
  const heroImageSrc = service.heroLocal ? serviceAsset(service.heroLocal) : heroFallback;
  const heroStyle = {
    backgroundImage: service.heroLocal
      ? `url(${serviceAsset(service.heroLocal)}), url(${heroFallback})`
      : `url(${heroFallback})`
  };

  return (
    <div className="svc-page" data-service={service.id}>
      <motionS.header
        className="svc-nav"
        initial={{ y: -84, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
      >
        <a className="svc-brand" href={homeUrl} aria-label="Volver al inicio">
          <img src={serviceAsset("assets/logos/umbria-estudio-dark-text.png")} alt="Umbria Studio" />
        </a>
        <nav>
          <a href={homeUrl}>Home</a>
          <a href={service.whatsapp}>Cotizar</a>
        </nav>
      </motionS.header>

      <main>
        <section className="svc-hero">
          <motionS.a
            className="svc-back"
            href={homeUrl}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
          >
            Volver
          </motionS.a>
          <div className="svc-hero__title" aria-label={`${service.no} ${service.title}`}>
            <motionS.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {service.no}
            </motionS.span>
            <div>
              <motionS.img
                className="svc-hero__logo"
                src={serviceAsset(logoSrc)}
                alt={service.eyebrow}
                onError={(e) => {
                  if (service.logoFallback && e.currentTarget.src.indexOf(service.logoFallback) === -1) {
                    e.currentTarget.src = serviceAsset(service.logoFallback);
                  }
                }}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.64, delay: 0.38, ease: "easeOut" }}
              />
              <motionS.h1
                initial={{ opacity: 0, y: 46 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.86, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
              >
                {service.title}
              </motionS.h1>
            </div>
          </div>
          <motionS.figure
            className="svc-hero__preview"
            initial={{ opacity: 0, y: 34, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.72, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src={heroImageSrc} alt={`${service.title} — referencia visual`} />
            <figcaption>
              <span>{service.year}</span>
              <strong>{service.services}</strong>
            </figcaption>
          </motionS.figure>
          <motionS.div
            className="svc-scroll"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.05 }}
          >
            Explorar
          </motionS.div>
        </section>

        <motionS.section
          className="svc-cover"
          style={heroStyle}
          aria-label={service.title}
          initial={{ opacity: 0, clipPath: "inset(12% 7% 12% 7%)" }}
          whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="svc-cover__shade" />
          <div className="svc-film-marks" aria-hidden="true">
            <span>REC</span><span>{service.no}</span><span>UMBRIA</span>
          </div>
          {service.logo && (
            <img
              className="svc-cover__logo"
              src={serviceAsset(logoSrc)}
              alt={service.eyebrow}
              onError={(e) => {
                if (service.logoFallback && e.currentTarget.src.indexOf(service.logoFallback) === -1) {
                  e.currentTarget.src = serviceAsset(service.logoFallback);
                }
              }}
            />
          )}
        </motionS.section>

        <section className="svc-meta-section">
          <motionS.div
            className="svc-meta"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ staggerChildren: 0.08 }}
          >
            <div><span>Servicio</span><strong>{service.services}</strong></div>
            <div><span>Cliente</span><strong>{service.client}</strong></div>
            <div><span>Link</span><a href={service.whatsapp}>WhatsApp → →</a></div>
            <div><span>Temporada</span><strong>{service.year}</strong></div>
          </motionS.div>
          <motionS.div
            className="svc-intro"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="svc-kicker">{service.subtitle}</p>
            {service.intro.map((p, i) => <p key={i}>{p}</p>)}
          </motionS.div>
        </section>

        <motionS.section
          className="svc-statement"
          initial={{ backgroundColor: "#0b0b0a" }}
          whileInView={{ backgroundColor: "#0b0b0a" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="svc-statement__rail">
            {service.highlights.map((h, i) => <span key={i}>{h}</span>)}
          </div>
          <motionS.blockquote
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.82, ease: [0.16, 1, 0.3, 1] }}
          >
            {service.quote}
          </motionS.blockquote>
        </motionS.section>

        <section className="svc-packages">
          <div className="svc-section-title">
            <span>{service.no}</span>
            <h2>Opciones</h2>
          </div>
          <motionS.div
            className="svc-package-grid"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ staggerChildren: 0.08 }}
          >
            {service.packages.map((pack, i) => (
              <motionS.article
                className="svc-package"
                key={pack.name}
                variants={fadeUp}
                transition={{ duration: 0.58, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: -8 }}
              >
                <span>{String(i + 1).padStart(2, "0")}</span>
                <h3>{pack.name}</h3>
                <strong>{pack.price}</strong>
                <p>{pack.detail}</p>
              </motionS.article>
            ))}
          </motionS.div>
        </section>

        <section className="svc-gallery">
          {service.gallery.map((g, i) => (
            <motionS.figure
              key={i}
              className={`svc-gallery__item svc-gallery__item--${i + 1}`}
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.72, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <img src={serviceImage(g, true)} alt="" loading="lazy" />
            </motionS.figure>
          ))}
        </section>

        <section className="svc-process">
          <div className="svc-section-title">
            <span>{service.no}</span>
            <h2>{service.processTitle}</h2>
          </div>
          <motionS.ol
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.09 }}
          >
            {service.process.map((step, i) => (
              <motionS.li key={i} variants={fadeUp} transition={{ duration: 0.56, ease: [0.16, 1, 0.3, 1] }}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <p>{step}</p>
              </motionS.li>
            ))}
          </motionS.ol>
        </section>

        <motionS.section
          className="svc-cta"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <p>{service.eyebrow}</p>
          <h2>{service.subtitle}</h2>
          <a className="svc-button" href={service.whatsapp}>{service.cta}</a>
        </motionS.section>

        <section className="svc-next">
          <a href={servicePath(next.id)}>
            <span>Siguiente</span>
            <strong>{next.title}</strong>
            <em>Ver servicio → →</em>
          </a>
        </section>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<ServicePage />);
