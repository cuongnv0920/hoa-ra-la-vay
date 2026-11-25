// Khung thời gian video 003, lấy từ script.json + storyboard.json.
// Khi có audio thật: AUDIO.seconds cho tổng thời lượng; độ dài từng cảnh chia theo ước tính của kịch bản rồi co giãn cho khớp.
// Khi có timestamps từng chữ (ElevenLabs API) → thay sceneSeconds bằng mốc thật và đặt shot theo "cue".
import script from '../../../../projects/003-tien-xang-di-dau/script/script.json';
import board from '../../../../projects/003-tien-xang-di-dau/assets/storyboard.json';

export const FPS = 30;
export const INTRO = 0; // vào thẳng hook, không intro
export const OUTRO = 45; // 1,5 s giữ thẻ cuối sau lời đọc

// Audio ghép bản nháp (đặt null nếu chưa có). file tương đối với --public-dir.
// sceneStarts: giây bắt đầu mỗi cảnh trong file giọng, lấy từ khoảng lặng (ffmpeg silencedetect,
// ngưỡng -38 dB, ≥ 0,22 s) gần nhất với ước tính — bản nháp giọng web 2026-11-23, 141,79 s.
export const AUDIO = {
  file: 'audio/web-v4/narration.mp3',
  seconds: 141.79,
  sceneStarts: [0, 8.85, 16.93, 25.37, 46.07, 64.93, 74.04, 86.97, 102.27, 122.01, 134.08],
};

export function buildTimeline(audio) {
  const est = script.scenes.map((s) => s.est_seconds);
  const estTotal = est.reduce((a, b) => a + b, 0);
  const secs = audio && audio.sceneStarts
    ? audio.sceneStarts.map((s, i) => (i < audio.sceneStarts.length - 1 ? audio.sceneStarts[i + 1] : audio.seconds) - s)
    : est.map((e) => e * (audio && audio.seconds ? audio.seconds / estTotal : 1));
  const scenes = [];
  let t = INTRO;
  for (const [si, s] of script.scenes.entries()) {
    const frames = Math.round(secs[si] * FPS);
    const shots = board.shots.filter((x) => x.scene === s.scene);
    const shotTotal = shots.reduce((a, x) => a + x.duration_s, 0);
    let st = 0;
    const local = shots.map((x, i) => {
      const dur = i === shots.length - 1 ? frames - st : Math.round((x.duration_s / shotTotal) * frames);
      const o = { id: x.id, start: st, dur, headline: x.headline };
      st += dur;
      return o;
    });
    scenes.push({ scene: s.scene, start: t, frames, voiceover: s.voiceover, shots: local });
    t += frames;
  }
  const total = t + OUTRO;
  const T = (id) => {
    for (const sc of scenes) {
      const sh = sc.shots.find((x) => x.id === id);
      if (sh) return { a: sc.start + sh.start, b: sc.start + sh.start + sh.dur };
    }
    throw new Error('Không có shot ' + id);
  };
  return { scenes, total, T };
}

// Trong một cảnh: thông tin shot theo frame cục bộ.
export const shotAt = (shots, id, f) => {
  const s = shots.find((x) => x.id === id);
  const p = Math.min(1, Math.max(0, (f - s.start) / s.dur));
  return { a: s.start, b: s.start + s.dur, dur: s.dur, p, on: f >= s.start && f < s.start + s.dur, after: f >= s.start };
};
