import { useState, useEffect, useRef } from "react";

const T_BLACK = "#080A0F";
const T_DARK = "#0D1117";
const T_CARD = "#111520";
const T_GOLD = "#C9A84C";
const T_GOLD_LIGHT = "#E8C97A";
const T_BLUE = "#1E3A5F";
const T_CYAN = "#4FC3F7";
const T_GREEN = "#4FFFB0";
const T_MUTED = "#8892A4";
const T_WHITE = "#EEF2FF";

const navLinks = ["About", "Skills", "Experience", "Plan", "Contact"];

const skillMatrix = [
  { name: "C & C++ Embedded Systems", level: 90, tag: "CORE", notes: "HMS OPC UA, SVM devices, industrial automation firmware" },
  { name: "Network Protocols (Low-Latency)", level: 85, tag: "CORE", notes: "OPC UA stack on eWON Edge · HMS integration · 60% latency cut" },
  { name: "AI / ML Workflow Acceleration", level: 92, tag: "ELITE", notes: "TE Connectivity ML/DL · AI-driven pipeline speedup" },
  { name: "RADAR & Signal Processing", level: 88, tag: "ELITE", notes: "DRDO-DAIT · USRP B210 · Doppler · pulse compression" },
  { name: "System Programming", level: 80, tag: "STRONG", notes: "Low-level memory, RTOS, performance tuning" },
  { name: "ML / Deep Neural Networks", level: 85, tag: "STRONG", notes: "DNN edge deploy · quantization · pruning · 3× speedup" },
];

const experiences = [
  {
    role: "RADAR Engineer",
    company: "DRDO – DAIT",
    period: "2023 – Present",
    desc: "Built real-time RADAR signal processing pipelines with DRDO-DAIT using USRP B210 SDR. Implemented C++ GNU Radio blocks for pulse compression, Doppler processing and target tracking. Integrated ML/DL models for target classification achieving sub-millisecond latency end-to-end.",
    icon: "📡",
    tags: ["USRP B210", "GNU Radio", "DRDO-DAIT", "C++", "RADAR DSP", "ML/DL"],
    highlight: true,
    metric: "< 1ms latency",
    color: T_GOLD,
  },
  {
    role: "ML / DL Engineer",
    company: "TE Connectivity",
    period: "2022 – 2023",
    desc: "Deployed ML and deep learning models for sensor data analytics at TE Connectivity. Leveraged AI to dramatically accelerate engineering workflows — cutting manual analysis time by 70%. Applied DNN quantization and pruning for edge inference on constrained hardware.",
    icon: "🤖",
    tags: ["TE Connectivity", "DNN", "TensorFlow", "Edge AI", "Quantization", "Workflow AI"],
    highlight: true,
    metric: "70% faster workflows",
    color: T_GREEN,
  },
  {
    role: "Embedded Systems Engineer",
    company: "HMS Networks · Industrial Automation",
    period: "2020 – 2022",
    desc: "Built OPC UA communication stack with HMS Networks on eWON Edge and SVM devices for industrial automation. Wrote core embedded C firmware for real-time sensor acquisition and machine communication. Reduced network latency by 60% across factory floor deployments.",
    icon: "⚙️",
    tags: ["OPC UA", "HMS Networks", "eWON Edge", "SVM Devices", "Embedded C", "RTOS", "Industrial Automation"],
    highlight: false,
    metric: "60% latency drop",
    color: T_CYAN,
  },
];

const planMonths = [
  {
    month: "Month 1", title: "Analyze & Baseline", color: T_CYAN, icon: "🔍",
    tasks: [
      "Audit Temple's CBF sensor pipeline: data flow, latency points, signal integrity",
      "Profile embedded firmware, ML inference and BLE communication stack",
      "Map USRP B210 / DRDO signal processing expertise to Temple sensor architecture",
      "Identify AI acceleration opportunities in the data processing workflow",
    ],
  },
  {
    month: "Month 2", title: "Optimize & Implement", color: T_GOLD, icon: "⚡",
    tasks: [
      "Refactor embedded C/C++ firmware using HMS/SVM-grade industrial patterns",
      "Apply AI workflow acceleration — automate signal analysis, reduce manual bottlenecks by 60%+",
      "Optimize BLE protocol stack using OPC UA low-latency engineering principles",
      "Deploy lightweight DNN models on-device for real-time CBF biomarker inference",
    ],
  },
  {
    month: "Month 3", title: "Validate & Enhance", color: T_GREEN, icon: "🚀",
    tasks: [
      "Build real-time dashboards: CBF latency, throughput, ML inference efficiency",
      "Apply TE Connectivity-grade DNN quantization and pruning for edge speedup",
      "Iterative testing with athlete workflow — dogfooding as a Team Maharashtra footballer",
      "Ship measurable gains: sub-ms latency, 3× DNN speed, 70%+ workflow AI gains",
    ],
  },
];

