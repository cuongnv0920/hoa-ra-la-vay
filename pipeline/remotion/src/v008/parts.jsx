// Mảnh hình riêng của video 008 (ngoài Drivetrain.jsx và ClutchPack.jsx). Toạ độ khung 1080×1920.
import { C } from '../theme';
import { T } from '../v003/parts';

export const GOLD = '#FFD23F';
export const SLIP = '#FF4D1A';
const rad = (d) => (d * Math.PI) / 180;

// ---------- Cảnh 2: xe vào cua, nhìn từ trên ----------
// Tâm quay O; trung điểm cầu sau chạy trên vòng bán kính RR; cầu trước cách cầu sau WB theo hướng xe chạy.
// Vì vậy cầu trước chạy trên vòng lớn hơn (RF) và đi quãng đường dài hơn: quay nhanh hơn một chút.
export const TURN = { ox: 900, oy: 1150, RR: 420, WB: 260, th0: 165, th1: 215 };
TURN.RF = Math.hypot(TURN.RR, TURN.WB);
TURN.dF = (Math.atan2(TURN.WB, TURN.RR) * 180) / Math.PI; // độ lệch góc của cầu trước so với cầu sau
export const RATIO_F = TURN.RF / TURN.RR; // tốc độ cầu trước / cầu sau

const pt = (r, deg) => [TURN.ox + r * Math.cos(rad(deg)), TURN.oy + r * Math.sin(rad(deg))];
const arc = (r, a0, a1) => {
  const n = 24;
  return Array.from({ length: n + 1 }, (_, i) => pt(r, a0 + ((a1 - a0) * i) / n))
    .map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(' ');
};

// k: 0..1 quãng đã đi; rigid: thanh nối cứng hai cầu; shake: rung lốp sau (0..1); scrub: vệt trượt (0..1)
export const TurnScene = ({ k = 1, rigid = 0, shake = 0, scrub = 0, tracks = 1, brake = 0 }) => {
  const th = TURN.th0 + (TURN.th1 - TURN.th0) * k;
  const [rx, ry] = pt(TURN.RR, th);
  const [fx, fy] = pt(TURN.RF, th + TURN.dF);
  const head = th - 180; // độ, xoay theo chiều kim đồng hồ từ hướng lên
  const mx = (rx + fx) / 2;
  const my = (ry + fy) / 2;
  const jit = shake > 0 ? Math.sin(k * 900) * 3 * shake : 0;
  return (
    <g>
      <g transform={`translate(${mx + jit},${my}) rotate(${head})`}>
        <rect x={-95} y={-200} width={190} height={400} rx={60} fill="#101a2e" fillOpacity={0.55} stroke={C.steel} strokeWidth={5} />
        {[-1, 1].map((sd) => (
          <g key={sd}>
            <rect x={sd * 105 - 18} y={-130 - 40} width={36} height={80} rx={10} fill="#05080f" stroke={GOLD} strokeWidth={5} />
            <rect x={sd * 105 - 18} y={130 - 40} width={36} height={80} rx={10} fill="#05080f" stroke={C.line} strokeWidth={5} />
          </g>
        ))}
        {rigid > 0 && (
          <g opacity={rigid}>
            <rect x={-12} y={-130} width={24} height={260} rx={8} fill={C.white} />
            <rect x={-30} y={-24} width={60} height={48} rx={8} fill={C.navy} stroke={C.white} strokeWidth={5} />
            <path d="M-12 -24 v-14 a12 12 0 0 1 24 0 v14" fill="none" stroke={C.white} strokeWidth={5} />
          </g>
        )}
        {scrub > 0 &&
          [-1, 1].map((sd) => (
            <g key={'s' + sd} opacity={scrub} stroke={C.steel} strokeWidth={5} strokeLinecap="round">
              {[0, 1, 2].map((i) => (
                <line key={i} x1={sd * 105 - 14 + i * 12} y1={180 + i * 8} x2={sd * 105 - 22 + i * 12} y2={210 + i * 8} />
              ))}
            </g>
          ))}
        {brake > 0 && (
          <g opacity={brake}>
            <line x1={0} y1={-260} x2={0} y2={-330} stroke={C.white} strokeWidth={10} strokeLinecap="round" />
            <path d="M0 -250 l-22 -34 h44 z" fill={C.white} />
          </g>
        )}
      </g>
      {/* vệt bánh: trước (ngoài, dài hơn) và sau (trong); vẽ đè lên thân xe để luôn thấy */}
      <g opacity={tracks} fill="none" strokeLinecap="round">
        <path d={arc(TURN.RF, TURN.th0 + TURN.dF, th + TURN.dF)} stroke={GOLD} strokeWidth={10} opacity={0.9} />
        <path d={arc(TURN.RR, TURN.th0, th)} stroke={C.line} strokeWidth={10} opacity={0.9} />
      </g>
      <T x={pt(TURN.RF, 228)[0] - 40} y={pt(TURN.RF, 228)[1] - 40} s={30} c={GOLD} o={tracks} a="end">
        vệt bánh trước
      </T>
      <T x={pt(TURN.RR, 172)[0] + 40} y={pt(TURN.RR, 172)[1] + 70} s={30} c={C.line} o={tracks} a="start">
        vệt bánh sau
      </T>
    </g>
  );
};

