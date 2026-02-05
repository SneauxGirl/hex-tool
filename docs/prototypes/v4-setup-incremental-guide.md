# * ORIGINAL SETUP FILE DESIGNED FOR CREATE REACT APP *

    * v4 is when the project got too large to run on Claude, so this stands in place of `v4-full-suite.js` at time of initial build as it contains all component code.
    * Reference document for`Setup-Guide.md` at time of loading components following original Tweaker.

# Incremental Setup Guide

Build your Hex Color Tweaker project from scratch with meaningful git commits at each step. This approach documents your development process and creates a clean git history.

---

## Phase 1: Project Initialization

### Step 1.1: Create React App
```bash
npx create-react-app hex-color-tweaker
cd hex-color-tweaker
```

### Step 1.2: Initial Cleanup
```bash
# Remove files we won't use
rm src/App.css src/logo.svg src/App.test.js src/setupTests.js src/reportWebVitals.js

# Remove references in index.js
# Edit src/index.js to remove reportWebVitals import and call
```

**src/index.js** should look like:
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### Step 1.3: First Commit
```bash
git add .
git commit -m "chore: initial project setup with Create React App"
```

---

## Phase 2: Root Configuration Files

### Step 2.1: Create .gitignore (if not exists)
Create `.gitignore` in root:
```
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode/
.idea/
*.swp
*.swo
*~
```

### Step 2.2: Update package.json
Add to your existing `package.json`:
```json
{
  "name": "hex-tool",
  "version": "1.0.0",
  "description": "A comprehensive color tool for designers and developers",
  "keywords": [
    "color",
    "hex",
    "color-picker",
    "design-tools",
    "accessibility",
    "wcag",
    "color-blindness",
    "color-theory"
  ],
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/hex-color-tweaker.git"
  }
}
```

### Step 2.3: Create Basic README.md
Create `README.md` in root:
```markdown
# 🎨 Hex Color Tweaker

A comprehensive web-based color tool for designers and developers.

## Status: In Development

Currently building out core features.

## Quick Start

\`\`\`bash
npm install
npm start
\`\`\`

## License

MIT
```

### Step 2.4: Commit Configuration
```bash
git add .gitignore package.json README.md
git commit -m "chore: add project configuration and basic README"
```

---

## Phase 3: Utility Layer

### Step 3.1: Create Directory Structure
```bash
mkdir -p src/utils
```

### Step 3.2: Create colorUtils.js
Copy the `colorUtils.js` content from artifacts to `src/utils/colorUtils.js`

### Step 3.3: Create constants.js
Copy the `constants.js` content from artifacts to `src/utils/constants.js`

### Step 3.4: Test Utilities
Create a temporary test in `src/App.js`:
```javascript
import { hexToRgb, rgbToHex } from './utils/colorUtils';

function App() {
  // Quick test
  const rgb = hexToRgb('#4A7BA7');
  const hex = rgbToHex(74, 123, 167);
  
  console.log('RGB:', rgb); // Should be {r: 74, g: 123, b: 167}
  console.log('Hex:', hex); // Should be #4A7BA7
  
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Hex Color Tweaker</h1>
      <p>Utilities loaded successfully!</p>
      <p>Check console for test results.</p>
    </div>
  );
}

export default App;
```

### Step 3.5: Run and Verify
```bash
npm start
# Check browser console for test output
```

### Step 3.6: Commit Utils
```bash
git add src/utils/
git commit -m "feat: add color utility functions and constants"
```

---

## Phase 4: Base Styles

### Step 4.1: Update index.css
Replace `src/index.css` with the utility classes (see the full CSS in the original SETUP-GUIDE.md artifact)

### Step 4.2: Commit Styles
```bash
git add src/index.css
git commit -m "style: add utility CSS classes and base styles"
```

---

## Phase 5: Shared Components

### Step 5.1: Create Components Directory
```bash
mkdir -p src/components/shared
```

### Step 5.2: Create Card Component
Copy `Card.jsx` content to `src/components/shared/Card.jsx`

### Step 5.3: Create Swatch Component
Copy `Swatch.jsx` content to `src/components/shared/Swatch.jsx`

### Step 5.4: Commit Shared Components
```bash
git add src/components/shared/
git commit -m "feat: add reusable Card and Swatch components"
```

---

## Phase 6: Main Application Shell

### Step 6.1: Create App.jsx
Copy the `App.jsx` content from artifacts to `src/App.jsx`

This includes:
- Theme system
- Tab navigation
- Color input bar
- RGB breakdown display
- Component routing

### Step 6.2: Create Stub Components
Create these files with basic stub content:

