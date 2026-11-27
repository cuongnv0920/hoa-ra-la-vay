// Mảnh hình riêng của video 009 (ngoài ContactPatch.jsx). Toạ độ khung 1080×1920, vùng hình y 560–1320.
// Quy tắc (storyboard): xe là bóng SUV chung chung, không logo; đồ thị mô-men xoắn định tính, không ghi số;
// áp suất không ghi số; đảo lốp không vẽ sơ đồ cụ thể.
import { C, FONT } from '../theme';
import { CarSide, carWheel, T } from '../v003/parts';
import { ContactPatch } from './ContactPatch';

export const EV = '#19B5FF';
export const ICE = '#9AA6B8';
export const SLIDE = '#FFB000';
export const GOLD = '#FFD23F';
export const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' };

// ---------- mũi tên ----------
export const Arrow = ({ x1, y1, x2, y2, w = 10, c = C.white, o = 1 }) => {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const h = Math.max(16, w * 2.2);
  const bx = x2 - h * Math.cos(a);
  const by = y2 - h * Math.sin(a);
  const px = Math.sin(a) * h * 0.6;
  const py = -Math.cos(a) * h * 0.6;
  if (o <= 0) return null;
  return (
    <g opacity={o}>
      <line x1={x1} y1={y1} x2={bx} y2={by} stroke={c} strokeWidth={w} strokeLinecap="round" />
      <path d={`M${x2} ${y2} L${bx + px} ${by + py} L${bx - px} ${by - py} Z`} fill={c} />
    </g>
  );
};

// ---------- xe nhìn ngang, có lớp nhìn xuyên ----------
// battery: 0..1 khối pin hạ xuống sàn; brake: 0..1 hiện đĩa và má phanh ở bánh trước; weight: 0..1 mũi tên trọng lượng
export const CarSideX = ({ cx = 540, cy = 930, w = 820, color = EV, roll = 0, battery = 0, brake = 0, weight = 0, push = 0, label = '', o = 1, body = '#0f1a2d' }) => {
  const h = w * 0.27;
  const x0 = cx - w / 2;
  const wf = carWheel(cx, cy, w, 1);
  const wr = carWheel(cx, cy, w, 0);
  const bY = cy + h * 0.12;
  return (
    <g opacity={o}>
      <CarSide cx={cx} cy={cy} w={w} wheelRot={roll} stroke={color} body={body} />
      {battery > 0 && (
        <g opacity={Math.min(1, battery * 2)}>
          <rect x={x0 + w * 0.28} y={bY - 40 * (1 - battery)} width={w * 0.44} height={h * 0.16} rx={8} fill={color} fillOpacity={0.35} stroke={color} strokeWidth={4} />
          {[1, 2, 3, 4, 5].map((i) => (
            <line key={i} x1={x0 + w * 0.28 + (w * 0.44 * i) / 6} y1={bY - 40 * (1 - battery) + 6} x2={x0 + w * 0.28 + (w * 0.44 * i) / 6} y2={bY - 40 * (1 - battery) + h * 0.16 - 6} stroke={color} strokeOpacity={0.6} strokeWidth={3} />
          ))}
        </g>
      )}
      {brake > 0 && (
        <g opacity={brake} transform={`translate(${wf.x},${wf.y})`}>
          <circle r={wf.r * 0.7} fill="none" stroke={C.steel} strokeWidth={6} />
          <rect x={-wf.r * 0.95} y={-wf.r * 0.42} width={wf.r * 0.28} height={wf.r * 0.84} rx={4} fill={C.pad} stroke={EV} strokeWidth={3} />
        </g>
      )}
      {weight > 0 &&
        [wr, wf].map((p, i) => <Arrow key={i} x1={p.x} y1={cy - h * 0.55} x2={p.x} y2={cy - h * 0.55 + 40 + 70 * weight} w={6 + 10 * weight} c={C.white} o={Math.min(1, weight * 2)} />)}
      {push > 0 && <Arrow x1={wf.x - 10} y1={wf.y + wf.r + 18} x2={wf.x + 60 + 140 * push} y2={wf.y + wf.r + 18} w={6 + 12 * push} c={C.white} o={Math.min(1, push * 3)} />}
      {label && <T x={cx} y={cy + h * 0.75} s={30} c={color}>{label}</T>}
    </g>
  );
};

