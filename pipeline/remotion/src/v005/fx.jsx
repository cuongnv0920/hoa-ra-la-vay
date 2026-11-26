// Hiệu ứng và mảnh hình dùng chung của video 005. Toạ độ theo EngineSection (khung 1080×1920).
import { C } from '../theme';
import { ease, prog } from '../timing';
import { Chip, T } from '../v003/parts';
import { CAM_SPEED } from './cues';
import { GDI, INTAKE_SEAT, NOZZLE_GDI, NOZZLE_PFI, PFI, piston } from './EngineSection';

export const GOLD = '#FFD23F';

export const rnd = (i, k) => {
  const v = Math.sin(i * 127.1 + k * 311.7) * 43758.5453;
  return v - Math.floor(v);
};
export const lerp = (a, b, t) => a + (b - a) * t;
const along = (pts, p) => {
  const n = pts.length - 1;
  const s = Math.min(n - 0.001, Math.max(0, p) * n);
  const k = Math.floor(s);
  return [lerp(pts[k][0], pts[k + 1][0], s - k), lerp(pts[k][1], pts[k + 1][1], s - k)];
};

// Chu trình bốn kỳ: phase 0–720°. Nạp 0–180, nén 180–360, cháy 360–540, xả 540–720.
export const cycle = (phase) => {
  const ph = ((phase % 720) + 720) % 720;
  const lift = (a) => 38 * Math.sin((Math.PI * (ph - a)) / 180);
  return { ph, theta: ph % 360, intakeLift: ph < 180 ? lift(0) : 0, exhaustLift: ph >= 540 ? lift(540) : 0, stroke: ['kỳ nạp', 'kỳ nén', 'kỳ nổ', 'kỳ xả'][Math.floor(ph / 180)] };
};

// Xăng từ kim gián tiếp. open = false: xăng dừng ở lưng xu-páp đang đóng.
export const PfiSpray = ({ f, open = true, n = 70, o = 1, crown = 975 }) => (
  <g opacity={o}>
    {Array.from({ length: n }, (_, i) => {
      const p = (f * 0.018 + i / n) % 1;
      const s = rnd(i, 1) - 0.5;
      const pts = [
        [NOZZLE_PFI.x, NOZZLE_PFI.y],
        [388 + s * 44, 748 - s * 36],
        open ? [INTAKE_SEAT.x + 28 + s * 20, INTAKE_SEAT.y + 26 + s * 14] : [418 + s * 70, 784 - s * 34],
      ];
      if (open) pts.push([400 + rnd(i, 2) * 280, Math.min(crown - 12, 872 + rnd(i, 3) * 120)]);
      const [x, y] = along(pts, p);
      return <circle key={i} cx={x} cy={y} r={4 + 4 * rnd(i, 4)} fill={PFI} opacity={0.95 - 0.35 * p} />;
    })}
  </g>
);

// Tia xăng của kim trực tiếp: hình nón từ đầu kim vào trong xi lanh, không xuyên pít-tông.
export const GdiSpray = ({ f, crown, n = 80, o = 1, color = GDI, fade = 0 }) => (
  <g opacity={o}>
    {Array.from({ length: n }, (_, i) => {
      const p = (f * 0.045 + i / n) % 1;
      const a = ((NOZZLE_GDI.angle + 8 + (rnd(i, 1) - 0.5) * 34) * Math.PI) / 180;
      const d = 30 + p * (240 + 80 * rnd(i, 2));
      const x = Math.min(712, NOZZLE_GDI.x + Math.cos(a) * d);
      const y = Math.max(836, Math.min(crown - 8, NOZZLE_GDI.y + Math.sin(a) * d));
      return <circle key={i} cx={x} cy={y} r={(3 + 3 * rnd(i, 3)) * (1 - fade * p)} fill={color} opacity={1 - fade * p} />;
    })}
  </g>
);

// Hạt trong lòng xi lanh. even: 0 = tụ một chỗ, 1 = tản đều.
export const Mixing = ({ f, crown, even = 1, n = 60, color = PFI, o = 1, r = 7 }) => (
  <g opacity={o}>
    {Array.from({ length: n }, (_, i) => {
      const x = lerp(430 + rnd(i, 1) * 90, 380 + ((i % 10) + 0.5) * 32 + (rnd(i, 2) - 0.5) * 14, even);
      const rows = Math.ceil(n / 10);
      const h = Math.max(30, crown - 866);
      const y = lerp(868 + rnd(i, 3) * 50, 866 + ((Math.floor(i / 10) + 0.5) / rows) * h, even);
      return <circle key={i} cx={x + 4 * Math.sin(f / 9 + i)} cy={Math.min(crown - 6, y + 3 * Math.cos(f / 11 + i * 2))} r={r} fill={color} opacity={0.9} />;
    })}
  </g>
);

