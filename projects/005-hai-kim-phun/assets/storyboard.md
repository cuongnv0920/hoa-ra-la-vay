# Storyboard — Video #005 Vì sao có động cơ lắp tới hai kim phun cho mỗi xi-lanh?

> **Bản 1, người dùng duyệt ngày 2026-11-26 (nhắn "Duyệt storyboard").** Đây không phải Cổng duyệt #2. Giọng Tung Dang đã tạo 2026-11-26 (`eleven_v4`, speed 0.90), người dùng nghe và nhắn "Giọng ổn" cùng ngày; mốc thật ở `audio/eleven_v4/shot-timings.json` (tổng 02:40,3), thay cho mốc ước tính trong bảng. Khung mẫu shot 2.3 (`mau/khung-mau-2.3.png`) được người dùng duyệt cùng ngày ("Duyệt khung mẫu"). Đủ 37 shot đã dựng thành composition `Video005` (`pipeline/remotion/src/v005/`), mới soát bằng ảnh tĩnh, chờ người dùng xem. Người dùng nhắn "Hình ổn, làm âm thanh" cùng ngày. Hiệu ứng đã tạo và gắn; người dùng nhắn "Tiếng ổn" cùng ngày. Bản xem thử đã render 2026-11-26 ra `demo/video-005-xem-thu.mp4`, chờ QA và Cổng duyệt #2.
> Đầu vào: `script/script-v1.4.md` (bản 1.3 đã qua Cổng duyệt #1 ngày 2026-11-26, cộng một câu đổi ở Cảnh 6 theo yêu cầu người duyệt).
> **Khung 9:16, 1080×1920, 30 fps.** 37 shot, khoảng **02:28.9**, trung bình 4,0 s/shot (ngắn nhất 1,7 s, dài nhất 6,0 s).
> Mốc thời gian là ước tính ở 210 từ/phút, chưa tính khoảng nghỉ. Mỗi shot **neo vào cụm "Cue"** trong lời đọc để khớp lại theo giọng thật.

## Tóm tắt loại hình
| Loại | Số shot | Thời lượng ước tính |
|---|---|---|
| ANIMATION-CODE | 27 | 112 s (75%) |
| ĐỒ HỌA | 10 | 37 s (25%) |
| AI-IMAGE / AI-VIDEO | 0 | 0 |

**Credits Higgsfield: 0.** Giọng đọc: khoảng 2335 ký tự ElevenLabs cho một lượt tạo.

## Bố cục và phong cách
- Theo `pipeline/remotion/src/vertical/layout.js`: header, tiêu đề lớn (y 380–560), hình (560–1320), phụ đề tô từng chữ (1340–1500), chú thích (1510–1570); chừa vùng nút Reels/Shorts.
- Không dùng đồng hồ tiền (thành phần của loạt chi phí). Vùng 140–360 để trống cho tới khi chốt tên loạt.
- Nền và chữ theo `theme.js` như video 003 (chưa có `brand/style.md`).
- **Màu cố định:** phun gián tiếp = xanh `#19B5FF`; phun trực tiếp = hổ phách `#FFB000`; cháy/nóng = đỏ cam; muội và cặn = xám.
- Một mặt cắt xi-lanh dùng xuyên suốt, chỉ phóng to/thu nhỏ, để người xem không lạc.

## Thành phần Remotion
- **Tái dùng:** Background, Header, Headline, KaraokeSubtitle, Footnote, EngineBlock, Chip, Stamp, Gauge; động học tay quay–con trượt của `Cylinder` trong `v003/scenes2.jsx`.
- **Mới:** EngineSection (mặt cắt có hai xu-páp, bugi, hai kim), IntakePort, Valve, Injector, Spray, Mixing, KnockDemo, Droplet, Soot, Deposit, HPPump, InjectorTip.

## Bảng shot
Phong cách tham chiếu: như mục trên. Credits mọi shot: 0.

| Cảnh | Shot | Bắt đầu | Thời lượng | Loại | Cue (lời đọc) | Tiêu đề lớn | Hình | Thành phần |
|---|---|---|---|---|---|---|---|---|
| 1 | 1.1 | 00:00.0 | 4,6s | ANIMATION-CODE | «Trong động cơ…» | **Bên trong xi-lanh** | Khối động cơ nét vẽ, phóng vào một xi-lanh; mặt cắt: pít-tông chạy, một đốm cháy đẩy pít-tông xuống. | EngineSection (mới) |
| 1 | 1.2 | 00:04.6 | 4,3s | ANIMATION-CODE | «Thường mỗi…» | **Thường: 1 kim** | Một kim phun bật vào vị trí trên mặt cắt, nhãn "kim phun". | EngineSection, Injector, Chip |
| 1 | 1.3 | 00:08.9 | 4,0s | ANIMATION-CODE | «Một kim phun xăng…» | **Có máy dùng 2 kim** | Kim thứ nhất (xanh) gắn trên đường dẫn khí, rồi kim thứ hai (hổ phách) chĩa thẳng vào xi-lanh; hai đường đi lần lượt sáng. | EngineSection, Injector |
| 1 | 1.4 | 00:12.9 | 1,7s | ĐỒ HỌA | «Vì sao…» | **Sao lại cần cả hai?** | Hai kim sáng cùng lúc, dấu hỏi lớn giữa chúng. | Headline |
| 2 | 2.1 | 00:14.6 | 6,0s | ANIMATION-CODE | «Kim thứ nhất…» | **Phun gián tiếp** | Phóng vào đường nạp; nhãn "phun gián tiếp", "đường nạp"; luồng khí chạy về phía xi-lanh, kim xanh phun một xung vào luồng khí. | IntakePort (mới), Spray, Chip |
| 2 | 2.2 | 00:20.6 | 4,9s | ANIMATION-CODE | «Chỗ phun…» | **Trước xu-páp nạp** | Xu-páp nạp sáng viền, nhãn "xu-páp nạp"; tia xăng nhắm vào lưng xu-páp đang đóng. | IntakePort, Valve |
| 2 | 2.3 | 00:25.4 | 2,6s | ANIMATION-CODE | «Van mở…» | **Van mở, cùng vào** | Kỳ nạp: xu-páp mở, pít-tông đi xuống, chấm xăng và đường khí cùng chui vào xi-lanh. | EngineSection, Valve, Spray |
| 2 | 2.4 | 00:28.0 | 3,4s | ANIMATION-CODE | «Xăng có thêm…» | **Thêm thời gian hòa trộn** | Chấm xăng tản đều trong khí; đồng hồ cát nhỏ cạnh đường đi. | EngineSection, Mixing |
| 3 | 3.1 | 00:31.4 | 5,4s | ANIMATION-CODE | «Kim thứ hai…» | **Phun trực tiếp** | Kim hổ phách phun mạnh thẳng vào xi-lanh ở kỳ nạp; nhãn "phun trực tiếp", "áp suất rất cao". | EngineSection, Spray, Chip |
| 3 | 3.2 | 00:36.9 | 6,0s | ANIMATION-CODE | «Xăng bay hơi…» | **Bay hơi, lấy bớt nhiệt** | Giọt xăng tan thành hơi; vùng khí chuyển từ cam sang xanh dịu. Biểu tượng giọt cồn trên mu bàn tay ở góc. | EngineSection, Mixing, Icon |
| 3 | 3.3 | 00:42.9 | 2,3s | ANIMATION-CODE | «Khí mát hơn…» | **Mát hơn, khó kích nổ** | Nhiệt kế nhỏ hạ xuống (không ghi số); nhãn "kích nổ" mờ đi. | EngineSection, Gauge |
| 3 | 3.4 | 00:45.1 | 4,0s | ANIMATION-CODE | «Kích nổ là…» | **Kích nổ là gì?** | Hai xu-páp đóng, pít-tông gần đỉnh. Bugi đánh lửa, màng lửa lan; phần khí xa bugi bỗng tự bùng. Không vẽ như bom nổ. Quay chậm. | KnockDemo (mới) |
| 3 | 3.5 | 00:49.1 | 4,3s | ANIMATION-CODE | «Nhờ vậy…» | **Nén mạnh hơn** | Pít-tông nén khí vào khoang nhỏ hơn một chút; mũi tên "hiệu quả" đi lên, không ghi số. | EngineSection |
| 4 | 4.1 | 00:53.4 | 5,1s | ANIMATION-CODE | «Nhưng phun…» | **Cái giá phải trả** | Trở lại kim hổ phách phun; đồng hồ cát chỉ còn ít cát ("ít thời gian hòa trộn"). | EngineSection, Spray |
| 4 | 4.2 | 00:58.6 | 5,7s | ANIMATION-CODE | «Trong xi-lanh có…» | **Pít-tông** | Pít-tông sáng viền, nhãn "pít-tông"; vài giọt chạm đỉnh pít-tông và thành xi-lanh. | EngineSection, Droplet |
| 4 | 4.3 | 01:04.3 | 3,1s | ANIMATION-CODE | «Chỗ đó…» | **Hạt muội nhỏ** | Chỗ bị ướt cháy dở, sinh chấm muội xám theo khí xả. | EngineSection, Soot |
| 4 | 4.4 | 01:07.4 | 4,3s | ANIMATION-CODE | «Còn một chuyện…» | **Xu-páp không được rửa** | Cận cảnh xu-páp nạp khi chỉ phun trực tiếp: chỉ có khí đi qua, không có xăng. | IntakePort, Valve |
| 4 | 4.5 | 01:11.7 | 4,0s | ANIMATION-CODE | «Cặn bẩn…» | **Cặn bám dần** | Hạt từ hơi dầu và khí thải hồi về bám dần lên lưng xu-páp (tua nhanh, có nhãn "theo thời gian"). | IntakePort, Deposit (mới) |
| 4 | 4.6 | 01:15.7 | 4,0s | ĐỒ HỌA | «Vậy có cách…» | **Lấy ưu điểm cả hai?** | Hai đường phun đặt cạnh nhau, kéo lại gần nhau. | Headline, Chip |
| 5 | 5.1 | 01:19.7 | 4,6s | ĐỒ HỌA | «Có. Hãy…» | **Ví dụ: Audi** | Thẻ "Audi EA888 thế hệ 3 — bản có phun kép" (chữ, không logo). Chú thích này giữ ở chân khung đến hết Cảnh 6. | Chip, Footnote |
| 5 | 5.2 | 01:24.3 | 4,6s | ANIMATION-CODE | «Máy đã ấm…» | **Máy ấm, ga nhẹ** | Đèn báo "máy ấm"; kim tải ở vùng nhẹ/vừa; kim xanh sáng và phun, kim hổ phách tắt. | EngineSection, Gauge |
| 5 | 5.3 | 01:28.9 | 2,6s | ANIMATION-CODE | «Xăng trộn đều…» | **Ít hạt muội hơn** | Hỗn hợp đều màu; số hạt muội ÍT đi (cỡ hạt giữ nguyên), vẫn còn vài hạt. | EngineSection, Mixing, Soot |
| 5 | 5.4 | 01:31.4 | 5,7s | ANIMATION-CODE | «Kim trực tiếp cần…» | **Bơm cao áp lấy sức máy** | Bơm cao áp được trục cam dẫn, đường ống tới kim hổ phách; mũi tên "sức máy" chảy vào bơm. | HPPump (mới) |
| 5 | 5.5 | 01:37.1 | 3,1s | ANIMATION-CODE | «Khi dùng kim…» | **Bơm đỡ tốn sức** | Mũi tên "sức máy" vào bơm thu nhỏ. Bơm vẫn quay theo trục, không vẽ bơm dừng. | HPPump |
| 5 | 5.6 | 01:40.3 | 2,6s | ANIMATION-CODE | «Xăng đi qua…» | **Rửa bớt cặn** | Tia kim xanh đi qua xu-páp, một phần cặn trôi đi, còn lại một ít. | IntakePort, Deposit |
| 5 | 5.7 | 01:42.9 | 3,7s | ĐỒ HỌA | «Audi cho biết…» | **Đỡ xăng, giảm muội** | Hai thẻ: "đỡ tốn xăng", "giảm hạt muội"; dòng nhỏ "theo Audi". Không ghi số. | Chip, Footnote |
| 5 | 5.8 | 01:46.6 | 4,9s | ĐỒ HỌA | «Nhất là…» | **Giới hạn số hạt** | Thẻ "châu Âu: giới hạn SỐ hạt (xe phun trực tiếp)". Không ghi con số. | Stamp |
| 6 | 6.1 | 01:51.4 | 1,7s | ĐỒ HỌA | «Còn kim…» | **Còn kim trực tiếp?** | Kim hổ phách phóng to, dấu hỏi. | Injector, Headline |
| 6 | 6.2 | 01:53.1 | 4,3s | ANIMATION-CODE | «Ở máy Audi…» | **Khởi động, máy lạnh** | Hai thẻ tình huống "khởi động", "máy lạnh" gắn vào vị trí; kim hổ phách sáng. | EngineSection, Chip |
| 6 | 6.3 | 01:57.4 | 3,4s | ANIMATION-CODE | «Khi bạn cần…» | **Cần nhiều sức** | Kim tải quét lên vùng cao; thẻ thứ ba "cần nhiều sức"; kim hổ phách sáng. | EngineSection, Gauge, Chip |
| 6 | 6.4 | 02:00.9 | 4,3s | ANIMATION-CODE | «Lúc đó…» | **Làm mát, đỡ kích nổ** | Hơi xăng làm vùng khí dịu màu như shot 3.2; nhãn "giảm nguy cơ kích nổ". | EngineSection, Mixing |
| 6 | 6.5 | 02:05.1 | 4,9s | ANIMATION-CODE | «Kim trực tiếp còn…» | **Nghỉ lâu: bám cặn** | Kim xanh làm việc, kim hổ phách nghỉ; cận đầu kim hổ phách, lớp cặn cứng dày lên (nhãn "theo thời gian"). | InjectorTip (mới) |
| 6 | 6.6 | 02:10.0 | 2,9s | ANIMATION-CODE | «Nên thỉnh…» | **Bật lại một chút** | Một xung phun ngắn từ kim hổ phách, cặn ở đầu kim thôi dày thêm. | InjectorTip, Spray |
| 7 | 7.1 | 02:12.9 | 5,1s | ĐỒ HỌA | «Một số động cơ…» | **Toyota: chia việc khác** | Sơ đồ riêng, nhãn "ví dụ Toyota 2GR-FSE, khởi động lạnh": cả hai kim cùng phun. | Chip, Spray |
| 7 | 7.2 | 02:18.0 | 2,9s | ĐỒ HỌA | «Và không phải…» | **Không phải máy nào cũng cần** | Một xi-lanh chỉ có một kim vẫn chạy, đặt cạnh xi-lanh hai kim. | EngineSection |
| 7 | 7.3 | 02:20.9 | 5,4s | ĐỒ HỌA | «Hóa ra là vậy…» | **Hóa ra là vậy** | Hai kim ghép lại; mỗi bên che chỗ yếu của bên kia (hai mảnh khớp nhau). | Injector, Stamp |
| 7 | 7.4 | 02:26.3 | 2,6s | ĐỒ HỌA | «Máy tính…» | **Đúng người, đúng lúc** | Hộp "máy tính" bật qua lại hai đường phun; kết bằng tên kênh. | Chip, Headline |

## Âm thanh
Theo mục "Thiết kế âm thanh cho animation" trong `CLAUDE.md`. Mức so với đỉnh giọng đọc, là điểm khởi đầu để thử: vừa ≈ −10 dB, nhẹ ≈ −16 dB, nền ≈ −24 dB. Thời điểm tính từ đầu shot, là ước tính; khi dựng lấy frame từ mốc animation.

| ID | Shot | Lớp | Âm thanh | Cue hình | Thời điểm | Thời lượng | Mức | File |
|---|---|---|---|---|---|---|---|---|
| A01 | 1.2 | chuyển động | "click" kim loại nhỏ, khô | kim phun bật vào vị trí | +0,4 s | 0,12 s | nhẹ | CẦN TẠO |
| A02 | 1.3 | chuyển động | hai "click" cùng họ với A01, tiếng sau cao hơn một chút | từng kim bật vào vị trí | +0,3 s | 0,9 s | nhẹ | CẦN TẠO |
| A03 | 2.1 | chuyển động | "xịt" mềm, ngắn, áp thấp | tia kim xanh bắt đầu phun | +0,8 s | 0,25 s | nhẹ | CẦN TẠO |
| A04 | 2.3 | chuyển động | "tộc" nhẹ rồi gió hút ngắn | xu-páp mở, khí đi vào | +0,2 s | 0,7 s | nhẹ | CẦN TẠO |
| A05 | 3.1 | chuyển động | "xịt" gắt hơn, cao và gọn hơn A03 | tia kim hổ phách phun vào xi-lanh | +0,5 s | 0,2 s | vừa | CẦN TẠO |
| A06 | 3.2 | chuyển động | hơi thoảng, tắt dần | giọt xăng tan, vùng khí đổi sang xanh | +0,3 s | 0,8 s | nền | CẦN TẠO |
| A07 | 3.4 | chuyển động | "keng keng" kim loại đục, hai nhịp, không phải tiếng nổ | phần khí xa bugi tự bùng | +1,6 s | 0,35 s | vừa | CẦN TẠO |
| A08 | 4.2 | chuyển động | "tách" ướt, hai lần rất nhỏ | giọt xăng chạm đỉnh pít-tông | +1,2 s | 0,3 s | nhẹ | CẦN TẠO |
| A09 | 5.1 | chuyển động | "whoosh" ngắn, êm | chuyển sang phần ví dụ Audi | +0 s | 0,4 s | nhẹ | CẦN TẠO |
| A10 | 5.2 | môi trường | tiếng máy nổ cầm chừng đều, rất nhỏ; fade vào/ra 0,3 s | máy ấm đang chạy; tắt khi hết shot 5.3 | +0 s | 6 s | nền | CẦN TÌM hoặc TẠO |
| A11 | 5.4 | chuyển động | "cạch" cơ khí trầm | bơm cao áp gắn vào trục dẫn | +0,3 s | 0,15 s | nhẹ | CẦN TẠO |
| A12 | 6.2 | chuyển động | "click" như A01 | thẻ tình huống gắn vào vị trí | +0,5 s | 0,12 s | nhẹ | dùng lại file của A01 |
| A13 | 6.6 | chuyển động | "xịt" như A05, một xung | kim trực tiếp được bật lại | +0,9 s | 0,2 s | nhẹ | dùng lại file của A05 |
| A14 | 7.1 | chuyển động | "whoosh" như A09 | chuyển sang sơ đồ Toyota | +0 s | 0,4 s | nhẹ | dùng lại file của A09 |
| A15 | 7.3 | chuyển động | "khớp" gọn, có chút ngân | hai mảnh khớp vào nhau | +0,6 s | 0,5 s | vừa | CẦN TẠO |

- **Nhạc nền:** chưa đặt cue. Đề xuất bản đầu không dùng nhạc.
- **Không có tiếng** ở các shot còn lại, kể cả khi cắt shot thông thường.
- Tiếng phun đi theo xung của hình: một xung một tiếng. A07 là tiếng minh họa, không phải bản ghi kích nổ thật.

### Âm thanh còn thiếu
**Đã tạo ngày 2026-11-26** bằng `pipeline/sfx-005.js` (tự tổng hợp), nguồn ghi ở `audio/NGUON-AM-THANH.md`; cột "File" ở bảng trên là trạng thái lúc lập storyboard, đường dẫn thật ở `storyboard.json`. Nhu cầu ban đầu — cần **tạo** (tự tổng hợp, ghi lệnh/công cụ vào `assets/audio/NGUON-AM-THANH.md`): click (A01, A02, A12), phun mềm (A03), xu-páp và gió hút (A04), phun gắt (A05, A13), hơi thoảng (A06), gõ kim loại (A07), giọt chạm (A08), whoosh (A09, A14), cạch cơ khí (A11), khớp mảnh (A15). **Tìm hoặc tạo:** máy nổ cầm chừng (A10); chỉ lấy file có giấy phép rõ.

## Quy tắc chính xác trên hình
- Kim gián tiếp nằm ở đường nạp, nhắm lưng xu-páp nạp; kim trực tiếp phun vào trong xi-lanh. **Vị trí kim và bugi phải đối chiếu hình mặt cắt trong tài liệu Audi (S1) trước khi vẽ.**
- Đúng thứ tự kỳ: xu-páp nạp mở khi pít-tông đi xuống ở kỳ nạp; khi nén, cháy và kích nổ hai xu-páp đều đóng.
- Kích nổ (3.4): phần khí **chưa** được màng lửa lan tới tự bùng.
- Cặn nằm ở lưng xu-páp nạp; nguồn cặn là hơi dầu và khí thải. Rửa **bớt**, không sạch hết.
- Hạt muội: giảm về **số lượng**, không vẽ nhỏ lại, không biến mất hết.
- Bơm cao áp (5.4–5.5): đỡ tốn sức máy; không vẽ bơm ngừng quay.
- Cảnh 5–6 giữ chú thích "Audi EA888 thế hệ 3 — bản có phun kép"; không gợi ý đây là máy đang bán hay quy luật chung.
- Đồng hồ tải và thẻ tình huống chỉ minh họa: không số, không vẽ ranh giới bản đồ phun tự nghĩ.
- Toyota (7.1): ghi rõ ví dụ và tình huống; không dùng lại quy luật của Audi.
- Không logo hãng.

## "Thử trước"
1. Một khung mẫu shot 2.3 (mặt cắt, hai kim, tiêu đề, phụ đề) để duyệt cách nhìn.
2. Kiểm vùng an toàn trên điện thoại.
3. Kiểm động học mặt cắt: pít-tông, xu-páp, thời điểm phun.
4. Tạo ba tiếng A01, A03, A05 và nghe cùng một đoạn giọng trước khi làm hết.
5. Tạo giọng Tung Dang đủ 7 cảnh, đo thời lượng thật, khớp lại cue.

## Việc cần bạn quyết
1. Tên loạt hiện ở header.
2. Có dùng nhạc nền không (đề xuất: chưa).

## Âm thanh bản 2 (2026-11-26)
Theo yêu cầu người dùng: "âm lượng hơi nhỏ, và ít", "âm lượng tăng nhưng đừng tăng quá nhiều", "số lần xuất hiện tăng thêm 1 chút". Chờ người dùng nghe.

- Mức so với đỉnh giọng: nền −21 dB, nhẹ −13 dB, vừa −8 dB (bản 1: −24 / −16 / −10).
- Tiếng ngắn: 15 → 28 lần phát. Tiếng kéo dài: chỉ còn A10 (máy cầm chừng). Hai tiếng dòng phun (C01, C02) đã **bỏ** theo người dùng: "kéo dài quá làm át tiếng giọng đọc".

| ID | Shot | File | Cue hình |
|---|---|---|---|
| B01 | 1.1 | whoosh | khối máy chuyển vào mặt cắt |
| B02 | 2.1 | whoosh | chuyển vào đường nạp |
| B03 | 3.3 | ha-nhiet | nhiệt kế hạ |
| B04 | 3.4 | tia-lua | bugi đánh lửa |
| B05 | 3.5 | nen-len | pít-tông nén |
| B06 | 4.3 | lua-lan | cháy không hết |
| B07 | 4.5 | tach-nho | cặn bám |
| B08 | 5.2 | phun-mem | kim gián tiếp phun |
| B09 | 5.7 | click | thẻ thứ nhất hiện |
| B10 | 5.7 | click-cao | thẻ thứ hai hiện |
| B11 | 5.8 | cach-co-khi | con dấu đóng xuống |
| B12 | 6.5 | tach-nho | cặn cứng ở đầu kim |
| B13 | 7.4 | chuong | chữ tên kênh hiện |

**2026-11-26:** người dùng nhắn "Ổn, render lại" cho tiếng bản 3 (bản 2 đã bỏ tiếng dòng phun kéo dài). Bản xem thử mới: `demo/video-005-xem-thu-v2.mp4`; bản `video-005-xem-thu.mp4` dùng tiếng bản 1. Chờ QA và Cổng duyệt #2.

**Cổng duyệt #2 (2026-11-26):** người dùng nhắn "Duyệt Cổng #2" cho `demo/video-005-xem-thu-v2.mp4`. Chưa render bản đăng (đổi nhãn góc phải), chưa đăng.

**Bản đăng (2026-11-26):** `final/video-005-v1.4-ban-dang.mp4` (composition `Video005Dang`), góc phải để trống theo người dùng ("Để trống"). Tiếng giống hệt bản đã duyệt; hình chỉ khác nhãn góc. Chưa đăng.
