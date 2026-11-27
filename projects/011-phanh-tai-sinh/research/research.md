# Phanh tái sinh: xe điện và xe hybrid lấy lại năng lượng ra sao?

> **Trạng thái:** research bản 2 (2026-11-27). Chưa có kịch bản, chưa qua cổng duyệt nào.
> Câu hỏi chính: *Khi xe điện hoặc xe hybrid giảm tốc, năng lượng đi từ bánh xe qua những bộ phận nào để trở thành điện trong pin?*
> Bản 1 giữ trong lịch sử git. Bản này giữ nguyên ID S1–S8, sửa phần nguồn không hỗ trợ trực tiếp và thêm S9–S24.
>
> **Hướng nội dung người dùng đồng ý (2026-11-27)** — đây là chốt hướng research, không phải Cổng duyệt #1:
> 1. Bỏ phần lịch sử khỏi video (mục 9).
> 2. Không dùng con số % thu hồi nào, kể cả ~22 % của video 003 (mục 8, ý 6).
> 3. Dùng ẩn dụ đèn xe đạp chạy đinamô, kèm giới hạn; bỏ ẩn dụ quạt điện (mục 10).
> 4. Dùng 8 nhịp animation ở mục 11 làm khung cho bước kịch bản/storyboard sau.

## 1. Tóm tắt phổ thông (5 dòng)

1. Xe đang chạy mang động năng. Muốn chậm lại, phần năng lượng ấy phải đi đâu đó. [vật lý cơ bản; S6]
2. Phanh thường biến nó thành nhiệt ở má phanh. Phanh tái sinh cho bánh xe quay ngược mô-tơ, để mô-tơ phát điện và tạo lực hãm. [S2, S6, S18]
3. Điện đi qua khối điện tử công suất rồi vào pin cao áp, để dùng lại khi xe chạy. [S13, S14, S18]
4. Pin đầy, pin quá nóng hoặc quá lạnh, phanh gấp hay đường trơn thì mô-tơ nhận được ít hơn; phanh ma sát tự bù phần còn thiếu. [S10, S15, S17, S5]
5. Xe điện, hybrid và hybrid cắm sạc dùng chung nguyên lý này. Chúng khác nhau ở cỡ pin, nguồn nạp pin và cách hãng điều khiển. [S1, S9, S14]

## 2. Kết quả kiểm chứng bản 1

| Khẳng định ở bản 1 | Nguồn ghi | Kết quả | Sửa thành |
|---|---|---|---|
| Mô-tơ làm máy phát khi phanh, điện lưu vào pin | S1, S2 | **Đúng nguồn.** S1: "using the electric motor as a generator and storing the captured energy in the battery". S2: bánh xe quay mô-tơ để tạo điện | Giữ |
| Tổn hao ở mô-tơ, điện tử công suất, pin | S3 | **Nguồn không nói.** S3 chỉ có tóm tắt (abstract), nói về SOC, không nói về tổn hao từng khâu | Tổn hao là nguyên lý chung, nhưng chưa có nguồn đọc được → `[CẦN XÁC MINH]`, tạm diễn đạt "không lấy lại được toàn bộ" |
| HEV dùng regen nạp pin nhỏ; PHEV sạc ngoài được | S1, S4 | S1 đúng cho HEV. Phần PHEV không nằm ở S1/S4 | PHEV chuyển sang S9, S14 |
| Phanh ma sát bù khi mô-tơ/pin không đủ, **khi gần dừng hẳn** | S5, S6 | Phần "bù khi không đủ" đúng (S5 tóm tắt; S10). Phần "gần dừng hẳn" **không có trong S5/S6** | "Gần dừng" → `[CẦN XÁC MINH]` (mục 7) |
| Động năng tỉ lệ khối lượng × bình phương tốc độ | S5 | S5 không nói. Đây là vật lý phổ thông (E = ½mv²) | Ghi "vật lý cơ bản"; không cần gán S5 |
| Bước 3: "sơ đồ Toyota thể hiện bộ điều khiển và phanh tái sinh phối hợp" | S4 | **Một phần.** S4 (thông cáo 17/4/2003) có máy điện làm máy phát, mạch tăng áp tới 500 V giữa mô-tơ, máy phát và pin; nói "new brake system" nhưng **không mô tả cách phối hợp** | Sửa lại, xem mục 3 |
| Pin lạnh hạn chế nhận sạc | S3, S7 | S3/S7 là tóm tắt, có nhắc SOC và nhiệt độ. Nguồn trực tiếp hơn: S11 (DOE), S17 (sách Hyundai) | Thêm S11, S17 |
| S3 dùng làm giới hạn SOC | S3 | Đúng, nhưng S3 là của **Daimler Trucks** (xe tải), chỉ có tóm tắt | Ghi rõ phạm vi |
| S5 | — | Tóm tắt; xe thí nghiệm Tata Ace (xe tải nhỏ, cầu sau). Hỗ trợ: phối hợp regen + ma sát "imperceptible to the driver", tránh khóa bánh sau khi đường trơn, xuống dốc dài có thể dư năng lượng | Giữ, ghi phạm vi |
| S6 | — | Đọc được bản PDF (DOE, Rev 0, 12/2001). Mục 8.2.5: phanh ma sát tạo nhiệt; đạp phanh **trước tiên kích hoạt regen, rồi đến phanh ma sát** | Giữ, ghi "nguyên lý chung, tài liệu 2001" |
| S7 | — | Tóm tắt; xe nghiên cứu 4 mô-tơ trong bánh (Politecnico di Torino, 2024). Theo dõi SOC, nhiệt độ pin, mô-tơ, phanh | Chỉ dùng làm nền, không phải xe thương mại |
| S8 | — | Đúng: phanh của HEV/PHEV "generally last longer"; BEV mòn phanh "significantly reduced". Không nói bỏ được phanh | Giữ |
| "Xe xăng có hệ thống thu hồi khác (máy phát thông minh)" | — | Không có nguồn | `[CẦN XÁC MINH]`; ngoài phạm vi video |
| Lịch sử: Toyota mô tả THS II năm 2003 | S4 | Đúng ngày 17/4/2003 | Đề xuất bỏ lịch sử khỏi video (mục 9) |

