// ============================================
// UMBRÍA STUDIO — Main App
// ============================================

const { useState, useEffect, useRef } = React;

// ── Error Boundary (class component — required by React API) ──
class SectionBoundary extends React.Component {
  constructor(p) { super(p); this.state = { err: null }; }
  static getDerivedStateFromError(err) { return { err }; }
  componentDidCatch(err) { console.error('[Umbría] Section render error:', err); }
  render() {
    if (this.state.err) return null; // hide broken section, rest of page keeps working
    return this.props.children;
  }
}

const DEFAULT_TWEAKS = /*EDITMODE-BEGIN*/{
  "heroImage": "emmanuelRosa",
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
      const darkSections = document.querySelectorAll(".section--dark, .weddings, .library, .contact, .hero, .tsv3");
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

  // Re-render once when Framer Motion finishes loading — switches motion.* Proxy
  // from fallback (native elements) to real FM components for entrance animations.
  const [, setFmTick] = useState(0);
  useEffect(() => {
    const onFmReady = () => setFmTick(t => t + 1);
    window.addEventListener('fm-ready', onFmReady);
    return () => window.removeEventListener('fm-ready', onFmReady);
  }, []);

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

  // Local photos take priority; Unsplash URL as CSS fallback layer
  const heroImage = tweaks.heroImage === "emmanuelRosa"
    ? `url(assets/team/er-01.jpeg), url(${window.umbriaImg("weddingMoody", 1)})`
    : `url(${window.umbriaImg(tweaks.heroImage || "weddingGolden", 1)})`;
  const magazine = openMag ? window.UMBRIA_GET_MAG(openMag) : null;

  return (
    <>
      <ScrollProgress />
      <window.UmbriaHeader scrolled={scrolled} isDark={isDark} />

      <main>
        <SectionBoundary><window.UmbriaHero heroImage={heroImage} /></SectionBoundary>
        <SectionBoundary><window.UmbriaProofStrip /></SectionBoundary>
        <SectionBoundary><window.UmbriaUniverso /></SectionBoundary>
        <SectionBoundary><window.UmbriaHistoria /></SectionBoundary>
        <SectionBoundary><window.UmbriaEquipo /></SectionBoundary>
        <SectionBoundary><window.UmbriaBodas /></SectionBoundary>
        <SectionBoundary><window.UmbriaPaquetes /></SectionBoundary>
        <SectionBoundary><window.UmbriaRosaUmbria /></SectionBoundary>
        <SectionBoundary><window.UmbriaVidaGrado /></SectionBoundary>
        <SectionBoundary><window.UmbriaAudiovisual /></SectionBoundary>
        <SectionBoundary><window.UmbriaProceso /></SectionBoundary>
        <SectionBoundary><window.UmbriaBiblioteca onOpenMagazine={(id) => setOpenMag(id)} /></SectionBoundary>
        <SectionBoundary><window.UmbriaTestimonios /></SectionBoundary>
        <SectionBoundary><window.UmbriaInstagram /></SectionBoundary>
        <SectionBoundary><window.UmbriaContacto /></SectionBoundary>
      </main>

      <SectionBoundary><window.UmbriaFooter /></SectionBoundary>

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
            { value: "emmanuelRosa", label: "E & R" },
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
