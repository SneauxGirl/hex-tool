import { hexToRgb, rgbToHex, clamp, adjustSaturation } from '../utils/colorUtils';
import { RGB_CHANNELS, QUICK_ADJUSTMENTS } from '../utils/constants';
import Card from './shared/Card';

function Tweaker({ hex, setHex, t }) {
  const rgb = hexToRgb(`#${hex}`);

  // Adjust individual RGB channel
  const adjustChannel = (channel, amount) => {
    const newRgb = { ...rgb };
    newRgb[channel] = clamp(newRgb[channel] + amount);
    setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b).slice(1));
  };

  // Adjust all channels equally (brightness)
  const adjustAll = (amount) => {
    setHex(
      rgbToHex(
        clamp(rgb.r + amount),
        clamp(rgb.g + amount),
        clamp(rgb.b + amount)
      ).slice(1)
    );
  };

  // Adjust saturation
  const adjustSat = (factor) => {
    const adjusted = adjustSaturation(rgb.r, rgb.g, rgb.b, factor);
    setHex(rgbToHex(adjusted.r, adjusted.g, adjusted.b).slice(1));
  };

  // Make warmer (more red, less blue)
  const makeWarmer = () => {
    setHex(
      rgbToHex(
        clamp(rgb.r + 20),
        rgb.g,
        clamp(rgb.b - 20)
      ).slice(1)
    );
  };

  // Make cooler (less red, more blue)
  const makeCooler = () => {
    setHex(
      rgbToHex(
        clamp(rgb.r - 20),
        rgb.g,
        clamp(rgb.b + 20)
      ).slice(1)
    );
  };

  // Handle quick adjustments
  const handleQuickAdjustment = (id) => {
    switch (id) {
      case 'brighter':
        adjustAll(20);
        break;
      case 'darker':
        adjustAll(-20);
        break;
      case 'vibrant':
        adjustSat(1.3);
        break;
      case 'muted':
        adjustSat(0.7);
        break;
      case 'warmer':
        makeWarmer();
        break;
      case 'cooler':
        makeCooler();
        break;
      default:
        break;
    }
  };

  // RGB Row Component
  const RGBRow = ({ channel }) => {
    const { label, color, bgColor } = RGB_CHANNELS.find(c => c.id === channel);
    
    return (
      <div className="flex items-center justify-between gap-2">
        <span className="font-semibold w-14" style={{ color }}>
          {label}
        </span>
        <div className="flex gap-1 items-center">
          {[-16, -1, 1, 16].map((amount) => (
            <button
              key={amount}
              onClick={() => adjustChannel(channel, amount)}
              className="px-2 py-0.5 rounded text-xs font-mono hover:opacity-80 transition-opacity"
              style={{
                background: bgColor,
                color: t.text,
                border: `1px solid ${t.border}`
              }}
            >
              {amount > 0 ? `+${amount}` : amount}
            </button>
          ))}
          <span
            className="px-2 py-0.5 rounded font-mono text-sm w-9 text-center"
            style={{ background: t.border, color: t.text }}
          >
            {rgb[channel]}
          </span>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Individual RGB Controls */}
      <Card t={t} title="Individual Controls" subtitle="Adjust each color channel independently">
        <div className="space-y-2">
          <RGBRow channel="r" />
          <RGBRow channel="g" />
          <RGBRow channel="b" />
        </div>
      </Card>

      {/* Quick Adjustments */}
      <Card t={t} title="Quick Adjustments" subtitle="Common color transformations">
        <div className="grid grid-cols-2 gap-2">
          {QUICK_ADJUSTMENTS.map((adjustment) => (
            <button
              key={adjustment.id}
              onClick={() => handleQuickAdjustment(adjustment.id)}
              className="px-3 py-2 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
              style={{ background: adjustment.bg, color: '#1f2937' }}
            >
              {adjustment.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Info Card */}
      <Card t={t}>
        <div style={{ background: `${t.muted}15` }} className="rounded-lg p-3">
          <p style={{ color: t.muted }} className="text-xs leading-relaxed">
            <strong style={{ color: t.text }}>Tip:</strong> Use +/-16 buttons to adjust by one full hex digit 
            (e.g., 7A → 8A). Use +/-1 for fine control. Quick adjustments modify multiple channels 
            for common color transformations.
          </p>
        </div>
      </Card>
    </>
  );
}

export default Tweaker;