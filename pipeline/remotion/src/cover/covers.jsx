// Ảnh bìa Reels cho từng video. Vật thể vẽ bằng khối màu đặc (như bình xăng video 003),
// không dùng nét mảnh như trong video, để còn nhìn rõ khi thu nhỏ thành ô trong lưới Reels.
import { C } from '../theme';
import { Cover } from './Cover';

const AMBER = '#FFB000';
const BLUE = '#19B5FF';
const GOLD = '#FFD23F';
const OFF = '#4A5568'; // phần truyền động đã ngắt

// ---------- 008: Subaru và Audi, cùng bốn bánh ----------
const Wheel = ({ x, y, on, c }) => (
  <g>
    {on && <rect x={x - 40} y={y - 70} width={80} height={140} rx={24} fill={c} opacity={0.35} />}
    <rect x={x - 28} y={y - 58} width={56} height={116} rx={16} fill="#05080f" stroke={on ? c : OFF} strokeWidth={8} />
  </g>
);

const CarTop = ({ cx, c, rearOn }) => {
  const top = 840;
  const len = 600;
  const w = 300;
  const axF = top + 140;
  const axR = top + len - 120;
  const rear = rearOn ? c : OFF;
  return (
    <g>
      {/* thân xe */}
      <rect x={cx - w / 2} y={top} width={w} height={len} rx={90} fill="#16213A" stroke="#2E3B57" strokeWidth={6} />
      <path d={`M${cx - 110} ${top + 250} Q${cx} ${top + 215} ${cx + 110} ${top + 250} L${cx + 100} ${top + 300} L${cx - 100} ${top + 300} Z`} fill="#0B1220" opacity={0.9} />
      {/* máy đặt dọc + hộp số */}
      <rect x={cx - 52} y={top + 40} width={104} height={150} rx={18} fill={c} />
      <rect x={cx - 34} y={top + 196} width={68} height={92} rx={14} fill={c} opacity={0.78} />
      {/* cầu trước */}
      <rect x={cx - 120} y={axF - 9} width={240} height={18} rx={9} fill={c} />
      {/* trục dẫn động ra cầu sau */}
      {rearOn ? (
        <rect x={cx - 11} y={top + 290} width={22} height={axR - top - 290} rx={11} fill={c} />
      ) : (
        <g>
          <rect x={cx - 11} y={top + 318} width={22} height={axR - top - 350} rx={11} fill={OFF} />
          {/* hai khe ngắt: sau hộp số và ở cầu sau */}
          <rect x={cx - 26} y={top + 296} width={52} height={10} rx={5} fill={c} />
          <rect x={cx - 26} y={axR - 40} width={52} height={10} rx={5} fill={OFF} />
        </g>
      )}
      {/* cầu sau */}
      <rect x={cx - 120} y={axR - 9} width={240} height={18} rx={9} fill={rear} />
      <circle cx={cx} cy={axR} r={26} fill={rear} />
      <Wheel x={cx - 150} y={axF} on c={c} />
      <Wheel x={cx + 150} y={axF} on c={c} />
      <Wheel x={cx - 150} y={axR} on={rearOn} c={c} />
      <Wheel x={cx + 150} y={axR} on={rearOn} c={c} />
    </g>
  );
};

export const Cover008 = ({ showSafe = false }) => (
  <Cover
    showSafe={showSafe}
    glow="#5B7CFF"
    chips={[
      { t: 'SUBARU', c: AMBER },
      { t: 'AUDI', c: BLUE },
    ]}
    title={[[['Bốn bánh']], [['khác ', GOLD], ['ở đâu?']]]}
    titleSize={136}
    titleY={600}
  >
    <CarTop cx={290} c={AMBER} rearOn />
    <CarTop cx={790} c={BLUE} rearOn={false} />
  </Cover>
);

// ---------- 007: máy boxer ----------
const Bank = ({ side }) => {
  const s = side;
  const x0 = 540 + s * 70;
  return (
    <g>
      {[-1, 1].map((k) => {
        const y = 1130 + k * 110;
        const xs = (a) => 540 + s * a;
        return (
          <g key={k}>
            {/* xi-lanh */}
            <rect x={Math.min(xs(90), xs(370))} y={y - 70} width={280} height={140} rx={14} fill="#B87800" />
            {/* piston */}
            <rect x={Math.min(xs(k > 0 ? 170 : 230), xs(k > 0 ? 260 : 320))} y={y - 58} width={90} height={116} rx={10} fill={GOLD} />
            {/* nắp máy */}
            <rect x={Math.min(xs(378), xs(430))} y={y - 84} width={52} height={168} rx={12} fill={AMBER} />
          </g>
        );
      })}
      <rect x={Math.min(x0, x0 + s * 20)} y={990} width={20} height={280} fill="#8A5A00" />
    </g>
  );
};

