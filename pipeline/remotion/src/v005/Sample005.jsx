// KHUNG MẪU video 005, shot 2.3 "Van mở, cùng vào" — để duyệt cách nhìn, chưa phải bản dựng.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import al from '../../../../projects/005-hai-kim-phun/assets/audio/eleven_v4/scene-02.alignment.json';
import { Background } from '../components/Background';
import { C } from '../theme';
import { ease, prog } from '../timing';
import { Chip } from '../v003/parts';
import { SAFE, VH, VW, ZONE } from '../vertical/layout';
import { Footnote, Header, Headline, KaraokeSubtitle } from '../vertical/Text';
import { EngineSection, GDI, INTAKE_SEAT, NOZZLE_PFI, PFI } from './EngineSection';

const FPS = 30;
const LEAD = 0.2;
const text = al.characters.join('');
const SENTENCE = 'Van mở, xăng và không khí cùng đi vào.';
const at = text.indexOf(SENTENCE);
if (at < 0) throw new Error('Không thấy câu của shot 2.3 trong alignment');
const t0 = al.character_start_times_seconds[at];
const words = [...SENTENCE.matchAll(/\S+/g)].map((m) => ({
  w: m[0],
  start: Math.round((LEAD + al.character_start_times_seconds[at + m.index] - t0) * FPS),
  end: Math.round((LEAD + al.character_end_times_seconds[at + m.index + m[0].length - 1] - t0) * FPS),
}));
export const SAMPLE005_FRAMES = 93;
// Hai cụm ≤ 34 ký tự (quy ước phụ đề của video 003), không để một chữ rớt dòng.
const CUT = words.findIndex((w) => w.w === 'cùng');
const CHUNKS = [
  { words: words.slice(0, CUT), start: 0, end: words[CUT].start },
  { words: words.slice(CUT), start: words[CUT].start, end: SAMPLE005_FRAMES },
];

// Hạt xăng đi theo đường: đầu kim → lưng xu-páp → qua khe van → tản trong xi lanh.
const rnd = (i, k) => {
  const v = Math.sin(i * 127.1 + k * 311.7) * 43758.5453;
  return v - Math.floor(v);
};
const lerp = (a, b, t) => a + (b - a) * t;
function fuel(p, i) {
  const spread = rnd(i, 1) - 0.5;
  const pts = [
    [NOZZLE_PFI.x, NOZZLE_PFI.y],
    [388 + spread * 44, 748 - spread * 36],
    [INTAKE_SEAT.x + 28 + spread * 20, INTAKE_SEAT.y + 26 + spread * 14],
    [400 + rnd(i, 2) * 280, 880 + rnd(i, 3) * 95],
  ];
  const s = Math.min(2.999, p * 3);
  const k = Math.floor(s);
  const t = s - k;
  return [lerp(pts[k][0], pts[k + 1][0], t), lerp(pts[k][1], pts[k + 1][1], t)];
}

const AirArrow = ({ x, y, a, o }) => (
  <path d="M -24 -12 L 0 0 L -24 12" transform={`translate(${x},${y}) rotate(${a})`} fill="none" stroke={C.white} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity={o} />
);

const Leader = ({ x1, y1, x2, y2, color }) => (
  <g>
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="3" />
    <circle cx={x2} cy={y2} r={6} fill={color} />
  </g>
);

export const Sample005 = ({ showSafe = false }) => {
  const f = useCurrentFrame();
  const k = ease(prog(f, 0, SAMPLE005_FRAMES - 1));
  const theta = 25 + 120 * k; // kỳ nạp: pít-tông đi xuống
  const lift = 38 * Math.sin(Math.PI * Math.min(1, 0.15 + 0.7 * k));
  return (
    <Background>
      <Header series="Hóa Ra Là Vậy" episode="KHUNG MẪU · chưa duyệt" />
      <svg width={VW} height={VH} style={{ position: 'absolute' }}>
        <EngineSection theta={theta} intakeLift={lift} pfiOn>
          {Array.from({ length: 70 }, (_, i) => {
            const p = (f * 0.018 + i / 70) % 1;
            const [x, y] = fuel(p, i);
            return <circle key={i} cx={x} cy={y} r={4 + 4 * rnd(i, 4)} fill={PFI} opacity={0.95 - 0.35 * p} />;
          })}
        </EngineSection>
        {[0, 1, 2].map((i) => {
          const p = (f * 0.02 + i / 3) % 1;
          return <AirArrow key={i} x={92 + 150 * p} y={662 + 6 * p * p} a={6 * p} o={0.85 * Math.sin(Math.PI * p)} />;
        })}
        {/* pít-tông đi xuống */}
        <path d="M 790 960 L 790 1070 M 766 1042 L 790 1072 L 814 1042" fill="none" stroke={C.white} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
        <Leader x1={300} y1={578} x2={236} y2={582} color={PFI} />
        <Chip x={420} y={586} text="kim gián tiếp" c={PFI} s={32} />
        <Leader x1={640} y1={610} x2={452} y2={786} color={C.white} />
        <Chip x={720} y={590} text="xu-páp nạp: mở" c={C.white} s={32} />
        <Leader x1={190} y1={925} x2={252} y2={806} color={GDI} />
        <Chip x={190} y={950} text="kim trực tiếp" c={GDI} s={32} />
        <Chip x={190} y={1002} text="đang nghỉ" c={GDI} s={26} />
        <Chip x={830} y={1120} text="kỳ nạp" c={C.white} s={30} />
        {showSafe && (
          <g fill="none" stroke="#FF3DF0" strokeWidth="3" strokeDasharray="14 10">
            <rect x={SAFE.side} y={ZONE.visual[0]} width={VW - 2 * SAFE.side} height={ZONE.visual[1] - ZONE.visual[0]} />
            <rect x={VW - SAFE.right} y={SAFE.rightFromY} width={SAFE.right} height={VH - SAFE.rightFromY} />
            <rect x={0} y={VH - SAFE.bottom} width={VW} height={SAFE.bottom} />
          </g>
        )}
      </svg>
      <Headline parts={[{ t: 'Van mở, ' }, { t: 'cùng vào', c: PFI }]} from={-20} size={84} />
      <KaraokeSubtitle chunks={CHUNKS} />
      <Footnote text="Mặt cắt minh họa, đã giản lược" />
      <AbsoluteFill />
    </Background>
  );
};
