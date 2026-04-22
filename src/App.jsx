import { useEffect, useState } from "react";

const SCENARIOS = [
  // Level 1 - Basic
  {
    level: 1,
    id: 1,
    emoji: "🍎",
    title: "Apple Vendor",
    story: "You bought a crate of apples for ₹500. A customer offers ₹650 for it.",
    cp: 500,
    sp: 650,
    question: "What is your Profit %?",
    options: ["20%", "25%", "30%", "15%"],
    answer: "30%",
    formula: "Profit% = (SP - CP) / CP × 100 = (650-500)/500 × 100 = 30%",
    hint: "Profit% is always calculated on Cost Price!"
  },
  {
    level: 1,
    id: 2,
    emoji: "👟",
    title: "Shoe Shop",
    story: "You bought sneakers for ₹1200 and sold them for ₹1020 due to low demand.",
    cp: 1200,
    sp: 1020,
    question: "What is your Loss %?",
    options: ["10%", "12%", "15%", "18%"],
    answer: "15%",
    formula: "Loss% = (CP - SP) / CP × 100 = (1200-1020)/1200 × 100 = 15%",
    hint: "Loss% = (CP - SP) / CP × 100"
  },
  {
    level: 1,
    id: 3,
    emoji: "📱",
    title: "Mobile Store",
    story: "You want 20% profit on a phone you bought for ₹8000. What should you charge?",
    cp: 8000,
    sp: null,
    question: "What should be the Selling Price?",
    options: ["₹9200", "₹9600", "₹9000", "₹8800"],
    answer: "₹9600",
    formula: "SP = CP × (100 + P%) / 100 = 8000 × 120/100 = ₹9600",
    hint: "SP = CP × (100 + Profit%) / 100"
  },
  // Level 2 - Intermediate
  {
    level: 2,
    id: 4,
    emoji: "👗",
    title: "Clothing Store",
    story: "You marked a dress at ₹2000 (40% above CP) and offered 20% discount. CP = ₹1428.57",
    cp: 1428.57,
    sp: 1600,
    question: "What is your Net Profit %?",
    options: ["20%", "12%", "8%", "15%"],
    answer: "12%",
    formula: "Net% = markup - discount - (markup×discount)/100 = 40-20-(40×20)/100 = 12%",
    hint: "Use: Net% = x - y - (x×y)/100 where x=markup%, y=discount%"
  },
  {
    level: 2,
    id: 5,
    emoji: "💻",
    title: "Electronics Deal",
    story: "A laptop has two successive discounts: 20% then 10%. Original price ₹50,000.",
    cp: 50000,
    sp: 36000,
    question: "What is the final Selling Price?",
    options: ["₹36,000", "₹35,000", "₹37,500", "₹38,000"],
    answer: "₹36,000",
    formula: "SP = 50000 × 0.80 × 0.90 = 50000 × 0.72 = ₹36,000",
    hint: "Apply discounts one after another, not together!"
  },
  {
    level: 2,
    id: 6,
    emoji: "🏏",
    title: "Sports Shop",
    story: "A cricket bat sells for ₹990 at 10% profit. What was the Cost Price?",
    cp: null,
    sp: 990,
    question: "What is the Cost Price?",
    options: ["₹900", "₹891", "₹850", "₹920"],
    answer: "₹900",
    formula: "CP = SP × 100/(100+P%) = 990 × 100/110 = ₹900",
    hint: "CP = SP × 100 / (100 + Profit%)"
  },
  // Level 3 - Advanced
  {
    level: 3,
    id: 7,
    emoji: "⚖️",
    title: "Dishonest Dealer!",
    story: "A cunning shopkeeper uses a 800g weight instead of 1kg while selling rice.",
    cp: 800,
    sp: 1000,
    question: "What is the shopkeeper's Profit %?",
    options: ["20%", "25%", "22.5%", "18%"],
    answer: "25%",
    formula: "Profit% = (1000-800)/800 × 100 = 200/800 × 100 = 25%",
    hint: "Profit% = (True weight - False weight) / False weight × 100"
  },
  {
    level: 3,
    id: 8,
    emoji: "🎭",
    title: "The Classic Trap!",
    story: "You sell two TVs each for ₹9900. One at 10% profit, another at 10% loss.",
    cp: 20000,
    sp: 19800,
    question: "What is your Net result?",
    options: ["No profit no loss", "1% Loss", "1% Profit", "2% Loss"],
    answer: "1% Loss",
    formula: "Net Loss% = (common%)² / 100 = 10²/100 = 1%. Loss = ₹200",
    hint: "When same SP, same %, one profit one loss → ALWAYS a net loss!"
  },
  {
    level: 3,
    id: 9,
    emoji: "🏪",
    title: "Final Boss: Full Shop",
    story: "You bought 100 items at ₹50 each. Sold 80 at ₹70 each, 20 at ₹30 each.",
    cp: 5000,
    sp: 6200,
    question: "What is the overall Profit %?",
    options: ["24%", "20%", "28%", "22%"],
    answer: "24%",
    formula: "Total CP=5000, Total SP=80×70+20×30=5600+600=6200. Profit%=1200/5000×100=24%",
    hint: "Calculate total CP and total SP separately, then find overall %"
  }
];

