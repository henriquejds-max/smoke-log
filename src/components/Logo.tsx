export function Logo() {
  return (
    <svg
      className="brand-mark"
      viewBox="0 0 174 132"
      role="img"
      aria-label="Waste Management"
    >
      <g className="brand-cigarette brand-cigarette-left" transform="rotate(-20 47 66)">
        <rect className="brand-cigarette-body" x="37" y="14" width="20" height="104" rx="3" />
        <rect className="brand-cigarette-band" x="37" y="31" width="20" height="4" />
        <path className="brand-cigarette-filter" d="M40 14h14a3 3 0 0 1 3 3v14H37V17a3 3 0 0 1 3-3Z" />
      </g>
      <g className="brand-cigarette brand-cigarette-center" transform="rotate(20 83 66)">
        <rect className="brand-cigarette-body" x="73" y="14" width="20" height="104" rx="3" />
        <rect className="brand-cigarette-band" x="73" y="31" width="20" height="4" />
        <path className="brand-cigarette-filter" d="M76 14h14a3 3 0 0 1 3 3v14H73V17a3 3 0 0 1 3-3Z" />
      </g>
      <g className="brand-cigarette brand-cigarette-right" transform="rotate(-20 119 66)">
        <rect className="brand-cigarette-body" x="109" y="14" width="20" height="104" rx="3" />
        <rect className="brand-cigarette-band" x="109" y="31" width="20" height="4" />
        <path className="brand-cigarette-filter" d="M112 14h14a3 3 0 0 1 3 3v14h-20V17a3 3 0 0 1 3-3Z" />
      </g>
    </svg>
  );
}