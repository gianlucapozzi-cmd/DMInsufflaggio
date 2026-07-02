"use client";

/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";

// ============================================================
// DM INSUFFLAGGIO — Landing Page
// Stack: Next.js + Tailwind CSS + TypeScript
// Da usare in Cursor come pagina principale (app/page.tsx)
// Immagini: sostituisci i placeholder con i tuoi file in /public
// ============================================================

// ISTRUZIONI PER CURSOR:
// 1. Crea un nuovo progetto: npx create-next-app@latest dm-insufflaggio --typescript --tailwind --app
// 2. Copia questo file in app/page.tsx
// 3. Aggiungi le immagini in /public (logo, foto cantieri, ecc.)
// 4. Installa framer-motion: npm install framer-motion lucide-react
// 5. npm run dev per avviare

// ─── DATI CONFIGURABILI ───────────────────────────────────────
const BRAND = {
  name: "DM Insufflaggio",
  tagline: "Isolamento termico e acustico in Sardegna",
  phone: "342 09 53 323",
  phoneHref: "tel:+393420953323",
  email: "dminsufflaggio@gmail.com",
  instagram: "dminsufflaggio",
  instagramUrl: "https://www.instagram.com/dminsufflaggio",
  color: "#55b037",
  colorDark: "#3d8228",
  colorLight: "#e8f5e2",
  region: "Tutta la Sardegna",
  privacyUrl: "https://www.iubenda.com/privacy-policy/57932833",
  cookieUrl: "https://www.iubenda.com/privacy-policy/57932833/cookie-policy",
};

const IMAGES = {
  hero: "/images/hero.jpg",
  cantiere: "/images/cose.jpg",
  gallery: [
    {
      src: "/images/photo-1.jpg",
      label: "Intervento in cantiere",
      alt: "Operatore DM Insufflaggio durante un intervento di isolamento",
      objectPosition: "center top",
      marginTop: 0,
    },
    {
      src: "/images/photo-2.jpg",
      label: "Lavoro sul campo",
      alt: "Fase operativa di un intervento di insufflaggio termico",
      objectPosition: "center center",
    },
    {
      src: "/images/photo-3.jpg",
      label: "Attrezzatura professionale",
      alt: "Attrezzatura utilizzata per l'insufflaggio delle pareti",
      objectPosition: "center top",
      marginTop: 0,
      scale: 1.1,
    },
    {
      src: "/images/photo-4.jpg",
      label: "Risultato del lavoro",
      alt: "Dettaglio di un intervento di isolamento termico completato",
      objectPosition: "center center",
    },
  ],
};

const VANTAGGI = [
  {
    icon: "⚡",
    titolo: "Isolamento Immediato",
    desc: "Proteggi la tua casa dagli sprechi energetici in poche ore. L'insufflaggio agisce dall'interno delle pareti senza demolire nulla.",
  },
  {
    icon: "🔧",
    titolo: "Zero Disagi",
    desc: "Installazione rapida, pulita e non invasiva. Nessun lavoro di muratura, nessun cantiere aperto per settimane.",
  },
  {
    icon: "💶",
    titolo: "Risparmio in Bolletta",
    desc: "Riduci il consumo energetico fino al 50%. L'investimento si ripaga in pochi anni grazie al calo reale delle bollette.",
  },
  {
    icon: "📅",
    titolo: "Dura nel Tempo",
    desc: "Il materiale insufflato non si deteriora, non si assesta e non perde efficienza. Una soluzione definitiva che vale decenni.",
  },
  {
    icon: "🏠",
    titolo: "Comfort 365 Giorni",
    desc: "Più caldo d'inverno, più fresco d'estate. La temperatura interna rimane stabile senza stressare gli impianti.",
  },
  {
    icon: "🔇",
    titolo: "Isolamento Acustico",
    desc: "Oltre al benessere termico, l'insufflaggio riduce sensibilmente la trasmissione dei rumori tra ambienti e dall'esterno.",
  },
];

const FASI = [
  {
    numero: "01",
    titolo: "Sopralluogo Gratuito",
    desc: "Valutiamo lo stato delle tue pareti, il tipo di struttura e il potenziale di risparmio. Zero impegno, zero costi.",
  },
  {
    numero: "02",
    titolo: "Preventivo Personalizzato",
    desc: "Ricevi un preventivo trasparente, chiaro e senza sorprese. Ogni progetto è diverso, il prezzo si adatta alla tua casa.",
  },
  {
    numero: "03",
    titolo: "Intervento Rapido",
    desc: "In pochi ore insuffliamo le pareti dall'interno attraverso piccoli fori. Nessuna demolizione, nessun disturbo.",
  },
  {
    numero: "04",
    titolo: "Casa Isolata",
    desc: "Da subito senti la differenza: temperature più stabili, meno rumore, bollette più leggere.",
  },
];

