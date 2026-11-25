// Hình cho 8 cảnh của demo v3. Mỗi cảnh nhận shots (frame cục bộ). Vùng hình: y 560–1320.
// Từ y = 900 trở xuống không đặt chữ quá x = 940 (cột nút Reels/Shorts).
import { useCurrentFrame } from 'remotion';
import { BrakeDisc } from '../components/BrakeDisc';
import { C } from '../theme';
import { ease, prog } from '../timing';
import { Cylinder, Particles } from '../v003/scenes2';
import { Sedan, Suv } from '../v003/scenes4';
import { CarSide, carWheel, Chip, T } from '../v003/parts';
import { shotAt } from '../v003/timeline';
import { EngineBlock } from '../vertical/EngineBlock';
import { M } from '../vertical/layout';
import { Coin } from '../v003v3/coins';

const GOLD = '#FFD23F';
const fadeIn = (f, s, k = 8) => prog(f, s.a, s.a + k);
const useShots = (shots) => {
  const f = useCurrentFrame();
  return [f, ...shots.map((x) => shotAt(shots, x.id, f))];
};

// Lưới 10 xu: 2 hàng × 5; xu 0 và 1 là hai đồng "tới bánh xe"
const grid = (i) => ({ x: 540 + ((i % 5) - 2) * 150, y: 780 + Math.floor(i / 5) * 140 });

// Mặt đường chạy về phía sau (xe quay đầu sang trái)
const Road = ({ y, f, speed = 12 }) => <line x1={80} y1={y} x2={940} y2={y} stroke={C.white} strokeOpacity="0.3" strokeWidth="6" strokeDasharray="40 30" strokeDashoffset={-f * speed} />;

const Smoke = ({ x, y, f, o = 1 }) => (
  <g opacity={o}>
    {[0, 1, 2, 3].map((i) => {
      const p = (f * 0.025 + i / 4) % 1;
      return <circle key={i} cx={x + 90 * p} cy={y - 90 * p} r={10 + 24 * p} fill={C.steel} opacity={0.55 * (1 - p)} />;
    })}
  </g>
);

const HeatWaves = ({ x, y, f, h = 130, o = 1 }) => (
  <g opacity={o}>
    {[-36, 0, 36].map((dx, i) => (
      <path key={i} d={`M${x + dx} ${y} q 18 ${-h / 6} 0 ${-h / 3} t 0 ${-h / 3} t 0 ${-h / 3}`} fill="none" stroke={M.heat} strokeWidth="7" strokeLinecap="round" strokeDasharray="40 18" strokeDashoffset={f * 3 + i * 20} />
    ))}
  </g>
);

const JerryCan = () => (
  <g strokeLinejoin="round">
    {/* mặt bên, mặt trên, mặt trước */}
    <path d="M400 880 L478 838 L478 1196 L400 1240 Z" fill="#c92612" />
    <path d="M400 880 L478 838 L548 800 L720 800 Q752 802 756 836 L700 880 Z" fill="#ff6a45" />
    <path d="M478 862 Q478 838 502 838 L732 838 Q756 838 756 862 L756 1172 Q756 1196 732 1196 L478 1196 Z" fill="#f4391c" />
    <path d="M400 1240 L478 1196 L732 1196 L684 1232 Q670 1240 650 1240 Z" fill="#a81f0e" />
    {/* tay xách rỗng phía trên */}
    <path d="M568 838 L578 770 Q582 748 606 748 L706 748 Q730 748 734 772 L742 838 L704 838 L698 790 L612 790 L606 838 Z" fill="#f4391c" stroke="#c92612" strokeWidth="5" />
    {/* nắp và vòi rót màu đen */}
    <path d="M470 842 L452 806 L508 782 L526 818 Z" fill="#14161c" stroke="#3a3f4c" strokeWidth="4" />
    <path d="M492 802 L418 690" fill="none" stroke="#14161c" strokeWidth="40" strokeLinecap="round" />
    <path d="M482 800 L412 694" fill="none" stroke="#5a6070" strokeWidth="6" strokeLinecap="round" />
    <path d="M436 676 L404 650 L370 668 L376 690 L398 686 L408 708 Z" fill="#14161c" stroke="#5a6070" strokeWidth="4" />
    {/* khung dập nổi và chữ */}
    <rect x={506} y={888} width={222} height={276} rx={26} fill="none" stroke="#ff7a5c" strokeWidth="7" />
    <T x={617} y={985} s={66} c="#ffd9cf" w={800} ls={3}>
      XĂNG
    </T>
    <path d="M617 1030 q -44 52 -20 90 q 20 22 40 0 q 24 -38 -20 -90 z" fill="#ffd9cf" />
    {/* mặt bên có nhãn */}
    <path d="M412 960 L466 932 L466 1096 L412 1126 Z" fill="#e8ecf3" opacity="0.85" />
  </g>
);

