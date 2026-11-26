// Video 008 — bản dựng nháp: 45 shot, giọng đọc và hiệu ứng chuyển động. Chưa qua Cổng duyệt #2.
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { Background } from '../components/Background';
import { VH, VW } from '../vertical/layout';
import { Footnote, Header, Headline, KaraokeSubtitle } from '../vertical/Text';
import { AUDI, SUBARU } from './Drivetrain';
import { GOLD } from './parts';
import { SHOTS } from './scenes';
import { MASTER, SfxLayer } from './sound';
import { TL } from './timeline';

export { TL };

const hSize = (h) => (h.length > 26 ? 56 : h.length > 22 ? 62 : h.length > 18 ? 70 : h.length > 13 ? 80 : 92);
// Từ tô màu trong tiêu đề: [shot]: [cụm, màu]
const MARK = {
  1.1: ['bốn bánh', GOLD], 1.2: ['máy đặt dọc', GOLD], 1.3: ['Audi', AUDI], 1.4: ['Subaru', SUBARU], 1.5: ['khác nhau', GOLD],
  2.1: ['hai đường', GOLD], 2.2: ['quay lệch', GOLD], 2.3: ['Nối cứng', GOLD], 2.4: ['Ghì lại', GOLD], 2.5: ['bộ phận ở giữa', GOLD],
  3.1: ['Boxer dọc', SUBARU], 3.2: ['cân nhau', SUBARU], 3.3: ['hình dáng', GOLD], 3.4: ['Không', GOLD],
  4.1: ['Không', GOLD], 4.2: ['nhiều đĩa', SUBARU], 4.3: ['xen kẽ', SUBARU], 4.4: ['Ép nhẹ', SUBARU], 4.5: ['Ép chặt', SUBARU], 4.6: ['Máy tính', GOLD],
  5.1: ['60 : 40', SUBARU], 5.2: ['liên tục', SUBARU], 5.3: ['thêm lực ra sau', SUBARU], 5.4: ['luôn nhận lực', SUBARU],
  6.1: ['quattro ultra', AUDI], 6.2: ['ly hợp nhiều đĩa', AUDI], 6.3: ['bộ tách', AUDI], 6.4: ['mở ra', AUDI], 6.5: ['cầu trước', AUDI], 6.6: ['Trục dừng,', AUDI],
  7.1: ['1980', GOLD], 7.2: ['máy tính', AUDI], 7.3: ['0,5 giây', AUDI], 7.4: ['0,2 giây', AUDI],
  8.1: ['khá giống', GOLD], 8.2: ['cách điều khiển', GOLD], 8.3: ['Subaru', SUBARU], 8.4: ['Audi', AUDI], 8.5: ['nhiên liệu', AUDI], 8.6: ['cùng điều kiện', GOLD],
  9.1: ['là vậy', GOLD], 9.2: ['bốn bánh', GOLD], 9.3: ['Luôn sẵn sàng', SUBARU], 9.4: ['một câu', GOLD], 9.5: ['Hóa Ra Là Vậy', GOLD],
};
const parts = (id, h) => {
  const m = MARK[id];
  const i = m ? h.indexOf(m[0]) : -1;
  if (i < 0) return [{ t: h }];
  const out = [{ t: h.slice(0, i) }, { t: m[0], c: m[1] }, { t: h.slice(i + m[0].length) }];
  // "Luôn sẵn sàng · Chỉ khi cần": tô cả hai vế
  if (id === '9.3') return [{ t: 'Luôn sẵn sàng', c: SUBARU }, { t: ' · ' }, { t: 'Chỉ khi cần', c: AUDI }];
  return out;
};

const footnote = (shot) => {
  const s = shot.scene;
  const id = shot.id;
  if (s === 1 || s === 8 || id === '9.2' || id === '9.3') return 'Nhìn từ trên xuống · sơ đồ minh họa, không phải bản vẽ xe';
  if (s === 2) return 'Xe vào cua nhìn từ trên · không theo tỉ lệ · minh họa';
  if (s === 3) return 'Subaru · nhìn từ trên xuống · sơ đồ minh họa';
  if (s === 4) return id === '4.1' ? 'Nhiều xe Subaru dùng CVT · sơ đồ minh họa' : 'Ly hợp nhiều đĩa (multi-plate clutch) · hình minh họa, đã giản lược';
  if (s === 5) return 'Subaru · 60 : 40 là số Subaru từng công bố · minh họa';
  if (s === 6) return 'Audi quattro ultra · nhìn từ trên xuống · hình minh họa, đã giản lược';
  if (id === '7.1') return 'Audi quattro 1980 · hình minh họa chung';
  if (s === 7) return 'Audi quattro ultra · số liệu theo Audi · minh họa';
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
export const Video008 = ({ episode = 'BẢN NHÁP · chưa duyệt', voice = true, sfx = true }) => (
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
