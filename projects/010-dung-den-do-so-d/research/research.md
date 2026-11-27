# Dừng đèn đỏ trên 20 giây: để D hay chuyển N? Bên trong hộp số đang làm gì?

> Trạng thái: **research bản 2 (2026-11-27)**, chưa có kịch bản, chưa qua cổng duyệt nào.
> Bản 2 thay bản 1 trong cùng file. Thay đổi chính: đọc trực tiếp bài Honda về CVT Fit 2008 và giáo trình Toyota Course 273; thêm nguồn Gears Magazine, Kia (AT và DCT), bằng sáng chế Ford; hạ cấp các nguồn chưa đọc được (Bosch, sổ tay ZF, sách hướng dẫn Toyota/Honda) xuống `[CẦN XÁC MINH]`; thêm phần cách kể và storyboard gợi ý.

Câu hỏi trung tâm: **xe động cơ đốt trong dừng đèn đỏ, cần số ở D, chân giữ phanh: bộ phận nào đang làm việc? Sang N thì điều gì đổi?**

Phạm vi chính: **hộp số tự động có biến mô (AT)** và **CVT có biến mô**, là loại phổ biến nhất trên xe phổ thông. CVT dùng ly hợp khởi hành và DCT là cấu tạo khác, chỉ nhắc như ngoại lệ.

---

## 1. Tóm tắt phổ thông (đọc khoảng 30 giây)

Ở đèn đỏ, máy vẫn quay mà bánh xe đứng im. Ở giữa là một khối dầu gọi là biến mô. Một bên quay theo máy, đẩy dầu sang bên kia. Bên kia nối với bánh xe, và chân phanh đang giữ nó. Chỗ trượt là dòng dầu, không phải lá côn. Lá côn vẫn đóng, hai phía cùng đứng yên nên không cọ. Về N, hộp số buông bánh xe ra: máy nhẹ tải, xe hết muốn bò, nhưng đường dốc thì xe trôi. Có xe đời mới tự làm việc này ngay ở D. Nên làm gì, sách hướng dẫn từng xe đã ghi; không có mốc 20 giây chung.

*(Khoảng 110 từ, ~30 giây ở nhịp Tung Dang.)*

---

## 2. Cơ chế kỹ thuật đã kiểm chứng

### 2.1. AT có biến mô — xe dừng, cần số D, chân giữ phanh

Đường truyền lực giản lược: **động cơ → biến mô → hộp số (bánh răng + ly hợp) → bánh xe**, phanh nằm ở bánh xe.

1. **Động cơ quay nửa trước của biến mô (bánh bơm).** Biến mô truyền lực bằng động năng của dầu bị đẩy từ bánh bơm sang bánh tua-bin. Máy quay càng nhanh, lực truyền sang tua-bin càng lớn. [S8]
2. **Nửa sau của biến mô (tua-bin) đứng yên.** Toyota viết: ở tốc độ máy thấp, tua-bin có thể bị giữ đứng yên vì lực của dòng dầu không thắng được lực giữ của một lần đạp phanh nhẹ. [S8] Honda mô tả cùng hiện tượng trên CVT có biến mô của Fit 2008: khi chạy không tải và xe đang có lực bò, các chi tiết quay phía sau tua-bin "dừng hẳn". [S4]
   → **Chỗ trượt là dòng dầu giữa bánh bơm đang quay và tua-bin đứng yên.** Năng lượng ở đây biến thành nhiệt trong dầu. Dầu đi qua biến mô cũng là dầu mang nhiệt ra bộ trao đổi nhiệt ở két nước. [S8]
3. **Trong hộp số, ly hợp số tiến đang đóng.** Trên hộp số Toyota được giáo trình mô tả, ly hợp số tiến (C1) đóng ở mọi số tiến; số 1 của dải D dùng C1 cùng một ly hợp một chiều (F2). [S8] Tên và số lượng ly hợp thay đổi theo từng hộp số; đây chỉ là ví dụ.
4. **Ly hợp đó có đang trượt không?** Ở trạng thái dừng hẳn, phía vào của nó nối với tua-bin (đứng yên, theo bước 2), phía ra nối với bánh xe (đứng yên vì phanh). Hai phía cùng đứng yên thì không có chuyển động tương đối giữa các lá, nên không có ma sát trượt để mòn. **Đây là suy luận từ S4 + S8, chưa có tài liệu nào nói thẳng câu này** → fact-check cần xác nhận hoặc tìm nguồn nói trực tiếp `[CẦN XÁC MINH]`.
   Lưu ý: với hộp số có chức năng neutral idle (mục 2.4), ly hợp lại **được cho trượt có chủ đích**.
5. **Phanh bánh xe giữ xe.** Lực dầu tạo một mô-men xoắn nhỏ; qua tỷ số truyền số 1, nó thành lực đẩy xe bò tới (creep). Má phanh kẹp đĩa phanh để cân lực này. Đĩa không quay nên đây là ma sát tĩnh: má phanh giữ, không mài. Mòn phanh xảy ra khi đĩa đang quay lúc phanh. (Nguyên lý vật lý cơ bản; cần một nguồn trích dẫn được cho fact-check `[CẦN XÁC MINH]`.)
6. **Động cơ chịu thêm một chút tải.** Bằng sáng chế Ford 1982 viết: ở D khi xe đứng, vẫn có một mô-men nhỏ truyền tới bánh xe làm xe muốn bò, và động cơ phải thắng tải đó, phải trả giá bằng hiệu quả nhiên liệu và khí thải. [S9] **Không có con số chung** cho xe hiện nay; không đưa mức tiết kiệm nhiên liệu vào lời đọc.

