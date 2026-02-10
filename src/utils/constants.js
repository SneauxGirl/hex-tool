/**
 * Constants and Theme Definitions
 */

// ─── THEMES ────────────────────────────────────────────────────────────────

export const THEMES = {
  light: {
    bg: '#f3f4f6',
    card: '#ffffff',
    text: '#1f2937',
    muted: '#6b7280',
    border: '#e5e7eb',
    label: '#374151'
  },
  dark: {
    bg: '#1f2937',
    card: '#2d3748',
    text: '#f3f4f6',
    muted: '#9ca3af',
    border: '#4a5568',
    label: '#d1d5db'
  },
  navy: {
    bg: '#1a2332',
    card: '#243447',
    text: '#e2e8f0',
    muted: '#8899aa',
    border: '#334455',
    label: '#cbd5e0'
  },
  forest: {
    bg: '#1a2e1a',
    card: '#243524',
    text: '#e2f0e2',
    muted: '#88aa88',
    border: '#335533',
    label: '#cde0cd'
  },
  burgundy: {
    bg: '#2e1a1a',
    card: '#472424',
    text: '#f0e2e2',
    muted: '#aa8888',
    border: '#553333',
    label: '#e0cdcd'
  }
};

// ─── TABS ──────────────────────────────────────────────────────────────────

export const TABS = [
  { id: 'tweaker', label: 'Tweaker' },
  { id: 'harmonies', label: 'Harmonies' },
  { id: 'scale', label: 'Tints & Shades' },
  { id: 'huerotate', label: 'Hue Rotate' },
  { id: 'contrast', label: 'Contrast' },
  { id: 'colorblind', label: 'Color Vision' }
];

// ─── COLOR VISION DEFICIENCY TYPES ─────────────────────────────────────────

export const CVD_TYPES = [
  {
    id: 'protan',
    label: 'Protanopia',
    desc: 'Red-blind (L-cone)',
    detail: '~1% of males. Reduced/no red cone sensitivity. Reds appear dark/brown.'
  },
  {
    id: 'deutan',
    label: 'Deuteranopia',
    desc: 'Green-blind (M-cone)',
    detail: '~1.3% of males. Reduced/no green cone sensitivity. Greens appear brownish.'
  },
  {
    id: 'tritan',
    label: 'Tritanopia',
    desc: 'Blue-blind (S-cone)',
    detail: 'Rare (~0.002%). Reduced/no blue cone sensitivity. Blues appear greenish.'
  }
];

// ─── HARMONY DEFINITIONS ───────────────────────────────────────────────────

export const HARMONY_TYPES = [
  {
    id: 'complementary',
    title: 'Complementary',
    desc: 'Opposite on color wheel — maximum contrast',
    rotations: [0, 180]
  },
  {
    id: 'split-complementary',
    title: 'Split Complementary',
    desc: 'Softer contrast — balanced harmony',
    rotations: [0, 150, 210]
  },
  {
    id: 'analogous',
    title: 'Analogous',
    desc: 'Adjacent colors — harmonious blend',
    rotations: [-30, 0, 30]
  },
  {
    id: 'triadic',
    title: 'Triadic',
    desc: 'Evenly spaced — vibrant balance',
    rotations: [0, 120, 240]
  }
];

// ─── TINT/SHADE STEPS ──────────────────────────────────────────────────────

export const TINT_SHADE_STEPS = [
  { factor: 0.95, label: '95% Light', type: 'tint' },
  { factor: 0.85, label: '85% Light', type: 'tint' },
  { factor: 0.70, label: '70% Light', type: 'tint' },
  { factor: 0.50, label: '50% Light', type: 'tint' },
  { factor: 0.30, label: '30% Light', type: 'tint' },
  { factor: 1.00, label: 'Base', type: 'base' },
  { factor: 0.70, label: '30% Dark', type: 'shade' },
  { factor: 0.50, label: '50% Dark', type: 'shade' },
  { factor: 0.30, label: '70% Dark', type: 'shade' },
  { factor: 0.15, label: '85% Dark', type: 'shade' }
];

// ─── WCAG COMPLIANCE LEVELS ────────────────────────────────────────────────

export const WCAG_LEVELS = {
  AA_NORMAL: { ratio: 4.5, label: 'AA Normal' },
  AAA_NORMAL: { ratio: 7.0, label: 'AAA Normal' },
  AA_LARGE: { ratio: 3.0, label: 'AA Large Text' }
};

// ─── HUE ROTATION STEPS ────────────────────────────────────────────────────

export const HUE_ROTATION_STEPS = Array.from({ length: 13 }, (_, i) => i * 30);

// ─── COLOR NAMES BY HUE ────────────────────────────────────────────────────

export const getColorNameFromHue = (hue) => {
  if (hue < 15 || hue >= 345) return 'Red';
  if (hue < 45) return 'Orange';
  if (hue < 75) return 'Yellow-Orange';
  if (hue < 105) return 'Yellow';
  if (hue < 135) return 'Yellow-Green';
  if (hue < 165) return 'Green';
  if (hue < 195) return 'Cyan';
  if (hue < 225) return 'Light Blue';
  if (hue < 255) return 'Blue';
  if (hue < 285) return 'Blue-Purple';
  if (hue < 315) return 'Magenta';
  return 'Pink';
};

// ─── QUICK ADJUSTMENTS ─────────────────────────────────────────────────────

export const QUICK_ADJUSTMENTS = [
  { id: 'brighter', label: '☀️ Brighter', bg: '#fef08a', color: '#1f2937'},
  { id: 'darker', label: '🌙 Darker', bg: '#4a5568', color: '#FBFBFB' },
  { id: 'vibrant', label: '✨ More Vibrant', bg: '#e9d5ff', color: '#1f2937'},
  { id: 'muted', label: '🌫️ More Muted', bg: '#d1d5db', color: '#1f2937'},
  { id: 'warmer', label: '🔥 Warmer', bg: '#fed7aa', color: '#1f2937' },
  { id: 'cooler', label: '❄️ Cooler', bg: '#bfdbfe', color: '#1f2937' }
];

// ─── RGB CHANNEL INFO ──────────────────────────────────────────────────────

export const RGB_CHANNELS = [
  { id: 'r', label: 'Red', color: '#ef4444', bgColor: 'rgba(239,68,68,0.15)' },
  { id: 'g', label: 'Green', color: '#22c55e', bgColor: 'rgba(34,197,94,0.15)' },
  { id: 'b', label: 'Blue', color: '#3b82f6', bgColor: 'rgba(59,130,246,0.15)' }
];