export const S1 = ({ shots }) => {
  const [f, s1, s2, s3, s4] = useShots(shots);
  const split = ease(prog(f, s3.a, s3.a + 24));
  const wheelX = 800;
  return (
    <g>
      {s1.on && (
        <g>
          <JerryCan />
          {Array.from({ length: 10 }, (_, i) => {
            const a = s1.a + i * (s1.dur / 13);
            const p = prog(f, a, a + 16);
            if (p <= 0 || p >= 1) return null;
            return <Coin key={i} x={196 + 180 * p} y={760 - 92 * Math.sin((p * Math.PI) / 2)} r={34 - 16 * p} />;
          })}
        </g>
      )}
      {(s2.on || s4.on) && (
        <g opacity={fadeIn(f, s2.on ? s2 : s4)}>
          {Array.from({ length: 10 }, (_, i) => (
            <Coin key={i} {...grid(i)} r={52} state={s4.on && i < 2 ? 'dim' : 'on'} />
          ))}
          <T x={540} y={1180} s={160} c={C.line} w={800} o={0.65 + 0.35 * Math.sin(f / 5)}>
            ?
          </T>
        </g>
      )}
      {/* 1.3: hai đồng đi tới bánh xe, tám đồng tách khỏi dòng */}
      {s3.on && (
        <g>
          <line x1={150} y1={760} x2={wheelX - 80} y2={760} stroke={GOLD} strokeOpacity="0.35" strokeWidth="14" strokeLinecap="round" />
          <circle cx={wheelX} cy={760} r={80} fill={C.navy} stroke={C.line} strokeWidth="10" />
          <g transform={`translate(${wheelX},760) rotate(${f * 6})`}>
            {[0, 72, 144, 216, 288].map((a) => (
              <line key={a} x1={0} y1={0} x2={0} y2={-62} stroke={C.line} strokeWidth="7" transform={`rotate(${a})`} />
            ))}
          </g>
          <T x={wheelX} y={900} s={32} c={C.line}>
            bánh xe
          </T>
          {Array.from({ length: 10 }, (_, i) => {
            const g = grid(i);
            const to = i < 2 ? { x: 430 + i * 130, y: 760 } : { x: 250 + ((i - 2) % 4) * 150, y: 1050 + Math.floor((i - 2) / 4) * 120 };
            return <Coin key={i} x={g.x + (to.x - g.x) * split} y={g.y + (to.y - g.y) * split} r={50} state={i < 2 ? 'glow' : split > 0.6 ? 'dim' : 'on'} />;
          })}
          <T x={540} y={1280} s={32} c={C.dim} w={500} o={split}>
            khoảng tám đồng không tới được bánh xe
          </T>
        </g>
      )}
    </g>
  );
};

