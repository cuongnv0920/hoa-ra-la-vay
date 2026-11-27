// 38 shot của video 009, theo assets/storyboard.md. Mỗi shot nhận: f (frame trong shot), p (0..1), d (độ dài), at(cụm).
// Quy tắc chính xác (storyboard): vùng trượt luôn ở mép sau; bụi chỉ sinh ở chỗ trượt; "+26%" luôn kèm
// "mỗi xe dùng lốp theo xe"; dải 20–30% chỉ ghi "một vài số liệu khác ở nước ngoài"; VF 8 – CR-V không ghi % mòn;
// đồ thị mô-men xoắn và áp suất không ghi số; đảo lốp không vẽ sơ đồ cụ thể; xe là bóng chung chung, không logo.
import { Easing, interpolate } from 'remotion';
import { C } from '../theme';
import { Chip, Stamp, T } from '../v003/parts';
import { appear, lerp } from '../v005/fx';
import { ContactPatch, ROAD_Y } from './ContactPatch';
import { FORCE, M, V } from './cues';
import {
  Arrow, BarPair, CarSideX, CarTop, CheckItem, clamp, EV, ForceTimeGraph, GOLD, ICE, MiniPatch, Pedal, PressureGauge, RangeBand, SLIDE, Slider, Strike, Suv, TireSection, TorqueCurve, WeighScale,
} from './parts';

const ramp = (f, a, b, v0, v1, e = Easing.inOut(Easing.cubic)) => interpolate(f, [a, b], [v0, v1], { ...clamp, easing: e });

// mũi tên "xe chạy" của mặt cắt
const Travel = ({ o = 1 }) => (
  <g opacity={o}>
    <line x1={760} y1={ROAD_Y - 330} x2={900} y2={ROAD_Y - 330} stroke={C.line} strokeWidth={6} strokeLinecap="round" />
    <path d={`M920 ${ROAD_Y - 330} l-26 -16 v32 z`} fill={C.line} />
    <T x={840} y={ROAD_Y - 352} s={28} c={C.line}>xe chạy</T>
  </g>
);

// ================= Cảnh 1 =================
const s11 = ({ f }) => (
  <g>
    <CarSideX cx={540} cy={900} w={820} roll={f * 5} brake={appear(f, M.brake11(), 12)} />
    <Chip x={540} y={1200} text="má phanh: mòn chậm" c={EV} s={34} o={appear(f, M.brake11() + 8, 10)} />
    <T x={540} y={1262} s={26} c={C.dim} o={appear(f, M.brake11() + 14, 10)}>nhờ phanh tái sinh</T>
  </g>
);

const s12 = ({ f, d, at }) => {
  const [a, b] = M.wear12(at, d);
  const depth = ramp(f, a, b, 1, 0.08);
  return (
    <g>
      <TireSection depth={depth} warn={appear(f, b - 6, 8)} />
    </g>
  );
};

const s13 = ({ f, at }) => {
  const n = M.no13(at);
  return (
    <g>
      <Chip x={540} y={880} text="lốp xe điện kém hơn?" c={C.white} s={46} o={appear(f, M.q13(), 10) * (1 - 0.5 * appear(f, n, 8))} />
      <Strike x1={300} x2={780} y={870} p={appear(f, n, 8)} c={C.steel} />
      <T x={540} y={1060} s={72} c={GOLD} w={800} o={appear(f, n, 8)}>chưa chắc</T>
    </g>
  );
};

// nhìn từ dưới mặt đường trong suốt: mảng tiếp xúc
const s14 = ({ f }) => {
  const k = appear(f, M.dive14(), 18);
  const w = lerp(120, 300, k);
  const h = lerp(70, 190, k);
  return (
    <g>
      <rect x={120} y={660} width={840} height={600} rx={30} fill="#161c27" stroke={C.steelDark} strokeWidth={4} opacity={0.9} />
      <rect x={540 - w * 0.62} y={960 - h * 1.6} width={w * 1.24} height={h * 3.2} rx={50} fill="none" stroke={C.steelDark} strokeWidth={4} strokeDasharray="10 10" opacity={k} />
      <rect x={540 - w / 2} y={960 - h / 2} width={w} height={h} rx={40} fill={C.white} fillOpacity={0.85} />
      <T x={540} y={1210} s={34} c={C.white} o={appear(f, 16, 10)}>vùng tiếp xúc</T>
      <T x={540} y={720} s={26} c={C.dim} o={appear(f, 16, 10)}>nhìn từ dưới mặt đường lên</T>
    </g>
  );
};