const FAQ = [
  {
    q: "Cos'è l'insufflaggio?",
    a: "L'insufflaggio è una tecnica di isolamento termico e acustico che consiste nell'iniettare un materiale isolante (solitamente lana minerale, EPS perle o cellulosa) all'interno delle intercapedini delle pareti tramite piccoli fori. Non richiede demolizioni e si esegue in poche ore.",
  },
  {
    q: "Funziona anche per i condomini?",
    a: "Sì, operiamo su condomini di qualsiasi dimensione. Gestiamo l'intera organizzazione del lavoro, compresa la coordinazione con l'amministratore e i condomini.",
  },
  {
    q: "Quanto dura l'intervento?",
    a: "Un'abitazione media viene completata in una sola giornata lavorativa. Per condomini o edifici più grandi il tempo varia, ma sempre senza bloccare la normale vita dell'edificio.",
  },
  {
    q: "L'isolamento è visibile?",
    a: "No. I fori necessari per l'insufflaggio vengono tappati e intonacati al termine del lavoro. Il risultato finale è esteticamente identico alla parete originale.",
  },
  {
    q: "Operate in tutta la Sardegna?",
    a: "Sì, il nostro servizio copre l'intera Sardegna, sia per abitazioni private che per condomini e edifici commerciali.",
  },
  {
    q: "Posso richiedere incentivi o detrazioni fiscali?",
    a: "L'insufflaggio rientra spesso nelle categorie agevolate dagli incentivi per l'efficienza energetica. Ti guidiamo nella verifica delle detrazioni disponibili al momento dell'intervento.",
  },
];

const TESTIMONIANZE = [
  {
    nome: "Stefano Oppo",
    testo:
      "Veloci, efficienti e soprattutto la casa adesso è tutta un'altra cosa! Consigliatissimi!",
  },
  {
    nome: "Marcello Serru",
    testo:
      "Lavoro eseguito in poco tempo, con cortesia e professionalità. Soprattutto ha migliorato la prestazione termica delle stanze.",
  },
  {
    nome: "Fabio Sanna",
    testo:
      "Ottima azienda, Daniele è una persona precisa, disponibile, cordiale e competente. Se avete bisogno di isolare le intercapedini delle pareti in Sardegna, affidatevi a lui.",
  },
  {
    nome: "Massimo Cogoni",
    testo:
      "Puntuale, preciso e professionale. Sono pienamente soddisfatto del lavoro svolto.",
  },
  {
    nome: "Enrico Pagani",
    testo:
      "Cordialità, affidabilità e spiegazioni tecniche chiare. Dopo l'intervento ho notato un evidente miglioramento termico e acustico.",
  },
  {
    nome: "Claudio Casula",
    testo:
      "Ottimo lavoro di isolamento termo-acustico eseguito da Daniele. Consigliato.",
  },
];

