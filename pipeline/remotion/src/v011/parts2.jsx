// Mảnh hình bổ sung của video 011 (ngoài parts.jsx). Toạ độ khung 1080×1920, vùng hình y 560–1320.
// Quy tắc: không ghi số, nhiệt độ, phần trăm, điện áp; năng lượng = hạt vàng; nhiệt = đỏ cam (chỉ ở má phanh/đĩa phanh);
// hao = hạt vàng mờ dần; đinamô là ẩn dụ, không có pin hay biến tần.
import { interpolateColors } from 'remotion';
import { C } from '../theme';
import { T } from '../v003/parts';
import { EV, GOLD } from '../v009/parts';
import { GEN } from './parts';

export const HEAT = '#FF4D1A';
export const lerp = (a, b, t) => a + (b - a) * t;
const rad = (d) => (d * Math.PI) / 180;

// ---------- dòng hạt dọc một đường gấp khúc ----------
// pts: [[x,y],...]; flow: tăng theo frame; dir +1 theo thứ tự điểm, -1 ngược lại; loss: hạt mờ dần theo đường.
const along = (pts, u) => {
  const seg = [];
  let total = 0;
  for (let i = 0; i < pts.length - 1; i++) {
    const l = Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]);
    seg.push(l);
    total += l;
  }
  let d = u * total;
  for (let i = 0; i < seg.length; i++) {
    if (d <= seg[i] || i === seg.length - 1) {
      const t = seg[i] ? Math.min(1, d / seg[i]) : 0;
      return [lerp(pts[i][0], pts[i + 1][0], t), lerp(pts[i][1], pts[i + 1][1], t)];
    }
    d -= seg[i];
  }
  return pts[pts.length - 1];
};

export const Stream = ({ pts, flow = 0, dir = 1, n = 6, amount = 1, loss = 0, r = 9, color = GOLD, line = true, lineO = 0.25, reveal = 1, width = 6 }) => {
  if (amount <= 0.01 && lineO <= 0) return null;
  const view = reveal >= 1 ? pts : null;
  return (
    <g>
      {line && (
        <polyline points={pts.map((p) => p.join(',')).join(' ')} fill="none" stroke={color} strokeOpacity={lineO * Math.min(1, reveal * 2)} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={reveal >= 1 ? undefined : '2000'} strokeDashoffset={reveal >= 1 ? undefined : 2000 * (1 - reveal)} />
      )}
      {amount > 0.01 &&
        Array.from({ length: n }, (_, i) => {
          const u0 = (((flow + i / n) % 1) + 1) % 1;
          const u = dir > 0 ? u0 : 1 - u0;
          if (u0 > reveal) return null;
          const [x, y] = along(pts, u);
          const edge = Math.min(1, u0 / 0.08, (1 - u0) / 0.08);
          const fade = 1 - loss * u0;
          return (
            <g key={i} opacity={amount * edge * fade}>
              <circle cx={x} cy={y} r={r * 2.3} fill={color} fillOpacity={0.16} />
              <circle cx={x} cy={y} r={r * (1 - 0.4 * loss * u0)} fill={color} />
            </g>
          );
        })}
      {view && null}
    </g>
  );
};

// ---------- bánh xe đơn giản (vành + nan) ----------
export const WheelDisc = ({ cx, cy, r = 120, angle = 0, color = EV, o = 1, hub = true }) => (
  <g opacity={o}>
    <circle cx={cx} cy={cy} r={r} fill="#0f1a2d" stroke={color} strokeWidth={7} />
    <circle cx={cx} cy={cy} r={r * 0.62} fill="none" stroke={color} strokeOpacity={0.5} strokeWidth={4} />
    <g transform={`translate(${cx},${cy}) rotate(${angle})`}>
      {[0, 72, 144, 216, 288].map((a) => (
        <line key={a} x1={0} y1={0} x2={(r * 0.62) * Math.cos(rad(a))} y2={(r * 0.62) * Math.sin(rad(a))} stroke={color} strokeWidth={5} strokeOpacity={0.8} strokeLinecap="round" />
      ))}
      {hub && <circle r={r * 0.1} fill={color} />}
    </g>
  </g>
);

