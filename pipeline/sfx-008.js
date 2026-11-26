// Tự tổng hợp hiệu ứng âm thanh cho video 008 (không dùng bản thu hay mẫu âm của bên thứ ba).
// Chạy từ gốc repo: node pipeline/sfx-008.js
// Đầu ra: projects/008-awd-subaru-va-audi/assets/audio/sfx/*.wav (48 kHz, mono, 16-bit, đỉnh -1 dBFS).
// Kết quả cố định (nhiễu có hạt giống), nên chạy lại cho file giống hệt.
// Hàm tạo tiếng lấy từ pipeline/sfx-007.js; các tiếng dùng lại gọi đúng tham số cũ nên ra file giống hệt video 007.
const fs = require('fs');
const path = require('path');

const SR = 48000;
const ROOT = path.join(__dirname, '..', 'projects', '008-awd-subaru-va-audi', 'assets', 'audio');

let seed = 1;
const noise = () => {
  seed = (seed * 48271) % 2147483647;
  return (seed / 2147483647) * 2 - 1;
};
const buf = (sec) => new Float64Array(Math.round(sec * SR));
// Lọc một cực; cut có thể là số hoặc hàm của thời gian (giây).
const lowpass = (x, cut) => {
  let y = 0;
  return x.map((v, i) => {
    const a = 1 - Math.exp((-2 * Math.PI * (typeof cut === 'function' ? cut(i / SR) : cut)) / SR);
    y += a * (v - y);
    return y;
  });
};
const highpass = (x, cut) => {
  const low = lowpass(x, cut);
  return x.map((v, i) => v - low[i]);
};
const noiseBuf = (sec, s) => {
  seed = s;
  return buf(sec).map(noise);
};
// Cộng một nốt tắt dần vào b, bắt đầu ở thời điểm at.
const ping = (b, at, freq, decay, amp) => {
  const from = Math.round(at * SR);
  for (let i = from; i < b.length; i++) {
    const t = (i - from) / SR;
    const f = typeof freq === 'function' ? freq(t) : freq;
    b[i] += amp * Math.sin(2 * Math.PI * f * t) * Math.exp(-t / decay) * Math.min(1, t / 0.001);
  }
};
const add = (b, x, at, env, amp = 1) => {
  const from = Math.round(at * SR);
  for (let i = 0; i < x.length && from + i < b.length; i++) b[from + i] += amp * x[i] * env(i / SR);
};
const adr = (len, attack, release) => (t) => Math.max(0, Math.min(1, t / attack, (len - t) / release));

function click(freq) {
  const b = buf(0.12);
  ping(b, 0, freq, 0.012, 0.8);
  ping(b, 0, freq * 2.37, 0.006, 0.35);
  add(b, highpass(noiseBuf(0.03, 11), 3000), 0, (t) => Math.exp(-t / 0.004), 0.5);
  return b;
}

function spray(len, lo, hi, attack, s) {
  const b = buf(len);
  add(b, lowpass(highpass(noiseBuf(len, s), lo), hi), 0, adr(len, attack, len * 0.55));
  return b;
}

function valveAir() {
  const b = buf(0.7);
  ping(b, 0, 190, 0.035, 0.9);
  ping(b, 0, 520, 0.012, 0.3);
  add(b, lowpass(highpass(noiseBuf(0.62, 23), 250), 1400), 0.08, (t) => Math.sin((Math.PI * t) / 0.62) ** 2, 0.7);
  return b;
}

function knock() {
  const b = buf(0.35);
  for (const [at, g] of [[0, 1], [0.13, 0.75]]) {
    ping(b, at, 1850, 0.035, 0.6 * g);
    ping(b, at, 3120, 0.022, 0.35 * g);
    ping(b, at, 4730, 0.012, 0.2 * g);
  }
  return b;
}

function drip() {
  const b = buf(0.3);
  for (const [at, g] of [[0, 1], [0.15, 0.7]]) {
    ping(b, at, (t) => 950 - 5000 * Math.min(t, 0.07), 0.025, 0.8 * g);
    add(b, highpass(noiseBuf(0.04, 31), 2500), at, (t) => Math.exp(-t / 0.008), 0.3 * g);
  }
  return b;
}

