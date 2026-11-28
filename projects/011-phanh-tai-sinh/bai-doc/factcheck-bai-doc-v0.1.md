# Fact-check bài đọc 011 (bản 0.1)

> Ngày 2026-11-28. Đối tượng: `bai-doc/bai-doc-v0.1.md`. Đối chiếu: `research/research.md` (nguồn S1–S30), `script/factcheck-v3.1.md` (các khẳng định của kịch bản đã kiểm trước đó), và **đọc lại trực tiếp** các trang nguồn trong lượt này.
> Người kiểm không phải người duyệt: bảng này chỉ báo cáo, **không phải duyệt**. Các chỗ ⚠️ đã được sửa trong `bai-doc-v0.1.md` (xem cột cuối) và chờ người dùng xem lại.
> Chú thích trạng thái: ✅ đúng · ⚠️ cần sửa (đã sửa) · ❓ không xác minh được trong lượt này.
> "Đọc lại" = lượt này đọc lại trang gốc. "Theo research" = đã đọc ở lượt trước (research 2026-11-27) và không đọc lại ở đây.

## Khẳng định đã kiểm lại trực tiếp

| # | Khẳng định trong bài đọc | Trạng thái | Nguồn (đọc lại) | Ghi chú / đã sửa |
|---|---|---|---|---|
| 1 | Cùng một máy điện có thể kéo xe hoặc phát điện | ✅ | DOE AFDC *How Do All-Electric Cars Work?*: "Some vehicles use motor generators that perform both the drive and regeneration functions." | Nguồn nói "some vehicles"; bài đọc dùng làm ý nguyên lý, đã có chú thích ở mục "Biến tần" về giới hạn nguồn |
| 2 | Điện tử công suất điều khiển tốc độ, mô-men mô-tơ | ✅ | DOE AFDC (cùng trang): "Power electronics controller … controlling the speed of the electric traction motor and the torque it produces." | Phần "năng lượng thu qua phanh tái sinh" lấy từ báo cáo DOE 2025 (theo research) |
| 3 | Biến tần đổi hai chiều: DC → AC ba pha cho mô-tơ; AC ba pha từ mô-tơ đang làm máy phát → DC cho pin | ✅ | Bằng sáng chế Ford US 11,990,306 (Google Patents): "…bi-directionally transfer energy between traction battery 24 and traction motor 14"; "may convert three-phase AC current from traction motor 14 acting as a generator to DC voltage compatible with traction battery 24" | **Lưu ý nguồn:** tiêu đề bằng sáng chế là "Electrified vehicle traction powertrain module having removably insertable fuse box" (cấp 21/05/2024, đúng ngày ghi). Các câu trích là phần mô tả nền của một module truyền động xe điện, không phải điểm mới của bằng sáng chế. Đã ghi tiêu đề ở mục nguồn để người đọc không hiểu lầm |
| 4 | Phanh tái sinh lấy năng lượng trước khi thành nhiệt (thay cho má phanh) | ✅ | Cùng bằng sáng chế: "Traction motor 14 acting as a generator can recover energy that may normally be lost as heat in a friction braking system" | Chữ "thay cho má phanh" là diễn giải; có ngữ cảnh "friction braking system" |
| 5 | Toyota Việt Nam: nhấc chân ga → phanh tái tạo bắt đầu, vừa làm chậm xe vừa sạc pin; xe không cần trạm sạc | ✅ | Toyota Việt Nam, *Công nghệ Hybrid*, đúng nguyên văn tiếng Việt | Trang nói về hybrid thường (HEV), đúng phạm vi bài đọc |
| 6 | HEV không cắm sạc, nạp bằng động cơ xăng và phanh tái sinh; PHEV nạp được từ nguồn ngoài, động cơ, phanh tái sinh; mô-tơ làm máy phát khi phanh | ✅ | DOE AFDC *HEV*: "An HEV cannot plug in to off-board sources…"; *PHEV*: "…charged by an outside electric power source, by the internal combustion engine, or through regenerative braking" | |
| 7 | Phanh ma sát tự động vào thêm khi cần thêm lực dừng | ✅ | DOE AFDC *Hybrid: Braking* phần 2: "If additional stopping power is needed, conventional friction brakes … are also applied automatically." | |
| 8 | SAE: mục tiêu là chuyển giao giữa regen và phanh ma sát không bị người lái cảm nhận | ✅ | SAE 2010-01-1680, tóm tắt: "the blend between regenerative and friction braking is imperceptible to the driver" | Bài báo về Tata Ace EV; chỉ đọc phần tóm tắt. Bài đọc đã nói "một nghiên cứu", "mục tiêu", không khẳng định mọi xe đạt |
| 9 | Toyota TSB 2023, Highlander Hybrid 2020–2022: một số người lái cảm nhận chuyển từ regen sang phanh thủy lực; xử lý bằng cập nhật phần mềm | ✅ | T-SB-0059-23, 29/08/2023, "Hybrid Regenerative Brake Transition Feeling Improvement": "may be sensitive to the momentary transition from regenerative braking to hydraulic braking … while driving downhill, or turning with light brake pedal application"; "brake actuator control module can be updated" | Đọc lại bằng cách giải nén chữ trong PDF; đúng mã, ngày, mẫu xe. "Cập nhật phần mềm" = lập trình lại mô-đun điều khiển bộ chấp hành phanh |
| 10 | Hyundai (mã NX4PHEV, bản Mỹ): pin đầy → regen bị hạn chế tạm thời để bảo vệ pin, phanh thường dùng bình thường; nhiệt độ cao/thấp và ABS giới hạn regen | ✅ | Sách hướng dẫn NX4PHEV 2026, mục *Regenerative braking system limitations*: "temporarily limited to protect the battery"; "Hydraulic braking using the brake pedal can be used normally."; "high/low temperature"; "while ABS, Cruise Control or Smart Cruise Control is activated" | |
| 11 | Tên mẫu xe của mã NX4PHEV là "Tucson Plug-in Hybrid" và NE1a là "IONIQ 5" | ⚠️ | Hai trang không ghi tên mẫu xe; trang mục lục chỉ trả về chỗ trống | **Đã sửa:** bỏ tên mẫu khỏi phần chú thích nguồn, ghi theo mã sách hướng dẫn (bản Mỹ). Thân bài vốn đã không nêu tên mẫu; chữ "hybrid cắm sạc" dựa vào mã "PHEV" của sách, ghi rõ trong chú thích |
| 12 | Lái một bàn đạp (sách mã NE1a 2026): vừa sạc 100 % thì không làm xe chậm lại cho tới khi dùng bớt pin; phải đạp phanh khi xuống dốc, đường trơn, xe chở nặng | ✅ | "If the battery was recently charged to 100 %, One pedal driving will not slow the vehicle until some of the battery has been used."; danh sách "Depress the brake pedal to stop the vehicle when:" gồm dốc, đường trơn, tải nặng | |
| 13 | Câu bài đọc "…vừa sạc đầy, chế độ lái một bàn đạp sẽ không làm xe chậm lại, **nên người lái phải đạp phanh**" | ⚠️ | Cùng trang | Vế "nên người lái phải đạp phanh" là suy luận, nguồn nói "until some of the battery has been used". **Đã sửa** bỏ vế đó, giữ đúng chữ nguồn |
| 14 | Mức regen 0–3, đổi được theo chế độ lái; không đổi mức được khi đạp phanh, bật Smart Cruise Control, pin đầy liên tục, chế độ SNOW | ✅ | Sách NE1a 2025, *Regenerative Braking System Limitations*: bảng "0 to 1" (SNOW) và "0 to 3" | Trang không nêu cách chỉnh (lẫy); bài đọc không nói cách chỉnh. Đúng |
| 15 | Trời lạnh ảnh hưởng phanh tái sinh, không nêu ngưỡng nhiệt độ | ✅ | fueleconomy.gov *Fuel Economy in Cold Weather*: "…affects the performance of the regenerative braking system on hybrids, plug-in hybrids, and electric vehicles."; trang không có ngưỡng cho regen | |
| 16 | Phanh tái sinh thu lại "một phần"; hệ truyền động điện có tổn hao | ✅ | fueleconomy.gov *Where the Energy Goes: Electric Cars*: "recover some energy that would otherwise be lost in braking"; "some of the vehicle's energy is lost through drivetrain inefficiencies" | Trang có số liệu của một xe (Nissan Leaf 2012); bài đọc **không dùng số nào** |
| 17 | Đi trong phố, dừng nhiều lần thì tận dụng phanh tái sinh tốt hơn | ⚠️ | **Sai nguồn dẫn:** bài đọc dẫn trang AFDC *How Do All-Electric Cars Work?*, nhưng trang đó không có ý này. Ý này có ở fueleconomy.gov *Where the Energy Goes*: "especially in stop-and-go traffic"; "most efficient in city driving"; trên cao tốc "little braking … offers little advantage" | **Đã sửa:** đổi nguồn dẫn sang fueleconomy.gov và nói rõ cả hai vế (phố đông có lợi, cao tốc ít lợi) |
| 18 | Má phanh xe điện thường mòn chậm hơn nhờ phanh tái sinh | ✅ | DOE AFDC *Maintenance and Safety of Electric Vehicles*: "Brake wear is significantly reduced due to regenerative braking" | |
| 19 | "…và vẫn cần bảo dưỡng" (phần hiểu lầm "xe điện không cần má phanh") | ⚠️ | Trang AFDC chỉ nói mòn ít đi; không nói chuyện bảo dưỡng | **Đã sửa:** bỏ cụm "vẫn cần bảo dưỡng", giữ "vẫn có hệ phanh ma sát, mòn chậm hơn đáng kể" |
| 20 | "Điện mô-tơ phát ra là điện xoay chiều" nói chung | ⚠️ | Nguồn đọc được là Toyota hybrid (ba pha) và bằng sáng chế Ford cho xe điện thuần; không có số liệu về mọi xe (research mục 3.3: có thể có xe đời cũ dùng mô-tơ một chiều, chưa có nguồn) | **Đã sửa:** viết "trong các tài liệu kỹ thuật chúng tôi đọc, điện mô-tơ phát ra là điện xoay chiều ba pha", thêm vào chú thích giới hạn đã có |

