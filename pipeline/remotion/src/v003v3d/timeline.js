// Dòng thời gian demo v3.2: script-v3.2.json + storyboard-v3.2.json + alignment ElevenLabs (giọng speed 0.90).
import aligns from '../../../../projects/003-tien-xang-di-dau/assets/audio/giong-v4/cat/alignments.json';
import { nhipMoi } from '../giongmoi/nhip';
import script from '../../../../projects/003-tien-xang-di-dau/script/script-v3.2.json';
import board from '../../../../projects/003-tien-xang-di-dau/assets/storyboard-v3.2.json';
import a1 from '../../../../projects/003-tien-xang-di-dau/assets/audio/v3.2/scene-01.alignment.json';
import a2 from '../../../../projects/003-tien-xang-di-dau/assets/audio/v3.2/scene-02.alignment.json';
import a3 from '../../../../projects/003-tien-xang-di-dau/assets/audio/v3.2/scene-03.alignment.json';
import a4 from '../../../../projects/003-tien-xang-di-dau/assets/audio/v3.2/scene-04.alignment.json';
import a5 from '../../../../projects/003-tien-xang-di-dau/assets/audio/v3.2/scene-05.alignment.json';
import a6 from '../../../../projects/003-tien-xang-di-dau/assets/audio/v3.2/scene-06.alignment.json';
import a7 from '../../../../projects/003-tien-xang-di-dau/assets/audio/v3.2/scene-07.alignment.json';
import a8 from '../../../../projects/003-tien-xang-di-dau/assets/audio/v3.2/scene-08.alignment.json';

export const FPS = 30;
const ALIGN = [a1, a2, a3, a4, a5, a6, a7, a8];
const LEAD = Math.round(board.lead_s * FPS);
const TAIL = Math.round(board.tail_s * FPS);
const OUTRO = Math.round(board.outro_s * FPS);
const MAX_CHARS = 34; // một cụm phụ đề ≤ 2 dòng

// Cụm từ không tách đôi giữa hai dòng phụ đề
const KEEP = ['chuyển động', 'bánh xe', 'đèn đỏ', 'không khí', 'tiêu thụ', 'hai đồng', 'mười đồng', 'đồng trong mười đồng', 'quãng đường', 'sức cản của gió', 'cách tính', 'năng lượng', 'Việt Nam', 'được nước làm mát', 'phần lớn', 'toàn bộ nhiệt', 'thành nhiệt', 'chi phí', 'lực cản', 'lốp lăn', 'trên đường', 'máy phát', 'hộp số', 'điều hòa', 'một phần', 'phần tới', 'ở Việt'];
const plain = (words) => words.map((w) => w.w.toLowerCase().replace(/[.,:;?!]/g, '')).join(' ');
const breaksPhrase = (words, i) =>
  KEEP.some((phrase) => {
    const p = phrase.toLowerCase().split(' ');
    for (let k = 1; k < p.length; k++) if (i - k >= 0 && plain(words.slice(i - k, i - k + p.length)) === p.join(' ')) return true;
    return false;
  });

// Chữ + mốc frame (cục bộ theo cảnh) từ alignment từng ký tự.
function wordsOf(al) {
  const text = al.characters.join('');
  return [...text.matchAll(/\S+/g)].map((m) => ({
    w: m[0],
    start: LEAD + Math.round(al.character_start_times_seconds[m.index] * FPS),
    end: LEAD + Math.round(al.character_end_times_seconds[m.index + m[0].length - 1] * FPS),
  }));
}

// Cắt phụ đề theo câu; câu dài chia đôi dần, ưu tiên ngắt ở dấu phẩy gần giữa.
function split(words) {
  const len = words.map((w) => w.w).join(' ').length;
  if (len <= MAX_CHARS * 1.15 || words.length < 4) return [words];
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
  let t = 0;
  script.scenes.forEach((s, i) => {
    const al = align[i];
    if (al.characters.join('') !== s.voiceover) throw new Error(`Cảnh ${s.scene}: audio không khớp lời đọc v3, tạo lại giọng`);
    const voiceSec = al.character_end_times_seconds[al.character_end_times_seconds.length - 1];
    const frames = lead + Math.ceil(voiceSec * FPS) + tail + (i === script.scenes.length - 1 ? OUTRO : 0);
    const starts = board.shots
      .filter((x) => x.scene === s.scene)
      .map((x) => {
        const at = s.voiceover.indexOf(x.cue);
        if (at < 0) throw new Error(`Shot ${x.id}: không thấy cue "${x.cue}"`);
        return { ...x, start: at === 0 ? 0 : lead + Math.round(al.character_start_times_seconds[at] * FPS) };
      });
    const shots = starts.map((x, k) => ({ id: x.id, headline: x.headline, start: x.start, dur: (k < starts.length - 1 ? starts[k + 1].start : frames) - x.start }));
    scenes.push({
      scene: s.scene,
      start: t,
      frames,
      audio: v.audio ? v.audio(s.scene) : `${board.voice.dir}/scene-${String(s.scene).padStart(2, '0')}.mp3`,
      audioFrom: lead,
      shots,
      chunks: v.chunks ? v.chunks(i, frames) : chunksOf(wordsOf(al), frames),
    });
    t += frames;
  });
  // T(id) → mốc frame toàn cục; at(scene, cụm) → frame toàn cục khi cụm được đọc
  const T = (id) => {
    for (const sc of scenes) {
      const sh = sc.shots.find((x) => x.id === id);
      if (sh) return { a: sc.start + sh.start, b: sc.start + sh.start + sh.dur };
    }
    throw new Error('Không có shot ' + id);
  };
  const at = (scene, phrase) => {
    const i = script.scenes.findIndex((x) => x.scene === scene);
    const c = script.scenes[i].voiceover.indexOf(phrase);
    if (c < 0) throw new Error(`Cảnh ${scene}: không thấy "${phrase}"`);
    return scenes[i].start + lead + Math.round(align[i].character_start_times_seconds[c] * FPS);
  };
  return { scenes, total: t, T, at };
}

export const TL = build();

// Biến thể giọng nhịp mới (2026-11-28): cùng chữ, giờ lấy từ giong-v4.
export const TLM = build(nhipMoi({ oldScript: script, aligns, keep: KEEP }));
