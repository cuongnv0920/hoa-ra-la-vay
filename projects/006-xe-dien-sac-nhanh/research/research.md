# Nghiên cứu: công suất sạc nhanh của xe điện

- Ngày tra cứu: 2026-11-26. Trạng thái: **nghiên cứu, chủ đề chưa chốt, chưa fact-check, chưa viết kịch bản.**
- Các trang được đọc qua công cụ lấy trang (bản trích và tóm lược). Cổng fact-check nên mở lại bài gốc cho mọi con số được dùng.

## 1. Kết luận khả thi

**Câu hỏi dự kiến ("vì sao chiếc xe không đạt công suất tối đa trong lần thử"): chưa nên làm.**

- Có số đo (S1), nhưng **không có nguyên nhân nào được đo cho một chiếc xe cụ thể**. Mọi giải thích trong S1 là phỏng đoán từ hình dạng đường cong, nhiều câu có chữ "likely", "suspects".
- S1 không nêu phiên bản xe, nên không kiểm được con số công bố có đúng cho chiếc được thử. Không nêu nhiệt độ pin, không nêu cách ghi công suất và số lần chạy.
- Tên giám đốc kỹ thuật (Pete Bishop) xuất hiện ở phần mở đầu, nhưng bài **không gán rõ câu giải thích nào là của người này**.
- Xe không được làm nóng pin trước. S1 cho biết Tesla và vài hãng nói đó là lý do hụt công suất; bài bác lại vì mọi xe thử như nhau.
- S1 tự mâu thuẫn về thời gian giữ đỉnh ở vài xe (Capri, EV3, bZ4X, ID.7).

**Hướng rộng hơn làm được:** "công suất đỉnh chỉ có trong một đoạn, càng gần đầy sạc càng chậm". Nhiều xe, nhiều đơn vị đo cùng cho thấy (S1, S2, S3). Còn **một lỗ hổng phải lấp trước khi viết kịch bản**: chưa đọc được nguồn học thuật giải thích *vì sao* pin gần đầy phải giảm dòng (xem mục 5).

## 2. Bảng nguồn

