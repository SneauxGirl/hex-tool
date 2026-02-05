import Card from './shared/Card';

function Harmonies({ hex, setHex, t }) {
  return (
    <Card t={t} title="Color Harmonies" subtitle="Coming soon">
      <p style={{ color: t.muted }}>Complementary, analogous, split-complementary, and triadic harmonies</p>
    </Card>
  );
}

export default Harmonies;