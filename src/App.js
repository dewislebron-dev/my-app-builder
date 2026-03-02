import React, { useState, useEffect } from 'react';

function App() {
  const [code, setCode] = useState(() => localStorage.getItem("vibe_pro_code") || "<h1>Hello</h1>");
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    localStorage.setItem("vibe_pro_code", code);
  }, [code]);

  // THE BRAIN: This turns your text into a REAL running app
  const renderApp = () => {
    try {
      return <div dangerouslySetInnerHTML={{ __html: code }} />;
    } catch (err) {
      return <div style={{color: 'red'}}>Error: {err.message}</div>;
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#000' }}>
      <div style={{ padding: '15px', background: '#1a1a1a', color: '#0f0', borderBottom: '2px solid #333', fontSize: '12px', fontWeight: 'bold' }}>
        SYSTEM OPERATIONAL // VIBECODE CORE v2.0
      </div>

      {/* THE EDITOR */}
      <textarea 
        style={{ flex: 1, width: '100%', padding: '20px', background: '#000', color: '#58d1ff', fontFamily: 'monospace', fontSize: '16px', border: 'none', outline: 'none' }}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck="false"
      />

      {/* THE LIVE RUNTIME */}
      <div style={{ flex: 1, background: '#fff', margin: '10px', borderRadius: '25px', overflow: 'hidden', border: '6px solid #333', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, width: '100%', background: '#eee', padding: '5px', fontSize: '10px', textAlign: 'center' }}>LIVE MOBILE RUNTIME</div>
        <div style={{ padding: '20px', marginTop: '20px' }}>
          {renderApp()}
        </div>
      </div>
    </div>
  );
}

export default App;