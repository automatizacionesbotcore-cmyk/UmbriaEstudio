// ============================================
// FLIP-BOOK COMPONENT v3 — Drag + click/key flip
// Mouse/touch drag: real-time page follow with rAF
// Click / keyboard: CSS keyframe animation (820ms)
// ============================================

const { useState, useEffect, useRef, useCallback } = React;

function FlipBook({ magazine, onClose }) {
  const totalPages = magazine.pages.length;
  const [spread, setSpread] = useState(0);
  const [flipping, setFlipping] = useState(null); // null | "fwd" | "back"  — CSS flip
  const [drag, setDrag]    = useState(null);       // null | { dir, fFront, fBack } — drag flip
  const [bookMode, setBookMode] = useState(true);

  const FLIP_MS = 820;

  // ── Imperative refs (never trigger re-renders) ──
  const flyingRef      = useRef(null);  // DOM node of drag flying page
  const bookRef        = useRef(null);  // DOM node of .flipbook (for width)
  const isDragging     = useRef(false);
  const dragProgress   = useRef(0);
  const dragDir        = useRef(null);  // "fwd" | "back"
  const dragStartX     = useRef(0);
  const rafId          = useRef(null);

  // ── Click / keyboard navigation (CSS-animated) ──────────────────────────
  const next = useCallback(() => {
    if (flipping || drag) return;
    if (spread + 2 >= totalPages) return;
    setFlipping("fwd");
    setTimeout(() => { setSpread(s => s + 2); setFlipping(null); }, FLIP_MS);
  }, [flipping, drag, spread, totalPages]);

  const prev = useCallback(() => {
    if (flipping || drag) return;
    if (spread <= 0) return;
    setFlipping("back");
    setTimeout(() => { setSpread(s => s - 2); setFlipping(null); }, FLIP_MS);
  }, [flipping, drag, spread]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft")  prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, onClose]);

  // ── Global pointer handlers for drag ────────────────────────────────────
  // All mutable state accessed via refs — no stale closures.
  useEffect(() => {
    // Set flying page angle imperatively (no re-render)
    function setAngle(progress) {
      if (!flyingRef.current) return;
      const dir = dragDir.current;
      // Both fwd and back: 0→-180° (origin differs: left vs right)
      const angle = -180 * progress;
      flyingRef.current.style.transform = `rotateY(${angle}deg)`;
      // Dynamic shadow on the curl
      const shds = flyingRef.current.querySelectorAll(".flipbook__page-curl-shadow");
      const intensity = Math.abs(Math.sin(angle * Math.PI / 180)) * 0.68;
      shds.forEach(s => { s.style.opacity = intensity; });
    }

    function completeDrag() {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      const startP = dragProgress.current;
      const dir    = dragDir.current;
      const rem    = 1 - startP;
      if (rem < 0.005) {
        dragProgress.current = 0;
        setDrag(null);
        setSpread(s => dir === "fwd" ? s + 2 : s - 2);
        return;
      }
      const t0  = performance.now();
      const dur = rem * 320; // ms proportional to remaining
      function tick(now) {
        const t    = Math.min((now - t0) / dur, 1);
        const ease = 1 - Math.pow(1 - t, 3); // ease-out-cubic
        const p    = startP + rem * ease;
        dragProgress.current = p;
        setAngle(p);
        if (t < 1) {
          rafId.current = requestAnimationFrame(tick);
        } else {
          dragProgress.current = 0;
          setDrag(null);
          setSpread(s => dir === "fwd" ? s + 2 : s - 2);
        }
      }
      rafId.current = requestAnimationFrame(tick);
    }

    function snapBack() {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      const startP = dragProgress.current;
      if (startP < 0.005) { dragProgress.current = 0; setDrag(null); return; }
      const t0  = performance.now();
      const dur = startP * 260;
      function tick(now) {
        const t    = Math.min((now - t0) / dur, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        const p    = startP * (1 - ease);
        dragProgress.current = p;
        setAngle(p);
        if (t < 1) {
          rafId.current = requestAnimationFrame(tick);
        } else {
          dragProgress.current = 0;
          setDrag(null);
        }
      }
      rafId.current = requestAnimationFrame(tick);
    }

    const onPointerMove = (e) => {
      if (!isDragging.current || !bookRef.current) return;
      const halfW    = bookRef.current.offsetWidth / 2;
      const dx       = e.clientX - dragStartX.current;
      // fwd: drag left (-dx), back: drag right (+dx) — both give 0→1
      const rawProg  = dragDir.current === "fwd" ? -dx / halfW : dx / halfW;
      const progress = Math.max(0, Math.min(1, rawProg));
      dragProgress.current = progress;
      setAngle(progress);
    };

    const onPointerUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      if (dragProgress.current > 0.12) { completeDrag(); }
      else { snapBack(); }
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup",   onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup",   onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, []); // runs once; all mutable state via refs

  // ── Start a drag from pointer down ──────────────────────────────────────
  const startDrag = (e, dir) => {
    if (flipping || drag) return;
    if (dir === "fwd" && spread + 2 >= totalPages) return;
    if (dir === "back" && spread <= 0) return;
    e.preventDefault();
    if (rafId.current) cancelAnimationFrame(rafId.current);
    dragDir.current      = dir;
    dragProgress.current = 0;
    isDragging.current   = true;
    dragStartX.current   = e.clientX;
    const fFront = dir === "fwd" ? spread + 1 : spread;
    const fBack  = dir === "fwd" ? spread + 2 : spread - 1;
    setDrag({ dir, fFront, fBack });
  };

  const pickResponsiveDir = (e, fallback) => {
    if (!bookMode && window.matchMedia && window.matchMedia("(max-width: 768px)").matches && bookRef.current) {
      if (spread <= 0) return "fwd";
      if (spread + 2 >= totalPages) return "back";
      const r = bookRef.current.getBoundingClientRect();
      return e.clientX < r.left + r.width / 2 ? "back" : "fwd";
    }
    return fallback;
  };

  // ── Static page helper ───────────────────────────────────────────────────
  const leftIdx  = spread;
  const rightIdx = spread + 1;

  const renderStaticPage = (idx, side) => {
    if (idx < 0 || idx >= totalPages) {
      return <div className={`flipbook__page is-${side} is-blank`} />;
    }
    return (
      <div className={`flipbook__page is-${side}`}>
        <MagazinePage page={magazine.pages[idx]} side={side} pageNumber={idx + 1} />
        <div className={`flipbook__page-shading flipbook__page-shading--${side}`} />
      </div>
    );
  };

  // CSS-animated flip: which pages show
  const previewLeftIdx  = flipping === "fwd"  ? rightIdx + 1 : leftIdx;
  const previewRightIdx = flipping === "back" ? leftIdx  - 1 : rightIdx;

  let cssFlyFront = null, cssFlyBack = null;
  if (flipping === "fwd")  { cssFlyFront = rightIdx; cssFlyBack = rightIdx + 1; }
  if (flipping === "back") { cssFlyFront = leftIdx;  cssFlyBack = leftIdx  - 1; }
  const cssFlyCls = flipping === "fwd"  ? "flipbook__flying flipbook__flying--fwd"
                  : flipping === "back" ? "flipbook__flying flipbook__flying--back" : "";

  // Drag: which static pages show
  // fwd drag: flying page starts on RIGHT → hide right static, show left=leftIdx
  // back drag: flying page starts on LEFT → hide left static, show right=rightIdx
  const showDragLeft  = drag?.dir === "fwd";   // left shows when dragging forward
  const showDragRight = drag?.dir === "back";  // right shows when dragging backward

  const isActive = flipping || drag;

  // ── Cursor affordance ────────────────────────────────────────────────────
  const canGoFwd  = !flipping && !drag && spread + 2 < totalPages;
  const canGoBack = !flipping && !drag && spread > 0;

  return (
    <div className="flipbook-modal" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="flipbook-modal__head">
        <div>
          <div className="eyebrow" style={{ color: "var(--champagne)", marginBottom: 6 }}>{magazine.brand}</div>
          <div className="title">
            {magazine.title.split("·").map((t, i) => (
              <span key={i}>{i > 0 && <em> · </em>}{t.trim()}</span>
            ))}
          </div>
        </div>
        <div className="meta" style={{ textAlign: "center" }}>
          <div>Edición 2026</div>
          <div style={{ marginTop: 4 }}>{totalPages} páginas</div>
        </div>
        <button className="flipbook-modal__close" onClick={onClose} aria-label="Cerrar">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M3 3 L15 15 M15 3 L3 15"/>
          </svg>
        </button>
      </div>

      <div className="flipbook-stage">
        <div className={`flipbook ${isActive ? "is-flipping" : ""} ${bookMode ? "is-book-mode" : ""}`} ref={bookRef}>

          {/* ── Left half ── */}
          <div
            className="flipbook__half flipbook__half--left"
            style={{ cursor: canGoBack ? "grab" : "default", touchAction: "none" }}
            onPointerDown={(e) => startDrag(e, pickResponsiveDir(e, "back"))}
          >
            {drag
              ? (showDragLeft  && renderStaticPage(leftIdx, "left"))
              : (flipping === "back"
                  ? renderStaticPage(previewLeftIdx, "left")
                  : renderStaticPage(leftIdx, "left"))}
          </div>

          {/* ── Right half ── */}
          <div
            className="flipbook__half flipbook__half--right"
            style={{ cursor: canGoFwd ? "grab" : "default", touchAction: "none" }}
            onPointerDown={(e) => startDrag(e, "fwd")}
          >
            {drag
              ? (showDragRight && renderStaticPage(rightIdx, "right"))
              : (flipping === "fwd"
                  ? renderStaticPage(previewRightIdx, "right")
                  : renderStaticPage(rightIdx, "right"))}
          </div>

          {/* ── Spine ── */}
          <div className="flipbook__spine" />

          {/* ── CSS-animated flying page (click/keyboard) ── */}
          {flipping && (
            <div className={cssFlyCls} key={flipping + spread}>
              <div className="flipbook__page flipbook__page--flying-front">
                {cssFlyFront >= 0 && cssFlyFront < totalPages && (
                  <MagazinePage page={magazine.pages[cssFlyFront]} side={flipping === "fwd" ? "right" : "left"} pageNumber={cssFlyFront + 1} />
                )}
                <div className="flipbook__page-curl-shadow" />
              </div>
              <div className="flipbook__page flipbook__page--flying-back">
                {cssFlyBack >= 0 && cssFlyBack < totalPages && (
                  <MagazinePage page={magazine.pages[cssFlyBack]} side={flipping === "fwd" ? "left" : "right"} pageNumber={cssFlyBack + 1} />
                )}
                <div className="flipbook__page-curl-shadow flipbook__page-curl-shadow--back" />
              </div>
            </div>
          )}

          {/* ── Drag-controlled flying page ── */}
          {drag && (
            <div
              ref={flyingRef}
              className={`flipbook__flying flipbook__flying--drag flipbook__flying--drag-${drag.dir}`}
              style={{
                transform: "rotateY(0deg)",
                transformOrigin: drag.dir === "fwd" ? "left center" : "right center",
                animationName: "none",     // override any residual CSS animation
                left: drag.dir === "back" ? 0 : "50%",  // start on correct half
                width: "50%",
              }}
              key={"drag-" + drag.dir + "-" + spread}
            >
              <div className="flipbook__page flipbook__page--flying-front">
                {drag.fFront >= 0 && drag.fFront < totalPages && (
                  <MagazinePage
                    page={magazine.pages[drag.fFront]}
                    side={drag.dir === "fwd" ? "right" : "left"}
                    pageNumber={drag.fFront + 1}
                  />
                )}
                <div className="flipbook__page-curl-shadow" />
              </div>
              <div className="flipbook__page flipbook__page--flying-back">
                {drag.fBack >= 0 && drag.fBack < totalPages && (
                  <MagazinePage
                    page={magazine.pages[drag.fBack]}
                    side={drag.dir === "fwd" ? "left" : "right"}
                    pageNumber={drag.fBack + 1}
                  />
                )}
                <div className="flipbook__page-curl-shadow flipbook__page-curl-shadow--back" />
              </div>
            </div>
          )}

          {/* ── Corner-curl hints (idle state) ── */}
          {!isActive && canGoFwd && (
            <button className="flipbook__corner-hint" onClick={next} aria-label="Página siguiente" />
          )}
          {!isActive && canGoBack && (
            <button className="flipbook__corner-hint flipbook__corner-hint--left" onClick={prev} aria-label="Página anterior" />
          )}
        </div>
      </div>

      <div className="flipbook-controls">
        <button className="btn-icon" onClick={prev} disabled={spread <= 0 || !!isActive} aria-label="Página anterior">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M11 3 L5 9 L11 15"/></svg>
        </button>
        <div className="page-indicator">
          <span className="cur">{Math.min(rightIdx + 1, totalPages)}</span>
          <span style={{ opacity: 0.5 }}> / {totalPages}</span>
        </div>
          <button className="btn-icon" onClick={next} disabled={spread + 2 >= totalPages || !!isActive} aria-label="Página siguiente">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 3 L13 9 L7 15"/></svg>
        </button>
        <button className="flipbook-view-toggle" onClick={() => setBookMode(v => !v)}>
          {bookMode ? "Una página" : "Ver como libro"}
        </button>
        <div className="actions">
          <button>Descargar PDF</button>
          <button>Compartir</button>
        </div>
      </div>
    </div>
  );
}

window.FlipBook = FlipBook;