**Một câu:** ở D khi dừng, máy quay nửa trước biến mô, nửa sau bị giữ đứng yên qua bánh răng và phanh; dầu ở giữa trượt và nóng lên một chút; ly hợp trong hộp số đóng mà không cọ; phanh kẹp đĩa đứng im.

### 2.2. Chuyển từ D sang N

- Ở N, bánh xe và hộp số không còn nối với nhau. [S13] Ly hợp số tiến không còn được cấp áp lực để đóng (theo bảng đóng ly hợp của giáo trình, C1 chỉ đóng ở các số tiến). [S8]
- Hệ quả (suy ra từ cơ chế ở 2.1, cần fact-check diễn đạt):
  - Tua-bin không bị giữ nữa, được dòng dầu kéo quay theo bánh bơm. Chênh tốc độ giữa hai nửa nhỏ đi nên dầu trượt ít hơn, truyền rất ít lực.
  - Không còn lực bò ra bánh xe. Chân phanh không phải ghì lại lực đó.
  - Động cơ bớt tải từ hộp số (cùng logic với S9).
- Cái giá:
  - **Xe trôi tự do kể cả trên dốc rất nhẹ** nếu không đạp phanh hoặc kéo phanh tay. [S13]
  - Khi về lại D, ly hợp số tiến phải đóng lại. Kia khuyên đạp phanh khi chuyển N → D/R để êm, và không chuyển từ N/P sang D/R khi máy đang trên ga-lăng-ti. [S13]
  - Mức mòn của mỗi lần đóng lại ly hợp: **chưa có nguồn**; không khẳng định có hại, cũng không khẳng định vô hại `[CẦN XÁC MINH]`.

### 2.3. CVT

CVT thay tỷ số bằng puli và dây đai/xích. Cách nó "tách" máy khỏi bánh xe lúc dừng phụ thuộc vào **bộ phận khởi hành**, không phải phụ thuộc vào puli. [S3]

- **CVT có biến mô** (phổ biến ngày nay): khi dừng ở D, hoạt động giống AT ở mục 2.1. Honda Fit đời 2 (2008) chuyển từ ly hợp khởi hành sang biến mô. [S4]
- **CVT dùng ly hợp khởi hành** (ví dụ Honda Multimatic S trên Fit đời 1, ly hợp nhiều đĩa ướt điều khiển bằng dầu) [S4, S16]: không có biến mô, nên lực bò phải tạo bằng cách cho ly hợp ướt đóng một phần, tức là trượt có kiểm soát. Hãng điều khiển mức này ra sao khi xe dừng hẳn và giữ phanh: **chưa đọc được tài liệu theo mẫu** `[CẦN XÁC MINH]`. Không gộp chung với CVT biến mô.

### 2.4. Xe tự giảm lực bò khi dừng (neutral idle / creep control)

Một số hộp số tự làm gần giống N dù cần số vẫn ở D, khi xe đứng và bạn giữ phanh. Mỗi hệ thống chỉ đúng cho hộp số đó:

| Hệ thống | Làm gì | Khi nào thôi | Nguồn |
|---|---|---|---|
| Ford, bằng sáng chế 1982 (brake-neutral) | Tách tua-bin khỏi bánh răng khi máy ga-lăng-ti và xe dừng; giữ ly hợp ở mức áp lực sát ngưỡng để đóng lại nhanh khi đạp ga | Đạp ga | [S9] — chứng minh ý tưởng có từ lâu, không chứng minh xe nào đang dùng |
| Honda, CVT biến mô Fit 2008 (creep control) | Giảm khả năng truyền của ly hợp số tiến lúc không tải; tua-bin bắt đầu quay, chênh tốc độ bơm–tua-bin giảm; ma sát lúc không tải giảm 70% | Cảm biến độ dốc thấy xe trên dốc thì tắt, trả lại lực bò bình thường | [S4] |
| Nissan CVT (neutral idle) | Hạ áp ly hợp số tiến xuống "điểm chạm" | Nhả phanh hoặc đạp ga; chỉ trên đường bằng/dốc nhẹ, cần D, phanh đạp, ga 0 | [S11] |
| ZF 8 cấp (8HP) đời 1 (Neutral Idle Control) | Cho ly hợp B trượt có kiểm soát; ly hợp C đóng để sẵn đường truyền, giảm trôi lùi khi khởi hành lên dốc | Trục ra quay, đạp ga hoặc nhả phanh | [S11]; sổ tay ZF [S10] chưa trích được chữ `[CẦN XÁC MINH]` |
| ZF 8HP đời 2 | Một ly hợp mở hẳn khi xe đứng, nên không cần phanh ghì lại lực truyền; lực bò cũng giảm | — | [S14] (báo tin, nguồn thứ cấp) `[CẦN XÁC MINH bằng tài liệu ZF]` |

