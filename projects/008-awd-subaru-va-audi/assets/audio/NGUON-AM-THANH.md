# Nguồn và giấy phép âm thanh — video 008

Mọi file hiệu ứng dưới đây **tự tổng hợp bằng mã** (`pipeline/sfx-008.js`, chạy `node pipeline/sfx-008.js` từ gốc repo) ngày 2026-11-26. Không dùng bản thu, mẫu âm hay thư viện của bên thứ ba, nên không có yêu cầu ghi công và không có giới hạn từ bên ngoài. Tác giả: dự án Hóa Ra Là Vậy (mã do Claude viết theo yêu cầu của chủ kênh).

File `.wav` và `.mp3` bị `.gitignore`; chạy lại lệnh trên sẽ tạo ra đúng các file hiệu ứng này.

Giọng đọc (`eleven_v4/scene-*.mp3`): ElevenLabs, giọng "Tung Dang" (voice_id `3VnrjnYrskPMDsapTr8X`), tạo bằng `pipeline/tts.js` ngày 2026-11-26 với `--model eleven_v4 --speed 0.9`; cấu hình ghi trong `eleven_v4/timings.json`. Điều khoản giọng: xem `brand/README.md`.

Giọng đã làm sạch (2026-11-26, sau góp ý "tiếng đọc ở 1:12–1:13 bị xẹt" trên bản xem thử); file gốc giữ nguyên, video dùng bản sạch qua `AUDIO_FIX` trong `pipeline/remotion/src/v008/timeline.js`:
- `eleven_v4/sua/scene-04.wav`: cắt tiếng nhiễu khoảng 30 ms ở đuôi file gốc (dải 3–9 kHz, lỗi khi tạo giọng), fade ra 80 ms. Lệnh: `ffmpeg -i scene-04.mp3 -af "atrim=0:22.03,afade=t=out:st=21.95:d=0.08" -ar 44100 -ac 1 sua/scene-04.wav`.
- `eleven_v4/sua/scene-05.wav`: bỏ tiếng tách ở mẫu đầu (fade vào 8 ms), giảm dải trên 4 kHz 9 dB trong 0,14 s đầu cho âm "S" của chữ "Subaru" bớt gắt (đo được giảm khoảng 7 dB), phần sau giữ nguyên. Lệnh: `ffmpeg -i scene-05.mp3 -filter_complex "[0]asplit=2[a][b];[a]atrim=0:0.16,asetpts=PTS-STARTPTS,highshelf=f=4000:g=-9,afade=t=in:st=0:d=0.008[h];[b]atrim=0.14,asetpts=PTS-STARTPTS[r];[h][r]acrossfade=d=0.02:c1=tri:c2=tri" -ar 44100 -ac 1 sua/scene-05.wav`.

| File | Lớp | Mô tả | Cue (storyboard 008) | Nguồn |
|---|---|---|---|---|
| `sfx/whoosh.wav` | chuyển động | whoosh ngắn, êm | A01, A12, A19, A31 | tự tổng hợp; giống hệt file cùng tên của video 007 (kiểm bằng `cmp`) |
| `sfx/click.wav` | chuyển động | click kim loại nhỏ | A02, A16, A20, A27 | như trên |
| `sfx/click-cao.wav` | chuyển động | click cùng họ, cao hơn | A02, A10, A17, A21, A27 | như trên |
| `sfx/click-tram.wav` | chuyển động | click trầm, chắc | A04, A26 | như trên |
| `sfx/tick.wav` | chuyển động | tick nhỏ, khô | A05, A13, A25 | như trên |
| `sfx/thich-dap.wav` | chuyển động | thịch trầm bị dập | A07 | như trên |
| `sfx/ting.wav` | chuyển động | ting ngắn, sáng | A08, A29 | như trên |
| `sfx/khop-manh.wav` | chuyển động | khớp mảnh, hơi ngân | A09, A28 | như trên |
| `sfx/cop-duc.wav` | chuyển động | cộp đục, nhỏ | A11 | như trên |
| `sfx/cach-co-khi.wav` | chuyển động | cạch cơ khí trầm | A15, A18, A24 | như trên |
| `sfx/chuong.wav` | chuyển động | chuông ba nốt | A30 | như trên |
| `sfx/cach-mo.wav` | chuyển động | "tách" mở nhẹ, sáng hơn tiếng khóa | A03, A22 | tự tổng hợp (mới, hàm `release`) |
| `sfx/quay-cham-dan.wav` | chuyển động | trục quay chậm dần rồi dừng, 1,4 s, khớp `SPIN_DOWN` | A03, A23 | tự tổng hợp (mới, hàm `spin`) |
| `sfx/quay-nhanh-dan.wav` | chuyển động | trục quay nhanh dần, 0,6 s, khớp `SPIN_UP` | A26 | tự tổng hợp (mới, hàm `spin`) |
| `sfx/ket-lop.wav` | chuyển động | lốp bị kéo, két ngắn, cụt | A06 | tự tổng hợp (mới, hàm `scrub`) |
| `sfx/ma-sat-ngan.wav` | chuyển động | ma sát đĩa trượt, mềm, 0,5 s | A14 | tự tổng hợp (mới, hàm `friction`) |
| `sfx/truot-banh.wav` | chuyển động | bánh trượt trên mặt trơn, "xẹt" ngắn | A18 | tự tổng hợp (mới, hàm `wheelSlip`) |

Không có nhạc nền, không có âm thanh môi trường (theo storyboard đã duyệt).
