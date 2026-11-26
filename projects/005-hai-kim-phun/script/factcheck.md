# Fact-check — video #005, kịch bản bản 1

> Ngày kiểm: 2026-11-25. Đối tượng: `script.md` (bản 1). Kịch bản **chưa bị sửa**.
> Người kiểm cũng là người đã viết research và kịch bản (cùng một phiên Claude), nên **không phải kiểm chứng độc lập về con người**. Đã tìm thêm nguồn ngoài research, nhưng người duyệt nên tự xem các mục ⚠️ và ❓.

## Nguồn tìm thêm khi kiểm
| ID | Tài liệu | Mức đọc |
|---|---|---|
| F1 | Audi Technology Portal, mô tả máy 1.8 TFSI — https://www.audi-technology-portal.de/en/download?file=662 | Hãng, đọc văn bản |
| F2 | MIT, bài giảng 2.61 *SI Engine Combustion II* — https://web.mit.edu/2.61/www/Lecture%20notes/Lec.%2010%20SI%20engine%20combustion%20II.pdf | Giáo trình đại học, đọc văn bản |
| F3 | Sam Bell, "GDI: Gasoline Deposits Inside?", *Motor*, 12/2014 — https://www.motor.com/magazinepdfs/122014_7.pdf | Tạp chí nghề, đọc văn bản |
| F4 | Bằng sáng chế về điều khiển phun kép (làm mát đầu kim, thỉnh thoảng bật kim trực tiếp), ví dụ US 11454189 — https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/11454189 | Qua tìm kiếm |
| F5 | Audi MediaCenter, xử lý khí thải (lọc hạt cho máy xăng) — https://audi-mediacenter.com/en/press-releases/efficient-and-clean-exhaust-aftertreatment-for-gasoline-and-diesel-engines-13346 | Hãng, qua tìm kiếm |

Mã S… là nguồn trong `../research/research.md`. F1 và S1 đều của Audi nên **không độc lập với nhau**.