Hai điều rút ra:
- **"Gần như N" đã được hãng tự làm** trên một số xe, nên trên các xe đó việc người lái tự gạt N mang lại ít khác biệt hơn. Không biết xe có chức năng này hay không thì xem tài liệu xe; không suy ra từ cảm giác.
- **Mỉa mai nhỏ:** ở các hệ thống này, ly hợp lại *trượt có chủ đích*. Gears Magazine (tạp chí ngành sửa hộp số) ghi nhận xe có NIC dùng nhiều trong kẹt xe hay hỏng ly hợp B. [S11] Đây là quan sát của giới sửa chữa, không phải số liệu thống kê; **không đưa vào lời đọc như một sự thật** `[CẦN XÁC MINH]`.

### 2.5. DCT — cấu tạo khác

DCT không có biến mô. Lực bò được tạo bằng ly hợp ma sát. Kia cảnh báo trên xe DCT: giữ xe trên dốc bằng chân ga, hoặc cho xe bò với phanh nhả, có thể làm ly hợp và hộp số quá nhiệt; xe hiện cảnh báo và có thể tạm ngắt ly hợp tới khi nguội. [S12] DCT làm gì khi dừng hẳn và đạp phanh chặt: tùy phần mềm từng mẫu `[CẦN XÁC MINH]`. **Video này không áp dụng kết luận của AT/CVT biến mô cho DCT**; chỉ cần một dòng chữ trên màn hình.

---

## 3. Ma sát ở đâu? — trả lời câu "lá côn có đang mòn không"

| Chỗ | Ở D, xe đứng, giữ phanh (AT/CVT biến mô, không có neutral idle) | Ở N |
|---|---|---|
| Phanh bánh xe | Má kẹp đĩa **đứng yên**: ma sát tĩnh, giữ chứ không mài | Vẫn cần đạp nếu đường dốc; ít lực hơn vì hết lực bò |
| Ly hợp trong hộp số | **Đóng**, hai phía cùng đứng yên → không cọ (suy luận S4+S8, `[CẦN XÁC MINH]`) | **Nhả**, các lá tách, không truyền lực |
| Biến mô | **Có chênh tốc độ**: bơm quay, tua-bin đứng → dầu trượt, sinh nhiệt [S8, S4] | Tua-bin quay theo, chênh tốc độ nhỏ, sinh ít nhiệt hơn (suy luận) |

Kết luận cho câu hỏi: **"trượt" ở D là dầu trượt trong biến mô, không phải lá côn cọ nhau.** Ngoại lệ: CVT dùng ly hợp khởi hành, DCT, và xe có neutral idle (ly hợp được cho trượt nhẹ có kiểm soát).

---

## 4. Cảm giác người lái (tách khỏi cơ chế)

| Cảm giác | Giải thích có thể | Nguồn | Không được suy ra |
|---|---|---|---|
| Phải ghì phanh, chân mỏi khi chờ lâu | Phanh phải cân lực bò; máy quay nhanh hơn thì lực đẩy tua-bin lớn hơn [S8]. Honda ghi lực bò tăng khi máy chạy không tải cao, ví dụ ngay sau khi nổ máy, khi bật điều hòa/sưởi [S15] | S8; S15 `[CẦN XÁC MINH bản đọc trực tiếp]` | Không chứng minh hộp số yếu hay hỏng |
| Xe "gằn", rung nhẹ hơn ở D so với N | Ở D động cơ chịu thêm tải từ biến mô [S9]; rung truyền qua thân xe. Hãng thiết kế creep control/NIC một phần để giảm ma sát lúc không tải [S4] | S9, S4; liên hệ tải ↔ rung cụ thể `[CẦN XÁC MINH]` | Không chứng minh hộp số đang trượt hỏng |
| Có tiếng "cục" nhẹ khi gạt N → D | Ly hợp số tiến đóng lại | S8, S13 | Không tự động là lỗi; giật mạnh bất thường mới cần kiểm tra |
| Xe khác nhau cảm giác khác nhau | Có xe có neutral idle/creep control, có xe không | S4, S11, S14 | Không suy từ một xe ra mọi xe |

Dấu hiệu nên đi kiểm tra (theo tài liệu sửa chữa, không phải do đứng D): đèn cảnh báo nhiệt hộp số, mùi khét, giật mạnh khi vào số, trượt số khi chạy.

---

## 5. Khuyến nghị thao tác: theo sách hướng dẫn từng xe

Tài liệu các hãng **không nói giống nhau**, nên video chỉ đưa nguyên tắc tra cứu:

- Toyota (một số sách hướng dẫn): dừng ở D và đạp phanh; dừng lâu thì về P. [S1] `[CẦN XÁC MINH: chưa đọc trực tiếp được; cần chọn đúng mẫu xe bán ở Việt Nam]`
- Một sách hướng dẫn Honda cũ: dùng N "nếu cần dừng ngắn khi máy nổ", về P trước khi rời xe. [S17] `[CẦN XÁC MINH: chỉ thấy qua đoạn trích tìm kiếm; cần xác định đời xe]` → nếu xác nhận được, đây là ví dụ hay cho ý "mỗi hãng nói một kiểu".
- Honda Brake Hold: giữ xe khi dừng tạm như đèn đỏ. [S6] `[CẦN XÁC MINH: chưa đọc trực tiếp được]`
- Kia: dừng trên dốc thì không giữ xe bằng sức máy, dùng phanh chân hoặc phanh tay. [S13] DCT: tương tự, kèm cảnh báo quá nhiệt ly hợp. [S12]
- Điều chung (có nguồn): **không giữ xe đứng trên dốc bằng chân ga** [S12, S13]; **không đạp ga khi đang giữ phanh ở D** — đó là phép thử chẩn đoán stall test, phải theo dõi nhiệt dầu và thời gian. [S5]

