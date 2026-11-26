// 35 shot của video 007, theo assets/storyboard.md. Mỗi shot nhận: f (frame trong shot), p (0..1), d (độ dài), at(cụm).
import { C } from '../theme';
import { ease, prog } from '../timing';
import { Chip, T } from '../v003/parts';
import { appear, lerp, Tag, view, Zoom } from '../v005/fx';
import { BOXER, BoxerEngine, CYLS, CYLS6, pairDir, pairExt, pinDist } from './BoxerEngine';
import { JOIN, M, SLIDE } from './cues';
import {
  Arrow, BalanceShafts, Big, BoxerFoot, BoxerFront, Bracket, CarFront, CarTop, Check, CoG, COG, FOOT, Gearbox, Glove, GOLD, GROUND, Group, INLINE,
  InlineFoot, InlineFront, inlineForce, InlineSide, inertia, LAMBDA, OMEGA, SparkPlug, TOP, turnFlash, Wrench,
} from './parts';

const rad = (d) => (d * Math.PI) / 180;
const th = (f, t0 = 0) => t0 + OMEGA * f;

// ---------- Cảnh 1 ----------
const s11 = ({ f, p }) => {
  const hi = p < 0.8 ? Math.min(3, Math.floor((p / 0.8) * 4)) : -1;
  return (
    <g>
      <Group x={540} y={1170} s={0.85}>
        <InlineSide theta={th(f)} hiIndex={hi} />
      </Group>
      <Chip x={540} y={800} text="xi-lanh đứng thành hàng" c={INLINE} s={32} o={appear(f, 6, 10)} />
    </g>
  );
};

const s12 = ({ f, at }) => {
  const k = appear(f, M.slide12(at), SLIDE);
  return (
    <g>
      <T x={540} y={640} s={26} c={C.dim} w={600}>
        nhìn từ phía trước
      </T>
      <Group x={290} y={1130} s={0.8} o={0.55 + 0.45 * (1 - k)}>
        <InlineFront theta={th(f)} />
      </Group>
      <T x={290} y={1290} s={32} c={INLINE}>
        đứng
      </T>
      <Group x={lerp(1250, 700, k)} y={1130} s={0.7}>
        <BoxerFront theta={th(f)} />
      </Group>
      <T x={700} y={1290} s={32} c={BOXER} o={k}>
        nằm ngang
      </T>
    </g>
  );
};

const s13 = ({ f }) => (
  <g>
    <Group x={540} y={1060} s={0.9}>
      <BoxerFront theta={th(f)} />
    </Group>
    <Big x={540} y={860} s={170 + 12 * Math.sin(f / 5)}>
      ?
    </Big>
  </g>
);

// ---------- Cảnh 2: nhìn từ trên xuống ----------
const s21 = ({ f, at }) => {
  const k = appear(f, 4, 18);
  return (
    <g>
      <g opacity={1 - k}>
        <Group x={540} y={960} s={0.9}>
          <BoxerFront theta={th(f)} />
        </Group>
      </g>
      <g opacity={k}>
        <BoxerEngine cx={540} cy={960} thetaDeg={th(f)} />
      </g>
      <Chip x={300} y={630} text="boxer" c={BOXER} s={36} />
      <Chip x={680} y={630} text="đối đỉnh nằm ngang" c={BOXER} s={32} o={appear(f, M.chip21(at), 8)} />
    </g>
  );
};

const s22 = ({ f, at }) => {
  const t = th(Math.max(0, f - M.crank22()), 180);
  const glow = appear(f, M.label22(at) - 6, 10);
  return (
    <g>
      <BoxerEngine cx={540} cy={960} thetaDeg={t} />
      <line x1={540} y1={690} x2={540} y2={1250} stroke={GOLD} strokeWidth={26} strokeLinecap="round" opacity={0.25 * glow * (0.7 + 0.3 * Math.sin(f / 4))} />
      <Chip x={250} y={650} text="xi-lanh" c={C.steel} s={30} />
      <Chip x={830} y={650} text="xi-lanh" c={C.steel} s={30} />
      <Tag x={330} y={1290} to={[532, 1210]} text="trục khuỷu (crankshaft)" c={GOLD} s={30} o={glow} />
    </g>
  );
};

