// Các mảnh đồ họa nhỏ dùng trong video 003 (khung dọc). Toạ độ tuyệt đối 1080×1920.
import { interpolateColors } from 'remotion';
import { C, FONT } from '../theme';
import { M } from '../vertical/layout';

export const T = ({ x, y, s = 40, c = C.white, w = 700, a = 'middle', o = 1, children, ls = 0 }) => (
  <text x={x} y={y} fill={c} fontSize={s} fontWeight={w} fontFamily={FONT} textAnchor={a} opacity={o} letterSpacing={ls}>
    {children}
  </text>
);

export const Bill = ({ x, y, s = 1, color = M.bill, rot = 0, o = 1 }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <rect x={-39} y={-23} width={78} height={46} rx={7} fill={color} />
    <text y={8} fill={C.navy} fontSize="22" fontWeight="800" fontFamily={FONT} textAnchor="middle">
      100K
    </text>
  </g>
);

export const Chip = ({ x, y, text, c = C.line, s = 30, o = 1, fill = 'rgba(5,9,18,0.8)' }) => {
  const w = text.length * s * 0.52 + 44;
  return (
    <g opacity={o}>
      <rect x={x - w / 2} y={y - s * 0.95} width={w} height={s * 1.55} rx={s * 0.78} fill={fill} stroke={c} strokeWidth="3" />
      <T x={x} y={y + s * 0.12} s={s} c={c}>
        {text}
      </T>
    </g>
  );
};

export const Stamp = ({ x, y, text, sub, p = 1, c = C.heat }) => {
  const sc = 1.6 - 0.6 * Math.min(1, p * 3);
  const w = text.length * 34 + 80;
  return (
    <g transform={`translate(${x},${y}) rotate(-6) scale(${sc})`} opacity={Math.min(1, p * 4)}>
      <rect x={-w / 2} y={-62} width={w} height={sub ? 150 : 110} rx={12} fill="rgba(5,9,18,0.6)" stroke={c} strokeWidth="8" />
      <T x={0} y={14} s={64} c={c} w={800}>
        {text}
      </T>
      {sub && (
        <T x={0} y={70} s={32} c={C.white} w={600}>
          {sub}
        </T>
      )}
    </g>
  );
};

export const SuspectCard = ({ x = 540, y = 940, n, title, c = C.heat, o = 1, children }) => (
  <g opacity={o} transform={`translate(${x},${y})`}>
    <rect x={-340} y={-300} width={680} height={560} rx={28} fill="rgba(5,9,18,0.82)" stroke={c} strokeWidth="4" />
    <rect x={-340} y={-300} width={680} height={84} rx={28} fill={c} />
    <T x={0} y={-244} s={42} c={C.navy} w={800} ls={3}>
      {`NGHI PHẠM #${n}`}
    </T>
    {children}
    <T x={0} y={215} s={40} c={C.white} w={700}>
      {title}
    </T>
  </g>
);

