// Buildations — Abstract Icon System
// Geometric SVG icons. No icon libraries. Pure form.

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
  strokeWidth?: number;
}

const defaults = { size: 20, color: 'currentColor', strokeWidth: 1.2 };

// Arc / Latent Space — Research
export function IconResearch({ size = defaults.size, color = defaults.color, className, strokeWidth = defaults.strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M3 17 Q3 5 10 3 Q17 1 17 10" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" fill="none"/>
      <circle cx="17" cy="10" r="1.2" fill={color}/>
      <circle cx="3" cy="17" r="1.2" fill={color}/>
    </svg>
  );
}

// Parallel cut lines — Engines
export function IconEngines({ size = defaults.size, color = defaults.color, className, strokeWidth = defaults.strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <line x1="2" y1="5" x2="18" y2="5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
      <line x1="2" y1="10" x2="12" y2="10" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
      <line x1="2" y1="15" x2="15" y2="15" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M14 7 L18 10 L15 13" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

// Orbit — About
export function IconAbout({ size = defaults.size, color = defaults.color, className, strokeWidth = defaults.strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <circle cx="10" cy="10" r="1.8" fill={color}/>
      <ellipse cx="10" cy="10" rx="8" ry="3.5" stroke={color} strokeWidth={strokeWidth} fill="none"/>
      <ellipse cx="10" cy="10" rx="3.5" ry="8" stroke={color} strokeWidth={strokeWidth} fill="none" strokeDasharray="2 1.5"/>
    </svg>
  );
}

// Open frame + diagonal — Contact
export function IconContact({ size = defaults.size, color = defaults.color, className, strokeWidth = defaults.strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M3 3 L3 17 L17 17" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M7 12 L13 6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M9 6 L13 6 L13 10" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// Home — abstract grid node
export function IconHome({ size = defaults.size, color = defaults.color, className, strokeWidth = defaults.strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <rect x="2" y="2" width="7" height="7" stroke={color} strokeWidth={strokeWidth} fill="none"/>
      <rect x="11" y="2" width="7" height="7" stroke={color} strokeWidth={strokeWidth} fill="none"/>
      <rect x="2" y="11" width="7" height="7" stroke={color} strokeWidth={strokeWidth} fill="none"/>
      <circle cx="14.5" cy="14.5" r="3.5" stroke={color} strokeWidth={strokeWidth} fill="none"/>
    </svg>
  );
}

// Arrow right — simple L-shape
export function IconArrow({ size = defaults.size, color = defaults.color, className, strokeWidth = defaults.strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M4 10 L16 10" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M11 5 L16 10 L11 15" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// External link — minimal
export function IconExternal({ size = defaults.size, color = defaults.color, className, strokeWidth = defaults.strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M9 4 L4 4 L4 16 L16 16 L16 11" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M12 3 L17 3 L17 8" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="17" y1="3" x2="10" y2="10" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    </svg>
  );
}

// Signal / wave — AI / data
export function IconSignal({ size = defaults.size, color = defaults.color, className, strokeWidth = defaults.strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M2 10 C4 6, 6 14, 8 10 C10 6, 12 14, 14 10 C16 6, 18 10, 18 10" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" fill="none"/>
    </svg>
  );
}

// Design — angled frame
export function IconDesign({ size = defaults.size, color = defaults.color, className, strokeWidth = defaults.strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <polygon points="10,2 18,16 2,16" stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinejoin="round"/>
      <line x1="10" y1="8" x2="10" y2="13" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
      <circle cx="10" cy="14.5" r="0.8" fill={color}/>
    </svg>
  );
}

// Architecture — box perspective
export function IconArchitecture({ size = defaults.size, color = defaults.color, className, strokeWidth = defaults.strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M3 6 L10 2 L17 6 L17 14 L10 18 L3 14 Z" stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinejoin="round"/>
      <line x1="10" y1="2" x2="10" y2="18" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
      <line x1="3" y1="6" x2="17" y2="6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    </svg>
  );
}

// Typography — baseline grid
export function IconTypography({ size = defaults.size, color = defaults.color, className, strokeWidth = defaults.strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M3 4 L17 4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M10 4 L10 15" stroke={color} strokeWidth={strokeWidth + 0.6} strokeLinecap="round"/>
      <path d="M6 15 L14 15" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M3 9 L7 9" stroke={color} strokeWidth={strokeWidth * 0.8} strokeLinecap="round" strokeOpacity="0.45"/>
      <path d="M13 9 L17 9" stroke={color} strokeWidth={strokeWidth * 0.8} strokeLinecap="round" strokeOpacity="0.45"/>
    </svg>
  );
}

// Read / article — text lines
export function IconRead({ size = defaults.size, color = defaults.color, className, strokeWidth = defaults.strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <line x1="3" y1="5" x2="17" y2="5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
      <line x1="3" y1="9" x2="17" y2="9" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
      <line x1="3" y1="13" x2="12" y2="13" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
      <line x1="3" y1="17" x2="9" y2="17" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    </svg>
  );
}

// Close / X
export function IconClose({ size = defaults.size, color = defaults.color, className, strokeWidth = defaults.strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <line x1="3" y1="3" x2="17" y2="17" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
      <line x1="17" y1="3" x2="3" y2="17" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    </svg>
  );
}

// Menu / Hamburger — three unequal lines (editorial)
export function IconMenu({ size = defaults.size, color = defaults.color, className, strokeWidth = defaults.strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <line x1="2" y1="6" x2="18" y2="6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
      <line x1="2" y1="11" x2="13" y2="11" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
      <line x1="2" y1="16" x2="16" y2="16" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    </svg>
  );
}

// Map of category → icon component
export function CategoryIcon({ category, ...props }: { category: string } & IconProps) {
  const map: Record<string, React.ComponentType<IconProps>> = {
    Design: IconDesign,
    Architecture: IconArchitecture,
    Typography: IconTypography,
    Research: IconResearch,
    AI: IconSignal,
    Signal: IconSignal,
  };
  const Comp = map[category] || IconRead;
  return <Comp {...props} />;
}
