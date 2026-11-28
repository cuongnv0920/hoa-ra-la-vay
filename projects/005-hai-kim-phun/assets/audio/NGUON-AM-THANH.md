# Nguồn và giấy phép âm thanh — video 005

Mọi file dưới đây **tự tổng hợp bằng mã** (`pipeline/sfx-005.js`, chạy `node pipeline/sfx-005.js`) ngày 2026-11-26. Không dùng bản thu, mẫu âm hay thư viện của bên thứ ba, nên không có yêu cầu ghi công và không có giới hạn từ bên ngoài. Tác giả: dự án Hóa Ra Là Vậy (mã do Claude viết theo yêu cầu của chủ kênh).

File `.wav` bị `.gitignore`; chạy lại lệnh trên sẽ tạo ra đúng các file này.

| File | Lớp | Mô tả | Cue |
|---|---|---|---|
| `sfx/click.wav` | chuyển động | click kim loại nhỏ | A01, A02, A12 |
| `sfx/click-cao.wav` | chuyển động | click cùng họ, cao hơn | A02 |
| `sfx/phun-mem.wav` | chuyển động | xịt mềm, áp thấp | A03 |
| `sfx/van-mo-gio-hut.wav` | chuyển động | tộc nhẹ và gió hút | A04 |
| `sfx/phun-gat.wav` | chuyển động | xịt gắt, gọn | A05, A13 |
| `sfx/hoi-thoang.wav` | chuyển động | hơi thoảng, tắt dần | A06 |
| `sfx/go-kim-loai.wav` | chuyển động | gõ kim loại hai nhịp (minh họa, không phải bản ghi kích nổ) | A07 |
| `sfx/giot-cham.wav` | chuyển động | giọt chạm, hai lần | A08 |
| `sfx/whoosh.wav` | chuyển động | whoosh ngắn | A09, A14 |
| `sfx/cach-co-khi.wav` | chuyển động | cạch cơ khí trầm | A11 |
| `sfx/khop-manh.wav` | chuyển động | khớp mảnh, hơi ngân | A15 |
| `moi-truong/may-cam-chung.wav` | môi trường | máy cầm chừng tổng hợp (bản 2 thêm hài cao cho loa điện thoại) | A10 |
| `sfx/tia-lua.wav` | chuyển động | tia lửa bugi | B04 |
| `sfx/lua-lan.wav` | chuyển động | phụt cháy | B06 |
| `sfx/ha-nhiet.wav` | chuyển động | nốt trượt xuống | B03 |
| `sfx/nen-len.wav` | chuyển động | nốt trượt lên | B05 |
| `sfx/tach-nho.wav` | chuyển động | tách nhỏ | B07, B12 |
| `sfx/chuong.wav` | chuyển động | chuông ba nốt | B13 |

Bản 2 còn dùng lại file cũ: whoosh (B01, B02), phun-mem (B08), click và click-cao (B09, B10), cach-co-khi (B11).

Nhạc nền: không dùng.

Giọng đọc (`eleven_v4/`) là file ElevenLabs, giọng Tung Dang; điều khoản giọng xem `brand/README.md`.

## Giọng đọc nhịp mới (2026-11-28, bản v1.5, chờ người dùng nghe)

- `giong/` (bản dùng để dựng: `giong/cat/`; nghe liền: `giong/nghe-thu.mp3`). ElevenLabs, giọng Tung Dang (voice_id `3VnrjnYrskPMDsapTr8X`), giọng tạo bằng AI trên gói Starter trả phí.
- Lời: `script/script-v1.5-nhip.json`. Lệnh: `node --env-file=.env pipeline/giong.js doc projects/005-hai-kim-phun --script script-v1.5-nhip.json`, rồi `cat` và `do`. Cấu hình theo `brand/nhip-doc.md`.
- Chưa dựng vào video. Giọng cũ giữ nguyên.

## Giọng `eleven_v4` (2026-11-28, chờ người dùng nghe)

- `giong-v4/` (nghe liền: `giong-v4/nghe-thu.mp3`). Lời `script/script-v1.5-nhip.json`, giọng Tung Dang, tạo bằng AI trên gói trả phí; `pipeline/giong.js doc|cat|do ... --out giong-v4`. Thay cho bản turbo ở `giong/` (đọc sai nhiều chữ).

**2026-11-28:** người dùng xem, nghe bản xem thử `demo/video-005-giong-v4-xem-thu.mp4` và nhắn "Ổn cả bốn". Đây chưa phải duyệt Cổng #2 để đăng.
