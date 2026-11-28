// Giọng đọc CHUẨN của kênh (chốt 2026-11-28, từ video 011 bản 3.5). Quy chuẩn và lý do: brand/nhip-doc.md.
// Dùng cho mọi video mới. Chạy từ gốc repo:
//   node --env-file=.env pipeline/giong.js doc  <project-dir> [--script script.json] [--out giong] [--thu] [--force]
//        Đọc CẢ KỊCH BẢN trong một lần thu rồi cắt thành từng cảnh. --thu: chỉ in cấu hình và số ký tự, không gọi API.
//   node pipeline/giong.js cat  <project-dir> [--script script.json] [--out giong]
//        Rút khoảng nghỉ giữa câu và chỉnh tempo (không tốn credits). Ra <out>/cat/ : bản dùng để dựng.
//   node pipeline/giong.js do   <project-dir> [--script script.json] [--out giong]
//        Đo nhịp bản <out>/cat/ và so với mức chuẩn.
//   node --env-file=.env pipeline/giong.js canh <project-dir> <số cảnh> <seed1,seed2,...> [--script ...] [--out giong] [--tag A] [--text "..."]
//        Tạo lại MỘT cảnh đọc sai với nhiều seed, ra <out>/thu/.
//   node pipeline/giong.js chon <project-dir> <số cảnh> <file .mp3 trong <out>/thu/> [--out giong]
//        Lấy bản đã nghe và chọn thay cảnh đó (bản cũ được giữ trong <out>/thu/). Chạy lại `cat` sau đó.
// File mp3 bị .gitignore; alignment và timings.json được commit. Không bao giờ in ra API key.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

// Mức chuẩn. Đổi ở đây thì cập nhật brand/nhip-doc.md.
const CHUAN = {
  model: 'eleven_turbo_v2_5', // eleven_v4 bỏ qua tham số speed
  settings: { stability: 0.75, similarity_boost: 0.4, style: 0, speed: 1.15, use_speaker_boost: true },
  seed: 11,
  giu: 0.25, // nghỉ giữa câu sau khi rút (s)
  nguong: 0.4, // chỉ rút chỗ nghỉ dài hơn mức này (s)
  tempo: 0.95, // chậm 5%, giữ cao độ
};

const args = process.argv.slice(2);
const flag = (n) => args.includes('--' + n);
const opt = (n, d) => { const i = args.indexOf('--' + n); return i >= 0 ? args[i + 1] : d; };
const pos = args.filter((a, i) => !a.startsWith('--') && !(i > 0 && args[i - 1].startsWith('--') && !['--thu', '--force'].includes(args[i - 1])));
const [lenh, projectDir, sceneArg, extraArg] = pos;
const die = (m) => { console.error(m); process.exit(1); };
if (!['doc', 'cat', 'do', 'canh', 'chon'].includes(lenh) || !projectDir) die('Cú pháp: node pipeline/giong.js <doc|cat|do|canh|chon> <project-dir> ...  (xem đầu file)');

const ROOT = path.join(__dirname, '..');
const FF = path.join(ROOT, 'node_modules', '@remotion', 'compositor-win32-x64-msvc', 'ffmpeg.exe');
const OUT = path.join(projectDir, 'assets', 'audio', opt('out', 'giong'));
const CAT = path.join(OUT, 'cat');
const THU = path.join(OUT, 'thu');
const pad = (n) => String(n).padStart(2, '0');
const sceneFile = (dir, n, ext) => path.join(dir, `scene-${pad(n)}.${ext}`);
const readJson = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const writeJson = (f, o) => fs.writeFileSync(f, JSON.stringify(o, null, 2) + '\n');
const ffmpeg = (a) => execFileSync(FF, ['-v', 'error', '-y', ...a]);
const MP3 = ['-ar', '44100', '-ac', '1', '-c:a', 'libmp3lame', '-q:a', '2'];
const readScript = () => readJson(path.join(projectDir, 'script', opt('script', 'script.json')));
const label = (s) => String(s.script_label || s.scene);