## 3. Cơ chế đã kiểm chứng, theo dòng năng lượng

### 3.1. Bánh xe → hệ truyền động → mô-tơ

- Trên xe điện và hybrid, mô-tơ kéo nối cơ khí với bánh xe qua hộp giảm tốc/hệ truyền động. Khi xe lăn, bánh xe kéo ngược mô-tơ quay: "the rotating wheels turn the motor and create electricity". [S2]
- Hoạt hình DOE cho xe hybrid toàn phần vẽ dòng năng lượng đi từ bánh trước qua bộ chia công suất (power split device) tới mô-tơ rồi tới pin. [S10, mô tả trang "Full Hybrid: Braking"]
- **Giới hạn:** tỷ số truyền, cầu nào có mô-tơ, có bộ chia công suất hay không là chi tiết của từng mẫu xe. Không vẽ chi tiết hộp số nếu không có tài liệu mẫu xe.

### 3.2. Mô-tơ đổi vai trò: tạo lực hãm và phát điện

- Cùng một máy điện có thể kéo xe hoặc phát điện: "Some vehicles use motor generators that perform both the drive and regeneration functions." [S13]
- Sách hướng dẫn Toyota Prius 2007 (bản chính hãng): khi nhả ga hoặc đạp phanh, "the electric motor acts as a generator and converts kinetic energy to electric energy to provide deceleration and recover electric energy to charge the hybrid battery". [S18]
- Tức là **lực hãm và dòng điện là hai mặt của cùng một việc**: mô-tơ càng phát nhiều điện thì càng cản bánh xe nhiều. Nhận định này là cách diễn đạt từ S2 ("create electricity" và S12 "generates electricity and helps slow the vehicle").
- Chi tiết vật lý (cảm ứng điện từ, sức phản điện động) chưa có nguồn đọc được trong research này → `[CẦN XÁC MINH]` nếu muốn đưa vào lời đọc. Đề xuất không cần đi sâu.

### 3.3. Khối điện tử công suất (biến tần) và pin

- DOE: bộ điều khiển điện tử công suất "manages the flow of electrical energy delivered by the traction battery"; pin kéo "Stores electricity for use by the electric traction motor." [S13, S14]
- DOE (trang HEV/PHEV): máy phát "Generates electricity from the rotating wheels while braking, transferring that energy back to the traction battery pack." [S14]
- Toyota THS II (2003): mạch cao áp tăng điện áp "between the motor, the generator and the hybrid vehicle battery to 500V"; pin được điều khiển để giữ một mức sạc nhất định. [S4]
- DOE 2001: hệ thống điều khiển "controls the power flow between the battery and the motor as well as regenerative braking". [S6]
- **Đã xác minh (2026-11-27, cho hệ hybrid Toyota):** biến tần (inverter) làm việc **hai chiều**. Tài liệu đào tạo kỹ thuật Toyota (Course 071): "The inverter converts high-voltage battery DC to AC power" và "it rectifies high-voltage AC from MG1 and MG2 to recharge the high-voltage battery"; biến tần đổi điện một chiều của pin thành "three-phase alternating current" cho mô-tơ/máy phát. [S26]
- Toyota: bộ tăng áp (boost converter) nâng điện áp pin lên khi chạy, và khi phát điện thì "drops the voltage … to charge the HV battery". ECU hybrid điều khiển việc đóng ngắt các transistor công suất của biến tần và điều khiển phanh tái sinh; ECU kiểm soát trượt (Skid Control ECU) "controls regenerative braking" phía hệ phanh. [S26]
- ORNL (DOE), đánh giá Prius 2010: MG2 "acts as a generator to recharge the battery during regenerative braking"; bộ chuyển đổi một chiều–một chiều **hai chiều** (bi-directional dc-dc boost converter) cấp cho biến tần mô-tơ và máy phát; điện áp tăng áp thay đổi theo điều kiện lái, gồm cả phanh tái sinh cần thiết. [S27]
- DOE (báo cáo tích hợp xe–lưới 2025): điện tử công suất điều khiển tốc độ, mô-men của mô-tơ kéo và năng lượng thu qua phanh tái sinh để cất vào pin. [S28, đã trích chữ tại máy]
- Xe điện thuần nói chung: bằng sáng chế Ford mô tả biến tần đổi một chiều thành xoay chiều ba pha để chạy mô-tơ, và ở chế độ tái sinh đổi xoay chiều ba pha từ mô-tơ (làm máy phát) thành một chiều cho pin. [S29, đã đọc trên Google Patents] → Đủ để nói nguyên lý chung; nếu muốn gán cho một mẫu xe điện cụ thể thì vẫn cần tài liệu hãng.
- **Giới hạn:** có thể có xe điện đời cũ dùng mô-tơ một chiều (không cần biến tần) `[CẦN XÁC MINH]`, chưa có nguồn; kịch bản nói "trên xe điện và hybrid hiện nay" là an toàn hơn nói "mọi xe". `[CẦN XÁC MINH]` nếu muốn nói tỷ lệ loại mô-tơ trên thị trường.

### 3.4. Khi nào phanh ma sát bổ sung hoặc thay thế

