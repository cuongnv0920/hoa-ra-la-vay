// Danh sách cue hiệu ứng chuyển động của video 011 (storyboard bản 2, mục Âm thanh). Không có nhạc nền, không có âm thanh môi trường.
// Frame của mỗi cue lấy từ cùng mốc điều khiển animation (at('cụm lời đọc') trong scenes.jsx, K6B ở cues.js), không gõ tay giây ước tính.
// Tách khỏi sound.jsx (không import remotion) để xuất cues-011.json bằng node.
import { K6B, K6B_34, K6B_35 } from './cues';
import { TL, TL34, TL35 } from './timeline';

export const MASTER = 0.89; // hạ chung giọng và hiệu ứng 1 dB như video 005–009
// Mức như video 009 (người dùng đã nghe, "Tiếng ổn"): −21 / −13 / −8 dB so với đỉnh giọng
export const LEVEL = { nen: 0.09, nhe: 0.224, vua: 0.4 };


// [id, shot, file, mức, mốc(at, d) → frame (trong shot) hoặc mảng frame]; shot '6b' tính theo cảnh (K6B)
const sfxTable = (K) => [
  ['A01', '1.1', 'click-tram', 'nhe', (at) => at('đạp phanh') + 6], // chân đạp xuống bàn đạp phanh
  ['A02', '1.2', 'ting', 'nhe', (at) => at('pin được nạp') + 14], // vạch pin nhích lên
  ['A03', '1.3', 'click-cao', 'nhe', () => 6], // dấu hỏi hiện
  ['A04', '2.2', 'ma-sat-ngan', 'nen', (at) => at('ép vào') + 12], // má phanh chạm đĩa
  ['A05', '3.2', 'ting', 'nhe', (at) => at('phát điện') + 8], // đèn bật sáng
  ['A06', '3.4', 'whoosh', 'nhe', () => 6], // bánh xe đạp trượt ra, bánh ô tô trượt vào
  ['A07', '4.4', 'click-tram', 'nhe', (at) => at(['chiều ngược lại', 'đổi chiều']) + 3], // mũi tên năng lượng đổi hướng
  ['A08', '5.1', 'click-cao', 'nhe', (at) => at('máy phát điện') + 6], // mô-tơ lật mặt thành "phát điện"
  ['A09', '5.4', 'click', 'nhe', (at) => at('phanh tái sinh') + 28], // chữ regenerative braking hiện, sau khi giọng đọc xong cụm này
  ['A10', '6b', 'click-tram', 'nhe', () => K.inv + 6], // khối biến tần lấp vào khoảng trống
  ['A11', '6b', 'chuyen-nhe', 'nen', () => K.acOn + 8], // sóng ra khỏi biến tần (lượt tăng tốc)
  ['A12', '6b', 'chuyen-nhe-tram', 'nen', () => K.dcBack + 4], // sóng vào biến tần, ra đường thẳng (lượt phanh)
  ['A13', '6b', 'ting', 'nhe', () => K.charge + 12], // vạch pin nhích lên
  ['A14', '6b', 'click-cao', 'nhe', () => K.comp + 4], // biểu tượng máy tính hiện
  ['A15', '7.2', 'tick', 'nhe', (at) => [at('sạc đầy') + 10, at('quá lạnh') + 10, at('quá nóng') + 10]], // ba biểu tượng lần lượt hiện
  ['A16', '7.4', 'click-tram', 'nhe', (at) => at(['dừng gấp', 'đạp phanh mạnh']) + 8], // chân đạp mạnh
  ['A17', '9.1', 'whoosh', 'nhe', () => 6], // hai xe trượt vào khung
  ['A18', '9.3', 'click', 'nhe', (at) => Math.max(2, at(['nạp thêm', 'có thêm điện', 'nạp từ']) - 12)], // đường sáng thứ hai từ động cơ xăng
  ['A19', '9.4', 'click-cao', 'nhe', (at) => at('cắm sạc') + 6], // dây sạc nối vào xe
  ['A20', 'K.1', 'khop-manh', 'nhe', () => 2], // dấu "Hóa ra là vậy"; mức nhẹ (storyboard ghi vừa) vì tiếng ngân trùm lên chữ đầu của lời đọc
  ['A21', 'K.2', 'ting', 'nhe', (at, d) => d - 56], // đường sáng bánh → mô-tơ → biến tần → pin sáng lần cuối; đặt ngay sau chữ cuối của lời đọc
  ['A22', 'K.2', 'chuong', 'nhe', (at, d) => d - 38], // tên kênh hiện
];


export const makeCues = (tl, K) =>
  sfxTable(K).flatMap(([id, shotId, file, level, when]) => {
  const six = shotId === '6b';
  const scene6b = tl.scenes.find((x) => x.label === '6b');
  const s = six ? { start: scene6b.start, dur: scene6b.frames, at: scene6b.at } : tl.shots.find((x) => x.id === shotId);
  if (!s && (tl.dropped || []).includes(shotId)) return []; // shot đã bỏ ở bản này
  if (!s) throw new Error('Không có shot ' + shotId);
  const w = when(s.at, s.dur);
  const frames = Array.isArray(w) ? w : [w];
  return frames.map((f, i) => {
    if (f < 0 || f >= s.dur) throw new Error(`${id}: mốc ${f} nằm ngoài shot ${shotId} (dài ${s.dur})`);
    return { id: frames.length > 1 ? `${id}.${i + 1}` : id, shot: shotId, frame: s.start + f, file: `audio/sfx/${file}.wav`, level, volume: LEVEL[level] * MASTER };
  });
});

export const CUES = makeCues(TL, K6B);
export const CUES34 = makeCues(TL34, K6B_34);
export const CUES35 = makeCues(TL35, K6B_35);
