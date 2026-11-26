// Lớp hiệu ứng chuyển động của video 008 (giọng đọc nằm ở Video008.jsx; không dùng nhạc nền, không có âm thanh môi trường).
// File tự tổng hợp: pipeline/sfx-008.js; sổ nguồn: projects/008-awd-subaru-va-audi/assets/audio/NGUON-AM-THANH.md.
import { Audio, Sequence, staticFile } from 'remotion';
import { M, OPEN, SLIDE } from './cues';
import { RATIO_F } from './parts';
import { TL } from './timeline';

// Hạ chung giọng và hiệu ứng 1 dB như video 005, 007: đỉnh giọng đã sát 0 dBFS.
export const MASTER = 0.89;
// File hiệu ứng chuẩn hóa đỉnh −1 dBFS. Mức như video 007 (người dùng đã nghe, "Tiếng ổn"): −21 / −13 / −8 dB.
const LEVEL = { nen: 0.09, nhe: 0.224, vua: 0.4 };

// Kim đồng hồ cảnh 2.2 quay 10°/frame (cầu sau) và 10·RATIO_F (cầu trước): một tick mỗi nửa vòng.
const dialTicks = (from, to, ratio) => {
  const step = 180 / (10 * ratio);
  const out = [];
  for (let f = from; f < to; f += step) out.push(Math.round(f));
  return out;
};

// [id, shot, file, mức, mốc(at, d) → frame hoặc mảng frame trong shot, tốc độ phát]
// Mốc lấy từ cùng hàm điều khiển animation (cues.js), không gõ tay giây.
const SFX = [
  ['A01', '1.1', 'whoosh', 'nhe', () => M.slide11()],
  ['A02a', '1.2', 'click', 'nhe', () => M.xrayL12() + 8],
  ['A02b', '1.2', 'click-cao', 'nhe', (at, d) => M.xrayR12(at, d) + 8],
  ['A03a', '1.3', 'cach-mo', 'nen', (at) => M.stop13(at) - OPEN], // khe bắt đầu mở
  ['A03b', '1.3', 'quay-cham-dan', 'nen', (at) => M.stop13(at)], // file dài đúng SPIN_DOWN: dừng cùng lúc trục dừng
  ['A04', '1.4', 'click-tram', 'nhe', (at) => M.glow14(at) + 4],
  ['A05f', '2.2', 'tick', 'nen', () => dialTicks(M.dials22() + 4, M.dials22() + 52, RATIO_F), null, 1.12], // cầu trước: dày hơn, cao hơn
  ['A05r', '2.2', 'tick', 'nen', () => dialTicks(M.dials22() + 4, M.dials22() + 52, 1)],
  ['A06', '2.3', 'ket-lop', 'nhe', (at) => M.scrub23(at)],
  ['A07', '2.4', 'thich-dap', 'nhe', () => M.brake24()],
  ['A08', '2.5', 'ting', 'nhe', (at) => M.q25(at) + 4],
  ['A09', '3.1', 'khop-manh', 'vua', () => M.join31() + SLIDE],
  ['A10', '3.4', 'click-cao', 'nhe', (at) => M.neq34(at) + 4],
  ['A11', '4.1', 'cop-duc', 'nhe', (at) => M.cross41(at) + 10], // gạch xong
  ['A12', '4.2', 'whoosh', 'nhe', () => 0],
  ['A13', '4.3', 'tick', 'nen', (at, d) => { const { start, gap } = M.plates43(at, d); return Array.from({ length: 9 }, (_, i) => start + i * gap).filter((f) => f < d - 2); }],
  ['A14', '4.4', 'ma-sat-ngan', 'nen', (at) => M.slip44(at)],
  ['A15', '4.5', 'cach-co-khi', 'vua', () => M.press45() + 36], // lực ép tới mức cao
  ['A16', '4.6', 'click', 'nhe', () => M.brain46() + 1], // chip máy tính bắt đầu hiện
  ['A31', '4.6', 'whoosh', 'nhe', (at, d) => M.zoomOut46(at, d)], // thu ra về cả xe; nằm trong khoảng lặng cuối cảnh 4, xong trước chữ "Subaru" (góp ý bản xem thử: không đè âm "S")
  ['A17', '5.1', 'click-cao', 'nhe', (at) => M.bar51(at) + 6],
  ['A18a', '5.3', 'truot-banh', 'nhe', (at) => M.slip53(at)],
  ['A18b', '5.3', 'cach-co-khi', 'nhe', (at) => M.press53(at) + 8],
  ['A19', '6.1', 'whoosh', 'nhe', () => 0],
  ['A20', '6.2', 'click', 'nhe', (at) => M.hiC62(at) + 4],
  ['A21', '6.3', 'click-cao', 'nhe', (at) => M.hiD63(at) + 4],
  ['A22', '6.4', 'cach-mo', 'nhe', (at) => [M.openC64(at), M.openD64(at)]],
  ['A23', '6.6', 'quay-cham-dan', 'nen', (at) => M.stop66(at)],
  ['A24', '7.1', 'cach-co-khi', 'vua', (at) => M.pull71(at) + 14], // núm kéo hết
  ['A25', '7.3', 'tick', 'nhe', (at) => [0, 6, 12].map((x) => M.head73(at) + x)], // khoảng 0,5 s hiện ra
  ['A26a', '7.4', 'quay-nhanh-dan', 'nen', (at) => M.close74(at)],
  ['A26b', '7.4', 'click-tram', 'nhe', (at) => M.close74(at) + OPEN], // khe đóng hẳn
  ['A27a', '8.1', 'click', 'nhe', () => M.hiA81() + 4],
  ['A27b', '8.1', 'click-cao', 'nhe', (at, d) => M.hiB81(at, d) + 4],
  ['A28', '9.1', 'khop-manh', 'vua', () => M.stamp91() + 3], // dấu đóng xuống
  ['A29', '9.4', 'ting', 'nhe', (at) => M.q94(at) + 4],
  ['A30', '9.5', 'chuong', 'nhe', () => M.name95()],
];

const shotById = (id) => {
  const s = TL.shots.find((x) => x.id === id);
  if (!s) throw new Error('Không có shot ' + id);
  return s;
};

export const CUES = SFX.flatMap(([id, shotId, file, level, when, rates, rate = 1]) => {
  const s = shotById(shotId);
  const w = when(s.at, s.dur);
  const frames = Array.isArray(w) ? w : [w];
  return frames.map((f, i) => {
    if (f < 0 || f >= s.dur) throw new Error(`${id}: mốc ${f} nằm ngoài shot ${shotId}`);
    return { id: frames.length > 1 ? `${id}.${i + 1}` : id, shot: shotId, frame: s.start + f, file: `audio/sfx/${file}.wav`, volume: LEVEL[level] * MASTER, rate: rates ? rates[i] : rate };
  });
});

export const SfxLayer = () =>
  CUES.map((c) => (
    <Sequence key={c.id} from={c.frame} name={'sfx ' + c.id}>
      <Audio src={staticFile(c.file)} volume={c.volume} playbackRate={c.rate} />
    </Sequence>
  ));
