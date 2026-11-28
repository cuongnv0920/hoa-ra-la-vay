// 41 shot của video 011, theo assets/storyboard.md (bản 2). Mỗi shot nhận: f (frame trong shot), p (0..1), d (độ dài), at(cụm lời đọc → frame trong shot).
// Cảnh 6b (6b.1–6b.4) vẽ liền một mạch bằng Scene6bArt (Sample011.jsx) và được Video011 dựng ở cấp cảnh.
// Quy tắc chính xác (storyboard): không ghi số/phần trăm/nhiệt độ/điện áp; bánh xe luôn lăn cùng chiều; đinamô là ẩn dụ;
// năng lượng = hạt vàng, nhiệt = đỏ cam chỉ ở má phanh/đĩa phanh, hao = hạt vàng mờ dần; ba nhánh ở cảnh 8; tổng hai thanh lực không đổi.
import { Easing, interpolate } from 'remotion';
import { C } from '../theme';
import { carWheel, Chip, T } from '../v003/parts';
import { Arrow, CarSideX, EV, GOLD, ICE } from '../v009/parts';
import { Battery, Computer, ControlLine, GEN, Inverter, Motor, Wire } from './parts';
import { BikeDynamo, Engine, ForceBars, FullBattery, HEAT, HeatWaves, DiscSection, PedalIcon, Plug, Stream, Thermo, WheelDisc, lerp } from './parts2';

const clampOpt = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' };
const ramp = (f, a, b, v0 = 0, v1 = 1, e = Easing.inOut(Easing.cubic)) => interpolate(f, [a, Math.max(b, a + 1)], [v0, v1], { ...clampOpt, easing: e });
const ap = (f, a, dur = 10) => ramp(f, a, a + dur, 0, 1, Easing.out(Easing.cubic));
const ORANGE = '#FF9A2A';

// hàng chính (giống cảnh 6b)
const Y = 860;
const MOTOR = { cx: 150, r: 80 };
const INV = { cx: 520 };
const BAT = { cx: 890 };

// góc quay cộng dồn với tốc độ thay đổi
const spinTo = (f, speed) => {
  let a = 0;
  for (let i = 0; i < f; i++) a += speed(i);
  return a;
};

// ================= Cảnh 1 =================
const s11 = ({ f, at }) => {
  const press = ramp(f, at('đạp phanh'), at('đạp phanh') + 14);
  return (
    <g>
      <CarSideX cx={540} cy={1000} w={800} roll={f * 7} />
      <Battery cx={870} cy={660} level={2} />
      <PedalIcon x={190} y={1190} press={press} s={0.8} />
    </g>
  );
};

const s12 = ({ f, d, at }) => {
  const t0 = at('Xe chậm lại');
  const slow = ramp(f, t0, d - 4);
  const roll = spinTo(f, (i) => 7 * (1 - 0.85 * ramp(i, t0, d - 4)));
  const wf = carWheel(540, 1000, 800, 1);
  const g = ramp(f, at('pin được nạp'), at('pin được nạp') + 30);
  return (
    <g>
      <CarSideX cx={540} cy={1000} w={800} roll={roll} />
      <Stream pts={[[wf.x, wf.y - wf.r - 6], [wf.x, 660], [812, 660]]} flow={f * 0.014} amount={g} n={5} lineO={0.25 * g} />
      <Battery cx={870} cy={660} level={2 + 0.6 * g} />
      <PedalIcon x={190} y={1190} press={1} s={0.8} />
      {slow > 2 && null}
    </g>
  );
};

const s13 = ({ f }) => (
  <g>
    <CarSideX cx={540} cy={1130} w={560} roll={f * 2} o={0.45} />
    <Battery cx={420} cy={840} level={2.6} />
    <T x={640} y={880} s={190} c={GOLD} w={800} o={ap(f, 4, 12)}>
      ?
    </T>
  </g>
);

// ================= Cảnh 2 =================
const DISC = { cx: 600, cy: 960 };
const WHEEL2 = { cx: 190, cy: 960 };
const shaft = (o = 1) => <line x1={WHEEL2.cx + 120} y1={WHEEL2.cy} x2={DISC.cx - 27} y2={WHEEL2.cy} stroke={C.steelDark} strokeWidth={14} strokeLinecap="round" opacity={o} />;

