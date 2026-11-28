// Tạo giọng video 011 theo hướng NHẤT QUÁN giữa các cảnh (tránh cảm giác "hai người đọc"). Khác pipeline/tts.js: gọi ElevenLabs theo hai chế độ.
//   single : đọc CẢ KỊCH BẢN trong MỘT lần gọi (một lần thu), rồi cắt thành từng cảnh theo mốc thời gian từng ký tự.
//   stitch : đọc từng cảnh, mỗi cảnh gắn previous_request_ids = [cảnh 1 (chuẩn giọng), cảnh liền trước] để nối giọng liên tục.
// Chạy từ gốc repo:
//   node --env-file=.env pipeline/tts-nhat-quan-011.js <single|stitch> <script.json> <thư mục ra> [--model eleven_turbo_v2_5] [--speed 1.15] [--stability 0.75] [--similarity 0.4] [--seed 11]
// Ra: assets/audio/<thư mục ra>/scene-NN.mp3 + scene-NN.alignment.json + timings.json (cùng dạng tts.js, dùng được với voice-v34-011.js).
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const KEY = process.env.ELEVENLABS_API_KEY;
if (!KEY) { console.error('Thiếu ELEVENLABS_API_KEY trong .env'); process.exit(1); }
const args = process.argv.slice(2);
const mode = args[0];
const scriptFile = args[1];
const outName = args[2];
const opt = (n, d) => { const i = args.indexOf('--' + n); return i >= 0 ? args[i + 1] : d; };
if (!['single', 'stitch'].includes(mode) || !scriptFile || !outName) { console.error('Cú pháp: <single|stitch> <script.json> <thư mục ra> [tùy chọn]'); process.exit(1); }

const ROOT = path.join(__dirname, '..');
const FF = path.join(ROOT, 'node_modules', '@remotion', 'compositor-win32-x64-msvc', 'ffmpeg.exe');
const P = path.join(ROOT, 'projects', '011-phanh-tai-sinh');
const script = JSON.parse(fs.readFileSync(path.join(P, 'script', scriptFile), 'utf8'));
const voiceId = script.voice.voice_id;
const model = opt('model', 'eleven_turbo_v2_5');
const settings = { stability: +opt('stability', 0.75), similarity_boost: +opt('similarity', 0.4), style: 0, speed: +opt('speed', 1.15), use_speaker_boost: true };
const seed = +opt('seed', 11);
const outDir = path.join(P, 'assets', 'audio', outName);
fs.mkdirSync(outDir, { recursive: true });

async function call(body) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/with-timestamps?output_format=mp3_44100_128`;
  const r = await fetch(url, { method: 'POST', headers: { 'xi-api-key': KEY, 'Content-Type': 'application/json' }, body: JSON.stringify({ model_id: model, voice_settings: settings, language_code: 'vi', seed, ...body }) });
  const txt = await r.text();
  if (!r.ok) throw new Error(`HTTP ${r.status}: ${txt.slice(0, 400)}`);
  return { res: JSON.parse(txt), id: r.headers.get('request-id') };
}
const pad = (n) => String(n).padStart(2, '0');
const timings = { model, mode, settings, seed, scenes: {} };
const save = (s, buf, alignment) => {
  const f = path.join(outDir, `scene-${pad(s.scene)}.mp3`);
  fs.writeFileSync(f, buf);
  fs.writeFileSync(f.replace('.mp3', '.alignment.json'), JSON.stringify(alignment));
  const dur = alignment.character_end_times_seconds.at(-1);
  const words = s.voiceover.split(/\s+/).filter(Boolean).length;
  timings.scenes[s.scene] = { file: path.basename(f), seconds: +dur.toFixed(2), chars: s.voiceover.length, words, words_per_min: Math.round((words / dur) * 60), settings, generated: new Date().toISOString() };
  console.log(`Cảnh ${s.script_label}: ${dur.toFixed(1)} s | ${words} từ → ${timings.scenes[s.scene].words_per_min} từ/phút`);
};

(async () => {
  console.log(`${mode} | ${model} | speed ${settings.speed} stability ${settings.stability} similarity ${settings.similarity_boost} | ${script.scenes.reduce((a, s) => a + s.voiceover.length, 0)} ký tự`);
  if (mode === 'stitch') {
    const ids = [];
    for (let i = 0; i < script.scenes.length; i++) {
      const s = script.scenes[i];
      const prev = i === 0 ? [] : [...new Set([ids[0], ids[i - 1]])].filter(Boolean);
      const { res, id } = await call({ text: s.voiceover, ...(prev.length ? { previous_request_ids: prev } : {}) });
      ids.push(id);
      save(s, Buffer.from(res.audio_base64, 'base64'), res.alignment);
    }
  } else {
    // một lần thu: nối các cảnh bằng khoảng trắng, nhớ vị trí ký tự của từng cảnh
    let text = '';
    const range = script.scenes.map((s) => { const a = text.length; text += (text ? ' ' : '') + s.voiceover; return [text.length - s.voiceover.length, text.length]; });
    const { res } = await call({ text });
    const all = Buffer.from(res.audio_base64, 'base64');
    fs.writeFileSync(path.join(outDir, 'tron-bai.mp3'), all);
    const al = res.alignment;
    if (al.characters.join('') !== text) throw new Error('alignment không khớp lời đọc');
    script.scenes.forEach((s, i) => {
      const [a, b] = range[i];
      const t0 = Math.max(0, al.character_start_times_seconds[a] - 0.05);
      const t1 = al.character_end_times_seconds[b - 1] + 0.08;
      const tmp = path.join(outDir, `_cut-${pad(s.scene)}.mp3`);
      execFileSync(FF, ['-v', 'error', '-y', '-i', path.join(outDir, 'tron-bai.mp3'), '-filter_complex', `[0:a]atrim=start=${t0.toFixed(4)}:end=${t1.toFixed(4)},asetpts=PTS-STARTPTS[o]`, '-map', '[o]', '-ar', '44100', '-ac', '1', '-c:a', 'libmp3lame', '-q:a', '2', tmp]);
      const sub = {
        characters: al.characters.slice(a, b),
        character_start_times_seconds: al.character_start_times_seconds.slice(a, b).map((t) => +(t - t0).toFixed(4)),
        character_end_times_seconds: al.character_end_times_seconds.slice(a, b).map((t) => +(t - t0).toFixed(4)),
      };
      save(s, fs.readFileSync(tmp), sub);
      fs.unlinkSync(tmp);
    });
  }
  fs.writeFileSync(path.join(outDir, 'timings.json'), JSON.stringify(timings, null, 2) + '\n');
})().catch((e) => { console.error('Lỗi:', e.message); process.exit(1); });
