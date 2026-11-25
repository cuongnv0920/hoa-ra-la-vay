# Storyboard — Video #002 Phanh đĩa

> Bản nháp 1, 2026-11-23. Đầu vào: kịch bản bản nháp 2 (đã qua fact-check và **Cổng duyệt #1** ngày 2026-11-23). Chưa qua Cổng duyệt #2.
> Tổng thời lượng: **07:11** (431 giây). Mốc thời gian **ước tính theo nhịp đọc thật của Cảnh 1** (Tung Dang, Eleven v4, tạo trên web): 80 từ trong ~23 giây, tức ~0,29 giây/từ (~210 từ/phút, nhanh hơn chuẩn 150 từ/phút của dự án). Sẽ khớp lại bằng `assets/audio/<model>/timings.json` khi có audio đủ 16 cảnh.

## Tóm tắt loại hình
| Loại | Số shot | Tổng thời lượng | Ghi chú |
|---|---|---|---|
| ANIMATION-CODE | 20 | 282s (65%) | Mọi cơ chế; không tốn credits |
| ĐỒ HỌA | 10 | 99s (23%) | Thẻ chữ, số liệu, timeline; không tốn credits |
| AI-IMAGE | 5 | 42s (10%) | Bối cảnh lịch sử + đường đèo, Ken Burns |
| AI-VIDEO | 2 | 8s (2%) | Chỉ 2 clip ngắn (hook, kết) |

## Style
Style tạm (`brand/style.md` chưa có), theo hướng "blueprint kỹ thuật + điện ảnh tối" trong `brand/README.md`. Màu theo ý nghĩa, dùng thống nhất cả video:
- nền navy #0B1220; đĩa và kẹp phanh xám kim loại;
- **dầu phanh hổ phách #FFB000**; **không khí / hơi nước xanh #19B5FF**; **nhiệt đỏ cam #FF4D1A**;
- chữ trắng đậm, nhãn tiếng Việt kèm tên gốc (caliper, brake booster, master cylinder, brake fade).

## Ràng buộc ngân sách (gói Starter)
- **Higgsfield: gói free, 0 credits** (lần kiểm gần nhất). Cần đăng ký Starter trước khi sinh ảnh/clip.
- Chưa có bảng giá từng lượt sinh, nên đặt **trần theo số lượt**:
  - AI-IMAGE: tối đa **5 ảnh chính + 3 ảnh thử/dự phòng** (1k, 16:9).
  - AI-VIDEO: tối đa **2 clip × 4 giây**, luôn làm bản nháp 480p trước.
  - Vượt ngân sách → AI-VIDEO đổi sang AI-IMAGE (Ken Burns) → AI-IMAGE đổi sang ĐỒ HỌA.
- Mọi phần giải thích cơ khí dùng ANIMATION-CODE. **Prompt AI không mô tả đĩa, kẹp, piston hay bất kỳ chi tiết phanh nào**; đĩa phanh đỏ rực ở hook cũng là 3D lập trình.
- ElevenLabs: toàn kịch bản ~6.800 ký tự. Gói free đủ để nghe thử trên web, nhưng **bản dùng cho video đăng cần Starter** (quyền thương mại + API để đo thời lượng tự động).

## "Thử trước" (theo thứ tự, trước khi sinh hàng loạt)
1. **Audio:** khi có Starter, chạy `node --env-file=.env pipeline/tts.js projects/002-phanh-dia --model eleven_v4` cho đủ 16 cảnh → có `timings.json` → khớp lại cột "Bắt đầu / Thời lượng".
2. **Ảnh thử:** sinh 1 ảnh shot 3.1 ở 1k; kiểm tra đúng thời đại, không chữ/logo lạ; ghi credits đã tiêu.
3. **Clip nháp:** shot 1.1 ở 480p; kiểm tra không có biển số/mặt người đọc được; ghi credits.
4. Từ hai con số thật, tính **tổng chi phí dự kiến** rồi mới sinh tiếp.
5. **Prototype Remotion DiscCaliper3D** (kẹp trượt, shot 12.2): kiểm tra động học đúng — piston đẩy má trong về phía đĩa, thân kẹp trượt **ngược chiều** trên chốt dẫn hướng, má ngoài áp vào mặt kia; hai má chạm đĩa cùng lúc.

## Thành phần Remotion cần dựng
- **DiscCaliper3D** (đĩa + kẹp cố định/trượt, mặt cắt đĩa thông gió) — dùng ở cảnh 1, 12, 13, 15, 16 (~89s) → **làm đầu tiên**.
- **SystemDiagram** (bàn đạp → trợ lực → xi lanh chính → ống dầu → kẹp; trạm sáng lần lượt) — cảnh 7, 10, 16 (~43s).
- PedalLever · BoosterCutaway · HydraulicLine · SyringePair · HeatMap · FadeCurve · DrumBrakeCutaway · DiscCaliper2D.
- Dùng chung với video 001 (nên dựng thành thư viện chung trong `pipeline/`): **Speedometer, TimelineCard, TitleCard, Subtitle**, cùng BarCompare và MultiplyCard.

## Bảng shot
| Cảnh | Shot | Bắt đầu | Thời lượng | Loại | Mô tả | Thành phần | Credits ước tính |
|---|---|---|---|---|---|---|---|
| 1 | 1.1 | 00:00 | 4s | AI-VIDEO | Nhìn qua kính lái lúc chạng vạng, xe phía trước bất ngờ sáng đèn phanh đỏ. Không thấy biển số, không thấy mặt người. | — | 1 clip (nháp 480p trước) |
| 1 | 1.2 | 00:04 | 6s | ANIMATION-CODE | Đồng hồ tốc độ tụt 100 → 0; chữ "~3 giây (ước tính, chưa tính thời gian phản xạ)". | Speedometer | 0 |
| 1 | 1.3 | 00:10 | 13s | ANIMATION-CODE | Đĩa phanh 3D trong bóng tối, chuyển dần sang đỏ cam (bản đồ nhiệt); thẻ "≈ 1,7 lít nước từ 20 °C". Camera lùi ra thấy đĩa nằm sau vành bánh. | DiscCaliper3D, HeatMap | 0 |
| 2 | 2.1 | 00:23 | 14s | ĐỒ HỌA | Hai thanh so sánh: "Động cơ xe phổ thông ~78 kW" và "Phanh khi dừng gấp ~500 mã lực"; chú thích nhỏ giả định (1.500 kg, 0,9 g, công suất đỉnh lúc bắt đầu phanh). | BarCompare | 0 |
| 2 | 2.2 | 00:37 | 8s | ĐỒ HỌA | Hình bàn chân tối giản trên bàn đạp; chữ chuyển sang "hơn 120 năm trước…", lật trang tông phim. | TitleCard | 0 |
| 3 | 3.1 | 00:45 | 8s | AI-IMAGE | Xưởng cơ khí nước Anh đầu thế kỷ 20, ánh sáng cửa sổ, tông phim, Ken Burns. Gắn nhãn "ảnh minh họa do AI tạo". Không nhận là xưởng Lanchester thật. | — | 1 ảnh (1k) + 1 dự phòng |
| 3 | 3.2 | 00:53 | 5s | ĐỒ HỌA | Thẻ "1902 · Anh · Frederick Lanchester" và dòng nhỏ "Anh em Wright bay: 12/1903". | TimelineCard | 0 |
| 3 | 3.3 | 00:58 | 14s | ANIMATION-CODE | Sơ đồ nguyên lý tự vẽ: đĩa mỏng bị kẹp từ hai phía, kéo bằng dây cáp; nhãn "minh họa nguyên lý, không phải bản vẽ gốc". Kết bằng chữ "chờ gần nửa thế kỷ". | DiscCaliper2D | 0 |
| 4 | 4.1 | 01:12 | 10s | AI-IMAGE | Xe nhỏ kiểu Mỹ cuối thập niên 1940 trên đường tuyết rải muối, trời xám, Ken Burns. Gắn nhãn "ảnh minh họa do AI tạo". Không nhận là Crosley thật. | — | 1 ảnh (1k) + 1 dự phòng |
| 4 | 4.2 | 01:22 | 12s | ANIMATION-CODE | Cụm kẹp phanh hợp kim nhẹ bị đốm gỉ lan dần, piston kẹt (mũi tên đẩy không nhúc nhích); thẻ "~1 năm sau → quay về tang trống". | DiscCaliper2D | 0 |
| 5 | 5.1 | 01:34 | 10s | AI-IMAGE | Xe đua thể thao thập niên 1950 chạy đêm, đèn pha, vệt sáng, tông phim, Ken Burns. Gắn nhãn "ảnh minh họa do AI tạo". Không vẽ logo, không nhận là Jaguar thật. Nếu có ảnh tư liệu phạm vi công cộng thì ưu tiên. | — | 1 ảnh (1k) + 1 dự phòng |
| 5 | 5.2 | 01:44 | 12s | ĐỒ HỌA | Thẻ "Le Mans 1953 · Rolt & Hamilton · 105,85 mph ≈ 170 km/h trung bình · lần đầu vượt 100 mph"; dòng "phanh đĩa Dunlop, kinh nghiệm phanh máy bay". | TimelineCard | 0 |
| 5 | 5.3 | 01:56 | 8s | ĐỒ HỌA | Thẻ ý kiến phản biện: "John Wyer: thắng nhờ cả chiếc xe, không chỉ nhờ phanh" (diễn ý, không đặt trong ngoặc kép trích dẫn). | TitleCard | 0 |
| 6 | 6.1 | 02:04 | 6s | AI-IMAGE | Sedan Pháp thập niên 1950 trên phố Paris, Ken Burns. Gắn nhãn "ảnh minh họa do AI tạo". Không nhận là Citroën DS thật; nếu có ảnh tư liệu hợp lệ thì ưu tiên. | — | 1 ảnh (1k) |
| 6 | 6.2 | 02:10 | 10s | ĐỒ HỌA | Dòng thời gian bốn điểm: 1902 Lanchester → 1949 Crosley → 1953 Le Mans → 1955 Citroën DS; chữ "rời đường đua, vào gara". | TimelineCard | 0 |
| 7 | 7.1 | 02:20 | 14s | ANIMATION-CODE | Sơ đồ toàn hệ thống: bàn đạp → bầu trợ lực → xi lanh chính → ống dầu → kẹp phanh; bốn trạm sáng lần lượt, ba trạm đầu có dấu "×". | SystemDiagram | 0 |
| 8 | 8.1 | 02:34 | 16s | ANIMATION-CODE | Bàn đạp xoay quanh chốt, hai cánh tay đòn có số đo (tỉ lệ 4:1, nhãn "có thể"); mũi tên lực 20 → 80 kgf. | PedalLever | 0 |
| 9 | 9.1 | 02:50 | 24s | ANIMATION-CODE | Mặt cắt bầu trợ lực: hai khoang chân không, màng ngăn, van; đạp phanh → không khí (chấm xanh) tràn vào một khoang, màng đẩy cần sang phải. Nhãn "brake booster". | BoosterCutaway | 0 |
| 9 | 9.2 | 03:14 | 7s | ANIMATION-CODE | Biểu tượng chìa khóa tắt máy; đạp vài lần, đồng hồ chân không tụt về 0, bàn đạp "cứng". | BoosterCutaway | 0 |
| 10 | 10.1 | 03:21 | 10s | ANIMATION-CODE | Ống dầu màu hổ phách kín: đẩy một đầu, sóng áp suất lan khắp; chữ "nguyên lý Pascal". | HydraulicLine | 0 |
| 10 | 10.2 | 03:31 | 22s | ANIMATION-CODE | Hai ống tiêm trong suốt nối nhau: piston nhỏ đi dài, piston to đi ngắn; hiện "áp suất như nhau", "diện tích × 6 → lực × 6 (ví dụ)", "quãng đường ÷ 6". | SyringePair | 0 |
| 10 | 10.3 | 03:53 | 13s | ANIMATION-CODE | Ống tiêm biến thành xi lanh chính (nhãn "master cylinder — nhiều người gọi là tổng phanh") và piston kẹp phanh; bàn đạp đi sâu, piston bánh xe nhích rất ít. | SystemDiagram, SyringePair | 0 |
| 11 | 11.1 | 04:06 | 19s | ĐỒ HỌA | Phép nhân hiện từng bước: 20 kgf × 4 × 3 × 6 ≈ 1.440 kgf → "≈ 70 lần"; chữ "ví dụ minh họa — mỗi xe một khác". | MultiplyCard | 0 |
| 12 | 12.1 | 04:25 | 10s | ANIMATION-CODE | Mặt cắt kẹp cố định: piston ở hai bên cùng tiến vào ép đĩa. Nhãn "caliper — nhiều người gọi là heo phanh". | DiscCaliper3D | 0 |
| 12 | 12.2 | 04:35 | 20s | ANIMATION-CODE | Mặt cắt kẹp trượt: piston đẩy má trong; thân kẹp trượt trên chốt dẫn hướng theo chiều ngược, kéo má ngoài áp vào đĩa. Chữ "một piston, hai má phanh". | DiscCaliper3D | 0 |
| 13 | 13.1 | 04:55 | 10s | ANIMATION-CODE | Má phanh ép đĩa đang quay, đĩa đổi màu theo bản đồ nhiệt; chữ "động năng → nhiệt". | DiscCaliper3D, HeatMap | 0 |
| 13 | 13.2 | 05:05 | 14s | ANIMATION-CODE | Mặt cắt đĩa thông gió: hai lớp, gân nối, rãnh gió; luồng khí đi từ tâm ra mép khi đĩa quay. Nhãn "đĩa gang". | DiscCaliper3D | 0 |
| 14 | 14.1 | 05:19 | 12s | ANIMATION-CODE | Đường cong nhiệt độ–ma sát: ma sát tụt sau ngưỡng nhiệt độ làm việc; nhãn "phai phanh — brake fade". | FadeCurve | 0 |
| 14 | 14.2 | 05:31 | 18s | ANIMATION-CODE | Cốc dầu phanh hút hơi nước (chấm xanh); thẻ "FMVSS 116 — DOT 4: tối thiểu 230 °C (khô) / 155 °C (ướt)"; bọt khí trong ống, bàn đạp lún sâu. | HydraulicLine | 0 |
| 14 | 14.3 | 05:49 | 6s | ĐỒ HỌA | Thẻ "Thay dầu phanh ~2 năm/lần hoặc theo sổ bảo dưỡng". | TitleCard | 0 |
| 14 | 14.4 | 05:55 | 8s | AI-IMAGE | Đường đèo dài đổ dốc, nhìn từ trên cao, Ken Burns; chữ chồng "về số thấp — để động cơ hãm bớt". Gắn nhãn "ảnh minh họa do AI tạo". | — | 1 ảnh (1k) |
| 15 | 15.1 | 06:03 | 18s | ANIMATION-CODE | Mặt cắt tang trống: trống quay kéo guốc phanh ép chặt hơn (mũi tên "tự trợ lực"), nhiệt tích tụ bên trong. | DrumBrakeCutaway, HeatMap | 0 |
| 15 | 15.2 | 06:21 | 13s | ANIMATION-CODE | Tang trống và đĩa đặt cạnh nhau: đĩa hở tỏa nhiệt; nhãn "bánh trước: đĩa", "bánh sau nhiều xe: tang trống — rẻ, làm phanh tay tốt". | DrumBrakeCutaway, DiscCaliper3D | 0 |
| 16 | 16.1 | 06:34 | 16s | ANIMATION-CODE | Camera kéo ra từ cụm kẹp phanh thành toàn hệ thống; bốn trạm sáng lần lượt theo lời đọc; chữ "≈ 70 lần". | SystemDiagram, DiscCaliper3D | 0 |
| 16 | 16.2 | 06:50 | 7s | ĐỒ HỌA | Dòng thời gian thu gọn 1902 → 1953 (tái dùng 6.2). | TimelineCard | 0 |
| 16 | 16.3 | 06:57 | 4s | AI-VIDEO | Xe dừng ở đèn đỏ lúc chạng vạng, đèn phanh sáng, nhìn từ phía sau. Không biển số đọc được. | — | 1 clip (nháp 480p trước) |
| 16 | 16.4 | 07:01 | 10s | ĐỒ HỌA | Màn kết: tên kênh (chờ chốt); "Tập sau: Ly hợp" với hình đĩa ly hợp tối giản. | TitleCard | 0 |

## Prompt cho AI (chỉ các shot AI)
- **1.1 (AI-VIDEO, 4s):** `Driver point of view through a windshield at dusk on a city road, the car ahead suddenly lights up its red brake lights, slight forward lurch, shallow depth of field, no readable license plates, no faces, no text, 16:9, 4 seconds`
- **3.1 (AI-IMAGE, 8s):** `Illustration of an early 1900s English engineering workshop, workbenches and lathes, daylight through tall windows, sepia and teal film tones, film grain, wide shot, no people facing camera, no readable text, no logos, 16:9`
- **4.1 (AI-IMAGE, 10s):** `Illustration of a small late-1940s American compact car parked on a snowy salted street, grey winter sky, slush, film grain, muted tones, wide shot, no readable text, no logos, 16:9`
- **5.1 (AI-IMAGE, 10s):** `Illustration of a 1950s open-top endurance race car at night on a country circuit, headlights glowing, light trails, motion blur, film grain, teal and amber tones, no logos, no readable text, no numbers, 16:9`
- **6.1 (AI-IMAGE, 6s):** `Illustration of a 1950s French sedan on a Paris boulevard, cobblestones, soft overcast light, film grain, wide shot, no logos, no readable text, 16:9`
- **14.4 (AI-IMAGE, 8s):** `Illustration of a long winding mountain road descending into a valley, a single car far below, late afternoon light, film grain, wide aerial view, no readable text, no logos, 16:9`
- **16.3 (AI-VIDEO, 4s):** `Cinematic rear view of a car slowing to a stop at a red traffic light at dusk, brake lights glowing, wet asphalt reflections, slow push-in, no readable license plates, no text, 16:9, 4 seconds`

## Quy tắc đăng và nhãn
- Mọi ảnh/clip AI cảnh thực tế (xưởng, xe, đường) phải **bật nhãn "altered/synthetic content"** khi đăng (nguyên tắc 5) và ghi "ảnh minh họa do AI tạo" trên hình.
- Không khẳng định ảnh AI là xe/hiện vật thật (Lanchester, Crosley, Jaguar C-Type, Citroën DS). Ảnh tư liệu: chỉ dùng khi chắc chắn thuộc phạm vi công cộng hoặc có giấy phép.
- Số liệu tính toán (3 giây, 1,7 lít, 500 mã lực, 70 lần) luôn kèm chữ "ước tính" hoặc "ví dụ minh họa" như kịch bản.

## Việc cần bạn quyết
1. **Thời lượng:** theo nhịp thật, video còn ~7 phút (không phải 10). Giữ nhịp đọc này, hay giảm tốc độ giọng (speed ~0,9) cho chậm và trầm hơn?
2. **Nâng cấp ElevenLabs Starter** để tạo audio thật cho cả 16 cảnh (bạn tự thanh toán).
3. **Higgsfield Starter** để chạy bước ảnh/clip thử — hoặc làm phần ANIMATION-CODE trước (không tốn credits) trong lúc chờ.
4. Chấp nhận hay không 2 clip AI-VIDEO (1.1 hook, 16.3 kết); nếu không, đổi sang ảnh Ken Burns.
5. Chốt brand (tên kênh, bảng màu); hiện style chỉ là tạm.
