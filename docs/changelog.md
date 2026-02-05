# Changelog

All notable changes to the Hex Tool project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Planned Features
- None at this time

## [1.0.0] - 2025-02-03

### Added - Initial Release
- **Color Tweaker Tab**
  - Individual RGB channel controls (+/-16, +/-1 buttons)
  - Quick adjustment buttons (Brighter, Darker, Warmer, Cooler, More Vibrant, More Muted)
  - Real-time hex code input and display
  - RGB decimal values shown alongside hex pairs

- **Harmonies Tab**
  - Complementary colors (180° rotation)
  - Split complementary (150°/210° rotation)
  - Analogous colors (±30° rotation)
  - Triadic colors (120° apart)
  - Click any generated color to set as new base

- **Tints & Shades Tab**
  - 10-step color scale (5 tints, base, 4 shades)
  - Pure color mixing (no opacity/transparency)
  - Perfect for design system color scales
  - Click any swatch to set as base

- **Hue Rotate Tab**
  - 13 color variations (0° to 360° in 30° steps)
  - CSS `hue-rotate()` filter preview
  - Shows actual CSS code for each rotation
  - Useful for CSS filter effects

- **Contrast Tab**
  - WCAG contrast ratio calculator
  - AA, AAA, and Large Text compliance badges
  - Live preview with text samples
  - Auto-generated high-contrast pairing
  - Editable contrast color input

- **Color Vision Tab**
  - Protanopia simulation (red-blind)
  - Deuteranopia simulation (green-blind)
  - Tritanopia simulation (blue-blind)
  - Severity slider (0 = normal, 1 = full anopia)
  - Side-by-side comparison view
  - Detailed RGB breakdown of simulated colors
  - Educational information about each CVD type

- **Theme System**
  - 5 background themes: Light, Dark, Navy, Forest, Burgundy
  - Theme affects entire interface (cards, text, borders)
  - Persists across tab changes
  - Quick theme switcher in header

- **Core Utilities**
  - Hex ↔ RGB conversion
  - RGB ↔ HSL conversion
  - Color clamping and validation
  - Relative luminance calculation
  - WCAG contrast ratio algorithm
  - CVD simulation matrices (Brettel method)

### Documentation
- Comprehensive README with project overview
- Project structure documentation
- Usage guide for each feature
- Learning goals and technology stack
- Prototype history preserved

## [0.4.0] - Prototype Phase 4 (Artifact)

### Added
- Hue rotation calculator
- Contrast checker
- Color vision simulation
- Theme switching
- Combined all features into single interface

### Changed
- Moved from separate artifacts to tabbed interface
- Consolidated all utilities into shared functions
- Improved mobile responsiveness
- Outgrew Claude

## [0.3.0] - Prototype Phase 3 (Artifact)

### Added
- Tints and shades generator

## [0.2.1] - Prototype Phase 2 (Artifact)

### Added
- Split complementary harmonies

## [0.2.0] - Prototype Phase 2 (Artifact)

### Added
- Color harmonies (complementary, analogous, triadic)
- Click-to-set-base functionality

### Changed
- Improved color swatch display
- Better organization of controls

## [0.1.0] - Prototype Phase 1 (Artifact)

### Added
- Basic hex code input
- RGB channel sliders
- Individual +/- adjustment buttons
- Quick adjustment presets (brighter, darker, warmer, cooler, etc.)
- Hex breakdown showing R, G, B components
- Decimal to hex conversion display

### Documentation
- Initial concept and learning goals
- Understanding of hex code structure
- RGB relationship to hex values

---

## Version History Summary

- **v1.0.0** - Full React application with all features
- **v0.4.0** - Combined prototype with all tabs
- **v0.3.0** - Added tints and shades
- **v0.2.0** - Added harmonies
- **v0.1.0** - Basic tweaker functionality

## Migration from Artifacts to React App

The project started as Claude.ai artifacts for rapid prototyping and learning. Key changes in the migration:

1. **Component Architecture**: Separated monolithic artifact into focused components for scaling
2. **File Organization**: Created proper `src/`, `components/`, and `utils/` structure
3. **State Management**: Centralized state in App.jsx with prop drilling (future: Context or Redux)
4. **Styling**: Maintained inline styles with theme system, potential future migration to CSS modules
5. **Build Process**: Added proper React build tooling (Claude used Create React App, I used Vite)
6. **Documentation**: Created comprehensive docs, changelog, and prototype archive

## Notes

- All prototype versions are preserved in `docs/prototypes/`
- Screenshots added in `docs/screenshots/` as features are completed
- See README.md for detailed feature descriptions and usage