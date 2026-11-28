// Lớp hiệu ứng chuyển động của video 009 (giọng đọc nằm ở Video009.jsx; không dùng nhạc nền, không có âm thanh môi trường).
// File tự tổng hợp: pipeline/sfx-009.js; sổ nguồn: projects/009-xe-dien-mon-lop/assets/audio/NGUON-AM-THANH.md.
import { Audio, Sequence, staticFile } from 'remotion';
import { exitFrames } from './ContactPatch';
import { M, V } from './cues';
import { TL } from './timeline';

// Hạ chung giọng và hiệu ứng 1 dB như video 005, 007, 008: đỉnh giọng đã sát 0 dBFS.
export const MASTER = 0.89;
// File hiệu ứng chuẩn hóa đỉnh −1 dBFS. Mức như video 007, 008 (người dùng đã nghe, "Tiếng ổn"): −21 / −13 / −8 dB.
const LEVEL = { nen: 0.09, nhe: 0.224, vua: 0.4 };

// n khối gai đầu tiên rời mép sau kể từ frame a (cùng phép tính với ContactPatch: roll = f * V)
const exits = (a, n, load, d) => exitFrames(a, d, load, V).slice(0, n);

// [id, shot, file, mức, mốc(at, d) → frame hoặc mảng frame trong shot]
// Mốc lấy từ cùng hàm điều khiển animation (cues.js, ContactPatch.exitFrames), không gõ tay giây.
const SFX = [
  ['A01', '1.1', 'click-tram', 'nhe', () => M.brake11() + 4], // má phanh hiện
  ['A02', '1.2', 'cop-duc', 'nhe', (at, d) => M.wear12(at, d)[1]], // gai chạm vạch báo mòn
  ['A03', '1.3', 'click-cao', 'nhe', (at) => M.no13(at)], // "chưa chắc" đè lên
  ['A04', '1.4', 'whoosh', 'nhe', () => M.dive14()], // lặn xuống dưới bánh
  ['A05', '2.1', 'click', 'nhe', (at) => [M.arF21(at), M.arB21(at), M.arS21(at)]], // ba mũi tên lực
  ['A06', '2.2', 'ting', 'nhe', (at) => M.patch22(at)], // bốn mảng tiếp xúc sáng (giữa lúc hiện)
  ['A07', '2.3', 'cao-su-truot', 'nen', (at, d) => exits(M.zones23(at) - 4, 3, 0.45, d)], // ba khối gai đầu tiên trượt ra, không lặp suốt shot
  ['A08', '2.5', 'cop-duc', 'nhe', (at) => M.strike25(at) + 8], // gạch xong
  ['A09', '2.6', 'cao-su-truot', 'nen', (at) => [M.speed26(at) + 6, M.turn26(at) + 6]], // mảng tiếp xúc nháy sáng nhất
  ['A10', '3.1', 'thich-dap', 'vua', () => M.battery31() + 14], // khối pin đặt xuống sàn
  ['A11', '3.2', 'whoosh', 'nhe', () => M.cars32()], // hai xe trượt vào
  ['A12', '3.3', 'click-cao', 'nhe', (at) => M.gap33(at)], // "≈ 490 kg" hiện, ngay trước khi đọc số
  ['A13a', '3.4', 'tick', 'nhe', () => M.bars34() + 18], // hai cột dừng mọc
  ['A13b', '3.4', 'click', 'nhe', (at) => M.plus34(at)], // nhãn +26%
  ['A14', '3.5', 'click-tram', 'nhe', (at) => M.band35(at) - 4], // dải 20–30% bắt đầu hiện
  ['A15a', '3.6', 'cao-su-truot', 'nen', (at, d) => exits(M.heavy36(at) - 10, 1, 0.2, d)], // mặt cắt xe nhẹ
  ['A15b', '3.6', 'cao-su-truot-day', 'nen', (at, d) => exits(M.heavy36(at) + 10, 2, 1, d)], // mặt cắt xe nặng: dày hơn một chút
  ['A16', '4.1', 'cop-duc', 'nhe', () => M.shrink41() + 20], // mốc 490 kg dạt xong
  ['A17', '4.2', 'can-kim', 'nhe', (at) => M.w42(at) + 25], // tiếng lò xo (0,37 s trong file) rơi lúc kim dừng (+36)
  ['A18', '4.3', 'can-kim', 'nhe', (at) => M.w43(at) + 25],
  ['A19', '4.4', 'ting', 'nhe', () => M.gap44()], // vạch ≈ 210 kg hiện ở đầu shot, trước khi đọc "hai trăm ký" (shot hết ngay sau chữ số), không đè số
  ['A20', '4.5', 'click', 'nhe', (at) => M.label45(at)], // nhãn "xe điện" mờ đi
  ['A21', '5.1', 'tick', 'nhe', (at) => M.ev51(at) + 4], // đường mô-tơ điện hiện ở mức cao
  ['A22', '5.2', 'whoosh', 'nhe', (at) => M.go52(at) - 2], // xe lao đi
  ['A23a', '5.3', 'click-tram', 'nhe', (at) => M.press53(at)], // bàn đạp nhấn
  ['A23b', '5.3', 'ket-lop', 'nhe', (at) => M.pulse53(at) + 5], // xung lực chạm mảng tiếp xúc
  ['A24', '5.4', 'cao-su-truot', 'nen', (at, d) => exits(6, 1, 0.45, d)], // khối gai trượt ít
  ['A25', '5.5', 'ket-lop', 'nhe', () => M.hard55() + 4], // đường lực vọt dựng đứng
  ['A26', '6.1', 'cop-duc', 'vua', (at) => M.no61(at) + 8], // sau chữ "Không"
  ['A27', '6.2', 'tick', 'nhe', (at) => M.chips62(at).map((x) => Math.max(0, x - 1))], // năm chip
  ['A28', '6.3', 'click-cao', 'nhe', (at) => M.item63(at) - 4],
  ['A29', '6.4', 'click-cao', 'nhe', () => M.item64()],
  ['A30', '6.5', 'click-cao', 'nhe', () => M.item65()],
  ['A31', '7.1', 'khop-manh', 'vua', () => M.stamp71() + 3], // dấu đóng xuống
  ['A32a', '7.3', 'cao-su-truot', 'nen', (at, d) => exits(M.sl73(at)[0] + 8, 1, 0.8, d)], // thanh cân nặng tăng
  ['A32b', '7.3', 'cao-su-truot-day', 'nen', (at, d) => exits(M.sl73(at)[1] + 8, 1, 1, d)], // thanh đạp ga tăng
  ['A33', '7.5', 'chuong', 'nhe', () => M.name75()],
];

const shotById = (TL, id) => {
  const s = TL.shots.find((x) => x.id === id);
  if (!s) throw new Error('Không có shot ' + id);
  return s;
};

const makeCues = (tl) => SFX.flatMap(([id, shotId, file, level, when]) => {
  const s = shotById(tl, shotId);
  const w = when(s.at, s.dur);
  const frames = Array.isArray(w) ? w : [w];
  if (!frames.length) throw new Error(`${id}: không có mốc trong shot ${shotId}`);
  return frames.map((f, i) => {
    if (f < 0 || f >= s.dur) throw new Error(`${id}: mốc ${f} nằm ngoài shot ${shotId}`);
    return { id: frames.length > 1 ? `${id}.${i + 1}` : id, shot: shotId, frame: s.start + f, file: `audio/sfx/${file}.wav`, volume: LEVEL[level] * MASTER };
  });
});

export const CUES = makeCues(TL);

export const SfxLayer = ({ tl = TL }) =>
  makeCues(tl).map((c) => (
    <Sequence key={c.id} from={c.frame} name={'sfx ' + c.id}>
      <Audio src={staticFile(c.file)} volume={c.volume} />
    </Sequence>
  ));