const LEVEL_NAMES = { 1: "Beginner 🌱", 2: "Trader 📊", 3: "Business Guru 🏆" };
const LEVEL_COLORS = { 1: "#22c55e", 2: "#f59e0b", 3: "#ef4444" };

export default function ProfitLossGame() {
  const [screen, setScreen] = useState("intro"); // intro, game, result
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [money, setMoney] = useState(10000);
  const [answers, setAnswers] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [streak, setStreak] = useState(0);
  const [animClass, setAnimClass] = useState("");
  const [gitHubProfile, setGitHubProfile] = useState(null);

  useEffect(() => {
    // Fetch GitHub profile data
    fetch("https://api.github.com/users/NiksheyYadav")
      .then(res => res.json())
      .then(data => setGitHubProfile(data))
      .catch(err => console.log("Failed to fetch GitHub profile"));
  }, []);

  const scenario = SCENARIOS[currentIdx];
  const isCorrect = selected === scenario?.answer;

  function handleSelect(opt) {
    if (confirmed) return;
    setSelected(opt);
  }

  function handleConfirm() {
    if (!selected || confirmed) return;
    const correct = selected === scenario.answer;
    setConfirmed(true);
    setAnimClass(correct ? "bounce" : "shake");
    setTimeout(() => setAnimClass(""), 600);
    if (correct) {
      setScore(s => s + 1);
      setMoney(m => m + 1000 + streak * 200);
      setStreak(s => s + 1);
    } else {
      setMoney(m => Math.max(0, m - 500));
      setStreak(0);
    }
    setAnswers(prev => [...prev, { ...scenario, chosen: selected, correct }]);
  }

  function handleNext() {
    if (currentIdx + 1 >= SCENARIOS.length) {
      setScreen("result");
    } else {
      setCurrentIdx(i => i + 1);
      setSelected(null);
      setConfirmed(false);
      setShowHint(false);
    }
  }

  function restart() {
    setScreen("intro");
    setCurrentIdx(0);
    setSelected(null);
    setConfirmed(false);
    setScore(0);
    setMoney(10000);
    setAnswers([]);
    setShowHint(false);
    setStreak(0);
  }

  const levelScenarios = {
    1: SCENARIOS.filter(s => s.level === 1),
    2: SCENARIOS.filter(s => s.level === 2),
    3: SCENARIOS.filter(s => s.level === 3),
  };

  const progressPct = ((currentIdx) / SCENARIOS.length) * 100;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      padding: "16px",
      color: "#fff",
      position: "relative"
    }}>
      <style>{`
        @keyframes bounce { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }
        @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.7} }
        .bounce { animation: bounce 0.5s ease; }
        .shake { animation: shake 0.5s ease; }
        .fadeIn { animation: fadeIn 0.4s ease forwards; }
        .option-btn { transition: all 0.2s ease; }
        .option-btn:hover { transform: translateY(-2px); }
      `}</style>

      {/* ─── HEADER ─── */}
      <div style={{
        position: "absolute",
        top: 16,
        left: 16,
        right: 16,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 1000
      }}>
        {/* GitHub Profile Picture */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {gitHubProfile?.avatar_url && (
            <img 
              src={gitHubProfile.avatar_url} 
              alt="GitHub Profile" 
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                border: "2px solid #a78bfa",
                cursor: "pointer"
              }}
              onClick={() => window.open(`https://github.com/${gitHubProfile.login}`, "_blank")}
              title={gitHubProfile.name || gitHubProfile.login}
            />
          )}
          <div style={{ fontSize: 12, color: "#94a3b8" }}>
            <div style={{ fontWeight: 600 }}>{gitHubProfile?.name || "NiksheyYadav"}</div>
            <div style={{ fontSize: 11 }}>@{gitHubProfile?.login || "NiksheyYadav"}</div>
          </div>
        </div>

        {/* Social Links */}
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/nikshey-yadav-51143224a/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: 8,
              background: "rgba(0, 119, 181, 0.15)",
              border: "1px solid rgba(0, 119, 181, 0.3)",
              cursor: "pointer",
              transition: "all 0.2s ease",
              color: "#0077b5"
            }}
            onMouseOver={(e) => {
              e.target.style.background = "rgba(0, 119, 181, 0.25)";
              e.target.style.transform = "scale(1.1)";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "rgba(0, 119, 181, 0.15)";
              e.target.style.transform = "scale(1)";
            }}
            title="LinkedIn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.807 0-9.726h3.554v1.375c.427-.659 1.191-1.595 2.897-1.595 2.117 0 3.704 1.385 3.704 4.362v5.584zM5.337 8.855c-1.144 0-1.915-.758-1.915-1.704 0-.962.77-1.704 1.956-1.704 1.187 0 1.915.742 1.933 1.704 0 .946-.746 1.704-1.974 1.704zm1.6 11.597H3.738V9.726h3.199v10.726zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/NiksheyYadav"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: 8,
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              cursor: "pointer",
              transition: "all 0.2s ease",
              color: "#e2e8f0"
            }}
            onMouseOver={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.1)";
              e.target.style.transform = "scale(1.1)";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.05)";
              e.target.style.transform = "scale(1)";
            }}
            title="GitHub"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* ─── INTRO SCREEN ─── */}
      {screen === "intro" && (
        <div style={{ maxWidth: 580, margin: "0 auto", textAlign: "center", paddingTop: 100 }} className="fadeIn">
          <div style={{ fontSize: 64, marginBottom: 8 }}>🏪</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, margin: "0 0 8px", background: "linear-gradient(90deg,#ffd700,#ff6b35)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            ShopKeeper Pro
          </h1>
          <p style={{ color: "#a78bfa", fontSize: 14, marginBottom: 24 }}>Profit & Loss | Quantitative Aptitude</p>
          <p style={{ color: "#cbd5e1", fontSize: 15, lineHeight: 1.6, marginBottom: 24 }}>
            You are a shopkeeper 🛒 with <strong style={{color:"#ffd700"}}>₹10,000</strong> starting capital.<br/>
            Make smart buy-sell decisions across 9 scenarios.<br/>
            Every correct answer <span style={{color:"#22c55e"}}>+₹1000</span>, wrong answer <span style={{color:"#ef4444"}}>-₹500</span>!
          </p>

          {/* Level Preview */}
          <div style={{ display: "flex", gap: 12, marginBottom: 28, justifyContent: "center", flexWrap: "wrap" }}>
            {[1,2,3].map(l => (
              <div key={l} style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${LEVEL_COLORS[l]}40`, borderRadius: 12, padding: "12px 20px", minWidth: 130 }}>
                <div style={{ color: LEVEL_COLORS[l], fontWeight: 700, fontSize: 13 }}>{LEVEL_NAMES[l]}</div>
                <div style={{ color: "#94a3b8", fontSize: 12, marginTop: 4 }}>
                  {l === 1 && "Basic P&L, finding CP/SP"}
                  {l === 2 && "Markup, Discount, Successive"}
                  {l === 3 && "Traps, False Weights, Complex"}
                </div>
                <div style={{ color: "#64748b", fontSize: 11, marginTop: 4 }}>{levelScenarios[l].length} scenarios</div>
              </div>
            ))}
          </div>

          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: 16, marginBottom: 24, textAlign: "left" }}>
            <div style={{ fontWeight: 700, marginBottom: 8, color: "#ffd700" }}>📐 Key Formulas</div>
            {[
              "Profit% = (SP - CP) / CP × 100",
              "SP = CP × (100 + P%) / 100",
              "CP = SP × 100 / (100 + P%)",
              "Net% (markup+discount) = x - y - xy/100"
            ].map((f,i) => (
              <div key={i} style={{ fontSize: 12, color: "#94a3b8", padding: "3px 0", borderBottom: i < 3 ? "1px solid #ffffff10" : "none" }}>
                {f}
              </div>
            ))}
          </div>

          <button onClick={() => setScreen("game")} style={{
            background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
            color: "#fff", border: "none", borderRadius: 12, padding: "14px 48px",
            fontSize: 18, fontWeight: 700, cursor: "pointer", width: "100%",
            boxShadow: "0 4px 24px #7c3aed60"
          }}>
            Start Game 🚀
          </button>
          <p style={{ color: "#475569", fontSize: 11, marginTop: 12 }}>
            Nikshay Yadav | 231302221 | B.Tech CSE(DS) | SGT University
          </p>
        </div>
      )}

      {/* ─── GAME SCREEN ─── */}
      {screen === "game" && scenario && (
        <div style={{ maxWidth: 600, margin: "0 auto" }} className={animClass}>
          {/* Header Stats */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ background: "rgba(34,197,94,0.15)", border: "1px solid #22c55e40", borderRadius: 8, padding: "6px 12px", fontSize: 13 }}>
                💰 ₹{money.toLocaleString()}
              </div>
              <div style={{ background: "rgba(99,102,241,0.15)", border: "1px solid #6366f140", borderRadius: 8, padding: "6px 12px", fontSize: 13 }}>
                ✅ {score}/{SCENARIOS.length}
              </div>
              {streak >= 2 && (
                <div style={{ background: "rgba(245,158,11,0.15)", border: "1px solid #f59e0b40", borderRadius: 8, padding: "6px 12px", fontSize: 13 }}>
                  🔥 {streak}x
                </div>
              )}
            </div>
            <div style={{ background: `${LEVEL_COLORS[scenario.level]}20`, border: `1px solid ${LEVEL_COLORS[scenario.level]}40`, borderRadius: 8, padding: "6px 12px", fontSize: 12, color: LEVEL_COLORS[scenario.level] }}>
              {LEVEL_NAMES[scenario.level]}
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 99, height: 6, marginBottom: 16 }}>
            <div style={{
              background: `linear-gradient(90deg, ${LEVEL_COLORS[scenario.level]}, #a78bfa)`,
              height: "100%", borderRadius: 99, width: `${progressPct}%`,
              transition: "width 0.4s ease"
            }} />
          </div>

          {/* Scenario Card */}
          <div style={{
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 16, padding: 20, marginBottom: 16
          }} className="fadeIn">
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <span style={{ fontSize: 36 }}>{scenario.emoji}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 18 }}>{scenario.title}</div>
                <div style={{ color: "#94a3b8", fontSize: 12 }}>Scenario {currentIdx + 1} of {SCENARIOS.length}</div>
              </div>
            </div>
            <div style={{
              background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)",
              borderRadius: 10, padding: 14, fontSize: 15, lineHeight: 1.6, marginBottom: 12
            }}>
              {scenario.story}
            </div>

            {/* CP / SP display */}
            <div style={{ display: "flex", gap: 10, marginBottom: 4 }}>
              {scenario.cp && <div style={{ flex: 1, background: "rgba(239,68,68,0.1)", border: "1px solid #ef444430", borderRadius: 8, padding: 10, textAlign: "center" }}>
                <div style={{ fontSize: 11, color: "#94a3b8" }}>Cost Price</div>
                <div style={{ fontWeight: 700, color: "#ef4444" }}>₹{scenario.cp.toLocaleString()}</div>
              </div>}
              {scenario.sp && <div style={{ flex: 1, background: "rgba(34,197,94,0.1)", border: "1px solid #22c55e30", borderRadius: 8, padding: 10, textAlign: "center" }}>
                <div style={{ fontSize: 11, color: "#94a3b8" }}>Selling Price</div>
                <div style={{ fontWeight: 700, color: "#22c55e" }}>₹{scenario.sp.toLocaleString()}</div>
              </div>}
            </div>

            <div style={{ fontWeight: 600, fontSize: 15, color: "#ffd700", marginTop: 12 }}>
              ❓ {scenario.question}
            </div>
          </div>

          {/* Options */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
            {scenario.options.map(opt => {
              let bg = "rgba(255,255,255,0.05)";
              let border2 = "1px solid rgba(255,255,255,0.1)";
              let color = "#e2e8f0";
              if (selected === opt && !confirmed) { bg = "rgba(99,102,241,0.2)"; border2 = "1px solid #6366f1"; color = "#a78bfa"; }
              if (confirmed && opt === scenario.answer) { bg = "rgba(34,197,94,0.15)"; border2 = "1px solid #22c55e"; color = "#22c55e"; }
              if (confirmed && selected === opt && opt !== scenario.answer) { bg = "rgba(239,68,68,0.15)"; border2 = "1px solid #ef4444"; color = "#ef4444"; }
              return (
                <button key={opt} className="option-btn" onClick={() => handleSelect(opt)} style={{
                  background: bg, border: border2, borderRadius: 10, padding: "12px 16px",
                  color, fontSize: 15, fontWeight: 600, cursor: confirmed ? "default" : "pointer",
                  textAlign: "center"
                }}>
                  {opt}
                  {confirmed && opt === scenario.answer && " ✓"}
                  {confirmed && selected === opt && opt !== scenario.answer && " ✗"}
                </button>
              );
            })}
          </div>

          {/* Hint */}
          {!confirmed && (
            <button onClick={() => setShowHint(h => !h)} style={{
              background: "transparent", border: "1px solid rgba(245,158,11,0.3)",
              color: "#f59e0b", borderRadius: 8, padding: "6px 16px", fontSize: 12,
              cursor: "pointer", marginBottom: 10, width: "100%"
            }}>
              {showHint ? "Hide Hint 🙈" : "Show Hint 💡 (-no penalty)"}
            </button>
          )}
          {showHint && !confirmed && (
            <div style={{ background: "rgba(245,158,11,0.1)", border: "1px solid #f59e0b30", borderRadius: 10, padding: 12, fontSize: 13, color: "#fcd34d", marginBottom: 10 }}>
              💡 {scenario.hint}
            </div>
          )}

          {/* Formula reveal */}
          {confirmed && (
            <div className="fadeIn" style={{
              background: isCorrect ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.08)",
              border: `1px solid ${isCorrect ? "#22c55e" : "#ef4444"}30`,
              borderRadius: 12, padding: 14, marginBottom: 14
            }}>
              <div style={{ fontWeight: 700, marginBottom: 6, color: isCorrect ? "#22c55e" : "#ef4444" }}>
                {isCorrect ? "🎉 Correct! +" + (1000 + (streak-1) * 200) + " coins" : "❌ Oops! -₹500"}
              </div>
              <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.6 }}>
                <span style={{ color: "#ffd700" }}>📐 Formula: </span>{scenario.formula}
              </div>
            </div>
          )}

          {/* Buttons */}
          <div style={{ display: "flex", gap: 10 }}>
            {!confirmed && (
              <button onClick={handleConfirm} disabled={!selected} style={{
                flex: 1, background: selected ? "linear-gradient(135deg,#7c3aed,#4f46e5)" : "rgba(255,255,255,0.05)",
                color: selected ? "#fff" : "#64748b", border: "none", borderRadius: 10,
                padding: "13px", fontSize: 15, fontWeight: 700, cursor: selected ? "pointer" : "not-allowed"
              }}>
                Confirm Answer ✅
              </button>
            )}
            {confirmed && (
              <button onClick={handleNext} style={{
                flex: 1, background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
                color: "#fff", border: "none", borderRadius: 10,
                padding: "13px", fontSize: 15, fontWeight: 700, cursor: "pointer"
              }}>
                {currentIdx + 1 >= SCENARIOS.length ? "See Results 🏆" : "Next Scenario →"}
              </button>
            )}
          </div>
        </div>
      )}

      {/* ─── RESULT SCREEN ─── */}
      {screen === "result" && (
        <div style={{ maxWidth: 580, margin: "0 auto", textAlign: "center" }} className="fadeIn">
          <div style={{ fontSize: 72, marginBottom: 8 }}>
            {score >= 8 ? "🏆" : score >= 6 ? "🥈" : score >= 4 ? "🥉" : "📚"}
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 4px", background: "linear-gradient(90deg,#ffd700,#ff6b35)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {score >= 8 ? "Business Guru!" : score >= 6 ? "Smart Trader!" : score >= 4 ? "Getting There!" : "Keep Practicing!"}
          </h2>
          <p style={{ color: "#94a3b8", marginBottom: 20 }}>
            You scored <strong style={{color:"#ffd700"}}>{score}/{SCENARIOS.length}</strong> and earned <strong style={{color:"#22c55e"}}>₹{money.toLocaleString()}</strong>
          </p>

          {/* Score breakdown */}
          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 14, padding: 16, marginBottom: 20, textAlign: "left" }}>
            <div style={{ fontWeight: 700, marginBottom: 12, color: "#a78bfa" }}>📋 Your Answers</div>
            {answers.map((a, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < answers.length-1 ? "1px solid #ffffff10" : "none" }}>
                <div>
                  <span style={{ marginRight: 8 }}>{a.emoji}</span>
                  <span style={{ fontSize: 13, color: "#e2e8f0" }}>{a.title}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 12, color: "#64748b" }}>{a.chosen}</span>
                  <span style={{ color: a.correct ? "#22c55e" : "#ef4444", fontSize: 16 }}>{a.correct ? "✓" : "✗"}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Key Formulas Recap */}
          <div style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 14, padding: 16, marginBottom: 20, textAlign: "left" }}>
            <div style={{ fontWeight: 700, marginBottom: 10, color: "#ffd700" }}>📐 Formula Cheatsheet</div>
            {[
              ["Profit%", "(SP-CP)/CP × 100"],
              ["Loss%", "(CP-SP)/CP × 100"],
              ["SP (profit)", "CP × (100+P%)/100"],
              ["CP (from SP)", "SP × 100/(100+P%)"],
              ["Markup+Discount", "x - y - xy/100"],
              ["Same SP trap", "Loss% = (common%)²/100"],
              ["False weight", "(True-False)/False × 100"],
            ].map(([k,v],i) => (
              <div key={i} style={{ display:"flex", justifyContent:"space-between", fontSize:12, padding:"4px 0", borderBottom: i<6?"1px solid #ffffff08":"none" }}>
                <span style={{color:"#94a3b8"}}>{k}</span>
                <span style={{color:"#a78bfa", fontFamily:"monospace"}}>{v}</span>
              </div>
            ))}
          </div>

          <button onClick={restart} style={{
            background: "linear-gradient(135deg,#7c3aed,#4f46e5)", color:"#fff",
            border:"none", borderRadius:12, padding:"14px 48px",
            fontSize:16, fontWeight:700, cursor:"pointer", width:"100%",
            boxShadow:"0 4px 24px #7c3aed60", marginBottom:12
          }}>
            Play Again 🔄
          </button>
          <p style={{ color:"#475569", fontSize:11 }}>
            Nikshay Yadav | 231302221 | B.Tech CSE(DS) | SGT University, Gurugram
          </p>
        </div>
      )}
    </div>
  );
}