- DOE (hoạt hình hybrid, phần 2): "If additional stopping power is needed, conventional friction brakes (e.g., disc brakes) are also applied automatically." [S10]
- SAE 2010 (tóm tắt): phối hợp regen và phanh ma sát để đạt mức giảm tốc cao hơn, sao cho "the blend between regenerative and friction braking is imperceptible to the driver"; phải tránh khóa bánh sau sớm, nhất là khi đường trơn. [S5]
- Sách Hyundai (Tucson PHEV, mã NX4PHEV 2026): khi pin đầy, regen "temporarily limited to protect the battery"; "Hydraulic braking using the brake pedal can be used normally." [S17]
- Toyota TSB T-SB-0059-23 (29/8/2023, Highlander Hybrid 2020–2022): một số người lái cảm nhận được "momentary transition from regenerative braking to hydraulic braking" khi xuống dốc hoặc vào cua đạp phanh nhẹ; sửa bằng cập nhật phần mềm bộ chấp hành phanh. [S19] → Bằng chứng thực tế: **máy tính chuyển qua lại giữa hai loại phanh** ngay trong một lần đạp, và hãng cố làm cho người lái không nhận ra.
- Prius 2007 có hai đèn cảnh báo riêng: một cho hệ phanh tái sinh, một cho hệ thủy lực; hệ thủy lực có 3 mạch độc lập. [S18] → Phanh ma sát là hệ thống đầy đủ, không phải phụ tùng dự phòng.

## 4. Điều kiện ảnh hưởng đến lượng năng lượng thu hồi

Không dùng một tỷ lệ phần trăm chung. Không nguồn nào trong research này đo cùng điều kiện cho nhiều xe.

| Điều kiện | Ảnh hưởng | Nguồn |
|---|---|---|
| **Mức sạc pin cao / pin đầy** | Regen bị giới hạn để bảo vệ pin; phanh thủy lực vẫn hoạt động bình thường. Ioniq 5: nếu vừa sạc 100 %, lái một bàn đạp "will not slow the vehicle" cho tới khi dùng bớt pin. Daimler: năng lượng thu được giảm khi SOC gần 100 %, phần dư xả qua điện trở hãm/má phanh | S17, S16, S3 |
| **Nhiệt độ pin/mô-tơ quá thấp hoặc quá cao** | Hyundai: regen có thể bị giới hạn khi pin và mô-tơ "high/low temperature"; giới hạn kéo dài hơn nếu pin quá lạnh hoặc quá nóng. DOE: trời lạnh ảnh hưởng tới phanh tái sinh trên HEV, PHEV, EV (không nêu ngưỡng) | S17, S11 |
| **Lực phanh người lái yêu cầu** | Cần dừng mạnh hơn mức mô-tơ cho được → phanh ma sát tự vào thêm | S10, S5, S6 |
| **Độ bám đường, ABS** | Hyundai liệt kê regen bị giới hạn khi ABS hoạt động; SAE nhấn mạnh tránh khóa bánh khi đường trơn | S17, S5 |
| **Tốc độ** | Phố đông, dừng nhiều thì tận dụng regen tốt hơn ("maximize the benefits of regenerative braking") | AFDC EV basics (S13 cùng site; trang electric-basics-ev) |
| **Gần dừng hẳn** | Ioniq 5: dưới khoảng 3 km/h, xe tiếp tục hãm khi thả lẫy; sau khi dừng, phanh tay điện tự giữ xe trong một số trường hợp. **Chưa có nguồn nói regen tắt ở tốc độ nào và phanh ma sát làm phần cuối** | S16, `[CẦN XÁC MINH]` |
| **Dốc dài** | Có thể dư năng lượng hãm phải "dumped" | S5 |
| **Chế độ lái, cài đặt của người lái** | Ioniq 5: mức regen 0–3 (SNOW chỉ 0–1); không đổi mức được khi đang đạp phanh hoặc bật Smart Cruise Control | S15 |
| **Cách lái** | Toyota: lái tăng giảm tốc êm, tránh tăng/giảm tốc đột ngột để thu hồi hiệu quả hơn | S18 |

## 5. Ví dụ mẫu xe (chỉ ghi điều tài liệu chính thức nói)

### 5.1. BEV: Hyundai IONIQ 5 (có bán tại Việt Nam)

- **Có bán tại Việt Nam:** báo chí đưa tin Hyundai Thành Công phân phối IONIQ 5 lắp ráp tại Ninh Bình từ 31/7/2023, pin 72,6 kWh. [S23] `[CẦN XÁC MINH]` trang hãng (hyundai.tcmotor.vn không truy cập được); tình trạng bán năm 2026 chưa rõ.
- **Tài liệu đọc được:** sách hướng dẫn trực tuyến Hyundai Mỹ, mã **NE1a** (NE1 = IONIQ 5 theo danh mục `ownersmanual.hyundai.com/full_pdf/NE1/2024`). Đây là bản thị trường Mỹ; bản Việt Nam có thể khác → `[CẦN XÁC MINH]` trước khi nói "xe bán ở Việt Nam làm như vậy".
  - Mức regen chỉnh bằng lẫy sau vô-lăng, 0–3 tùy chế độ lái. [S15]
  - Lái một bàn đạp: kéo giữ lẫy trái hơn 0,5 giây; xe có thể dừng mà không cần đạp phanh, nhưng sách yêu cầu đạp phanh khi xuống dốc, đường trơn, xe chở nặng, hay vừa sạc đầy 100 %. [S16]
- **Không suy ra** cho IONIQ 5: tỷ lệ chia lực giữa regen và ma sát, ngưỡng nhiệt độ, công suất regen tối đa. Chưa có tài liệu.

### 5.2. HEV: Toyota hybrid (Corolla Cross HEV, Yaris Cross HEV bán tại Việt Nam)

