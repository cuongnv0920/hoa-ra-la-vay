# Storyboard — Video #008 Subaru và Audi: cùng bốn bánh, khác ở đâu?

> **Bản 1, người dùng duyệt ngày 2026-11-26 (nhắn "Duyệt storyboard").** Đây không phải Cổng duyệt #2. Ba việc ở mục "Việc cần bạn quyết" theo đề xuất: xe vẽ hình khối chung chung, chưa dùng nhạc nền, shot 7.1 giữ bàn tay nét vẽ. Khung mẫu shot 6.6 (`Sample008A`) và 4.5 (`Sample008B`) dựng ngày 2026-11-26, ảnh tĩnh ở `mau/a/`, `mau/b/`; người dùng duyệt cùng ngày ("Duyệt khung mẫu"). Thành phần mới: `pipeline/remotion/src/v008/Drivetrain.jsx`, `ClutchPack.jsx`. Giọng Tung Dang tạo ngày 2026-11-26 (`eleven_v4`, speed 0.90, stability 0.5, similarity 0.75, như video 007; 2.396 ký tự); mốc thật ở `audio/eleven_v4/shot-timings.json` (tổng **02:45,6**, shot ngắn nhất 1,5 s, dài nhất 6,8 s), thay cho mốc ước tính trong bảng; bản nghe liền `audio/eleven_v4/nghe-thu-ca-bai.mp3`. Người dùng nghe và nhắn "Giọng ổn" cùng ngày. Trước khi tạo giọng đã kiểm lại cùng ngày: Q5 quattro và A5/A6/Q5 dùng quattro ultra (G3, S16), Subaru ghi "full-time AWD" cho phần lớn xe (G1, G2). Đủ 45 shot đã dựng thành composition `Video008` (`pipeline/remotion/src/v008/`, mốc chung trong `cues.js`) ngày 2026-11-26, mới soát bằng ảnh tĩnh (`mau/soat/`, `mau/soat2/`, `mau/soat3/`); người dùng xem và nhắn "Hình ổn, làm âm thanh" cùng ngày. Hiệu ứng đã tạo (`pipeline/sfx-008.js`, 17 file, sổ nguồn `audio/NGUON-AM-THANH.md`) và gắn ngày 2026-11-26 (`pipeline/remotion/src/v008/sound.jsx`, 30 cue = 52 lần phát, phần lớn là tick nhỏ mức nền; danh sách mốc thật ở `audio/cues-008.json`); bản nghe thử ghép bằng ffmpeg ở `audio/nghe-thu-co-hieu-ung.mp3` (đỉnh −1,7 dBFS, trung bình −17,8 dB); người dùng nghe và nhắn "Tiếng ổn" cùng ngày. Bản xem thử render ngày 2026-11-26 theo yêu cầu ("Render xem thử") ra `demo/video-008-xem-thu.mp4` (02:45,6; 1080×1920, 30 fps, h264 + aac 48 kHz; nhãn "BẢN NHÁP · chưa duyệt"; tiếng đỉnh −4,0 dBFS, trung bình −19,9 dB, ngang bản xem thử 007). Người dùng nhắn "Ổn, duyệt Cổng #2" cùng ngày cho bản xem thử cuối cùng (sau các lần sửa ghi dưới đây). Bản đăng render ngày 2026-11-26 ra `final/video-008-v1.3-ban-dang.mp4` (composition `Video008Dang`, góc phải để trống như video 005, 007): tiếng giải mã giống hệt bản đã duyệt (so md5), hình chỉ khác nhãn góc. Ảnh bìa `bia/anh-bia-008.png`. Chưa đăng. Người dùng góp ý cùng ngày: "ở 1:12 và 1:13 chuyển cảnh có âm thanh chưa khớp". Đã sửa: shot 4.6 nối tiếp 4.5 (lực ép bắt đầu ở mức cao, giữ hai đĩa tốc độ và mũi tên, không còn nhảy hình), tiếng click A16 dời về lúc chip máy tính bắt đầu hiện; shot 5.1 thêm đoạn thu ra từ chồng đĩa về cả xe kèm "whoosh" A31. Đã render lại bản xem thử. Góp ý tiếp: "Tiếng người đọc ở phút 1:13 'S' → Subaru bị nghe 'xẹt' khi chuyển cảnh" — whoosh A31 (73,13 s) đè âm "S" (73,33 s). Đã dời A31 vào khoảng lặng cuối cảnh 4 (72,70–73,10 s; giọng cảnh 4 hết ở 72,66 s) và cho chồng đĩa bắt đầu thu nhỏ trong 13 frame cuối shot 4.6, để tiếng vẫn khớp hình; render lại bản xem thử. Góp ý tiếp: "vẫn chưa được, kiểm tra lại tiếng đọc ở phút 1:12 và 1:13". Soi phổ âm thấy lỗi nằm trong file giọng: cuối `scene-04.mp3` có tiếng nhiễu khoảng 30 ms (1:12,55), đầu `scene-05.mp3` có tiếng tách và âm "S" rất gắt (1:13,33). Đã làm sạch hai file (`audio/eleven_v4/sua/`, lệnh trong `NGUON-AM-THANH.md`), không tạo lại giọng; render lại bản xem thử. Chỉnh khi dựng: shot 7.3–7.4 đổi đường thời gian thành "máy tính đoán (mốc 0) → lúc cần bốn bánh (≈ 0,5 giây sau)", đoạn "nối lại ≈ 0,2 giây" nằm gọn trước mốc cần, để không bị hiểu là việc đoán mất 0,5 giây; cảnh 5 thu nhỏ xe để thanh 60/40 nằm dưới xe; xe Subaru vẽ máy boxer, xe Audi vẽ máy thẳng hàng. Chưa tạo âm thanh hiệu ứng. Ảnh bìa Reels đã có (`bia/anh-bia-008.png`, composition `Cover008`), người dùng nhắn "Dùng được" ngày 2026-11-26.
> Đầu vào: `script/script-v1.3.md` (đã qua Cổng duyệt #1 ngày 2026-11-26) và `script/script.json`.
> **Khung 9:16, 1080×1920, 30 fps.** 45 shot, khoảng **02:32**, trung bình 3,4 s/shot (ngắn nhất 1,8 s, dài nhất 6,3 s).
> Mốc thời gian là ước tính ở 210 từ/phút, chưa tính khoảng nghỉ. Mỗi shot **neo vào cụm "Cue"** trong lời đọc để khớp lại theo giọng thật.

## Tóm tắt loại hình
| Loại | Số shot | Thời lượng ước tính |
|---|---|---|
| ANIMATION-CODE | 39 | 138,8 s (92%) |
| ĐỒ HỌA | 6 | 12,8 s (8%) |
| AI-IMAGE / AI-VIDEO | 0 | 0 |

**Credits Higgsfield: 0** (trần đề xuất: 0). Mọi cảnh đều là cơ chế hoặc sơ đồ, nên vẽ bằng mã. Hai chiếc xe vẽ dạng hình khối chung chung nhìn từ trên; không dùng ảnh hay video AI vì AI dễ vẽ sai mẫu xe có thật và sai đường truyền lực.
Giọng đọc: khoảng 2.300 ký tự ElevenLabs cho một lượt tạo.

## Bố cục và phong cách
- Theo `pipeline/remotion/src/vertical/layout.js`: header, tiêu đề lớn (y 380–560), hình (560–1320), phụ đề tô từng chữ (1340–1500), chú thích (1510–1570); chừa vùng nút Reels/Shorts. Vùng 140–360 để trống như video 005 và 007.
- Nền và chữ theo `theme.js` như video 003, 005, 007 (chưa có `brand/style.md`).
- **Màu cố định:**
  - Subaru (xe, ly hợp, đường lực) = hổ phách `#FFB000`, nối màu máy boxer của tập 007;
  - Audi = xanh `#19B5FF`;
  - mũi tên lực = trắng, độ dày tỷ lệ với lượng lực;
  - trục dẫn động đã ngắt = xám, vân trục đứng yên;
  - bánh trượt = chấm đỏ cam;
  - nhãn "theo Subaru" / "theo Audi" = chữ nhỏ màu xám nhạt.
- **Một góc nhìn chính xuyên suốt: nhìn từ trên xuống cả xe** (DrivetrainTopView): máy đặt dọc, hộp số, trục dẫn động ra cầu sau, hai cầu, bốn bánh. Hai xe luôn cùng tỷ lệ và cùng bố cục, Subaru bên trái, Audi bên phải. Góc phụ duy nhất là **cận cảnh chồng đĩa ly hợp** (Cảnh 4).
- Hai xe là hình khối SUV chung chung, chỉ khác màu và thẻ chữ. Không logo hãng, không vẽ dáng chi tiết Forester hay Q5.

## Thành phần Remotion
- **Tái dùng:** Background, Header, Headline, KaraokeSubtitle, Footnote, Chip, Stamp (v003/v005/v007); CarTopView và BoxerEngine nhìn từ trên (v007) cho hình nối tập 007 ở shot 3.1.
- **Mới:**
  - DrivetrainTopView: xe nhìn từ trên, có máy, hộp số, trục dẫn động, hai cầu, bốn bánh; tham số: màu hãng, trục ra cầu sau quay hay dừng, độ dày mũi tên lực trước/sau, vị trí và trạng thái ly hợp, bộ tách cầu sau (chỉ Audi).
  - ClutchPack: cận cảnh đĩa xếp xen kẽ, hai nhóm đĩa nối hai trục, tham số lực ép (0–1) và độ trượt giữa hai nhóm.
  - TurnPath: xe vào cua, vệt bánh trước và bánh sau.
  - AxleSpeedDial: hai đồng hồ nhỏ cho tốc độ quay hai cầu.
  - SplitBar: thanh chia lực trước/sau.
  - TimelineBar: đường thời gian có mốc.
  - DiffLockKnob: núm kéo khóa vi sai kiểu cũ, vẽ chung chung.

## Bảng shot
Phong cách tham chiếu: như mục trên. Credits mọi shot: 0.

| Cảnh | Shot | Bắt đầu | Thời lượng | Loại | Cue (lời đọc) | Tiêu đề lớn | Hình | Thành phần |
|---|---|---|---|---|---|---|---|---|
| 1 | 1.1 | 00:00.0 | 3,8s | ANIMATION-CODE | «Một chiếc Subaru Forester…» | **Hai chiếc, cùng bốn bánh** | Hai xe nhìn từ trên trượt vào, chạy song song hướng lên; thẻ "Subaru Forester" (hổ phách) và "Audi Q5 quattro" (xanh). | DrivetrainTopView, Chip |
| 1 | 1.2 | 00:03.8 | 2,0s | ANIMATION-CODE | «Cả hai đều đặt máy dọc.» | **Cả hai: máy đặt dọc** | Lớp "nhìn xuyên" hiện máy đặt dọc và hộp số ở cả hai xe, lần lượt trái rồi phải. | DrivetrainTopView |
| 1 | 1.3 | 00:05.8 | 4,4s | ANIMATION-CODE | «Nhưng khi chạy đều trên đường khô…» | **Audi: ngắt cầu sau** | Xe Audi: trục dẫn động ra cầu sau chuyển xám, quay chậm dần rồi dừng; **bánh sau vẫn lăn** (vân lốp vẫn chạy). Mũi tên lực chỉ còn ở cầu trước. | DrivetrainTopView |
| 1 | 1.4 | 00:10.2 | 3,6s | ANIMATION-CODE | «Còn Subaru nói xe của họ…» | **Subaru: luôn nối cầu sau** | Xe Subaru: đường lực sáng tới cả bốn bánh, trục dẫn động ra sau quay đều. Chú thích "theo Subaru". | DrivetrainTopView, Footnote |
| 1 | 1.5 | 00:13.8 | 2,2s | ĐỒ HỌA | «Vì sao hai hệ…» | **Vì sao khác nhau?** | Hai sơ đồ thu nhỏ hai bên, dấu hỏi lớn ở giữa. | Headline |
| 2 | 2.1 | 00:16.0 | 4,6s | ANIMATION-CODE | «Khi vào cua…» | **Vào cua: hai đường khác nhau** | Một xe trung tính (trắng) vào cua nhìn từ trên; vệt bánh trước và vệt bánh sau hiện thành hai đường cong; vệt bánh trước nằm ngoài, dài hơn. | TurnPath |
| 2 | 2.2 | 00:20.6 | 3,0s | ANIMATION-CODE | «Vì vậy, chúng phải quay lệch…» | **Hai cầu quay lệch** | Hai đồng hồ nhỏ ở cầu trước và cầu sau; kim cầu trước quay nhanh hơn một chút. Không ghi số. | TurnPath, AxleSpeedDial |
| 2 | 2.3 | 00:23.6 | 4,2s | ANIMATION-CODE | «Nếu nối cứng hai cầu…» | **Nối cứng: lốp bị kéo** | Một thanh nối cứng hai cầu hiện ra; hai kim bị ép quay bằng nhau; lốp rung nhẹ, hiện vệt trượt nhỏ. | TurnPath, AxleSpeedDial |
| 2 | 2.4 | 00:27.8 | 2,6s | ANIMATION-CODE | «Xe bị ghì lại…» | **Ghì lại khi cua đường khô** | Xe chậm lại, một mũi tên ngắn ngược chiều chạy ("ghì"). **Không** vẽ xe văng đuôi hay trượt dài. | TurnPath |
| 2 | 2.5 | 00:30.4 | 3,0s | ANIMATION-CODE | «Vì thế, hệ dẫn động bốn bánh toàn thời gian…» | **Cần một bộ phận ở giữa** | Thanh nối cứng biến mất; ô trống giữa hai cầu sáng lên với dấu "?". Chip "bốn bánh toàn thời gian". | DrivetrainTopView, Chip |
| 3 | 3.1 | 00:33.4 | 4,0s | ANIMATION-CODE | «Ở Subaru, máy boxer đặt dọc…» | **Boxer dọc, hộp số phía sau** | Hình nối tập 007: máy boxer (hổ phách) đặt dọc, hộp số nối ngay sau, trục dẫn động ra cầu sau. | CarTopView, BoxerEngine |
| 3 | 3.2 | 00:37.4 | 3,4s | ANIMATION-CODE | «Nhìn từ trên xuống…» | **Trái phải gần cân nhau** | Một đường giữa dọc xe; hai nửa trái phải sáng đối xứng lần lượt. | CarTopView |
| 3 | 3.3 | 00:40.8 | 2,0s | ĐỒ HỌA | «Đó là nghĩa của chữ…» | **"Đối xứng" là hình dáng** | Thẻ chữ "đối xứng = bố cục trái–phải". | Chip |
| 3 | 3.4 | 00:42.8 | 4,0s | ANIMATION-CODE | «Nó không có nghĩa là lực…» | **Không phải chia đều lực** | Hai mũi tên lực trước và sau hiện với độ dày khác nhau; dấu "≠ 50 : 50". Chưa ghi tỷ lệ cụ thể (để cảnh 5). | DrivetrainTopView |
| 4 | 4.1 | 00:46.8 | 4,0s | ANIMATION-CODE | «Ở nhiều xe Subaru dùng hộp số CVT…» | **Không phải vi sai trung tâm** | Ô giữa hai cầu: một biểu tượng vi sai mờ hiện rồi bị gạch nhẹ. Chip "nhiều xe Subaru dùng CVT". | DrivetrainTopView, Chip |
| 4 | 4.2 | 00:50.8 | 3,6s | ANIMATION-CODE | «Đó là ly hợp nhiều đĩa…» | **Ly hợp nhiều đĩa** | Phóng vào ô giữa: một chồng đĩa hiện ra. Nhãn "ly hợp nhiều đĩa (multi-plate clutch)". | ClutchPack, Chip |
| 4 | 4.3 | 00:54.4 | 2,6s | ANIMATION-CODE | «Hãy hình dung một chồng đĩa…» | **Đĩa xếp xen kẽ** | Các đĩa xếp vào lần lượt, hai màu xen kẽ: nhóm nối trục phía trước (trắng) và nhóm nối trục ra cầu sau (hổ phách). | ClutchPack |
| 4 | 4.4 | 00:57.0 | 3,6s | ANIMATION-CODE | «Ép nhẹ, các đĩa trượt lên nhau…» | **Ép nhẹ: đĩa trượt** | Thanh lực ép thấp; hai nhóm đĩa quay lệch tốc độ (vân lệch nhau); mũi tên lực ra cầu sau mỏng. | ClutchPack, SplitBar |
| 4 | 4.5 | 01:00.6 | 4,2s | ANIMATION-CODE | «Ép chặt, chúng gần như dính…» | **Ép chặt: gần như dính** | Thanh lực ép cao; hai nhóm đĩa quay gần như cùng tốc độ; mũi tên ra cầu sau dày lên. | ClutchPack, SplitBar |
| 4 | 4.6 | 01:04.8 | 2,3s | ANIMATION-CODE | «Máy tính quyết định ép bao nhiêu.» | **Máy tính quyết định** | Một chip "máy tính" nhỏ nối dây tới thanh lực ép; thanh nhích lên xuống. | ClutchPack, Chip |
| 5 | 5.1 | 01:07.1 | 5,2s | ANIMATION-CODE | «Subaru từng công bố tỷ lệ cơ bản…» | **60 : 40 (theo Subaru)** | Thu ra từ chồng đĩa về sơ đồ Subaru từ trên (ngược với 4.2; thêm sau bản xem thử); thanh chia lực "trước 60 / sau 40" hiện; mũi tên trước dày hơn sau. Chú thích "số Subaru từng công bố". | DrivetrainTopView, SplitBar, Footnote |
| 5 | 5.2 | 01:12.3 | 3,4s | ANIMATION-CODE | «Máy tính liên tục chỉnh lực ép…» | **Chỉnh liên tục** | Ba thẻ nhỏ "chân ga", "góc lái", "độ trượt" chạy vào chồng đĩa; thanh chia lực dao động nhẹ quanh 60/40. | DrivetrainTopView, Chip, SplitBar |
| 5 | 5.3 | 01:15.7 | 5,0s | ANIMATION-CODE | «Khi bánh trước có dấu hiệu trượt…» | **Bánh trước trượt: thêm lực ra sau** | Xe đi vào mảng đường trơn (xanh nhạt); hai bánh trước lóe chấm đỏ cam; chồng đĩa ép chặt; mũi tên ra cầu sau dày lên. Không ghi tỷ lệ mới. | DrivetrainTopView, ClutchPack |
| 5 | 5.4 | 01:20.7 | 3,8s | ANIMATION-CODE | «Theo Subaru, cả hai cầu luôn nhận lực.» | **Hai cầu luôn nhận lực** | Thu ra: trục dẫn động ra sau quay đều, cả bốn bánh sáng. Chú thích "theo Subaru". | DrivetrainTopView, Footnote |
| 6 | 6.1 | 01:24.5 | 3,6s | ANIMATION-CODE | «Audi quattro ultra có trên…» | **Audi quattro ultra** | Sơ đồ Audi (xanh) trượt vào cùng góc nhìn và tỷ lệ. Chip "một số bản A5, A6, Q5". | DrivetrainTopView, Chip |
| 6 | 6.2 | 01:28.1 | 3,0s | ANIMATION-CODE | «Nó cũng dùng ly hợp nhiều đĩa…» | **Cũng ly hợp nhiều đĩa** | Điểm sáng thứ nhất: ly hợp ngay sau hộp số, đầu trục dẫn động ra sau. | DrivetrainTopView |
| 6 | 6.3 | 01:31.1 | 2,8s | ANIMATION-CODE | «Nhưng Audi thêm một bộ tách…» | **Thêm bộ tách ở cầu sau** | Điểm sáng thứ hai: bộ tách ở cầu sau. | DrivetrainTopView |
| 6 | 6.4 | 01:33.9 | 3,0s | ANIMATION-CODE | «Khi xe chưa cần bốn bánh…» | **Cả hai mở ra** | Hai điểm sáng tách ra thành khe hở, lần lượt trước rồi sau. | DrivetrainTopView |
| 6 | 6.5 | 01:36.9 | 2,0s | ANIMATION-CODE | «Lực chỉ đi tới cầu trước.» | **Lực chỉ tới cầu trước** | Mũi tên lực chỉ còn ở cầu trước. | DrivetrainTopView |
| 6 | 6.6 | 01:38.9 | 3,6s | ANIMATION-CODE | «Trục dẫn động ra cầu sau ngừng quay…» | **Trục dừng, bánh sau vẫn lăn** | Trục dẫn động ra sau chuyển xám, quay chậm dần rồi dừng; **bánh sau vẫn lăn**. Chip "giảm tổn hao". | DrivetrainTopView, Chip |
| 7 | 7.1 | 01:42.5 | 4,0s | ANIMATION-CODE | «Năm 1980…» | **1980: tài xế tự khóa** | Núm kéo khóa vi sai kiểu cũ, vẽ chung chung; một bàn tay nét vẽ kéo núm. Nhãn "1980". Không vẽ cần gạt, không vẽ xe. | DiffLockKnob, Chip |
| 7 | 7.2 | 01:46.5 | 2,4s | ANIMATION-CODE | «Còn quattro ultra để máy tính quyết định.» | **Nay: máy tính quyết định** | Núm mờ đi; chip "máy tính" hiện, nối dây tới hai điểm ly hợp và bộ tách trên sơ đồ Audi. | DrivetrainTopView, Chip |
| 7 | 7.3 | 01:48.9 | 3,6s | ANIMATION-CODE | «Theo Audi, hệ thống đoán…» | **Đoán trước khoảng 0,5 giây** | Đường thời gian ngang; mốc "đoán trước ≈ 0,5 giây" chạy tới. Chú thích "theo Audi". | TimelineBar, Footnote |
| 7 | 7.4 | 01:52.5 | 3,4s | ANIMATION-CODE | «Và nối lại cầu sau…» | **Nối lại khoảng 0,2 giây** | Mốc "nối lại ≈ 0,2 giây"; trên sơ đồ, hai khe đóng lại, trục ra sau quay lên, đường lực tới cầu sau sáng. Chú thích "theo Audi". | TimelineBar, DrivetrainTopView, Footnote |
| 8 | 8.1 | 01:55.9 | 3,4s | ANIMATION-CODE | «Vậy phần cứng hai bên…» | **Phần cứng khá giống** | Hai sơ đồ cạnh nhau, cùng tỷ lệ; ly hợp hai bên sáng lần lượt. | DrivetrainTopView |
| 8 | 8.2 | 01:59.3 | 2,2s | ĐỒ HỌA | «Khác biệt chính…» | **Khác ở cách điều khiển** | Thẻ chữ lớn ở giữa hai sơ đồ. | Headline |
| 8 | 8.3 | 02:01.5 | 3,0s | ANIMATION-CODE | «Theo Subaru, xe của họ luôn…» | **Subaru: luôn nối hai cầu** | Sơ đồ Subaru sáng, trục ra sau quay; sơ đồ Audi mờ. Chú thích "theo Subaru". | DrivetrainTopView, Footnote |
| 8 | 8.4 | 02:04.5 | 2,8s | ANIMATION-CODE | «Quattro ultra thì ngắt…» | **Audi: ngắt khi chưa cần** | Sơ đồ Audi sáng, trục ra sau xám, dừng; bánh vẫn lăn. Sơ đồ Subaru mờ. | DrivetrainTopView |
| 8 | 8.5 | 02:07.3 | 2,6s | ĐỒ HỌA | «Audi nói cách này…» | **Đỡ hao nhiên liệu (theo Audi)** | Chip dưới sơ đồ Audi. Không có số. | Chip |
| 8 | 8.6 | 02:09.9 | 6,3s | ANIMATION-CODE | «Chúng tôi chưa tìm thấy…» | **Chưa có phép thử cùng điều kiện** | Hai sơ đồ ngang hàng, cùng độ sáng. Chip "chưa thể nói hệ nào tốt hơn". **Không** dùng hình cân, cúp, dấu tích hay chữ thắng thua. | DrivetrainTopView, Chip |
| 9 | 9.1 | 02:16.2 | 1,8s | ĐỒ HỌA | «Hóa ra là vậy.» | **Hóa ra là vậy** | Dấu "Hóa ra là vậy". | Stamp |
| 9 | 9.2 | 02:18.0 | 2,4s | ANIMATION-CODE | «Hai chiếc xe cùng được gọi…» | **Cùng là bốn bánh** | Hai xe hình khối chạy song song như shot 1.1. | DrivetrainTopView |
| 9 | 9.3 | 02:20.4 | 4,2s | ANIMATION-CODE | «Nhưng một bên chọn…» | **Luôn sẵn sàng · Chỉ khi cần** | Chip "lúc nào cũng sẵn sàng" dưới Subaru, rồi "chỉ dùng khi cần" dưới Audi, theo đúng nhịp lời đọc. | DrivetrainTopView, Chip |
| 9 | 9.4 | 02:24.6 | 5,0s | ANIMATION-CODE | «Lần tới nghe ai nói…» | **Hỏi thêm một câu** | Hai sơ đồ thu về một điểm sáng ở giữa xe: chồng đĩa ly hợp; dấu hỏi nhỏ cạnh đó. | DrivetrainTopView, ClutchPack |
| 9 | 9.5 | 02:29.6 | 2,0s | ĐỒ HỌA | (không lời) | **Hóa Ra Là Vậy** | Tên kênh. Có 1,5 s không lời ở cuối. | Headline |

## Âm thanh
Theo mục "Thiết kế âm thanh cho animation" trong `CLAUDE.md` và góp ý của người dùng ở video 005 (to và nhiều hơn bản đầu một chút, không quá tay, không có tiếng kéo dài đè lên giọng). Mức khởi đầu như video 007, bản người dùng đã nghe và nhắn "Tiếng ổn": **vừa ≈ −8 dB, nhẹ ≈ −13 dB, nền ≈ −21 dB** so với đỉnh giọng. Thời điểm tính từ đầu shot, là ước tính; khi dựng lấy frame từ mốc animation.

| ID | Shot | Lớp | Âm thanh | Cue hình | Thời điểm | Thời lượng | Mức | File |
|---|---|---|---|---|---|---|---|---|
| A01 | 1.1 | chuyển động | "whoosh" ngắn, êm | hai xe trượt vào khung | +0,2 s | 0,4 s | nhẹ | dùng lại `whoosh` (007) |
| A02 | 1.2 | chuyển động | hai "click" lần lượt | máy và hộp số hiện ở xe trái, rồi xe phải | +0,3 s và +1,0 s | 2 × 0,12 s | nhẹ | dùng lại `click`, `click-cao` (007) |
| A03 | 1.3 | chuyển động | "cạch" mở nhỏ, rồi tiếng quay chậm dần rất ngắn | trục ra sau xe Audi tách, quay chậm rồi dừng | +0,6 s | 0,1 s + 0,7 s, fade ra 0,3 s | nền | CẦN TẠO (`cach-mo`, `quay-cham-dan`) |
| A04 | 1.4 | chuyển động | "click" trầm, chắc | đường lực xe Subaru sáng tới cầu sau | +0,5 s | 0,15 s | nhẹ | dùng lại `click-tram` (007) |
| A05 | 2.2 | chuyển động | hai chuỗi "tick" rất nhỏ, chuỗi cầu trước dày hơn một chút | kim hai đồng hồ quay | +0,3 s, kéo 1,6 s | mỗi tick 0,05 s | nền | dùng lại `tick` (007) |
| A06 | 2.3 | chuyển động | tiếng lốp "két" ngắn, cụt, không rít dài | lốp rung, vệt trượt nhỏ hiện | +1,6 s | 0,35 s, fade ra 0,1 s | nhẹ | CẦN TẠO (`ket-lop`) |
| A07 | 2.4 | chuyển động | "thịch" trầm bị dập | xe chậm lại, mũi tên ghì hiện | +0,3 s | 0,3 s | nhẹ | dùng lại `thich-dap` (007) |
| A08 | 2.5 | chuyển động | "ting" ngắn, sáng | ô trống giữa hai cầu sáng lên | +0,8 s | 0,3 s | nhẹ | dùng lại `ting` (007) |
| A09 | 3.1 | chuyển động | "khớp" gọn có chút ngân, gợi lại tập 007 | hộp số khớp sau máy boxer | +0,6 s | 0,5 s | vừa | dùng lại `khop-manh` (007) |
| A10 | 3.4 | chuyển động | "click" cao | dấu "≠ 50 : 50" hiện | +1,4 s | 0,12 s | nhẹ | dùng lại `click-cao` (007) |
| A11 | 4.1 | chuyển động | "cộp" đục, nhỏ | biểu tượng vi sai bị gạch | +1,6 s | 0,15 s | nhẹ | dùng lại `cop-duc` (007) |
| A12 | 4.2 | chuyển động | "whoosh" ngắn | phóng vào chồng đĩa | +0 s | 0,4 s | nhẹ | dùng lại `whoosh` (007) |
| A13 | 4.3 | chuyển động | sáu "tick" kim loại nhỏ, đều | từng đĩa xếp vào | +0,2 s, cách 0,25 s | 6 × 0,06 s | nhẹ | dùng lại `tick` (007) |
| A14 | 4.4 | chuyển động | tiếng ma sát đĩa trượt, mềm, **ngắn** | hai nhóm đĩa bắt đầu quay lệch | +0,4 s | 0,5 s, fade vào 0,05 s, ra 0,25 s | nền | CẦN TẠO (`ma-sat-ngan`) |
| A15 | 4.5 | chuyển động | "cạch" cơ khí trầm | đĩa ép chặt lại | +0,5 s | 0,15 s | vừa | dùng lại `cach-co-khi` (007) |
| A16 | 4.6 | chuyển động | "click" nhỏ | chip máy tính hiện | +0,3 s | 0,12 s | nhẹ | dùng lại `click` (007) |
| A31 | 4.6 | chuyển động | "whoosh" ngắn, êm (thêm sau bản xem thử, đối xứng với A12) | chồng đĩa bắt đầu thu nhỏ, nối sang 5.1 | 13 frame trước cuối shot, trong khoảng lặng cuối cảnh 4 | 0,4 s | nhẹ | dùng lại `whoosh` (007) |
| A17 | 5.1 | chuyển động | "click" cao | thanh 60/40 hiện | +0,6 s | 0,12 s | nhẹ | dùng lại `click-cao` (007) |
| A18 | 5.3 | chuyển động | tiếng bánh trượt "xẹt" ngắn, rồi "cạch" ép | bánh trước lóe đỏ cam, rồi chồng đĩa ép | +1,2 s và +2,2 s | 0,3 s + 0,15 s | nhẹ | CẦN TẠO (`truot-banh`) + dùng lại `cach-co-khi` |
| A19 | 6.1 | chuyển động | "whoosh" ngắn | sơ đồ Audi trượt vào | +0 s | 0,4 s | nhẹ | dùng lại `whoosh` (007) |
| A20 | 6.2 | chuyển động | "click" | điểm sáng ly hợp hiện | +0,4 s | 0,12 s | nhẹ | dùng lại `click` (007) |
| A21 | 6.3 | chuyển động | "click" cao | điểm sáng bộ tách hiện | +0,4 s | 0,12 s | nhẹ | dùng lại `click-cao` (007) |
| A22 | 6.4 | chuyển động | hai "cạch" mở, nhẹ hơn tiếng khóa | từng khe hở mở ra | +0,4 s và +1,0 s | 2 × 0,1 s | nhẹ | CẦN TẠO (`cach-mo`, như A03) |
| A23 | 6.6 | chuyển động | tiếng quay chậm dần rất ngắn | trục ra sau quay chậm rồi dừng | +0,3 s | 0,8 s, fade ra 0,3 s | nền | CẦN TẠO (`quay-cham-dan`, như A03) |
| A24 | 7.1 | chuyển động | "cạch" cơ khí khi núm bị kéo | tay kéo núm | +1,4 s | 0,15 s | vừa | dùng lại `cach-co-khi` (007) |
| A25 | 7.3 | chuyển động | ba "tick" nhỏ đều | mốc thời gian chạy tới 0,5 giây | +0,5 s, cách 0,3 s | 3 × 0,05 s | nhẹ | dùng lại `tick` (007) |
| A26 | 7.4 | chuyển động | tiếng quay nhanh dần rất ngắn (nền), rồi "click" trầm (nhẹ) | khe đóng, trục quay lên | +0,8 s và +1,4 s | 0,5 s + 0,15 s | nền | CẦN TẠO (`quay-nhanh-dan`) + dùng lại `click-tram` |
| A27 | 8.1 | chuyển động | hai "click" lần lượt | ly hợp hai bên sáng | +0,4 s và +1,0 s | 2 × 0,12 s | nhẹ | dùng lại `click`, `click-cao` (007) |
| A28 | 9.1 | chuyển động | "khớp" có ngân | dấu "Hóa ra là vậy" đóng xuống | +0,2 s | 0,5 s | vừa | dùng lại `khop-manh` (007) |
| A29 | 9.4 | chuyển động | "ting" | điểm sáng chồng đĩa hiện | +2,0 s | 0,3 s | nhẹ | dùng lại `ting` (007) |
| A30 | 9.5 | chuyển động | chuông ngắn | tên kênh hiện | +0,4 s | 0,8 s | nhẹ | dùng lại `chuong` (007) |

- **Mật độ:** 30 lần phát cho khoảng 2:32, gần với video 007 (29 lần cho 2:14), theo góp ý "nhiều hơn một chút".
- **Nhạc nền:** chưa đặt cue. Đề xuất không dùng nhạc, như video 005 và 007.
- **Môi trường:** không có. Không dùng tiếng máy xe thật hay tiếng đường xá.
- **Không có tiếng** ở các shot còn lại, kể cả khi cắt shot thông thường.
- **Khớp cơ chế:**
  - A03, A23 (quay chậm dần) phải dừng **cùng lúc trục trên hình dừng**; A26 (quay nhanh dần) bắt đầu khi khe đóng.
  - Không có tiếng nào ngụ ý bánh sau Audi dừng: chỉ trục dẫn động dừng.
  - A14 dài nhiều nhất 0,5 s, không trải suốt shot dưới lời đọc (góp ý video 005 về tiếng xì kéo dài).
  - A06 là tiếng lốp bị kéo nhẹ, không phải tiếng rít phanh gấp; không gợi ý xe mất lái.
  - A05: hai chuỗi tick lệch nhịp chỉ ở mức nền, để nghe "lệch" chứ không thành tiếng đồng hồ rõ.

### Âm thanh còn thiếu
- **Dùng lại** (tự tổng hợp bằng `pipeline/sfx-007.js`, đã ghi nguồn ở video 007): `whoosh`, `click`, `click-cao`, `click-tram`, `tick`, `thich-dap`, `ting`, `khop-manh`, `cop-duc`, `cach-co-khi`, `chuong`. Khi dựng, chép sang `projects/008-awd-subaru-va-audi/assets/audio/sfx/` và ghi lại từng dòng vào `audio/NGUON-AM-THANH.md` của video 008.
- **Cần tạo** (tự tổng hợp, ghi lệnh vào `NGUON-AM-THANH.md`):
  - `cach-mo`: tiếng mở nhẹ, ngược với "cạch" khóa (A03, A22);
  - `quay-cham-dan`: tiếng trục quay chậm dần rất ngắn (A03, A23);
  - `quay-nhanh-dan`: ngược lại (A26);
  - `ket-lop`: lốp bị kéo, cụt (A06);
  - `ma-sat-ngan`: ma sát đĩa trượt, mềm (A14);
  - `truot-banh`: bánh trượt trên mặt trơn, "xẹt" ngắn (A18).
- Chưa tải, mua hay sinh file nào ở bước này.

## Quy tắc chính xác trên hình
- **Bố cục hai xe:** cả hai máy đặt dọc, hộp số ngay sau máy, trục dẫn động chạy dọc giữa xe ra cầu sau (S1, S15, S16). Hai sơ đồ cùng tỷ lệ, cùng góc nhìn.
- **Vào cua (2.1–2.4):** vệt bánh trước nằm ngoài vệt bánh sau và dài hơn; cầu trước quay nhanh hơn một chút. Không ghi số. Nối cứng chỉ gây rung lốp, vệt trượt nhỏ, xe ghì lại; **không** vẽ văng đuôi hay mất lái.
- **"Đối xứng" (3.2):** tô hai nửa trái phải; không vẽ lực chia đều trước sau.
- **Chồng đĩa (4.3–4.5):** hai nhóm đĩa xen kẽ, một nhóm nối trục phía trước, một nhóm nối trục ra cầu sau. Ép nhẹ: hai nhóm quay lệch tốc độ. Ép chặt: **gần như** cùng tốc độ, không vẽ dính cứng tuyệt đối. Không vẽ chi tiết thủy lực hay bơm.
- **Subaru (5.1–5.4):** thanh "60 / 40" chỉ ở 5.1 và 5.2, luôn kèm "theo Subaru" / "số Subaru từng công bố". 5.3 không ghi tỷ lệ mới. Trục ra sau Subaru **luôn quay** ở mọi shot.
- **Audi ultra (6.2–6.6, 7.4):**
  - ly hợp nằm **ngay sau hộp số**, ở đầu trục dẫn động ra sau; bộ tách nằm **ở cầu sau** (S15, S16);
  - khi ngắt: trục dẫn động ra sau dừng và chuyển xám, mũi tên lực chỉ ở cầu trước;
  - **bánh sau vẫn lăn** theo xe trong mọi shot ngắt (FC v1 #22);
  - nối lại: hai khe đóng, trục quay lên. Mốc 0,5 giây và 0,2 giây luôn kèm "theo Audi".
- **1980 (7.1):** núm kéo chung chung, không vẽ cần gạt (FC v1 #24); không vẽ dáng Audi Quattro đời đầu.
- **So sánh (8.6):** không hình cân, cúp, dấu tích, màu đỏ/xanh kiểu đúng sai; hai sơ đồ cùng độ sáng.
- Không logo hãng; không vẽ dáng chi tiết Forester, Q5 hay các mẫu Audi khác. Không hiện chữ "AWD".
- Không có hybrid, VTD, STI hay DCCD trên hình.

## "Thử trước"
1. Một khung mẫu shot 6.6 (sơ đồ Audi, trục dừng, bánh sau vẫn lăn, tiêu đề, phụ đề) để duyệt góc nhìn DrivetrainTopView và cách vẽ "ngắt nhưng bánh vẫn lăn".
2. Một khung mẫu shot 4.4 hoặc 4.5 để duyệt cách vẽ chồng đĩa: người xem có thấy hai nhóm đĩa quay lệch rồi gần cùng tốc độ không.
3. Kiểm vùng an toàn trên điện thoại, đặc biệt khi hai sơ đồ đặt cạnh nhau (8.1–8.6).
4. Tạo bốn tiếng `cach-mo`, `quay-cham-dan`, `ma-sat-ngan`, `ket-lop` và nghe cùng một đoạn giọng trước khi làm hết.
5. Tạo giọng Tung Dang đủ 9 cảnh, đo thời lượng thật, khớp lại cue. Trước khi tạo giọng, kiểm lại:
   - Q5 quattro và các bản A5, A6 còn dùng quattro ultra;
   - trang Subaru còn ghi "full-time AWD" cho xe phổ thông.

## Việc cần bạn quyết
1. Hai xe vẽ dạng hình khối chung chung, chỉ khác màu và thẻ tên. Có cần gợi dáng xe rõ hơn không? Đề xuất: không, để tránh vẽ sai và không dùng hình nhận diện của hãng.
2. Có dùng nhạc nền không? Đề xuất: chưa.
3. Shot 7.1 vẽ một bàn tay kéo núm khóa vi sai. Có muốn bỏ tay, chỉ cho núm tự kéo ra không? Đề xuất: giữ tay nét vẽ đơn giản, vì lời đọc nói "tài xế tự khóa bằng tay".
