// 45 shot của video 008, theo assets/storyboard.md. Mỗi shot nhận: f (frame trong shot), p (0..1), d (độ dài), at(cụm).
// Quy tắc chính xác (storyboard): hai xe cùng tỷ lệ; Audi ngắt thì chỉ trục ra sau dừng, BÁNH SAU VẪN LĂN;
// "60 / 40" luôn kèm "theo Subaru"; 0,5 và 0,2 giây luôn kèm "theo Audi"; không hình cân / cúp ở cảnh so sánh.
import { interpolate, Easing } from 'remotion';
import { C } from '../theme';
import { Chip, Stamp, T } from '../v003/parts';
import { appear, lerp } from '../v005/fx';
import { angles, ClutchPack, CP, outRatio } from './ClutchPack';
import { M, OPEN, SLIDE, SPIN_DOWN, SPIN_UP } from './cues';
import { AUDI, car, DrivetrainTop, OFF, SUBARU } from './Drivetrain';
import { Brain, DiffIcon, Dial, GOLD, LockKnob, PredictLine, QBox, RATIO_F, SLIP, SplitBar, TurnScene } from './parts';

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' };
const G1 = car(540, 575, 1); // một xe ở giữa
const GL = car(290, 690, 0.62); // hai xe cạnh nhau: Subaru bên trái
const GR = car(790, 690, 0.62); // Audi bên phải
const G5 = car(540, 575, 0.85); // cảnh 5: xe nhỏ hơn để thanh chia lực nằm dưới
const W = 14; // độ/frame: tốc độ quay trục khi đang truyền lực
const ROLL = 9; // px/frame: vân lốp

// góc trục ra sau khi quay chậm dần từ frame a, dừng sau SPIN_DOWN frame
const spinDown = (f, a) => {
  let s = 0;
  for (let i = 0; i < f; i++) s += W * (1 - interpolate(i, [a, a + SPIN_DOWN], [0, 1], { ...clamp, easing: Easing.out(Easing.quad) }));
  return s;
};
const spinUp = (f, a) => {
  let s = 0;
  for (let i = 0; i < f; i++) s += W * interpolate(i, [a, a + SPIN_UP], [0, 1], { ...clamp, easing: Easing.in(Easing.quad) });
  return s;
};

// Hai xe cạnh nhau. sub/aud: props riêng cho từng xe.
const Pair = ({ f, sub = {}, aud = {}, oL = 1, oR = 1, xL = 0, xR = 0, labels = true }) => (
  <g>
    <g transform={`translate(${xL},0)`} opacity={oL}>
      <DrivetrainTop g={GL} c={SUBARU} roll={f * ROLL * 0.62} spinR={f * W} boxer clutchOpen={0} kF={0.8} kR={0.55} {...sub} />
    </g>
    <g transform={`translate(${xR},0)`} opacity={oR}>
      <DrivetrainTop g={GR} c={AUDI} roll={f * ROLL * 0.62} spinR={f * W} clutchOpen={0} decoupleOpen={0} kF={0.8} kR={0.55} {...aud} />
    </g>
    {labels && (
      <g>
        <Chip x={290 + xL} y={1210} text="Subaru Forester" c={SUBARU} s={30} o={oL} />
        <Chip x={790 + xR} y={1210} text="Audi Q5 quattro" c={AUDI} s={30} o={oR} />
      </g>
    )}
  </g>
);

// ---------- Cảnh 1 ----------
const s11 = ({ f }) => {
  const k = appear(f, M.slide11(), SLIDE + 6);
  return <Pair f={f} xL={lerp(-700, 0, k)} xR={lerp(700, 0, k)} sub={{ xray: 0 }} aud={{ xray: 0 }} />;
};

const s12 = ({ f, d, at }) => (
  <g>
    <Pair f={f} sub={{ xray: appear(f, M.xrayL12(), 12) }} aud={{ xray: appear(f, M.xrayR12(at, d), 12) }} />
    <Chip x={540} y={640} text="máy đặt dọc" c={C.white} s={32} o={appear(f, M.xrayR12(at, d) + 6, 8)} />
  </g>
);

