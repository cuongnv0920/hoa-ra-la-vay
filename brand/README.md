# Nhận diện kênh (nháp — chờ bạn chốt)

## Việc cần quyết định
- [x] Tên kênh: **Hóa Ra Là Vậy** (chốt 2026-11-25). Chưa kiểm tra tên còn trống trên YouTube và mạng xã hội.
- [ ] Slogan (gợi ý: "Chuyện quanh ta, hiểu cho tới gốc.")
- [x] Giọng đọc: **"Tung Dang - Deep, Warm and Resonant"** (ElevenLabs Voice Library, voice_id `3VnrjnYrskPMDsapTr8X`) — nam, giọng Bắc, trầm, ấm. Chốt 2026-11-23 sau khi nghe 9 giọng mẫu. Đây là giọng của cộng đồng: trước khi dùng thương mại, kiểm tra điều khoản của giọng (thời gian báo trước nếu chủ giọng gỡ) và cần gói trả phí. Việc tiếp theo: nghe giọng này đọc đoạn Hook của kênh mình.
- [ ] Phong cách hình ảnh: gợi ý "blueprint kỹ thuật + điện ảnh tối" (nền tối, đường nét sáng cam/xanh, ảnh lịch sử tông phim)
- [ ] Bảng màu + font (làm trong Figma)
- [x] Mẫu thumbnail: 1 vật thể/chi tiết lớn của chủ đề + 3–5 chữ tiếng Việt, độ tương phản cao. **Chốt 2026-11-26: ảnh bìa Reels** (người dùng nhắn "Dùng được" cho ba ảnh 005, 007, 008). Quy cách:
  - Ảnh tĩnh 1080×1920 dựng bằng Remotion: mẫu chung `pipeline/remotion/src/cover/Cover.jsx`, hình từng tập trong `cover/covers.jsx`, đăng ký `<Still id="CoverNNN">` trong `Root.jsx`.
  - Bố cục: tên kênh nhỏ ở trên; chip chủ đề; tiêu đề hai dòng rất to (một từ khóa tô màu); vật thể lớn có quầng sáng phía sau.
  - Mọi thứ quan trọng nằm trong ô vuông giữa (y 420–1500), vì có nơi Facebook cắt ảnh bìa thành ô vuông.
  - Vật thể vẽ bằng **khối màu đặc**, không dùng nét mảnh như trong video, để còn rõ khi thu nhỏ thành ô lưới. Vẫn phải đúng cơ chế như trong video.
  - Xuất: `npx remotion still pipeline/remotion/index.jsx CoverNNN projects/NNN-ten-video/assets/bia/anh-bia-NNN.png --public-dir=projects/NNN-ten-video/assets`.
  - Dùng: tải lên ở bước chọn ảnh bìa khi đăng Reel. Không chèn ảnh bìa vào video (giữ vài giây đầu cho hook), không sửa video đã đăng.

## Gợi ý định hướng
- Tông: nghiêm túc, hiểu biết, đầy cảm hứng — như một người thầy tò mò kể chuyện, không giật gân rẻ tiền.
- Nhất quán: cùng một giọng, cùng một phong cách hình, cùng intro ≤ 3 giây.
