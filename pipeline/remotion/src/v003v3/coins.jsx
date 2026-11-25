// Mười đồng xu của bản v3 và đồng hồ "10 đồng tiền xăng" ở đầu khung.
import { C, FONT } from '../theme';
import { M } from '../vertical/layout';

const GOLD = '#FFD23F';

// state: 'on' | 'glow' | 'dim' | 'heat'
export const Coin = ({ x, y, r = 32, state = 'on', o = 1 }) => {
  const fill = state === 'heat' ? M.heat : state === 'dim' ? C.steelDark : GOLD;
  return (
    <g transform={`translate(${x},${y})`} opacity={o * (state === 'dim' ? 0.55 : 1)}>
      {state === 'glow' && <circle r={r * 1.45} fill={GOLD} opacity={0.3} />}
      <circle r={r} fill={fill} />
      <circle r={r * 0.76} fill="none" stroke={C.navy} strokeOpacity="0.45" strokeWidth={r * 0.08} />
      <text y={r * 0.34} fill={C.navy} fontSize={r} fontWeight="800" fontFamily={FONT} textAnchor="middle">
        đ
      </text>
    </g>
  );
};

export const CoinMeter = ({ states, caption, captionColor = C.white, o = 1 }) => (
  <g opacity={o}>
    <rect x={60} y={150} width={960} height={200} rx={24} fill="rgba(5,9,18,0.78)" stroke={C.line} strokeOpacity="0.35" strokeWidth="2" />
    <text x={90} y={196} fill={C.dim} fontSize="26" fontWeight="700" fontFamily={FONT} letterSpacing="3">
      10 ĐỒNG TIỀN XĂNG
    </text>
    <text x={990} y={198} fill={captionColor} fontSize="30" fontWeight="700" fontFamily={FONT} textAnchor="end">
      {caption}
    </text>
    {states.map((s, i) => (
      <g key={i}>
        <circle cx={123 + i * 92.6} cy={276} r={36} fill="none" stroke={C.white} strokeOpacity="0.18" strokeDasharray="5 4" strokeWidth="2" />
        {s !== 'none' && <Coin x={123 + i * 92.6} y={276} state={s} />}
      </g>
    ))}
  </g>
);
