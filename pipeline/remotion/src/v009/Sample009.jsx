// KHUNG MẪU video 009 — để duyệt hình chủ đạo, chưa phải bản dựng.
// Sample009A = shot 2.3 "Bị kéo, rồi trượt nhẹ" (mặt cắt chỗ lốp chạm đường).
// Chưa có giọng: phụ đề dùng mốc ước tính (estimateChunks), sẽ thay bằng mốc ElevenLabs khi tạo giọng.
import { Easing, interpolate, useCurrentFrame } from 'remotion';
import { Background } from '../components/Background';
import { C } from '../theme';
import { T } from '../v003/parts';
import { SAFE, VH, VW, ZONE } from '../vertical/layout';
import { estimateChunks, Footnote, Header, Headline, KaraokeSubtitle } from '../vertical/Text';
import { ContactPatch, ROAD_Y } from './ContactPatch';

export const SAMPLE009A_FRAMES = 162; // 5,4 s theo storyboard

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' };

const Safe = () => (
  <g fill="none" stroke="#FF3DF0" strokeWidth="3" strokeDasharray="14 10">
    <rect x={SAFE.side} y={ZONE.visual[0]} width={VW - 2 * SAFE.side} height={ZONE.visual[1] - ZONE.visual[0]} />
    <rect x={VW - SAFE.right} y={SAFE.rightFromY} width={SAFE.right} height={VH - SAFE.rightFromY} />
    <rect x={0} y={VH - SAFE.bottom} width={VW} height={SAFE.bottom} />
  </g>
);

// Mũi tên chiều xe chạy (phía trên mặt đường, bên phải)
const Travel = ({ o = 1 }) => (
  <g opacity={o}>
    <line x1={760} y1={ROAD_Y - 330} x2={900} y2={ROAD_Y - 330} stroke={C.line} strokeWidth={6} strokeLinecap="round" />
    <path d={`M920 ${ROAD_Y - 330} l-26 -16 v32 z`} fill={C.line} />
    <T x={840} y={ROAD_Y - 352} s={28} c={C.line}>
      xe chạy
    </T>
  </g>
);

const CHUNKS_A = estimateChunks('Để tạo lực bám, cao su bị kéo biến dạng và trượt rất nhẹ trên mặt đường.', SAMPLE009A_FRAMES, 4, 7);
const V = 12; // px/frame mặt đường trôi (khối gai đi qua vùng tiếp xúc trong khoảng 1,8 s)

export const Sample009A = ({ showSafe = false, frameOverride = null }) => {
  const cf = useCurrentFrame();
  const f = frameOverride ?? cf;
  // lực tăng dần theo cụm "kéo biến dạng", vùng trượt hiện theo cụm "trượt rất nhẹ"
  const force = interpolate(f, [18, 70], [0, 0.62], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const zones = interpolate(f, [72, 90], [0, 1], clamp);
  const labels = interpolate(f, [80, 96], [0, 1], clamp);
  const glow = 0.75 + 0.25 * Math.sin(f / 5);
  return (
    <Background>
      <Header series="Hóa Ra Là Vậy" episode="KHUNG MẪU · chưa duyệt" />
      <svg width={VW} height={VH} style={{ position: 'absolute' }}>
        <ContactPatch roll={f * V} force={force} load={0.45} zones={zones} labels={labels} slideGlow={glow} />
        <Travel o={interpolate(f, [0, 12], [0, 1], clamp)} />
        {showSafe && <Safe />}
      </svg>
      <Headline parts={[{ t: 'Bị kéo, ' }, { t: 'rồi trượt nhẹ', c: '#FFB000' }]} from={-20} size={84} />
      <KaraokeSubtitle chunks={CHUNKS_A} />
      <Footnote text="Mặt cắt chỗ lốp chạm đường · mô hình giản lược" />
    </Background>
  );
};
