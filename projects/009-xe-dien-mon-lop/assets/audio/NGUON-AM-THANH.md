# Nguồn và giấy phép âm thanh — video 009

File `.wav` và `.mp3` bị `.gitignore`; sổ này và các file `.json` được giữ trong git.

## Giọng đọc (bản dùng để dựng)

**Dùng:** `eleven_v4/nhanh/scene-01.wav` … `scene-07.wav` và `nhanh/scene-NN.alignment.json`.

1. **Tạo giọng:** ElevenLabs, giọng "Tung Dang" (voice_id `3VnrjnYrskPMDsapTr8X`), tạo bằng `pipeline/tts.js` ngày 2026-11-27. Nguồn chữ: `script/script.json` (kịch bản 1.4). Lệnh: `node --env-file=.env pipeline/tts.js projects/009-xe-dien-mon-lop --script script.json --model eleven_v4 --speed 0.95 --stability 0.5 --similarity 0.75 --force`. 1.899 ký tự. Ra `eleven_v4/scene-NN.mp3`, `timings.json`, `scene-NN.alignment.json`. Điều khoản giọng: xem `brand/README.md`.
2. **Tăng nhịp 6%** (người dùng nhắn "giọng đọc tổng thể nhanh hơn 1 chút"; tham số speed 0.95 của `eleven_v4` gần như không đổi nhịp so với 0.90, nên tăng nhịp bằng ffmpeg, giữ cao độ): `ffmpeg -i scene-NN.mp3 -af "atempo=1.06" -ar 44100 -ac 1 nhanh/scene-NN.wav`. Mốc chữ chia 1,06: `nhanh/scene-NN.alignment.json`.
3. **Làm mép:** mọi file thêm fade vào 8 ms và fade ra 40 ms (`afade=t=in:st=0:d=0.008,afade=t=out:st=<dài−0,04>:d=0.04`). Lý do: đo mức thấy đầu cảnh 6 vào tiếng đột ngột (khoảng −11 dB ngay 10 ms đầu), đuôi cảnh 3 và 5 có tiếng bật nhỏ (−28 và −33 dB) sau đoạn lặng.

- `eleven_v4/shot-timings.json`: mốc shot thật tính từ `nhanh/*.alignment.json`, cùng quy ước video 008 (0,2 s đầu cảnh, 0,45 s cuối cảnh, 1,5 s kết). Tổng **02:05,8**.
- `eleven_v4/nghe-thu-ca-bai.mp3`: bản nghe liền, ghép bằng ffmpeg theo `shot-timings.json` từ `nhanh/`. Đỉnh −0,7 dBFS, trung bình −16,4 dB.
- Người dùng nghe bản này và nhắn "Giọng ổn" ngày 2026-11-27.

## Các lượt trước (lịch sử, không dùng)

- `eleven_v4/cu-speed090/`: lượt đầu, speed 0.90, kịch bản 1.3 (1.906 ký tự), và cảnh 5 tạo lại theo bản 1.4 "mô-men xoắn" (353 ký tự), kèm `timings.json`, `shot-timings.json` (02:11,7) và `sua/scene-06.wav` (fade vào 8 ms).
- `eleven_v4/cu-v1.3/`: cảnh 5 theo kịch bản 1.3 ("lực xoắn") và bản đã cắt 40 ms đuôi nhiễu.

Tổng ký tự ElevenLabs đã dùng cho tập 009: 1.906 + 353 + 1.899 = **4.158**.

## Hiệu ứng

Mọi file hiệu ứng **tự tổng hợp bằng mã** (`pipeline/sfx-009.js`, chạy `node pipeline/sfx-009.js` từ gốc repo) ngày 2026-11-27, sau khi người dùng nhắn "Hình ổn, làm âm thanh". Không dùng bản thu, mẫu âm hay thư viện của bên thứ ba, nên không có yêu cầu ghi công và không có giới hạn từ bên ngoài. Tác giả: dự án Hóa Ra Là Vậy (mã do Claude viết theo yêu cầu của chủ kênh). Chạy lại lệnh sẽ tạo ra đúng các file này.

Gắn vào video: `pipeline/remotion/src/v009/sound.jsx` (33 cue = 47 lần phát; mốc lấy từ `cues.js` và `ContactPatch.exitFrames`, cùng mốc với animation). Danh sách mốc thật: `audio/cues-009.json`. Mức như video 007, 008: vừa −8, nhẹ −13, nền −21 dB so với đỉnh file; giọng và hiệu ứng cùng hạ 1 dB (`MASTER`).

