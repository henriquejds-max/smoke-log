export function Logo() {
  return (
    <svg
      className="brand-mark"
      viewBox="0 0 180 132"
      role="img"
      aria-label="Waste Management"
    >
      <g className="brand-cigarette brand-cigarette-left" transform="rotate(-18 48 66)">
        <rect className="brand-cigarette-body" x="38" y="14" width="20" height="104" rx="3" />
        <rect className="brand-cigarette-band" x="38" y="31" width="20" height="4" />
        <path className="brand-cigarette-filter" d="M41 14h14a3 3 0 0 1 3 3v14H38V17a3 3 0 0 1 3-3Z" />
      </g>
      <g className="brand-cigarette brand-cigarette-center">
        <rect className="brand-cigarette-body" x="80" y="14" width="20" height="104" rx="3" />
        <rect className="brand-cigarette-band" x="80" y="31" width="20" height="4" />
        <path className="brand-cigarette-filter" d="M83 14h14a3 3 0 0 1 3 3v14H80V17a3 3 0 0 1 3-3Z" />
      </g>
      <g className="brand-cigarette brand-cigarette-right" transform="rotate(18 132 66)">
        <rect className="brand-cigarette-body" x="122" y="14" width="20" height="104" rx="3" />
        <rect className="brand-cigarette-band" x="122" y="31" width="20" height="4" />
        <path className="brand-cigarette-filter" d="M125 14h14a3 3 0 0 1 3 3v14h-20V17a3 3 0 0 1 3-3Z" />
      </g>
    </svg>
  );
}