const whyPoints = [
  {
    icon: "📡",
    title: "DRDO-DAIT RADAR → CBF Sensor",
    body: "Sub-millisecond RADAR pipelines built with DRDO-DAIT directly mirror Temple's CBF signal acquisition architecture. I've solved this exact class of real-time sensing problem before.",
  },
  {
    icon: "⚙️",
    title: "HMS OPC UA → BLE Wearable Stack",
    body: "Industrial-grade low-latency protocol engineering with HMS and SVM devices is precisely the discipline Temple's wearable communication stack demands.",
  },
  {
    icon: "🤖",
    title: "AI Wizard — Workflow at 10×",
    body: "At TE Connectivity, I used AI to cut engineering workflows by 70%. I bring that same AI-first mindset to Temple — accelerating everything from signal processing to product iteration.",
  },
  {
    icon: "🏆",
    title: "The Athlete Who Reads the Data",
    body: "Team Maharashtra. 15 trophies. 2 comebacks. I'm not just building for elite athletes — I am one. I know what CBF data matters on the pitch and what's noise.",
  },
];

// Radar chart
function RadarChart() {
  const skills = [
    { label: "C/C++", val: 0.90 },
    { label: "Network", val: 0.85 },
    { label: "AI/ML", val: 0.92 },
    { label: "RADAR", val: 0.88 },
    { label: "SysProg", val: 0.80 },
    { label: "DNN", val: 0.85 },
  ];
  const cx = 120, cy = 120, r = 88;
  const angleStep = (2 * Math.PI) / skills.length;
  const getCoord = (i, ratio) => ({
    x: cx + ratio * r * Math.sin(i * angleStep),
    y: cy - ratio * r * Math.cos(i * angleStep),
  });
  const gridLevels = [0.25, 0.5, 0.75, 1];
  const skillPoints = skills.map((s, i) => getCoord(i, s.val));
  const polygon = skillPoints.map(p => `${p.x},${p.y}`).join(" ");
  return (
    <svg width="240" height="240" viewBox="0 0 240 240">
      {gridLevels.map((lvl, li) => {
        const pts = skills.map((_, i) => getCoord(i, lvl));
        return <polygon key={li} points={pts.map(p => `${p.x},${p.y}`).join(" ")} fill="none" stroke={`rgba(201,168,76,${0.05 + li * 0.04})`} strokeWidth="1" />;
      })}
      {skills.map((_, i) => {
        const outer = getCoord(i, 1);
        return <line key={i} x1={cx} y1={cy} x2={outer.x} y2={outer.y} stroke="rgba(201,168,76,0.09)" strokeWidth="1" />;
      })}
      <polygon points={polygon} fill="rgba(201,168,76,0.1)" stroke={T_GOLD} strokeWidth="1.5" />
      {skillPoints.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="3.5" fill={T_GOLD} />)}
      {skills.map((s, i) => {
        const lp = getCoord(i, 1.24);
        return <text key={i} x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle" fill={T_MUTED} fontSize="9" fontFamily="'Courier Prime', monospace" letterSpacing="0.5">{s.label}</text>;
      })}
    </svg>
  );
}

function BrainWave({ color = T_GOLD }) {
  return (
    <svg width="100%" height="38" viewBox="0 0 800 38" preserveAspectRatio="none" style={{ opacity: 0.5 }}>
      <polyline points="0,19 40,19 55,6 70,32 85,19 120,19 140,2 160,36 175,19 210,19 228,9 246,29 260,19 295,19 308,12 321,26 334,19 365,19 382,3 399,35 416,19 448,19 463,11 478,27 490,19 525,19 540,6 555,32 568,19 600,19 616,8 632,30 645,19 680,19 696,14 712,24 724,19 760,19 775,4 790,34 800,19"
        fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function SkillBar({ name, level, index, tag, notes }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef(null);
  const tagColors = { CORE: T_GOLD, ELITE: T_GREEN, STRONG: T_CYAN, GROWING: T_MUTED };
  const tagColor = tagColors[tag] || T_MUTED;
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAnimated(true); }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ marginBottom: 16, padding: "13px 16px", background: "rgba(201,168,76,0.03)", border: "1px solid rgba(201,168,76,0.08)", borderRadius: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 13, color: T_WHITE }}>{name}</span>
          <span style={{ fontSize: 8, fontWeight: 700, color: tagColor, border: `1px solid ${tagColor}40`, borderRadius: 2, padding: "2px 6px", letterSpacing: 1.5, fontFamily: "'Courier Prime', monospace" }}>{tag}</span>
        </div>
        <span style={{ color: T_GOLD, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 13 }}>{level / 10}/10</span>
      </div>
      <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 2, height: 3, overflow: "hidden", marginBottom: 5 }}>
        <div style={{ height: "100%", borderRadius: 2, background: `linear-gradient(90deg,${tagColor}80,${tagColor})`, width: animated ? `${level}%` : "0%", transition: `width 1.3s cubic-bezier(0.4,0,0.2,1) ${index * 0.1}s`, boxShadow: `0 0 8px ${tagColor}50` }} />
      </div>
      <div style={{ fontSize: 11, color: T_MUTED, fontFamily: "'Courier Prime', monospace", letterSpacing: 0.3 }}>{notes}</div>
    </div>
  );
}

