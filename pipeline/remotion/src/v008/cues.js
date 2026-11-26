// Mốc dùng CHUNG cho animation (scenes.jsx) và âm thanh (sound.jsx). Đổi mốc ở đây thì hình và tiếng đổi cùng nhau.
// Đơn vị: frame tính từ đầu shot. at(cụm) = frame khi cụm được đọc; d = độ dài shot.
export const SLIDE = 16; // số frame để một khối trượt vào vị trí
export const SPIN_DOWN = 42; // số frame để trục ra sau quay chậm dần rồi dừng
export const SPIN_UP = 18; // số frame để trục ra sau quay lên lại
export const OPEN = 10; // số frame để một khe ly hợp / bộ tách mở hoặc đóng

export const M = {
  slide11: () => 3, // hai xe trượt vào
  xrayL12: () => 4, // lộ máy, hộp số xe trái
  xrayR12: (at, d) => Math.round(d * 0.42), // rồi xe phải
  stop13: (at) => at('ngắt truyền lực'), // Audi: trục ra sau bắt đầu chậm dần
  glow14: (at) => at('luôn truyền lực'), // Subaru: đường lực sáng tới cầu sau
  q15: () => 4,
  dials22: () => 4,
  rigid23: () => 4, // thanh nối cứng hiện ra
  scrub23: (at) => at('lốp sẽ bị kéo'), // lốp rung, vệt trượt
  brake24: () => 6, // xe ghì lại
  q25: (at) => at('cần một bộ phận'),
  join31: () => 8, // hộp số khớp sau máy boxer (gợi lại tập 007)
  halfL32: () => 6,
  halfR32: (at, d) => Math.round(d * 0.42),
  neq34: (at) => at('chia đều'),
  cross41: (at) => at('không phải vi sai'),
  plates43: (at, d) => ({ start: 4, gap: Math.max(3, Math.floor((d * 0.7) / 9)) }), // 9 đĩa xếp vào lần lượt
  slip44: (at) => at('trượt lên nhau'),
  press45: () => 8, // lực ép tăng từ frame 8 tới 44 (như khung mẫu đã duyệt)
  brain46: () => 4,
  // Thu ra bắt đầu ở 13 frame cuối shot 4.6, nằm trong khoảng lặng cuối cảnh 4 (0,45 s), để tiếng whoosh xong trước chữ "Subaru" đầu cảnh 5.
  zoomOut46: (at, d) => d - 13,
  zoomOut51: () => 14, // số frame thu ra từ chồng đĩa về cả xe
  bar51: (at) => at('sáu mươi'),
  chips52: () => 4,
  slip53: (at) => at('có dấu hiệu trượt'),
  press53: (at) => at('ép chặt hơn'),
  hiC62: (at) => at('ly hợp nhiều đĩa'),
  hiD63: (at) => at('bộ tách'),
  openC64: (at) => at('cả hai cùng mở'),
  openD64: (at) => at('cả hai cùng mở') + 16,
  stop66: (at) => Math.max(4, at('ngừng quay') - 8),
  pull71: (at) => at('tự khóa'),
  brain72: () => 4,
  head73: (at) => at('đoán nhu cầu'), // con trỏ chạy tới 0,5 giây
  close74: (at) => at('nối lại'), // hai khe đóng, trục quay lên
  hiA81: () => 6,
  hiB81: (at, d) => Math.round(d * 0.45),
  stamp91: () => 2,
  readyA93: () => 2,
  readyB93: (at) => at('Bên kia'),
  q94: (at) => at('bộ phận ở giữa'),
  name95: () => 10,
};