// ─── COMPONENTE PRINCIPALE ────────────────────────────────────
export default function DMInsufflaggio() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (document.querySelector('script[src="https://cdn.iubenda.com/iubenda.js"]')) return;

    const loader = () => {
      const s = document.createElement("script");
      const tag = document.getElementsByTagName("script")[0];
      s.src = "https://cdn.iubenda.com/iubenda.js";
      tag?.parentNode?.insertBefore(s, tag);
    };

    if (document.readyState === "complete") {
      loader();
      return;
    }

    window.addEventListener("load", loader, false);
    return () => window.removeEventListener("load", loader, false);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 88;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setFormStatus("submitting");

    const formData = new FormData(form);
    const payload = {
      nome: String(formData.get("nome") ?? ""),
      telefono: String(formData.get("telefono") ?? ""),
      email: String(formData.get("email") ?? ""),
      comune: String(formData.get("comune") ?? ""),
      tipo: String(formData.get("tipo") ?? ""),
      messaggio: String(formData.get("messaggio") ?? ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setFormStatus("error");
        return;
      }

      setFormStatus("success");
      form.reset();
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <main className="font-sans text-gray-800 overflow-x-hidden">
      <style>{`
        :root {
          --green: ${BRAND.color};
          --green-dark: ${BRAND.colorDark};
          --green-light: ${BRAND.colorLight};
        }
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;1,600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Outfit', sans-serif; }
        .font-display { font-family: 'Playfair Display', serif; }

        .btn-primary {
          background: var(--green);
          color: white;
          padding: 14px 32px;
          border-radius: 4px;
          font-weight: 600;
          font-size: 1rem;
          letter-spacing: 0.02em;
          transition: background 0.2s, transform 0.15s;
          display: inline-block;
          text-decoration: none;
          cursor: pointer;
          border: none;
        }
        .btn-primary:hover { background: var(--green-dark); transform: translateY(-1px); }

        .btn-outline {
          border: 2px solid var(--green);
          color: var(--green);
          padding: 12px 30px;
          border-radius: 4px;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.2s;
          display: inline-block;
          text-decoration: none;
          background: transparent;
          cursor: pointer;
        }
        .btn-outline:hover { background: var(--green); color: white; }

        .section-label {
          color: var(--green);
          font-weight: 700;
          font-size: 0.8rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          display: block;
          margin-bottom: 12px;
        }

        .card-vantaggio {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 32px 28px;
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
          background: white;
        }
        .card-vantaggio:hover {
          border-color: var(--green);
          box-shadow: 0 8px 30px rgba(85,176,55,0.12);
          transform: translateY(-3px);
        }

        .fase-numero {
          font-size: 3.5rem;
          font-weight: 900;
          line-height: 1;
          color: var(--green);
          opacity: 0.18;
          font-family: 'Outfit', sans-serif;
        }

        .nav-link {
          font-size: 0.9rem;
          font-weight: 500;
          color: #374151;
          transition: color 0.2s;
          cursor: pointer;
          background: none;
          border: none;
        }
        .nav-link:hover { color: var(--green); }

        .stat-number {
          font-size: 3rem;
          font-weight: 900;
          color: var(--green);
          line-height: 1;
        }

        .hero-bg {
          background: linear-gradient(135deg, #0f1f0a 0%, #1a3510 50%, #0d1f09 100%);
          position: relative;
          overflow: hidden;
        }

        .hero-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url('${IMAGES.hero}') center/cover no-repeat;
          opacity: 0.18;
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 1;
        }

        .nav-desktop {
          display: flex;
          gap: 32px;
          align-items: center;
        }

        .nav-mobile-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.5rem;
        }

        .two-col-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }

        .perche-noi-gallery {
          align-content: start;
        }

        .perche-noi-gallery-item--left {
          align-self: start;
          margin-top: 0;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        #servizi,
        #come-funziona,
        #perche-noi,
        #faq,
        #contatti {
          scroll-margin-top: 88px;
        }

        .green-line {
          width: 48px;
          height: 4px;
          background: var(--green);
          border-radius: 2px;
          margin-bottom: 20px;
        }

        .cta-section {
          background: linear-gradient(135deg, var(--green) 0%, var(--green-dark) 100%);
          position: relative;
          overflow: hidden;
        }
        .cta-section::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -10%;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: rgba(255,255,255,0.06);
        }

        .faq-item {
          border-bottom: 1px solid #e5e7eb;
        }
        .faq-btn {
          width: 100%;
          text-align: left;
          padding: 20px 0;
          font-size: 1rem;
          font-weight: 600;
          color: #111827;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          transition: color 0.2s;
        }
        .faq-btn:hover { color: var(--green); }
        .faq-answer {
          overflow: hidden;
          transition: max-height 0.35s ease, opacity 0.3s;
          color: #4b5563;
          line-height: 1.7;
          font-size: 0.95rem;
        }

        @media (max-width: 768px) {
          .stat-number { font-size: 2.2rem; }
          .hero-title { font-size: 2.4rem !important; }
          .nav-desktop { display: none; }
          .nav-mobile-btn { display: block; }
          .two-col-grid { grid-template-columns: 1fr; gap: 32px; }
          .form-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: scrolled ? "12px 0" : "20px 0",
          background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          boxShadow: scrolled ? "0 1px 20px rgba(0,0,0,0.08)" : "none",
          transition: "all 0.3s",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} aria-label="DM Insufflaggio">
            <img
              src="/images/logo.png"
              alt="DM Insufflaggio - Isolamento termico e acustico"
              style={{
                height: scrolled ? 40 : 48,
                width: "auto",
                display: "block",
                transition: "height 0.3s",
              }}
            />
          </a>

          {/* Desktop nav */}
          <div className="nav-desktop">
            {[
              ["Servizi", "servizi"],
              ["Come funziona", "come-funziona"],
              ["Perché noi", "perche-noi"],
              ["FAQ", "faq"],
            ].map(([label, id]) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollTo(id)}
                className="nav-link"
                style={{ color: scrolled ? "#374151" : "rgba(255,255,255,0.85)" }}
              >
                {label}
              </button>
            ))}
            <a href={BRAND.phoneHref} className="btn-primary" style={{ padding: "10px 22px", fontSize: "0.9rem" }}>
              📞 {BRAND.phone}
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="nav-mobile-btn"
            style={{ color: scrolled ? "#111" : "white" }}
            aria-label={menuOpen ? "Chiudi menu" : "Apri menu"}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            style={{
              background: "white",
              padding: "20px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
              borderTop: "1px solid #e5e7eb",
            }}
          >
            {[
              ["Servizi", "servizi"],
              ["Come funziona", "come-funziona"],
              ["Perché noi", "perche-noi"],
              ["FAQ", "faq"],
            ].map(([label, id]) => (
              <button key={id} type="button" onClick={() => scrollTo(id)} className="nav-link" style={{ textAlign: "left" }}>
                {label}
              </button>
            ))}
            <a href={BRAND.phoneHref} className="btn-primary" style={{ textAlign: "center" }}>
              Chiama ora
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section
        className="hero-bg"
        style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 80 }}
      >
        <div
          className="hero-content"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "80px 24px",
            width: "100%",
          }}
        >
          <div style={{ maxWidth: 700 }}>
            <span
              style={{
                display: "inline-block",
                background: BRAND.color,
                color: "white",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "6px 14px",
                borderRadius: "2px",
                marginBottom: 28,
              }}
            >
              📍 Tutta la Sardegna
            </span>

            <h1
              className="hero-title font-display"
              style={{
                fontSize: "3.8rem",
                fontWeight: 700,
                color: "white",
                lineHeight: 1.15,
                marginBottom: 24,
              }}
            >
              L'isolamento che{" "}
              <span style={{ color: BRAND.color, fontStyle: "italic" }}>
                fa la differenza
              </span>
            </h1>

            <p
              style={{
                fontSize: "1.2rem",
                color: "rgba(255,255,255,0.78)",
                lineHeight: 1.75,
                marginBottom: 40,
                maxWidth: 580,
              }}
            >
              Insufflaggio professionale per case e condomini. Più caldo d'inverno,
              più fresco d'estate, bollette fino al 50% più leggere. Nessun lavoro
              invasivo, risultati da subito.
            </p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
              <button
                type="button"
                onClick={() => scrollTo("contatti")}
                className="btn-primary"
                style={{ fontSize: "1.05rem", padding: "16px 36px" }}
              >
                Richiedi sopralluogo gratuito
              </button>
              <button
                type="button"
                onClick={() => scrollTo("come-funziona")}
                className="btn-outline"
                style={{
                  borderColor: "rgba(255,255,255,0.5)",
                  color: "white",
                  fontSize: "1.05rem",
                }}
              >
                Come funziona →
              </button>
            </div>

            {/* Social proof mini */}
            <div
              style={{
                marginTop: 52,
                display: "flex",
                gap: 40,
                flexWrap: "wrap",
              }}
            >
              {[
                ["Sopralluogo", "gratuito e senza impegno"],
                ["Intervento", "in giornata"],
                ["Copertura", "tutta la Sardegna"],
              ].map(([label, sub]) => (
                <div key={label}>
                  <div
                    style={{
                      color: BRAND.color,
                      fontWeight: 700,
                      fontSize: "1rem",
                    }}
                  >
                    ✓ {label}
                  </div>
                  <div
                    style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.85rem" }}
                  >
                    {sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STRIP NUMERI ── */}
      <section style={{ background: BRAND.color, padding: "48px 24px" }}>
        <div
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 32,
            textAlign: "center",
          }}
        >
          {[
            ["50%", "risparmio energetico"],
            ["1 giorno", "per completare l'intervento"],
            ["0 €", "costo sopralluogo"],
            ["100%", "copertura Sardegna"],
          ].map(([num, label]) => (
            <div key={num}>
              <div
                style={{
                  fontSize: "2.4rem",
                  fontWeight: 900,
                  color: "white",
                  lineHeight: 1,
                  marginBottom: 6,
                }}
              >
                {num}
              </div>
              <div style={{ color: "rgba(255,255,255,0.82)", fontSize: "0.9rem" }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── COS'È L'INSUFFLAGGIO ── */}
      <section id="servizi" style={{ padding: "96px 24px", background: "#fafaf9" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="two-col-grid">
            <div
              style={{
                borderRadius: 8,
                aspectRatio: "4/3",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <img
                src={IMAGES.cantiere}
                alt="Intervento di insufflaggio termico eseguito da DM Insufflaggio"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 20,
                  left: 20,
                  background: BRAND.color,
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: 4,
                  fontWeight: 700,
                  fontSize: "0.85rem",
                }}
              >
                Tecnica a freddo
              </div>
            </div>

            <div>
              <span className="section-label">Il nostro servizio</span>
              <div className="green-line" />
              <h2
                className="font-display"
                style={{ fontSize: "2.4rem", fontWeight: 700, marginBottom: 20, lineHeight: 1.2 }}
              >
                Cos'è l'insufflaggio termico?
              </h2>
              <p
                style={{
                  color: "#4b5563",
                  lineHeight: 1.8,
                  marginBottom: 20,
                  fontSize: "1rem",
                }}
              >
                L'insufflaggio è la tecnica di isolamento più efficace e meno invasiva che esiste.
                Consiste nell'iniettare materiale isolante (lana minerale, perle di EPS o cellulosa)
                all'interno dell'intercapedine delle pareti, attraverso piccoli fori del diametro
                di circa 3 cm.
              </p>
              <p
                style={{
                  color: "#4b5563",
                  lineHeight: 1.8,
                  marginBottom: 28,
                  fontSize: "1rem",
                }}
              >
                Il risultato è immediato: pareti completamente isolate, temperature interne più
                stabili, minor carico sugli impianti di riscaldamento e raffrescamento. I fori
                vengono tappati e intonacati al termine del lavoro — nessuna traccia visibile.
              </p>
              <div
                style={{
                  background: BRAND.colorLight,
                  borderLeft: `4px solid ${BRAND.color}`,
                  padding: "16px 20px",
                  borderRadius: "0 6px 6px 0",
                  fontSize: "0.95rem",
                  color: "#1f2937",
                  fontWeight: 500,
                }}
              >
                🌡️ Ideale sia per nuove costruzioni che per edifici esistenti, inclusi i
                <strong> condomini</strong> di qualsiasi dimensione.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VANTAGGI ── */}
      <section style={{ padding: "96px 24px", background: "white" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span className="section-label">Perché sceglierlo</span>
            <div className="green-line" style={{ margin: "0 auto 20px" }} />
            <h2
              className="font-display"
              style={{ fontSize: "2.6rem", fontWeight: 700, lineHeight: 1.2 }}
            >
              Tutti i vantaggi dell'insufflaggio
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 24,
            }}
          >
            {VANTAGGI.map((v) => (
              <div key={v.titolo} className="card-vantaggio">
                <div style={{ fontSize: "2rem", marginBottom: 16 }}>{v.icon}</div>
                <h3
                  style={{
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    marginBottom: 10,
                    color: "#111827",
                  }}
                >
                  {v.titolo}
                </h3>
                <p style={{ color: "#6b7280", lineHeight: 1.7, fontSize: "0.95rem" }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COME FUNZIONA ── */}
      <section
        id="come-funziona"
        style={{ padding: "96px 24px", background: "#f8fdf6" }}
      >
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span className="section-label">Il processo</span>
            <div className="green-line" style={{ margin: "0 auto 20px" }} />
            <h2
              className="font-display"
              style={{ fontSize: "2.6rem", fontWeight: 700, lineHeight: 1.2 }}
            >
              Come funziona il servizio
            </h2>
            <p
              style={{
                color: "#6b7280",
                marginTop: 16,
                maxWidth: 520,
                margin: "16px auto 0",
                lineHeight: 1.7,
              }}
            >
              Dalla prima telefonata alla casa isolata: un percorso semplice,
              trasparente e senza sorprese.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {FASI.map((fase, i) => (
              <div
                key={fase.numero}
                style={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr",
                  gap: 32,
                  alignItems: "start",
                  padding: "32px 0",
                  borderBottom: i < FASI.length - 1 ? "1px solid #e5e7eb" : "none",
                }}
              >
                <div>
                  <div className="fase-numero">{fase.numero}</div>
                </div>
                <div>
                  <h3
                    style={{
                      fontWeight: 700,
                      fontSize: "1.15rem",
                      marginBottom: 8,
                      color: "#111827",
                    }}
                  >
                    {fase.titolo}
                  </h3>
                  <p style={{ color: "#6b7280", lineHeight: 1.7, fontSize: "0.95rem" }}>
                    {fase.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PERCHÉ NOI ── */}
      <section id="perche-noi" style={{ padding: "96px 24px", background: "white" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="two-col-grid">
            <div>
              <span className="section-label">La nostra differenza</span>
              <div className="green-line" />
              <h2
                className="font-display"
                style={{ fontSize: "2.4rem", fontWeight: 700, marginBottom: 24, lineHeight: 1.2 }}
              >
                Specialisti dell'insufflaggio in Sardegna
              </h2>
              <p
                style={{
                  color: "#4b5563",
                  lineHeight: 1.8,
                  marginBottom: 20,
                  fontSize: "1rem",
                }}
              >
                DM Insufflaggio è un'azienda sarda nata per portare in Sardegna una tecnica
                ancora poco diffusa sull'isola, ma già consolidata nel resto d'Italia e in Europa.
              </p>
              <p
                style={{
                  color: "#4b5563",
                  lineHeight: 1.8,
                  marginBottom: 32,
                  fontSize: "1rem",
                }}
              >
                Operiamo su tutta la Sardegna con attrezzatura professionale di ultima generazione.
                Ogni intervento viene progettato su misura per la struttura dell'edificio, per
                garantire il massimo rendimento con il minimo impatto.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  "Specialisti dedicati esclusivamente all'insufflaggio",
                  "Attrezzatura professionale sempre aggiornata",
                  "Esperienza su abitazioni private e condomini",
                  "Preventivi gratuiti e trasparenti",
                  "Operativi su tutta la Sardegna",
                ].map((item) => (
                  <div
                    key={item}
                    style={{ display: "flex", alignItems: "flex-start", gap: 12 }}
                  >
                    <span
                      style={{
                        color: BRAND.color,
                        fontWeight: 700,
                        fontSize: "1.1rem",
                        lineHeight: 1.4,
                        flexShrink: 0,
                      }}
                    >
                      ✓
                    </span>
                    <span style={{ color: "#374151", lineHeight: 1.6, fontSize: "0.95rem" }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Foto team/lavoro */}
            <div
              className="perche-noi-gallery"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              {IMAGES.gallery.map((img, index) => (
                <div
                  key={img.label}
                  className={index % 2 === 0 ? "perche-noi-gallery-item--left" : undefined}
                  style={{
                    borderRadius: 6,
                    aspectRatio: "1",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: img.objectPosition ?? "center center",
                      marginTop: img.marginTop ?? undefined,
                      transform: img.scale ? `scale(${img.scale})` : undefined,
                      transformOrigin: img.scale ? "center top" : undefined,
                      display: "block",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── RECENSIONI ── */}
      <section style={{ padding: "96px 24px", background: "#f8fdf6" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="section-label">Dicono di noi</span>
            <div className="green-line" style={{ margin: "0 auto 20px" }} />
            <h2
              className="font-display"
              style={{ fontSize: "2.4rem", fontWeight: 700, lineHeight: 1.2 }}
            >
              Recensioni dei clienti
            </h2>
            <p
              style={{
                color: "#6b7280",
                marginTop: 16,
                maxWidth: 640,
                margin: "16px auto 0",
                lineHeight: 1.7,
              }}
            >
              Esperienze condivise da clienti che hanno scelto DM Insufflaggio per
              migliorare comfort termico e acustico delle loro case.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 20,
            }}
          >
            {TESTIMONIANZE.map((recensione) => (
              <div
                key={recensione.nome}
                style={{
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: 10,
                  padding: "24px 22px",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.03)",
                }}
              >
                <div style={{ color: BRAND.color, fontSize: "1rem", marginBottom: 10 }}>
                  ★★★★★
                </div>
                <p style={{ color: "#374151", lineHeight: 1.75, fontSize: "0.95rem" }}>
                  "{recensione.testo}"
                </p>
                <div
                  style={{
                    marginTop: 14,
                    color: "#111827",
                    fontWeight: 700,
                    fontSize: "0.92rem",
                  }}
                >
                  {recensione.nome}
                </div>
                <div style={{ color: "#9ca3af", fontSize: "0.8rem", marginTop: 4 }}>
                  Recensione Facebook
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="cta-section" style={{ padding: "80px 24px" }}>
        <div
          style={{
            maxWidth: 700,
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <h2
            className="font-display"
            style={{
              fontSize: "2.8rem",
              fontWeight: 700,
              color: "white",
              marginBottom: 16,
              lineHeight: 1.2,
            }}
          >
            La tua casa merita un isolamento migliore
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "1.1rem",
              lineHeight: 1.7,
              marginBottom: 36,
            }}
          >
            Richiedi oggi il sopralluogo gratuito. In pochi minuti ti diciamo se
            l'insufflaggio è la soluzione giusta per il tuo edificio — senza impegno.
          </p>
          <div
            style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}
          >
            <a
              href={BRAND.phoneHref}
              style={{
                background: "white",
                color: BRAND.color,
                padding: "16px 36px",
                borderRadius: 4,
                fontWeight: 700,
                fontSize: "1.05rem",
                textDecoration: "none",
                transition: "transform 0.15s",
              }}
            >
              📞 {BRAND.phone}
            </a>
            <a
              href={`mailto:${BRAND.email}`}
              style={{
                background: "transparent",
                color: "white",
                border: "2px solid rgba(255,255,255,0.7)",
                padding: "14px 32px",
                borderRadius: 4,
                fontWeight: 600,
                fontSize: "1.05rem",
                textDecoration: "none",
              }}
            >
              Scrivi una email
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" style={{ padding: "96px 24px", background: "#fafaf9" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="section-label">Domande frequenti</span>
            <div className="green-line" style={{ margin: "0 auto 20px" }} />
            <h2
              className="font-display"
              style={{ fontSize: "2.4rem", fontWeight: 700, lineHeight: 1.2 }}
            >
              Hai domande?
            </h2>
          </div>

          <div>
            {FAQ.map((item, i) => (
              <div key={i} className="faq-item">
                <button
                  type="button"
                  className="faq-btn"
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                >
                  <span>{item.q}</span>
                  <span
                    style={{
                      color: BRAND.color,
                      fontSize: "1.3rem",
                      flexShrink: 0,
                      transition: "transform 0.2s",
                      transform: faqOpen === i ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </span>
                </button>
                <div
                  className="faq-answer"
                  style={{
                    maxHeight: faqOpen === i ? "300px" : "0px",
                    opacity: faqOpen === i ? 1 : 0,
                    paddingBottom: faqOpen === i ? 20 : 0,
                  }}
                >
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTATTI ── */}
      <section id="contatti" style={{ padding: "96px 24px", background: "white" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="section-label">Contattaci</span>
            <div className="green-line" style={{ margin: "0 auto 20px" }} />
            <h2
              className="font-display"
              style={{ fontSize: "2.4rem", fontWeight: 700, lineHeight: 1.2 }}
            >
              Richiedi il tuo sopralluogo gratuito
            </h2>
            <p
              style={{
                color: "#6b7280",
                marginTop: 16,
                maxWidth: 480,
                margin: "16px auto 0",
                lineHeight: 1.7,
              }}
            >
              Scrivici o chiamaci direttamente. Ti risponderemo entro poche ore e
              organizzeremo il sopralluogo gratuito nella tua zona.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 24,
              marginBottom: 56,
            }}
          >
            {[
              {
                icon: "📞",
                label: "Telefono",
                value: BRAND.phone,
                href: BRAND.phoneHref,
                sub: "Disponibile anche WhatsApp",
              },
              {
                icon: "📧",
                label: "Email",
                value: BRAND.email,
                href: `mailto:${BRAND.email}`,
                sub: "Risposta entro 24 ore",
              },
              {
                icon: "📸",
                label: "Instagram",
                value: "@" + BRAND.instagram,
                href: BRAND.instagramUrl,
                sub: "Seguici per aggiornamenti",
              },
              {
                icon: "📍",
                label: "Zona operativa",
                value: BRAND.region,
                href: undefined,
                sub: "Case private e condomini",
              },
            ].map((c) => (
              <div
                key={c.label}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: 8,
                  padding: "28px 24px",
                  textAlign: "center",
                  transition: "border-color 0.2s",
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: 12 }}>{c.icon}</div>
                <div
                  style={{ fontWeight: 600, fontSize: "0.85rem", color: "#6b7280", marginBottom: 6 }}
                >
                  {c.label}
                </div>
                {c.href ? (
                  <a
                    href={c.href}
                    style={{
                      fontWeight: 700,
                      color: BRAND.color,
                      fontSize: "0.95rem",
                      textDecoration: "none",
                      wordBreak: "break-all",
                    }}
                  >
                    {c.value}
                  </a>
                ) : (
                  <div style={{ fontWeight: 700, color: "#111827", fontSize: "0.95rem" }}>
                    {c.value}
                  </div>
                )}
                <div style={{ fontSize: "0.8rem", color: "#9ca3af", marginTop: 6 }}>
                  {c.sub}
                </div>
              </div>
            ))}
          </div>

          {/* Form contatto */}
          <div
            style={{
              background: "#f8fdf6",
              border: `1px solid ${BRAND.colorLight}`,
              borderRadius: 12,
              padding: "48px 40px",
              maxWidth: 640,
              margin: "0 auto",
            }}
          >
            <h3
              style={{
                fontWeight: 700,
                fontSize: "1.3rem",
                marginBottom: 24,
                color: "#111827",
              }}
            >
              Invia una richiesta di sopralluogo
            </h3>

            <form
              onSubmit={handleFormSubmit}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              <div className="form-grid">
                <div>
                  <label style={labelStyle}>Nome e cognome *</label>
                  <input
                    name="nome"
                    required
                    placeholder="Mario Rossi"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Telefono *</label>
                  <input
                    name="telefono"
                    type="tel"
                    required
                    placeholder="3XX XXX XXXX"
                    style={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="mario@email.com"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Comune / Zona *</label>
                <input
                  name="comune"
                  required
                  placeholder="Es. Cagliari, Sassari, Oristano..."
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Tipo di edificio</label>
                <select name="tipo" style={inputStyle}>
                  <option value="">Seleziona...</option>
                  <option value="villetta">Villetta / Casa indipendente</option>
                  <option value="appartamento">Appartamento</option>
                  <option value="condominio">Condominio</option>
                  <option value="commerciale">Edificio commerciale</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Messaggio (facoltativo)</label>
                <textarea
                  name="messaggio"
                  rows={3}
                  placeholder="Descrivi brevemente la tua situazione..."
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={formStatus === "submitting"}
                style={{
                  padding: "16px",
                  fontSize: "1rem",
                  opacity: formStatus === "submitting" ? 0.7 : 1,
                  cursor: formStatus === "submitting" ? "wait" : "pointer",
                }}
              >
                {formStatus === "submitting" ? "Invio in corso..." : "Invia richiesta gratuita"}
              </button>

              {formStatus === "success" && (
                <p style={{ color: BRAND.color, fontWeight: 600, textAlign: "center", fontSize: "0.95rem" }}>
                  Richiesta inviata con successo. Ti contatteremo al più presto.
                </p>
              )}

              {formStatus === "error" && (
                <p style={{ color: "#dc2626", fontWeight: 600, textAlign: "center", fontSize: "0.95rem" }}>
                  Invio non riuscito. Riprova o chiamaci direttamente al {BRAND.phone}.
                </p>
              )}

              <p style={{ fontSize: "0.78rem", color: "#9ca3af", textAlign: "center" }}>
                I tuoi dati sono al sicuro e non vengono ceduti a terzi. Consulta la{" "}
                <a
                  href={BRAND.privacyUrl}
                  className="iubenda-noiframe iubenda-embed"
                  title="Privacy Policy "
                  style={{ color: BRAND.color, textDecoration: "underline" }}
                >
                  Privacy Policy
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          background: "#0d1a09",
          color: "rgba(255,255,255,0.65)",
          padding: "48px 24px 32px",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: 48,
            marginBottom: 40,
          }}
        >
          <div>
            <img
              src="/images/logo.png"
              alt="DM Insufflaggio"
              style={{ height: 72, width: "auto", marginBottom: 12, display: "block" }}
            />
            <p style={{ lineHeight: 1.7, fontSize: "0.9rem", maxWidth: 280 }}>
              Isolamento termico e acustico professionale per case e condomini.
              Operiamo in tutta la Sardegna.
            </p>
          </div>

          <div>
            <div
              style={{
                color: "white",
                fontWeight: 700,
                marginBottom: 16,
                fontSize: "0.85rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Contatti
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: "0.9rem" }}>
              <a href={BRAND.phoneHref} style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none" }}>
                📞 {BRAND.phone}
              </a>
              <a
                href={`mailto:${BRAND.email}`}
                style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none", wordBreak: "break-all" }}
              >
                📧 {BRAND.email}
              </a>
              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none" }}
              >
                📸 @{BRAND.instagram}
              </a>
            </div>
          </div>

          <div>
            <div
              style={{
                color: "white",
                fontWeight: 700,
                marginBottom: 16,
                fontSize: "0.85rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Servizi
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: "0.9rem" }}>
              {["Isolamento termico", "Isolamento acustico", "Case private", "Condomini", "Sopralluogo gratuito"].map(
                (s) => (
                  <span key={s}>{s}</span>
                )
              )}
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: 24,
            textAlign: "center",
            fontSize: "0.82rem",
          }}
        >
          <div style={{ marginBottom: 10 }}>
            <a
              href={BRAND.privacyUrl}
              className="iubenda-white iubenda-noiframe iubenda-embed"
              title="Privacy Policy "
              style={{ marginRight: 16 }}
            >
              Privacy Policy
            </a>
            <a
              href={BRAND.cookieUrl}
              className="iubenda-white iubenda-noiframe iubenda-embed"
              title="Cookie Policy "
            >
              Cookie Policy
            </a>
          </div>
          © {new Date().getFullYear()} DM Insufflaggio — P.IVA: 04145350924 — Sardegna, Italia
        </div>
      </footer>

      {/* ── WHATSAPP FLOAT ── */}
      <a
        href="https://wa.me/393420953323?text=Ciao%2C%20vorrei%20informazioni%20sull%27insufflaggio%20e%20richiedere%20un%20sopralluogo%20gratuito."
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          background: "#25D366",
          color: "white",
          width: 56,
          height: 56,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.6rem",
          boxShadow: "0 4px 20px rgba(37,211,102,0.45)",
          zIndex: 200,
          textDecoration: "none",
          transition: "transform 0.2s",
        }}
        title="Scrivici su WhatsApp"
      >
        💬
      </a>
    </main>
  );
}

// ─── STILI FORM ──────────────────────────────────────────────
const labelStyle: React.CSSProperties = {
  display: "block",
  fontWeight: 600,
  fontSize: "0.85rem",
  color: "#374151",
  marginBottom: 6,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  border: "1px solid #d1d5db",
  borderRadius: 6,
  fontSize: "0.95rem",
  outline: "none",
  color: "#111827",
  background: "white",
  fontFamily: "inherit",
};
