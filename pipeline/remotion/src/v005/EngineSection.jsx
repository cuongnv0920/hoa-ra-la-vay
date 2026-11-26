// Mặt cắt một xi lanh có hai kim phun (video 005). Hình giản lược, toạ độ tuyệt đối trong khung 1080×1920.
// Vị trí kim đối chiếu hình cắt cụm nạp trong tài liệu Audi (research S1): kim gián tiếp nằm phía trên đường nạp,
// kim trực tiếp đặt bên hông, ngay dưới đường nạp. Hình này lật gương (cửa nạp ở bên trái).
import { C } from '../theme';

export const PFI = '#19B5FF'; // phun gián tiếp
export const GDI = '#FFB000'; // phun trực tiếp
const M_GOLD = '#FFD23F';

const CX = 540;
const BORE = 360;
const XL = CX - BORE / 2;
const XR = CX + BORE / 2;
const DECK = 860; // mặt dưới nắp máy
const APEX = 780; // đỉnh buồng đốt
const YC = 1230; // tâm trục khuỷu
const R = 80;
const L = 220;
const PH = 110; // chiều cao pít-tông vẽ

const rad = (d) => (d * Math.PI) / 180;
// Tay quay–con trượt: theta = 0 ở điểm chết trên.
export const piston = (theta) => {
  const th = rad(theta);
  const pin = YC - (R * Math.cos(th) + Math.sqrt(L * L - R * R * Math.sin(th) ** 2));
  return { pin, crown: pin - PH / 2, cx: CX + R * Math.sin(th), cy: YC - R * Math.cos(th) };
};

// Trục xu-páp vuông góc mái buồng đốt; lift > 0 đẩy đĩa van xuống vào xi lanh.
const AX = { x: -0.406, y: -0.914 }; // hướng ra ngoài của xu-páp nạp
export const INTAKE_SEAT = { x: 448, y: 821 };
// Cặn bám ở lưng xu-páp nạp (phía đường nạp): toạ độ [dọc đĩa, dọc trục] so với tâm đĩa van.
const CRUD = [[-34, 22, 13], [-14, 26, 11], [20, 24, 14], [38, 20, 10], [-9, 46, 9], [11, 40, 12], [-11, 68, 7], [10, 62, 8], [0, 30, 9], [-44, 17, 7], [30, 36, 7], [9, 88, 6]];

const Valve = ({ side, lift = 0, color, deposit = 0 }) => {
  const m = side < 0 ? 1 : -1; // xu-páp xả là ảnh gương
  const seat = { x: CX + m * (INTAKE_SEAT.x - CX), y: INTAKE_SEAT.y };
  const out = { x: m * AX.x, y: AX.y };
  const h = { x: seat.x - out.x * lift, y: seat.y - out.y * lift };
  const along = { x: -out.y, y: out.x };
  const p = (a, b) => `${h.x + along.x * a + out.x * b},${h.y + along.y * a + out.y * b}`;
  return (
    <g>
      <line x1={h.x} y1={h.y} x2={h.x + out.x * 200} y2={h.y + out.y * 200} stroke={color} strokeWidth="13" strokeLinecap="round" />
      <polygon points={`${p(-58, 0)} ${p(58, 0)} ${p(40, 15)} ${p(-40, 15)}`} fill={color} stroke={C.white} strokeWidth="2" />
      {CRUD.map(([a, b, r], i) => {
        const o = Math.min(1, Math.max(0, deposit * CRUD.length - i));
        const [x, y] = p(a, b).split(',');
        return o > 0 ? <circle key={i} cx={x} cy={y} r={r} fill="#6d6258" stroke="#3b342e" strokeWidth="2" opacity={o} /> : null;
      })}
    </g>
  );
};

const INTAKE_PATH = `M 60 662 C 250 662 372 710 ${INTAKE_SEAT.x} ${INTAKE_SEAT.y - 6}`;
const EXHAUST_PATH = `M ${CX + (CX - INTAKE_SEAT.x)} ${INTAKE_SEAT.y - 6} C 708 710 830 662 960 662`;

const Port = ({ d, color, o = 1 }) => (
  <g opacity={o}>
    <path d={d} fill="none" stroke={color} strokeWidth="100" />
    <path d={d} fill="none" stroke="#0E2138" strokeWidth="90" />
  </g>
);

