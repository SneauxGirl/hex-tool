import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

// Color Harmonies Component
function ColorHarmonies({ hex }) {
  const hexToRgb = (h) => {
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return { r, g, b };
  };
  
  const rgbToHsl = (r, g, b) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    return { h: h * 360, s: s * 100, l: l * 100 };
  };
  
  const hslToRgb = (h, s, l) => {
    h /= 360; s /= 100; l /= 100;
    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  };
  
  const rgbToHex = (r, g, b) => {
    const toHex = (val) => Math.max(0, Math.min(255, val)).toString(16).padStart(2, '0').toUpperCase();
    return toHex(r) + toHex(g) + toHex(b);
  };
  
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  
  // Generate complementary (180° opposite)
  const complementaryHsl = { ...hsl, h: (hsl.h + 180) % 360 };
  const complementaryRgb = hslToRgb(complementaryHsl.h, complementaryHsl.s, complementaryHsl.l);
  const complementary = rgbToHex(complementaryRgb.r, complementaryRgb.g, complementaryRgb.b);
  
  // Generate analogous colors (30° on each side)
  const analogous1Hsl = { ...hsl, h: (hsl.h + 30) % 360 };
  const analogous1Rgb = hslToRgb(analogous1Hsl.h, analogous1Hsl.s, analogous1Hsl.l);
  const analogous1 = rgbToHex(analogous1Rgb.r, analogous1Rgb.g, analogous1Rgb.b);
  
  const analogous2Hsl = { ...hsl, h: (hsl.h - 30 + 360) % 360 };
  const analogous2Rgb = hslToRgb(analogous2Hsl.h, analogous2Hsl.s, analogous2Hsl.l);
  const analogous2 = rgbToHex(analogous2Rgb.r, analogous2Rgb.g, analogous2Rgb.b);
  
  // Generate triadic colors (120° apart)
  const triadic1Hsl = { ...hsl, h: (hsl.h + 120) % 360 };
  const triadic1Rgb = hslToRgb(triadic1Hsl.h, triadic1Hsl.s, triadic1Hsl.l);
  const triadic1 = rgbToHex(triadic1Rgb.r, triadic1Rgb.g, triadic1Rgb.b);
  
  const triadic2Hsl = { ...hsl, h: (hsl.h + 240) % 360 };
  const triadic2Rgb = hslToRgb(triadic2Hsl.h, triadic2Hsl.s, triadic2Hsl.l);
  const triadic2 = rgbToHex(triadic2Rgb.r, triadic2Rgb.g, triadic2Rgb.b);
  
  const ColorSwatch = ({ hexColor, label, description }) => (
    <div className="text-center">
      <div 
        className="w-full h-24 rounded-lg border-2 border-gray-200 mb-2"
        style={{ backgroundColor: `#${hexColor}` }}
      />
      <div className="font-mono text-sm font-semibold text-gray-700">#{hexColor}</div>
      <div className="text-xs text-gray-500 mt-1">{label}</div>
      {description && <div className="text-xs text-gray-400 mt-1">{description}</div>}
    </div>
  );
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Color Harmonies</h2>
      
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-3">Complementary (Opposite on color wheel)</h3>
        <div className="grid grid-cols-2 gap-4">
          <ColorSwatch hexColor={hex} label="Your Color" />
          <ColorSwatch hexColor={complementary} label="Complementary" description="Maximum contrast" />
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-3">Analogous (Adjacent colors)</h3>
        <div className="grid grid-cols-3 gap-4">
          <ColorSwatch hexColor={analogous2} label="Analogous -30°" description="Harmonious" />
          <ColorSwatch hexColor={hex} label="Your Color" />
          <ColorSwatch hexColor={analogous1} label="Analogous +30°" description="Harmonious" />
        </div>
      </div>
      
      <div>
        <h3 className="font-semibold text-gray-700 mb-3">Triadic (Evenly spaced)</h3>
        <div className="grid grid-cols-3 gap-4">
          <ColorSwatch hexColor={hex} label="Your Color" />
          <ColorSwatch hexColor={triadic1} label="Triadic +120°" description="Vibrant" />
          <ColorSwatch hexColor={triadic2} label="Triadic +240°" description="Vibrant" />
        </div>
      </div>
      
      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-700">
          <strong>Tip:</strong> Complementary colors create bold contrast. Analogous colors create smooth, cohesive palettes. Triadic colors offer vibrant variety while maintaining balance.
        </p>
      </div>
    </div>
  );
}

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
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
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

        {/* Color Harmonies */}
        <ColorHarmonies hex={hex} />
      </div>
    </div>
  );
}