---
name: storyboarder
description: Chuyển kịch bản đã duyệt thành storyboard theo cảnh, quyết định cảnh nào dùng animation lập trình, ảnh AI hay video AI, ghi cue âm thanh và ước tính credits Higgsfield. Dùng sau Cổng duyệt #1.
---

# Storyboarder

Đầu vào: kịch bản đã qua Cổng duyệt #1. Đầu ra: `assets/storyboard.md` (+ `storyboard.json`).

## Quy tắc chọn loại hình
- **ANIMATION-CODE** (Remotion/Three.js): mọi thứ giải thích cơ chế (chuyển động bánh răng, dòng dầu, luồng dữ liệu, lực trong kết cấu), sơ đồ — phải chính xác. Ưu tiên tuyệt đối cho phần cơ chế.
- **AI-IMAGE** (Higgsfield `generate_image`): bối cảnh lịch sử, chân dung thời đại, minh họa tĩnh có chuyển động nhẹ (Ken Burns). Rẻ nhất → dùng nhiều nhất.
- **AI-VIDEO** (Higgsfield `generate_video`): chỉ cho vài khoảnh khắc điện ảnh (hook, cảnh đời thực chuyển động, kết). Clip 3–5 giây. Giới hạn số lượng vì gói Starter.
- **ĐỒ HỌA**: tiêu đề chương, số liệu, timeline.

## Mỗi cảnh ghi
`cảnh | thời lượng | loại hình | prompt/mô tả chi tiết | tham chiếu phong cách (brand/style.md) | credits ước tính`

## Nhịp
Theo `brand/nhip-doc.md` mục 3: nghỉ giữa cảnh 0,3 s (0,4 s trước chỗ chuyển ý lớn), phụ đề ≤ 7 chữ mỗi cụm. Thời lượng trong storyboard là ước tính; mốc thật lấy từ alignment của `assets/audio/giong/cat/`. Mỗi shot ghi `cue_phrase` là cụm lời đọc làm shot bắt đầu.

## Cue âm thanh
Đọc mục "Thiết kế âm thanh cho animation" trong `CLAUDE.md` trước. Sau bảng cảnh, `storyboard.md` có mục **Âm thanh** gồm bảng cue và danh sách asset còn thiếu.

Chỉ lập cue cho cảnh/chuyển động đáng nghe: tiếng giúp cảm nhận hành động hoặc hiểu cơ chế. Cảnh không cần tiếng thì không thêm dòng. Tránh `whoosh` ở mọi lần cắt shot; tránh nhiều hiệu ứng chồng nhau hoặc rơi đúng vào chữ quan trọng của lời đọc.

| Cột | Ghi gì |
|---|---|
| ID | `A01`, `A02`… |
| Shot | mã shot trong bảng cảnh |
| Lớp | `chuyển động` / `môi trường` / `nhạc` |
| Âm thanh | mô tả đủ để tìm hoặc tạo (chất liệu, độ trầm bổng, nhịp) |
| Cue hình | sự kiện nhìn thấy trên màn hình làm tiếng bắt đầu (và kết thúc, nếu kéo dài) |
| Thời điểm | dự kiến, tính từ đầu shot hoặc theo cụm lời đọc (`2.1 +0,4 s`) |
| Thời lượng | giây; tiếng kéo dài ghi cả fade vào/ra |
| Mức | `nền` / `nhẹ` / `vừa`, so với giọng đọc |
| File | đường dẫn trong `assets/audio/…` đã có trong `NGUON-AM-THANH.md`, hoặc `CẦN TÌM` / `CẦN TẠO` |

Mức khởi đầu để thử (đỉnh âm thấp hơn đỉnh giọng đọc), rồi chỉnh khi nghe thật: `vừa` ≈ −10 dB, `nhẹ` ≈ −16 dB, `nền` ≈ −24 dB. Không có mức nào to ngang giọng.

Tiếng minh họa cơ chế phải khớp nhịp và chiều của chuyển động (ví dụ phun theo xung thì tiếng theo xung); tiếng không được gợi ý một nguyên lý mà kịch bản và nguồn không nói.

Trong `storyboard.json`, thêm mảng `sfx` cạnh `shots`, mỗi phần tử:

```json
{ "id": "A01", "shot": "2.1", "layer": "chuyen-dong", "sound": "…", "trigger": "…",
  "offset_s": 0.4, "dur_s": 0.15, "level": "nhe", "file": null }
```

`file: null` = chưa có asset. `offset_s` là ước tính; khi dựng, frame lấy từ mốc của animation.

Không tải, mua hay sinh file âm thanh ở bước storyboard; chỉ ghi nhu cầu.

## Ràng buộc ngân sách (Starter)
- Đặt trần credits cho video; cảnh vượt trần → đổi sang AI-IMAGE hoặc ANIMATION-CODE.
- Liệt kê "thử trước": sinh 1 ảnh/clip thử cho mỗi phong cách trước khi sinh hàng loạt.
- Không mô tả chi tiết kỹ thuật trong prompt AI-VIDEO (AI vẽ sai bánh răng, trục, kết cấu, sơ đồ).