// Xe nhìn ngang, nét blueprint. cx = tâm, w = dài. wheelRot độ quay bánh.
export const CarSide = ({ cx = 540, cy = 1000, w = 760, o = 1, wheelRot = 0, stroke = C.line, body = '#101c33' }) => {
  const h = w * 0.27;
  const x0 = cx - w / 2;
  const wy = cy + h * 0.32;
  const wr = w * 0.085;
  const wheels = [x0 + w * 0.2, x0 + w * 0.8];
  return (
    <g opacity={o}>
      <path
        d={`M${x0} ${cy + h * 0.25} L${x0 + w * 0.02} ${cy - h * 0.1} Q${x0 + w * 0.06} ${cy - h * 0.25} ${x0 + w * 0.2} ${cy - h * 0.3} L${x0 + w * 0.32} ${cy - h * 0.32} L${x0 + w * 0.42} ${cy - h * 0.75} L${x0 + w * 0.7} ${cy - h * 0.75} L${x0 + w * 0.83} ${cy - h * 0.32} Q${x0 + w * 0.97} ${cy - h * 0.28} ${x0 + w} ${cy - h * 0.05} L${x0 + w} ${cy + h * 0.25} Z`}
        fill={body}
        stroke={stroke}
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path d={`M${x0 + w * 0.44} ${cy - h * 0.68} L${x0 + w * 0.55} ${cy - h * 0.68} L${x0 + w * 0.55} ${cy - h * 0.35} L${x0 + w * 0.36} ${cy - h * 0.35} Z`} fill="none" stroke={stroke} strokeOpacity="0.6" strokeWidth="3" />
      <path d={`M${x0 + w * 0.58} ${cy - h * 0.68} L${x0 + w * 0.68} ${cy - h * 0.68} L${x0 + w * 0.78} ${cy - h * 0.35} L${x0 + w * 0.58} ${cy - h * 0.35} Z`} fill="none" stroke={stroke} strokeOpacity="0.6" strokeWidth="3" />
      {wheels.map((x, i) => (
        <g key={i} transform={`translate(${x},${wy})`}>
          <circle r={wr} fill={C.navy} stroke={stroke} strokeWidth="5" />
          <circle r={wr * 0.55} fill="none" stroke={stroke} strokeOpacity="0.6" strokeWidth="3" />
          {[0, 72, 144, 216, 288].map((a) => (
            <line key={a} x1={0} y1={0} x2={wr * 0.5 * Math.cos(((a + wheelRot) * Math.PI) / 180)} y2={wr * 0.5 * Math.sin(((a + wheelRot) * Math.PI) / 180)} stroke={stroke} strokeWidth="3" />
          ))}
        </g>
      ))}
    </g>
  );
};
export const carWheel = (cx = 540, cy = 1000, w = 760, i = 0) => ({ x: cx - w / 2 + w * (i ? 0.8 : 0.2), y: cy + w * 0.27 * 0.32, r: w * 0.085 });

// Thước đo nửa vòng 0–100 %
export const Gauge = ({ cx, cy, r = 220, value, title, sub, color = C.heat, o = 1 }) => {
  const ang = (v) => Math.PI * (1 + v / 100);
  const pt = (v, rr) => [cx + rr * Math.cos(ang(v)), cy + rr * Math.sin(ang(v))];
  const [x0, y0] = pt(0, r);
  const [x1, y1] = pt(100, r);
  const [xv, yv] = pt(Math.max(0.5, value), r);
  const [nx, ny] = pt(value, r - 30);
  return (
    <g opacity={o}>
      <path d={`M${x0} ${y0} A${r} ${r} 0 0 1 ${x1} ${y1}`} fill="none" stroke={C.white} strokeOpacity="0.15" strokeWidth="26" />
      <path d={`M${x0} ${y0} A${r} ${r} 0 0 1 ${xv} ${yv}`} fill="none" stroke={color} strokeWidth="26" />
      {[0, 25, 50, 75, 100].map((v) => {
        const [a, b] = pt(v, r + 30);
        return (
          <T key={v} x={a} y={b + 10} s={26} c={C.dim} w={400}>
            {v}
          </T>
        );
      })}
      <line x1={cx} y1={cy} x2={nx} y2={ny} stroke={C.white} strokeWidth="8" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={16} fill={C.white} />
      <T x={cx} y={cy + 90} s={96} c={color} w={800}>{`${Math.round(value)}%`}</T>
      <T x={cx} y={cy - r - 60} s={36} c={C.white}>
        {title}
      </T>
      {sub && (
        <T x={cx} y={cy + 140} s={28} c={C.dim} w={400}>
          {sub}
        </T>
      )}
    </g>
  );
};

// Biểu tượng lò sưởi (nhiệt thải)
export const Heater = ({ x, y, s = 1, p = 1, t = 0 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`} opacity={p}>
    <rect x={-50} y={-30} width={100} height={60} rx={10} fill="none" stroke={C.heat} strokeWidth="5" />
    {[-28, -9, 10, 29].map((dx) => (
      <line key={dx} x1={dx} y1={-20} x2={dx} y2={20} stroke={C.heat} strokeWidth="5" />
    ))}
    {[-25, 0, 25].map((dx, i) => (
      <path key={i} d={`M${dx} -42 q 8 -14 0 -28 q -8 -14 0 -28`} fill="none" stroke={C.heat} strokeWidth="4" opacity={0.5 + 0.5 * Math.sin(t / 5 + i)} />
    ))}
  </g>
);

export const heatOf = (h) => interpolateColors(h, [0, 0.5, 1], [C.steel, '#ff6a2a', '#ffb347']);
