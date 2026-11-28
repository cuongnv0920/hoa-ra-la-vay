# Hóa Ra Là Vậy — hướng dẫn chính cho Claude Code

Đây là hướng dẫn làm việc chính của Claude trong repo. Khi tài liệu dự án khác ghi thông tin cũ hoặc mâu thuẫn, ưu tiên hướng dẫn này và quyết định mới nhất của người dùng; sau đó đề xuất cập nhật tài liệu lỗi thời. Không tự khôi phục quyết định cũ từ ghi chú lịch sử.

## Kênh và nội dung

- Kênh tiếng Việt, giải thích nghiêm túc những điều quanh ta bằng cơ chế bên trong. Mỗi video trả lời **một câu hỏi**.
- Các loạt hiện tại: ô tô (bộ phận; xe điện so với xe xăng/dầu), công nghệ thông tin, xây dựng và kiến thức đời sống.
- Video dọc 9:16, 1080×1920; dài 1–3 phút. Kịch bản viết để nghe: câu ngắn, mỗi câu một ý, giải thích thuật ngữ, không dồn số liệu.
- Giai đoạn hiện tại: giọng Tung Dang + hình minh họa; không có người dẫn. Xem `brand/README.md`.
- Cơ chế kỹ thuật phải được minh họa bằng animation lập trình (Remotion/Three.js). AI video chỉ dùng cho cảnh điện ảnh, lịch sử hoặc cảm xúc.

## Giọng đọc và nhịp (chốt 2026-11-28, theo video 011 bản 3.5)

- Quy chuẩn đầy đủ: `brand/nhip-doc.md`. Đọc trước khi viết kịch bản, tạo giọng hoặc dựng dòng thời gian.
- Câu ngắn (đích 4–7 âm tiết); giọng Tung Dang bằng `eleven_turbo_v2_5`, thu cả bài một lần, rút nghỉ giữa câu rồi chậm 5%; nghỉ giữa cảnh 0,3 s.
- Tạo và đo giọng bằng `pipeline/giong.js` (`doc` → `cat` → `do`). Người dùng nghe để chốt.

## Độ chính xác và duyệt

- Mọi khẳng định kỹ thuật/lịch sử cần nguồn và fact-check.
- Có hai cổng duyệt của người: #1 sau fact-check kịch bản; #2 trước khi đăng. Không tự đánh dấu đã duyệt (không ghi `"trang_thai": "duyet-2"` hay khối `duyet` trong `xuat-ban.json`).
- Đăng tự động (chốt 2026-11-27): sau Cổng #2, **người dùng** chạy `npm run xuat-ban -- NNN` để đăng bài lên website và Reel lên Facebook. Claude chỉ được chạy bản thử `--thu`, không tự chạy lệnh đăng thật. TikTok và YouTube vẫn đăng thủ công. Chi tiết: `docs/03-website-va-xuat-ban.md`.
- Chỉ sửa bản đã qua duyệt khi người dùng yêu cầu. Bản mới phải ghi rõ trạng thái, không ghi đè bản cũ.
- Kiểm tra lại giá, chính sách và dữ liệu có thể đổi ngay trước khi tạo giọng hoặc đăng.
- Làm ít nhưng có góc nhìn riêng; tiết kiệm credits, chỉ tạo asset sau khi storyboard được duyệt.

## Công cụ và cách làm hiện tại

- Claude Code là coding agent chính để sửa mã và tài liệu trong repo; không cần chia nhiều agent theo mặc định.
- Remotion đang được dựng và render tại chỗ trong `pipeline/remotion/`.
- Giọng đọc được tạo bằng `pipeline/giong.js` (chuẩn từ video 011; `pipeline/tts.js` là công cụ của các video trước), gọi ElevenLabs API từ máy của người dùng; không cần MCP ElevenLabs cho luồng này.
- MCP chỉ là cầu nối để agent gọi trực tiếp một dịch vụ. Chỉ đề xuất hoặc dùng MCP khi có tác vụ cần thao tác dịch vụ đó; không thêm MCP, workflow tự động hoặc dịch vụ mới chỉ vì chúng tồn tại.
- Skill là hướng dẫn tái sử dụng; prompt là yêu cầu cho một việc cụ thể; workflow là thứ tự các bước sản xuất. Các skill nội dung của kênh nằm trong `.claude/skills/` và `.agents/skills/`.
- Trước khi thêm thư viện hoặc lấy template bên ngoài, xác định vấn đề cụ thể, kiểm tra tương thích với Remotion hiện tại và chỉ lấy phần cần thiết.

