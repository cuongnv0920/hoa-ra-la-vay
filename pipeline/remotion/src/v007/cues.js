// Mốc dùng CHUNG cho animation (scenes.jsx) và âm thanh (sound.jsx, làm sau). Đổi mốc ở đây thì hình và tiếng đổi cùng nhau.
// Đơn vị: frame tính từ đầu shot. at(cụm) = frame khi cụm được đọc; d = độ dài shot.
export const SLIDE = 16; // số frame để một khối trượt vào vị trí
export const JOIN = 22; // số frame để mảnh ghép khớp vào
export const M = {
  slide12: (at) => Math.max(0, at('chúng nằm ngang') - 8), // máy boxer bắt đầu trượt vào
  chip21: (at) => at('hay động cơ'), // thẻ "đối đỉnh nằm ngang"
  crank22: () => 10, // trục khuỷu bắt đầu quay
  label22: (at) => at('tức trục quay'),
  chip25: () => 8,
  shafts36: () => 6, // trục cân bằng gắn vào, mất SLIDE frame
  check37: (at) => at('thì không cần'),
  drop42: () => 6, // khối máy hạ vào khoang, mất 24 frame
  car43: () => 18, // xong thu ra, hiện chấm trọng tâm cả xe
  hit53: () => 14, // máy thẳng hàng chạm vách khoang lái
  swap53: (at, d) => Math.round(0.5 * d), // đổi sang máy boxer, mất SLIDE frame
  gear56: (at) => at('hộp số nối'), // hộp số gắn vào sau máy, mất SLIDE frame
  heads62: (at) => at('hai nắp máy'),
  wrench63: (at) => at('bugi nằm chật'),
  join72: () => 6, // mảnh boxer khớp vào sơ đồ, mất JOIN frame
  line74: (at) => at('hoạt động ra sao'),
  name75: () => 12,
};
