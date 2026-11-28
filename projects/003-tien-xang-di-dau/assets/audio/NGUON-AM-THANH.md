# Nguồn và giấy phép âm thanh — video 003

File `.wav` và `.mp3` bị `.gitignore`; sổ này và các file `.json` được giữ trong git.

## Giọng đọc nhịp mới (2026-11-28, bản v3.3, chờ người dùng nghe)

- `giong/` (bản dùng để dựng: `giong/cat/`; nghe liền: `giong/nghe-thu.mp3`). ElevenLabs, giọng Tung Dang (voice_id `3VnrjnYrskPMDsapTr8X`), giọng tạo bằng AI trên gói Starter trả phí.
- Lời: `script/script-v3.3-nhip.json`. Lệnh: `node --env-file=.env pipeline/giong.js doc projects/003-tien-xang-di-dau --script script-v3.3-nhip.json`, rồi `cat` và `do`. Cấu hình theo `brand/nhip-doc.md`.
- Chưa dựng vào video. Giọng cũ giữ nguyên.

## Giọng `eleven_v4` (2026-11-28, chờ người dùng nghe)

- `giong-v4/` (nghe liền: `giong-v4/nghe-thu.mp3`). Lời `script/script-v3.3-nhip.json`, giọng Tung Dang, tạo bằng AI trên gói trả phí; `pipeline/giong.js doc|cat|do ... --out giong-v4`. Thay cho bản turbo ở `giong/` (đọc sai nhiều chữ).

## Hiệu ứng và âm thanh môi trường (bản giọng mới, 2026-11-28)

Chép nguyên file đã tổng hợp bằng mã của kênh (không dùng bản thu hay thư viện bên thứ ba, không cần ghi công). Gốc, hàm tổng hợp và tác giả (kênh) như ghi trong sổ của video nguồn. Mốc và mức: `pipeline/remotion/src/v003v3d/sound.jsx`. Chưa ai nghe.

| File | Lớp | Nguồn |
|---|---|---|
| `sfx/click.wav`, `click-tram`, `click-cao`, `tick`, `ting`, `whoosh` | chuyển động | video 009 (`assets/audio/sfx/`, `pipeline/sfx-009.js`) |
| `sfx/hoi-thoang.wav` | chuyển động | video 005 (`pipeline/sfx-005.js`) |
| `sfx/ma-sat-ngan.wav` | chuyển động | video 008 (`pipeline/sfx-008.js`) |
| `sfx/chuyen-nhe-tram.wav` | chuyển động | video 011 (`pipeline/sfx-011.js`) |
| `moi-truong/may-cam-chung.wav` | môi trường | video 005 (`pipeline/sfx-005.js`) |

Lệnh: sao chép bằng `cp` ngày 2026-11-28.

**2026-11-28:** người dùng nghe bản xem thử `demo/video-003-giong-v4-xem-thu.mp4` (giọng v4 đã cắt lại, có hiệu ứng) và nhắn "003 đã ổn". Đây chưa phải duyệt Cổng #2 để đăng.
