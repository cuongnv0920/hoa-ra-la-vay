import { interpolateColors } from 'remotion';
import { C, FONT } from '../theme';

// Động cơ xăng 4 xi lanh thẳng hàng — MẶT CẮT nhìn ngang, vẽ nét blueprint.
// Piston chạy theo động học tay quay – thanh truyền; thứ tự nổ 1-3-4-2
// (xi lanh 1 & 4 cùng pha, 2 & 3 lệch 180° trục khuỷu); buồng cháy lóe sáng ở kỳ nổ.
// heat 0..1: thân máy ám đỏ, ống xả nóng; shimmer 0..1: hạt nhiệt bốc ở ống xả; t = frame.
const R = 34; // bán kính tay quay (hành trình 68)
const L = 112; // chiều dài thanh truyền
const DEG_PER_FRAME = 9;

const rad = (d) => (d * Math.PI) / 180;
const pinY = (yc, th) => yc - (R * Math.cos(th) + Math.sqrt(L * L - R * R * Math.sin(th) ** 2));

export const EngineBlock = ({ cx, cy, s = 1, heat = 0, shimmer = 0, t = 0, label = true }) => {
  const steel = '#13203a';
  const tint = interpolateColors(heat, [0, 1], [steel, '#5a1d12']);
  const pipe = interpolateColors(heat, [0, 0.5, 1], [C.steel, '#ff6a2a', '#ffb347']);
  const crankDeg = t * DEG_PER_FRAME;
  const W = 640;
  const x0 = -W / 2;
  const yc = 62; // tâm trục khuỷu
  const cylX = [0, 1, 2, 3].map((i) => x0 + 95 + i * 150);
  const bore = 104;
  const phase = [0, 180, 180, 0]; // độ lệch trục khuỷu của xi lanh 1..4
  const powerStart = [0, 540, 180, 360]; // kỳ nổ trong chu trình 720° (thứ tự 1-3-4-2)
  const cycle = ((crankDeg % 720) + 720) % 720;

  const cyl = cylX.map((x, i) => {
    const th = rad(crankDeg + phase[i]);
    const py = pinY(yc, th);
    const top = py - 34;
    const crx = x + R * Math.sin(th);
    const cry = yc - R * Math.cos(th);
    const into = (cycle - powerStart[i] + 720) % 720;
    const flash = into < 90 ? 1 - into / 90 : 0;
    return (
      <g key={i}>
        {/* lòng xi lanh */}
        <rect x={x - bore / 2} y={-128} width={bore} height={190} fill="#0a1426" stroke={C.line} strokeOpacity="0.55" strokeWidth="3" />
        {/* khí cháy ở kỳ nổ */}
        {flash > 0 && <rect x={x - bore / 2 + 3} y={-126} width={bore - 6} height={top + 126} fill="#ff7a2a" opacity={0.35 + 0.6 * flash} />}
        {/* thanh truyền */}
        <line x1={x} y1={py} x2={crx} y2={cry} stroke={C.steel} strokeWidth="12" strokeLinecap="round" />
        {/* piston */}
        <rect x={x - bore / 2 + 6} y={top} width={bore - 12} height={56} rx={6} fill="#c3cbd8" stroke={C.white} strokeWidth="2" />
        <line x1={x - bore / 2 + 6} y1={top + 12} x2={x + bore / 2 - 6} y2={top + 12} stroke={C.steelDark} strokeWidth="3" />
        <line x1={x - bore / 2 + 6} y1={top + 20} x2={x + bore / 2 - 6} y2={top + 20} stroke={C.steelDark} strokeWidth="3" />
        {/* chốt khuỷu */}
        <circle cx={crx} cy={cry} r={11} fill={C.steel} />
        {/* bugi */}
        <rect x={x - 9} y={-226} width={18} height={60} rx={4} fill={C.steel} />
        <rect x={x - 16} y={-246} width={32} height={24} rx={5} fill={flash > 0.6 ? '#FFD23F' : '#2a3a58'} stroke={C.line} strokeWidth="2" />
      </g>
    );
  });

  const shim = [];
  for (let i = 0; i < 6; i++) {
    const p = ((t * 0.035 + i / 6) % 1);
    shim.push(<circle key={i} cx={x0 + W + 92 + 10 * Math.sin(t / 5 + i)} cy={250 - p * 150} r={5 + 6 * (1 - p)} fill="#ff6a2a" opacity={shimmer * (1 - p) * 0.8} />);
  }

  return (
    <g transform={`translate(${cx},${cy}) scale(${s})`}>
      <defs>
        <filter id="engGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="28" />
        </filter>
      </defs>
      {heat > 0.05 && <rect x={x0} y={-250} width={W + 80} height={460} rx={40} fill="#ff4d1a" opacity={0.35 * heat} filter="url(#engGlow)" />}
      {/* thân máy (khối) */}
      <rect x={x0} y={-140} width={W} height={260} rx={12} fill={tint} stroke={C.line} strokeWidth="4" />
      {/* nắp máy */}
      <rect x={x0 - 8} y={-200} width={W + 16} height={62} rx={8} fill={tint} stroke={C.line} strokeWidth="4" />
      {/* nắp giàn cò có gân */}
      <rect x={x0 + 30} y={-232} width={W - 60} height={34} rx={14} fill={tint} stroke={C.line} strokeWidth="4" />
      {cyl}
      {/* trục khuỷu */}
      <line x1={x0 + 20} y1={yc} x2={x0 + W - 20} y2={yc} stroke={C.steelDark} strokeWidth="14" strokeLinecap="round" />
      {/* các-te dầu: dẹt, rộng hết thân máy */}
      <path d={`M${x0 + 10} 120 L${x0 + 10} 158 Q${x0 + 10} 176 ${x0 + 30} 176 L${x0 + W - 30} 176 Q${x0 + W - 10} 176 ${x0 + W - 10} 158 L${x0 + W - 10} 120`} fill={tint} stroke={C.line} strokeWidth="4" />
      {/* dây đai cam bên trái */}
      <circle cx={x0 - 46} cy={-170} r={34} fill="none" stroke={C.line} strokeWidth="4" />
      <circle cx={x0 - 46} cy={yc} r={42} fill="none" stroke={C.line} strokeWidth="4" />
      <line x1={x0 - 80} y1={-170} x2={x0 - 88} y2={yc} stroke={C.line} strokeWidth="4" />
      <line x1={x0 - 12} y1={-170} x2={x0 - 4} y2={yc} stroke={C.line} strokeWidth="4" />
      {/* cổ xả + ống xả bên phải */}
      <path d={`M${x0 + W + 8} -170 L${x0 + W + 50} -170 Q${x0 + W + 92} -170 ${x0 + W + 92} -128 L${x0 + W + 92} 250`} fill="none" stroke={pipe} strokeWidth="18" strokeLinecap="round" />
      <rect x={x0 + W + 2} y={-190} width={20} height={40} rx={4} fill={pipe} />
      {shim}
      {label && (
        <text x={0} y={250} fill={C.dim} fontSize="30" fontFamily={FONT} textAnchor="middle">
          động cơ xăng 4 xi lanh · mặt cắt minh họa
        </text>
      )}
    </g>
  );
};