const s13 = ({ f, at }) => {
  const a = M.stop13(at);
  const grey = interpolate(f, [a, a + SPIN_DOWN], [0, 1], clamp);
  const open = appear(f, a - OPEN, OPEN);
  return (
    <g>
      <Pair f={f} sub={{ o: 0.45 }} aud={{ spinR: spinDown(f, a), rearGrey: grey, clutchOpen: open, decoupleOpen: open, kR: 0.55 * (1 - open) }} />
      <Chip x={750} y={1290} text="khi không cần bốn bánh" c={AUDI} s={26} o={appear(f, a, 10)} />
    </g>
  );
};

const s14 = ({ f, at }) => {
  const a = M.glow14(at);
  const g = appear(f, a, 10);
  return (
    <g>
      <Pair f={f} sub={{ kR: 0.55 + 0.25 * g, hiClutch: g }} aud={{ o: 0.45, spinR: 0, rearGrey: 1, clutchOpen: 1, decoupleOpen: 1, kR: 0 }} />
      <Chip x={290} y={1290} text="theo Subaru" c={C.steel} s={26} o={g} />
    </g>
  );
};

const s15 = ({ f }) => (
  <g>
    <Pair f={f} sub={{ o: 0.6 }} aud={{ o: 0.6, spinR: 0, rearGrey: 1, clutchOpen: 1, decoupleOpen: 1, kR: 0 }} />
    <g opacity={appear(f, M.q15(), 8)}>
      <circle cx={540} cy={910} r={70} fill={C.navy} stroke={GOLD} strokeWidth={6} />
      <T x={540} y={945} s={100} c={GOLD} w={900}>
        ?
      </T>
    </g>
  </g>
);

// ---------- Cảnh 2: vào cua ----------
const DIAL_F = { x: 170, y: 690 };
const DIAL_R = { x: 170, y: 1010 };
const s21 = ({ p }) => <TurnScene k={ease2(p)} />;
const ease2 = (p) => Math.min(1, p * 1.05);

const s22 = ({ f, p }) => {
  const o = appear(f, M.dials22(), 10);
  return (
    <g>
      <TurnScene k={1} />
      <Dial {...DIAL_F} a={f * 10 * RATIO_F} c={GOLD} label="cầu trước" o={o} />
      <Dial {...DIAL_R} a={f * 10} c={C.line} label="cầu sau" o={o} />
      <T x={170} y={890} s={26} c={C.dim} o={o}>
        quay nhanh hơn ↑
      </T>
    </g>
  );
};

const s23 = ({ f, at }) => {
  const r = appear(f, M.rigid23(), 10);
  const sc = M.scrub23(at);
  const shake = interpolate(f, [sc, sc + 6, sc + 40], [0, 1, 0.6], clamp);
  const avg = (1 + RATIO_F) / 2;
  return (
    <g>
      <TurnScene k={1} rigid={r} shake={shake} scrub={appear(f, sc, 8)} />
      <Dial {...DIAL_F} a={f * 10 * lerp(RATIO_F, avg, r)} c={GOLD} label="cầu trước" />
      <Dial {...DIAL_R} a={f * 10 * lerp(1, avg, r)} c={C.line} label="cầu sau" />
      <Chip x={300} y={1200} text="nối cứng: buộc quay bằng nhau" c={C.white} s={30} o={r} />
    </g>
  );
};

const s24 = ({ f }) => (
  <g>
    <TurnScene k={1} rigid={1} shake={0.5} scrub={1} brake={appear(f, M.brake24(), 8)} />
    <Chip x={300} y={1200} text="đường khô, cua gắt" c={C.white} s={30} />
  </g>
);

