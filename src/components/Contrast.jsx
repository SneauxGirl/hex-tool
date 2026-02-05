import Card from './shared/Card';

function Contrast({ hex, t }) {
  return (
    <Card t={t} title="Contrast Checker" subtitle="Coming soon">
      <p style={{ color: t.muted }}>WCAG AA/AAA contrast compliance checker</p>
    </Card>
  );
}

export default Contrast;