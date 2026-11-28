// Mốc chung của cảnh 6b (frame tính từ đầu cảnh), lấy từ lời đọc thật. Dùng cho hình (Sample011.jsx) và âm thanh (cues-list.js)
// để đổi giọng hay đổi nhịp thì hình và tiếng vẫn khớp. makeK6B(tl) tính cho từng dòng thời gian (3.3 hoặc 3.4).
import { TL, TL34, TL35 } from './timeline';

export const makeK6B = (tl) => {
  const at = tl.scenes.find((s) => s.label === '6b').at;
  return {
    inv: at('biến tần'), // biến tần hiện
    dcOn: at('một chiều của pin'), // đường một chiều từ pin chạy vào biến tần
    acOn: at('thành xoay chiều'), // sóng ra khỏi biến tần, mô-tơ quay nhanh dần
    brake: at('Khi xe phanh'), // đổi chiều: mô-tơ thành máy phát
    acBack: at('nắn điện'), // sóng chạy ngược về biến tần
    dcBack: at('thành một chiều'), // đường thẳng chạy về pin, có hao
    charge: at('để nạp pin'), // vạch pin nhích lên
    comp: at('Máy tính'), // máy tính hiện
    strong: at('mạnh'), // lực hãm to lên
    soft: at('nhẹ'), // lực hãm nhỏ lại
  };
};

export const K6B = makeK6B(TL);
export const K6B_34 = makeK6B(TL34);
export const K6B_35 = makeK6B(TL35);