export const S2 = ({ shots }) => {
  const [f, s1, s2, s3, s4, s5, s6] = useShots(shots);
  const theta = s2.on ? 180 * ease(prog(f, s2.a + s2.dur * 0.25, s2.b - 8)) : 180 + Math.max(0, f - s3.a) * 4;
  const gas = s2.on ? 1 - 0.45 * s2.p : 0.45;
  const cyl = f >= s2.a && f < s6.a;
  return (
    <g>
      {s1.on && (
        <g opacity={fadeIn(f, s1)}>
          <EngineBlock cx={510} cy={940} heat={ease(s1.p)} shimmer={s1.p} t={f} />
        </g>
      )}
      {cyl && (
        <g opacity={fadeIn(f, s2)}>
          <Cylinder theta={theta} gas={gas} exhaustLift={s4.after ? Math.min(1, (f - s4.a) / 10) : 0} jacket={s5.after ? ease(prog(f, s5.a, s5.a + 30)) : 0} f={f} />
          {s2.on && (
            <g opacity={prog(f, s2.a + s2.dur * 0.3, s2.a + s2.dur * 0.45)}>
              <path d={`M540 730 l0 ${60 + 100 * s2.p}`} stroke={C.white} strokeWidth="14" strokeLinecap="round" />
              <path d={`M510 ${780 + 100 * s2.p} L540 ${822 + 100 * s2.p} L570 ${780 + 100 * s2.p}`} fill="none" stroke={C.white} strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
              <Chip x={200} y={900} text="khí nóng" c={M.heat} />
              <Chip x={200} y={980} text="pít-tông" c={C.white} />
            </g>
          )}
          <Particles f={f} n={22} o={s3.after && !s5.after ? 1 : 0} r={11} path={(p, i) => [540 + (i % 2 ? 1 : -1) * (80 + 220 * p), 730 + ((i * 37) % 170) - 30 * p]} />
          {s4.after && (
            <g>
              <Particles f={f} n={14} speed={0.03} r={13} o={1} path={(p) => (p < 0.35 ? [610 + 140 * (p / 0.35), 640 - 60 * (p / 0.35)] : [750 + 260 * ((p - 0.35) / 0.65), 580])} />
              <Chip x={860} y={660} text="khí xả" c={M.heat} o={fadeIn(f, s4)} />
            </g>
          )}
          {s5.after && (
            <g opacity={fadeIn(f, s5, 12)}>
              <path d="M358 900 L250 900 L250 1080" fill="none" stroke="#ff7a2a" strokeWidth="18" />
              <path d="M250 900 L358 900 M250 900 L250 1080" fill="none" stroke={C.white} strokeWidth="6" strokeDasharray="14 26" strokeDashoffset={f * 4} />
              <rect x={130} y={1080} width={240} height={150} rx={12} fill="#101c33" stroke={M.heat} strokeWidth="5" />
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <line key={i} x1={150 + i * 40} y1={1092} x2={150 + i * 40} y2={1218} stroke={M.heat} strokeWidth="4" />
              ))}
              <g transform={`translate(250,1155) rotate(${f * 18})`}>
                {[0, 120, 240].map((a) => (
                  <ellipse key={a} cx={0} cy={-28} rx={12} ry={28} fill="#ff7a2a" opacity="0.7" transform={`rotate(${a})`} />
                ))}
              </g>
              <T x={250} y={1280} s={32} c={M.heat}>
                két nước
              </T>
              <T x={250} y={640} s={32} c="#ff9a4a">
                nước làm mát
              </T>
            </g>
          )}
        </g>
      )}
      {s6.after && (
        <g opacity={fadeIn(f, s6, 10)}>
          <CarSide cx={540} cy={1000} w={800} wheelRot={-f * 6} />
          <Road y={1126} f={f} />
          <HeatWaves x={220} y={900} f={f} />
          <HeatWaves x={880} y={1010} f={f} h={110} />
          <T x={250} y={1220} s={36} c={M.heat}>
            két nước
          </T>
          <T x={820} y={1220} s={36} c={M.heat}>
            ống xả
          </T>
        </g>
      )}
    </g>
  );
};