// ---------- xe nhìn từ trên ----------
// patch: 0..1 bốn mảng tiếp xúc sáng; dust: 0..1 bụi ở bốn bánh; rot: góc xoay (độ)
export const CarTop = ({ cx = 540, cy = 930, s = 1, color = EV, rot = 0, patch = 0, dust = 0, f = 0, o = 1, wheelsOnly = 0, swap = 0 }) => {
  const W2 = 120 * s;
  const L2 = 250 * s;
  const wx = 138 * s;
  const wyF = -150 * s;
  const wyR = 150 * s;
  const wheel = (x, y, k) => (
    <g key={k}>
      <rect x={x - 22 * s} y={y - 42 * s} width={44 * s} height={84 * s} rx={10 * s} fill="#05080f" stroke={color} strokeWidth={4} />
      {patch > 0 && <rect x={x - 18 * s} y={y - 14 * s} width={36 * s} height={28 * s} rx={6 * s} fill={C.white} opacity={patch} />}
      {dust > 0 &&
        [0, 1, 2].map((i) => {
          const a = ((f * 0.9 + i * 11 + k * 7) % 30) / 30;
          return <circle key={i} cx={x + (i - 1) * 9 * s} cy={y + 46 * s + a * 40 * s} r={3 + 2 * (1 - a)} fill={C.steel} opacity={dust * (1 - a)} />;
        })}
    </g>
  );
  const W = [
    [-wx, wyF],
    [wx, wyF],
    [-wx, wyR],
    [wx, wyR],
  ];
  return (
    <g opacity={o} transform={`translate(${cx},${cy}) rotate(${rot})`}>
      {wheelsOnly < 1 && <rect x={-W2} y={-L2} width={2 * W2} height={2 * L2} rx={70 * s} fill="#0f1a2d" fillOpacity={0.6 * (1 - wheelsOnly)} stroke={color} strokeWidth={5} opacity={1 - wheelsOnly} />}
      {wheelsOnly < 1 && <rect x={-W2 * 0.7} y={-L2 * 0.35} width={W2 * 1.4} height={L2 * 0.75} rx={30 * s} fill="none" stroke={color} strokeOpacity={0.45 * (1 - wheelsOnly)} strokeWidth={3} />}
      {W.map(([x, y], k) => {
        // swap 0..1: bốn bánh đổi chỗ theo vòng (chỉ minh họa "đổi chỗ", không phải một sơ đồ đảo lốp cụ thể)
        const [nx, ny] = W[[1, 3, 0, 2][k]];
        return wheel(x + (nx - x) * swap, y + (ny - y) * swap, k);
      })}
    </g>
  );
};

// ---------- bóng SUV nhìn ngang, nhỏ (đoàn xe, bàn cân) ----------
export const Suv = ({ cx, cy, w = 300, color = EV, roll = 0, o = 1 }) => <CarSide cx={cx} cy={cy} w={w} wheelRot={roll} stroke={color} body="#0f1a2d" o={o} />;

// ---------- cột so sánh ----------
export const BarPair = ({ x = 540, base = 1180, hA = 0, hB = 0, cA = ICE, cB = EV, lA, lB, gap = 220, bw = 150, labelB, o = 1 }) => (
  <g opacity={o}>
    <line x1={x - gap - bw} y1={base} x2={x + gap + bw} y2={base} stroke={C.steelDark} strokeWidth={4} />
    <rect x={x - gap / 2 - bw} y={base - hA} width={bw} height={hA} rx={10} fill={cA} fillOpacity={0.35} stroke={cA} strokeWidth={4} />
    <rect x={x + gap / 2} y={base - hB} width={bw} height={hB} rx={10} fill={cB} fillOpacity={0.35} stroke={cB} strokeWidth={4} />
    <T x={x - gap / 2 - bw / 2} y={base + 48} s={30} c={cA}>{lA}</T>
    <T x={x + gap / 2 + bw / 2} y={base + 48} s={30} c={cB}>{lB}</T>
    {labelB && <T x={x + gap / 2 + bw / 2} y={base - hB - 24} s={48} c={GOLD} w={800}>{labelB}</T>}
  </g>
);

