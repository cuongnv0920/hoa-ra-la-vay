// Mảnh hình dùng chung của video 007 (khung 1080×1920). Xem quy tắc chính xác ở storyboard 007.
import { C, FONT } from '../theme';
import { Chip, T } from '../v003/parts';
import { BOXER, BORE, HEAD, L, LINER_IN, LINER_OUT, PW, R, pinDist } from './BoxerEngine';

export const INLINE = '#19B5FF';
export const COG = '#FF4D1A';
export const GOLD = '#FFD23F';
export const OMEGA = 5.6; // độ/frame: tốc độ quay chậm dùng chung (giống khung mẫu đã duyệt)
export const LAMBDA = R / L;
const rad = (d) => (d * Math.PI) / 180;

// Lực quán tính của một piston dọc trục xi-lanh (dương = hướng ra ngoài), đơn vị tương đối.
export const inertia = (phi) => Math.cos(phi) + LAMBDA * Math.cos(2 * phi);

// Độ lóe khi piston tới điểm đầu/cuối hành trình (φ = 0° hoặc 180°). Trả về {o, out}.
export const turnFlash = (thetaDeg) => {
  const m = ((thetaDeg % 180) + 180) % 180;
  const dist = Math.min(m, 180 - m);
  const near = Math.round(thetaDeg / 180);
  return { o: Math.exp(-((dist / 22) ** 2)), out: ((near % 2) + 2) % 2 === 0 };
};

export const Arrow = ({ x, y, dx, dy, c = C.white, w = 8, o = 1, head = 22 }) => {
  const len = Math.hypot(dx, dy);
  if (len < 4) return null;
  const ux = dx / len;
  const uy = dy / len;
  const ex = x + dx;
  const ey = y + dy;
  const h = Math.min(head, len * 0.6);
  return (
    <path
      d={`M ${x} ${y} L ${ex} ${ey} M ${ex - ux * h - uy * h * 0.8} ${ey - uy * h + ux * h * 0.8} L ${ex} ${ey} L ${ex - ux * h + uy * h * 0.8} ${ey - uy * h - ux * h * 0.8}`}
      fill="none"
      stroke={c}
      strokeWidth={w}
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={o}
    />
  );
};

export const Group = ({ x = 0, y = 0, s = 1, r = 0, o = 1, children }) => (
  <g transform={`translate(${x},${y}) rotate(${r}) scale(${s})`} opacity={o}>
    {children}
  </g>
);

// ---------- Máy boxer nhìn từ phía trước (thấy được vòng quay trục khuỷu) ----------
// Toạ độ cục bộ: tâm trục khuỷu ở (0,0). Hai xi-lanh của một cặp: chốt khuỷu lệch 180° → hai piston cùng ra, cùng vào.
export const BoxerFront = ({ theta = 0, lit = { L: true, R: true }, color = BOXER, heads = true, headGlow = false, dimO = 0.25 }) => {
  const phi = rad(theta);
  const s = pinDist(phi);
  const pr = [R * Math.cos(phi), -R * Math.sin(phi)];
  const side = (k, on) => {
    const sx = (d) => k * d;
    const pin = k === 1 ? pr : [-pr[0], -pr[1]];
    return (
      <g opacity={on ? 1 : dimO}>
        <rect x={Math.min(sx(LINER_IN), sx(LINER_OUT))} y={-BORE / 2} width={LINER_OUT - LINER_IN} height={BORE} fill="rgba(25,181,255,0.05)" stroke={C.steel} strokeWidth="4" />
        {heads && (
          <rect
            x={Math.min(sx(LINER_OUT), sx(LINER_OUT + HEAD))}
            y={-BORE / 2 - 14}
            width={HEAD}
            height={BORE + 28}
            rx={10}
            fill={headGlow ? 'rgba(255,176,0,0.35)' : C.panel}
            stroke={headGlow ? color : C.steel}
            strokeWidth={headGlow ? 6 : 4}
          />
        )}
        <line x1={pin[0]} y1={pin[1]} x2={sx(s)} y2={0} stroke={color} strokeWidth="12" strokeLinecap="round" opacity={0.85} />
        <rect x={Math.min(sx(s - PW * 0.3), sx(s + PW * 0.7))} y={-BORE / 2 + 7} width={PW} height={BORE - 14} rx={8} fill={color} />
        <circle cx={sx(s)} cy={0} r={9} fill={C.navy} />
        <circle cx={pin[0]} cy={pin[1]} r={13} fill={C.steel} stroke={C.navy} strokeWidth="3" />
      </g>
    );
  };
  return (
    <g>
      <circle r={74} fill={C.panel} stroke={C.steelDark} strokeWidth="4" />
      <circle r={R} fill="none" stroke={C.steelDark} strokeWidth="3" strokeDasharray="6 6" />
      <line x1={pr[0]} y1={pr[1]} x2={-pr[0]} y2={-pr[1]} stroke={C.steel} strokeWidth="14" strokeLinecap="round" />
      <circle r={16} fill={C.steel} />
      {side(1, lit.R)}
      {side(-1, lit.L)}
    </g>
  );
};
export const BOXER_FRONT_HALF_W = LINER_OUT + HEAD; // 300
export const BOXER_FRONT_HALF_H = BORE / 2 + 14; // 66

