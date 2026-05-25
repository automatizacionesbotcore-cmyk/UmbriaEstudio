// ============================================
// MAGAZINE PAGE LAYOUTS — Editorial spreads
// Used inside the flip-book
// ============================================

function MagazinePage({ page, side, pageNumber }) {
  return (
    <div className={`mag-page mag-page--${page.layout || "default"}`} data-side={side}>
      {renderLayout(page, side)}
      <div className="mag-page__folio">
        <span>{pageNumber}</span>
        <span style={{ opacity: 0.5, letterSpacing: "0.3em" }}>· UMBRÍA STUDIO</span>
      </div>
    </div>
  );
}

function renderLayout(p, side) {
  switch (p.layout) {
    case "cover":
      return <PageCover p={p} />;
    case "fullImage":
      return <PageFullImage p={p} />;
    case "imageText":
      return <PageImageText p={p} side={side} />;
    case "twoColumn":
      return <PageTwoColumn p={p} />;
    case "package":
      return <PagePackage p={p} />;
    case "quote":
      return <PageQuote p={p} />;
    case "index":
      return <PageIndex p={p} />;
    case "credits":
      return <PageCredits p={p} />;
    default:
      return <PageDefault p={p} />;
  }
}

function PageCover({ p }) {
  return (
    <div className="mag-page__cover" style={{ backgroundImage: `url(${p.image})` }}>
      <div className="mag-page__cover-overlay" />
      <div className="mag-page__cover-top">
        <div className="mag-page__masthead">UMBRÍA · STUDIO</div>
        <div className="mag-page__cover-meta">EDICIÓN {p.edition || "2026"} · No {p.no || "01"}</div>
      </div>
      <div className="mag-page__cover-headline">
        <div className="eyebrow" style={{ color: "var(--champagne)", marginBottom: 14 }}>{p.eyebrow}</div>
        <h1 className="mag-page__cover-title">
          {p.titleParts ? p.titleParts.map((t, i) =>
            t.italic ? <em key={i}>{t.text}</em> : <span key={i}>{t.text}</span>
          ) : p.title}
        </h1>
        {p.script && <div className="mag-page__cover-script">{p.script}</div>}
      </div>
      <div className="mag-page__cover-bottom">
        <div>{p.brand}</div>
        <div>{p.tag || "EMMANUEL Y ROSA"}</div>
      </div>
    </div>
  );
}

function PageFullImage({ p }) {
  return (
    <div className="mag-page__full" style={{ backgroundImage: `url(${p.image})` }}>
      {p.caption && (
        <div className="mag-page__caption">
          <div className="eyebrow">{p.captionLabel || "Editorial"}</div>
          <div className="mag-page__caption-text">{p.caption}</div>
        </div>
      )}
    </div>
  );
}

function PageImageText({ p, side }) {
  // Image on outer side
  const imgPos = side === "right" ? "right" : "left";
  return (
    <div className="mag-page__split">
      <div
        className="mag-page__split-image"
        style={{
          backgroundImage: `url(${p.image})`,
          order: imgPos === "left" ? 1 : 2,
        }}
      />
      <div className="mag-page__split-text" style={{ order: imgPos === "left" ? 2 : 1 }}>
        {p.eyebrow && <div className="eyebrow" style={{ color: "var(--champagne-deep)" }}>{p.eyebrow}</div>}
        <h2 className="mag-page__h">
          {p.titleParts ? p.titleParts.map((t, i) =>
            t.italic ? <em key={i}>{t.text}</em> : <span key={i}>{t.text}</span>
          ) : p.title}
        </h2>
        {p.script && <div className="mag-page__script">{p.script}</div>}
        {p.body && <p className="mag-page__body">{p.body}</p>}
        {p.list && (
          <ul className="mag-page__list">
            {p.list.map((it, i) => <li key={i}>{it}</li>)}
          </ul>
        )}
      </div>
    </div>
  );
}

