// Video 011 — bản dựng nháp: 41 shot, giọng đọc và hiệu ứng chuyển động. Chưa qua Cổng duyệt #2.
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { Background } from '../components/Background';
import { VH, VW } from '../vertical/layout';
import { Footnote, Header, Headline, KaraokeSubtitle } from '../vertical/Text';
import { EV, GOLD, ICE } from '../v009/parts';
import { Scene6bArt } from './Sample011';
import { SHOTS } from './scenes';
import { GEN } from './parts';
import { CUES, CUES34, CUES35, MASTER, SfxLayer } from './sound';
import { HEAT } from './parts2';
import { K6B, K6B_34, K6B_35 } from './cues';
import { TL, TL34, TL35 } from './timeline';

export { TL, TL34, TL35 };

const ORANGE = '#FF9A2A';
// tiêu đề: [chữ, từ khóa tô màu, màu]; bản 3.3 đổi 4.3 theo lời đọc mới
const HEAD = {
  '1.1': ['Đạp phanh một chiếc xe điện', 'xe điện', EV],
  '1.2': ['Xe chậm lại, pin nhích lên', 'pin nhích lên', GOLD],
  '1.3': ['Phanh sao lại ra điện?', 'ra điện', GOLD],
  '2.1': ['Phanh thường: ma sát', 'ma sát', HEAT],
  '2.2': ['Má phanh ép vào đĩa', 'đĩa', HEAT],
  '2.3': ['Chuyển động thành nhiệt', 'nhiệt', HEAT],
  '2.4': ['Nhiệt tỏa đi, không dùng lại', 'không dùng lại', GOLD],
  '3.1': ['Đèn xe đạp chạy bằng đinamô', 'đinamô', GOLD],
  '3.2': ['Bánh quay, đinamô phát điện', 'phát điện', GOLD],
  '3.3': ['Muốn sáng, phải lấy bớt sức', 'lấy bớt sức', GOLD],
  '3.4': ['Xe điện: ý tưởng gần giống', 'gần giống', GOLD],
  '3.5': ['Khác ở chỗ: điện vào pin', 'vào pin', EV],
  '4.1': ['Tăng tốc: mô-tơ kéo bánh', 'mô-tơ kéo bánh', EV],
  '4.2': ['Nhả ga: mô-tơ vẫn quay theo bánh', 'vẫn quay', GOLD],
  '4.3': ['Giờ bánh xe kéo mô-tơ', 'kéo mô-tơ', GOLD],
  '4.4': ['Năng lượng đi ngược chiều', 'ngược chiều', GOLD],
  '5.1': ['Mô-tơ đổi vai: máy phát điện', 'máy phát điện', GEN],
  '5.2': ['Phát điện thì tốn sức', 'tốn sức', GOLD],
  '5.3': ['Sức cản ấy làm xe chậm lại', 'chậm lại', GOLD],
  '5.4': ['Phanh tái sinh', 'tái sinh', GEN],
  '6a.1': ['Một vấn đề: hai kiểu điện', 'hai kiểu điện', GOLD],
  '6a.2': ['Pin chỉ cất điện một chiều', 'một chiều', GOLD],
  '6b.1': ['Biến tần: người phiên dịch', 'phiên dịch', GOLD],
  '6b.2': ['Tăng tốc: một chiều thành xoay chiều', 'xoay chiều', EV],
  '6b.3': ['Phanh: nắn lại thành một chiều', 'một chiều', GOLD],
  '6b.4': ['Máy tính chỉnh mức hãm', 'mức hãm', GOLD],
  '7.1': ['Pin không phải lúc nào cũng nhận', 'cũng nhận', GOLD],
  '7.2': ['Pin đầy, quá lạnh, quá nóng', 'quá nóng', HEAT],
  '7.3': ['Phanh thường vẫn hãm', 'vẫn hãm', ORANGE],
  '7.4': ['Cần dừng gấp: má phanh vào cuộc', 'má phanh', ORANGE],
  '7.5': ['Máy tính chia lực', 'chia lực', GOLD],
  '8.1': ['Má phanh: vẫn thành nhiệt', 'thành nhiệt', HEAT],
  '8.2': ['Dọc đường cũng hao', 'hao', GOLD],
  '8.3': ['Chỉ lấy lại một phần', 'một phần', GOLD],
  '8.4': ['Không có điện miễn phí', 'miễn phí', GOLD],
  '9.1': ['Hybrid cũng vậy', 'Hybrid', ICE],
  '9.2': ['Giữa mô-tơ và pin: biến tần', 'biến tần', EV],
  '9.3': ['Pin còn được động cơ xăng nạp', 'động cơ xăng', ICE],
  '9.4': ['Hybrid cắm sạc: nạp từ ổ điện', 'ổ điện', GOLD],
  'K.1': ['Hóa ra là vậy', 'là vậy', GOLD],
  'K.2': ['Một phần quay về pin', 'quay về pin', GOLD],
};
// Tiêu đề khác của bản 3.5 (theo lời đọc mới)
const HEAD35 = {
  ...HEAD,
  '6a.2': ['Pin chỉ lưu điện một chiều', 'một chiều', GOLD],
  '6b.4': ['Máy tính chỉnh lực hãm', 'lực hãm', GOLD],
  '7.4': ['Đạp mạnh: má phanh vào cuộc', 'má phanh', ORANGE],
  '9.4': ['Hybrid cắm sạc: nạp từ nguồn điện ngoài', 'nguồn điện ngoài', GOLD],
};
const hSize = (h) => (h.length > 32 ? 46 : h.length > 28 ? 54 : h.length > 24 ? 60 : h.length > 19 ? 68 : h.length > 14 ? 78 : 92);
const parts = (id, heads = HEAD) => {
  const [h, m, c] = heads[id];
  const i = h.indexOf(m);
  if (i < 0) return [{ t: h }];
  return [{ t: h.slice(0, i) }, { t: m, c }, { t: h.slice(i + m.length) }];
};

