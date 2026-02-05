import Card from './shared/Card';
import Swatch from './shared/Swatch';
import { hexToRgb, createTint, createShade } from '../utils/colorUtils';
import { TINT_SHADE_STEPS } from '../utils/constants';

function TintsShades({ hex, setHex, t }) {
  const { r, g, b } = hexToRgb(`#${hex}`);

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
      <div className="grid grid-cols-5 gap-2">
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