// Máy boxer nhìn từ trên xuống (video 007). Trục khuỷu nằm dọc màn hình (đầu xe ở trên),
// xi-lanh nằm ngang sang hai bên. Toạ độ tuyệt đối trong khung 1080×1920.
//
// Động học (quy tắc storyboard 007):
// - Mỗi cặp đối diện: hai cổ khuỷu lệch 180°, nên hai piston cùng ra, cùng vào.
// - Hai cặp lệch pha 180°: cặp trước ra thì cặp sau vào.
// - Xi-lanh đối diện lệch nhau một chút dọc trục khuỷu (mỗi tay biên một cổ khuỷu riêng).
// - Piston không bao giờ chạm nhau: điểm trong cùng của piston cách tâm l − r > 0.
import { C } from '../theme';
import { T } from '../v003/parts';

export const BOXER = '#FFB000';

export const R = 40; // bán kính tay quay (px)
export const L = 130; // chiều dài tay biên chiếu lên mặt phẳng (px)
export const PW = 70; // bề dày piston theo trục xi-lanh
export const BORE = 104; // đường kính xi-lanh (theo trục khuỷu)
export const LINER_IN = 48; // mép trong của lòng xi-lanh tính từ tâm trục khuỷu
export const LINER_OUT = L + R + PW + 14; // mép ngoài lòng xi-lanh
export const HEAD = 46; // bề dày nắp máy

const rad = (d) => (d * Math.PI) / 180;
// Khoảng cách từ tâm trục khuỷu tới chốt piston, φ đo từ trục xi-lanh.
export const pinDist = (phi) => R * Math.cos(phi) + Math.sqrt(L * L - R * R * Math.sin(phi) * Math.sin(phi));

// Mỗi xi-lanh: bên (−1 trái, +1 phải), vị trí y tương đối, cặp, độ lệch pha của cặp.
// φ của xi-lanh = θ + 180° + pha cặp, giống nhau cho hai xi-lanh trong một cặp (xem ghi chú đầu file).
const OFFSET = 56; // lệch dọc trục giữa hai xi-lanh đối diện
export const CYLS = [
  { side: 1, dy: -150, pair: 0 },
  { side: -1, dy: -150 + OFFSET, pair: 0 },
  { side: 1, dy: 94, pair: 1 },
  { side: -1, dy: 94 + OFFSET, pair: 1 },
];

// Boxer 6 xi-lanh: ba cặp, các cặp lệch nhau 120°.
export const CYLS6 = [
  { side: 1, dy: -230, pair: 0 },
  { side: -1, dy: -230 + OFFSET, pair: 0 },
  { side: 1, dy: -30, pair: 1 },
  { side: -1, dy: -30 + OFFSET, pair: 1 },
  { side: 1, dy: 170, pair: 2 },
  { side: -1, dy: 170 + OFFSET, pair: 2 },
];

export const phiOf = (thetaDeg, pair, step = 180) => rad(thetaDeg + 180 + pair * step);

const Cylinder = ({ cx, cy, c, thetaDeg, hi, dim, showHeads, step, headGlow }) => {
  const phi = phiOf(thetaDeg, c.pair, step);
  const s = pinDist(phi);
  const y = cy + c.dy;
  const sx = (d) => cx + c.side * d; // đổi khoảng cách dọc trục xi-lanh ra toạ độ x
  const lit = hi === undefined || hi === c.pair;
  const col = lit ? BOXER : C.steelDark;
  const o = lit ? 1 : dim;
  const pinX = sx(R * Math.cos(phi)); // hình chiếu cổ khuỷu lên trục xi-lanh
  const x0 = Math.min(sx(LINER_IN), sx(LINER_OUT));
  const pistonX = Math.min(sx(s - PW * 0.3), sx(s + PW * 0.7));
  return (
    <g opacity={o}>
      {/* lòng xi-lanh */}
      <rect x={x0} y={y - BORE / 2} width={LINER_OUT - LINER_IN} height={BORE} fill="rgba(25,181,255,0.05)" stroke={C.steel} strokeWidth="4" />
      {/* nắp máy */}
      {showHeads && (
        <rect
          x={Math.min(sx(LINER_OUT), sx(LINER_OUT + HEAD))}
          y={y - BORE / 2 - 14}
          width={HEAD}
          height={BORE + 28}
          rx={10}
          fill={headGlow ? "rgba(255,176,0,0.35)" : C.panel}
          stroke={headGlow ? BOXER : C.steel}
          strokeWidth={headGlow ? 6 : 4}
        />
      )}
      {/* tay biên */}
      <line x1={pinX} y1={y} x2={sx(s)} y2={y} stroke={col} strokeWidth="12" strokeLinecap="round" opacity={0.85} />
      {/* piston */}
      <rect x={pistonX} y={y - BORE / 2 + 7} width={PW} height={BORE - 14} rx={8} fill={col} />
      <circle cx={sx(s)} cy={y} r={9} fill={C.navy} />
      {/* cổ khuỷu (hình chiếu) */}
      <rect x={pinX - 16} y={y - 22} width={32} height={44} rx={8} fill={C.steel} stroke={C.navy} strokeWidth="3" />
    </g>
  );
};

// thetaDeg: góc quay trục khuỷu (độ). hi: tô sáng một cặp (0 hoặc 1), bỏ trống = tô cả hai.
export const BoxerEngine = ({ cx = 540, cy = 930, thetaDeg = 0, hi, dim = 0.35, showHeads = true, showLabels = false, cyls = CYLS, step = 180, headGlow = false }) => {
  const top = cy + Math.min(...cyls.map((c) => c.dy)) - 80;
  const bot = cy + Math.max(...cyls.map((c) => c.dy)) + 100;
  const mains = cyls.length > 4 ? [top + 20, cy - 130, cy + 70, bot - 20] : [top + 20, cy - 25, bot - 20];
  return (
    <g>
      {/* vỏ máy (cacte) */}
      <rect x={cx - 70} y={top} width={140} height={bot - top} rx={22} fill={C.panel} stroke={C.steelDark} strokeWidth="4" />
      {/* trục khuỷu: trục chính và các ổ đỡ */}
      <line x1={cx} y1={top - 40} x2={cx} y2={bot + 40} stroke={C.steel} strokeWidth="14" strokeLinecap="round" />
      {mains.map((y, i) => (
        <rect key={i} x={cx - 26} y={y - 12} width={52} height={24} rx={6} fill={C.steelDark} />
      ))}
      {cyls.map((c, i) => (
        <Cylinder key={i} cx={cx} cy={cy} c={c} thetaDeg={thetaDeg} hi={hi} dim={dim} showHeads={showHeads} step={step} headGlow={headGlow} />
      ))}
      {showLabels && (
        <>
          <T x={cx} y={top - 62} s={26} c={C.dim} w={600}>
            đầu xe
          </T>
        </>
      )}
    </g>
  );
};

// Hướng chuyển động của piston trong một cặp: +1 đang ra, −1 đang vào.
export const pairDir = (thetaDeg, pair) => {
  const a = pinDist(phiOf(thetaDeg, pair));
  const b = pinDist(phiOf(thetaDeg + 1, pair));
  return Math.sign(b - a);
};
export const pairExt = (thetaDeg, pair) => pinDist(phiOf(thetaDeg, pair)); // khoảng cách chốt piston
export const EXT = { min: L - R, max: L + R, inner: LINER_IN };
