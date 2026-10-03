/**
 * Signature decorative SVGs and constants for the ABHI-MOH "Silk Tag" Auth Experience.
 * Strict compliance: 100% inline SVG + CSS — NO Three.js, Canvas, or WebGL.
 */

export const BRAND_COLORS = {
  bgIvory: '#FAF7F2',
  panelIvory: '#F5EFE7',
  cardCream: '#FFFDFC',
  maroon: '#7D2130',
  darkMaroon: '#5E1522',
  antiqueGold: '#C29F62',
  lightGold: '#D9C7A7',
  warmCharcoal: '#2A221E',
  walnutText: '#736357',
  errorMaroon: '#8B2232',
  borderGold: 'rgba(217, 199, 167, 0.55)',
};

/**
 * Traditional Zari Weave Border Strip (Repeated Mughal Arch & Chevron Jaal)
 */
export const ZariBorderStrip: React.FC<{ className?: string; orientation?: 'horizontal' | 'vertical' }> = ({
  className = '',
  orientation = 'horizontal',
}) => {
  if (orientation === 'vertical') {
    return (
      <svg
        className={`w-6 h-full ${className}`}
        viewBox="0 0 24 600"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern id="zari-vert-pattern" width="24" height="40" patternUnits="userSpaceOnUse">
            <line x1="2" y1="0" x2="2" y2="40" stroke="#C29F62" strokeWidth="0.75" strokeDasharray="3 2" opacity="0.6" />
            <line x1="22" y1="0" x2="22" y2="40" stroke="#C29F62" strokeWidth="0.75" strokeDasharray="3 2" opacity="0.6" />
            <path d="M4 10 L12 2 L20 10 L12 18 Z" stroke="#C29F62" strokeWidth="0.8" fill="none" opacity="0.5" />
            <circle cx="12" cy="10" r="1.5" fill="#D9C7A7" opacity="0.7" />
            <path d="M4 30 L12 22 L20 30 L12 38 Z" stroke="#C29F62" strokeWidth="0.8" fill="none" opacity="0.5" />
            <circle cx="12" cy="30" r="1.5" fill="#D9C7A7" opacity="0.7" />
            <path d="M2 20 L22 20" stroke="#D9C7A7" strokeWidth="0.5" opacity="0.4" />
          </pattern>
        </defs>
        <rect width="24" height="600" fill="url(#zari-vert-pattern)" />
      </svg>
    );
  }

  return (
    <svg
      className={`w-full h-5 ${className}`}
      viewBox="0 0 800 20"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern id="zari-horiz-pattern" width="40" height="20" patternUnits="userSpaceOnUse">
          <line x1="0" y1="2" x2="40" y2="2" stroke="#C29F62" strokeWidth="0.75" strokeDasharray="3 2" opacity="0.6" />
          <line x1="0" y1="18" x2="40" y2="18" stroke="#C29F62" strokeWidth="0.75" strokeDasharray="3 2" opacity="0.6" />
          <path d="M10 4 L18 10 L10 16 L2 10 Z" stroke="#C29F62" strokeWidth="0.8" fill="none" opacity="0.5" />
          <circle cx="10" cy="10" r="1.5" fill="#D9C7A7" opacity="0.7" />
          <path d="M30 4 L38 10 L30 16 L22 10 Z" stroke="#C29F62" strokeWidth="0.8" fill="none" opacity="0.5" />
          <circle cx="30" cy="10" r="1.5" fill="#D9C7A7" opacity="0.7" />
          <path d="M20 2 L20 18" stroke="#D9C7A7" strokeWidth="0.5" opacity="0.4" />
        </pattern>
      </defs>
      <rect width="800" height="20" fill="url(#zari-horiz-pattern)" />
    </svg>
  );
};

/**
 * Regal Indian Kalga / Paisley (Boteh) Motif with Fine Florets & Zari Jaal
 */