- **Toyota Việt Nam** (trang "Công nghệ Hybrid"): "Khi bạn nhấc chân ga, động cơ sẽ tắt và quá trình phanh tái tạo bắt đầu, vừa làm chậm xe vừa sạc điện cho pin." Xe "không yêu cầu trạm sạc vì pin tự động sạc trong quá trình vận hành." [S20]
- Toyota Việt Nam đang bán Corolla Cross HEV (nhập Thái Lan) và Yaris Cross HEV (nhập Indonesia); trang Yaris Cross ghi "tự sạc pin trong quá trình vận hành, không cần cắm sạc ngoài." [S21]
- **Cơ chế chi tiết của Toyota** lấy từ sách Prius 2007 (S18) và TSB Highlander (S19), **không phải** sách Corolla Cross. Sách hướng dẫn Corolla Cross Hybrid 2024 trên toyota.com.vn không tải được nội dung. → Trong video chỉ nói "trên xe hybrid Toyota", không gán chi tiết cho Corolla Cross. `[CẦN XÁC MINH]` nếu muốn nêu tên mẫu xe.
- Chi tiết thú vị (có nguồn): Prius 2007 ghi khi regen hoạt động "the electric motor running noise may increase." [S18] → Tiếng mô-tơ khi phát điện là có thật trên mẫu này; dùng làm gợi ý âm thanh, nhưng mức tiếng mỗi xe khác nhau.

### 5.3. PHEV: tài liệu đọc được chỉ có Hyundai Tucson Plug-in Hybrid (NX4PHEV, Mỹ)

- Cung cấp các điều kiện giới hạn rõ nhất (pin đầy, nhiệt độ, ABS) [S17]. Mẫu này **chưa xác nhận có bán tại Việt Nam** → chỉ dùng làm bằng chứng nguyên lý, không nêu tên trong video.

### 5.4. VinFast

- Trang VinFast chặn công cụ hoặc trả 404; chưa đọc được sách hướng dẫn ô tô VF. Bảng thông số trên trang bán lẻ ghi VF 6 có phanh tái sinh hai mức thấp/cao (chưa đối chiếu trang hãng) `[CẦN XÁC MINH]`.
- Bài blog VinFast "Cách lái xe ô tô điện" [S22] có câu sai hoặc lẫn (ví dụ phanh tái sinh chuyển "nhiệt năng" thành điện; "nhả chân phanh giúp xe giảm tốc", "đạp chân phanh từ từ" để tăng tốc — có vẻ nhầm chân ga/phanh). **Không dùng làm nguồn kỹ thuật.** Đây lại là bằng chứng cho thấy người đọc Việt dễ gặp giải thích lẫn lộn.

## 6. Bảng "cách nói đơn giản / cơ chế thật / nguồn"

| Cách nói đơn giản | Cơ chế thật | Nguồn |
|---|---|---|
| Xe đang chạy giống như đang "cất" năng lượng trong chuyển động. | Động năng ½mv²; nhanh gấp đôi thì động năng gấp bốn. | Vật lý cơ bản |
| Phanh thường biến chuyển động thành nhiệt. | Má phanh ép vào đĩa/tang trống, ma sát sinh nhiệt. | S6 |
| Khi bạn nhả ga, bánh xe quay ngược lại mô-tơ. | Bánh xe dẫn động mô-tơ qua hệ truyền động; mô-tơ chạy như máy phát. | S2, S18 |
| Mô-tơ phát điện thì cũng ghìm bánh xe lại. | Máy phát lấy năng lượng từ chuyển động quay, tạo lực cản làm xe chậm. | S2, S12, S18 |
| Điện đi qua khối điều khiển rồi mới vào pin. | Điện tử công suất điều khiển dòng điện giữa mô-tơ và pin cao áp. (Đổi AC→DC: `[CẦN XÁC MINH]`.) | S13, S14, S4, S6 |
| Pin không phải lúc nào cũng nhận được. | Regen bị giới hạn khi pin đầy, quá nóng/lạnh, khi ABS hoạt động. | S17, S11, S3 |
| Thiếu bao nhiêu, phanh thường bù bấy nhiêu, tự động. | Máy tính phối hợp regen và phanh thủy lực để tổng lực hãm đúng yêu cầu. | S10, S5, S19 |
| Lấy lại được một phần, không phải tất cả. | Năng lượng không tự sinh ra; có phần vẫn thành nhiệt ở phanh ma sát, phần mất trên đường đi (tổn hao từng khâu `[CẦN XÁC MINH]`). | S1, S3 |
| Hybrid "tự sạc" nghĩa là nạp bằng động cơ xăng và bằng phanh. | Pin HEV nạp qua regen và qua động cơ đốt trong. | S14, S1 |

## 7. Khác biệt cần biết giữa BEV, HEV và PHEV

| | BEV (xe điện thuần) | HEV (hybrid thường) | PHEV (hybrid cắm sạc) |
|---|---|---|---|
| Phanh tái sinh | Có | Có | Có |
| Pin nạp bằng | Ổ sạc ngoài + regen | Regen + động cơ xăng; không cắm sạc | Ổ sạc ngoài + động cơ xăng + regen |
| Nguồn | S13, S8 | S1, S14, S20 | S9, S14 |
| Điều người dùng cảm nhận | Thường chỉnh được mức regen; có xe lái một bàn đạp tới dừng (IONIQ 5) | Regen bắt đầu khi nhả ga, hòa vào bàn đạp phanh (Toyota) | Như hybrid; khi vừa sạc đầy, regen có thể bị giới hạn (Tucson PHEV) |
| Nguồn | S15, S16 | S18, S20 | S17 |

**Giữ trọng tâm:** đường bánh xe → mô-tơ → khối điều khiển → pin là chung. Khác biệt chỉ nên chiếm một nhịp ngắn.

## 8. Ngộ nhận cần tránh

