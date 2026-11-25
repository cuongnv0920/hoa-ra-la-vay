// Kiểm tra nhanh kết nối ElevenLabs: gói, hạn mức, giọng và model hỗ trợ tiếng Việt.
// Chạy: node --env-file=.env pipeline/elevenlabs-check.js [voice_id]
// Không bao giờ in ra API key.
const KEY = process.env.ELEVENLABS_API_KEY;
if (!KEY) { console.error('Thiếu ELEVENLABS_API_KEY trong .env'); process.exit(1); }
const VOICE = process.argv[2] || '3VnrjnYrskPMDsapTr8X';
const api = async (path) => {
  const r = await fetch('https://api.elevenlabs.io' + path, { headers: { 'xi-api-key': KEY } });
  const body = await r.text();
  return { status: r.status, json: (() => { try { return JSON.parse(body); } catch { return body.slice(0, 300); } })() };
};

(async () => {
  const sub = await api('/v1/user/subscription');
  if (sub.status === 200) {
    const s = sub.json;
    console.log(`Gói: ${s.tier} | đã dùng ${s.character_count}/${s.character_limit} credits | reset: ${s.next_character_count_reset_unix ? new Date(s.next_character_count_reset_unix * 1000).toISOString().slice(0, 10) : '?'}`);
  } else console.log('subscription:', sub.status, JSON.stringify(sub.json).slice(0, 200));

  const v = await api('/v1/voices/' + VOICE);
  if (v.status === 200) {
    const j = v.json;
    console.log(`Giọng: ${j.name} | category: ${j.category}`);
    for (const l of j.verified_languages || []) console.log(`  verified: ${l.language} ${l.accent || ''} model=${l.model_id}`);
  } else console.log('voice:', v.status, JSON.stringify(v.json).slice(0, 200));

  const m = await api('/v1/models');
  if (m.status === 200) {
    for (const x of m.json) {
      const vi = (x.languages || []).some(l => l.language_id === 'vi');
      if (x.can_do_text_to_speech) console.log(`  model ${x.model_id}${vi ? '  <-- có tiếng Việt' : ''}`);
    }
  } else console.log('models:', m.status, JSON.stringify(m.json).slice(0, 200));
})();