// ================= Cảnh 2 =================
const s21 = ({ f, at }) => {
  const a = appear(f, M.arF21(at), 8);
  const b = appear(f, M.arB21(at), 8);
  const c = appear(f, M.arS21(at), 8);
  return (
    <g>
      <CarTop cx={540} cy={960} s={1} />
      <Arrow x1={540} y1={640} x2={540} y2={600 - 40 * a} w={14} c={C.white} o={a} />
      <T x={600} y={640} s={30} c={C.white} o={a} a="start">tăng tốc</T>
      <Arrow x1={400} y1={700} x2={400} y2={760 + 40 * b} w={12} c={C.white} o={b} />
      <T x={380} y={680} s={30} c={C.white} o={b} a="end">phanh</T>
      <Arrow x1={720} y1={960} x2={820 + 40 * c} y2={960} w={12} c={C.white} o={c} />
      <T x={800} y={920} s={30} c={C.white} o={c}>vào cua</T>
    </g>
  );
};

const s22 = ({ f, at }) => {
  const k = appear(f, M.patch22(at) - 6, 14);
  return (
    <g>
      <CarTop cx={540} cy={960} s={1} patch={k} />
      {[0, 1, 2].map((i) => (
        <Arrow key={i} x1={[540, 400, 720][i]} y1={[640, 700, 960][i]} x2={lerp([540, 400, 860][i], 540, k)} y2={lerp([560, 800, 960][i], 960, k)} w={12 * (1 - k) + 2} o={1 - k} />
      ))}
    </g>
  );
};

const s23 = ({ f, at }) => {
  const [a, b] = M.force23(at);
  const z = M.zones23(at);
  return (
    <g>
      <ContactPatch roll={f * V} force={ramp(f, a, b, 0, FORCE)} load={0.45} zones={appear(f, z - 4, 14)} labels={appear(f, z + 4, 14)} slideGlow={0.75 + 0.25 * Math.sin(f / 5)} />
      <Travel o={appear(f, 0, 10)} />
    </g>
  );
};

const s24 = ({ f }) => (
  <g>
    <ContactPatch roll={f * V} force={FORCE} load={0.45} zones={1} labels={1} dust={appear(f, M.dust24(), 12) * 0.6} slideGlow={0.75 + 0.25 * Math.sin(f / 5)} />
    <Travel />
    <Chip x={260} y={700} text="bụi cao su li ti" c={C.steel} s={30} o={appear(f, 14, 10)} />
  </g>
);

const s25 = ({ f, at }) => {
  const k = appear(f, M.strike25(at), 8);
  return (
    <g>
      <Chip x={540} y={940} text={'lốp tự "ăn đường"'} c={C.steel} s={52} o={1 - 0.5 * k} />
      <Strike x1={310} x2={770} y={930} p={k} c={C.heat} />
    </g>
  );
};

const s26 = ({ f, at }) => {
  const a = M.speed26(at);
  const b = M.turn26(at);
  const rot = ramp(f, b - 4, b + 22, 0, 24);
  const flash = (x) => Math.max(0, 1 - Math.abs(f - x - 6) / 10);
  return (
    <g>
      <CarTop cx={540} cy={980} s={0.9} rot={rot} patch={Math.max(flash(a), flash(b))} dust={Math.max(flash(a), flash(b))} f={f} />
      <Chip x={300} y={660} text="đổi tốc độ" c={GOLD} s={30} o={appear(f, a, 8)} />
      <Chip x={790} y={660} text="đổi hướng" c={GOLD} s={30} o={appear(f, b, 8)} />
    </g>
  );
};

