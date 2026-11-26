// Video 008: xe nhìn từ trên xuống (đầu xe ở trên), máy đặt dọc, hộp số ngay sau máy,
// trục dẫn động ra cầu sau chạy dọc giữa xe. Dùng chung cho Subaru (hổ phách) và Audi (xanh).
//
// Quy tắc storyboard 008:
// - Hai xe cùng tỷ lệ, cùng bố cục.
// - Ly hợp Audi nằm ngay sau hộp số (đầu trục ra sau); bộ tách nằm ở cầu sau.
// - Khi ngắt: chỉ trục dẫn động ra sau dừng và chuyển xám; BÁNH SAU VẪN LĂN (vân lốp vẫn chạy).
// - Vân lốp nhìn từ trên chạy về phía đầu xe: mặt trên của lốp lăn đi tới nhanh hơn thân xe.
import { C } from '../theme';

export const SUBARU = '#FFB000';
export const AUDI = '#19B5FF';
export const OFF = '#56627A';

// Hình học (toạ độ tuyệt đối, khung 1080×1920), xe dài 720 px.
export const car = (cx = 540, y0 = 575, s = 1) => ({
  cx,
  y0,
  s,
  w: 360 * s,
  len: 720 * s,
  engine: [y0 + 40 * s, y0 + 230 * s],
  box: [y0 + 236 * s, y0 + 380 * s],
  axF: y0 + 300 * s,
  clutch: y0 + 398 * s,
  axR: y0 + 600 * s,
  track: 182 * s,
});

const mix = (a, b, t) => {
  const p = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const [x, y] = [p(a), p(b)];
  return `rgb(${x.map((v, i) => Math.round(v + (y[i] - v) * t)).join(',')})`;
};

// Bánh xe: vân lốp chạy theo `roll` (px, tăng dần khi xe chạy).
const Wheel = ({ x, y, s, roll, driven, c }) => {
  const w = 56 * s;
  const h = 124 * s;
  const step = 22 * s;
  const off = ((roll % step) + step) % step;
  const n = Math.ceil(h / step) + 1;
  return (
    <g>
      {driven && <rect x={x - w / 2 - 9} y={y - h / 2 - 9} width={w + 18} height={h + 18} rx={22 * s} fill={c} opacity={0.22} />}
      <clipPath id={`wc-${Math.round(x)}-${Math.round(y)}`}>
        <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={16 * s} />
      </clipPath>
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={16 * s} fill="#05080f" />
      <g clipPath={`url(#wc-${Math.round(x)}-${Math.round(y)})`} stroke={C.steel} strokeOpacity={0.55} strokeWidth={4 * s}>
        {Array.from({ length: n }, (_, i) => {
          const yy = y + h / 2 - i * step - off; // chạy lên phía đầu xe
          return <line key={i} x1={x - w / 2 + 8} y1={yy} x2={x + w / 2 - 8} y2={yy} />;
        })}
      </g>
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={16 * s} fill="none" stroke={driven ? c : OFF} strokeWidth={6 * s} />
    </g>
  );
};

// Trục quay: các vạch chéo chạy theo `spin` (độ); `t` 0 = màu hãng, 1 = xám (đã ngắt).
const Shaft = ({ x, y1, y2, s, spin, c, grey = 0 }) => {
  const col = grey > 0 ? mix(c, OFF, grey) : c;
  const step = 26 * s;
  const off = ((((spin / 360) * step * 2) % step) + step) % step;
  const n = Math.ceil((y2 - y1) / step) + 1;
  return (
    <g>
      <rect x={x - 11 * s} y={y1} width={22 * s} height={y2 - y1} rx={11 * s} fill={col} opacity={0.9} />
      <clipPath id={`sc-${Math.round(x)}-${Math.round(y1)}`}>
        <rect x={x - 11 * s} y={y1} width={22 * s} height={y2 - y1} rx={11 * s} />
      </clipPath>
      <g clipPath={`url(#sc-${Math.round(x)}-${Math.round(y1)})`} stroke={C.navy} strokeOpacity={0.55} strokeWidth={5 * s}>
        {Array.from({ length: n }, (_, i) => {
          const yy = y1 + i * step + off - step;
          return <line key={i} x1={x - 14 * s} y1={yy} x2={x + 14 * s} y2={yy + 12 * s} />;
        })}
      </g>
    </g>
  );
};

