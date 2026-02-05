import Card from './shared/Card';

function ColorVision({ hex, t }) {
  return (
    <Card t={t} title="Color Vision Simulation" subtitle="Coming soon">
      <p style={{ color: t.muted }}>Test how colors appear with color vision deficiencies</p>
    </Card>
  );
}

export default ColorVision;