**Không có mốc "20 giây"** trong bất kỳ tài liệu hãng nào đã đọc. Đây là một quy tắc truyền miệng; nếu dùng trong tiêu đề, lời đọc phải nói rõ là chưa thấy nguồn hãng nào nêu mốc này `[CẦN XÁC MINH: tìm thêm trước khi khẳng định "không hãng nào"]`.

---

## 6. Bảng "cách nói đơn giản / cơ chế thật / nguồn"

| Cách nói đơn giản (lời đọc) | Cơ chế thật (chú thích nhỏ hoặc fact-check) | Nguồn |
|---|---|---|
| "Giữa máy và hộp số có một khối dầu." | Biến mô: bánh bơm, tua-bin, stator; truyền mô-men bằng động năng dầu | S8 |
| "Một bên quay theo máy, đẩy dầu sang bên kia." | Bánh bơm gắn với vỏ biến mô, quay theo trục khuỷu | S8 |
| "Bên kia nối với bánh xe, và chân phanh đang giữ nó." | Tua-bin → trục vào → bánh răng → bánh xe; tua-bin đứng yên khi phanh giữ ở tốc độ máy thấp | S8, S4 |
| "Chỗ trượt là dòng dầu." | Chênh tốc độ bơm–tua-bin, tổn thất thành nhiệt trong dầu, dầu được làm mát | S8 |
| "Lá côn trong hộp số vẫn đóng, nhưng không cọ." | Ly hợp số tiến C1 được áp; hai phía cùng đứng yên khi xe dừng | S8; suy luận `[CẦN XÁC MINH]` |
| "Xe muốn nhích tới, phanh phải giữ." | Creep: mô-men dư qua tỷ số truyền thấp | S9, S8 |
| "Máy nổ nhanh hơn thì xe đẩy mạnh hơn." | Mô-men lên tua-bin tăng theo tốc độ máy; không tải cao lúc nguội/bật điều hòa | S8; S15 `[CẦN XÁC MINH]` |
| "Về N, hộp số buông bánh xe ra." | Ly hợp số tiến nhả; bánh xe và hộp số không nối | S13, S8 |
| "Xe sẽ trôi nếu đường dốc." | N không giữ xe; phải phanh | S13 |
| "Có xe tự buông bớt dù bạn vẫn để D." | Neutral idle / creep control: giảm áp hoặc mở một ly hợp khi dừng và đạp phanh | S4, S9, S11, S14 |
| "Hộp số ly hợp kép là chuyện khác." | DCT không có biến mô; bò bằng ly hợp ma sát, có thể quá nhiệt nếu lạm dụng | S12 |
| "Mở sách hướng dẫn xe bạn." | Hãng khác nhau, đời xe khác nhau | S1, S6, S13, S17 |

---

## 7. Ngộ nhận cần tránh

1. **"Đứng D là lá côn đang trượt và mòn."** → Ở AT/CVT biến mô, chỗ trượt là dầu trong biến mô. Ly hợp đóng và không cọ khi xe đứng yên (cần fact-check xác nhận). Ngoại lệ đã nêu ở mục 3.
2. **"Đứng D là phanh đang mòn."** → Đĩa đứng yên; má phanh giữ, không mài.
3. **"Về N luôn tốt hơn / tiết kiệm xăng hơn."** → Có cơ sở là ở D máy chịu thêm tải [S9], nhưng **không có số liệu chung**; nhiều xe đã tự giảm tải [S4, S11, S14]. Không nêu mức tiết kiệm.
4. **"Về N là hại hộp số."** → Không có nguồn cho thấy một lần N → D đúng cách (đạp phanh, máy ga-lăng-ti) gây hại; cũng không có nguồn nói hoàn toàn không làm mòn thêm. Không khẳng định chiều nào.
5. **"Mọi CVT giống nhau."** → CVT biến mô và CVT ly hợp khởi hành khác hẳn chỗ trượt. [S4]
6. **"Quy tắc 20 giây."** → Chưa thấy trong tài liệu hãng.
7. **"Xe gằn hay chân mỏi chứng tỏ hộp số sắp hỏng."** → Là cảm giác, có giải thích bình thường; chẩn đoán cần dấu hiệu khác.
8. **Không nói "N an toàn hơn".** Ở N xe trôi nếu nhả phanh; nếu bị tông từ sau, xe đang ở D hay N đều cần phanh giữ. Không đưa ý an toàn va chạm vào video nếu chưa có nguồn.

---

## 8. Cách kể và hình dung

### Ẩn dụ chính: hai chiếc quạt đối mặt