// ---------- Máy thẳng hàng 4 xi-lanh nhìn nghiêng ----------
// Toạ độ cục bộ: trục khuỷu nằm ngang ở y = 0. Piston 1 và 4 cùng lên khi 2 và 3 xuống.
const PITCH = 120;
export const inlineForce = (theta) => {
  // Tổng lực quán tính dọc của 4 piston: phần bậc một triệt tiêu, còn lại ∝ cos 2θ (nhịp gấp đôi).
  const a = rad(theta);
  return [a, a + Math.PI, a + Math.PI, a].reduce((acc, p) => acc + inertia(p), 0) / 4;
};
export const InlineSide = ({ theta = 0, color = INLINE, hiIndex = -1, heads = true, headGlow = false }) => {
  const phis = [0, 180, 180, 0].map((d) => rad(theta + d));
  const top = -(LINER_OUT + 10);
  return (
    <g>
      <rect x={-2 * PITCH - 30} y={-40} width={4 * PITCH + 60} height={110} rx={20} fill={C.panel} stroke={C.steelDark} strokeWidth="4" />
      <line x1={-2 * PITCH - 60} y1={0} x2={2 * PITCH + 60} y2={0} stroke={C.steel} strokeWidth="14" strokeLinecap="round" />
      {heads && (
        <rect x={-2 * PITCH - 20} y={top - HEAD} width={4 * PITCH + 40} height={HEAD} rx={10} fill={headGlow ? 'rgba(25,181,255,0.3)' : C.panel} stroke={headGlow ? color : C.steel} strokeWidth={headGlow ? 6 : 4} />
      )}
      {phis.map((phi, i) => {
        const x = (i - 1.5) * PITCH;
        const s = pinDist(phi);
        const pin = [x + R * Math.sin(phi), -R * Math.cos(phi)];
        const on = hiIndex < 0 || hiIndex === i;
        return (
          <g key={i}>
            <rect x={x - BORE / 2} y={top} width={BORE} height={LINER_OUT - LINER_IN + 10} fill={on && hiIndex >= 0 ? 'rgba(25,181,255,0.22)' : 'rgba(25,181,255,0.05)'} stroke={on && hiIndex >= 0 ? color : C.steel} strokeWidth="4" />
            <line x1={pin[0]} y1={pin[1]} x2={x} y2={-s} stroke={color} strokeWidth="12" strokeLinecap="round" opacity={0.85} />
            <rect x={x - BORE / 2 + 7} y={-s - PW * 0.7} width={BORE - 14} height={PW} rx={8} fill={color} />
            <circle cx={x} cy={-s} r={9} fill={C.navy} />
            <circle cx={pin[0]} cy={pin[1]} r={13} fill={C.steel} stroke={C.navy} strokeWidth="3" />
          </g>
        );
      })}
    </g>
  );
};

