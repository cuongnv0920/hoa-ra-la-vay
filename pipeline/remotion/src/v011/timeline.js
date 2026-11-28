// Dòng thời gian video 011. Hai bản cùng tồn tại:
// - TL   : kịch bản 3.3 (đã duyệt Cổng #2), giọng eleven_v4 tăng nhịp 1,06 (eleven_v4/nhanh/).
// - TL34 : kịch bản 3.4 (nhịp nhanh), giọng eleven_turbo_v2_5 speed 1.2, đã cắt khoảng lặng giữa câu (v34/cat/), nghỉ giữa cảnh 0,3 s.
import board from '../../../../projects/011-phanh-tai-sinh/assets/storyboard.json';
import a1 from '../../../../projects/011-phanh-tai-sinh/assets/audio/eleven_v4/nhanh/scene-01.alignment.json';
import a2 from '../../../../projects/011-phanh-tai-sinh/assets/audio/eleven_v4/nhanh/scene-02.alignment.json';
import a3 from '../../../../projects/011-phanh-tai-sinh/assets/audio/eleven_v4/nhanh/scene-03.alignment.json';
import a4 from '../../../../projects/011-phanh-tai-sinh/assets/audio/eleven_v4/nhanh/scene-04.alignment.json';
import a5 from '../../../../projects/011-phanh-tai-sinh/assets/audio/eleven_v4/nhanh/scene-05.alignment.json';
import a6 from '../../../../projects/011-phanh-tai-sinh/assets/audio/eleven_v4/nhanh/scene-06.alignment.json';
import a7 from '../../../../projects/011-phanh-tai-sinh/assets/audio/eleven_v4/nhanh/scene-07.alignment.json';
import a8 from '../../../../projects/011-phanh-tai-sinh/assets/audio/eleven_v4/nhanh/scene-08.alignment.json';
import a9 from '../../../../projects/011-phanh-tai-sinh/assets/audio/eleven_v4/nhanh/scene-09.alignment.json';
import a10 from '../../../../projects/011-phanh-tai-sinh/assets/audio/eleven_v4/nhanh/scene-10.alignment.json';
import a11 from '../../../../projects/011-phanh-tai-sinh/assets/audio/eleven_v4/nhanh/scene-11.alignment.json';
import b1 from '../../../../projects/011-phanh-tai-sinh/assets/audio/v34/cat/scene-01.alignment.json';
import b2 from '../../../../projects/011-phanh-tai-sinh/assets/audio/v34/cat/scene-02.alignment.json';
import b3 from '../../../../projects/011-phanh-tai-sinh/assets/audio/v34/cat/scene-03.alignment.json';
import b4 from '../../../../projects/011-phanh-tai-sinh/assets/audio/v34/cat/scene-04.alignment.json';
import b5 from '../../../../projects/011-phanh-tai-sinh/assets/audio/v34/cat/scene-05.alignment.json';
import b6 from '../../../../projects/011-phanh-tai-sinh/assets/audio/v34/cat/scene-06.alignment.json';
import b7 from '../../../../projects/011-phanh-tai-sinh/assets/audio/v34/cat/scene-07.alignment.json';
import b8 from '../../../../projects/011-phanh-tai-sinh/assets/audio/v34/cat/scene-08.alignment.json';
import b9 from '../../../../projects/011-phanh-tai-sinh/assets/audio/v34/cat/scene-09.alignment.json';
import b10 from '../../../../projects/011-phanh-tai-sinh/assets/audio/v34/cat/scene-10.alignment.json';
import b11 from '../../../../projects/011-phanh-tai-sinh/assets/audio/v34/cat/scene-11.alignment.json';
import c1 from '../../../../projects/011-phanh-tai-sinh/assets/audio/v36-single/cat/scene-01.alignment.json';
import c2 from '../../../../projects/011-phanh-tai-sinh/assets/audio/v36-single/cat/scene-02.alignment.json';
import c3 from '../../../../projects/011-phanh-tai-sinh/assets/audio/v36-single/cat/scene-03.alignment.json';
import c4 from '../../../../projects/011-phanh-tai-sinh/assets/audio/v36-single/cat/scene-04.alignment.json';
import c5 from '../../../../projects/011-phanh-tai-sinh/assets/audio/v36-single/cat/scene-05.alignment.json';
import c6 from '../../../../projects/011-phanh-tai-sinh/assets/audio/v36-single/cat/scene-06.alignment.json';
import c7 from '../../../../projects/011-phanh-tai-sinh/assets/audio/v36-single/cat/scene-07.alignment.json';
import c8 from '../../../../projects/011-phanh-tai-sinh/assets/audio/v36-single/cat/scene-08.alignment.json';
import c9 from '../../../../projects/011-phanh-tai-sinh/assets/audio/v36-single/cat/scene-09.alignment.json';
import c10 from '../../../../projects/011-phanh-tai-sinh/assets/audio/v36-single/cat/scene-10.alignment.json';
import c11 from '../../../../projects/011-phanh-tai-sinh/assets/audio/v36-single/cat/scene-11.alignment.json';
import script from '../../../../projects/011-phanh-tai-sinh/script/script.json';
import script35 from '../../../../projects/011-phanh-tai-sinh/script/script-v3.5.json';
import script34 from '../../../../projects/011-phanh-tai-sinh/script/script-v3.4.json';