const s21 = ({ f }) => (
  <g>
    <Chip x={540} y={660} text="xe thông thường" c={C.steel} s={32} o={ap(f, 2, 10)} />
    <WheelDisc cx={WHEEL2.cx} cy={WHEEL2.cy} r={120} angle={f * 8} color={C.steel} />
    {shaft()}
    <DiscSection cx={DISC.cx} cy={DISC.cy} close={0} spin={f * 8} />
  </g>
);

const s22 = ({ f, d, at }) => {
  const a = at('ép vào');
  const close = ramp(f, a, a + 16);
  const spin = spinTo(f, (i) => 8 * (1 - 0.6 * ramp(i, a + 10, d)));
  return (
    <g>
      <WheelDisc cx={WHEEL2.cx} cy={WHEEL2.cy} r={120} angle={spin} color={C.steel} />
      {shaft()}
      <DiscSection cx={DISC.cx} cy={DISC.cy} close={close} spin={spin} heat={0.1 * close} />
    </g>
  );
};

const s23 = ({ f, d }) => {
  const heat = ramp(f, 0, d - 4, 0.1, 0.8);
  const spin = spinTo(f, (i) => 3.2 * (1 - 0.4 * ramp(i, 0, d)));
  return (
    <g>
      <WheelDisc cx={WHEEL2.cx} cy={WHEEL2.cy} r={120} angle={spin} color={C.steel} />
      {shaft()}
      <Stream pts={[[WHEEL2.cx + 124, WHEEL2.cy], [DISC.cx - 70, WHEEL2.cy]]} flow={f * 0.02} n={4} amount={1} lineO={0.2} />
      <DiscSection cx={DISC.cx} cy={DISC.cy} close={1} spin={spin} heat={heat} />
    </g>
  );
};

const s24 = ({ f, d, at }) => {
  const heat = 0.8 - 0.2 * ramp(f, 0, d);
  const a = at('không dùng lại');
  const k = ap(f, a, 10);
  return (
    <g>
      <WheelDisc cx={WHEEL2.cx} cy={WHEEL2.cy} r={120} angle={f * 1.5} color={C.steel} />
      {shaft()}
      <DiscSection cx={DISC.cx} cy={DISC.cy} close={1} spin={f * 1.5} heat={heat} />
      <HeatWaves x={DISC.cx} y={DISC.cy - 230} f={f} o={ap(f, 2, 14)} />
      <g opacity={k}>
        <Battery cx={860} cy={760} level={2} o={0.6} labels={false} />
        <line x1={790} y1={710} x2={930} y2={810} stroke={C.white} strokeWidth={8} strokeLinecap="round" />
        <T x={860} y={860} s={26} c={C.dim}>
          không về pin
        </T>
      </g>
    </g>
  );
};

// ================= Cảnh 3: đinamô (ẩn dụ) =================
const s31 = ({ f }) => <BikeDynamo angle={f * 4} />;

const s32 = ({ f, at }) => {
  const a = at('phát điện');
  const lamp = ramp(f, a, a + 22);
  return (
    <g>
      <BikeDynamo angle={f * 4} lamp={lamp} />
      <Stream pts={[[505 - 26, 820], [560, 720], [760, 740]]} flow={f * 0.02} n={4} amount={lamp} lineO={0} />
    </g>
  );
};

const s33 = ({ f, d, at }) => {
  const a = at('lấy bớt');
  const drag = ramp(f, a, a + 20);
  const angle = spinTo(f, (i) => 4 - 0.8 * ramp(i, a, a + 30));
  return <BikeDynamo angle={angle} lamp={1} drag={drag} />;
};

const CAR3 = { wheel: [290, 960], motor: [600, 960], bat: [890, 960] };
const s34 = ({ f, d }) => {
  const k = ramp(f, 4, d - 2);
  return (
    <g>
      <g transform={`translate(${-560 * k},0)`} opacity={1 - k}>
        <BikeDynamo angle={f * 3} lamp={1} />
      </g>
      <g transform={`translate(${560 * (1 - k)},0)`} opacity={k}>
        <WheelDisc cx={CAR3.wheel[0]} cy={CAR3.wheel[1]} r={170} angle={f * 4} color={EV} />
        <line x1={CAR3.wheel[0] + 172} y1={960} x2={CAR3.motor[0] - 82} y2={960} stroke={C.steelDark} strokeWidth={12} strokeLinecap="round" />
        <Motor cx={CAR3.motor[0]} cy={960} r={80} angle={f * 6} mode={1} />
      </g>
    </g>
  );
};

