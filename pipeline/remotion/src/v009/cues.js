// Mốc dùng CHUNG cho animation (scenes.jsx) và âm thanh (sound.jsx, làm sau). Đổi mốc ở đây thì hình và tiếng đổi cùng nhau.
// Đơn vị: frame tính từ đầu shot. at(cụm) = frame khi cụm được đọc; d = độ dài shot.
export const V = 12; // px/frame: mặt đường trôi dưới lốp (như khung mẫu 2.3 đã duyệt)
export const FORCE = 0.62; // lực ở mặt cắt chuẩn (như khung mẫu)

export const M = {
  brake11: () => 10, // má phanh hiện trong lớp nhìn xuyên
  wear12: (at, d) => [6, Math.round(d * 0.8)], // gai mòn dần, chạm vạch báo mòn ở cuối
  q13: () => 4,
  no13: (at) => at('Chưa chắc'),
  dive14: () => 2,
  arF21: (at) => at('tăng tốc'),
  arB21: (at) => at('phanh'),
  arS21: (at) => at('vào cua'),
  patch22: (at) => at('mảng cao su'),
  force23: (at) => [at('kéo biến dạng') - 6, at('kéo biến dạng') + 40], // lực tăng như khung mẫu
  zones23: (at) => at('trượt rất nhẹ'),
  dust24: () => 4,
  strike25: (at) => at('tự nhiên'),
  speed26: (at) => at('đổi tốc độ'),
  turn26: (at) => at('hướng đi'),
  battery31: () => 8,
  cars32: () => 2,
  gap33: (at) => Math.max(0, at('gần năm trăm') - 4), // ngay trước "gần năm trăm ký" (shot hết ngay sau chữ "ký"), để tiếng không đè số
  bars34: () => 4,
  plus34: (at) => at('khoảng một phần tư'),
  band35: (at) => at('hai mươi'),
  heavy36: (at) => at('lốp càng'),
  shrink41: () => 4,
  w42: (at) => at('nặng khoảng'),
  w43: (at) => at('xăng nặng khoảng'),
  gap44: () => 2,
  label45: (at) => at('cái nhãn'),
  glow45: (at) => at('cân nặng'),
  ice51: () => 4,
  ev51: (at) => at('mô-men xoắn'),
  go52: (at) => at('tăng tốc mạnh'),
  press53: (at) => at('đạp ga mạnh'),
  pulse53: (at) => at('đột ngột'),
  soft54: () => 2,
  hard55: () => 2,
  zoom56: () => 2,
  calm57: (at) => at('êm hay gắt'),
  no61: (at) => at('Không'),
  chips62: (at) => ['Cân nặng', 'cách tăng tốc', 'mặt đường', 'áp suất', 'loại lốp'].map((w) => at(w)),
  item63: (at) => at('tăng tốc mượt'),
  item64: () => 2,
  item65: () => 2,
  stamp71: () => 2,
  sl73: (at) => [at('Xe nặng hơn'), at('cú đạp ga')],
  down74: (at) => at('chân ga'),
  name75: () => 6,
};