// ---------- dải khoảng ----------
export const RangeBand = ({ y = 900, p = 1, mark = 0.6, o = 1 }) => {
  const x0 = 140;
  const x1 = 940;
  const sx = (v) => x0 + ((v - 10) / 30) * (x1 - x0); // trục 10%..40%
  return (
    <g opacity={o}>
      <line x1={x0} y1={y} x2={x1} y2={y} stroke={C.steelDark} strokeWidth={4} />
      {[10, 20, 30, 40].map((v) => (
        <g key={v}>
          <line x1={sx(v)} y1={y - 12} x2={sx(v)} y2={y + 12} stroke={C.steelDark} strokeWidth={3} />
          <T x={sx(v)} y={y + 52} s={28} c={C.dim}>{v + '%'}</T>
        </g>
      ))}
      <rect x={sx(20)} y={y - 34} width={(sx(30) - sx(20)) * p} height={68} rx={14} fill={GOLD} fillOpacity={0.3} stroke={GOLD} strokeWidth={4} />
      {mark > 0 && (
        <g opacity={mark}>
          <line x1={sx(26)} y1={y - 70} x2={sx(26)} y2={y + 30} stroke={EV} strokeWidth={6} />
          <T x={sx(26)} y={y - 86} s={30} c={EV}>+26% (thử nghiệm ở Anh)</T>
        </g>
      )}
    </g>
  );
};

// ---------- bàn cân ----------
// value: số đang hiện (kg); frac: 0..1 kim quay theo value / maxKg
export const WeighScale = ({ cx, y = 1180, value = 0, maxKg = 2000, color = EV, label, sub, carO = 1, labelO = 1, glow = 0, w = 380, roll = 0 }) => {
  const r = 70;
  const dialY = y + 20;
  const a = -210 + 240 * Math.min(1, value / maxKg);
  const rad = (d) => (d * Math.PI) / 180;
  return (
    <g>
      <Suv cx={cx} cy={y - 120} w={w * 0.78} color={color} o={carO} roll={roll} />
      <rect x={cx - w / 2} y={y - 40} width={w} height={26} rx={10} fill="#1b2433" stroke={C.steel} strokeWidth={4} />
      <g transform={`translate(${cx},${dialY + 60})`}>
        <circle r={r} fill="#0b1220" stroke={glow ? GOLD : C.steel} strokeWidth={glow ? 6 : 4} />
        {[-210, -150, -90, -30, 30].map((d) => (
          <line key={d} x1={(r - 12) * Math.cos(rad(d))} y1={(r - 12) * Math.sin(rad(d))} x2={(r - 2) * Math.cos(rad(d))} y2={(r - 2) * Math.sin(rad(d))} stroke={C.steelDark} strokeWidth={3} />
        ))}
        <line x1={0} y1={0} x2={(r - 16) * Math.cos(rad(a))} y2={(r - 16) * Math.sin(rad(a))} stroke={color} strokeWidth={6} strokeLinecap="round" />
        <circle r={8} fill={color} />
      </g>
      <T x={cx} y={dialY + 175} s={46} c={C.white} w={800}>{value > 0 ? '≈ ' + Math.round(value).toLocaleString('vi-VN').replace(/,/g, '.') + ' kg' : ''}</T>
      <T x={cx} y={y - 230} s={30} c={color} o={labelO}>{label}</T>
      {sub && <T x={cx} y={y - 195} s={24} c={C.dim} o={labelO}>{sub}</T>}
    </g>
  );
};

// ---------- trục đồ thị ----------
const Axes = ({ x0, y0, w, h, xl, yl, o = 1 }) => (
  <g opacity={o} fontFamily={FONT}>
    <line x1={x0} y1={y0} x2={x0 + w} y2={y0} stroke={C.steel} strokeWidth={4} />
    <line x1={x0} y1={y0} x2={x0} y2={y0 - h} stroke={C.steel} strokeWidth={4} />
    <path d={`M${x0 + w + 16} ${y0} l-18 -10 v20 z`} fill={C.steel} />
    <path d={`M${x0} ${y0 - h - 16} l-10 18 h20 z`} fill={C.steel} />
    <T x={x0 + w} y={y0 + 46} s={28} c={C.dim} a="end">{xl}</T>
    <T x={x0 + 14} y={y0 - h - 26} s={28} c={C.dim} a="start">{yl}</T>
  </g>
);
const path = (pts) => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');

