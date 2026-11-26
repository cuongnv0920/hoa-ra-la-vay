// Tự tổng hợp hiệu ứng âm thanh cho video 005 (không dùng bản thu hay mẫu âm của bên thứ ba).
// Chạy từ gốc repo: node pipeline/sfx-005.js
// Đầu ra: projects/005-hai-kim-phun/assets/audio/{sfx,moi-truong}/*.wav (48 kHz, mono, 16-bit, đỉnh -1 dBFS).
// Kết quả cố định (nhiễu có hạt giống), nên chạy lại cho file giống hệt.
const fs = require('fs');
const path = require('path');

const SR = 48000;
const ROOT = path.join(__dirname, '..', 'projects', '005-hai-kim-phun', 'assets', 'audio');

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

save('sfx', 'click', click(2200));
save('sfx', 'click-cao', click(2700));
save('sfx', 'phun-mem', spray(0.25, 900, 4200, 0.015, 3));
save('sfx', 'van-mo-gio-hut', valveAir());
save('sfx', 'phun-gat', spray(0.2, 3200, 11000, 0.004, 5));
save('sfx', 'hoi-thoang', spray(0.8, 2000, 6500, 0.18, 7));
save('sfx', 'go-kim-loai', knock());
save('sfx', 'giot-cham', drip());
save('sfx', 'whoosh', whoosh());
save('sfx', 'cach-co-khi', clunk());
save('sfx', 'khop-manh', snap());
save('moi-truong', 'may-cam-chung', idle());
save('sfx', 'tia-lua', spark());
save('sfx', 'lua-lan', flame());
save('sfx', 'ha-nhiet', glide(900, 330, 0.8));
save('sfx', 'nen-len', glide(240, 760, 0.9));
save('sfx', 'tach-nho', tick());
save('sfx', 'chuong', chime());
