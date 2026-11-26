// KHUNG MẪU video 008 — để duyệt cách nhìn, chưa phải bản dựng.
// Sample008A = shot 6.6 "Trục dừng, bánh sau vẫn lăn" (Audi quattro ultra).
// Sample008B = shot 4.5 "Ép chặt: gần như dính" (chồng đĩa ly hợp Subaru).
// Chưa có giọng: phụ đề dùng mốc ước tính (estimateChunks), sẽ thay bằng mốc ElevenLabs khi tạo giọng.
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { Background } from '../components/Background';
import { C } from '../theme';
import { Chip } from '../v003/parts';
import { SAFE, VH, VW, ZONE } from '../vertical/layout';
import { estimateChunks, Footnote, Header, Headline, KaraokeSubtitle } from '../vertical/Text';
import { angles, ClutchPack, outRatio } from './ClutchPack';
import { AUDI, car, DrivetrainTop, OFF, SUBARU } from './Drivetrain';

export const SAMPLE008A_FRAMES = 108; // 3,6 s theo storyboard
export const SAMPLE008B_FRAMES = 126; // 4,2 s

const Safe = () => (
  <g fill="none" stroke="#FF3DF0" strokeWidth="3" strokeDasharray="14 10">
    <rect x={SAFE.side} y={ZONE.visual[0]} width={VW - 2 * SAFE.side} height={ZONE.visual[1] - ZONE.visual[0]} />
    <rect x={VW - SAFE.right} y={SAFE.rightFromY} width={SAFE.right} height={VH - SAFE.rightFromY} />
    <rect x={0} y={VH - SAFE.bottom} width={VW} height={SAFE.bottom} />
  </g>
);

const Leader = ({ x1, y1, x2, y2, color, o = 1 }) => (
  <g opacity={o}>
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="3" />
    <circle cx={x2} cy={y2} r={6} fill={color} />
  </g>
);

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' };

// ---------- shot 6.6 ----------
const CHUNKS_A = estimateChunks('Trục dẫn động ra cầu sau ngừng quay, để giảm tổn hao.', SAMPLE008A_FRAMES, 4, 8);
const STOP = [18, 72]; // trục ra sau chậm dần từ frame 18, dừng ở frame 72

export const Sample008A = ({ showSafe = false, frameOverride = null }) => {
  const cf = useCurrentFrame();
  const f = frameOverride ?? cf;
  const g = car(540, 575, 1);
  const W0 = 14; // độ/frame khi trục còn quay
  // góc trục ra sau: tích phân vận tốc giảm dần (ease-out) tới 0
  let spinR = 0;
  for (let i = 0; i < f; i++) spinR += W0 * (1 - interpolate(i, STOP, [0, 1], { ...clamp, easing: Easing.out(Easing.quad) }));
  const grey = interpolate(f, STOP, [0, 1], clamp);
  const roll = f * 9; // xe vẫn chạy: bánh lăn đều suốt shot
  const lab = interpolate(f, [30, 42], [0, 1], clamp);
  const chip = interpolate(f, [74, 84], [0, 1], clamp);
  return (
    <Background>
      <Header series="Hóa Ra Là Vậy" episode="KHUNG MẪU · chưa duyệt" />
      <svg width={VW} height={VH} style={{ position: 'absolute' }}>
        <DrivetrainTop g={g} c={AUDI} roll={roll} spinR={spinR} rearGrey={grey} clutchOpen={1} decoupleOpen={1} kF={1} kR={0} />
        <Leader x1={345} y1={g.clutch + 110} x2={524} y2={g.clutch + 110} color={grey > 0.5 ? OFF : AUDI} o={lab} />
        <Chip x={200} y={g.clutch + 70} text="trục ra cầu sau" c={C.steel} s={30} o={lab} />
        <Chip x={200} y={g.clutch + 125} text={f >= STOP[1] ? 'đã dừng' : 'chậm dần'} c={f >= STOP[1] ? C.white : C.steel} s={30} o={lab} />
        <Leader x1={300} y1={g.axR + 120} x2={g.cx - g.track} y2={g.axR + 64} color={C.white} o={lab} />
        <Chip x={270} y={g.axR + 150} text="bánh sau vẫn lăn" c={C.white} s={30} o={lab} />
        <Chip x={850} y={g.axF - 150} text="lực chỉ tới cầu trước" c={AUDI} s={26} />
        <Chip x={800} y={g.axR + 150} text="giảm tổn hao" c={AUDI} s={32} o={chip} />
        {showSafe && <Safe />}
      </svg>
      <Headline parts={[{ t: 'Trục dừng, ', c: AUDI }, { t: 'bánh sau vẫn lăn' }]} from={-20} size={62} />
      <KaraokeSubtitle chunks={CHUNKS_A} />
      <Footnote text="Audi quattro ultra · nhìn từ trên xuống · hình minh họa, đã giản lược" />
    </Background>
  );
};

