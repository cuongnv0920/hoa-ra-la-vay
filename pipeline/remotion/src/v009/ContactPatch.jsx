// Mặt cắt chỗ lốp chạm đường (hình chủ đạo video 009). Toạ độ khung 1080×1920.
// Mô hình giản lược kiểu "chổi lông" (brush model):
// - xe chạy sang phải; trong hệ quy chiếu gắn với trục bánh, mặt đường trôi sang trái;
// - khối gai đi vào vùng tiếp xúc ở mép trước (bên phải), bám đường, bị kéo lệch dần;
// - độ lệch bị giới hạn bởi lực bám tối đa, giới hạn này theo áp suất tiếp xúc hình parabol
//   (bằng 0 ở hai mép); chỗ nào độ lệch cần vượt giới hạn thì khối gai trượt -> vùng trượt luôn ở phía sau;
// - lực lớn hơn (force) -> độ lệch tăng nhanh hơn -> vùng trượt lan về phía trước;
// - tải lớn hơn (load) -> lốp lún nhiều hơn -> vùng tiếp xúc dài hơn.
import { C, FONT } from '../theme';

export const ROAD_Y = 1080;
export const TIRE = { cx: 540, R: 1000, H: 64, pitch: 68, blockW: 44 };
export const SLIDE = '#FFB000';
export const GRIP = 'rgba(242,245,250,0.22)';
const RUBBER = '#2a3242';
const RUBBER_EDGE = '#6b7588';

// sink (px) theo load 0..1
export const sinkOf = (load) => 30 + 50 * load;
export const halfOf = (load) => {
  const s = sinkOf(load);
  return Math.sqrt(TIRE.R ** 2 - (TIRE.R - s) ** 2);
};

// Độ lệch khối gai tại vị trí u (0 = mép trước, 1 = mép sau).
// Trả về { d, sliding }. dMax: độ lệch lớn nhất có thể (px) ở giữa vùng tiếp xúc.
export const shear = (u, force, dMax = 42) => {
  const want = force * 2.2 * dMax * u; // bám: lệch tăng đều theo quãng đã đi trong vùng tiếp xúc
  const limit = dMax * 4 * u * (1 - u); // lực bám tối đa theo áp suất parabol
  return want > limit ? { d: limit, sliding: true } : { d: want, sliding: false };
};

// Ranh giới bám/trượt (u_s): want = limit -> force*2.2*u = 4u(1-u) -> u_s = 1 - 0.55*force
export const slideStart = (force) => Math.max(0, 1 - 0.55 * force);