## Khẳng định lấy theo research (đã đọc ở lượt trước, không đọc lại trong lượt này)

| # | Khẳng định | Trạng thái | Nguồn (theo research) |
|---|---|---|---|
| 21 | Phanh thường: má phanh ép vào đĩa, chuyển động thành nhiệt | ✅ | DOE Module 8 (S6), cùng khẳng định đã ✅ ở `factcheck-v3.1.md` |
| 22 | Biến tần đổi hai chiều ở hybrid Toyota; ECU điều khiển transistor và phanh tái sinh; bộ tăng áp nâng/hạ điện áp | ✅ | Toyota Course 071 (S26, bản lưu SlideShare do người khác tải), ORNL (S27); đã ✅ ở `factcheck-v3.1.md` |
| 23 | ORNL: mô-tơ thứ hai làm máy phát khi phanh tái sinh | ✅ | S27 |
| 24 | DOE 2025: điện tử công suất điều khiển năng lượng thu qua phanh tái sinh | ✅ | S28 (trích chữ tại máy, trang 30–31) |
| 25 | Sách Prius 2007: mô-tơ thành máy phát khi nhả ga/đạp phanh; hai hệ phanh có đèn cảnh báo riêng; lái êm thu hồi tốt hơn | ✅ | S18 |
| 26 | Bảng loại xe (BEV nạp bằng ổ sạc + regen) | ✅ | S13 (DOE); hai dòng HEV, PHEV đã đọc lại (#6) |
| 27 | Ẩn dụ đinamô: đinamô lấy sức từ bánh, bánh nặng hơn khi đạp | ✅ | Vật lý cơ bản; đã ✅ ở `factcheck-v3.1.md`; bài đọc ghi rõ đây là ẩn dụ và giới hạn của nó |

## Điểm cần người duyệt lưu ý (không phải lỗi)

1. **Hai trích dẫn Hyundai** đều là sách hướng dẫn **bản Mỹ**, mã mẫu xe không rõ tên trên trang. Bài đọc không gán cho xe bán ở Việt Nam. Nếu muốn nêu tên mẫu xe và bán tại Việt Nam, cần tài liệu hãng Việt Nam (mục mở số 4 trong research).
2. **Bằng sáng chế Ford** dùng làm nguồn nguyên lý cho xe điện thuần; đây là nguồn hãng nhưng không phải sách kỹ thuật theo mẫu xe.
3. **Toyota Course 071 (S26)** là bản lưu trên SlideShare do người khác tải lên; bài đọc đã ghi chú trong mục nguồn và dẫn kèm ORNL (S27).
4. **Không có con số phần trăm thu hồi** trong bài đọc (quyết định 2026-11-27). Bài đọc nói rõ lý do.
5. Đây là kiểm bằng đọc lại nguồn và nguồn tài liệu của research, **chưa có chuyên gia ngoài** xem lại.

## Kết luận

**Sẵn sàng cho người dùng xem bài đọc (chờ duyệt)**: bảng có 5 mục ⚠️ (#11, #13, #17, #19, #20), tất cả đã được sửa trong `bai-doc-v0.1.md`; không còn ❌ hay ⚠️ chưa xử lý. Không có khẳng định nào bị ❓ trong phần đã kiểm lại. Người dùng cần xem lại các chỗ đã sửa trước khi chuẩn bị `xuat-ban.json`.

## Đồng bộ với kịch bản 3.5 (2026-11-28, sau khi người dùng duyệt 3.5)

Chỉ đổi chữ, không thêm khẳng định mới; không cần kiểm lại độc lập.
- "Ổ điện" → "Nguồn điện bên ngoài (ổ sạc)" ở bảng loại xe (bài đọc) và "từ nguồn điện bên ngoài" (bình luận Facebook): đúng chữ nguồn DOE AFDC *PHEV*, đã đọc lại: "PHEV batteries can be charged by an outside electric power source, by the internal combustion engine, or through regenerative braking."
- "xe chỉnh được mô-tơ hãm mạnh hay nhẹ" → "chỉnh được lực hãm mạnh hay nhẹ": cùng nguồn đã ✅ (#2, #22): DOE điện tử công suất điều khiển tốc độ và mô-men mô-tơ; Toyota ECU điều khiển biến tần và phanh tái sinh.
- Video 3.5 bỏ câu hybrid cắm sạc; bài đọc và bình luận giữ mục này (S9, S14), lệch giữa video và bài đọc là có chủ ý.
- Chú thích Facebook (`chu-thich-facebook-v3.3.md`) không nhắc "ổ điện" hay "cắm sạc" nên giữ nguyên.
