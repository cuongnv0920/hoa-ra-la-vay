// Cảnh 6–8: nghi phạm #2 #3, 200 nghìn ở bánh xe, xe điện.
import { useCurrentFrame } from 'remotion';
import { BrakeDisc } from '../components/BrakeDisc';
import { C } from '../theme';
import { ease, prog } from '../timing';
import { M } from '../vertical/layout';
import { Bill, CarSide, carWheel, Chip, SuspectCard, T } from './parts';
import { shotAt } from './timeline';

const fadeWin = (f, s, k = 8) => Math.min(prog(f, s.a, s.a + k), 1 - prog(f, s.b - k, s.b));

const Gear = ({ x, y, r, rot, c = C.drivetrain || '#9AA6B8' }) => (
  <g transform={`translate(${x},${y}) rotate(${rot})`}>
    {Array.from({ length: 10 }, (_, i) => (
      <rect key={i} x={-9} y={-r - 16} width={18} height={24} fill={c} transform={`rotate(${i * 36})`} />
    ))}
    <circle r={r} fill="#101c33" stroke={c} strokeWidth="6" />
    <circle r={r * 0.3} fill={c} />
  </g>
);

export const Scene6 = ({ shots }) => {
  const f = useCurrentFrame();
  const s1 = shotAt(shots, '6.1', f);
  const s2 = shotAt(shots, '6.2', f);
  return (
    <g>
      {s1.on && (
        <SuspectCard n={2} title="Phụ tải: máy phát · điều hòa · bơm" c={M.accessory} o={fadeWin(f, s1)}>
          <circle cx={-170} cy={-40} r={70} fill="none" stroke={M.accessory} strokeWidth="6" />
          <T x={-170} y={-25} s={46} c={M.accessory}>
            ~
          </T>
          <g transform={`translate(0,-40) rotate(${f * 2})`}>
            {[0, 60, 120].map((a) => (
              <line key={a} x1={-60} y1={0} x2={60} y2={0} stroke={M.accessory} strokeWidth="8" transform={`rotate(${a})`} />
            ))}
          </g>
          <g transform={`translate(170,-40) rotate(${f * 6})`}>
            {[0, 90, 180, 270].map((a) => (
              <ellipse key={a} cx={0} cy={-34} rx={14} ry={34} fill={M.accessory} opacity="0.7" transform={`rotate(${a})`} />
            ))}
          </g>
          <T x={-170} y={80} s={26} c={C.dim} w={400}>
            máy phát
          </T>
          <T x={0} y={80} s={26} c={C.dim} w={400}>
            điều hòa
          </T>
          <T x={170} y={80} s={26} c={C.dim} w={400}>
            bơm
          </T>
        </SuspectCard>
      )}
      {s2.on && (
        <SuspectCard n={3} title="Hộp số · trục truyền động" c={M.drivetrain} o={fadeWin(f, s2)}>
          <Gear x={-80} y={-40} r={70} rot={f * 3} c={M.drivetrain} />
          <Gear x={62} y={-40} r={50} rot={-f * 4.2 + 18} c={M.drivetrain} />
          <line x1={-260} y1={90} x2={260} y2={90} stroke={M.drivetrain} strokeWidth="16" strokeLinecap="round" />
          <T x={0} y={150} s={34} c={C.white}>
            + ~100.000 đ (2 nghi phạm cộng lại)
          </T>
        </SuspectCard>
      )}
    </g>
  );
};

export const Scene7 = ({ shots }) => {
  const f = useCurrentFrame();
  const s1 = shotAt(shots, '7.1', f);
  const s2 = shotAt(shots, '7.2', f);
  const s3 = shotAt(shots, '7.3', f);
  const s4 = shotAt(shots, '7.4', f);
  const car = { cx: 540, cy: 960, w: 820 };
  const wheel = carWheel(car.cx, car.cy, car.w, 1);
  const carO = s3.on ? 1 - prog(f, s3.a, s3.a + 8) : s4.on ? prog(f, s4.a, s4.a + 8) : 1;
  return (
    <g>
      <g opacity={carO}>
        <CarSide {...car} wheelRot={f * 6} />
        {/* 7.1: 2 tờ chạy theo trục tới bánh xe */}
        {s1.on &&
          [0, 1].map((i) => {
            const p = ease(prog(f, s1.a + i * 8, s1.b - 10 + i * 4));
            return <Bill key={i} x={300 + (wheel.x - 300) * p} y={700 + (wheel.y - 700) * p} s={1.3 - 0.5 * p} />;
          })}
        {/* 7.2: đường gió + vết lốp */}
        {s2.on && (
          <g opacity={prog(f, s2.a, s2.a + 8)}>
            {[0, 1, 2, 3, 4].map((i) => {
              const y = 760 + i * 30;
              const dx = (f * 14 + i * 90) % 300;
              return <path key={i} d={`M${60 + dx} ${y} q 200 ${-40 - i * 6} 420 -10 q 220 25 420 ${40 + i * 4}`} fill="none" stroke={C.line} strokeOpacity={0.6} strokeWidth="4" strokeDasharray="30 20" />;
            })}
            <Chip x={300} y={660} text="gió" c={C.line} s={32} />
            <ellipse cx={wheel.x} cy={wheel.y + wheel.r + 4} rx={wheel.r * 0.9} ry={10} fill={C.heat} opacity={0.5 + 0.3 * Math.sin(f / 4)} />
            <Chip x={wheel.x - 20} y={1230} text="lốp ép xuống mặt đường" c={C.heat} s={28} />
          </g>
        )}
        {s4.on && <Chip x={540} y={1240} text="Đi phố: chỉ 140–200 nghìn tới bánh xe" c="#FFD23F" s={30} />}
      </g>
      {/* 7.3: phanh → nhiệt (tái dùng BrakeDisc) */}
      {s3.on && (
        <g opacity={prog(f, s3.a, s3.a + 8) * (1 - prog(f, s3.b - 6, s3.b))}>
          <BrakeDisc cx={540} cy={940} R={260} heat={0.8 * ease(prog(f, s3.a, s3.b - 10))} rot={f * 3 * (1 - s3.p)} />
        </g>
      )}
    </g>
  );
};

