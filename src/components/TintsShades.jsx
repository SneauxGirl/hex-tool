import { useMemo, useState } from 'react';
import Card from './shared/Card';
import Swatch from './shared/Swatch';
import { hexToRgb, createTint, createShade } from '../utils/colorUtils';
import { TINT_SHADE_STEPS } from '../utils/constants';

function TintsShades({ hex, setHex, t }) {
  const { r, g, b } = hexToRgb(`#${hex}`);
  const [mixKind, setMixKind] = useState('tint');
  const [percentInput, setPercentInput] = useState('50');

  const clampedPercent = useMemo(() => {
    const n = parseFloat(percentInput);
    if (Number.isNaN(n)) return 0;
    return Math.max(0, Math.min(100, n));
  }, [percentInput]);

  const exactHex = useMemo(() => {
    if (mixKind === 'tint') {
      return createTint(r, g, b, clampedPercent / 100);
    }
    return createShade(r, g, b, 1 - clampedPercent / 100);
  }, [r, g, b, mixKind, clampedPercent]);

  const exactLabel = mixKind === 'tint' ? `${clampedPercent}% light` : `${clampedPercent}% dark`;

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
      <div
        className="mb-4 rounded-lg border p-3 flex flex-wrap items-end gap-3"
        style={{ borderColor: t.border }}
      >
        <div className="flex flex-col gap-2 min-w-[200px] flex-1">
          <span style={{ color: t.muted }} className="text-xs font-semibold uppercase tracking-wide">
            Exact percentage
          </span>
          <div className="flex flex-wrap gap-1">
            <button
              type="button"
              onClick={() => setMixKind('tint')}
              className="px-3 py-1.5 rounded-lg text-sm font-semibold"
              style={{
                background: mixKind === 'tint' ? '#267fd9' : t.card,
                color: mixKind === 'tint' ? '#fff' : t.text,
                border: `1px solid ${t.border}`
              }}
            >
              Lighter
            </button>
            <button
              type="button"
              onClick={() => setMixKind('shade')}
              className="px-3 py-1.5 rounded-lg text-sm font-semibold"
              style={{
                background: mixKind === 'shade' ? '#267fd9' : t.card,
                color: mixKind === 'shade' ? '#fff' : t.text,
                border: `1px solid ${t.border}`
              }}
            >
              Darker
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label htmlFor="tint-shade-exact-percent" style={{ color: t.text }} className="text-sm whitespace-nowrap">
              Mix (%)
            </label>
            <input
              id="tint-shade-exact-percent"
              type="number"
              min={0}
              max={100}
              step={1}
              value={percentInput}
              onChange={(e) => setPercentInput(e.target.value)}
              className="w-24 rounded border-2 px-2 py-1 text-sm font-mono font-semibold"
              style={{ borderColor: t.border, background: t.card, color: t.text }}
            />
            <span style={{ color: t.muted }} className="text-xs max-w-[14rem]">
              {mixKind === 'tint'
                ? 'Same as presets: blend toward white by this amount.'
                : 'Same as presets: blend toward black by this amount.'}
            </span>
          </div>
        </div>
        <div className="flex-shrink-0 w-[100px] sm:w-[120px]">
          <Swatch
            hex={exactHex}
            label={exactLabel}
            onClick={() => setHex(exactHex.slice(1))}
            t={t}
            height={56}
          />
        </div>
      </div>

      <div className="grid grid-cols-5 gap-x-2 gap-y-4">
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