const s25 = ({ f, at }) => {
  const k = appear(f, 0, 12);
  return (
    <g>
      <g opacity={1 - k}>
        <TurnScene k={1} rigid={1} tracks={0.6} />
      </g>
      <g opacity={k}>
        <DrivetrainTop g={G1} c={C.steel} roll={f * ROLL} spinR={0} xray={1} clutchOpen={null} kF={0} kR={0} showWheelsDriven={false} />
        <QBox x={540} y={G1.clutch + 30} o={appear(f, M.q25(at), 8)} s={1.2} />
      </g>
      <Chip x={850} y={680} text="bốn bánh toàn thời gian" c={GOLD} s={26} o={appear(f, M.q25(at), 8)} />
    </g>
  );
};

// ---------- Cảnh 3: đối xứng ----------
const s31 = ({ f }) => {
  const j = appear(f, M.join31(), SLIDE);
  return (
    <g>
      <DrivetrainTop g={G1} c={SUBARU} roll={f * ROLL} spinR={f * W} boxer clutchOpen={0} kF={0} kR={0} />
      <Chip x={850} y={680} text="máy boxer đặt dọc" c={SUBARU} s={26} />
      <Chip x={850} y={G1.box[0] - 10} text="hộp số ngay sau" c={SUBARU} s={26} o={j} />
    </g>
  );
};

const s32 = ({ f, d, at }) => {
  const l = appear(f, M.halfL32(), 10);
  const r = appear(f, M.halfR32(at, d), 10);
  return (
    <g>
      <DrivetrainTop g={G1} c={SUBARU} roll={f * ROLL} spinR={f * W} boxer clutchOpen={0} kF={0} kR={0} />
      <rect x={G1.cx - G1.w / 2 - 40} y={G1.y0 - 10} width={G1.w / 2 + 40} height={G1.len + 20} fill={SUBARU} opacity={0.12 * l} />
      <rect x={G1.cx} y={G1.y0 - 10} width={G1.w / 2 + 40} height={G1.len + 20} fill={SUBARU} opacity={0.12 * r} />
      <line x1={540} y1={G1.y0 - 30} x2={540} y2={G1.y0 + G1.len + 30} stroke={C.white} strokeWidth={4} strokeDasharray="16 12" />
      <T x={250} y={1250} s={32} c={SUBARU} o={l}>
        trái
      </T>
      <T x={830} y={1250} s={32} c={SUBARU} o={r}>
        phải
      </T>
    </g>
  );
};

const s33 = () => (
  <g>
    <Chip x={540} y={900} text="đối xứng = bố cục trái – phải" c={SUBARU} s={42} />
  </g>
);

const s34 = ({ f, at }) => {
  const n = appear(f, M.neq34(at), 8);
  return (
    <g>
      <DrivetrainTop g={G1} c={SUBARU} roll={f * ROLL} spinR={f * W} boxer clutchOpen={0} kF={appear(f, 4, 10)} kR={0.55 * appear(f, 4, 10)} />
      <Chip x={790} y={1250} text="≠ 50 : 50" c={GOLD} s={40} o={n} />
    </g>
  );
};

// ---------- Cảnh 4: ly hợp nhiều đĩa ----------
const s41 = ({ f, at }) => {
  const x = M.cross41(at);
  return (
    <g>
      <DrivetrainTop g={G1} c={SUBARU} roll={f * ROLL} spinR={f * W} boxer clutchOpen={null} kF={0} kR={0} />
      <DiffIcon x={540} y={G1.clutch + 50} o={appear(f, 2, 8)} cross={appear(f, x, 10)} />
      <Chip x={850} y={680} text="nhiều xe Subaru dùng CVT" c={SUBARU} s={26} />
    </g>
  );
};

const zoomIn = (f) => appear(f, 0, 14);
const s42 = ({ f }) => {
  const z = zoomIn(f);
  return (
    <g>
      <g opacity={1 - z}>
        <DrivetrainTop g={G1} c={SUBARU} roll={f * ROLL} spinR={f * W} boxer clutchOpen={0} kF={0} kR={0} />
      </g>
      <g opacity={z} transform={`translate(${CP.cx},${CP.cy}) scale(${lerp(0.3, 1, z)}) translate(${-CP.cx},${-CP.cy})`}>
        <ClutchPack p={0.6} aIn={f * 9} aOut={f * 9 * outRatio(0.6)} c={SUBARU} faces={false} />
      </g>
      <Chip x={540} y={640} text="ly hợp nhiều đĩa (multi-plate clutch)" c={SUBARU} s={30} o={appear(f, 10, 8)} />
    </g>
  );
};