export const KalgaPaisleyMotif: React.FC<{ className?: string; opacity?: number }> = ({
  className = '',
  opacity = 0.35,
}) => (
  <svg
    viewBox="0 0 320 480"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ opacity }}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="kalgaGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#C29F62" stopOpacity="0.8" />
        <stop offset="50%" stopColor="#D9C7A7" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#A67C52" stopOpacity="0.7" />
      </linearGradient>
      <radialGradient id="kalgaCenterGlow" cx="50%" cy="60%" r="50%">
        <stop offset="0%" stopColor="#D9C7A7" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#FAF7F2" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Soft inner glow */}
    <ellipse cx="160" cy="270" rx="90" ry="130" fill="url(#kalgaCenterGlow)" />

    {/* Primary Paisley Outlines */}
    <path
      d="M160 40C160 40 190 85 200 120C215 170 230 230 200 300C170 370 120 410 70 380C20 350 20 270 50 210C80 150 130 90 145 60C155 40 160 40 160 40Z"
      stroke="url(#kalgaGold)"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Recurved Crown Finial */}
    <path
      d="M160 40C155 25 140 10 120 15C100 20 105 45 125 45C140 45 152 35 150 25"
      stroke="url(#kalgaGold)"
      strokeWidth="1.6"
      strokeLinecap="round"
    />

    {/* Inner Concentric Boteh Shell */}
    <path
      d="M152 75C152 75 175 110 183 140C195 180 206 230 182 285C158 340 118 370 80 348C45 325 45 262 70 215C95 168 135 115 145 90C150 78 152 75 152 75Z"
      stroke="url(#kalgaGold)"
      strokeWidth="1.1"
      strokeDasharray="4 2"
      opacity="0.75"
    />

    {/* Center Mandala Lotus Flower */}
    <circle cx="140" cy="265" r="28" stroke="url(#kalgaGold)" strokeWidth="1.2" />
    <circle cx="140" cy="265" r="6" fill="#C29F62" opacity="0.6" />
    
    {/* Petals */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <path
        key={i}
        d="M140 265 Q145 240 140 232 Q135 240 140 265"
        stroke="url(#kalgaGold)"
        strokeWidth="0.9"
        fill="#FAF7F2"
        fillOpacity="0.4"
        transform={`rotate(${angle} 140 265)`}
      />
    ))}

    {/* Jaal Crosshatching & Dewdrop Beads */}
    <path d="M120 150 Q160 170 180 210" stroke="url(#kalgaGold)" strokeWidth="0.8" opacity="0.5" />
    <path d="M100 180 Q140 200 165 245" stroke="url(#kalgaGold)" strokeWidth="0.8" opacity="0.5" />
    <path d="M90 220 Q125 240 150 290" stroke="url(#kalgaGold)" strokeWidth="0.8" opacity="0.5" />
    
    {/* Outer Scalloped Lace Border */}
    <path
      d="M70 380 Q90 410 120 420 Q150 420 180 395 Q210 365 225 320 Q240 270 225 200 Q215 150 190 100"
      stroke="url(#kalgaGold)"
      strokeWidth="0.7"
      strokeDasharray="2 3"
      opacity="0.6"
    />

    {/* Floating Florets */}
    <circle cx="75" cy="180" r="2" fill="#C29F62" opacity="0.6" />
    <circle cx="195" cy="160" r="2.5" fill="#C29F62" opacity="0.7" />
    <circle cx="210" cy="240" r="2" fill="#C29F62" opacity="0.6" />
    <circle cx="65" cy="310" r="2.5" fill="#C29F62" opacity="0.7" />
    <circle cx="140" cy="385" r="3" fill="#C29F62" opacity="0.8" />
  </svg>
);

/**
 * Boutiqe Silk Hang Tag Eyelet Hole & Looped Gold Cord
 */
export const TagThreadHole: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative flex flex-col items-center select-none pointer-events-none ${className}`}>
    {/* Top gold loop cord extending upward */}
    <svg width="40" height="48" viewBox="0 0 40 48" fill="none" className="overflow-visible">
      {/* Twisted two-tone gold thread loop */}
      <path
        d="M20 44 C20 22, 10 0, 20 0 C30 0, 20 22, 20 44"
        stroke="#C29F62"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M20 44 C20 22, 10 0, 20 0 C30 0, 20 22, 20 44"
        stroke="#D9C7A7"
        strokeWidth="1.2"
        strokeDasharray="4 2"
        strokeLinecap="round"
      />
      {/* Thread knot wrap */}
      <rect x="16" y="24" width="8" height="6" rx="2" fill="#A67C52" stroke="#C29F62" strokeWidth="0.8" />
      <line x1="16" y1="26" x2="24" y2="26" stroke="#D9C7A7" strokeWidth="0.8" />
      <line x1="16" y1="28" x2="24" y2="28" stroke="#D9C7A7" strokeWidth="0.8" />
    </svg>

    {/* Reinforced brass/gold grommet ring */}
    <div className="relative -mt-2 w-7 h-7 rounded-full bg-[#FAF7F2] border-[2.5px] border-[#C29F62] shadow-inner flex items-center justify-center">
      <div className="w-3.5 h-3.5 rounded-full bg-[#EADFCF] shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.25)] border border-[#C29F62]/60" />
    </div>
  </div>
);

/**
 * Running Stitch Needle Animation for Primary Button Loading State
 */
export const RunningStitchLoader: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`w-full flex items-center justify-center gap-2 ${className}`}>
    <span className="text-[11px] uppercase tracking-[0.25em] text-[#FAF7F2] font-medium font-sans">
      Weaving Dossier
    </span>
    <svg width="48" height="12" viewBox="0 0 48 12" fill="none" className="overflow-visible">
      {/* Dashed running stitch line */}
      <line
        x1="2"
        y1="6"
        x2="46"
        y2="6"
        stroke="#D9C7A7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="5 4"
        className="animate-[runningStitch_1s_linear_infinite]"
      />
      {/* Fine gold needle */}
      <path
        d="M44 6 L48 6 L44 4 Z"
        fill="#D9C7A7"
      />
    </svg>
  </div>
);