1. **"Phanh tái sinh tạo ra điện miễn phí."** Không. Nó lấy lại một phần động năng vốn đến từ điện hoặc xăng đã dùng để tăng tốc. [S1]
2. **"Đạp phanh là sạc pin."** Không nhất thiết. Pin đầy, pin lạnh/nóng, phanh gấp hay ABS hoạt động thì phần lớn hoặc toàn bộ lực hãm có thể do phanh ma sát. [S17, S10]
3. **"Xe điện không cần má phanh."** Sai. Phanh thủy lực là hệ thống đầy đủ, chỉ mòn chậm hơn; vẫn cần bảo dưỡng. [S8, S18]
4. **"Hybrid tự sạc là pin tự có điện."** Năng lượng vẫn đến từ xăng và từ phần động năng thu lại. [S14, S1]
5. **"Phanh tái sinh biến nhiệt của phanh thành điện."** Sai (lỗi có trong một bài blog tiếng Việt, S22). Regen lấy năng lượng **trước khi** nó thành nhiệt, bằng cách cho mô-tơ hãm thay má phanh.
6. **"Thu hồi được X %."** Không có con số chung; phụ thuộc xe, đường, tốc độ, pin, nhiệt độ, cách lái. Video 003 đã dùng số ~22 % của **một** phép đo Nissan Leaf 2012 trong một chu trình; **không dùng lại** con số đó như đặc tính chung.
7. **Không vẽ** điện chạy thẳng từ bánh xe vào pin, bỏ qua mô-tơ và khối điều khiển.

**Hook ứng viên (chưa phải kịch bản):** "Mỗi lần dừng đèn đỏ, chiếc xe của bạn phải đổ đi một lượng năng lượng. Xe điện giữ lại được một phần. Nhưng bằng cách nào?"

## 9. Lịch sử: lược bỏ (người dùng đồng ý 2026-11-27)

- Nguồn lịch sử đáng tin đọc được chỉ có thông cáo Toyota 17/4/2003 về THS II [S4]. Không đủ để kể "ai phát minh, năm nào" cho ô tô.
- Lịch sử không giúp trả lời câu hỏi chính (năng lượng đi qua đâu). **Đề xuất bỏ khỏi video 1–3 phút.** Nếu cần một câu, chỉ nói ý không có mốc: "cùng một máy điện có thể kéo hoặc phát điện" (S13).

## 10. Cách giải thích đời thường (đề xuất, chưa phải kịch bản)

Xe đang chạy là đang mang năng lượng.
Muốn dừng, năng lượng ấy phải đi đâu đó.
Xe thường đổ nó vào má phanh, thành nhiệt.
Xe điện thì làm khác.
Bạn nhả ga, bánh xe quay ngược lại mô-tơ.
Mô-tơ thôi kéo xe. Nó thành máy phát điện.
Phát điện thì nặng tay, nên xe chậm lại.
Điện đi qua khối điều khiển, rồi vào pin.
Nhưng pin không phải lúc nào cũng nhận.
Pin đầy, quá lạnh, hay bạn phanh gấp, phanh thường lập tức làm phần còn lại.
Xe hybrid cũng vậy, chỉ là pin nhỏ hơn và có thêm động cơ xăng.

**Ẩn dụ đề xuất: đèn xe đạp chạy bằng đinamô.** Bật đèn lên thì đạp nặng hơn một chút: chuyển động của bánh xe đang được đổi thành điện.
*Giới hạn của ẩn dụ:* đinamô đốt điện ngay vào bóng đèn, không có pin và không có khối điều khiển; lực cản của nó nhỏ, không đủ làm phanh. Ở ô tô, máy tính quyết định lấy bao nhiêu điện, và phần lực hãm còn thiếu do phanh ma sát lo. Không nói "ô tô điện là một cái đinamô to". Ẩn dụ "quạt điện quay ngược" ở bản 1 bỏ, vì quạt thường không phát điện để người xem tự kiểm được. (Cảm nhận "đạp nặng hơn" là trải nghiệm phổ thông, chưa có nguồn đo; chỉ dùng làm hình ảnh.)

## 11. Các nhịp animation 9:16 và gợi ý âm thanh

Đề xuất nghiên cứu, chưa phải storyboard duyệt. Mỗi nhịp một ý, nhãn tối đa 1–2 chữ trên màn hình.

