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

// Build the background style with correct layer order
const backgroundStyle = theme === 'light'
  ? {
      backgroundImage: `
        url('/hex-pattern-left.png'),
        url('/hex-pattern-right.png'),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.2)),
        linear-gradient(135deg, #d946ef 0%, #ec4899 40%, #f97316 65%, #fbbf24 100%)
      `,
      backgroundPosition: 'left top, right bottom, center, center',
      backgroundRepeat: 'no-repeat, no-repeat, no-repeat, no-repeat',
      backgroundSize: 'auto min(60vh, 50vw), auto min(60vh, 50vw), auto, auto'
    }
  : {
      backgroundImage: `
        url('/hex-pattern-left.png'),
        url('/hex-pattern-right.png'),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.2)),
        linear-gradient(${t.bg}, ${t.bg})
      `,
      backgroundPosition: 'left top, right bottom, center, center',
      backgroundRepeat: 'no-repeat, no-repeat, no-repeat, no-repeat',
      backgroundSize: 'auto min(60vh, 50vw), auto min(60vh, 50vw), auto, auto'
    };

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
  style={{ 
    ...backgroundStyle,
    minHeight: '100vh', 
    transition: 'background 0.3s' 
  }} 
  className="relative p-4"
>
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between mb-3 gap-2">
          <div className="flex items-center gap-2">
            <h1 style={{ 
              color: 'white',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
            }} className="text-3xl font-bold">
              🎨 Hex Tool
            </h1>
            <a
              className="github-link corner-github-link ml-[4px] inline-flex h-7 w-7 items-center justify-center rounded-full border-[1.5px] border-current text-white/90 hover:text-white transition-colors"
              href="https://github.com/SneauxGirl/hex-tool"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Hex Tool on GitHub"
              title="Open Hex Tool on GitHub"
            >
              <svg
                className="github-logo w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M9 19c-4 1.2-4-2-6-2"></path>
                <path d="M15 22v-3.1a3.3 3.3 0 00-.9-2.6c3 0 6-1.4 6-6.4A5 5 0 0019 6.7 4.6 4.6 0 0019 3s-1.2-.4-4 1.5a13.8 13.8 0 00-6 0C6.2 2.6 5 3 5 3a4.6 4.6 0 000 3.7A5 5 0 003 9.9c0 5 3 6.4 6 6.4a3.3 3.3 0 00-.9 2.6V22"></path>
              </svg>
            </a>
          </div>
          
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
                  border: theme === themeKey ? '2px solid #1B5998' : `1px solid ${THEMES[themeKey].border}`
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
                background: activeTab === tab.id ? '#267fd9' : t.card,
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
      <img
        src="/hhugo-signature.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-2 right-4 h-12 w-auto select-none opacity-90 sm:bottom-3 sm:h-16 lg:bottom-4 lg:h-20"
        style={{ filter: 'brightness(0) invert(1)' }}
      />
    </div>
  );
}

export default App;