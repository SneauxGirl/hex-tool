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