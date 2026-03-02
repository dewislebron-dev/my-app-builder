import React, { useState, useEffect } from 'react';

function App() {
  // THE ENGINE: This stores the actual logic of the app you are building on your phone
  const [code, setCode] = useState(() => {
    return localStorage.getItem("vibecode_engine_v1") || 
    `<h1>My New App</h1>\n<p>Start coding...</p>`;
  });

  const [savedApps, setSavedApps] = useState(() => {
    const saved = localStorage.getItem("vibecode_gallery");
    return saved ? JSON.parse(saved) : [];
  });

  // AUTO-SAVE SYSTEM: This is the "hard save" that was missing before
  useEffect(() => {
    localStorage.setItem("vibecode_engine_v1", code);
  }, [code]);

  const saveToGallery = () => {
    const name = prompt("Project Name?");
    if (name) {
      const newGallery = [...savedApps, { name, code, id: Date.now() }];
      setSavedApps(newGallery);
      localStorage.setItem("vibecode_gallery", JSON.stringify(newGallery));
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#000', color: '#fff' }}>
      {/* TOOLBAR */}
      <div style={{ padding: '10px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #333' }}>
        <span style={{fontWeight: '800'}}>VIBECODE IDE</span>
        <div>
          <button onClick={saveToGallery} style={{ marginRight: '10px', background: '#34c759', color: '#fff', border: 'none', borderRadius: '5px', padding: '5px' }}>SAVE PROJ</button>
          <button onClick={() => setCode("")} style={{ background: '#ff3b30', color: '#fff', border: 'none', borderRadius: '5px', padding: '5px' }}>CLEAR</button>
        </div>
      </div>

      {/* CODE EDITOR */}
      <textarea 
        style={{ flex: 1.5, width: '100%', padding: '15px', background: '#1a1a1a', color: '#58d1ff', fontFamily: 'monospace', fontSize: '16px', border: 'none', outline: 'none', resize: 'none' }}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck="false"
      />

      {/* LIVE APP RUNTIME */}
      <div style={{ flex: 1, backgroundColor: '#fff', color: '#000', margin: '5px', borderRadius: '20px', overflowY: 'auto', border: '4px solid #333' }}>
        <div style={{ padding: '5px', fontSize: '10px', background: '#ddd', textAlign: 'center' }}>RUNNING APP</div>
        <div dangerouslySetInnerHTML={{ __html: code }} />
      </div>

      {/* PROJECT GALLERY */}
      <div style={{ height: '60px', overflowX: 'auto', display: 'flex', gap: '10px', padding: '10px', background: '#111' }}>
        {savedApps.map(proj => (
          <button key={proj.id} onClick={() => setCode(proj.code)} style={{ whiteSpace: 'nowrap', padding: '5px 15px', borderRadius: '15px', background: '#333', color: '#fff', border: '1px solid #555' }}>
            {proj.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;