export const FPS = 30;
export const LEAD = Math.round(0.2 * FPS);
export const TAIL = Math.round(0.45 * FPS);
export const OUTRO = Math.round(1.5 * FPS);

// Cụm từ không tách đôi giữa hai cụm phụ đề
const KEEP = ['biến tần', 'xoay chiều', 'một chiều', 'mô-tơ', 'máy tính', 'mạnh hay nhẹ', 'phanh tái sinh', 'má phanh', 'xe điện', 'động cơ xăng', 'máy phát điện', 'xe hybrid', 'đèn xe đạp', 'bánh xe', 'năng lượng', 'Hóa ra'];
const plain = (words) => words.map((w) => w.w.toLowerCase().replace(/[.,:;?!]/g, '')).join(' ');
const breaksPhrase = (words, i) =>
  KEEP.some((phrase) => {
    const p = phrase.toLowerCase().split(' ');
    for (let k = 1; k < p.length; k++) if (i - k >= 0 && plain(words.slice(i - k, i - k + p.length)) === p.join(' ')) return true;
    return false;
  });

// Tìm cụm trong lời đọc, không phân biệt hoa thường và dấu câu giữa các chữ (để đổi cách chấm câu mà mốc vẫn khớp).
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
export function findPhrase(text, phrase) {
  const words = phrase.replace(/[.,:;?!]/g, ' ').trim().split(/\s+/);
  const re = new RegExp(words.map(esc).join('[.,:;?!]*\\s+'), 'i');
  const m = re.exec(text);
  return m ? m.index : -1;
}

export function makeTimeline({ script: sc, align, audioDir, lead, tail, extra = {}, outro, maxChars = 32, maxWords = 99, cueOverride = {}, dropShots = [], gain = {} }) {
  const wordsOf = (al) => {
    const text = al.characters.join('');
    return [...text.matchAll(/\S+/g)].map((m) => ({
      w: m[0],
      start: lead + Math.round(al.character_start_times_seconds[m.index] * FPS),
      end: lead + Math.round(al.character_end_times_seconds[m.index + m[0].length - 1] * FPS),
    }));
  };
  const split = (words) => {
    const len = words.map((w) => w.w).join(' ').length;
    if ((len <= maxChars && words.length <= maxWords) || words.length < 4) return [words];
    let best = 2;
    let score = Infinity;
    for (let i = 2; i <= words.length - 2; i++) {
      const left = words.slice(0, i).map((w) => w.w).join(' ').length;
      const s = Math.abs(left - len / 2) - (/[,:;.]$/.test(words[i - 1].w) ? 12 : 0) + (breaksPhrase(words, i) ? 100 : 0);
      if (s < score) {
        score = s;
        best = i;
      }
    }
    return [...split(words.slice(0, best)), ...split(words.slice(best))];
  };
  const chunksOf = (words, frames) => {
    const sentences = [[]];
    words.forEach((w) => {
      sentences[sentences.length - 1].push(w);
      if (/[.?!]$/.test(w.w)) sentences.push([]);
    });
    const chunks = sentences.filter((s) => s.length).flatMap(split);
    return chunks.map((ws, i) => ({
      words: ws,
      start: ws[0].start,
      end: i < chunks.length - 1 ? chunks[i + 1][0].start : Math.min(frames, ws[ws.length - 1].end + tail),
    }));
  };

  const scenes = [];
  const shots = [];
  let t = 0;
  sc.scenes.forEach((s, i) => {
    const al = align[i];
    if (al.characters.join('') !== s.voiceover) throw new Error(`Cảnh ${s.scene}: audio không khớp lời đọc, tạo lại giọng`);
    const voiceSec = al.character_end_times_seconds[al.character_end_times_seconds.length - 1];
    const last = i === sc.scenes.length - 1;
    const frames = lead + Math.ceil(voiceSec * FPS) + tail + (extra[s.scene] || 0) + (last ? outro : 0);
    // frame cục bộ theo cảnh khi một cụm được đọc
    const at = (phrase) => {
      // phrase có thể là mảng các cách nói; lấy cụm đầu tiên có trong lời đọc (để một mốc dùng được cho nhiều bản kịch bản)
      const list = Array.isArray(phrase) ? phrase : [phrase];
      let c = -1;
      for (const p of list) {
        c = findPhrase(s.voiceover, p);
        if (c >= 0) break;
      }
      if (c < 0) throw new Error(`Cảnh ${s.scene}: không thấy "${list.join(' | ')}"`);
      return lead + Math.round(al.character_start_times_seconds[c] * FPS);
    };
    const mine = board.shots.filter((x) => x.scene === s.scene && !dropShots.includes(x.id)).map((x, k) => ({ ...x, from: k === 0 ? 0 : at(cueOverride[x.id] || x.cue_phrase) }));
    mine.forEach((x, k) => {
      const dur = (k < mine.length - 1 ? mine[k + 1].from : frames) - x.from;
      shots.push({ id: x.id, scene: s.scene, label: s.script_label, headline: x.headline, start: t + x.from, dur, from: x.from, at: (phrase) => at(phrase) - x.from });
    });
    scenes.push({ scene: s.scene, label: s.script_label, start: t, frames, audio: `${audioDir}/scene-${String(s.scene).padStart(2, '0')}.mp3`, audioFrom: lead, gain: gain[s.scene] || 1, at, shots: mine.map((x, k) => ({ id: x.id, from: x.from, headline: x.headline, dur: (k < mine.length - 1 ? mine[k + 1].from : frames) - x.from })), chunks: chunksOf(wordsOf(al), frames) });
    t += frames;
  });
  return { scenes, shots, total: t, dropped: dropShots };
}

