# Nguồn và giấy phép âm thanh — video 011

File `.wav` và `.mp3` bị `.gitignore`; sổ này và các file `.json` được giữ trong git.

## Giọng đọc (bản dùng để dựng)

**Dùng:** `eleven_v4/scene-01.mp3` … `scene-11.mp3` và `scene-NN.alignment.json`.

1. **Tạo giọng:** ElevenLabs, giọng "Tung Dang" (voice_id `3VnrjnYrskPMDsapTr8X`), bằng `pipeline/tts.js` ngày 2026-11-28. Nguồn chữ: `script/script.json` (kịch bản 3.3, người dùng duyệt Cổng #1 ngày 2026-11-28). Lệnh: `node --env-file=.env pipeline/tts.js projects/011-phanh-tai-sinh --model eleven_v4 --speed 0.95 --stability 0.5 --similarity 0.4 --out eleven_v4`. 2.084 ký tự, 11 cảnh.
2. **Vì sao similarity 0.4** (video 005–009 dùng 0.75): người dùng nghe thấy tiếng vọng phòng thu trong giọng Tung Dang và yêu cầu giảm một chút, không cần hết. Đã thử cảnh 1 với bốn cấu hình (`thu-vong/`), rồi cảnh 3, 5, 7 ở similarity 0.6 (`thu-cau-kho/`) và 0.4 (`thu-cau-kho-sim40/`). Người dùng xác nhận "đinamô" đọc đúng và nghe bản đủ nhận xét "ổn" cùng ngày. `eleven_multilingual_v2` bị từ chối (không hỗ trợ tiếng Việt).
3. **Tốc độ:** speed 0.95 (nhịp 178–210 từ/phút). Người dùng nhắn "cho đọc nhanh hơn thử" ngày 2026-11-28 sau khi duyệt tiếng. **Bản thử nhanh:** tăng nhịp 6% bằng ffmpeg (`atempo=1.06`, giữ cao độ, không tốn credits) bằng `node pipeline/voice-nhanh-011.js 1.06`, ra `eleven_v4/nhanh/` (mp3, `alignment` và `timings.json` đã quy đổi; nhịp 189–223 từ/phút; tổng lời đọc 131,8 s). Chưa làm mép (fade vào/ra) vì ffmpeg đi kèm Remotion không có `afade`. **Composition `Video011` hiện dùng bản `nhanh/`** (`timeline.js`); mốc shot ở `eleven_v4/nhanh/shot-timings.json` (tổng 02:20,9, 41 shot, ngắn nhất 1,8 s, dài nhất 6,4 s), mốc cue ở `cues-011.json` đã tính lại. Muốn quay về bản gốc: trỏ lại các import `eleven_v4/nhanh/` trong `timeline.js` và `pipeline/shot-timings-011.js` về `eleven_v4/`. Bản nghe thử: `nghe-thu-co-hieu-ung-nhanh.mp3` (2:21,3). Người dùng nghe và nhắn "Nhịp ổn" ngày 2026-11-28: **bản `nhanh/` (1,06×) là bản dùng**.
4. **Chưa** làm mép (fade vào/ra) như video 009. Làm khi dựng nếu đo thấy đầu cuối cảnh có tiếng bật.

- `eleven_v4/timings.json`: thời lượng thật từng cảnh và cấu hình đã dùng. Tổng lời đọc 139,5 s.
- `eleven_v4/shot-timings.json`: mốc shot thật tính từ `scene-NN.alignment.json` bằng `node pipeline/shot-timings-011.js` (0,2 s đầu cảnh, 0,45 s cuối cảnh, 1,5 s kết, thêm 0,4 s lặng giữa 6b và cảnh 7). Tổng **02:28,8**, 41 shot, ngắn nhất 1,9 s, dài nhất 6,7 s.
- `eleven_v4/nghe-thu-ca-bai.mp3`: bản nghe liền giọng (khoảng nghỉ 0,4 s, riêng 6b → 7 là 0,8 s), 2:23,9. Ghép bằng ffmpeg đi kèm Remotion.
- Thư mục thử `thu-vong/`, `thu-cau-kho/`, `thu-cau-kho-sim40/`: lịch sử, không dùng để dựng.

Tổng ký tự ElevenLabs đã dùng cho tập 011: 4 × 104 (thử vọng) + 651 + 651 + 2.084 = **3.802**.

## Hiệu ứng

Mọi file hiệu ứng **tự tổng hợp bằng mã**, không dùng bản thu, mẫu âm hay thư viện của bên thứ ba, nên không có yêu cầu ghi công. Lệnh: `node pipeline/sfx-011.js` từ gốc repo (ngày 2026-11-28, sau khi người dùng nhắn "Hình ổn, làm âm thanh"). Định dạng 48 kHz, mono, 16-bit, đỉnh −1 dBFS.

- **Dùng lại** (chép nguyên file, đã ghi nguồn và hàm tổng hợp ở video 008/009): `click`, `click-cao`, `click-tram`, `tick`, `ting`, `whoosh`, `khop-manh`, `chuong` (từ 009; gốc `pipeline/sfx-007.js`/`sfx-008.js`) và `ma-sat-ngan` (từ 008).
- **Mới** (`pipeline/sfx-011.js`): `chuyen-nhe` (lượt tăng tốc: một nốt êm đi lên, 430 → 590 Hz) và `chuyen-nhe-tram` (lượt phanh: đi xuống, 560 → 400 Hz), mỗi file 0,22 s, kèm chút hơi gió mịn. Không tia điện, không rè điện, không robot.

Gắn vào video: `pipeline/remotion/src/v011/sound.jsx`, bảng cue `cues-list.js` (24 lần phát cho 22 cue; mốc lấy từ `at('cụm lời đọc')` trong `scenes.jsx` và `cues.js` của cảnh 6b). Danh sách mốc thật: `audio/cues-011.json`. Mức như video 009 (người dùng đã nghe, "Tiếng ổn"): vừa −8, nhẹ −13, nền −21 dB so với đỉnh giọng; hạ chung giọng và hiệu ứng 1 dB (MASTER 0,89).

Lệch so với storyboard: A20 ("Hóa ra là vậy") hạ từ `vừa` xuống `nhẹ` vì tiếng ngân trùm lên chữ đầu của lời đọc; A09, A21, A22 đặt sau khi giọng đọc xong cụm liên quan; chữ "regenerative braking" (5.4) và tên kênh (K.2) hiện cùng mốc với tiếng.

- `audio/nghe-thu-co-hieu-ung.mp3`: bản nghe liền giọng + hiệu ứng, 2:29,1, xuất bằng Remotion (chỉ âm thanh, `--codec=mp3`) từ composition `Video011`.
- Người dùng nghe bản này và nhắn "Tiếng ổn" ngày 2026-11-28. Chưa đo mức bằng máy (ffmpeg đi kèm Remotion không có bộ lọc đo).

## Bản 3.4 và 3.5 (nhịp nhanh; ngày 2026-11-28)

Người dùng yêu cầu nhịp đọc nhanh, gọn (câu 4–7 âm tiết, nghỉ 0,2–0,4 s) và nghe bản xem thử "đúng nhịp tôi muốn". Bản 3.3 (đã duyệt Cổng #1 và #2) giữ nguyên; `Video011` vẫn dùng giọng `eleven_v4/nhanh/`.

- **Phát hiện:** `eleven_v4` **bỏ qua tham số `speed`** (1.1 và 1.2 cho cùng thời lượng 17,1 s). `eleven_turbo_v2_5` chịu speed (17,4 s ở 1.0; 13,7 s ở 1.2). Giọng bản 3.4 và 3.5 dùng **turbo**, cùng voice_id Tung Dang.
- **Cài đặt giọng:** `eleven_turbo_v2_5`, speed 1.15, stability 0.75, similarity 0.4, seed 11, `language_code vi`. Tạo bằng `pipeline/tts-nhat-quan-011.js` ở chế độ `single` (đọc cả kịch bản MỘT lần rồi cắt từng cảnh theo mốc ký tự) vào `audio/v36-single/`. Lý do: tạo từng cảnh riêng nghe như "hai người đọc" (cao độ trung vị mỗi cảnh chênh 26 Hz). Thử nối bằng `previous_request_ids` (chuẩn là cảnh 1) không cải thiện; một lần thu cho lệch chuẩn thấp nhất (4,6 Hz, độ to chênh tối đa 0,9 dB). Phép đo chỉ gần đúng (tự tương quan), người dùng nghe để chốt.
- **Sửa lỗi chính tả thanh điệu** (người dùng nghe và chọn bản): "nạp thêm" → "náp", "cắm sạc" → "cấm sắc", "đổi chiều" → "đổi chiếu", "mô-tơ đổi vai" → "mô tở đối vai". Đã tạo lại riêng từng cảnh bằng `pipeline/tts-canh-011.js` (nhiều hạt giống, có `previous_text`/`next_text`): cảnh 9 bản **H61** (lời do người dùng viết lại, bỏ câu hybrid cắm sạc), cảnh kết bản **K86** (người dùng: "gần đúng nhất"); bản cũ ở `v36-single/truoc-h61/` và `truoc-k86/`; các bản thử ở `thu-c9*`, `thu-ket/`, `thu-nhip/`, `thu-vong/`. Cảnh 4 đưa về "đi theo chiều ngược lại". Cảnh 9 bù +1 dB trong dựng (đo RMS thấp hơn các cảnh khác).
- **Cắt lặng và làm chậm:** `node pipeline/voice-v34-011.js 0.25 0.4 v36-single script-v3.5.json 0.95`: nghỉ giữa câu > 0,4 s rút còn 0,25 s (44 chỗ), rồi `atempo 0.95` (chậm 5%, giữ cao độ, vì người dùng nói có đoạn quá nhanh). Ra `v36-single/cat/` (mp3, alignment đã quy đổi, `timings.json`, `bao-cao-nghi.json`). ffmpeg đi kèm Remotion không có afade, nên chưa làm mép (fade).
- **Nhịp bản 3.5d:** trong câu 4,72 âm tiết/s; tính cả nghỉ trong cảnh 4,10; nghỉ giữa câu lớn nhất 0,40 s; nghỉ giữa cảnh 0,3 s (0,4 s sau 6b). Câu nhanh nhất 6,06 âm tiết/s ("Hóa ra là vậy"). Tổng 1:58,5, 40 shot.
- **Chi phí ElevenLabs thêm cho 3.4/3.5** (ước, ký tự): ~9.600 (thử nhịp và model, hai lần thu cả bài, lần speed 1.08 bỏ, bảy lượt thử cảnh 9, hai lượt cảnh kết).
- Mốc cue: `cues-011.json` ghi theo bản 3.3; bản 3.5 tính trong `v011/cues-list.js` (`CUES35`).