const s35 = ({ f }) => (
  <g>
    <WheelDisc cx={CAR3.wheel[0]} cy={CAR3.wheel[1]} r={170} angle={f * 4} color={EV} />
    <line x1={CAR3.wheel[0] + 172} y1={960} x2={CAR3.motor[0] - 82} y2={960} stroke={C.steelDark} strokeWidth={12} strokeLinecap="round" />
    <Motor cx={CAR3.motor[0]} cy={960} r={80} angle={f * 6} mode={1} />
    <Stream pts={[[CAR3.motor[0] + 84, 960], [CAR3.bat[0] - 64, 960]]} flow={f * 0.018} n={4} amount={ap(f, 6, 12)} lineO={0.25} />
    <Battery cx={CAR3.bat[0]} cy={960} level={2 + 0.5 * ramp(f, 14, 50)} />
  </g>
);

// ================= Cảnh 4: bánh xe thành bên kéo =================
const CX4 = { cx: 540, cy: 900, w: 820 };
const geo4 = () => {
  const wf = carWheel(CX4.cx, CX4.cy, CX4.w, 1);
  const motor = [wf.x - 160, wf.y - 8];
  return { wf, motor, pts: [[CX4.cx - 20, wf.y - 38], motor, [wf.x, wf.y]] };
};

const Car4 = ({ f, roll, motorAngle, amount = 0, dir = 1, ring = 0, pull = 0, caption, o2 = 0 }) => {
  const { wf, motor, pts } = geo4();
  return (
    <g>
      <CarSideX cx={CX4.cx} cy={CX4.cy} w={CX4.w} roll={roll} battery={1} />
      <line x1={motor[0] + 34} y1={motor[1]} x2={wf.x - 8} y2={wf.y} stroke={C.steelDark} strokeWidth={10} strokeLinecap="round" />
      <Motor cx={motor[0]} cy={motor[1]} r={36} angle={motorAngle} mode={dir < 0 ? 1 : 0} labels={false} />
      <Stream pts={pts} flow={f * 0.014} dir={dir} n={6} amount={amount} lineO={0.3 * Math.max(amount, 0.2)} r={8} />
      {ring > 0.01 && <circle cx={wf.x} cy={wf.y} r={wf.r + 14 + 10 * ring} fill="none" stroke={GOLD} strokeWidth={5} strokeDasharray="12 10" opacity={ring} />}
      {pull > 0.01 && <Arrow x1={wf.x - wf.r - 30} y1={wf.y - 8} x2={wf.x - wf.r - 30 - 90 * pull} y2={wf.y - 8} w={8} c={C.white} o={Math.min(1, pull * 3)} />}
      {caption}
    </g>
  );
};

const s41 = ({ f, at }) => {
  const a = at('mô-tơ kéo');
  return (
    <Car4 f={f} roll={f * 6} motorAngle={f * 9} amount={ap(f, a, 12)} dir={1} caption={<T x={540} y={1150} s={34} c={GOLD}>pin → mô-tơ → bánh</T>} />
  );
};

const s42 = ({ f, d, at }) => {
  const a = at('nhả ga');
  const b = at('đạp phanh');
  const amount = 1 - ramp(f, a, a + 14);
  return (
    <g>
      <Car4 f={f} roll={f * 5} motorAngle={f * 8} amount={amount} dir={1} caption={<T x={540} y={1150} s={34} c={GOLD} o={amount}>pin → mô-tơ → bánh</T>} />
      <PedalIcon x={200} y={1230} press={ramp(f, a - 2, a + 8, 1, 0)} label="chân ga" s={0.6} color={C.steel} />
      <PedalIcon x={380} y={1230} press={ramp(f, b, b + 12)} label="phanh" s={0.6} color={C.steel} />
    </g>
  );
};

const s43 = ({ f, at }) => {
  const a = at(['bánh xe kéo', 'vẫn kéo mô-tơ']);
  return <Car4 f={f} roll={f * 5} motorAngle={f * 8} amount={0} ring={ap(f, a, 14)} pull={ap(f, a + 6, 16)} caption={<T x={540} y={1150} s={30} c={C.dim} o={ap(f, a, 12)}>bánh xe kéo mô-tơ quay</T>} />;
};

const s44 = ({ f, at }) => {
  const a = at(['chiều ngược lại', 'đổi chiều']);
  const k = ap(f, a, 12);
  return (
    <Car4
      f={f}
      roll={f * 5}
      motorAngle={f * 8}
      amount={k}
      dir={-1}
      caption={
        <g>
          <T x={540} y={1150} s={34} c={GOLD} o={k}>bánh → mô-tơ</T>
          <T x={540} y={1206} s={28} c={C.dim}>trước đó: pin → mô-tơ → bánh</T>
        </g>
      }
    />
  );
};

