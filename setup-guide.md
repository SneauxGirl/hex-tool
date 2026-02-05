# Incremental Setup Guide - Vite + React

Build your Hex Tool project from scratch with Vite, following professional development practices with meaningful git commits at each step.

**Terminal Guide:**
- 💻 **VS Code Terminal** - Use for ALL steps (we'll stay in one tool throughout)

---

## Phase 1: Project Initialization (VS Code Terminal)

### Step 1.1: Open VS Code and Terminal

### Step 1.2: Navigate to Projects Folder
```bash
cd ~/path/to/your/projects/folder
```

### Step 1.3: Create Project with Vite
```bash
npm create vite@latest
```
Follow the prompts:
```
? Need to install the following packages: create-vite@latest
  Ok to proceed? (y) 
```
? Project name: hex-tool
```
? Select a framework: React
```
? Select a variant: JavaScript
```
? Use Rolldown (beta)? (y/N) N
```
? Install and start now? (y/N) y

Vite will:
- Create the project
- Install dependencies
- Start dev server on `http://localhost:5173`

### Step 1.4: Verify Project Running
Open browser to `http://localhost:5173` - you should see the default Vite + React spinning logo page.

### Step 1.5: Stop Dev Server
In VS Code Terminal, press **Ctrl + C** to stop the server.

### Step 1.6: Open Project in VS Code
```bash
cd hex-tool
```
Open folder in VS Code to load the project:
1. **File → Open Folder**
2. Navigate to and select `hex-tool`
3. Click **Open**

Check the terminal to be sure you're still in the correct folder.

---

## Phase 2: Clean Up Default Files (VS Code Terminal)

Vite creates several default files we need to clean up or remove.

### Step 2.1: Remove Unnecessary Files as needed
```bash
rm src/App.css
rm src/assets/react.svg
rm public/vite.svg
```

### Step 2.2: Update index.css

**DO NOT DELETE `src/index.css`** - we'll replace its contents.

1. Open `src/index.css` in VS Code
2. Select all (Cmd + A)
3. Delete selected content
4. Paste the following:

```css
/* ═══════════════════════════════════════════════════════════════════════════
   HEX TOOL - BASE STYLES
   ═══════════════════════════════════════════════════════════════════════════ */

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
}

input:focus,
button:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* ─── UTILITY CLASSES ─────────────────────────────────────────────────────── */

/* Padding */
.p-4 { padding: 1rem; }
.p-3 { padding: 0.75rem; }
.p-2 { padding: 0.5rem; }
.px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
.px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
.py-0\.5 { padding-top: 0.125rem; padding-bottom: 0.125rem; }
.py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
.py-1\.5 { padding-top: 0.375rem; padding-bottom: 0.375rem; }
.py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }

/* Margin */
.mb-3 { margin-bottom: 0.75rem; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-1 { margin-bottom: 0.25rem; }
.mt-1 { margin-top: 0.25rem; }
.mt-0\.5 { margin-top: 0.125rem; }
.ml-auto { margin-left: auto; }

/* Gap */
.gap-1 { gap: 0.25rem; }
.gap-1\.5 { gap: 0.375rem; }
.gap-2 { gap: 0.5rem; }
.gap-3 { gap: 0.75rem; }

/* Display & Layout */
.flex { display: flex; }
.grid { display: grid; }
.grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }

.flex-wrap { flex-wrap: wrap; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.space-y-2 > * + * { margin-top: 0.5rem; }

/* Border Radius */
.rounded { border-radius: 0.25rem; }
.rounded-lg { border-radius: 0.5rem; }
.rounded-xl { border-radius: 0.75rem; }
.rounded-full { border-radius: 9999px; }
.border-2 { border-width: 2px; }

/* Typography */
.text-xs { font-size: 0.75rem; line-height: 1rem; }
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }
.text-lg { font-size: 1.125rem; line-height: 1.75rem; }
.text-xl { font-size: 1.25rem; line-height: 1.75rem; }
.text-2xl { font-size: 1.5rem; line-height: 2rem; }

.font-bold { font-weight: 700; }
.font-semibold { font-weight: 600; }
.font-mono { font-family: ui-monospace, monospace; }

.text-center { text-align: center; }
.text-right { text-align: right; }
.truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.capitalize { text-transform: capitalize; }

/* Sizing */
.w-7 { width: 1.75rem; }
.w-9 { width: 2.25rem; }
.w-14 { width: 3.5rem; }
.w-16 { width: 4rem; }
.w-20 { width: 5rem; }
.w-36 { width: 9rem; }
.w-full { width: 100%; }
.h-7 { height: 1.75rem; }
.h-9 { height: 2.25rem; }
.h-14 { height: 3.5rem; }

/* Containers */
.max-w-4xl { max-width: 56rem; }
.mx-auto { margin-left: auto; margin-right: auto; }

/* Interactive */
.cursor-pointer { cursor: pointer; }
.flex-shrink-0 { flex-shrink: 0; }

/* Transitions */
.hover\:opacity-80:hover { opacity: 0.8; }
.hover\:opacity-90:hover { opacity: 0.9; }
.transition-opacity { transition-property: opacity; transition-duration: 150ms; }
.transition-all { transition-property: all; transition-duration: 150ms; }

/* Misc */
.leading-relaxed { line-height: 1.625; }
.opacity-75 { opacity: 0.75; }
.accent-blue-500::-webkit-slider-thumb { accent-color: #3b82f6; }

/* ─── RESPONSIVE ──────────────────────────────────────────────────────────── */

@media (min-width: 640px) {
  .sm\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .sm\:grid-cols-5 { grid-template-columns: repeat(5, minmax(0, 1fr)); }
}

@media (min-width: 1024px) {
  .lg\:grid-cols-5 { grid-template-columns: repeat(5, minmax(0, 1fr)); }
}
```

5. Save the file (Cmd + S)

### Step 2.3: Update App.jsx

**DO NOT DELETE `src/App.jsx`** - we'll replace its contents.

1. Open `src/App.jsx` in VS Code
2. Select all (Cmd + A)
3. Delete selected content
4. Paste this temporary placeholder:

```jsx
function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>🎨 Hex Tool</h1>
      <p>Project initialized! Ready to build.</p>
    </div>
  );
}

export default App;
```

5. Save the file (Cmd + S)

### Step 2.4: Update main.jsx - REMOVE STRICT MODE

**⚠️ IMPORTANT: Strict Mode Causes Production Issues**

Vite creates `src/main.jsx` with React StrictMode enabled. This causes double-rendering in development and can prevent production deployment.

1. Open `src/main.jsx` in VS Code
2. Find this code:

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

3. Select all (Cmd + A)
4. Delete and replace with:

```jsx
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <App />
)
```

**What changed:**
- ❌ Removed `import { StrictMode }` 
- ❌ Removed `<StrictMode>` wrapper tags
- ✅ App now renders normally without double-mounting

5. Save the file (Cmd + S)

### Step 2.5: Test Clean Setup
```bash
npm run dev
```

Open `http://localhost:5173` - you should see your "Project initialized!" message with no animations.

Press `Ctrl + C` in terminal to stop the server.

### Step 2.6: First Commit
```bash
git add .
git commit -m "chore: clean up default Vite files and remove StrictMode"
```

**Commit Notes:**
- Removed unused default assets (spinning logos, CSS)
- Replaced default styles with utility classes
- **Removed StrictMode to prevent production deployment issues**
- Created minimal App placeholder

---

## Phase 3: Project Configuration (VS Code Terminal)

### Step 3.1: Verify .gitignore Exists

Vite creates `.gitignore` automatically. Verify it contains:

```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```

If missing, create it with this content.

### Step 3.2: Update package.json

1. Open `package.json` in VS Code
2. Add these fields **after** the `"type": "module"` line:

```json
{
  "name": "hex-tool",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "description": "A comprehensive color tool for designers and developers",
  "keywords": [
    "color",
    "hex",
    "color-picker",
    "design-tools",
    "accessibility",
    "wcag",
    "color-blindness",
    "color-theory",
    "react",
    "vite"
  ],
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/hex-tool.git"
  },
  "scripts": {
    ...existing scripts...
  },
  ...rest of file...
}
```

3. Save the file

### Step 3.3: Create README.md

Create `README.md` in the root (same level as `package.json`):

```markdown
# 🎨 Hex Tool

A comprehensive web-based color tool for designers and developers.

## Status: In Development

Currently building out core features.

## Tech Stack

- **React** - UI framework
- **Vite** - Build tool and dev server
- **Vanilla CSS** - Utility-first styling (no framework dependencies)

## Quick Start

\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
\`\`\`

## Development

The app runs on `http://localhost:5173` during development.

## License

MIT
```

### Step 3.4: Commit Configuration
```bash
git add .gitignore package.json README.md
git commit -m "chore: add project configuration and README"
```

---

## Phase 4: Utility Layer (VS Code Terminal)

### Step 4.1: Create Directory Structure
```bash
mkdir -p src/utils
```

### Step 4.2: Create colorUtils.js

1. Right-click `src/utils` folder in VS Code Explorer
2. Select "New File"
3. Name it `colorUtils.js`
4. Copy the entire `colorUtils.js` content from the artifacts
5. Paste into the file
6. Save (Cmd + S)

### Step 4.3: Create constants.js

1. Right-click `src/utils` folder
2. New File → `constants.js`
3. Copy the entire `constants.js` content from the artifacts
4. Paste and save

### Step 4.4: Test Utilities

Update `src/App.jsx` to test the utilities:

1. Open `src/App.jsx`
2. Select all and replace with:

```jsx
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
```

3. Save the file

### Step 4.5: Run and Verify
```bash
npm run dev
```

Open `http://localhost:5173` and verify:
- ✅ Page loads without errors
- ✅ Console shows correct test outputs
- ✅ Page displays RGB and Hex test results

Press `Ctrl + C` to stop server.

### Step 4.6: Commit Utilities
```bash
git add src/utils/
git commit -m "feat: add color utility functions and constants"
```

---

## Phase 5: Shared Components (VS Code Terminal)

### Step 5.1: Create Components Directory
```bash
mkdir -p src/components/shared
```

### Step 5.2: Create Card.jsx

1. Right-click `src/components/shared`
2. New File → `Card.jsx`
3. Copy the `Card.jsx` content from artifacts
4. Paste and save

### Step 5.3: Create Swatch.jsx

1. Right-click `src/components/shared`
2. New File → `Swatch.jsx`
3. Copy the `Swatch.jsx` content from artifacts
4. Paste and save

### Step 5.4: Commit Shared Components
```bash
# VS Code Terminal
git add src/components/shared/
git commit -m "feat: add reusable Card and Swatch components"
```

---

## Phase 6: Main Application Shell (VS Code Terminal)

### Step 6.1: Update App.jsx with Full Shell

**DO NOT DELETE App.jsx** - Replace its contents:

1. Open `src/App.jsx`
2. Select all (Cmd + A) and delete
3. Copy the complete `App.jsx` content from artifacts
4. Paste and save

### Step 6.2: Create Stub Components

Create these 6 component files in `src/components/`:

**Tweaker.jsx:**
```jsx
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

**Harmonies.jsx:**
```jsx
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

**TintsShades.jsx:**
```jsx
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

**HueRotate.jsx:**
```jsx
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

**Contrast.jsx:**
```jsx
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

**ColorVision.jsx:**
```jsx
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
npm run dev
```

Open `http://localhost:5173` and verify:
- ✅ App loads without errors
- ✅ Theme switcher works (try all 5 themes)
- ✅ Hex input accepts values and updates
- ✅ RGB breakdown displays correctly
- ✅ All 6 tabs are clickable
- ✅ Each tab shows stub "Coming soon" content

Press `Ctrl + C` to stop.

### Step 6.4: Commit Application Shell
```bash
git add src/App.jsx src/components/
git commit -m "feat: add application shell with theme system and navigation"
```

---

## Phase 7: Implement Tweaker Component (VS Code Terminal)

### Step 7.1: Replace Tweaker.jsx

**DO NOT DELETE Tweaker.jsx** - Replace its contents:

1. Open `src/components/Tweaker.jsx`
2. Select all (Cmd + A) and delete
3. Copy the complete `Tweaker.jsx` implementation from artifacts
4. Paste and save

### Step 7.2: Test Tweaker
```bash
npm run dev
```

Test Tweaker tab:
- ✅ Individual RGB controls (+/-16, +/-1 buttons)
- ✅ Values update in real-time
- ✅ Quick adjustments work (all 6 buttons)
- ✅ Values clamp correctly (0-255)
- ✅ Color preview updates

Press `Ctrl + C` to stop.

### Step 7.3: Commit First Feature
```bash
git add src/components/Tweaker.jsx
git commit -m "feat: implement Tweaker component with RGB controls and quick adjustments"
```

---

## Phase 8: Implement Remaining Components (VS Code Terminal)

For each component, follow this pattern:
1. Open the stub file
2. Select all and delete
3. Copy implementation from Phase 8 sections above (in original guide)
4. Paste and save
5. Test with `npm run dev`
6. Commit with descriptive message

### Step 8.1: Harmonies
```bash
# After implementing
git add src/components/Harmonies.jsx
git commit -m "feat: implement Harmonies component with complementary, analogous, split-complementary, and triadic color schemes"
```

### Step 8.2: Tints & Shades
```bash
git add src/components/TintsShades.jsx
git commit -m "feat: implement Tints & Shades component with 10-step color scale"
```

### Step 8.3: Hue Rotate
```bash
git add src/components/HueRotate.jsx
git commit -m "feat: implement Hue Rotate component with CSS filter preview"
```

### Step 8.4: Contrast
```bash
git add src/components/Contrast.jsx
git commit -m "feat: implement Contrast Checker with WCAG compliance testing"
```

### Step 8.5: Color Vision
```bash
git add src/components/ColorVision.jsx
git commit -m "feat: implement Color Vision simulation with severity control"
```

---

## Phase 9: Documentation (VS Code Terminal)

### Step 9.1: Create Documentation Structure
```bash
mkdir -p docs/prototypes docs/screenshots
```

### Step 9.2: Add Files

Create these files by right-clicking `docs/` folder:

**docs/CHANGELOG.md** - Copy from artifacts
**docs/prototypes/README.md** - Copy from artifacts
**docs/prototypes/v1-basic-tweaker.jsx** - Save artifact v1 code
**docs/prototypes/v2-with-harmonies.jsx** - Save artifact v2 code
**docs/prototypes/v3-full-suite.jsx** - Save artifact v3 code

### Step 9.3: Take Screenshots

While dev server is running (`npm run dev`):
1. Take screenshots of each tab
2. Take screenshots in different themes
3. Save to `docs/screenshots/`

Suggested filenames:
- `main-interface.png`
- `tweaker-tab.png`
- `harmonies-tab.png`
- `tints-shades-tab.png`
- `hue-rotate-tab.png`
- `contrast-tab.png`
- `colorvision-tab.png`
- `theme-comparison.png`

### Step 9.4: Update Main README

Replace root `README.md` with the full version from artifacts, updating:
- Screenshot paths to `docs/screenshots/`
- Vite-specific commands (`npm run dev` not `npm start`)

### Step 9.5: Commit Documentation
```bash
git add docs/ README.md
git commit -m "docs: add comprehensive documentation, prototypes, and screenshots"
```

---

## Phase 10: Production Build & Release (VS Code Terminal)

### Step 10.1: Test Production Build
```bash
npm run build
```

This creates `dist/` folder with optimized production files.

```bash
# Preview production build
npm run preview
```

Opens on `http://localhost:4173` - test all features.

Press `Ctrl + C` to stop.

### Step 10.2: Verify No StrictMode Issues

✅ Since we removed StrictMode in Phase 2, production build should work without issues.

If you see any errors, check:
- Console for errors
- All components render correctly
- No double-mounting issues

### Step 10.3: Create Release Tag
```bash
git tag -a v1.0.0 -m "Release v1.0.0: Full feature set with all 6 tabs"
git push origin main
git push origin v1.0.0
```

---

## Summary: Vite vs Create React App

### Key Differences You'll Notice:

| Aspect | Vite | Create React App |
|--------|------|------------------|
| **Dev Server** | `npm run dev` | `npm start` |
| **Port** | 5173 | 3000 |
| **Speed** | ⚡ Much faster | Slower |
| **index.html** | Root folder | `public/` folder |
| **Entry File** | `main.jsx` | `index.js` |
| **Config** | `vite.config.js` | Hidden (ejected) |
| **Build Output** | `dist/` | `build/` |

### StrictMode Removal Rationale:

**Why we removed it:**
- Causes double-rendering in development (components mount twice)
- Can cause issues with production deployment
- Makes debugging more difficult for learning
- Not required for React to work correctly

**When you might want it back:**
- When you're comfortable with React
- When building large production apps
- When you need to catch deprecated APIs

---

## Final Git History

Your commits should look like:
```
✅ v1.0.0 - Release v1.0.0: Full feature set with all 6 tabs
✅ docs: add comprehensive documentation, prototypes, and screenshots
✅ feat: implement Color Vision simulation with severity control
✅ feat: implement Contrast Checker with WCAG compliance testing
✅ feat: implement Hue Rotate component with CSS filter preview
✅ feat: implement Tints & Shades component with 10-step color scale
✅ feat: implement Harmonies component with color schemes
✅ feat: implement Tweaker component with RGB controls
✅ feat: add application shell with theme system and navigation
✅ feat: add reusable Card and Swatch components
✅ feat: add color utility functions and constants
✅ chore: add project configuration and README
✅ chore: clean up default Vite files and remove StrictMode
```

---

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### Module Not Found
- Check file paths match exactly (case-sensitive!)
- Verify imports use `.jsx` extension where needed
- Restart dev server

### Styles Not Applying
- Check `index.css` is imported in `main.jsx`
- Clear browser cache (Cmd + Shift + R)
- Check class names match exactly (including escapes like `py-0\.5`)

---

## Next Steps After v1.0.0

1. Deploy to Vercel/Netlify
2. Add new features (export palettes, gradients, etc.)
3. Optimize performance
4. Add tests
5. Refactor components if needed

Happy building! 🚀