// Đúng khung mẫu đã duyệt (Sample007, shot 2.3)
const PairArrows = ({ t, cy }) => {
  const dir = pairDir(t, 0);
  const ext = pairExt(t, 0);
  const ao = Math.min(1, 0.15 + Math.abs(pairExt(t + 3, 0) - ext) / ((40 * 3 * Math.PI) / 180));
  const yA = [cy + CYLS[0].dy, cy + CYLS[1].dy];
  const A = ({ x, y, d }) => <Arrow x={x - d * 34} y={y} dx={d * 70} dy={0} o={ao} />;
  return (
    <g>
      <A x={900} y={yA[0]} d={dir} />
      <A x={180} y={yA[1]} d={-dir} />
    </g>
  );
};
const s23 = ({ f }) => {
  const t = th(f, 180);
  const cy = 950;
  const yA = cy + CYLS[1].dy;
  return (
    <g>
      <BoxerEngine cx={540} cy={cy} thetaDeg={t} hi={0} dim={0.4} />
      <PairArrows t={t} cy={cy} />
      <Chip x={790} y={620} text={pairDir(t, 0) > 0 ? 'cùng ra' : 'cùng vào'} c={BOXER} s={40} />
      <Tag x={330} y={1272} to={[534, 1200]} text="trục khuỷu (crankshaft)" c={C.steel} s={30} />
      <Tag x={250} y={700} to={[290, yA - 40]} text="một cặp đối diện" c={BOXER} s={30} />
    </g>
  );
};

const s24 = ({ f }) => {
  const t = th(f, 180);
  const cy = 950;
  const e = pairExt(t, 0) - 130; // −40..+40: găng đi theo piston
  return (
    <g>
      <BoxerEngine cx={540} cy={cy} thetaDeg={t} hi={0} dim={0.3} />
      <Glove x={540 + 360 + e} y={cy + CYLS[0].dy - 100} dir={-1} s={0.9} />
      <Glove x={540 - 360 - e} y={cy + CYLS[1].dy + 110} dir={1} s={0.9} />
    </g>
  );
};

const s25 = ({ f }) => (
  <g>
    <Group x={540} y={975} s={0.78} o={appear(f, 0, 8)}>
      <BoxerEngine cx={0} cy={0} thetaDeg={th(f)} cyls={CYLS6} step={120} />
    </Group>
    <Chip x={300} y={630} text="Porsche 911" c={BOXER} s={34} o={appear(f, M.chip25(), 8)} />
    <Chip x={760} y={630} text="6 xi-lanh" c={BOXER} s={34} o={appear(f, M.chip25() + 6, 8)} />
  </g>
);

// ---------- Cảnh 3: rung (nhìn từ phía trước một cặp) ----------
const FX = 540;
const FY = 960;
const FS = 1.2;
const pistonX = (t, k) => FX + k * FS * (pinDist(rad(t)) + 20);

const s31 = ({ f }) => {
  const t = th(f);
  const fl = turnFlash(t);
  return (
    <g>
      <Group x={FX} y={FY} s={FS}>
        <BoxerFront theta={t} lit={{ L: false, R: true }} dimO={0.15} />
      </Group>
      <circle cx={pistonX(t, 1)} cy={FY} r={30 + 26 * fl.o} fill="none" stroke={GOLD} strokeWidth="6" opacity={fl.o} />
      <Chip x={760} y={800} text="đổi chiều" c={GOLD} s={32} o={appear(f, 10, 8)} />
    </g>
  );
};

const s32 = ({ f }) => {
  const t = th(f);
  const fl = turnFlash(t);
  const nudge = 9 * inertia(rad(t)); // một piston: khối máy nhích theo
  return (
    <g>
      <Group x={FX + nudge} y={FY} s={FS}>
        <BoxerFront theta={t} lit={{ L: false, R: true }} dimO={0.15} />
      </Group>
      <Arrow x={pistonX(t, 1) - (fl.out ? 55 : -55)} y={FY - 120} dx={fl.out ? 110 : -110} dy={0} o={fl.o} w={10} />
      <T x={540} y={1200} s={30} c={C.dim} w={600}>
        khối máy nhích theo
      </T>
    </g>
  );
};

