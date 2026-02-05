import Card from './shared/Card';
import Swatch from './shared/Swatch';
import { rotateHue } from '../utils/colorUtils';
import { HARMONY_TYPES } from '../utils/constants';

function Harmonies({ hex, setHex, t }) {
  const fullHex = `#${hex}`;

  return (
    <>
      {HARMONY_TYPES.map((harmony) => (
        <Card key={harmony.id} t={t} title={harmony.title} subtitle={harmony.desc}>
          <div className={`grid gap-2 ${harmony.rotations.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
            {harmony.rotations.map((rotation, index) => {
              const color = rotateHue(fullHex, rotation);
              const label = rotation === 0 ? 'Your Color' : `${rotation > 0 ? '+' : ''}${rotation}°`;
              
              return (
                <Swatch
                  key={index}
                  hex={color}
                  label={label}
                  onClick={() => setHex(color.slice(1))}
                  t={t}
                />
              );
            })}
          </div>
        </Card>
      ))}
    </>
  );
}

export default Harmonies;