## Quy trình làm video

`research → script → fact-check → [DUYỆT #1] → storyboard → tạo asset/giọng → dựng Remotion → xem và sửa → QA → bài đọc + fact-check bài đọc → [DUYỆT #2] → npm run xuat-ban (website + Facebook) → đăng thủ công TikTok/YouTube`

Website công khai của kênh (`web/`) là nơi đăng bài đọc kèm từng video, không phải website điều phối sản xuất. Các bước sản xuất vẫn làm thủ công có hỗ trợ; chỉ tự động hóa bước đăng sau Cổng #2.

## Thiết kế âm thanh cho animation (chốt 2026-11-26)

Animation Remotion có âm thanh đi kèm: ngắn, tinh tế, khớp với hành động nhìn thấy (ví dụ “click” khi một chi tiết bật vào vị trí, “whoosh” khi chuyển cảnh lớn, tiếng máy hoặc dòng chảy khi minh họa cơ chế). Mục tiêu là giúp người xem cảm nhận chuyển động và hiểu cơ chế, không phải lấp đầy video bằng tiếng.

- **Không bắt buộc mọi chuyển động có tiếng.** Chỉ thêm khi âm thanh giúp cảm nhận hành động hoặc hiểu cơ chế rõ hơn.
- **Giọng Tung Dang luôn rõ và nổi bật.** Hiệu ứng ngắn, sạch, tiết chế; không che chữ quan trọng của lời đọc. Nghe không rõ lời thì hạ, dời hoặc bỏ hiệu ứng, không tăng giọng để bù.
- **Ba lớp tách riêng** ngoài giọng đọc: hiệu ứng chuyển động, âm thanh môi trường, nhạc nền. Mỗi lớp là component/`<Sequence>` riêng, chỉnh hoặc tắt được độc lập; không trộn sẵn vào file giọng.
- **Storyboard ghi cue âm thanh** theo bảng trong skill `storyboarder`.
- **Nguồn rõ ràng:** chỉ dùng file có quyền sử dụng rõ (cho phép đăng mạng xã hội và dùng thương mại) hoặc asset tự tạo. Mỗi file có một dòng trong `projects/NNN-ten-video/assets/audio/NGUON-AM-THANH.md`: tên file, lớp, nguồn (URL hoặc lệnh/công cụ đã tạo), tác giả, giấy phép, yêu cầu ghi công, ngày lấy. File `.mp3`/`.wav` bị `.gitignore`, nên sổ này phải được giữ trong git.
- **Chưa có asset phù hợp:** ghi rõ cần tìm hoặc tạo âm thanh gì; không lấy file không rõ nguồn. Tạo âm thanh bằng dịch vụ tốn credits thì theo cùng quy tắc với asset khác (sau khi storyboard được duyệt).
- **Khi dựng:** frame của cue lấy từ cùng mốc điều khiển animation (hằng số, `T(id)`, `at(cảnh, cụm)`), không gõ tay giây ước tính, để đổi giọng hay đổi nhịp thì tiếng vẫn khớp hình. Kiểm âm lượng, điểm vào/ra (fade ngắn, không lụp bụp, không cụt đuôi) và nghe lại cùng giọng đọc.
- **Nghe là việc của người.** Claude đo được mức âm và soát mốc frame nhưng không nghe được; không ghi “đã nghe, đạt” khi người dùng chưa nghe.
- Áp dụng cho video dựng từ nay. Không thêm âm thanh vào video đã qua duyệt (gồm bản 003 đã đăng) nếu người dùng chưa yêu cầu; khi có yêu cầu thì làm thành bản mới.

Thư mục (tạo khi cần, nằm trong `--public-dir` của video):

```
projects/NNN-ten-video/assets/audio/
  giong/              # giọng đọc (pipeline/giong.js); bản dựng ở giong/cat/
  sfx/                # hiệu ứng chuyển động
  moi-truong/         # âm thanh môi trường
  nhac/               # nhạc nền
  NGUON-AM-THANH.md   # nguồn và giấy phép từng file
```

## Trạng thái và thứ tự video ô tô

