import { useState, useEffect, useRef } from "react";

const SECTIONS = [
  {
    id: "land",
    title: "The Land",
    icon: "⛰️",
    subtitle: "Where the ground remembers",
    description: "Maps, regions, climates, cities, villages, ruins, sacred places. What does the ground feel like under your feet?",
    prompts: [
      { id: "regions", label: "Regions & Realms", placeholder: "Name your lands — the kingdoms, the wilds, the forgotten places. What makes each one distinct?" },
      { id: "climate", label: "Climate & Seasons", placeholder: "Is there eternal winter in the north? Do the seasons follow the moon? Does the weather have a mind of its own?" },
      { id: "cities", label: "Cities & Settlements", placeholder: "Where do people gather? Describe the great cities, the hidden villages, the ruins no one dares enter..." },
      { id: "sacred", label: "Sacred & Cursed Places", placeholder: "Where do people go to pray? Where do they refuse to go? What places hold power — or memory?" },
      { id: "natural", label: "Rivers, Mountains & Wilds", placeholder: "The bones of the world — the rivers that divide nations, the mountains that touch the heavens, the forests that whisper..." },
      { id: "senses", label: "The Senses of This Land", placeholder: "Close your eyes. What does this world smell like? What's the first sound you hear? What does the air taste like?" },
    ],
  },
  {
    id: "history",
    title: "The History",
    icon: "📜",
    subtitle: "What the elders whisper",
    description: "The big events that shaped everything. Wars, discoveries, fallen kingdoms, ancient promises. The stuff people whisper about in taverns.",
    prompts: [
      { id: "ages", label: "Ages & Eras", placeholder: "How do the people of this world divide their history? What do they call the great ages?" },
      { id: "wars", label: "Wars & Conflicts", placeholder: "What battles changed the shape of the world? Who won? Who lost? What was the cost?" },
      { id: "turning", label: "Turning Points", placeholder: "The moments where everything shifted — a discovery, a betrayal, a birth, a death, a door that opened..." },
      { id: "fallen", label: "Fallen Kingdoms & Lost Things", placeholder: "What once existed that is now gone? What do people mourn? What do they search for?" },
      { id: "secrets", label: "Hidden History", placeholder: "What really happened? What does the official story leave out? Who knows the truth?" },
      { id: "legends", label: "Legends & Tavern Tales", placeholder: "What stories do ordinary people tell each other? What do children hear at bedtime? What do drunks argue about?" },
    ],
  },
  {
    id: "magic",
    title: "The Magic",
    icon: "✨",
    subtitle: "What flows beneath the surface",
    description: "How it works, what it costs, who can use it, what the limits are. Every great magic system has a price.",
    prompts: [
      { id: "source", label: "Source & Nature", placeholder: "Where does magic come from? Is it in the blood? The land? The stars? Is it alive?" },
      { id: "rules", label: "Rules & Limits", placeholder: "What can magic do? What can't it do? What happens when someone pushes too far?" },
      { id: "cost", label: "The Price", placeholder: "Every great magic system has a cost. What does using magic take from you? Energy? Memory? Years of your life?" },
      { id: "users", label: "Who Wields It", placeholder: "Who can use magic? Is it rare or common? Inherited or learned? Are there ranks or levels?" },
      { id: "forbidden", label: "Forbidden Arts", placeholder: "What magic is banned? What happens to those who use it? Why is it forbidden — and is the reason true?" },
      { id: "artifacts", label: "Magical Objects & Places", placeholder: "What objects hold power? Are there enchanted weapons, ancient relics, cursed jewellery? Where are they now?" },
    ],
  },
  {
    id: "power",
    title: "The Power",
    icon: "👑",
    subtitle: "Who holds the throne — and who wants it",
    description: "Governments, factions, alliances, rivalries. Who holds power and who's trying to take it?",
    prompts: [
      { id: "rulers", label: "Rulers & Governments", placeholder: "Who rules? How did they get power? Is it a monarchy, a council, an empire, something stranger?" },
      { id: "factions", label: "Factions & Alliances", placeholder: "What groups compete for influence? Secret societies, noble houses, merchant guilds, rebel movements?" },
      { id: "laws", label: "Laws & Justice", placeholder: "How is justice served? Is it fair? Who makes the laws and who enforces them?" },
      { id: "conflict", label: "Current Tensions", placeholder: "What's about to break? Where are the cracks in the system? Who is angry, and why?" },
      { id: "economy", label: "Trade & Economy", placeholder: "What do people trade? What's valuable? Is there currency? Who controls the wealth?" },
      { id: "shadows", label: "The Shadow Powers", placeholder: "Who really pulls the strings? What happens behind closed doors? Who has power that no one talks about?" },
    ],
  },
  {
    id: "people",
    title: "The People",
    icon: "🏮",
    subtitle: "The heartbeat of the world",
    description: "Cultures, traditions, languages, food, clothing, beliefs. What do people celebrate? What do they fear?",
    prompts: [
      { id: "cultures", label: "Cultures & Peoples", placeholder: "Who lives in this world? What makes each culture unique — their values, their way of seeing the world?" },
      { id: "traditions", label: "Traditions & Celebrations", placeholder: "What festivals light up the calendar? What rituals mark birth, death, marriage, coming of age?" },
      { id: "food", label: "Food & Daily Life", placeholder: "What do people eat? What does a market smell like? What does an ordinary day look like?" },
      { id: "clothing", label: "Clothing & Adornment", placeholder: "What do people wear? Does clothing show status, region, profession, belief? What fabrics, what colours?" },
      { id: "language", label: "Language & Communication", placeholder: "How do people speak? Are there multiple languages? Slang? Forbidden words? How do they write?" },
      { id: "fears", label: "Taboos & Fears", placeholder: "What do people in this world fear most? What subjects are never spoken of? What superstitions guide their choices?" },
    ],
  },
  {
    id: "gods",
    title: "The Gods & Myths",
    icon: "🌙",
    subtitle: "What the world believes",
    description: "What do people in this world believe? What stories do THEY tell each other?",
    prompts: [
      { id: "deities", label: "Gods & Spirits", placeholder: "Who or what do people worship? Are the gods real? Distant? Sleeping? Walking among mortals?" },
      { id: "creation", label: "Creation Myths", placeholder: "How do people believe the world began? Is there more than one version of the story?" },
      { id: "afterlife", label: "Death & the Afterlife", placeholder: "What happens when you die? Is there a heaven, a cycle of rebirth, a river to cross, nothing at all?" },
      { id: "prophecy", label: "Prophecies & Omens", placeholder: "Are there prophecies? Who speaks them? Do people believe them? What signs do people watch for?" },
      { id: "temples", label: "Temples & Holy Orders", placeholder: "Where do people go to worship? Who serves the gods? Are there monks, priestesses, wandering sages?" },
      { id: "heresy", label: "Forbidden Beliefs", placeholder: "What beliefs are dangerous to hold? Who were the heretics? What truths did they know?" },
    ],
  },
  {
    id: "connections",
    title: "The Connections",
    icon: "🕸️",
    subtitle: "Where stories cross paths",
    description: "The thread board. Where you track how stories, characters, and events link across your universe.",
    prompts: [
      { id: "characters", label: "Characters Who Cross Over", placeholder: "Which characters might appear in more than one story? A merchant who shows up everywhere? A wandering sage?" },
      { id: "events", label: "Shared Events", placeholder: "What events ripple across multiple stories? A war that everyone experiences differently? A festival?" },
      { id: "places", label: "Shared Places", placeholder: "What locations appear in multiple stories? The same tavern, the same crossroads, the same haunted ruin?" },
      { id: "objects", label: "Objects That Travel", placeholder: "Is there a sword, a letter, a jewel, a curse that passes from one story to another?" },
      { id: "rumours", label: "Rumours & Echoes", placeholder: "What do characters in one story hear about events in another? Rumours, legends, half-truths?" },
      { id: "timeline", label: "The Timeline", placeholder: "How do your stories sit in time? Which happens first? Do any overlap? What's the grand order?" },
    ],
  },
];