// ================= Cảnh 5: phanh tái sinh =================
const s51 = ({ f, at }) => {
  const a = at('máy phát điện');
  const mode = ramp(f, a, a + 12);
  return (
    <g>
      <Motor cx={540} cy={900} r={160} angle={f * 7} mode={mode} />
      <path d={`M 360 690 A 190 190 0 0 1 720 690`} fill="none" stroke={C.white} strokeOpacity={0.35 * ap(f, a - 6, 10)} strokeWidth={5} strokeDasharray="10 10" />
    </g>
  );
};

const s52 = ({ f, at }) => {
  const a = at('tốn sức');
  const k = ap(f, a, 14);
  return (
    <g>
      <Motor cx={340} cy={900} r={120} angle={f * 7} mode={1} />
      <Stream pts={[[470, 900], [900, 900]]} flow={f * 0.016} n={6} amount={1} lineO={0.25} />
      <g opacity={k}>
        <Arrow x1={400} y1={740} x2={270} y2={740} w={9} c={C.white} />
        <T x={335} y={706} s={30} c={C.white}>
          sức cản
        </T>
      </g>
    </g>
  );
};

const s53 = ({ f, d, at }) => {
  const a = at('sức cản ấy');
  const len = ramp(f, a, a + 24, 20, 220);
  const roll = spinTo(f, (i) => 6 * (1 - 0.7 * ramp(i, a, d)));
  const wf = carWheel(540, 960, 820, 1);
  return (
    <g>
      <CarSideX cx={540} cy={960} w={820} roll={roll} battery={1} />
      <Arrow x1={wf.x + 4} y1={wf.y + wf.r + 30} x2={wf.x + 4 - len} y2={wf.y + wf.r + 30} w={6 + len / 18} c={C.white} />
      <T x={540} y={1260} s={28} c={C.dim}>
        lực hãm ngược chiều xe chạy
      </T>
      <Arrow x1={820} y1={780} x2={930} y2={780} w={5} c={C.dim} />
      <T x={875} y={750} s={24} c={C.dim}>
        xe chạy
      </T>
    </g>
  );
};

const s54 = ({ f, at }) => {
  const a = at('phanh tái sinh');
  return (
    <g>
      <WheelDisc cx={200} cy={860} r={100} angle={f * 6} color={EV} />
      <Stream pts={[[306, 860], [470, 860]]} flow={f * 0.02} n={4} amount={1} lineO={0.25} />
      <Motor cx={560} cy={860} r={90} angle={f * 6} mode={1} labels={false} />
      <Stream pts={[[656, 860], [860, 860]]} flow={f * 0.02} n={4} amount={1} lineO={0.25} />
      <Battery cx={900} cy={860} level={2.8} labels={false} />
      <Chip x={540} y={1090} text="regenerative braking" c={GEN} s={40} o={ap(f, a + 24, 12)} />
    </g>
  );
};

// ================= Cảnh 6a: hai kiểu điện =================
const AC6 = { x1: 232, x2: 470 };
const DC6 = { x1: 590, x2: 828 };
const s6a1 = ({ f, at }) => {
  const a = at('điện xoay chiều');
  const rev = ramp(f, a - 10, a + 20);
  const swing = 0.07 * Math.sin(f / 9); // hạt đi tới rồi đi lui: dòng đảo chiều
  return (
    <g>
      <Motor cx={MOTOR.cx} cy={Y} r={MOTOR.r} angle={f * 8} mode={1} />
      <Wire {...AC6} y={Y} kind="ac" from="left" reveal={rev} dir={1} flow={0.5 + swing} amount={rev} n={5} />
    </g>
  );
};

const s6a2 = ({ f, at }) => {
  const a = at(['pin chỉ cất', 'pin lưu']);
  const k = ap(f, a - 6, 14);
  const swing = 0.07 * Math.sin((f + 60) / 9);
  return (
    <g>
      <Motor cx={MOTOR.cx} cy={Y} r={MOTOR.r} angle={f * 8 + 480} mode={1} />
      <Wire {...AC6} y={Y} kind="ac" from="left" reveal={1} dir={1} flow={0.5 + swing} amount={1} n={5} />
      <Battery cx={BAT.cx} cy={Y} level={2} o={k} />
      <Wire {...DC6} y={Y} kind="dc" from="right" reveal={k} dir={1} flow={0} amount={0} />
      <T x={530} y={Y + 26} s={90} c={GOLD} w={800} o={ap(f, a + 10, 12)}>
        ?
      </T>
    </g>
  );
};

