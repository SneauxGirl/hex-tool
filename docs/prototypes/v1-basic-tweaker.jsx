import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function HexColorTweaker() {
  const [hex, setHex] = useState('4A7BA7');
  
  // Parse hex into RGB values
  const hexToRgb = (h) => {
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return { r, g, b };
  };
  
  // Convert RGB back to hex
  const rgbToHex = (r, g, b) => {
    const clamp = (val) => Math.max(0, Math.min(255, val));
    const toHex = (val) => clamp(val).toString(16).padStart(2, '0').toUpperCase();
    return toHex(r) + toHex(g) + toHex(b);
  };
  
  const rgb = hexToRgb(hex);
  
  const adjustColor = (component, amount) => {
    const newRgb = { ...rgb };
    newRgb[component] = Math.max(0, Math.min(255, newRgb[component] + amount));
    setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  };
  
  const adjustAll = (amount) => {
    const newR = Math.max(0, Math.min(255, rgb.r + amount));
    const newG = Math.max(0, Math.min(255, rgb.g + amount));
    const newB = Math.max(0, Math.min(255, rgb.b + amount));
    setHex(rgbToHex(newR, newG, newB));
  };
  
  const makeWarmer = () => {
    const newR = Math.min(255, rgb.r + 20);
    const newB = Math.max(0, rgb.b - 20);
    setHex(rgbToHex(newR, rgb.g, newB));
  };
  
  const makeCooler = () => {
    const newR = Math.max(0, rgb.r - 20);
    const newB = Math.min(255, rgb.b + 20);
    setHex(rgbToHex(newR, rgb.g, newB));
  };
  
  const increaseSaturation = () => {
    const avg = (rgb.r + rgb.g + rgb.b) / 3;
    const factor = 1.3;
    const newR = Math.round(avg + (rgb.r - avg) * factor);
    const newG = Math.round(avg + (rgb.g - avg) * factor);
    const newB = Math.round(avg + (rgb.b - avg) * factor);
    setHex(rgbToHex(newR, newG, newB));
  };
  
  const decreaseSaturation = () => {
    const avg = (rgb.r + rgb.g + rgb.b) / 3;
    const factor = 0.7;
    const newR = Math.round(avg + (rgb.r - avg) * factor);
    const newG = Math.round(avg + (rgb.g - avg) * factor);
    const newB = Math.round(avg + (rgb.b - avg) * factor);
    setHex(rgbToHex(newR, newG, newB));
  };
  
  const handleHexInput = (e) => {
    const value = e.target.value.replace('#', '').toUpperCase();
    if (/^[0-9A-F]{0,6}$/.test(value)) {
      setHex(value);
    }
  };
  
  // Convert hex digit to decimal for display
  const hexToDecimal = (hexPair) => {
    return parseInt(hexPair, 16);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Hex Color Tweaker</h1>
        <p className="text-gray-600 mb-8">Learn how hex codes work by tweaking colors in real-time</p>
        
        {/* Color Display */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div 
            className="w-full h-48 rounded-lg mb-4 border-4 border-gray-200"
            style={{ backgroundColor: `#${hex}` }}
          />
          
          <div className="flex items-center justify-center gap-4">
            <span className="text-4xl font-mono font-bold text-gray-800">#</span>
            <input
              type="text"
              value={hex}
              onChange={handleHexInput}
              maxLength={6}
              className="text-4xl font-mono font-bold text-center border-2 border-gray-300 rounded px-4 py-2 w-64"
            />
          </div>
        </div>

        {/* Hex Breakdown */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Hex Code Breakdown</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="bg-red-100 rounded-lg p-4 mb-2">
                <div className="text-sm text-red-600 font-semibold mb-1">RED</div>
                <div className="text-3xl font-mono font-bold text-red-700">{hex.slice(0, 2)}</div>
                <div className="text-sm text-red-600 mt-1">= {hexToDecimal(hex.slice(0, 2))} / 255</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-lg p-4 mb-2">
                <div className="text-sm text-green-600 font-semibold mb-1">GREEN</div>
                <div className="text-3xl font-mono font-bold text-green-700">{hex.slice(2, 4)}</div>
                <div className="text-sm text-green-600 mt-1">= {hexToDecimal(hex.slice(2, 4))} / 255</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-lg p-4 mb-2">
                <div className="text-sm text-blue-600 font-semibold mb-1">BLUE</div>
                <div className="text-3xl font-mono font-bold text-blue-700">{hex.slice(4, 6)}</div>
                <div className="text-sm text-blue-600 mt-1">= {hexToDecimal(hex.slice(4, 6))} / 255</div>
              </div>
            </div>
          </div>
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Hex digits:</strong> 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A (10), B (11), C (12), D (13), E (14), F (15)
              <br />
              <strong>Example:</strong> A7 = (10 × 16) + 7 = 167 in decimal
            </p>
          </div>
        </div>

        {/* Individual RGB Controls */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Individual Color Controls</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-red-600 w-20">Red</span>
              <div className="flex gap-2">
                <button onClick={() => adjustColor('r', -16)} className="px-3 py-2 bg-red-100 hover:bg-red-200 rounded"><Minus size={16} /></button>
                <button onClick={() => adjustColor('r', -1)} className="px-3 py-2 bg-red-100 hover:bg-red-200 rounded text-sm">-1</button>
                <span className="px-4 py-2 bg-gray-100 rounded font-mono min-w-[80px] text-center">{rgb.r}</span>
                <button onClick={() => adjustColor('r', 1)} className="px-3 py-2 bg-red-100 hover:bg-red-200 rounded text-sm">+1</button>
                <button onClick={() => adjustColor('r', 16)} className="px-3 py-2 bg-red-100 hover:bg-red-200 rounded"><Plus size={16} /></button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-green-600 w-20">Green</span>
              <div className="flex gap-2">
                <button onClick={() => adjustColor('g', -16)} className="px-3 py-2 bg-green-100 hover:bg-green-200 rounded"><Minus size={16} /></button>
                <button onClick={() => adjustColor('g', -1)} className="px-3 py-2 bg-green-100 hover:bg-green-200 rounded text-sm">-1</button>
                <span className="px-4 py-2 bg-gray-100 rounded font-mono min-w-[80px] text-center">{rgb.g}</span>
                <button onClick={() => adjustColor('g', 1)} className="px-3 py-2 bg-green-100 hover:bg-green-200 rounded text-sm">+1</button>
                <button onClick={() => adjustColor('g', 16)} className="px-3 py-2 bg-green-100 hover:bg-green-200 rounded"><Plus size={16} /></button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-blue-600 w-20">Blue</span>
              <div className="flex gap-2">
                <button onClick={() => adjustColor('b', -16)} className="px-3 py-2 bg-blue-100 hover:bg-blue-200 rounded"><Minus size={16} /></button>
                <button onClick={() => adjustColor('b', -1)} className="px-3 py-2 bg-blue-100 hover:bg-blue-200 rounded text-sm">-1</button>
                <span className="px-4 py-2 bg-gray-100 rounded font-mono min-w-[80px] text-center">{rgb.b}</span>
                <button onClick={() => adjustColor('b', 1)} className="px-3 py-2 bg-blue-100 hover:bg-blue-200 rounded text-sm">+1</button>
                <button onClick={() => adjustColor('b', 16)} className="px-3 py-2 bg-blue-100 hover:bg-blue-200 rounded"><Plus size={16} /></button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Adjustments */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Adjustments</h2>
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => adjustAll(20)} className="px-6 py-3 bg-yellow-100 hover:bg-yellow-200 rounded-lg font-semibold">
              ☀️ Brighter
            </button>
            <button onClick={() => adjustAll(-20)} className="px-6 py-3 bg-gray-700 hover:bg-gray-800 text-white rounded-lg font-semibold">
              🌙 Darker
            </button>
            <button onClick={increaseSaturation} className="px-6 py-3 bg-purple-100 hover:bg-purple-200 rounded-lg font-semibold">
              ✨ More Vibrant
            </button>
            <button onClick={decreaseSaturation} className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold">
              🌫️ More Muted
            </button>
            <button onClick={makeWarmer} className="px-6 py-3 bg-orange-100 hover:bg-orange-200 rounded-lg font-semibold">
              🔥 Warmer
            </button>
            <button onClick={makeCooler} className="px-6 py-3 bg-blue-100 hover:bg-blue-200 rounded-lg font-semibold">
              ❄️ Cooler
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}