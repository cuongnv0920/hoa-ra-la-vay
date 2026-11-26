// Video 005 — bản dựng nháp: 37 shot, giọng đọc, hiệu ứng và âm thanh môi trường. Chưa qua Cổng duyệt #2.
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { Background } from '../components/Background';
import { C } from '../theme';
import { VH, VW } from '../vertical/layout';
import { Footnote, Header, Headline, KaraokeSubtitle } from '../vertical/Text';
import { GDI, PFI } from './EngineSection';
import { SHOTS } from './scenes';
import { AmbienceLayer, MASTER, SfxLayer } from './sound';
import { TL } from './timeline';

export { TL };

const hSize = (h) => (h.length > 22 ? 58 : h.length > 18 ? 66 : h.length > 13 ? 76 : 92);
// Từ tô màu trong tiêu đề: [shot]: [cụm, màu]
const GOLD = '#FFD23F';
const MARK = {
  1.3: ['2 kim', GOLD], 2.1: ['gián tiếp', PFI], 2.3: ['cùng vào', PFI], 3.1: ['trực tiếp', GDI], 3.4: ['Kích nổ', C.heat],
  4.1: ['Cái giá', GDI], 4.3: ['muội', GOLD], 4.5: ['Cặn', GOLD], 5.1: ['Audi', GOLD], 5.5: ['đỡ tốn', GOLD], 5.8: ['số hạt', GOLD],
  6.5: ['bám cặn', GOLD], 7.1: ['Toyota', GOLD], 7.3: ['là vậy', GOLD],
};
const parts = (id, h) => {
  const m = MARK[id];
  const i = m ? h.indexOf(m[0]) : -1;
  if (i < 0) return [{ t: h }];
  return [{ t: h.slice(0, i) }, { t: m[0], c: m[1] }, { t: h.slice(i + m[0].length) }];
};

const footnote = (shot) => {
  if (shot.scene === 5 || shot.scene === 6) return 'Ví dụ: Audi EA888 thế hệ 3 — bản có phun kép · hình minh họa';
  if (shot.id === '7.1') return 'Sơ đồ chung, không phải mặt cắt máy Toyota';
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

// voice / sfx / ambience: tắt riêng từng lớp tiếng khi cần soát.
export const Video005 = ({ episode = 'BẢN NHÁP · chưa duyệt', voice = true, sfx = true, ambience = true }) => (
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
    {ambience && <AmbienceLayer />}
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
