// Tăng nhịp giọng đọc video 011 bằng ffmpeg (giữ cao độ), không tốn credits ElevenLabs. Như video 009 (atempo 1,06).
// Chạy từ gốc repo: node pipeline/voice-nhanh-011.js [hệ số, mặc định 1.06]
// Đầu vào : projects/011-phanh-tai-sinh/assets/audio/eleven_v4/scene-NN.mp3 + scene-NN.alignment.json + timings.json (bản gốc, không sửa)
// Đầu ra  : .../eleven_v4/nhanh/scene-NN.mp3, scene-NN.alignment.json (mốc chia hệ số), timings.json (giây chia hệ số)
// Không làm mép (fade): ffmpeg đi kèm Remotion không có bộ lọc afade.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const K = +(process.argv[2] || 1.06);
const ROOT = path.join(__dirname, '..');
const FF = path.join(ROOT, 'node_modules', '@remotion', 'compositor-win32-x64-msvc', 'ffmpeg.exe');
const SRC = path.join(ROOT, 'projects', '011-phanh-tai-sinh', 'assets', 'audio', 'eleven_v4');
const OUT = path.join(SRC, 'nhanh');
fs.mkdirSync(OUT, { recursive: true });

const timings = JSON.parse(fs.readFileSync(path.join(SRC, 'timings.json'), 'utf8'));
const out = { ...timings, tempo: K, note: `Tăng nhịp ${K}× bằng ffmpeg atempo từ bản gốc; seconds và words_per_min đã quy đổi.`, scenes: {} };

for (let n = 1; n <= 11; n++) {
  const id = String(n).padStart(2, '0');
  const src = path.join(SRC, `scene-${id}.mp3`);
  const dst = path.join(OUT, `scene-${id}.mp3`);
  const al = JSON.parse(fs.readFileSync(path.join(SRC, `scene-${id}.alignment.json`), 'utf8'));
  const sec = al.character_end_times_seconds[al.character_end_times_seconds.length - 1] / K;
  const af = `atempo=${K}`;
  execFileSync(FF, ['-v', 'error', '-y', '-i', src, '-af', af, '-ar', '44100', '-ac', '1', '-c:a', 'libmp3lame', '-q:a', '2', dst]);
  const scaled = { ...al, character_start_times_seconds: al.character_start_times_seconds.map((t) => +(t / K).toFixed(4)), character_end_times_seconds: al.character_end_times_seconds.map((t) => +(t / K).toFixed(4)) };
  fs.writeFileSync(path.join(OUT, `scene-${id}.alignment.json`), JSON.stringify(scaled));
  const t = timings.scenes[String(n)];
  out.scenes[String(n)] = { ...t, file: `scene-${id}.mp3`, seconds: +(t.seconds / K).toFixed(2), words_per_min: Math.round(t.words_per_min * K) };
  console.log(`Cảnh ${n}: ${t.seconds.toFixed(1)} s → ${out.scenes[String(n)].seconds} s | ${out.scenes[String(n)].words_per_min} từ/phút`);
}
fs.writeFileSync(path.join(OUT, 'timings.json'), JSON.stringify(out, null, 2) + '\n');
