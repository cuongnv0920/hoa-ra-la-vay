// Cảnh 4–5: mặt cắt một xi lanh (nhiệt đi đâu) và hiệu suất 40% vs 20%.
import { interpolateColors, useCurrentFrame } from 'remotion';
import { C } from '../theme';
import { ease, prog } from '../timing';
import { M } from '../vertical/layout';
import { CarSide, Chip, Gauge, Heater, T } from './parts';
import { shotAt } from './timeline';

const rad = (d) => (d * Math.PI) / 180;

// Mặt cắt 1 xi lanh, toạ độ tuyệt đối. theta: góc trục khuỷu (0 = điểm chết trên).
// Hình học: lòng xi lanh x 420–660; nắp máy 620–700; tâm trục khuỷu y = 1180; R = 70; L = 230.
const CX = 540;
const BORE = 240;
const HEAD_B = 700;
const YC = 1180;
const R = 70;
const L = 230;
const pinY = (th) => YC - (R * Math.cos(th) + Math.sqrt(L * L - R * R * Math.sin(th) ** 2));

export const Cylinder = ({ theta, gas = 0, exhaustLift = 0, jacket = 0, sparks = 0, throttle = 0, f }) => {
  const th = rad(theta);
  const py = pinY(th);
  const top = py - 60;
  const crx = CX + R * Math.sin(th);
  const cry = YC - R * Math.cos(th);
  const jc = interpolateColors(jacket, [0, 1], ['#0d3a5c', '#ff7a2a']);
  const xl = CX - BORE / 2;
  const xr = CX + BORE / 2;
  return (
    <g>
      {/* áo nước hai bên */}
      <rect x={xl - 62} y={HEAD_B - 60} width={34} height={380} rx={8} fill={jc} opacity="0.9" />
      <rect x={xr + 28} y={HEAD_B - 60} width={34} height={380} rx={8} fill={jc} opacity="0.9" />
      {/* thành xi lanh */}
      <rect x={xl - 28} y={HEAD_B} width={28} height={330} fill="#1a2944" stroke={C.line} strokeWidth="3" />
      <rect x={xr} y={HEAD_B} width={28} height={330} fill="#1a2944" stroke={C.line} strokeWidth="3" />
      {/* nắp máy */}
      <path d={`M${xl - 70} ${HEAD_B - 80} L${xr + 70} ${HEAD_B - 80} L${xr + 70} ${HEAD_B} L${xl - 70} ${HEAD_B} Z`} fill="#1a2944" stroke={C.line} strokeWidth="4" />
      {/* khí cháy */}
      <rect x={xl} y={HEAD_B} width={BORE} height={Math.max(0, top - HEAD_B)} fill="#ff7a2a" opacity={0.15 + 0.75 * gas} />
      {/* bugi */}
      <rect x={CX - 12} y={HEAD_B - 140} width={24} height={110} rx={5} fill={C.steel} />
      {gas > 0.7 && <circle cx={CX} cy={HEAD_B - 18} r={16} fill="#FFD23F" opacity={gas} />}
      {/* xu-páp nạp (trái) */}
      <line x1={xl + 50} y1={HEAD_B - 120} x2={xl + 50} y2={HEAD_B - 8} stroke={C.steel} strokeWidth="10" />
      <rect x={xl + 18} y={HEAD_B - 12} width={64} height={10} rx={4} fill={C.steel} />
      {/* xu-páp xả (phải) */}
      <line x1={xr - 50} y1={HEAD_B - 120 + 30 * exhaustLift} x2={xr - 50} y2={HEAD_B - 8 + 30 * exhaustLift} stroke={C.steel} strokeWidth="10" />
      <rect x={xr - 82} y={HEAD_B - 12 + 30 * exhaustLift} width={64} height={10} rx={4} fill={C.steel} />
      {/* cổ hút (trái) + bướm ga */}
      <path d={`M${xl + 50} ${HEAD_B - 60} L${xl - 120} ${HEAD_B - 120} L${xl - 220} ${HEAD_B - 120}`} fill="none" stroke={C.line} strokeWidth="34" strokeOpacity="0.35" strokeLinejoin="round" />
      {throttle > 0 && (
        <g transform={`translate(${xl - 170}, ${HEAD_B - 120}) rotate(${-60 * throttle})`}>
          <line x1={0} y1={-22} x2={0} y2={22} stroke={C.white} strokeWidth="8" strokeLinecap="round" />
        </g>
      )}
      {/* cổ xả (phải) → ống xả */}
      <path d={`M${xr - 50} ${HEAD_B - 60} L${xr + 110} ${HEAD_B - 120} L${xr + 330} ${HEAD_B - 120}`} fill="none" stroke={C.line} strokeWidth="34" strokeOpacity="0.35" strokeLinejoin="round" />
      {/* thanh truyền, piston, tay quay */}
      <circle cx={CX} cy={YC} r={R + 26} fill="none" stroke={C.steelDark} strokeWidth="4" strokeDasharray="10 8" />
      <line x1={CX} y1={YC} x2={crx} y2={cry} stroke={C.steelDark} strokeWidth="26" strokeLinecap="round" />
      <line x1={CX} y1={py} x2={crx} y2={cry} stroke={C.steel} strokeWidth="22" strokeLinecap="round" />
      <rect x={xl + 6} y={top} width={BORE - 12} height={110} rx={10} fill="#c3cbd8" stroke={C.white} strokeWidth="3" />
      {[18, 32, 46].map((d) => (
        <line key={d} x1={xl + 6} y1={top + d} x2={xr - 6} y2={top + d} stroke={C.steelDark} strokeWidth="4" />
      ))}
      <circle cx={CX} cy={py} r={14} fill={C.steelDark} />
      <circle cx={CX} cy={YC} r={20} fill={C.steel} />
      {sparks > 0 &&
        [0, 1, 2, 3].map((i) => {
          const side = i % 2 ? 1 : -1;
          const yy = top + 20 + ((f * 7 + i * 23) % 40);
          return <line key={i} x1={CX + side * (BORE / 2 - 4)} y1={yy} x2={CX + side * (BORE / 2 + 22)} y2={yy - 14} stroke="#FFD23F" strokeWidth="5" opacity={sparks} />;
        })}
    </g>
  );
};

