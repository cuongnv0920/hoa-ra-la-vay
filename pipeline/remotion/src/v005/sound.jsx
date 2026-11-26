// Hai lớp âm thanh tách riêng của video 005 (giọng đọc nằm ở Video005.jsx; không dùng nhạc nền).
// File tự tổng hợp: pipeline/sfx-005.js; sổ nguồn: projects/005-hai-kim-phun/assets/audio/NGUON-AM-THANH.md.
import { Audio, interpolate, Sequence, staticFile } from 'remotion';
import { JOIN, M, SNAP } from './cues';
import { TL } from './timeline';

// Hạ chung giọng và hiệu ứng 1 dB: đỉnh giọng đã sát 0 dBFS, cộng thêm tiếng sẽ vỡ.
export const MASTER = 0.89;
// File hiệu ứng chuẩn hóa đỉnh −1 dBFS, nên hệ số này ≈ chênh lệch với đỉnh giọng.
// Bản 2 (người dùng: "hơi nhỏ, và ít", nhưng "đừng tăng quá nhiều"): từ −24/−16/−10 dB lên −21/−13/−8 dB.
const LEVEL = { nen: 0.09, nhe: 0.224, vua: 0.4 };

// [id, shot, file, mức, mốc(at, d) = frame trong shot — lấy từ cùng mốc của animation]
const SFX = [
  ['A01', '1.2', 'click', 'nhe', () => M.inj12() + SNAP],
  ['A02a', '1.3', 'click', 'nhe', () => M.inj13a() + SNAP],
  ['A02b', '1.3', 'click-cao', 'nhe', (at) => M.inj13b(at) + SNAP],
  ['A03', '2.1', 'phun-mem', 'nhe', () => M.spray21()],
  ['A04', '2.3', 'van-mo-gio-hut', 'nhe', () => 2],
  ['A05', '3.1', 'phun-gat', 'vua', () => M.spray31()],
  ['A06', '3.2', 'hoi-thoang', 'nen', (at, d) => Math.round(0.1 * d)],
  ['A07', '3.4', 'go-kim-loai', 'vua', (at, d) => M.knock34(at, d)],
  ['A08', '4.2', 'giot-cham', 'nhe', (at) => M.splat42(at) + 7],
  ['A09', '5.1', 'whoosh', 'nhe', () => 0],
  ['A11', '5.4', 'cach-co-khi', 'nhe', () => 3],
  ['A12', '6.2', 'click', 'nhe', (at) => M.card62(at) + 6],
  ['A13', '6.6', 'phun-gat', 'nhe', (at) => M.flush66(at)],
  ['A14', '7.1', 'whoosh', 'nhe', () => 0],
  ['A15', '7.3', 'khop-manh', 'vua', (at) => M.join73(at) + JOIN],
  // bản 2: thêm một ít tiếng cho các chuyển động đang im
  ['B01', '1.1', 'whoosh', 'nhe', () => 44], // khối máy chuyển vào mặt cắt
  ['B02', '2.1', 'whoosh', 'nhe', () => 0],
  ['B03', '3.3', 'ha-nhiet', 'nhe', () => 2], // nhiệt kế hạ
  ['B04', '3.4', 'tia-lua', 'nhe', () => 6], // bugi đánh lửa
  ['B05', '3.5', 'nen-len', 'nhe', () => 2], // pít-tông nén
  ['B06', '4.3', 'lua-lan', 'nhe', () => 4], // cháy không hết
  ['B07', '4.5', 'tach-nho', 'nhe', (at, d) => Math.round(0.35 * d)], // cặn bám
  ['B08', '5.2', 'phun-mem', 'nhe', (at) => at('Lúc này kim gián tiếp')],
  ['B09', '5.7', 'click', 'nhe', (at) => at('vừa đỡ tốn xăng') + 6],
  ['B10', '5.7', 'click-cao', 'nhe', (at) => at('vừa giảm hạt muội') + 6],
  ['B11', '5.8', 'cach-co-khi', 'vua', () => 8], // con dấu đóng xuống
  ['B12', '6.5', 'tach-nho', 'nhe', (at) => at('đầu kim dễ bám')], // cặn cứng
  ['B13', '7.4', 'chuong', 'nhe', (at) => at('đúng lúc')],
];

const shotById = (id) => {
  const s = TL.shots.find((x) => x.id === id);
  if (!s) throw new Error('Không có shot ' + id);
  return s;
};

export const CUES = SFX.map(([id, shotId, file, level, when]) => {
  const s = shotById(shotId);
  return { id, frame: s.start + when(s.at, s.dur), file: `audio/sfx/${file}.wav`, volume: LEVEL[level] * MASTER };
});

export const SfxLayer = () =>
  CUES.map((c) => (
    <Sequence key={c.id} from={c.frame} name={'sfx ' + c.id}>
      <Audio src={staticFile(c.file)} volume={c.volume} />
    </Sequence>
  ));

// Tiếng kéo dài: [id, shot đầu, shot cuối, file, mức, frame trễ ở shot đầu]. Vào/ra 0,3 s.
const BEDS = [
  ['A10', '5.2', '5.3', 'may-cam-chung', 'nen', 0],
  // Không đặt tiếng xì kéo dài khi kim phun: người dùng thấy át giọng đọc. Tia phun chỉ có tiếng ngắn lúc bắt đầu.
];

export const AmbienceLayer = () =>
  BEDS.map(([id, first, last, file, level, delay]) => {
    const a = shotById(first);
    const b = shotById(last);
    const from = a.start + delay;
    const dur = b.start + b.dur - from;
    return (
      <Sequence key={id} from={from} durationInFrames={dur} name={'môi trường ' + id}>
        <Audio src={staticFile(`audio/moi-truong/${file}.wav`)} volume={(f) => LEVEL[level] * MASTER * interpolate(f, [0, 9, dur - 9, dur], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })} />
      </Sequence>
    );
  });