// ---------- đĩa phanh nhìn mặt cắt: hai má phanh khép lại ----------
// close: 0..1 má phanh ép vào đĩa; heat: 0..1 đĩa nóng lên; spin: vạch chạy trên đĩa (độ tương đối)
export const heatCol = (h) => interpolateColors(Math.max(0, Math.min(1, h)), [0, 0.4, 0.8, 1], ['#8A94A6', '#8f3a22', '#ff5a1f', '#ffb347']);
export const DiscSection = ({ cx = 560, cy = 940, h = 420, close = 0, heat = 0, spin = 0, o = 1 }) => {
  const gap = lerp(70, 0, close);
  const dw = 54;
  const col = heatCol(heat);
  return (
    <g opacity={o}>
      <rect x={cx - dw / 2} y={cy - h / 2} width={dw} height={h} rx={10} fill="#1b2433" stroke={col} strokeWidth={6} />
      {heat > 0.05 && <rect x={cx - dw / 2 - 8} y={cy - h / 2 - 8} width={dw + 16} height={h + 16} rx={16} fill={HEAT} fillOpacity={0.22 * heat} />}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const y = cy - h / 2 + 24 + (((i * 52 + spin) % (h - 48)) + (h - 48)) % (h - 48);
        return <line key={i} x1={cx - dw / 2 + 8} y1={y} x2={cx + dw / 2 - 8} y2={y} stroke={col} strokeOpacity={0.55} strokeWidth={4} />;
      })}
      {/* má phanh */}
      {[-1, 1].map((s) => (
        <g key={s}>
          <rect x={s < 0 ? cx - dw / 2 - gap - 46 : cx + dw / 2 + gap} y={cy - h * 0.3} width={46} height={h * 0.6} rx={8} fill={C.pad} stroke={C.steel} strokeWidth={4} />
          <rect x={s < 0 ? cx - dw / 2 - gap - 46 - 40 : cx + dw / 2 + gap + 46} y={cy - h * 0.12} width={40} height={h * 0.24} rx={6} fill="#1b2433" stroke={C.steelDark} strokeWidth={4} />
        </g>
      ))}
      <T x={cx - dw / 2 - 98} y={cy + h / 2 + 52} s={26} c={C.dim}>
        má phanh
      </T>
      <T x={cx} y={cy - h / 2 - 22} s={26} c={C.dim}>
        đĩa phanh
      </T>
    </g>
  );
};

// làn nhiệt bay lên (ba đường lượn, mờ dần)
export const HeatWaves = ({ x, y, f = 0, o = 1, n = 5, h = 200 }) =>
  o <= 0.01 ? null : (
    <g opacity={o}>
      {Array.from({ length: n }, (_, i) => {
        const u = (((f * 0.012 + i / n) % 1) + 1) % 1;
        const xx = x + (i - (n - 1) / 2) * 46 + Math.sin(f / 10 + i) * 10;
        const yy = y - u * h;
        return <path key={i} d={`M${xx} ${yy} q 12 -18 0 -36 t 0 -36`} fill="none" stroke={HEAT} strokeWidth={6} strokeLinecap="round" strokeOpacity={0.8 * Math.min(1, u * 6) * (1 - u)} />;
      })}
    </g>
  );