function whoosh() {
  const len = 0.4;
  const b = buf(len);
  const sweep = (t) => 300 + 2200 * Math.sin((Math.PI * t) / len);
  add(b, highpass(lowpass(noiseBuf(len, 41), sweep), 200), 0, (t) => Math.sin((Math.PI * t) / len) ** 2);
  return b;
}

// Máy nổ cầm chừng: nhịp đều 25 lần/giây (bốn xi lanh, khoảng 750 vòng/phút), thêm hài để loa điện thoại nghe được.
function idle() {
  const len = 12;
  const b = buf(len);
  for (let k = 0; k < len * 25; k++) {
    const at = k / 25;
    const g = 1 - 0.08 * (k % 4);
    ping(b.subarray(0, Math.min(b.length, Math.round((at + 0.12) * SR))), at, 75, 0.018, 0.5 * g);
    ping(b.subarray(0, Math.min(b.length, Math.round((at + 0.12) * SR))), at, 210, 0.012, 0.3 * g);
    ping(b.subarray(0, Math.min(b.length, Math.round((at + 0.08) * SR))), at, 430, 0.006, 0.3 * g);
    ping(b.subarray(0, Math.min(b.length, Math.round((at + 0.06) * SR))), at, 880, 0.004, 0.18 * g);
  }
  add(b, lowpass(noiseBuf(len, 53), 500), 0, () => 1, 0.18);
  return b;
}

function clunk() {
  const b = buf(0.15);
  ping(b, 0, 140, 0.04, 0.9);
  ping(b, 0, 430, 0.018, 0.6);
  ping(b, 0, 1150, 0.008, 0.35);
  add(b, lowpass(noiseBuf(0.05, 61), 1800), 0, (t) => Math.exp(-t / 0.008), 0.5);
  return b;
}

function snap() {
  const b = buf(0.5);
  add(b, highpass(noiseBuf(0.03, 71), 2000), 0, (t) => Math.exp(-t / 0.005), 0.7);
  ping(b, 0, 220, 0.03, 0.6);
  ping(b, 0.004, 1320, 0.12, 0.35);
  ping(b, 0.004, 1980, 0.08, 0.18);
  return b;
}

function spark() {
  const b = buf(0.14);
  for (const [at, g] of [[0, 1], [0.022, 0.6], [0.05, 0.35]]) add(b, highpass(noiseBuf(0.02, 81), 2500), at, (t) => Math.exp(-t / 0.0035), g);
  ping(b, 0, 3600, 0.01, 0.3);
  return b;
}

// Lửa lan / phụt cháy: nhiễu trầm vừa, nở dần rồi tắt.
function flame() {
  const len = 0.7;
  const b = buf(len);
  add(b, lowpass(highpass(noiseBuf(len, 83), 180), (t) => 500 + 2200 * Math.min(1, t / 0.4)), 0, adr(len, 0.25, 0.3));
  return b;
}

// Nốt trượt: from → to (Hz)
function glide(from, to, len) {
  const b = buf(len);
  let ph = 0;
  for (let i = 0; i < b.length; i++) {
    const t = i / SR;
    ph += (2 * Math.PI * (from * (to / from) ** (t / len))) / SR;
    b[i] = (Math.sin(ph) + 0.3 * Math.sin(2 * ph)) * adr(len, 0.05, len * 0.4)(t);
  }
  return b;
}

function tick() {
  const b = buf(0.06);
  add(b, lowpass(highpass(noiseBuf(0.03, 87), 900), 3500), 0, (t) => Math.exp(-t / 0.006));
  ping(b, 0, 760, 0.008, 0.4);
  return b;
}

function chime() {
  const b = buf(1.1);
  for (const [at, f] of [[0, 1047], [0.09, 1319], [0.18, 1568]]) {
    ping(b, at, f, 0.28, 0.5);
    ping(b, at, f * 2, 0.12, 0.15);
  }
  return b;
}