// Kim phun: (x, y) là đầu kim, angle = hướng phun (độ, 0 = sang phải, dương = xuống).
export const Injector = ({ x, y, angle, color, o = 1, len = 150 }) => (
  <g transform={`translate(${x},${y}) rotate(${angle})`} opacity={o}>
    <rect x={-len} y={-19} width={len * 0.45} height={38} rx={8} fill={color} stroke={C.white} strokeWidth="3" />
    <rect x={-len * 0.55} y={-14} width={len * 0.42} height={28} fill="#c3cbd8" stroke={C.white} strokeWidth="2" />
    <polygon points={`${-len * 0.14},-11 0,-5 0,5 ${-len * 0.14},11`} fill={color} />
  </g>
);

export const NOZZLE_PFI = { x: 296, y: 650, angle: 47 };
export const NOZZLE_GDI = { x: 380, y: 850, angle: 20 };

export const EngineSection = ({
  theta,
  intakeLift = 0,
  exhaustLift = 0,
  pfiOn = true,
  gdiOn = false,
  pfi = true, // false: không lắp kim gián tiếp
  gdi = true,
  pfiColor = PFI,
  gdiColor = GDI,
  chamber = '#12335a',
  deposit = 0,
  pistonGlow = 0,
  children,
}) => {
  const p = piston(theta);
  return (
    <g>
      {/* nắp máy */}
      <path d={`M 150 ${DECK} L 150 640 L 930 640 L 930 ${DECK} L ${XR} ${DECK} L ${CX} ${APEX} L ${XL} ${DECK} Z`} fill="#16243d" stroke={C.line} strokeWidth="4" strokeLinejoin="round" />
      <Port d={INTAKE_PATH} color={C.line} />
      <Port d={EXHAUST_PATH} color={C.steelDark} />
      {/* thành xi lanh */}
      <rect x={XL - 30} y={DECK} width={30} height={300} fill="#1a2944" stroke={C.line} strokeWidth="3" />
      <rect x={XR} y={DECK} width={30} height={300} fill="#1a2944" stroke={C.line} strokeWidth="3" />
      {/* lòng xi lanh + buồng đốt */}
      <path d={`M ${XL} ${p.crown} L ${XL} ${DECK} L ${CX} ${APEX} L ${XR} ${DECK} L ${XR} ${p.crown} Z`} fill={chamber} />
      {/* bugi */}
      <rect x={CX - 14} y={APEX - 135} width={28} height={110} rx={6} fill={C.steel} />
      <rect x={CX - 6} y={APEX - 25} width={12} height={30} fill={C.steelDark} />
      {/* tay quay, thanh truyền, pít-tông */}
      <circle cx={CX} cy={YC} r={R + 18} fill="none" stroke={C.steelDark} strokeWidth="3" strokeDasharray="10 9" />
      <line x1={CX} y1={YC} x2={p.cx} y2={p.cy} stroke={C.steelDark} strokeWidth="30" strokeLinecap="round" />
      <line x1={CX} y1={p.pin} x2={p.cx} y2={p.cy} stroke={C.steel} strokeWidth="24" strokeLinecap="round" />
      <rect x={XL + 5} y={p.crown} width={BORE - 10} height={PH} rx={10} fill="#c3cbd8" stroke={C.white} strokeWidth="3" />
      {[16, 30, 44].map((d) => (
        <line key={d} x1={XL + 5} y1={p.crown + d} x2={XR - 5} y2={p.crown + d} stroke={C.steelDark} strokeWidth="4" />
      ))}
      <circle cx={CX} cy={p.pin} r={15} fill={C.steelDark} />
      {pistonGlow > 0 && <rect x={XL + 5} y={p.crown} width={BORE - 10} height={PH} rx={10} fill="none" stroke={M_GOLD} strokeWidth="10" opacity={pistonGlow} />}
      <circle cx={CX} cy={YC} r={22} fill={C.steel} />
      {children}
      <Valve side={-1} lift={intakeLift} color="#c3cbd8" deposit={deposit} />
      <Valve side={1} lift={exhaustLift} color={C.steelDark} />
      {pfi && <Injector {...NOZZLE_PFI} color={pfiColor} o={pfiOn ? 1 : 0.4} />}
      {gdi && <Injector {...NOZZLE_GDI} color={gdiColor} o={gdiOn ? 1 : 0.45} />}
    </g>
  );
};