| # | Ý người xem cần hiểu | Câu thuyết minh (đọc thành tiếng) | Chuyển động animation | Âm thanh gợi ý | Nguồn |
|---|---|---|---|---|---|
| 1 | Xe đang chạy mang năng lượng | "Xe đang chạy là đang mang năng lượng." | Xe nhìn ngang, lăn về phía đèn đỏ; một dải sáng chạy dọc thân xe, to theo tốc độ | Tiếng lốp lăn đều trên mặt đường (môi trường), nhỏ | Vật lý cơ bản |
| 2 | Phanh thường biến năng lượng thành nhiệt | "Xe thường đổ năng lượng ấy vào má phanh, thành nhiệt." | Phóng vào đĩa phanh: má ép, đĩa đỏ dần, dải sáng tan thành làn nhiệt | Tiếng rít ma sát rất nhẹ, ngắn | S6 |
| 3 | Năng lượng đổi chiều: bánh xe → mô-tơ | "Xe điện thì khác. Nhả ga, bánh xe quay ngược lại mô-tơ." | Tua lại cảnh; mũi tên năng lượng ở trục bánh **đổi chiều**, chạy từ bánh về mô-tơ | "Whoosh" ngắn lúc mũi tên đổi chiều | S2 |
| 4 | Mô-tơ đổi vai: từ kéo xe sang phát điện, và chính việc đó làm xe chậm | "Mô-tơ thôi kéo xe. Nó thành máy phát, và ghìm bánh xe lại." | Biểu tượng mô-tơ lật: nhãn "kéo" → "phát điện"; mũi tên lực hãm ngược hướng chạy xuất hiện ở bánh | Âm trầm mô-tơ đổi cao độ, rất tiết chế (Prius 2007 ghi tiếng mô-tơ có thể to hơn khi regen) | S18, S12 |
| 5 | Điện đi qua khối điều khiển rồi vào pin | "Điện đi qua khối điều khiển, rồi vào pin." | Hạt sáng chạy theo dây: mô-tơ → hộp "khối điều khiển" (không ghi AC/DC) → pin; vạch pin nhích lên một chút | "Tách" nhẹ khi vạch pin tăng | S13, S14, S4 |
| 6 | Pin không nhận hết; phanh ma sát bù phần thiếu | "Pin đầy, pin lạnh, hay phanh gấp, phanh thường lập tức làm phần còn lại." | Màn hình chia lực hãm thành hai thanh: xanh (mô-tơ) + cam (má phanh). Pin đầy → thanh xanh ngắn lại, thanh cam dài ra; **tổng chiều dài không đổi** | Tiếng ma sát nhẹ trở lại, nhỏ hơn cảnh 2; không dùng tiếng báo động | S17, S10, S5 |
| 7 | Chỉ lấy lại một phần | "Lấy lại được một phần, không phải tất cả." | Dải sáng cảnh 1 chia ra: phần vào pin, phần thành nhiệt; không ghi số % | Im lặng ngắn | S1; tổn hao từng khâu `[CẦN XÁC MINH]` |
| 8 | BEV và hybrid chung nguyên lý, khác cấu hình | "Xe hybrid cũng vậy. Chỉ là pin nhỏ hơn, và có thêm động cơ xăng." | Hai xe cạnh nhau; cùng một đường sáng bánh → mô-tơ → khối điều khiển → pin; xe hybrid thêm khối động cơ xăng mờ | Một "click" khi hai đường sáng trùng khớp | S1, S14, S20 |

Nguyên tắc âm thanh: không dùng tiếng tia điện, tiếng robot hay "zap" giả tưởng — ngoài đời xe không phát tiếng đó, sẽ làm người xem hiểu sai. Tiếng phanh ma sát chỉ xuất hiện khi hình thật sự cho thấy má phanh làm việc. Nguồn và giấy phép từng file ghi vào `assets/audio/NGUON-AM-THANH.md` khi dựng (theo CLAUDE.md).

## 12. Từ khóa tiếng Việt

phanh tái sinh là gì; xe điện sạc pin khi phanh như thế nào; xe hybrid thu hồi năng lượng; mô-tơ điện phát điện khi phanh; phanh tái sinh và phanh cơ khác gì; xe điện có má phanh không; xe hybrid không cắm sạc lấy điện ở đâu; lái một bàn đạp xe điện; vì sao pin đầy phanh tái sinh yếu.

## 13. Bảng nguồn