Đặt hai chiếc quạt đối diện. Quạt A cắm điện, thổi gió vào quạt B không cắm điện. Quạt B quay theo gió.
- **Ở D:** cánh quạt B được nối bằng một sợi dây tới bánh xe, và bạn đang giữ bánh xe. Quạt A vẫn thổi, quạt B đứng im, gió lùa qua kẽ cánh. Không ai cọ vào ai. Chỉ có gió bị "phí".
- **Ở N:** tháo sợi dây. Quạt B quay tự do theo gió. Không còn gì đẩy bánh xe.

Giới hạn của ẩn dụ (ghi trong ghi chú cho người dựng, có thể chèn chú thích nhỏ):
- Biến mô thật kín, đầy dầu, không phải không khí. Dầu nặng hơn không khí nhiều nên lực truyền mạnh hơn nhiều.
- Biến mô có thêm stator để nhân mô-men khi khởi hành. Video này không cần.
- "Sợi dây" thật là bánh răng và ly hợp trong hộp số; ở N là ly hợp nhả ra, không phải đứt một sợi dây.
- Gió "phí" thật ra là nhiệt trong dầu, được làm mát; không suy ra nóng tới mức nào.
- Không dùng ẩn dụ này cho DCT hay CVT ly hợp khởi hành.

### Ẩn dụ phụ cho ly hợp: hai bàn tay ép chặt

Hai bàn tay úp vào nhau ép chặt. Nếu cả hai tay đứng yên thì không có gì mòn, dù ép mạnh tới đâu. Chỉ khi một tay trượt trên tay kia mới có mài. Dùng một nhịp ngắn khi trả lời câu "lá côn có mòn không".

### Quy tắc hình

- Mỗi cảnh một ý. Sơ đồ khối ba ô tối đa: **MÁY — HỘP SỐ — BÁNH XE**, biến mô là một "ô dầu" giữa máy và hộp số.
- Màu trạng thái thống nhất: **quay** = vòng mũi tên chuyển động; **bị giữ** = khóa/đứng yên, màu lạnh; **trượt** = vệt dầu lấp lánh, màu ấm.
- Tên kỹ thuật (bánh bơm, tua-bin, ly hợp C1, neutral idle) chỉ xuất hiện ở chú thích nhỏ góc dưới, không đọc.

---

## 9. Storyboard gợi ý (chưa phải storyboard chính thức)

Video dọc 9:16, ước 75–100 giây. Lời đọc là **lời gợi ý** để thấy nhịp, không phải kịch bản.

