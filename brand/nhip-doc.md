# Nhịp đọc chuẩn của kênh

Chốt 2026-11-28, theo video 011 bản 3.5 (người dùng nhắn "nhịp đọc… khá tốt, chốt vào dự án"). Áp dụng cho video làm từ nay; không làm lại giọng video cũ khi chưa được yêu cầu. Đây là nơi ghi duy nhất các con số; tài liệu khác chỉ trỏ về đây.

Bản mẫu về **nhịp** (không phải về model): `projects/011-phanh-tai-sinh/final/video-011-v3.5-ban-dang.mp4` (file `.mp4` chỉ có trên máy người dùng). Bản 011 đọc bằng turbo; nhịp của nó được giữ, model thì đổi.

## 1. Viết lời đọc

- Mỗi câu một ý, ngắn. Đích **4–7 âm tiết** (trung vị ≤ 7). Quá 10 âm tiết là ngoại lệ, không quá 10% số câu.
- Được tách câu bằng dấu chấm ở chỗ muốn ngắt: "Lúc tăng tốc. Mô-tơ kéo bánh xe quay."
- Không tách một mảnh quá ngắn dễ đọc sai thanh điệu (011: "Mô-tơ đổi vai." đứng riêng bị đọc hỏng; nối lại "Mỗi lần xe chậm lại, mô-tơ lại đổi vai.").
- Tránh câu chêm giải thích dài giữa chủ ngữ và động từ.
- Độ dài: khoảng **220 từ cho mỗi phút video** (011: 442 từ, 1:58). Video 1–3 phút ≈ 220–650 từ.

## 2. Tạo giọng

| Mục | Giá trị |
|---|---|
| Giọng | Tung Dang, voice_id `3VnrjnYrskPMDsapTr8X` |
| Model | `eleven_v4` (turbo v2.5 đọc sai quá nhiều, xem [`loi-doc/2026-11-28-turbo.txt`](loi-doc/2026-11-28-turbo.txt)) |
| speed / stability / similarity | 0.95 (v4 bỏ qua) / 0.5 / 0.4 (similarity thấp để giảm tiếng vọng phòng) |
| style / speaker boost / seed / ngôn ngữ | 0 / bật / 11 / `vi` |
| Cách thu | **cả kịch bản một lần**, rồi cắt theo cảnh. Thu từng cảnh riêng nghe như hai người đọc |
| Hậu kỳ | tăng/giảm tempo (giữ cao độ) để đạt 4,55 âm tiết/s trong câu; nghỉ giữa câu > 0,4 s rút còn 0,25 s |

Các giá trị này nằm trong `CHUAN` của `pipeline/giong.js`. Từ gốc repo:

```powershell
node pipeline/giong.js doc projects/NNN-ten-video --thu
```

```powershell
node --env-file=.env pipeline/giong.js doc projects/NNN-ten-video
```

```powershell
node pipeline/giong.js cat projects/NNN-ten-video
```

```powershell
node pipeline/giong.js do projects/NNN-ten-video
```

`doc` thật tốn credits: theo quy tắc chung, chỉ chạy sau khi storyboard được duyệt. Giọng ra ở `assets/audio/giong/`, bản dùng để dựng là `assets/audio/giong/cat/`. Làm lại cả bài thì thêm `--out giong-v2`, không ghi đè bản cũ.

**Cắt cảnh:** `doc` cắt bản thu liền tại khoảng lặng thật (`pipeline/cat-canh.js`), không theo mốc ký tự: mốc của ElevenLabs lệch, từng làm 003 nghe "Hai… Hai" (đuôi cảnh 3 dính đầu cảnh 4). Cắt lại không tốn credits: `node pipeline/giong.js chia <project-dir> --script ...`, rồi `cat`. Có dòng CẢNH BÁO thì nghe chỗ nối đó.

## 3. Nhịp trong dựng