// ---------- shot 4.5 ----------
const CHUNKS_B = estimateChunks('Ép chặt, chúng gần như dính vào nhau, cầu sau nhận nhiều lực hơn.', SAMPLE008B_FRAMES, 4, 8);
const pOf = (i) => interpolate(i, [8, 44], [0.25, 0.92], { ...clamp, easing: Easing.inOut(Easing.cubic) });

const PressureBar = ({ p }) => {
  const x = 110;
  const y = 680;
  const w = 300;
  return (
    <g>
      <rect x={x} y={y} width={w} height={24} rx={12} fill="#101a2e" stroke={C.steel} strokeWidth={3} />
      <rect x={x} y={y} width={w * p} height={24} rx={12} fill={C.steel} />
      <text x={x} y={y - 16} fill={C.steel} fontSize={30} fontWeight={700} fontFamily="Segoe UI, Arial, sans-serif">
        lực ép
      </text>
    </g>
  );
};

const RearArrow = ({ k }) => {
  // mũi tên lực ra cầu sau: dày theo k
  const w = 6 + 22 * k;
  const y = 690;
  return (
    <g>
      <line x1={660} y1={y} x2={960 - w * 1.4} y2={y} stroke={C.white} strokeWidth={w} strokeLinecap="round" />
      <path d={`M960 ${y} L${960 - w * 1.4} ${y - w} L${960 - w * 1.4} ${y + w} Z`} fill={C.white} />
      <text x={810} y={y - 40} fill={C.white} fontSize={30} fontWeight={700} fontFamily="Segoe UI, Arial, sans-serif" textAnchor="middle">
        lực ra cầu sau
      </text>
    </g>
  );
};

export const Sample008B = ({ showSafe = false, frameOverride = null }) => {
  const cf = useCurrentFrame();
  const f = frameOverride ?? cf;
  const p = pOf(f);
  const { aIn, aOut } = angles(f, pOf);
  const r = outRatio(p);
  const chip = interpolate(f, [58, 68], [0, 1], clamp);
  return (
    <Background>
      <Header series="Hóa Ra Là Vậy" episode="KHUNG MẪU · chưa duyệt" />
      <svg width={VW} height={VH} style={{ position: 'absolute' }}>
        <ClutchPack p={p} aIn={aIn} aOut={aOut} c={SUBARU} />
        <PressureBar p={p} />
        <RearArrow k={Math.max(0, (r - 0.4) / 0.57)} />
        <Chip x={540} y={1215} text="gần như cùng tốc độ" c={SUBARU} s={30} o={chip} />
        {showSafe && <Safe />}
      </svg>
      <Headline parts={[{ t: 'Ép chặt: ', c: SUBARU }, { t: 'gần như dính' }]} from={-20} size={84} />
      <KaraokeSubtitle chunks={CHUNKS_B} />
      <Footnote text="Ly hợp nhiều đĩa (multi-plate clutch) · hình minh họa, đã giản lược" />
    </Background>
  );
};
