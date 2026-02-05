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