export const Particles = ({ f, n, path, o, color = C.heat, speed = 0.02, r = 9 }) => (
  <g opacity={o}>
    {Array.from({ length: n }, (_, i) => {
      const p = (f * speed + i / n) % 1;
      const [x, y] = path(p, i);
      return <circle key={i} cx={x} cy={y} r={r * (1 - 0.4 * p)} fill={color} opacity={1 - p * 0.6} />;
    })}
  </g>
);

export const Scene4 = ({ shots }) => {
  const f = useCurrentFrame();
  const s1 = shotAt(shots, '4.1', f);
  const s2 = shotAt(shots, '4.2', f);
  const s3 = shotAt(shots, '4.3', f);
  const s4 = shotAt(shots, '4.4', f);
  const s5 = shotAt(shots, '4.5', f);
  const s6 = shotAt(shots, '4.6', f);
  // 4.1: kỳ nổ — piston từ điểm chết trên xuống dưới; sau đó quay chậm liên tục
  const theta = s1.on ? 180 * ease(s1.p) : 180 + (f - s1.b) * 3;
  const gas = s1.on ? 1 - 0.5 * s1.p : s2.on ? 0.5 : 0.25;
  const cylO = s6.after ? 1 - prog(f, s6.a, s6.a + 10) : 1;
  return (
    <g>
      <g opacity={cylO}>
        <Cylinder theta={theta} gas={gas} exhaustLift={s3.after ? Math.min(1, (f - s3.a) / 10) : 0} jacket={s4.after ? ease(prog(f, s4.a, s4.a + 30)) : 0} sparks={s5.on ? 1 : 0} throttle={s5.after ? Math.min(1, (f - s5.a) / 12) : 0} f={f} />
        {/* 4.1: mũi tên lực đẩy piston */}
        {s1.on && <path d={`M${540} ${760} l0 ${120 * s1.p}`} stroke={C.white} strokeWidth="10" markerEnd="" />}
        {/* 4.2: hạt nhiệt tỏa ra thành */}
        <Particles f={f} n={14} o={s2.on ? 1 : 0} path={(p, i) => [540 + Math.cos(i * 0.9) * 200 * p, 740 + Math.sin(i * 1.7) * 40 + 60 * p]} />
        {/* 4.3: khí xả ra ống */}
        <Particles f={f} n={12} speed={0.03} o={s3.after && !s6.after ? 1 : 0} path={(p) => (p < 0.35 ? [610 + 140 * (p / 0.35), 640 - 60 * (p / 0.35)] : [750 + 260 * ((p - 0.35) / 0.65), 580])} />
        {s3.after && !s6.after && <Chip x={860} y={660} text="ống xả" c={C.heat} s={30} o={prog(f, s3.a, s3.a + 10)} />}
        {/* 4.4: nước làm mát → két nước + quạt (bên trái, dưới) */}
        {s4.after && !s6.after && (
          <g opacity={prog(f, s4.a, s4.a + 12)}>
            <path d="M358 900 L250 900 L250 1080" fill="none" stroke="#ff7a2a" strokeWidth="18" />
            <rect x={130} y={1080} width={240} height={150} rx={12} fill="#101c33" stroke={C.heat} strokeWidth="5" />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <line key={i} x1={150 + i * 40} y1={1092} x2={150 + i * 40} y2={1218} stroke={C.heat} strokeWidth="4" />
            ))}
            <T x={250} y={1275} s={30} c={C.heat}>
              két nước
            </T>
            <g transform={`translate(250, 1155) rotate(${f * 18})`}>
              {[0, 120, 240].map((a) => (
                <ellipse key={a} cx={0} cy={-28} rx={12} ry={28} fill="#ff7a2a" opacity="0.6" transform={`rotate(${a})`} />
              ))}
            </g>
            <Particles f={f} n={8} speed={0.025} path={(p) => [110 - 90 * p, 1100 + (p * 120) % 120]} />
          </g>
        )}
        {/* 4.5: nhãn ma sát & bơm khí */}
        {s5.on && (
          <g>
            <Chip x={540} y={1300} text="ma sát" c="#FFD23F" s={32} o={prog(f, s5.a, s5.a + 8)} />
            <Chip x={230} y={660} text="bơm khí" c={C.line} s={32} o={prog(f, s5.a + 6, s5.a + 14)} />
          </g>
        )}
      </g>
      {/* 4.6: hai lò sưởi trên bóng xe */}
      {s6.after && (
        <g opacity={prog(f, s6.a, s6.a + 10)}>
          <CarSide cx={540} cy={980} w={800} />
          <Heater x={250} y={900} s={1.2} t={f} />
          <T x={250} y={1170} s={30} c={C.heat}>
            két nước
          </T>
          <Heater x={880 - 60} y={1040} s={1.2} t={f} />
          <T x={800} y={1170} s={30} c={C.heat}>
            ống xả
          </T>
        </g>
      )}
    </g>
  );
};

