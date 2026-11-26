# Nghiên cứu: AWD đối xứng của Subaru hoạt động ra sao, và khác gì quattro của Audi?

- Ngày tra cứu: 2026-11-26. Trạng thái: **nghiên cứu, đã fact-check research ngày 2026-11-26 (`research/factcheck-research.md`) và đã sửa theo kết quả; chưa viết kịch bản.** Các mục đã sửa theo fact-check được ghi chú "(FC #n)". Câu hỏi trung tâm còn là nháp, người dùng chốt sau.
- Tập trước: `projects/007-subaru-may-boxer/` kết bằng câu dẫn "Còn hệ dẫn động bốn bánh ấy hoạt động ra sao, và khác gì quattro của Audi? Tập sau." Chất liệu nền ở mục 3.4 và 12 của research tập 007.
- Các trang được đọc qua công cụ lấy trang (bản trích, đôi khi tóm lược). Ba file PDF thông số của Subaru Mỹ được tách chữ tại máy bằng `pdftotext` và đọc đúng dòng. Nguồn ghi "chỉ thấy qua tìm kiếm" là chưa mở được; fact-checker phải mở bài gốc trước khi dùng.
- Ký hiệu: **[HÃNG]** = tài liệu nhà sản xuất (có tính quảng bá); **[ĐỘC LẬP]** = báo chí, bách khoa, tài liệu bên ngoài.

> **Quyết định của người dùng (2026-11-26), áp dụng khi viết kịch bản:**
> 1. **Hybrid S:HEV**: chưa phổ biến, ở Việt Nam mới ra mắt tháng 11/2026. Chuyện bản hybrid có lúc nhả ly hợp để chạy cầu trước chưa đủ tin cậy → **để ngoài kịch bản**, trừ khi fact-check tìm được nguồn hãng rõ ràng. Không dùng hybrid làm ví dụ.
> 2. **VTD**: **không** đưa vào kịch bản theo kiểu gắn với Levorg hay WRX. Phần VTD dưới đây chỉ giữ làm tư liệu.
> 3. **Câu hỏi người dùng cần trả lời**: AWD trên **STI** có khác AWD trên các xe Subaru phổ thông không? Xem **mục 3.4**.
> 4. **Phạm vi tập 008 (chốt sau fact-check):** so **Subaru phổ thông với quattro phổ thông**. Bản cao cấp (WRX STI với DCCD so với quattro vi sai trung tâm tự khóa trên S/RS) để dành cho một tập sau, nếu làm. Mục 3.4 giữ làm tư liệu cho tập đó.
> 5. **Đối chứng Audi (chốt 2026-11-26):** **quattro ultra máy dọc** (A5, A6, Q5). Subaru phổ thông = Active Torque Split trên xe CVT (Forester, Outback, Crosstrek). Quattro máy ngang (A3, Q3) chỉ nhắc tối đa một câu.

## 1. Tóm tắt 5 dòng

1. "Symmetrical AWD" của Subaru **không phải một cơ chế**, mà là tên chung cho một **bố cục**: máy boxer đặt dọc, hộp số ngay sau máy, trục các-đăng chạy thẳng ra cầu sau, hai bên trái–phải gần đối xứng. Bên trong bố cục ấy, Subaru dùng ít nhất ba kiểu bộ phận chia lực khác nhau tùy hộp số. (S1, S2, S3, S4)
2. Quattro của Audi cũng **không phải một cơ chế**: xe máy dọc dùng vi sai trung tâm tự khóa (bánh răng hành tinh, rồi vi sai vành răng từ 2010, cơ bản 40:60); xe máy dọc bản tiết kiệm dùng "quattro ultra" có thể **ngắt hẳn cầu sau**; xe máy ngang dùng ly hợp nhiều đĩa đặt trước cầu sau, bình thường kéo chủ yếu bằng cầu trước. (S12, S13, S14, S15, S16)
3. Điểm chung bất ngờ: cả hai hãng nổi tiếng về bốn bánh đều xây hệ "chuẩn" của mình quanh **máy đặt dọc**. Khác biệt thật nằm ở **bộ phận chia lực** và **triết lý**: Subaru giữ cầu sau luôn nối trên các xe xăng phổ thông; Audi ultra chấp nhận chạy cầu trước khi không cần, để đổi lấy hiệu suất. (S4, S15, S16)
3b. **STI khác hẳn xe phổ thông, dù cùng bố cục.** WRX STI dùng DCCD: có **vi sai trung tâm hành tinh thật**, thiên sau **41:59**, tài xế **tự chọn mức khóa vi sai giữa** (6 nấc, từ lỏng tới gần như nối cứng) hoặc để 3 chế độ tự động; thêm **vi sai chống trượt cầu trước (helical) và cầu sau (Torsen)**. Xe CVT phổ thông dùng ly hợp điện tử, không có vi sai trung tâm, Subaru từng công bố cơ bản **60:40 thiên trước**. WRX STI có DCCD dừng ở đời 2021; bản **WRX STI Sport# 2026 không có DCCD** → chữ "STI" không bảo đảm có DCCD. (S22, S23, S26, F1; mục 3.4)
4. So công bằng phải so cùng kiểu: WRX (vi sai hành tinh + ly hợp điện tử, VTD) với S5/RS (vi sai vành răng tự khóa); Outback/Forester (ly hợp điều khiển điện tử, Active Torque Split) với A6 allroad/Q5 (quattro ultra). Không có số đo độc lập cùng điều kiện để nói hệ nào "tốt hơn". (mục 4)
5. Ngộ nhận chính: "đối xứng" **không** có nghĩa chia đều 50:50. Chỉ bản số sàn (khớp nhớt) là 50:50 danh nghĩa; STI thiên sau 41:59; hệ phổ biến nhất trên xe CVT cơ bản thiên trước 60:40 (Subaru Nhật, dẫn qua Motor Fan, đời 2019). (S1, S2, S22, S26)

## 2. Nền tảng: bốn bánh cần gì?

Ý cần giải thích trước cho người xem (chất liệu giáo khoa, nên fact-checker đối chiếu một giáo trình truyền động trước khi dùng):
- Khi xe vào cua, bốn bánh đi bốn quãng đường khác nhau; **cầu trước và cầu sau cũng quay lệch tốc độ**. Nếu nối cứng hai cầu bằng một trục, lốp phải trượt để bù, xe bị "ghì" khi cua gắt trên đường khô. Đó là lý do xe bốn bánh toàn thời gian cần một bộ phận ở giữa cho phép hai cầu quay lệch nhau: **vi sai trung tâm** hoặc **ly hợp trung tâm**.
- Vi sai trung tâm mở có nhược điểm: lực đi về phía dễ quay nhất. Một cầu mất bám thì cầu kia cũng mất lực. Vì vậy mọi hệ thực tế đều thêm cách **hãm** vi sai: khớp nhớt, ly hợp nhiều đĩa, bánh răng tự khóa, hoặc phanh từng bánh bằng điện tử.
- Ly hợp nhiều đĩa thay vi sai: không có vi sai ở giữa; lực đến cầu thứ hai bằng mức ép của các đĩa ly hợp. Ép ít thì hai cầu trượt nhiều, ép mạnh thì gần như nối cứng.
- Ur-quattro 1980 minh họa gọn ý này: vi sai trung tâm côn chia 50:50, tài xế tự khóa vi sai giữa và vi sai sau bằng tay (cáp, từ 1981 bằng khí nén). (S11 [HÃNG])