const PairForce = ({ t, scale = 100, cont = false }) => {
  const fl = turnFlash(t);
  const mag = cont ? inertia(rad(t)) : (fl.out ? 1 : -1) * fl.o;
  const o = cont ? Math.min(1, 0.2 + Math.abs(mag)) : fl.o;
  return (
    <g>
      <Arrow x={pistonX(t, 1) + (mag > 0 ? 70 : 160)} y={FY - 120} dx={scale * mag} dy={0} o={o} w={10} />
      <Arrow x={pistonX(t, -1) - (mag > 0 ? 70 : 160)} y={FY - 120} dx={-scale * mag} dy={0} o={o} w={10} />
    </g>
  );
};

const s33 = ({ f }) => {
  const t = th(f);
  return (
    <g>
      <Group x={FX} y={FY} s={FS}>
        <BoxerFront theta={t} />
      </Group>
      <PairForce t={t} />
    </g>
  );
};

const s34 = ({ f }) => {
  const t = th(f);
  return (
    <g>
      <Group x={FX} y={FY} s={FS} r={0.4 * Math.sin(rad(t))}>
        <BoxerFront theta={t} />
      </Group>
      <PairForce t={t} cont scale={90} />
      <Chip x={540} y={1210} text="bù nhau gần hết" c={GOLD} s={32} o={appear(f, 12, 10)} />
    </g>
  );
};

const IX = 540;
const IY = 1150;
const IS = 0.85;
const s35 = ({ f }) => {
  const t = th(f);
  const v = inlineForce(t) / LAMBDA; // −1..1, nhịp gấp đôi vòng quay
  return (
    <g>
      <Group x={IX} y={IY - 7 * v} s={IS}>
        <InlineSide theta={t} />
      </Group>
      <Arrow x={890} y={880} dx={0} dy={-110 * v} o={Math.min(1, 0.25 + Math.abs(v))} w={10} />
    </g>
  );
};

const s36 = ({ f }) => {
  const t = th(f);
  const k = appear(f, M.shafts36(), SLIDE);
  const v = (inlineForce(t) / LAMBDA) * (1 - 0.85 * k);
  return (
    <g>
      <Group x={IX} y={IY - 40 - 7 * v} s={IS}>
        <InlineSide theta={t} />
      </Group>
      <BalanceShafts theta={t} x={IX} y={IY - 40 + 100 + 40 * (1 - k)} gap={200} o={k} />
      <Arrow x={890} y={840} dx={0} dy={-110 * v} o={Math.min(1, 0.25 + Math.abs(v))} w={10} />
      <Tag x={250} y={1290} to={[IX - 100, IY + 60]} text="trục cân bằng" c={GOLD} s={28} o={k} />
    </g>
  );
};

const s37 = ({ f, at }) => {
  const k = appear(f, M.check37(at), 10);
  return (
    <g>
      <Group x={540} y={930} s={1}>
        <BoxerFront theta={th(f)} />
      </Group>
      <rect x={390} y={1080} width={300} height={110} rx={20} fill="none" stroke={C.steelDark} strokeWidth="4" strokeDasharray="12 10" />
      <T x={540} y={1145} s={26} c={C.dim} w={600}>
        trục cân bằng
      </T>
      <Check x={760} y={1130} s={1.3} o={k} />
      <Chip x={540} y={1260} text="không cần" c="#2BB673" s={32} o={k} />
    </g>
  );
};

const s38 = ({ f }) => {
  const t = th(f);
  const rock = 1.2 * Math.sin(rad(t)); // lắc rất nhẹ quanh tâm, không đứng yên tuyệt đối
  return (
    <g>
      <g transform={`rotate(${rock} 540 960)`}>
        <BoxerEngine cx={540} cy={960} thetaDeg={t} />
      </g>
    </g>
  );
};

