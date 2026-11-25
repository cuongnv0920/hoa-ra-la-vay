# Research — Tiền xăng của bạn đi đâu? (video #003)

> Ngày nghiên cứu: 2026-11-23. Video dọc 1–3 phút, dòng "Xe điện vs xe xăng/dầu" kết hợp cơ chế.
> **Giá cả thay đổi theo kỳ điều hành** → mọi số giá trong video phải kèm ngày, và kiểm lại ngay trước khi tạo giọng.
> `[TÍNH TOÁN]` = tự quy đổi từ số liệu có nguồn. `[CẦN XÁC MINH]` = mới có một nguồn hoặc nguồn yếu.

## Tóm tắt 5 dòng
1. Với xe xăng thông thường, chỉ khoảng **12–30%** năng lượng trong xăng thật sự dùng để đẩy xe đi, tùy kiểu chạy (S1, S2).
2. Phần lớn mất ngay **trong động cơ, chủ yếu thành nhiệt**: 68–72% khi chạy hỗn hợp (S1).
3. Quy ra tiền: **1 triệu tiền xăng → chỉ khoảng 180–250 nghìn đồng đi tới bánh xe**; khoảng 680–720 nghìn biến thành nhiệt và ma sát trong máy `[TÍNH TOÁN]`.
4. Xe điện: 65–69% điện từ lưới tới bánh xe, cộng phanh tái sinh thu hồi khoảng 22% → hiệu dụng 87–91% (S3). Nhưng số liệu xe điện dựa trên **một mẫu xe (Nissan Leaf 2012)**.
5. So sánh công bằng phải nói: điện ở Việt Nam năm 2025 khoảng **45% từ nhiệt điện than** (S11) — nhà máy điện cũng thải nhiệt. Đây là câu hỏi mở, nên nêu thẳng.

## Cơ chế vận hành

### 1. Trong một lít xăng có bao nhiêu năng lượng
- Xăng: khoảng **32 MJ/lít** (nhiệt trị thấp), khoảng 31–32,4 MJ/lít tùy loại (S5, S6).
- Xăng pha ethanol E10 thấp hơn chút (khoảng 2–3%), vì ethanol chứa ít năng lượng hơn (S6, S7). Dùng **≈ 31,5 MJ/lít** cho E10 `[CẦN XÁC MINH]` (chưa có nguồn gốc cho đúng E10).
- 1 kWh = 3,6 MJ → 1 lít E10 ≈ **8,75 kWh** `[TÍNH TOÁN]`.

### 2. Năng lượng đi đâu — xe xăng (S1; phân tích của ORNL trên hơn 100 xe, dữ liệu thử nghiệm EPA)
| Ngả | Đi phố (FTP-75) | Cao tốc (HWFET) | Hỗn hợp (55% phố / 45% cao tốc) |
|---|---|---|---|
| Mất trong động cơ (chủ yếu nhiệt; thêm ma sát, bơm khí ra vào, cháy không hết) | 71–75% | 64–69% | 68–72% |
| Phụ tải (bơm, máy phát, điều hòa…) | 5–7% | 3–4% | 4–6% |
| Truyền động (hộp số, trục…) | 4–5% | 3–5% | 3–5% |
| Chạy không tải (đã tính gộp trong hai dòng trên) | 6% | 0 | 3% |
| **Tới bánh xe** | **14–20%** | **22–30%** | **18–25%** |

- S1 không tách % cho từng ngả trong động cơ (nhiệt khí xả, nước làm mát, ma sát, bơm). Các nghiên cứu cân bằng năng lượng động cơ xăng cho thấy **khí xả là phần nhiệt lớn nhất**, tiếp theo là nhiệt truyền qua nước làm mát (S8). Không đưa % cụ thể khi chưa có nguồn giáo trình (Heywood) `[CẦN XÁC MINH]`.
- Năng lượng tới bánh xe rồi lại hết vào: **cản gió, cản lăn của lốp, và phanh** (biến thành nhiệt ở đĩa phanh) (S1). S1 không cho tỉ lệ %.