// Bản 3.3 (đã duyệt Cổng #2)
export const TL = makeTimeline({
  script,
  align: [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11],
  audioDir: 'audio/eleven_v4/nhanh',
  lead: LEAD,
  tail: TAIL,
  extra: { 7: Math.round(0.4 * FPS) },
  outro: OUTRO,
});

// Bản 3.4 (nhịp nhanh): nghỉ giữa cảnh 0,3 s (lead 0,1 + tail 0,2), 0,4 s sau cảnh 6b; phụ đề ≤ 7 chữ mỗi cụm
export const TL34 = makeTimeline({
  script: script34,
  align: [b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11],
  audioDir: 'audio/v34/cat',
  lead: Math.round(0.1 * FPS),
  tail: Math.round(0.2 * FPS),
  extra: { 7: Math.round(0.1 * FPS) },
  outro: OUTRO,
  maxChars: 36,
  maxWords: 7,
});

// Bản 3.5: từ 3.4, áp dụng 7 điểm chắt lọc từ bản GPT. Giọng v35/cat. Mốc đầu shot đổi theo câu mới.
export const TL35 = makeTimeline({
  script: script35,
  align: [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11],
  audioDir: 'audio/v36-single/cat',
  lead: Math.round(0.1 * FPS),
  tail: Math.round(0.2 * FPS),
  extra: { 7: Math.round(0.1 * FPS) },
  outro: OUTRO,
  maxChars: 36,
  maxWords: 7,
  cueOverride: { '4.3': 'Bánh xe vẫn kéo mô-tơ', '4.4': 'Năng lượng đi theo chiều', '6a.2': 'Trong khi đó', '7.4': 'Nếu bạn đạp phanh mạnh', '9.2': 'cũng dùng phanh tái sinh', '9.3': 'Pin hybrid còn có thể' },
  gain: { 10: 1.12 }, // cảnh 9 tạo riêng, nhỏ hơn các cảnh khác khoảng 1 dB (đo RMS)
  dropShots: ['9.4'], // cảnh 9 chỉ còn hai câu (người dùng viết lại), bỏ hình dây sạc
});

// ---- tiện ích cho khung mẫu cảnh 6b (bản 3.3) ----
const sc6b = TL.scenes.find((s) => s.label === '6b');
export const at6b = sc6b.at;
export const S6B = { frames: sc6b.frames, chunks: sc6b.chunks, audio: sc6b.audio, shots: sc6b.shots };
const MARK6B = { '6b.1': ['phiên dịch', '#FFD23F'], '6b.2': ['xoay chiều', '#19B5FF'], '6b.3': ['một chiều', '#FFD23F'], '6b.4': ['mức hãm', '#FFD23F'] };
S6B.shots = S6B.shots.map((s) => ({ ...s, mark: MARK6B[s.id] }));
