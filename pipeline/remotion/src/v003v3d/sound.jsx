// Âm thanh cho video 003 bản giọng mới (bản đăng 3.2 không có hiệu ứng). Giọng nằm ở Video003V3D.jsx; không dùng nhạc nền.
// Mốc lấy từ cùng công thức điều khiển hình trong scenesBase.jsx / scenes.jsx (f tính từ đầu shot, d = độ dài shot).
// Nguồn file: projects/003-tien-xang-di-dau/assets/audio/NGUON-AM-THANH.md (tự tổng hợp, dùng lại từ video 005, 008, 009, 011).
import { Audio, interpolate, Sequence, staticFile } from 'remotion';

export const MASTER = 0.89;
// Mức như video 007–009 đã nghe: nền −21, nhẹ −13, vừa −8 dB so với đỉnh giọng.
const LEVEL = { nen: 0.09, nhe: 0.224, vua: 0.4 };

// [id, shot, file, mức, mốc(d) → frame hoặc mảng frame trong shot]
const SFX = [
  ['A01', '1.1', 'click', 'nhe', (d) => Math.round((9 * d) / 13) + 16], // đồng cuối vào can xăng
  ['A02', '1.3', 'whoosh', 'nhe', () => 0], // tám đồng tách khỏi dòng
  ['A03', '1.3', 'ting', 'vua', () => 24], // hai đồng tới bánh xe
  ['A04', '2.2', 'click-tram', 'nhe', (d) => Math.round(0.25 * d)], // pít-tông bắt đầu đi xuống
  ['A05', '2.4', 'hoi-thoang', 'nen', () => 2], // xu-páp xả mở, khí nóng ra
  ['A06', '3.3b', 'click', 'nhe', () => 2], // điều hòa, máy phát, hộp số hiện
  ['A07', '3.4', 'whoosh', 'nhe', (d) => Math.round(0.45 * d)], // hai đồng chạy xuống bánh
  ['A08', '3.4', 'ting', 'nhe', (d) => Math.round(0.75 * d)],
  ['A09', '4.1', 'ting', 'nhe', () => 38], // hai đồng vào bánh
  ['A10', '4.2', 'whoosh', 'nhe', () => 0], // gió
  ['A11', '4.3', 'ma-sat-ngan', 'nhe', () => 6], // phanh nóng dần
  ['A12', '4.4', 'tick', 'nhe', (d) => [26, 74, 122].filter((x) => x < d - 6)], // mỗi lần xe dừng
  ['A13', '5.1', 'whoosh', 'vua', () => 0], // chuyển sang xe điện
  ['A14', '5.5', 'chuyen-nhe-tram', 'nhe', () => 2], // phanh: dòng đảo chiều về pin
  ['A15', '6.1', 'tick', 'nhe', (d) => Math.round(0.45 * d)], // kim đồng hồ chi phí chạy
  ['A16', '6.3', 'click', 'nhe', () => [4, 20, 36]], // ba thẻ giá hiện
  ['A17', '7.1', 'click', 'nhe', (d) => Math.round(0.7 * d)], // dây sạc tới nhà máy
  ['A18', '7.4', 'click-cao', 'nhe', (d) => Math.round(0.5 * d) + 4], // thẻ "tập khác"
  ['A19', '8.1', 'whoosh', 'nhe', () => 0],
  ['A20', '8.2', 'ting', 'vua', () => 38], // hai đồng tới bánh
  ['A21', '8.3', 'hoi-thoang', 'nen', () => 4], // phần còn lại thành nhiệt
];

export const makeCues = (tl) =>
  SFX.flatMap(([id, shot, file, level, when]) => {
    const { a, b } = tl.T(shot);
    return [].concat(when(b - a)).map((f, i) => ({ id: `${id}.${i}`, frame: a + f, file: `audio/sfx/${file}.wav`, volume: LEVEL[level] * MASTER }));
  });

export const SfxLayer = ({ tl }) => {
  const idle = tl.T('3.3'); // xe đứng chờ đèn đỏ, máy vẫn nổ
  const dur = idle.b - idle.a;
  return (
    <>
      {makeCues(tl).map((c) => (
        <Sequence key={c.id} from={c.frame} name={'sfx ' + c.id}>
          <Audio src={staticFile(c.file)} volume={c.volume} />
        </Sequence>
      ))}
      <Sequence from={idle.a} durationInFrames={dur} name="môi trường: máy nổ cầm chừng">
        <Audio src={staticFile('audio/moi-truong/may-cam-chung.wav')} volume={(f) => LEVEL.nen * MASTER * interpolate(f, [0, 9, dur - 9, dur], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })} />
      </Sequence>
    </>
  );
};