// ---------- Cảnh 4: trọng tâm ----------
const s41 = ({ f }) => {
  const k = appear(f, 8, 14);
  const s = 0.72;
  const yI = GROUND - 74 * s;
  const yB = GROUND - 74 * s;
  const topI = yI - 310 * s;
  const topB = yB - 74 * s;
  return (
    <g>
      <line x1={120} y1={GROUND} x2={960} y2={GROUND} stroke={C.steelDark} strokeWidth="4" />
      <Group x={330} y={yI} s={s}>
        <InlineFront theta={th(f)} />
      </Group>
      <Group x={690} y={yB} s={s}>
        <BoxerFront theta={th(f)} />
      </Group>
      <Bracket x1={210} y1={GROUND} x2={210} y2={topI} c={INLINE} o={k} />
      <Bracket x1={455} y1={GROUND} x2={455} y2={topB} c={BOXER} o={k} />
      <line x1={455} y1={topB} x2={900} y2={topB} stroke={BOXER} strokeWidth="2" strokeDasharray="8 8" opacity={k} />
      <T x={330} y={1300} s={30} c={INLINE}>
        thẳng hàng
      </T>
      <T x={690} y={1300} s={30} c={BOXER}>
        boxer
      </T>
    </g>
  );
};

const EngineInBay = ({ f, y = 1047, s = 0.85, cog = 0 }) => (
  <g>
    <Group x={540} y={y} s={s}>
      <BoxerFront theta={th(f)} />
    </Group>
    {cog > 0 && <CoG x={540} y={y} r={12} o={cog} />}
  </g>
);

const s42 = ({ f }) => {
  const k = ease(prog(f, M.drop42(), M.drop42() + 24));
  const y = lerp(900, 1047, k);
  return (
    <g>
      <Zoom cx={540} cy={1040} s={1.35}>
        <CarFront />
        <EngineInBay f={f} y={y} cog={1} />
      </Zoom>
      <Tag x={760} y={680} to={view(540, 1040, 1.35)(552, y)} text="trọng tâm khối máy" c={COG} s={28} o={appear(f, M.drop42() + 20, 8)} />
    </g>
  );
};

const s43 = ({ f, p }) => {
  const z = lerp(1.35, 1, ease(prog(f, 0, M.car43())));
  const zc = lerp(1040, 950, ease(prog(f, 0, M.car43())));
  const c = appear(f, M.car43() + 10, 12);
  return (
    <g>
      <Zoom cx={540} cy={zc} s={z}>
        <CarFront labels={Math.max(0, (p - 0.15) / 0.6)} />
        <EngineInBay f={f} cog={1} />
        <CoG x={540} y={985} r={22} o={c} />
      </Zoom>
      <Tag x={790} y={800} to={view(540, zc, z)(560, 975)} text="trọng tâm cả xe" c={COG} s={28} o={c} />
    </g>
  );
};

const s44 = ({ f }) => {
  const k = appear(f, 6, 12);
  return (
    <g>
      <Zoom cx={540} cy={950} s={1}>
        <CarFront />
        <EngineInBay f={f} />
        <Bracket x1={540} y1={1150} x2={540} y2={GROUND} c={GOLD} o={k} />
      </Zoom>
      <Chip x={720} y={1210} text="gầm cao" c={GOLD} s={30} o={k} />
    </g>
  );
};

const s45 = ({ f }) => {
  const items = [
    ['thân xe', 330, 860],
    ['gầm xe', 750, 860],
    ['hệ treo', 330, 1060],
    ['động cơ', 750, 1060],
  ];
  return (
    <g>
      {items.map(([t, x, y], i) => {
        const k = appear(f, 2 + i * 6, 8);
        const eng = t === 'động cơ';
        return (
          <g key={t} opacity={k}>
            <rect x={x - 180} y={y - 80} width={360} height={150} rx={22} fill="rgba(5,9,18,0.8)" stroke={eng ? BOXER : C.steel} strokeWidth="5" />
            <T x={x} y={y + 14} s={40} c={eng ? BOXER : C.white}>
              {t}
            </T>
          </g>
        );
      })}
    </g>
  );
};

// ---------- Cảnh 5: chiều dài, bố cục ----------
const s51 = ({ f }) => {
  const k = ease(prog(f, 2, 26));
  const x0 = 180;
  const x1 = lerp(x0, 900, k);
  return (
    <g>
      <line x1={x0} y1={960} x2={x1} y2={960} stroke={GOLD} strokeWidth="8" strokeLinecap="round" />
      {Array.from({ length: 19 }, (_, i) => x0 + i * 40)
        .filter((x) => x <= x1)
        .map((x, i) => (
          <line key={x} x1={x} y1={960} x2={x} y2={960 - (i % 5 === 0 ? 46 : 24)} stroke={GOLD} strokeWidth="4" />
        ))}
      <T x={540} y={1060} s={30} c={C.dim} w={600}>
        đo từ trước ra sau
      </T>
    </g>
  );
};