Gợi ý hình: mô hình nhìn từ trên xuống, hai cầu quay lệch tốc độ khi vào cua; "ghì" khi nối cứng; rồi chèn bộ chia lực vào giữa.

## 3. Cơ chế vận hành

### 3.1. Subaru: bố cục chung

Theo Subaru (S1 [HÃNG], thông cáo Subaru Mỹ 23/02/2014; nhắc lại từ research 007):
1. Máy boxer **đặt dọc**, hộp số đặt **ngay sau máy**, cả cụm "đối xứng, đồng đều", cân bằng trái–phải tốt.
2. Lực đi gần như **thẳng một đường** từ hộp số ra cầu sau qua trục các-đăng.
3. Xe máy ngang muốn có AWD phải thêm bộ bánh răng chuyển hướng (bộ chia lực góc), "có thể gây thêm ma sát". Đây là **lời hãng**; chưa có số đo độc lập về mức ma sát này.
- Wikipedia (S8) ghi thêm "bán trục trái–phải dài bằng nhau", nhưng không có nguồn thứ hai và Subaru không nói. **Không đưa vào kịch bản.** (FC #4)
- Vế "máy ngang cần bộ chuyển hướng" đúng về cơ khí; vế "gây thêm ma sát" chỉ là lời Subaru → nói "Subaru cho rằng…" hoặc bỏ. (FC #3)
- Ngoại lệ đáng nói: **BRZ dẫn động cầu sau** (subaru.jp gọi là "FR ピュアスポーツ"). (S7 [HÃNG]) **Solterra/xe điện** của Subaru dùng hai mô-tơ, không có boxer, không thuộc bố cục này. (S10 [ĐỘC LẬP]; cần nguồn hãng nếu nhắc)

### 3.2. Subaru: các bộ chia lực hiện hành

| Hệ | Phần cứng (theo Subaru) | Chia lực cơ bản | Dùng ở đâu (đời hiện hành) | Nguồn |
|---|---|---|---|---|
| **Continuous AWD (khớp nhớt)** | Vi sai trung tâm bánh răng côn, khóa bằng **khớp nhớt** (viscous coupling), nằm trong vỏ hộp số | **50:50** danh nghĩa | WRX 2026 số sàn 6 cấp (còn bán). Năm 2014 có trên nhiều mẫu số sàn; hiện ít mẫu số sàn còn lại ở Mỹ ngoài WRX. | S1, S2 (WRX 2022 ghi "nominal 50:50"), S3 (WRX 2026, không ghi tỷ lệ) |
| **VTD (Variable Torque Distribution)** | **Vi sai trung tâm bánh răng hành tinh** + **ly hợp thủy lực điều khiển điện tử** | **45:55** (thiên sau) | WRX 2026 hộp số tự động (Subaru Performance Transmission, nền CVT). Năm 2014 có trên Legacy/Outback 6 xi-lanh và Tribeca. Nhật: WRX S4, Levorg 2.4 **[CẦN XÁC MINH]**, chưa mở được trang thông số Nhật. | S1, S2 (WRX 2022 ghi "45:55 nominal"), S3 |
| **Active Torque Split (ATS)** | **Không có vi sai trung tâm**; một **ly hợp truyền lực thủy lực điều khiển điện tử** quyết định bao nhiêu lực ra cầu sau, thay đổi liên tục theo gia tốc, góc lái, tốc độ quay thân xe (yaw), trượt bánh; "có thể chủ động" đẩy thêm lực ra sau | Hãng **không ghi** tỷ lệ trên tài liệu hiện hành. Wikipedia, Jalopnik, SlashGear ghi **60:40** (thiên trước), lên tới 50:50 | Hầu hết xe Subaru dùng CVT: Outback 2026 (S4 ghi đúng tên và phần cứng), Forester, Crosstrek, Impreza | S1 (2014, không ghi tỷ lệ), S4, S8, S9, S10 |
| **AWD trên hybrid S:HEV** | Máy boxer 2.5 + hai mô-tơ/máy phát gắn với hộp số CVT; Subaru nói AWD "nối cơ khí với bánh trước và bánh sau", tích hợp "không mất khả năng AWD" | Hãng không ghi | Forester Hybrid 2025, Crosstrek Hybrid 2026 | S5 [HÃNG] |
| **DCCD** (đã ngừng ở Mỹ) | Vi sai trung tâm hành tinh hạn chế trượt + khóa điện tử do tài xế chỉnh | 41:59 | WRX STI (đời cuối 2021 ở Mỹ) | S1, S22, S23; chi tiết ở **mục 3.4** |

> Theo quyết định của người dùng: dòng **VTD** và dòng **hybrid S:HEV** chỉ là tư liệu, không đưa vào kịch bản (VTD không gắn với Levorg/WRX; hybrid chưa đủ tin cậy về việc có ngắt cầu sau).

Ghi chú quan trọng:
- **Tài liệu 2026 bỏ con số.** Thông số WRX 2022 ghi "nominal 50:50" và "45:55 nominal"; thông số WRX 2026 giữ nguyên tên phần cứng nhưng **không còn ghi tỷ lệ** (S2 so với S3). Kịch bản nên nói "Subaru từng công bố…" hoặc dùng số 2022 kèm năm, không nói như số hiện hành chắc chắn.
- **60:40 của ATS**: Subaru Mỹ (2014, 2026) không ghi tỷ lệ. Motor Fan (S26) dẫn trang Subaru Nhật: ACT-4 "lấy phân bổ trước 60 : sau 40 làm cơ bản", và mức ban đầu thay đổi từ 100:0 tới nối thẳng 50:50; nội dung ứng với xe khoảng năm 2019. Cộng với Wikipedia, Jalopnik, SlashGear, con số này đủ dùng nếu ghi "Subaru Nhật công bố cơ bản 60:40". Fact-checker nên tìm trang Subaru Nhật gốc (hoặc bản lưu trữ).
- **Phanh từng bánh**: Subaru định nghĩa chính thức "Active Torque Vectoring" là VDC **phanh bánh trước phía trong cua** để xe vào cua sắc hơn (S22, bảng so sánh WRX 2021). VDC/kiểm soát lực kéo phanh bánh đang trượt và giảm mô-men máy (S22). Outback 2026 ghi X-MODE "dùng logic VDC nâng cao để giảm trượt từng bánh" (S4). Cách nói an toàn: "khi một bánh trượt, hệ thống cân bằng điện tử phanh bớt bánh đó".
- **Hybrid có thể ngắt cầu sau?** Trang Forester của Subaru Nhật (đọc qua tóm lược) được báo là có nhắc kiểu điều khiển "nhả ly hợp, chạy cầu trước" trong phần hybrid. (S6) Nếu đúng, điều này làm mờ khẳng định "Subaru luôn bốn bánh". **[CẦN XÁC MINH]**: mở lại trang gốc tiếng Nhật, đọc nguyên câu.
- Bài SAE 880699 (1988) mô tả hệ bốn bánh toàn thời gian dùng ly hợp nhiều đĩa điều khiển điện tử mà Fuji Heavy Industries đưa lên xe Subaru số tự động, đọc tốc độ bánh, độ mở bướm ga, cấp số. (S19, chỉ thấy tóm tắt) Đây là tổ tiên của ATS.

### 3.3. Audi quattro: một tên, nhiều cơ chế

**a) Máy dọc, quattro "cổ điển" (vi sai trung tâm tự khóa)**
- 1980: vi sai côn 50:50, khóa tay. (S11 [HÃNG])
- Cuối thập niên 1980: vi sai **Torsen** (cảm biến mô-men bằng bánh răng trục vít) thay khóa tay. Năm cụ thể chưa chốt: Wikipedia ghi "sau 1987" nhưng cũng ghi thế hệ B3 dùng Torsen từ 1986, nên kịch bản chỉ nói "cuối thập niên 1980" (FC #30). Wikipedia ghi chia 50:50 mặc định, tự dồn tối đa khoảng 75% về một cầu ở thế hệ IV. (S18 [ĐỘC LẬP])
- 2005 (RS 4 thế hệ 2): vi sai trung tâm tự khóa kiểu **bánh răng hành tinh**, bình thường **40:60**, đẩy tối đa 60% ra trước hoặc 80% ra sau. Audi gọi đây là "bước tiến đáng kể so với Torsen". (S12 [HÃNG], trang trạng thái 2011) Wikipedia gọi bộ này là Torsen Type C. Tên gọi không thống nhất; kịch bản nên nói "vi sai trung tâm tự khóa".
- 2010 (RS 5): **vi sai vành răng** (crown gear): hai bánh răng hình vương miện ăn khớp với bốn bánh răng nhỏ; bình thường **40:60**; tối đa **70% ra trước** hoặc **85% ra sau**; nặng **4,8 kg**, nhẹ hơn bộ trước khoảng 2 kg; kết hợp phần mềm phanh "torque vectoring" tác động riêng từng bánh. Dành cho "máy đặt dọc phía trước". (S13 [HÃNG])
- Tùy chọn **vi sai thể thao** cầu sau: hai ly hợp nhiều đĩa hai bên, đẩy lực sang bánh sau phía ngoài cua. (S18, tóm lược) S5 đời B10 có sẵn vi sai này; Audi nói với The Drive rằng S5 "không và không thể ngắt cầu sau". (S17)

**b) Máy dọc, quattro ultra (từ 2016)**
- Phần cứng: **ly hợp nhiều đĩa điều khiển điện tử ở đầu ra hộp số** + **ly hợp tách ở vi sai cầu sau**. Khi không cần, cả hai mở: trục các-đăng và phần cầu sau đứng yên, giảm ma sát. (S15, S16 [HÃNG])
- Khi tải nhẹ, không có nguy cơ trượt: chạy **cầu trước, 100% lực ở cầu trước**. Hệ tính trước nhu cầu khoảng **0,5 giây**; nối lại hoàn toàn mất khoảng **200 mili giây**. (S16 [HÃNG], thông cáo 10/02/2026) Cả hai con số **chỉ là lời Audi**; F3 (Jalopnik 2016) nhắc lại số 0,5 giây từ tài liệu Audi, còn số 200 mili giây chưa có nguồn thứ hai đã đọc. Kịch bản nói "theo Audi, khoảng 0,2 giây". (FC #34, #35) Hệ có hai tầng: dự đoán (dữ liệu từ các hệ khác) và phản ứng (khi đã trượt). (S15)
- Audi nói khi tăng tốc mạnh trên đường khô, "hơn 70%" mô-men có thể ra cầu sau (đo nội bộ của hãng). (S16)
- Dùng trên nhiều xe nền PPC: A5, A6, Q5 (và A6 allroad V6 TDI, e-hybrid). (S16) The Drive dẫn lời đại diện Audi: ultra chỉ có trên A5 B10, không có trên S5. (S17)

**c) Máy ngang (A3, TT, Q3…)**
- Từ 1998 (TT quattro, A3 quattro): **ly hợp nhiều đĩa thủy lực điều khiển điện tử**, đặt cuối trục các-đăng, trước vi sai cầu sau; bình thường đưa phần lớn lực ra **cầu trước**, có lúc tới 100% ra sau; áp suất trên 100 bar từ bơm điện; phân lại lực "trong vài phần nghìn giây". (S14 [HÃNG], trang trạng thái 2011) Đây là kiểu thường gọi là Haldex (S18).
- Máy ngang: Wikipedia về Haldex (F5) xác nhận thế hệ đầu năm 1998 trên Audi TT, S3, Golf; thế hệ II "thường đưa 95% lực ra bánh trước". (FC #38)
- Bản hiệu năng máy ngang đời mới (RS 3) được cho là dùng "torque splitter"; chỉ thấy tiêu đề thông cáo Audi. **Không đưa vào kịch bản.** (FC #39)
- Xe điện e-tron quattro dùng mô-tơ riêng cho từng cầu; ngoài phạm vi tập này.

**Sửa một nhầm lẫn hay gặp:** quattro ultra **không** phải hệ máy ngang. Ultra là hệ máy dọc; máy ngang dùng ly hợp ở cầu sau từ trước đó. (S15, S16, S14)

### 3.4. AWD trên STI có khác AWD trên xe phổ thông không?

**Trả lời ngắn: có, khác ở bộ chia lực và ở hai vi sai đầu cầu; giống ở bố cục.** Cả hai đều là boxer đặt dọc, hộp số sau máy, trục thẳng ra cầu sau (S1). Phần khác nằm ở "cái hộp giữa hai cầu" và hai vi sai ở hai đầu.

| | Xe CVT phổ thông (Forester, Outback, Crosstrek, Impreza…) | WRX số sàn (không STI) | **WRX STI (DCCD)** |
|---|---|---|---|
| Bộ phận ở giữa | **Không có vi sai trung tâm**; ly hợp nhiều đĩa thủy lực điều khiển điện tử (S1, S4) | Vi sai côn + **khớp nhớt** tự khóa (S1, S2, S3) | **Vi sai trung tâm bánh răng hành tinh** + bộ hạn chế trượt điều khiển điện tử (S22, S23) |
| Chia lực cơ bản | **60:40 thiên trước**, số Subaru từng công bố; tài liệu Mỹ đời 2026 không ghi (S26, S8, S9; FC #7) | **50:50** (S2; F1 cho đời hiện hành) | **41:59 thiên sau** (S1, S23, S24) |
| Ai quyết định | Máy tính, theo gia tốc, góc lái, yaw, trượt (S4) | Thuần cơ khí: khớp nhớt tự cứng lại khi hai cầu quay lệch (S1) | **Ba chế độ tự động** (Auto, Auto−, Auto+) **hoặc tài xế tự chọn** một trong **6 mức khóa vi sai giữa** (S23); bảng Subaru 2021: "chế độ tay và ba chế độ tự động" (S22). Đây là chỉnh **mức khóa**, không phải chỉnh tỷ lệ chia lực (F2; FC #16, #17) |
| Vi sai cầu trước / sau | Không thấy nguồn mô tả; tài liệu chỉ nói VDC phanh bánh trượt (S4, S22). **Không khẳng định** là vi sai mở (FC #11) | Không thấy ghi | **Chống trượt cả hai đầu**: helical cầu trước, **Torsen** cầu sau (S22, S23) |
| Hộp số | CVT | Số sàn 6 cấp | **Chỉ số sàn 6 cấp** (S22, S27) |
| Phanh hỗ trợ | VDC, X-MODE (S4) | VDC, Active Torque Vectoring | VDC nhiều chế độ + Active Torque Vectoring (phanh bánh trước phía trong) (S22) |

Chi tiết DCCD đáng kể:
- DCCD ra đời năm **1994** trên Impreza WRX STI Type RA; đời đầu chia 36:64, đời sau 41:59. Nút chỉnh lượng khóa vi sai giữa, thay cho khớp nhớt bằng bộ ly hợp điều khiển điện từ. (F2, The Autopian; S26; FC #13, #19)
- Subaru ghi chế độ tay "tối đa 50:50" (S23). Cách hiểu đúng: khóa chặt nhất thì hai cầu gần như quay cùng tốc độ; lúc đó mỗi cầu nhận bao nhiêu lực là tùy độ bám, không cố định 50:50. **Kịch bản nói "khóa chặt nhất thì hai cầu gần như nối cứng"**, không nói "chặt nhất là 50:50". (FC #16)
- Ở chế độ **Auto−** hệ nhả bớt khóa, dồn thêm ra sau, thiên về cảm giác lái; **Auto+** khóa chặt hơn cho đường trơn như sỏi, tuyết. (S23 [HÃNG], thông cáo 15/11/2017)
- Trước đời 2018, khóa vi sai giữa là **kết hợp cơ khí (bánh răng tự cảm nhận mô-men) và điện tử**; Subaru nói **từ đời 2018 chỉ còn điều khiển điện tử**. (S23 [HÃNG]) Motor Fan (S26) mô tả bản cơ khí + điện tử; đó là kiểu Nhật đời 2019, có thể khác bản Mỹ. Nguồn không thống nhất theo thị trường → **bỏ khỏi kịch bản**. (FC #18)
- Bestcar Web (S27, 2019) mô tả DCCD dùng cùng nền vi sai giữa với VTD, chỉ thiên sau hơn và cho tài xế điều khiển bộ hạn chế trượt. (Theo quyết định người dùng, không cần nhắc VTD trong kịch bản.)

Cách so dễ hiểu cho người xem:
- Xe phổ thông: **máy tính quyết định** đưa bao nhiêu lực ra sau, bình thường cầu trước gánh nhiều hơn. Mục tiêu: bám đường an toàn, êm.
- STI: **lực chia sẵn nghiêng ra sau** như xe đua, có vi sai thật để hai cầu quay lệch tự do khi vào cua, và **người lái được quyền chỉnh mức khóa** vi sai giữa chặt hơn hay lỏng hơn. Mục tiêu: hiệu năng, đường đua, rally.
- Một hình ảnh: xe phổ thông là "cửa van tự động mở dần"; STI là "ngã ba chia sẵn 41:59, có tay chỉnh độ khóa cho tài xế".

**Trạng thái STI (quan trọng để không nói sai):**
- Mỹ: bảng giá và bảng so sánh WRX STI đời 2021 vẫn có DCCD, chỉ số sàn 6 cấp (S22, S28). CarExpert viết WRX STI "ngừng năm 2021" (S25). Ngày 11/03/2022 Subaru tuyên bố sẽ **không làm WRX STI máy xăng thế hệ mới trên nền WRX mới** và đang tìm hướng, kể cả điện hóa (F4, Motor1 dẫn tuyên bố). Tuyên bố nói về thế hệ sau, không nói "2021 là đời cuối". **Câu dùng được:** "WRX STI có DCCD dừng ở đời 2021; năm 2022 Subaru nói sẽ không làm STI máy xăng trên WRX mới." (FC #21)
- Nhật: bản "EJ20 Final Edition" cuối 2019 đánh dấu dừng máy EJ20 (S29, Wikipedia qua tóm lược; tin oto.com.vn chỉ thấy qua tìm kiếm). **[CẦN XÁC MINH]**
- Việt Nam: WRX STI 2018 từng về Việt Nam (S30, Báo Nghệ An); một trang tổng hợp ghi Subaru đã ngừng bán WRX STI ở Việt Nam (S30, Zigwheels, nguồn yếu). WRX đời mới bán ở Việt Nam từ 06/2022 là **WRX thường**, không phải STI. Nguồn yếu, chỉ thấy qua tìm kiếm → **không nhắc trong kịch bản**. (FC #25)
- Đời mới: tháng 1/2026 Subaru trưng bày **WRX STI Sport#** (nguyên mẫu), bản sản xuất công bố tháng 4/2026: chỉ cho Nhật, **600 xe**, bán bốc thăm, giá khoảng 6,1 triệu yên, số sàn 6 cấp, công suất 271 mã lực **bằng WRX thường**. Xe **không có DCCD**: Motor Fan ghi "DCCD未装備" (không trang bị DCCD); AWD là vi sai trung tâm có khớp nhớt, 50:50, như WRX số sàn thường. (S25, S31, F1, F7; FC #22, #23) Subaru còn có các bản "STI Sport" / "STI Performance" của Levorg, WRX S4 (S32): đó là bản trang bị, **không đồng nghĩa có DCCD**.
- Hệ quả cho kịch bản: nói "**WRX STI đời trước** (đến 2021 ở Mỹ) dùng DCCD", không nói "xe STI" chung chung. Có thể dùng STI Sport# làm ví dụ: mang chữ STI nhưng AWD giống WRX số sàn thường.

Ngộ nhận mới, ứng viên hook: **"Xe có chữ STI thì có hệ AWD xịn của STI."** Chưa chắc: DCCD chỉ có trên WRX STI số sàn; các bản STI Sport khác có thể dùng hệ AWD như xe thường. (S22, S27, S32)

## 4. So sánh công bằng

Nguyên tắc: so cùng kiểu đặt máy và cùng loại bộ chia lực. Chỉ so cơ chế và tỷ lệ hãng công bố; không xếp hạng.

| Cặp so | Subaru | Audi | Giống | Khác |
|---|---|---|---|---|
| Xe thể thao, máy dọc, vi sai trung tâm | **WRX STI (DCCD, đến 2021 ở Mỹ)**: vi sai hành tinh + bộ hạn chế trượt điện tử, **41:59**, tài xế chọn 6 mức khóa; helical trước, Torsen sau | S5/RS: vi sai vành răng tự khóa thuần cơ khí, **40:60**, tối đa 70/85% + phanh từng bánh, có thể thêm vi sai thể thao | Đều có vi sai thật ở giữa, đều thiên sau, tỷ lệ gần như trùng (41:59 so với 40:60) | Subaru hãm vi sai bằng bộ điều khiển điện tử và **cho tài xế can thiệp**; Audi hãm bằng ma sát bánh răng tự sinh, tài xế không chỉnh, phần điện tử nằm ở phanh và vi sai sau. Lưu ý: STI DCCD đã ngừng, S5/RS vẫn bán; so cơ chế, không so xe đang bán |
| Xe gia đình/SUV, máy dọc, ly hợp | Outback/Forester (ATS): ly hợp điện tử, cầu sau luôn nối, cơ bản 60:40 (Subaru Nhật qua S26) | A6 allroad, A5, Q5 (ultra): ly hợp điện tử ở hộp số + tách cầu sau | Đều không có vi sai trung tâm; đều dùng ly hợp nhiều đĩa do máy tính điều khiển; đều thiên trước khi chạy đều | Subaru: cầu sau luôn có một phần lực trên xe xăng (theo tài liệu hãng). Audi ultra: có thể **ngắt hẳn** cầu sau để đỡ hao, nối lại trong khoảng 0,2 giây |
| Số sàn | WRX số sàn: vi sai côn + khớp nhớt, 50:50 | Audi gần như không còn số sàn ở thị trường lớn **[CẦN XÁC MINH]** | — | Khó so trên xe hiện hành |
| Máy ngang | Subaru không làm xe máy ngang | A3/Q3: ly hợp trước cầu sau, chủ yếu kéo cầu trước | — | Đây chính là kiểu xe mà Subaru 2014 nói "cần thêm bộ bánh răng chuyển hướng"; khác bố cục từ gốc |

Kết luận có thể nói:
- Hai hãng **giống nhau nhiều hơn người ta nghĩ** ở bố cục máy dọc. Khác ở bộ hãm vi sai và ở chỗ Audi có bản chấp nhận ngắt cầu sau.
- Không có thử nghiệm độc lập cùng điều kiện (cùng lốp, cùng mặt đường, cùng bật/tắt kiểm soát lực kéo) giữa hai hệ cùng kiểu. Các bài thử con lăn (ví dụ TFL) thử từng xe riêng và phương pháp bị tranh cãi: con lăn không giống mặt đường trơn thật. (S20, chỉ thấy qua tìm kiếm) **Không dùng làm bằng chứng xếp hạng.**
- Câu "ít ma sát hơn" của Subaru và "hiệu quả hơn" của Audi ultra đều là **lời hãng**, chưa thấy số đo độc lập.

## 5. Lịch sử ngắn

- 1971: Subaru làm một lô nhỏ FF-1 1300G bốn bánh. 09/1972: Leone 4WD Station Wagon, xe du lịch bốn bánh **sản xuất hàng loạt** đầu tiên của Subaru. Không nói "đầu tiên thế giới" (Jensen FF có trước, dù số lượng ít). (F8; FC #42) Nên bổ sung nguồn Subaru.
- 1994: DCCD trên Impreza WRX STI Type RA. (F2, S26)
- 1980 (mùa xuân): Audi Quattro ra mắt, vi sai trung tâm côn 50:50 khóa tay. Chưa có nguồn đã đọc về nơi ra mắt, nên không nói "Geneva". (S11, S18; FC #29)
- 1987: Subaru đưa ly hợp điều khiển điện tử (tiền thân ATS) lên XT/Leone số tự động; Wikipedia ghi 1987, SAE 880699 năm 1988 mô tả hệ này. (S8, S19)
- Cuối thập niên 1980: Audi chuyển sang vi sai Torsen. (S18; FC #30)
- 1991: Subaru SVX có VTD (lúc đầu 36:64). (S8, **[CẦN XÁC MINH]**)
- 1998: Audi TT/A3 quattro máy ngang, ly hợp nhiều đĩa. (S14)
- 2005 / 2010: Audi vi sai tự khóa hành tinh (RS 4), rồi vi sai vành răng (RS 5). (S12, S13)
- 2016: Audi quattro ultra (A4 allroad). (S16)
- 2025: Forester Hybrid S:HEV giữ AWD nối cơ khí. (S5)

## 6. Ngộ nhận phổ biến và ứng viên hook

1. **"Đối xứng nghĩa là chia đều 50:50."** Sai. Đối xứng là bố cục trái–phải; tỷ lệ trước–sau tùy hệ: 50:50 (số sàn), 41:59 (WRX STI), 60:40 (đa số xe CVT, Subaru Nhật). (S1, S2, S22, S26) → Hook mạnh nhất.
2. **"Quattro là một hệ."** Sai. Ít nhất ba cơ chế dưới cùng một cái tên; có bản bình thường chạy cầu trước 100%. (S14, S15, S16)
3. **"Quattro ultra là bản cho xe máy ngang."** Sai; ultra là máy dọc. (S15)
4. **"Subaru có vi sai trung tâm trên mọi xe."** Hệ phổ biến nhất (ATS) không có vi sai trung tâm, chỉ có ly hợp. (S1, S4)
5. **"Audi và Subaru đối lập nhau."** Cả hai xây hệ chuẩn quanh máy dọc; tỷ lệ 40:60 của quattro máy dọc gần như trùng 41:59 của WRX STI. (S13, S23)
5b. **"Xe có chữ STI thì có hệ AWD riêng của STI."** Chưa chắc; DCCD chỉ có trên WRX STI số sàn (đến 2021 ở Mỹ). (mục 3.4)
6. Sự thật thú vị: Ur-quattro 1980 bắt tài xế **tự bấm khóa vi sai**; ngày nay Audi ultra **đoán trước** nhu cầu bốn bánh khoảng nửa giây. (S11, S16) Một câu chuyện 46 năm gói trong một hình.

## 7. Góc kể đề xuất cho video dọc 1–3 phút

**Đề xuất chính: "Đối xứng không phải 50:50."**
- Hook (0–5 s): "Subaru gọi hệ bốn bánh của mình là đối xứng. Nhưng phần lớn xe Subaru không chia lực đều cho hai cầu." Kèm hình hai mũi tên lực lệch nhau.
- Nối từ tập 007: máy boxer đặt dọc → hộp số sau máy → trục thẳng ra sau. "Đối xứng" là cái hình này, nhìn từ trên xuống.
- Vì sao cần bộ phận ở giữa: hai cầu quay lệch khi vào cua (animation bánh xe vẽ vệt cong).
- Subaru, hai cảnh chính (theo quyết định người dùng, không dùng VTD, không dùng hybrid): **xe phổ thông** (ly hợp điện tử, cơ bản 60:40 thiên trước, máy tính quyết định) và **WRX STI** (vi sai giữa thật, 41:59 thiên sau, tài xế chọn mức khóa, vi sai chống trượt hai đầu). Câu chốt: "Cùng một bố cục, nhưng cái hộp giữa hai cầu thì khác hẳn." Có thể thêm một câu về số sàn 50:50 nếu còn thời lượng.
- Cầu nối sang Audi: "41:59 của STI gần như trùng 40:60 của quattro máy dọc."
- Audi: cùng một tên quattro, ba cơ chế. Nhấn hình ultra **ngắt** trục các-đăng, nối lại trong 0,2 giây.
- Kết: "Khác nhau không nằm ở chữ trên logo, mà ở cái hộp nhỏ giữa hai cầu xe." Không tuyên bố hệ nào thắng.

**Phương án B: "Hai hãng bốn bánh nổi tiếng nhất giống nhau đến bất ngờ."** Mở bằng hai xe máy dọc đặt cạnh nhau, rồi tách dần chỗ khác. Hợp nếu muốn video công bằng, ít gây tranh cãi giữa người hâm mộ hai hãng (kênh đang tránh chủ đề dễ gây tranh cãi).

**Phương án C: "Từ công tắc khóa vi sai đến máy tính đoán trước nửa giây."** Lịch sử Audi là trục, Subaru là đối chiếu. Dài hơn, dễ vượt 2 phút.

Gợi ý giữ phạm vi: một câu hỏi (cơ chế + khác biệt), không bàn xe nào đáng mua, không bàn xe điện.

Animation lập trình cần: sơ đồ nhìn từ trên xuống (máy, hộp số, trục, hai cầu); vi sai trung tâm mở/khóa; ly hợp nhiều đĩa ép dần; mũi tên tỷ lệ lực đổi theo thời gian; trục các-đăng dừng quay (ultra). Không cần ảnh AI.

## 8. Từ khóa tiếng Việt

dẫn động bốn bánh toàn thời gian, AWD Subaru, Symmetrical AWD là gì, quattro là gì, quattro ultra, vi sai trung tâm, ly hợp đa đĩa, Haldex, Torsen, AWD khác 4WD, xe Subaru có tốt không đường trơn, Audi quattro hoạt động thế nào.

## 9. Bảng nguồn

| ID | Tài liệu | Loại | Đã đọc? | Hỗ trợ điều gì |
|---|---|---|---|---|
| S1 | [Subaru Offers Four Versions of Symmetrical AWD](https://media.subaru.com/pressrelease/580/1/subaru-offers-four-versions-symmetrical-all-wheel-drive), Subaru of America, 23/02/2014 | [HÃNG] | Có | Bố cục máy dọc; bốn hệ (khớp nhớt 50:50, ATS không ghi tỷ lệ, VTD 45:55, DCCD 41:59) và mẫu xe năm 2014; so với máy ngang |
| S2 | [2022 WRX Specifications (PDF)](https://s3.amazonaws.com/subarumedia.iconicweb.com/mediasite/attachments/2022_WRX_Specs-FINAL.pdf), Subaru of America, tạo 17/02/2022 | [HÃNG] | Có (tách chữ bằng pdftotext) | WRX số sàn: khớp nhớt "nominal 50:50"; tự động: VTD "45:55 nominal" |
| S3 | 2026 Subaru WRX Specifications (PDF), qua [media.subaru.com/download.do?id=2416](https://media.subaru.com/download.do?id=2416), tạo 20/01/2026 | [HÃNG] | Có (tách chữ) | Cùng phần cứng như 2022 nhưng không ghi tỷ lệ; "Active Torque Vectoring" |
| S4 | [2026 Subaru Outback Specs (PDF)](https://s3.amazonaws.com/subarumedia.iconicweb.com/mediasite/attachments/2026_Subaru_Outback_Specs_-_FINAL_v2.pdf), tạo 20/01/2026 | [HÃNG] | Có (tách chữ) | ATS: ly hợp thủy lực điều khiển điện tử, thay đổi liên tục theo gia tốc, góc lái, yaw, trượt; X-MODE + VDC |
| S5 | [Subaru Introduces All-New 2025 Forester Hybrid](https://media.subaru.com/pressrelease/2279/1/subaru-introduces-all-new-2025-forester-hybrid-next), 06/02/2025 | [HÃNG] | Có | S:HEV giữ AWD nối cơ khí trước–sau; boxer 2.5 + hai mô-tơ; X-MODE, Active Torque Vectoring |
| S6 | [Forester – driving](https://www.subaru.jp/forester/driving/), Subaru Nhật, không ghi ngày | [HÃNG] | Có (qua tóm lược tiếng Nhật) | "シンメトリカルAWD", phân lực theo tình huống; phần hybrid được báo là nhắc điều khiển nhả ly hợp chạy cầu trước **[CẦN XÁC MINH]** |
| S7 | [BRZ](https://www.subaru.jp/brz/), Subaru Nhật | [HÃNG] | Có | BRZ là xe FR (cầu sau) |
| S8 | [Symmetrical All Wheel Drive](https://en.wikipedia.org/wiki/Symmetrical_All_Wheel_Drive), Wikipedia, sửa 19/08/2026 | [ĐỘC LẬP], bị gắn cờ quảng bá, dựa nguồn hãng | Có | ATS 1987 60:40; VTD 1991 36:64 rồi 45:55; bán trục dài bằng nhau |
| S9 | [Subaru's Symmetrical AWD Is More Than Just Branding](https://www.jalopnik.com/2012962/subaru-symmetrical-awd-explained/), Jalopnik, Shane Schmid, 02/11/2025 | [ĐỘC LẬP], phổ thông | Có | ATS phổ biến nhất trên xe CVT, không có vi sai trung tâm, 60:40; torque vectoring bằng phanh (không dẫn nguồn) |
| S10 | [Subaru's Symmetrical AWD Explained](https://www.slashgear.com/1792569/subaru-symmetrical-all-wheel-drive-explained-how-different-other-awd-systems), SlashGear, Wilfred Nkhwazi, 23/02/2025 | [ĐỘC LẬP], phổ thông | Có | 50:50 số sàn, 60:40 ATS, 45:55 VTD; Solterra hai mô-tơ |
| S11 | [Bevel gear center differential](https://www.audi-technology-portal.de/en/drivetrain/quattro_en/bevel-gear-center-differential), Audi Technology Portal, trạng thái 2011 | [HÃNG] | Có | Ur-quattro 1980: vi sai côn 50:50, khóa tay vi sai giữa và sau |
| S12 | [Self-locking center differential](https://www.audi-technology-portal.de/en/drivetrain/quattro_en/self-locking-center-differential), Audi, trạng thái 2011 | [HÃNG] | Có | RS 4 2005, bánh răng hành tinh, 40:60, tối đa 60% trước / 80% sau |
| S13 | [Crown gear differential](https://www.audi-technology-portal.de/en/drivetrain/quattro_en/crown-gear-differential), Audi, trạng thái 2011 | [HÃNG] | Có | RS 5 2010, 40:60, tối đa 70% trước / 85% sau, 4,8 kg, torque vectoring bằng phanh, máy dọc |
| S14 | [Hydraulic multi-plate clutch](https://www.audi-technology-portal.de/en/drivetrain/quattro_en/hydraulic-multi-plate-clutch), Audi, trạng thái 2011 | [HÃNG] | Có | Máy ngang từ 1998 (TT, A3); ly hợp trước cầu sau; chủ yếu kéo cầu trước; >100 bar |
| S15 | [Audi quattro with ultra technology](https://www.audi-technology-portal.de/en/drivetrain/quattro_en/audi-quattro-with-ultra-technology-en), Audi, trạng thái 2/2016 | [HÃNG] | Có | Ly hợp ở hộp số + tách cầu sau; tính trước 0,5 s; dự đoán + phản ứng; tắt AWD khi không cần |
| S16 | [Intelligent, integrated, instantly available: quattro ultra in the Audi A6 allroad](https://www.audi.com/en/press-releases/intelligent-integrated-instantly-available-quattro-ultra-in-the-audi-a6-allroad-18362), Audi, 10/02/2026 | [HÃNG] | Có | Ultra từ 2016; nền PPC A5/A6/Q5; 100% cầu trước khi chạy tiết kiệm; nối lại ~200 ms; >70% ra sau khi tăng tốc mạnh (đo nội bộ) |
| S17 | [2025 Audi S5 Will Keep the Rear-Biased Quattro](https://www.thedrive.com/news/2025-audi-s5-drops-traditional-quattro-for-front-biased-all-wheel-drive), The Drive, Nico DeMattia, 17/07/2024 | [ĐỘC LẬP], dẫn lời Audi | Có | Ultra chỉ trên A5 B10; S5 có vi sai thể thao, không ngắt cầu sau |
| S18 | [Quattro (four-wheel-drive system)](https://en.wikipedia.org/wiki/Quattro_(four-wheel-drive_system)), Wikipedia, sửa 24/10/2026 | [ĐỘC LẬP], bách khoa | Một phần (phần sau qua tóm lược) | Các thế hệ; Torsen sau 1987; vi sai thể thao 2008; tỷ lệ Torsen |
| S19 | [SAE 880699: Electronically Controlled Full-Time 4WD Automatic Transmission System](https://saemobilus.sae.org/papers/electronically-controlled-full-time-4wd-automatic-transmission-system-880699), Suzuki H., 1988 | [ĐỘC LẬP], kỹ thuật | **Chỉ thấy tóm tắt qua tìm kiếm** | Fuji Heavy Industries: ly hợp nhiều đĩa điện tử cho Subaru số tự động |
| S20 | [TFL slip test](https://tflcar.com/category/video/tfl-slip-test/) và [Torque News về thử con lăn Crosstrek](https://www.torquenews.com/1084/subaru-awd-best-new-crosstrek-sport-just-failed-slip-test) | [ĐỘC LẬP], phổ thông | **Chỉ thấy qua tìm kiếm** | Thử con lăn từng xe; phương pháp bị tranh cãi; không phải so cùng điều kiện |
| S21 | `projects/007-subaru-may-boxer/research/research.md`, mục 3.4 và 12 | Nội bộ | Có | Bố cục boxer dọc, lý do 1966, nguồn Subaru Nhật |
| S22 | [2021 WRX Compare Specs (PDF)](https://www.subaru.com/services/vehicles/pdf/trimComparison/2021/WRX), Subaru of America | [HÃNG] | Có (tách chữ bằng pdftotext) | DCCD "chỉ có trên WRX STI": vi sai hạn chế trượt điện tử + vi sai trung tâm hành tinh, chế độ tay + ba chế độ tự động, helical trước + Torsen sau; WRX thường số sàn: Continuous AWD; Active Torque Vectoring = phanh bánh trước phía trong; VDC phanh bánh trượt |
| S23 | [Subaru Introduces Limited Edition WRX STI Type RA… for 2018](https://media.subaru.com/pressrelease/1224//subaru-introduces-limited-edition-wrx-sti-type-ra), Subaru of America, 15/11/2017 | [HÃNG] | Có | DCCD 41:59 danh nghĩa; Auto, Auto−, Auto+; 6 mức khóa tay (tối đa 50:50); từ 2018 vi sai giữa chỉ điều khiển điện tử; helical trước, Torsen sau |
| S24 | [2021 Subaru WRX STI Performance review](https://www.carexpert.com.au/car-reviews/2021-subaru-wrx-sti-performance-review), CarExpert, Chris Atkinson, 07/08/2021 | [ĐỘC LẬP] | Có | DCCD khóa điện tử nhiều mức trên nền chia cơ khí 41:59; Auto có chế độ + và − |
| S25 | [Subaru WRX with STI manual teased](https://www.carexpert.com.au/car-news/subaru-wrx-with-sti-manual-teased-reveal-date-set), CarExpert, Max Davies, 23/10/2026 | [ĐỘC LẬP] | Có | WRX STI ngừng năm 2021; STI Sport# 600 xe, Nhật, số sàn, có LSD (bài viết không rõ có DCCD; F1 xác nhận không có) |
| S26 | [スバルのAWDシステム4態、その特質](https://motor-fan.jp/article/1530194/), Motor Fan (ban biên tập), đăng 01/10/2017, cập nhật 10/07/2026, nội dung xe năm 2019 | [ĐỘC LẬP], dẫn trang Subaru Nhật | Có | ACT-4 cơ bản 60:40 (trích Subaru), dao động 100:0 tới 50:50; VTD 45:55; DCCD 41:59, LSD cơ khí + điện tử, chỉ WRX STI; khớp nhớt 50:50 hết ở Nhật từ 01/2019 |
| S27 | [スバルのAWDはなぜこれほど信頼されているのか？](https://bestcarweb.jp/feature/column/58054?prd=2), Bestcar Web, 11/02/2019 | [ĐỘC LẬP] | Có | DCCD 41:59, chỉ WRX STI số sàn 6 cấp, 6 nấc từ tự do tới khóa; ACT-4 phổ biến nhất |
| S28 | [2021 Subaru WRX STI Press Kit](https://media.subaru.com/pressrelease/1699/1/2021-subaru-wrx-sti-press-kit), Subaru of America, 2021 | [HÃNG] | Có | "Multi-Mode DCCD"; chỉ số sàn 6 cấp; không nói đời cuối |
| S29 | [Subaru WRX](https://en.wikipedia.org/wiki/Subaru_Impreza_WRX_STI), Wikipedia (sửa 15/11/2026); [tin EJ20 Final Edition](https://oto.com.vn/thi-truong-o-to/subaru-wrx-sti-ej20-final-edition-duoc-gioi-thieu-tai-que-nha-nhat-ban-articleid-pcuhxga), oto.com.vn | [ĐỘC LẬP] | Wikipedia qua tóm lược; oto.com.vn **chỉ thấy qua tìm kiếm** | EJ20 Final Edition cuối 2019 ở Nhật (555 xe) |
| S30 | [Subaru WRX STI 2018 – the first sports sedan in Vietnam](https://baonghean.vn/en/print/10148310.html), Báo Nghệ An; [Zigwheels VN](https://www.zigwheels.vn/new-cars/subaru/wrx-sti) | [ĐỘC LẬP] | **Chỉ thấy qua tìm kiếm** | WRX STI 2018 về Việt Nam; Zigwheels ghi đã ngừng bán (nguồn yếu) |
| S31 | [Subaru revives the manual WRX STI at the 2026 Tokyo Auto Salon](https://news.dupontregistry.com/blogs/news/subaru-revives-the-manual-wrx-sti-at-the-2026-tokyo-auto-salon), duPont Registry, Khris Bharath, 09/01/2026 | [ĐỘC LẬP] | Có (một phần qua tóm lược) | STI Sport# nguyên mẫu, số sàn 6 cấp, thị trường Nhật; không nói loại AWD |
| S32 | [Subaru STI-Modelle in Tokio](https://www.auto-motor-und-sport.de/neuheiten/drei-neue-subaru-sti-in-tokio-besonders-aber-nicht-besonders-stark/), auto motor und sport, Uli Baumann, 05/01/2026 | [ĐỘC LẬP] | Có | Levorg, WRX S4, Impreza bản STI Performance chỉ ở Nhật, không tăng hiệu năng truyền động |

Nguồn bổ sung từ lượt fact-check (F1–F8): chi tiết đầy đủ ở `research/factcheck-research.md`, mục E.

| ID | Tài liệu | Loại | Đã đọc? | Hỗ trợ điều gì |
|---|---|---|---|---|
| F1 | [600台限定のコンプリートカー「WRX STI Sport #」](https://motor-fan.jp/article/1478366/), Motor Fan, 大音安弘, 13/05/2026 | [ĐỘC LẬP] | Có | STI Sport# không có DCCD; WRX số sàn hiện hành: vi sai giữa khớp nhớt 50:50; 600 xe |
| F2 | [Three decades ago Subaru gave drivers the power to control AWD slip](https://www.theautopian.com/three-decades-ago-subaru-gave-drivers-the-power-to-control-awd-slip-and-changed-the-performance-landscape/), The Autopian, Brian Silvestro, 07/11/2025 | [ĐỘC LẬP] | Có | DCCD 1994; chỉnh mức khóa, không phải tỷ lệ; 36:64 rồi 41:59 |
| F3 | [Audi's High-Tech New Quattro…](https://jalopnik.com/audis-high-tech-new-quattro-is-about-to-piss-off-its-bi-1760502139), Jalopnik, David Tracy, 22/02/2016 | [ĐỘC LẬP], nhắc lại tài liệu Audi | Có | Ultra dựa trên cầu trước, máy dọc, ly hợp ở đuôi hộp số, tách cầu sau, 0,5 s |
| F4 | [The Subaru WRX STI As We Know It Is Officially Dead](https://www.motor1.com/news/573042/subaru-wrx-sti-officially-dead/), Motor1, Christopher Smith, 11/03/2022 | [ĐỘC LẬP], dẫn tuyên bố Subaru | Có | Không làm STI máy xăng trên nền WRX mới |
| F5 | [Haldex Traction](https://en.wikipedia.org/wiki/Haldex_Traction), Wikipedia | [ĐỘC LẬP] | Có | Thế hệ I 1998 (Audi TT, S3, Golf); thế hệ II 95% lực ra trước |
| F6 | [GoAuto, Subaru Forester 2002](https://www.goauto.com.au/amp/subaru/forester/x-5-dr-wagon/2002-10-02/37344.html) | [ĐỘC LẬP] | Chỉ thấy qua tìm kiếm | 60:40 ở điều kiện bình thường |
| F7 | [Subaru WRX STI Sport# revealed for Japan only](https://www.gearpatrol.com/cars/subaru-wrx-sti-sport-production-model-revealed-for-japan-only/), Gear Patrol, Chris Chin, 10/04/2026 | [ĐỘC LẬP] | Có | 600 xe, khoảng 6,1 triệu yên, 271 mã lực bằng WRX |
| F8 | [Subaru Leone](https://en.wikipedia.org/wiki/Subaru_Leone), Wikipedia | [ĐỘC LẬP] | Một phần | Leone 4WD 09/1972; FF-1 1300G bốn bánh lô nhỏ 1971 |

Các trang không mở được: ba trang audi-mediacenter.com về quattro (chuyển hướng tới audi.com rồi 404); subaru.co.jp IR technology (404); subaru.jp trang thông số WRX S4 và Levorg (404); subaru.com/vehicles/brz (403).

## 10. Câu hỏi còn mở

1. **Tỷ lệ ATS 60:40**: tìm tài liệu kỹ thuật Subaru (sổ tay dịch vụ, tài liệu đào tạo, trang Subaru Nhật/Úc) ghi đúng con số cho đời hiện hành. Fact-check chấp nhận dùng với câu "Subaru từng công bố tỷ lệ cơ bản khoảng 60:40" (FC #7); có nguồn hiện hành thì càng tốt.
2. ~~Hybrid S:HEV có nhả ly hợp để chạy cầu trước không?~~ Người dùng chốt để ngoài kịch bản (2026-11-26). Chỉ cần lưu ý: kịch bản nói "xe xăng phổ thông", không nói "mọi Subaru luôn bốn bánh".
2b. ~~STI Sport# có DCCD không~~: đã trả lời, **không có** (F1). Còn mở: Subaru Việt Nam đã bán WRX STI những năm nào (không bắt buộc, kịch bản không nhắc).
2c. Xe Subaru CVT phổ thông có vi sai cầu trước/sau loại mở không. Chưa có nguồn; kịch bản không khẳng định.
2d. ~~DCCD cơ khí + điện tử hay chỉ điện tử~~: đã quyết bỏ khỏi kịch bản.
3. **VTD ở Nhật**: Levorg 2.4, Levorg Layback, WRX S4 đang bán dùng VTD hay ATS; tỷ lệ bao nhiêu.
4. Subaru đã ngừng bán bao nhiêu mẫu số sàn; số sàn nào còn ngoài WRX (BRZ là cầu sau). Ở Việt Nam Subaru bán mẫu nào, hộp số gì (chưa tra; nối với người xem trong nước).
5. Audi hiện còn mẫu nào dùng vi sai trung tâm tự khóa (vi sai vành răng): S4/S5, RS 4/RS 5, RS 6, Q7/Q8? Đời mới có đổi sang loại khác không.
6. ~~RS 3 "torque splitter"~~: bỏ khỏi kịch bản.
7. ~~Bán trục dài bằng nhau~~: bỏ khỏi kịch bản.
8. Có thử nghiệm độc lập nào so hai hệ **cùng kiểu, cùng điều kiện** (lốp, mặt đường, bật/tắt kiểm soát lực kéo)? Nếu không, kịch bản giữ giọng mô tả, không xếp hạng.
9. Năm ngừng WRX STI (DCCD): Mỹ đã có câu dùng được (đời 2021 + tuyên bố 03/2022, F4). Nhật còn mở, không bắt buộc.
10. Leone 1972 (sản xuất hàng loạt) và ATS cuối thập niên 1980: nên bổ sung nguồn Subaru.
11. Nơi ra mắt Audi Quattro 1980 và năm Torsen cụ thể: chỉ cần nếu kịch bản muốn nói; hiện dùng "mùa xuân 1980" và "cuối thập niên 1980".
