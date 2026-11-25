import { C, FONT } from '../theme';

// Mặt cắt cụm kẹp phanh, cắt ngang qua đĩa (nhìn từ trên xuống).
// Trái = phía trong (gần thân xe), phải = phía ngoài (phía bánh xe).
// Toạ độ cục bộ: đĩa nằm ở x ∈ [-14, 14], mép ngoài đĩa ở y = -120.
//
// Kẹp trượt (floating): piston chỉ ở bên trong.
//   a (0..1): piston đẩy má trong tiến vào đĩa một khe G.
//   b (0..1): phản lực đẩy thân kẹp trượt NGƯỢC lại (sang trái) một khe G,
//             ngón kẹp kéo má ngoài áp vào mặt kia của đĩa.
// Kẹp cố định (fixed): thân không di chuyển, hai piston cùng tiến vào (c).
const G = 12;
const PAD_TOP = -110;
const PAD_H = 120;
const PIS_TOP = -100;
const PIS_H = 100;

const Hatch = () => (
  <defs>
    <pattern id="hatch" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="12" height="12" fill="#14223a" />
      <line x1="0" y1="0" x2="0" y2="12" stroke={C.line} strokeOpacity="0.35" strokeWidth="3" />
    </pattern>
    <pattern id="hatchGrey" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
      <rect width="10" height="10" fill="#1a2030" />
      <line x1="0" y1="0" x2="0" y2="10" stroke={C.steelDark} strokeWidth="3" />
    </pattern>
    <filter id="pglow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="10" />
    </filter>
  </defs>
);

const body = { fill: 'url(#hatch)', stroke: C.line, strokeWidth: 3 };

// Má phanh: frictionFace = mặt ma sát (x), side = -1 (bên trong, nằm bên trái đĩa) | +1.
const Pad = ({ face, side, glow }) => {
  const fx = side < 0 ? face - 16 : face;
  const bx = side < 0 ? face - 24 : face + 16;
  return (
    <g>
      {glow > 0 && <rect x={fx - 6} y={PAD_TOP - 6} width={28} height={PAD_H + 12} fill={C.heat} opacity={0.7 * glow} filter="url(#pglow)" />}
      <rect x={fx} y={PAD_TOP} width={16} height={PAD_H} fill={C.pad} stroke="#c49a7a" strokeWidth="2" />
      <rect x={bx} y={PAD_TOP - 6} width={8} height={PAD_H + 12} fill={C.steel} />
    </g>
  );
};

const Disc = ({ heat }) => (
  <g>
    <rect x={-14} y={-120} width={28} height={270} fill={C.steel} />
    <rect x={-14} y={-120} width={28} height={270} fill={C.heat} opacity={heat * 0.6} />
    <path d="M-24 142 l12 -8 l12 16 l12 -16 l12 8" stroke={C.navy} strokeWidth="10" fill="none" />
  </g>
);

const Arrow = ({ x1, x2, y, color, label, opacity, labelY }) => {
  if (opacity <= 0) return null;
  const dir = Math.sign(x2 - x1);
  return (
    <g opacity={opacity}>
      <line x1={x1} y1={y} x2={x2 - dir * 16} y2={y} stroke={color} strokeWidth="7" />
      <path d={`M${x2} ${y} l${-dir * 26} -15 l0 30 Z`} fill={color} />
      <text x={x1 - dir * 10} y={labelY ?? y + 9} fill={color} fontSize="26" fontWeight="700" fontFamily={FONT} textAnchor={dir > 0 ? 'end' : 'start'}>
        {label}
      </text>
    </g>
  );
};