// ---------- xe đạp + đinamô (ẩn dụ) ----------
export const BikeDynamo = ({ cx = 420, cy = 1000, r = 190, angle = 0, lamp = 0, drag = 0, o = 1, f = 0 }) => {
  const a = rad(-58); // vị trí đinamô trên lốp
  const dx = cx + (r + 18) * Math.cos(a);
  const dy = cy + (r + 18) * Math.sin(a);
  const lx = 800;
  const ly = 720;
  return (
    <g opacity={o}>
      <WheelDisc cx={cx} cy={cy} r={r} angle={angle} color={C.steel} hub />
      {/* càng xe */}
      <path d={`M${cx} ${cy} L${cx + 120} ${cy - 250} L${cx + 330} ${ly + 60}`} fill="none" stroke={C.steelDark} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
      {/* đinamô tì vào lốp */}
      <g transform={`translate(${dx},${dy}) rotate(${-58 + 90})`}>
        <rect x={-18} y={-26} width={36} height={52} rx={10} fill="#1b2433" stroke={GOLD} strokeWidth={5} />
        <circle cy={26} r={11} fill="none" stroke={GOLD} strokeWidth={4} />
      </g>
      <T x={dx - 96} y={dy - 40} s={26} c={C.dim}>
        đinamô
      </T>
      {/* dây và đèn */}
      <path d={`M${dx + 14} ${dy - 14} Q ${dx + 100} ${dy - 120} ${lx - 40} ${ly + 10}`} fill="none" stroke={GOLD} strokeOpacity={0.35} strokeWidth={5} />
      <g transform={`translate(${lx},${ly})`}>
        {lamp > 0.02 &&
          [-34, -12, 12, 34].map((d, i) => <line key={i} x1={44} y1={d * 0.6} x2={44 + 70 * lamp} y2={d * 1.6} stroke={GOLD} strokeWidth={5} strokeLinecap="round" strokeOpacity={0.85 * lamp} />)}
        <circle r={46 + 12 * lamp} fill={GOLD} fillOpacity={0.12 * lamp} />
        <path d="M-34 -30 L22 -30 Q52 0 22 30 L-34 30 Z" fill="#1b2433" stroke={lamp > 0.1 ? GOLD : C.steel} strokeWidth={6} strokeLinejoin="round" />
        <circle cx={22} cy={0} r={16} fill={GOLD} fillOpacity={0.2 + 0.8 * lamp} />
      </g>
      {/* lực cản nhỏ ngược chiều quay tại chỗ đinamô tì */}
      {drag > 0.02 && (
        <g opacity={Math.min(1, drag * 2)} transform={`translate(${dx - 4},${dy + 46})`}>
          <line x1={0} y1={0} x2={-24 - 56 * drag} y2={-24 * drag} stroke={C.white} strokeWidth={5 + 5 * drag} strokeLinecap="round" />
          <path d={`M${-24 - 56 * drag - 6} ${-24 * drag} l16 -12 v24 z`} fill={C.white} />
        </g>
      )}
    </g>
  );
};

// ---------- hai thanh lực hãm nối nhau trong một khung (tổng không đổi) ----------
// x: mép trái; total: độ dài khung; blue: phần mô-tơ; orange = total - blue khi `fill` = 1 (má phanh phủ phần còn lại)
export const ForceBars = ({ x = 130, y = 880, total = 700, blue = 700, orange = 0, h = 64, o = 1, labels = true }) => (
  <g opacity={o}>
    <rect x={x - 6} y={y - 6} width={total + 12} height={h + 12} rx={22} fill="none" stroke={C.white} strokeOpacity={0.35} strokeWidth={3} strokeDasharray="10 8" />
    <rect x={x} y={y} width={Math.max(0, blue)} height={h} rx={16} fill={EV} fillOpacity={0.9} />
    <rect x={x + Math.max(0, blue)} y={y} width={Math.max(0, orange)} height={h} rx={16} fill="#FF9A2A" fillOpacity={0.95} />
    {labels && (
      <g>
        <T x={x + 4} y={y + h + 52} s={32} c={EV} a="start">
          mô-tơ
        </T>
        <T x={x + total} y={y + h + 52} s={32} c="#FF9A2A" a="end" o={orange > 4 ? 1 : 0.35}>
          má phanh
        </T>
      </g>
    )}
  </g>
);

// ---------- biểu tượng ----------
export const FullBattery = ({ cx, cy, o = 1 }) => (
  <g opacity={o}>
    <rect x={cx - 60} y={cy - 40} width={120} height={80} rx={12} fill="#0f1a2d" stroke={EV} strokeWidth={6} />
    <rect x={cx + 60} y={cy - 14} width={11} height={28} rx={4} fill={EV} />
    {[0, 1, 2, 3].map((i) => (
      <rect key={i} x={cx - 50 + i * 25} y={cy - 28} width={21} height={56} rx={4} fill={EV} />
    ))}
    <T x={cx} y={cy + 82} s={28} c={C.white}>
      pin đầy
    </T>
  </g>
);

