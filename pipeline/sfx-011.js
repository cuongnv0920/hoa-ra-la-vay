// Chuẩn bị hiệu ứng âm thanh cho video 011 (không dùng bản thu hay mẫu âm của bên thứ ba).
// Chạy từ gốc repo: node pipeline/sfx-011.js
// 1) Chép các hiệu ứng DÙNG LẠI (tự tổng hợp, đã ghi nguồn ở video 008/009) sang projects/011-phanh-tai-sinh/assets/audio/sfx/.
// 2) Tự tổng hợp hiệu ứng MỚI `chuyen-nhe` (hai bản): tiếng "chuyển" rất nhẹ khi sóng đi qua biến tần (cảnh 6b).
// Đầu ra: *.wav 48 kHz, mono, 16-bit, đỉnh -1 dBFS. Kết quả cố định (nhiễu có hạt giống).
const fs = require('fs');
const path = require('path');

const SR = 48000;
const PROJECTS = path.join(__dirname, '..', 'projects');
const OUT = path.join(PROJECTS, '011-phanh-tai-sinh', 'assets', 'audio', 'sfx');

// ---- 1) dùng lại ----
const REUSE = [
  ['009-xe-dien-mon-lop', ['click', 'click-cao', 'click-tram', 'tick', 'ting', 'whoosh', 'khop-manh', 'chuong']],
  ['008-awd-subaru-va-audi', ['ma-sat-ngan']],
];
fs.mkdirSync(OUT, { recursive: true });
for (const [proj, names] of REUSE) {
  for (const n of names) {
    const src = path.join(PROJECTS, proj, 'assets', 'audio', 'sfx', `${n}.wav`);
    if (!fs.existsSync(src)) throw new Error(`Thiếu ${src}: chạy node pipeline/sfx-${proj.slice(0, 3)}.js trước`);
    fs.copyFileSync(src, path.join(OUT, `${n}.wav`));
    console.log(`sfx/${n}.wav  (chép từ ${proj})`);
  }
}

// ---- 2) mới ----
let seed = 1;
const noise = () => {
  seed = (seed * 48271) % 2147483647;
  return (seed / 2147483647) * 2 - 1;
};
const lowpass = (x, cut) => {
  const a = 1 - Math.exp((-2 * Math.PI * cut) / SR);
  let y = 0;
  return x.map((v) => (y += a * (v - y)));
};
const highpass = (x, cut) => {
  const low = lowpass(x, cut);
  return x.map((v, i) => v - low[i]);
};

// Tiếng "chuyển" rất nhẹ (≈ 0,22 s): một nốt êm trượt cao độ nhẹ + hơi gió mịn. Không tia điện, không rè điện, không robot.
// up = true: lượt tăng tốc (một chiều → xoay chiều), nốt đi lên, cao hơn một chút.
// up = false: lượt phanh (xoay chiều → một chiều), nốt đi xuống, trầm hơn một chút.
function chuyen(up) {
  const len = 0.22;
  const n = Math.round(len * SR);
  const b = new Float64Array(n);
  const f0 = up ? 430 : 560;
  const f1 = up ? 590 : 400;
  let ph = 0;
  let ph2 = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const u = t / len;
    const f = f0 + (f1 - f0) * (1 - Math.pow(1 - u, 2));
    ph += (2 * Math.PI * f) / SR;
    ph2 += (2 * Math.PI * f * 1.5) / SR;
    const env = Math.min(1, t / 0.03) * Math.exp(-t / 0.085);
    b[i] = env * (0.8 * Math.sin(ph) + 0.22 * Math.sin(ph2));
  }
  seed = up ? 311 : 313;
  const air = lowpass(highpass(Float64Array.from({ length: n }, noise), 900), 3200);
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    b[i] += 0.18 * air[i] * Math.min(1, t / 0.04) * Math.exp(-t / 0.07);
  }
  return b;
}

function save(name, data) {
  const peak = data.reduce((m, v) => Math.max(m, Math.abs(v)), 0);
  const gain = 10 ** (-1 / 20) / peak;
  const fade = Math.round(0.006 * SR); // vào/ra mềm, không lụp bụp, không cụt đuôi
  const pcm = Buffer.alloc(data.length * 2);
  data.forEach((v, i) => {
    const edge = Math.min(1, i / (SR * 0.002), (data.length - 1 - i) / fade);
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
  fs.writeFileSync(path.join(OUT, `${name}.wav`), Buffer.concat([h, pcm]));
  console.log(`sfx/${name}.wav  ${(data.length / SR).toFixed(2)} s  (mới)`);
}

save('chuyen-nhe', chuyen(true));
save('chuyen-nhe-tram', chuyen(false));