const s43 = ({ f, d, at }) => {
  const { start, gap } = M.plates43(at, d);
  const shown = Math.max(0, (f - start) / gap + 1);
  return (
    <g>
      <ClutchPack p={0.25} aIn={f * 9} aOut={f * 9 * outRatio(0.25)} c={SUBARU} shown={shown} faces={false} />
      <Chip x={250} y={640} text="đĩa nối trục vào" c={C.white} s={26} o={appear(f, start, 8)} />
      <Chip x={830} y={640} text="đĩa nối trục ra" c={SUBARU} s={26} o={appear(f, start + gap, 8)} />
    </g>
  );
};

const s44 = ({ f }) => {
  const { aIn, aOut } = angles(f, () => 0.25);
  return (
    <g>
      <ClutchPack p={0.25} aIn={aIn} aOut={aOut} c={SUBARU} />
      <PressBar p={0.25} />
      <RearArrow k={Math.max(0, (outRatio(0.25) - 0.4) / 0.57)} />
      <Chip x={540} y={1215} text="quay lệch tốc độ" c={C.white} s={30} o={appear(f, 6, 8)} />
    </g>
  );
};

// khung mẫu đã duyệt (Sample008B)
const pOf45 = (i) => interpolate(i, [M.press45(), M.press45() + 36], [0.25, 0.92], { ...clamp, easing: Easing.inOut(Easing.cubic) });
const s45 = ({ f }) => {
  const p = pOf45(f);
  const { aIn, aOut } = angles(f, pOf45);
  return (
    <g>
      <ClutchPack p={p} aIn={aIn} aOut={aOut} c={SUBARU} />
      <PressBar p={p} />
      <RearArrow k={Math.max(0, (outRatio(p) - 0.4) / 0.57)} />
      <Chip x={540} y={1215} text="gần như cùng tốc độ" c={SUBARU} s={30} o={appear(f, M.press45() + 50, 10)} />
    </g>
  );
};

// Nối tiếp 4.5: lực ép bắt đầu ở mức cao (0,92) rồi máy tính chỉnh lên xuống; giữ hai đĩa tốc độ và mũi tên để không bị "nhảy" hình khi cắt.
const pOf46 = (i) => 0.6 + 0.32 * Math.cos(i / 9);
const s46 = ({ f, d, at }) => {
  const p = pOf46(f);
  const { aIn, aOut } = angles(f, pOf46);
  const z = appear(f, M.zoomOut46(at, d), 13); // bắt đầu thu ra, nối sang 5.1
  return (
    <g transform={`translate(${CP.cx},${CP.cy}) scale(${lerp(1, 0.55, z)}) translate(${-CP.cx},${-CP.cy})`} opacity={lerp(1, 0.25, z)}>
      <ClutchPack p={p} aIn={aIn} aOut={aOut} c={SUBARU} />
      <PressBar p={p} />
      <RearArrow k={Math.max(0, (outRatio(p) - 0.4) / 0.57)} />
      <Brain x={540} y={1230} c={C.white} to={[[265, 700]]} o={appear(f, M.brain46(), 8)} pulse={f * 2} />
    </g>
  );
};