**src/components/Tweaker.jsx:**
```javascript
import Card from './shared/Card';

function Tweaker({ hex, setHex, t }) {
  return (
    <Card t={t} title="Color Tweaker" subtitle="Coming soon">
      <p style={{ color: t.muted }}>RGB adjustment controls</p>
    </Card>
  );
}

export default Tweaker;
```

**src/components/Harmonies.jsx:**
```javascript
import Card from './shared/Card';

function Harmonies({ hex, setHex, t }) {
  return (
    <Card t={t} title="Color Harmonies" subtitle="Coming soon">
      <p style={{ color: t.muted }}>Complementary, analogous, split-complementary, and triadic harmonies</p>
    </Card>
  );
}

export default Harmonies;
```

**src/components/TintsShades.jsx:**
```javascript
import Card from './shared/Card';

function TintsShades({ hex, setHex, t }) {
  return (
    <Card t={t} title="Tints & Shades" subtitle="Coming soon">
      <p style={{ color: t.muted }}>10-step color scale from pure color mixing</p>
    </Card>
  );
}

export default TintsShades;
```

**src/components/HueRotate.jsx:**
```javascript
import Card from './shared/Card';

function HueRotate({ hex, setHex, t }) {
  return (
    <Card t={t} title="Hue Rotation" subtitle="Coming soon">
      <p style={{ color: t.muted }}>CSS hue-rotate() preview at 30° increments</p>
    </Card>
  );
}

export default HueRotate;
```

**src/components/Contrast.jsx:**
```javascript
import Card from './shared/Card';

function Contrast({ hex, t }) {
  return (
    <Card t={t} title="Contrast Checker" subtitle="Coming soon">
      <p style={{ color: t.muted }}>WCAG AA/AAA contrast compliance checker</p>
    </Card>
  );
}

export default Contrast;
```

**src/components/ColorVision.jsx:**
```javascript
import Card from './shared/Card';

function ColorVision({ hex, t }) {
  return (
    <Card t={t} title="Color Vision Simulation" subtitle="Coming soon">
      <p style={{ color: t.muted }}>Test how colors appear with color vision deficiencies</p>
    </Card>
  );
}

export default ColorVision;
```

### Step 6.3: Test Application Shell
```bash
npm start
```

Verify:
- ✅ App loads without errors
- ✅ Theme switcher works (5 themes)
- ✅ Hex input accepts values
- ✅ RGB breakdown displays correctly
- ✅ All 6 tabs are clickable
- ✅ Each tab shows stub content

### Step 6.4: Commit Application Shell
```bash
git add src/App.jsx src/components/
git commit -m "feat: add application shell with theme system and navigation"
```

---

## Phase 7: Implement Tweaker Component

### Step 7.1: Replace Tweaker Stub
Replace `src/components/Tweaker.jsx` with the full implementation from artifacts.

### Step 7.2: Test Tweaker
```bash
npm start
```

Verify Tweaker tab:
- ✅ Individual RGB controls work (+/-16, +/-1)
- ✅ Quick adjustments work (brighter, darker, warmer, cooler, vibrant, muted)
- ✅ Color updates in real-time
- ✅ Values clamp correctly (0-255)

### Step 7.3: Commit First Feature
```bash
git add src/components/Tweaker.jsx
git commit -m "feat: implement Tweaker component with RGB controls and quick adjustments"
```

---

## Phase 8: Implement Remaining Components (One at a Time)

### Step 8.1: Harmonies Component