| # | Ý chính | Lời đọc gợi ý | Hình và chuyển động | Âm thanh | Chú thích / nguồn trên màn hình |
|---|---|---|---|---|---|
| 1 | Hook: đúng trải nghiệm | "Đèn đỏ còn chín mươi giây. Bạn để D, hay gạt về N?" | Góc nhìn từ ghế lái (minh họa đồ họa, không cần AI video): cột đèn đỏ đếm ngược, tay đặt lên cần số, chân trên bàn phanh. Đồng hồ vòng tua kim rung nhẹ ở ga-lăng-ti | Môi trường: tiếng máy không tải rất nhỏ, tiếng phố xa (nền). Một "tích" nhẹ mỗi giây đếm ngược trong 2–3 giây đầu (nhẹ) | — |
| 2 | Câu hỏi thật | "Câu hỏi đáng hỏi hơn: lúc này, bên trong hộp số đang làm gì?" | Camera xuyên vỏ xe, chuyển thành sơ đồ ba khối MÁY — ô DẦU — HỘP SỐ — BÁNH XE | Một whoosh chuyển cảnh lớn duy nhất của video (vừa) | "Áp dụng: hộp số tự động có biến mô, CVT có biến mô" |
| 3 | Máy quay, bánh đứng | "Máy vẫn quay. Bánh xe đứng im. Vậy ở giữa phải có chỗ cho phép hai thứ khác nhau." | Khối MÁY có vòng mũi tên quay; BÁNH XE có dấu khóa; ô giữa nhấp nháy dấu "?" | Tiếng máy không tải nền tiếp tục | — |
| 4 | Biến mô = hai quạt | "Chỗ đó là một khối dầu. Hình dung hai chiếc quạt đối mặt. Một chiếc quay theo máy, thổi dầu sang chiếc kia." | Ô dầu phóng to: hai quạt cách điệu. Quạt trái quay, dòng hạt dầu chảy sang quạt phải | Tiếng dòng chảy chất lỏng mềm, theo tốc độ dòng hạt (nhẹ) | Chú thích nhỏ: "Biến mô: bánh bơm → tua-bin" [S8] · "Hình minh họa đơn giản hóa" |
| 5 | Ở D, quạt sau bị giữ | "Ở D, chiếc quạt thứ hai nối với bánh xe. Chân phanh của bạn đang giữ nó đứng yên. Dầu vẫn bị thổi qua, và trượt qua kẽ cánh." | Quạt phải dừng, có đường nối kéo về bánh xe và bàn phanh. Hạt dầu đổi màu ấm khi trượt qua cánh đứng yên | Dòng chảy nghe "nghẹn" hơn một chút; không dùng tiếng rít (tránh gợi ý hỏng) | "Tua-bin đứng yên khi phanh giữ ở vòng tua thấp" [S8, S4] |
| 6 | Lá côn không cọ | "Nhiều người lo lá côn trong hộp số đang mòn. Nhưng chúng đang đóng chặt, và cả hai phía đều đứng yên. Đứng yên thì không cọ." | Cắt vào một cụm ly hợp nhỏ trong khối HỘP SỐ: các lá ép sát, không chuyển động. Chèn nhịp ẩn dụ hai bàn tay ép chặt | Một "click" nhẹ khi các lá ép vào (nhẹ) | "Ly hợp số tiến đang đóng" [S8] · "Ngoại lệ: CVT ly hợp khởi hành, DCT, xe có neutral idle" |
| 7 | Phanh không mài | "Phanh cũng vậy. Má phanh đang kẹp một chiếc đĩa không quay. Nó giữ, chứ không mài." | Đĩa phanh đứng yên, má phanh ép vào, mũi tên lực đẩy xe bò tới cân với mũi tên phanh | Không cần tiếng | — |
| 8 | Cái giá thật ở D | "Cái giá thật ở D là: xe luôn muốn nhích tới, máy gánh thêm chút tải, dầu ấm lên một chút. Máy nổ nhanh, như lúc vừa nổ máy hay bật điều hòa, thì xe đẩy mạnh hơn, chân phải ghì hơn." | Mũi tên lực bò to dần khi kim vòng tua nhích lên; chân trên bàn phanh ấn sâu hơn | Tiếng máy không tải nhích cao rất nhẹ theo kim vòng tua | "Lực bò tăng khi vòng tua không tải cao" [S8, S15] |
| 9 | Chuyển sang N | "Gạt về N. Hộp số nhả kết nối với bánh xe. Chiếc quạt thứ hai được thả ra, quay theo dòng dầu." | Đường nối quạt phải → bánh xe tách ra; quạt phải bắt đầu quay theo; dòng hạt dầu đổi lại màu lạnh; mũi tên lực bò biến mất | "Click" tách nhẹ khi ly hợp nhả (nhẹ); dòng chảy trở nên êm | "N: bánh xe và hộp số không nối" [S13] |
| 10 | Cái giá ở N | "Đổi lại, xe không còn bị giữ. Đường hơi dốc là xe trôi. Và khi về D, ly hợp phải đóng lại, nên hãy giữ phanh lúc gạt." | Xe trên mặt đường nghiêng nhẹ bắt đầu trôi khi chân nhả phanh; rồi chân đạp lại; cần số N → D, cụm ly hợp ép lại | "Click" khi ly hợp đóng lại (nhẹ) | "Đạp phanh khi chuyển N → D" [S13] |
| 11 | Xe tự làm hộ | "Có xe đời mới tự làm việc này. Bạn vẫn để D và giữ phanh, hộp số tự buông bớt, rồi đóng lại khi bạn nhả phanh." | Cần số vẫn D; một biểu tượng "tự động" bật lên; đường nối nới lỏng một nửa. Ba logo trừu tượng, không dùng logo hãng thật | Không cần tiếng, hoặc một tick nhẹ | "Ví dụ: creep control (Honda Fit 2008), neutral idle (Nissan CVT, ZF 8 cấp)" [S4, S11, S14] |
| 12 | Kết: không áp một thao tác chung | "Vậy để D hay về N? Ở hai lựa chọn, hộp số đều không bị mài như nhiều người nghĩ. Khác nhau ở chỗ ai giữ xe, và máy gánh bao nhiêu. Còn nên làm gì, sách hướng dẫn xe bạn đã ghi sẵn." | Màn tách đôi D | N với ba biểu tượng: "phanh giữ" / "không giữ"; "có lực bò" / "không"; "máy gánh thêm" / "nhẹ". Cuối cùng: cuốn sổ hướng dẫn mở ra | Nhạc nền nhẹ vào ở câu cuối (nền), tắt dần | "Không giữ xe trên dốc bằng chân ga" [S12, S13] · "DCT và CVT ly hợp khởi hành: xem sách hướng dẫn riêng" |

Ghi chú cho người dựng:
- Chỉ một whoosh (cảnh 2). Các "click" là cue cơ chế, lấy frame từ cùng mốc điều khiển animation ly hợp.
- Tiếng máy không tải là lớp môi trường, giữ ở mức nền, không che lời đọc.
- Không dùng tiếng rít/kim loại cọ ở bất kỳ đâu trong cảnh D: nó sẽ gợi ý đúng ngộ nhận đang muốn sửa.
- Hình xe, đèn đỏ, cabin: đồ họa vector đủ dùng; không cần credits AI video.

---

## 10. Từ khóa tiếng Việt

dừng đèn đỏ để D hay N; dừng đèn đỏ có cần về N không; đứng đèn đỏ về N có hại hộp số không; xe số tự động dừng ở D có mòn côn không; biến mô hoạt động thế nào; xe CVT dừng đèn đỏ về số gì; quy tắc 20 giây đèn đỏ; giữ xe số tự động trên dốc; xe số tự động bị gằn khi dừng; auto hold đèn đỏ.

---

## 11. Bảng nguồn

Cột "Đã đọc" ghi mức kiểm trong bản 2: **trực tiếp** = đã đọc nguyên văn; **tóm tắt** = qua công cụ đọc web nhưng chỉ một phần; **chưa** = chưa đọc được.