export const S3 = ({ shots }) => {
  const [f, s1, s2, s3, sx, s4] = useShots(shots);
  return (
    <g>
      {s1.on && (
        <g opacity={fadeIn(f, s1)}>
          <EngineBlock cx={510} cy={940} heat={0.5} t={f} />
          {[
            [265, 905],
            [415, 1002],
            [565, 905],
            [715, 1002],
          ].map(([x, y], i) => (
            <g key={i} opacity={0.5 + 0.5 * Math.sin(f / 3 + i * 1.7)}>
              <circle cx={x} cy={y} r={34} fill="none" stroke={GOLD} strokeWidth="6" />
              <path d={`M${x - 16} ${y - 16} L${x + 4} ${y} L${x - 6} ${y + 2} L${x + 16} ${y + 18}`} fill="none" stroke={GOLD} strokeWidth="6" />
            </g>
          ))}
          <Chip x={540} y={1270} text="ma sát" c={GOLD} s={36} />
        </g>
      )}
      {s2.on && (
        <g opacity={fadeIn(f, s2)}>
          <Cylinder theta={f * 5} gas={0.1} exhaustLift={0.5 + 0.5 * Math.sin(f / 5)} f={f} />
          <Particles f={f} n={10} speed={0.028} color={C.line} r={12} o={1} path={(p) => (p < 0.6 ? [100 + 220 * (p / 0.6), 580] : [320 + 150 * ((p - 0.6) / 0.4), 580 + 80 * ((p - 0.6) / 0.4)])} />
          <Particles f={f} n={10} speed={0.028} color={C.steel} r={12} o={1} path={(p) => (p < 0.35 ? [610 + 140 * (p / 0.35), 640 - 60 * (p / 0.35)] : [750 + 260 * ((p - 0.35) / 0.65), 580])} />
          <Chip x={210} y={680} text="hút không khí" c={C.line} />
          <Chip x={850} y={680} text="đẩy khí thải" c={C.steel} />
        </g>
      )}
      {sx.on && (
        <g opacity={fadeIn(f, sx)}>
          <g transform={`translate(250,760) rotate(${f * 6})`}>
            {[0, 90, 180, 270].map((a) => (
              <ellipse key={a} cx={0} cy={-58} rx={24} ry={58} fill="#FFB000" opacity="0.85" transform={`rotate(${a})`} />
            ))}
          </g>
          <T x={250} y={910} s={42} c="#FFB000">
            điều hòa
          </T>
          <circle cx={780} cy={760} r={112} fill="#101c33" stroke="#FFB000" strokeWidth="9" />
          <path d="M710 760 q 35 -70 70 0 t 70 0" fill="none" stroke="#FFB000" strokeWidth="10" strokeDasharray="30 12" strokeDashoffset={-f * 4} />
          <T x={780} y={910} s={42} c="#FFB000">
            máy phát
          </T>
          {[
            { x: 440, r: 90, k: 3 },
            { x: 626, r: 66, k: -4.1 },
          ].map((g) => (
            <g key={g.x} transform={`translate(${g.x},1090) rotate(${f * g.k})`}>
              {Array.from({ length: 10 }, (_, i) => (
                <rect key={i} x={-12} y={-g.r - 20} width={24} height={30} fill={C.steel} transform={`rotate(${i * 36})`} />
              ))}
              <circle r={g.r} fill="#101c33" stroke={C.steel} strokeWidth="9" />
              <circle r={g.r * 0.28} fill={C.steel} />
            </g>
          ))}
          <T x={540} y={1260} s={42} c={C.steel}>
            hộp số
          </T>
        </g>
      )}
      {s4.on && (
        <g opacity={fadeIn(f, s4)}>
          <CarSide cx={540} cy={1060} w={640} />
          <line x1={80} y1={1160} x2={940} y2={1160} stroke={C.white} strokeOpacity="0.3" strokeWidth="6" />
          {Array.from({ length: 10 }, (_, i) => {
            const g = { x: 540 + ((i % 5) - 2) * 140, y: 660 + Math.floor(i / 5) * 130 };
            const go = i < 2 ? ease(prog(f, s4.a + s4.dur * 0.45, s4.a + s4.dur * 0.75)) : 0;
            const wh = carWheel(540, 1060, 640, i % 2);
            return <Coin key={i} x={g.x + (wh.x - g.x) * go} y={g.y + (wh.y - g.y) * go} r={48 - 14 * go} state={i < 2 ? 'glow' : i < 8 ? 'heat' : 'dim'} />;
          })}
          <T x={540} y={1260} s={36} c={GOLD}>
            trung bình: khoảng 2 / 10
          </T>
        </g>
      )}
      {s3.on && (
        <g opacity={fadeIn(f, s3)}>
          {/* đèn đỏ */}
          <rect x={100} y={600} width={110} height={270} rx={24} fill="#101c33" stroke={C.white} strokeWidth="4" />
          <circle cx={155} cy={655} r={36} fill="#ff2a2a" />
          <circle cx={155} cy={735} r={36} fill="#3a2a0a" />
          <circle cx={155} cy={815} r={36} fill="#0a3a1a" />
          <line x1={155} y1={870} x2={155} y2={1126} stroke={C.white} strokeOpacity="0.5" strokeWidth="10" />
          <g transform={`translate(${Math.sin(f * 2.2) * 2},0)`}>
            <CarSide cx={560} cy={1000} w={700} />
          </g>
          <line x1={80} y1={1112} x2={940} y2={1112} stroke={C.white} strokeOpacity="0.3" strokeWidth="6" />
          <EngineBlock cx={540} cy={680} s={0.42} heat={0.4} t={f} label={false} />
          <Smoke x={895} y={1050} f={f} />
          <Chip x={540} y={1200} text="xe đứng yên · máy vẫn nổ" c={M.heat} s={32} />
          <T x={540} y={1280} s={30} c={C.dim} w={500}>
            xăng vẫn đang tiêu hao
          </T>
        </g>
      )}
    </g>
  );
};