**Implementation:**
```javascript
import Card from './shared/Card';
import Swatch from './shared/Swatch';
import { rotateHue } from '../utils/colorUtils';
import { HARMONY_TYPES } from '../utils/constants';

function Harmonies({ hex, setHex, t }) {
  const fullHex = `#${hex}`;

  return (
    <>
      {HARMONY_TYPES.map((harmony) => (
        <Card key={harmony.id} t={t} title={harmony.title} subtitle={harmony.desc}>
          <div className={`grid gap-2 ${harmony.rotations.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
            {harmony.rotations.map((rotation, index) => {
              const color = rotateHue(fullHex, rotation);
              const label = rotation === 0 ? 'Your Color' : `${rotation > 0 ? '+' : ''}${rotation}°`;
              
              return (
                <Swatch
                  key={index}
                  hex={color}
                  label={label}
                  onClick={() => setHex(color.slice(1))}
                  t={t}
                />
              );
            })}
          </div>
        </Card>
      ))}
    </>
  );
}

export default Harmonies;
```

**Test and Commit:**
```bash
npm start
# Test: Generate harmonies, click swatches to set base
git add src/components/Harmonies.jsx
git commit -m "feat: implement Harmonies component with complementary, analogous, split-complementary, and triadic color schemes"
```

### Step 8.2: Tints & Shades Component

**Implementation:**
```javascript
import Card from './shared/Card';
import Swatch from './shared/Swatch';
import { hexToRgb, createTint, createShade } from '../utils/colorUtils';
import { TINT_SHADE_STEPS } from '../utils/constants';

function TintsShades({ hex, setHex, t }) {
  const { r, g, b } = hexToRgb(`#${hex}`);

  const generateColors = () => {
    return TINT_SHADE_STEPS.map((step) => {
      if (step.type === 'base') {
        return { hex: `#${hex}`, label: step.label };
      } else if (step.type === 'tint') {
        return { hex: createTint(r, g, b, step.factor), label: step.label };
      } else {
        return { hex: createShade(r, g, b, step.factor), label: step.label };
      }
    });
  };

  const colors = generateColors();

  return (
    <Card t={t} title="Tints & Shades" subtitle="Pure color mixing — click to set as base">
      <div className="grid grid-cols-5 gap-2">
        {colors.map((color, index) => (
          <Swatch
            key={index}
            hex={color.hex}
            label={color.label}
            onClick={() => setHex(color.hex.slice(1))}
            t={t}
          />
        ))}
      </div>
    </Card>
  );
}

export default TintsShades;
```

**Test and Commit:**
```bash
npm start
# Test: Generate scale, verify tints/shades, click to set
git add src/components/TintsShades.jsx
git commit -m "feat: implement Tints & Shades component with 10-step color scale"
```

### Step 8.3: Hue Rotate Component

**Implementation:**
```javascript
import Card from './shared/Card';
import { hexToRgb, rgbToHsl, hslToRgb, rgbToHex } from '../utils/colorUtils';
import { HUE_ROTATION_STEPS, getColorNameFromHue } from '../utils/constants';

function HueRotate({ hex, setHex, t }) {
  const { r, g, b } = hexToRgb(`#${hex}`);
  const hsl = rgbToHsl(r, g, b);

  const rotations = HUE_ROTATION_STEPS.map((degrees) => {
    const newHue = (hsl.h + degrees) % 360;
    const newRgb = hslToRgb(newHue, hsl.s, hsl.l);
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    
    return {
      degrees,
      hex: newHex,
      hue: Math.round(newHue),
      name: getColorNameFromHue(newHue)
    };
  });

  return (
    <Card t={t} title="Hue Rotation" subtitle="CSS hue-rotate() at 30° increments — click to set">
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
        {rotations.map((item) => (
          <div
            key={item.degrees}
            onClick={() => setHex(item.hex.slice(1))}
            className="rounded-lg border cursor-pointer hover:opacity-80 p-2"
            style={{ background: t.card, borderColor: t.border }}
          >
            <div className="w-full rounded mb-1" style={{ background: item.hex, height: '40px' }} />
            <div style={{ color: t.text }} className="font-semibold text-xs">
              {item.degrees === 0 ? 'Original' : `+${item.degrees}°`}
            </div>
            <div style={{ color: t.muted }} className="font-mono text-xs">{item.hex}</div>
            <div style={{ color: t.muted }} className="text-xs">hue-rotate({item.degrees}deg)</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default HueRotate;
```

**Test and Commit:**
```bash
npm start
# Test: Verify 13 rotations, CSS code display, click to set
git add src/components/HueRotate.jsx
git commit -m "feat: implement Hue Rotate component with CSS filter preview"
```

### Step 8.4: Contrast Component

**Implementation:**
```javascript
import { useState } from 'react';
import Card from './shared/Card';
import { contrastRatio, getIdealContrast, hexToRgb } from '../utils/colorUtils';
import { WCAG_LEVELS } from '../utils/constants';

function Contrast({ hex, t }) {
  const fullHex = `#${hex}`;
  const [contrastHex, setContrastHex] = useState(getIdealContrast(fullHex));

  const ratio = contrastRatio(hexToRgb(fullHex), hexToRgb(contrastHex));

  const Badge = ({ level, pass }) => (
    <span
      className="px-2 py-0.5 rounded text-xs font-bold"
      style={{
        background: pass ? '#dcfce7' : '#fee2e2',
        color: pass ? '#166534' : '#991b1b'
      }}
    >
      {level}: {pass ? 'PASS' : 'FAIL'}
    </span>
  );

  const handleContrastInput = (e) => {
    const value = e.target.value.replace('#', '').toUpperCase();
    if (/^[0-9A-Fa-f]{0,6}$/.test(value)) {
      setContrastHex(`#${value}`);
    }
  };

  return (
    <>
      <Card t={t} title="Live Preview">
        <div className="grid grid-cols-2 gap-3">
          {[[fullHex, contrastHex], [contrastHex, fullHex]].map(([bg, fg], index) => (
            <div
              key={index}
              className="rounded-lg p-4 flex flex-col items-center justify-center gap-1"
              style={{ background: bg, minHeight: '110px' }}
            >
              <span style={{ color: fg }} className="text-2xl font-bold">Aa</span>
              <span style={{ color: fg }} className="text-sm">Normal Text</span>
              <span style={{ color: fg }} className="text-xs">Small Text</span>
            </div>
          ))}
        </div>
      </Card>

      <Card t={t}>
        <div className="flex gap-4 flex-wrap items-end mb-3">
          <div>
            <label style={{ color: t.muted }} className="text-xs">Base Color</label>
            <div className="flex items-center gap-1 mt-0.5">
              <div className="w-7 h-7 rounded border" style={{ background: fullHex, borderColor: t.border }} />
              <span style={{ color: t.text }} className="font-mono text-xs">{fullHex.toUpperCase()}</span>
            </div>
          </div>
          <div>
            <label style={{ color: t.muted }} className="text-xs">Contrast Color</label>
            <div className="flex items-center gap-1 mt-0.5">
              <div className="w-7 h-7 rounded border" style={{ background: contrastHex, borderColor: t.border }} />
              <input
                type="text"
                value={contrastHex.replace('#', '')}
                onChange={handleContrastInput}
                maxLength={6}
                className="font-mono text-xs border rounded px-1.5 py-0.5 w-16"
                style={{ borderColor: t.border, background: t.card, color: t.text }}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span style={{ color: t.text }} className="text-xl font-bold">{ratio.toFixed(2)}:1</span>
          <Badge level="AA" pass={ratio >= WCAG_LEVELS.AA_NORMAL.ratio} />
          <Badge level="AAA" pass={ratio >= WCAG_LEVELS.AAA_NORMAL.ratio} />
          <Badge level="AA Large" pass={ratio >= WCAG_LEVELS.AA_LARGE.ratio} />
        </div>
        <p style={{ color: t.muted }} className="text-xs mt-1">
          AA ≥4.5:1 · AAA ≥7:1 · Large Text ≥3:1
        </p>
      </Card>
    </>
  );
}

export default Contrast;
```

**Test and Commit:**
```bash
npm start
# Test: Check ratio calculation, edit contrast color, verify WCAG badges
git add src/components/Contrast.jsx
git commit -m "feat: implement Contrast Checker with WCAG compliance testing"
```

### Step 8.5: Color Vision Component

**Implementation:**
```javascript
import { useState } from 'react';
import Card from './shared/Card';
import { hexToRgb, simulateCVD, rgbToHex } from '../utils/colorUtils';
import { CVD_TYPES } from '../utils/constants';

function ColorVision({ hex, t }) {
  const [severity, setSeverity] = useState(1);
  const fullHex = `#${hex}`;
  const { r, g, b } = hexToRgb(fullHex);

  return (
    <>
      <Card t={t}>
        <div className="flex items-center justify-between mb-1">
          <h3 style={{ color: t.text }} className="font-bold">Severity</h3>
          <span style={{ color: t.text }} className="font-mono text-sm">{severity.toFixed(2)}</span>
        </div>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={severity}
          onChange={(e) => setSeverity(+e.target.value)}
          className="w-full accent-blue-500"
        />
        <div className="flex justify-between">
          <span style={{ color: t.muted }} className="text-xs">Normal (0)</span>
          <span style={{ color: t.muted }} className="text-xs">Full Anopia (1)</span>
        </div>
      </Card>

      <Card t={t} title="Side by Side Comparison">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div className="text-center">
            <div className="w-full rounded-lg border-2" style={{ background: fullHex, borderColor: t.border, height: '64px' }} />
            <div style={{ color: t.text }} className="text-xs mt-1 font-semibold">Normal</div>
            <div style={{ color: t.muted }} className="font-mono text-xs">{fullHex.toUpperCase()}</div>
          </div>
          {CVD_TYPES.map((type) => {
            const simulated = simulateCVD(r, g, b, type.id, severity);
            const simHex = rgbToHex(simulated.r, simulated.g, simulated.b);
            return (
              <div key={type.id} className="text-center">
                <div className="w-full rounded-lg border-2" style={{ background: simHex, borderColor: t.border, height: '64px' }} />
                <div style={{ color: t.text }} className="text-xs mt-1 font-semibold">{type.label}</div>
                <div style={{ color: t.muted }} className="font-mono text-xs">{simHex}</div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card t={t} title="Detailed View">
        {CVD_TYPES.map((type) => {
          const simulated = simulateCVD(r, g, b, type.id, severity);
          const simHex = rgbToHex(simulated.r, simulated.g, simulated.b);
          return (
            <div key={type.id} className="flex items-center gap-2 mb-2 last:mb-0">
              <div className="w-9 h-9 rounded border-2 flex-shrink-0" style={{ background: fullHex, borderColor: t.border }} />
              <span style={{ color: t.muted }}>→</span>
              <div className="w-9 h-9 rounded border-2 flex-shrink-0" style={{ background: simHex, borderColor: t.border }} />
              <div className="flex-1">
                <div style={{ color: t.text }} className="text-sm font-semibold">{type.label}</div>
                <div style={{ color: t.muted }} className="text-xs">{type.desc}</div>
              </div>
              <div style={{ color: t.muted }} className="font-mono text-xs text-right">
                {simHex}<br />R:{simulated.r} G:{simulated.g} B:{simulated.b}
              </div>
            </div>
          );
        })}
      </Card>

      <Card t={t} title="About CVD Types">
        <p style={{ color: t.muted }} className="text-xs leading-relaxed">
          {CVD_TYPES.map((type, index) => (
            <span key={type.id}>
              <strong style={{ color: t.text }}>{type.label}</strong> — {type.detail}
              {index < CVD_TYPES.length - 1 && <br />}
            </span>
          ))}
        </p>
      </Card>
    </>
  );
}

export default ColorVision;
```

**Test and Commit:**
```bash
npm start
# Test: Adjust severity slider, verify all CVD types, check RGB values
git add src/components/ColorVision.jsx
git commit -m "feat: implement Color Vision simulation with severity control"
```

---

## Phase 9: Documentation

### Step 9.1: Create Documentation Directory
```bash
mkdir -p docs/prototypes docs/screenshots
```

### Step 9.2: Add Prototype Files
Save your artifact code to:
- `docs/prototypes/v1-basic-tweaker.jsx`
- `docs/prototypes/v2-with-harmonies.jsx`
- `docs/prototypes/v3-full-suite.jsx`

Create `docs/prototypes/README.md` explaining the evolution.

### Step 9.3: Add CHANGELOG
Copy `CHANGELOG.md` to `docs/CHANGELOG.md`

### Step 9.4: Take Screenshots
Take screenshots of:
- Main interface with all themes
- Each tab in action
- Before/after examples

Save to `docs/screenshots/`

### Step 9.5: Update Main README
Replace the basic README with the full version from artifacts, updating screenshot paths.

### Step 9.6: Commit Documentation
```bash
git add docs/ README.md
git commit -m "docs: add comprehensive documentation, prototypes, and screenshots"
```

---

## Phase 10: Final Release

### Step 10.1: Final Testing
- Test all features in all themes
- Test on different browsers
- Test responsive design
- Verify all links in README

### Step 10.2: Create Release Tag
```bash
git tag -a v1.0.0 -m "Release v1.0.0: Full feature set with all 6 tabs"
git push origin main
git push origin v1.0.0
```

### Step 10.3: Create GitHub Release
- Go to GitHub repository
- Create new release from v1.0.0 tag
- Add release notes from CHANGELOG
- Attach screenshots

---

## Git Commit History Summary

Your final git log should look like:
```
v1.0.0 - Release v1.0.0: Full feature set with all 6 tabs
docs: add comprehensive documentation, prototypes, and screenshots
feat: implement Color Vision simulation with severity control
feat: implement Contrast Checker with WCAG compliance testing
feat: implement Hue Rotate component with CSS filter preview
feat: implement Tints & Shades component with 10-step color scale
feat: implement Harmonies component with complementary, analogous, split-complementary, and triadic color schemes
feat: implement Tweaker component with RGB controls and quick adjustments
feat: add application shell with theme system and navigation
feat: add reusable Card and Swatch components
style: add utility CSS classes and base styles
feat: add color utility functions and constants
chore: add project configuration and basic README
chore: initial project setup with Create React App
```

---

## Next Steps

After v1.0.0, you can:
1. Add new features (export, save favorites, gradients, etc.)
2. Refactor components for better performance
3. Add tests
4. Deploy to GitHub Pages or Vercel
5. Continue iterating with meaningful commits!

Each feature gets its own commit, making it easy to track what changed and when.