export const Cover007 = ({ showSafe = false }) => (
  <Cover
    showSafe={showSafe}
    glow={AMBER}
    chips={[{ t: 'SUBARU', c: AMBER }]}
    title={[[['Vì sao Subaru']], [['vẫn dùng '], ['boxer?', AMBER]]]}
    titleSize={118}
    titleY={590}
  >
    <Bank side={-1} />
    <Bank side={1} />
    {/* vỏ trục khuỷu ở giữa */}
    <circle cx={540} cy={1130} r={112} fill="#16213A" stroke={AMBER} strokeWidth={12} />
    <circle cx={540} cy={1130} r={34} fill={AMBER} />
    {/* mũi tên: hai piston đối diện cùng đẩy ra, cùng thu vào */}
    <g fill={C.white}>
      <path d="M330 1400 l-180 0 l0 -24 l-48 38 l48 38 l0 -24 l180 0 z" />
      <path d="M750 1400 l180 0 l0 -24 l48 38 l-48 38 l0 -24 l-180 0 z" />
    </g>
  </Cover>
);

// ---------- 005: hai kim phun ----------
const Injector = ({ x, y, angle, c, len = 250, spray = 170 }) => (
  <g transform={`translate(${x},${y}) rotate(${angle})`}>
    <rect x={-34} y={-len} width={68} height={len - 60} rx={18} fill={c} />
    <rect x={-20} y={-70} width={40} height={60} rx={8} fill={c} opacity={0.8} />
    <path d="M-10 -12 L10 -12 L4 8 L-4 8 Z" fill={c} />
    {/* tia phun */}
    <path d={`M0 10 L${-spray * 0.35} ${spray} Q0 ${spray * 1.18} ${spray * 0.35} ${spray} Z`} fill={c} opacity={0.5} />
  </g>
);

export const Cover005 = ({ showSafe = false }) => (
  <Cover
    showSafe={showSafe}
    glow="#7A6CFF"
    chips={[{ t: 'ĐỘNG CƠ XĂNG', c: GOLD }]}
    title={[[['Hai '], ['kim phun', GOLD]], [['mỗi xi-lanh?']]]}
    titleSize={124}
    titleY={590}
  >
    {/* mặt cắt: xi-lanh, piston, nắp máy có buồng đốt mái dốc */}
    <rect x={300} y={1100} width={480} height={400} fill="#16213A" />
    <rect x={266} y={1100} width={36} height={410} fill="#5B6678" />
    <rect x={778} y={1100} width={36} height={410} fill="#5B6678" />
    <rect x={304} y={1360} width={472} height={130} rx={10} fill="#7A8698" />
    <path d="M220 960 L860 960 L860 1100 L776 1100 L540 1040 L304 1100 L220 1100 Z" fill="#5B6678" />
    {/* đường nạp xuyên nắp máy, tới xu-páp nạp */}
    <path d="M40 985 L250 985 Q360 985 400 1060 L440 1074 L372 1092 Q340 1045 250 1045 L40 1045 Z" fill="#0B1220" />
    {/* xu-páp nạp */}
    <path d="M384 930 L426 1062" stroke="#B8C2D0" strokeWidth={12} strokeLinecap="round" />
    <path d="M392 1060 L470 1060 L452 1078 L404 1078 Z" fill="#B8C2D0" transform="rotate(-14 430 1068)" />
    {/* kim phun gián tiếp: gắn trên đường nạp, phun vào đường nạp về phía xu-páp */}
    <Injector x={214} y={980} angle={-58} c={BLUE} len={220} spray={105} />
    {/* kim phun trực tiếp: xuyên nắp máy, phun thẳng vào buồng đốt */}
    <Injector x={612} y={1062} angle={24} c={AMBER} len={250} />
    {/* nhãn ngắn */}
    <g fontFamily="Segoe UI, Arial, sans-serif" fontWeight={800} fontSize={42} textAnchor="middle">
      <text x={250} y={1585} fill={BLUE}>phun vào cửa nạp</text>
      <text x={790} y={1585} fill={AMBER}>phun vào buồng đốt</text>
    </g>
  </Cover>
);