// ================= Cảnh 7 (nhãn 6b trong kịch bản): khi pin không nhận đủ =================
const TRACK = { x: 100, y: 960 };
const s71 = ({ f, at }) => {
  const a = at('không phải lúc nào');
  const stop = ramp(f, a, a + 12);
  const fl = f * 0.018;
  return (
    <g>
      <Wire x1={232} x2={398} y={Y} kind="ac" from="left" reveal={1} dir={1} flow={fl} amount={1 - stop} />
      <Wire x1={642} x2={828} y={Y} kind="dc" from="left" reveal={1} dir={1} flow={fl} amount={1 - stop} />
      <Motor cx={MOTOR.cx} cy={Y} r={MOTOR.r} angle={f * 8} mode={1} />
      <Inverter cx={INV.cx} cy={Y} p={1} />
      <Battery cx={BAT.cx} cy={Y} level={3} />
      <g opacity={stop}>
        <line x1={780} y1={Y - 50} x2={780} y2={Y + 50} stroke={C.white} strokeWidth={8} strokeLinecap="round" />
        <T x={890} y={Y - 90} s={90} c={GOLD} w={800}>
          ?
        </T>
      </g>
    </g>
  );
};

const s72 = ({ f, at }) => {
  const t1 = at('sạc đầy');
  const t2 = at('quá lạnh');
  const t3 = at('quá nóng');
  const blueLen = 700 - 140 * ramp(f, t1, t1 + 14) - 130 * ramp(f, t2, t2 + 14) - 130 * ramp(f, t3, t3 + 14);
  return (
    <g>
      <FullBattery cx={250} cy={740} o={ap(f, t1, 10)} />
      <Thermo cx={540} cy={720} kind="cold" o={ap(f, t2, 10)} />
      <Thermo cx={830} cy={720} kind="hot" o={ap(f, t3, 10)} />
      <ForceBars x={TRACK.x} y={TRACK.y} total={700} blue={blueLen} orange={0} />
    </g>
  );
};

const s73 = ({ f, at }) => {
  const a = at('phanh thường');
  const orange = ramp(f, a, a + 20, 0, 400);
  return (
    <g>
      <FullBattery cx={250} cy={740} o={0.45} />
      <Thermo cx={540} cy={720} kind="cold" o={0.45} />
      <Thermo cx={830} cy={720} kind="hot" o={0.45} />
      <ForceBars x={TRACK.x} y={TRACK.y} total={700} blue={300} orange={orange} />
    </g>
  );
};

const s74 = ({ f, at }) => {
  const a = at(['dừng gấp', 'đạp phanh mạnh']);
  const k = ramp(f, a, a + 16);
  const total = lerp(700, 840, k);
  return (
    <g>
      <PedalIcon x={540} y={690} press={ramp(f, a, a + 14)} label="đạp mạnh" s={0.9} />
      <ForceBars x={TRACK.x} y={TRACK.y} total={total} blue={300} orange={total - 300} />
      <T x={TRACK.x + 150} y={TRACK.y - 22} s={26} c={EV} o={ap(f, a + 8, 10)}>
        hết sức
      </T>
    </g>
  );
};

const s75 = ({ f, d, at }) => {
  const a = at('Máy tính');
  const k = ap(f, a, 12);
  const blue = 260 + 40 * Math.cos(f / 11);
  return (
    <g>
      <ControlLine x={540} y1={756} y2={950} o={k} dash={f * 0.6} />
      <Computer cx={540} cy={690} p={k} />
      <ForceBars x={TRACK.x} y={TRACK.y} total={840} blue={blue} orange={840 - blue} />
      <T x={540} y={1190} s={32} c={C.white} o={ap(f, a + 20, 14)}>
        xe chậm lại đúng như bạn đạp
      </T>
    </g>
  );
};

// ================= Cảnh 8: chỉ một phần =================
const NODE = [390, Y];
const PAD = { x: 760, y: 650 };
const MiniInv = ({ cx, cy, o = 1, pulse = 0 }) => (
  <g opacity={o}>
    <rect x={cx - 52} y={cy - 44} width={104} height={88} rx={16} fill="#0f1a2d" stroke={EV} strokeWidth={5} />
    <path d={`M${cx - 34} ${cy + 2} q 8 -22 17 0 t 17 0`} fill="none" stroke={EV} strokeWidth={4} strokeLinecap="round" />
    <line x1={cx + 8} y1={cy + 2} x2={cx + 36} y2={cy + 2} stroke={C.white} strokeWidth={5} strokeLinecap="round" />
    <T x={cx} y={cy + 76} s={24} c={C.dim}>
      biến tần
    </T>
  </g>
);