// Máy thẳng hàng nhìn từ phía trước: một xi-lanh đứng, nắp máy trên cùng.
export const InlineFront = ({ theta = 0, color = INLINE }) => {
  const phi = rad(theta);
  const s = pinDist(phi);
  const pin = [R * Math.sin(phi), -R * Math.cos(phi)];
  const top = -(LINER_OUT + 10);
  return (
    <g>
      <circle r={74} fill={C.panel} stroke={C.steelDark} strokeWidth="4" />
      <rect x={-BORE / 2} y={top} width={BORE} height={LINER_OUT - LINER_IN + 10} fill="rgba(25,181,255,0.05)" stroke={C.steel} strokeWidth="4" />
      <rect x={-BORE / 2 - 14} y={top - HEAD} width={BORE + 28} height={HEAD} rx={10} fill={C.panel} stroke={C.steel} strokeWidth="4" />
      <line x1={pin[0]} y1={pin[1]} x2={0} y2={-s} stroke={color} strokeWidth="12" strokeLinecap="round" opacity={0.85} />
      <rect x={-BORE / 2 + 7} y={-s - PW * 0.7} width={BORE - 14} height={PW} rx={8} fill={color} />
      <circle cx={pin[0]} cy={pin[1]} r={13} fill={C.steel} stroke={C.navy} strokeWidth="3" />
    </g>
  );
};
export const INLINE_FRONT_TOP = -(LINER_OUT + 10 + HEAD); // −310

// Cặp trục cân bằng (kiểu Lanchester): quay ngược chiều nhau, nhanh gấp đôi trục khuỷu.
export const BalanceShafts = ({ theta = 0, x = 0, y = 0, gap = 150, o = 1 }) => {
  const a = rad(2 * theta);
  const w = (k) => {
    const ang = k === 1 ? a : Math.PI - a; // ngược chiều; thành phần ngang triệt tiêu, thành phần dọc cùng pha
    const cx = x + k * gap / 2;
    return (
      <g key={k}>
        <circle cx={cx} cy={y} r={30} fill={C.panel} stroke={C.steel} strokeWidth="4" />
        <circle cx={cx + 22 * Math.cos(ang)} cy={y + 22 * Math.sin(ang)} r={16} fill={GOLD} />
        <circle cx={cx} cy={y} r={6} fill={C.steel} />
      </g>
    );
  };
  return <g opacity={o}>{[-1, 1].map(w)}</g>;
};

// ---------- Mặt cắt ngang đầu xe (nhìn từ phía trước) ----------
// Xe gầm cao chung chung, không theo dáng mẫu xe thật. Mặt đất y = GROUND.
export const GROUND = 1250;
export const CarFront = ({ o = 1, bay = true, labels = 0 }) => {
  const wy = GROUND - 72;
  return (
    <g opacity={o}>
      <line x1={90} y1={GROUND} x2={990} y2={GROUND} stroke={C.steelDark} strokeWidth="4" />
      {/* thân xe */}
      <path d="M 210 1150 L 205 960 Q 210 905 270 890 L 330 730 Q 345 690 400 685 L 680 685 Q 735 690 750 730 L 810 890 Q 870 905 875 960 L 870 1150 Z" fill="rgba(16,26,46,0.85)" stroke={C.steel} strokeWidth="5" />
      <path d="M 345 880 L 395 745 L 685 745 L 735 880 Z" fill="rgba(25,181,255,0.06)" stroke={C.steelDark} strokeWidth="3" />
      {/* khoang máy */}
      {bay && <rect x={260} y={960} width={560} height={175} rx={14} fill="rgba(5,9,18,0.6)" stroke={C.steelDark} strokeWidth="3" strokeDasharray="10 8" />}
      {/* bánh xe và hệ treo */}
      {[230, 850].map((x) => (
        <g key={x}>
          <rect x={x - 46} y={wy - 72} width={92} height={144} rx={22} fill="#1b2233" stroke={C.steel} strokeWidth="4" />
          <path d={`M ${x} ${wy} L ${x < 540 ? 300 : 780} ${1120}`} stroke={C.steelDark} strokeWidth="8" strokeLinecap="round" />
        </g>
      ))}
      {labels > 0 && (
        <>
          <Chip x={540} y={650} text="thân xe" c={C.steel} s={28} o={Math.min(1, labels * 3)} />
          <Chip x={200} y={1300} text="bánh, hệ treo" c={C.steel} s={28} o={Math.min(1, labels * 3 - 1)} />
          <Chip x={720} y={1300} text="gầm xe" c={C.steel} s={28} o={Math.min(1, labels * 3 - 2)} />
        </>
      )}
    </g>
  );
};