const FS5 = 0.85;
const s52 = ({ f }) => {
  const k = appear(f, 6, 12);
  const li = FOOT.inline.l * FS5;
  const lb = FOOT.boxer.l * FS5;
  return (
    <g>
      <T x={540} y={640} s={26} c={C.dim} w={600}>
        ↑ đầu xe · nhìn từ trên xuống
      </T>
      <InlineFoot x={300} y={950} s={FS5} />
      <BoxerFoot x={700} y={950} s={FS5} />
      <Bracket x1={180} y1={950 - li / 2} x2={180} y2={950 + li / 2} c={INLINE} o={k} />
      <Bracket x1={470} y1={950 - lb / 2} x2={470} y2={950 + lb / 2} c={BOXER} o={k} />
      <T x={300} y={1250} s={30} c={INLINE}>
        thẳng hàng
      </T>
      <T x={700} y={1250} s={30} c={BOXER}>
        boxer
      </T>
    </g>
  );
};

const FT = 0.55; // tỉ lệ dấu chân máy trong sơ đồ xe
const engY = (l) => TOP.y0 + 40 + (l * FT) / 2;
const s53 = ({ f, d, at }) => {
  const drop = ease(prog(f, 0, M.hit53()));
  const sw = appear(f, M.swap53(at, d), SLIDE);
  const yI = lerp(TOP.y0 - 200, engY(FOOT.inline.l), drop);
  const yB = lerp(TOP.y0 - 200, engY(FOOT.boxer.l), sw);
  const hit = f >= M.hit53() ? (1 - sw) * (0.6 + 0.4 * Math.sin(f / 3)) : 0;
  const over = engY(FOOT.inline.l) + (FOOT.inline.l * FT) / 2;
  return (
    <Zoom cx={540} cy={940} s={1}>
      <CarTop />
      <rect x={TOP.x - 60} y={TOP.firewall} width={120} height={Math.max(0, over - TOP.firewall)} fill={COG} opacity={0.45 * hit} />
      <InlineFoot x={TOP.x} y={yI} s={FT} o={1 - sw} />
      <BoxerFoot x={TOP.x} y={yB} s={FT} o={sw} />
      <Chip x={860} y={900} text="lấn chỗ" c={COG} s={28} o={hit > 0 ? 1 - sw : 0} />
      <Check x={860} y={720} s={0.9} o={appear(f, M.swap53(at, d) + SLIDE, 8)} />
      <Chip x={200} y={1240} text="theo Subaru" c={C.steel} s={26} />
    </Zoom>
  );
};

const BoxerInCar = ({ o = 1, y = engY(FOOT.boxer.l) }) => <BoxerFoot x={TOP.x} y={y} s={FT} o={o} />;

const s54 = ({ f }) => (
  <g opacity={appear(f, 0, 10)}>
    <CarTop retro front />
    <BoxerInCar />
    <Chip x={200} y={660} text="1966" c="#c9b48a" s={34} />
    <Chip x={200} y={730} text="Subaru 1000" c="#c9b48a" s={30} />
    <Chip x={850} y={610} text="dẫn động cầu trước" c={GOLD} s={26} o={appear(f, 14, 8)} />
    <Chip x={200} y={1240} text="sơ đồ, theo Subaru" c={C.steel} s={24} />
  </g>
);

const s55 = ({ f }) => {
  const g = 0.6 + 0.4 * Math.sin(f / 5);
  return (
    <g>
      <CarTop retro front />
      <BoxerInCar />
      <rect x={TOP.x - TOP.w / 2 - 14} y={TOP.y0 - 14} width={TOP.w + 28} height={TOP.y1 - TOP.y0 + 28} rx={80} fill="none" stroke={GOLD} strokeWidth="6" opacity={g} />
      <Chip x={540} y={1000} text="nền móng cho" c={GOLD} s={28} o={appear(f, 8, 8)} />
      <Chip x={540} y={1060} text="hệ dẫn động bốn bánh về sau" c={GOLD} s={26} o={appear(f, 14, 8)} />
      <Chip x={200} y={660} text="1966" c="#c9b48a" s={34} />
      <Chip x={200} y={1240} text="theo Subaru" c={C.steel} s={26} />
    </g>
  );
};