function PlanCard({ data, index }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div style={{ border: `1px solid ${open ? data.color + "40" : "rgba(255,255,255,0.06)"}`, borderRadius: 12, overflow: "hidden", transition: "border-color 0.3s", background: T_CARD }}>
      <div onClick={() => setOpen(!open)} style={{ padding: "18px 22px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" }}>
        {open && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,${data.color},transparent)` }} />}
        <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
          <div style={{ width: 38, height: 38, borderRadius: 8, background: `${data.color}12`, border: `1px solid ${data.color}28`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{data.icon}</div>
          <div>
            <div style={{ fontSize: 9, fontFamily: "'Courier Prime', monospace", color: data.color, letterSpacing: 3, marginBottom: 2 }}>{data.month.toUpperCase()}</div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15, color: T_WHITE }}>{data.title}</div>
          </div>
        </div>
        <span style={{ color: data.color, fontSize: 14, transition: "transform 0.3s", display: "block", transform: open ? "rotate(90deg)" : "rotate(0deg)" }}>→</span>
      </div>
      {open && (
        <div style={{ padding: "0 22px 18px", borderTop: `1px solid rgba(255,255,255,0.04)` }}>
          {data.tasks.map((task, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 11, padding: "8px 0", borderBottom: i < data.tasks.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
              <span style={{ color: data.color, fontSize: 9, marginTop: 4, flexShrink: 0 }}>◆</span>
              <span style={{ color: T_MUTED, fontSize: 13, lineHeight: 1.65 }}>{task}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// AI wizard orb animation
function AIOrb() {
  return (
    <div style={{ position: "relative", width: 64, height: 64, margin: "0 auto 16px" }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: `conic-gradient(${T_GOLD}, ${T_CYAN}, ${T_GREEN}, ${T_GOLD})`, animation: "spin 4s linear infinite", opacity: 0.7 }} />
      <div style={{ position: "absolute", inset: 3, borderRadius: "50%", background: T_CARD, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>🤖</div>
      <style>{`@keyframes spin { from{transform:rotate(0deg);}to{transform:rotate(360deg);} }`}</style>
    </div>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [hoveredExp, setHoveredExp] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const onMove = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase().replace(/ /g, "-"));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: T_BLACK, color: T_WHITE, overflowX: "hidden" }}>
      <div style={{ position: "fixed", top: cursorPos.y - 10, left: cursorPos.x - 10, width: 20, height: 20, borderRadius: "50%", border: `1.5px solid ${T_GOLD}`, pointerEvents: "none", zIndex: 9999, transition: "top 0.06s, left 0.06s", opacity: 0.7 }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500;600&family=Courier+Prime:wght@400;700&display=swap');
        html{scroll-behavior:smooth;} *{box-sizing:border-box;margin:0;padding:0;}
        ::selection{background:${T_GOLD}40;color:${T_GOLD_LIGHT};}
        .nav-link{cursor:pointer;transition:color 0.2s;} .nav-link:hover{color:${T_GOLD} !important;}
        .card-hover{transition:transform 0.3s,box-shadow 0.3s,border-color 0.3s;}
        .card-hover:hover{transform:translateY(-4px);box-shadow:0 20px 60px rgba(201,168,76,0.1) !important;border-color:${T_GOLD}50 !important;}
        .btn-gold{transition:all 0.3s;cursor:pointer;}
        .btn-gold:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(201,168,76,0.35) !important;}
        @keyframes floatY{0%,100%{transform:translateY(0);}50%{transform:translateY(-11px);}}
        @keyframes fadeSlideUp{from{opacity:0;transform:translateY(26px);}to{opacity:1;transform:translateY(0);}}
        @keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.2;}}
        @keyframes glow{0%,100%{box-shadow:0 0 10px ${T_GOLD}40;}50%{box-shadow:0 0 22px ${T_GOLD}80;}}
        @keyframes shimmer{0%{background-position:-200% center;}100%{background-position:200% center;}}
        @keyframes aiPulse{0%,100%{opacity:0.6;transform:scale(1);}50%{opacity:1;transform:scale(1.04);}}
        .float{animation:floatY 5s ease-in-out infinite;}
        .fade-up{animation:fadeSlideUp 0.8s ease forwards;}
        .fade-up-2{animation:fadeSlideUp 0.8s 0.15s ease forwards;opacity:0;}
        .fade-up-3{animation:fadeSlideUp 0.8s 0.30s ease forwards;opacity:0;}
        .fade-up-4{animation:fadeSlideUp 0.8s 0.45s ease forwards;opacity:0;}
        .glow-pulse{animation:glow 3s ease-in-out infinite;}
        .gold-shimmer{
          background:linear-gradient(90deg,${T_GOLD} 0%,${T_GOLD_LIGHT} 50%,${T_GOLD} 100%);
          background-size:200% auto;
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;
          background-clip:text;animation:shimmer 3s linear infinite;
        }
        .ai-badge{animation:aiPulse 2.5s ease-in-out infinite;}
        body::before{
          content:'';position:fixed;top:0;left:0;width:100%;height:100%;
          background-image:linear-gradient(rgba(201,168,76,0.025) 1px,transparent 1px),
            linear-gradient(90deg,rgba(201,168,76,0.025) 1px,transparent 1px);
          background-size:60px 60px;pointer-events:none;z-index:0;
        }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ position: "fixed", top: 0, width: "100%", zIndex: 1000, background: scrolled ? "rgba(8,10,15,0.94)" : "transparent", backdropFilter: scrolled ? "blur(16px)" : "none", borderBottom: scrolled ? `1px solid rgba(201,168,76,0.12)` : "none", transition: "all 0.3s", padding: "15px 56px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
          <div className="glow-pulse" style={{ width: 29, height: 29, borderRadius: "50%", background: `radial-gradient(circle,${T_GOLD}50 0%,transparent 70%)`, border: `1px solid ${T_GOLD}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: T_GOLD }}>◉</div>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16, color: T_GOLD, letterSpacing: 2.5, textTransform: "uppercase" }}>Temple</span>
        </div>
        <div style={{ display: "flex", gap: 28 }}>
          {navLinks.map(link => (
            <span key={link} className="nav-link" onClick={() => scrollTo(link)} style={{ fontWeight: 500, fontSize: 12, color: T_MUTED, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "'Space Grotesk', sans-serif" }}>{link}</span>
          ))}
        </div>
        <button className="btn-gold" onClick={() => scrollTo("Contact")} style={{ background: "transparent", color: T_GOLD, border: `1px solid ${T_GOLD}`, borderRadius: 4, padding: "8px 20px", fontWeight: 600, fontSize: 12, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: 1.5, textTransform: "uppercase", cursor: "pointer" }}>
          Join Mission →
        </button>
      </nav>

      {/* ── HERO ── */}
      <section id="about" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 56px 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "20%", left: "50%", width: 700, height: 700, borderRadius: "50%", background: `radial-gradient(circle,rgba(201,168,76,0.05) 0%,transparent 60%)`, zIndex: 0, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 110, right: 60, width: 240, height: 240, border: `1px solid rgba(201,168,76,0.06)`, borderRadius: "50%", zIndex: 0 }} />
        <div style={{ position: "absolute", top: 155, right: 105, width: 155, height: 155, border: `1px solid rgba(201,168,76,0.04)`, borderRadius: "50%", zIndex: 0 }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 76, alignItems: "center", position: "relative", zIndex: 1, width: "100%" }}>
          <div>
            <div className="fade-up" style={{ display: "inline-flex", alignItems: "center", gap: 8, border: `1px solid rgba(201,168,76,0.3)`, borderRadius: 2, padding: "7px 15px", marginBottom: 26, fontSize: 10, color: T_GOLD, fontFamily: "'Courier Prime', monospace", letterSpacing: 2 }}>
              <span style={{ animation: "pulse 2s infinite", color: T_CYAN }}>●</span> APPLYING TO TEMPLE · CONTINUE RESEARCH
            </div>
            <h1 className="fade-up-2" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 54, lineHeight: 1.06, color: T_WHITE, marginBottom: 22, letterSpacing: -1 }}>
              RADAR. Embedded.<br />
              <span className="gold-shimmer">AI-Accelerated</span><br />
              Engineering. 🤖
            </h1>

            {/* Credential pills */}
            <div className="fade-up-3" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
              {[
                { label: "DRDO-DAIT · RADAR", color: T_GOLD },
                { label: "HMS · OPC UA · SVM", color: T_CYAN },
                { label: "TE Connectivity · ML/DL", color: T_GREEN },
                { label: "AI Wizard 🤖", color: T_GOLD_LIGHT, pulse: true },
              ].map(({ label, color, pulse }) => (
                <span key={label} className={pulse ? "ai-badge" : ""} style={{ background: `${color}12`, border: `1px solid ${color}35`, borderRadius: 4, padding: "5px 12px", fontSize: 11, color: color, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, letterSpacing: 0.5 }}>{label}</span>
              ))}
            </div>

            <p className="fade-up-3" style={{ fontSize: 15, lineHeight: 1.82, color: T_MUTED, maxWidth: 470, marginBottom: 16 }}>
              Embedded C engineer, DRDO RADAR builder, TE Connectivity AI/ML deployer. I build systems that run fast, think smart, and ship results — then bring that same obsession to Temple's CBF pipeline.
            </p>
            <div className="fade-up-3" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "rgba(201,168,76,0.05)", border: "1px solid rgba(201,168,76,0.12)", borderRadius: 5, padding: "7px 13px", marginBottom: 32, fontSize: 11, color: T_MUTED }}>
              <span>⚽</span>
              <span>Team Maharashtra · 15 trophies · 2 injury comebacks · 15.75% body fat</span>
            </div>
            <div className="fade-up-4" style={{ display: "flex", gap: 13 }}>
              <button className="btn-gold" onClick={() => scrollTo("Skills")} style={{ background: T_GOLD, color: T_BLACK, border: "none", borderRadius: 4, padding: "12px 26px", fontWeight: 700, fontSize: 13, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: 1, textTransform: "uppercase", cursor: "pointer" }}>
                Skill Matrix →
              </button>
              <button className="btn-gold" onClick={() => scrollTo("Experience")} style={{ background: "transparent", color: T_WHITE, border: `1px solid rgba(255,255,255,0.12)`, borderRadius: 4, padding: "12px 26px", fontWeight: 600, fontSize: 13, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: 1, textTransform: "uppercase", cursor: "pointer" }}>
                My Work
              </button>
            </div>
          </div>

          {/* Biometric card */}
          <div className="float" style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ background: T_CARD, border: `1px solid rgba(201,168,76,0.2)`, borderRadius: 16, padding: 28, maxWidth: 336, width: "100%", boxShadow: "0 40px 80px rgba(0,0,0,0.6)", position: "relative" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <span style={{ fontFamily: "'Courier Prime', monospace", fontSize: 10, color: T_GOLD, letterSpacing: 2 }}>TEMPLE · ENGINEER ID</span>
                <span style={{ fontFamily: "'Courier Prime', monospace", fontSize: 10, color: T_MUTED }}>v0.1.0</span>
              </div>
              <AIOrb />
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 17, textAlign: "center", marginBottom: 2, color: T_WHITE }}> Animesh Subhash Wankhede</h3>
              <p style={{ textAlign: "center", color: T_GOLD, fontWeight: 500, marginBottom: 8, fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "'Space Grotesk', sans-serif" }}>Embedded · RADAR · AI · Product</p>
              <div style={{ margin: "10px 0 12px" }}><BrainWave /></div>

              {/* 4 tech metrics */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 8 }}>
                {[["< 1ms", "RADAR Latency", T_GOLD], ["60%↓", "OPC UA Latency", T_CYAN], ["3×", "DNN Speedup", T_GREEN], ["70%↑", "AI Workflow", T_GOLD_LIGHT]].map(([v, l, c]) => (
                  <div key={l} style={{ textAlign: "center", background: `${c}08`, borderRadius: 6, padding: "8px 4px", border: `1px solid ${c}18` }}>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15, color: c }}>{v}</div>
                    <div style={{ fontSize: 8, color: T_MUTED, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase", marginTop: 2 }}>{l}</div>
                  </div>
                ))}
              </div>
              {/* Org badges */}
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap", justifyContent: "center", marginBottom: 10 }}>
                {["DRDO-DAIT", "HMS Networks", "TE Connectivity"].map(org => (
                  <span key={org} style={{ background: "rgba(201,168,76,0.07)", border: "1px solid rgba(201,168,76,0.18)", borderRadius: 3, padding: "3px 8px", fontSize: 9, color: T_GOLD, fontFamily: "'Courier Prime', monospace" }}>{org}</span>
                ))}
              </div>
              <div style={{ padding: "8px 12px", background: "rgba(79,195,247,0.04)", borderRadius: 7, border: "1px solid rgba(79,195,247,0.14)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <span style={{ animation: "pulse 1.5s infinite", color: T_CYAN, fontSize: 9 }}>●</span>
                  <span style={{ fontSize: 10, fontFamily: "'Courier Prime', monospace", color: T_CYAN }}>CBF MONITORING ACTIVE</span>
                </div>
                <span style={{ fontSize: 10, fontFamily: "'Courier Prime', monospace", color: T_MUTED }}>LIVE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS TICKER */}
      <div style={{ borderTop: `1px solid rgba(201,168,76,0.12)`, borderBottom: `1px solid rgba(201,168,76,0.12)`, padding: "18px 56px", background: "rgba(201,168,76,0.02)" }}>
        <div style={{ display: "flex", gap: 44, justifyContent: "center", flexWrap: "wrap" }}>
          {[["DRDO-DAIT", "RADAR Partner"], ["< 1ms", "Signal Latency"], ["HMS+SVM", "OPC UA Infra"], ["70%↑", "AI Workflow Speed"], ["TE Connect.", "ML/DL Deploy"], ["15 🏆", "Football Trophies"]].map(([n, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, color: T_GOLD }}>{n}</div>
              <div style={{ fontSize: 10, color: T_MUTED, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase", marginTop: 3 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SKILLS ── */}
      <section id="skills" style={{ padding: "90px 56px", background: T_DARK, borderBottom: `1px solid rgba(201,168,76,0.07)` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: 44 }}>
            <span style={{ fontFamily: "'Courier Prime', monospace", fontWeight: 700, fontSize: 11, color: T_GOLD, letterSpacing: 4, textTransform: "uppercase" }}>// Skill Matrix</span>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 40, marginTop: 10, color: T_WHITE, letterSpacing: -1 }}>Engineering Capabilities</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: 52, alignItems: "start" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 22 }}><RadarChart /></div>
              <div style={{ display: "flex", gap: 14, justifyContent: "center", marginBottom: 18 }}>
                {[["ELITE", T_GREEN], ["CORE", T_GOLD], ["STRONG", T_CYAN], ["GROWING", T_MUTED]].map(([tag, color]) => (
                  <div key={tag} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: color, display: "inline-block" }} />
                    <span style={{ fontSize: 10, color: T_MUTED, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>{tag}</span>
                  </div>
                ))}
              </div>
              {/* Tech stack */}
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap", justifyContent: "center" }}>
                {["USRP B210", "GNU Radio", "OPC UA", "HMS Networks", "SVM Devices", "RTOS", "TensorFlow", "BLE 5.0", "DNN Quant.", "C++17", "Python", "Embedded C"].map(tag => (
                  <span key={tag} style={{ background: "rgba(201,168,76,0.07)", border: `1px solid rgba(201,168,76,0.16)`, borderRadius: 3, padding: "3px 9px", fontSize: 10, fontWeight: 600, color: T_GOLD, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: 0.3 }}>{tag}</span>
                ))}
              </div>
            </div>
            <div>{skillMatrix.map((s, i) => <SkillBar key={s.name} {...s} index={i} />)}</div>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" style={{ padding: "90px 56px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: 44 }}>
            <span style={{ fontFamily: "'Courier Prime', monospace", fontWeight: 700, fontSize: 11, color: T_GOLD, letterSpacing: 4, textTransform: "uppercase" }}>// Career Journey</span>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 40, marginTop: 10, color: T_WHITE, letterSpacing: -1 }}>Where I've Built</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
            {experiences.map((exp, i) => (
              <div key={i} onMouseEnter={() => setHoveredExp(i)} onMouseLeave={() => setHoveredExp(null)}
                style={{ background: T_CARD, borderRadius: 12, padding: 26, border: `1px solid ${hoveredExp === i ? exp.color + "50" : exp.highlight ? exp.color + "25" : "rgba(201,168,76,0.1)"}`, position: "relative", overflow: "hidden", transition: "border-color 0.3s, transform 0.3s", transform: hoveredExp === i ? "translateY(-4px)" : "none", cursor: "default" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,${exp.color},transparent)` }} />
                {exp.highlight && <div style={{ position: "absolute", top: 12, right: 12, fontSize: 9, fontFamily: "'Courier Prime', monospace", color: exp.color, border: `1px solid ${exp.color}40`, borderRadius: 2, padding: "2px 7px", letterSpacing: 1.5 }}>FEATURED</div>}
                <div style={{ fontSize: 28, marginBottom: 12 }}>{exp.icon}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontSize: 9, color: T_GOLD, letterSpacing: 3, textTransform: "uppercase", fontFamily: "'Courier Prime', monospace" }}>{exp.period}</span>
                  <span style={{ fontSize: 10, color: exp.color, fontFamily: "'Courier Prime', monospace", background: `${exp.color}10`, border: `1px solid ${exp.color}30`, borderRadius: 3, padding: "2px 7px" }}>{exp.metric}</span>
                </div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 2, color: T_WHITE }}>{exp.role}</h3>
                <div style={{ fontWeight: 600, color: exp.color, marginBottom: 10, fontSize: 12, letterSpacing: 0.5 }}>{exp.company}</div>
                <p style={{ color: "#6B7688", lineHeight: 1.72, fontSize: 13, marginBottom: 14 }}>{exp.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {exp.tags.map(tag => (
                    <span key={tag} style={{ background: `${exp.color}0A`, border: `1px solid ${exp.color}20`, borderRadius: 3, padding: "2px 7px", fontSize: 9, color: exp.color, fontFamily: "'Courier Prime', monospace" }}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Temple technical bridge */}
          <div style={{ marginTop: 28, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 13 }}>
            {[
              { icon: "📡", title: "DRDO RADAR → Temple CBF", body: "Sub-ms RADAR pipelines built with DRDO-DAIT mirror Temple's CBF signal acquisition architecture. Same real-time sensing class, different biological domain.", color: T_GOLD },
              { icon: "⚙️", title: "HMS OPC UA → BLE Wearable", body: "Industrial-grade low-latency stack with HMS Networks and SVM devices is exactly the protocol engineering discipline Temple's wearable comms stack demands.", color: T_CYAN },
              { icon: "🤖", title: "TE AI Workflows → Temple Velocity", body: "70% workflow acceleration at TE Connectivity via AI. I bring that same multiplier to Temple — faster iteration, smarter signal analysis, 10× product velocity.", color: T_GREEN },
            ].map((c, i) => (
              <div key={i} style={{ background: T_CARD, borderRadius: 10, padding: "18px 18px", border: `1px solid ${c.color}18`, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,${c.color}50,transparent)` }} />
                <div style={{ fontSize: 20, marginBottom: 8 }}>{c.icon}</div>
                <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 13, color: T_WHITE, marginBottom: 6 }}>{c.title}</h4>
                <p style={{ fontSize: 12, color: T_MUTED, lineHeight: 1.65 }}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI WIZARD CALLOUT */}
      <div style={{ margin: "0 56px 0", maxWidth: 1200, marginLeft: "auto", marginRight: "auto", padding: "0 56px 28px" }}>
        <div style={{ background: `linear-gradient(135deg, rgba(79,195,247,0.06), rgba(201,168,76,0.06), rgba(79,255,176,0.06))`, border: `1px solid rgba(201,168,76,0.2)`, borderRadius: 14, padding: "32px 40px", display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 28, alignItems: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,${T_GOLD},${T_CYAN},${T_GREEN},transparent)` }} />
          <div style={{ fontSize: 48 }}>🤖</div>
          <div>
            <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 10, color: T_GOLD, letterSpacing: 3, marginBottom: 6, textTransform: "uppercase" }}>// AI Wizard Mode</div>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 20, color: T_WHITE, marginBottom: 8 }}>I Don't Just Use AI — I Weaponize It</h3>
            <p style={{ color: T_MUTED, fontSize: 14, lineHeight: 1.7, maxWidth: 620 }}>
              At TE Connectivity I deployed ML/DL pipelines that cut engineering workflow time by 70%. I use AI to accelerate signal processing, automate diagnostics, generate firmware optimizations, and compress months of iteration into weeks. At Temple, that means faster CBF algorithm development, smarter sensor calibration, and product shipped at a pace the competition can't match.
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 42, color: T_GREEN, lineHeight: 1 }}>10×</div>
            <div style={{ fontSize: 10, color: T_MUTED, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "'Courier Prime', monospace", marginTop: 4 }}>Velocity</div>
          </div>
        </div>
      </div>

      {/* ── 3-MONTH PLAN ── */}
      <section id="plan" style={{ padding: "90px 56px", background: T_DARK, borderTop: `1px solid rgba(201,168,76,0.07)`, borderBottom: `1px solid rgba(201,168,76,0.07)` }}>
        <div style={{ maxWidth: 840, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span style={{ fontFamily: "'Courier Prime', monospace", fontWeight: 700, fontSize: 11, color: T_GOLD, letterSpacing: 4, textTransform: "uppercase" }}>// 90-Day Roadmap</span>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 40, marginTop: 10, color: T_WHITE, letterSpacing: -1 }}>3-Month Action Plan</h2>
            <p style={{ color: T_MUTED, fontSize: 14, marginTop: 8 }}>Concrete performance roadmap for Temple's embedded + AI/ML + network stack.</p>
          </div>
          <div style={{ display: "flex", gap: 0, marginBottom: 20, borderRadius: 8, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
            {planMonths.map((m, i) => (
              <div key={i} style={{ flex: 1, padding: "11px 14px", background: `${m.color}08`, borderRight: i < 2 ? "1px solid rgba(255,255,255,0.04)" : "none", textAlign: "center" }}>
                <div style={{ fontSize: 9, fontFamily: "'Courier Prime', monospace", color: m.color, letterSpacing: 2, marginBottom: 2 }}>{m.month.toUpperCase()}</div>
                <div style={{ fontSize: 12, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: T_WHITE }}>{m.title}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {planMonths.map((m, i) => <PlanCard key={i} data={m} index={i} />)}
          </div>
          <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {[{ label: "Latency Reduction", value: "~60%", icon: "⚡", color: T_CYAN }, { label: "ML Inference Speed", value: "3×", icon: "🧠", color: T_GOLD }, { label: "AI Workflow Gain", value: "70%+", icon: "🤖", color: T_GREEN }].map(m => (
              <div key={m.label} style={{ background: T_CARD, borderRadius: 9, padding: "14px 12px", border: `1px solid ${m.color}20`, textAlign: "center", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,${m.color}60,transparent)` }} />
                <div style={{ fontSize: 18, marginBottom: 5 }}>{m.icon}</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 22, color: m.color, marginBottom: 2 }}>{m.value}</div>
                <div style={{ fontSize: 10, color: T_MUTED, letterSpacing: 1, textTransform: "uppercase", fontFamily: "'Courier Prime', monospace" }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY TEMPLE + CONTACT ── */}
      <section id="contact" style={{ padding: "90px 56px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span style={{ fontFamily: "'Courier Prime', monospace", fontWeight: 700, fontSize: 11, color: T_GOLD, letterSpacing: 4, textTransform: "uppercase" }}>// Why Temple · Why Me</span>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 40, marginTop: 10, color: T_WHITE, letterSpacing: -1 }}>The Full Stack Case</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 13, marginBottom: 24 }}>
            {whyPoints.map((p, i) => (
              <div key={i} className="card-hover" style={{ background: T_CARD, borderRadius: 12, padding: 26, border: `1px solid rgba(201,168,76,0.1)`, display: "flex", gap: 15, alignItems: "flex-start", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,${T_GOLD}50,transparent)` }} />
                <div style={{ fontSize: 28, lineHeight: 1, flexShrink: 0 }}>{p.icon}</div>
                <div>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 14, marginBottom: 6, color: T_WHITE }}>{p.title}</h3>
                  <p style={{ color: T_MUTED, lineHeight: 1.72, fontSize: 13 }}>{p.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quote */}
          <div style={{ background: T_CARD, border: `1px solid rgba(201,168,76,0.18)`, borderRadius: 13, padding: "34px 40px", textAlign: "center", position: "relative", overflow: "hidden", marginBottom: 48 }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,${T_GOLD},transparent)` }} />
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 18, maxWidth: 720, margin: "0 auto", lineHeight: 1.68, color: T_WHITE }}>
              "I've built RADAR with DRDO. I've cut latency with HMS. I've shipped ML at TE Connectivity. And I've used AI to make all of it move faster. Temple needs exactly this stack — and I've spent years building it without knowing that was the destination."
            </p>
            <div style={{ marginTop: 14, fontWeight: 500, color: T_MUTED, fontSize: 11, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>— Me, every time someone asks about my career goals</div>
          </div>

          {/* Contact */}
          <div style={{ textAlign: "center" }}>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 34, marginBottom: 12, color: T_WHITE, letterSpacing: -0.5 }}>Let's Build the Future of Brain Health 🧬</h3>
            <p style={{ color: T_MUTED, fontSize: 15, lineHeight: 1.8, marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>
              30 minutes. I'll show you exactly how DRDO RADAR + HMS OPC UA + TE AI maps to Temple's sensor pipeline.
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              {[{ icon: "📡", label: "Email ID", href: "mailto:aswankhede312@gmail.com" }, { icon: "🔗", label: "LinkedIn", href: "#https://www.linkedin.com/in/animesh-wankhede-a5371a203/?originalSubdomain=in" }, { icon: "📋", label: "Resume", href: "#https://drive.google.com/file/d/1zcq72Zq-2LR69cWBFfTiRcMmkYZM_zbv/view?usp=sharing" }].map(({ icon, label, href }) => (
                <a key={label} href={href} className="btn-gold" style={{ background: "transparent", color: T_GOLD, border: `1px solid ${T_GOLD}`, borderRadius: 4, padding: "10px 20px", fontWeight: 600, fontSize: 12, textDecoration: "none", display: "flex", alignItems: "center", gap: 8, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: 1.5, textTransform: "uppercase" }}>
                  <span>{icon}</span>{label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#050709", padding: "18px 56px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid rgba(201,168,76,0.08)` }}>
        <span style={{ color: "#3A4255", fontSize: 11, fontFamily: "'Courier Prime', monospace", letterSpacing: 1 }}>Built for Temple · Continue Research · 2026</span>
        <span style={{ color: T_GOLD, fontFamily: "'Courier Prime', monospace", fontWeight: 700, fontSize: 11, letterSpacing: 2, textTransform: "uppercase" }}>◉ Measure. Understand. Extend.</span>
      </footer>
    </div>
  );
}