export const S4 = ({ shots }) => {
  const [f, s1, s2, s3, s4] = useShots(shots);
  const car = { cx: 540, cy: 1000, w: 740 };
  const w = carWheel(car.cx, car.cy, car.w, 1);
  // 4.4: xe chạy – dừng lặp lại
  const cyc = 48;
  const local = Math.max(0, f - s4.a);
  const k = local % cyc;
  const moving = k < 26;
  const dist = Math.floor(local / cyc) * 26 + Math.min(k, 26);
  return (
    <g>
      {(s1.on || s2.on) && (
        <g>
          <CarSide {...car} wheelRot={-f * 7} />
          <Road y={1120} f={f} />
        </g>
      )}
      {s1.on &&
        [0, 1].map((i) => {
          const p = ease(prog(f, s1.a + i * 8, s1.a + 30 + i * 8));
          const x0 = 420 + i * 240;
          const x = x0 + (carWheel(car.cx, car.cy, car.w, i).x - x0) * p;
          const y = 680 + (w.y - 680) * p;
          return <Coin key={i} x={x} y={y} r={46 - 14 * p} state="glow" />;
        })}
      {s2.on && (
        <g opacity={fadeIn(f, s2)}>
          {[0, 1, 2, 3, 4].map((i) => (
            <path key={i} d={`M60 ${800 + i * 36} C 200 ${790 + i * 30}, 300 ${660 + i * 34}, 560 ${660 + i * 34} S 850 ${760 + i * 36}, 1030 ${780 + i * 36}`} fill="none" stroke={C.line} strokeOpacity="0.75" strokeWidth="5" strokeDasharray="46 30" strokeDashoffset={-f * 12 - i * 17} />
          ))}
          <Chip x={240} y={640} text="sức cản của gió" c={C.line} s={32} />
          {[0, 1].map((i) => {
            const wh = carWheel(car.cx, car.cy, car.w, i);
            return <ellipse key={i} cx={wh.x} cy={wh.y + wh.r + 4} rx={wh.r} ry={11} fill={M.heat} opacity={0.55 + 0.3 * Math.sin(f / 4)} />;
          })}
          <Chip x={540} y={1220} text="lực cản lăn của lốp" c={M.heat} s={32} />
        </g>
      )}
      {s3.on && (
        <g opacity={fadeIn(f, s3)}>
          <BrakeDisc cx={540} cy={920} R={260} heat={0.85 * ease(prog(f, s3.a + 6, s3.b - 12))} rot={-360 * ease(s3.p)} />
          <Chip x={540} y={1260} text="chuyển động → nhiệt ở phanh" c={M.heat} s={32} />
        </g>
      )}
      {s4.on && (
        <g opacity={fadeIn(f, s4)}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={i} x={90 + i * 145} y={700 - (i % 3) * 50} width={115} height={190 + (i % 3) * 50} fill="#101c33" stroke={C.line} strokeOpacity="0.35" strokeWidth="3" />
          ))}
          <CarSide cx={540} cy={1040} w={480} wheelRot={-dist * 7} />
          <Road y={1122} f={dist} />
          <circle cx={150} cy={980} r={30} fill={moving ? '#2BB673' : '#ff2a2a'} />
          <T x={540} y={1220} s={36} c={moving ? C.dim : M.heat}>
            {moving ? 'chạy…' : 'dừng · phanh'}
          </T>
        </g>
      )}
    </g>
  );
};

const NODE_Y = [650, 820, 990, 1160];
const NODE = ['pin', 'bộ điều khiển', 'mô-tơ', 'bánh xe'];
const Spinner = ({ x, y, deg, c = M.ev }) => (
  <g transform={`translate(${x},${y})`}>
    <circle r={58} fill="#08182A" stroke={c} strokeWidth="7" />
    <g transform={`rotate(${deg})`}>
      {[0, 72, 144, 216, 288].map((a) => (
        <line key={a} x1={0} y1={0} x2={0} y2={-46} stroke={c} strokeWidth="7" transform={`rotate(${a})`} />
      ))}
    </g>
  </g>
);

