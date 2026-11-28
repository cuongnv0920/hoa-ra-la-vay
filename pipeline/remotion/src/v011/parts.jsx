// Mảnh hình riêng của video 011 (phanh tái sinh). Toạ độ khung 1080×1920, vùng hình y 560–1320.
// Quy tắc (storyboard 011): năng lượng = hạt vàng; điện xoay chiều = sóng xanh; một chiều = đường thẳng trắng;
// hao = hạt vàng mờ dần (không đỏ); không tia điện, không chớp; không ghi AC/DC, số pha, điện áp.
import { C, FONT } from '../theme';
import { T } from '../v003/parts';
import { EV, GOLD } from '../v009/parts';

export const GEN = '#7DE3A8'; // mô-tơ ở chế độ phát điện
const lerp = (a, b, t) => a + (b - a) * t;

// ---------- hạt năng lượng ----------
const Spark = ({ x, y, r = 9, o = 1 }) =>
  o <= 0.01 ? null : (
    <g opacity={o}>
      <circle cx={x} cy={y} r={r * 2.4} fill={GOLD} fillOpacity={0.16} />
      <circle cx={x} cy={y} r={r} fill={GOLD} />
    </g>
  );

// ---------- dây điện ----------
// kind: 'ac' (sóng xanh) | 'dc' (đường thẳng trắng). Hạt chạy từ một đầu sang đầu kia.
// reveal: 0..1 đoạn dây đã vẽ (tính từ đầu `from`). dir: +1 hạt chạy sang phải, -1 sang trái.
// flow: số thực tăng theo frame (vị trí hạt). amount: 0..1 độ rõ của hạt. loss: 0..1 hạt mờ dần theo đường (hao).
export const Wire = ({ x1, x2, y, kind = 'dc', reveal = 1, from = 'left', dir = 1, flow = 0, amount = 1, loss = 0, o = 1, amp = 30, period = 110, n = 5, dim = 1 }) => {
  if (reveal <= 0 || o <= 0) return null;
  const L = x2 - x1;
  const vis = L * Math.min(1, reveal);
  const xa = from === 'left' ? x1 : x2 - vis;
  const xb = from === 'left' ? x1 + vis : x2;
  const yAt = (x) => (kind === 'ac' ? y + amp * Math.sin(((x - x1) / period) * 2 * Math.PI) : y);
  let d = '';
  for (let x = xa; x <= xb + 0.01; x += 4) d += `${x === xa ? 'M' : 'L'}${x.toFixed(1)} ${yAt(x).toFixed(1)} `;
  const col = kind === 'ac' ? EV : C.white;
  return (
    <g opacity={o}>
      <path d={d} fill="none" stroke={col} strokeWidth={kind === 'ac' ? 6 : 7} strokeLinecap="round" strokeLinejoin="round" strokeOpacity={0.9 * dim} />
      {amount > 0.01 &&
        Array.from({ length: n }, (_, i) => {
          const u = (((flow + i / n) % 1) + 1) % 1; // tiến độ dọc dây theo chiều chạy
          const x = dir > 0 ? x1 + u * L : x2 - u * L;
          if (x < xa || x > xb) return null;
          const edge = Math.min(1, u / 0.1, (1 - u) / 0.1); // mờ vào/ra ở hai đầu
          const fade = 1 - loss * u;
          return <Spark key={i} x={x} y={yAt(x)} r={9 * (1 - 0.45 * loss * u)} o={amount * edge * fade} />;
        })}
    </g>
  );
};

// ---------- mô-tơ ----------
export const Motor = ({ cx = 150, cy = 800, r = 80, angle = 0, mode = 0, o = 1, labels = true }) => {
  // mode 0 = kéo xe (xanh), 1 = phát điện (xanh lá)
  const col = mode >= 0.5 ? GEN : EV;
  return (
    <g opacity={o}>
      <circle cx={cx} cy={cy} r={r + 10} fill={col} fillOpacity={0.08} />
      <circle cx={cx} cy={cy} r={r} fill="#0f1a2d" stroke={col} strokeWidth={6} />
      <g transform={`translate(${cx},${cy}) rotate(${angle})`}>
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <line key={a} x1={0} y1={0} x2={(r - 14) * Math.cos((a * Math.PI) / 180)} y2={(r - 14) * Math.sin((a * Math.PI) / 180)} stroke={col} strokeWidth={5} strokeOpacity={0.75} strokeLinecap="round" />
        ))}
        <circle r={14} fill={col} />
      </g>
      {labels && (
        <g>
          <T x={cx} y={cy + r + 52} s={36} c={C.white}>
            mô-tơ
          </T>
          <T x={cx} y={cy + r + 92} s={28} c={EV} o={1 - mode}>
            kéo xe
          </T>
          <T x={cx} y={cy + r + 92} s={28} c={GEN} o={mode}>
            phát điện
          </T>
        </g>
      )}
    </g>
  );
};

