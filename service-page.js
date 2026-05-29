// ============================================
// UMBRIA STUDIO - Service one-page renderer
// Plain JS version so service pages work on file:// and localhost.
// ============================================

(function () {
  const { useEffect, useRef, useState } = React;
  const h = React.createElement;

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

  function fallbackMotionTag(tag) {
    return function MotionFallback(props) {
      const clean = {};
      const skip = {
        initial: 1,
        animate: 1,
        exit: 1,
        transition: 1,
        whileHover: 1,
        whileTap: 1,
        whileInView: 1,
        viewport: 1,
        variants: 1,
        layout: 1,
        layoutId: 1,
        custom: 1,
        onAnimationStart: 1,
        onAnimationComplete: 1
      };
      for (const key in props) {
        if (!skip[key]) clean[key] = props[key];
      }
      return h(tag, clean);
    };
  }

  function motionTag(tag) {
    return (window.motion && window.motion[tag]) || fallbackMotionTag(tag);
  }

  function normalizeVideoSource(video) {
    if (!video) return null;
    if (typeof video === "string") return { desktop: video, mobile: "" };
    if (video.desktop || video.mobile) return video;
    return null;
  }

  function ZoomParallax({ images, eyebrow, title, backdropSrc, backdropVideoSrc, parallaxVideoSrc }) {
    const container = useRef(null);
    const cleanImages = (images || [])
      .map((image, index) => {
        if (!image) return null;
        if (typeof image === "string") return { src: image, alt: `${title} ${index + 1}` };
        return image.src ? image : null;
      })
      .filter(Boolean)
      .slice(0, 7);
    const finaleVideos = (Array.isArray(backdropVideoSrc) ? backdropVideoSrc : [backdropVideoSrc])
      .map(normalizeVideoSource)
      .filter(Boolean);
    const parallaxVideo = normalizeVideoSource(parallaxVideoSrc);
    const [useMobileVideo, setUseMobileVideo] = useState(() =>
      window.matchMedia ? window.matchMedia("(max-width: 700px)").matches : false
    );
    const [finalVideoSrc] = useState(() => {
      if (!finaleVideos.length) return "";
      if (finaleVideos.length === 1) return finaleVideos[0];
      const key = "umbriaVidaGradoFinalVideo";
      const last = Number(window.localStorage.getItem(key) || "-1");
      const next = Number.isFinite(last) ? (last + 1) % finaleVideos.length : 0;
      window.localStorage.setItem(key, String(next));
      return finaleVideos[next];
    });
    const resolveVideoSrc = (video) => {
      if (!video) return "";
      return useMobileVideo && video.mobile ? video.mobile : video.desktop || video.mobile || "";
    };
    const parallaxVideoUrl = resolveVideoSrc(parallaxVideo);
    const finalVideoUrl = resolveVideoSrc(finalVideoSrc);
    const scales = [4, 5, 6, 5, 6, 8, 9];

    useEffect(() => {
      if (!window.matchMedia) return undefined;
      const query = window.matchMedia("(max-width: 700px)");
      const update = () => setUseMobileVideo(query.matches);
      update();
      if (query.addEventListener) {
        query.addEventListener("change", update);
        return () => query.removeEventListener("change", update);
      }
      query.addListener(update);
      return () => query.removeListener(update);
    }, []);

    useEffect(() => {
      const el = container.current;
      if (!el) return undefined;

      let frame = 0;
      const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
      const update = () => {
        frame = 0;
        const rect = el.getBoundingClientRect();
        const travel = Math.max(1, rect.height - window.innerHeight);
        const progress = clamp(-rect.top / travel, 0, 1);
        const videoProgress = clamp((progress - 0.62) / 0.38, 0, 1);
        el.style.setProperty("--zoom-progress", progress.toFixed(4));
        el.style.setProperty("--zoom-video-progress", videoProgress.toFixed(4));
        el.querySelectorAll(".svc-zoom__layer").forEach((layer) => {
          const target = Number(layer.getAttribute("data-zoom-target") || 0);
          layer.style.setProperty("--zoom-scale", (1 + progress * target).toFixed(4));
        });
      };
      const requestUpdate = () => {
        if (frame) return;
        frame = window.requestAnimationFrame(update);
      };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
      return () => {
        if (frame) window.cancelAnimationFrame(frame);
        window.removeEventListener("scroll", requestUpdate);
        window.removeEventListener("resize", requestUpdate);
      };
    }, [cleanImages.length]);

    if (!cleanImages.length) return null;

    return h(
      React.Fragment,
      null,
      h(
        "section",
        { ref: container, className: "svc-zoom", id: "mirada-visual", style: { "--zoom-progress": 0, "--zoom-video-progress": 0 } },
        h(
          "div",
          { className: "svc-zoom__sticky" },
        parallaxVideoUrl
          ? h("video", {
              className: "svc-zoom__ambient-video",
              key: parallaxVideoUrl,
              src: parallaxVideoUrl,
              autoPlay: true,
              muted: true,
              loop: true,
              playsInline: true,
              preload: "auto",
              "aria-hidden": "true"
            })
          : null,
        h(
          "div",
          { className: "svc-zoom__motion-strip svc-zoom__motion-strip--a", "aria-hidden": "true" },
          cleanImages.slice(0, 4).map((image, index) =>
            h("img", { key: `strip-a-${index}`, src: image.src, alt: "" })
          )
        ),
        h(
          "div",
          { className: "svc-zoom__motion-strip svc-zoom__motion-strip--b", "aria-hidden": "true" },
          cleanImages.slice(2, 7).map((image, index) =>
            h("img", { key: `strip-b-${index}`, src: image.src, alt: "" })
          )
        ),
        h(
          "div",
          { className: "svc-zoom__copy", "aria-hidden": "true" },
          h("span", null, eyebrow),
          h("strong", null, title),
          h("em", null, "Explora la experiencia visual")
        ),
        cleanImages.map((image, index) =>
          h(
            "div",
            {
              key: `${image.src}-${index}`,
              className: `svc-zoom__layer svc-zoom__layer--${index + 1}`,
              "data-zoom-target": scales[index % scales.length] - 1,
              style: { "--zoom-scale": 1 }
            },
            h(
              "figure",
              { className: "svc-zoom__frame" },
              h("img", {
                src: image.src,
                alt: image.alt || `${title} ${index + 1}`,
                loading: index === 0 ? "eager" : "lazy"
              })
            )
          )
        )
        )
      ),
      finalVideoUrl
        ? h(
          "section",
          { className: "svc-zoom__finale", "aria-hidden": "true" },
          parallaxVideoUrl
            ? h("video", {
                className: "svc-zoom__finale-bg-video",
                key: `bg-${parallaxVideoUrl}`,
                src: parallaxVideoUrl,
                autoPlay: true,
                muted: true,
                loop: true,
                playsInline: true,
                preload: "auto"
              })
            : null,
          h("video", {
            className: "svc-zoom__finale-video svc-zoom__finale-video--active",
            key: finalVideoUrl,
            src: finalVideoUrl,
            poster: backdropSrc,
            autoPlay: true,
            muted: true,
            loop: true,
            playsInline: true,
            preload: "auto"
          }),
          h("div", { className: "svc-zoom__finale-copy" },
            h("span", null, "VIDA GRADO")
          ),
          h("div", { className: "svc-zoom__ticker" },
            h("div", { className: "svc-zoom__ticker-track" },
              Array.from({ length: 6 }).map((_, index) =>
                h("span", { key: index },
                  "EL CIERRE TAMBIEN SE VIVE EN MOVIMIENTO",
                  h("em", null, "RECUERDOS CON RITMO, DETALLES Y CELEBRACION")
                )
              )
            )
          )
          )
        : null
    );
  }

  function AudiovisualFrame({ desktopSrc, mobileSrc, posterSrc, whatsapp }) {
    const VideoSection = motionTag("section");
    const [useMobileVideo, setUseMobileVideo] = useState(() =>
      window.matchMedia ? window.matchMedia("(max-width: 700px)").matches : false
    );
    const src = useMobileVideo && mobileSrc ? mobileSrc : desktopSrc;

    useEffect(() => {
      if (!window.matchMedia) return undefined;
      const query = window.matchMedia("(max-width: 700px)");
      const update = () => setUseMobileVideo(query.matches);
      update();
      if (query.addEventListener) {
        query.addEventListener("change", update);
        return () => query.removeEventListener("change", update);
      }
      query.addListener(update);
      return () => query.removeListener(update);
    }, []);

    if (!src) return null;

    return h(
      VideoSection,
      {
        className: "svc-av-frame",
        initial: { opacity: 0, y: 70 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.22 },
        transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
      },
      h(
        "div",
        { className: "svc-av-frame__copy" },
        h("span", null, "FRAME AUDIOVISUAL"),
        h("h2", null, "Una pieza que muestra cómo se siente la producción."),
        h("p", null, "Después de elegir la opción, el cliente puede ver el tono visual: dirección, ritmo, marca y una mirada más editorial antes de cotizar."),
        h("a", { className: "svc-button", href: whatsapp }, "Cotizar producción")
      ),
      h(
        "figure",
        { className: "svc-av-frame__screen" },
        h("video", {
          key: src,
          src,
          poster: posterSrc,
          autoPlay: true,
          muted: true,
          loop: true,
          playsInline: true,
          preload: "auto"
        }),
        h("figcaption", null,
          h("span", null, "REC"),
          h("strong", null, "Audiovisual / Producción")
        )
      )
    );
  }

  function ServicePage() {
    const [, setFmTick] = useState(0);
    const params = new URLSearchParams(window.location.search);
    const id = window.UMBRIA_SERVICE_ID || params.get("service") || "bodas";
    const service = serviceById(id);
    const next = serviceById(service.next);
    const homeUrl = serviceAsset("index%20v2.html");
    const servicePath = (sid) => serviceAsset(`servicios/${sid}/index.html`);
    const heroFallback = window.umbriaImgWide(service.imageKind, 12);
    const logoSrc = service.logo || service.logoFallback || "assets/logos/umbria-estudio-dark-text.png";
    const sessionPhoto = service.sessionLocal || service.heroLocal;
    const heroImageSrc = sessionPhoto ? serviceAsset(sessionPhoto) : heroFallback;
    const ctaShots = [sessionPhoto, ...(service.gallery || []).map((item) => item.local).filter(Boolean)]
      .filter(Boolean)
      .filter((src, index, list) => list.indexOf(src) === index)
      .slice(0, 4);
    const zoomSourceImages = service.id === "graduaciones"
      ? [
          "assets/vida-grado-parallax/grado-ceremonia-03.jpg",
          "assets/vida-grado-parallax/grado-cierre-02.jpg",
          "assets/vida-grado-parallax/grado-fiesta-05.jpg",
          "assets/vida-grado-parallax/grado-ceremonia-04.jpg",
          "assets/vida-grado-parallax/grado-pack-06.jpg",
          "assets/vida-grado-parallax/grado-cierre-01.jpg",
          "assets/vida-grado-parallax/grado-editorial-07.jpg"
        ]
      : [];
    const zoomImages = zoomSourceImages
      .filter(Boolean)
      .filter((src, index, list) => list.indexOf(src) === index)
      .slice(0, 7)
      .map((src, index) => ({
        src: serviceAsset(src),
        alt: `${service.eyebrow} - mirada visual ${index + 1}`
      }));
    const heroStyle = {
      backgroundImage: service.heroLocal
        ? `url(${serviceAsset(service.heroLocal)}), url(${heroFallback})`
        : `url(${heroFallback})`
    };
    const fadeUp = {
      hidden: { opacity: 0, y: 42 },
      show: { opacity: 1, y: 0 }
    };

    const Header = motionTag("header");
    const A = motionTag("a");
    const Span = motionTag("span");
    const Img = motionTag("img");
    const H1 = motionTag("h1");
    const Div = motionTag("div");
    const Section = motionTag("section");
    const Blockquote = motionTag("blockquote");
    const Article = motionTag("article");
    const Figure = motionTag("figure");
    const Ol = motionTag("ol");
    const Li = motionTag("li");

    useEffect(() => {
      const onReady = () => setFmTick((v) => v + 1);
      window.addEventListener("service-fm-ready", onReady);
      return () => window.removeEventListener("service-fm-ready", onReady);
    }, []);

    useEffect(() => {
      document.title = `${service.eyebrow} - ${service.title} | Umbría Studio`;
      document.body.classList.add("service-page-body");
      return () => document.body.classList.remove("service-page-body");
    }, [service.id]);

    useEffect(() => {
      if (!window.location.hash) return undefined;
      const scrollToHash = window.setTimeout(() => {
        const target = document.querySelector(window.location.hash);
        if (target) target.scrollIntoView({ block: "start" });
      }, 180);
      return () => window.clearTimeout(scrollToHash);
    }, [service.id]);

    useEffect(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const targets = Array.from(document.querySelectorAll(
        ".svc-cover, .svc-meta-section, .svc-statement, .svc-package, .svc-gallery__item, .svc-process li, .svc-cta, .svc-cta__motion, .svc-next"
      ));

      targets.forEach((el, index) => {
        el.classList.add("svc-reveal");
        el.style.setProperty("--reveal-index", String(index % 6));
      });

      if (reduceMotion || !("IntersectionObserver" in window)) {
        targets.forEach((el) => el.classList.add("is-visible"));
        return undefined;
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });

      targets.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }, [service.id]);

    const logoError = (event) => {
      if (service.logoFallback && event.currentTarget.src.indexOf(service.logoFallback) === -1) {
        event.currentTarget.src = serviceAsset(service.logoFallback);
      }
    };

    return h(
      "div",
      { className: "svc-page", "data-service": service.id },
      h(
        Header,
        {
          className: "svc-nav",
          initial: { y: -84, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          transition: { duration: 0.62, ease: [0.16, 1, 0.3, 1] }
        },
        h(
          "a",
          { className: "svc-brand", href: homeUrl, "aria-label": "Volver al inicio" },
          h("img", { src: serviceAsset("assets/logos/umbria-estudio-dark-text.png"), alt: "Umbría Studio" })
        ),
        h(
          "nav",
          null,
          h("a", { href: homeUrl }, "Home"),
          h("a", { href: service.whatsapp }, "Cotizar")
        )
      ),
      h(
        "main",
        null,
        h(
          "section",
          { className: "svc-hero" },
          h(
            A,
            {
              className: "svc-back",
              href: homeUrl,
              initial: { opacity: 0, x: -20 },
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.5, delay: 0.25, ease: "easeOut" }
            },
            "Volver"
          ),
          h(
            "div",
            { className: "svc-hero__title", "aria-label": `${service.no} ${service.title}` },
            h(
              Span,
              {
                initial: { opacity: 0, y: 24 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.72, delay: 0.35, ease: [0.16, 1, 0.3, 1] }
              },
              service.no
            ),
            h(
              "div",
              null,
              h(Img, {
                className: "svc-hero__logo",
                src: serviceAsset(logoSrc),
                alt: service.eyebrow,
                onError: logoError,
                initial: { opacity: 0, y: 18 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.64, delay: 0.38, ease: "easeOut" }
              }),
              h(
                H1,
                {
                  initial: { opacity: 0, y: 46 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.86, delay: 0.48, ease: [0.16, 1, 0.3, 1] }
                },
                service.title
              )
            )
          ),
          h(
            Figure,
            {
              className: "svc-hero__preview",
              "aria-label": `Sesión destacada de ${service.eyebrow}`,
              initial: { opacity: 0, y: 34, scale: 0.98 },
              animate: { opacity: 1, y: 0, scale: 1 },
              transition: { duration: 0.72, delay: 0.62, ease: [0.16, 1, 0.3, 1] }
            },
            h("img", { src: heroImageSrc, alt: `${service.title} - referencia visual` }),
            h("div", { className: "svc-hero__photo-tag" }, "Sesión destacada"),
            h(
              "figcaption",
              null,
              h("span", null, service.year),
              h("strong", null, service.services)
            )
          ),
          h(
            Div,
            {
              className: "svc-hero__actions",
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5, delay: 1.05, ease: "easeOut" }
            },
            h("a", { className: "svc-scroll", href: "#detalle" }, "Explorar"),
            h(
              "a",
              { className: "svc-mini-link", href: "#opciones" },
              h("span", null, "Ver detalles"),
              h("em", null, "Paquetes, proceso y mirada visual")
            )
          )
        ),
        h(
          Section,
          {
            className: "svc-cover",
            style: heroStyle,
            "aria-label": service.title,
            initial: { opacity: 0, clipPath: "inset(12% 7% 12% 7%)" },
            whileInView: { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" },
            viewport: { once: true, amount: 0.25 },
            transition: { duration: 1.05, ease: [0.16, 1, 0.3, 1] }
          },
          h("div", { className: "svc-cover__shade" }),
          h(
            "div",
            { className: "svc-film-marks", "aria-hidden": "true" },
            h("span", null, "REC"),
            h("span", null, service.no),
            h("span", null, "UMBRIA")
          ),
          service.logo
            ? h("img", {
                className: "svc-cover__logo",
                src: serviceAsset(logoSrc),
                alt: service.eyebrow,
                onError: logoError
              })
            : null
        ),
        h(
          "section",
          { className: "svc-meta-section", id: "detalle" },
          h(
            Div,
            {
              className: "svc-meta",
              initial: "hidden",
              whileInView: "show",
              viewport: { once: true, amount: 0.25 },
              transition: { staggerChildren: 0.08 }
            },
            h("div", null, h("span", null, "Servicio"), h("strong", null, service.services)),
            h("div", null, h("span", null, "Cliente"), h("strong", null, service.client)),
            h("div", null, h("span", null, "Link"), h("a", { href: service.whatsapp }, "WhatsApp ->")),
            h("div", null, h("span", null, "Temporada"), h("strong", null, service.year))
          ),
          h(
            Div,
            {
              className: "svc-intro",
              variants: fadeUp,
              initial: "hidden",
              whileInView: "show",
              viewport: { once: true, amount: 0.25 },
              transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] }
            },
            h("p", { className: "svc-kicker" }, service.subtitle),
            service.intro.map((p, i) => h("p", { key: i }, p))
          )
        ),
        h(
          Section,
          {
            className: "svc-statement",
            initial: { backgroundColor: "#0b0b0a" },
            whileInView: { backgroundColor: "#0b0b0a" },
            viewport: { once: true, amount: 0.2 }
          },
          h("div", { className: "svc-statement__rail" }, service.highlights.map((text, i) => h("span", { key: i }, text))),
          h(
            Blockquote,
            {
              variants: fadeUp,
              initial: "hidden",
              whileInView: "show",
              viewport: { once: true, amount: 0.25 },
              transition: { duration: 0.82, ease: [0.16, 1, 0.3, 1] }
            },
            service.quote
          )
        ),
        h(
          "section",
          { className: "svc-packages", id: "opciones" },
          h("div", { className: "svc-section-title" }, h("span", null, service.no), h("h2", null, "Opciones")),
          h(
            Div,
            {
              className: "svc-package-grid",
              initial: "hidden",
              whileInView: "show",
              viewport: { once: true, amount: 0.15 },
              transition: { staggerChildren: 0.08 }
            },
            service.packages.map((pack) =>
              h(
                Article,
                {
                  className: "svc-package",
                  key: pack.name,
                  variants: fadeUp,
                  transition: { duration: 0.58, ease: [0.25, 0.46, 0.45, 0.94] },
                  whileHover: { y: -8 }
                },
                h("span", null, pack.name),
                h("strong", null, pack.price),
                h("p", null, pack.detail)
              )
            )
          )
        ),
        service.id === "audiovisual"
          ? h(AudiovisualFrame, {
              desktopSrc: serviceAsset("assets/videos/vida-grado-final-a.mp4"),
              mobileSrc: serviceAsset("assets/videos/vida-grado-final-a-vertical.mp4"),
              posterSrc: serviceImage(service.sessionLocal ? { local: service.sessionLocal } : service.gallery[0], true),
              whatsapp: service.whatsapp
            })
          : null,
        service.id === "graduaciones"
          ? h(ZoomParallax, {
              images: zoomImages,
              eyebrow: service.eyebrow,
              title: service.title,
              backdropSrc: zoomImages[5] ? zoomImages[5].src : zoomImages[0] ? zoomImages[0].src : "",
              backdropVideoSrc: [
                {
                  desktop: serviceAsset("assets/videos/vida-grado-final-a.mp4"),
                  mobile: serviceAsset("assets/videos/vida-grado-final-a-vertical.mp4")
                },
                {
                  desktop: serviceAsset("assets/videos/vida-grado-final-b.mp4"),
                  mobile: serviceAsset("assets/videos/vida-grado-final-b-vertical.mp4")
                }
              ],
              parallaxVideoSrc: {
                desktop: serviceAsset("assets/videos/vida-grado-parallax-bg.mp4"),
                mobile: serviceAsset("assets/videos/vida-grado-parallax-bg-vertical.mp4")
              }
            })
          : null,
        h(
          "section",
          { className: "svc-gallery" },
          service.gallery.map((item, i) =>
            h(
              Figure,
              {
                key: i,
                className: `svc-gallery__item svc-gallery__item--${i + 1} ${item.fit === "contain" ? "svc-gallery__item--contain" : ""}`,
                initial: { opacity: 0, y: 44 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true, amount: 0.18 },
                transition: { duration: 0.72, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }
              },
              h("img", { src: serviceImage(item, i === 0 || i === 3), alt: `${service.title} ${i + 1}` })
            )
          )
        ),
        h(
          "section",
          { className: "svc-process" },
          h("div", { className: "svc-section-title" }, h("span", null, service.no), h("h2", null, service.processTitle)),
          h(
            Ol,
            {
              initial: "hidden",
              whileInView: "show",
              viewport: { once: true, amount: 0.2 },
              transition: { staggerChildren: 0.09 }
            },
            service.process.map((step, i) =>
              h(
                Li,
                {
                  key: i,
                  variants: fadeUp,
                  transition: { duration: 0.56, ease: [0.16, 1, 0.3, 1] }
                },
                h("span", null, String(i + 1).padStart(2, "0")),
                h("p", null, step)
              )
            )
          )
        ),
        h(
          Section,
          {
            className: "svc-cta",
            id: "cotizar",
            initial: { opacity: 0 },
            whileInView: { opacity: 1 },
            viewport: { once: true, amount: 0.2 },
            transition: { duration: 0.72 }
          },
          h(
            "div",
            { className: "svc-cta__content" },
            h("span", null, service.eyebrow),
            h("h2", null, service.subtitle),
            h("a", { className: "svc-button", href: service.whatsapp }, service.cta)
          ),
          h(
            Figure,
            {
              className: "svc-cta__motion",
              initial: { opacity: 0, x: 42, scale: 0.96 },
              whileInView: { opacity: 1, x: 0, scale: 1 },
              viewport: { once: true, amount: 0.2 },
              transition: { duration: 0.78, delay: 0.08, ease: [0.16, 1, 0.3, 1] }
            },
            ctaShots.map((src, index) =>
              h("img", {
                key: src,
                className: `svc-cta__shot svc-cta__shot--${index + 1}`,
                src: serviceAsset(src),
                alt: `${service.eyebrow} - trabajo ${index + 1}`
              })
            ),
            h(
              "div",
              { className: "svc-cta__hud", "aria-hidden": "true" },
              h("span", null, "REC"),
              h("strong", null, service.no),
              h("em", null, service.services)
            ),
            h("i", { className: "svc-cta__scan", "aria-hidden": "true" }),
            h("b", { className: "svc-cta__frame", "aria-hidden": "true" })
          )
        ),
        h(
          "section",
          { className: "svc-next" },
          h(
            "a",
            { href: servicePath(next.id) },
            h("span", null, "Siguiente"),
            h("strong", null, next.title),
            h("em", null, "Ver servicio ->")
          )
        )
      )
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(h(ServicePage));
})();