const PadIcon = ({ o = 1, f = 0, heat = 0 }) => (
  <g opacity={o}>
    <rect x={PAD.x - 60} y={PAD.y - 30} width={120} height={60} rx={10} fill={C.pad} stroke={C.steel} strokeWidth={4} />
    <rect x={PAD.x - 60} y={PAD.y - 30} width={120} height={60} rx={10} fill={HEAT} fillOpacity={0.3 * heat} />
    <T x={PAD.x} y={PAD.y + 64} s={26} c={ORANGE}>
      má phanh
    </T>
    <HeatWaves x={PAD.x} y={PAD.y - 36} f={f} o={heat} n={4} h={100} />
  </g>
);

const Branches = ({ f, a = 0, b = 0, c = 0, dim = 1, heat = 0 }) => {
  const flow = f * 0.018;
  return (
    <g opacity={dim}>
      <WheelDisc cx={150} cy={Y} r={76} angle={f * 6} color={EV} />
      <Stream pts={[[232, Y], NODE]} flow={flow} n={3} amount={1} lineO={0.35} width={24} r={11} />
      <circle cx={NODE[0]} cy={NODE[1]} r={14} fill={GOLD} />
      <T x={290} y={Y + 118} s={26} c={C.dim}>
        năng lượng của xe
      </T>
      {/* nhánh A: thành nhiệt ở má phanh */}
      <Stream pts={[NODE, [NODE[0] + 90, PAD.y], [PAD.x - 66, PAD.y]]} flow={flow} n={4} amount={a} lineO={0.35 * a} color={ORANGE} width={14} r={9} reveal={a} />
      <PadIcon o={a} f={f} heat={heat} />
      {/* nhánh B: mô-tơ → biến tần → pin, hao dọc đường */}
      <Stream pts={[NODE, [INV.cx - 56, Y]]} flow={flow} n={3} amount={b} lineO={0.3 * b} width={12} r={9} reveal={b} />
      <MiniInv cx={INV.cx} cy={Y} o={b} />
      <Stream pts={[[INV.cx + 58, Y], [BAT.cx - 66, Y]]} flow={flow} n={4} amount={b} loss={0.6} lineO={0.3 * b} width={9} r={9} reveal={b} />
      <Battery cx={BAT.cx} cy={Y} level={2 + 0.7 * c} o={Math.max(b, 0.2)} />
      {/* hạt hao rơi khỏi đường */}
      {b > 0.5 &&
        [0, 1, 2, 3].map((i) => {
          const u = (((f * 0.012 + i / 4) % 1) + 1) % 1;
          return <circle key={i} cx={640 + i * 46} cy={Y + 14 + u * 90} r={6 * (1 - u)} fill={GOLD} fillOpacity={0.6 * (1 - u) * b} />;
        })}
      <T x={760} y={Y + 150} s={26} c={C.dim} o={b}>
        hao dọc đường
      </T>
      <T x={BAT.cx} y={Y + 118} s={26} c={EV} o={c}>
        vào pin
      </T>
    </g>
  );
};

const s81 = ({ f, at }) => {
  const k = ap(f, at('má phanh'), 14);
  return <Branches f={f} a={k} heat={k} />;
};
const s82 = ({ f, at }) => {
  return <Branches f={f} a={1} heat={1} b={ap(f, 2, 14)} />;
};
const s83 = ({ f, at }) => {
  const k = ap(f, at('lấy lại'), 16);
  return <Branches f={f} a={1} heat={1} b={1} c={k} />;
};
const s84 = ({ f }) => (
  <g>
    <Branches f={f} a={1} heat={0.6} b={1} c={1} dim={0.35} />
    <Chip x={540} y={1130} text="không miễn phí" c={GOLD} s={52} o={ap(f, 4, 12)} />
  </g>
);

