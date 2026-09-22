export function Logo() {
  return (
    <div className="flex justify-center items-center py-4">
      <svg
        className="brand-mark"
        viewBox="15 0 175 132"
        role="img"
        aria-label="Waste Management"
        style={{ width: '140px', height: 'auto', display: 'block' }}
      >
        {/* 1. Haste Esquerda (\) */}
        <g className="brand-cigarette" transform="rotate(-20 47 66)">
          <rect className="brand-cigarette-body" x="37" y="14" width="20" height="104" rx="3" fill="#1c1917" />
          <rect className="brand-cigarette-band" x="37" y="31" width="20" height="4" fill="#f5f5f4" />
          <path className="brand-cigarette-filter" d="M40 14h14a3 3 0 0 1 3 3v14H37V17a3 3 0 0 1 3-3Z" fill="#b4533c" />
        </g>

        {/* 2. Haste Centro-Esquerda (/) */}
        <g className="brand-cigarette" transform="rotate(20 83 66)">
          <rect className="brand-cigarette-body" x="73" y="14" width="20" height="104" rx="3" fill="#1c1917" />
          <rect className="brand-cigarette-band" x="73" y="31" width="20" height="4" fill="#f5f5f4" />
          <path className="brand-cigarette-filter" d="M76 14h14a3 3 0 0 1 3 3v14H73V17a3 3 0 0 1 3-3Z" fill="#b4533c" />
        </g>

        {/* 3. Haste Centro-Direita (\) */}
        <g className="brand-cigarette" transform="rotate(-20 119 66)">
          <rect className="brand-cigarette-body" x="109" y="14" width="20" height="104" rx="3" fill="#1c1917" />
          <rect className="brand-cigarette-band" x="109" y="31" width="20" height="4" fill="#f5f5f4" />
          <path className="brand-cigarette-filter" d="M112 14h14a3 3 0 0 1 3 3v14h-20V17a3 3 0 0 1 3-3Z" fill="#b4533c" />
        </g>

        {/* 4. Haste Direita (/) - O traço simétrico que faltava */}
        <g className="brand-cigarette" transform="rotate(20 155 66)">
          <rect className="brand-cigarette-body" x="145" y="14" width="20" height="104" rx="3" fill="#1c1917" />
          <rect className="brand-cigarette-band" x="145" y="31" width="20" height="4" fill="#f5f5f4" />
          <path className="brand-cigarette-filter" d="M148 14h14a3 3 0 0 1 3 3v14h-20V17a3 3 0 0 1 3-3Z" fill="#b4533c" />
        </g>
      </svg>
    </div>
  );
}