const footnote = (id) => {
  if (id.startsWith('3.')) return 'Ẩn dụ để hình dung · đinamô không có pin hay biến tần';
  if (id.startsWith('6b')) return 'Biến tần đổi điện hai chiều · hình minh họa giản lược';
  if (id.startsWith('7.')) return 'Tùy mẫu xe và điều kiện · hình minh họa giản lược';
  if (id.startsWith('8.')) return 'Minh họa định tính · không theo số liệu';
  if (id === '5.4') return 'Tên tiếng Anh: regenerative braking';
  return 'Hình minh họa, đã giản lược';
};

const ShotArt = ({ shot, v }) => {
  const f = useCurrentFrame();
  const S = SHOTS[shot.id];
  const p = Math.min(1, f / Math.max(1, shot.dur - 1));
  return (
    <svg width={VW} height={VH} style={{ position: 'absolute', opacity: interpolate(f, [0, 6], [0.15, 1], { extrapolateRight: 'clamp' }) }}>
      <S f={f} p={p} d={shot.dur} at={shot.at} v={v} />
    </svg>
  );
};

const SceneArt6b = ({ K }) => {
  const f = useCurrentFrame();
  return (
    <svg width={VW} height={VH} style={{ position: 'absolute' }}>
      <Scene6bArt f={f} K={K} />
    </svg>
  );
};

// voice / sfx: tắt riêng từng lớp tiếng khi cần soát.
const VideoBase = ({ tl, cues, K, episode, voice, sfx, heads = HEAD, v = '33' }) => (
  <Background>
    <Header series="Hóa Ra Là Vậy" episode={episode} />
    {tl.scenes
      .filter((sc) => sc.label === '6b')
      .map((sc) => (
        <Sequence key="art6b" from={sc.start} durationInFrames={sc.frames} layout="none">
          <SceneArt6b K={K} />
        </Sequence>
      ))}
    {tl.shots.map((shot) => (
      <Sequence key={shot.id} from={shot.start} durationInFrames={shot.dur} layout="none">
        {shot.label !== '6b' && <ShotArt shot={shot} v={v} />}
        <Headline parts={parts(shot.id, heads)} size={hSize(heads[shot.id][0])} />
        <Footnote text={footnote(shot.id)} />
      </Sequence>
    ))}
    {sfx && <SfxLayer cues={cues} />}
    {voice &&
      tl.scenes.map((sc) => (
        <Sequence key={'a' + sc.scene} from={sc.start + sc.audioFrom} durationInFrames={sc.frames - sc.audioFrom}>
          <Audio src={staticFile(sc.audio)} volume={MASTER * (sc.gain || 1)} />
        </Sequence>
      ))}
    {tl.scenes.map((sc) => (
      <Sequence key={'s' + sc.scene} from={sc.start} durationInFrames={sc.frames}>
        <KaraokeSubtitle chunks={sc.chunks} />
      </Sequence>
    ))}
    <AbsoluteFill />
  </Background>
);

// Bản 3.3 (đã duyệt Cổng #2)
export const Video011 = ({ episode = 'BẢN NHÁP · chưa duyệt', voice = true, sfx = true }) => <VideoBase tl={TL} cues={CUES} K={K6B} episode={episode} voice={voice} sfx={sfx} />;
// Bản 3.4 (nhịp nhanh)
export const Video011V34 = ({ episode = 'BẢN NHÁP · chưa duyệt', voice = true, sfx = true }) => <VideoBase tl={TL34} cues={CUES34} K={K6B_34} episode={episode} voice={voice} sfx={sfx} v="34" />;
// Bản 3.5 (nhịp nhanh + chắt lọc từ bản GPT)
export const Video011V35 = ({ episode = 'BẢN NHÁP · chưa duyệt', voice = true, sfx = true }) => <VideoBase tl={TL35} cues={CUES35} K={K6B_35} episode={episode} voice={voice} sfx={sfx} heads={HEAD35} v="35" />;