function PageTwoColumn({ p }) {
  return (
    <div className="mag-page__two-col">
      {p.eyebrow && <div className="eyebrow" style={{ color: "var(--champagne-deep)" }}>{p.eyebrow}</div>}
      <h2 className="mag-page__h" style={{ marginBottom: 24 }}>
        {p.titleParts ? p.titleParts.map((t, i) =>
          t.italic ? <em key={i}>{t.text}</em> : <span key={i}>{t.text}</span>
        ) : p.title}
      </h2>
      <div className="mag-page__cols">
        {p.body && <p className="mag-page__body">{p.body}</p>}
        {p.body2 && <p className="mag-page__body">{p.body2}</p>}
      </div>
    </div>
  );
}

function PagePackage({ p }) {
  return (
    <div className="mag-page__pkg">
      <div className="mag-page__pkg-top">
        <div className="eyebrow" style={{ color: "var(--champagne-deep)" }}>{p.eyebrow || "Paquete"}</div>
        <div className="mag-page__pkg-no">No. {p.no || "01"}</div>
      </div>
      <h2 className="mag-page__pkg-name">
        {p.titleParts ? p.titleParts.map((t, i) =>
          t.italic ? <em key={i}>{t.text}</em> : <span key={i}>{t.text}</span>
        ) : p.title}
      </h2>
      <div className="mag-page__pkg-price">
        <span className="cur">$</span>
        {p.price}
        <span className="unit">{p.unit || "CLP"}</span>
      </div>
      <div className="mag-page__pkg-line" />
      <ul className="mag-page__list">
        {p.list && p.list.map((it, i) => <li key={i}>{it}</li>)}
      </ul>
      {p.note && <div className="mag-page__pkg-note">{p.note}</div>}
    </div>
  );
}

function PageQuote({ p }) {
  return (
    <div className="mag-page__quote" style={p.bg ? { background: p.bg, color: p.color || "var(--cream)" } : {}}>
      <div className="mag-page__quote-mark">"</div>
      <div className="mag-page__quote-text">{p.quote}</div>
      <div className="mag-page__quote-by">— {p.by}</div>
    </div>
  );
}

function PageIndex({ p }) {
  return (
    <div className="mag-page__index">
      <div className="eyebrow" style={{ color: "var(--champagne-deep)", marginBottom: 22 }}>{p.eyebrow || "Índice"}</div>
      <h2 className="mag-page__h" style={{ marginBottom: 36 }}>
        {p.titleParts ? p.titleParts.map((t, i) =>
          t.italic ? <em key={i}>{t.text}</em> : <span key={i}>{t.text}</span>
        ) : p.title}
      </h2>
      <ol className="mag-page__index-list">
        {p.items.map((it, i) => (
          <li key={i}>
            <span className="mag-page__index-num">{String(i + 1).padStart(2, "0")}</span>
            <span className="mag-page__index-name">{it.name}</span>
            <span className="mag-page__index-dots" />
            <span className="mag-page__index-page">{it.page}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function PageCredits({ p }) {
  return (
    <div className="mag-page__credits">
      <div className="mag-page__credits-monogram">U</div>
      <div className="script" style={{ fontSize: 38, color: "var(--champagne-deep)", marginTop: 12 }}>{p.tag || "Gracias"}</div>
      <div style={{ marginTop: 30, fontFamily: "var(--magazine)", fontSize: 22, letterSpacing: "0.04em", textAlign: "center" }}>
        UMBRÍA STUDIO
      </div>
      <div className="eyebrow" style={{ marginTop: 10, color: "var(--champagne-deep)" }}>Emmanuel y Rosa</div>
      <div style={{ marginTop: 36, fontSize: 12, color: "var(--muted)", textAlign: "center", lineHeight: 1.7 }}>
        +56 9 5833 5416 · contacto@umbriaestudio.cl<br/>
        Buin · Región Metropolitana · Chile<br/>
        @umbriaestudio
      </div>
    </div>
  );
}

function PageDefault({ p }) {
  return (
    <div className="mag-page__default">
      <h2 className="mag-page__h">{p.title}</h2>
      {p.body && <p className="mag-page__body">{p.body}</p>}
    </div>
  );
}

window.MagazinePage = MagazinePage;