export const FloatingCaliper = ({ a = 0, b = 0, pistonGlow = 0, padGlow = 0, heat = 0, showForce = 1 }) => {
  const bx = -G * b; // thân kẹp trượt sang trái
  const innerFace = -14 - G + G * a; // mặt ma sát má trong
  const outerFace = 14 + G - G * b; // mặt ma sát má ngoài (gắn vào ngón kẹp)
  const pistonFront = innerFace - 24;
  const pistonBack = pistonFront - 60;
  const boreBottom = -120 + bx;
  return (
    <g>
      <Hatch />
      {/* giá đỡ cố định + chốt dẫn hướng */}
      <rect x={-230} y={70} width={330} height={34} fill="url(#hatchGrey)" stroke={C.steelDark} strokeWidth="2" />
      <rect x={-200} y={42} width={22} height={30} fill="url(#hatchGrey)" stroke={C.steelDark} strokeWidth="2" />
      <rect x={-170 + bx} y={30} width={56} height={30} rx="4" {...body} />
      <rect x={-200} y={39} width={150} height={12} rx="6" fill={C.steel} />
      {/* thân kẹp (di chuyển cùng bx) */}
      <g transform={`translate(${bx},0)`}>
        <path d="M-160 -175 H80 V10 H50 V-135 H-70 V40 H-160 Z" {...body} />
        <rect x={-120} y={PIS_TOP - 5} width={50} height={PIS_H + 10} fill={C.navy} />
        <line x1={-160} y1={-50} x2={-200} y2={-50} stroke={C.fluid} strokeWidth="8" />
      </g>
      {/* dầu phanh trong lòng xi lanh */}
      <rect x={boreBottom} y={PIS_TOP} width={pistonBack - boreBottom} height={PIS_H} fill={C.fluid} opacity="0.9" />
      {/* piston */}
      {pistonGlow > 0 && <rect x={pistonBack - 8} y={PIS_TOP - 8} width={76} height={PIS_H + 16} fill={C.line} opacity={0.6 * pistonGlow} filter="url(#pglow)" />}
      <rect x={pistonBack} y={PIS_TOP} width={60} height={PIS_H} fill="#c3cbd8" stroke={C.white} strokeWidth="2" />
      <Disc heat={heat} />
      <Pad face={innerFace} side={-1} glow={padGlow} />
      <Pad face={outerFace} side={1} glow={padGlow} />
      {/* mũi tên lực */}
      <Arrow x1={-130} x2={-50} y={-197} color={C.fluid} label="lực ép" opacity={showForce * Math.min(1, a * 4) * (1 - b)} />
      <Arrow x1={-60 + bx} x2={-150 + bx} y={-197} color={C.heat} label="phản lực" opacity={showForce * Math.min(1, b * 4)} />
      <Arrow x1={110} x2={outerFace + 20} y={-50} color={C.heat} label="" opacity={showForce * Math.min(1, b * 4)} />
    </g>
  );
};

export const FixedCaliper = ({ c = 0, padGlow = 0, heat = 0, pistonGlow = 0 }) => {
  const innerFace = -14 - G + G * c;
  const outerFace = 14 + G - G * c;
  const lFront = innerFace - 24;
  const rFront = outerFace + 24;
  return (
    <g>
      <Hatch />
      <path d="M-160 -175 H160 V40 H70 V-135 H-70 V40 H-160 Z" {...body} />
      <rect x={-120} y={PIS_TOP - 5} width={50} height={PIS_H + 10} fill={C.navy} />
      <rect x={70} y={PIS_TOP - 5} width={50} height={PIS_H + 10} fill={C.navy} />
      <line x1={-95} y1={-155} x2={95} y2={-155} stroke={C.fluid} strokeWidth="6" />
      <line x1={-95} y1={-155} x2={-95} y2={PIS_TOP} stroke={C.fluid} strokeWidth="6" />
      <line x1={95} y1={-155} x2={95} y2={PIS_TOP} stroke={C.fluid} strokeWidth="6" />
      <rect x={-120} y={PIS_TOP} width={lFront - 60 + 120} height={PIS_H} fill={C.fluid} opacity="0.9" />
      <rect x={rFront + 60} y={PIS_TOP} width={120 - rFront - 60} height={PIS_H} fill={C.fluid} opacity="0.9" />
      {pistonGlow > 0 && (
        <g opacity={0.6 * pistonGlow}>
          <rect x={lFront - 68} y={PIS_TOP - 8} width={76} height={PIS_H + 16} fill={C.line} filter="url(#pglow)" />
          <rect x={rFront - 8} y={PIS_TOP - 8} width={76} height={PIS_H + 16} fill={C.line} filter="url(#pglow)" />
        </g>
      )}
      <rect x={lFront - 60} y={PIS_TOP} width={60} height={PIS_H} fill="#c3cbd8" stroke={C.white} strokeWidth="2" />
      <rect x={rFront} y={PIS_TOP} width={60} height={PIS_H} fill="#c3cbd8" stroke={C.white} strokeWidth="2" />
      {/* bu lông bắt cố định */}
      {[-115, 115].map((x) => (
        <g key={x}>
          <rect x={x - 22} y={40} width={44} height={40} fill="url(#hatchGrey)" stroke={C.steelDark} strokeWidth="2" />
          <circle cx={x} cy={60} r="9" fill={C.steel} />
        </g>
      ))}
      <Disc heat={heat} />
      <Pad face={innerFace} side={-1} glow={padGlow} />
      <Pad face={outerFace} side={1} glow={padGlow} />
    </g>
  );
};