// ================= Cảnh 3 =================
const s31 = ({ f }) => {
  const k = appear(f, M.battery31(), 14);
  return (
    <g>
      <CarSideX cx={540} cy={920} w={820} battery={k} weight={appear(f, M.battery31() + 12, 14)} />
      <Chip x={540} y={1220} text="khối pin dưới sàn" c={EV} s={32} o={appear(f, M.battery31() + 8, 10)} />
    </g>
  );
};

const Convoy = ({ f, gapO = 0, labels = 0 }) => {
  const k = appear(f, M.cars32(), 18);
  return (
    <g>
      <line x1={60} y1={1080} x2={1020} y2={1080} stroke={C.steelDark} strokeWidth={4} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line key={i} x1={((i * 180 - f * 8) % 1080 + 1080) % 1080} y1={1110} x2={((i * 180 - f * 8) % 1080 + 1080) % 1080 + 80} y2={1110} stroke={C.steelDark} strokeWidth={6} />
      ))}
      <Suv cx={lerp(-300, 300, k)} cy={1010} w={360} color={ICE} roll={f * 8} />
      <Suv cx={lerp(-100, 760, k)} cy={1010} w={360} color={EV} roll={f * 8} />
      <T x={300} y={1170} s={30} c={ICE} o={labels}>Kia Niro hybrid</T>
      <T x={760} y={1170} s={30} c={EV} o={labels}>Tesla Model Y</T>
      <Chip x={760} y={860} text="nặng hơn ≈ 490 kg" c={GOLD} s={34} o={gapO} />
    </g>
  );
};

const s32 = ({ f }) => (
  <g>
    <Convoy f={f} />
    <Chip x={540} y={700} text="chạy cùng đoàn · Anh, 2023" c={C.white} s={32} o={appear(f, 12, 10)} />
  </g>
);

const s33 = ({ f, at }) => <Convoy f={f + 40} labels={appear(f, 2, 10)} gapO={appear(f, M.gap33(at), 8)} />;

const s34 = ({ f, at }) => {
  const k = appear(f, M.bars34(), 18);
  const plus = appear(f, M.plus34(at), 8);
  return (
    <g>
      <T x={540} y={660} s={30} c={C.dim}>cao su mòn đi</T>
      <BarPair base={1150} hA={300 * k} hB={378 * k} lA="Kia Niro hybrid" lB="Tesla Model Y" labelB={plus > 0 ? '+26%' : ''} />
      <T x={540} y={1260} s={24} c={C.dim} o={appear(f, 10, 10)}>mỗi xe dùng lốp theo xe</T>
    </g>
  );
};

const s35 = ({ f, at }) => (
  <g>
    <RangeBand y={940} p={appear(f, M.band35(at) - 4, 16)} mark={1} />
    <T x={540} y={1120} s={30} c={GOLD} o={appear(f, M.band35(at) + 10, 10)}>≈ 20–30%</T>
    <T x={540} y={1170} s={26} c={C.dim} o={appear(f, M.band35(at) + 10, 10)}>một vài số liệu khác ở nước ngoài · cách đo khác nhau</T>
  </g>
);

const s36 = ({ f, at }) => {
  const h = appear(f, M.heavy36(at) - 10, 20);
  return (
    <g>
      <MiniPatch x={0} y={330} s={0.5} roll={f * V} force={0.45} load={0.2} zones={1} dust={0.35} labels={0} />
      <MiniPatch x={540} y={330} s={0.5} roll={f * V} force={lerp(0.45, 0.8, h)} load={lerp(0.2, 1, h)} zones={1} dust={lerp(0.35, 0.9, h)} labels={0} />
      <line x1={540} y1={640} x2={540} y2={970} stroke={C.steelDark} strokeWidth={3} strokeDasharray="8 8" />
      <Chip x={270} y={700} text="xe nhẹ" c={ICE} s={32} />
      <Chip x={810} y={700} text="xe nặng" c={EV} s={32} />
      <Arrow x1={160} y1={1040} x2={300} y2={1040} w={8} />
      <Arrow x1={700} y1={1040} x2={840 + 80 * h} y2={1040} w={8 + 10 * h} />
      <T x={540} y={1110} s={28} c={C.dim} o={appear(f, M.heavy36(at), 10)}>nặng hơn → lực lớn hơn → trượt nhiều hơn</T>
    </g>
  );
};

