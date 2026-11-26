# Hóa Ra Là Vậy — kế hoạch hiện hành

> Cập nhật 2026-11-25. Đây là bản tóm tắt quyết định hiện tại. Hướng dẫn vận hành Claude Code nằm trong `CLAUDE.md`; nếu bản ghi lịch sử hoặc tài liệu khác mâu thuẫn, không xem chúng là quyết định mới.

## 1. Mục tiêu kênh

Kênh video tiếng Việt giải thích những điều quanh ta mà ít người để ý. Mỗi video trả lời **một câu hỏi** bằng câu chuyện dễ theo dõi và cơ chế bên trong. Các lĩnh vực dự kiến gồm ô tô, công nghệ thông tin, xây dựng và kiến thức đời sống; mỗi lĩnh vực phát triển thành loạt riêng.

### Loạt ô tô

1. **Bộ phận:** giải thích cách vận hành của một bộ phận, kèm lịch sử ngắn khi giúp câu chuyện.
2. **Xe điện và xe xăng/dầu:** so sánh chi phí, ưu nhược điểm bằng dữ liệu Việt Nam và giải thích cơ chế. Xem `02-dong-xe-dien-vs-xe-xang.md`.

## 2. Định dạng và giọng kể

- Ngôn ngữ: tiếng Việt; viết có cấu trúc rõ để có thể dịch sau này.
- Hình: dọc 9:16, 1080×1920; thiết kế cho điện thoại trước.
- Thời lượng: 1–3 phút. Mốc 200–600 từ chỉ là khoảng tham khảo; ưu tiên dễ nghe, dễ hiểu hơn đủ số từ.
- Giai đoạn đầu: giọng đọc và hình minh họa, không có nhân vật dẫn.
- Giọng hiện chọn: Tung Dang (ElevenLabs), nam, giọng Bắc, trầm ấm. Xem `brand/README.md`.
- Kịch bản viết để nghe: câu ngắn, mỗi câu một ý, giải thích thuật ngữ, có nhịp nghỉ; tránh liệt kê nhiều con số liên tiếp.

## 3. Nguyên tắc sản xuất

1. Độ chính xác kỹ thuật là ưu tiên. Khẳng định kỹ thuật và lịch sử phải có nguồn, được fact-check.
2. Có hai lần người dùng duyệt: **Cổng #1** sau fact-check kịch bản và **Cổng #2** trước khi đăng. Không tự đăng.
3. Cơ chế kỹ thuật được thể hiện bằng animation lập trình (Remotion/Three.js). AI video dành cho cảnh điện ảnh, lịch sử hoặc cảm xúc.
4. Tiết kiệm credits: chỉ tạo asset sau khi storyboard được duyệt; thử mẫu ngắn trước khi làm dài.
5. Bật nhãn altered/synthetic content khi đăng cảnh thực tế do AI tạo.
6. Mỗi video cần góc nhìn riêng, không sản xuất hàng loạt theo một khuôn.

## 4. Quy trình hiện tại

`research → script → fact-check → [DUYỆT #1] → storyboard → tạo asset và giọng → dựng Remotion → xem/sửa → QA → [DUYỆT #2] → đăng thủ công`

Ở giai đoạn này, Claude Code hỗ trợ làm việc trong repo; Remotion dựng video tại chỗ; `pipeline/tts.js` gọi ElevenLabs API để tạo giọng. MCP, agent bổ sung, workflow tự động hoặc website điều phối **không phải điều kiện để làm video**. Chỉ thêm công cụ khi đã xác định được việc lặp lại mà nó giải quyết.

## 5. Thứ tự và trạng thái dự án ô tô

Số thư mục biểu thị thứ tự tạo dự án, không phải thứ tự đăng.

| Dự án | Trạng thái hiện tại |
|---|---|
| `003-tien-xang-di-dau` | Video mở đầu dự kiến đăng. Kịch bản nháp 2 qua Cổng #1; đã có demo Remotion. Kịch bản nháp 3 là bản chỉnh lời đọc, chưa fact-check và chưa qua Cổng #1. |
| `002-phanh-dia` | Giữ làm kho tư liệu: research, fact-check và thành phần animation; chưa chọn làm video mở đầu. |
| `001-hop-so-tu-dong` | Tạm hoãn; làm sau các video nền về ly hợp, hộp số sàn và vi sai. |

Thứ tự gợi ý đã chốt: bắt đầu từ bộ phận đơn giản, tăng dần độ phức tạp. Chủ đề video cụ thể tiếp theo sẽ được chọn sau khi hoàn thành vòng làm video hiện tại.

## 6. Công cụ và tự động hóa

- Mã dựng hiện ở `pipeline/remotion/`; phụ thuộc Remotion được khai báo trong `package.json`.
- Tạo giọng qua ElevenLabs bằng `pipeline/tts.js`; khóa API để trong `.env`, không commit.
- Các skill researcher, scriptwriter, fact-checker, storyboarder hỗ trợ công việc nội dung. Chúng không phải các agent bắt buộc phải chạy cùng lúc.
- Làm thủ công có hỗ trợ trước. Sau vài video, ghi lại điểm nghẽn rồi mới chọn bước để tự động hóa.
- Chưa xây website điều phối, hệ thống hàng đợi, quy trình upload tự động hay nhiều agent chuyên biệt.

## 7. Ghi chú lịch sử

Các ý tưởng ban đầu về video đầu, thời lượng 5–15 phút, lịch đăng và website điều phối đã được thay thế bởi quyết định hiện hành ở trên. Chúng không còn là chỉ dẫn thực thi.

Nhánh thử nội dung Facebook Reels được ghi riêng trong `01-nhanh-facebook-khao-sat-doi-thu.md`.