export const S5 = ({ shots }) => {
  const [f, s1, s2, s3, s4, s5] = useShots(shots);
  const regen = s5.after;
  // một chiều quay duy nhất; khi phanh chỉ quay chậm lại
  const deg = regen ? s5.a * 6 + (f - s5.a) * 3 : f * 6;
  const flow = s2.on || s3.on || s5.on;
  return (
    <g>
      {s1.on && (
        <g opacity={fadeIn(f, s1)}>
          <CarSide cx={540} cy={1040} w={760} stroke={M.ev} wheelRot={-f * 6} />
          <rect x={360} y={1042} width={360} height={46} rx={10} fill={M.ev} opacity="0.7" />
          <path d="M480 840 q -70 -80 0 -200 q 20 70 60 70 q 40 -60 0 -130 q 110 90 60 260 z" fill="none" stroke={M.heat} strokeWidth="9" />
          <line x1={420} y1={870} x2={680} y2={600} stroke={C.white} strokeWidth="14" strokeLinecap="round" />
          <T x={540} y={1240} s={36} c={M.ev}>
            pin dưới sàn xe
          </T>
        </g>
      )}
      {flow && (
        <g opacity={fadeIn(f, s2)}>
          <line x1={400} y1={NODE_Y[0]} x2={400} y2={NODE_Y[3]} stroke={M.ev} strokeOpacity="0.3" strokeWidth="18" />
          {Array.from({ length: 9 }, (_, i) => {
            const p = (f * 0.022 + i / 9) % 1;
            const y = regen ? NODE_Y[3] - (NODE_Y[3] - NODE_Y[0]) * p : NODE_Y[0] + (NODE_Y[3] - NODE_Y[0]) * p;
            return <circle key={i} cx={400} cy={y} r={15} fill={regen ? '#2BB673' : M.ev} />;
          })}
          {NODE.map((n, i) => (
            <g key={n}>
              <rect x={220} y={NODE_Y[i] - 46} width={360} height={92} rx={22} fill="#08182A" fillOpacity="0.92" stroke={M.ev} strokeWidth="5" />
              <T x={400} y={NODE_Y[i] + 13} s={38}>
                {n}
              </T>
            </g>
          ))}
          <Spinner x={700} y={NODE_Y[2]} deg={deg} />
          <Spinner x={700} y={NODE_Y[3]} deg={deg} c={C.white} />
          {s3.on &&
            [0, 1, 2].map((i) => {
              const p = (f * 0.03 + i * 0.33) % 1;
              const y = (NODE_Y[i] + NODE_Y[i + 1]) / 2;
              return <circle key={i} cx={425 + 220 * p} cy={y + 20 * p} r={11} fill={C.steel} opacity={1 - p} />;
            })}
          {s3.on && (
            <T x={780} y={750} s={32} c={C.steel}>
              hao hụt
            </T>
          )}
          {regen && (
            <g opacity={fadeIn(f, s5)}>
              <T x={790} y={700} s={34} c="#2BB673">
                phanh:
              </T>
              <T x={790} y={745} s={34} c="#2BB673">
                điện về pin
              </T>
              <T x={780} y={1260} s={28} c={C.white}>
                vẫn quay cùng chiều
              </T>
            </g>
          )}
        </g>
      )}
      {s4.on && (
        <g opacity={fadeIn(f, s4)}>
          {[
            { x: 330, v: 0.2, c: M.heat, n: 'xe xăng' },
            { x: 730, v: 0.68, c: M.ev, n: 'xe điện' },
          ].map((b) => (
            <g key={b.n}>
              <rect x={b.x - 110} y={660} width={220} height={480} rx={18} fill="none" stroke={C.white} strokeOpacity="0.25" strokeWidth="4" />
              <rect x={b.x - 102} y={1132 - 464 * b.v * ease(prog(f, s4.a + 6, s4.a + 36))} width={204} height={464 * b.v * ease(prog(f, s4.a + 6, s4.a + 36))} rx={12} fill={b.c} />
              <T x={b.x} y={1200} s={40} c={b.c}>
                {b.n}
              </T>
            </g>
          ))}
          <T x={540} y={620} s={34}>
            phần năng lượng tới bánh xe
          </T>
          <T x={540} y={1270} s={26} c={C.dim} w={500}>
            hình minh họa, không theo tỉ lệ
          </T>
        </g>
      )}
    </g>
  );
};

const CostDial = ({ x, y, v, c, label, p }) => {
  const a = Math.PI * (1 + v * p);
  return (
    <g>
      <path d={`M${x - 150} ${y} A150 150 0 0 1 ${x + 150} ${y}`} fill="none" stroke={C.white} strokeOpacity="0.2" strokeWidth="26" />
      <line opacity={Math.min(1, p * 5)} x1={x} y1={y} x2={x + 118 * Math.cos(a)} y2={y + 118 * Math.sin(a)} stroke={c} strokeWidth="12" strokeLinecap="round" />
      <circle cx={x} cy={y} r={18} fill={c} />
      <T x={x - 150} y={y + 48} s={26} c={C.dim} w={500}>
        thấp
      </T>
      <T x={x + 150} y={y + 48} s={26} c={C.dim} w={500}>
        cao
      </T>
      <T x={x} y={y + 52} s={32} c={c} w={800}>
        {label}
      </T>
    </g>
  );
};