// Sơ đồ dòng năng lượng xe điện, đặt dọc: ổ cắm → pin → biến tần → mô-tơ → bánh xe
const NODES = [
  { k: 'ổ cắm', y: 630 },
  { k: 'pin', y: 765 },
  { k: 'biến tần', y: 900 },
  { k: 'mô-tơ', y: 1035 },
  { k: 'bánh xe', y: 1170 },
];
const LEAK = [
  { at: 0, k: 'sạc' },
  { at: 2, k: 'truyền động điện' },
  { at: 1, k: 'phụ tải' },
];

export const Scene8 = ({ shots }) => {
  const f = useCurrentFrame();
  const s1 = shotAt(shots, '8.1', f);
  const s2 = shotAt(shots, '8.2', f);
  const s3 = shotAt(shots, '8.3', f);
  const s4 = shotAt(shots, '8.4', f);
  const wipe = ease(s1.p);
  const regen = s4.after;
  return (
    <g>
      {/* 8.1 lau sang chế độ điện */}
      {s1.on && <rect x={0} y={1920 * (1 - wipe)} width={1080} height={1920 * wipe} fill="#08182A" opacity={0.6} />}
      {s1.on && (
        <g opacity={prog(f, s1.a + 8, s1.a + 18)}>
          <path d="M560 760 L470 980 L560 980 L500 1200 L660 920 L570 920 L640 760 Z" fill={M.ev} />
        </g>
      )}
      {/* 8.2 mô-tơ, gạch ngọn lửa */}
      {s2.on && (
        <g opacity={prog(f, s2.a, s2.a + 8)}>
          <circle cx={420} cy={960} r={150} fill="#08182A" stroke={M.ev} strokeWidth="8" />
          <g transform={`translate(420,960) rotate(${f * 4})`}>
            {[0, 60, 120, 180, 240, 300].map((a) => (
              <rect key={a} x={-14} y={-120} width={28} height={70} rx={6} fill={M.ev} opacity="0.7" transform={`rotate(${a})`} />
            ))}
          </g>
          <path d="M760 1060 q -70 -80 0 -200 q 20 70 60 70 q 40 -60 0 -130 q 110 90 60 260 z" fill="none" stroke={C.heat} strokeWidth="8" />
          <line x1={680} y1={1080} x2={880} y2={820} stroke={C.white} strokeWidth="12" strokeLinecap="round" />
        </g>
      )}
      {/* 8.3–8.4 sơ đồ dòng năng lượng */}
      {(s3.on || s4.on) && (
        <g opacity={prog(f, s3.a, s3.a + 8)}>
          <line x1={420} y1={NODES[0].y} x2={420} y2={NODES[4].y} stroke={M.ev} strokeOpacity="0.3" strokeWidth="14" />
          {NODES.map((n, i) => (
            <g key={i}>
              <rect x={260} y={n.y - 44} width={320} height={88} rx={20} fill="#08182A" stroke={M.ev} strokeWidth="5" />
              <T x={420} y={n.y + 12} s={38} c={C.white}>
                {n.k}
              </T>
            </g>
          ))}
          {/* chấm năng lượng: đi xuống khi chạy; khi phanh tái sinh đi ngược từ bánh xe về pin */}
          {Array.from({ length: 10 }, (_, i) => {
            const p = (f * 0.03 + i / 10) % 1;
            const down = !regen;
            const y = down ? NODES[0].y + (NODES[4].y - NODES[0].y) * p : NODES[4].y - (NODES[4].y - NODES[1].y) * p;
            return <circle key={i} cx={420} cy={y} r={13} fill={M.ev} />;
          })}
          {!regen &&
            LEAK.map((l, i) => {
              const p = (f * 0.03 + i * 0.3) % 1;
              const y0 = (NODES[l.at].y + NODES[l.at + 1].y) / 2;
              return (
                <g key={i}>
                  <circle cx={440 + 260 * p} cy={y0 + 30 * p} r={9} fill={M.drivetrain} opacity={1 - p} />
                  <T x={760} y={y0 + 10} s={26} c={M.drivetrain} w={500}>
                    {l.k}
                  </T>
                </g>
              );
            })}
          {regen && (
            <g opacity={prog(f, s4.a, s4.a + 10)}>
              {/* chiều quay giữ nguyên: cùng mũi tên cong ở mô-tơ và bánh xe */}
              {[NODES[3].y, NODES[4].y].map((y, i) => (
                <g key={i} transform={`translate(640, ${y})`}>
                  <path d="M -30 -30 A 42 42 0 1 1 -40 10" fill="none" stroke={C.white} strokeWidth="6" />
                  <path d="M -48 4 l 10 18 l 12 -16 z" fill={C.white} />
                </g>
              ))}
              <T x={780} y={NODES[3].y + 10} s={24} c={C.white} w={400}>
                quay cùng chiều
              </T>
              <Chip x={540} y={1288} text="phanh tái sinh · regenerative braking" c={M.ev} s={28} />
            </g>
          )}
        </g>
      )}
    </g>
  );
};