// ================= Cảnh 9: hybrid cũng vậy =================
// một xe với chuỗi bánh → mô-tơ → biến tần → pin
const carGeo = (cx, cy, w) => {
  const wf = carWheel(cx, cy, w, 1);
  const yy = wf.y - 0.07 * w;
  return { wf, motor: [cx + 0.12 * w, yy], inv: [cx - 0.04 * w, yy], bat: [cx - 0.22 * w, yy], yy };
};
const CarChain = ({ cx, cy, w, color, f, amount = 0, flow = 0, hi = 0, o = 1, engine = 0, plug = 0, engineFlow = 0, plugFlow = 0, plugLabel = 'ổ điện', tag }) => {
  const g = carGeo(cx, cy, w);
  const pts = [[g.wf.x, g.wf.y], g.motor, g.inv, g.bat];
  const eng = { x: 880, y: cy + 0.04 * w };
  const route1 = cy + 0.23 * w;
  const route2 = cy + 0.29 * w;
  return (
    <g opacity={o}>
      <CarSideX cx={cx} cy={cy} w={w} color={color} roll={f * 6} />
      <Stream pts={pts} flow={flow} dir={-1} n={6} amount={amount} lineO={0.3} r={7} width={5} />
      <Motor cx={g.motor[0]} cy={g.motor[1]} r={0.05 * w} angle={f * 8} mode={1} labels={false} />
      <g>
        <rect x={g.inv[0] - 0.05 * w} y={g.inv[1] - 0.05 * w} width={0.1 * w} height={0.1 * w} rx={9} fill="#0f1a2d" stroke={EV} strokeWidth={4} />
        <path d={`M${g.inv[0] - 0.035 * w} ${g.inv[1]} q 7 -14 14 0 t 14 0`} fill="none" stroke={EV} strokeWidth={3} strokeLinecap="round" />
        {hi > 0.01 && <rect x={g.inv[0] - 0.05 * w - 8} y={g.inv[1] - 0.05 * w - 8} width={0.1 * w + 16} height={0.1 * w + 16} rx={14} fill="none" stroke={GOLD} strokeWidth={4} opacity={hi} />}
      </g>
      <rect x={g.bat[0] - 0.08 * w} y={g.bat[1] - 0.045 * w} width={0.16 * w} height={0.09 * w} rx={8} fill="#0f1a2d" stroke={EV} strokeWidth={4} />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={g.bat[0] - 0.08 * w + 8 + i * 0.047 * w} y={g.bat[1] - 0.045 * w + 8} width={0.035 * w} height={0.09 * w - 16} rx={3} fill={EV} />
      ))}
      {tag}
      {engine > 0.01 && (
        <g opacity={engine}>
          <Engine cx={eng.x} cy={eng.y} w={100} shake={f / 2} label="động cơ xăng" />
          <Stream pts={[[eng.x, eng.y + 40], [eng.x, route1], [g.bat[0], route1], [g.bat[0], g.bat[1] + 0.045 * w]]} flow={engineFlow} n={6} amount={engine} lineO={0.3} color={GOLD} r={7} width={5} />
        </g>
      )}
      {plug > 0.01 && (
        <g opacity={plug}>
          <Plug cx={170} cy={route2 - 16} p={plug} label={plugLabel} />
          <Stream pts={[[220, route2], [g.bat[0] - 20, route2], [g.bat[0] - 20, g.bat[1] + 0.045 * w]]} flow={plugFlow} n={5} amount={plug} lineO={0.3} color={GOLD} r={7} width={5} />
        </g>
      )}
    </g>
  );
};

const EVY = 760;
const HYY = 1090;
const W9 = 520;
const s91 = ({ f, at }) => {
  const k = ramp(f, 4, 22);
  const e = ap(f, at('động cơ xăng'), 14);
  return (
    <g>
      <g transform={`translate(${-420 * (1 - k)},0)`}>
        <CarChain cx={540} cy={EVY} w={W9} color={EV} f={f} tag={<Chip x={190} y={EVY - 150} text="xe điện" c={EV} s={30} />} />
      </g>
      <g transform={`translate(${420 * (1 - k)},0)`}>
        <CarChain cx={540} cy={HYY} w={W9} color={ICE} f={f} engine={e} tag={<Chip x={200} y={HYY - 150} text="xe hybrid" c={ICE} s={30} />} />
      </g>
    </g>
  );
};

const s92 = ({ f, at }) => {
  const a = at('biến tần');
  const hi = ramp(f, a, a + 10) * (0.6 + 0.4 * Math.sin(f / 5));
  const amount = ap(f, a, 12);
  const fl = f * 0.016;
  return (
    <g>
      <CarChain cx={540} cy={EVY} w={W9} color={EV} f={f} amount={amount} flow={fl} hi={hi} tag={<Chip x={190} y={EVY - 150} text="xe điện" c={EV} s={30} />} />
      <CarChain cx={540} cy={HYY} w={W9} color={ICE} f={f} amount={amount} flow={fl} hi={hi} engine={1} tag={<Chip x={200} y={HYY - 150} text="xe hybrid" c={ICE} s={30} />} />
    </g>
  );
};