const GEAR_Y = engY(FOOT.boxer.l) + (FOOT.boxer.l * FT) / 2;
const s56 = ({ f, at }) => {
  const k = appear(f, M.gear56(at), SLIDE);
  return (
    <g>
      <CarTop shaft={0.25 * k} />
      <BoxerInCar />
      <Gearbox y={lerp(GEAR_Y + 160, GEAR_Y, k)} o={k} c={GOLD} />
      <Chip x={200} y={660} text="xe đời sau" c={C.steel} s={30} />
      <Chip x={200} y={1240} text="theo Subaru" c={C.steel} s={26} />
    </g>
  );
};

// ---------- Cảnh 6: cái giá ----------
const s61 = ({ f }) => {
  const k = ease(prog(f, 4, 30));
  const half = 255 * k;
  return (
    <g>
      <Zoom cx={540} cy={1040} s={1.3}>
        <CarFront />
        <EngineInBay f={f} />
        <Bracket x1={540 - half} y1={1125} x2={540 + half} y2={1125} c={GOLD} o={k > 0.05 ? 1 : 0} />
        <rect x={260} y={960} width={560} height={175} rx={14} fill="none" stroke={GOLD} strokeWidth="4" opacity={k * (0.5 + 0.5 * Math.sin(f / 4))} />
      </Zoom>
    </g>
  );
};

const s62 = ({ f, at }) => {
  const k = appear(f, M.heads62(at), 8);
  return (
    <g>
      <BoxerEngine cx={560} cy={980} thetaDeg={th(f)} headGlow={k > 0.5} />
      <Big x={880} y={760} s={110} o={k}>
        ×2
      </Big>
      <Group x={160} y={720} s={0.26}>
        <InlineSide theta={th(f)} headGlow={k > 0.5} />
      </Group>
      <T x={160} y={790} s={22} c={INLINE} w={600}>
        thẳng hàng: 1
      </T>
    </g>
  );
};

const s63 = ({ f, at }) => {
  const t0 = M.wrench63(at);
  const swing = f < t0 ? 0 : Math.abs(Math.sin((f - t0) / 7)); // vướng thành khoang, không xoay đủ vòng
  const v = view(330, 1040, 2.2);
  return (
    <g>
      <Zoom cx={330} cy={1040} s={2.2}>
        <CarFront />
        <EngineInBay f={0} />
        <SparkPlug x={300} y={1040} r={-90} s={0.8} />
        <rect x={252} y={985} width={16} height={130} fill={COG} opacity={0.35 * swing} />
      </Zoom>
      <Wrench x={v(300, 1040)[0] - 10} y={v(300, 1040)[1] - 20} r={-60 + 25 * swing} o={appear(f, t0 - 4, 8)} />
      <Chip x={720} y={700} text="chật" c={COG} s={34} o={appear(f, t0 + 6, 8)} />
    </g>
  );
};

// ---------- Cảnh 7: kết ----------
const s71 = ({ f }) => {
  const a = 3 * Math.sin(f / 18) * Math.exp(-f / 90);
  const pv = [540, 820];
  const arm = 250;
  const L = [pv[0] - arm * Math.cos(rad(a)), pv[1] - arm * Math.sin(rad(a))];
  const Rr = [pv[0] + arm * Math.cos(rad(a)), pv[1] + arm * Math.sin(rad(a))];
  const pan = (x, y, items, c) => (
    <g>
      <line x1={x} y1={y} x2={x - 120} y2={y + 120} stroke={C.steel} strokeWidth="3" />
      <line x1={x} y1={y} x2={x + 120} y2={y + 120} stroke={C.steel} strokeWidth="3" />
      <path d={`M ${x - 140} ${y + 120} Q ${x} ${y + 170} ${x + 140} ${y + 120}`} fill="none" stroke={C.steel} strokeWidth="5" />
      {items.map((t, i) => (
        <Chip key={t} x={x} y={y + 205 + i * 62} text={t} c={c} s={28} o={appear(f, 6 + i * 6, 8)} />
      ))}
    </g>
  );
  return (
    <g>
      <line x1={540} y1={pv[1]} x2={540} y2={1300} stroke={C.steel} strokeWidth="8" />
      <path d="M 470 1300 L 610 1300" stroke={C.steel} strokeWidth="8" />
      <line x1={L[0]} y1={L[1]} x2={Rr[0]} y2={Rr[1]} stroke={C.steel} strokeWidth="8" strokeLinecap="round" />
      <circle cx={pv[0]} cy={pv[1]} r={12} fill={GOLD} />
      {pan(L[0], L[1], ['thấp', 'ngắn', 'ít rung'], '#2BB673')}
      {pan(Rr[0], Rr[1], ['rộng', 'phức tạp', 'khó sửa'], COG)}
    </g>
  );
};

