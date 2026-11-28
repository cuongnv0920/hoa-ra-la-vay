# Nguồn và giấy phép âm thanh — video 007

Mọi file hiệu ứng dưới đây **tự tổng hợp bằng mã** (`pipeline/sfx-007.js`, chạy `node pipeline/sfx-007.js` từ gốc repo) ngày 2026-11-26. Không dùng bản thu, mẫu âm hay thư viện của bên thứ ba, nên không có yêu cầu ghi công và không có giới hạn từ bên ngoài. Tác giả: dự án Hóa Ra Là Vậy (mã do Claude viết theo yêu cầu của chủ kênh).

File `.wav` bị `.gitignore`; chạy lại lệnh trên sẽ tạo ra đúng các file này.

| File | Lớp | Mô tả | Cue (storyboard 007) | Nguồn |
|---|---|---|---|---|
| `sfx/click.wav` | chuyển động | click kim loại nhỏ | A03, A14, A17 | tự tổng hợp; giống hệt file cùng tên của video 005 |
| `sfx/click-cao.wav` | chuyển động | click cùng họ, cao hơn | A06, A17 | như trên |
| `sfx/whoosh.wav` | chuyển động | whoosh ngắn, êm | A13, A15 | như trên |
| `sfx/cach-co-khi.wav` | chuyển động | cạch cơ khí trầm | A10 | như trên |
| `sfx/khop-manh.wav` | chuyển động | khớp mảnh, hơi ngân | A19 | như trên |
| `sfx/chuong.wav` | chuyển động | chuông ba nốt | A20 | như trên |
| `sfx/tick.wav` | chuyển động | tick nhỏ, khô (phát bốn lần, cao dần nhờ tốc độ phát) | A01 | tự tổng hợp (cùng hàm với `tach-nho` của video 005) |
| `sfx/truot-dung.wav` | chuyển động | trượt nhẹ rồi cộp êm | A02 | tự tổng hợp |
| `sfx/thup.wav` | chuyển động | thụp mềm, trầm | A04 | tự tổng hợp |
| `sfx/bup-gang.wav` | chuyển động | bụp găng đấm, nhỏ | A05 | tự tổng hợp |
| `sfx/thich.wav` | chuyển động | thịch ngắn, trầm | A07 | tự tổng hợp |
| `sfx/thich-dap.wav` | chuyển động | thịch bị dập nhanh, còn đuôi rất nhỏ (bù phần lớn, không im hẳn) | A08 | tự tổng hợp |
| `sfx/re-rung.wav` | chuyển động | một đợt rè rung trầm | A09 | tự tổng hợp |
| `sfx/ting.wav` | chuyển động | ting ngắn, sáng | A11 | tự tổng hợp |
| `sfx/tha-tram.wav` | chuyển động | thả trầm, êm | A12 | tự tổng hợp |
| `sfx/cop-duc.wav` | chuyển động | cộp đục | A14 | tự tổng hợp |
| `sfx/click-tram.wav` | chuyển động | click chắc, trầm hơn | A16 | tự tổng hợp |
| `sfx/keng-co-le.wav` | chuyển động | kim loại chạm, cụt | A18 | tự tổng hợp |

Âm thanh môi trường: không dùng. Không thêm tiếng máy boxer thật vì chưa có bản thu có giấy phép rõ.

Nhạc nền: không dùng.

Giọng đọc (`eleven_v4/`) là file ElevenLabs, giọng Tung Dang; điều khoản giọng xem `brand/README.md`.

## Giọng đọc nhịp mới (2026-11-28, bản v2.3, chờ người dùng nghe)

- `giong/` (bản dùng để dựng: `giong/cat/`; nghe liền: `giong/nghe-thu.mp3`). ElevenLabs, giọng Tung Dang (voice_id `3VnrjnYrskPMDsapTr8X`), giọng tạo bằng AI trên gói Starter trả phí.
- Lời: `script/script-v2.3-nhip.json`. Lệnh: `node --env-file=.env pipeline/giong.js doc projects/007-subaru-may-boxer --script script-v2.3-nhip.json`, rồi `cat` và `do`. Cấu hình theo `brand/nhip-doc.md`.
- Chưa dựng vào video. Giọng cũ giữ nguyên.

## Giọng `eleven_v4` (2026-11-28, chờ người dùng nghe)

- `giong-v4/` (nghe liền: `giong-v4/nghe-thu.mp3`). Lời `script/script-v2.3-nhip.json`, giọng Tung Dang, tạo bằng AI trên gói trả phí; `pipeline/giong.js doc|cat|do ... --out giong-v4`. Thay cho bản turbo ở `giong/` (đọc sai nhiều chữ).

**2026-11-28:** người dùng xem, nghe bản xem thử `demo/video-007-giong-v4-xem-thu.mp4` và nhắn "Ổn cả bốn". Đây chưa phải duyệt Cổng #2 để đăng.
