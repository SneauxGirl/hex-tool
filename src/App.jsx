import { useState } from 'react';
import { THEMES, TABS, RGB_CHANNELS } from './utils/constants';
import { hexToRgb, isValidHex } from './utils/colorUtils';

// Import components
import Tweaker from './components/Tweaker';
import Harmonies from './components/Harmonies';
import TintsShades from './components/TintsShades';
import HueRotate from './components/HueRotate';
import Contrast from './components/Contrast';
import ColorVision from './components/ColorVision';

function App() {
  const [hex, setHex] = useState('4A7BA7');
  const [theme, setTheme] = useState('light');
  const [activeTab, setActiveTab] = useState('tweaker');

  const t = THEMES[theme];
  const fullHex = `#${hex}`;
  const rgb = hexToRgb(fullHex);

  const handleHexInput = (e) => {
    const value = e.target.value.replace('#', '').toUpperCase();
    if (/^[0-9A-Fa-f]{0,6}$/.test(value)) {
      setHex(value);
    }
  };

  const renderTabContent = () => {
    const props = { hex, setHex, t };
    
    switch (activeTab) {
      case 'tweaker':
        return <Tweaker {...props} />;
      case 'harmonies':
        return <Harmonies {...props} />;
      case 'scale':
        return <TintsShades {...props} />;
      case 'huerotate':
        return <HueRotate {...props} />;
      case 'contrast':
        return <Contrast {...props} />;
      case 'colorblind':
        return <ColorVision {...props} />;
      default:
        return <Tweaker {...props} />;
    }
  };

  return (
    <div 
      style={{ background: t.bg, minHeight: '100vh', transition: 'background 0.3s' }} 
      className="p-4"
    >
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between mb-3 gap-2">
          <h1 style={{ color: t.text }} className="text-xl font-bold">
            🎨 Hex Tool
          </h1>
          
          {/* Theme Switcher */}
          <div className="flex gap-1 flex-wrap">
            {Object.keys(THEMES).map((themeKey) => (
              <button
                key={themeKey}
                onClick={() => setTheme(themeKey)}
                className="px-2 py-0.5 rounded-full text-xs font-semibold capitalize"
                style={{
                  background: THEMES[themeKey].bg,
                  color: THEMES[themeKey].text,
                  border: theme === themeKey ? '2px solid #60a5fa' : `1px solid ${THEMES[themeKey].border}`
                }}
              >
                {themeKey}
              </button>
            ))}
          </div>
        </div>

        {/* Color Input Bar */}
        <div 
          style={{ background: t.card, border: `1px solid ${t.border}` }} 
          className="rounded-xl p-3 mb-3 flex flex-wrap items-center gap-3"
        >
          {/* Color Preview */}
          <div 
            className="w-14 h-14 rounded-lg border-2 flex-shrink-0"
            style={{ background: fullHex, borderColor: t.border }}
          />
          
          {/* Hex Input */}
          <div className="flex items-center gap-1">
            <span style={{ color: t.text }} className="text-xl font-mono font-bold">#</span>
            <input
              type="text"
              value={hex}
              onChange={handleHexInput}
              maxLength={6}
              className="text-lg font-mono font-bold text-center border-2 rounded px-2 py-1 w-36"
              style={{ borderColor: t.border, background: t.card, color: t.text }}
            />
          </div>

          {/* RGB Breakdown */}
          <div className="flex gap-1.5 ml-auto flex-wrap">
            {RGB_CHANNELS.map(({ id, label, color, bgColor }) => (
              <div key={id} className="px-2 py-0.5 rounded text-center" style={{ background: bgColor }}>
                <span style={{ color }} className="text-xs font-bold">{label} </span>
                <span style={{ color: t.text }} className="font-mono text-sm">
                  {hex.slice(id === 'r' ? 0 : id === 'g' ? 2 : 4, id === 'r' ? 2 : id === 'g' ? 4 : 6)}
                </span>
                <span style={{ color: t.muted }} className="text-xs"> ({rgb[id]})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-3 flex-wrap">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-3 py-1.5 rounded-lg text-sm font-semibold"
              style={{
                background: activeTab === tab.id ? '#3b82f6' : t.card,
                color: activeTab === tab.id ? '#fff' : t.text,
                border: `1px solid ${t.border}`
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
}

export default App;