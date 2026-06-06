import { useState, useEffect, useRef } from "react";

// ─── PALETA OFICIAL DE MARCA (extraída de tarjeta de aliados) ───
// Verde salvia  → color principal de Kimara (fondo izquierdo tarjeta, textos sage)
// Crema/beige   → fondo derecho de la tarjeta (sección principal)
// Negro         → tipografía principal (KIMARA, textos)
// No hay dorado — se elimina por completo
const SAGE        = "#838f74";   // verde principal de marca
const SAGE_DARK   = "#6a7260";   // hover, énfasis oscuro
const SAGE_MID    = "#9dab8c";   // acentos medios
const SAGE_LIGHT  = "#b8c4aa";   // textos suaves sobre fondos oscuros
const SAGE_PALE   = "#eef0eb";   // fondos alternos muy suaves
const CREAM       = "#F2EDE0";   // crema exacta de la tarjeta
const CREAM_DARK  = "#E2D8C8";   // bordes y separadores sobre crema
const OFF_WHITE   = "#FAF8F3";   // fondo general (blanco cálido)
const BLACK       = "#1A1A1A";   // negro tipográfico de la marca
const CHARCOAL    = "#111111";   // hero y footer
const WHITE       = "#FFFFFF";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Jost:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  html {
    scroll-behavior: smooth;
    width: 100%;
    overflow-x: hidden;
  }

  body {
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
    font-family: 'Jost', sans-serif;
    background: ${OFF_WHITE};
    color: ${BLACK};
    -webkit-font-smoothing: antialiased;
  }

  #root {
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
    font-family: 'Jost', sans-serif;
    background: ${OFF_WHITE};
    color: ${BLACK};
    -webkit-font-smoothing: antialiased;
  }

  .font-serif { font-family: 'Cormorant Garamond', Georgia, serif; }

  /* ── Contraste garantizado en todos los headings ── */
  h1, h2, h3, h4, h5, h6 {
    color: ${BLACK};
  }
  /* Headings sobre fondo oscuro se anulan inline con color:WHITE */

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse-ring {
    0%   { transform: scale(1);   opacity: .65; }
    100% { transform: scale(1.55); opacity: 0;  }
  }
  @keyframes sage-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes blinkDot {
    0%, 80%, 100% { opacity: .25; transform: scale(.85); }
    40%           { opacity: 1;   transform: scale(1); }
  }

  .anim-fade-up   { animation: fadeUp .7s cubic-bezier(.22,1,.36,1) both; }
  .anim-fade-up-2 { animation: fadeUp .7s .15s cubic-bezier(.22,1,.36,1) both; }
  .anim-fade-up-3 { animation: fadeUp .7s .30s cubic-bezier(.22,1,.36,1) both; }
  .anim-fade-up-4 { animation: fadeUp .7s .45s cubic-bezier(.22,1,.36,1) both; }
  .anim-fade-in   { animation: fadeIn .5s ease both; }

  .sage-shimmer {
    background: linear-gradient(90deg,
      ${SAGE} 0%, ${SAGE_MID} 42%, ${SAGE_LIGHT} 50%, ${SAGE} 58%, ${SAGE} 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: sage-shimmer 4s linear infinite;
  }

  /* ── BOTONES ── */
  .btn-primary {
    background: ${SAGE};
    color: ${WHITE};
    font-family: 'Jost', sans-serif;
    font-weight: 600;
    letter-spacing: .1em;
    font-size: 12px;
    text-transform: uppercase;
    padding: 14px 34px;
    border: none;
    cursor: pointer;
    transition: background .22s, transform .16s, box-shadow .22s;
  }
  .btn-primary:hover {
    background: ${SAGE_DARK};
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(131,143,116,.42);
  }
  .btn-primary:active { transform: translateY(0); }

  .btn-outline {
    background: transparent;
    color: ${SAGE};
    border: 1.5px solid ${SAGE};
    font-family: 'Jost', sans-serif;
    font-weight: 600;
    letter-spacing: .1em;
    font-size: 12px;
    text-transform: uppercase;
    padding: 13px 28px;
    cursor: pointer;
    transition: all .22s;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .btn-outline:hover { background: ${SAGE}; color: ${WHITE}; }

  .btn-dark {
    background: ${BLACK};
    color: ${WHITE};
    font-family: 'Jost', sans-serif;
    font-weight: 600;
    letter-spacing: .1em;
    font-size: 11px;
    text-transform: uppercase;
    padding: 13px 24px;
    border: none;
    cursor: pointer;
    transition: background .22s, transform .16s;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .btn-dark:hover { background: #2a2a2a; transform: translateY(-1px); }

  /* ── NAV ── */
  .nav-link {
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    letter-spacing: .12em;
    text-transform: uppercase;
    color: #666;
    cursor: pointer;
    position: relative;
    padding-bottom: 3px;
    transition: color .2s;
    text-decoration: none;
  }
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 1.5px;
    background: ${SAGE};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform .26s cubic-bezier(.22,1,.36,1);
  }
  .nav-link:hover { color: ${SAGE}; }
  .nav-link:hover::after { transform: scaleX(1); }

  /* ── CARDS DE SERVICIO ── */
  .card-service {
    background: ${WHITE};
    border: 1px solid ${CREAM_DARK};
    padding: 40px 32px;
    position: relative;
    overflow: hidden;
    transition: transform .28s cubic-bezier(.22,1,.36,1),
                box-shadow .28s, border-color .28s;
    cursor: default;
  }
  .card-service::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: ${SAGE};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform .35s cubic-bezier(.22,1,.36,1);
  }
  .card-service:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 48px rgba(131,143,116,.15);
    border-color: ${SAGE_MID};
  }
  .card-service:hover::before { transform: scaleX(1); }

  /* ── INPUTS ── */
  .input-field {
    width: 100%;
    border: 1.5px solid ${CREAM_DARK};
    background: ${WHITE};
    font-family: 'Jost', sans-serif;
    font-size: 14px;
    color: ${BLACK};
    padding: 13px 16px;
    outline: none;
    transition: border-color .22s, box-shadow .22s;
    appearance: none;
    -webkit-appearance: none;
  }
  .input-field:focus {
    border-color: ${SAGE};
    box-shadow: 0 0 0 3px rgba(131,143,116,.14);
  }
  .input-field::placeholder { color: #BBC; }
  select.input-field {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23838f74' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
    cursor: pointer;
  }

  /* ── TESTIMONIAL CARDS ── */
  .testi-card {
    background: ${WHITE};
    border: 1px solid ${CREAM_DARK};
    padding: 32px 28px;
    position: relative;
    transition: box-shadow .25s;
  }
  .testi-card::before {
    content: '"';
    font-family: 'Cormorant Garamond', serif;
    font-size: 80px;
    color: ${SAGE};
    opacity: .22;
    position: absolute;
    top: 4px; left: 16px;
    line-height: 1;
    pointer-events: none;
  }
  .testi-card:hover { box-shadow: 0 8px 28px rgba(131,143,116,.12); }

  /* ── STEP CIRCLE ── */
  .step-circle {
    width: 48px; height: 48px;
    border: 1.5px solid ${SAGE};
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
    font-style: italic;
    color: ${SAGE};
    flex-shrink: 0;
    background: ${CHARCOAL};
    position: relative;
    z-index: 1;
  }

  /* ── DROPZONE ── */
  .dropzone {
    border: 1.5px dashed ${SAGE_LIGHT};
    background: ${SAGE_PALE};
    padding: 36px 24px;
    text-align: center;
    cursor: pointer;
    transition: background .22s, border-color .22s;
    border-radius: 3px;
  }
  .dropzone:hover, .dropzone.drag {
    background: #dce3d6;
    border-color: ${SAGE};
  }

  /* ── EYEBROW ── */
  .eyebrow {
    font-family: 'Jost', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: .22em;
    text-transform: uppercase;
    color: ${SAGE};
    white-space: nowrap;
  }
  .divider-line {
    flex: 1;
    max-width: 48px;
    height: 1.5px;
    background: ${SAGE};
    opacity: .6;
  }

  /* ── CHAT ── */
  .chat-widget {
    position: fixed;
    bottom: 24px; right: 24px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;
  }
  .chat-toggle-btn {
    width: 58px; height: 58px;
    border-radius: 50%;
    background: ${SAGE};
    border: none;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 22px rgba(131,143,116,.5);
    transition: transform .2s, box-shadow .2s, background .2s;
    position: relative;
  }
  .chat-toggle-btn:hover {
    transform: scale(1.07);
    background: ${SAGE_DARK};
    box-shadow: 0 8px 28px rgba(131,143,116,.6);
  }
  .chat-pulse {
    position: absolute; inset: -5px;
    border-radius: 50%;
    border: 2px solid ${SAGE};
    animation: pulse-ring 2.4s ease-out infinite;
  }
  .chat-online-dot {
    position: absolute;
    top: 3px; right: 3px;
    width: 13px; height: 13px;
    border-radius: 50%;
    background: #5aaa72;
    border: 2px solid ${SAGE};
  }
  .chat-window {
    width: 344px;
    background: ${WHITE};
    border: 1px solid ${CREAM_DARK};
    box-shadow: 0 28px 72px rgba(0,0,0,.14);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    animation: slideUp .32s cubic-bezier(.22,1,.36,1);
    max-height: 540px;
  }
  .chat-msgs {
    flex: 1;
    overflow-y: auto;
    padding: 16px 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: ${SAGE_PALE};
    scroll-behavior: smooth;
    max-height: 320px;
  }
  .chat-msgs::-webkit-scrollbar { width: 4px; }
  .chat-msgs::-webkit-scrollbar-thumb { background: ${SAGE_LIGHT}; border-radius: 2px; }

  .bubble-bot {
    background: ${WHITE};
    border: 1px solid ${CREAM_DARK};
    border-radius: 3px 12px 12px 12px;
    padding: 10px 14px;
    font-size: 13px;
    line-height: 1.58;
    color: ${BLACK};
    max-width: 88%;
    align-self: flex-start;
    animation: slideUp .28s cubic-bezier(.22,1,.36,1);
  }
  .bubble-user {
    background: ${SAGE};
    color: ${WHITE};
    border-radius: 12px 3px 12px 12px;
    padding: 10px 14px;
    font-size: 13px;
    line-height: 1.58;
    max-width: 80%;
    align-self: flex-end;
    animation: slideUp .28s cubic-bezier(.22,1,.36,1);
  }
  .quick-chip {
    background: ${WHITE};
    border: 1px solid ${SAGE_LIGHT};
    color: ${SAGE_DARK};
    font-family: 'Jost', sans-serif;
    font-size: 10.5px;
    padding: 5px 12px;
    border-radius: 99px;
    cursor: pointer;
    transition: all .15s;
    white-space: nowrap;
  }
  .quick-chip:hover { background: ${SAGE}; border-color: ${SAGE}; color: ${WHITE}; }

  .typing-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: ${SAGE_LIGHT};
  }
  .typing-dot:nth-child(1) { animation: blinkDot 1.2s .0s  ease-in-out infinite; }
  .typing-dot:nth-child(2) { animation: blinkDot 1.2s .2s  ease-in-out infinite; }
  .typing-dot:nth-child(3) { animation: blinkDot 1.2s .4s  ease-in-out infinite; }

  .chat-input-f {
    flex: 1;
    border: 1.5px solid ${CREAM_DARK};
    border-radius: 99px;
    padding: 9px 16px;
    font-family: 'Jost', sans-serif;
    font-size: 12.5px;
    color: ${BLACK};
    background: ${SAGE_PALE};
    outline: none;
    transition: border-color .2s;
  }
  .chat-input-f:focus { border-color: ${SAGE}; }
  .chat-input-f::placeholder { color: #aab; }

  /* ── FOOTER LINK ── */
  .footer-link {
    font-size: 13px; color: #888; cursor: pointer;
    transition: color .2s; display: block; margin-bottom: 10px;
  }
  .footer-link:hover { color: ${SAGE_LIGHT}; }

  .footer-logo-name {
  font-family: var(--ff-body);
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.28em;
  color: var(--white);
  text-transform: uppercase;
}
.footer-logo-sub {
  font-size: 9px;
  letter-spacing: 0.26em;
  color: var(--gold-light);
  text-transform: uppercase;
  margin-top: 2px;
  margin-bottom: 18px;
}

  @media (max-width: 900px) {
    .hero-two-col  { grid-template-columns: 1fr !important; }
    .hero-visual   { display: none; }
    .two-col       { grid-template-columns: 1fr !important; gap: 48px !important; }
    .three-col     { grid-template-columns: 1fr !important; gap: 36px !important; }
    .form-two-col  { grid-template-columns: 1fr !important; }
    .steps-three   { grid-template-columns: 1fr !important; gap: 40px !important; }
    .steps-connector { display: none !important; }
    .cotizar-left  { position: static !important; }
    .testi-grid    { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 768px) {
    .desktop-nav { display: none !important; }
    .mob-btn     { display: flex !important; }
    .chat-window { width: calc(100vw - 32px); }
    .chat-widget { right: 16px; bottom: 16px; }
    /* Override inner section padding for mobile */
    section, footer { padding-left: 0 !important; padding-right: 0 !important; }
    section > div, footer > div {
      padding-left: 24px !important;
      padding-right: 24px !important;
    }
  }
  @media (max-width: 480px) {
    .hero-actions { flex-direction: column; }
    .hero-actions button { width: 100%; justify-content: center; }
  }
`;

/* ── LOGOS ── */
const LOGO_DARK = (
  <svg viewBox="0 0 260 76" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"160px",height:"auto"}}>
    <text x="0" y="48" fontFamily="'Jost',sans-serif" fontWeight="700" fontSize="42" letterSpacing="5" fill={BLACK}>KIMARA</text>
    <text x="1" y="68" fontFamily="'Jost',sans-serif" fontWeight="300" fontSize="12" letterSpacing="3.5" fill={SAGE}>ARREGLOS &amp; COSTURA</text>
  </svg>
);
const LOGO_LIGHT = (
  <svg viewBox="0 0 260 76" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"148px",height:"auto"}}>
    <text x="0" y="48" fontFamily="'Jost',sans-serif" fontWeight="700" fontSize="42" letterSpacing="5" fill={WHITE}>KIMARA</text>
    <text x="1" y="68" fontFamily="'Jost',sans-serif" fontWeight="300" fontSize="12" letterSpacing="3.5" fill={SAGE_LIGHT}>ARREGLOS &amp; COSTURA</text>
  </svg>
);

/* ── DATA ── */
const services = [
  { icon:"✂", title:"Arreglos de Prendas",  cta:"Cotizar arreglo",
    desc:"Reparaciones precisas y acabados impecables. Devolvemos la vida a tus prendas favoritas.",
    items:["Cambio de cierres y cremalleras","Ajustes y entradas de talla","Ruedos y dobladillos","Remaches, botones y broches"] },
  { icon:"📐", title:"Confección a Medida",  cta:"Empezar diseño",
    desc:"Diseñamos y confeccionamos desde cero la prenda que imaginas. Tú eliges tela, estilo y detalles.",
    items:["Ropa casual y everyday","Prendas formales y elegantes","Vestidos de gala y noche","Uniformes corporativos"] },
];

const steps = [
  { n:"I",   title:"Elige el servicio",   desc:"Arreglo técnico o confección a medida." },
  { n:"II",  title:"Sube una foto",        desc:"Comparte imagen de tu prenda o diseño." },
  { n:"III", title:"Recibe cotización",   desc:"Te respondemos en menos de 2 horas hábiles." },
];

const perks = [
  { title:"Respuesta en 2 horas",     desc:"Garantizamos respuesta rápida en días hábiles." },
  { title:"Sin costo ni compromiso",  desc:"Tu cotización es completamente gratuita." },
  { title:"Atención personalizada",   desc:"Cada prenda y cada clienta es única para nosotras." },
  { title:"Garantía en cada trabajo", desc:"Respaldamos la calidad de todos nuestros arreglos." },
];

const testimonials = [
  { name:"María P.",   city:"Itagüí",   stars:5,
    text:"Llevé un vestido de grado que nadie me podía arreglar. En Kimara lo dejaron como nuevo. ¡Quedé completamente enamorada!" },
  { name:"Claudia R.", city:"Envigado", stars:5,
    text:"El mejor taller de la región. Paciencia, amor por las prendas y resultados impecables. Vuelvo siempre." },
  { name:"Sandra M.",  city:"Medellín", stars:5,
    text:"Me confeccionaron el vestido de novia a medida perfecta. Cada detalle exactamente como lo soñé. Eternamente agradecida." },
];

const botReplies = {
  "✂ Arreglo técnico":     "Con mucho gusto 🧵 Trabajamos cambio de cierres, ajuste de tallas, ruedos, remaches y más. ¿Qué necesita tu prenda?",
  "📐 Confección a medida": "¡Qué emocionante! 👗 Confeccionamos desde ropa casual hasta vestidos de gala. ¿Tienes un diseño en mente?",
  "💬 Otra consulta":       "¡Claro! Cuéntame con confianza, aquí estoy para ayudarte con todo lo que necesites 😊",
};

export default function KimaraApp() {
  const [chatOpen,     setChatOpen]     = useState(false);
  const [messages,     setMessages]     = useState([
    { from:"bot", text:"¡Hola! Soy Valeria 🧵 Tu asesora especialista en costura de Kimara. ¿En qué te puedo ayudar hoy?" }
  ]);
  const [showQuicks,   setShowQuicks]   = useState(true);
  const [inputMsg,     setInputMsg]     = useState("");
  const [isTyping,     setIsTyping]     = useState(false);
  const [mobOpen,      setMobOpen]      = useState(false);
  const [dragOver,     setDragOver]     = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [formStep,     setFormStep]     = useState(1);
  const [formData,     setFormData]     = useState({ name:"", phone:"", service:"", prenda:"", desc:"", tipo:"" });
  const [submitted,    setSubmitted]    = useState(false);
  const chatEndRef = useRef(null);
  const fileRef    = useRef(null);

  useEffect(() => {
    if (chatOpen) setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior:"smooth" }), 80);
  }, [messages, chatOpen]);

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }); setMobOpen(false); };

  const sendMsg = (text) => {
    const msg = text || inputMsg.trim(); if (!msg) return;
    setMessages(m => [...m, { from:"user", text:msg }]);
    setInputMsg(""); setShowQuicks(false); setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(m => [...m, { from:"bot", text: botReplies[msg] || "Déjame conectarte con una de nuestras modistas. ¿Me compartes tu número de WhatsApp?" }]);
    }, 950);
  };

  const nextStep = (to) => {
    if (to === 2 && (!formData.name.trim() || !formData.phone.trim() || !formData.service)) return;
    if (to === 3 && (!formData.prenda.trim() || !formData.desc.trim())) return;
    setFormStep(to);
  };

  const resetForm = () => {
    setSubmitted(false); setFormStep(1);
    setFormData({ name:"", phone:"", service:"", prenda:"", desc:"", tipo:"" });
    setUploadedFile(null);
  };

  return (
    <>
      <style>{styles}</style>

      {/* ══ NAVBAR ══ */}
      <nav style={{ position:"sticky", top:0, zIndex:200,
        background:"rgba(10,10,10,.96)", backdropFilter:"blur(16px)",
        WebkitBackdropFilter:"blur(16px)", borderBottom:"1px solid #2A2A2A" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 48px",
          height:68, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          {LOGO_LIGHT}
          <div className="desktop-nav" style={{ display:"flex", gap:36, alignItems:"center" }}>
            {[["servicios","Servicios"],["proceso","Cómo funciona"],["cotizar","Cotizar"],["contacto","Contacto"]].map(([id,label]) => (
              <span key={id} className="nav-link" style={{ color:"#AAAAAA" }}
                onClick={() => scrollTo(id)}
                onMouseEnter={e => e.currentTarget.style.color = WHITE}
                onMouseLeave={e => e.currentTarget.style.color = "#AAAAAA"}>
                {label}
              </span>
            ))}
            <button className="btn-primary" style={{ padding:"11px 24px", fontSize:11 }}
              onClick={() => scrollTo("cotizar")}>Solicitar cotización</button>
          </div>
          <button className="mob-btn" onClick={() => setMobOpen(!mobOpen)}
            style={{ display:"none", background:"none", border:"none", cursor:"pointer", fontSize:22, color:WHITE }}>
            {mobOpen ? "✕" : "☰"}
          </button>
        </div>
        {mobOpen && (
          <div style={{ background:"rgba(10,10,10,.98)", borderTop:"1px solid #2A2A2A",
            padding:"20px 48px", display:"flex", flexDirection:"column", gap:18 }}>
            {[["servicios","Servicios"],["proceso","Cómo funciona"],["cotizar","Cotizar"],["contacto","Contacto"]].map(([id,label]) => (
              <span key={id} className="nav-link" style={{ fontSize:14, color:"#CCCCCC" }}
                onClick={() => scrollTo(id)}>{label}</span>
            ))}
            <button className="btn-primary" onClick={() => scrollTo("cotizar")}>Solicitar cotización</button>
          </div>
        )}
      </nav>

      {/* ══ HERO ══ */}
      <section style={{ background:CHARCOAL, minHeight:"100vh", display:"flex",
        alignItems:"center", position:"relative", overflow:"hidden", paddingTop:68 }}>
        {/* Trama de tejido — igual al HTML: grid cada 60px con acento sage */}
        <div style={{ position:"absolute", inset:0, pointerEvents:"none",
          backgroundImage:`
            repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(131,143,116,.06) 60px),
            repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(131,143,116,.06) 60px)` }} />
        {/* Barra de acento vertical izquierda */}
        <div style={{ position:"absolute", left:0, top:0, bottom:0, width:4,
          background:`linear-gradient(to bottom, transparent 0%, ${SAGE} 30%, ${SAGE_MID} 70%, transparent 100%)` }} />
        {/* Watermark "K" — esquina inferior derecha, muy sutil */}
        <div style={{ position:"absolute", right:-80, bottom:-60,
          fontFamily:"'Cormorant Garamond',serif",
          fontSize:"clamp(320px,35vw,480px)",
          fontWeight:700, color:"rgba(255,255,255,.018)", lineHeight:1,
          pointerEvents:"none", userSelect:"none" }}>K</div>

        <div className="hero-two-col"
          style={{ maxWidth:1280, margin:"0 auto", padding:"80px 48px",
            width:"100%", display:"grid", gridTemplateColumns:"1fr 420px", gap:80, alignItems:"center" }}>
          <div style={{ textAlign:"left" }}>
            {/* Eyebrow — igual al HTML: línea + texto */}
            <div className="anim-fade-in" style={{ display:"flex", alignItems:"center", gap:12, marginBottom:24, textAlign:"left" }}>
              <div style={{ width:36, height:1, background:SAGE, flexShrink:0 }} />
              <span style={{ fontSize:10, fontWeight:700, letterSpacing:".22em",
                textTransform:"uppercase", color:SAGE_LIGHT }}>
                Itagüí, Antioquia · Taller artesanal
              </span>
            </div>

            <h1 className="font-serif anim-fade-up"
              style={{ fontSize:"clamp(52px,6.5vw,88px)", color:WHITE,
                lineHeight:1.02, fontWeight:400, fontStyle:"italic",
                marginBottom:28, textAlign:"left" }}>
              Haz que tu<br />
              <em className="sage-shimmer" style={{ fontStyle:"italic", fontWeight:400, display:"block" }}>
                ropa te encante
              </em>
            </h1>
            <p className="anim-fade-up-2"
              style={{ color:"#9A9690", fontSize:15, lineHeight:1.8,
                maxWidth:420, marginBottom:48, fontWeight:300, textAlign:"left" }}>
              Expertas en reparaciones, ajustes y confección a medida en Itagüí.
              Cuidamos cada prenda como si fuera nuestra.
            </p>

            <div className="anim-fade-up-3 hero-actions"
              style={{ display:"flex", gap:14, flexWrap:"wrap", justifyContent:"flex-start", marginBottom:64 }}>
              <button className="btn-primary" style={{ fontSize:13, padding:"15px 36px" }}
                onClick={() => scrollTo("cotizar")}>Solicitar cotización →</button>
              <button className="btn-outline"
                style={{ borderColor:SAGE_LIGHT, color:SAGE_LIGHT,
                  padding:"14px 26px" }}
                onClick={() => scrollTo("servicios")}>Ver servicios</button>
            </div>

            {/* Stats */}
            <div className="anim-fade-up-4"
              style={{ display:"flex", gap:48, marginTop:0, paddingTop:48,
                borderTop:`1px solid rgba(255,255,255,0.07)`, justifyContent:"flex-start" }}>
              {[["6+","Años experiencia"],["500+","Prendas restauradas"],["4.9★","Satisfacción"]].map(([n,l]) => (
                <div key={n}>
                  <div className="font-serif" style={{ fontSize:30, color:SAGE_MID, fontWeight:600, lineHeight:1 }}>{n}</div>
                  <div style={{ fontSize:10, color:SAGE_LIGHT, letterSpacing:".07em", marginTop:5, textTransform:"uppercase" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual derecho */}
          <div className="hero-visual" style={{ position:"relative" }}>
            <div style={{ width:"100%", aspectRatio:"3/4", maxHeight:500,
              background:`linear-gradient(145deg, #1e211a 0%, #292e22 50%, #1a1d16 100%)`,
              border:`1px solid rgba(131,143,116,.25)`, display:"flex",
              alignItems:"center", justifyContent:"center",
              flexDirection:"column", gap:12, position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", inset:0,
                backgroundImage:`repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(131,143,116,.05) 4px)` }} />
              {/* Esquinas sage */}
              {[{top:0,left:0,borderWidth:"2px 0 0 2px"},{top:0,right:0,borderWidth:"2px 2px 0 0"},
                {bottom:0,left:0,borderWidth:"0 0 2px 2px"},{bottom:0,right:0,borderWidth:"0 2px 2px 0"}].map((s,i) => (
                <div key={i} style={{ position:"absolute", width:24, height:24,
                  borderColor:SAGE, borderStyle:"solid", opacity:.7, ...s }} />
              ))}
              <div style={{ fontSize:56, opacity:.12 }}>✂</div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:12,
                color:SAGE_MID, opacity:.55, letterSpacing:".2em",
                textAlign:"center", textTransform:"uppercase" }}>
                Fotografía del taller<br />
                <span style={{ fontSize:10, letterSpacing:".1em", opacity:.75 }}>1080 × 1440 recomendado</span>
              </div>
            </div>
            {/* Badge flotante — estilo tarjeta */}
            <div style={{ position:"absolute", bottom:-14, left:-14,
              background:SAGE, padding:"14px 20px",
              boxShadow:`0 10px 30px rgba(131,143,116,.48)` }}>
              <div style={{ fontSize:10.5, color:WHITE, letterSpacing:".14em",
                textTransform:"uppercase", fontWeight:700 }}>¡Haz que tu ropa te encante!</div>
              <div style={{ fontSize:10, color:"rgba(255,255,255,.7)", marginTop:3 }}>
                Mall Itagüí · Local 117
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SERVICIOS ══ */}
      <section id="servicios" style={{ background:CREAM, padding:"112px 0" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 48px" }}>
          <div style={{ textAlign:"center", marginBottom:64 }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:14, marginBottom:14 }}>
              <div className="divider-line" /><span className="eyebrow">Lo que hacemos</span><div className="divider-line" />
            </div>
            <h2 className="font-serif"
              style={{ fontSize:"clamp(36px,4vw,56px)", fontWeight:400, lineHeight:1.1, color:BLACK }}>
              Servicios con <em>calidad</em> y precisión
            </h2>
            <p style={{ color:"#7a7570", marginTop:14, fontSize:14.5, maxWidth:520,
              margin:"14px auto 0", lineHeight:1.8, fontWeight:300 }}>
              En Kimara cada prenda recibe atención personalizada. Con años de experiencia en el corazón de Itagüí.
            </p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:20 }}>
            {services.map(s => (
              <div key={s.title} className="card-service">
                <div style={{ width:50, height:50, borderRadius:"50%",
                  background:SAGE_PALE, border:`1.5px solid rgba(131,143,116,.35)`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:22, marginBottom:24 }}>{s.icon}</div>
                <h3 className="font-serif"
                  style={{ fontSize:26, fontWeight:500, marginBottom:16, lineHeight:1.2, color:BLACK }}>
                  {s.title}
                </h3>
                <p style={{ color:"#5A5A5A", fontSize:13.5, lineHeight:1.8, marginBottom:28, fontWeight:300 }}>{s.desc}</p>
                <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:7, marginBottom:28 }}>
                  {s.items.map(item => (
                    <li key={item} style={{ fontSize:12.5, color:"#555", display:"flex", alignItems:"flex-start", gap:9 }}>
                      <span style={{ display:"inline-block", width:5, height:5, background:SAGE,
                        borderRadius:1, transform:"rotate(45deg)", flexShrink:0, marginTop:5 }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <button className="btn-dark" style={{ width:"100%", justifyContent:"center" }}
                  onClick={() => scrollTo("cotizar")}>{s.cta} →</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROCESO ══ */}
      <section id="proceso" style={{ background:CHARCOAL, padding:"96px 0",
        borderTop:`3px solid ${SAGE}`, borderBottom:`3px solid ${SAGE}` }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 48px" }}>
          <div style={{ textAlign:"center", marginBottom:68 }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:14, marginBottom:14 }}>
              <div className="divider-line" style={{ opacity:.5 }} />
              <span className="eyebrow" style={{ color:SAGE_LIGHT }}>Proceso simple</span>
              <div className="divider-line" style={{ opacity:.5 }} />
            </div>
            <h2 className="font-serif" style={{ fontSize:"clamp(36px,4vw,56px)", color:WHITE, fontWeight:400, lineHeight:1.1 }}>
              Tu cotización en <em style={{ color:SAGE_MID }}>3 pasos</em>
            </h2>
          </div>
          <div className="steps-three"
            style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", position:"relative" }}>
            <div className="steps-connector" style={{ position:"absolute", top:24, left:"16%", right:"16%",
              height:1, background:`linear-gradient(90deg,transparent,${SAGE} 20%,${SAGE} 80%,transparent)`,
              opacity:.35 }} />
            {steps.map(s => (
              <div key={s.n} style={{ display:"flex", flexDirection:"column",
                alignItems:"center", textAlign:"center", padding:"0 28px" }}>
                <div className="step-circle">{s.n}</div>
                <h3 className="font-serif"
                  style={{ fontSize:20, fontWeight:500, color:WHITE, margin:"24px 0 10px", lineHeight:1.2 }}>
                  {s.title}
                </h3>
                <p style={{ fontSize:13, fontWeight:300, color:"#777", lineHeight:1.72 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIOS ══ */}
      <section style={{ background:SAGE_PALE, padding:"100px 0" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 48px" }}>
          <div style={{ textAlign:"center", marginBottom:56 }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:14, marginBottom:14 }}>
              <div className="divider-line" /><span className="eyebrow">Lo que dicen nuestras clientas</span><div className="divider-line" />
            </div>
            <h2 className="font-serif"
              style={{ fontSize:"clamp(36px,4vw,56px)", fontWeight:400, lineHeight:1.1, color:BLACK }}>
              Calidad en cada <em>puntada</em>
            </h2>
          </div>
          <div className="testi-grid"
            style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
            {testimonials.map((t,i) => (
              <div key={t.name} className="testi-card">
                <div style={{ color:SAGE, fontSize:13, letterSpacing:".04em", marginBottom:14, paddingTop:6 }}>
                  {"★".repeat(t.stars)}
                </div>
                <p style={{ color:"#444", lineHeight:1.78, fontSize:14, marginBottom:20, fontStyle:"italic" }}>{t.text}</p>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:36, height:36, borderRadius:"50%",
                    background: i===1 ? SAGE_DARK : SAGE,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    color:WHITE, fontSize:14, fontWeight:700, flexShrink:0 }}>{t.name[0]}</div>
                  <div>
                    <div style={{ fontSize:13, fontWeight:600 }}>{t.name}</div>
                    <div style={{ fontSize:11, color:"#999", marginTop:1 }}>{t.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FORMULARIO ══ */}
      <section id="cotizar" style={{ background:WHITE, padding:"112px 0" }}>
        <div className="two-col"
          style={{ maxWidth:1280, margin:"0 auto", padding:"0 48px", display:"grid",
            gridTemplateColumns:"1fr 600px", gap:96, alignItems:"start" }}>

          {/* Info */}
          <div className="cotizar-left" style={{ position:"sticky", top:100 }}>
            <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:14 }}>
              <div className="divider-line" /><span className="eyebrow">Cotización gratuita</span>
            </div>
            <h2 className="font-serif"
              style={{ fontSize:"clamp(34px,3.5vw,50px)", fontWeight:400,
                lineHeight:1.12, marginBottom:24, color:BLACK, textAlign:"left" }}>
              Cuéntanos qué<br />necesita <em>tu prenda</em>
            </h2>
            <p style={{ fontSize:14, fontWeight:300, color:"#5A5A5A",
              lineHeight:1.85, marginBottom:40, maxWidth:420, textAlign:"left" }}>
              Completa el formulario y nos contactaremos en menos de 2 horas hábiles con tu cotización. Sin compromiso, sin costo.
            </p>

            {/* Perks */}
            <div style={{ display:"flex", flexDirection:"column", gap:16, marginBottom:40, textAlign:"left" }}>
              {perks.map(p => (
                <div key={p.title} style={{ display:"flex", alignItems:"flex-start", gap:14 }}>
                  <div style={{ width:20, height:20,
                    background:SAGE_PALE, border:`1px solid rgba(131,143,116,.38)`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    flexShrink:0, marginTop:2, fontSize:10, color:SAGE, fontWeight:700 }}>✓</div>
                  <div>
                    <div style={{ fontSize:12.5, fontWeight:700, color:BLACK,
                      display:"block", marginBottom:2 }}>{p.title}</div>
                    <div style={{ fontSize:13, color:"#444", lineHeight:1.6 }}>{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Datos de contacto exactos de la tarjeta */}
            <div style={{ background:CREAM, border:`1px solid ${CREAM_DARK}`,
              padding:"18px 20px", marginBottom:24 }}>
              {[{ icon:"📍", text:"Mall Itagüí, local 117. A media cuadra del Parque de Itagüí." },
                { icon:"📱", text:"313 2169700" },
                { icon:"📷", text:"@arreglosycosturakimara" }].map(item => (
                <div key={item.text} style={{ display:"flex", alignItems:"flex-start",
                  gap:10, fontSize:13, color:"#555", marginBottom:8 }}>
                  <span style={{ fontSize:15, flexShrink:0 }}>{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>

            <button className="btn-outline" onClick={() => setChatOpen(true)}>
              ¿Preguntas? Habla con Valeria →
            </button>
          </div>

          {/* Form */}
          <div style={{ background:CREAM, border:`1px solid ${CREAM_DARK}`, padding:"52px" }}>
            <h3 className="font-serif" style={{ fontSize:24, fontWeight:500, marginBottom:8, color:BLACK }}>
              Solicitar cotización
            </h3>
            <p style={{ fontSize:12.5, color:"#A8A8A8", marginBottom:36, letterSpacing:".03em" }}>
              Paso {formStep} de 3 · {["","Información básica","Tu prenda","Foto opcional"][formStep]}
            </p>

            {/* Tabs */}
            <div style={{ display:"flex", marginBottom:40, borderBottom:`1px solid ${CREAM_DARK}` }}>
              {["Datos","Prenda","Foto"].map((label,i) => {
                const s=i+1, isA=formStep===s, isDone=formStep>s;
                return (
                  <div key={label} style={{ flex:1, textAlign:"center", paddingBottom:13,
                    borderBottom:`2px solid ${isDone?SAGE_DARK:isA?SAGE:"transparent"}`,
                    transition:"border-color .3s",
                    fontSize:9.5, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase",
                    color: isDone?SAGE_DARK : isA?SAGE : "#CCC" }}>
                    {isDone?`✓ ${label}`:label}
                  </div>
                );
              })}
            </div>

            {/* Step 1 */}
            {!submitted && formStep===1 && (
              <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                <div className="form-two-col"
                  style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                  {[["Nombre completo","text","Tu nombre","name"],["WhatsApp","tel","313 2169700","phone"]].map(([lbl,type,ph,key]) => (
                    <div key={key}>
                      <label style={{ display:"block", fontSize:9.5, fontWeight:700,
                        letterSpacing:".14em", textTransform:"uppercase", color:"#888", marginBottom:8 }}>{lbl}</label>
                      <input className="input-field" type={type} placeholder={ph}
                        value={formData[key]} onChange={e => setFormData(d => ({...d,[key]:e.target.value}))} />
                    </div>
                  ))}
                </div>
                <div>
                  <label style={{ display:"block", fontSize:9.5, fontWeight:700,
                    letterSpacing:".14em", textTransform:"uppercase", color:"#888", marginBottom:8 }}>Tipo de servicio</label>
                  <select className="input-field" value={formData.service}
                    onChange={e => setFormData(d => ({...d,service:e.target.value}))}>
                    <option value="">Selecciona un servicio...</option>
                    <option>Arreglo técnico (cierre, talla, remache...)</option>
                    <option>Confección a medida</option>
                    <option>Otro / No estoy segura</option>
                  </select>
                </div>
                <button className="btn-primary" style={{ marginTop:8, width:"100%", justifyContent:"center", display:"flex" }}
                  onClick={() => nextStep(2)}>Continuar →</button>
              </div>
            )}

            {/* Step 2 */}
            {!submitted && formStep===2 && (
              <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                <div>
                  <label style={{ display:"block", fontSize:9.5, fontWeight:700,
                    letterSpacing:".14em", textTransform:"uppercase", color:"#888", marginBottom:8 }}>Tipo de prenda</label>
                  <input className="input-field" placeholder="Ej: Pantalón jean, Vestido de noche..."
                    value={formData.prenda} onChange={e => setFormData(d => ({...d,prenda:e.target.value}))} />
                </div>
                <div>
                  <label style={{ display:"block", fontSize:9.5, fontWeight:700,
                    letterSpacing:".14em", textTransform:"uppercase", color:"#888", marginBottom:8 }}>Tipo de arreglo</label>
                  <select className="input-field" value={formData.tipo}
                    onChange={e => setFormData(d => ({...d,tipo:e.target.value}))}>
                    <option value="">¿Qué necesitas?</option>
                    <option>Cambio de cierre / cremallera</option>
                    <option>Ajuste de talla (entrada o salida)</option>
                    <option>Ruedo / dobladillo</option>
                    <option>Reparación de rotura o desgaste</option>
                    <option>Cambio de botones / remaches</option>
                    <option>Confección desde cero</option>
                    <option>Transformación de prenda</option>
                    <option>Otro</option>
                  </select>
                </div>
                <div>
                  <label style={{ display:"block", fontSize:9.5, fontWeight:700,
                    letterSpacing:".14em", textTransform:"uppercase", color:"#888", marginBottom:8 }}>Descripción detallada</label>
                  <textarea className="input-field" rows={4} style={{ resize:"vertical", lineHeight:1.65 }}
                    placeholder="Cuéntanos con detalle qué necesita tu prenda..."
                    value={formData.desc} onChange={e => setFormData(d => ({...d,desc:e.target.value}))} />
                </div>
                <div style={{ display:"flex", gap:10 }}>
                  <button className="btn-outline" style={{ flex:1, justifyContent:"center" }}
                    onClick={() => setFormStep(1)}>← Volver</button>
                  <button className="btn-primary" style={{ flex:2, justifyContent:"center", display:"flex" }}
                    onClick={() => nextStep(3)}>Continuar →</button>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {!submitted && formStep===3 && (
              <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
                <div>
                  <label style={{ display:"block", fontSize:9.5, fontWeight:700,
                    letterSpacing:".14em", textTransform:"uppercase", color:"#888", marginBottom:8 }}>
                    Foto de tu prenda (opcional)
                  </label>
                  <div className={`dropzone${dragOver?" drag":""}`}
                    onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={e => { e.preventDefault(); setDragOver(false); const f=e.dataTransfer.files[0]; if(f) setUploadedFile(f); }}
                    onClick={() => fileRef.current?.click()}>
                    <input ref={fileRef} type="file" accept="image/*" style={{ display:"none" }}
                      onChange={e => { const f=e.target.files[0]; if(f) setUploadedFile(f); }} />
                    {uploadedFile ? (
                      <div>
                        <div style={{ fontSize:28, marginBottom:8 }}>📎</div>
                        <div style={{ fontSize:13, color:SAGE, fontWeight:600 }}>{uploadedFile.name}</div>
                        <div style={{ fontSize:11, color:"#999", marginTop:4 }}>Archivo cargado correctamente ✓</div>
                      </div>
                    ) : (
                      <div>
                        <div style={{ fontSize:32, marginBottom:10, opacity:.4 }}>📷</div>
                        <div style={{ fontSize:13.5, color:"#666", marginBottom:4 }}>Arrastra tu foto aquí</div>
                        <div style={{ fontSize:11, color:"#AAA" }}>
                          o <span style={{ color:SAGE, cursor:"pointer", fontWeight:600 }}>haz clic para explorar</span> · JPG, PNG hasta 10 MB
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Resumen */}
                <div style={{ background:WHITE, border:`1px solid ${CREAM_DARK}`, padding:"16px 18px" }}>
                  <div style={{ fontSize:9.5, fontWeight:700, letterSpacing:".14em",
                    textTransform:"uppercase", color:SAGE, marginBottom:10 }}>Resumen de tu solicitud</div>
                  {[["Nombre",formData.name],["WhatsApp",formData.phone],
                    ["Servicio",formData.service],["Prenda",formData.prenda]].map(([k,v]) => (
                    <div key={k} style={{ display:"flex", gap:8, fontSize:12.5, marginBottom:5 }}>
                      <span style={{ color:"#AAA", minWidth:78 }}>{k}:</span>
                      <span style={{ color:"#222", fontWeight:600 }}>{v}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display:"flex", gap:10 }}>
                  <button className="btn-outline" style={{ flex:1, justifyContent:"center" }}
                    onClick={() => setFormStep(2)}>← Volver</button>
                  <button className="btn-primary" style={{ flex:2, justifyContent:"center", display:"flex", fontSize:13 }}
                    onClick={() => setSubmitted(true)}>Enviar solicitud ✓</button>
                </div>
              </div>
            )}

            {/* Éxito */}
            {submitted && (
              <div style={{ textAlign:"center", padding:"44px 20px" }}>
                <div style={{ width:64, height:64, borderRadius:"50%",
                  background:SAGE_PALE, border:`2px solid ${SAGE}`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:28, margin:"0 auto 20px" }}>🧵</div>
                <h3 className="font-serif" style={{ fontSize:28, marginBottom:10, color:BLACK }}>¡Solicitud enviada!</h3>
                <p style={{ fontSize:14, color:"#6B6660", lineHeight:1.75, marginBottom:28 }}>
                  Valeria te contactará pronto por WhatsApp al número indicado.<br />
                  <strong style={{ color:SAGE }}>¡Con mucho gusto te atendemos!</strong>
                </p>
                <button className="btn-primary" onClick={resetForm}>Nueva solicitud</button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer id="contacto" style={{ background:CHARCOAL, padding:"80px 0 0" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 48px" }}>
          <div className="three-col"
            style={{ display:"grid", gridTemplateColumns:"2.5fr 1fr 1fr", gap:72,
              paddingBottom:64, marginBottom:36, borderBottom:`1px solid rgba(131,143,116,.2)` }}>
            <div>

            <div style={{ color:"#888", marginTop:20, maxWidth:290, textAlign:"left" }}>

              <div class="footer-logo-name">{LOGO_LIGHT}</div>

              {/* Eslogan de la tarjeta */}
              <div style={{ marginTop:18, padding:"10px 16px",
                background:"rgba(131,143,116,.12)", fontSize:12, color:SAGE_LIGHT, fontStyle:"italic", letterSpacing:".02em" }}>
                ¡Haz que tu ropa te encante!
              </div>

              <p style={{ color:"#888", fontSize:13.5, lineHeight:1.82, marginTop:20, maxWidth:290, fontWeight:300, textAlign:"left" }}>
                Taller profesional de costura en el corazón de Itagüí, Antioquia.
                Cuidamos cada prenda con calidad, paciencia y dedicación.
              </p>
            </div>

              <div style={{ display:"flex", gap:16, marginTop:22 }}>
                {["WhatsApp","Instagram","Facebook"].map(s => (
                  <span key={s} style={{ fontSize:11, color:"#666", letterSpacing:".06em",
                    cursor:"pointer", transition:"color .2s", textTransform:"uppercase" }}
                    onMouseEnter={e => e.target.style.color=SAGE_LIGHT}
                    onMouseLeave={e => e.target.style.color="#666"}>{s}</span>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize:10, letterSpacing:".16em", textTransform:"uppercase",
                color:SAGE_MID, marginBottom:20, fontWeight:700 }}>Servicios</div>
              {["Ruedos y dobladillos","Cambio de cierres","Ajustes de talla",
                "Transformaciones","Confección a medida"].map(l => (
                <span key={l} className="footer-link">{l}</span>
              ))}
            </div>
            <div>
              <div style={{ fontSize:10, letterSpacing:".16em", textTransform:"uppercase",
                color:SAGE_MID, marginBottom:20, fontWeight:700 }}>Encuéntranos</div>
              <div style={{ fontSize:13, color:"#888", lineHeight:2.1, fontWeight:300 }}>
                Mall Itagüí, local 117<br />
                A media cuadra del<br />
                Parque de Itagüí<br /><br />
                <span style={{ color:SAGE_LIGHT, fontWeight:500 }}>313 2169700</span><br />
                <span style={{ color:"#777", fontSize:12 }}>@arreglosycosturakimara</span><br /><br />
                Lun – Sáb · 8:00 am – 6:00 pm
              </div>
            </div>
          </div>
          <div style={{ display:"flex", justifyContent:"space-between",
            alignItems:"center", flexWrap:"wrap", gap:10 }}>
            <div style={{ fontSize:11.5, color:"#444" }}>© 2026 Kimara · Arreglos & Costura · Itagüí, Colombia</div>
            <div style={{ fontSize:11.5, color:"#444" }}>Hecho con 🧵 y calidad en Antioquia</div>
          </div>
        </div>
      </footer>

      {/* ══ CHATBOT ══ */}
      <div className="chat-widget">
        {chatOpen && (
          <div className="chat-window">
            {/* Header — verde sage como en la tarjeta */}
            <div style={{ background:SAGE, padding:"14px 16px",
              display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
              <div style={{ width:38, height:38, borderRadius:"50%",
                background:"rgba(255,255,255,.22)", border:`1.5px solid rgba(255,255,255,.4)`,
                display:"flex", alignItems:"center", justifyContent:"center",
                color:WHITE, fontWeight:700, fontSize:16, flexShrink:0 }}>V</div>
              <div style={{ flex:1 }}>
                <div style={{ color:WHITE, fontSize:13, fontWeight:600 }}>Valeria · Asesora Kimara</div>
                <div style={{ color:"rgba(255,255,255,.75)", fontSize:10, marginTop:1,
                  display:"flex", alignItems:"center", gap:5 }}>
                  <span style={{ width:7, height:7, borderRadius:"50%",
                    background:"#7ddc8f", display:"inline-block" }} />
                  En línea ahora
                </div>
              </div>
              <button onClick={() => setChatOpen(false)}
                style={{ background:"none", border:"none", color:"rgba(255,255,255,.6)",
                  cursor:"pointer", fontSize:17, lineHeight:1, transition:"color .2s" }}
                onMouseEnter={e => e.target.style.color=WHITE}
                onMouseLeave={e => e.target.style.color="rgba(255,255,255,.6)"}>✕</button>
            </div>

            {/* Mensajes */}
            <div className="chat-msgs">
              {messages.map((m,i) => (
                <div key={i} className={m.from==="bot"?"bubble-bot":"bubble-user"}>
                  {m.from==="bot" && (
                    <div style={{ fontSize:8.5, fontWeight:700, letterSpacing:".1em",
                      color:SAGE, textTransform:"uppercase", marginBottom:4 }}>Valeria</div>
                  )}
                  {m.text}
                </div>
              ))}
              {showQuicks && messages.length===1 && (
                <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginTop:2 }}>
                  {["✂ Arreglo técnico","📐 Confección","💬 Otra consulta"].map(q => (
                    <button key={q} className="quick-chip" onClick={() => sendMsg(q)}>{q}</button>
                  ))}
                </div>
              )}
              {isTyping && (
                <div className="bubble-bot">
                  <div style={{ fontSize:8.5, fontWeight:700, letterSpacing:".1em",
                    color:SAGE, textTransform:"uppercase", marginBottom:4 }}>Valeria</div>
                  <div style={{ display:"flex", gap:4 }}>
                    <div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div style={{ borderTop:`1px solid ${CREAM_DARK}`, padding:"10px 12px",
              display:"flex", gap:8, background:WHITE, flexShrink:0 }}>
              <input className="chat-input-f" placeholder="Escribe tu pregunta..."
                value={inputMsg} onChange={e => setInputMsg(e.target.value)}
                onKeyDown={e => e.key==="Enter" && sendMsg()} />
              <button onClick={() => sendMsg()}
                style={{ width:36, height:36, borderRadius:"50%",
                  background:SAGE, border:"none", color:WHITE,
                  cursor:"pointer", display:"flex", alignItems:"center",
                  justifyContent:"center", fontSize:15, flexShrink:0,
                  transition:"background .2s" }}
                onMouseEnter={e => e.target.style.background=SAGE_DARK}
                onMouseLeave={e => e.target.style.background=SAGE}>↑</button>
            </div>
          </div>
        )}

        {/* FAB */}
        <button className="chat-toggle-btn" onClick={() => setChatOpen(!chatOpen)}
          aria-label="Abrir asistente">
          {!chatOpen && <div className="chat-pulse" />}
          <div className="chat-online-dot" />
          <span style={{ fontSize:chatOpen?18:22, color:WHITE }}>{chatOpen?"✕":"💬"}</span>
        </button>
      </div>
    </>
  );
}