| File | Lớp | Mô tả | Cue (storyboard 009) | Nguồn |
|---|---|---|---|---|
| `sfx/click.wav` | chuyển động | click kim loại nhỏ | A05, A13b, A20 | tự tổng hợp; giống hệt file cùng tên của video 008 (kiểm bằng `cmp`) |
| `sfx/click-cao.wav` | chuyển động | click cao hơn | A03, A12, A28, A29, A30 | như trên |
| `sfx/click-tram.wav` | chuyển động | click trầm, chắc | A01, A14, A23a | như trên |
| `sfx/whoosh.wav` | chuyển động | whoosh ngắn, êm | A04, A11, A22 | như trên |
| `sfx/tick.wav` | chuyển động | tick nhỏ, khô | A13a, A21, A27 | như trên |
| `sfx/ting.wav` | chuyển động | ting ngắn, sáng | A06, A19 | như trên |
| `sfx/thich-dap.wav` | chuyển động | thịch trầm bị dập | A10 | như trên |
| `sfx/cop-duc.wav` | chuyển động | cộp đục, nhỏ | A02, A08, A16, A26 | như trên |
| `sfx/khop-manh.wav` | chuyển động | khớp gọn, hơi ngân | A31 | như trên |
| `sfx/chuong.wav` | chuyển động | chuông ba nốt | A33 | như trên |
| `sfx/ket-lop.wav` | chuyển động | lốp bị kéo, két ngắn, cụt | A23b, A25 | như trên |
| `sfx/cao-su-truot.wav` | chuyển động | cao su rít rất khẽ, 0,1 s, cao độ trượt nhẹ xuống | A07, A09, A15a, A24, A32a | tự tổng hợp (mới, hàm `rubber`) |
| `sfx/cao-su-truot-day.wav` | chuyển động | như trên, trầm và dày hơn một chút, 0,13 s | A15b, A32b | tự tổng hợp (mới, `rubber(true)`) |
| `sfx/can-kim.wav` | chuyển động | kim cân: tick dày rồi thưa, lò xo nhỏ lúc dừng (ở 0,37 s), dài 0,6 s | A17, A18 | tự tổng hợp (mới, hàm `scaleNeedle`) |

Bản nghe thử có hiệu ứng: `audio/nghe-thu-co-hieu-ung.mp3` (ghép bằng ffmpeg theo `cues-009.json`, cùng mức và mốc như trong video; 02:06,0; đỉnh −1,6 dBFS, trung bình −17,2 dB). Người dùng nghe và nhắn "Tiếng ổn" ngày 2026-11-27.

Ghi chú khớp lời: A12 ("≈ 490 kg") và A19 ("≈ 210 kg") đặt ngay **trước** khi đọc số, vì shot hết ngay sau chữ "ký". A12 rơi vào khoảng lặng, A19 chạm nhẹ chữ "Chênh". A26 rơi đúng lúc chữ "Không." vừa dứt.

## Nhạc nền, môi trường

Không dùng (theo storyboard đã duyệt).

## Giọng đọc nhịp mới (2026-11-28, bản v1.5, chờ người dùng nghe)

- `giong/` (bản dùng để dựng: `giong/cat/`; nghe liền: `giong/nghe-thu.mp3`). ElevenLabs, giọng Tung Dang (voice_id `3VnrjnYrskPMDsapTr8X`), giọng tạo bằng AI trên gói Starter trả phí.
- Lời: `script/script-v1.5-nhip.json`. Lệnh: `node --env-file=.env pipeline/giong.js doc projects/009-xe-dien-mon-lop --script script-v1.5-nhip.json`, rồi `cat` và `do`. Cấu hình theo `brand/nhip-doc.md`.
- Chưa dựng vào video. Giọng cũ giữ nguyên.

## Giọng thử `eleven_v4` (2026-11-28, chờ người dùng nghe)

- `giong-v4/` (nghe liền: `giong-v4/nghe-thu.mp3`). Cùng lời `script/script-v1.5-nhip.json`, giọng Tung Dang, tạo bằng AI trên gói trả phí. Lệnh: `pipeline/giong.js doc|cat|do ... --out giong-v4`.
- Lý do: giọng turbo ở `giong/` đọc sai nhiều chữ (`brand/loi-doc-turbo.md`).

**2026-11-28:** người dùng xem, nghe bản xem thử `demo/video-009-giong-v4-xem-thu.mp4` và nhắn "Ổn cả bốn". Đây chưa phải duyệt Cổng #2 để đăng.