export const CoG = ({ x, y, r = 16, o = 1, label }) => (
  <g opacity={o}>
    <circle cx={x} cy={y} r={r + 10} fill="none" stroke={COG} strokeWidth="3" opacity={0.5} />
    <circle cx={x} cy={y} r={r} fill={COG} />
    <path d={`M ${x - r} ${y} L ${x + r} ${y} M ${x} ${y - r} L ${x} ${y + r}`} stroke={C.navy} strokeWidth="4" />
    {label && (
      <T x={x + r + 18} y={y + 10} s={28} c={COG} a="start">
        {label}
      </T>
    )}
  </g>
);

// Thước kích thước (không ghi số). horizontal: true = đo ngang.
export const Bracket = ({ x1, y1, x2, y2, c = C.white, o = 1, label, lx, ly }) => {
  const hor = Math.abs(y2 - y1) < Math.abs(x2 - x1);
  const t = 14;
  return (
    <g opacity={o}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth="4" />
      {hor ? (
        <>
          <line x1={x1} y1={y1 - t} x2={x1} y2={y1 + t} stroke={c} strokeWidth="4" />
          <line x1={x2} y1={y2 - t} x2={x2} y2={y2 + t} stroke={c} strokeWidth="4" />
        </>
      ) : (
        <>
          <line x1={x1 - t} y1={y1} x2={x1 + t} y2={y1} stroke={c} strokeWidth="4" />
          <line x1={x2 - t} y1={y2} x2={x2 + t} y2={y2} stroke={c} strokeWidth="4" />
        </>
      )}
      {label && (
        <T x={lx ?? (x1 + x2) / 2} y={ly ?? (y1 + y2) / 2} s={28} c={c}>
          {label}
        </T>
      )}
    </g>
  );
};

// ---------- Sơ đồ nhìn từ trên xuống (bố cục xe) ----------
// Dấu chân máy, trục dọc theo chiều dài xe. s: tỉ lệ. Cùng đường kính xi-lanh (BORE) cho cả hai máy.
export const FOOT = { inline: { w: 170, l: 4 * 120 + 40 }, boxer: { w: 460, l: 2 * 120 + 56 + 40 } };
export const InlineFoot = ({ x, y, s = 1, o = 1, c = INLINE }) => {
  const w = FOOT.inline.w * s;
  const l = FOOT.inline.l * s;
  return (
    <g opacity={o}>
      <rect x={x - w / 2} y={y - l / 2} width={w} height={l} rx={14 * s} fill="rgba(25,181,255,0.12)" stroke={c} strokeWidth="4" />
      {[0, 1, 2, 3].map((i) => (
        <circle key={i} cx={x} cy={y - l / 2 + 20 * s + 60 * s + i * 120 * s} r={(BORE / 2) * s} fill="none" stroke={c} strokeWidth="3" />
      ))}
    </g>
  );
};
export const BoxerFoot = ({ x, y, s = 1, o = 1, c = BOXER }) => {
  const w = FOOT.boxer.w * s;
  const l = FOOT.boxer.l * s;
  const cyl = (k, dy) => <rect key={k + ':' + dy} x={k > 0 ? x + 40 * s : x - (w / 2)} y={y + dy * s - (BORE / 2) * s} width={w / 2 - 40 * s} height={BORE * s} rx={10 * s} fill="rgba(255,176,0,0.14)" stroke={c} strokeWidth="3" />;
  return (
    <g opacity={o}>
      <rect x={x - 70 * s} y={y - l / 2} width={140 * s} height={l} rx={14 * s} fill="rgba(255,176,0,0.12)" stroke={c} strokeWidth="4" />
      {cyl(1, -88)}
      {cyl(-1, -32)}
      {cyl(1, 60)}
      {cyl(-1, 116)}
    </g>
  );
};

