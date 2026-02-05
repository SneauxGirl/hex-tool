/**
 * Swatch Component
 * Clickable color swatch with label
 */

function Swatch({ hex, label, sublabel, onClick, t, height = 64 }) {
  return (
    <div className="text-center">
      <div
        onClick={onClick}
        className="w-full rounded-lg border-2 cursor-pointer hover:opacity-80 transition-opacity"
        style={{
          background: hex,
          borderColor: t.border,
          height: `${height}px`
        }}
        title={onClick ? 'Click to set as base color' : ''}
      />
      <div style={{ color: t.text }} className="font-mono text-xs mt-1 truncate">
        {hex}
      </div>
      {label && (
        <div style={{ color: t.muted }} className="text-xs">
          {label}
        </div>
      )}
      {sublabel && (
        <div style={{ color: t.muted }} className="text-xs opacity-75">
          {sublabel}
        </div>
      )}
    </div>
  );
}

export default Swatch;