export const Scene5 = ({ shots }) => {
  const f = useCurrentFrame();
  const s1 = shotAt(shots, '5.1', f);
  const s2 = shotAt(shots, '5.2', f);
  const s3 = shotAt(shots, '5.3', f);
  const s4 = shotAt(shots, '5.4', f);
  const mapOn = s2.on || s3.on;
  // bản đồ hiệu suất minh họa: trục x vòng tua, trục y tải
  const dotX = s3.on ? 680 - 360 * ease(s3.p) : 680;
  const dotY = s3.on ? 820 + 330 * ease(s3.p) : 820;
  return (
    <g>
      {s1.on && <Gauge cx={540} cy={1060} value={40 * ease(prog(f, s1.a + 6, s1.a + 30))} title="ĐỘNG CƠ · điểm tốt nhất" sub="động cơ tốt nhất (Toyota 2.5L)" color="#FFD23F" o={prog(f, s1.a, s1.a + 8)} />}
      {mapOn && (
        <g opacity={prog(f, s2.a, s2.a + 8)}>
          <rect x={180} y={640} width={720} height={600} rx={16} fill="rgba(5,9,18,0.6)" stroke={C.line} strokeOpacity="0.4" strokeWidth="3" />
          {[1, 2, 3, 4].map((k) => (
            <ellipse key={k} cx={680} cy={820} rx={60 * k} ry={40 * k} fill="none" stroke={C.line} strokeOpacity={0.9 - k * 0.18} strokeWidth="3" />
          ))}
          <T x={540} y={1280} s={26} c={C.dim} w={400}>
            vòng tua →
          </T>
          <T x={150} y={940} s={26} c={C.dim} w={400} a="end">
            tải
          </T>
          <circle cx={dotX} cy={dotY} r={22} fill="#FFD23F" />
          <T x={dotX} y={dotY - 34} s={30} c="#FFD23F">
            {s3.on && s3.p > 0.6 ? 'tải nhẹ' : 'tốt nhất'}
          </T>
          <T x={540} y={680} s={24} c={C.dim} w={400}>
            bản đồ hiệu suất · minh họa
          </T>
          {s3.on && (
            <g opacity={prog(f, s3.a, s3.a + 8)}>
              <rect x={760} y={1020} width={90} height={200} rx={20} fill="#101c33" stroke={C.white} strokeWidth="4" />
              <circle cx={805} cy={1065} r={28} fill="#ff2a2a" />
              <circle cx={805} cy={1125} r={28} fill="#3a2a0a" />
              <circle cx={805} cy={1185} r={28} fill="#0a3a1a" />
            </g>
          )}
        </g>
      )}
      {s4.on && (
        <g opacity={prog(f, s4.a, s4.a + 8)}>
          <Gauge cx={540} cy={1040} value={20 * ease(prog(f, s4.a + 6, s4.a + 30))} title="TỚI BÁNH XE · trung bình" sub="DOE/EPA Mỹ: 20,9% (xe đời 2013)" color={M.bill} />
        </g>
      )}
    </g>
  );
};