// ================= Cảnh 4 =================
const s41 = ({ f }) => {
  const k = appear(f, M.shrink41(), 20);
  return (
    <g>
      <Chip x={lerp(540, 860, k)} y={lerp(940, 640, k)} text="≈ 490 kg" c={GOLD} s={lerp(60, 30, k)} o={1 - 0.4 * k} />
      <T x={540} y={1000} s={48} c={C.white} w={800} o={appear(f, 12, 12)}>Không phải xe nào</T>
      <T x={540} y={1066} s={48} c={C.white} w={800} o={appear(f, 12, 12)}>cũng nặng hơn nhiều</T>
    </g>
  );
};

const VF = 1870;
const CRV = 1660;
const count = (f, a, v) => ramp(f, a, a + 36, 0, v, Easing.out(Easing.cubic));
const Scales = ({ vL, vR, oR = 1, glow = 0, evTag = 1 }) => (
  <g>
    <WeighScale cx={290} y={1010} value={vL} color={EV} label="VF 8 thế hệ mới" sub="pin LFP" glow={glow} w={400} />
    <g opacity={oR}>
      <WeighScale cx={790} y={1010} value={vR} color={ICE} label="CR-V 1.5 turbo" sub="máy xăng" glow={glow} w={400} />
    </g>
    <Chip x={290} y={700} text="xe điện" c={EV} s={26} o={evTag} />
  </g>
);

const s42 = ({ f, at }) => <Scales vL={count(f, M.w42(at), VF)} vR={0} oR={0.25} />;
const s43 = ({ f, at }) => <Scales vL={VF} vR={count(f, M.w43(at), CRV)} />;
const s44 = ({ f }) => {
  const k = appear(f, M.gap44(), 14);
  return (
    <g>
      <Scales vL={VF} vR={CRV} />
      <g opacity={k}>
        <rect x={340} y={1265} width={(490 / 490) * 400} height={16} rx={8} fill={C.steelDark} opacity={0.6} />
        <T x={330} y={1280} s={24} c={C.dim} a="end">≈ 490 kg</T>
        <rect x={340} y={1297} width={(210 / 490) * 400} height={16} rx={8} fill={GOLD} />
        <T x={330} y={1312} s={24} c={GOLD} a="end">≈ 210 kg</T>
      </g>
    </g>
  );
};
const s45 = ({ f, at }) => {
  const l = appear(f, M.label45(at), 10);
  return (
    <g>
      <Scales vL={VF} vR={CRV} glow={appear(f, M.glow45(at), 6)} evTag={1 - 0.7 * l} />
      <Strike x1={240} x2={340} y={698} p={l} c={C.steel} />
      <Chip x={540} y={640} text="nhìn cân nặng" c={GOLD} s={30} o={appear(f, M.glow45(at), 8)} />
    </g>
  );
};

// ================= Cảnh 5 =================
const s51 = ({ f, at }) => (
  <g>
    <TorqueCurve pIce={ramp(f, M.ice51(), M.ice51() + 30, 0, 1)} pEv={ramp(f, M.ev51(at), M.ev51(at) + 18, 0, 1)} />
  </g>
);

const s52 = ({ f, at }) => {
  const a = M.go52(at);
  const v = ramp(f, a - 4, a + 16, 0.4, 1, Easing.out(Easing.cubic));
  let x = 0;
  for (let i = 0; i < f; i++) x += i < a - 4 ? 0.6 : 0.6 + 9 * Math.min(1, (i - a + 4) / 20);
  return <CarSideX cx={Math.min(540, 340 + x)} cy={920} w={640} roll={f * 6 * v} push={appear(f, a - 2, 10)} />;
};