function save(folder, name, data) {
  const peak = data.reduce((m, v) => Math.max(m, Math.abs(v)), 0);
  const gain = 10 ** (-1 / 20) / peak;
  const fade = Math.round(0.004 * SR); // vào/ra mềm, không lụp bụp
  const pcm = Buffer.alloc(data.length * 2);
  data.forEach((v, i) => {
    const edge = Math.min(1, i / (SR * 0.0005), (data.length - 1 - i) / fade);
    pcm.writeInt16LE(Math.round(v * gain * edge * 32767), i * 2);
  });
  const h = Buffer.alloc(44);
  h.write('RIFF', 0);
  h.writeUInt32LE(36 + pcm.length, 4);
  h.write('WAVEfmt ', 8);
  h.writeUInt32LE(16, 16);
  h.writeUInt16LE(1, 20);
  h.writeUInt16LE(1, 22);
  h.writeUInt32LE(SR, 24);
  h.writeUInt32LE(SR * 2, 28);
  h.writeUInt16LE(2, 32);
  h.writeUInt16LE(16, 34);
  h.write('data', 36);
  h.writeUInt32LE(pcm.length, 40);
  fs.mkdirSync(path.join(ROOT, folder), { recursive: true });
  fs.writeFileSync(path.join(ROOT, folder, `${name}.wav`), Buffer.concat([h, pcm]));
  console.log(`${folder}/${name}.wav  ${(data.length / SR).toFixed(2)} s`);
}

// ---------- Tiếng mới của video 007 ----------
// Va trầm ngắn: một nốt thấp tắt nhanh + một chút nhiễu trầm.
function thud(freq, decay, s, noiseAmp = 0.4, len = 0.15) {
  const b = buf(len);
  ping(b, 0, freq, decay, 0.9);
  ping(b, 0, freq * 2.7, decay * 0.4, 0.3);
  add(b, lowpass(noiseBuf(0.05, s), 900), 0, (t) => Math.exp(-t / 0.01), noiseAmp);
  return b;
}

// Trượt vào rồi dừng êm (A02)
function slideStop() {
  const len = 0.6;
  const b = buf(len);
  add(b, lowpass(highpass(noiseBuf(0.45, 101), 300), (t) => 900 + 1500 * (1 - t / 0.45)), 0, adr(0.45, 0.08, 0.2), 0.5);
  ping(b, 0.42, 120, 0.05, 0.9);
  ping(b, 0.42, 330, 0.02, 0.35);
  return b;
}

// Găng đấm: va trầm + tiếng vải da ngắn (A05)
function punch() {
  const b = buf(0.18);
  ping(b, 0, 95, 0.04, 0.9);
  add(b, lowpass(highpass(noiseBuf(0.06, 103), 400), 2500), 0, (t) => Math.exp(-t / 0.012), 0.7);
  return b;
}

// Hai cú giật cùng lúc, bị dập nhanh nhưng còn đuôi rất nhỏ (A08): "bù phần lớn", không im hẳn.
function damped() {
  const len = 0.3;
  const b = buf(len);
  ping(b, 0, 90, 0.012, 0.9);
  ping(b, 0, 250, 0.008, 0.4);
  ping(b, 0, 90, 0.12, 0.08); // đuôi còn lại
  return b;
}

// Rè rung (A09): một đợt rung trầm phồng lên rồi tắt, theo một nhịp rung của hình.
function buzz() {
  const len = 0.8;
  const b = buf(len);
  for (let i = 0; i < b.length; i++) {
    const t = i / SR;
    const am = 0.55 + 0.45 * Math.sin(2 * Math.PI * 30 * t);
    b[i] = am * (Math.sin(2 * Math.PI * 62 * t) + 0.5 * Math.sin(2 * Math.PI * 124 * t) + 0.25 * Math.sin(2 * Math.PI * 248 * t)) * Math.sin((Math.PI * t) / len) ** 2;
  }
  add(b, lowpass(noiseBuf(len, 107), 700), 0, (t) => Math.sin((Math.PI * t) / len) ** 2, 0.25);
  return b;
}

function ting() {
  const b = buf(0.35);
  ping(b, 0, 1760, 0.09, 0.6);
  ping(b, 0, 3520, 0.04, 0.2);
  return b;
}

// Kim loại chạm, cụt (A18)
function clink() {
  const b = buf(0.2);
  ping(b, 0, 2650, 0.025, 0.6);
  ping(b, 0, 4150, 0.015, 0.35);
  ping(b, 0, 6200, 0.008, 0.2);
  add(b, highpass(noiseBuf(0.02, 109), 3000), 0, (t) => Math.exp(-t / 0.003), 0.4);
  return b;
}

