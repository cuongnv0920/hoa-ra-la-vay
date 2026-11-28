// Cắt bản thu liền thành từng cảnh tại KHOẢNG LẶNG THẬT giữa hai cảnh. Dùng bởi pipeline/giong.js (`doc`, `chia`).
// Không cắt theo mốc ký tự của ElevenLabs: mốc đó lệch cỡ 0,1–0,2 s, làm đuôi cảnh trước dính đầu chữ của cảnh sau
// (video 003, 2026-11-28: nghe "Hai… Hai đồng tới bánh xe").
const fs = require('fs');

const BUOC = 0.01; // mỗi ô năng lượng 10 ms
const HZ = 16000;

// mốc [hết cảnh trước, bắt đầu cảnh sau] cho mỗi chỗ nối
function timLang({ full, al, ranges, ffmpeg, tmp }) {
  ffmpeg(['-i', full, '-ar', String(HZ), '-ac', '1', '-c:a', 'pcm_s16le', tmp]);
  const buf = fs.readFileSync(tmp);
  fs.unlinkSync(tmp);
  const from = buf.indexOf('data') + 8;
  const n = Math.floor((buf.length - from) / 2);
  const step = HZ * BUOC;
  const env = [];
  for (let i = 0; i < n; i += step) {
    let s = 0;
    const m = Math.min(step, n - i);
    for (let k = 0; k < m; k++) s += buf.readInt16LE(from + (i + k) * 2) ** 2;
    env.push(Math.sqrt(s / m));
  }
  const nguong = [...env].sort((a, b) => a - b)[Math.floor(env.length * 0.95)] * 0.04;
  const canhBao = [];
  const noi = [];
  for (let i = 1; i < ranges.length; i++) {
    const a = al.character_end_times_seconds[ranges[i - 1][1] - 1];
    const b = al.character_start_times_seconds[ranges[i][0]];
    const lo = Math.max(0, Math.round((a - 0.45) / BUOC));
    const hi = Math.min(env.length, Math.round((b + 0.2) / BUOC));
    let best = null;
    for (let k = lo, s = -1; k <= hi; k++) {
      const lang = k < hi && env[k] < nguong;
      if (lang && s < 0) s = k;
      if (!lang && s >= 0) {
        if (!best || k - s > best[1] - best[0]) best = [s, k];
        s = -1;
      }
    }
    if (!best || best[1] - best[0] < 4) {
      canhBao.push(`chỗ nối cảnh ${i}→${i + 1}: không thấy khoảng lặng, cắt giữa hai mốc, cần nghe`);
      noi.push([(a + b) / 2, (a + b) / 2]);
      continue;
    }
    const [s0, s1] = [best[0] * BUOC, best[1] * BUOC];
    const len = s1 - s0;
    noi.push([s0 + Math.min(0.1, len / 2), s1 - Math.min(0.04, len / 2)]);
  }
  return { noi, tong: n / HZ, canhBao };
}

// Ghi scene-NN.mp3 + alignment cho từng cảnh; trả về thời lượng thật của mỗi file.
function chiaCanh({ full, al, scenes, ranges, ffmpeg, MP3, sceneFile, tmp }) {
  const { noi, tong, canhBao } = timLang({ full, al, ranges, ffmpeg, tmp });
  canhBao.forEach((c) => console.log('  CẢNH BÁO ' + c));
  return scenes.map((s, i) => {
    const [a, b] = ranges[i];
    const t0 = i ? noi[i - 1][1] : 0;
    const t1 = i < scenes.length - 1 ? noi[i][0] : tong;
    ffmpeg(['-i', full, '-filter_complex', `[0:a]atrim=start=${t0.toFixed(4)}:end=${t1.toFixed(4)},asetpts=PTS-STARTPTS[o]`, '-map', '[o]', ...MP3, sceneFile(s.scene, 'mp3')]);
    const dai = t1 - t0;
    const rel = (t) => +Math.min(dai, Math.max(0, t - t0)).toFixed(4);
    const end = al.character_end_times_seconds.slice(a, b).map(rel);
    end[end.length - 1] = +dai.toFixed(4); // giữ trọn đuôi file khi cắt nghỉ
    const sub = { characters: al.characters.slice(a, b), character_start_times_seconds: al.character_start_times_seconds.slice(a, b).map(rel), character_end_times_seconds: end };
    fs.writeFileSync(sceneFile(s.scene, 'alignment.json'), JSON.stringify(sub));
    return +dai.toFixed(2);
  });
}

module.exports = { chiaCanh };