// Mũi tên lực trắng, độ dày tỷ lệ lượng lực (0–1).
export const ForceArrow = ({ x1, y1, x2, y2, k = 1, o = 1 }) => {
  if (k <= 0.01 || o <= 0) return null;
  const w = 6 + 18 * k;
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const hx = x2 - Math.cos(ang) * w * 1.4;
  const hy = y2 - Math.sin(ang) * w * 1.4;
  const nx = -Math.sin(ang);
  const ny = Math.cos(ang);
  return (
    <g opacity={o}>
      <line x1={x1} y1={y1} x2={hx} y2={hy} stroke={C.white} strokeWidth={w} strokeLinecap="round" />
      <path d={`M${x2} ${y2} L${hx + nx * w} ${hy + ny * w} L${hx - nx * w} ${hy - ny * w} Z`} fill={C.white} />
    </g>
  );
};

/**
 * DrivetrainTop
 * - g: hình học từ car()
 * - c: màu hãng
 * - roll: vân lốp (px); spinF, spinR: góc quay trục trước / trục ra sau (độ)
 * - rearGrey: 0–1, trục ra sau và cầu sau chuyển xám (đã ngắt)
 * - clutchOpen, decoupleOpen: 0–1, khe mở ở ly hợp (sau hộp số) và bộ tách (cầu sau); null = không vẽ
 * - kF, kR: độ dày mũi tên lực ra cầu trước / cầu sau (0–1)
 * - hiClutch, hiDecouple: 0–1, quầng sáng đánh dấu
 */