| ID | Tài liệu, tác giả, ngày | Loại | Hỗ trợ điều gì | Giới hạn |
|---|---|---|---|---|
| S1 | [Electric car charging mega test](https://www.autoexpress.co.uk/features/367479/electric-car-charging-mega-test-do-evs-really-charge-quickly-they-say), Auto Express, Chris Rosamond và Tom Jervis, 05/08/2025 | Thử nghiệm của báo, cùng Gridserve | Số đo 10 xe tại một trạm | Như mục 1 |
| S2 | [30 xe điện trên đường dài](https://www.adac.de/rund-ums-fahrzeug/elektromobilitaet/laden/schnellladen-langstrecke-ladekurven-2026/), ADAC, Wolfgang Rudschies, 12/11/2026 | Thử nghiệm của hiệp hội ô tô Đức | Đỉnh thường chỉ ở đầu; mức trung bình 10–80% là chỉ số tốt hơn; ví dụ VW ID.3 | Bài chữ không có đỉnh/trung bình từng xe; trang đường cong từng mẫu chưa mở |
| S3 | [Bài về P3 Charging Index 2024](https://www.electrive.com/2024/12/20/p3-charging-index-2024-porsche-taycan-is-the-long-distance-champion/), electrive, Sebastian Schaal, 20/12/2024 | Báo chuyên ngành thuật lại đo của P3 | Đỉnh khác trung bình 10–80% | Nguồn thứ cấp; chưa đọc được tài liệu phương pháp của P3 |
| S4 | [Mẹo sạc nhanh](https://www.adac.de/rund-ums-fahrzeug/elektromobilitaet/laden/elektroauto-tipps-zum-schnellladen/), ADAC, 07/08/2025 | Hướng dẫn kỹ thuật | Nhiệt độ pin, mức pin, giới hạn của xe, trụ chia công suất | Giải thích chung, không đo từng xe |
| S5 | [Charging speed too slow?](https://support.ionity.eu/faqs/charging-speed-too-slow), IONITY, không ghi ngày | Nhà vận hành trạm | Xe quyết định phần lớn tốc độ; nhiệt độ; mức pin | Không có số đo |
| S6 | [Charging speed: tips and myths](https://support.fastnedcharging.com/kb/guide/en-GB/everything-about-your-charging-speed-hINR9JWXDH/Steps/4458462), Fastned, không ghi ngày | Nhà vận hành trạm | Mức tối đa quảng cáo thường chỉ đạt khi pin rất thấp và trời ấm | Không có số đo |
| S7 | [Vì sao xe không sạc đúng công suất mong muốn](https://ask.porsche.com/us/en-US/charging-performance/), Porsche, không ghi ngày | Tài liệu hãng | Pin quá lạnh/nóng; chế độ giữ gìn pin làm sạc lâu hơn | Chỉ cho xe Porsche |
| S8 | [Fast charging of lithium-ion batteries at all temperatures](https://pmc.ncbi.nlm.nih.gov/articles/PMC6048525/), Yang, Zhang, Ge, Wang, PNAS 2018 | Nghiên cứu bình duyệt | Pin lạnh sạc dòng lớn dễ bị mạ lithium, mất dung lượng, rủi ro an toàn | Thí nghiệm trên cell; chỉ đọc khoảng 58% đầu; không bàn mức pin cao |
| S9 | [Preconditioned vs cold battery](https://insideevs.com/news/699912/supercharging-tesla-winter-preconditioned-vs-cold-battery-test/), InsideEVs, Dan Mihalascu, 08/12/2023 | Báo thuật video của một chủ xe | So sánh pin ấm và pin lạnh trên cùng xe | Một xe, một người; không rõ phiên bản, cách đo |
| S10 | [V-Green: sản phẩm dịch vụ](https://vgreen.net/vi/san-pham-dich-vu), không ghi ngày | Trang nhà vận hành tại Việt Nam | Trụ siêu nhanh từ 250 kW giới hạn sạc ở 80% | Không nêu lý do |
| S11 | [Chủ xe VF 9 trải nghiệm trạm siêu nhanh](https://tuoitre.vn/chu-xe-vinfast-vf-9-trai-nghiem-tram-sac-sieu-nhanh-lon-nhat-ha-noi-sac-9-phut-di-duoc-50km-20250628222612403.htm), Tuổi Trẻ, 29/06/2025 | Phỏng vấn chủ xe | Màn hình xe báo khoảng 39 kW khi qua 80% | Một lần, không có mức đầu, nhiệt độ, công suất trụ |
| S12 | [Charging VF8 during hot summer](https://community.vinfastauto.us/forums/discussion/charging-vf8-during-hot-summer/), diễn đàn VinFast (Mỹ), 2023–2024 | Lời kể chủ xe | Sạc chậm khi trời/pin rất nóng | Chủ yếu sạc AC tại nhà; một bình luận về DC: 22 kW khi pin 112°F |
| S13 | [Bài của Hyundai Motor Group](https://www.hyundaimotorgroup.com/amp/CONT0000000000047551), 05/08/2022 | Bài phổ biến của hãng | Trụ siêu nhanh tự dừng hoặc giảm tốc quanh 80% để bảo vệ pin | Tính chất quảng bá, giải thích sơ sài |
| S14 | [Lithium-ion battery fast charging: a review](https://spiral.imperial.ac.uk/handle/10044/1/72827), Tomaszewska và cộng sự, eTransportation 2019 | Tổng quan bình duyệt | **Chỉ đọc tóm tắt** | Không dùng làm căn cứ cơ chế cho tới khi đọc toàn văn |

## 3. Bằng chứng thực tế

### 3.1. Số đo

**S1, điều kiện chung:** trạm Gridserve Braintree (Anh), mỗi xe một trụ tới 350 kW, khoảng 13–14°C, không làm nóng pin trước, xe tự chọn công suất.

| Xe (không rõ phiên bản) | Công bố / đạt đỉnh (kW) | Giữ đỉnh (phút) | Pin đầu | TB tới 80% (kW) | Thêm 60% (phút) | 80→100% (phút) |
|---|---|---|---|---|---|---|
| BYD Seal | 150 / 123 | 5 | 15% | 104 | 32 | 56 (dừng 99%) |
| Citroën ë-C3 | 100 / 69 | 3 | 15% | 57 | 34 | 47 |
| Ford Capri | 187 / 187 | 2 (*) | 9% | 154 | 20 | 15 |
| Kia EV3 | 135 / 128 | 2 (*) | 16% | 117 | 27 | 28 |
| Peugeot E-3008 | 130 / 123 | 3 | 16% | 86 | 38 | 74 |
| Porsche Taycan | 320 / 282 | 3 | 14% | 243 | 15 | dừng 93% do lỗi cách điện |
| Renault 5 | 100 / 87 | 2 | 11% | 65 | 26 | 34 |
| Tesla Model Y | 250 / 145 | 1 | 14% | 103 | 30 | 63 (dừng 99%) |
| Toyota bZ4X | 150 / 147 | 1 (*) | 14% | 96 | 26 | 29 |
| VW ID.7 Tourer | 200 / 200 | 3 (*) | 12% | 156 | 21 | 16 |

(*) phần chữ trong bài nêu thời lượng khác.

- Trả lời câu "không đạt hay chỉ đạt ngắn": **cả hai**. 2/10 xe chạm đúng mức công bố, vài xe sát mức đó, vài xe hụt xa; đỉnh được ghi giữ 1–5 phút.
- Tự tính từ bảng: ở 7/9 xe có số liệu, đoạn 80→100% (hoặc 99%) lâu hơn đoạn thêm 60% đầu. Ngoại lệ: Capri, ID.7.

**S2 (ADAC):** để xe qua đêm ở 20°C, trụ Alpitronic 300 kW, bật làm nóng pin qua dẫn đường nếu có, đo 10–80%. VW ID.3: tại 50% giữa phiên 10–80% sạc 100 kW; nếu cắm khi pin đã 50% thì khởi đầu khoảng 60 kW. Ở −7°C khởi đầu dưới 50 kW, so với 125 kW ở 23°C.

**S3 (P3, qua electrive), đỉnh / trung bình 10–80%:** Tesla Model 3 Highland 255 / 135 kW; Opel Astra 100 / 83 kW; Xpeng G9 320 / 233 kW.

**S9:** Model Y tại Thụy Điển, cùng trụ V3, 10→80%. Pin được làm nóng, ngoài trời −1°C: đỉnh khoảng 238 kW, 33 phút. Pin lạnh, −6°C: đỉnh khoảng 135 kW, 42 phút.

### 3.2. Lời kể chủ xe

- S11: VF 9, Hà Nội, khoảng 39 kW khi qua 80%. Chủ xe cũng nói các trụ cân tải với nhau; **chưa được xác minh**.
- S12: VF 8 tại Mỹ, sạc chậm lại khi rất nóng.
- Chưa đủ để nói hiện tượng nào là phổ biến.

### 3.3. Việt Nam

- **Không tìm thấy** thử nghiệm độc lập có đo đường cong sạc tại Việt Nam.
- Chỉ có S10 (chính sách giới hạn 80% ở trụ từ 250 kW) và S11 (một lời kể).
- Một chủ đề trên diễn đàn VinFast Việt Nam về "trụ 150 kW chỉ vào 60 kW" chỉ thấy ở kết quả tìm kiếm; trang chặn truy cập (403) nên **không dùng làm bằng chứng**.
- Số đo ở Anh, Đức, Thụy Điển không áp thẳng cho Việt Nam: khác khí hậu, phiên bản xe, trụ.

## 4. Cơ chế đã có nguồn

1. Số kW trên trụ là mức trần. Xe quyết định phần lớn lượng nhận vào, và xe có mức tối đa riêng. (S4, S5, S6)
2. Bộ quản lý pin giảm dòng khi pin đầy dần; trên 80% dòng còn rất thấp. (S4; S5 và S6 nói tốc độ giảm theo mức pin)
3. Vì vậy đỉnh thường chỉ có ở đầu phiên, và trung bình 10–80% phản ánh đúng hơn. (S2, S3)
4. Pin quá lạnh hoặc quá nóng làm công suất giảm. (S4, S5, S7)
5. Riêng khi lạnh: sạc dòng lớn dễ làm lithium bám thành kim loại trên cực âm thay vì chui vào trong ("mạ lithium"), gây mất dung lượng và rủi ro an toàn. (S8)
6. Làm nóng pin trước khi tới trạm giúp sạc nhanh hơn khi lạnh. (S2, S4, S9)
7. Trụ có thể chia công suất khi hai xe cùng cắm, tùy loại trụ. (S4)

**Chưa có nguồn đạt chuẩn:** *vì sao* mức pin cao buộc phải giảm dòng (chạm giới hạn điện áp, kiểu sạc dòng không đổi rồi áp không đổi, nguy cơ mạ lithium khi gần đầy). S13 chỉ nói chung là "bảo vệ pin".

## 5. Điều chưa biết hoặc đang tranh cãi

- Nguyên nhân hụt công suất của từng xe trong S1.
- Hãng và báo bất đồng về vai trò của việc không làm nóng pin.
- Đường cong khác nhau giữa mẫu, phiên bản, loại pin; không suy từ một xe ra mọi xe điện.
- Giới hạn dòng/điện áp (xe 400 V và trụ 350 kW): chưa có nguồn đạt chuẩn trong đợt này.
- Ảnh hưởng của nóng đối với sạc DC ở khí hậu Việt Nam: chưa có số đo.
- Việc còn thiếu trước kịch bản: (a) toàn văn S14 hoặc nguồn tương đương cho mục "gần đầy"; (b) mở trang đường cong của ADAC cho ít nhất một mẫu; (c) nếu được, một lần ghi đường cong sạc tại Việt Nam có mức pin, trụ, nhiệt độ.

## 6. Đề xuất chủ đề

**Câu hỏi chính: "Vì sao càng gần đầy, xe điện sạc càng chậm?"**
Bằng chứng: S1 (7/9 xe), S2 (VW ID.3), S10 và S11 (Việt Nam). Điều kiện: lấp lỗ hổng (a).

**Dự phòng 1: "Trụ ghi 150 kW, vì sao xe không nhận đủ?"**
Bằng chứng: S1, S3; cơ chế S4, S5. Dễ thành danh sách nhiều nguyên nhân, không có một cơ chế trung tâm.

**Dự phòng 2: "Vì sao pin lạnh sạc chậm, và làm nóng pin giúp gì?"**
Bằng chứng: S2, S9; cơ chế S8 (vững nhất về học thuật). Ít gần gũi với phần lớn khán giả Việt Nam.

## 7. Phác nhịp video (câu hỏi chính)

1. **Hook** (mẫu): "Sạc thêm hai mươi phần trăm cuối, có xe mất lâu hơn cả sáu mươi phần trăm trước đó. Vì sao?"
2. **Bằng chứng:** một xe trong S1, nói rõ nơi và điều kiện thử; cho thấy nhiều xe cùng xu hướng, có ngoại lệ.
3. **Cơ chế** (animation): ion lithium đi vào cực âm → chỗ trống ít dần → bộ quản lý pin hạ dòng. Hai bước giữa **chờ nguồn (a)**.
4. **Kết** (mẫu): "Con số lớn trên quảng cáo là đỉnh, không phải tốc độ suốt buổi sạc. Mỗi mẫu xe có một đường cong riêng."

## 8. Khác với reel Beernary

Tin nhắn giao việc nhắc tới một link nhưng **link không có trong nội dung nhận được**, và reel chưa được xem. So sánh dưới đây chỉ dựa trên mô tả của người dùng; cần người đã xem đối chiếu.

| | Reel (theo mô tả) | Đề xuất |
|---|---|---|
| Chủ đề | Pin cao áp còn khoảng 80% mà xe không khởi động | Tốc độ nạp pin cao áp khi cắm trụ |
| Cơ chế | Ắc quy 12 V | Đường cong sạc và bộ quản lý pin; không đụng tới 12 V |
| Trải nghiệm người xem | Một sự cố | Đọc được đường cong, hiểu thời gian chờ ở trạm |
| Cấu trúc | Kể một tình huống (chi tiết chưa rõ) | Số đo nhiều xe → cơ chế → giới hạn kết luận |
