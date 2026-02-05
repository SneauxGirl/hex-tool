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