// KHUNG MẪU video 007, shot 2.3 "Cùng vào, cùng ra" — để duyệt cách nhìn, chưa phải bản dựng.
// Chưa có giọng: phụ đề dùng mốc ước tính (estimateChunks), sẽ thay bằng mốc ElevenLabs khi tạo giọng.
import { useCurrentFrame } from 'remotion';
import { Background } from '../components/Background';
import { C } from '../theme';
import { Chip } from '../v003/parts';
import { SAFE, VH, VW, ZONE } from '../vertical/layout';
import { estimateChunks, Footnote, Header, Headline, KaraokeSubtitle } from '../vertical/Text';
import { BOXER, BoxerEngine, CYLS, pairDir, pairExt } from './BoxerEngine';

export const SAMPLE007_FRAMES = 129; // 4,3 s theo storyboard
const SENTENCE = 'Hai piston đối diện chuyển động đối xứng: cùng tiến vào, rồi cùng lùi ra.';
const CHUNKS = estimateChunks(SENTENCE, SAMPLE007_FRAMES, 4, 8);

const CX = 540;
const CY = 950;
const REVS = 2; // quay chậm: 2 vòng trong shot
const THETA0 = 180; // cặp tô sáng bắt đầu ở điểm ngoài cùng

const Arrow = ({ x, y, dir, o }) => (
  // dir: +1 chỉ sang phải, −1 sang trái
  <path
    d={`M ${x - dir * 34} ${y} L ${x + dir * 34} ${y} M ${x + dir * 10} ${y - 22} L ${x + dir * 36} ${y} L ${x + dir * 10} ${y + 22}`}
    fill="none"
    stroke={C.white}
    strokeWidth="8"
    strokeLinecap="round"
    strokeLinejoin="round"
    opacity={o}
  />
);

const Leader = ({ x1, y1, x2, y2, color }) => (
  <g>
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="3" />
    <circle cx={x2} cy={y2} r={6} fill={color} />
  </g>
);

export const Sample007 = ({ showSafe = false, thetaOverride = null }) => {
  const f = useCurrentFrame();
  const theta = thetaOverride ?? THETA0 + (360 * REVS * f) / (SAMPLE007_FRAMES - 1);
  const dir = pairDir(theta, 0); // +1 đang ra, −1 đang vào
  const ext = pairExt(theta, 0);
  // Mũi tên mờ đi ở hai điểm chết (vận tốc gần 0)
  const speed = Math.abs(pairExt(theta + 3, 0) - ext) / (40 * (3 * Math.PI) / 180); // chuẩn hóa theo vận tốc lớn nhất ≈ R·Δθ
  const ao = Math.min(1, 0.15 + speed);
  const yA = [CY + CYLS[0].dy, CY + CYLS[1].dy];
  const label = dir > 0 ? 'cùng ra' : 'cùng vào';
  return (
    <Background>
      <Header series="Hóa Ra Là Vậy" episode="KHUNG MẪU · chưa duyệt" />
      <svg width={VW} height={VH} style={{ position: 'absolute' }}>
        <BoxerEngine cx={CX} cy={CY} thetaDeg={theta} hi={0} dim={0.4} />
        {/* mũi tên chuyển động của cặp tô sáng, đặt phía ngoài nắp máy */}
        <Arrow x={CX + 360} y={yA[0]} dir={dir} o={ao} />
        <Arrow x={CX - 360} y={yA[1]} dir={-dir} o={ao} />
        <Chip x={CX + 250} y={ZONE.visual[0] + 60} text={label} c={BOXER} s={40} />
        <Leader x1={CX - 120} y1={CY + 300} x2={CX - 6} y2={CY + 250} color={C.steel} />
        <Chip x={CX - 210} y={CY + 322} text="trục khuỷu (crankshaft)" c={C.steel} s={30} />
        <Leader x1={CX - 290} y1={CY - 228} x2={CX - 250} y2={yA[1] - 40} color={BOXER} />
        <Chip x={CX - 290} y={CY - 250} text="một cặp đối diện" c={BOXER} s={30} />
        {showSafe && (
          <g fill="none" stroke="#FF3DF0" strokeWidth="3" strokeDasharray="14 10">
            <rect x={SAFE.side} y={ZONE.visual[0]} width={VW - 2 * SAFE.side} height={ZONE.visual[1] - ZONE.visual[0]} />
            <rect x={VW - SAFE.right} y={SAFE.rightFromY} width={SAFE.right} height={VH - SAFE.rightFromY} />
            <rect x={0} y={VH - SAFE.bottom} width={VW} height={SAFE.bottom} />
          </g>
        )}
      </svg>
      <Headline parts={[{ t: 'Cùng vào, ', c: BOXER }, { t: 'cùng ra' }]} from={-20} size={84} />
      <KaraokeSubtitle chunks={CHUNKS} />
      <Footnote text="Nhìn từ trên xuống · hình minh họa, đã giản lược" />
    </Background>
  );
};