| ID | Nguồn | Hỗ trợ | Đã đọc |
|---|---|---|---|
| S1 | Toyota, [Owner's Manual OM04041U – Driving procedures](https://techinfo.toyota.com/t3Portal/document/om-s/OM04041U/pdf/OM04041U.pdf?locale=en&siid=1762169302491&sisuffix=ff); bản HTML cùng loại: [OM04051U ch.4](https://assets.sia.toyota.com/publications/en/om-x/OM04051U/topics/chapter4/ch04se010401.html) | Dừng ở D + phanh; dừng lâu về P | **Chưa** (PDF quá lớn, HTML trả 403); chỉ thấy qua đoạn trích tìm kiếm `[CẦN XÁC MINH]` |
| S2 | Bosch, *Automotive Handbook*, mục biến mô | Nguyên lý biến mô, tổn thất | **Chưa** truy cập; bản 2 không dựa vào nguồn này |
| S3 | Honda Global, [CVT – Honda Technology](https://global.honda/en/tech/CVT/) | Nguyên lý puli–đai | Chưa đọc lại trong bản 2 |
| S4 | Yamaguchi M. và cộng sự, ["Development of CVT for 2008 Model Year FIT"](https://global.honda/en/technical-review/PDF/020-2/20-2_11e.pdf), *Honda R&D Technical Review* Vol. 20 No. 2 ([trang bài](https://global.honda/en/technical-review/papers/10002767/)) | Fit đời 2 chuyển từ ly hợp khởi hành sang biến mô; lúc không tải có lực bò, các chi tiết sau tua-bin dừng hẳn; creep control giảm khả năng truyền ly hợp số tiến, ma sát không tải giảm 70%; trên dốc tắt creep control | **Trực tiếp** (mục Abstract, 5.3.1) |
| S5 | Mitsubishi TechInfo, [Torque Converter Stall Test](https://mitsubishitechinfo.com/data/EL/2014/23/HTML/M123120540039901USA.htm) | Stall test là thao tác chẩn đoán có kiểm soát nhiệt và thời gian | Bản 1; chưa đọc lại `[CẦN XÁC MINH trước fact-check]` |
| S6 | Honda, [Automatic Brake Hold](https://techinfo.honda.com/rjanisis/pubs/QS/AH/ATVA1919WG/enu/GUID-957EDA5B-E217-4D73-B903-02D6EC4E2D39.html) | Brake Hold dùng khi dừng tạm | **Chưa** (lỗi chứng chỉ TLS) `[CẦN XÁC MINH]` |
| S7 | Toyota Technical Training, [AT25 – hydraulic controls](https://jzgte.com/tech/ucf20/Technical%20Articles/Technical%20Articles%20-%20Toyota%20Series%20-%20Automatic%20Transmissions/AT25.pdf) | Hệ thủy lực điều khiển ly hợp/phanh | Chưa đọc lại; bản 2 không dựa vào |
| S8 | Toyota Technical Training, [Automatic Transmission Diagnosis – Course 273, Section 1: Automatic Transmission Basics](https://xsocam.com/downloads/mr2/Toyota%20Technical%20Training/Automatic%20Transmissions/AT21.pdf) | Biến mô truyền bằng động năng dầu; máy nhanh hơn thì mô-men lên tua-bin lớn hơn; tua-bin bị giữ đứng yên bởi phanh nhẹ ở vòng tua thấp; dầu mang nhiệt biến mô ra bộ trao đổi nhiệt; C1 đóng ở mọi số tiến; số 1 dải D dùng C1 + F2 | **Trực tiếp** (mục Torque Converter Components, Lock-Up Operation, Multiplate Clutch, Power Flow) |
| S9 | Rosen S. D., Ross W. D. (Ford Motor Co), [US4526065A – Automatic transmission brake-neutral control circuit](https://patents.google.com/patent/US4526065A/en), nộp 1982, công bố 1985 | Ở D khi xe đứng vẫn có mô-men dư làm xe bò; máy phải thắng tải đó, tốn nhiên liệu và tăng khí thải; giải pháp tách tua-bin khỏi bánh răng khi dừng | **Tóm tắt** (đọc nguyên văn khoảng 40% đầu) |
| S10 | ZF 8HP, [8-Speed Automatic Transmission Diagnosis and Repair – Student Workbook](https://at-manuals.com/wp-content/uploads/2019/zf8hp45_70_55_manual_rebuild.pdf) | Neutral Idle Control | **Chưa** trích được chữ (tài liệu chủ yếu là ảnh) `[CẦN XÁC MINH]` |
| S11 | Keith Clark, ["Transmission Strategies That Save Fuel! Start/Stop and Neutral-Idle Powertrain Management"](https://gearsmagazine.com/magazine/transmission-strategies-that-save-fuel-start-stop-and-neutral-idle-powertrain-management/), *Gears Magazine*, 7/10/2021 | Điều kiện chung của neutral idle; ZF 8HP: trượt ly hợp B, đóng C, thoát khi trục ra quay/đạp ga/nhả phanh, ghi nhận hỏng ly hợp B khi dùng nhiều trong kẹt xe; Nissan CVT: hạ áp ly hợp số tiến tới điểm chạm | **Trực tiếp** — tạp chí ngành sửa chữa, nguồn thứ cấp |
| S12 | Kia Owner's Manual (mã MQ4, 2022, en_GB), [DCT warning messages](https://ownersmanual.kia.com/full_webhelp/MQ4/2022/en_GB/topics/chapter5_8_3.html) | DCT: giữ xe trên dốc bằng ga hoặc cho bò khi nhả phanh có thể làm ly hợp quá nhiệt; ly hợp bị ngắt tới khi nguội | **Trực tiếp** |
| S13 | Kia Owner's Manual (mã BD, 2022, en_GB), [Automatic transmission operation](https://ownersmanual.kia.com/full_webhelp/BD/2022/en_GB/topics/chapter6_5_1.html) | N: bánh xe và hộp số không nối, xe trôi tự do trên dốc nhẹ; đạp phanh khi N → D/R; không chuyển N/P → D/R khi máy trên ga-lăng-ti; không giữ xe trên dốc bằng sức máy | **Trực tiếp** |
| S14 | Jonathan Lee, ["ZF showcases new 8HP 8-speed automatic at Detroit"](https://paultan.org/2015/01/20/zf-showcases-new-8hp-8-speed-automatic-detroit/), paultan.org, 20/1/2015 | 8HP đời 2: ly hợp mở hẳn khi xe đứng, không cần phanh ghì; lực bò giảm. Con số "tiết kiệm tới 3%" là cho cả hộp số, không riêng tính năng này | **Trực tiếp** — báo tin, nguồn thứ cấp `[CẦN XÁC MINH bằng tài liệu ZF]` |
| S15 | Honda Owner's Manual, [NV0606 – Automatic transmission](https://techinfo.honda.com/rjanisis/pubs/om/NV0606/NV0606O00162A.pdf); cùng ý ở sách hướng dẫn CR-V 2012 | Lực bò tăng khi máy không tải cao: ngay sau khi nổ máy, khi dùng điều hòa/sưởi; giữ phanh chặt hoặc dùng brake hold | **Chưa** (lỗi TLS); chỉ thấy đoạn trích tìm kiếm `[CẦN XÁC MINH]` |
| S16 | Okamoto, Terayama, Morimoto, ["Hydraulic Control Technologies with Robust Stability and Performance for CVT Start Clutch"](https://global.honda/en/technical-review/papers/10002701/), *Honda R&D Technical Review* Vol. 19 No. 1, 2007 | Honda có CVT dùng ly hợp khởi hành điều khiển bằng dầu | **Trực tiếp** phần tóm tắt |
| S17 | Honda Owner's Manual [T10101](https://techinfo.honda.com/rjanisis/pubs/om/T10101/T10101O00169A.pdf) | Dùng N khi cần dừng ngắn với máy nổ; về P trước khi rời xe | **Chưa**; chỉ thấy đoạn trích tìm kiếm; chưa rõ mẫu và đời xe `[CẦN XÁC MINH]` |

---

## 12. Câu hỏi còn cần xác minh

1. **Ly hợp đóng mà không cọ khi xe đứng ở D:** tìm một giáo trình hoặc tài liệu hãng nói thẳng (hiện là suy luận từ S4 + S8). Đây là câu quan trọng nhất của video.
2. **Nguồn cho "đĩa phanh đứng yên thì má phanh không mòn"**: cần một tài liệu trích dẫn được (giáo trình phanh, Bosch).
3. **Sách hướng dẫn xe bán tại Việt Nam:** chọn 2–3 mẫu phổ biến (ví dụ một Toyota AT/CVT, một Honda CVT, một Kia/Hyundai AT), đọc bản tiếng Việt đúng đời xe, ghi nguyên văn hướng dẫn khi dừng. Nếu xác nhận S17 (Honda từng ghi dùng N khi dừng ngắn), đó là ví dụ tốt cho ý "hãng nói khác nhau".
4. **Mốc 20 giây:** tìm nguồn gốc quy tắc; xác nhận chưa hãng nào nêu trước khi nói "không có trong sách hướng dẫn".
5. **Neutral idle trên xe ở Việt Nam:** mẫu nào có (Nissan CVT, xe dùng ZF 8HP, Honda…)? Cần tài liệu hãng, không dựa vào diễn đàn.
6. **ZF 8HP:** trích chữ từ tài liệu ZF chính thức cho NIC (đời 1) và ly hợp mở khi đứng (đời 2).
7. **CVT ly hợp khởi hành và DCT khi dừng hẳn, đạp phanh chặt:** ly hợp mở hay vẫn chạm? Theo từng mẫu.
8. **Liên hệ tải ở D ↔ rung "gằn":** cần nguồn kỹ thuật trước khi nói nguyên nhân rung trong lời đọc; hiện chỉ nên nói "máy gánh thêm chút tải".
9. **Mòn do mỗi lần N → D:** chưa có nguồn; giữ trung lập.
10. Không đưa con số nhiệt, độ mòn, mức tiết kiệm nhiên liệu nào vào kịch bản. Con số 70% của S4 là ma sát lúc không tải của một hộp số Honda cụ thể, không phải mức tiết kiệm xăng; nếu dùng, chỉ đặt ở chú thích nhỏ có ghi rõ phạm vi.