- Đầu mỗi cảnh 0,1 s, cuối cảnh 0,2 s (nghỉ giữa cảnh 0,3 s). Trước một chỗ chuyển ý lớn được thêm 0,1 s (thành 0,4 s). Cuối video giữ 1,5 s.
- Phụ đề tối đa 7 chữ và 36 ký tự mỗi cụm.
- Shot đổi theo cụm lời đọc lấy từ alignment của bản `cat/`, không gõ giây.
- Mẫu: `makeTimeline` trong `pipeline/remotion/src/v011/timeline.js` (`TL35`).

## 4. Kiểm

**Máy** (`giong.js do`): tốc độ trong câu 4,3–4,9 âm tiết/s; tính cả nghỉ trong cảnh 3,8–4,3; nghỉ giữa câu ≤ 0,45 s; độ dài câu. Bản 011 đo được 4,57 / 4,00 / 0,40. (Sổ âm thanh 011 ghi 4,72 / 4,10 vì đếm âm tiết theo cách khác; so sánh bằng số của `giong.js do`.) Các khoảng chấp nhận quanh bản 011 là mức khởi đầu, chỉnh khi có thêm video.

**Người** (bắt buộc): nghe hết, soát thanh điệu và câu đọc quá nhanh. Claude không nghe được, không ghi "đã nghe, đạt" thay người dùng.

## 5. Sổ từ hay đọc sai (bắt buộc trong mỗi lần tạo giọng)

Sổ: [`tu-hay-sai.json`](tu-hay-sai.json). Danh sách gốc người dùng báo: thư mục `loi-doc/`. Một từ trong sổ không bị cấm dùng; nó là chỗ phải nghe kỹ.

1. **Trước khi tạo giọng:** `giong.js doc ... --thu` liệt kê các câu có từ trong sổ, số và chữ viết tắt. Số và chữ viết tắt thì viết ra chữ.
2. **Sau khi tạo:** `giong.js cat` tự làm trang `out/ra-giong-*.html`; câu có từ hay sai được gắn nhãn, lọc riêng được. Người dùng vẫn nghe hết cả bài.
3. **Người dùng báo sai** (dán danh sách từ trang, hoặc nói bằng lời): lưu vào `brand/loi-doc/<ngày>-<video>.txt` đúng mẫu `Video 009, cảnh 2, câu 1: "câu gốc" → nghe thành: cụm nghe được`, rồi chạy:
   `node pipeline/giong.js nhap brand/loi-doc/<file>.txt --model eleven_v4`
4. Dòng công cụ báo "không tách được từ" thì xem tay, thêm vào sổ nếu cần.
5. Lỗi đã nạp thì giữ lại trong sổ dù sau đó đã sửa: đó là lịch sử để thử model hoặc giọng mới.

## 6. Khi đọc sai

1. Tạo lại riêng cảnh đó với vài seed (tốn credits):
   `node --env-file=.env pipeline/giong.js canh projects/NNN-ten-video <cảnh> 21,31,41`
2. Người dùng nghe và chọn: `node pipeline/giong.js chon projects/NNN-ten-video <cảnh> <file>`, rồi chạy lại `cat` và `do`.
3. Vẫn sai: đổi cách chấm câu hoặc cách nói. Đổi chữ là đổi kịch bản: người dùng quyết và kiểm lại fact-check.
4. Cảnh thu riêng có thể nhỏ hơn các cảnh khác (011 cảnh 9: bù +1 dB trong dựng).

## Giới hạn đã biết

- Sổ hiện chỉ có lỗi của turbo. Cấu hình `eleven_v4` ở mục 2 đã được người dùng chốt (2026-11-28, sau khi nghe giọng 009 rồi 003, 005, 007, 008).

- Khóa API không có quyền `speech_to_text`, nên chưa rà được lỗi đọc bằng máy.
- Số và chữ viết tắt: viết ra chữ trong lời đọc của video mới (turbo từng đọc sai "1966", "1980", "LFP").

- Chưa làm fade đầu/cuối file (ffmpeg đi kèm Remotion không có `afade`).
- Đổi model hoặc giọng thì các con số trên không còn bảo đảm: thử một đoạn ngắn và cho người dùng nghe trước.
- Các script `pipeline/*-011.js` là lịch sử của video 011, không dùng cho video mới.
