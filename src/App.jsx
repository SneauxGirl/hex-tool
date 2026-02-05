import { hexToRgb, rgbToHex } from './utils/colorUtils';

function App() {
  // Quick test
  const rgb = hexToRgb('#4A7BA7');
  const hex = rgbToHex(74, 123, 167);
  
  console.log('RGB Test:', rgb); // Should be {r: 74, g: 123, b: 167}
  console.log('Hex Test:', hex); // Should be #4A7BA7
  
  return (
    <div style={{ padding: '2rem' }}>
      <h1>🎨 Hex Tool</h1>
      <p>✅ Utilities loaded successfully!</p>
      <p>Check browser console for test results.</p>
      <div style={{ marginTop: '1rem', padding: '1rem', background: '#f0f0f0', borderRadius: '8px' }}>
        <p><strong>RGB Test:</strong> {JSON.stringify(rgb)}</p>
        <p><strong>Hex Test:</strong> {hex}</p>
      </div>
    </div>
  );
}

export default App;