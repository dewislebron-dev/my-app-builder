import React, { useState, useEffect } from 'react';

function App() {
  const [code, setCode] = useState(() => localStorage.getItem("vibe_pro_code") || "<h1>My App</h1>");
  
  useEffect(() => {
    localStorage.setItem("vibe_pro_code", code);
  }, [code]);

  // TEMPLATE FUNCTION: This injects complex code for you
  const loadTemplate = (type) => {
    const templates = {
      profile: `<div style="text-align:center; font-family:sans-serif; padding:20px; background:#f4f4f4; border-radius:20px">\n <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" style="width:100px; border-radius:50%">\n <h2>User Profile</h2>\n <p>Software Engineer</p>\n <button style="background:#007aff; color:white; border:none; padding:10px 20px; border-radius:10px">Follow</button>\n</div>`,
      store: `<div style="padding:20px; font-family:sans-serif">\n <h2 style="color:#2ecc71">Summer Sale 🌿</h2>\n <div style="background:#eee; padding:15px; border-radius:10px; margin-bottom:10px">\n  <b>Limited Edition Tee</b>\n  <p>$25.00</p>\n  <button onclick="alert('Added to Cart!')" style="background:black; color:white; padding:10px; width:100%">Buy Now</button>\n </div>\n</div>`
    };
    setCode(templates[type]);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#000' }}>
      <div style={{ padding: '15px', background: '#1a1a1a', color: '#0f0', display: 'flex', justifyContent: 'space-between' }}>
        <b>VIBECODE PRO v2.5</b>
        <button onClick={() => setCode("")} style={{color: 'red', border: 'none', background: 'none'}}>CLEAR</button>
      </div>

      <textarea 
        style={{ flex: 1, width: '100%', padding: '20px', background: '#000', color: '#58d1ff', fontFamily: 'monospace', fontSize: '16px', border: 'none', outline: 'none' }}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck="false"
      />

      {/* QUICK TEMPLATES BAR */}
      <div style={{ padding: '10px', background: '#111', display: 'flex', gap: '10px', overflowX: 'auto' }}>
        <button onClick={() => loadTemplate('profile')} style={{ background: '#333', color: '#fff', border: 'none', padding: '10px', borderRadius: '10px', whiteSpace: 'nowrap' }}>👤 Profile Template</button>
        <button onClick={() => loadTemplate('store')} style={{ background: '#333', color: '#fff', border: 'none', padding: '10px', borderRadius: '10px', whiteSpace: 'nowrap' }}>🛒 Store Template</button>
      </div>

      <div style={{ flex: 1, background: '#fff', margin: '10px', borderRadius: '25px', overflowY: 'auto', border: '6px solid #333' }}>
        <div style={{ padding: '20px' }} dangerouslySetInnerHTML={{ __html: code }} />
      </div>
    </div>
  );
}

export default App;