// Bố cục khung dọc 9:16 dùng chung cho mọi video (xem storyboard 003).
export const VW = 1080;
export const VH = 1920;
export const ZONE = {
  header: [0, 140],
  meter: [140, 360],
  headline: [380, 560],
  visual: [560, 1320],
  subtitle: [1340, 1500],
  footnote: [1510, 1570],
};
// Vùng nút của Reels/Shorts: không đặt chữ/chi tiết quan trọng.
// Mép dưới 320 px (mô tả, tên kênh); mép phải 140 px từ y = 900 trở xuống (cột nút thích/bình luận/chia sẻ).
export const SAFE = { bottom: 320, right: 140, rightFromY: 900, side: 60 };

export const M = {
  bill: '#2BB673',
  heat: '#FF4D1A',
  accessory: '#FFB000',
  drivetrain: '#9AA6B8',
  ev: '#19B5FF',
  karaoke: '#FFD23F',
};

export const vnd = (n) => Math.round(n).toLocaleString('vi-VN').replace(/,/g, '.') + ' đ';
