# Hóa Ra Là Vậy — hướng dẫn chính cho Claude Code

Đây là hướng dẫn làm việc chính của Claude trong repo. Khi tài liệu dự án khác ghi thông tin cũ hoặc mâu thuẫn, ưu tiên hướng dẫn này và quyết định mới nhất của người dùng; sau đó đề xuất cập nhật tài liệu lỗi thời. Không tự khôi phục quyết định cũ từ ghi chú lịch sử.

## Kênh và nội dung

- Kênh tiếng Việt, giải thích nghiêm túc những điều quanh ta bằng cơ chế bên trong. Mỗi video trả lời **một câu hỏi**.
- Các loạt hiện tại: ô tô (bộ phận; xe điện so với xe xăng/dầu), công nghệ thông tin, xây dựng và kiến thức đời sống.
- Video dọc 9:16, 1080×1920; dài 1–3 phút. Kịch bản viết để nghe: câu ngắn, mỗi câu một ý, giải thích thuật ngữ, không dồn số liệu.
- Giai đoạn hiện tại: giọng Tung Dang + hình minh họa; không có người dẫn. Xem `brand/README.md`.
- Cơ chế kỹ thuật phải được minh họa bằng animation lập trình (Remotion/Three.js). AI video chỉ dùng cho cảnh điện ảnh, lịch sử hoặc cảm xúc.

## Độ chính xác và duyệt

- Mọi khẳng định kỹ thuật/lịch sử cần nguồn và fact-check.
- Có hai cổng duyệt của người: #1 sau fact-check kịch bản; #2 trước khi đăng. Không tự đánh dấu đã duyệt và không tự đăng.
- Chỉ sửa bản đã qua duyệt khi người dùng yêu cầu. Bản mới phải ghi rõ trạng thái, không ghi đè bản cũ.
- Kiểm tra lại giá, chính sách và dữ liệu có thể đổi ngay trước khi tạo giọng hoặc đăng.
- Làm ít nhưng có góc nhìn riêng; tiết kiệm credits, chỉ tạo asset sau khi storyboard được duyệt.

## Công cụ và cách làm hiện tại

- Claude Code là coding agent chính để sửa mã và tài liệu trong repo; không cần chia nhiều agent theo mặc định.
- Remotion đang được dựng và render tại chỗ trong `pipeline/remotion/`.
- Giọng đọc được tạo bằng `pipeline/tts.js`, gọi ElevenLabs API từ máy của người dùng; không cần MCP ElevenLabs cho luồng này.
- MCP chỉ là cầu nối để agent gọi trực tiếp một dịch vụ. Chỉ đề xuất hoặc dùng MCP khi có tác vụ cần thao tác dịch vụ đó; không thêm MCP, workflow tự động hoặc dịch vụ mới chỉ vì chúng tồn tại.
- Skill là hướng dẫn tái sử dụng; prompt là yêu cầu cho một việc cụ thể; workflow là thứ tự các bước sản xuất. Các skill nội dung của kênh nằm trong `.claude/skills/` và `.agents/skills/`.
- Trước khi thêm thư viện hoặc lấy template bên ngoài, xác định vấn đề cụ thể, kiểm tra tương thích với Remotion hiện tại và chỉ lấy phần cần thiết.

## Quy trình làm video

`research → script → fact-check → [DUYỆT #1] → storyboard → tạo asset/giọng → dựng Remotion → xem và sửa → QA → [DUYỆT #2] → upload thủ công`

Không xây website điều phối hay tự động hóa toàn bộ quy trình ở giai đoạn này. Ghi nhận điểm nghẽn qua vài video trước, rồi mới tự động hóa bước lặp lại.

## Trạng thái và thứ tự video ô tô

- Video mở đầu **“Tiền xăng của bạn đi đâu?”** (`projects/003-tien-xang-di-dau/`) **đã đăng ngày 2026-11-25** dạng Thước phim trên trang Facebook của kênh. Bản đăng là 3.2: `script/script-v3.2.md` (đã qua Cổng #1 và #2, fact-check ở `script/factcheck-v3.md`), composition `Video003V32Dang`, giọng Tung Dang bằng `eleven_v4`, speed 0.90.
- Còn theo dõi: kiểm lại giá xăng sau kỳ điều hành 26/11/2026 và giá sạc (video nói chi phí xe điện thường thấp hơn). Các bản 1, 2, 3, 3.1 giữ làm lịch sử, không sửa.
- `projects/002-phanh-dia/` là kho tư liệu, chưa chọn làm video đăng đầu.
- `projects/001-hop-so-tu-dong/` tạm hoãn đến sau các video nền về ly hợp, hộp số sàn và vi sai.
- Số thư mục là thứ tự tạo dự án, không phải thứ tự đăng.

## Cấu trúc repo

- `projects/NNN-ten-video/`: research, script, assets của từng video.
- `pipeline/remotion/`: mã composition và thành phần dựng video.
- `pipeline/tts.js`: gọi ElevenLabs và ghi thời lượng giọng.
- `.claude/skills/`, `.agents/skills/`: hướng dẫn cho các công việc nội dung.
- `brand/`: giọng đọc và nhận diện; `docs/`: kế hoạch và ghi chú.

## Tài liệu tham chiếu

- Tóm tắt hiện hành: `README.md`.
- Kế hoạch và trạng thái dự án: `docs/00-ke-hoach-tong-the.md`.
- Dòng xe điện và xe xăng/dầu: `docs/02-dong-xe-dien-vs-xe-xang.md`.
- Hướng dẫn của từng skill phải được đọc khi thực hiện đúng công việc đó.

## Skill Remotion (từ remotion-dev/skills)

- Đã cài 4 skill chính chủ vào `.claude/skills/`: `remotion-studio`, `remotion-render`, `remotion-captions`, `remotion-docs` (nguồn ghi trong `skills-lock.json`). Không cài thêm skill Remotion khác (`remotion-best-practices`, `remotion-create`, `remotion-interactivity`, `remotion-upgrade`…) khi chưa được yêu cầu; nếu skill đã cài nhắc tới chúng thì bỏ qua.
- Dùng lệnh của dự án thay cho lệnh mẫu trong skill; luôn ghi file gốc và thư mục tài sản của đúng video:
  - Preview: `npx remotion studio pipeline/remotion/index.jsx --public-dir=projects/<NNN-ten-video>/assets`
  - Render: `npx remotion render pipeline/remotion/index.jsx <ID> <đường-dẫn-ra>.mp4 --public-dir=projects/<NNN-ten-video>/assets`
  - Soát nhanh vài khung hình: thêm `--frames=0,300,900 --image-format=png` và cho đường dẫn ra là một thư mục.
- Chỉ render khi người dùng yêu cầu rõ. Quy ước dự án được ưu tiên hơn skill: giữ JSX; giữ dòng thời gian sinh từ `script.json`/`storyboard.json`; giữ bố cục dọc và vùng an toàn trong `pipeline/remotion/src/vertical/layout.js`; không tái cấu trúc mã để chỉnh trong Studio; không nâng phiên bản Remotion.
- Phụ đề: dùng kiểu `Caption` của `@remotion/captions`, lấy mốc thời gian từ ElevenLabs (`with-timestamps`); không chép lời bằng Whisper, không cài thành phần `BasicCaptions`. Chỉ thêm gói `@remotion/captions` (đúng bản Remotion đang dùng) khi người dùng yêu cầu.
