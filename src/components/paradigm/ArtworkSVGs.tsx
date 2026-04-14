import React from 'react';

export const RothkoSVG = ({ size = 60 }: { size?: number }) => (
  <svg viewBox="0 0 60 60" fill="none" width={size} height={size} style={{ borderRadius: 8 }}>
    <rect width="60" height="60" fill="#1a1020"/>
    <rect x="6" y="8" width="48" height="18" fill="#8B3A2A" opacity="0.9"/>
    <rect x="6" y="28" width="48" height="20" fill="#C04A1E" opacity="0.8"/>
    <rect x="6" y="50" width="48" height="6" fill="#6B2318" opacity="0.7"/>
  </svg>
);

export const BanksySVG = ({ size = 60 }: { size?: number }) => (
  <svg viewBox="0 0 60 60" fill="none" width={size} height={size} style={{ borderRadius: 8 }}>
    <rect width="60" height="60" fill="#1a1a1a"/>
    <ellipse cx="30" cy="20" rx="9" ry="11" stroke="#F0EDE8" strokeWidth="1.5"/>
    <path d="M18 60 Q18 38 30 35 Q42 38 42 60" stroke="#F0EDE8" strokeWidth="1.5" fill="none"/>
    <circle cx="30" cy="16" r="3" fill="#E53E3E" opacity="0.9"/>
  </svg>
);

export const PicassoSVG = ({ size = 60 }: { size?: number }) => (
  <svg viewBox="0 0 60 60" fill="none" width={size} height={size} style={{ borderRadius: 8 }}>
    <rect width="60" height="60" fill="#12121e"/>
    <polygon points="10,10 35,5 40,30 15,35" fill="#6B7FD7" opacity="0.7"/>
    <polygon points="25,20 55,15 58,45 28,50" fill="#D4A57A" opacity="0.65"/>
    <polygon points="5,40 30,35 28,58 3,58" fill="#7FD6B8" opacity="0.6"/>
  </svg>
);

export const KandinskySVG = ({ size = 60 }: { size?: number }) => (
  <svg viewBox="0 0 60 60" fill="none" width={size} height={size} style={{ borderRadius: 8 }}>
    <rect width="60" height="60" fill="#0e1520"/>
    <circle cx="20" cy="25" r="12" stroke="#FCD34D" strokeWidth="1.5" fill="none"/>
    <circle cx="40" cy="38" r="8" fill="#E53E3E" opacity="0.7"/>
    <line x1="5" y1="50" x2="55" y2="10" stroke="#7DFFC0" strokeWidth="1.5"/>
    <line x1="5" y1="10" x2="35" y2="55" stroke="#C8B8FF" strokeWidth="1"/>
  </svg>
);

export const DeKooningSVG = ({ size = 60 }: { size?: number }) => (
  <svg viewBox="0 0 60 60" fill="none" width={size} height={size} style={{ borderRadius: 8 }}>
    <rect width="60" height="60" fill="#18110A"/>
    <path d="M5,40 Q20,10 35,30 Q50,50 58,20" stroke="#E8D4A0" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.8"/>
    <path d="M2,55 Q25,35 45,45 Q55,50 60,30" stroke="#C4855A" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6"/>
  </svg>
);

export const VanGoghSVG = ({ size = 60 }: { size?: number }) => (
  <svg viewBox="0 0 60 60" fill="none" width={size} height={size} style={{ borderRadius: 8 }}>
    <rect width="60" height="60" fill="#0A0F1E"/>
    <circle cx="30" cy="28" r="20" stroke="#4A6FA5" strokeWidth="2" fill="none" opacity="0.5"/>
    <circle cx="30" cy="28" r="12" stroke="#FCD34D" strokeWidth="2" fill="none" opacity="0.7"/>
    <circle cx="30" cy="28" r="5" fill="#FEF3C7" opacity="0.9"/>
    <path d="M5,50 Q15,40 25,48 Q35,56 45,44 Q55,34 58,42" stroke="#4A6FA5" strokeWidth="1.5" fill="none"/>
  </svg>
);

// Generic abstract SVG for marketplace items without specific art
export const RichterSVG = ({ size = 60 }: { size?: number }) => (
  <svg viewBox="0 0 60 60" fill="none" width={size} height={size} style={{ borderRadius: 8 }}>
    <rect width="60" height="60" fill="#101018"/>
    <rect x="0" y="0" width="60" height="15" fill="#3B5998" opacity="0.6"/>
    <rect x="0" y="15" width="60" height="15" fill="#C04A1E" opacity="0.5"/>
    <rect x="0" y="30" width="60" height="15" fill="#4A8C6F" opacity="0.5"/>
    <rect x="0" y="45" width="60" height="15" fill="#8B6B8A" opacity="0.4"/>
  </svg>
);

