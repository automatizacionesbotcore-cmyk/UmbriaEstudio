// ============================================
// UMBRÍA STUDIO — Floats (WhatsApp + Chatbot)
// ============================================

const { useState: useStateF, useRef: useRefF, useEffect: useEffectF } = React;
const motionF = window.motion;

function Floats({ chatOpen, onToggleChat }) {
  const [messages, setMessages] = useStateF([
    { from: "bot", text: "Hola, soy el asistente de Umbría Studio ✨ ¿En qué te puedo ayudar hoy?" },
  ]);
  const [input, setInput] = useStateF("");
  const [thinking, setThinking] = useStateF(false);
  const scrollRef = useRefF(null);

  useEffectF(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, thinking]);

  const quick = [
    "Quiero info de bodas",
    "Cuánto cuesta una sesión familiar",
    "Maquillaje de novia",
    "Ver precios completos",
  ];

  const send = async (text) => {
    if (!text.trim()) return;
    const userMsg = { from: "user", text };
    setMessages(m => [...m, userMsg]);
    setInput("");
    setThinking(true);

    try {
      const prompt = `Eres el asistente virtual de Umbría Studio, una marca audiovisual chilena en Buin liderada por Emmanuel y Rosa. Cinco unidades: Emmanuel Umbría (bodas), Fotito Estudio (familias/embarazo/smash), Rosa Umbría (maquillaje), Vida Grado (graduaciones), Audiovisual.

Tono: cálido, cercano, chileno-neutro, breve (máximo 2-3 frases). Voz emocional "fotógrafos de tu historia". Para bodas siempre derivar a reunión personal con Emmanuel via WhatsApp +56 9 5833 5416.

Precios ejemplo: Esencia Familiar $70.000, Armonía $120.000 (más elegido), Legado $200.000, Marca Personal Premium $250.000, Boda Esencial $1.290.000.

Usuario pregunta: "${text}"

Responde en español de Chile, cálido y breve:`;

      const response = await window.claude.complete(prompt);
      setMessages(m => [...m, { from: "bot", text: response.trim() }]);
    } catch (e) {
      setMessages(m => [...m, { from: "bot", text: "Te respondemos en un momento por WhatsApp ✨ +56 9 5833 5416" }]);
    } finally {
      setThinking(false);
    }
  };

  const AnimPresF = window.AnimatePresence;

  return (
    <div className="floats">
      <AnimPresF>
      {chatOpen && (
        <motionF.div
          className="chatbot"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="chatbot__head">
            {/* Umbría logo avatar */}
            <div className="av av--logo">
              <img
                src="assets/logos/umbria-estudio-cream.png"
                alt="Umbría Studio"
                style={{ width: "100%", height: "100%", objectFit: "contain", padding: 6 }}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentNode.innerHTML = `<svg viewBox="0 0 32 32" style="width:24px;height:24px;margin:auto;display:block"><path d='M4 22 L16 10 L28 22' fill='none' stroke='%23C97846' stroke-width='2.8' stroke-linecap='round' stroke-linejoin='round'/><path d='M4 28 L16 16 L28 28' fill='none' stroke='%23C97846' stroke-width='2.8' stroke-linecap='round' stroke-linejoin='round'/></svg>`;
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <div className="name">Asistente Umbría</div>
              <div className="status">En línea · Emmanuel y Rosa</div>
            </div>
            <button className="close" onClick={onToggleChat} aria-label="Cerrar chat">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 2 L12 12 M12 2 L2 12"/></svg>
            </button>
          </div>

          <div className="chatbot__body" ref={scrollRef}>
            <AnimPresF>
            {messages.map((m, i) => (
              <motionF.div
                key={i}
                className={`bubble ${m.from}`}
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >{m.text}</motionF.div>
            ))}
            </AnimPresF>
            {thinking && <div className="bubble bot" style={{ opacity: 0.6 }}>escribiendo…</div>}
          </div>

          <div className="chatbot__quick">
            {quick.map((q, i) => (
              <button key={i} className="chip" onClick={() => send(q)}>{q}</button>
            ))}
          </div>

          <form className="chatbot__input" onSubmit={(e) => { e.preventDefault(); send(input); }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escríbenos…"
            />
            <button type="submit">Enviar</button>
          </form>
        </motionF.div>
      )}
      </AnimPresF>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-end" }}>
        <motionF.button
          className="float-btn bot"
          onClick={onToggleChat}
          aria-label={chatOpen ? "Cerrar chat" : "Abrir chat"}
          title="Asistente Umbría"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          {chatOpen ? (
            /* × close */
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M4 4 L16 16 M16 4 L4 16"/>
            </svg>
          ) : (
            /* Umbría double-chevron logo */
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 20 L16 8 L28 20"/>
              <path d="M4 27 L16 15 L28 27"/>
            </svg>
          )}
        </motionF.button>
        <motionF.a
          className="float-btn wa"
          href="https://wa.me/56958335416"
          target="_blank"
          rel="noopener"
          aria-label="WhatsApp"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <svg width="28" height="28" viewBox="0 0 32 32" fill="white">
            <path d="M16 3C9 3 3.5 8.5 3.5 15.5c0 2.4.6 4.7 1.8 6.7L3 29l7-1.8c1.9 1 4 1.6 6.1 1.6 7 0 12.5-5.5 12.5-12.5S23.1 3 16 3zm7.2 17.8c-.3.9-1.7 1.7-2.4 1.8-.6.1-1.4.1-2.3-.1-.5-.2-1.2-.4-2.1-.8-3.7-1.6-6.1-5.3-6.3-5.6-.2-.2-1.5-2-1.5-3.9 0-1.8.9-2.7 1.3-3.1.3-.3.7-.4 1-.4h.7c.2 0 .5-.1.8.6.3.7 1 2.5 1.1 2.7.1.2.1.4 0 .6-.1.2-.2.4-.4.6-.2.2-.4.5-.5.6-.2.2-.4.4-.2.8.2.4.9 1.5 2 2.5 1.4 1.2 2.6 1.6 3 1.8.4.2.6.2.8-.1.2-.2.9-1.1 1.2-1.4.2-.4.5-.3.8-.2.3.1 2 .9 2.4 1.1.3.2.6.2.7.4.1.2.1 1-.2 1.9z"/>
          </svg>
        </motionF.a>
      </div>
    </div>
  );
}

window.UmbriaFloats = Floats;