export const DrivetrainTop = ({
  g,
  c,
  roll = 0,
  spinF = 0,
  spinR = 0,
  rearGrey = 0,
  clutchOpen = null,
  decoupleOpen = null,
  kF = 0,
  kR = 0,
  hiClutch = 0,
  hiDecouple = 0,
  o = 1,
  xray = 1, // độ hiện của phần truyền động bên trong (0 = chỉ thấy thân xe)
  boxer = false, // máy boxer (Subaru): khối ngắn, xi-lanh nằm ngang hai bên
  showWheelsDriven = true,
}) => {
  const { cx, y0, s, w, len, engine, box, axF, clutch, axR, track } = g;
  const rearCol = rearGrey > 0 ? mix(c, OFF, rearGrey) : c;
  const gapC = clutchOpen == null ? 0 : 16 * s * clutchOpen;
  const gapD = decoupleOpen == null ? 0 : 16 * s * decoupleOpen;
  const rearDriven = rearGrey < 0.5;
  return (
    <g opacity={o}>
      {/* thân xe */}
      <rect x={cx - w / 2} y={y0} width={w} height={len} rx={110 * s} fill="#101a2e" stroke={C.steelDark} strokeWidth={5 * s} />
      <path
        d={`M${cx - 130 * s} ${y0 + 430 * s} Q${cx} ${y0 + 395 * s} ${cx + 130 * s} ${y0 + 430 * s} L${cx + 118 * s} ${y0 + 470 * s} L${cx - 118 * s} ${y0 + 470 * s} Z`}
        fill="#0B1220"
        stroke={C.steelDark}
        strokeWidth={3 * s}
      />
      <g opacity={xray}>
      {/* cầu trước */}
      <rect x={cx - track} y={axF - 8 * s} width={2 * track} height={16 * s} rx={8 * s} fill={c} />
      {/* máy đặt dọc + hộp số */}
      {boxer ? (
        <g>
          <rect x={cx - 34 * s} y={engine[0] + 30 * s} width={68 * s} height={engine[1] - engine[0] - 30 * s} rx={14 * s} fill={c} fillOpacity={0.22} stroke={c} strokeWidth={5 * s} />
          {[0, 1].map((i) =>
            [-1, 1].map((sd) => (
              <rect key={i + "" + sd} x={sd > 0 ? cx + 34 * s : cx - 124 * s} y={engine[0] + (50 + i * 80) * s + (sd > 0 ? 0 : 22 * s)} width={90 * s} height={54 * s} rx={10 * s} fill={c} fillOpacity={0.3} stroke={c} strokeWidth={4 * s} />
            ))
          )}
        </g>
      ) : (
        <g>
          <rect x={cx - 62 * s} y={engine[0]} width={124 * s} height={engine[1] - engine[0]} rx={18 * s} fill={c} fillOpacity={0.22} stroke={c} strokeWidth={5 * s} />
          {[0, 1, 2, 3].map((i) => (
            <circle key={i} cx={cx} cy={engine[0] + (35 + i * 40) * s} r={13 * s} fill="none" stroke={c} strokeWidth={4 * s} opacity={0.7} />
          ))}
        </g>
      )}
      <rect x={cx - 46 * s} y={box[0]} width={92 * s} height={box[1] - box[0]} rx={14 * s} fill={c} fillOpacity={0.35} stroke={c} strokeWidth={5 * s} />
      {/* trục dẫn động ra cầu sau (sau ly hợp / bộ tách) */}
      <Shaft x={cx} y1={clutch + 14 * s + gapC} y2={axR - 34 * s - gapD} s={s} spin={spinR} c={c} grey={rearGrey} />
      {/* ly hợp ngay sau hộp số */}
      {clutchOpen != null && (
        <g>
          {hiClutch > 0 && <circle cx={cx} cy={clutch} r={46 * s} fill={c} opacity={0.25 * hiClutch} />}
          <rect x={cx - 26 * s} y={clutch - 16 * s} width={52 * s} height={14 * s} rx={4 * s} fill={c} />
          <rect x={cx - 26 * s} y={clutch + gapC} width={52 * s} height={14 * s} rx={4 * s} fill={rearCol} />
        </g>
      )}
      {/* cầu sau + vi sai (bộ tách nằm trong vi sai) */}
      <rect x={cx - track} y={axR - 8 * s} width={2 * track} height={16 * s} rx={8 * s} fill={c} />
      <circle cx={cx} cy={axR} r={30 * s} fill="#101a2e" stroke={rearCol} strokeWidth={6 * s} />
      {decoupleOpen != null && (
        <g>
          {hiDecouple > 0 && <circle cx={cx} cy={axR} r={60 * s} fill={c} opacity={0.25 * hiDecouple} />}
          <rect x={cx - 22 * s} y={axR - 48 * s - gapD} width={44 * s} height={12 * s} rx={4 * s} fill={rearCol} />
          <rect x={cx - 22 * s} y={axR - 34 * s} width={44 * s} height={12 * s} rx={4 * s} fill={c} />
        </g>
      )}
      </g>
      {/* bánh xe: luôn lăn theo xe */}
      <Wheel x={cx - track} y={axF} s={s} roll={roll} driven={showWheelsDriven && xray > 0.5} c={c} />
      <Wheel x={cx + track} y={axF} s={s} roll={roll} driven={showWheelsDriven && xray > 0.5} c={c} />
      <Wheel x={cx - track} y={axR} s={s} roll={roll} driven={showWheelsDriven && xray > 0.5 && rearDriven} c={c} />
      <Wheel x={cx + track} y={axR} s={s} roll={roll} driven={showWheelsDriven && xray > 0.5 && rearDriven} c={c} />
      {/* mũi tên lực */}
      <g opacity={xray}>
      <ForceArrow x1={cx - 60 * s} y1={axF} x2={cx - track + 36 * s} y2={axF} k={kF} />
      <ForceArrow x1={cx + 60 * s} y1={axF} x2={cx + track - 36 * s} y2={axF} k={kF} />
      <ForceArrow x1={cx + 34 * s} y1={clutch + 40 * s} x2={cx + 34 * s} y2={axR - 60 * s} k={kR} o={kR > 0 ? 1 : 0} />
      </g>
    </g>
  );
};
