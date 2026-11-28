// Dựng video cũ theo giọng nhịp mới (brand/nhip-doc.md) mà không đổi mốc hình và mốc tiếng đã viết theo lời cũ.
// Lời mới chỉ khác lời cũ ở dấu câu và chữ hoa, nên: lấy CHỮ của lời cũ, gắn GIỜ của bản thu mới.
// Nhờ vậy at('cụm lời cũ') vẫn đúng. Phụ đề thì cắt theo lời mới.
export const FPS = 30;
const LEAD = Math.round(0.1 * FPS);
const TAIL = Math.round(0.2 * FPS);

const tokens = (text) => [...text.matchAll(/\S+/g)];
const plain = (w) => w.toLowerCase().replace(/[.,:;?!"“”]/g, '');

// alignment "chữ cũ, giờ mới"
function remap(oldText, al) {
  const a = tokens(oldText);
  const b = tokens(al.characters.join(''));
  if (a.length !== b.length || a.some((m, i) => plain(m[0]) !== plain(b[i][0]))) throw new Error('Lời mới khác chữ lời cũ: ' + oldText.slice(0, 40));
  const start = new Array(oldText.length).fill(null);
  const end = new Array(oldText.length).fill(null);
  a.forEach((m, i) => {
    for (let k = 0; k < m[0].length; k++) {
      const j = b[i].index + Math.min(k, b[i][0].length - 1);
      start[m.index + k] = al.character_start_times_seconds[j];
      end[m.index + k] = al.character_end_times_seconds[j];
    }
  });
  let last = 0;
  for (let i = 0; i < oldText.length; i++) {
    if (start[i] === null) start[i] = end[i] = last;
    last = end[i];
  }
  // giữ nguyên thời lượng giọng thật
  end[oldText.length - 1] = al.character_end_times_seconds[al.character_end_times_seconds.length - 1];
  return { characters: oldText.split(''), character_start_times_seconds: start, character_end_times_seconds: end };
}

// Phụ đề: theo câu mới, mỗi cụm ≤ 7 chữ và ≤ 36 ký tự.
function chunksOf(al, frames, keep) {
  const words = tokens(al.characters.join('')).map((m) => ({
    w: m[0],
    start: LEAD + Math.round(al.character_start_times_seconds[m.index] * FPS),
    end: LEAD + Math.round(al.character_end_times_seconds[m.index + m[0].length - 1] * FPS),
  }));
  const breaks = (ws, i) => keep.some((phrase) => {
    const p = phrase.toLowerCase().split(' ');
    for (let k = 1; k < p.length; k++) if (i - k >= 0 && ws.slice(i - k, i - k + p.length).map((x) => plain(x.w)).join(' ') === p.join(' ')) return true;
    return false;
  });
  const split = (ws) => {
    const len = ws.map((x) => x.w).join(' ').length;
    if ((len <= 36 && ws.length <= 7) || ws.length < 4) return [ws];
    let best = 2;
    let score = Infinity;
    for (let i = 2; i <= ws.length - 2; i++) {
      const left = ws.slice(0, i).map((x) => x.w).join(' ').length;
      const s = Math.abs(left - len / 2) - (/[,:;.]$/.test(ws[i - 1].w) ? 12 : 0) + (breaks(ws, i) ? 100 : 0);
      if (s < score) { score = s; best = i; }
    }
    return [...split(ws.slice(0, best)), ...split(ws.slice(best))];
  };
  const sentences = [[]];
  words.forEach((x) => {
    sentences[sentences.length - 1].push(x);
    if (/[.?!]$/.test(x.w)) sentences.push([]);
  });
  const chunks = sentences.filter((s) => s.length).flatMap(split);
  return chunks.map((ws, i) => ({ words: ws, start: ws[0].start, end: i < chunks.length - 1 ? chunks[i + 1][0].start : Math.min(frames, ws[ws.length - 1].end + TAIL) }));
}

// Tham số cho build() của từng timeline. oldScript: script của bản cũ; aligns: giong-v4/cat/alignments.json.
export function nhipMoi({ oldScript, aligns, dir = 'audio/giong-v4/cat', keep = [] }) {
  return {
    lead: LEAD,
    tail: TAIL,
    align: oldScript.scenes.map((s, i) => remap(s.voiceover, aligns[i])),
    chunks: (i, frames) => chunksOf(aligns[i], frames, keep),
    audio: (n) => `${dir}/scene-${String(n).padStart(2, '0')}.mp3`,
  };
}
