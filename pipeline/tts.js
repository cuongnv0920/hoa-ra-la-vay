// Tạo giọng đọc từng cảnh bằng ElevenLabs, đo thời lượng thật.
//
// Chạy:
//   node --env-file=.env pipeline/tts.js <project-dir> [--scenes 1,10] [--model eleven_turbo_v2_5]
//        [--stability 0.5] [--similarity 0.75] [--style 0] [--speed 1.0] [--force]
//        [--script script.json] [--out <model>] [--voice <voice_id>]   (phiên bản riêng, ví dụ --script script-v3.json --out v3)
//
// Đầu vào : <project-dir>/script/script.json (voice.voice_id + scenes[].voiceover)
// Đầu ra  : <project-dir>/assets/audio/<model>/scene-NN.mp3
//           <project-dir>/assets/audio/<model>/timings.json  (thời lượng thật, cấu hình đã dùng)
// File mp3 bị .gitignore; timings.json được commit để storyboard dùng.
// Không bao giờ in ra API key.
const fs = require('fs');
const path = require('path');

const KEY = process.env.ELEVENLABS_API_KEY;
if (!KEY) { console.error('Thiếu ELEVENLABS_API_KEY trong .env'); process.exit(1); }

const args = process.argv.slice(2);
const projectDir = args.find(a => !a.startsWith('--'));
if (!projectDir) { console.error('Cần đường dẫn thư mục dự án, ví dụ projects/002-phanh-dia'); process.exit(1); }
const opt = (name, def) => { const i = args.indexOf('--' + name); return i >= 0 ? args[i + 1] : def; };
const flag = name => args.includes('--' + name);

const script = JSON.parse(fs.readFileSync(path.join(projectDir, 'script', opt('script', 'script.json')), 'utf8'));
const voiceArg = args.indexOf('--voice');
const voiceId = voiceArg >= 0 ? args[voiceArg + 1] : script.voice && script.voice.voice_id;
if (!voiceId) { console.error('script.json thiếu voice.voice_id'); process.exit(1); }

const model = opt('model', 'eleven_turbo_v2_5');
const settings = {
  stability: +opt('stability', 0.5),
  similarity_boost: +opt('similarity', 0.75),
  style: +opt('style', 0),
  speed: +opt('speed', 1.0),
  use_speaker_boost: true,
};
const wanted = opt('scenes', null);
const scenes = script.scenes.filter(s => !wanted || wanted.split(',').map(Number).includes(s.scene));
const outDir = path.join(projectDir, 'assets', 'audio', opt('out', model));
fs.mkdirSync(outDir, { recursive: true });

const timingsPath = path.join(outDir, 'timings.json');
const timings = fs.existsSync(timingsPath) ? JSON.parse(fs.readFileSync(timingsPath, 'utf8')) : { model, scenes: {} };

async function tts(text, previous, next) {
  const body = { text, model_id: model, voice_settings: settings, language_code: 'vi' };
  if (previous) body.previous_text = previous;
  if (next) body.next_text = next;
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/with-timestamps?output_format=mp3_44100_128`;
  const r = await fetch(url, { method: 'POST', headers: { 'xi-api-key': KEY, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const txt = await r.text();
  if (!r.ok) throw new Error(`HTTP ${r.status}: ${txt.slice(0, 400)}`);
  return JSON.parse(txt);
}

(async () => {
  console.log(`Model ${model} | ${scenes.length} cảnh | ${scenes.reduce((a, s) => a + s.voiceover.length, 0)} ký tự`);
  for (const s of scenes) {
    const file = path.join(outDir, `scene-${String(s.scene).padStart(2, '0')}.mp3`);
    if (fs.existsSync(file) && !flag('force')) { console.log(`Cảnh ${s.scene}: đã có, bỏ qua (dùng --force để tạo lại)`); continue; }
    const all = script.scenes;
    const idx = all.findIndex(x => x.scene === s.scene);
    const res = await tts(s.voiceover, all[idx - 1] && all[idx - 1].voiceover, all[idx + 1] && all[idx + 1].voiceover);
    fs.writeFileSync(file, Buffer.from(res.audio_base64, 'base64'));
    // mốc thời gian từng ký tự, dùng cho phụ đề
    if (res.alignment) fs.writeFileSync(file.replace('.mp3', '.alignment.json'), JSON.stringify(res.alignment));
    const ends = (res.alignment && res.alignment.character_end_times_seconds) || [];
    const dur = ends.length ? ends[ends.length - 1] : null;
    const words = s.voiceover.split(/\s+/).filter(x => x && x !== '...').length;
    timings.scenes[s.scene] = {
      file: path.basename(file), seconds: dur && +dur.toFixed(2), chars: s.voiceover.length, words,
      words_per_min: dur ? Math.round(words / dur * 60) : null, settings, generated: new Date().toISOString(),
    };
    console.log(`Cảnh ${s.scene}: ${dur ? dur.toFixed(1) + ' s' : '?'} | ${words} từ → ${timings.scenes[s.scene].words_per_min} từ/phút`);
  }
  timings.model = model;
  fs.writeFileSync(timingsPath, JSON.stringify(timings, null, 2));
})().catch(e => { console.error('Lỗi:', e.message); process.exit(1); });
