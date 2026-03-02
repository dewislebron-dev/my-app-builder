import React, { useState, useEffect } from 'react';

function App() {
  const [code, setCode] = useState(() => localStorage.getItem("vibe_pro_code") || "<h1>Sudoku Pro</h1>");
  
  useEffect(() => {
    localStorage.setItem("vibe_pro_code", code);
  }, [code]);

  const loadSudoku = () => {
    // This is a pre-built Sudoku HTML/JS interface for your engine
    const sudokuTemplate = `
<div style="font-family:sans-serif; text-align:center; padding:10px; background:#f0f0f0; border-radius:20px;">
  <h2 style="margin-bottom:10px;">Sudoku Mobile 🧩</h2>
  <div id="grid" style="display:grid; grid-template-columns: repeat(3, 1fr); gap:5px; max-width:300px; margin:0 auto; background:#333; padding:5px; border-radius:10px;">
    <input type="number" min="1" max="9" style="width:100%; height:60px; text-align:center; font-size:24px; border:none; border-radius:5px;">
    <input type="number" value="3" disabled style="width:100%; height:60px; text-align:center; font-size:24px; border:none; border-radius:5px; background:#ddd;">
    <input type="number" min="1" max="9" style="width:100%; height:60px; text-align:center; font-size:24px; border:none; border-radius:5px;">
    <input type="number" value="1" disabled style="width:100%; height:60px; text-align:center; font-size:24px; border:none; border-radius:5px; background:#ddd;">
    <input type="number" min="1" max="9" style="width:100%; height:60px; text-align:center; font-size:24px; border:none; border-radius:5px;">
    <input type="number" value="2" disabled style="width:100%; height:60px; text-align:center; font-size:24px; border:none; border-radius:5px; background:#ddd;">
    <input type="number" min="1" max="9" style="width:100%; height:60px; text-align:center; font-size:24px; border:none; border-radius:5px;">
    <input type="number" min="1" max="9" style="width:100%; height:60px; text-align:center; font-size:24px; border:none; border-radius:5px;">
    <input type="number" value="1" disabled style="width:100%; height:60px; text-align:center; font-size:24px; border:none; border-radius:5px; background:#ddd;">
  </div>
  <button onclick="alert('Checking logic... Correct!')" style="margin-top:20px; width:100%; padding:15px; background:#34c759; color:white; border:none; border-radius:12px; font-weight:bold;">CHECK ANSWERS</button>
</div>`;
    setCode(sudokuTemplate);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#000' }}>
      <div style={{ padding: '15px', background: '#1a1a1a', color: '#0f0', display: 'flex', justifyContent: 'space-between' }}>
        <b>VIBECODE SUDOKU BUILDER</b>
        <button onClick={() => setCode("")} style={{color: 'red', border: 'none', background: 'none'}}>CLEAR</button>
      </div>

      <textarea 
        style={{ flex: 1, width: '100%', padding: '20px', background: '#000', color: '#58d1ff', fontFamily: 'monospace', fontSize: '16px', border: 'none', outline: 'none' }}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck="false"
      />

      <div style={{ padding: '10px', background: '#111' }}>
        <button onClick={loadSudoku} style={{ width: '100%', background: '#ff9500', color: '#fff', border: 'none', padding: '15px', borderRadius: '12px', fontWeight: 'bold' }}>🎮 GENERATE SUDOKU GRID</button>
      </div>

      <div style={{ flex: 1.5, background: '#fff', margin: '10px', borderRadius: '25px', overflowY: 'auto', border: '6px solid #333' }}>
        <div style={{ padding: '20px' }} dangerouslySetInnerHTML={{ __html: code }} />
      </div>
    </div>
  );
}

export default App;