// Mốc dùng CHUNG cho animation (scenes.jsx) và âm thanh (sound.jsx). Đổi mốc ở đây thì hình và tiếng đổi cùng nhau.
// Đơn vị: frame tính từ đầu shot. at(cụm) = frame khi cụm được đọc; d = độ dài shot.
export const M = {
  inj12: () => 8, // 1.2: kim phun bắt đầu trượt vào, mất SNAP frame
  inj13a: () => 4,
  inj13b: (at) => at('Một kim phun thẳng'),
  spray21: () => 12, // tia kim gián tiếp bắt đầu
  spray31: () => 10, // tia kim trực tiếp bắt đầu
  knock34: (at, d) => Math.max(24, Math.min(d - 40, at('chưa kịp cháy') + 12)),
  splat42: (at) => at('Một phần xăng'),
  card62: (at) => at('khi khởi động'),
  flush66: (at) => at('máy lại bật'),
  join73: (at) => at('Mỗi kim bù'),
};
export const SNAP = 12; // số frame để một kim bật vào vị trí
export const JOIN = 22; // số frame để hai mảnh khớp nhau
export const TOGGLE = 14; // 7.4: số frame mỗi lần đổi kim
export const CAM_SPEED = 0.16; // 5.4–5.5: rad/frame; con đội lên đỉnh mỗi nửa vòng cam