// Hạt muội: giảm SỐ LƯỢNG (count), cỡ hạt không đổi.
export const Soot = ({ f, count, x = 560, y = 940, w = 220, h = 90, o = 1 }) => (
  <g opacity={o}>
    {Array.from({ length: Math.round(count) }, (_, i) => (
      <circle key={i} cx={x - w / 2 + rnd(i, 7) * w + 5 * Math.sin(f / 8 + i)} cy={y - h / 2 + rnd(i, 8) * h + 4 * Math.cos(f / 10 + i)} r={11} fill="#a39a8f" stroke={C.white} strokeWidth="2.5" />
    ))}
  </g>
);

export const AirArrows = ({ f, o = 1, y = 662, x = 92 }) => (
  <g>
    {[0, 1, 2].map((i) => {
      const p = (f * 0.02 + i / 3) % 1;
      return <path key={i} d="M -24 -12 L 0 0 L -24 12" transform={`translate(${x + 150 * p},${y + 6 * p * p}) rotate(${6 * p})`} fill="none" stroke={C.white} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity={o * 0.85 * Math.sin(Math.PI * p)} />;
    })}
  </g>
);

// Phóng to một vùng của mặt cắt, giữ trong vùng hình (không đè tiêu đề và phụ đề).
export const view = (cx, cy, s, sx = 540, sy = 940) => (x, y) => [sx + (x - cx) * s, sy + (y - cy) * s];
export const Zoom = ({ cx, cy, s, sx = 540, sy = 940, children }) => (
  <g>
    <clipPath id="vz005">
      <rect x={0} y={570} width={1080} height={750} />
    </clipPath>
    <g clipPath="url(#vz005)">
      <g transform={`translate(${sx},${sy}) scale(${s}) translate(${-cx},${-cy})`}>{children}</g>
    </g>
  </g>
);

export const Tag = ({ x, y, text, c = C.white, s = 32, to, o = 1 }) => (
  <g opacity={o}>
    {to && (
      <g>
        <line x1={x} y1={y - s * 0.2} x2={to[0]} y2={to[1]} stroke={c} strokeWidth="3" />
        <circle cx={to[0]} cy={to[1]} r={6} fill={c} />
      </g>
    )}
    <Chip x={x} y={y} text={text} c={c} s={s} fill="rgba(5,9,18,0.94)" />
  </g>
);

export const Card = ({ x, y, w = 600, h = 200, c = C.line, o = 1, children }) => (
  <g transform={`translate(${x},${y})`} opacity={o}>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={26} fill="rgba(5,9,18,0.86)" stroke={c} strokeWidth="5" />
    {children}
  </g>
);

export const Hourglass = ({ x, y, left = 0.6, o = 1, label }) => (
  <g transform={`translate(${x},${y})`} opacity={o}>
    <path d="M -44 -70 L 44 -70 L 6 0 L 44 70 L -44 70 L -6 0 Z" fill="rgba(5,9,18,0.85)" stroke={C.white} strokeWidth="5" strokeLinejoin="round" />
    <path d={`M ${-30 * left} ${-10 - 42 * left} L ${30 * left} ${-10 - 42 * left} L 0 -8 Z`} fill={GOLD} />
    <path d={`M -34 66 L 34 66 L 0 ${66 - 46 * (1 - left)} Z`} fill={GOLD} />
    {label && (
      <T x={0} y={116} s={30}>
        {label}
      </T>
    )}
  </g>
);

// Đồng hồ tải: ba vùng, không có số (minh họa).
export const LoadDial = ({ cx, cy, v, r = 118 }) => {
  const pt = (t, rr) => [cx + rr * Math.cos(Math.PI * (1 + t)), cy + rr * Math.sin(Math.PI * (1 + t))];
  const arc = (a, b) => `M ${pt(a, r)} A ${r} ${r} 0 0 1 ${pt(b, r)}`;
  const [nx, ny] = pt(v, r - 22);
  return (
    <g>
      <path d={arc(0, 0.66)} fill="none" stroke={PFI} strokeWidth="24" />
      <path d={arc(0.68, 1)} fill="none" stroke={GDI} strokeWidth="24" />
      <line x1={cx} y1={cy} x2={nx} y2={ny} stroke={C.white} strokeWidth="8" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={14} fill={C.white} />
      <T x={cx} y={cy + 52} s={30}>
        sức tải
      </T>
    </g>
  );
};

