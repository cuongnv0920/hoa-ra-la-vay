// Video 009 — bản dựng nháp: 38 shot, giọng đọc và hiệu ứng chuyển động. Chưa qua Cổng duyệt #2.
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { Background } from '../components/Background';
import { VH, VW } from '../vertical/layout';
import { Footnote, Header, Headline, KaraokeSubtitle } from '../vertical/Text';
import { EV, GOLD, ICE, SLIDE } from './parts';
import { SHOTS } from './scenes';
import { MASTER, SfxLayer } from './sound';
import { TL } from './timeline';

export { TL };

const hSize = (h) => (h.length > 28 ? 54 : h.length > 24 ? 60 : h.length > 19 ? 68 : h.length > 14 ? 78 : 92);
// Từ tô màu trong tiêu đề: [shot]: [cụm, màu]
const MARK = {
  1.1: ['mòn chậm', EV], 1.2: ['hết sớm hơn', SLIDE], 1.3: ['kém hơn?', GOLD], 1.4: ['chạm đường', GOLD],
  2.1: ['tăng tốc', GOLD], 2.2: ['bốn mảng cao su', GOLD], 2.3: ['rồi trượt nhẹ', SLIDE], 2.4: ['mất một chút', SLIDE], 2.5: ['"ăn đường"', GOLD], 2.6: ['Cái giá', GOLD],
  3.1: ['Pin', EV], 3.2: ['ở Anh', GOLD], 3.3: ['≈ 490 kg', GOLD], 3.4: ['≈ 1/4', GOLD], 3.5: ['20–30%', GOLD], 3.6: ['lực lớn hơn', SLIDE],
  4.1: ['xe nào', GOLD], 4.2: ['≈ 1.870 kg', EV], 4.3: ['≈ 1.660 kg', ICE], 4.4: ['≈ 210 kg', GOLD], 4.5: ['cân nặng', GOLD],
  5.1: ['vòng tua thấp', EV], 5.2: ['vừa lăn bánh', EV], 5.3: ['đột ngột', SLIDE], 5.4: ['Đạp nhẹ', GOLD], 5.5: ['Đạp gắt', SLIDE], 5.6: ['tức thì', EV], 5.7: ['Bàn chân', GOLD],
  6.1: ['Không.', GOLD], 6.2: ['Nhiều thứ', GOLD], 6.3: ['mượt', EV], 6.4: ['áp suất', EV], 6.5: ['đúng lịch', EV],
  7.1: ['là vậy', GOLD], 7.2: ['truyền lực', GOLD], 7.3: ['đạp mạnh hơn', SLIDE], 7.4: ['khác biệt', GOLD], 7.5: ['Hóa Ra Là Vậy', GOLD],
};
const parts = (id, h) => {
  const m = MARK[id];
  const i = m ? h.indexOf(m[0]) : -1;
  if (i < 0) return [{ t: h }];
  return [{ t: h.slice(0, i) }, { t: m[0], c: m[1] }, { t: h.slice(i + m[0].length) }];
};

const PATCH = ['2.3', '2.4', '3.6', '5.3', '5.4', '5.5', '5.7', '6.2', '7.2', '7.3', '7.4'];
const footnote = (shot) => {
  const id = shot.id;
  if (id === '3.2' || id === '3.3' || id === '3.4') return 'Emissions Analytics (Anh, 2023) · mỗi xe dùng lốp theo xe';
  if (id === '3.5') return 'Emissions Analytics; dữ liệu đội xe Epyx (Anh) · cách đo khác nhau';
  if (shot.scene === 4 && id !== '4.1') return 'Khối lượng không tải, theo thông số hãng · bóng xe minh họa';
  if (id === '5.1') return 'Đồ thị định tính · minh họa, không theo xe cụ thể';
  if (PATCH.includes(id)) return 'Mặt cắt chỗ lốp chạm đường · mô hình giản lược';
  if (id === '1.1') return 'Phanh tái sinh: mô-tơ hãm xe, nạp điện vào pin · minh họa';
  return 'Hình minh họa, đã giản lược';
};

const ShotArt = ({ shot }) => {
  const f = useCurrentFrame();
  const S = SHOTS[shot.id];
  const p = Math.min(1, f / Math.max(1, shot.dur - 1));
  return (
    <svg width={VW} height={VH} style={{ position: 'absolute', opacity: interpolate(f, [0, 6], [0.15, 1], { extrapolateRight: 'clamp' }) }}>
      <S f={f} p={p} d={shot.dur} at={shot.at} />
    </svg>
  );
};

// voice / sfx: tắt riêng từng lớp tiếng khi cần soát.
export const Video009 = ({ episode = 'BẢN NHÁP · chưa duyệt', voice = true, sfx = true }) => (
  <Background>
    <Header series="Hóa Ra Là Vậy" episode={episode} />
    {TL.shots.map((shot) => (
      <Sequence key={shot.id} from={shot.start} durationInFrames={shot.dur} layout="none">
        <ShotArt shot={shot} />
        {shot.id !== '7.5' && <Headline parts={parts(shot.id, shot.headline)} size={hSize(shot.headline)} />}
        {shot.id !== '7.5' && shot.id !== '7.1' && <Footnote text={footnote(shot)} />}
      </Sequence>
    ))}
    {sfx && <SfxLayer />}
    {voice &&
      TL.scenes.map((sc) => (
        <Sequence key={'a' + sc.scene} from={sc.start + sc.audioFrom} durationInFrames={sc.frames - sc.audioFrom}>
          <Audio src={staticFile(sc.audio)} volume={MASTER} />
        </Sequence>
      ))}
    {TL.scenes.map((sc) => (
      <Sequence key={'s' + sc.scene} from={sc.start} durationInFrames={sc.frames}>
        <KaraokeSubtitle chunks={sc.chunks} />
      </Sequence>
    ))}
    <AbsoluteFill />
  </Background>
);