const PressBar = ({ p }) => (
  <g>
    <rect x={110} y={680} width={300} height={24} rx={12} fill="#101a2e" stroke={C.steel} strokeWidth={3} />
    <rect x={110} y={680} width={300 * p} height={24} rx={12} fill={C.steel} />
    <T x={110} y={664} s={30} c={C.steel} w={700} a="start">
      lực ép
    </T>
  </g>
);
const RearArrow = ({ k }) => {
  const w = 6 + 22 * k;
  const y = 690;
  return (
    <g>
      <line x1={660} y1={y} x2={960 - w * 1.4} y2={y} stroke={C.white} strokeWidth={w} strokeLinecap="round" />
      <path d={`M960 ${y} L${960 - w * 1.4} ${y - w} L${960 - w * 1.4} ${y + w} Z`} fill={C.white} />
      <T x={810} y={y - 40} s={30} c={C.white} w={700}>
        lực ra cầu sau
      </T>
    </g>
  );
};

// ---------- Cảnh 5: Subaru ----------
const s51 = ({ f, at }) => {
  const b = appear(f, M.bar51(at), 10);
  const z = appear(f, 0, M.zoomOut51()); // thu ra từ chồng đĩa về cả xe (ngược với 4.2)
  return (
    <g clipPath="url(#vung-hinh-51)">
      <clipPath id="vung-hinh-51">
        <rect x={0} y={575} width={1080} height={760} />
      </clipPath>
    <g transform={`translate(540,${G5.clutch}) scale(${lerp(2.4, 1, z)}) translate(-540,${-G5.clutch})`} opacity={lerp(0.3, 1, z)}>
      <DrivetrainTop g={G5} c={SUBARU} roll={f * ROLL * 0.85} spinR={f * W} boxer clutchOpen={0} kF={0.3 + 0.7 * b} kR={0.3 + 0.37 * b} />
      <SplitBar front={0.6} o={b} c={SUBARU} y={1255} />
    </g>
    </g>
  );
};

const s52 = ({ f }) => {
  const fr = 0.6 + 0.02 * Math.sin(f / 7);
  const inputs = ['chân ga', 'góc lái', 'độ trượt'];
  return (
    <g>
      <DrivetrainTop g={G5} c={SUBARU} roll={f * ROLL * 0.85} spinR={f * W} boxer clutchOpen={0} kF={1} kR={0.67} hiClutch={0.6 + 0.4 * Math.sin(f / 5)} />
      {inputs.map((t, i) => {
        const a = M.chips52() + i * 8;
        const k = appear(f, a, 14);
        return <Chip key={t} x={lerp(860, 860, k)} y={lerp(640 + i * 70, 700 + i * 70, k)} text={t} c={SUBARU} s={26} o={appear(f, a, 6)} />;
      })}
      <path d={`M790 760 C 700 760, 640 ${G5.clutch}, 580 ${G5.clutch}`} fill="none" stroke={SUBARU} strokeWidth={3} strokeDasharray="10 8" strokeDashoffset={-f * 2} opacity={appear(f, 10, 8)} />
      <SplitBar front={fr} c={SUBARU} y={1255} />
    </g>
  );
};

const s53 = ({ f, at }) => {
  const sl = appear(f, M.slip53(at), 8);
  const pr = appear(f, M.press53(at), 12);
  const flash = sl * (0.6 + 0.4 * Math.sin(f / 2));
  return (
    <g>
      <ellipse cx={540} cy={G5.axF - 40} rx={330} ry={150} fill={C.line} opacity={0.14 * sl} />
      <T x={540} y={G5.axF - 150} s={26} c={C.line} o={sl}>
        đường trơn
      </T>
      <DrivetrainTop g={G5} c={SUBARU} roll={f * ROLL * 0.85} spinR={f * W} boxer clutchOpen={0} kF={1 - 0.3 * pr} kR={0.67 + 0.33 * pr} hiClutch={pr} />
      {[-1, 1].map((sd) => (
        <circle key={sd} cx={540 + sd * G5.track} cy={G5.axF} r={18} fill={SLIP} opacity={flash} />
      ))}
      <SplitBar front={0.6 - 0.12 * pr} c={SUBARU} y={1255} label={false} o={pr} />
      <Chip x={540} y={1180} text="thêm lực ra sau" c={SUBARU} s={28} o={pr} />
    </g>
  );
};