// Mô-men xoắn theo vòng tua (định tính): máy xăng tăng dần; mô-tơ điện cao ngay từ gần 0, giảm ở vòng tua cao.
export const TorqueCurve = ({ pIce = 1, pEv = 1, o = 1 }) => {
  const x0 = 170;
  const y0 = 1180;
  const w = 760;
  const h = 480;
  const N = 60;
  const ice = Array.from({ length: N + 1 }, (_, i) => {
    const u = i / N;
    const v = 0.18 + 0.62 * Math.sin(Math.min(1, u / 0.7) * Math.PI * 0.5) - 0.12 * Math.max(0, u - 0.75) * 4;
    return [x0 + u * w, y0 - v * h];
  });
  const ev = Array.from({ length: N + 1 }, (_, i) => {
    const u = i / N;
    const rise = Math.min(1, u / 0.03);
    const v = (u < 0.45 ? 0.92 : 0.92 * (0.45 / u) ** 0.9) * rise;
    return [x0 + u * w, y0 - v * h];
  });
  const cut = (pts, p) => pts.slice(0, Math.max(2, Math.round(p * pts.length)));
  return (
    <g opacity={o}>
      <Axes x0={x0} y0={y0} w={w} h={h} xl="vòng tua →" yl="mô-men xoắn" />
      {pIce > 0 && <path d={path(cut(ice, pIce))} fill="none" stroke={ICE} strokeWidth={8} strokeLinecap="round" />}
      {pEv > 0 && <path d={path(cut(ev, pEv))} fill="none" stroke={EV} strokeWidth={8} strokeLinecap="round" />}
      <T x={x0 + w * 0.82} y={y0 - h * 0.62} s={30} c={ICE} o={pIce > 0.9 ? 1 : 0}>máy xăng</T>
      <T x={x0 + w * 0.2} y={y0 - h * 0.98} s={30} c={EV} o={pEv > 0.3 ? 1 : 0} a="start">mô-tơ điện</T>
    </g>
  );
};

// Lực kéo theo thời gian: soft (đạp nhẹ, dốc thoai thoải), hard (đạp gắt, vọt dựng đứng). p: 0..1 phần đã vẽ
export const ForceTimeGraph = ({ pSoft = 0, pHard = 0, x0 = 190, y0 = 880, w = 700, h = 260, o = 1, small = false }) => {
  const N = 50;
  const soft = Array.from({ length: N + 1 }, (_, i) => {
    const u = i / N;
    return [x0 + u * w, y0 - h * 0.7 * (1 - Math.exp(-u * 2.2)) / (1 - Math.exp(-2.2))];
  });
  const hard = Array.from({ length: N + 1 }, (_, i) => {
    const u = i / N;
    return [x0 + u * w, y0 - h * 0.95 * (1 - Math.exp(-u * 18))];
  });
  const cut = (pts, p) => pts.slice(0, Math.max(2, Math.round(p * pts.length)));
  return (
    <g opacity={o}>
      <Axes x0={x0} y0={y0} w={w} h={h} xl="thời gian →" yl="lực kéo" />
      {pSoft > 0 && <path d={path(cut(soft, pSoft))} fill="none" stroke={C.white} strokeWidth={small ? 6 : 8} strokeLinecap="round" />}
      {pHard > 0 && <path d={path(cut(hard, pHard))} fill="none" stroke={SLIDE} strokeWidth={small ? 6 : 8} strokeLinecap="round" />}
      {pSoft > 0.6 && !small && <T x={x0 + w * 0.8} y={y0 - h * 0.78} s={28} c={C.white}>đạp nhẹ</T>}
      {pHard > 0.3 && !small && <T x={x0 + w * 0.22} y={y0 - h * 1.05} s={28} c={SLIDE} a="start">đạp gắt</T>}
    </g>
  );
};

// ---------- bàn đạp ga ----------
export const Pedal = ({ x = 540, y = 900, press = 0, s = 1, o = 1, color = C.steel }) => {
  const ang = -28 + 22 * press;
  return (
    <g opacity={o} transform={`translate(${x},${y}) scale(${s})`}>
      <line x1={0} y1={-140} x2={0} y2={-20} stroke={C.steelDark} strokeWidth={14} strokeLinecap="round" />
      <g transform={`rotate(${ang} 0 -20)`}>
        <rect x={-46} y={-20} width={92} height={170} rx={18} fill="#1b2433" stroke={color} strokeWidth={5} />
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1={-28} y1={10 + i * 36} x2={28} y2={10 + i * 36} stroke={color} strokeOpacity={0.5} strokeWidth={4} />
        ))}
      </g>
      <T x={0} y={220} s={28} c={C.dim}>chân ga</T>
    </g>
  );
};

