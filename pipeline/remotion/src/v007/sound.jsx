// Lớp hiệu ứng chuyển động của video 007 (giọng đọc nằm ở Video007.jsx; không dùng nhạc nền, không có âm thanh môi trường).
// File tự tổng hợp: pipeline/sfx-007.js; sổ nguồn: projects/007-subaru-may-boxer/assets/audio/NGUON-AM-THANH.md.
import { Audio, Sequence, staticFile } from 'remotion';
import { JOIN, M, SLIDE } from './cues';
import { OMEGA } from './parts';
import { TL } from './timeline';

// Hạ chung giọng và hiệu ứng 1 dB như video 005: đỉnh giọng đã sát 0 dBFS.
export const MASTER = 0.89;
// File hiệu ứng chuẩn hóa đỉnh −1 dBFS, nên hệ số ≈ chênh với đỉnh giọng.
// Theo góp ý ở video 005 ("to hơn và nhiều hơn một chút, đừng quá tay"): −21 / −13 / −8 dB.
const LEVEL = { nen: 0.09, nhe: 0.224, vua: 0.4 };

// Các frame trong khoảng [0, d) khi góc quay θ = t0 + OMEGA·f đi qua bội số của `period` độ (cộng `phase`).
const crossings = (t0, period, phase, d, margin = 4) => {
  const out = [];
  for (let k = Math.ceil((t0 - phase) / period); ; k++) {
    const f = (phase + k * period - t0) / OMEGA;
    if (f >= d - margin) break;
    if (f >= 0) out.push(Math.round(f));
  }
  return out;
};

// [id, shot, file, mức, mốc(at, d) → frame hoặc mảng frame trong shot, tốc độ phát]
// Mốc lấy từ cùng hằng số/hàm điều khiển animation (cues.js, góc quay OMEGA), không gõ tay giây.
const SFX = [
  ['A01', '1.1', 'tick', 'nhe', (at, d) => [0, 1, 2, 3].map((i) => Math.round(i * 0.2 * (d - 1))), [1, 1.12, 1.25, 1.4]], // xi-lanh sáng lần lượt
  ['A02', '1.2', 'truot-dung', 'nhe', (at) => M.slide12(at) + SLIDE - 13], // tiếng cộp (0,42 s trong file) rơi vào lúc máy dừng
  ['A03', '2.2', 'click', 'nhe', (at) => M.label22(at) + 4], // nhãn trục khuỷu sáng hẳn
  ['A04', '2.3', 'thup', 'nen', (at, d) => crossings(180, 360, 0, d)], // cặp tô sáng tới điểm trong cùng (θ ≡ 0°)
  ['A05', '2.4', 'bup-gang', 'nhe', (at, d) => crossings(180, 360, 0, d).slice(0, 1)], // găng đưa vào sâu nhất
  ['A06', '2.5', 'click-cao', 'nhe', () => M.chip25()],
  ['A07', '3.2', 'thich', 'nhe', (at, d) => crossings(0, 180, 0, d).filter((f) => f > 0)], // mỗi lần piston đổi chiều
  ['A08', '3.4', 'thich-dap', 'nhe', (at, d) => crossings(0, 180, 0, d).filter((f) => f > 0).slice(0, 1)], // hai mũi tên gặp nhau
  ['A09', '3.5', 're-rung', 'nhe', () => Math.round(180 / OMEGA) - 12], // đỉnh đợt rè trùng lúc máy rung mạnh nhất (θ = 180°)
  ['A10', '3.6', 'cach-co-khi', 'nhe', () => M.shafts36() + SLIDE],
  ['A11', '3.7', 'ting', 'nhe', (at) => M.check37(at) + 10],
  ['A12', '4.2', 'tha-tram', 'nhe', () => M.drop42() + 24], // khối máy chạm chỗ
  ['A13', '4.3', 'whoosh', 'nhe', () => 0],
  ['A14a', '5.3', 'cop-duc', 'nhe', () => M.hit53()],
  ['A14b', '5.3', 'click', 'nhe', (at, d) => M.swap53(at, d) + SLIDE],
  ['A15', '5.4', 'whoosh', 'nhe', () => 0],
  ['A16', '5.6', 'click-tram', 'vua', (at) => M.gear56(at) + SLIDE],
  ['A17a', '6.2', 'click', 'nhe', (at) => M.heads62(at) + 4],
  ['A17b', '6.2', 'click-cao', 'nhe', (at) => M.heads62(at) + 12],
  ['A18', '6.3', 'keng-co-le', 'nhe', (at, d) => [11, 33].map((x) => M.wrench63(at) + x).filter((f) => f < d - 6)], // cờ lê vướng thành khoang
  ['A19', '7.2', 'khop-manh', 'vua', () => M.join72() + JOIN],
  ['A20', '7.5', 'chuong', 'nhe', () => M.name75()],
];

const shotById = (TL, id) => {
  const s = TL.shots.find((x) => x.id === id);
  if (!s) throw new Error('Không có shot ' + id);
  return s;
};

const makeCues = (tl) => SFX.flatMap(([id, shotId, file, level, when, rates]) => {
  const s = shotById(tl, shotId);
  const w = when(s.at, s.dur);
  const frames = Array.isArray(w) ? w : [w];
  return frames.map((f, i) => {
    if (f < 0 || f >= s.dur) throw new Error(`${id}: mốc ${f} nằm ngoài shot ${shotId}`);
    return { id: frames.length > 1 ? `${id}.${i + 1}` : id, shot: shotId, frame: s.start + f, file: `audio/sfx/${file}.wav`, volume: LEVEL[level] * MASTER, rate: rates ? rates[i] : 1 };
  });
});

export const CUES = makeCues(TL);

export const SfxLayer = ({ tl = TL }) =>
  makeCues(tl).map((c) => (
    <Sequence key={c.id} from={c.frame} name={'sfx ' + c.id}>
      <Audio src={staticFile(c.file)} volume={c.volume} playbackRate={c.rate} />
    </Sequence>
  ));
