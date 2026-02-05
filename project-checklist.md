Checklist as provided by Claude

## NOTE: FOLLOW SETUP-GUIDE over Checklist ##
Claude created large discrepancies between the Checklist and Setup-Guide
TODO: Review and update for historic consistency.
Where the Checklist and Setup-Guide differ, use the Setup-Guide
## Change notes show as double indent with *

# Project Setup Checklist

Use this checklist to set up your Hex Tool project step-by-step.
Use VS Code for all terminal commands
Use Vite to create React project

## ✅ Phase 1: Initial Setup

    * [ ] Open VS Code terminal and `cd ~/Nav/To/Projects`
- [ ] Run `npx create vite@latest`
- [ ] Name project: `hex-tool`
    * [ ] Select: React, JS
    * [ ] Confirm running on `http://localhost:5173`
    * [ ] Close with `ctrl+c`
    * [ ] Navigate back to hex-tool folder `cd ..`
- [ ] Create directory structure: (SETUP addslater but it doesn't hurt to add them now)
  - [ ] `mkdir -p src/components/shared`
  - [ ] `mkdir -p src/utils`
  - [ ] `mkdir -p docs/prototypes`
  - [ ] `mkdir -p docs/screenshots`
- [ ] Remove unused default files: (file name updates only)
  * [ ] `rm src/assets/react.svg`
  * [ ] `rm public/vite.svg`

## ✅ Phase 2: Core Files

### * Main App - moved from end, recommend this order (reversed)
  * [ ] Update `src/index.css` with utility classes (see SETUP-GUIDE.md)
    * [ ] Copy text code from `SETUP-GUIDE.md` to `src/App.jsx` (replace existing) and check on host

    ## ✅ * Phase 5: Git Setup *

    - [ ] Run `git init`
    - [ ] Create `.gitignore` (should already exist from CRA)
    - [ ] Review staged files
    - [ ] Initial commit: `git commit -m "Initial commit: v1.0.0 with Tweaker"`
    - [ ] Create GitHub repository
    - [ ] Add remote: `git remote add origin <your-repo-url>`
    - [ ] Push: `git push -u origin main`

  ### * Root Directory - to align with SETUP-GUIDE
- [ ] Update `package.json` (add keywords, author, repo info)
 [ ] Copy `README.md` to root - Kept the larger README from separate Claude file download
- [ ] Copy `SETUP-GUIDE.md` to root
- [ ] Copy `PROJECT-CHECKLIST.md` (this file) to root

### Documentation (not in Setup?)
- [ ] Copy `CHANGELOG.md` to `docs/CHANGELOG.md`
- [ ] Create `docs/prototypes/README.md`
- [ ] Save artifact v1 code to `docs/prototypes/v1-basic-tweaker.jsx`
- [ ] Save artifact v2 code to `docs/prototypes/v2-with-harmonies.jsx`
- [ ] Save artifact v2.1 code to `docs/prototypes/v2-1-with-split-comp.jsx`
- [ ] Save artifact v3 code to `docs/prototypes/v3-add-shades-tints.jsx`
    * [ ] Create and save screenshots of visible changes to docs

### Utilities
- [ ] Copy `colorUtils.js` to `src/utils/colorUtils.js`
- [ ] Copy `constants.js` to `src/utils/constants.js`

### Shared Components
- [ ] Copy `Card.jsx` to `src/components/shared/Card.jsx`
- [ ] Copy `Swatch.jsx` to `src/components/shared/Swatch.jsx`

### * Main App Again
    * [ ] Copy code from artifact `App.js` to `src/App.jsx` (replace existing)

## ✅ Phase 3: Feature Components

### Create Component Files

- [ ] Create `src/components/Tweaker.jsx` (STUB - see SETUP-GUIDE.md)
- [ ] Create `src/components/Harmonies.jsx` (STUB)
- [ ] Create `src/components/TintsShades.jsx` (STUB)
- [ ] Create `src/components/HueRotate.jsx` (STUB)
- [ ] Create `src/components/Contrast.jsx` (STUB)
- [ ] Create `src/components/ColorVision.jsx` (STUB)

### Verify Imports

- [ ] Check all components are imported in `App.jsx`
- [ ] Verify utility functions are exported correctly
- [ ] Confirm constants are imported where needed

    * [ ] Update `src/components/Tweaker.jsx` (COMPLETE - copy from artifacts)

## ✅ Phase 4: Testing

- [ ] Run `npm start`
- [ ] Verify app loads at `http://localhost:3000`
- [ ] Test Tweaker tab:
  - [ ] Hex input accepts valid values
  - [ ] RGB breakdown displays correctly
  - [ ] Individual channel buttons work
  - [ ] Quick adjustment buttons work
- [ ] Test theme switcher:
  - [ ] All 5 themes switch properly
  - [ ] Text remains readable in all themes
- [ ] Test tab navigation:
  - [ ] All tabs are clickable
  - [ ] Stub components show placeholder text
- [ ] Test responsive design:
  - [ ] Resize browser window
  - [ ] Check mobile view

    ## ✅ Phase 5: Git Setup - moved to Phase 2 per setup-guide


## ✅ Phase 6: Implement Remaining Components

Work through each component systematically:

### Harmonies Component
- [ ] Copy harmony generation logic from artifact
- [ ] Use `rotateHue()` utility
- [ ] Display with `Swatch` components
- [ ] Add click handlers to set base color
- [ ] Test all harmony types
- [ ] Commit: `git commit -m "Add Harmonies component"`

### Tints & Shades Component
- [ ] Implement tint/shade generation
- [ ] Use `createTint()` and `createShade()` utilities
- [ ] Create 10-step scale
- [ ] Make swatches clickable
- [ ] Test color scale generation
- [ ] Commit: `git commit -m "Add Tints & Shades component"`

### Hue Rotate Component
- [ ] Generate 13 hue rotations (0-360° in 30° steps)
- [ ] Display CSS filter code
- [ ] Show color names
- [ ] Add click to set handlers
- [ ] Test all rotations
- [ ] Commit: `git commit -m "Add Hue Rotate component"`

### Contrast Component
- [ ] Implement contrast ratio calculation
- [ ] Add editable contrast color input
- [ ] Show WCAG compliance badges
- [ ] Create live preview
- [ ] Test with various color combinations
- [ ] Commit: `git commit -m "Add Contrast Checker component"`

### Color Vision Component
- [ ] Implement CVD simulation
- [ ] Add severity slider
- [ ] Show side-by-side comparison
- [ ] Display RGB breakdowns
- [ ] Add educational info
- [ ] Test all CVD types
- [ ] Commit: `git commit -m "Add Color Vision simulation component"`

## ✅ Phase 7: Polish & Documentation

- [ ] Take screenshots of each tab
- [ ] Add screenshots to `docs/screenshots/`
- [ ] Update README.md with actual screenshots
- [ ] Write usage examples for each feature
- [ ] Add keyboard shortcuts (if implemented)
- [ ] Test on different browsers
- [ ] Update CHANGELOG.md with completion notes
- [ ] Create v1.0.0 release tag: `git tag -a v1.0.0 -m "Release v1.0.0"`
- [ ] Push tags: `git push --tags`

## ✅ Phase 8: Future Features (Optional)

Consider adding these features next:

- [ ] Export palettes (CSS, SCSS, JSON, PNG)
- [ ] Save favorite colors to localStorage
- [ ] Import colors from images
- [ ] Gradient generator
- [ ] Color history/undo
- [ ] Keyboard shortcuts
- [ ] Share palette via URL
- [ ] Color naming suggestions
- [ ] More CVD types
- [ ] Batch operations

## 📝 Notes

**Current Status:** `[Fill in current phase]`

**Completed:** `[List completed components]`

**In Progress:** `[Current component being worked on]`

**Blockers:** `[Any issues encountered]`

---

**Remember:** Commit often with clear messages. Document as you go. Test thoroughly before moving to the next component.