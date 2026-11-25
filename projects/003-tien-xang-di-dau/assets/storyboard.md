# Storyboard — Video #003 Tiền xăng của bạn đi đâu? (khung dọc)

> Bản nháp 1, 2026-11-23. Đầu vào: kịch bản bản nháp 2 (đã qua fact-check và **Cổng duyệt #1** ngày 2026-11-23). Chưa qua Cổng duyệt #2.
> **Khung 9:16, 1080×1920, 30 fps.** Tổng **02:28.0** (148.0 s), 39 shot, trung bình **3.8 s/shot** (mục tiêu 3–6 s).
> Mốc thời gian là ước tính (~210 từ/phút). Mỗi shot **neo vào một cụm từ trong lời đọc** (cột "Cue") → khi có timestamps từng chữ từ ElevenLabs, thời điểm cắt hình tự khớp giọng thật.

## Tóm tắt loại hình
| Loại | Số shot | Tổng thời lượng |
|---|---|---|
| ANIMATION-CODE | 24 | 88.0s (59%) |
| ĐỒ HỌA | 15 | 60.0s (41%) |
| AI-IMAGE / AI-VIDEO | 0 | 0 — **không dùng Higgsfield** |

## Bố cục khung dọc (cố định cả video)
```
 0 ┌──────────────────────────┐
   │ tên loạt + logo nhỏ       │  header
140├──────────────────────────┤
   │ ĐỒNG HỒ TIỀN              │  số tiền lớn + thanh 10 tờ 100k
360├──────────────────────────┤
   │ TIÊU ĐỀ LỚN (1 từ tô màu) │  đổi theo mỗi shot
560├──────────────────────────┤
   │                          │
   │      HÌNH CHÍNH           │  animation / đồ họa
   │                          │
1320├─────────────────────────┤
   │ phụ đề tô màu từng chữ    │  vị trí cố định
1500├─────────────────────────┤
   │ chú thích nguồn (nhỏ)     │
1570├─────────────────────────┤
   │ (vùng nút Reels/Shorts —  │  không đặt chữ
1920└──────────────────────────┘   chừa 140 px mép phải từ y=900)
```

## Đồng hồ tiền (thành phần chữ ký của kênh)
- **Hình:** số tiền lớn (đếm lên/xuống có hiệu ứng lăn số) + **thanh 10 tờ 100 nghìn** nằm ngang ngay dưới.
- **Màu theo "thủ phạm":** tờ còn lại xanh lá #2BB673 · mất vào nhiệt động cơ đỏ cam #FF4D1A · phụ tải hổ phách #FFB000 · truyền động xám #9AA6B8. Tờ bị mất đổi màu rồi rơi khỏi thanh, để lại ô viền mờ → người xem luôn thấy "đã mất bao nhiêu, vào đâu".
- **Dải ước tính:** khi số liệu là khoảng (ví dụ xe điện 2/3–3/4), tờ ở ranh giới tô sọc thay vì đặc → không giả vờ chính xác hơn nguồn.
- **Chế độ:** XĂNG (nền navy, ngọn lửa) · ĐIỆN (nền xanh đậm, tia sét) · ĐÔI (hai đồng hồ nhỏ song song, dùng ở Cảnh 9).
- Tái dùng cho mọi video dòng "Xe điện vs xe xăng".

## Phụ đề
- Tô màu **từng chữ** theo giọng (chữ đang đọc vàng #FFD23F, đã đọc trắng, sắp đọc trắng mờ). Cần timestamps từng chữ → **ElevenLabs API (gói Starter)**; trong lúc chờ, dùng ước tính theo câu như bản demo.
- Tối đa 2 dòng, cỡ ~54 px, nền bán trong suốt; không bao giờ trùng vùng tiêu đề.

## Thành phần Remotion
- **Tái dùng:** Background, timing (sentenceWindows), Subtitle (nâng lên karaoke), Speedometer → **Gauge** (0–100%), **BrakeDisc** + heatColor (shot 7.3).
- **Mới — dùng lâu dài:** **MoneyMeter**, Headline, Chip, Stamp, SuspectCard, Footnote, CarSilhouette, BatteryColumn, DonutChart, RecapCard, KaraokeSubtitle.
- **Mới — riêng video này:** FuelNozzle, JerryCan, EngineBlock, **CylinderSection** (tay quay–con trượt), Radiator + Fan, ExhaustPipe, Throttle, EfficiencyMap (minh họa), TrafficLight, Airflow, TireContact, Motor, **EVFlow**, RoadStrip, TariffStairs, PowerPlant, HeatParticles, Bill.

## "Thử trước" (theo thứ tự)
1. **Khung mẫu:** dựng 1 khung tĩnh (shot 3.2) đủ bố cục: đồng hồ tiền + tiêu đề + hình + phụ đề + chú thích → bạn duyệt "nhìn và cảm giác" trước khi dựng 40 shot.
2. **Kiểm vùng an toàn:** xem khung mẫu trên điện thoại thật (đè giao diện Reels/Shorts).
3. **CylinderSection:** kiểm động học tay quay–con trượt (piston đổi chiều ở hai điểm chết; trục khuỷu quay đều).
4. **Giọng đọc đủ 11 cảnh:** tạo trên web (gói free, chỉ để dựng thử) hoặc qua API khi có Starter → khớp lại mốc thời gian bằng cue.
5. **Kiểm lại giá** xăng (kỳ 26/11/2026) và giá sạc trước khi tạo giọng chính thức.

## Bảng shot
| Cảnh | Shot | Bắt đầu | Thời lượng | Loại | Cue (lời đọc) | Tiêu đề lớn | Hình | Đồng hồ tiền | Thành phần |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 1.1 | 00:00.0 | 3s | ANIMATION-CODE | «Bạn đổ một triệu…» | **Đổ 1 triệu tiền xăng** | Vòi bơm xăng vẽ nét; mười tờ 100 nghìn (xanh lá) lần lượt chảy vào miệng bình. Đồng hồ tiền trượt xuống từ mép trên. | 0 → 1.000.000 đ (đếm lên) | FuelNozzle, Bill, MoneyMeter |
| 1 | 1.2 | 00:03.0 | 3s | ANIMATION-CODE | «Bao nhiêu trong số đó…» | **Bao nhiêu thật sự đẩy xe đi?** | Mười tờ xếp thành cột giữa khung; dấu "?" lớn nhịp theo câu hỏi. | 1.000.000 đ | Bill, Headline |
| 1 | 1.3 | 00:06.0 | 2s | ANIMATION-CODE | «Khoảng hai trăm nghìn…» | **~200.000 đ** | Tám tờ mờ xám, chỉ hai tờ sáng. Chú thích nhỏ xuất hiện và giữ đến hết video: "ước tính trung bình — DOE/EPA Mỹ". | làm nổi 2 tờ cuối | Bill, Footnote |
| 1 | 1.4 | 00:08.0 | 2s | ĐỒ HỌA | «Tám trăm nghìn còn lại…» | **800.000 đ ĐI ĐÂU?** | Con dấu đỏ nghiêng "800.000 đ ĐI ĐÂU?" đóng xuống; kính lúp lướt qua: "đi tìm thủ phạm". | 1.000.000 đ | Stamp, Icon |
| 2 | 2.1 | 00:10.0 | 4.5s | ĐỒ HỌA | «Theo giá cuối tháng mười một…» | **1 triệu = ~52 lít** | Can xăng đầy dần, bộ đếm 0 → 52 lít. Nhãn giá: "E10 RON95 · 19.100 đ/lít · vùng 1 · Petrolimex, từ 15h 19/11/2026". | 1.000.000 đ | JerryCan, Chip, Counter |
| 2 | 2.2 | 00:14.5 | 4.5s | ANIMATION-CODE | «Năng lượng trong chỗ xăng đó…» | **≈ 450 số điện** | Can xăng biến hình thành cột pin; bộ đếm 0 → ~450 kWh. Nhãn "1 kWh = 1 số điện". | 1.000.000 đ | JerryCan, BatteryColumn, Chip |
| 3 | 3.1 | 00:19.0 | 3s | ĐỒ HỌA | «Nghi phạm đầu tiên…» | **NGHI PHẠM #1** | Thẻ hồ sơ nghi phạm; nắp ca-pô (nét) mở lên. | 1.000.000 đ | SuspectCard, CarSilhouette |
| 3 | 3.2 | 00:22.0 | 2.5s | ANIMATION-CODE | «Chính động cơ…» | **ĐỘNG CƠ** | Khối động cơ vẽ nét; bảy tờ bay vào khối máy. | 1.000.000 → 300.000 đ (7 tờ chuyển đỏ, rơi khỏi thanh) | EngineBlock, Bill, MoneyMeter |
| 3 | 3.3 | 00:24.5 | 2.5s | ANIMATION-CODE | «Không phải để đẩy xe…» | **~700.000 đ → NHIỆT** | Khối máy đổi màu sang đỏ cam (bản đồ nhiệt); sóng nhiệt bốc lên. | 300.000 đ | EngineBlock, HeatMap |
| 4 | 4.1 | 00:27.0 | 5s | ANIMATION-CODE | «Mỗi lần xăng cháy…» | **Khí nóng đẩy piston** | Mặt cắt một xi lanh, dọc khung: tia lửa, khí cháy (đỏ) giãn nở, piston đi xuống, thanh truyền quay trục khuỷu — động học tay quay–con trượt chính xác. | 300.000 đ | CylinderSection |
| 4 | 4.2 | 00:32.0 | 3s | ANIMATION-CODE | «Nhưng phần lớn nhiệt…» | **Phần lớn nhiệt ≠ chuyển động** | Hạt nhiệt (đỏ) trong buồng cháy: chỉ một ít đi theo piston, phần lớn tản ra ngoài. | 300.000 đ | CylinderSection, HeatParticles |
| 4 | 4.3 | 00:35.0 | 3s | ANIMATION-CODE | «Một phần theo khí xả…» | **Lò sưởi #1: ỐNG XẢ** | Xu-páp xả mở; hạt đỏ ùa ra cổ xả, chạy theo ống xả ra sau xe. | 300.000 đ | CylinderSection, ExhaustPipe |
| 4 | 4.4 | 00:38.0 | 4.5s | ANIMATION-CODE | «Một phần ngấm vào thành máy…» | **Lò sưởi #2: KÉT NƯỚC** | Áo nước quanh xi lanh chuyển cam; nước làm mát chảy tới két nước; quạt thổi luồng nóng ra không khí. | 300.000 đ | CylinderSection, Radiator, Fan |
| 4 | 4.5 | 00:42.5 | 3s | ANIMATION-CODE | «Thêm ma sát bên trong…» | **Ma sát · Bơm khí** | Tia ma sát ở xéc-măng; bướm ga khép hờ, mũi tên khí bị "hút qua khe". Hai nhãn nhỏ, không số. | 300.000 đ | CylinderSection, Throttle, Chip |
| 4 | 4.6 | 00:45.5 | 2.5s | ĐỒ HỌA | «Khi máy còn nổ…» | **2 lò sưởi chạy suốt** | Hai biểu tượng lò sưởi nhấp nháy trên bóng xe (ống xả, két nước). | 300.000 đ | CarSilhouette, Icon |
| 5 | 5.1 | 00:48.0 | 5s | ĐỒ HỌA | «Bạn có thể đã nghe…» | **40%?** | Thước đo số 1 "ĐỘNG CƠ · điểm tốt nhất": kim lên 40%. Nhãn nhỏ "động cơ tốt nhất (Toyota 2.5L)". | 300.000 đ | Gauge (từ Speedometer) |
| 5 | 5.2 | 00:53.0 | 3s | ANIMATION-CODE | «Nhưng chỉ ở điểm làm việc tốt nhất…» | **Chỉ ở 1 điểm** | Bản đồ hiệu suất dạng đường đồng mức (vòng tua × tải), một chấm sáng ở vùng tốt nhất. Ghi "minh họa" (hình dạng đường đồng mức không theo số liệu xe cụ thể). | 300.000 đ | EfficiencyMap |
| 5 | 5.3 | 00:56.0 | 4.5s | ANIMATION-CODE | «Đi phố, xe chạy nhẹ tải…» | **Đi phố · đèn đỏ** | Đèn đỏ; bóng xe đứng yên, ống xả vẫn phả khói; chấm trên bản đồ hiệu suất trôi về vùng tải thấp. | 300.000 đ | TrafficLight, CarSilhouette, EfficiencyMap |
| 5 | 5.4 | 01:00.5 | 5.5s | ĐỒ HỌA | «Tính trung bình cả quãng đường…» | **Thực tế: ~20% tới bánh xe** | Thước đo số 2 **tách riêng** "TỚI BÁNH XE · trung bình cả chu trình": ~20%. Chú thích "DOE/EPA Mỹ: 20,9% (xe đời 2013)". Không dùng chung kim với thước số 1. | 300.000 đ | Gauge, Footnote |
| 6 | 6.1 | 01:06.0 | 4.5s | ANIMATION-CODE | «Nghi phạm thứ hai…» | **NGHI PHẠM #2: PHỤ TẢI** | Thẻ nghi phạm; biểu tượng máy phát, điều hòa, bơm; nửa tờ tiền (vàng hổ phách) bị hút đi. | 300.000 → ~250.000 đ | SuspectCard, Icon, Bill, MoneyMeter |
| 6 | 6.2 | 01:10.5 | 4.5s | ANIMATION-CODE | «Rồi hộp số…» | **NGHI PHẠM #3: TRUYỀN ĐỘNG** | Thẻ nghi phạm; bánh răng hộp số và trục quay; nửa tờ (xám) bị hút. Tổng kết nhỏ "+~100.000 đ". | ~250.000 → ~200.000 đ | SuspectCard, Icon, Bill, MoneyMeter |
| 7 | 7.1 | 01:15.0 | 3.5s | ANIMATION-CODE | «Chỉ khoảng hai trăm nghìn…» | **~200.000 đ tới bánh xe** | Hai tờ còn lại chạy dọc trục truyền tới bánh xe. | ~200.000 đ | Bill, CarSilhouette |
| 7 | 7.2 | 01:18.5 | 6s | ANIMATION-CODE | «Vào sức cản của gió…» | **Gió · Lốp** | Đường dòng khí ôm quanh bóng xe; cận cảnh vết tiếp xúc lốp bị ép xuống mặt đường. Không gắn số tiền cho từng ngả (nguồn không có tỉ lệ). | ~200.000 đ | CarSilhouette, Airflow, TireContact |
| 7 | 7.3 | 01:24.5 | 2.5s | ANIMATION-CODE | «Và vào bộ phanh…» | **Phanh → nhiệt** | Đĩa phanh đỏ rực dần (tái dùng BrakeDisc, heat 0 → 0,8). | ~200.000 đ | BrakeDisc (có sẵn) |
| 7 | 7.4 | 01:27.0 | 3s | ĐỒ HỌA | «Nếu chỉ đi phố…» | **Đi phố: 140–200 nghìn** | Thẻ phụ cạnh đồng hồ tiền; thanh tiền co lại thành dải 140–200 nghìn (vùng tô mờ). | ~200.000 đ (dải 140–200k khi đi phố) | Chip, MoneyMeter |
| 8 | 8.1 | 01:30.0 | 3s | ĐỒ HỌA | «Thế còn xe điện?…» | **Còn XE ĐIỆN?** | Lau màn hình sang bảng màu xanh (chế độ điện). Đồng hồ tiền đặt lại 1.000.000 đ "tiền điện". | chế độ ĐIỆN: 1.000.000 đ | Wipe, MoneyMeter |
| 8 | 8.2 | 01:33.0 | 2s | ANIMATION-CODE | «Mô-tơ điện không phải đốt gì…» | **Không đốt gì** | Mô-tơ điện vẽ nét, màu lạnh; dấu gạch qua biểu tượng ngọn lửa. | 1.000.000 đ | Motor, Icon |
| 8 | 8.3 | 01:35.0 | 5s | ANIMATION-CODE | «Từ ổ cắm tới bánh xe…» | **~2/3–3/4 tới bánh xe** | Dòng chấm xanh: ổ cắm → pin → biến tần → mô-tơ → bánh xe; ba nhánh nhỏ rơi ra (sạc, truyền động điện, phụ tải). Thanh tiền còn 6,5–7,5 tờ (tờ thứ 7 tô sọc = dải). | 1.000.000 → ~650.000–750.000 đ | EVFlow, Bill, MoneyMeter |
| 8 | 8.4 | 01:40.0 | 6s | ANIMATION-CODE | «Và khi phanh…» | **Phanh tái sinh** | Bánh xe và mô-tơ **vẫn quay cùng chiều** (mũi tên chiều quay giữ nguyên); chỉ dòng chấm xanh đảo hướng, chạy từ bánh xe về pin. Nhãn "regenerative braking". | + một phần quay về (không ghi số) | EVFlow, Motor |
| 9 | 9.1 | 01:46.0 | 4s | ĐỒ HỌA | «Cùng một trăm cây số…» | **100 km** | Hai làn đường dọc song song, cột mốc 0 → 100 km; sedan xăng (trái) và SUV điện (phải) vẽ nét. | ẩn (nhường chỗ cho 2 đồng hồ ở 9.3) | RoadStrip, CarSilhouette |
| 9 | 9.2 | 01:50.0 | 6s | ĐỒ HỌA | «Một chiếc sedan xăng cỡ nhỏ…» | **~50 vs 16–20 số điện** | Hai cột năng lượng: ~50 kWh và 16–20 kWh (vùng tô mờ). Chú thích: "Toyota Vios 1.5 (5,7 L/100 km) · VinFast VF 6 (15,64 kWh công bố VN – 19,5 theo ADAC) · khác phân khúc, chỉ minh họa". | — | BatteryColumn, Footnote |
| 9 | 9.3 | 01:56.0 | 6s | ĐỒ HỌA | «Quy ra tiền…» | **~110k vs 60–75k** | Hai đồng hồ tiền nhỏ chạy song song theo km: xăng → ~110.000 đ; sạc trạm → 60.000–75.000 đ. Chú thích giá: "xăng 19.100 đ/L (19/11/2026) · V-Green 3.858 đ/kWh gồm VAT". | chế độ đôi: XĂNG | ĐIỆN | MoneyMeter ×2, Footnote |
| 9 | 9.4 | 02:02.0 | 5s | ANIMATION-CODE | «Còn sạc ở nhà…» | **Sạc nhà: tùy bậc điện** | Cầu thang 5 bậc giá điện (1.901 → 3.844 đ/kWh, chưa VAT, từ 1/11/2026); kim công tơ nhà leo lên bậc cao hơn khi cộng thêm điện sạc xe; dấu "?". | — | TariffStairs, Chip |
| 10 | 10.1 | 02:07.0 | 3.5s | ĐỒ HỌA | «Nhưng khoan…» | **NHƯNG KHOAN** | Hình đứng hình nửa giây; con dấu "NHƯNG KHOAN"; dây cắm kéo dài lên trên khung. | — | Stamp, EVFlow |
| 10 | 10.2 | 02:10.5 | 4.5s | ĐỒ HỌA | «Năm hai nghìn không trăm hai mươi lăm…» | **Gần 1/2 điện từ than** | Biểu đồ vành khuyên: than ~45–48% (tùy nguồn), thủy điện ~33%, tái tạo ~13%, khí ~6% · "2025, EVN". | — | DonutChart, Footnote |
| 10 | 10.3 | 02:15.0 | 2.5s | ANIMATION-CODE | «Nhà máy điện cũng thải nhiệt…» | **Nhà máy cũng thải nhiệt** | Nhà máy nhiệt điện vẽ nét; sóng nhiệt bốc khỏi ống khói/tháp. Không ghi số hiệu suất (chưa có nguồn). | — | PowerPlant, HeatParticles |
| 10 | 10.4 | 02:17.5 | 2.5s | ĐỒ HỌA | «Vậy xe điện có thật sạch hơn?…» | **Sạch hơn?** | Dấu "?" lớn; nhãn "TẬP SAU". | — | Headline, Chip |
| 11 | 11.1 | 02:20.0 | 5s | ĐỒ HỌA | «Lần tới đổ xăng…» | **5 đồng → 1 đồng** | Thẻ tóm tắt 3 dòng: "1.000.000 đ xăng → ~200.000 đ tới bánh xe" · "~700.000 đ thành nhiệt trong máy" · "Xe điện: ~2/3–3/4 tới bánh xe + phanh tái sinh" · chú thích DOE/EPA Mỹ. | xăng: ~200.000 đ | RecapCard |
| 11 | 11.2 | 02:25.0 | 3s | ANIMATION-CODE | «Phần còn lại…» | **Sưởi ấm bầu trời** | Bốn tờ tiền đỏ bốc lên như sóng nhiệt, tan vào bầu trời; chip "Theo dõi kênh". | — | Bill, HeatParticles, Chip |

## Quy tắc chính xác trên hình
- Không gắn số tiền cho gió / lốp / phanh (nguồn không có tỉ lệ) — chỉ biểu tượng.
- Không ghi tỉ lệ giữa ống xả và két nước (chưa có nguồn).
- Bản đồ hiệu suất (5.2–5.3) ghi rõ "minh họa".
- Thước 40% và thước 20% là **hai thước riêng** (khác loại hiệu suất — factcheck #14).
- Phanh tái sinh: chiều quay bánh xe/mô-tơ **không đổi**, chỉ dòng năng lượng đảo (factcheck #21).
- Không dùng logo hãng xe; tên xe chỉ xuất hiện trong chú thích nguồn.

## Việc cần bạn quyết
1. Duyệt **khung mẫu** (thử trước #1) trước khi dựng toàn bộ.
2. Giọng chính thức: nâng **ElevenLabs Starter** (giọng dùng thương mại + phụ đề khớp từng chữ) hay tạm dựng bằng giọng gói free.
3. Tên loạt hiện ở header (ví dụ "XĂNG hay ĐIỆN?") và tên kênh — vẫn chờ chốt brand.