export const S6 = ({ shots }) => {
  const [f, s1, s2, s3] = useShots(shots);
  const run = ease(prog(f, s1.a + 6, s1.a + s1.dur * 0.7));
  const dial = ease(prog(f, s1.a + s1.dur * 0.45, s1.b - 6));
  const wob = s2.after ? 0.07 * Math.sin((f - s2.a) / 9) : 0;
  return (
    <g>
      {!s3.after && (
        <g opacity={fadeIn(f, s1)}>
          {[
            { y: 640, Car: Sedan, c: M.heat },
            { y: 760, Car: Suv, c: M.ev },
          ].map(({ y, Car, c }) => (
            <g key={c}>
              <line x1={130} y1={y + 40} x2={950} y2={y + 40} stroke={C.white} strokeOpacity="0.3" strokeWidth="5" strokeDasharray="24 18" />
              <g transform={`translate(${220 + 620 * run},${y}) scale(-1,1)`}>
                <Car x={0} y={0} c={c} />
              </g>
            </g>
          ))}
          <T x={540} y={850} s={30} c={C.dim} w={500}>
            cùng một quãng đường
          </T>
          <T x={540} y={920} s={30}>
            chi phí năng lượng
          </T>
          <CostDial x={300} y={1110} v={0.72 + wob} c={M.heat} label="xe xăng" p={dial} />
          <CostDial x={750} y={1110} v={0.4 - wob} c={M.ev} label="xe điện" p={dial} />
          {s2.after && <Chip x={520} y={1250} text="tùy mức tiêu thụ và nơi nạp năng lượng" c={GOLD} s={30} o={fadeIn(f, s2)} />}
          <T x={540} y={1310} s={24} c={C.dim} w={500}>
            minh họa xu hướng thường gặp, không phải số đo
          </T>
        </g>
      )}
      {s3.after && (
        <g>
          {['giá xăng', 'giá sạc', 'cách tính điện tại nhà'].map((n, i) => {
            const o = prog(f, s3.a + i * 16, s3.a + 10 + i * 16);
            const dy = 10 * Math.sin(f / 7 + i * 2);
            return (
              <g key={n} opacity={o}>
                <rect x={140} y={660 + i * 180} width={800} height={140} rx={24} fill="rgba(5,9,18,0.8)" stroke={GOLD} strokeWidth="4" />
                <T x={190} y={745 + i * 180} s={42} a="start">
                  {n}
                </T>
                <path d={`M850 ${700 + i * 180 + dy} l22 -26 l22 26 M850 ${760 + i * 180 - dy} l22 26 l22 -26`} fill="none" stroke={GOLD} strokeWidth="9" strokeLinecap="round" />
              </g>
            );
          })}
          <T x={540} y={1260} s={34} c={C.dim} w={500}>
            đều có thể thay đổi
          </T>
        </g>
      )}
    </g>
  );
};

const Plant = ({ f, heat = 0 }) => (
  <g>
    <rect x={560} y={960} width={370} height={200} fill="#101c33" stroke={C.steel} strokeWidth="5" />
    <rect x={600} y={740} width={60} height={220} fill="#101c33" stroke={C.steel} strokeWidth="5" />
    <path d="M730 960 Q765 840 735 730 L885 730 Q855 840 890 960 Z" fill="#101c33" stroke={C.steel} strokeWidth="5" />
    {[0, 1, 2].map((i) => {
      const p = (f * 0.025 + i / 3) % 1;
      return (
        <g key={i}>
          <circle cx={630 + 12 * Math.sin(f / 6 + i)} cy={720 - 110 * p} r={18 + 28 * p} fill={C.steel} opacity={0.5 * (1 - p)} />
          <circle cx={810 + 14 * Math.sin(f / 7 + i)} cy={705 - 100 * p} r={30 + 34 * p} fill={heat > 0.5 ? M.heat : C.steel} opacity={0.45 * (1 - p)} />
        </g>
      );
    })}
    <T x={745} y={1220} s={30} c={C.dim} w={500}>
      nhà máy nhiệt điện
    </T>
  </g>
);

