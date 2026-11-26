// Video 007 — bản dựng nháp: 35 shot, giọng đọc và hiệu ứng chuyển động. Chưa qua Cổng duyệt #2.
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { Background } from '../components/Background';
import { VH, VW } from '../vertical/layout';
import { Footnote, Header, Headline, KaraokeSubtitle } from '../vertical/Text';
import { BOXER } from './BoxerEngine';
import { COG, GOLD, INLINE } from './parts';
import { SHOTS } from './scenes';
import { MASTER, SfxLayer } from './sound';
import { TL } from './timeline';

export { TL };

const hSize = (h) => (h.length > 22 ? 58 : h.length > 18 ? 66 : h.length > 13 ? 76 : 92);
// Từ tô màu trong tiêu đề: [shot]: [cụm, màu]
const MARK = {
  1.1: ['đứng', INLINE], 1.2: ['nằm ngang', BOXER], 1.3: ['vẫn giữ', GOLD], 2.1: ['boxer', BOXER], 2.3: ['Cùng vào', BOXER], 2.5: ['6 xi-lanh', BOXER],
  3.4: ['phần lớn', GOLD], 3.5: ['rung', GOLD], 3.6: ['trục cân bằng', GOLD], 3.7: ['không cần', GOLD], 3.8: ['rung nhẹ', GOLD],
  4.1: ['thấp', BOXER], 4.2: ['trọng tâm', COG], 4.3: ['Cả xe', COG], 5.1: ['chiều dài', GOLD], 5.3: ['gọn', BOXER], 5.4: ['1966', GOLD],
  5.5: ['AWD', GOLD], 5.6: ['Hộp số', GOLD], 6.1: ['Bè rộng', GOLD], 6.2: ['Hai', GOLD], 6.3: ['Bugi', GOLD], 7.1: ['là vậy', GOLD],
  7.2: ['bố trí xe', BOXER], 7.4: ['AWD', GOLD], 7.5: ['AWD', GOLD],
};
const parts = (id, h) => {
  const m = MARK[id];
  const i = m ? h.indexOf(m[0]) : -1;
  if (i < 0) return [{ t: h }];
  return [{ t: h.slice(0, i) }, { t: m[0], c: m[1] }, { t: h.slice(i + m[0].length) }];
};

const footnote = (shot) => {
  const id = shot.id;
  if (id === '1.2') return 'Nhìn từ phía trước · hầu hết xe Subaru chạy xăng';
  if (shot.scene === 2 || id === '3.8' || id === '6.2') return 'Nhìn từ trên xuống · quay chậm · hình minh họa';
  if (['3.1', '3.2', '3.3', '3.4', '3.7'].includes(id)) return 'Một cặp xi-lanh, nhìn từ phía trước · quay chậm · minh họa';
  if (id === '3.5') return 'Máy thẳng hàng 4 xi-lanh nhìn nghiêng · minh họa';
  if (id === '3.6') return 'Trục cân bằng: ở một số máy lớn · minh họa';
  if (shot.scene === 4 || id === '6.1') return 'Không theo tỉ lệ thật · hình minh họa';
  if (['5.3', '5.4', '5.5', '5.6'].includes(id)) return 'Theo Subaru · sơ đồ minh họa, không phải bản vẽ xe';
  if (id === '6.3') return 'Ở một số mẫu xe · hình minh họa';
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
export const Video007 = ({ episode = 'BẢN NHÁP · chưa duyệt', voice = true, sfx = true }) => (
  <Background>
    <Header series="Hóa Ra Là Vậy" episode={episode} />
    {TL.shots.map((shot) => (
      <Sequence key={shot.id} from={shot.start} durationInFrames={shot.dur} layout="none">
        <ShotArt shot={shot} />
        <Headline parts={parts(shot.id, shot.headline)} size={hSize(shot.headline)} />
        <Footnote text={footnote(shot)} />
      </Sequence>
    ))}
    {sfx && <SfxLayer />}
    {voice && TL.scenes.map((sc) => (
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
