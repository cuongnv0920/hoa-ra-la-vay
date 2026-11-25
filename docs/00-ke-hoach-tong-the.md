# Hóa Ra Là Vậy — Kế hoạch tổng thể

> Tài liệu này lưu lại quy trình đã thống nhất trong cuộc trò chuyện ban đầu (2026-11-09). Đọc lại mỗi đầu tuần.

## 0. Ý tưởng cốt lõi

- Kênh YouTube nghiêm túc giải thích những điều quanh ta mà ít người để ý (ô tô, công nghệ thông tin, xây dựng, đời sống), toàn bộ nội dung do AI sản xuất.
- Mỗi video đi sâu vào **cơ chế bên trong của một điều cụ thể** (ví dụ: hộp số), kèm một chút **lịch sử** khi nó giúp câu chuyện hay hơn.
- Người làm: lập trình viên JS, xây một **website làm việc** cho toàn bộ quy trình: soạn kịch bản → kiểm duyệt → xuất bản → deploy YouTube.
- Mục tiêu: tự động hóa gần toàn bộ, bằng skills, agents, workflows.
- Mục tiêu video đầu tiên: thu hút view và truyền cảm hứng cho người xem tò mò (video đầu thuộc loạt ô tô).

## 1. Ba rủi ro cần xử lý trước

1. **Độ chính xác kỹ thuật.** Người trong nghề bắt lỗi rất nhanh. Bắt buộc có bước fact-check và người duyệt.
2. **Chính sách YouTube.** Nội dung "mass-produced / inauthentic" bị giảm hoặc tắt kiếm tiền. Cảnh thực tế do AI tạo phải bật nhãn "altered/synthetic content". Làm ít video nhưng sâu, có góc nhìn riêng, không làm hàng loạt.
3. **AI video chưa vẽ được cơ chế kỹ thuật chính xác.** Phần giải thích cơ chế làm bằng animation lập trình (Remotion/Three.js). AI video chỉ dùng cho cảnh điện ảnh, lịch sử, cảm xúc.

## 2. Định vị kênh

- Công thức: **"Một điều quanh ta = một câu chuyện"** (loạt ô tô: một bộ phận = một câu chuyện).
  - Hook (30 giây đầu): câu hỏi gây tò mò hoặc con số gây sốc.
  - Lịch sử ngắn: ai phát minh, vì sao.
  - Cơ chế chi tiết: từng bước, từng bánh răng.
- Nhịp đăng: 1–2 video mỗi tuần, chất lượng hơn số lượng.
- **Video #1 đề xuất:** *Hộp số tự động hoạt động thế nào? Bộ bánh răng hành tinh — phát minh thiên tài từ năm 1900.*
  - Bánh răng hành tinh rất hợp để animate, nhiều người tìm kiếm.
  - Lịch sử hay: Ford Model T, GM Hydra-Matic.
  - Mở rộng thành series: CVT, DCT, vi sai, turbo, phanh ABS.

## 3. Công cụ và MCP

| Công đoạn | Công cụ | Ghi chú |
|---|---|---|
| Cảnh điện ảnh, lịch sử | Higgsfield (`generate_image`, `generate_video`) | MCP đã kết nối |
| Giữ nhân vật/phong cách nhất quán | Higgsfield `manage_reference_elements` | Một phong cách xuyên suốt kênh |
| Giọng đọc | Higgsfield `generate_audio` / `create_voice` | Có thể thay bằng ElevenLabs nếu cần giọng tiếng Việt tự nhiên hơn |
| Nhạc nền | `generate_audio` | |
| Dự đoán độ hấp dẫn | Higgsfield `virality_predictor` | Thử thumbnail và hook trước khi đăng |
| Phân tích video đối thủ | Higgsfield `video_analysis_create` | Học cấu trúc hook, nhịp cắt |
| Thumbnail, branding | Figma MCP | Template thumbnail, design system |
| Animation cơ khí chính xác | Remotion (React → video), Three.js, Manim | Bánh răng quay đúng tỉ số truyền, render tự động |
| Nghiên cứu | Web search, tài liệu kỹ thuật | SAE, sách giáo khoa, tài liệu nhà sản xuất |
| Xuất bản | YouTube Data API v3 (OAuth) | Upload, tiêu đề, mô tả, chương, thumbnail, lịch đăng |

## 4. Kiến trúc website làm việc

Stack gợi ý: **Next.js + Postgres + hàng đợi job (BullMQ hoặc Inngest) + Remotion + Claude API**.

```
Ý tưởng → Nghiên cứu → Kịch bản → Fact-check → [NGƯỜI DUYỆT #1]
→ Storyboard → Asset (ảnh/video/animation) → Giọng + nhạc
→ Ráp video (Remotion) → QA tự động → [NGƯỜI DUYỆT #2]
→ Thumbnail/tiêu đề (A/B) → Upload YouTube → Phân tích sau đăng
```

### Các agent (mỗi agent là một skill riêng)

| Agent | Nhiệm vụ |
|---|---|
| Researcher | Thu thập nguồn, ghi trích dẫn |
| Scriptwriter | Viết kịch bản theo công thức hook → lịch sử → cơ chế |
| Fact-checker | Đối chiếu từng khẳng định kỹ thuật với nguồn, gắn cờ chỗ nghi ngờ |
| Storyboarder | Chia cảnh; quyết định cảnh nào animation lập trình, cảnh nào AI video |
| Asset producer | Gọi Higgsfield, Remotion |
| QA reviewer | Kiểm tra lệch tiếng/hình, lỗi hình ảnh, độ dài, âm lượng |
| Publisher | Tiêu đề, mô tả, chương, thumbnail, upload |
| Analyst | Đọc retention và CTR, đưa bài học vào bộ nhớ cho video sau |

