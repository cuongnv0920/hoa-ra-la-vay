import { C, FONT } from '../theme';

// Đồng hồ tốc độ 0–180 km/h, cung 270°.
const MAX = 180;
const ang = (v) => ((135 + (270 * v) / MAX) * Math.PI) / 180;
const pt = (cx, cy, r, v) => [cx + r * Math.cos(ang(v)), cy + r * Math.sin(ang(v))];

export const Speedometer = ({ speed, cx, cy, r = 170 }) => {
  const arc = (v, rr) => {
    const [x0, y0] = pt(cx, cy, rr, 0);
    const [x1, y1] = pt(cx, cy, rr, Math.max(0.01, v));
    const large = (270 * v) / MAX > 180 ? 1 : 0;
    return `M${x0} ${y0} A${rr} ${rr} 0 ${large} 1 ${x1} ${y1}`;
  };
  const ticks = [];
  for (let v = 0; v <= MAX; v += 10) {
    const major = v % 20 === 0;
    const [a, b] = pt(cx, cy, r - (major ? 26 : 14), v);
    const [c, d] = pt(cx, cy, r - 2, v);
    ticks.push(<line key={v} x1={a} y1={b} x2={c} y2={d} stroke={C.white} strokeOpacity={major ? 0.9 : 0.4} strokeWidth={major ? 3 : 2} />);
    if (major) {
      const [tx, ty] = pt(cx, cy, r - 52, v);
      ticks.push(
        <text key={'t' + v} x={tx} y={ty + 8} fill={C.dim} fontSize="22" fontFamily={FONT} textAnchor="middle">
          {v}
        </text>,
      );
    }
  }
  const [nx, ny] = pt(cx, cy, r - 20, speed);
  return (
    <g>
      <circle cx={cx} cy={cy} r={r + 14} fill="rgba(5,9,18,0.8)" stroke={C.line} strokeOpacity="0.35" strokeWidth="2" />
      <path d={arc(MAX, r)} fill="none" stroke={C.white} strokeOpacity="0.15" strokeWidth="8" />
      <path d={arc(speed, r)} fill="none" stroke={C.line} strokeWidth="8" />
      {ticks}
      <line x1={cx} y1={cy} x2={nx} y2={ny} stroke={C.heat} strokeWidth="6" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="14" fill={C.heat} />
      <text x={cx} y={cy + 92} fill={C.white} fontSize="64" fontWeight="700" fontFamily={FONT} textAnchor="middle">
        {Math.round(speed)}
      </text>
      <text x={cx} y={cy + 124} fill={C.dim} fontSize="22" fontFamily={FONT} textAnchor="middle">
        km/h
      </text>
    </g>
  );
};
