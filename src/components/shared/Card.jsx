 /*** CARD COMPONENT
 * Reusable CARD wrapper with theme support
 */

function Card({ t, children, className = '', title, subtitle }) {
  return (
    <div
      className={`rounded-xl p-4 mb-3 ${className}`}
      style={{ background: t.card, border: `1px solid ${t.border}` }}
    >
      {title && (
        <div className="mb-3">
          <h3 style={{ color: t.text }} className="font-bold text-lg">
            {title}
          </h3>
          {subtitle && (
            <p style={{ color: t.muted }} className="text-xs mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}

export default Card;