// Đồng hồ tốc độ quay một cầu: kim quay theo góc a (độ).
export const Dial = ({ x, y, a, c, label, o = 1 }) => (
  <g opacity={o}>
    <circle cx={x} cy={y} r={64} fill="#101a2e" stroke={c} strokeWidth={6} />
    {Array.from({ length: 12 }, (_, i) => {
      const t = rad(i * 30);
      return <line key={i} x1={x + Math.cos(t) * 50} y1={y + Math.sin(t) * 50} x2={x + Math.cos(t) * 58} y2={y + Math.sin(t) * 58} stroke={c} strokeWidth={3} opacity={0.6} />;
    })}
    <line x1={x} y1={y} x2={x + Math.cos(rad(a - 90)) * 48} y2={y + Math.sin(rad(a - 90)) * 48} stroke={c} strokeWidth={8} strokeLinecap="round" />
    <circle cx={x} cy={y} r={9} fill={c} />
    <T x={x} y={y + 108} s={30} c={c} w={700}>
      {label}
    </T>
  </g>
);

// Thanh chia lực trước / sau. front: phần cầu trước (0..1).
export const SplitBar = ({ x = 540, y = 1235, w = 560, front = 0.6, c = '#FFB000', o = 1, label = true }) => {
  const xf = x - w / 2 + w * front;
  return (
    <g opacity={o}>
      <rect x={x - w / 2} y={y - 22} width={w} height={44} rx={22} fill="#101a2e" stroke={c} strokeWidth={4} />
      <rect x={x - w / 2} y={y - 22} width={w * front} height={44} rx={22} fill={c} />
      <line x1={xf} y1={y - 32} x2={xf} y2={y + 32} stroke={C.white} strokeWidth={4} />
      {label && (
        <g>
          <T x={x - w / 2 + (w * front) / 2} y={y + 12} s={30} c={C.navy} w={800}>
            {`trước ${Math.round(front * 100)}`}
          </T>
          <T x={xf + (w * (1 - front)) / 2} y={y + 12} s={30} c={c} w={800}>
            {`sau ${Math.round((1 - front) * 100)}`}
          </T>
        </g>
      )}
    </g>
  );
};

// Đường thời gian cảnh 7 (theo Audi): máy tính đoán ở mốc 0, xe cần bốn bánh ở mốc ≈ 0,5 giây sau;
// việc nối lại mất ≈ 0,2 giây nên xong TRƯỚC lúc cần. bracket: 0..1 hiện khoảng 0,5 s; seg: 0..1 vẽ đoạn nối lại.
export const PredictLine = ({ y = 760, x0 = 170, x1 = 910, bracket = 1, seg = 0, c = '#19B5FF' }) => {
  const X = (t) => x0 + ((x1 - x0) * t) / 0.5;
  return (
    <g>
      <line x1={x0} y1={y} x2={x1} y2={y} stroke={C.steel} strokeWidth={6} strokeLinecap="round" />
      {[0, 0.1, 0.2, 0.3, 0.4, 0.5].map((t) => (
        <line key={t} x1={X(t)} y1={y - 10} x2={X(t)} y2={y + 10} stroke={C.steel} strokeWidth={3} />
      ))}
      <circle cx={x0} cy={y} r={14} fill={c} />
      <T x={x0} y={y + 52} s={28} c={c} w={700}>
        máy tính đoán
      </T>
      <circle cx={x1} cy={y} r={14} fill={GOLD} />
      <T x={x1 - 10} y={y + 52} s={28} c={GOLD} w={700} a="end">
        lúc cần bốn bánh
      </T>
      <g opacity={bracket}>
        <path d={`M${x0} ${y - 30} v-18 H${x1} v18`} fill="none" stroke={c} strokeWidth={4} />
        <T x={(x0 + x1) / 2} y={y - 64} s={30} c={c} w={800}>
          ≈ 0,5 giây trước
        </T>
      </g>
      {seg > 0 && (
        <g>
          <line x1={x0} y1={y} x2={X(0.2 * seg)} y2={y} stroke={c} strokeWidth={14} strokeLinecap="round" />
          <T x={X(0.1)} y={y + 96} s={28} c={c} w={800} o={seg}>
            nối lại ≈ 0,2 giây
          </T>
        </g>
      )}
    </g>
  );
};