### 3. Hiệu suất đỉnh vs hiệu suất thực
- Động cơ xăng sản xuất hàng loạt tốt nhất hiện nay đạt **khoảng 40% ở điểm làm việc tốt nhất** (Toyota Dynamic Force 2.5L; Toyota công bố 40%, bản hybrid 41%) (S9, S10).
- Nhưng **trung bình cả chu trình** thấp hơn nhiều: hiệu suất hệ truyền lực trung bình của 37 cặp xe Mỹ tăng từ **18,8% (đời 2005) lên 20,9% (đời 2013)** (S2, S4).
- Lý do: xe đi phố chủ yếu chạy **tải nhẹ**, xa điểm hiệu suất tốt nhất; bướm ga đóng bớt → mất năng lượng "bơm" khí; dừng chờ đèn đỏ vẫn đốt xăng (S1).

### 4. Năng lượng đi đâu — xe điện (S3; ước tính chủ yếu từ Nissan Leaf 2012, tổn hao sạc theo thử nghiệm Argonne)
| Ngả | Phố | Cao tốc | Hỗn hợp |
|---|---|---|---|
| Mất khi sạc pin (AC→DC, điện trở pin) | 16% | 10% | 10% |
| Phụ tải | 4% | 2% | 3% |
| Mất ở hệ truyền động điện (biến tần, mô-tơ…) | 18% | 15% | 22% |
| Không tải | 0 | 0 | gần 0 |
| **Tới bánh xe** | 54–62% | 71–73% | 65–69% |
| **+ Phanh tái sinh thu hồi** | +32% | +6% | +22% |
| **Hiệu dụng** | 86–94% | 77–79% | 87–91% |

- Phanh tái sinh: mô-tơ chạy ngược thành máy phát, lấy lại năng lượng lẽ ra thành nhiệt ở phanh. **Lợi nhiều khi đi phố, lợi ít trên cao tốc** (S3).
- Trời rất lạnh: sưởi dùng điện, phụ tải có thể vượt 40% khi đi phố (S3) — ít liên quan khí hậu VN, nhưng **điều hòa** vẫn là phụ tải đáng kể `[CẦN XÁC MINH]` cho số % ở VN.
- Một nguồn khác của DOE nêu "trên 77%" điện lưới tới bánh xe (không tính tái sinh) (S12). Các con số chênh nhau vì cách tính có hay không có tái sinh → **trong video nên nói "khoảng 3/4 hoặc hơn"** thay vì 90%.

### 5. Số liệu Việt Nam (ghi ngày)
| Mục | Giá trị | Ngày | Nguồn |
|---|---|---|---|
| Xăng E10 RON 95-III, vùng 1 | **19.100 đồng/lít** | hiệu lực từ 15h 19/11/2026 | S13 (báo tổng hợp; cần đối chiếu Petrolimex) |
| Xăng E5 RON 92 | 18.570 đồng/lít | 22/11/2026 | S13 |
| Điện sinh hoạt (5 bậc, chưa VAT) | bậc 1: 1.901 · bậc 2: 2.289 · **bậc 3: 2.894** · bậc 4: 3.456 · bậc 5: 3.844 đồng/kWh | từ 1/11/2026 (QĐ 2892/QĐ-BCT) | S14 |
| Sạc công cộng V-Green (ô tô) | **3.858 đồng/kWh** (đã gồm VAT) | công bố từ 19/3/2024, vẫn là giá niêm yết | S15 |
| Ưu đãi | Xe VinFast mua từ 10/2/2026: sạc miễn phí tại V-Green đến 10/2/2029, tối đa 10 lần/tháng (khách cá nhân) | — | S15 (bài đại lý) `[CẦN XÁC MINH]` |

