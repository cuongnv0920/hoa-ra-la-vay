// Dòng thời gian video 008: script.json + storyboard.json + alignment ElevenLabs (eleven_v4, speed 0.90).
import aligns from '../../../../projects/008-awd-subaru-va-audi/assets/audio/giong-v4/cat/alignments.json';
import { nhipMoi } from '../giongmoi/nhip';
import board from '../../../../projects/008-awd-subaru-va-audi/assets/storyboard.json';
import a1 from '../../../../projects/008-awd-subaru-va-audi/assets/audio/eleven_v4/scene-01.alignment.json';
import a2 from '../../../../projects/008-awd-subaru-va-audi/assets/audio/eleven_v4/scene-02.alignment.json';
import a3 from '../../../../projects/008-awd-subaru-va-audi/assets/audio/eleven_v4/scene-03.alignment.json';
import a4 from '../../../../projects/008-awd-subaru-va-audi/assets/audio/eleven_v4/scene-04.alignment.json';
import a5 from '../../../../projects/008-awd-subaru-va-audi/assets/audio/eleven_v4/scene-05.alignment.json';
import a6 from '../../../../projects/008-awd-subaru-va-audi/assets/audio/eleven_v4/scene-06.alignment.json';
import a7 from '../../../../projects/008-awd-subaru-va-audi/assets/audio/eleven_v4/scene-07.alignment.json';
import a8 from '../../../../projects/008-awd-subaru-va-audi/assets/audio/eleven_v4/scene-08.alignment.json';
import a9 from '../../../../projects/008-awd-subaru-va-audi/assets/audio/eleven_v4/scene-09.alignment.json';
import script from '../../../../projects/008-awd-subaru-va-audi/script/script.json';

export const FPS = 30;
const ALIGN = [a1, a2, a3, a4, a5, a6, a7, a8, a9];
// Khoảng nghỉ giống video 003 (và giống mốc trong shot-timings.json)
// Giọng đã làm sạch sau bản xem thử (góp ý "xẹt" ở 1:12–1:13): cảnh 4 cắt tiếng nhiễu ở đuôi file, cảnh 5 làm mềm âm "S" đầu câu.
// File gốc giữ nguyên; lệnh tạo ghi trong assets/audio/NGUON-AM-THANH.md.
const AUDIO_FIX = { 4: 'audio/eleven_v4/sua/scene-04.wav', 5: 'audio/eleven_v4/sua/scene-05.wav' };
const LEAD = Math.round(0.2 * FPS);
const TAIL = Math.round(0.45 * FPS);
const OUTRO = Math.round(1.5 * FPS);
const MAX_CHARS = 32; // một cụm phụ đề ≤ 2 dòng; 34 làm câu ở 7.1 rớt một chữ xuống dòng

// Cụm từ không tách đôi giữa hai cụm phụ đề
const KEEP = ['Subaru Forester', 'Audi Q5', 'Q5 quattro', 'máy dọc', 'cầu sau', 'cầu trước', 'bốn bánh', 'dẫn động', 'hộp số', 'đường khô', 'quay lệch', 'toàn thời gian', 'đối xứng', 'vi sai', 'ly hợp', 'nhiều đĩa', 'multi-plate clutch', 'chồng đĩa', 'máy tính', 'sáu mươi', 'bốn mươi', 'phần trăm', 'chân ga', 'quattro ultra', 'A5, A6', 'bộ tách', 'tổn hao', 'nửa giây', 'hai phần mười', 'nhiên liệu', 'thử nghiệm', 'độc lập', 'Hóa ra'];
const plain = (words) => words.map((w) => w.w.toLowerCase().replace(/[.,:;?!]/g, '')).join(' ');
const breaksPhrase = (words, i) =>
  KEEP.some((phrase) => {
    const p = phrase.toLowerCase().split(' ');
    for (let k = 1; k < p.length; k++) if (i - k >= 0 && plain(words.slice(i - k, i - k + p.length)) === p.join(' ')) return true;
    return false;
  });