// ---------- pin ----------
// level: 0..4 (số ô đầy, có thể lẻ)
export const Battery = ({ cx = 890, cy = 800, level = 2, o = 1, labels = true }) => {
  const w = 120;
  const h = 92;
  return (
    <g opacity={o}>
      <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={12} fill="#0f1a2d" stroke={EV} strokeWidth={6} />
      <rect x={cx + w / 2} y={cy - 16} width={12} height={32} rx={4} fill={EV} />
      {[0, 1, 2, 3].map((i) => {
        const fill = Math.max(0, Math.min(1, level - i));
        return (
          <g key={i}>
            <rect x={cx - w / 2 + 12 + i * 24} y={cy - h / 2 + 12} width={20} height={h - 24} rx={4} fill="none" stroke={EV} strokeOpacity={0.35} strokeWidth={2} />
            <rect x={cx - w / 2 + 12 + i * 24} y={cy - h / 2 + 12 + (h - 24) * (1 - fill)} width={20} height={(h - 24) * fill} rx={4} fill={EV} />
          </g>
        );
      })}
      {labels && (
        <T x={cx} y={cy + h / 2 + 50} s={36} c={C.white}>
          pin
        </T>
      )}
    </g>
  );
};

// ---------- biến tần ----------
// p: 0..1 hiện ra; pulse: 0..1 sáng lên khi điện đi qua
export const Inverter = ({ cx = 520, cy = 800, p = 1, pulse = 0, o = 1, name = true }) => {
  if (p <= 0) return null;
  const w = 240;
  const h = 200;
  const s = 0.82 + 0.18 * p;
  return (
    <g opacity={o * Math.min(1, p * 2)} transform={`translate(${cx},${cy}) scale(${s})`}>
      <rect x={-w / 2 - 12} y={-h / 2 - 12} width={w + 24} height={h + 24} rx={34} fill={EV} fillOpacity={0.06 + 0.12 * pulse} />
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={26} fill="#0f1a2d" stroke={EV} strokeWidth={6} />
      {/* bên trái: sóng (xoay chiều); bên phải: đường thẳng (một chiều); ở giữa: hai chiều */}
      <path d={`M-92 6 q 12 -34 24 0 t 24 0 t 24 0`} fill="none" stroke={EV} strokeWidth={5} strokeLinecap="round" />
      <line x1={44} y1={6} x2={92} y2={6} stroke={C.white} strokeWidth={6} strokeLinecap="round" />
      <path d="M-14 -22 h28 m-10 -10 l10 10 l-10 10" fill="none" stroke={C.white} strokeOpacity={0.8} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 34 h-28 m10 -10 l-10 10 l10 10" fill="none" stroke={C.white} strokeOpacity={0.8} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
      {name && (
        <g>
          <T x={0} y={h / 2 + 52} s={38} c={C.white}>
            biến tần
          </T>
          <T x={0} y={h / 2 + 86} s={24} c={C.dim}>
            inverter
          </T>
        </g>
      )}
    </g>
  );
};

// ---------- máy tính (điều khiển) ----------
export const Computer = ({ cx = 520, cy = 600, p = 1, o = 1 }) => {
  if (p <= 0) return null;
  return (
    <g opacity={o * Math.min(1, p * 2)} transform={`translate(${cx},${cy}) scale(${0.85 + 0.15 * p})`}>
      <rect x={-64} y={-44} width={128} height={86} rx={12} fill="#0f1a2d" stroke={C.white} strokeWidth={5} />
      <path d="M-44 20 L-22 -4 L-4 10 L22 -22 L44 -8" fill="none" stroke={GOLD} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
      <line x1={0} y1={42} x2={0} y2={58} stroke={C.white} strokeWidth={5} />
      <line x1={-30} y1={60} x2={30} y2={60} stroke={C.white} strokeWidth={6} strokeLinecap="round" />
      <T x={110} y={14} s={26} c={C.dim} a="start">
        máy tính
      </T>
    </g>
  );
};

// đường nối máy tính → biến tần (nét đứt)
export const ControlLine = ({ x = 520, y1 = 664, y2 = 686, o = 1, dash = 0 }) =>
  o <= 0 ? null : <line x1={x} y1={y1} x2={x} y2={y2} stroke={C.white} strokeOpacity={0.7 * o} strokeWidth={4} strokeDasharray="8 8" strokeDashoffset={-dash} />;

export { FONT, lerp };
