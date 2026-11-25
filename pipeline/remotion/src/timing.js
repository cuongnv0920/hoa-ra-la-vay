// Chia lời đọc thành câu và ước tính mốc thời gian mỗi câu theo số ký tự.
// Dùng cho audio tạo trên web (không có alignment). Khi có API, thay bằng
// character_end_times_seconds trong timings.json để khớp chính xác.
const PAUSE_WEIGHT = 12; // "..." ≈ 0,7 s ở nhịp ~16 ký tự/giây
const GAP_WEIGHT = 4; // nghỉ ngắn giữa hai câu

export function sentences(text) {
  return (text.match(/\.\.\.|[^.?!]+[.?!]+/g) || [text])
    .map((s) => s.trim())
    .filter(Boolean);
}

// Trả về [{text, pause, start, end}] theo frame.
export function sentenceWindows(text, totalFrames, leadIn = 0) {
  const parts = sentences(text);
  const weights = parts.map((p) => (p === '...' ? PAUSE_WEIGHT : p.length + GAP_WEIGHT));
  const sum = weights.reduce((a, b) => a + b, 0);
  const usable = totalFrames - leadIn;
  let acc = leadIn;
  return parts.map((p, i) => {
    const start = Math.round(acc);
    acc += (weights[i] / sum) * usable;
    return { text: p, pause: p === '...', start, end: Math.round(acc) };
  });
}

// Tiến độ 0..1 của frame trong khoảng [a, b], có kẹp hai đầu.
export const prog = (f, a, b) => Math.min(1, Math.max(0, (f - a) / Math.max(1, b - a)));
export const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