**Hai cổng duyệt của con người (#1 sau fact-check kịch bản, #2 trước khi đăng) không tự động hóa.** Phần còn lại tự động tối đa.

## 5. Lộ trình

| Tuần | Nội dung |
|---|---|
| **1 – Nền tảng** | Chốt ngôn ngữ, giọng, phong cách kênh; bộ nhận diện (Figma); tạo repo; dựng khung pipeline chạy bằng CLI/skill, chưa cần giao diện |
| **2 – Video #1 thủ công có hỗ trợ** | Đi qua từng bước bằng skill/agent, ghi lại chỗ đau để tự động hóa; làm kỹ animation bánh răng hành tinh |
| **3 – Thử nghiệm và xuất bản** | `virality_predictor`, A/B thumbnail, đăng video #1 kèm một Short cắt từ hook |
| **4+ – Website quản lý** | Kanban các video, trình duyệt kịch bản, nút duyệt; sau đó mở rộng thành series |

Nguyên tắc: **không xây website hoàn chỉnh trước khi có video đầu tiên.** Làm video trước, rồi tự động hóa đúng những bước lặp lại.

## 6. Quyết định đã chốt (2026-11-09)

- ✅ **Ngôn ngữ:** tiếng Việt cho khán giả Việt; sau này có thể thêm tiếng Anh (viết kịch bản dễ dịch).
- ✅ **Người dẫn:** giai đoạn đầu chỉ giọng đọc + hình minh họa.
- ✅ **Độ dài:** tối đa 15 phút, tùy bộ phận (5–15 phút). ≈ 2.200 từ cho 15 phút.
- ✅ **Gói dịch vụ:** Higgsfield Starter + ElevenLabs Starter; nâng cấp khi dự án có tiến triển.
  - Hệ quả: dùng ANIMATION-CODE và AI-IMAGE là chính, AI-VIDEO chỉ vài khoảnh khắc điện ảnh.
  - Ghi chú: lúc kiểm tra (2026-11-09) tài khoản Higgsfield trong MCP đang ở **gói free, 0 credits** → cần đăng ký Starter trước khi sinh ảnh/video.

### Cập nhật 2026-11-23
- ✅ **Giọng đọc:** Tung Dang (ElevenLabs Voice Library), chọn sau khi nghe 9 giọng tiếng Việt.
- ✅ **Đổi video đăng đầu tiên sang phanh đĩa** (`projects/002-phanh-dia`). Lý do: hộp số tự động quá phức tạp cho video mở kênh, kể cả với người am hiểu xe; bài dễ giúp chạy thử toàn bộ quy trình ít rủi ro.
- Lộ trình gợi ý sau đó: ly hợp → hộp số sàn → vi sai → hộp số tự động (dùng lại `projects/001-hop-so-tu-dong`).
- ✅ **Khung hình dọc 9:16** — người xem chủ yếu dùng điện thoại.
- ✅ **Độ dài 1–3 phút** (thay mức 5–15 phút), khoảng 200–600 từ. Chủ đề lớn tách thành chuỗi.
- Phanh đĩa chưa thuyết phục người duyệt → video đăng đầu tiên chờ chọn lại; `projects/002-phanh-dia` giữ làm kho tư liệu.
- ✅ **Thêm dòng nội dung "Xe điện vs xe xăng/dầu"** (chi phí sử dụng, ưu/nhược điểm), lấy cảm hứng từ kênh Beernary nhưng phải có điểm riêng. Định hướng: `02-dong-xe-dien-vs-xe-xang.md`.
- Ghi nhận khi xem đối thủ Beernary (28 nghìn người theo dõi, 190 reel, ~4,3 triệu lượt xem, trung vị ~7 nghìn/video): video dựng bằng đồ họa lập trình, không dùng AI video → phong cách này **không cần Higgsfield**, chỉ cần ElevenLabs Starter.

### Cập nhật 2026-11-25
- ✅ **Tên kênh: Hóa Ra Là Vậy.**
- ✅ **Mở rộng phạm vi:** không chỉ ô tô mà cả công nghệ thông tin, xây dựng và các kiến thức đời sống ít được để ý. Mỗi lĩnh vực là một loạt riêng.

> Nhánh phụ: thử nội dung ngắn trên Facebook Reels, tách riêng khỏi kế hoạch YouTube. Xem `01-nhanh-facebook-khao-sat-doi-thu.md`.

## 7. Checklist Tuần 1

- [x] Trả lời 4 câu hỏi ở mục 6
- [x] Khởi tạo repo git và cấu trúc thư mục (`CLAUDE.md`, `projects/`, `brand/`, `pipeline/`)
- [x] Viết skill/agent: researcher, scriptwriter, fact-checker, storyboarder (`.claude/skills/`)
- [x] Kiểm tra số dư Higgsfield (0 credits, gói free)
- [ ] Đăng ký Higgsfield Starter và ElevenLabs Starter
- [ ] Đặt tên kênh (đã chốt), slogan, giọng đọc (đã chốt), phong cách hình ảnh (`brand/README.md`)
- [ ] Dựng design system và template thumbnail trong Figma
- [ ] Chạy thử skill researcher → scriptwriter → fact-checker với chủ đề hộp số tự động (chưa render video)
- [ ] Thử nghiệm nhỏ: 1 ảnh Higgsfield + 1 đoạn giọng ElevenLabs tiếng Việt để chọn phong cách/giọng
- [ ] Prototype animation bánh răng hành tinh bằng Remotion (kiểm tra tỉ số truyền)