const s72 = ({ f }) => {
  const k = ease(prog(f, M.join72(), M.join72() + JOIN));
  return (
    <Zoom cx={540} cy={940} s={1}>
      <CarTop />
      <Gearbox y={GEAR_Y} />
      <BoxerFoot x={TOP.x} y={lerp(TOP.y0 - 260, engY(FOOT.boxer.l), k)} s={FT} />
      <rect x={TOP.x - 135} y={TOP.y0 + 30} width={270} height={180} rx={20} fill="none" stroke={GOLD} strokeWidth="4" strokeDasharray="10 8" opacity={1 - k} />
    </Zoom>
  );
};

const s73 = ({ f }) => {
  const k = ease(prog(f, 4, 40));
  const x1 = lerp(220, 860, k);
  return (
    <g>
      <line x1={220} y1={1000} x2={x1} y2={1000} stroke={GOLD} strokeWidth="8" strokeLinecap="round" />
      <BoxerFoot x={220} y={860} s={0.32} />
      <BoxerFoot x={860} y={860} s={0.32} o={appear(f, 38, 8)} />
      <circle cx={220} cy={1000} r={14} fill={GOLD} />
      <circle cx={860} cy={1000} r={14} fill={GOLD} opacity={appear(f, 38, 8)} />
      <T x={220} y={1070} s={34} c="#c9b48a">
        1966
      </T>
      <T x={860} y={1070} s={34} c={C.white} o={appear(f, 38, 8)}>
        nay
      </T>
    </g>
  );
};

const s74 = ({ f, p, at }) => {
  const t0 = M.line74(at);
  const sh = appear(f, 4, 14);
  const ax = appear(f, 16, 12);
  const fade = 1 - ease(prog(p, 0.78, 1));
  return (
    <g>
      <CarTop shaft={sh * fade} front={ax * fade > 0.5} rear={ax * fade > 0.5} />
      <BoxerInCar />
      <Gearbox y={GEAR_Y} />
      <Chip x={540} y={1050} text="Audi quattro?" c={GOLD} s={32} o={appear(f, t0 + 6, 10)} />
      <Big x={860} y={1000} s={150} o={appear(f, t0, 10)}>
        ?
      </Big>
    </g>
  );
};

const s75 = ({ f }) => (
  <g>
    <Chip x={540} y={900} text="Tập sau: hệ dẫn động bốn bánh" c={GOLD} s={36} o={appear(f, 0, 8)} />
    <T x={540} y={1060} s={56} c={C.white} o={appear(f, M.name75(), 10)}>
      Hóa Ra Là Vậy
    </T>
  </g>
);

export const SHOTS = {
  1.1: s11, 1.2: s12, 1.3: s13,
  2.1: s21, 2.2: s22, 2.3: s23, 2.4: s24, 2.5: s25,
  3.1: s31, 3.2: s32, 3.3: s33, 3.4: s34, 3.5: s35, 3.6: s36, 3.7: s37, 3.8: s38,
  4.1: s41, 4.2: s42, 4.3: s43, 4.4: s44, 4.5: s45,
  5.1: s51, 5.2: s52, 5.3: s53, 5.4: s54, 5.5: s55, 5.6: s56,
  6.1: s61, 6.2: s62, 6.3: s63,
  7.1: s71, 7.2: s72, 7.3: s73, 7.4: s74, 7.5: s75,
};
