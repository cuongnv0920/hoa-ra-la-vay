# Storyboard — Video #009 Vì sao xe điện mòn lốp nhanh hơn?

> **Bản 1, người dùng duyệt ngày 2026-11-27 (nhắn "Duyệt storyboard").** Đây không phải Cổng duyệt #2. Ba việc ở mục "Việc cần bạn quyết" theo đề xuất: xe vẽ bóng SUV chung chung, chưa dùng nhạc nền, giữ tiếng cao su và nghe thử ở bước "thử trước". Khung mẫu shot 2.3 (`Sample009A`, `pipeline/remotion/src/v009/Sample009.jsx`, thành phần `ContactPatch.jsx`) dựng ngày 2026-11-27: ảnh tĩnh và đoạn xem chuyển động không tiếng ở `mau/a/`; người dùng duyệt cùng ngày ("Duyệt khung mẫu"). Giọng Tung Dang tạo ngày 2026-11-27 theo kịch bản 1.4 (`eleven_v4`, speed 0.95, stability 0.5, similarity 0.75), rồi tăng nhịp 6% bằng ffmpeg theo góp ý "nhanh hơn 1 chút"; bản dùng ở `audio/eleven_v4/nhanh/`. Mốc thật ở `audio/eleven_v4/shot-timings.json` (tổng **02:05,8**, shot ngắn nhất 1,4 s, dài nhất 6,9 s), thay cho mốc ước tính trong bảng; bản nghe liền `audio/eleven_v4/nghe-thu-ca-bai.mp3`. Chi tiết và các lượt trước: `audio/NGUON-AM-THANH.md`. Người dùng nghe và nhắn "Giọng ổn" cùng ngày. Đủ 38 shot đã dựng thành composition `Video009` (`pipeline/remotion/src/v009/`, mốc chung trong `cues.js`) ngày 2026-11-27, mới soát bằng ảnh tĩnh (`mau/soat/`, bảng xem nhanh `mau/soat-1.png`, `mau/soat-2.png`); người dùng xem và nhắn "Hình ổn, làm âm thanh" cùng ngày. Hiệu ứng đã tạo (`pipeline/sfx-009.js`, 14 file) và gắn cùng ngày (`pipeline/remotion/src/v009/sound.jsx`, 33 cue = 47 lần phát; mốc thật ở `audio/cues-009.json`); bản nghe thử `audio/nghe-thu-co-hieu-ung.mp3`. Người dùng nghe và nhắn "Tiếng ổn" cùng ngày. Bản xem thử render ngày 2026-11-27 theo yêu cầu ("Render xem thử") ra `demo/video-009-xem-thu.mp4` (02:06,0; 1080×1920, 30 fps, h264 + aac 48 kHz; nhãn "BẢN NHÁP · chưa duyệt"; tiếng đỉnh −3,9 dBFS, trung bình −20,0 dB, ngang bản xem thử 008). Người dùng nhắn "Duyệt Cổng #2" ngày 2026-11-27 cho bản xem thử này. Bản đăng render cùng ngày theo yêu cầu ("Render và làm bìa") ra `final/video-009-v1.4-ban-dang.mp4` (composition `Video009Dang`, góc phải để trống như video 005, 007, 008): tiếng giải mã giống hệt bản đã duyệt (so md5), hình chỉ khác nhãn góc. Ảnh bìa `bia/anh-bia-009.png` (composition `Cover009`), người dùng nhắn "Dùng được" cùng ngày. Chưa đăng; người dùng tự tải lên.
> Đầu vào: `script/script-v1.3.md` (đã qua Cổng duyệt #1 ngày 2026-11-27), nay là bản 1.4 (theo yêu cầu người dùng sau khi nghe giọng: "lực xoắn" → "mô-men xoắn" ở cảnh 5, "pin lithium sắt phốt phát" → "pin lithium LFP" ở cảnh 4) và `script/script.json`.
> **Khung 9:16, 1080×1920, 30 fps.** 38 shot, khoảng **02:13**, trung bình 3,5 s/shot (ngắn nhất 1,5 s, dài nhất 6,3 s).
> Mốc thời gian là ước tính: 0,316 s/từ (nhịp thật của giọng Tung Dang `eleven_v4`, speed 0.90, đo ở video 008), cộng 0,4 s nghỉ giữa cảnh. Mỗi shot **neo vào cụm "Cue"** trong lời đọc để khớp lại theo giọng thật.
> Tập này ưu tiên chất lượng: một hình chủ đạo (mặt cắt vùng tiếp xúc lốp–đường) quay lại ở 2.3, 3.6, 5.4–5.7, 6.2, 7.2–7.4, để người xem "thấy" lốp mòn ra sao và mỗi lý do làm mòn thêm thế nào.

## Tóm tắt loại hình
| Loại | Số shot | Thời lượng ước tính |
|---|---|---|
| ANIMATION-CODE | 31 | 108,8 s (84%) |
| ĐỒ HỌA | 7 | 21,5 s (16%) |
| AI-IMAGE / AI-VIDEO | 0 | 0 |

**Credits Higgsfield: 0** (trần đề xuất: 0). Mọi cảnh là cơ chế, số liệu hoặc sơ đồ, nên vẽ bằng mã. Không dùng ảnh hay video AI: AI dễ vẽ sai lốp, gai lốp và các mẫu xe có thật (Tesla, Kia, VinFast, Honda).
Giọng đọc: khoảng 1.950 ký tự ElevenLabs cho một lượt tạo.

## Bố cục và phong cách
- Theo `pipeline/remotion/src/vertical/layout.js`: header, tiêu đề lớn (y 380–560), hình (560–1320), phụ đề tô từng chữ (1340–1500), chú thích (1510–1570); chừa vùng nút Reels/Shorts (mép dưới 320 px, mép phải 140 px từ y 900). Vùng 140–360 để trống như video 005, 007, 008.
- Nền và chữ theo `theme.js` như các video trước (chưa có `brand/style.md`).
- **Màu cố định:**
  - xe điện = xanh `#19B5FF` (`M.ev` trong `layout.js`);
  - xe xăng/hybrid = xám ấm `#9AA6B8` (`M.drivetrain`);
  - cao su, gai lốp = xám đậm có viền sáng; mặt đường = xám đen có vân nhám;
  - vùng **bám** = trắng nhạt; vùng **trượt** = hổ phách `#FFB000`;
  - bụi cao su = chấm xám nhạt, nhỏ, mờ dần;
  - mũi tên lực = trắng, độ dày tỷ lệ với lực;
  - nhãn nguồn ("theo thông số hãng", "Emissions Analytics") = chữ nhỏ xám nhạt.
- **Ba góc nhìn, dùng lặp lại:**
  1. **Mặt cắt vùng tiếp xúc** (ContactPatch, nhìn ngang, cắt dọc lốp): hình chủ đạo.
  2. Xe nhìn từ trên (CarTop) cho lực tăng tốc, phanh, vào cua và đảo lốp.
  3. Xe nhìn ngang (CarSide) có lớp nhìn xuyên cho khối pin, má phanh, lực kéo.
- Xe là hình khối SUV chung chung, chỉ khác màu và thẻ chữ. Không logo, không vẽ dáng Tesla, Kia, VinFast hay Honda.

## Thành phần Remotion
- **Tái dùng:** Background, Header, Headline, KaraokeSubtitle, Footnote, Chip, Stamp (v003/v005/v007/v008); khung xe nhìn từ trên của v008 (`Drivetrain.jsx`) làm nền cho CarTop, bỏ máy và trục.
- **Mới (thư mục `pipeline/remotion/src/v009/`):**
  - **ContactPatch**: mặt cắt lốp chạm đường. Tham số: `load` (0–1, mảng tiếp xúc dài ra), `force` (0–1, khối gai cong nhiều hơn, vùng trượt rộng ra), `speed` (khối gai đi qua). Biến thể nhìn từ dưới (mảng chữ nhật bo góc) cho 1.4, 2.2.
  - **RubberDust**: hạt bụi sinh ở mép sau, số hạt tỷ lệ với năng lượng trượt (`load × force`), cùng mốc với ContactPatch.
  - **TireSection**: mặt cắt gai lốp, thước đo độ sâu, vạch báo mòn.
  - **CarSide**, **CarTop**, **BatteryPack**, **BrakePadIcon**, **ForceArrow**.
  - **ConvoyPair**, **BarPair**, **RangeBand**.
  - **WeighScale**: bàn cân có kim và số chạy.
  - **TorqueCurve** (mô-men xoắn theo vòng tua, định tính), **ForceTimeGraph** (lực kéo theo thời gian: đạp nhẹ / đạp gắt), **Pedal**.
  - **Checklist**, **PressureGauge**, **Slider**.

## Bảng shot
Phong cách tham chiếu: như mục trên. Credits mọi shot: 0.

| Cảnh | Shot | Bắt đầu | Thời lượng | Loại | Cue (lời đọc) | Tiêu đề lớn | Hình | Thành phần |
|---|---|---|---|---|---|---|---|---|
| 1 | 1.1 | 00:00.0 | 3,2s | ANIMATION-CODE | «Xe điện thường ít mòn má phanh…» | **Má phanh: mòn chậm** | Xe điện chung chung nhìn ngang, không logo. Lớp nhìn xuyên ở bánh trước: đĩa phanh và má phanh còn dày, sáng xanh. Chip "nhờ phanh tái sinh" nhỏ. Không ghi số lần. | CarSide, BrakePadIcon, Chip |
| 1 | 1.2 | 00:03.2 | 3,5s | ANIMATION-CODE | «Nhưng có một thứ đôi khi…» | **Lốp: đôi khi hết sớm hơn** | Máy quay chuyển xuống lốp. Mặt cắt gai lốp: thước đo độ sâu gai hạ xuống, vạch báo mòn sáng hổ phách. Không ghi số km. | TireSection, Chip |
| 1 | 1.3 | 00:06.7 | 2,8s | ĐỒ HỌA | «Có phải lốp xe điện kém hơn? Chưa chắc.» | **Lốp kém hơn?** | Chip "lốp kém hơn?" hiện, rồi chữ "chưa chắc" đè lên, nét gạch mảnh. | Chip, Headline |
| 1 | 1.4 | 00:09.5 | 4,1s | ANIMATION-CODE | «Muốn hiểu, hãy nhìn vào chỗ duy nhất…» | **Chỗ duy nhất chạm đường** | Máy quay lặn xuống dưới bánh, mặt đường trong suốt: hiện **mảng tiếp xúc** hình chữ nhật bo góc, sáng trắng. Nhãn nhỏ "vùng tiếp xúc". Không so cỡ bàn tay. | ContactPatch (nhìn từ dưới) |
| 2 | 2.1 | 00:14.0 | 3,2s | ANIMATION-CODE | «Mỗi lần xe tăng tốc, phanh hay vào cua…» | **Tăng tốc · phanh · vào cua** | Xe nhìn từ trên. Ba mũi tên lực lần lượt theo lời đọc: tới trước (tăng tốc), ngược lại (phanh), sang ngang (vào cua). | CarTop, ForceArrow |
| 2 | 2.2 | 00:17.2 | 3,2s | ANIMATION-CODE | «…lực đều phải đi qua mảng cao su nhỏ dưới bánh.» | **Mọi lực qua bốn mảng cao su** | Ba mũi tên co lại, dồn vào bốn mảng tiếp xúc nhỏ dưới bốn bánh; bốn mảng sáng lên cùng lúc. | CarTop, ContactPatch |
| 2 | 2.3 | 00:20.4 | 5,4s | ANIMATION-CODE | «Để tạo lực bám, cao su bị kéo biến dạng…» | **Bị kéo, rồi trượt nhẹ** | **Hình chủ đạo của video.** Mặt cắt dọc lốp chạm đường, nhìn ngang. Các khối gai đi vào ở mép trước, bám đường, bị kéo cong dần; tới gần mép sau thì trượt nhẹ rồi bật ra. Hai vùng tô nhạt: "bám" (phía trước), "trượt" (phía sau). Chú thích "mô hình giản lược". | ContactPatch (mặt cắt), Footnote |
| 2 | 2.4 | 00:25.8 | 3,5s | ANIMATION-CODE | «Mỗi lần như vậy, một lượng cao su li ti mất đi.» | **Mỗi lần trượt, mất một chút** | Tiếp 2.3: mỗi khối gai trượt ra ở mép sau rơi vài hạt bụi li ti (chấm xám nhạt), bay chậm ra sau rồi tan. | ContactPatch, RubberDust |
| 2 | 2.5 | 00:29.3 | 2,2s | ĐỒ HỌA | «Không phải lốp tự nhiên ăn đường.» | **Không tự nhiên "ăn đường"** | Chip "lốp tự ăn đường" mờ đi, nét gạch mảnh. | Chip |
| 2 | 2.6 | 00:31.5 | 3,8s | ANIMATION-CODE | «Nó đang trả giá để chiếc xe đổi tốc độ…» | **Cái giá để đổi tốc độ, đổi hướng** | Xe nhìn từ trên chạy một đoạn: tăng tốc, rồi rẽ. Mỗi lần đổi, bốn mảng tiếp xúc nháy sáng và rơi vài hạt bụi. | CarTop, ContactPatch, RubberDust |
| 3 | 3.1 | 00:35.7 | 2,5s | ANIMATION-CODE | «Bộ pin khiến nhiều xe điện nặng hơn.» | **Pin: nặng dưới sàn** | Xe nhìn ngang, lớp nhìn xuyên: khối pin hạ xuống sàn xe, mũi tên trọng lượng hướng xuống bốn bánh dày lên. | CarSide, BatteryPack, ForceArrow |
| 3 | 3.2 | 00:38.2 | 3,5s | ANIMATION-CODE | «Trong một thử nghiệm ở Anh…» | **Một thử nghiệm ở Anh** | Hai bóng SUV chung chung, không logo, chạy nối đuôi trên một con đường. Chip "chạy cùng đoàn · Anh, 2023". | ConvoyPair, Chip |
| 3 | 3.3 | 00:41.7 | 3,2s | ANIMATION-CODE | «…nặng hơn một chiếc Kia Niro hybrid gần năm trăm ký.» | **Nặng hơn ≈ 490 kg** | Nhãn chữ dưới hai bóng xe: "Tesla Model Y" (xe điện) và "Kia Niro hybrid". Khoảng chênh "≈ 490 kg" hiện giữa hai xe. | ConvoyPair, Chip |
| 3 | 3.4 | 00:44.9 | 3,2s | ANIMATION-CODE | «Lốp chiếc Tesla mòn nhiều hơn khoảng một phần tư.» | **Mòn hơn ≈ 1/4** | Hai cột "cao su mòn đi" mọc lên; cột xe điện cao hơn khoảng một phần tư, nhãn "+26%". Chú thích: "thử nghiệm của Emissions Analytics · mỗi xe dùng lốp theo xe". Không vẽ lốp hai xe giống nhau. | BarPair, Footnote |
| 3 | 3.5 | 00:48.1 | 6s | ĐỒ HỌA | «Một vài số liệu khác ở nước ngoài…» | **Khoảng 20–30%** | Một dải ngang "≈ 20–30%", cột +26% của 3.4 nằm trong dải. Chú thích "một vài số liệu khác ở nước ngoài · cách đo khác nhau". Không ghi tên nguồn khác, không ghi "thường". | RangeBand, Footnote |
| 3 | 3.6 | 00:54.1 | 5,7s | ANIMATION-CODE | «Xe càng nặng, mỗi lần tăng tốc…» | **Nặng hơn → lực lớn hơn** | Hai mặt cắt tiếp xúc như 2.3 đặt trên dưới: xe nhẹ và xe nặng. Bên nặng: mảng tiếp xúc dài hơn, khối gai bị kéo cong hơn, vùng trượt rộng hơn, bụi nhiều hơn. Mũi tên lực bên nặng dày hơn. | ContactPatch ×2, RubberDust |
| 4 | 4.1 | 01:00.2 | 3,8s | ĐỒ HỌA | «Nhưng không phải xe điện nào cũng nặng hơn nhiều như vậy.» | **Không phải xe nào cũng vậy** | Khoảng chênh "≈ 490 kg" của 3.3 thu nhỏ, mờ đi, dạt sang một bên làm mốc so sánh. | Chip |
| 4 | 4.2 | 01:04.0 | 6,3s | ANIMATION-CODE | «VinFast VF 8 thế hệ mới…» | **VF 8 thế hệ mới: ≈ 1.870 kg** | Bàn cân trái: bóng SUV điện chung chung (xanh), nhãn "VF 8 thế hệ mới · pin LFP". Kim cân quay lên, số chạy tới "≈ 1.870 kg". | WeighScale, Chip |
| 4 | 4.3 | 01:10.3 | 4,4s | ANIMATION-CODE | «Honda CR-V bản máy xăng…» | **CR-V máy xăng: ≈ 1.660 kg** | Bàn cân phải: bóng SUV xăng chung chung (xám ấm), nhãn "CR-V 1.5 turbo" (không ghi tên bản). Kim lên "≈ 1.660 kg". Chú thích "khối lượng không tải, theo thông số hãng". | WeighScale, Chip, Footnote |
| 4 | 4.4 | 01:14.7 | 1,9s | ANIMATION-CODE | «Chênh chỉ khoảng hai trăm ký.» | **Chênh ≈ 210 kg** | Vạch chênh "≈ 210 kg" sáng giữa hai cân, đặt cạnh mốc "≈ 490 kg" mờ để thấy nhỏ hơn nhiều. | WeighScale, Chip |
| 4 | 4.5 | 01:16.6 | 3,8s | ANIMATION-CODE | «Vì vậy, đừng nhìn cái nhãn xe điện…» | **Nhìn cân nặng, không nhìn nhãn** | Nhãn "xe điện" trên xe trái mờ đi; hai mặt kim cân phóng to, sáng. | WeighScale, Chip |
| 5 | 5.1 | 01:20.8 | 4,4s | ANIMATION-CODE | «Còn mô-tơ điện có thể đạt mô-men xoắn…» | **Mô-men xoắn lớn từ vòng tua thấp** | Đồ thị định tính mô-men xoắn theo vòng tua: đường máy xăng tăng dần; đường mô-tơ điện lên cao ngay từ gần 0. **Không ghi số**, chú thích "minh họa, không theo xe cụ thể". | TorqueCurve, Footnote |
| 5 | 5.2 | 01:25.2 | 3,8s | ANIMATION-CODE | «Vì thế, xe có thể tăng tốc mạnh…» | **Mạnh ngay khi vừa lăn bánh** | Xe nhìn ngang vừa lăn bánh đã lao đi; mũi tên lực kéo ở bánh chủ động dày lên nhanh. Không chỉ định cầu trước hay sau. | CarSide, ForceArrow |
| 5 | 5.3 | 01:29.0 | 4,7s | ANIMATION-CODE | «Nếu người lái đạp ga mạnh…» | **Lực dồn đột ngột xuống lốp** | Bàn đạp ga vẽ đơn giản bị nhấn sâu; một xung lực chạy từ bàn đạp xuống bánh rồi tới mặt cắt tiếp xúc. | Pedal, ForceArrow, ContactPatch |
| 5 | 5.4 | 01:33.7 | 1,6s | ANIMATION-CODE | «Đạp nhẹ, lực lên từ từ.» | **Đạp nhẹ: lên từ từ** | Đồ thị lực kéo theo thời gian: đường dốc thoai thoải. Bên dưới, khối gai cong ít, vùng trượt hẹp. | ForceTimeGraph, ContactPatch |
| 5 | 5.5 | 01:35.3 | 2,2s | ANIMATION-CODE | «Đạp gắt, cao su bị kéo mạnh hơn.» | **Đạp gắt: kéo mạnh hơn** | Đường thứ hai vọt dựng đứng; khối gai cong mạnh, vùng trượt rộng, bụi nhiều. Không vẽ lốp quay trơn hay khói. | ForceTimeGraph, ContactPatch, RubberDust |
| 5 | 5.6 | 01:37.5 | 2,2s | ANIMATION-CODE | «Cảm giác tăng tốc tức thì rất thích.» | **Tăng tốc tức thì** | Xe vọt lên, vài vệt tốc độ ngắn phía sau. Giữ nhẹ nhàng, không kịch tính. | CarSide |
| 5 | 5.7 | 01:39.7 | 4,1s | ANIMATION-CODE | «Nhưng chính bàn chân bạn quyết định…» | **Bàn chân quyết định** | Bàn đạp ở giữa, hai mặt cắt tiếp xúc nhỏ hai bên: "êm" (gai cong ít) và "gắt" (gai cong mạnh); bàn đạp nhích nhẹ, bên "êm" sáng lên. | Pedal, ContactPatch ×2 |
| 6 | 6.1 | 01:44.2 | 3,2s | ĐỒ HỌA | «Vậy xe điện chắc chắn mòn lốp nhanh hơn…? Không.» | **Chắc chắn? Không.** | Câu hỏi hiện, rồi chữ "Không" rõ ở giữa. | Headline, Chip |
| 6 | 6.2 | 01:47.4 | 4,4s | ANIMATION-CODE | «Cân nặng, cách tăng tốc, mặt đường…» | **Nhiều thứ góp phần** | Mặt cắt tiếp xúc ở giữa; năm chip hiện quanh theo nhịp lời đọc: "cân nặng", "cách tăng tốc", "mặt đường", "áp suất", "loại lốp". | ContactPatch, Chip ×5 |
| 6 | 6.3 | 01:51.8 | 2,8s | ANIMATION-CODE | «Điều bạn kiểm soát được rất đơn giản: tăng tốc mượt…» | **Tăng tốc mượt** | Ba ô danh sách; ô 1 sáng: đường lực kéo thoai thoải nhỏ. | Checklist, ForceTimeGraph |
| 6 | 6.4 | 01:54.6 | 2,5s | ANIMATION-CODE | «…giữ áp suất theo khuyến cáo của xe…» | **Đúng áp suất khuyến cáo** | Ô 2 sáng: đồng hồ áp suất đơn giản, kim vào vùng xanh **không ghi số**; chú thích "theo tem cửa / sách hướng dẫn". | Checklist, PressureGauge, Footnote |
| 6 | 6.5 | 01:57.1 | 1,9s | ANIMATION-CODE | «…và đảo lốp đúng lịch.» | **Đảo lốp đúng lịch** | Ô 3 sáng: bốn bánh nhìn từ trên đổi chỗ bằng mũi tên chung chung. **Không vẽ một sơ đồ đảo lốp cụ thể** (mỗi xe khác nhau); chú thích "theo sách hướng dẫn". | Checklist, CarTop, Footnote |
| 7 | 7.1 | 01:59.4 | 1,5s | ĐỒ HỌA | «Hóa ra là vậy.» | **Hóa ra là vậy** | Dấu "Hóa ra là vậy". | Stamp |
| 7 | 7.2 | 02:00.9 | 1,9s | ANIMATION-CODE | «Lốp mòn vì phải truyền lực.» | **Lốp mòn vì truyền lực** | Trở về mặt cắt tiếp xúc của 2.3, mũi tên lực trắng đi qua mảng cao su. | ContactPatch, ForceArrow |
| 7 | 7.3 | 02:02.8 | 4,4s | ANIMATION-CODE | «Xe nặng hơn, cú đạp ga mạnh hơn…» | **Nặng hơn · đạp mạnh hơn** | Hai thanh trượt nhỏ "cân nặng" và "đạp ga" lần lượt tăng; khối gai cong hơn, bụi nhiều hơn. | ContactPatch, Slider ×2, RubberDust |
| 7 | 7.4 | 02:07.2 | 3,5s | ANIMATION-CODE | «Và cách bạn dùng chân ga…» | **Chân ga tạo khác biệt** | Thanh "đạp ga" hạ xuống; khối gai cong ít lại, bụi thưa dần, lốp lăn êm. | ContactPatch, Slider |
| 7 | 7.5 | 02:10.7 | 2s | ĐỒ HỌA | (không lời) | **Hóa Ra Là Vậy** | Tên kênh. Có khoảng 1,5 s không lời ở cuối. | Headline |


## Âm thanh
Theo mục "Thiết kế âm thanh cho animation" trong `CLAUDE.md` và góp ý của người dùng (to và nhiều hơn bản đầu một chút, không quá tay, không có tiếng kéo dài đè lên giọng). Mức khởi đầu như video 007 và 008, bản người dùng đã nghe và nhắn "Tiếng ổn": **vừa ≈ −8 dB, nhẹ ≈ −13 dB, nền ≈ −21 dB** so với đỉnh giọng. Thời điểm tính từ đầu shot, là ước tính; khi dựng lấy frame từ mốc animation (cùng `cues.js` điều khiển ContactPatch).

| ID | Shot | Lớp | Âm thanh | Cue hình | Thời điểm | Thời lượng | Mức | File |
|---|---|---|---|---|---|---|---|---|
| A01 | 1.1 | chuyển động | "click" trầm, chắc | má phanh hiện trong lớp nhìn xuyên | +0,4 s | 0,15 s | nhẹ | dùng lại `click-tram` (008) |
| A02 | 1.2 | chuyển động | "cộp" đục, nhỏ | thước đo gai hạ xuống chạm vạch báo mòn | +1,6 s | 0,15 s | nhẹ | dùng lại `cop-duc` (008) |
| A03 | 1.3 | chuyển động | "click" cao | chữ "chưa chắc" đè lên | +1,8 s | 0,12 s | nhẹ | dùng lại `click-cao` (008) |
| A04 | 1.4 | chuyển động | "whoosh" ngắn, êm | máy quay lặn xuống dưới bánh | +0,1 s | 0,4 s | nhẹ | dùng lại `whoosh` (008) |
| A05 | 2.1 | chuyển động | ba "click" nhỏ lần lượt | ba mũi tên lực hiện theo lời đọc | +0,3 s | 0,12 s | nhẹ | dùng lại `click` (008) |
| A06 | 2.2 | chuyển động | "ting" ngắn | bốn mảng tiếp xúc sáng cùng lúc | +1,6 s | 0,3 s | nhẹ | dùng lại `ting` (008) |
| A07 | 2.3 | chuyển động | ba tiếng cao su "rít" rất khẽ, rất ngắn | ba khối gai đầu tiên trượt bật ra ở mép sau (theo nhịp animation, không lặp suốt shot) | +1,2 s | 0,12 s | nền | CẦN TẠO (`cao-su-truot`) |
| A08 | 2.5 | chuyển động | "cộp" đục, nhỏ | nét gạch qua chip "lốp tự ăn đường" | +0,8 s | 0,15 s | nhẹ | dùng lại `cop-duc` (008) |
| A09 | 2.6 | chuyển động | hai tiếng cao su rất khẽ | mảng tiếp xúc nháy khi xe tăng tốc, rồi khi rẽ | +0,6 s | 0,12 s | nền | CẦN TẠO (`cao-su-truot`) |
| A10 | 3.1 | chuyển động | "thịch" trầm bị dập | khối pin đặt xuống sàn xe | +0,6 s | 0,3 s | vừa | dùng lại `thich-dap` (008) |
| A11 | 3.2 | chuyển động | "whoosh" ngắn | hai bóng xe trượt vào khung | +0,1 s | 0,4 s | nhẹ | dùng lại `whoosh` (008) |
| A12 | 3.3 | chuyển động | "click" cao | khoảng chênh "≈ 490 kg" hiện | +1,4 s | 0,12 s | nhẹ | dùng lại `click-cao` (008) |
| A13 | 3.4 | chuyển động | "tick" nhỏ khi hai cột dừng, rồi "click" khi nhãn +26% | cột dừng mọc; nhãn hiện | +1 s | 0,12 s | nhẹ | dùng lại `tick` + `click` (008) |
| A14 | 3.5 | chuyển động | "click" trầm | dải 20–30% hiện | +0,5 s | 0,15 s | nhẹ | dùng lại `click-tram` (008) |
| A15 | 3.6 | chuyển động | tiếng cao su rất khẽ: một tiếng ở mặt cắt xe nhẹ, hai tiếng dày hơn ở mặt cắt xe nặng | khối gai trượt ra ở từng mặt cắt | +1,5 s | 0,12 s | nền | CẦN TẠO (`cao-su-truot`) |
| A16 | 4.1 | chuyển động | "cộp" đục, nhỏ | mốc 490 kg thu nhỏ dạt sang | +0,6 s | 0,15 s | nhẹ | dùng lại `cop-duc` (008) |
| A17 | 4.2 | chuyển động | kim cân quay lên rồi dừng, có tiếng lò xo nhỏ | kim cân trái chạy và dừng ở 1.870 | +1,8 s | 0,6 s | nhẹ | CẦN TẠO (`can-kim`) |
| A18 | 4.3 | chuyển động | như A17, ngắn hơn | kim cân phải dừng ở 1.660 | +1,2 s | 0,5 s | nhẹ | CẦN TẠO (`can-kim`) |
| A19 | 4.4 | chuyển động | "ting" ngắn | vạch "≈ 210 kg" sáng | +0,3 s | 0,3 s | nhẹ | dùng lại `ting` (008) |
| A20 | 4.5 | chuyển động | "click" | nhãn "xe điện" mờ đi | +1,4 s | 0,12 s | nhẹ | dùng lại `click` (008) |
| A21 | 5.1 | chuyển động | "tick" nhỏ | đường mô-tơ điện hiện ở mức cao | +1,6 s | 0,05 s | nhẹ | dùng lại `tick` (008) |
| A22 | 5.2 | chuyển động | "whoosh" ngắn, thấp | xe lao đi khi vừa lăn bánh | +0,8 s | 0,4 s | nhẹ | dùng lại `whoosh` (008) |
| A23 | 5.3 | chuyển động | "click" trầm khi bàn đạp xuống, rồi tiếng lốp "két" rất ngắn khi xung lực tới mặt cắt | bàn đạp nhấn; xung lực chạm mảng tiếp xúc | +0,6 s | 0,15 s | nhẹ | dùng lại `click-tram` + `ket-lop` (008) |
| A24 | 5.4 | chuyển động | một tiếng cao su rất khẽ | khối gai trượt ít | +0,8 s | 0,12 s | nền | CẦN TẠO (`cao-su-truot`) |
| A25 | 5.5 | chuyển động | tiếng lốp "két" ngắn, cụt (không rít dài, không gợi mất bám) | đường lực vọt dựng đứng, gai cong mạnh | +0,4 s | 0,3 s | nhẹ | dùng lại `ket-lop` (008) |
| A26 | 6.1 | chuyển động | "cộp" đục | chữ "Không" hiện | +2,4 s | 0,15 s | vừa | dùng lại `cop-duc` (008) |
| A27 | 6.2 | chuyển động | năm "tick" nhỏ | năm chip hiện theo nhịp lời đọc | +0,3 s | 0,05 s | nhẹ | dùng lại `tick` (008) |
| A28 | 6.3 | chuyển động | "click" cao | ô 1 sáng | +1 s | 0,12 s | nhẹ | dùng lại `click-cao` (008) |
| A29 | 6.4 | chuyển động | "click" cao | ô 2 sáng | +0,2 s | 0,12 s | nhẹ | dùng lại `click-cao` (008) |
| A30 | 6.5 | chuyển động | "click" cao | ô 3 sáng | +0,2 s | 0,12 s | nhẹ | dùng lại `click-cao` (008) |
| A31 | 7.1 | chuyển động | "khớp" gọn có ngân | dấu "Hóa ra là vậy" đóng xuống | +0,2 s | 0,5 s | vừa | dùng lại `khop-manh` (008) |
| A32 | 7.3 | chuyển động | hai tiếng cao su rất khẽ, tiếng sau dày hơn | mỗi thanh trượt tăng | +1 s | 0,12 s | nền | CẦN TẠO (`cao-su-truot`) |
| A33 | 7.5 | chuyển động | chuông ngắn | tên kênh hiện | +0,4 s | 0,8 s | nhẹ | dùng lại `chuong` (008) |

- **Mật độ:** 33 cue, khoảng 47 lần phát cho khoảng 2:13 (A05 ba lần, A07 ba lần, A15 ba lần, A27 năm lần…). Mật độ gần video 008 (52 lần phát cho 2:45, phần lớn tick nền); khi nghe thật sẽ bỏ bớt nếu thấy dày.
- **Nhạc nền:** chưa đặt cue. Đề xuất không dùng nhạc, như video 005, 007, 008.
- **Môi trường:** không có. Không dùng tiếng đường xá hay tiếng xe chạy thật.
- **Không có tiếng** ở các shot còn lại, kể cả khi cắt shot thông thường.
- **Tiếng cao su (A07, A09, A15, A24, A32) là tiếng đặc trưng của tập này:**
  - mỗi tiếng ≤ 0,12 s, rất khẽ (nền), **chỉ phát ở vài khối gai đầu tiên** của mỗi lần minh họa, khớp đúng frame khối gai bật ra ở mép sau;
  - **không** trải thành tiếng rít liên tục dưới lời đọc (góp ý video 005);
  - bên xe nặng (A15) và khi đạp gắt (A25) chỉ dày hơn một chút, không to hơn nhiều;
  - không gợi tiếng phanh gấp, lốp quay trơn hay mất lái.
- **Khớp cơ chế:**
  - A17, A18 (kim cân) dừng cùng lúc kim trên hình dừng;
  - A23: tiếng "két" rơi đúng frame xung lực chạm mảng tiếp xúc, không rơi lúc bàn đạp nhấn;
  - A21 không dùng tiếng mô-tơ rú lên: đồ thị là định tính, không gợi một vòng tua cụ thể.
- **Tránh đè chữ quan trọng:** A12 ("≈ 490 kg") và A19 ("≈ 210 kg") đặt ngay sau chữ số trong lời đọc, không đè lên; A26 ("Không") rơi sau chữ "Không".

### Âm thanh còn thiếu
- **Dùng lại** (tự tổng hợp bằng `pipeline/sfx-007.js` / `pipeline/sfx-008.js`, đã ghi nguồn): `whoosh`, `click`, `click-cao`, `click-tram`, `tick`, `ting`, `thich-dap`, `cop-duc`, `khop-manh`, `chuong`, `ket-lop`. Khi dựng, chép sang `projects/009-xe-dien-mon-lop/assets/audio/sfx/` và ghi từng dòng vào `audio/NGUON-AM-THANH.md` của video 009.
- **Cần tạo** (tự tổng hợp, ghi lệnh vào `NGUON-AM-THANH.md`):
  - `cao-su-truot`: tiếng cao su "rít" rất khẽ, rất ngắn (≈ 0,1 s), hơi khô, tần số trung; có hai bản: thường và dày hơn một chút (A07, A09, A15, A24, A32);
  - `can-kim`: kim cân quay lên rồi dừng, có tiếng lò xo nhỏ, 0,5–0,6 s (A17, A18).
- Chưa tải, mua hay sinh file nào ở bước này.

## Quy tắc chính xác trên hình
- **Mặt cắt tiếp xúc (ContactPatch):** khối gai **đi vào ở mép trước, bám, bị kéo cong dần, trượt ở gần mép sau** rồi bật ra. Vùng trượt luôn ở phía sau. Luôn có chú thích "mô hình giản lược" ở lần đầu (2.3). Không vẽ lốp trượt cả mảng hay quay trơn, trừ khi lời đọc nói (không có chỗ nào nói).
- **Bụi cao su:** chỉ sinh ở chỗ trượt (mép sau), nhiều hơn khi `load` hoặc `force` lớn hơn. Không vẽ khói.
- **Xe nặng hơn (3.6):** mảng tiếp xúc dài hơn, gai cong hơn, vùng trượt rộng hơn, bụi nhiều hơn. Không ghi phần trăm trên hình này.
- **Phép thử Emissions Analytics (3.2–3.4):** chạy cùng đoàn, ở Anh, 2023; chênh "≈ 490 kg"; "+26%" là **cao su mòn đi**, không phải tuổi thọ lốp; luôn kèm "mỗi xe dùng lốp theo xe". Không vẽ lốp hai xe giống nhau (factcheck-v1.2 #9).
- **Dải 20–30% (3.5):** chỉ ghi "một vài số liệu khác ở nước ngoài"; không ghi "thường", không gắn khối lượng (factcheck-v1.2 #11).
- **VF 8 – CR-V (4.2–4.5):** "≈ 1.870 kg" (VF 8 thế hệ mới, pin LFP) và "≈ 1.660 kg" (CR-V 1.5 turbo, **không ghi tên bản**); "khối lượng không tải, theo thông số hãng". **Không** ghi phần trăm mòn cho cặp này (FC #35), **không** nói pin LFP làm xe nhẹ (FC #36). Hai xe là bóng chung chung, không logo.
- **Lực xoắn (5.1):** đồ thị định tính, không trục số, chú thích "minh họa, không theo xe cụ thể". Đường điện cao **từ gần 0**, không vẽ phẳng tuyệt đối tới vô cùng (có thể giảm dần ở vòng tua cao).
- **Bánh chủ động (5.2):** không chỉ định cầu trước hay sau.
- **Đạp gắt (5.5):** gai cong mạnh, vùng trượt rộng; không khói, không lốp quay trơn.
- **Áp suất (6.4):** không ghi số áp suất. **Đảo lốp (6.5):** không vẽ một sơ đồ đảo cụ thể; chú thích "theo sách hướng dẫn".
- Không nói và không vẽ giá lốp (quyết định người dùng 2026-11-27).
- Không vẽ so sánh cỡ bàn tay (chưa có nguồn).

## "Thử trước"
1. Khung mẫu shot **2.3** (mặt cắt tiếp xúc, tiêu đề, phụ đề): duyệt hình chủ đạo, người xem có thấy "bám → kéo cong → trượt ở mép sau" không.
2. Khung mẫu shot **3.6** (hai mặt cắt nhẹ/nặng): khác biệt có rõ trên màn hình điện thoại không mà không phải đọc chữ.
3. Khung mẫu shot **4.2–4.4** (hai bàn cân và vạch chênh ≈ 210 kg cạnh mốc ≈ 490 kg).
4. Tạo `cao-su-truot` và nghe cùng một đoạn giọng trước khi làm hết.
5. Tạo giọng Tung Dang đủ 7 cảnh, đo thời lượng thật, khớp lại cue. Trước khi tạo giọng: kiểm lại khối lượng VF 8 thế hệ mới và CR-V trên trang hãng nếu có thay đổi.

## Việc cần bạn quyết
1. Xe vẽ dạng bóng SUV chung chung, chỉ khác màu và thẻ chữ (kể cả VF 8 và CR-V). Đề xuất: giữ như vậy, để tránh vẽ sai và không dùng hình nhận diện của hãng.
2. Có dùng nhạc nền không? Đề xuất: chưa, như các tập trước.
3. Tiếng cao su "rít" rất khẽ là tiếng đặc trưng của tập. Có muốn bỏ hẳn, chỉ dùng click/tick như tập 008 không? Đề xuất: giữ, nghe thử ở bước "thử trước" rồi quyết.