function wordsOf(al) {
  const text = al.characters.join('');
  return [...text.matchAll(/\S+/g)].map((m) => ({
    w: m[0],
    start: LEAD + Math.round(al.character_start_times_seconds[m.index] * FPS),
    end: LEAD + Math.round(al.character_end_times_seconds[m.index + m[0].length - 1] * FPS),
  }));
}

function split(words) {
  const len = words.map((w) => w.w).join(' ').length;
  if (len <= MAX_CHARS || words.length < 4) return [words];
  let best = 2;
  let score = Infinity;
  for (let i = 2; i <= words.length - 2; i++) {
    const left = words.slice(0, i).map((w) => w.w).join(' ').length;
    const s = Math.abs(left - len / 2) - (/[,:;]$/.test(words[i - 1].w) ? 12 : 0) + (breaksPhrase(words, i) ? 100 : 0);
    if (s < score) {
      score = s;
      best = i;
    }
  }
  return [...split(words.slice(0, best)), ...split(words.slice(best))];
}

function chunksOf(words, frames) {
  const sentences = [[]];
  words.forEach((w) => {
    sentences[sentences.length - 1].push(w);
    if (/[.?!]$/.test(w.w)) sentences.push([]);
  });
  const chunks = sentences.filter((s) => s.length).flatMap(split);
  return chunks.map((ws, i) => ({
    words: ws,
    start: ws[0].start,
    end: i < chunks.length - 1 ? chunks[i + 1][0].start : Math.min(frames, ws[ws.length - 1].end + TAIL),
  }));
}

function build(v = {}) {
  const lead = v.lead ?? LEAD;
  const tail = v.tail ?? TAIL;
  const align = v.align || ALIGN;
  const scenes = [];
  const shots = [];
  let t = 0;
  script.scenes.forEach((s, i) => {
    const al = align[i];
    if (al.characters.join('') !== s.voiceover) throw new Error(`Cảnh ${s.scene}: audio không khớp lời đọc, tạo lại giọng`);
    const voiceSec = al.character_end_times_seconds[al.character_end_times_seconds.length - 1];
    const frames = lead + Math.ceil(voiceSec * FPS) + tail + (i === script.scenes.length - 1 ? OUTRO : 0);
    // frame cục bộ theo cảnh khi một cụm được đọc
    const at = (phrase) => {
      const c = s.voiceover.indexOf(phrase);
      if (c < 0) throw new Error(`Cảnh ${s.scene}: không thấy "${phrase}"`);
      return lead + Math.round(al.character_start_times_seconds[c] * FPS);
    };
    const silent = lead + Math.ceil(voiceSec * FPS) + tail; // shot không lời ở cuối video
    const mine = board.shots.filter((x) => x.scene === s.scene).map((x) => ({ ...x, from: x.cue.startsWith('(không lời') ? silent : s.voiceover.indexOf(x.cue) === 0 ? 0 : at(x.cue) }));
    mine.forEach((x, k) => {
      const dur = (k < mine.length - 1 ? mine[k + 1].from : frames) - x.from;
      shots.push({
        id: x.id,
        scene: s.scene,
        headline: x.headline,
        start: t + x.from,
        dur,
        // mốc (frame tính từ đầu shot) khi một cụm trong cảnh được đọc
        at: (phrase) => at(phrase) - x.from,
      });
    });
    scenes.push({ scene: s.scene, start: t, frames, audio: v.audio ? v.audio(s.scene) : AUDIO_FIX[s.scene] || `audio/eleven_v4/scene-${String(s.scene).padStart(2, '0')}.mp3`, audioFrom: lead, chunks: v.chunks ? v.chunks(i, frames) : chunksOf(wordsOf(al), frames) });
    t += frames;
  });
  return { scenes, shots, total: t };
}

export const TL = build();

// Biến thể giọng nhịp mới (2026-11-28): cùng chữ, giờ lấy từ giong-v4.
export const TLM = build(nhipMoi({ oldScript: script, aligns, keep: KEEP }));
