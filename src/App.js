import React, { useState, useEffect } from 'react';

function App() {
  // 1. DATABASE: This loads your saved app from your MacBook's memory
  const [myCreatedButtons, setMyCreatedButtons] = useState(() => {
    const savedApp = localStorage.getItem("my-number-one-app");
    return savedApp ? JSON.parse(savedApp) : [];
  });

  const [appTheme, setAppTheme] = useState(() => {
    const savedTheme = localStorage.getItem("my-app-theme");
    return savedTheme ? savedTheme : "#ffffff";
  });

  // 2. BUILDER CONTROLS: What you are currently typing/picking
  const [buttonText, setButtonText] = useState("");
  const [buttonColor, setButtonColor] = useState("#007bff");

  // 3. AUTO-SAVE: Every move you make is saved instantly
  useEffect(() => {
    localStorage.setItem("my-number-one-app", JSON.stringify(myCreatedButtons));
    localStorage.setItem("my-app-theme", appTheme);
  }, [myCreatedButtons, appTheme]);

  // 4. LOGIC: How the builder works
  const handleAddButton = () => {
    if (buttonText.trim() === "") return;
    const newButton = { id: Date.now(), text: buttonText, color: buttonColor };
    setMyCreatedButtons([...myCreatedButtons, newButton]);
    setButtonText(""); // Clears the box for the next button
  };

  const deleteButton = (id) => {
    setMyCreatedButtons(myCreatedButtons.filter(btn => btn.id !== id));
  };

  const clearAll = () => {
    if (window.confirm("Are you sure? This will delete your entire app!")) {
      setMyCreatedButtons([]);
      setAppTheme("#ffffff");
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      
      {/* HEADER */}
      <header style={{ marginBottom: '30px' }}>
        <h1 style={{ color: '#1c1e21', fontSize: '28px' }}>App Studio Pro 🚀</h1>
        <p style={{ color: '#606770' }}>Build your dream app on your MacBook.</p>
      </header>

      {/* THE BUILDER DASHBOARD */}
      <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', flexWrap: 'wrap' }}>
        
        <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '15px', width: '350px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0 }}>Builder Tools</h3>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Button Name:</label>
            <input 
              type="text" 
              value={buttonText}
              onChange={(e) => setButtonText(e.target.value)}
              placeholder="e.g., Get Started"
              style={{ width: '90%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Button Color:</label>
            <input 
              type="color" 
              value={buttonColor}
              onChange={(e) => setButtonColor(e.target.value)}
              style={{ width: '100%', height: '40px', border: 'none', cursor: 'pointer' }}
            />
          </div>

          <button 
            onClick={handleAddButton}
            style={{ width: '100%', padding: '12px', backgroundColor: '#1877f2', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '10px' }}
          >
            Add Button
          </button>

          <hr style={{ border: '0.5px solid #eee', margin: '20px 0' }} />

          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>App Background Theme:</label>
          <input 
            type="color" 
            value={appTheme}
            onChange={(e) => setAppTheme(e.target.value)}
            style={{ width: '100%', height: '40px', border: 'none', cursor: 'pointer', marginBottom: '20px' }}
          />

          <button 
            onClick={clearAll}
            style={{ width: '100%', padding: '10px', background: 'none', color: '#dc3545', border: '1px solid #dc3545', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}
          >
            Reset Builder
          </button>
        </div>

        {/* THE MOBILE PREVIEW */}
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: '10px' }}>Live View</h3>
          <div style={{ 
            width: '320px', 
            height: '580px', 
            backgroundColor: appTheme, 
            borderRadius: '40px', 
            border: '12px solid #1c1e21', 
            boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
            padding: '20px',
            overflowY: 'auto',
            transition: 'background-color 0.4s ease'
          }}>
            {/* Phone Notch */}
            <div style={{ width: '120px', height: '25px', backgroundColor: '#1c1e21', margin: '-21px auto 20px', borderRadius: '0 0 15px 15px' }}></div>
            
            {myCreatedButtons.length === 0 ? (
              <p style={{ marginTop: '200px', color: '#888' }}>No elements yet.<br/>Start building!</p>
            ) : (
              myCreatedButtons.map((btn) => (
                <div key={btn.id} style={{ position: 'relative', marginBottom: '15px' }}>
                  <button style={{ 
                    width: '100%', 
                    padding: '16px', 
                    backgroundColor: btn.color, 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '12px', 
                    fontWeight: '600',
                    fontSize: '16px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}>
                    {btn.text}
                  </button>
                  <button 
                    onClick={() => deleteButton(btn.id)}
                    style={{ position: 'absolute', right: '-10px', top: '-10px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', fontSize: '12px' }}
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;