- Video mở đầu **“Tiền xăng của bạn đi đâu?”** (`projects/003-tien-xang-di-dau/`) **đã đăng ngày 2026-11-25** dạng Thước phim trên trang Facebook của kênh. Bản đăng là 3.2: `script/script-v3.2.md` (đã qua Cổng #1 và #2, fact-check ở `script/factcheck-v3.md`), composition `Video003V32Dang`, giọng Tung Dang bằng `eleven_v4`, speed 0.90.
- Còn theo dõi: kiểm lại giá xăng sau kỳ điều hành 26/11/2026 và giá sạc (video nói chi phí xe điện thường thấp hơn). Các bản 1, 2, 3, 3.1 giữ làm lịch sử, không sửa.
- `projects/002-phanh-dia/` là kho tư liệu, chưa chọn làm video đăng đầu.
- `projects/001-hop-so-tu-dong/` tạm hoãn đến sau các video nền về ly hợp, hộp số sàn và vi sai.
- Số thư mục là thứ tự tạo dự án, không phải thứ tự đăng.

## Cấu trúc repo

- `projects/NNN-ten-video/`: research, script, assets của từng video; `bai-doc/` (bài đọc cho website) và `xuat-ban.json` (manifest đăng bài).
- `web/`: website công khai (React Router v7 prerender, Cloudflare Pages) và lệnh `xuat-ban`. Package riêng, không dùng chung `node_modules` với Remotion.
- `pipeline/remotion/`: mã composition và thành phần dựng video.
- `pipeline/giong.js`: tạo, cắt nghỉ, đo nhịp giọng theo `brand/nhip-doc.md`.
- `pipeline/tts.js`: tạo giọng từng cảnh, dùng cho các video trước 011.
- `.claude/skills/`, `.agents/skills/`: hướng dẫn cho các công việc nội dung.
- `brand/`: giọng đọc và nhận diện; `docs/`: kế hoạch và ghi chú.

## Tài liệu tham chiếu

- Tóm tắt hiện hành: `README.md`.
- Kế hoạch và trạng thái dự án: `docs/00-ke-hoach-tong-the.md`.
- Dòng xe điện và xe xăng/dầu: `docs/02-dong-xe-dien-vs-xe-xang.md`.
- Website và quy trình xuất bản: `docs/03-website-va-xuat-ban.md`.
- Hướng dẫn của từng skill phải được đọc khi thực hiện đúng công việc đó.

## Skill Remotion (từ remotion-dev/skills)

- Đã cài 4 skill chính chủ vào `.claude/skills/`: `remotion-studio`, `remotion-render`, `remotion-captions`, `remotion-docs` (nguồn ghi trong `skills-lock.json`). Không cài thêm skill Remotion khác (`remotion-best-practices`, `remotion-create`, `remotion-interactivity`, `remotion-upgrade`…) khi chưa được yêu cầu; nếu skill đã cài nhắc tới chúng thì bỏ qua.
- Dùng lệnh của dự án thay cho lệnh mẫu trong skill; luôn ghi file gốc và thư mục tài sản của đúng video:
  - Preview: `npx remotion studio pipeline/remotion/index.jsx --public-dir=projects/<NNN-ten-video>/assets`
  - Render: `npx remotion render pipeline/remotion/index.jsx <ID> <đường-dẫn-ra>.mp4 --public-dir=projects/<NNN-ten-video>/assets`
  - Soát nhanh vài khung hình: thêm `--frames=0,300,900 --image-format=png` và cho đường dẫn ra là một thư mục.
- Chỉ render khi người dùng yêu cầu rõ. Quy ước dự án được ưu tiên hơn skill: giữ JSX; giữ dòng thời gian sinh từ `script.json`/`storyboard.json`; giữ bố cục dọc và vùng an toàn trong `pipeline/remotion/src/vertical/layout.js`; không tái cấu trúc mã để chỉnh trong Studio; không nâng phiên bản Remotion.
- Phụ đề: dùng kiểu `Caption` của `@remotion/captions`, lấy mốc thời gian từ ElevenLabs (`with-timestamps`); không chép lời bằng Whisper, không cài thành phần `BasicCaptions`. Chỉ thêm gói `@remotion/captions` (đúng bản Remotion đang dùng) khi người dùng yêu cầu.