// Núm kéo khóa vi sai kiểu cũ, vẽ chung chung (không phải bản vẽ xe thật). pull: 0..1 kéo ra.
export const LockKnob = ({ x = 540, y = 960, pull = 0, hand = 1 }) => {
  const dx = 70 * pull;
  return (
    <g>
      <rect x={x - 260} y={y - 150} width={240} height={300} rx={20} fill="#101a2e" stroke={C.steelDark} strokeWidth={5} />
      <T x={x - 140} y={y - 90} s={28} c={C.dim}>
        khóa vi sai
      </T>
      <rect x={x - 30} y={y - 18} width={10 + dx} height={36} rx={6} fill={C.steel} />
      <rect x={x - 20 + dx} y={y - 46} width={46} height={92} rx={18} fill={C.white} />
      <circle cx={x - 140} cy={y + 40} r={22} fill={pull > 0.9 ? '#2BB673' : '#2E3B57'} />
      <T x={x - 140} y={y + 100} s={26} c={pull > 0.9 ? '#2BB673' : C.dim}>
        {pull > 0.9 ? 'đã khóa' : 'mở'}
      </T>
      {/* bàn tay nét vẽ đơn giản: các ngón ôm núm, kéo sang phải */}
      <g opacity={hand} transform={`translate(${x + 30 + dx},${y})`} fill="none" stroke={C.white} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M0 -44 q-26 0 -26 18 q0 12 26 12" />
        <path d="M0 -14 q-30 0 -30 16 q0 12 30 12" />
        <path d="M0 14 q-26 0 -26 16 q0 12 26 12" />
        <path d="M0 -50 q110 -6 150 30 q30 30 -4 66 q-40 34 -146 0" />
      </g>
    </g>
  );
};

// Chip "máy tính" nhỏ, có dây nối tới các điểm.
export const Brain = ({ x, y, c = C.white, to = [], o = 1, pulse = 0 }) => (
  <g opacity={o}>
    {to.map(([tx, ty], i) => (
      <path key={i} d={`M${x} ${y} C ${x} ${(y + ty) / 2}, ${tx} ${(y + ty) / 2}, ${tx} ${ty}`} fill="none" stroke={c} strokeWidth={3} strokeDasharray="10 8" strokeDashoffset={-pulse} opacity={0.8} />
    ))}
    <rect x={x - 70} y={y - 44} width={140} height={88} rx={14} fill="#101a2e" stroke={c} strokeWidth={5} />
    {[-1, 0, 1].map((i) => (
      <g key={i} stroke={c} strokeWidth={4}>
        <line x1={x + i * 34} y1={y - 44} x2={x + i * 34} y2={y - 60} />
        <line x1={x + i * 34} y1={y + 44} x2={x + i * 34} y2={y + 60} />
      </g>
    ))}
    <T x={x} y={y + 10} s={28} c={c} w={800}>
      máy tính
    </T>
  </g>
);

// Ô hỏi chấm ở giữa hai cầu.
export const QBox = ({ x, y, o = 1, s = 1 }) => (
  <g opacity={o}>
    <rect x={x - 48 * s} y={y - 48 * s} width={96 * s} height={96 * s} rx={18 * s} fill="#101a2e" stroke={GOLD} strokeWidth={6} strokeDasharray="14 8" />
    <T x={x} y={y + 22 * s} s={64 * s} c={GOLD} w={900}>
      ?
    </T>
  </g>
);

// Biểu tượng vi sai (bánh răng côn) — để gạch đi ở cảnh 4.1.
export const DiffIcon = ({ x, y, o = 1, cross = 0 }) => (
  <g opacity={o}>
    <circle cx={x} cy={y} r={46} fill="#101a2e" stroke={C.steel} strokeWidth={5} />
    {Array.from({ length: 10 }, (_, i) => {
      const t = rad(i * 36);
      return <rect key={i} x={x + Math.cos(t) * 46 - 6} y={y + Math.sin(t) * 46 - 6} width={12} height={12} fill={C.steel} transform={`rotate(${i * 36} ${x + Math.cos(t) * 46} ${y + Math.sin(t) * 46})`} />;
    })}
    <circle cx={x} cy={y} r={14} fill={C.steel} />
    {cross > 0 && <line x1={x - 62} y1={y + 62} x2={x - 62 + 124 * cross} y2={y + 62 - 124 * cross} stroke={SLIP} strokeWidth={10} strokeLinecap="round" />}
  </g>
);