export const BourgeoisSVG = ({ size = 60 }: { size?: number }) => (
  <svg viewBox="0 0 60 60" fill="none" width={size} height={size} style={{ borderRadius: 8 }}>
    <rect width="60" height="60" fill="#0e0e14"/>
    <circle cx="30" cy="20" r="6" fill="#555" opacity="0.8"/>
    <line x1="30" y1="26" x2="10" y2="55" stroke="#888" strokeWidth="1.5"/>
    <line x1="30" y1="26" x2="50" y2="55" stroke="#888" strokeWidth="1.5"/>
    <line x1="30" y1="26" x2="5" y2="45" stroke="#888" strokeWidth="1"/>
    <line x1="30" y1="26" x2="55" y2="45" stroke="#888" strokeWidth="1"/>
    <line x1="30" y1="26" x2="18" y2="58" stroke="#888" strokeWidth="1"/>
    <line x1="30" y1="26" x2="42" y2="58" stroke="#888" strokeWidth="1"/>
  </svg>
);

export const TwomblySVG = ({ size = 60 }: { size?: number }) => (
  <svg viewBox="0 0 60 60" fill="none" width={size} height={size} style={{ borderRadius: 8 }}>
    <rect width="60" height="60" fill="#F0EDE8" opacity="0.05"/>
    <rect width="60" height="60" fill="#101015"/>
    <path d="M5,30 Q15,10 25,35 Q35,55 45,25 Q50,15 58,40" stroke="#A8A4B8" strokeWidth="1.5" fill="none" opacity="0.7"/>
    <path d="M10,45 Q20,20 30,40 Q40,50 55,30" stroke="#C8B8FF" strokeWidth="1" fill="none" opacity="0.4"/>
  </svg>
);

export const BasquiatSVG = ({ size = 60 }: { size?: number }) => (
  <svg viewBox="0 0 60 60" fill="none" width={size} height={size} style={{ borderRadius: 8 }}>
    <rect width="60" height="60" fill="#14100A"/>
    <rect x="12" y="8" width="36" height="32" stroke="#FCD34D" strokeWidth="2" fill="none" opacity="0.8"/>
    <circle cx="24" cy="20" r="3" fill="#F0EDE8"/>
    <circle cx="36" cy="20" r="3" fill="#F0EDE8"/>
    <line x1="20" y1="30" x2="40" y2="30" stroke="#E53E3E" strokeWidth="2"/>
    <text x="30" y="52" textAnchor="middle" fill="#FCD34D" fontSize="7" fontWeight="bold" opacity="0.7">©</text>
  </svg>
);

export const MartinSVG = ({ size = 60 }: { size?: number }) => (
  <svg viewBox="0 0 60 60" fill="none" width={size} height={size} style={{ borderRadius: 8 }}>
    <rect width="60" height="60" fill="#E8E4DE" opacity="0.08"/>
    <rect width="60" height="60" fill="#101015"/>
    {[10, 20, 30, 40, 50].map(y => (
      <line key={y} x1="0" y1={y} x2="60" y2={y} stroke="#F0EDE8" strokeWidth="0.3" opacity="0.3"/>
    ))}
    {[10, 20, 30, 40, 50].map(x => (
      <line key={x} x1={x} y1="0" x2={x} y2="60" stroke="#F0EDE8" strokeWidth="0.3" opacity="0.3"/>
    ))}
  </svg>
);

export function getArtworkSVG(title: string, size = 36) {
  const t = title.toLowerCase();
  if (t.includes('rothko')) return <RothkoSVG size={size} />;
  if (t.includes('picasso') || t.includes('demoiselles')) return <PicassoSVG size={size} />;
  if (t.includes('kooning')) return <DeKooningSVG size={size} />;
  if (t.includes('van gogh') || t.includes('starry')) return <VanGoghSVG size={size} />;
  if (t.includes('kandinsky')) return <KandinskySVG size={size} />;
  if (t.includes('banksy')) return <BanksySVG size={size} />;
  if (t.includes('richter')) return <RichterSVG size={size} />;
  if (t.includes('bourgeois') || t.includes('spider')) return <BourgeoisSVG size={size} />;
  if (t.includes('twombly')) return <TwomblySVG size={size} />;
  if (t.includes('basquiat')) return <BasquiatSVG size={size} />;
  if (t.includes('martin')) return <MartinSVG size={size} />;
  return <RothkoSVG size={size} />;
}

export function getMarketArtSVG(artist: string, size = 60) {
  return getArtworkSVG(artist, size);
}