// Thân xe nhìn từ trên, đầu xe ở trên. Trả về các mốc để đặt máy, hộp số.
export const TOP = { x: 540, y0: 600, y1: 1300, w: 400, firewall: 840, axleF: 715, axleR: 1170 };
export const CarTop = ({ o = 1, front = false, rear = false, shaft = 0, retro = false }) => {
  const { x, y0, y1, w, firewall, axleF, axleR } = TOP;
  const col = retro ? '#c9b48a' : C.steel;
  return (
    <g opacity={o}>
      <rect x={x - w / 2} y={y0} width={w} height={y1 - y0} rx={70} fill="rgba(16,26,46,0.85)" stroke={col} strokeWidth="5" strokeDasharray={retro ? '14 8' : undefined} />
      <line x1={x - w / 2 + 10} y1={firewall} x2={x + w / 2 - 10} y2={firewall} stroke={col} strokeWidth="4" strokeDasharray="10 8" />
      <T x={x - w / 2 + 22} y={firewall + 34} s={22} c={C.dim} a="start" w={600}>
        vách khoang lái
      </T>
      {[axleF, axleR].map((ay, i) => (
        <g key={ay}>
          {[-1, 1].map((k) => (
            <rect key={k} x={x + k * (w / 2 + 4) - 24} y={ay - 52} width={48} height={104} rx={14} fill="#1b2233" stroke={(i === 0 ? front : rear) ? GOLD : col} strokeWidth="4" />
          ))}
          <line x1={x - w / 2 + 20} y1={ay} x2={x + w / 2 - 20} y2={ay} stroke={(i === 0 ? front : rear) ? GOLD : C.steelDark} strokeWidth={(i === 0 ? front : rear) ? 8 : 4} opacity={0.9} />
        </g>
      ))}
      {shaft > 0 && <line x1={x} y1={firewall + 150} x2={x} y2={axleR} stroke={GOLD} strokeWidth="8" opacity={shaft} strokeLinecap="round" />}
    </g>
  );
};
export const Gearbox = ({ x = TOP.x, y = TOP.firewall - 20, o = 1, c = C.steel }) => (
  <g opacity={o}>
    <rect x={x - 34} y={y} width={68} height={170} rx={14} fill={C.panel} stroke={c} strokeWidth="4" />
    <T x={x + 52} y={y + 95} s={24} c={c} a="start" w={600}>
      hộp số
    </T>
  </g>
);

// ---------- Biểu tượng ----------
export const Glove = ({ x, y, dir = 1, s = 1, o = 1 }) => (
  // dir: +1 nắm đấm hướng sang phải
  <g transform={`translate(${x},${y}) scale(${dir * s},${s})`} opacity={o}>
    <rect x={-70} y={-26} width={44} height={52} rx={10} fill="#d23b2f" stroke={C.navy} strokeWidth="3" />
    <rect x={-34} y={-44} width={84} height={88} rx={38} fill="#e8473a" stroke={C.navy} strokeWidth="3" />
    <path d="M -22 -40 Q -6 -58 18 -44" fill="none" stroke={C.navy} strokeWidth="4" />
  </g>
);

export const SparkPlug = ({ x, y, r = 0, s = 1, o = 1 }) => (
  <g transform={`translate(${x},${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-8} y={-70} width={16} height={34} rx={6} fill="#e9edf3" />
    <rect x={-14} y={-38} width={28} height={22} fill={C.steel} />
    <rect x={-9} y={-16} width={18} height={26} fill={C.steelDark} />
    <line x1={0} y1={10} x2={0} y2={22} stroke={C.steel} strokeWidth="4" />
  </g>
);

export const Wrench = ({ x, y, r = 0, o = 1 }) => (
  <g transform={`translate(${x},${y}) rotate(${r})`} opacity={o}>
    <rect x={-10} y={0} width={20} height={150} rx={8} fill={C.steel} />
    <path d="M -26 -6 A 28 28 0 1 1 26 -6 L 12 -6 L 12 14 L -12 14 L -12 -6 Z" fill={C.steel} />
  </g>
);

export const Check = ({ x, y, s = 1, o = 1, c = '#2BB673' }) => (
  <path d={`M ${x - 30 * s} ${y} L ${x - 8 * s} ${y + 24 * s} L ${x + 34 * s} ${y - 26 * s}`} fill="none" stroke={c} strokeWidth={12 * s} strokeLinecap="round" strokeLinejoin="round" opacity={o} />
);

export const Big = ({ x, y, s = 180, c = GOLD, children, o = 1 }) => (
  <text x={x} y={y} fill={c} fontSize={s} fontWeight={800} fontFamily={FONT} textAnchor="middle" opacity={o}>
    {children}
  </text>
);