const s53 = ({ f, at }) => {
  const press = appear(f, M.press53(at), 6);
  const pu = M.pulse53(at);
  const py = ramp(f, pu - 10, pu + 4, 760, 1190, Easing.in(Easing.quad));
  const hit = f > pu + 4;
  return (
    <g>
      <MiniPatch x={189} y={500} s={0.65} roll={f * V} force={hit ? 0.85 : 0.3} load={0.45} zones={1} dust={hit ? 0.8 : 0.2} labels={0} />
      <Pedal x={540} y={720} s={0.85} press={press} />
      {f > pu - 10 && !hit && <circle cx={540} cy={py} r={18} fill={SLIDE} />}
    </g>
  );
};

const s54 = ({ f }) => (
  <g>
    <ForceTimeGraph pSoft={ramp(f, M.soft54(), M.soft54() + 36, 0, 1)} x0={190} y0={870} h={240} />
    <MiniPatch x={216} y={560} s={0.6} roll={f * V} force={0.3} load={0.45} zones={1} labels={0} dust={0.2} />
  </g>
);

const s55 = ({ f }) => (
  <g>
    <ForceTimeGraph pSoft={1} pHard={ramp(f, M.hard55(), M.hard55() + 14, 0, 1)} x0={190} y0={870} h={240} />
    <MiniPatch x={216} y={560} s={0.6} roll={f * V} force={ramp(f, M.hard55(), M.hard55() + 10, 0.3, 0.9)} load={0.45} zones={1} labels={0} dust={0.9} />
  </g>
);

const s56 = ({ f }) => (
  <g>
    {[0, 1, 2, 3].map((i) => (
      <line key={i} x1={120 - ((f * 30 + i * 60) % 200)} y1={830 + i * 40} x2={220 - ((f * 30 + i * 60) % 200)} y2={830 + i * 40} stroke={C.line} strokeOpacity={0.5} strokeWidth={5} strokeLinecap="round" />
    ))}
    <CarSideX cx={560} cy={920} w={700} roll={f * 24} push={0.8} />
  </g>
);

const s57 = ({ f, at }) => {
  const c = M.calm57(at);
  const calm = appear(f, c, 10);
  return (
    <g>
      <MiniPatch x={30} y={500} s={0.45} roll={f * V} force={0.3} load={0.45} zones={1} labels={0} dust={0.2} />
      <MiniPatch x={565} y={500} s={0.45} roll={f * V} force={0.85} load={0.45} zones={1} labels={0} dust={0.9} />
      <Chip x={273} y={700} text="êm" c={C.white} s={32} o={0.6 + 0.4 * calm} />
      <Chip x={808} y={700} text="gắt" c={SLIDE} s={32} o={1 - 0.4 * calm} />
      <rect x={30} y={600} width={486} height={470} rx={20} fill="none" stroke={EV} strokeWidth={5} opacity={calm} />
      <Pedal x={540} y={1150} s={0.5} press={0.6 - 0.35 * calm + 0.15 * Math.sin(f / 8) * (1 - calm)} />
    </g>
  );
};

// ================= Cảnh 6 =================
const s61 = ({ f, at }) => (
  <g>
    <T x={540} y={860} s={44} c={C.dim} w={700}>xe điện chắc chắn mòn lốp nhanh hơn?</T>
    <T x={540} y={1040} s={120} c={GOLD} w={800} o={appear(f, M.no61(at), 6)}>Không.</T>
  </g>
);

const s62 = ({ f, at }) => {
  const t = M.chips62(at);
  const pos = [[220, 690], [860, 690], [190, 1230], [540, 1290], [890, 1230]];
  const txt = ['cân nặng', 'cách tăng tốc', 'mặt đường', 'áp suất', 'loại lốp'];
  return (
    <g>
      <MiniPatch x={216} y={420} s={0.6} roll={f * V} force={0.55} load={0.45} zones={1} labels={0} dust={0.4} />
      {txt.map((s, i) => <Chip key={s} x={pos[i][0]} y={pos[i][1]} text={s} c={GOLD} s={30} o={appear(f, t[i] - 2, 8)} />)}
    </g>
  );
};