// kind: 'cold' | 'hot'
export const Thermo = ({ cx, cy, kind = 'cold', o = 1 }) => {
  const col = kind === 'cold' ? '#7CC8FF' : '#FF7A3D';
  const lv = kind === 'cold' ? 0.22 : 0.85;
  return (
    <g opacity={o}>
      <rect x={cx - 16} y={cy - 56} width={32} height={90} rx={16} fill="#0f1a2d" stroke={col} strokeWidth={6} />
      <circle cx={cx} cy={cy + 44} r={26} fill="#0f1a2d" stroke={col} strokeWidth={6} />
      <circle cx={cx} cy={cy + 44} r={14} fill={col} />
      <rect x={cx - 6} y={cy + 30 - 86 * lv} width={12} height={86 * lv} rx={6} fill={col} />
      <T x={cx} y={cy + 112} s={28} c={C.white}>
        {kind === 'cold' ? 'quá lạnh' : 'quá nóng'}
      </T>
    </g>
  );
};

export const Engine = ({ cx, cy, w = 150, o = 1, shake = 0, label = 'động cơ xăng' }) => (
  <g opacity={o} transform={`translate(${cx + Math.sin(shake) * 2},${cy})`}>
    <rect x={-w / 2} y={-w * 0.4} width={w} height={w * 0.8} rx={14} fill="#0f1a2d" stroke="#9AA6B8" strokeWidth={6} />
    {[-1, 0, 1].map((i) => (
      <g key={i}>
        <rect x={i * w * 0.28 - 14} y={-w * 0.4 - 22} width={28} height={22} rx={4} fill="#1b2433" stroke="#9AA6B8" strokeWidth={4} />
        <rect x={i * w * 0.28 - 12} y={-w * 0.15 + 8 * Math.sin(shake + i * 2)} width={24} height={40} rx={5} fill="#9AA6B8" fillOpacity={0.4} />
      </g>
    ))}
    <T x={0} y={w * 0.4 + 44} s={28} c={C.white}>
      {label}
    </T>
  </g>
);

// phích cắm + dây sạc đi vào pin
export const Plug = ({ cx, cy, p = 1, o = 1, label = 'ổ điện' }) => (
  <g opacity={o * Math.min(1, p * 2)}>
    <rect x={cx - 34} y={cy - 8} width={68} height={52} rx={14} fill="#0f1a2d" stroke={C.white} strokeWidth={5} />
    <line x1={cx - 14} y1={cy - 8} x2={cx - 14} y2={cy - 34} stroke={C.white} strokeWidth={8} strokeLinecap="round" />
    <line x1={cx + 14} y1={cy - 8} x2={cx + 14} y2={cy - 34} stroke={C.white} strokeWidth={8} strokeLinecap="round" />
    <T x={cx} y={cy + 86} s={26} c={C.dim}>
      {label}
    </T>
  </g>
);

// bàn đạp (nhãn tùy chọn), press 0..1
export const PedalIcon = ({ x, y, press = 0, label = 'bàn đạp phanh', s = 1, o = 1, color = C.steel }) => (
  <g opacity={o} transform={`translate(${x},${y}) scale(${s})`}>
    <line x1={0} y1={-110} x2={0} y2={-14} stroke={C.steelDark} strokeWidth={12} strokeLinecap="round" />
    <g transform={`rotate(${-26 + 24 * press} 0 -14)`}>
      <rect x={-40} y={-14} width={80} height={130} rx={16} fill="#1b2433" stroke={color} strokeWidth={5} />
      {[0, 1, 2].map((i) => (
        <line key={i} x1={-24} y1={14 + i * 34} x2={24} y2={14 + i * 34} stroke={color} strokeOpacity={0.5} strokeWidth={4} />
      ))}
    </g>
    <T x={0} y={170} s={26} c={C.dim}>
      {label}
    </T>
  </g>
);

export { GEN };