// ---------- Tiếng mới của video 008 ----------
// Mốc dài ngắn khớp với cues.js của video 008: SPIN_DOWN = 42 frame (1,4 s), SPIN_UP = 18 frame (0,6 s).

// Mở khe ly hợp / bộ tách: "tách" nhẹ, sáng hơn tiếng khóa (A03, A22)
function release() {
  const b = buf(0.1);
  ping(b, 0, 620, 0.012, 0.7);
  ping(b, 0, 1650, 0.006, 0.35);
  add(b, highpass(noiseBuf(0.02, 121), 2500), 0, (t) => Math.exp(-t / 0.003), 0.4);
  return b;
}

// Trục quay: tiếng vù có hài, kèm nhịp lách cách theo vòng quay. dir = -1 chậm dần (dừng ở cuối file), +1 nhanh dần.
function spin(len, dir, s) {
  const b = buf(len);
  let ph = 0;
  let rot = 0;
  for (let i = 0; i < b.length; i++) {
    const t = i / SR;
    const k = dir < 0 ? (1 - t / len) ** 2 : (t / len) ** 1.5; // tốc độ tương đối, 0 ở lúc dừng
    const f = 35 + 165 * k;
    ph += (2 * Math.PI * f) / SR;
    rot += (2 * Math.PI * 14 * k) / SR; // nhịp vòng quay
    const am = 0.75 + 0.25 * Math.sin(rot);
    b[i] = k * am * (Math.sin(ph) + 0.45 * Math.sin(2 * ph) + 0.2 * Math.sin(3 * ph));
  }
  add(b, lowpass(noiseBuf(len, s), 600), 0, (t) => (dir < 0 ? (1 - t / len) ** 2 : (t / len) ** 1.5), 0.25);
  return b;
}

// Lốp bị kéo trên đường khô: két ngắn, cụt, có nhịp bám–trượt (A06)
function scrub() {
  const len = 0.35;
  const b = buf(len);
  const n = lowpass(highpass(noiseBuf(len, 123), 700), 2600);
  add(b, n, 0, (t) => (0.6 + 0.4 * Math.sin(2 * Math.PI * 38 * t)) * adr(len, 0.02, 0.12)(t));
  ping(b, 0, 980, 0.06, 0.15);
  return b;
}

// Ma sát đĩa trượt, mềm, ngắn (A14) — không trải dài dưới giọng
function friction() {
  const len = 0.5;
  const b = buf(len);
  add(b, lowpass(highpass(noiseBuf(len, 125), 300), 1800), 0, (t) => (0.8 + 0.2 * Math.sin(2 * Math.PI * 22 * t)) * adr(len, 0.05, 0.25)(t));
  return b;
}

// Bánh trượt trên mặt trơn: "xẹt" ngắn (A18)
function wheelSlip() {
  const len = 0.3;
  const b = buf(len);
  add(b, lowpass(highpass(noiseBuf(len, 127), 1500), 5000), 0, (t) => Math.exp(-t / 0.08) * Math.min(1, t / 0.01));
  return b;
}

// Dùng lại từ video 007 (cùng hàm, cùng tham số → file giống hệt)
save('sfx', 'click', click(2200));
save('sfx', 'click-cao', click(2700));
save('sfx', 'whoosh', whoosh());
save('sfx', 'cach-co-khi', clunk());
save('sfx', 'khop-manh', snap());
save('sfx', 'chuong', chime());
save('sfx', 'tick', tick());
save('sfx', 'thich-dap', damped());
save('sfx', 'ting', ting());
save('sfx', 'cop-duc', thud(160, 0.025, 117, 0.6, 0.15));
save('sfx', 'click-tram', thud(300, 0.02, 119, 0.5, 0.15));
// Mới
save('sfx', 'cach-mo', release());
save('sfx', 'quay-cham-dan', spin(1.4, -1, 129));
save('sfx', 'quay-nhanh-dan', spin(0.6, 1, 131));
save('sfx', 'ket-lop', scrub());
save('sfx', 'ma-sat-ngan', friction());
save('sfx', 'truot-banh', wheelSlip());