export const S7 = ({ shots }) => {
  const [f, s1, s2, s3, s4] = useShots(shots);
  const cable = ease(prog(f, s1.a + 4, s1.a + s1.dur * 0.7));
  const bar = ease(prog(f, s2.a + 12, s2.a + 48));
  return (
    <g>
      {s1.on && (
        <g opacity={fadeIn(f, s1)}>
          <CarSide cx={290} cy={1100} w={400} stroke={M.ev} />
          <Plant f={f} />
          <path d="M290 1160 C 290 1280, 500 1280, 560 1100" fill="none" stroke={M.ev} strokeWidth="12" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - cable} />
          <T x={300} y={760} s={150} c={GOLD} w={800}>
            ?
          </T>
        </g>
      )}
      {s2.on && (
        <g opacity={fadeIn(f, s2)}>
          <T x={540} y={680} s={34}>
            Điện ở Việt Nam, năm 2025
          </T>
          <T x={540} y={750} s={44} c={C.white} w={600}>
            khoảng
          </T>
          <T x={540} y={900} s={150} c={C.white} w={800}>
            45%
          </T>
          <T x={540} y={950} s={40} c={C.steel}>
            đến từ than · số liệu EVN
          </T>
          <defs>
            <pattern id="coalStripe" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="14" stroke="#9AA6B8" strokeWidth="10" />
            </pattern>
          </defs>
          <rect x={140} y={1030} width={800} height={100} rx={16} fill="none" stroke={C.white} strokeOpacity="0.35" strokeWidth="4" />
          <rect x={140} y={1030} width={800 * 0.45 * bar} height={100} fill="#7a7f8c" />
          <line x1={540} y1={1010} x2={540} y2={1150} stroke={GOLD} strokeWidth="5" strokeDasharray="10 8" />
          <T x={540} y={1190} s={28} c={GOLD}>
            một nửa
          </T>
          <T x={320} y={1255} s={30} c={C.steel}>
            than
          </T>
          <T x={760} y={1255} s={30} c={C.dim}>
            các nguồn khác
          </T>
        </g>
      )}
      {s3.on && (
        <g opacity={fadeIn(f, s3)}>
          <g transform="translate(-205,0)">
            <Plant f={f} heat={1} />
          </g>
          <HeatWaves x={830} y={1100} f={f} h={300} />
          <T x={830} y={1180} s={34} c={M.heat}>
            nhiệt thải
          </T>
        </g>
      )}
      {s4.on && (
        <g opacity={fadeIn(f, s4)}>
          <CarSide cx={310} cy={800} w={380} stroke={M.ev} />
          <CarSide cx={770} cy={800} w={380} stroke={M.heat} />
          <T x={310} y={940} s={32} c={M.ev}>
            xe điện
          </T>
          <T x={770} y={940} s={32} c={M.heat}>
            xe xăng
          </T>
          <T x={540} y={1140} s={190} c={GOLD} w={800}>
            ?
          </T>
          <Chip x={540} y={1250} text="Câu chuyện của một tập khác" c={GOLD} s={36} o={prog(f, s4.a + s4.dur * 0.5, s4.a + s4.dur * 0.5 + 10)} />
        </g>
      )}
    </g>
  );
};

export const S8 = ({ shots }) => {
  const [f, s1, s2, s3] = useShots(shots);
  const go = ease(prog(f, s2.a + 8, s2.a + 40));
  const car = { cx: 540, cy: 1130, w: 620 };
  const w = carWheel(car.cx, car.cy, car.w, 1);
  return (
    <g>
      <CarSide {...car} wheelRot={-f * 6} />
      <Road y={1226} f={f} />
      {Array.from({ length: 10 }, (_, i) => {
        const g = { x: 540 + ((i % 5) - 2) * 140, y: 710 + Math.floor(i / 5) * 120 };
        if (i < 2) {
          const to = { x: carWheel(car.cx, car.cy, car.w, i).x, y: w.y };
          return <Coin key={i} x={g.x + (to.x - g.x) * go} y={g.y + (to.y - g.y) * go} r={46 - 12 * go} state={s2.after ? 'glow' : 'on'} />;
        }
        const h = s3.after && i < 8 ? ease(prog(f, s3.a + i * 3, s3.a + 40 + i * 3)) : 0;
        return (
          <g key={i}>
            <Coin x={g.x} y={g.y} r={46} state={h > 0 ? 'heat' : s2.after ? 'dim' : 'on'} />
            {h > 0 && i < 5 && <HeatWaves x={g.x} y={660} f={f + i * 9} h={96} o={h} />}
          </g>
        );
      })}
      {s1.on && (
        <T x={540} y={950} s={34} c={C.dim} w={500} o={fadeIn(f, s1)}>
          hãy nhớ
        </T>
      )}
      {s2.after && (
        <T x={540} y={1300} s={36} c={GOLD} o={go}>
          khoảng 2 đồng tới bánh xe
        </T>
      )}
    </g>
  );
};