const FONTS_LINK = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Quicksand:wght@400;500;600&display=swap";

function WorldBible() {
  const [activeSection, setActiveSection] = useState("land");
  const [entries, setEntries] = useState({});
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedPrompt, setExpandedPrompt] = useState(null);
  const [wordCounts, setWordCounts] = useState({});
  const textareaRefs = useRef({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await window.storage.get("world-bible-entries");
        if (result && result.value) setEntries(JSON.parse(result.value));
      } catch (e) { console.log("Starting fresh"); }
      setLoaded(true);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const timer = setTimeout(async () => {
      try {
        setSaving(true);
        await window.storage.set("world-bible-entries", JSON.stringify(entries));
        setTimeout(() => setSaving(false), 800);
      } catch (e) { setSaving(false); }
    }, 1000);
    return () => clearTimeout(timer);
  }, [entries, loaded]);

  useEffect(() => {
    const counts = {};
    SECTIONS.forEach((s) => {
      let total = 0;
      s.prompts.forEach((p) => { const t = entries[`${s.id}-${p.id}`] || ""; total += t.trim() ? t.trim().split(/\s+/).length : 0; });
      counts[s.id] = total;
    });
    setWordCounts(counts);
  }, [entries]);

  const handleChange = (sid, pid, val) => setEntries((prev) => ({ ...prev, [`${sid}-${pid}`]: val }));

  const getFilledCount = (sid) => {
    const s = SECTIONS.find((x) => x.id === sid);
    return s.prompts.filter((p) => (entries[`${sid}-${p.id}`] || "").trim().length > 0).length;
  };

  const totalFilled = SECTIONS.reduce((a, s) => a + getFilledCount(s.id), 0);
  const totalPrompts = SECTIONS.reduce((a, s) => a + s.prompts.length, 0);
  const totalWords = Object.values(wordCounts).reduce((a, b) => a + b, 0);
  const currentSection = SECTIONS.find((s) => s.id === activeSection);

  const autoResize = (el) => { if (el) { el.style.height = "auto"; el.style.height = el.scrollHeight + "px"; } };

  useEffect(() => { Object.values(textareaRefs.current).forEach(autoResize); }, [activeSection]);

  const handleExport = () => {
    let t = "═══════════════════════════════════════\n         THE WORLD BIBLE\n         A Universe Awaits\n═══════════════════════════════════════\n\n";
    SECTIONS.forEach((s) => {
      t += `\n${"─".repeat(40)}\n${s.icon}  ${s.title.toUpperCase()}\n${s.subtitle}\n${"─".repeat(40)}\n\n`;
      s.prompts.forEach((p) => { const v = entries[`${s.id}-${p.id}`] || ""; t += `▸ ${p.label}\n${v.trim() ? v + "\n\n" : "[Not yet written]\n\n"}`; });
    });
    t += `\n${"═".repeat(40)}\nTotal words: ${totalWords}\nSections filled: ${totalFilled}/${totalPrompts}\n${"═".repeat(40)}\n`;
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([t], { type: "text/plain" })); a.download = "world-bible.txt"; a.click();
  };

  const handleReset = async () => {
    if (window.confirm("Are you sure you want to clear ALL entries? This cannot be undone.")) {
      setEntries({});
      try { await window.storage.delete("world-bible-entries"); } catch (e) {}
    }
  };

  if (!loaded) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(170deg, #f5efe6 0%, #ebe3d7 40%, #f0e8dc 100%)", fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#6b5a4a" }}>
      <link href={FONTS_LINK} rel="stylesheet" />
      <p style={{ fontSize: "1.3rem", fontStyle: "italic", opacity: 0.7 }}>Unrolling the scroll...</p>
    </div>
  );

  const sIdx = SECTIONS.findIndex((s) => s.id === activeSection);
  const prev = sIdx > 0 ? SECTIONS[sIdx - 1] : null;
  const next = sIdx < SECTIONS.length - 1 ? SECTIONS[sIdx + 1] : null;

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(170deg, #f5efe6 0%, #ebe3d7 40%, #f0e8dc 100%)", fontFamily: "'Quicksand', 'Segoe UI', sans-serif", color: "#5a4a3a", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
      <link href={FONTS_LINK} rel="stylesheet" />
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0) rotate(0);opacity:.3} 50%{transform:translateY(-20px) rotate(5deg);opacity:.5} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulseGlow { 0%,100%{box-shadow:0 0 8px rgba(160,120,140,.06)} 50%{box-shadow:0 0 16px rgba(160,120,140,.12)} }
        @keyframes savePulse { 0%{opacity:1} 100%{opacity:0} }
        textarea:focus{outline:none;border-color:rgba(150,120,130,.4)!important;box-shadow:0 0 0 2px rgba(150,120,130,.1),inset 0 1px 3px rgba(0,0,0,.03)!important}
        textarea::placeholder{color:rgba(120,100,85,.38);font-style:italic}
        textarea::-webkit-scrollbar{width:6px} textarea::-webkit-scrollbar-track{background:transparent} textarea::-webkit-scrollbar-thumb{background:rgba(150,130,120,.2);border-radius:3px}
        .nav-btn:hover{background:rgba(150,120,130,.08)!important;transform:translateX(3px)}
        .nav-btn.active{background:rgba(150,120,130,.1)!important;border-left-color:rgba(170,120,140,.5)!important}
        .prompt-card{animation:fadeIn .4s ease forwards}
        .action-btn:hover{background:rgba(150,120,130,.1)!important;transform:translateY(-1px)}
        @media(max-width:768px){.sidebar-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.15);z-index:90}}
      `}</style>

      {[...Array(6)].map((_, i) => (
        <div key={i} style={{ position:"fixed", width:12+i*4+"px", height:12+i*4+"px", borderRadius:"50% 0 50% 0",
          background: i%2===0 ? "radial-gradient(circle,rgba(200,150,160,.25),rgba(200,150,160,.05))" : "radial-gradient(circle,rgba(150,180,170,.2),rgba(150,180,170,.04))",
          top:(10+i*14)+"%", left:(5+i*16)+"%", animation:`float ${4+i*1.5}s ease-in-out infinite`, animationDelay:`${i*.8}s`, pointerEvents:"none", zIndex:0 }} />
      ))}

      <header style={{ padding:"24px 28px 20px", borderBottom:"1px solid rgba(160,130,140,.12)", position:"relative", zIndex:10, display:"flex", alignItems:"center", gap:"16px", flexShrink:0 }}>
        <button onClick={()=>setSidebarOpen(!sidebarOpen)} style={{ display:window.innerWidth<=768?"block":"none", background:"none", border:"1px solid rgba(150,130,120,.25)", color:"#5a4a3a", fontSize:"1.3rem", padding:"6px 10px", borderRadius:"8px", cursor:"pointer" }}>☰</button>
        <div style={{ flex:1 }}>
          <h1 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(1.5rem,4vw,2.2rem)", fontWeight:500, color:"#4a3a2e", margin:0, letterSpacing:".05em" }}>
            <span style={{ opacity:.4, marginRight:"10px" }}>文</span>The World Bible
          </h1>
          <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:".95rem", fontStyle:"italic", color:"rgba(100,80,65,.45)", margin:"4px 0 0" }}>A universe awaits your words</p>
        </div>
        <div style={{ textAlign:"right", fontSize:".75rem", color:"rgba(110,90,75,.55)", position:"relative" }}>
          <div>{totalWords.toLocaleString()} words</div>
          <div>{totalFilled}/{totalPrompts} entries</div>
          {saving && <div style={{ position:"absolute", top:-18, right:0, fontSize:".65rem", color:"rgba(90,140,100,.8)", animation:"savePulse .8s ease forwards" }}>saved ✓</div>}
        </div>
      </header>

      <div style={{ display:"flex", flex:1, overflow:"hidden", position:"relative", zIndex:5 }}>
        {sidebarOpen && window.innerWidth<=768 && <div className="sidebar-overlay" onClick={()=>setSidebarOpen(false)} />}

        <nav style={{ width:"240px", minWidth:"240px", borderRight:"1px solid rgba(160,130,140,.08)", padding:"16px 12px", display:"flex", flexDirection:"column", gap:"4px", overflowY:"auto",
          ...(window.innerWidth<=768?{ position:"fixed", top:0, left:sidebarOpen?0:"-260px", bottom:0, background:"#f0e8dc", zIndex:95, transition:"left .3s ease", paddingTop:"80px" }:{}) }}>
          {SECTIONS.map((section) => {
            const filled = getFilledCount(section.id);
            const total = section.prompts.length;
            const isActive = activeSection === section.id;
            return (
              <button key={section.id} className={`nav-btn ${isActive?"active":""}`}
                onClick={()=>{setActiveSection(section.id);setSidebarOpen(false);setExpandedPrompt(null)}}
                style={{ display:"flex", alignItems:"center", gap:"10px", padding:"10px 14px", border:"none", borderLeft:"2px solid transparent", borderRadius:"0 8px 8px 0", background:"transparent", color:isActive?"#4a3a2e":"rgba(100,85,70,.55)", cursor:"pointer", transition:"all .25s ease", textAlign:"left", fontFamily:"'Quicksand',sans-serif", fontSize:".85rem", fontWeight:isActive?600:400, width:"100%" }}>
                <span style={{ fontSize:"1.1rem", width:"24px", textAlign:"center" }}>{section.icon}</span>
                <span style={{ flex:1 }}>{section.title}</span>
                <span style={{ fontSize:".65rem", padding:"2px 6px", borderRadius:"10px",
                  background: filled===total?"rgba(90,150,110,.12)":filled>0?"rgba(180,140,80,.1)":"rgba(140,130,120,.06)",
                  color: filled===total?"rgba(60,120,80,.85)":filled>0?"rgba(150,110,50,.75)":"rgba(130,115,100,.4)" }}>{filled}/{total}</span>
              </button>
            );
          })}
          <div style={{ flex:1 }} />
          <div style={{ display:"flex", flexDirection:"column", gap:"6px", padding:"12px 4px 4px", borderTop:"1px solid rgba(160,130,140,.08)", marginTop:"8px" }}>
            <button className="action-btn" onClick={handleExport} style={{ padding:"8px 14px", border:"1px solid rgba(150,130,120,.2)", borderRadius:"8px", background:"rgba(150,130,120,.05)", color:"rgba(90,75,60,.65)", cursor:"pointer", fontFamily:"'Quicksand',sans-serif", fontSize:".78rem", transition:"all .2s ease" }}>📄 Export as Text</button>
            <button className="action-btn" onClick={handleReset} style={{ padding:"8px 14px", border:"1px solid rgba(180,110,110,.18)", borderRadius:"8px", background:"transparent", color:"rgba(160,100,100,.5)", cursor:"pointer", fontFamily:"'Quicksand',sans-serif", fontSize:".72rem", transition:"all .2s ease" }}>Reset All</button>
          </div>
        </nav>

        <main style={{ flex:1, overflowY:"auto", padding:"clamp(20px,4vw,40px)" }}>
          <div style={{ marginBottom:"32px", animation:"fadeIn .5s ease" }}>
            <div style={{ display:"flex", alignItems:"baseline", gap:"12px", marginBottom:"6px" }}>
              <span style={{ fontSize:"2rem" }}>{currentSection.icon}</span>
              <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(1.6rem,3.5vw,2rem)", fontWeight:500, color:"#4a3a2e", margin:0 }}>{currentSection.title}</h2>
            </div>
            <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"1.05rem", fontStyle:"italic", color:"rgba(100,80,65,.45)", margin:"0 0 8px" }}>{currentSection.subtitle}</p>
            <p style={{ fontSize:".85rem", color:"rgba(100,85,70,.6)", margin:0, lineHeight:1.6, maxWidth:"640px" }}>{currentSection.description}</p>
            {wordCounts[activeSection]>0 && <div style={{ marginTop:"12px", fontSize:".72rem", color:"rgba(110,95,80,.45)" }}>{wordCounts[activeSection].toLocaleString()} words in this section</div>}
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:"16px", maxWidth:"720px" }}>
            {currentSection.prompts.map((prompt, index) => {
              const key = `${currentSection.id}-${prompt.id}`;
              const value = entries[key] || "";
              const hasContent = value.trim().length > 0;
              const isExpanded = expandedPrompt === key || hasContent;
              return (
                <div key={key} className="prompt-card" style={{ animationDelay:`${index*.07}s`, opacity:0, background:"rgba(255,252,248,.7)", border:`1px solid ${hasContent?"rgba(160,130,140,.18)":"rgba(185,175,165,.25)"}`, borderRadius:"12px", overflow:"hidden", transition:"border-color .3s ease", ...(hasContent?{animation:`fadeIn .4s ease ${index*.07}s forwards, pulseGlow 4s ease-in-out infinite`}:{}) }}>
                  <button onClick={()=>setExpandedPrompt(expandedPrompt===key?null:key)} style={{ width:"100%", display:"flex", alignItems:"center", gap:"10px", padding:"14px 18px", border:"none", background:"transparent", cursor:"pointer", color:hasContent?"#4a3a2e":"rgba(100,85,70,.5)", fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"1.05rem", fontWeight:500, textAlign:"left" }}>
                    <span style={{ width:"8px", height:"8px", borderRadius:"50%", background:hasContent?"rgba(90,150,110,.6)":"rgba(180,170,160,.3)", flexShrink:0, transition:"background .3s ease" }} />
                    <span style={{ flex:1 }}>{prompt.label}</span>
                    <span style={{ fontSize:".7rem", color:"rgba(120,100,85,.3)", transform:isExpanded?"rotate(180deg)":"rotate(0)", transition:"transform .25s ease" }}>▼</span>
                  </button>
                  {isExpanded && (
                    <div style={{ padding:"0 18px 16px" }}>
                      <textarea ref={(el)=>{textareaRefs.current[key]=el;if(el)autoResize(el)}} value={value}
                        onChange={(e)=>{handleChange(currentSection.id,prompt.id,e.target.value);autoResize(e.target)}}
                        placeholder={prompt.placeholder}
                        style={{ width:"100%", minHeight:"100px", padding:"14px 16px", border:"1px solid rgba(180,170,160,.3)", borderRadius:"8px", background:"rgba(255,255,252,.6)", color:"#4a3a2e", fontFamily:"'Quicksand',sans-serif", fontSize:".88rem", lineHeight:1.7, resize:"none", overflow:"hidden", transition:"border-color .3s ease,box-shadow .3s ease", boxSizing:"border-box" }} />
                      {hasContent && <div style={{ marginTop:"6px", fontSize:".65rem", color:"rgba(110,95,80,.4)", textAlign:"right" }}>{value.trim().split(/\s+/).length} words</div>}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ display:"flex", justifyContent:"space-between", marginTop:"40px", padding:"20px 0", borderTop:"1px solid rgba(160,130,140,.06)", maxWidth:"720px" }}>
            {prev ? <button className="action-btn" onClick={()=>{setActiveSection(prev.id);setExpandedPrompt(null)}} style={{ padding:"8px 16px", border:"1px solid rgba(150,130,120,.18)", borderRadius:"8px", background:"transparent", color:"rgba(100,85,70,.5)", cursor:"pointer", fontFamily:"'Quicksand',sans-serif", fontSize:".8rem", transition:"all .2s ease" }}>← {prev.icon} {prev.title}</button> : <div />}
            {next ? <button className="action-btn" onClick={()=>{setActiveSection(next.id);setExpandedPrompt(null)}} style={{ padding:"8px 16px", border:"1px solid rgba(150,130,120,.18)", borderRadius:"8px", background:"transparent", color:"rgba(100,85,70,.5)", cursor:"pointer", fontFamily:"'Quicksand',sans-serif", fontSize:".8rem", transition:"all .2s ease" }}>{next.icon} {next.title} →</button> : <div />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default WorldBible;
