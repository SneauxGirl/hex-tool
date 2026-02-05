/**
 * THIS IS THE REACTOR CORE
 * Color Utilities
 * All color conversion and manipulation functions
 */

// ─── BASIC CONVERSIONS ─────────────────────────────────────────────────────

/**
 * Clamp a value between 0 and 255
 */
export const clamp = (value) => Math.max(0, Math.min(255, value));

/**
 * Convert a number to 2-digit hex string
 */
export const toHex = (value) => clamp(value).toString(16).padStart(2, '0').toUpperCase();

/**
 * Convert hex color to RGB object
 * @param {string} hex - Hex color (with or without #)
 * @returns {object} {r, g, b} values 0-255
 */
export const hexToRgb = (hex) => {
  const clean = hex.replace('#', '');
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16)
  };
};

/**
 * Convert RGB to hex color
 * @param {number} r - Red (0-255)
 * @param {number} g - Green (0-255)
 * @param {number} b - Blue (0-255)
 * @returns {string} Hex color with #
 */
export const rgbToHex = (r, g, b) => `#${toHex(r)}${toHex(g)}${toHex(b)}`;

/**
 * Convert RGB to HSL
 * @param {number} r - Red (0-255)
 * @param {number} g - Green (0-255)
 * @param {number} b - Blue (0-255)
 * @returns {object} {h: 0-360, s: 0-100, l: 0-100}
 */
export const rgbToHsl = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
      default: break;
    }
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
};

/**
 * Convert HSL to RGB
 * @param {number} h - Hue (0-360)
 * @param {number} s - Saturation (0-100)
 * @param {number} l - Lightness (0-100)
 * @returns {object} {r, g, b} values 0-255
 */
export const hslToRgb = (h, s, l) => {
  h /= 360;
  s /= 100;
  l /= 100;

  if (s === 0) {
    const val = Math.round(l * 255);
    return { r: val, g: val, b: val };
  }

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

  return {
    r: Math.round(hue2rgb(p, q, h + 1/3) * 255),
    g: Math.round(hue2rgb(p, q, h) * 255),
    b: Math.round(hue2rgb(p, q, h - 1/3) * 255)
  };
};

// ─── COLOR MANIPULATION ────────────────────────────────────────────────────

/**
 * Rotate hue of a color
 * @param {string} hex - Hex color
 * @param {number} degrees - Degrees to rotate (0-360)
 * @returns {string} New hex color
 */
export const rotateHue = (hex, degrees) => {
  const { r, g, b } = hexToRgb(hex);
  const hsl = rgbToHsl(r, g, b);
  const newHue = (hsl.h + degrees) % 360;
  const rgb = hslToRgb(newHue, hsl.s, hsl.l);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
};

/**
 * Create a tint (mix with white)
 * @param {number} r - Red (0-255)
 * @param {number} g - Green (0-255)
 * @param {number} b - Blue (0-255)
 * @param {number} factor - Amount to mix (0-1)
 * @returns {string} Hex color
 */
export const createTint = (r, g, b, factor) => {
  return rgbToHex(
    Math.round(r + (255 - r) * factor),
    Math.round(g + (255 - g) * factor),
    Math.round(b + (255 - b) * factor)
  );
};

/**
 * Create a shade (mix with black)
 * @param {number} r - Red (0-255)
 * @param {number} g - Green (0-255)
 * @param {number} b - Blue (0-255)
 * @param {number} factor - Amount remaining (0-1)
 * @returns {string} Hex color
 */
export const createShade = (r, g, b, factor) => {
  return rgbToHex(
    Math.round(r * factor),
    Math.round(g * factor),
    Math.round(b * factor)
  );
};

/**
 * Adjust saturation
 * @param {number} r - Red (0-255)
 * @param {number} g - Green (0-255)
 * @param {number} b - Blue (0-255)
 * @param {number} factor - Multiplier (>1 more saturated, <1 less saturated)
 * @returns {object} {r, g, b}
 */
export const adjustSaturation = (r, g, b, factor) => {
  const avg = (r + g + b) / 3;
  return {
    r: Math.round(avg + (r - avg) * factor),
    g: Math.round(avg + (g - avg) * factor),
    b: Math.round(avg + (b - avg) * factor)
  };
};

// ─── CONTRAST & ACCESSIBILITY ──────────────────────────────────────────────

/**
 * Calculate relative luminance (WCAG)
 * @param {number} r - Red (0-255)
 * @param {number} g - Green (0-255)
 * @param {number} b - Blue (0-255)
 * @returns {number} Relative luminance (0-1)
 */
export const relativeLuminance = (r, g, b) => {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

/**
 * Calculate contrast ratio (WCAG)
 * @param {object} rgb1 - {r, g, b}
 * @param {object} rgb2 - {r, g, b}
 * @returns {number} Contrast ratio (1-21)
 */
export const contrastRatio = (rgb1, rgb2) => {
  const l1 = relativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = relativeLuminance(rgb2.r, rgb2.g, rgb2.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * Generate ideal contrast color (black or white)
 * @param {string} hex - Hex color
 * @returns {string} '#1C1410' or '#FAF7F5'
 */
export const getIdealContrast = (hex) => {
  const { r, g, b } = hexToRgb(hex);
  const lum = relativeLuminance(r, g, b);
  return lum > 0.3 ? '#1C1410' : '#FAF7F5';
};

// ─── COLOR VISION DEFICIENCY ───────────────────────────────────────────────

/**
 * Simulate color vision deficiency using Brettel method (simplified)
 * @param {number} r - Red (0-255)
 * @param {number} g - Green (0-255)
 * @param {number} b - Blue (0-255)
 * @param {string} type - 'protan', 'deutan', or 'tritan'
 * @param {number} severity - 0 (normal) to 1 (full anopia)
 * @returns {object} {r, g, b} simulated values
 */
export const simulateCVD = (r, g, b, type, severity) => {
  if (severity === 0) return { r, g, b };

  // CVD transformation matrices (Brettel method simplified)
  const matrices = {
    protan: [
      [0.152286, 1.052583, -0.204868],
      [0.114503, 0.786281, 0.097216],
      [0.011516, 0.204548, 0.784936]
    ],
    deutan: [
      [0.367322, 0.860646, -0.227968],
      [0.280085, 0.672501, 0.047416],
      [-0.011820, 0.042940, 0.968880]
    ],
    tritan: [
      [1.255528, -0.076749, -0.178779],
      [-0.078411, 0.930809, 0.147602],
      [0.004733, 0.691247, 0.304019]
    ]
  };

  const m = matrices[type];
  const nr = m[0][0] * r + m[0][1] * g + m[0][2] * b;
  const ng = m[1][0] * r + m[1][1] * g + m[1][2] * b;
  const nb = m[2][0] * r + m[2][1] * g + m[2][2] * b;

  return {
    r: Math.round(clamp(r + severity * (nr - r))),
    g: Math.round(clamp(g + severity * (ng - g))),
    b: Math.round(clamp(b + severity * (nb - b)))
  };
};

// ─── VALIDATION ────────────────────────────────────────────────────────────

/**
 * Validate hex color string
 * @param {string} hex - Hex color (with or without #)
 * @returns {boolean} Is valid hex color
 */
export const isValidHex = (hex) => {
  const clean = hex.replace('#', '');
  return /^[0-9A-Fa-f]{6}$/.test(clean);
};

/**
 * Ensure hex has exactly 6 characters, pad if needed
 * @param {string} hex - Hex string (without #)
 * @returns {string} 6-character hex (without #)
 */
export const normalizeHex = (hex) => {
  return hex.padEnd(6, '0').slice(0, 6).toUpperCase();
};