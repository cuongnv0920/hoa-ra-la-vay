import { C, FONT } from '../theme';
import { M, vnd } from './layout';

// ĐỒNG HỒ TIỀN — thành phần chữ ký của kênh.
// amount: số tiền đang hiển thị. bills: 10 phần tử {state: 'keep'|'heat'|'accessory'|'drivetrain'|'range', drop: 0..1}
// 'range' = tờ ở ranh giới của một khoảng ước tính → tô sọc.
const COLOR = { keep: M.bill, dim: M.bill, heat: M.heat, accessory: M.accessory, drivetrain: M.drivetrain, loss: M.drivetrain, range: M.bill };
const KEPT = ['keep', 'dim', 'range'];
export const BILL_W = 78;
export const BILL_H = 46;
export const BILL_GAP = 10;
export const billX = (i, x0 = 90) => x0 + i * (BILL_W + BILL_GAP);
export const BILL_Y = 286;

export const MoneyMeter = ({ amount, amountText, bills, label = 'ĐỒNG HỒ TIỀN', mode = 'XĂNG', y = 150 }) => (
  <g>
    <defs>
      <pattern id="billStripe" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect width="10" height="10" fill={M.bill} fillOpacity="0.25" />
        <line x1="0" y1="0" x2="0" y2="10" stroke={M.bill} strokeWidth="5" />
      </pattern>
    </defs>
    <rect x={60} y={y} width={960} height={200} rx={24} fill="rgba(5,9,18,0.78)" stroke={C.line} strokeOpacity="0.35" strokeWidth="2" />
    <text x={90} y={y + 44} fill={C.dim} fontSize="26" fontWeight="700" fontFamily={FONT} letterSpacing="3">
      {label}
    </text>
    <g transform={`translate(990, ${y + 44})`}>
      <rect x={-118} y={-30} width={118} height={40} rx={20} fill="none" stroke={mode === 'ĐIỆN' ? M.ev : M.heat} strokeWidth="2" />
      <text x={-59} y={-2} fill={mode === 'ĐIỆN' ? M.ev : M.heat} fontSize="22" fontWeight="700" fontFamily={FONT} textAnchor="middle">
        {mode}
      </text>
    </g>
    <text x={90} y={y + 118} fill={C.white} fontSize={amountText ? 64 : 80} fontWeight="800" fontFamily={FONT}>
      {amountText || vnd(amount)}
    </text>
    {bills.map((b, i) => {
      const x = billX(i);
      const lost = !KEPT.includes(b.state);
      const dy = lost ? 70 * b.drop * b.drop : 0;
      const op = lost ? 1 - b.drop : b.state === 'dim' ? 0.22 : 1;
      return (
        <g key={i}>
          <rect x={x} y={BILL_Y} width={BILL_W} height={BILL_H} rx={7} fill="none" stroke={C.white} strokeOpacity="0.18" strokeDasharray="5 4" strokeWidth="2" />
          <g opacity={op} transform={`translate(0, ${dy})`}>
            <rect x={x} y={BILL_Y} width={BILL_W} height={BILL_H} rx={7} fill={b.state === 'range' ? 'url(#billStripe)' : COLOR[b.state]} />
            <text x={x + BILL_W / 2} y={BILL_Y + 31} fill={C.navy} fontSize="22" fontWeight="800" fontFamily={FONT} textAnchor="middle">
              100K
            </text>
          </g>
        </g>
      );
    })}
  </g>
);