const s54 = ({ f }) => (
  <g>
    <DrivetrainTop g={G5} c={SUBARU} roll={f * ROLL * 0.85} spinR={f * W} boxer clutchOpen={0} kF={1} kR={0.67} />
    <Chip x={540} y={1255} text="hai cầu luôn nhận lực (theo Subaru)" c={SUBARU} s={28} o={appear(f, 6, 8)} />
  </g>
);

// ---------- Cảnh 6: Audi quattro ultra ----------
const s61 = ({ f }) => {
  const k = appear(f, 0, SLIDE);
  return (
    <g transform={`translate(${lerp(700, 0, k)},0)`}>
      <DrivetrainTop g={G1} c={AUDI} roll={f * ROLL} spinR={f * W} clutchOpen={0} decoupleOpen={0} kF={1} kR={0.6} />
      <Chip x={850} y={680} text="một số bản A5, A6, Q5" c={AUDI} s={26} o={appear(f, 12, 8)} />
    </g>
  );
};

const s62 = ({ f, at }) => (
  <g>
    <DrivetrainTop g={G1} c={AUDI} roll={f * ROLL} spinR={f * W} clutchOpen={0} decoupleOpen={0} kF={1} kR={0.6} hiClutch={appear(f, M.hiC62(at), 8)} />
    <Chip x={240} y={G1.clutch} text="ly hợp sau hộp số" c={AUDI} s={26} o={appear(f, M.hiC62(at), 8)} />
  </g>
);

const s63 = ({ f, at }) => (
  <g>
    <DrivetrainTop g={G1} c={AUDI} roll={f * ROLL} spinR={f * W} clutchOpen={0} decoupleOpen={0} kF={1} kR={0.6} hiClutch={0.4} hiDecouple={appear(f, M.hiD63(at), 8)} />
    <Chip x={240} y={G1.clutch} text="ly hợp sau hộp số" c={AUDI} s={26} o={0.6} />
    <Chip x={240} y={G1.axR - 90} text="bộ tách ở cầu sau" c={AUDI} s={26} o={appear(f, M.hiD63(at), 8)} />
  </g>
);

const s64 = ({ f, at }) => {
  const c = appear(f, M.openC64(at), OPEN);
  const dd = appear(f, M.openD64(at), OPEN);
  return (
    <g>
      <DrivetrainTop g={G1} c={AUDI} roll={f * ROLL} spinR={f * W} clutchOpen={c} decoupleOpen={dd} kF={1} kR={0.6 * (1 - Math.max(c, dd))} hiClutch={c} hiDecouple={dd} />
      <Chip x={240} y={G1.clutch} text="mở" c={AUDI} s={30} o={c} />
      <Chip x={240} y={G1.axR - 90} text="mở" c={AUDI} s={30} o={dd} />
    </g>
  );
};

const s65 = ({ f }) => (
  <g>
    <DrivetrainTop g={G1} c={AUDI} roll={f * ROLL} spinR={f * W * 0.85} clutchOpen={1} decoupleOpen={1} kF={1} kR={0} />
    <Chip x={850} y={G1.axF - 150} text="lực chỉ tới cầu trước" c={AUDI} s={26} o={appear(f, 2, 8)} />
  </g>
);

