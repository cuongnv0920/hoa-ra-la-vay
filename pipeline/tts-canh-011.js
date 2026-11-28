// Tạo lại MỘT cảnh của video 011 với nhiều hạt giống (seed) để chọn bản đọc đúng thanh điệu. Dùng bối cảnh cảnh trước/sau (previous_text, next_text).
// Chạy từ gốc repo:
//   node --env-file=.env pipeline/tts-canh-011.js <script.json> <số cảnh> <thư mục ra> <seed1,seed2,...> [--text "lời đọc thay thế"] [--lead "các câu đã đọc đúng trước đó trong cảnh"] [--tag A] [--speed 1.15] [--stability 0.75] [--similarity 0.4]
// Ra: assets/audio/<thư mục ra>/scene-NN-<tag><seed>.mp3 + .alignment.json
const fs = require('fs');
const path = require('path');
const KEY = process.env.ELEVENLABS_API_KEY;
if (!KEY) { console.error('Thiếu ELEVENLABS_API_KEY trong .env'); process.exit(1); }
const args = process.argv.slice(2);
const [scriptFile, sceneNo, outName, seedList] = args;
const opt = (n, d) => { const i = args.indexOf('--' + n); return i >= 0 ? args[i + 1] : d; };
const P = path.join(__dirname, '..', 'projects', '011-phanh-tai-sinh');
const script = JSON.parse(fs.readFileSync(path.join(P, 'script', scriptFile), 'utf8'));
const idx = script.scenes.findIndex((s) => String(s.scene) === String(sceneNo));
if (idx < 0) { console.error('Không có cảnh ' + sceneNo); process.exit(1); }
const s = script.scenes[idx];
const text = opt('text', s.voiceover);
const settings = { stability: +opt('stability', 0.75), similarity_boost: +opt('similarity', 0.4), style: 0, speed: +opt('speed', 1.15), use_speaker_boost: true };
const outDir = path.join(P, 'assets', 'audio', outName);
fs.mkdirSync(outDir, { recursive: true });
const tag = opt('tag', 'A');
(async () => {
  for (const seed of seedList.split(',').map(Number)) {
    const body = { text, model_id: 'eleven_turbo_v2_5', voice_settings: settings, language_code: 'vi', seed };
    const lead = opt('lead', ''); // các câu đã đọc đúng trong cùng cảnh, làm ngữ cảnh trước
    if (script.scenes[idx - 1] || lead) body.previous_text = [script.scenes[idx - 1] && script.scenes[idx - 1].voiceover, lead].filter(Boolean).join(' ');
    if (script.scenes[idx + 1]) body.next_text = script.scenes[idx + 1].voiceover;
    const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${script.voice.voice_id}/with-timestamps?output_format=mp3_44100_128`, { method: 'POST', headers: { 'xi-api-key': KEY, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const t = await r.text();
    if (!r.ok) { console.error(`seed ${seed}: HTTP ${r.status} ${t.slice(0, 200)}`); continue; }
    const res = JSON.parse(t);
    const f = path.join(outDir, `scene-${String(s.scene).padStart(2, '0')}-${tag}${seed}.mp3`);
    fs.writeFileSync(f, Buffer.from(res.audio_base64, 'base64'));
    fs.writeFileSync(f.replace('.mp3', '.alignment.json'), JSON.stringify(res.alignment));
    console.log(`${path.basename(f)}: ${res.alignment.character_end_times_seconds.at(-1).toFixed(1)} s`);
  }
})();
