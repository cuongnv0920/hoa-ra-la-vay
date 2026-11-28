// Cắt bớt khoảng lặng giữa các câu trong giọng đọc video 011 bản 3.4 (không gọi ElevenLabs).
// Chạy từ gốc repo: node pipeline/voice-v34-011.js [mức nghỉ giữ lại, mặc định 0.25] [ngưỡng cắt, mặc định 0.4] [thư mục giọng, mặc định v34] [file script, mặc định script-v3.4.json]
// Bản 3.5: node pipeline/voice-v34-011.js 0.25 0.4 v36-single script-v3.5.json 0.95   (tham số cuối: hệ số tempo, 0.95 = chậm 5%)
// Đầu vào : assets/audio/v34/scene-NN.mp3 + scene-NN.alignment.json (turbo, speed 1.2) + script/script-v3.4.json
// Đầu ra  : assets/audio/v34/cat/scene-NN.mp3, scene-NN.alignment.json (mốc đã quy đổi), timings.json, bao-cao-nghi.json
// Quy tắc: khoảng nghỉ giữa hai câu dài hơn NGƯỠNG thì rút còn MỨC (chia đều hai bên chỗ cắt). Giữ nguyên mọi chỗ ngắn hơn ngưỡng.
// ffmpeg: bản đi kèm Remotion (có atrim, concat; không có afade/volumedetect).
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const KEEP = +(process.argv[2] || 0.25);
const THRESH = +(process.argv[3] || 0.4);
const DIR = process.argv[4] || 'v34'; // thư mục giọng: v34 hoặc v35
const SCRIPT = process.argv[5] || 'script-v3.4.json';
const TEMPO = +(process.argv[6] || 1); // làm chậm (<1) hoặc nhanh (>1) toàn bộ sau khi cắt lặng; 0.95 = chậm 5%, giữ cao độ
const ROOT = path.join(__dirname, '..');
const FF = path.join(ROOT, 'node_modules', '@remotion', 'compositor-win32-x64-msvc', 'ffmpeg.exe');
const P = path.join(ROOT, 'projects', '011-phanh-tai-sinh');
const SRC = path.join(P, 'assets', 'audio', DIR);
const OUT = path.join(SRC, 'cat');
fs.mkdirSync(OUT, { recursive: true });
const script = JSON.parse(fs.readFileSync(path.join(P, 'script', SCRIPT), 'utf8'));
const timings = JSON.parse(fs.readFileSync(path.join(SRC, 'timings.json'), 'utf8'));
const out = { ...timings, trim: { keep_s: KEEP, threshold_s: THRESH, note: 'Khoảng nghỉ giữa câu > ngưỡng được rút còn mức giữ lại; mốc alignment đã quy đổi.' }, scenes: {} };
const report = [];

for (const sc of script.scenes) {
  const id = String(sc.scene).padStart(2, '0');
  const al = JSON.parse(fs.readFileSync(path.join(SRC, `scene-${id}.alignment.json`), 'utf8'));
  const text = al.characters.join('');
  const st = al.character_start_times_seconds;
  const en = al.character_end_times_seconds;
  const total = timings.scenes[String(sc.scene)].seconds;
  // các câu: [bắt đầu, kết thúc] theo mốc ký tự
  const sents = [...text.matchAll(/[^.?!]+[.?!]+/g)].map((m) => ({ t0: st[m.index + m[0].match(/^\s*/)[0].length], t1: en[m.index + m[0].length - 1] }));
  // các đoạn cắt: [từ, đến, bớt]
  const cuts = [];
  for (let i = 1; i < sents.length; i++) {
    const gap = sents[i].t0 - sents[i - 1].t1;
    if (gap > THRESH) {
      const remove = gap - KEEP;
      const from = sents[i - 1].t1 + KEEP / 2;
      cuts.push({ from, to: from + remove, remove, gap });
      report.push({ scene: sc.script_label, at_s: +sents[i - 1].t1.toFixed(2), gap_s: +gap.toFixed(2), after_s: KEEP });
    }
  }
  // đoạn giữ lại
  const keep = [];
  let cur = 0;
  for (const c of cuts) { keep.push([cur, c.from]); cur = c.to; }
  keep.push([cur, total]);
  const dst = path.join(OUT, `scene-${id}.mp3`);
  if (cuts.length) {
    const parts = keep.map(([a, b], i) => `[0:a]atrim=start=${a.toFixed(4)}:end=${b.toFixed(4)},asetpts=PTS-STARTPTS[p${i}]`).join(';');
    const cat = keep.map((_, i) => `[p${i}]`).join('') + `concat=n=${keep.length}:v=0:a=1[o]`;
    execFileSync(FF, ['-v', 'error', '-y', '-i', path.join(SRC, `scene-${id}.mp3`), '-filter_complex', `${parts};${cat}`, '-map', '[o]', '-ar', '44100', '-ac', '1', '-c:a', 'libmp3lame', '-q:a', '2', dst]);
  } else {
    execFileSync(FF, ['-v', 'error', '-y', '-i', path.join(SRC, `scene-${id}.mp3`), '-ar', '44100', '-ac', '1', '-c:a', 'libmp3lame', '-q:a', '2', dst]);
  }
  if (TEMPO !== 1) {
    const tmp = dst.replace('.mp3', '.tmp.mp3');
    execFileSync(FF, ['-v', 'error', '-y', '-i', dst, '-af', 'atempo=' + TEMPO, '-ar', '44100', '-ac', '1', '-c:a', 'libmp3lame', '-q:a', '2', tmp]);
    fs.renameSync(tmp, dst);
  }
  // quy đổi mốc: trừ phần đã cắt nằm trước mỗi thời điểm
  const shift = (t) => {
    let d = 0;
    for (const c of cuts) {
      if (t >= c.to) d += c.remove;
      else if (t > c.from) d += t - c.from; // nằm trong vùng bị cắt (không xảy ra với mốc ký tự)
    }
    return +(t - d).toFixed(4);
  };
  const scaled = { ...al, character_start_times_seconds: st.map((x) => +(shift(x) / TEMPO).toFixed(4)), character_end_times_seconds: en.map((x) => +(shift(x) / TEMPO).toFixed(4)) };
  fs.writeFileSync(path.join(OUT, `scene-${id}.alignment.json`), JSON.stringify(scaled));
  const removed = cuts.reduce((a, c) => a + c.remove, 0);
  const t0 = timings.scenes[String(sc.scene)];
  out.scenes[String(sc.scene)] = { ...t0, file: `scene-${id}.mp3`, seconds: +((total - removed) / TEMPO).toFixed(2), tempo: TEMPO, cuts: cuts.length, removed_s: +removed.toFixed(2) };
  console.log(`Cảnh ${sc.script_label.padEnd(3)}: ${total.toFixed(1)} s → ${(total - removed).toFixed(1)} s | cắt ${cuts.length} chỗ, bớt ${removed.toFixed(2)} s`);
}
fs.writeFileSync(path.join(OUT, 'timings.json'), JSON.stringify(out, null, 2) + '\n');
fs.writeFileSync(path.join(OUT, 'bao-cao-nghi.json'), JSON.stringify(report, null, 1) + '\n');
console.log('Tổng chỗ cắt:', report.length, '| tổng giọng sau cắt:', Object.values(out.scenes).reduce((a, s) => a + s.seconds, 0).toFixed(1), 's');