// khung mẫu đã duyệt (Sample008A)
const s66 = ({ f, at }) => {
  const a = M.stop66(at);
  const grey = interpolate(f, [a, a + SPIN_DOWN], [0, 1], clamp);
  const lab = appear(f, a + 10, 10);
  const stopped = f >= a + SPIN_DOWN;
  return (
    <g>
      <DrivetrainTop g={G1} c={AUDI} roll={f * ROLL} spinR={spinDown(f, a)} rearGrey={grey} clutchOpen={1} decoupleOpen={1} kF={1} kR={0} />
      <line x1={345} y1={G1.clutch + 110} x2={524} y2={G1.clutch + 110} stroke={grey > 0.5 ? OFF : AUDI} strokeWidth={3} opacity={lab} />
      <Chip x={200} y={G1.clutch + 70} text="trục ra cầu sau" c={C.steel} s={30} o={lab} />
      <Chip x={200} y={G1.clutch + 125} text={stopped ? 'đã dừng' : 'chậm dần'} c={stopped ? C.white : C.steel} s={30} o={lab} />
      <line x1={300} y1={G1.axR + 120} x2={G1.cx - G1.track} y2={G1.axR + 64} stroke={C.white} strokeWidth={3} opacity={lab} />
      <Chip x={270} y={G1.axR + 150} text="bánh sau vẫn lăn" c={C.white} s={30} o={lab} />
      <Chip x={850} y={G1.axF - 150} text="lực chỉ tới cầu trước" c={AUDI} s={26} />
      <Chip x={800} y={G1.axR + 150} text="giảm tổn hao" c={AUDI} s={32} o={appear(f, a + SPIN_DOWN, 10)} />
    </g>
  );
};

// ---------- Cảnh 7 ----------
const s71 = ({ f, at }) => {
  const pull = appear(f, M.pull71(at), 14);
  return (
    <g>
      <Chip x={540} y={660} text="1980" c={GOLD} s={44} />
      <LockKnob x={600} y={960} pull={pull} hand={appear(f, M.pull71(at) - 10, 8)} />
      <T x={540} y={1240} s={28} c={C.dim}>
        hình minh họa chung, không phải bản vẽ xe
      </T>
    </g>
  );
};

const G7 = car(700, 640, 0.8);
const s72 = ({ f }) => (
  <g>
    <DrivetrainTop g={G7} c={AUDI} roll={f * ROLL * 0.8} spinR={0} rearGrey={1} clutchOpen={1} decoupleOpen={1} kF={1} kR={0} hiClutch={0.6} hiDecouple={0.6} />
    <Brain x={230} y={900} c={AUDI} to={[[G7.cx - 30, G7.clutch], [G7.cx - 30, G7.axR - 40]]} o={appear(f, M.brain72(), 8)} pulse={f * 2} />
  </g>
);

const s73 = ({ f, at }) => {
  const a = M.head73(at);
  return (
    <g>
      <PredictLine y={740} bracket={appear(f, a, 14)} />
      <DrivetrainTop g={car(540, 880, 0.6)} c={AUDI} roll={f * ROLL * 0.6} spinR={0} rearGrey={1} clutchOpen={1} decoupleOpen={1} kF={1} kR={0} />
      <Chip x={540} y={1300} text="theo Audi" c={C.steel} s={28} />
    </g>
  );
};

const s74 = ({ f, at }) => {
  const a = M.close74(at);
  const cl = 1 - appear(f, a, OPEN);
  const g = car(540, 880, 0.6);
  return (
    <g>
      <PredictLine y={740} bracket={1} seg={appear(f, a, 6)} />
      <DrivetrainTop g={g} c={AUDI} roll={f * ROLL * 0.6} spinR={spinUp(f, a)} rearGrey={cl} clutchOpen={cl} decoupleOpen={cl} kF={1} kR={0.6 * (1 - cl)} />
      <Chip x={540} y={1300} text="theo Audi" c={C.steel} s={28} />
    </g>
  );
};

// ---------- Cảnh 8: so sánh, không xếp hạng ----------
const AUDI_OFF = { spinR: 0, rearGrey: 1, clutchOpen: 1, decoupleOpen: 1, kR: 0 };
const s81 = ({ f, d, at }) => (
  <Pair f={f} sub={{ hiClutch: appear(f, M.hiA81(), 8) }} aud={{ hiClutch: appear(f, M.hiB81(at, d), 8) }} />
);

const s82 = ({ f }) => (
  <g>
    <Pair f={f} oL={0.35} oR={0.35} labels={false} />
    <Chip x={540} y={910} text="khác ở cách điều khiển" c={GOLD} s={44} o={appear(f, 2, 8)} />
  </g>
);

