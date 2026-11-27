# Hóa Ra Là Vậy — kênh video do AI vận hành

Kênh nghiêm túc, giải thích những điều quanh ta mà ít người để ý (tên và phạm vi chốt 2026-11-25). Mỗi video trả lời MỘT câu hỏi bằng cơ chế bên trong.

Phân phối video trên **YouTube và TikTok**. Bản dọc 9:16 là bản gốc dùng chung; rà soát vùng an toàn giao diện và thông tin đăng riêng cho từng nền tảng. Cổng duyệt #2 áp dụng trước mọi lần đăng. Sau Cổng #2, người dùng chạy `npm run xuat-ban -- NNN` để đăng bài lên website của kênh và Reel lên Facebook; TikTok và YouTube đăng thủ công (chốt 2026-11-27, xem `docs/03-website-va-xuat-ban.md`).

Lĩnh vực: ô tô, công nghệ thông tin, xây dựng, và các kiến thức đời sống khác. Mỗi lĩnh vực làm thành loạt riêng, chung một giọng và một kiểu giải thích.

Loạt đang có (ô tô), hai dòng nội dung:
1. **Bộ phận:** mỗi video giải thích chi tiết vận hành của MỘT bộ phận, kèm lịch sử ngắn.
2. **Xe điện vs xe xăng/dầu:** so sánh chi phí sử dụng, ưu/nhược điểm — bằng số liệu thật của Việt Nam và cơ chế bên trong, khác cách làm của đối thủ. Xem `docs/02-dong-xe-dien-vs-xe-xang.md`.
Đọc `docs/00-ke-hoach-tong-the.md` để nắm kế hoạch tổng thể.

## Quyết định đã chốt
- Ngôn ngữ: **tiếng Việt** cho khán giả Việt (có thể thêm tiếng Anh sau — viết kịch bản theo cấu trúc dễ dịch).
- Giai đoạn đầu: **giọng đọc + hình minh họa**, không có nhân vật dẫn.
- Độ dài (chốt 2026-11-23, thay mức 5–15 phút cũ): **1–3 phút** mỗi video. Nhịp đọc thật của Tung Dang ~210 từ/phút → **khoảng 200–600 từ**. Chủ đề lớn thì tách thành chuỗi nhiều video.
- Khung hình (chốt 2026-11-23): **dọc 9:16 (1080×1920)** vì người xem chủ yếu dùng điện thoại. Mọi bố cục, phụ đề, thành phần Remotion thiết kế cho màn hình dọc trước.
- Gói dịch vụ: Higgsfield **Starter**, ElevenLabs **Starter** → tiết kiệm credits, nâng cấp khi dự án tiến triển.
- Giọng đọc: **Tung Dang** (ElevenLabs, nam, giọng Bắc, trầm ấm) — xem `brand/README.md`. Kịch bản viết **để nghe**: câu ngắn, có câu hỏi treo, kể chuyện có nhân vật, không liệt kê dồn dập năm tháng.
- Thứ tự video loạt ô tô (chốt 2026-11-23): **bắt đầu từ bộ phận đơn giản**, phức tạp dần.
  - Video đăng đầu tiên (chốt 2026-11-23): **"Tiền xăng của bạn đi đâu?"** (`projects/003-tien-xang-di-dau`, đã qua Cổng duyệt #1). Phanh đĩa chưa thuyết phục người duyệt → `projects/002-phanh-dia` giữ làm kho tư liệu (research, fact-check, thành phần animation).
  - Hộp số tự động (`projects/001-hop-so-tu-dong`, đã có research + kịch bản qua duyệt #1 + storyboard) **tạm hoãn**, làm sau khi đã có các video nền (ly hợp, hộp số sàn, vi sai). Số thư mục là thứ tự tạo, không phải thứ tự đăng.

## Nguyên tắc bất di bất dịch
1. **Chính xác kỹ thuật trước tiên.** Mọi khẳng định kỹ thuật/lịch sử phải có nguồn và qua fact-checker.
2. **Hai cổng duyệt của người:** #1 sau fact-check kịch bản, #2 trước khi đăng. Agent không bao giờ tự đánh dấu duyệt hay tự chạy lệnh đăng thật (chỉ `--thu`).
3. **Mọi cơ chế (cơ khí, mạng, kết cấu…) = animation lập trình** (Remotion/Three.js). AI video chỉ cho cảnh điện ảnh/lịch sử/cảm xúc.
4. **Tiết kiệm credits:** thử bằng ảnh/clip ngắn trước, chỉ sinh video dài khi storyboard đã duyệt.
5. Bật nhãn "altered/synthetic content" khi đăng cảnh thực tế do AI tạo.
6. Không làm hàng loạt nội dung lặp khuôn; mỗi video phải có góc nhìn riêng.

## Cấu trúc
- `.agents/skills/` — researcher, scriptwriter, fact-checker, storyboarder
- `projects/NNN-ten-video/` — `research/`, `script/`, `assets/` cho từng video
- `brand/` — nhận diện kênh (giọng, phong cách hình ảnh)
- `pipeline/` — Remotion, tạo giọng
- `web/` — website của kênh và lệnh `xuat-ban`
- `docs/` — kế hoạch và ghi chú

## Quy trình mỗi video
research → script → fact-check → [DUYỆT #1] → storyboard → assets → giọng/nhạc → ráp → QA → chuẩn bị bản đăng theo nền tảng → bài đọc → [DUYỆT #2] → `npm run xuat-ban` (website + Facebook) → đăng thủ công lên YouTube và TikTok
