# Storyboard — Video #007 Vì sao Subaru vẫn dùng động cơ boxer?

> **Bản 1, người dùng duyệt ngày 2026-11-26 (nhắn "Duyệt storyboard").** Đây không phải Cổng duyệt #2. Hai việc ở mục "Việc cần bạn quyết" theo đề xuất: shot 5.4 dùng sơ đồ, chưa dùng nhạc nền. Khung mẫu shot 2.3 (`mau/khung-mau-2.3.png`, composition `Sample007`) dựng ngày 2026-11-26, người dùng duyệt cùng ngày ("Duyệt khung mẫu"); ảnh soát động học ở `mau/dong-hoc-*.png`. Giọng Tung Dang đã tạo 2026-11-26 (`eleven_v4`, speed 0.90, như video 005), người dùng nghe và nhắn "Giọng ổn" cùng ngày; mốc thật ở `audio/eleven_v4/shot-timings.json` (tổng 02:14,2), thay cho mốc ước tính trong bảng. Đủ 35 shot đã dựng thành composition `Video007` (`pipeline/remotion/src/v007/`) ngày 2026-11-26, mới soát bằng ảnh tĩnh (`mau/soat/`, `mau/soat2/`), người dùng xem và nhắn "Hình ổn, làm âm thanh" cùng ngày. Hiệu ứng đã tạo (`pipeline/sfx-007.js`, sổ nguồn `audio/NGUON-AM-THANH.md`) và gắn ngày 2026-11-26 (`pipeline/remotion/src/v007/sound.jsx`, 29 lần phát); đã đo mức và mốc; người dùng nghe và nhắn "Tiếng ổn" cùng ngày. Bản xem thử render ngày 2026-11-26 ra `demo/video-007-xem-thu.mp4` (02:14,4; 1080×1920, 30 fps, h264 + aac 48 kHz; nhãn "BẢN NHÁP · chưa duyệt"), người dùng nhắn "Duyệt Cổng #2" cùng ngày cho bản này. Bản đăng render ngày 2026-11-26 ra `final/video-007-v2.2-ban-dang.mp4` (composition `Video007Dang`, góc phải để trống như video 005): tiếng giải mã giống hệt bản đã duyệt, hình chỉ khác nhãn góc. Chưa đăng.
> Đầu vào: `script/script-v2.2.md` (đã qua Cổng duyệt #1 ngày 2026-11-26) và `script/script.json`.
> **Khung 9:16, 1080×1920, 30 fps.** 35 shot, khoảng **02:01**, trung bình 3,5 s/shot (ngắn nhất 2,0 s, dài nhất 5,7 s).
> Mốc thời gian là ước tính ở 210 từ/phút, chưa tính khoảng nghỉ. Mỗi shot **neo vào cụm "Cue"** trong lời đọc để khớp lại theo giọng thật.

## Tóm tắt loại hình
| Loại | Số shot | Thời lượng ước tính |
|---|---|---|
| ANIMATION-CODE | 28 | 99,2 s (82%) |
| ĐỒ HỌA | 7 | 21,7 s (18%) |
| AI-IMAGE / AI-VIDEO | 0 | 0 |

**Credits Higgsfield: 0** (trần đề xuất: 0). Mọi cảnh đều là cơ chế hoặc sơ đồ, nên vẽ bằng mã. Subaru 1000 (shot 5.4) vẽ sơ đồ bố cục, không dùng ảnh AI vì AI dễ vẽ sai một mẫu xe có thật.
Giọng đọc: khoảng 1.900 ký tự ElevenLabs cho một lượt tạo.

## Bố cục và phong cách
- Theo `pipeline/remotion/src/vertical/layout.js`: header, tiêu đề lớn (y 380–560), hình (560–1320), phụ đề tô từng chữ (1340–1500), chú thích (1510–1570); chừa vùng nút Reels/Shorts.
- Nền và chữ theo `theme.js` như video 003 và 005 (chưa có `brand/style.md`). Vùng 140–360 để trống như video 005.
- **Màu cố định:**
  - máy boxer = hổ phách `#FFB000`;
  - máy thẳng hàng (so sánh) = xanh `#19B5FF`;
  - mũi tên lực, rung = trắng;
  - trọng tâm = chấm đỏ cam;
  - nhãn "theo Subaru" = chữ nhỏ màu xám nhạt.
- Hai góc nhìn dùng xuyên suốt, để người xem không lạc:
  - **nhìn từ trên xuống khối máy**: trục khuỷu, piston (Cảnh 2, 3, 6);
  - **nhìn từ trên xuống cả xe**: bố cục máy, hộp số (Cảnh 5, 7).
- Không logo hãng (Subaru, Porsche, Audi). Chỉ dùng chữ.

## Thành phần Remotion
- **Tái dùng:** Background, Header, Headline, KaraokeSubtitle, Footnote, Chip, Stamp (v003/v005); EngineBlock (`vertical/EngineBlock.jsx`) cho máy thẳng hàng nhìn nghiêng; động học tay quay–con trượt của `Cylinder` trong `v003/scenes2.jsx`.
- **Mới:**
  - BoxerEngine: khối máy nhìn từ trên, có trục khuỷu và 4 hoặc 6 piston; động học theo góc quay trục khuỷu.
  - InlineEngine (nhìn từ trên hoặc nghiêng, 4 xi-lanh);
  - ForceArrow;
  - BalanceShaft;
  - CarSection (mặt cắt ngang đầu xe);
  - CarTopView (bố cục máy, hộp số, trục truyền);
  - CoGMarker;
  - WidthBracket;
  - SparkPlug.

## Bảng shot
Phong cách tham chiếu: như mục trên. Credits mọi shot: 0.

| Cảnh | Shot | Bắt đầu | Thời lượng | Loại | Cue (lời đọc) | Tiêu đề lớn | Hình | Thành phần |
|---|---|---|---|---|---|---|---|---|
| 1 | 1.1 | 00:00.0 | 4,3s | ANIMATION-CODE | «Mở nắp ca-pô…» | **Thường: xi-lanh đứng** | Máy thẳng hàng 4 xi-lanh (xanh) nhìn nghiêng, nét vẽ; bốn xi-lanh sáng lần lượt từ trái sang phải. | InlineEngine, EngineBlock |
| 1 | 1.2 | 00:04.3 | 4,0s | ANIMATION-CODE | «Nhưng ở hầu hết…» | **Subaru: nằm ngang** | Máy boxer (hổ phách) trượt vào cạnh máy thẳng hàng; xi-lanh của nó nằm ngang sang hai bên. Chú thích nhỏ "hầu hết xe Subaru chạy xăng". | BoxerEngine, Footnote |
| 1 | 1.3 | 00:08.3 | 2,6s | ĐỒ HỌA | «Vì sao…» | **Vì sao vẫn giữ?** | Máy boxer ở giữa, dấu hỏi lớn. | Headline |
| 2 | 2.1 | 00:10.9 | 3,7s | ANIMATION-CODE | «Kiểu máy này…» | **Động cơ boxer** | Máy boxer xoay về góc nhìn từ trên xuống; hai thẻ chữ "boxer" và "đối đỉnh nằm ngang". | BoxerEngine, Chip |
| 2 | 2.2 | 00:14.6 | 4,0s | ANIMATION-CODE | «Các xi-lanh nằm…» | **Trục khuỷu ở giữa** | Vỏ máy mờ đi, lộ trục khuỷu nằm dọc giữa; xi-lanh hai bên. Nhãn "trục khuỷu (crankshaft)", trục bắt đầu quay chậm. | BoxerEngine, Chip |
| 2 | 2.3 | 00:18.6 | 4,3s | ANIMATION-CODE | «Hai piston đối diện…» | **Cùng vào, cùng ra** | Quay chậm: một cặp piston đối diện cùng tiến vào tâm rồi cùng lùi ra; cặp còn lại đi ngược pha. Tô sáng một cặp. | BoxerEngine |
| 2 | 2.4 | 00:22.9 | 2,0s | ANIMATION-CODE | «Trông như…» | **Như hai võ sĩ** | Hai găng đấm nét vẽ chồng lên cặp piston, hướng vào nhau rồi lùi ra cùng nhịp; găng **không chạm** nhau, piston không chạm nhau. | BoxerEngine, icon găng |
| 2 | 2.5 | 00:24.9 | 2,5s | ANIMATION-CODE | «Porsche 911…» | **Porsche 911: 6 xi-lanh** | Khối boxer 6 xi-lanh nét vẽ (3 mỗi bên); thẻ chữ "Porsche 911", không logo, không vẽ xe. | BoxerEngine (6), Chip |
| 3 | 3.1 | 00:27.4 | 3,5s | ANIMATION-CODE | «Piston chạy qua lại…» | **Đổi chiều liên tục** | Một piston chạy qua lại; mỗi lần tới đầu hành trình hiện một chấm sáng "đổi chiều". Không ghi số lần. | BoxerEngine (1 xi-lanh tách ra) |
| 3 | 3.2 | 00:30.9 | 3,4s | ANIMATION-CODE | «Mỗi lần đổi chiều…» | **Mỗi lần: một cú giật** | Mỗi lần piston đổi chiều, một mũi tên trắng bật ra theo hướng piston, khối máy nhích nhẹ theo. | ForceArrow |
| 3 | 3.3 | 00:34.3 | 3,4s | ANIMATION-CODE | «Ở máy boxer…» | **Đi ngược chiều nhau** | Trở lại cặp piston đối diện; hai piston đi ngược chiều, mỗi bên một mũi tên. | BoxerEngine, ForceArrow |
| 3 | 3.4 | 00:37.7 | 3,2s | ANIMATION-CODE | «Cú giật bên này…» | **Bù nhau phần lớn** | Hai mũi tên bằng nhau, ngược chiều, gặp nhau rồi gần như triệt tiêu; khối máy gần như đứng yên (vẫn nhích rất nhẹ). | BoxerEngine, ForceArrow |
| 3 | 3.5 | 00:40.9 | 3,1s | ANIMATION-CODE | «Máy thẳng hàng…» | **Thẳng hàng: còn một kiểu rung** | Máy thẳng hàng (xanh) nhìn nghiêng, piston 1–4 lên khi 2–3 xuống (đúng thứ tự); một mũi tên rung dọc nhấp nháy **nhanh gấp đôi** nhịp quay; khối máy rung lên xuống. | InlineEngine, ForceArrow |
| 3 | 3.6 | 00:44.0 | 2,6s | ANIMATION-CODE | «Máy lớn đôi khi…» | **Có khi thêm trục cân bằng** | Một cặp trục cân bằng nhỏ có quả lệch hiện dưới máy thẳng hàng, quay ngược chiều nhau; rung giảm. Chú thích "ở một số máy lớn". | InlineEngine, BalanceShaft, Footnote |
| 3 | 3.7 | 00:46.6 | 2,0s | ANIMATION-CODE | «Máy boxer 4 xi-lanh…» | **Boxer 4: không cần** | Máy boxer cạnh đó, chỗ trục cân bằng để trống, dấu tích. | BoxerEngine |
| 3 | 3.8 | 00:48.6 | 4,3s | ANIMATION-CODE | «Nhưng không phải…» | **Vẫn rung nhẹ** | Phóng sát máy boxer đang chạy: khối máy lắc rất nhẹ quanh tâm. Không vẽ máy đứng yên tuyệt đối; không ghi giải thích bậc rung. | BoxerEngine |
| 4 | 4.1 | 00:52.9 | 2,8s | ANIMATION-CODE | «Máy nằm ngang nên…» | **Dáng thấp** | Hai máy nhìn từ phía trước, đặt cạnh nhau trên cùng một vạch nền; thước chiều cao cho thấy boxer thấp hơn. Không ghi số. | InlineEngine, BoxerEngine |
| 4 | 4.2 | 00:55.7 | 4,3s | ANIMATION-CODE | «Nó có thể được đặt thấp…» | **Hạ trọng tâm** | Mặt cắt ngang đầu xe; khối boxer hạ thấp vào khoang máy; chấm trọng tâm của khối máy hạ theo. | CarSection, CoGMarker |
| 4 | 4.3 | 01:00.0 | 5,4s | ANIMATION-CODE | «Nhưng trọng tâm cả chiếc xe…» | **Cả xe mới quyết định** | Thu ra: hiện thân xe, gầm, hệ treo, bánh xe; nhãn từng phần. Chấm trọng tâm **của cả xe** hiện ở vị trí riêng, lớn hơn chấm của máy. | CarSection, CoGMarker, Chip |
| 4 | 4.4 | 01:05.4 | 2,9s | ANIMATION-CODE | «Một chiếc Subaru gầm cao…» | **Gầm cao vẫn là gầm cao** | Hình bóng một xe gầm cao chung chung (không dáng mẫu cụ thể), thước khoảng sáng gầm. | CarSection |
| 4 | 4.5 | 01:08.3 | 2,6s | ĐỒ HỌA | «Động cơ chỉ là…» | **Một phần câu chuyện** | Các mảnh "thân xe", "gầm", "hệ treo", "động cơ" xếp cạnh nhau; mảnh động cơ sáng nhẹ, không lớn hơn mảnh khác. | Chip |
| 5 | 5.1 | 01:10.9 | 2,5s | ĐỒ HỌA | «Với Subaru…» | **Còn một lý do: chiều dài** | Thước dài nằm ngang. | Headline |
| 5 | 5.2 | 01:13.4 | 2,0s | ANIMATION-CODE | «Máy boxer ngắn…» | **Ngắn theo chiều trước sau** | Hai máy nhìn từ trên, đặt dọc cùng hướng; thước trước sau cho thấy boxer ngắn hơn. Không ghi số. | InlineEngine, BoxerEngine |
| 5 | 5.3 | 01:15.4 | 4,3s | ANIMATION-CODE | «Subaru giải thích…» | **Đặt dọc vẫn gọn** | Nhìn từ trên xuống đầu xe: thử đặt dọc máy thẳng hàng, nó lấn tới vách ngăn khoang lái; thay bằng boxer, vừa khoang. Chú thích "theo Subaru". | CarTopView, Footnote |
| 5 | 5.4 | 01:19.7 | 3,2s | ĐỒ HỌA | «Năm 1966…» | **1966: Subaru 1000** | Sơ đồ nhìn từ trên: đầu xe với máy boxer đặt dọc, nhãn "1966", "Subaru 1000", "dẫn động cầu trước". **Không vẽ hộp số** (chưa có nguồn vị trí). Không dùng ảnh xe. | CarTopView, Chip |
| 5 | 5.5 | 01:22.9 | 4,5s | ANIMATION-CODE | «Subaru xem bố cục ấy…» | **Nền móng cho AWD (theo Subaru)** | Sơ đồ 1966 sáng viền; một đường thời gian ngắn kéo về phía sau, chữ "hệ dẫn động bốn bánh về sau". Chú thích "theo Subaru". | CarTopView, Footnote |
| 5 | 5.6 | 01:27.4 | 4,0s | ANIMATION-CODE | «Trên các xe Subaru sau này…» | **Hộp số ngay sau máy** | Sơ đồ xe đời sau: hộp số "click" vào ngay sau máy boxer; trục truyền ra phía sau chỉ hiện mờ, không giải thích (để tập sau). | CarTopView |
| 6 | 6.1 | 01:31.4 | 2,6s | ANIMATION-CODE | «Nhưng máy boxer…» | **Bè rộng** | Máy boxer nhìn từ trước trong khoang máy; thước chiều ngang mở ra, gần chạm hai bên khoang. | CarSection, WidthBracket |
| 6 | 6.2 | 01:34.0 | 3,4s | ANIMATION-CODE | «Nó có hai nắp máy…» | **Hai nắp máy** | Hai nắp máy hai bên sáng lên, chữ "×2"; máy thẳng hàng nhỏ ở góc chỉ có một nắp máy. | BoxerEngine, InlineEngine |
| 6 | 6.3 | 01:37.4 | 4,9s | ANIMATION-CODE | «Ở một số mẫu xe…» | **Bugi khó tiếp cận** | Phóng vào một bên máy: bugi nằm sát thành khoang máy, khoảng trống hẹp; một cờ lê nét vẽ không xoay đủ vòng. Chú thích "ở một số mẫu xe". Không vẽ thành hướng dẫn tháo lắp. | CarSection, SparkPlug, Footnote |
| 7 | 7.1 | 01:42.3 | 5,7s | ĐỒ HỌA | «Hóa ra là vậy…» | **Hóa ra là vậy** | Bàn cân: một bên "thấp, ngắn, ít rung", bên kia "rộng, phức tạp, khó sửa"; cân không nghiêng hẳn về bên nào. | Stamp, Chip |
| 7 | 7.2 | 01:48.0 | 2,9s | ANIMATION-CODE | «Mà vì nó hợp…» | **Hợp với cách bố trí xe** | Mảnh máy boxer khớp vào sơ đồ xe nhìn từ trên. | CarTopView |
| 7 | 7.3 | 01:50.9 | 3,1s | ĐỒ HỌA | «Lựa chọn ấy…» | **Nhiều thập kỷ** | Đường thời gian "1966 → nay", máy boxer ở hai đầu. | Chip |
| 7 | 7.4 | 01:54.0 | 4,9s | ANIMATION-CODE | «Còn hệ dẫn động…» | **AWD hoạt động ra sao?** | Sơ đồ xe từ trên: đường truyền lực sáng dần từ hộp số ra bốn bánh rồi mờ đi; thẻ chữ "Audi quattro?" (không logo); dấu hỏi. | CarTopView, Chip |
| 7 | 7.5 | 01:58.9 | 2,0s | ĐỒ HỌA | «Tập sau.» | **Tập sau: AWD** | Thẻ "Tập sau: hệ dẫn động bốn bánh", tên kênh. Có 1,5 s không lời ở cuối. | Headline |

## Âm thanh
Theo mục "Thiết kế âm thanh cho animation" trong `CLAUDE.md` và góp ý của người dùng ở video 005: to hơn và nhiều hơn bản đầu một chút, không quá tay, không có tiếng kéo dài đè lên giọng.
Mức khởi đầu lấy theo bản 2 của video 005: **vừa ≈ −8 dB, nhẹ ≈ −13 dB, nền ≈ −21 dB** so với đỉnh giọng. Thời điểm tính từ đầu shot, là ước tính; khi dựng lấy frame từ mốc animation.

| ID | Shot | Lớp | Âm thanh | Cue hình | Thời điểm | Thời lượng | Mức | File |
|---|---|---|---|---|---|---|---|---|
| A01 | 1.1 | chuyển động | "tick" nhỏ, khô, bốn lần cao dần | từng xi-lanh sáng | +0,4 s, cách 0,5 s | 4 × 0,08 s | nhẹ | CẦN TẠO |
| A02 | 1.2 | chuyển động | trượt nhẹ rồi "cộp" êm | máy boxer trượt vào và dừng | +0,3 s | 0,6 s | nhẹ | CẦN TẠO |
| A03 | 2.2 | chuyển động | "click" kim loại nhỏ | nhãn trục khuỷu bật ra | +0,8 s | 0,12 s | nhẹ | dùng lại `click` (005) |
| A04 | 2.3 | chuyển động | "thụp" mềm, trầm, **một tiếng mỗi lần cặp piston tới điểm trong cùng** | cặp piston tô sáng chạm điểm trong | theo hình, 2–3 lần | 0,1 s mỗi lần | nền | CẦN TẠO |
| A05 | 2.4 | chuyển động | "bụp" găng đấm, hai bên cùng lúc, nhỏ | hai găng đưa ra cùng nhịp | +0,5 s | 0,15 s | nhẹ | CẦN TẠO |
| A06 | 2.5 | chuyển động | "click" cao | thẻ "Porsche 911" hiện | +0,3 s | 0,12 s | nhẹ | dùng lại `click-cao` (005) |
| A07 | 3.2 | chuyển động | "thịch" ngắn, trầm, mỗi lần piston đổi chiều | mũi tên bật ra, khối máy nhích | theo hình, 2 lần | 0,12 s mỗi lần | nhẹ | CẦN TẠO |
| A08 | 3.4 | chuyển động | hai "thịch" cùng lúc, tiếng nhỏ dần như bị dập | hai mũi tên gặp và triệt tiêu | +1,0 s | 0,3 s | nhẹ | CẦN TẠO (biến thể A07) |
| A09 | 3.5 | chuyển động | rè rung ngắn, nhịp nhanh gấp đôi nhịp quay của hình | máy thẳng hàng rung | +0,4 s | 0,8 s, fade ra 0,2 s | nhẹ | CẦN TẠO |
| A10 | 3.6 | chuyển động | "cạch" cơ khí trầm | trục cân bằng gắn vào | +0,3 s | 0,15 s | nhẹ | dùng lại `cach-co-khi` (005) |
| A11 | 3.7 | chuyển động | "ting" ngắn, sáng | dấu tích hiện | +0,6 s | 0,3 s | nhẹ | CẦN TẠO |
| A12 | 4.2 | chuyển động | "thả" trầm, êm | khối máy hạ vào khoang | +0,6 s | 0,3 s | nhẹ | CẦN TẠO |
| A13 | 4.3 | chuyển động | "whoosh" ngắn, êm | thu ra cả chiếc xe | +0 s | 0,4 s | nhẹ | dùng lại `whoosh` (005) |
| A14 | 5.3 | chuyển động | "cộp" đục khi máy thẳng hàng chạm vách, rồi "click" khi boxer vừa chỗ | hai sự kiện trên hình | +1,2 s và +2,8 s | 0,15 s + 0,12 s | nhẹ | CẦN TẠO + dùng lại `click` |
| A15 | 5.4 | chuyển động | "whoosh" như A13 | chuyển sang sơ đồ 1966 | +0 s | 0,4 s | nhẹ | dùng lại `whoosh` |
| A16 | 5.6 | chuyển động | "click" chắc hơn A03, trầm hơn | hộp số gắn vào sau máy | +0,6 s | 0,15 s | vừa | CẦN TẠO |
| A17 | 6.2 | chuyển động | hai "click" lần lượt | từng nắp máy sáng | +0,4 s và +0,8 s | 2 × 0,12 s | nhẹ | dùng lại `click`, `click-cao` |
| A18 | 6.3 | chuyển động | cờ lê chạm kim loại, "keng" nhỏ, cụt | cờ lê vướng thành khoang | +1,5 s | 0,2 s | nhẹ | CẦN TẠO |
| A19 | 7.2 | chuyển động | "khớp" gọn, có chút ngân | mảnh boxer khớp vào sơ đồ | +0,5 s | 0,5 s | vừa | dùng lại `khop-manh` (005) |
| A20 | 7.5 | chuyển động | chuông ngắn | tên kênh hiện | +0,4 s | 0,8 s | nhẹ | dùng lại `chuong` (005) |

- **Nhạc nền:** chưa đặt cue. Đề xuất không dùng nhạc, như video 005.
- **Môi trường:** không có. Tiếng máy boxer thật chỉ thêm nếu tìm được bản thu có giấy phép rõ. Nếu thêm, **không** được gợi ý rằng tiếng "ục ục" là do kiểu boxer: theo S13, tiếng đó do ống xả không dài bằng nhau.
- **Không có tiếng** ở các shot còn lại, kể cả khi cắt shot thông thường.
- Tiếng cơ chế đi theo chuyển động: A04 mỗi lần cặp piston vào trong một tiếng; A07 mỗi lần đổi chiều một tiếng; A09 theo nhịp nhanh gấp đôi, khớp với hình rung bậc hai. A08 phải nghe nhỏ dần (bù nhau), nhưng **không im hẳn**, để khớp ý "phần lớn".

### Âm thanh còn thiếu
- **Dùng lại** (tự tổng hợp bằng `pipeline/sfx-005.js`, đã ghi nguồn ở video 005): `click`, `click-cao`, `cach-co-khi`, `whoosh`, `khop-manh`, `chuong`. Khi dựng, chép sang `projects/007-subaru-may-boxer/assets/audio/sfx/` và ghi lại từng dòng vào `audio/NGUON-AM-THANH.md` của video 007.
- **Cần tạo** (tự tổng hợp, ghi lệnh vào `NGUON-AM-THANH.md`):
  - tick bốn bậc (A01);
  - trượt và cộp (A02);
  - thụp piston (A04);
  - bụp găng (A05);
  - thịch đổi chiều và biến thể bị dập (A07, A08);
  - rè rung nhịp đôi (A09);
  - ting (A11);
  - thả trầm (A12);
  - cộp đục (A14);
  - click trầm (A16);
  - keng cờ lê (A18).
- Chưa tải, mua hay sinh file nào ở bước này.

## Quy tắc chính xác trên hình
- **Động học boxer 4:** mỗi cặp piston đối diện cùng vào, cùng ra (S16, S18). Hai cặp lệch pha nhau: cặp trước ra thì cặp sau vào. Trục khuỷu nằm dọc giữa hai dãy xi-lanh. Piston không bao giờ chạm nhau.
- **Xi-lanh đối diện lệch nhau một chút dọc trục khuỷu** (mỗi tay biên một cổ khuỷu riêng). Vẽ đúng điều này ở góc nhìn từ trên, nhưng không giải thích bằng lời hay chữ.
- **Máy thẳng hàng 4:** piston 1 và 4 cùng lên khi 2 và 3 xuống. Không vẽ bốn piston cùng chiều. Rung còn lại vẽ bằng **một** mũi tên dọc nhấp nháy nhanh gấp đôi nhịp quay (đúng bản chất rung bậc hai, F1 trong `factcheck-v2.1.md`); không ghi chữ "bậc hai".
- **Trục cân bằng (3.6):** một cặp trục có quả lệch, quay ngược chiều nhau, nhanh gấp đôi trục khuỷu (F1); ghi "ở một số máy lớn". Không vẽ trục cân bằng trên máy boxer 4.
- **Rung còn lại của boxer (3.4, 3.8):** khối máy vẫn chuyển động rất nhẹ; không đứng yên tuyệt đối.
- **Trọng tâm (4.2–4.3):** không ghi con số, không vẽ chấm trọng tâm cả xe dịch chuyển nhiều chỉ vì đổi máy.
- **Bố cục xe (5.3–5.6, 7.2–7.4):** máy đặt dọc. Shot 5.4 (1966) **không vẽ hộp số**. Shot 5.6 mới có hộp số ngay sau máy (S2, nguồn hãng). Chú thích "theo Subaru" ở 5.3 và 5.5.
- **Tập sau:** 7.4 chỉ cho đường truyền lực sáng lên rồi mờ; không vẽ vi sai trung tâm, không tỷ lệ chia lực, không so sánh với Audi.
- **Bugi (6.3):** chỉ minh họa chỗ hẹp; không trình bày như hướng dẫn tự thay.
- Không logo hãng; không vẽ dáng chi tiết của mẫu xe có thật (Subaru 1000, Porsche 911, xe gầm cao).

## "Thử trước"
1. Một khung mẫu shot 2.3 (boxer nhìn từ trên, cặp piston tô sáng, tiêu đề, phụ đề) để duyệt cách nhìn.
2. Kiểm động học BoxerEngine và InlineEngine bằng vài khung tĩnh ở các góc quay 0°, 90°, 180°, 270°.
3. Kiểm vùng an toàn trên điện thoại.
4. Tạo ba tiếng A04, A07, A09 và nghe cùng một đoạn giọng trước khi làm hết.
5. Tạo giọng Tung Dang đủ 7 cảnh, đo thời lượng thật, khớp lại cue. Trước khi tạo giọng, kiểm lại danh sách mẫu Subaru dùng boxer.

## Việc cần bạn quyết
1. Shot 5.4 vẽ sơ đồ thay cho ảnh Subaru 1000. Có muốn tìm ảnh tư liệu có giấy phép không? Đề xuất: không, vì sơ đồ đủ ý.
2. Có dùng nhạc nền không? Đề xuất: chưa.