const s83 = ({ f }) => (
  <g>
    <Pair f={f} oR={0.3} aud={AUDI_OFF} />
    <Chip x={290} y={1290} text="luôn nối hai cầu" c={SUBARU} s={26} o={appear(f, 4, 8)} />
    <T x={290} y={1350} s={24} c={C.steel} o={appear(f, 4, 8)}>
      theo Subaru
    </T>
  </g>
);

const s84 = ({ f }) => (
  <g>
    <Pair f={f} oL={0.3} aud={AUDI_OFF} />
    <Chip x={790} y={1290} text="ngắt khi chưa cần" c={AUDI} s={26} o={appear(f, 4, 8)} />
  </g>
);

const s85 = ({ f }) => (
  <g>
    <Pair f={f} oL={0.3} aud={AUDI_OFF} />
    <Chip x={790} y={1290} text="đỡ hao nhiên liệu" c={AUDI} s={26} o={appear(f, 2, 8)} />
    <T x={790} y={1350} s={24} c={C.steel} o={appear(f, 2, 8)}>
      theo Audi
    </T>
  </g>
);

const s86 = ({ f }) => (
  <g>
    <Pair f={f} aud={AUDI_OFF} />
    <Chip x={540} y={640} text="chưa thể nói hệ nào tốt hơn" c={C.white} s={32} o={appear(f, 10, 10)} />
  </g>
);

// ---------- Cảnh 9 ----------
const s91 = ({ f }) => <Stamp x={540} y={940} text="Hóa ra là vậy" p={Math.min(1, f / 14)} c={GOLD} />;

const s92 = ({ f }) => <Pair f={f} aud={AUDI_OFF} />;

const s93 = ({ f, at }) => (
  <g>
    <Pair f={f} aud={AUDI_OFF} />
    <Chip x={290} y={1290} text="lúc nào cũng sẵn sàng" c={SUBARU} s={24} o={appear(f, M.readyA93(), 8)} />
    <Chip x={790} y={1290} text="chỉ dùng khi cần" c={AUDI} s={24} o={appear(f, M.readyB93(at), 8)} />
  </g>
);

const s94 = ({ f, at }) => {
  const z = appear(f, 4, 24);
  const q = appear(f, M.q94(at), 8);
  return (
    <g>
      <g opacity={1 - z}>
        <Pair f={f} aud={AUDI_OFF} labels={false} />
      </g>
      <circle cx={540} cy={900} r={lerp(20, 200, z)} fill={GOLD} opacity={0.08 * z} />
      <g opacity={z} transform={`translate(540,900) scale(${lerp(0.2, 0.62, z)}) translate(${-CP.cx},${-CP.cy})`}>
        <ClutchPack p={0.6} aIn={f * 9} aOut={f * 9 * outRatio(0.6)} c={GOLD} faces={false} />
      </g>
      <g opacity={q}>
        <T x={540} y={1210} s={120} c={GOLD} w={900}>
          ?
        </T>
      </g>
    </g>
  );
};

const s95 = ({ f }) => <rect x={470} y={600} width={140} height={6} rx={3} fill={GOLD} opacity={appear(f, M.name95(), 8)} />;

export const SHOTS = {
  1.1: s11, 1.2: s12, 1.3: s13, 1.4: s14, 1.5: s15,
  2.1: s21, 2.2: s22, 2.3: s23, 2.4: s24, 2.5: s25,
  3.1: s31, 3.2: s32, 3.3: s33, 3.4: s34,
  4.1: s41, 4.2: s42, 4.3: s43, 4.4: s44, 4.5: s45, 4.6: s46,
  5.1: s51, 5.2: s52, 5.3: s53, 5.4: s54,
  6.1: s61, 6.2: s62, 6.3: s63, 6.4: s64, 6.5: s65, 6.6: s66,
  7.1: s71, 7.2: s72, 7.3: s73, 7.4: s74,
  8.1: s81, 8.2: s82, 8.3: s83, 8.4: s84, 8.5: s85, 8.6: s86,
  9.1: s91, 9.2: s92, 9.3: s93, 9.4: s94, 9.5: s95,
};
