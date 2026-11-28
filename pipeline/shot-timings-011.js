// Tính mốc shot thật cho video 011 từ alignment của giọng đọc.
// Chạy: node pipeline/shot-timings-011.js
// Đầu vào : projects/011-phanh-tai-sinh/script/script.json, assets/storyboard.json,
//           assets/audio/eleven_v4/nhanh/scene-NN.alignment.json, timings.json
// Đầu ra  : assets/audio/eleven_v4/nhanh/shot-timings.json (cùng dạng video 009)
// Quy ước (như 008, 009): 0,2 s đầu cảnh, 0,45 s cuối cảnh, 1,5 s kết; thêm 0,4 s lặng giữa cảnh 6b và cảnh 7 (storyboard).
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', 'projects', '011-phanh-tai-sinh');
const AUD = path.join(ROOT, 'assets', 'audio', 'eleven_v4', 'nhanh');
const script = JSON.parse(fs.readFileSync(path.join(ROOT, 'script', 'script.json'), 'utf8'));
const sb = JSON.parse(fs.readFileSync(path.join(ROOT, 'assets', 'storyboard.json'), 'utf8'));
const timings = JSON.parse(fs.readFileSync(path.join(AUD, 'timings.json'), 'utf8'));
const LEAD = 0.2, TAIL = 0.45, OUTRO = 1.5, EXTRA = { 7: 0.4 };
const r = (x) => +x.toFixed(2);

let t = 0;
const scenes = [];
const shots = [];
for (const sc of script.scenes) {
  const al = JSON.parse(fs.readFileSync(path.join(AUD, `scene-${String(sc.scene).padStart(2, '0')}.alignment.json`), 'utf8'));
  const chars = al.characters, starts = al.character_start_times_seconds, ends = al.character_end_times_seconds;
  if (chars.join('') !== sc.voiceover) throw new Error('alignment lệch lời đọc ở cảnh ' + sc.scene);
  const voice = timings.scenes[String(sc.scene)].seconds;
  const len = voice + LEAD + TAIL + (EXTRA[sc.scene] || 0);
  scenes.push({ scene: sc.scene, start_s: r(t), voice_s: r(voice), len_s: r(len) });

  // mốc đầu câu trong cảnh
  const sents = sc.voiceover.split(/(?<=[.?!])\s+/);
  const sentStart = []; let pos = 0;
  for (const s of sents) { const i = sc.voiceover.indexOf(s, pos); sentStart.push(starts[i]); pos = i + s.length; }
  const mine = sb.shots.filter((s) => s.scene === sc.scene);
  mine.forEach((s, k) => {
    // sentence đầu của shot: khớp theo cue
    const cueText = s.cue.replace(/^«|»$/g, '');
    const idx = sents.findIndex((x) => cueText.startsWith(x));
    if (idx < 0) throw new Error('không khớp câu cho shot ' + s.id);
    s._abs = k === 0 ? t : t + LEAD + sentStart[idx];
  });
  mine.forEach((s, k) => { s._end = k + 1 < mine.length ? mine[k + 1]._abs : t + len; });
  for (const s of mine) shots.push({ id: s.id, start_s: r(s._abs), dur_s: r(s._end - s._abs) });
  t += len;
}
shots[shots.length - 1].dur_s = r(shots[shots.length - 1].dur_s + OUTRO);
const total = r(t + OUTRO);
fs.writeFileSync(path.join(AUD, 'shot-timings.json'), JSON.stringify({ lead_s: LEAD, tail_s: TAIL, outro_s: OUTRO, total_s: total, scenes, shots }, null, 1) + '\n');
const ds = shots.map((s) => s.dur_s);
console.log('tổng', total, 's | shot', shots.length, '| ngắn nhất', Math.min(...ds), '| dài nhất', Math.max(...ds));
console.log(shots.map((s) => s.id + ':' + s.dur_s).join(' '));