const List = ({ on }) => (
  <g>
    <CheckItem y={680} text="tăng tốc mượt" on={on[0]} />
    <CheckItem y={780} text="đúng áp suất khuyến cáo" on={on[1]} />
    <CheckItem y={880} text="đảo lốp đúng lịch" on={on[2]} />
  </g>
);
const s63 = ({ f, at }) => {
  const k = appear(f, M.item63(at) - 4, 8);
  return (
    <g>
      <List on={[k, 0, 0]} />
      <ForceTimeGraph pSoft={ramp(f, M.item63(at) - 4, M.item63(at) + 14, 0, 1)} x0={250} y0={1250} w={580} h={200} small o={k} />
    </g>
  );
};
const s64 = ({ f }) => (
  <g>
    <List on={[1, appear(f, M.item64(), 8), 0]} />
    <PressureGauge cx={540} cy={1150} needle={ramp(f, 6, 30, 0.1, 0.55, Easing.out(Easing.back(1.4)))} o={appear(f, 2, 8)} />
    <T x={540} y={1265} s={24} c={C.dim} o={appear(f, 8, 10)}>theo tem cửa / sách hướng dẫn</T>
  </g>
);
const s65 = ({ f }) => (
  <g>
    <List on={[1, 1, appear(f, M.item65(), 8)]} />
    <CarTop cx={540} cy={1110} s={0.55} wheelsOnly={0.6} swap={ramp(f, 8, 34, 0, 1)} color={EV} />
    <T x={540} y={1290} s={24} c={C.dim} o={appear(f, 8, 10)}>theo sách hướng dẫn của xe</T>
  </g>
);

// ================= Cảnh 7 =================
const s71 = ({ f }) => <Stamp x={540} y={930} text="Hóa ra là vậy" p={Math.min(1, Math.max(0, (f - M.stamp71()) / 14))} c={GOLD} />;

const s72 = ({ f }) => (
  <g>
    <ContactPatch roll={f * V} force={FORCE} load={0.45} zones={1} labels={1} dust={0.5} />
    <Travel />
  </g>
);

const s73 = ({ f, at }) => {
  const [a, b] = M.sl73(at);
  const w = ramp(f, a, a + 16, 0.35, 0.95);
  const g = ramp(f, b, b + 12, 0.3, 0.95);
  return (
    <g>
      <ContactPatch roll={f * V} force={lerp(0.4, 0.85, g)} load={lerp(0.25, 1, w)} zones={1} labels={0} dust={lerp(0.3, 1, (w + g) / 2)} clipTop={800} />
      <Slider x={130} y={650} w={330} v={w} label="cân nặng" />
      <Slider x={620} y={650} w={330} v={g} label="đạp ga" />
    </g>
  );
};

const s74 = ({ f, at }) => {
  const g = ramp(f, M.down74(at) - 6, M.down74(at) + 20, 0.95, 0.25);
  return (
    <g>
      <ContactPatch roll={f * V} force={lerp(0.4, 0.85, (g - 0.25) / 0.7)} load={1} zones={1} labels={0} dust={lerp(0.15, 1, (g - 0.25) / 0.7)} clipTop={800} />
      <Slider x={130} y={650} w={330} v={0.95} label="cân nặng" o={0.5} />
      <Slider x={620} y={650} w={330} v={g} label="đạp ga" color={EV} />
    </g>
  );
};

const s75 = ({ f }) => (
  <g opacity={appear(f, M.name75(), 12)}>
    <T x={540} y={960} s={96} c={GOLD} w={800}>Hóa Ra Là Vậy</T>
  </g>
);

export const SHOTS = {
  1.1: s11, 1.2: s12, 1.3: s13, 1.4: s14,
  2.1: s21, 2.2: s22, 2.3: s23, 2.4: s24, 2.5: s25, 2.6: s26,
  3.1: s31, 3.2: s32, 3.3: s33, 3.4: s34, 3.5: s35, 3.6: s36,
  4.1: s41, 4.2: s42, 4.3: s43, 4.4: s44, 4.5: s45,
  5.1: s51, 5.2: s52, 5.3: s53, 5.4: s54, 5.5: s55, 5.6: s56, 5.7: s57,
  6.1: s61, 6.2: s62, 6.3: s63, 6.4: s64, 6.5: s65,
  7.1: s71, 7.2: s72, 7.3: s73, 7.4: s74, 7.5: s75,
};
