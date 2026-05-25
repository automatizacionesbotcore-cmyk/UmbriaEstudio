// ============================================
// UMBRÍA STUDIO — Main App
// ============================================

const { useState, useEffect, useRef } = React;

const DEFAULT_TWEAKS = /*EDITMODE-BEGIN*/{
  "heroImage": "weddingGolden",
  "accent": "champagne",
  "viewport": "desktop",
  "chatOpenDefault": false,
  "flipbookOpenDefault": ""
}/*EDITMODE-END*/;

function ScrollProgress() {
  const ref = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const pct = (window.scrollY / (h.scrollHeight - h.clientHeight)) * 100;
      if (ref.current) ref.current.style.width = Math.min(100, pct) + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className="scroll-progress"><div className="scroll-progress__fill" ref={ref} /></div>;
}

// Apply reveal-on-scroll using IntersectionObserver
function useReveals() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .stagger");
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// Track nav scrolled state + dark sections
function useNavState() {
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      // Determine if nav overlaps a dark section
      const darkSections = document.querySelectorAll(".section--dark, .weddings, .library, .contact, .hero");
      const navHeight = 60;
      let dark = false;
      darkSections.forEach(s => {
        const r = s.getBoundingClientRect();
        if (r.top <= navHeight && r.bottom > navHeight) dark = true;
      });
      setIsDark(dark);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { scrolled, isDark };
}

function App() {
  const [tweaks, setTweak] = window.useTweaks(DEFAULT_TWEAKS);

  useReveals();
  const { scrolled, isDark } = useNavState();

  const [openMag, setOpenMag] = useState(tweaks.flipbookOpenDefault || null);
  const [chatOpen, setChatOpen] = useState(!!tweaks.chatOpenDefault);

  // Sync external tweak changes
  useEffect(() => {
    if (tweaks.flipbookOpenDefault !== undefined && tweaks.flipbookOpenDefault !== "" && tweaks.flipbookOpenDefault !== openMag) {
      setOpenMag(tweaks.flipbookOpenDefault || null);
    }
    // eslint-disable-next-line
  }, [tweaks.flipbookOpenDefault]);

  useEffect(() => {
    if (tweaks.chatOpenDefault !== undefined) setChatOpen(!!tweaks.chatOpenDefault);
    // eslint-disable-next-line
  }, [tweaks.chatOpenDefault]);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = openMag ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [openMag]);

  const heroImage = window.umbriaImg(tweaks.heroImage || "weddingGolden", 1);
  const magazine = openMag ? window.UMBRIA_GET_MAG(openMag) : null;

  return (
    <>
      <ScrollProgress />
      <window.UmbriaHeader scrolled={scrolled} isDark={isDark} />

      <main>
        <window.UmbriaHero heroImage={heroImage} />
        <window.UmbriaUniverso />
        <window.UmbriaHistoria />
        <window.UmbriaBodas />
        <window.UmbriaPaquetes />
        <window.UmbriaProceso />
        <window.UmbriaBiblioteca onOpenMagazine={(id) => setOpenMag(id)} />
        <window.UmbriaTestimonios />
        <window.UmbriaInstagram />
        <window.UmbriaContacto />
      </main>

      <window.UmbriaFooter />

      {magazine && <window.FlipBook magazine={magazine} onClose={() => setOpenMag(null)} />}

      <window.UmbriaFloats chatOpen={chatOpen} onToggleChat={() => setChatOpen(v => !v)} />

      {/* Tweaks Panel */}
      <window.TweaksPanel title="Tweaks">
        <window.TweakSection label="Galería editorial" />
        <window.TweakRadio
          label="Imagen hero"
          value={tweaks.heroImage}
          onChange={(v) => setTweak("heroImage", v)}
          options={[
            { value: "weddingGolden", label: "Golden" },
            { value: "weddingBW", label: "B&W" },
            { value: "weddingMoody", label: "Moody" },
          ]}
        />

        <window.TweakSection label="Estados" />
        <window.TweakToggle
          label="Chatbot abierto"
          value={!!chatOpen}
          onChange={(v) => { setChatOpen(v); setTweak("chatOpenDefault", v); }}
        />
        <window.TweakSelect
          label="Flip-book en"
          value={openMag || ""}
          onChange={(v) => { setOpenMag(v || null); setTweak("flipbookOpenDefault", v || ""); }}
          options={[
            { value: "", label: "— Cerrado —" },
            ...window.UMBRIA_MAGAZINES.map(m => ({ value: m.id, label: `${m.icon} ${m.title.split("·")[0].trim()}` }))
          ]}
        />

        <window.TweakSection label="Atajos" />
        <window.TweakButton label="Ir a Revistas" onClick={() => { const el = document.getElementById("revistas"); if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" }); }} />
        <window.TweakButton label="Abrir Bodas (flip-book)" onClick={() => { setOpenMag("bodas"); setTweak("flipbookOpenDefault", "bodas"); }} />
      </window.TweaksPanel>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