// roll: quãng mặt đường đã trôi (px). force, load: 0..1. zones: độ hiện của dải bám/trượt (0..1)
export const ContactPatch = ({ roll = 0, force = 0, load = 0.4, zones = 0, labels = 0, dust = 0, clipTop = 575, slideGlow = 1 }) => {
  const { cx, R, H, pitch, blockW } = TIRE;
  const sink = sinkOf(load);
  const cy = ROAD_Y - R + sink;
  const half = halfOf(load);
  const xLead = cx + half;
  const xTrail = cx - half;
  const L = 2 * half;
  const phi = roll / R; // góc đã quay (rad), mặt dưới đi sang trái -> góc tăng
  const n = Math.round((2 * Math.PI * R) / pitch);
  const dA = (2 * Math.PI) / n;
  const us = slideStart(force);

  const blocks = [];
  for (let i = 0; i < n; i++) {
    const th = i * dA + phi; // góc theo chiều y hướng xuống: 90° = điểm thấp nhất
    const s = Math.sin(th);
    const c = Math.cos(th);
    const x = cx + R * c;
    if (s > 0 && Math.abs(x - cx) < half) {
      // trong vùng tiếp xúc: chân gai nằm trên mặt đường
      const u = (xLead - x) / L;
      const { d, sliding } = shear(u, force);
      const w = blockW;
      const top = ROAD_Y - H; // gốc gai (gắn với thân lốp) — thân lốp bị ép phẳng
      // gốc đi trước (sang trái), chân bị đường giữ lại -> chân lệch về phía mép trước (sang phải)
      const pts = [
        [x - w / 2, top],
        [x + w / 2, top],
        [x + w / 2 + d, ROAD_Y],
        [x - w / 2 + d, ROAD_Y],
      ];
      blocks.push(
        <g key={i}>
          <polygon points={pts.map((p) => p.join(',')).join(' ')} fill={RUBBER} stroke={sliding ? SLIDE : RUBBER_EDGE} strokeWidth={sliding ? 4 : 3} strokeOpacity={sliding ? slideGlow : 1} />
          {sliding && <line x1={x - w / 2 + d} y1={ROAD_Y - 2} x2={x + w / 2 + d} y2={ROAD_Y - 2} stroke={SLIDE} strokeWidth={6} strokeOpacity={slideGlow} strokeLinecap="round" />}
        </g>,
      );
    } else if (s > -0.6) {
      // ngoài vùng tiếp xúc: gai nhô ra theo bán kính
      const deg = (th * 180) / Math.PI - 90;
      blocks.push(
        <g key={i} transform={`translate(${cx},${cy}) rotate(${deg})`}>
          <rect x={-blockW / 2} y={R - H} width={blockW} height={H} rx={4} fill={RUBBER} stroke={RUBBER_EDGE} strokeWidth={3} />
        </g>,
      );
    }
  }

  // thân lốp: hình tròn bán kính R-H, cắt phẳng ở đáy (ROAD_Y - H)
  const bodyR = R - H;
  const flatY = ROAD_Y - H;
  const bodyClip = `tireBodyClip`;

  // vân mặt đường trôi sang trái
  const grit = [];
  const gstep = 37;
  const off = ((roll % gstep) + gstep) % gstep;
  for (let k = -1; k < 1080 / gstep + 2; k++) {
    const gx = k * gstep - off;
    const j = (k * 7919) % 5;
    grit.push(<circle key={k} cx={gx} cy={ROAD_Y + 18 + j * 9} r={3 + (j % 3)} fill="#3a4354" />);
  }

  // hạt bụi: sinh ở mép sau, trôi sang trái và rơi; số hạt theo dust (0..1)
  const parts = [];
  if (dust > 0) {
    const life = 70; // px trôi theo roll
    const spacing = 12 / (0.25 + dust); // cứ mỗi bấy nhiêu px roll sinh một hạt
    const first = Math.floor((roll - life * 6) / spacing);
    for (let k = Math.max(0, first); k <= Math.floor(roll / spacing); k++) {
      const age = roll - k * spacing; // px
      if (age < 0) continue;
      const a = age / (life * 6);
      if (a > 1) continue;
      const h = ((k * 2654435761) >>> 0) / 4294967296;
      const px = xTrail - 6 - age * (0.9 + 0.4 * h);
      const py = ROAD_Y - 6 - 40 * h * Math.sin(Math.min(1, a * 2) * Math.PI * 0.5) + 30 * a * a;
      parts.push(<circle key={k} cx={px} cy={py} r={2.5 + 2.5 * h} fill={C.steel} opacity={(1 - a) * 0.85 * Math.min(1, dust * 2)} />);
    }
  }

  return (
    <g>
      <defs>
        <clipPath id={bodyClip}>
          <rect x={0} y={clipTop} width={1080} height={flatY - clipTop} />
        </clipPath>
        <clipPath id="tireTopClip">
          <rect x={0} y={clipTop} width={1080} height={ROAD_Y - clipTop + 2} />
        </clipPath>
        {/* thân lốp mờ dần lên trên, để không thành một tấm nền cắt ngang */}
        <linearGradient id="tireBodyFade" x1="0" y1={clipTop} x2="0" y2={ROAD_Y} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#141a26" stopOpacity="0" />
          <stop offset="0.55" stopColor="#141a26" stopOpacity="1" />
        </linearGradient>
      </defs>
      {/* mặt đường */}
      <rect x={0} y={ROAD_Y} width={1080} height={170} fill="#161c27" />
      <line x1={0} y1={ROAD_Y} x2={1080} y2={ROAD_Y} stroke={C.steelDark} strokeWidth={4} />
      {grit}
      {/* dải vùng bám / trượt ngay dưới mặt đường */}
      {zones > 0 && (
        <g opacity={zones}>
          <rect x={xLead - L * us} y={ROAD_Y + 4} width={L * us} height={16} rx={6} fill={GRIP} />
          {us < 1 && <rect x={xTrail} y={ROAD_Y + 4} width={L * (1 - us)} height={16} rx={6} fill={SLIDE} fillOpacity={0.8} />}
        </g>
      )}
      {/* thân lốp */}
      <g clipPath="url(#tireTopClip)">
        <g clipPath={`url(#${bodyClip})`}>
          <circle cx={cx} cy={cy} r={bodyR} fill="url(#tireBodyFade)" stroke={RUBBER_EDGE} strokeWidth={4} />
          <circle cx={cx} cy={cy} r={bodyR - 40} fill="none" stroke="#232b3a" strokeWidth={10} />
          <text x={cx} y={flatY - 70} fill={C.dim} fontSize={28} fontWeight={700} fontFamily={FONT} textAnchor="middle" opacity={labels}>
            lốp
          </text>
        </g>
        <line x1={cx - Math.sqrt(Math.max(0, bodyR ** 2 - (flatY - cy) ** 2))} y1={flatY} x2={cx + Math.sqrt(Math.max(0, bodyR ** 2 - (flatY - cy) ** 2))} y2={flatY} stroke={RUBBER_EDGE} strokeWidth={4} />
        {blocks}
      </g>
      {parts}
      {/* nhãn */}
      {labels > 0 && (
        <g opacity={labels} fontFamily={FONT} fontWeight={700}>
          <text x={xLead - (L * us) / 2} y={ROAD_Y + 64} fill={C.white} fontSize={32} textAnchor="middle">
            bám
          </text>
          {us < 0.95 && (
            <text x={xTrail + (L * (1 - us)) / 2} y={ROAD_Y + 64} fill={SLIDE} fontSize={32} textAnchor="middle">
              trượt
            </text>
          )}
          <text x={xLead} y={ROAD_Y + 110} fill={C.dim} fontSize={26} textAnchor="end">
            mép trước
          </text>
          <text x={xTrail} y={ROAD_Y + 110} fill={C.dim} fontSize={26} textAnchor="start">
            mép sau
          </text>
          <text x={cx} y={ROAD_Y + 150} fill={C.dim} fontSize={26} textAnchor="middle">
            mặt đường
          </text>
        </g>
      )}
    </g>
  );
};

// Các frame (trong [f0, f1)) khi một khối gai rời mép sau vùng tiếp xúc, với roll = f * v.
// Dùng chung cho tiếng cao su (sound.jsx), để tiếng rơi đúng frame khối gai bật ra trên hình.
export const exitFrames = (f0, f1, load, v) => {
  const { R, pitch } = TIRE;
  const n = Math.round((2 * Math.PI * R) / pitch);
  const dA = (2 * Math.PI) / n;
  const thE = Math.acos(-halfOf(load) / R);
  const k = (f) => Math.floor(((f * v) / R - thE) / dA);
  const out = [];
  for (let f = Math.max(1, Math.ceil(f0)); f < f1; f++) if (k(f) > k(f - 1)) out.push(f);
  return out;
};