- Giá xăng biến động mạnh: trong tháng 11/2026, E10 RON95 đã giảm tổng 6.645 đồng/lít qua nhiều kỳ (S13).
- Mức tiêu thụ xe tham chiếu:
  - **Toyota Vios 1.5** (sedan hạng B): khoảng **5,7–6,0 lít/100 km** hỗn hợp, trang thông số tổng hợp (S16) `[CẦN XÁC MINH]` — nên lấy từ nhãn năng lượng chính thức (Thông tư 48/2022/TT-BGTVT) (S17).
  - **VinFast VF 6** (SUV hạng B, điện): **15,64 kWh/100 km** công bố; pin LFP 59,6 kWh (S18, S19). Đánh giá thực tế của người dùng cho số thấp hơn, điều kiện đo không rõ (S20).
  - Hai xe **không cùng phân khúc** (sedan vs SUV) → so sánh chỉ mang tính minh họa; tìm cặp xe cùng cỡ tốt hơn (câu hỏi mở).

### 6. Phép tính cho video `[TÍNH TOÁN]`
1. **1 triệu đồng mua được gì:** 1.000.000 / 19.100 ≈ **52,4 lít E10 RON95** ≈ 52,4 × 31,5 ≈ **1.650 MJ ≈ 458 kWh** năng lượng hóa học.
2. **1 triệu đi đâu (xe xăng, chạy hỗn hợp, theo % của S1):**
   - Nhiệt và tổn hao trong động cơ: **680–720 nghìn**
   - Phụ tải: 40–60 nghìn
   - Hộp số và truyền động: 30–50 nghìn
   - **Tới bánh xe: 180–250 nghìn** (đi phố: 140–200 nghìn; cao tốc: 220–300 nghìn)
3. **Năng lượng cho 100 km:** Vios 6 lít × 8,75 kWh ≈ **52,5 kWh** năng lượng xăng; VF 6 ≈ **15,6 kWh** điện → xe xăng đốt khoảng **3,4 lần** năng lượng cho cùng quãng đường (khác phân khúc, chỉ minh họa).
4. **Tiền cho 100 km:**
   - Vios: 6 × 19.100 ≈ **114.600 đồng**
   - VF 6 sạc nhà giá bậc 3 (chưa VAT, chưa tính tổn hao sạc): 15,64 × 2.894 ≈ **45.300 đồng**
   - VF 6 sạc V-Green: 15,64 × 3.858 ≈ **60.300 đồng**
   - 1 triệu đồng: Vios đi ≈ **870 km**; VF 6 sạc trạm ≈ **1.660 km**; sạc nhà (bậc 3) ≈ **2.200 km**.
   - Lưu ý: số kWh/100 km công bố có thể chưa gồm tổn hao sạc (S3 ước 10%); giá điện nhà còn tùy bậc và VAT.

## Lịch sử (dùng ít, chỉ phục vụ hook)
- Chưa nghiên cứu. Có thể dùng: chu trình Otto 1876; nhưng video 1–3 phút → **không cần phần lịch sử**.

## Ngộ nhận phổ biến & sự thật thú vị (ứng viên hook)
1. **"Đổ 1 triệu xăng là 1 triệu chạy xe."** → Chỉ khoảng 1/5 tới bánh xe; khoảng 7/10 thành nhiệt ngay trong máy (S1) `[TÍNH TOÁN]`.
2. **"Động cơ mới hiệu suất 40%."** → Đúng ở điểm làm việc tốt nhất; trung bình cả chu trình chỉ khoảng 20% (S2, S9).
3. **Ống xả và két nước là "lò sưởi"** đang thải phần lớn tiền xăng ra không khí — hình ảnh mạnh cho hook (S1, S8).
4. **Chờ đèn đỏ vẫn mất tiền:** đi phố, khoảng 6% năng lượng mất khi chạy không tải (S1).
5. **"Xe điện hiệu suất 100%."** → Không: mất khi sạc, ở biến tần, mô-tơ; nhưng tổng vẫn cao hơn nhiều nhờ ít nhiệt thải và có phanh tái sinh (S3).
6. **Phanh là chỗ tiền biến thành nhiệt lần thứ hai** — xe xăng mất hẳn, xe điện thu hồi một phần (S1, S3). Nối với video phanh đĩa (tư liệu `projects/002-phanh-dia`).
7. **"Xe điện chạy bằng than."** → Năm 2025 khoảng 45% điện VN từ than (S11). Câu trả lời đầy đủ cần tính hiệu suất nhà máy điện → câu hỏi mở, đừng né.