const s93 = ({ f, at }) => {
  const a = at(['nạp thêm', 'có thêm điện', 'nạp từ']);
  const k = ap(f, a - 20, 12);
  return (
    <g>
      <CarChain cx={540} cy={EVY} w={W9} color={EV} f={f} amount={0.5} flow={f * 0.016} o={0.45} tag={<Chip x={190} y={EVY - 150} text="xe điện" c={EV} s={30} />} />
      <CarChain cx={540} cy={HYY} w={W9} color={ICE} f={f} amount={0.5} flow={f * 0.016} engine={1} engineFlow={f * 0.016 * k} tag={<Chip x={200} y={HYY - 150} text="xe hybrid" c={ICE} s={30} />} />
    </g>
  );
};

const s94 = ({ f, at, v }) => {
  const a = at('cắm sạc');
  const k = ap(f, a, 14);
  return (
    <g>
      <CarChain cx={540} cy={EVY} w={W9} color={EV} f={f} amount={0.5} flow={f * 0.016} o={0.45} tag={<Chip x={190} y={EVY - 150} text="xe điện" c={EV} s={30} />} />
      <CarChain cx={540} cy={HYY} w={W9} color={ICE} f={f} amount={0.5} flow={f * 0.016} engine={1} engineFlow={f * 0.016} plug={k} plugFlow={f * 0.016} plugLabel={v === '35' ? 'nguồn điện ngoài' : 'ổ điện'} tag={<Chip x={200} y={HYY - 150} text="xe hybrid cắm sạc" c={ICE} s={30} />} />
    </g>
  );
};

// ================= Kết =================
const sK1 = ({ f, d, at }) => {
  const a = at('đổi vai');
  const mode = ramp(f, a, a + 12);
  const roll = spinTo(f, (i) => 6 * (1 - 0.9 * ramp(i, 0, d - 6)));
  return (
    <g>
      <CarSideX cx={540} cy={1000} w={760} roll={roll} />
      <Motor cx={540} cy={740} r={76} angle={f * 7} mode={mode} />
    </g>
  );
};

const sK2 = ({ f, d, at }) => {
  const a = at('quay về pin');
  const fl = ramp(f, a - 10, a + 40, 0.0, 1.4, Easing.linear);
  const k = ap(f, a - 10, 12);
  const lvl = 2 + 0.9 * ramp(f, a + 20, a + 50);
  return (
    <g>
      <CarSideX cx={540} cy={1060} w={700} roll={0} o={0.85} />
      <WheelDisc cx={150} cy={720} r={64} angle={0} color={EV} />
      <Stream pts={[[220, 720], [330, 720]]} flow={fl} n={3} amount={k} lineO={0.3} r={8} />
      <Motor cx={400} cy={720} r={56} angle={0} mode={1} labels={false} />
      <Stream pts={[[462, 720], [550, 720]]} flow={fl} n={3} amount={k} lineO={0.3} r={8} />
      <MiniInv cx={610} cy={720} o={1} />
      <Stream pts={[[668, 720], [790, 720]]} flow={fl} n={3} amount={k} lineO={0.3} r={8} />
      <Battery cx={870} cy={720} level={lvl} labels={false} />
      <T x={540} y={1290} s={64} c={GOLD} w={800} ls={4} o={ap(f, d - 50, 20)}>
        HÓA RA LÀ VẬY
      </T>
    </g>
  );
};

export const SHOTS = {
  '1.1': s11, '1.2': s12, '1.3': s13,
  '2.1': s21, '2.2': s22, '2.3': s23, '2.4': s24,
  '3.1': s31, '3.2': s32, '3.3': s33, '3.4': s34, '3.5': s35,
  '4.1': s41, '4.2': s42, '4.3': s43, '4.4': s44,
  '5.1': s51, '5.2': s52, '5.3': s53, '5.4': s54,
  '6a.1': s6a1, '6a.2': s6a2,
  '7.1': s71, '7.2': s72, '7.3': s73, '7.4': s74, '7.5': s75,
  '8.1': s81, '8.2': s82, '8.3': s83, '8.4': s84,
  '9.1': s91, '9.2': s92, '9.3': s93, '9.4': s94,
  'K.1': sK1, 'K.2': sK2,
};
