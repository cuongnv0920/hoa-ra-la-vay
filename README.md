# Hóa Ra Là Vậy

Kênh video tiếng Việt giải thích những điều quanh ta bằng cách kể chuyện và làm rõ cơ chế bên trong. Mỗi video trả lời một câu hỏi. Các loạt hiện tại gồm ô tô, công nghệ thông tin, xây dựng và kiến thức đời sống.

## Cách làm hiện tại

`research → script → fact-check → duyệt #1 → storyboard → tạo giọng/asset → dựng Remotion → xem và sửa → QA → bài đọc → duyệt #2 → npm run xuat-ban (website + Facebook) → đăng thủ công TikTok/YouTube`

Claude Code hỗ trợ viết mã và làm việc với tài liệu. Video được dựng bằng Remotion; giọng đọc được tạo qua script ElevenLabs trong repo. MCP và tự động hóa thêm chỉ được đưa vào khi giải quyết một nhu cầu cụ thể. Hai lần duyệt của người dùng không tự động hóa. Sau duyệt #2, người dùng chạy một lệnh để đăng bài lên website và Reel lên Facebook (xem [`docs/03-website-va-xuat-ban.md`](docs/03-website-va-xuat-ban.md)).

## Cấu trúc

| Thư mục | Nội dung |
|---|---|
| `projects/NNN-ten-video/` | Nghiên cứu, kịch bản, storyboard và tài sản của từng video |
| `web/` | Website của kênh (bài đọc kèm từng video) và lệnh `xuat-ban` |
| `pipeline/remotion/` | Composition và thành phần dựng video |
| `pipeline/tts.js` | Tạo giọng qua ElevenLabs API và lưu thời lượng |
| `.claude/skills/`, `.agents/skills/` | Hướng dẫn cho các công việc nội dung |
| `brand/` | Giọng đọc và nhận diện kênh |
| `docs/` | Kế hoạch và ghi chú theo từng dòng nội dung |

## Trạng thái hiện tại

- Video mở đầu **“Tiền xăng của bạn đi đâu?”** (`projects/003-tien-xang-di-dau/`) **đã đăng ngày 2026-11-25** trên trang Facebook của kênh, theo bản 3.2 (`script/script-v3.2.md`). Còn kiểm lại giá xăng và giá sạc sau kỳ điều hành 26/11/2026.
- `projects/002-phanh-dia/` được giữ làm kho tư liệu.
- `projects/001-hop-so-tu-dong/` tạm hoãn đến sau các video nền về ly hợp, hộp số sàn và vi sai.

## Tài liệu bắt đầu

- Hướng dẫn chính cho Claude Code: [`CLAUDE.md`](CLAUDE.md)
- Kế hoạch và trạng thái dự án: [`docs/00-ke-hoach-tong-the.md`](docs/00-ke-hoach-tong-the.md)
- Dòng xe điện và xe xăng/dầu: [`docs/02-dong-xe-dien-vs-xe-xang.md`](docs/02-dong-xe-dien-vs-xe-xang.md)
- Website và xuất bản: [`docs/03-website-va-xuat-ban.md`](docs/03-website-va-xuat-ban.md)
- Nhánh Facebook phụ: [`docs/01-nhanh-facebook-khao-sat-doi-thu.md`](docs/01-nhanh-facebook-khao-sat-doi-thu.md)

## Bí mật

Khóa API lưu trong `.env`, không đưa vào Git. Xem `.gitignore`.