export const Thermo = ({ x, y, v }) => (
  <g transform={`translate(${x},${y})`}>
    <rect x={-22} y={-150} width={44} height={220} rx={22} fill="rgba(5,9,18,0.9)" stroke={C.white} strokeWidth="5" />
    <rect x={-10} y={50 - 180 * v} width={20} height={180 * v} fill={C.heat} />
    <circle cy={86} r={38} fill={C.heat} stroke={C.white} strokeWidth="5" />
  </g>
);

// Bơm cao áp do trục cam dẫn: cam luôn quay; effort chỉ đổi độ dày mũi tên "sức máy".
export const HPPump = ({ f, effort = 1 }) => {
  const a = f * CAM_SPEED;
  const lift = Math.sqrt((104 * Math.sin(a)) ** 2 + (70 * Math.cos(a)) ** 2) - 78;
  return (
    <g>
      <g transform="translate(330,1150)">
        <g transform={`rotate(${(a * 180) / Math.PI})`}>
          <ellipse rx={104} ry={70} fill="#c3cbd8" stroke={C.white} strokeWidth="4" />
        </g>
        <circle r={24} fill={C.steelDark} />
      </g>
      {/* con đội + thân bơm */}
      <rect x={316} y={920 - lift} width={28} height={150} fill={C.steel} />
      <rect x={282} y={1046 - lift} width={96} height={26} rx={8} fill={C.steel} />
      <rect x={250} y={760} width={160} height={175} rx={20} fill="#1a2944" stroke={C.line} strokeWidth="5" />
      <rect x={300} y={882 - lift} width={60} height={42} fill={C.steel} />
      <path d="M 410 800 L 640 800 Q 700 800 700 860 L 700 905" fill="none" stroke={GDI} strokeWidth={18} />
      <g transform="translate(700,935) rotate(90)">
        <rect x={-30} y={-26} width={110} height={52} rx={10} fill={GDI} stroke={C.white} strokeWidth="3" />
        <polygon points="80,-14 112,-6 112,6 80,14" fill={GDI} />
      </g>
      {/* sức máy đi vào bơm */}
      <path d="M 760 1150 L 480 1150" fill="none" stroke={GOLD} strokeWidth={10 + 46 * effort} strokeOpacity="0.85" strokeDasharray="60 22" strokeDashoffset={f * 6} />
      <polygon points={`430,1150 492,${1150 - 16 - 30 * effort} 492,${1150 + 16 + 30 * effort}`} fill={GOLD} />
      <Tag x={330} y={715} text="bơm cao áp" c={C.line} />
      <Tag x={760} y={1060} text="kim trực tiếp" c={GDI} s={30} />
      <Tag x={700} y={1240} text="sức máy" c={GOLD} />
    </g>
  );
};

// Đầu kim trực tiếp phóng to. crud: lớp cặn 0..1; spray: tia phun 0..1.
export const InjectorTip = ({ f, crud = 0, spray = 0 }) => (
  <g>
    <rect x={140} y={820} width={330} height={220} rx={24} fill={GDI} stroke={C.white} strokeWidth="5" />
    <path d="M 470 850 L 600 890 L 600 970 L 470 1010 Z" fill="#c3cbd8" stroke={C.white} strokeWidth="4" />
    <rect x={600} y={912} width={14} height={36} fill={C.navy} />
    {spray > 0 &&
      Array.from({ length: 60 }, (_, i) => {
        const p = (f * 0.07 + i / 60) % 1;
        const a = (rnd(i, 1) - 0.5) * 0.7;
        const d = p * 210;
        return <circle key={i} cx={622 + Math.cos(a) * d} cy={930 + Math.sin(a) * d} r={4 + 4 * rnd(i, 2)} fill={GDI} opacity={spray * (1 - 0.6 * p)} />;
      })}
    {Array.from({ length: 26 }, (_, i) => {
      const o = Math.min(1, Math.max(0, crud * 26 - i));
      const y = 894 + rnd(i, 4) * 74;
      const x = 596 + rnd(i, 5) * 22;
      return Math.abs(y - 930) > 12 || i % 3 === 0 ? <circle key={i} cx={x} cy={y} r={7 + 9 * rnd(i, 6)} fill="#6d6258" stroke="#3b342e" strokeWidth="2" opacity={o} /> : null;
    })}
  </g>
);

export const appear = (f, a, d = 8) => ease(prog(f, a, a + d));
export const crownAt = (theta) => piston(theta).crown;
