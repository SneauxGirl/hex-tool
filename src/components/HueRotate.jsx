import Card from './shared/Card';

function HueRotate({ hex, setHex, t }) {
  return (
    <Card t={t} title="Hue Rotation" subtitle="Coming soon">
      <p style={{ color: t.muted }}>CSS hue-rotate() preview at 30° increments</p>
    </Card>
  );
}

export default HueRotate;