## Bảng kiểm
| # | Khẳng định | Cảnh | Trạng thái | Nguồn | Ghi chú / đề xuất sửa |
|---|---|---|---|---|---|
| 1 | Có động cơ lắp hai kim mỗi xi-lanh: một trực tiếp, một gián tiếp | 1 | ✅ | S1, S3, S26 | |
| 2 | Kim gián tiếp phun vào đường nạp, trước xu-páp nạp; xăng và gió cùng vào | 2 | ✅ | S1, S7, F3 | |
| 3 | Phun gián tiếp có thời gian trộn đều | 2 | ✅ | S1, S26 | |
| 4 | Phun trực tiếp dùng áp suất rất cao, phun vào xi-lanh | 3 | ✅ | S1, S3 | |
| 5 | Xăng bay hơi trong xi-lanh, hút nhiệt → khó kích nổ hơn | 3 | ✅ | S27, S26, S9 | Cơ chế đúng. Với xăng, mức lợi nhỏ hơn cồn (S14, yếu); lời đọc không nêu con số nên ổn |
| 6 | "Giống như cồn bay hơi làm bạn thấy mát tay" | 3 | ✅ | Hiện tượng phổ thông | Ví dụ so sánh, không cần nguồn riêng |
| 7 | "Kích nổ là khi hỗn hợp tự bốc cháy không đúng lúc" | 3 | ⚠️ | F2 | Quá rộng, dễ lẫn với cháy sớm. Kích nổ là phần hỗn hợp **chưa kịp cháy** ở phía trước màng lửa tự bốc cháy. **Sửa:** "Kích nổ là khi phần xăng gió chưa kịp cháy bỗng tự bùng lên." |
| 8 | Nhờ vậy có thể nén mạnh hơn, hiệu quả hơn | 3 | ✅ | S27, S9 | |
| 9 | Phun trực tiếp: ít thời gian bay hơi, xăng có thể đập vào pít-tông/thành, sinh hạt mịn | 4 | ✅ | S26 mục I.A, S27 | |
| 10 | Xăng không đi qua xu-páp nạp nên không rửa được | 4 | ✅ | S7, F3 | |
| 11 | Cặn từ hơi dầu và khí thải bám dần ở xu-páp | 4 | ✅ | F3, S7 | Còn có nguồn khác (mạt mòn, xăng chưa cháy); câu "có thể bám" đủ mềm |
| 12 | "Một máy hai lít của Audi, ở bản có hai kim" | 5 | ⚠️ | S1, F1, F5, S20 | Không sai (S1 gồm 1.8 và 2.0), nhưng F1 mô tả bản 1.8, và đây là **một đời máy cũ** (tài liệu 2013). Từ 2018 Audi gắn lọc hạt (F5), có nguồn nói một số bản sau bỏ kim gián tiếp (S20, yếu). Lời đọc đang nghe như máy hiện hành. **Sửa:** "Hãy xem một đời máy xăng tăng áp của Audi, ở bản có hai kim." |
| 13 | Máy ấm, ga nhẹ/vừa → kim gián tiếp | 5, 6 | ✅ | S1 tr. 60, F1 | |
| 14 | Khi đó xăng trộn đều hơn, ít hạt mịn hơn | 5 | ✅ | S1, F1, S6 | |
| 15 | Bơm cao áp đỡ tốn sức máy | 5 | ✅ | S1, S26 | |
| 16 | Xăng đi ngang xu-páp giúp rửa bớt cặn | 5 | ✅ | F3, S20, S7 | Lợi ích chung của phun gián tiếp; Audi không nêu. Chưa có số liệu mức giảm; giữ chữ "bớt" |
| 17 | "Audi cho biết hệ này được làm ra để giảm hạt mịn" | 5 | ⚠️ | S1 tr. 58, F1 | Đúng nhưng thiếu một nửa: cả hai tài liệu Audi nêu **giảm tiêu hao xăng** cùng với giảm hạt. **Sửa:** "Audi cho biết cách này vừa đỡ tốn xăng, vừa giảm hạt mịn." |
| 18 | "Bởi châu Âu giới hạn cả số hạt mà xe phun trực tiếp thải ra" | 5 | ✅ | F1, S16, S27 | Lo ngại ghi ở bản 1 đã được giải quyết: F1 nói rõ mức hạt đạt giới hạn Euro 6. Nếu sửa câu 17, nên nối: "Nhất là khi châu Âu giới hạn cả số hạt…". Văn bản EU gốc vẫn chưa đọc |
| 19 | Khi khởi động, Audi dùng kim trực tiếp | 6 | ✅ | S1, F1 | |
| 20 | Lúc máy còn lạnh cũng dùng kim trực tiếp | 6 | ✅ | S1 tr. 60 | Một nguồn gốc của hãng (dưới khoảng 45 °C); F1 chỉ nói lúc khởi động |
| 21 | Khi cần nhiều sức, chuyển sang kim trực tiếp | 6 | ✅ | S1, F1 | Đúng với Audi, không đúng cho mọi máy (S5). Câu đã gắn ngữ cảnh Audi |
| 22 | "Có thể phun hai lần: lúc hút khí và lúc nén" | 6 | ❓ | Chỉ S1 | Không thấy nguồn thứ hai. **Đề xuất bỏ**: không cần cho mạch chính |
| 23 | Kim trực tiếp nghỉ lâu dễ đóng cốc, nên thỉnh thoảng được bật | 6 | ✅ | S1, F4, S26 | F4 là bằng sáng chế, chỉ đọc qua tìm kiếm. "Đóng cốc" khó hiểu khi nghe; gợi ý "đóng cặn cứng ở đầu kim" |
| 24 | "Không chỉ xe Đức. Nhiều xe Toyota cũng dùng hai loại kim" | 7 | ✅ | S26, S2, S3 | |
| 25 | Toyota chia việc theo cách riêng | 7 | ✅ | S2, S3 so với S1 | |
| 26 | Không phải động cơ nào cũng cần | 7 | ✅ | S1 (bản Bắc Mỹ), F5 | |
| 27 | "Mỗi kim bù vào chỗ yếu của kim kia" | 7 | ✅ | S26 mục II.B.1.v, S2 | Câu tổng kết, hợp với các mục trên |

## Logic và cách người xem có thể hiểu
- **Cảnh 4 → Cảnh 6:** vừa nói phun trực tiếp dễ sinh hạt, sau đó Audi lại dùng nó lúc máy lạnh và khi cần nhiều sức. Không sai, nhưng người xem sẽ hỏi "sao vậy". Với tải cao có thể thêm một câu: "vì lúc này cần khả năng làm mát để chống kích nổ" (S26, S1 nêu kích nổ là một tiêu chí chọn kiểu phun). Với lúc máy lạnh: **không có nguồn giải thích**, đừng tự bịa lý do.
- **Thời lượng:** thời gian trong kịch bản tính theo nhịp 210 từ/phút, chưa đo bằng giọng thật.

## An toàn
Không có hướng dẫn tự sửa chữa, không lời khuyên cho chủ xe, không thao tác nguy hiểm. Không cần cảnh báo thêm.

## Kết luận
**Chưa sẵn sàng cho Cổng duyệt #1.** Không có ❌. Còn:
- ⚠️ #7 (định nghĩa kích nổ), #12 (máy Audi nghe như đời hiện hành), #17 (thiếu "đỡ tốn xăng").
- ❓ #22 (đề xuất bỏ).

Xử lý bốn mục này (bản 1.1, giữ nguyên bản 1), rồi mới đưa người duyệt xem ở Cổng #1.
