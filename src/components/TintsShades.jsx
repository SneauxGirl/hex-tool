import Card from './shared/Card';

function TintsShades({ hex, setHex, t }) {
  return (
    <Card t={t} title="Tints & Shades" subtitle="Coming soon">
      <p style={{ color: t.muted }}>10-step color scale from pure color mixing</p>
    </Card>
  );
}

export default TintsShades;