### Hình ảnh gợi ý cho hook
- Tờ tiền 1 triệu (hoặc chồng 10 tờ 100 nghìn) chảy vào bình xăng, rồi **cháy/rơi rụng** ở ống xả, két nước, hộp số; chỉ 2 tờ tới bánh xe. → thành phần "đồng hồ tiền" của kênh.
- Ảnh nhiệt (màu đỏ cam) của khoang máy và ống xả.

## Từ khóa tiếng Việt
xe điện hay xe xăng · đi 100km hết bao nhiêu tiền · chi phí xe điện vs xe xăng · hiệu suất động cơ xăng · tiền xăng mỗi tháng · sạc xe điện bao nhiêu tiền · VF6 đi 100km hết bao nhiêu · Vios hao xăng không · phanh tái sinh là gì

## Bảng nguồn
| ID | Nguồn | Ghi chú |
|---|---|---|
| S1 | US DOE/EPA, fueleconomy.gov — *Where the Energy Goes: Gasoline Vehicles* — https://www.fueleconomy.gov/feg/atv.shtml | Số % theo chu trình; ORNL phân tích >100 xe, dữ liệu EPA. Trang không ghi ngày cập nhật. Bản lưu trữ cũ ghi 14–26%. |
| S2 | J. F. Thomas (ORNL), *Drive Cycle Powertrain Efficiencies and Trends Derived from EPA Vehicle Dynamometer Results*, SAE 2014-01-2562 — https://www.osti.gov/biblio/1159471 | Chưa đọc toàn văn; dùng qua tóm tắt |
| S3 | US DOE/EPA, fueleconomy.gov — *Where the Energy Goes: Electric Cars* — https://www.fueleconomy.gov/feg/atv-ev.shtml | Chủ yếu Nissan Leaf 2012; tổn hao sạc theo Argonne |
| S4 | US DOE, *Fact #881: Powertrain Efficiency Improvements, 2005 to 2013* — https://www.energy.gov/node/1104848 | 18,8% → 20,9% |
| S5 | US DOE AFDC, *Fuel Properties Comparison* — https://afdc.energy.gov/fuels/properties | Nhiệt trị xăng 112.114–116.090 Btu/gal |
| S6 | Engineering ToolBox, *Fossil and Alternative Fuels – Energy Content* — https://www.engineeringtoolbox.com/fossil-fuels-energy-content-d_1298.html | 32 MJ/lít (nguồn phụ) |
| S7 | US EIA, Today in Energy (id 18551) — https://www.eia.gov/todayinenergy/detail.php?id=18551 | Ethanol làm giảm năng lượng mỗi gallon khoảng 3% |
| S8 | Payri et al. 2015, *Experimental analysis of the global energy balance in a DI diesel engine* / các nghiên cứu cân bằng năng lượng động cơ đánh lửa — https://riunet.upv.es/handle/10251/64813 ; https://core.ac.uk/download/229272726.pdf | Khí xả là phần nhiệt lớn nhất; cần nguồn giáo trình cho động cơ xăng `[CẦN XÁC MINH]` |
| S9 | Toyota Canada, *Dynamic Force Engines are the New Thermal Efficiency Kings* (2018) — https://www.toyota.ca/en/connect/2018/dynamic-force-engines/ | 40% / 41% hybrid |
| S10 | SAE 2019-01-0249 (EPA lưu bản) — https://www.epa.gov/sites/default/files/2020-08/documents/sae-2019-01-0249.pdf | Bản đồ hiệu suất A25A-FKS đỉnh ~40% |
| S11 | Nhà Đầu Tư, *Cơ cấu nguồn, bài toán cho tăng trưởng kinh tế…* (dẫn báo cáo EVN) — https://nhadautu.vn/co-cau-nguon-bai-toan-cho-tang-truong-kinh-te-va-phat-trien-ben-vung-d107118.html | Than 44,85%, thủy điện 33,25%, tái tạo 12,5%, khí 6,3% sản lượng 2025 `[CẦN XÁC MINH]` với báo cáo gốc EVN |
| S12 | US DOE/EPA, fueleconomy.gov — *All-Electric Vehicles* — https://www.fueleconomy.gov/feg/evtech.shtml | "trên 77%" |
| S13 | Doanh nghiệp Kinh tế Xanh, *Giá xăng dầu hôm nay 22/11/2026* — https://doanhnghiepkinhtexanh.vn/gia-xang-dau-hom-nay-2211-xang-e5-con-18570-donglit-on-dinh-a56311.html ; Doanh nghiệp Hội nhập 23/11/2026 — https://doanhnghiephoinhap.vn/gia-xang-dau-hom-nay-23112026-dau-the-gioi-chiu-ap-luc-giam-vi-du-cung-154878.html | Cần đối chiếu petrolimex.com.vn |
| S14 | SGGP, *Chi tiết giá bán lẻ điện áp dụng từ ngày 1-11-2026* — https://www.sggp.org.vn/chi-tiet-gia-ban-le-dien-ap-dung-tu-ngay-1-11-2026-post880092.html ; EVNSPC CSKH — https://cskh.evnspc.vn/TraCuu/ThongTinGiaDien | QĐ 2892/QĐ-BCT ngày 31/10/2026 |
| S15 | V-Green, *Trạm sạc và tủ đổi pin* — https://vgreen.net/vi/san-pham-dich-vu ; bài đại lý VinFast Sài Gòn về chi phí sạc VF 6 | 3.858 đồng/kWh; ưu đãi sạc miễn phí (nguồn đại lý) |
| S16 | Bonbanh, *Thông số kỹ thuật Toyota Vios 2023/2026* — https://bonbanh.com/thong-so-ky-thuat-xe-toyota-vios-nam-2023 | Trang tổng hợp |
| S17 | Thông tư 48/2022/TT-BGTVT về nhãn năng lượng ô tô | Khung pháp lý; chưa tra được nhãn của Vios |
| S18 | Bonbanh, *Thông số VinFast VF6 Eco 2026* — https://bonbanh.com/chi-tiet-thong-so-ky-thuat-xe-vinfast-vf6-eco-2026-18400 | 15,64 kWh/100 km; 59,6 kWh |
| S19 | electrive, *VinFast unveils new VF 5 and VF 6…* (18/11/2026) — https://electrive.com/2026/11/18/vinfast-unveils-new-vf-5-and-vf-6-with-refreshed-design-improved-range | Pin mới 60 kWh |
| S20 | VnReview, trải nghiệm VF 6 Plus — https://vnreview.vn/threads/trai-nghiem-xe-dien-vinfast-vf-6-plus-lai-hay-tram-sac-chiem-uu-the.48488 | Số đo người dùng, không rõ điều kiện |

## Câu hỏi còn mở
1. **Tách % trong động cơ** (khí xả / nước làm mát / ma sát / bơm) cho động cơ xăng ô tô — cần giáo trình Heywood hoặc bài SAE; hiện chỉ biết "khí xả lớn nhất".
2. **Tỉ lệ năng lượng ở bánh xe** chia cho cản gió / cản lăn / phanh — S1 không cho số.
3. **So sánh "từ giếng tới bánh xe"** (tính cả nhà máy điện than VN, lọc dầu, vận chuyển xăng) — có nên đưa vào video này hay để video riêng?
4. **Cặp xe cùng phân khúc** để so sánh công bằng (ví dụ VF 6 vs một SUV xăng hạng B như Kia Seltos / Toyota Yaris Cross), và lấy số tiêu thụ từ **nhãn năng lượng chính thức**.
5. Giá xăng/điện sẽ đổi trước ngày đăng → quy trình cập nhật số ngay trước khi tạo giọng.
6. Số liệu xe điện của S3 dựa trên một xe đời 2012 → tìm nguồn mới hơn (Argonne/AVTA cho xe đời mới).