| ID | Nguồn | Loại | Trạng thái kiểm (2026-11-27) | Dùng cho |
|---|---|---|---|---|
| S1 | DOE AFDC, [Hybrid Electric Vehicles](https://afdc.energy.gov/vehicles/electric-basics-hev) | Chính phủ Mỹ | Đọc toàn văn | Mô-tơ làm máy phát khi phanh, lưu vào pin; HEV |
| S2 | DOE AFDC, [Hybrid: Braking (phần 1)](https://afdc.energy.gov/fueleconomy/animations/hybrids/hybrid/hybridbraking.html) | Chính phủ Mỹ | Đọc | Bánh xe quay mô-tơ tạo điện |
| S3 | SAE 2026-26-0154, Barik và cộng sự (Daimler Trucks), [Predictive SoC Management…](https://saemobilus.sae.org/papers/predictive-soc-management-enhanced-recuperation-efficiency-electric-vehicles-2026-26-0154) | SAE | **Chỉ tóm tắt**; xe tải | Thu hồi giảm khi SOC gần 100 %; phần dư qua điện trở/má phanh |
| S4 | Toyota, [Toyota develops new hybrid system (THS II)](https://global.toyota/en/detail/220017/), 17/4/2003 | Hãng | Đọc toàn văn | Máy điện làm máy phát; mạch tăng áp 500 V; pin giữ mức sạc. Không mô tả phối hợp phanh |
| S5 | SAE 2010-01-1680, Hartley và cộng sự, [Braking System for a Full Electric Vehicle with Regenerative Braking](https://saemobilus.sae.org/papers/braking-system-a-full-electric-vehicle-regenerative-braking-2010-01-1680) | SAE | **Chỉ tóm tắt**; Tata Ace thí nghiệm | Phối hợp regen + ma sát không cảm nhận được; tránh khóa bánh khi trơn; dốc dài dư năng lượng |
| S6 | DOE, [Hydrogen Fuel Cell Engines, Module 8](https://www.energy.gov/documents/fcm08r0pdf), Rev 0, 12/2001, mục 8.2.5–8.2.6 | Chính phủ Mỹ | Đọc PDF (trích chữ tại máy) | Phanh ma sát → nhiệt; đạp phanh kích hoạt regen trước rồi ma sát; điều khiển dòng pin–mô-tơ. Tài liệu cũ |
| S7 | SAE Int. J. Veh. Dyn. 10-08-02-0015, Tempone và cộng sự (2024), [Control System for Regenerative Braking Efficiency…](https://saemobilus.sae.org/articles/control-system-regenerative-braking-efficiency-electric-vehicles-electro-actuated-brakes-10-08-02-0015) | SAE | **Chỉ tóm tắt**; xe nghiên cứu | Hiệu quả phụ thuộc SOC; theo dõi nhiệt độ pin, mô-tơ, phanh |
| S8 | DOE AFDC, [Maintenance and Safety of Electric Vehicles](https://afdc.energy.gov/vehicles/electric-maintenance) | Chính phủ Mỹ | Đọc | Phanh vẫn có, mòn chậm hơn nhờ regen |
| S9 | DOE AFDC, [Plug-In Hybrid Electric Vehicles](https://afdc.energy.gov/vehicles/electric-basics-phev) | Chính phủ Mỹ | Đọc | PHEV: mô-tơ làm máy phát khi phanh |
| S10 | DOE AFDC, [Hybrid: Braking (phần 2)](https://afdc.energy.gov/fueleconomy/animations/hybrids/hybrid/hybridbraking2.html) và [Full Hybrid: Braking](https://afdc.energy.gov/fueleconomy/animations/hybrids/fullhybrid/fullhybridbraking.html) | Chính phủ Mỹ | Đọc | Phanh ma sát tự động bổ sung khi cần thêm lực; đường bánh → bộ chia công suất → mô-tơ → pin |
| S11 | DOE/ORNL fueleconomy.gov, [Fuel Economy in Cold Weather](https://www.fueleconomy.gov/feg/coldweather.shtml) | Chính phủ Mỹ | Đọc | Trời lạnh ảnh hưởng phanh tái sinh (không nêu ngưỡng) |
| S12 | fueleconomy.gov, [How Hybrids Work](https://www.fueleconomy.gov/feg/hybridtech.shtml) | Chính phủ Mỹ | Đọc | Regen tạo điện và giúp xe chậm lại |
| S13 | DOE AFDC, [How Do All-Electric Cars Work?](https://afdc.energy.gov/vehicles/how-do-all-electric-cars-work) (và [All-Electric Vehicles](https://afdc.energy.gov/vehicles/electric-basics-ev)) | Chính phủ Mỹ | Đọc | Mô-tơ kiêm máy phát; bộ điều khiển điện tử công suất; pin kéo; đi phố tận dụng regen |
| S14 | DOE AFDC, [How Do Hybrid Electric Cars Work?](https://afdc.energy.gov/vehicles/how-do-hybrid-electric-cars-work), [… Plug-In Hybrid …](https://afdc.energy.gov/vehicles/how-do-plug-in-hybrid-electric-cars-work) | Chính phủ Mỹ | Đọc | Máy phát chuyển năng lượng khi phanh về pin; nguồn nạp pin HEV/PHEV |
| S15 | Hyundai owner's manual NE1a 2025 (IONIQ 5, Mỹ), [Regenerative Braking System Limitations](https://ownersmanual.hyundai.com/full_webhelp/NE1a/2025/en_US/topic_l2n_2w2_mvb.html) | Hãng | Đọc | Mức 0–3; điều kiện không đổi được mức |
| S16 | Hyundai NE1a 2026, [One Pedal Driving](https://ownersmanual.hyundai.com/full_webhelp/NE1a/2026/en_US/topic_q2n_2w2_mvb.html) | Hãng | Đọc | Một bàn đạp; dưới ~3 km/h; vừa sạc 100 % thì không hãm; khi nào phải đạp phanh |
| S17 | Hyundai NX4PHEV 2026 (Tucson PHEV, Mỹ), [Regenerative braking system limitations](https://ownersmanual.hyundai.com/full_webhelp/NX4PHEV/2026/en_US/topic_zg4_xft_t5b.html) | Hãng | Đọc | Pin đầy, nhiệt độ, ABS giới hạn regen; phanh thủy lực vẫn bình thường. Mã → tên mẫu `[CẦN XÁC MINH]` |
| S18 | Toyota, *2007 Prius Owner's Manual* (bản PDF chính hãng, lưu trên [PriusChat](https://attachments.priuschat.com/attachment-files/2020/07/189990_2007_Toyota_Prius_Manual.pdf)) | Hãng (đời cũ, nơi lưu bên thứ ba) | Trích chữ tại máy | Mô-tơ thành máy phát khi nhả ga/đạp phanh; tiếng mô-tơ; hai hệ phanh; lái êm thu hồi tốt hơn |
| S19 | Toyota TSB **T-SB-0059-23**, 29/8/2023, Highlander HV 2020–2022 ([NHTSA](https://static.nhtsa.gov/odi/tsbs/2023/MC-10244133-9999.pdf)) | Hãng (qua NHTSA) | Trích chữ tại máy | Chuyển tiếp regen → thủy lực có thể cảm nhận được; cập nhật phần mềm |
| S20 | Toyota Việt Nam, [Công nghệ Hybrid](https://www.toyota.com.vn/cong-nghe-hybrid-toyota/) | Hãng (VN) | Đọc trong trình duyệt | Nhấc ga → phanh tái tạo, làm chậm xe và sạc pin; không cần trạm sạc |
| S21 | Toyota Việt Nam, [Corolla Cross HEV](https://www.toyota.com.vn/corolla-cross-1-8hev), [Yaris Cross HEV](https://www.toyota.com.vn/yaris-cross-hev) | Hãng (VN) | Đọc (qua công cụ) | Mẫu đang bán; không cắm sạc ngoài. Không có chi tiết regen |
| S22 | VinFast, [Cách lái xe ô tô điện…](https://vinfastauto.com/vn_vi/cach-lai-xe-o-to-dien) | Blog hãng | Đọc | **Có lỗi kỹ thuật; không dùng làm nguồn**, chỉ làm ví dụ ngộ nhận |
| S23 | Báo chí: [The Investor](https://theinvestor.vn/hyundai-motor-debuts-made-in-vietnam-electric-vehicle-d6028.html), [Người Quan Sát](https://nguoiquansat.vn/ra-mat-xe-dien-ioniq-5-san-xuat-tai-viet-nam-co-gia-tu-1-3-ty-dong-85311.html) | Báo chí | Qua kết quả tìm kiếm, chưa đọc trang | IONIQ 5 lắp ráp tại VN, phân phối từ 7/2023 `[CẦN XÁC MINH]` |
| S24 | Hyundai docview, [Regenerative braking system full stop function](https://ownersmanual.hyundai.com/docview/webhelp/Hyundai/5375bf28-c9d4-4116-920b-b92a819711e6/id9fe1d374b17.html) | Hãng | Đọc; **không rõ mẫu xe** | Lẫy trái giữ để dừng hẳn; vẫn phải đạp phanh để kiểm soát. Chỉ tham khảo |

| S25 | fueleconomy.gov (DOE/EPA), [Where the Energy Goes: Electric Cars](https://www.fueleconomy.gov/feg/atv-ev.shtml) | Chính phủ Mỹ | Đọc | Phanh tái sinh thu lại "some energy"; hệ truyền động điện có tổn hao. Số liệu của một Nissan Leaf 2012 — không đọc số |
| S26 | Toyota Technical Training, *Toyota Hybrid System – Course 071* (bản lưu trên [SlideShare](https://www.slideshare.net/slideshow/toyota-hybrid-system-overviewpdf/259557611), người tải lên không phải Toyota; không ghi năm) | Hãng (tài liệu đào tạo) | Đọc phần lớn slide | Biến tần đổi DC→AC ba pha cho mô-tơ, nắn AC→DC để nạp pin; bộ tăng áp hạ áp khi nạp; ECU điều khiển transistor và phanh tái sinh |
| S27 | ORNL, Burress và cộng sự, [*Evaluation of the 2010 Toyota Prius Hybrid Synergy Drive System*](https://info.ornl.gov/sites/publications/files/Pub26762.pdf), ORNL/TM-2010/253, 3/2011 | Phòng thí nghiệm quốc gia (DOE) | Trích chữ tại máy | MG2 làm máy phát khi phanh tái sinh; bộ chuyển đổi tăng áp hai chiều cấp cho biến tần |
| S28 | DOE, [Vehicles-to-Grid Integration Assessment Report](https://www.energy.gov/sites/default/files/2025-01/Vehicle_Grid_Integration_Asseessment_Report_01162025.pdf), 1/2025 | Chính phủ Mỹ | Trích chữ tại máy (trang 30–31) | Bộ điều khiển điện tử công suất quản lý dòng năng lượng giữa pin, biến tần và mô-tơ, điều khiển tốc độ, mô-men và năng lượng thu qua phanh tái sinh; mô-tơ truyền lực tới bánh "via gearing"; pin già đi thì giảm công suất nạp, giảm phanh tái sinh (trang 60) |
| S29 | Ford Global Technologies, bằng sáng chế US 11,990,306 ([USPTO](https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/11990306)) | Bằng sáng chế hãng (cấp 21/5/2024) | Đọc trên [Google Patents](https://patents.google.com/patent/US11990306B2/en) | Biến tần chuyển năng lượng hai chiều; đổi DC → AC ba pha cho mô-tơ; đổi AC ba pha từ mô-tơ "acting as a generator" thành DC cho pin; mô-tơ làm máy phát thu lại năng lượng vốn thành nhiệt ở phanh ma sát |
| S30 | Toyota, Hirata và cộng sự, [*Development of Power Control Unit for Midclass Vehicle*](https://citelec.vub.ac.be/EVS24/files/proceedings/EVS-24-3250192.pdf), EVS24, 2009 | Hãng (bài hội nghị) | Trích chữ một phần | Khối điều khiển công suất (PCU) gồm biến tần và bộ tăng áp. Chỉ dùng nền |

Nguồn không truy cập được: sách Toyota Corolla Cross Hybrid 2024 (toyota.com.vn, không tải nội dung), sách VinFast ô tô (403/404), PDF IONIQ 5 toàn tập (quá 10 MB), Manualslib và The Brake Report (403), Hyundai Thành Công (không phân giải tên miền).

## 14. Câu hỏi còn mở và mục `[CẦN XÁC MINH]`

1. ~~Biến tần đổi AC → DC khi regen~~ — **đã xác minh cho Toyota hybrid** (S26, S27); nguyên lý chung cho xe điện có S28, S29 (đã đọc). Còn mở: tài liệu hãng cho một mẫu xe điện thuần bán tại Việt Nam.
2. **Tổn hao từng khâu** (mô-tơ, điện tử công suất, pin): cần nguồn đọc được. Video chỉ nói "lấy lại một phần".
3. **Gần dừng hẳn:** regen yếu đi/tắt ở tốc độ nào, phanh ma sát làm phần cuối thế nào. Chưa có nguồn cho mẫu xe nào. Không đưa vào lời đọc.
4. **IONIQ 5 bản Việt Nam:** còn bán năm 2026 không; sách hướng dẫn bản VN có cùng mức regen 0–3 và lái một bàn đạp không. Có thể nhờ người dùng chụp trang sách hoặc tải PDF hãng.
5. **Toyota Corolla Cross HEV:** đoạn "phanh tái sinh" trong sách hướng dẫn chính hãng VN (người dùng mở trang hdsd trong trình duyệt thường, hoặc hỏi đại lý).
6. **VinFast VF (một mẫu):** sách hướng dẫn chính hãng về mức regen và điều kiện giới hạn. Trang thông số bán lẻ ghi VF 6 có hai mức thấp/cao — chưa đối chiếu.
7. **Mã NX4PHEV = Tucson Plug-in Hybrid:** xác nhận trên trang Hyundai; mẫu này có bán tại VN không (dự đoán là không).
8. **"Xe xăng có thu hồi năng lượng khi giảm tốc" (máy phát thông minh, mild hybrid):** ngoài phạm vi; không nhắc nếu chưa nghiên cứu.
9. **Số liệu thu hồi** cho một chu trình cụ thể: chỉ dùng nếu có nguồn đo nêu rõ xe, chu trình, điều kiện pin. Hiện **không dùng số nào**.
10. **Lịch sử:** đã chốt bỏ (mục 9).