// Các câu trong một cảnh: chữ và mốc theo alignment.
const sentencesOf = (al) => {
  const text = al.characters.join('');
  return [...text.matchAll(/[^.?!]+[.?!]*/g)].filter((m) => m[0].trim()).map((m) => {
    const a = m.index + m[0].match(/^\s*/)[0].length;
    const b = m.index + m[0].trimEnd().length - 1;
    return { text: m[0].trim(), t0: al.character_start_times_seconds[a], t1: al.character_end_times_seconds[b] };
  });
};

async function elevenlabs(voiceId, body) {
  const KEY = process.env.ELEVENLABS_API_KEY;
  if (!KEY) die('Thiếu ELEVENLABS_API_KEY trong .env');
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/with-timestamps?output_format=mp3_44100_128`;
  const r = await fetch(url, { method: 'POST', headers: { 'xi-api-key': KEY, 'Content-Type': 'application/json' }, body: JSON.stringify({ model_id: CHUAN.model, voice_settings: CHUAN.settings, language_code: 'vi', ...body }) });
  const txt = await r.text();
  if (!r.ok) throw new Error(`HTTP ${r.status}: ${txt.slice(0, 400)}`);
  return JSON.parse(txt);
}

async function doc() {
  const script = readScript();
  const voiceId = script.voice && script.voice.voice_id;
  if (!voiceId) die('script.json thiếu voice.voice_id');
  let text = '';
  const range = script.scenes.map((s) => { text += (text ? ' ' : '') + s.voiceover; return [text.length - s.voiceover.length, text.length]; });
  const st = CHUAN.settings;
  console.log(`${CHUAN.model} | speed ${st.speed} stability ${st.stability} similarity ${st.similarity_boost} seed ${CHUAN.seed} | ${script.scenes.length} cảnh, ${text.length} ký tự → ${OUT}`);
  if (flag('thu')) return console.log('Bản thử: không gọi ElevenLabs.');
  if (fs.existsSync(path.join(OUT, 'tron-bai.mp3')) && !flag('force')) die('Đã có bản thu trong thư mục này. Dùng --out khác (giữ bản cũ) hoặc --force.');
  fs.mkdirSync(OUT, { recursive: true });
  const res = await elevenlabs(voiceId, { text, seed: CHUAN.seed });
  const full = path.join(OUT, 'tron-bai.mp3');
  fs.writeFileSync(full, Buffer.from(res.audio_base64, 'base64'));
  const al = res.alignment;
  writeJson(path.join(OUT, 'tron-bai.alignment.json'), al);
  if (al.characters.join('') !== text) die('alignment không khớp lời đọc');
  const timings = { model: CHUAN.model, mode: 'single', settings: st, seed: CHUAN.seed, scenes: {} };
  script.scenes.forEach((s, i) => {
    const [a, b] = range[i];
    const t0 = Math.max(0, al.character_start_times_seconds[a] - 0.05);
    const t1 = al.character_end_times_seconds[b - 1] + 0.08;
    ffmpeg(['-i', full, '-filter_complex', `[0:a]atrim=start=${t0.toFixed(4)}:end=${t1.toFixed(4)},asetpts=PTS-STARTPTS[o]`, '-map', '[o]', ...MP3, sceneFile(OUT, s.scene, 'mp3')]);
    const sub = {
      characters: al.characters.slice(a, b),
      character_start_times_seconds: al.character_start_times_seconds.slice(a, b).map((t) => +(t - t0).toFixed(4)),
      character_end_times_seconds: al.character_end_times_seconds.slice(a, b).map((t) => +(t - t0).toFixed(4)),
    };
    fs.writeFileSync(sceneFile(OUT, s.scene, 'alignment.json'), JSON.stringify(sub));
    const seconds = +sub.character_end_times_seconds.at(-1).toFixed(2);
    timings.scenes[s.scene] = { file: `scene-${pad(s.scene)}.mp3`, seconds, chars: s.voiceover.length, words: s.voiceover.split(/\s+/).filter(Boolean).length, generated: new Date().toISOString() };
    console.log(`Cảnh ${label(s)}: ${seconds} s`);
  });
  writeJson(path.join(OUT, 'timings.json'), timings);
  console.log('Tiếp: node pipeline/giong.js cat <project-dir>');
}

function cat() {
  const script = readScript();
  const timings = readJson(path.join(OUT, 'timings.json'));
  fs.mkdirSync(CAT, { recursive: true });
  const out = { ...timings, trim: { keep_s: CHUAN.giu, threshold_s: CHUAN.nguong, tempo: CHUAN.tempo }, scenes: {} };
  const report = [];
  let sum = 0;
  for (const sc of script.scenes) {
    const al = readJson(sceneFile(OUT, sc.scene, 'alignment.json'));
    const st = al.character_start_times_seconds;
    const en = al.character_end_times_seconds;
    const total = +en.at(-1).toFixed(2);
    const sents = sentencesOf(al);
    const cuts = [];
    for (let i = 1; i < sents.length; i++) {
      const gap = sents[i].t0 - sents[i - 1].t1;
      if (gap <= CHUAN.nguong) continue;
      const remove = gap - CHUAN.giu;
      const from = sents[i - 1].t1 + CHUAN.giu / 2;
      cuts.push({ from, to: from + remove, remove });
      report.push({ scene: label(sc), at_s: +sents[i - 1].t1.toFixed(2), gap_s: +gap.toFixed(2), after_s: CHUAN.giu });
    }
    const keep = [];
    let cur = 0;
    for (const c of cuts) { keep.push([cur, c.from]); cur = c.to; }
    keep.push([cur, total]);
    const src = sceneFile(OUT, sc.scene, 'mp3');
    const dst = sceneFile(CAT, sc.scene, 'mp3');
    const parts = keep.map(([a, b], i) => `[0:a]atrim=start=${a.toFixed(4)}:end=${b.toFixed(4)},asetpts=PTS-STARTPTS[p${i}]`).join(';');
    const joined = keep.map((_, i) => `[p${i}]`).join('') + `concat=n=${keep.length}:v=0:a=1[c];[c]atempo=${CHUAN.tempo}[o]`;
    if (cuts.length) ffmpeg(['-i', src, '-filter_complex', `${parts};${joined}`, '-map', '[o]', ...MP3, dst]);
    else ffmpeg(['-i', src, '-af', `atempo=${CHUAN.tempo}`, ...MP3, dst]);
    const shift = (t) => t - cuts.reduce((d, c) => d + (t >= c.to ? c.remove : t > c.from ? t - c.from : 0), 0);
    const scale = (t) => +(shift(t) / CHUAN.tempo).toFixed(4);
    fs.writeFileSync(sceneFile(CAT, sc.scene, 'alignment.json'), JSON.stringify({ ...al, character_start_times_seconds: st.map(scale), character_end_times_seconds: en.map(scale) }));
    const removed = cuts.reduce((a, c) => a + c.remove, 0);
    const seconds = +((total - removed) / CHUAN.tempo).toFixed(2);
    sum += seconds;
    out.scenes[sc.scene] = { ...timings.scenes[sc.scene], seconds, cuts: cuts.length, removed_s: +removed.toFixed(2) };
    console.log(`Cảnh ${label(sc)}: ${total} s → ${seconds} s | cắt ${cuts.length} chỗ`);
  }
  writeJson(path.join(CAT, 'timings.json'), out);
  writeJson(path.join(CAT, 'bao-cao-nghi.json'), report);
  console.log(`Cắt ${report.length} chỗ; tổng giọng ${sum.toFixed(1)} s → ${CAT}`);
}

function doNhip() {
  const script = readScript();
  let syl = 0, speech = 0, inScene = 0, maxGap = 0, total = 0;
  const long = [];
  const lengths = [];
  for (const sc of script.scenes) {
    const al = readJson(sceneFile(CAT, sc.scene, 'alignment.json'));
    const sents = sentencesOf(al);
    sents.forEach((s, i) => {
      const n = s.text.split(/[\s-]+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
      syl += n;
      speech += s.t1 - s.t0;
      lengths.push(n);
      if (n > 10) long.push(`  cảnh ${label(sc)} (${n}): ${s.text}`);
      if (i) maxGap = Math.max(maxGap, s.t0 - sents[i - 1].t1);
    });
    inScene += sents.at(-1).t1 - sents[0].t0;
    total += al.character_end_times_seconds.at(-1);
  }
  lengths.sort((a, b) => a - b);
  const row = (name, value, ok, want) => console.log(`${ok ? 'đạt ' : 'LỆCH'} ${name}: ${value} (chuẩn ${want})`);
  const a = syl / speech, b = syl / inScene, med = lengths[Math.floor(lengths.length / 2)];
  row('tốc độ trong câu', `${a.toFixed(2)} âm tiết/s`, a >= 4.3 && a <= 4.9, '4,3–4,9; bản 011 là 4,57');
  row('tốc độ tính cả nghỉ', `${b.toFixed(2)} âm tiết/s`, b >= 3.8 && b <= 4.3, '3,8–4,3; bản 011 là 4,00');
  row('nghỉ giữa câu dài nhất', `${maxGap.toFixed(2)} s`, maxGap <= 0.45, '≤ 0,45 s');
  row('độ dài câu trung vị', `${med} âm tiết`, med <= 7, '≤ 7; bản 011 là 7');
  row('câu trên 10 âm tiết', `${long.length}/${lengths.length}`, long.length <= lengths.length * 0.1, '≤ 10% số câu');
  if (long.length) console.log(long.join('\n'));
  console.log(`Tổng giọng ${total.toFixed(1)} s. Số đo chỉ kiểm nhịp; đọc sai thanh điệu và chất giọng phải do người nghe.`);
}

async function canh() {
  const script = readScript();
  const idx = script.scenes.findIndex((s) => String(s.scene) === String(sceneArg));
  if (idx < 0 || !extraArg) die('Cú pháp: canh <project-dir> <số cảnh> <seed1,seed2,...>');
  const s = script.scenes[idx];
  fs.mkdirSync(THU, { recursive: true });
  for (const seed of extraArg.split(',').map(Number)) {
    const body = { text: opt('text', s.voiceover), seed };
    if (script.scenes[idx - 1]) body.previous_text = script.scenes[idx - 1].voiceover;
    if (script.scenes[idx + 1]) body.next_text = script.scenes[idx + 1].voiceover;
    const res = await elevenlabs(script.voice.voice_id, body);
    const f = path.join(THU, `scene-${pad(s.scene)}-${opt('tag', 'A')}${seed}.mp3`);
    fs.writeFileSync(f, Buffer.from(res.audio_base64, 'base64'));
    fs.writeFileSync(f.replace('.mp3', '.alignment.json'), JSON.stringify(res.alignment));
    console.log(`${f}: ${res.alignment.character_end_times_seconds.at(-1).toFixed(1)} s`);
  }
}

function chon() {
  if (!sceneArg || !extraArg) die('Cú pháp: chon <project-dir> <số cảnh> <file .mp3 trong thu/>');
  const pick = path.join(THU, path.basename(extraArg));
  const pickAl = pick.replace('.mp3', '.alignment.json');
  if (!fs.existsSync(pick) || !fs.existsSync(pickAl)) die(`Không thấy ${pick} (và alignment)`);
  const backup = path.join(THU, `truoc-${path.basename(pick, '.mp3')}`);
  fs.mkdirSync(backup, { recursive: true });
  for (const ext of ['mp3', 'alignment.json']) fs.copyFileSync(sceneFile(OUT, sceneArg, ext), sceneFile(backup, sceneArg, ext));
  fs.copyFileSync(pick, sceneFile(OUT, sceneArg, 'mp3'));
  fs.copyFileSync(pickAl, sceneFile(OUT, sceneArg, 'alignment.json'));
  console.log(`Đã thay cảnh ${sceneArg}; bản cũ ở ${backup}. Chạy lại: node pipeline/giong.js cat ${projectDir}`);
}

Promise.resolve({ doc, cat, do: doNhip, canh, chon }[lenh]()).catch((e) => die('Lỗi: ' + e.message));
