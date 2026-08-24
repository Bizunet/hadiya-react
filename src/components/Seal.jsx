export function SealBrand() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="50" cy="50" r="46" fill="var(--paper)" style={{ stroke: "var(--deep)", strokeWidth: 3 }} strokeDasharray="2 3.6" />
      <circle cx="50" cy="50" r="39" fill="none" style={{ stroke: "var(--deep)", strokeWidth: 1.2 }} />
      <circle cx="50" cy="50" r="33" fill="none" style={{ stroke: "var(--gold)", strokeWidth: 1 }} />
      <path d="M50 24 L54.5 41.5 L72.5 40 L58.5 51.5 L64 69 L50 58.5 L36 69 L41.5 51.5 L27.5 40 L45.5 41.5 Z" style={{ fill: "var(--gold)" }} />
      <circle cx="50" cy="50" r="6.5" style={{ fill: "var(--deep)" }} />
    </svg>
  );
}

export function SealFooter() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="50" cy="50" r="46" fill="none" stroke="var(--gold-bright)" strokeWidth="2.4" strokeDasharray="2 3.6" />
      <circle cx="50" cy="50" r="39" fill="none" stroke="var(--gold-bright)" strokeWidth="1" />
      <path d="M50 24 L54.5 41.5 L72.5 40 L58.5 51.5 L64 69 L50 58.5 L36 69 L41.5 51.5 L27.5 40 L45.5 41.5 Z" fill="var(--gold-bright)" />
    </svg>
  );
}

export function SealWatermark({ style }) {
  return (
    <span className="seal-watermark" style={{ color: "var(--gold-bright)", ...style }}>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 3.6" />
        <circle cx="50" cy="50" r="39" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <path d="M50 24 L54.5 41.5 L72.5 40 L58.5 51.5 L64 69 L50 58.5 L36 69 L41.5 51.5 L27.5 40 L45.5 41.5 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
      </svg>
    </span>
  );
}
