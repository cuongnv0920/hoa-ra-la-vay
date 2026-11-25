import { interpolateColors } from 'remotion';
import { C, FONT } from '../theme';

// Đĩa phanh nhìn chính diện, kèm cụm kẹp phanh và (tùy chọn) vành bánh xe.
// heat 0..1: đĩa đổi màu từ thép sang đỏ cam rồi vàng; rot: độ quay (độ).
const rad = (d) => (d * Math.PI) / 180;
const P = (cx, cy, r, a) => [cx + r * Math.cos(rad(a)), cy + r * Math.sin(rad(a))];

export const sector = (cx, cy, r1, r2, a1, a2) => {
  const [x1, y1] = P(cx, cy, r2, a1);
  const [x2, y2] = P(cx, cy, r2, a2);
  const [x3, y3] = P(cx, cy, r1, a2);
  const [x4, y4] = P(cx, cy, r1, a1);
  const large = a2 - a1 > 180 ? 1 : 0;
  return `M${x1} ${y1} A${r2} ${r2} 0 ${large} 1 ${x2} ${y2} L${x3} ${y3} A${r1} ${r1} 0 ${large} 0 ${x4} ${y4} Z`;
};

export const heatColor = (h) =>
  interpolateColors(h, [0, 0.3, 0.55, 0.8, 1], ['#8A94A6', '#6b2416', '#c2300f', '#ff5a1f', '#ffb347']);

export const BrakeDisc = ({ cx, cy, R, heat = 0, rot = 0, caliper = true, caliperGlow = 0, wheel = 0 }) => {
  const hub = 0.55 * R;
  const holes = [];
  for (let i = 0; i < 18; i++) {
    const [x, y] = P(cx, cy, 0.8 * R, rot + i * 20);
    holes.push(<circle key={i} cx={x} cy={y} r={R * 0.025} fill={C.navy} fillOpacity="0.7" />);
  }
  const lugs = [];
  for (let i = 0; i < 5; i++) {
    const [x, y] = P(cx, cy, 0.3 * R, rot + i * 72 - 90);
    lugs.push(<circle key={i} cx={x} cy={y} r={R * 0.05} fill={C.navy} stroke={C.steelDark} strokeWidth="3" />);
  }
  const spokes = [];
  for (let i = 0; i < 5; i++) {
    const a = rot + i * 72 - 90;
    spokes.push(<path key={i} d={sector(cx, cy, 1.12 * R, 1.55 * R, a - 9, a + 9)} fill="none" stroke={C.line} strokeWidth="3" />);
  }
  return (
    <g>
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={R * 0.08} />
        </filter>
        <radialGradient id="steel" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#c3cbd8" />
          <stop offset="100%" stopColor="#6d7789" />
        </radialGradient>
      </defs>
      {wheel > 0 && (
        <g opacity={wheel}>
          <circle cx={cx} cy={cy} r={1.95 * R} fill="none" stroke={C.steelDark} strokeWidth={0.3 * R} strokeOpacity="0.6" />
          <circle cx={cx} cy={cy} r={1.6 * R} fill="none" stroke={C.line} strokeWidth="4" />
          <circle cx={cx} cy={cy} r={1.08 * R} fill="none" stroke={C.line} strokeWidth="3" strokeDasharray="10 8" />
          {spokes}
        </g>
      )}
      {heat > 0.05 && <circle cx={cx} cy={cy} r={R * 1.02} fill={heatColor(heat)} opacity={0.6 * heat} filter="url(#glow)" />}
      <circle cx={cx} cy={cy} r={R} fill="url(#steel)" />
      <path d={sector(cx, cy, hub + 4, R, 0, 359.99)} fill={heatColor(heat)} opacity={heat} />
      {holes}
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={C.white} strokeOpacity="0.35" strokeWidth="2" />
      <circle cx={cx} cy={cy} r={hub} fill="#4a5466" stroke={C.steel} strokeWidth="3" />
      <circle cx={cx} cy={cy} r={0.14 * R} fill={C.navy} stroke={C.steel} strokeWidth="3" />
      {lugs}
      {caliper && (
        <g>
          {caliperGlow > 0 && (
            <path d={sector(cx, cy, 0.6 * R, 1.1 * R, -62, -8)} fill={C.line} opacity={0.5 * caliperGlow} filter="url(#glow)" />
          )}
          <path d={sector(cx, cy, 0.6 * R, 1.1 * R, -62, -8)} fill="#1b2a44" stroke={C.line} strokeWidth="4" strokeLinejoin="round" />
          <path d={sector(cx, cy, 0.7 * R, 1.0 * R, -54, -16)} fill="none" stroke={C.line} strokeOpacity="0.5" strokeWidth="2" />
        </g>
      )}
    </g>
  );
};

export const Label = ({ x, y, children, size = 30, color = C.white, anchor = 'start', weight = 600, opacity = 1 }) => (
  <text x={x} y={y} fill={color} fontSize={size} fontWeight={weight} fontFamily={FONT} textAnchor={anchor} opacity={opacity}>
    {children}
  </text>
);