// ---------- mặt cắt gai lốp (shot 1.2) ----------
export const TireSection = ({ depth = 1, o = 1, warn = 0 }) => {
  const x0 = 200;
  const w = 680;
  const base = 1120;
  const full = 150;
  const hgt = 30 + (full - 30) * depth;
  return (
    <g opacity={o}>
      <rect x={x0} y={base} width={w} height={70} rx={14} fill="#141a26" stroke={C.steel} strokeWidth={4} />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={x0 + 20 + i * 134} y={base - hgt} width={110} height={hgt} rx={8} fill="#2a3242" stroke="#6b7588" strokeWidth={4} />
      ))}
      <line x1={x0 - 30} y1={base - 34} x2={x0 + w + 30} y2={base - 34} stroke={SLIDE} strokeWidth={4} strokeDasharray="12 10" opacity={0.4 + 0.6 * warn} />
      <T x={x0 + w + 30} y={base - 50} s={26} c={SLIDE} a="end" o={0.5 + 0.5 * warn}>vạch báo mòn</T>
      <T x={x0 - 30} y={base - full - 30} s={28} c={C.dim} a="start">gai lốp (mặt cắt)</T>
    </g>
  );
};

// ---------- bụi cao su rời ----------
export const MiniPatch = ({ x, y, s = 0.5, ...props }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <ContactPatch {...props} />
  </g>
);

// ---------- ô danh sách ----------
export const CheckItem = ({ x = 160, y, text, on = 0, o = 1 }) => (
  <g opacity={o}>
    <rect x={x} y={y - 46} width={760} height={82} rx={18} fill={on ? 'rgba(25,181,255,0.12)' : 'rgba(5,9,18,0.6)'} stroke={on ? EV : C.steelDark} strokeWidth={4} />
    <rect x={x + 24} y={y - 22} width={34} height={34} rx={8} fill="none" stroke={on ? EV : C.steelDark} strokeWidth={4} />
    {on > 0 && <path d={`M${x + 30} ${y - 6} l10 12 l20 -26`} fill="none" stroke={EV} strokeWidth={6} strokeLinecap="round" opacity={on} />}
    <T x={x + 84} y={y + 10} s={36} c={on ? C.white : C.dim} a="start">{text}</T>
  </g>
);

// ---------- đồng hồ áp suất (không số) ----------
export const PressureGauge = ({ cx = 540, cy = 1100, needle = 0, o = 1 }) => {
  const r = 110;
  const rad = (d) => (d * Math.PI) / 180;
  const arc = (a0, a1) => {
    const p0 = [cx + r * Math.cos(rad(a0)), cy + r * Math.sin(rad(a0))];
    const p1 = [cx + r * Math.cos(rad(a1)), cy + r * Math.sin(rad(a1))];
    return `M${p0[0]} ${p0[1]} A${r} ${r} 0 0 1 ${p1[0]} ${p1[1]}`;
  };
  const a = -200 + 220 * needle;
  return (
    <g opacity={o}>
      <path d={arc(-200, -110)} fill="none" stroke={C.steelDark} strokeWidth={16} />
      <path d={arc(-110, -60)} fill="none" stroke="#2BB673" strokeWidth={16} />
      <path d={arc(-60, 20)} fill="none" stroke={C.steelDark} strokeWidth={16} />
      <line x1={cx} y1={cy} x2={cx + (r - 24) * Math.cos(rad(a))} y2={cy + (r - 24) * Math.sin(rad(a))} stroke={C.white} strokeWidth={6} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={10} fill={C.white} />
      <T x={cx} y={cy + 60} s={26} c={C.dim}>áp suất lốp</T>
    </g>
  );
};

// ---------- thanh trượt ----------
export const Slider = ({ x = 200, y, w = 300, v = 0, label, color = GOLD, o = 1 }) => (
  <g opacity={o}>
    <T x={x} y={y - 22} s={28} c={C.dim} a="start">{label}</T>
    <rect x={x} y={y} width={w} height={16} rx={8} fill="#1b2433" stroke={C.steelDark} strokeWidth={3} />
    <rect x={x} y={y} width={w * v} height={16} rx={8} fill={color} />
    <circle cx={x + w * v} cy={y + 8} r={16} fill={color} />
  </g>
);

// gạch ngang một chip/chữ
export const Strike = ({ x1, x2, y, p = 1, c = C.heat }) => (p > 0 ? <line x1={x1} y1={y} x2={x1 + (x2 - x1) * p} y2={y} stroke={c} strokeWidth={6} strokeLinecap="round" /> : null);
