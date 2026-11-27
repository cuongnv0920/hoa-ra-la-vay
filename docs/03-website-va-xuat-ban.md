# Website và quy trình xuất bản

> Chốt 2026-11-27. Trạng thái: **thiết kế, chưa dựng code**. Khi code lệch tài liệu này, hỏi người dùng rồi mới sửa tài liệu.

## 1. Mục tiêu

- Mỗi video có một **bài đọc** trên website. Video nói ngắn; bài đọc giải thích kỹ hơn và ghi **nguồn có đánh số**.
  Đây là điểm khác biệt chính với đối thủ (beernary.dev có bài dài theo từng video nhưng không có mục nguồn).
- Sau Cổng #2, chỉ cần **một lệnh** để đăng bài lên website và Reel lên Facebook. TikTok và YouTube vẫn đăng tay.
- Trang đọc nhanh, đẹp trên điện thoại, chữ tiếng Việt hiển thị chuẩn.

## 2. Công nghệ

| Phần | Chọn | Lý do |
|---|---|---|
| Framework | React Router v7, chế độ framework, `ssr: false` + `prerender` | Cùng React 19 + Vite + TS như NetFleet; xuất HTML tĩnh cho từng bài, tốt cho SEO và tốc độ |
| Host | Cloudflare Pages | Miễn phí, CDN nhanh, tự build khi push |
| Video bản web | Cloudflare R2 | Không mất phí băng thông ra; mp4 bị gitignore nên không đưa lên Git |
| Markdown | unified + remark-gfm + rehype-slug, render lúc build | Không gửi thư viện Markdown xuống trình duyệt |
| Tìm kiếm | Pagefind | Chỉ mục tĩnh lúc build, không cần máy chủ |
| Kiểm tra dữ liệu | zod | Kiểm tra `xuat-ban.json` ở cả lúc build và lúc đăng |
| Test | vitest | Như NetFleet |

`web/` là **package riêng** (có `package.json` và lockfile riêng, không phải npm workspace), để React 19 của website không đụng React 18.3.1 của Remotion.
Không nâng phiên bản Remotion.

## 3. Thư mục

```
web/
  react-router.config.ts      # prerender: slug từ projects/*/xuat-ban.json có trang_thai = duyet-2
  app/
    root.tsx  routes.ts
    routes/      home, loat.$loat, video.$slug, the.$the, tim-kiem, gioi-thieu, cach-kiem-chung, rss.xml, sitemap.xml, 404
    components/  VideoFacade, ShortAnswer, Toc, SourceList, FactCheckBadge, Callout, SeriesRail, VideoCard, ShareBar, ThemeToggle
    lib/         xuat-ban.schema.ts, content.server.ts, markdown.server.ts, seo.ts
    styles/      tokens.css, global.css, prose.css
  public/        favicon.svg, logo.svg, robots.txt, _headers
  scripts/xuat-ban/  index.ts, kiem-tra.ts, video-web.ts, r2.ts, facebook.ts
  tests/
projects/NNN-ten-video/
  xuat-ban.json
  bai-doc/bai-doc-vX.md
  assets/bia/anh-bia-NNN.png, og-NNN.png
```

Cloudflare Pages: root `web/`, lệnh build `npm ci && npm run build`, thư mục ra `build/client`. Bước build đọc `../projects`.

## 4. Manifest `projects/NNN/xuat-ban.json`

```jsonc
{
  "slug": "vi-sao-xe-dien-mon-lop-nhanh",
  "tieu_de": "Vì sao xe điện mòn lốp nhanh hơn?",
  "mo_ta": "≤160 ký tự, dùng cho SEO và ảnh chia sẻ",
  "loat": "o-to", "loat_con": "xang-hay-dien", "tap": 3, "do_kho": 2, "the": ["xe-dien", "lop"],
  "bai_doc": "bai-doc/bai-doc-v1.0.md",
  "kich_ban": "script/script-v1.2.md",
  "factcheck": "script/factcheck-v1.md",
  "video_final": "assets/final/video-009-v1.2-ban-dang.mp4",
  "anh_bia": "assets/bia/anh-bia-009.png",
  "chu_thich_facebook": "script/chu-thich-facebook-v1.2.md",
  "co_canh_ai_that": false,
  "trang_thai": "nhap",          // nhap | duyet-2 — CHỈ NGƯỜI DÙNG sửa
  "duyet": { "ngay": null },     // CHỈ NGƯỜI DÙNG sửa
  "da_dang": { "web": null, "r2": null, "facebook": null, "youtube": null, "tiktok": null }
}
```

- Đường dẫn trong manifest tính từ thư mục dự án.
- `da_dang` do lệnh `xuat-ban` ghi. Link YouTube và TikTok gắn bằng `npm run gan-link -- NNN youtube <url>`.
- Video đã đăng (003, 005, 007, 008) chỉ cần thêm manifest với `da_dang.facebook` là link thật, rồi viết bài đọc sau.

### Quy ước bài đọc
- Khung: câu trả lời ngắn → cơ chế → các lý do → con số và giới hạn → câu hỏi thường gặp → nguồn.
- Trích nguồn bằng chú thích Markdown `[^1]`. Website render chúng thành mục **Nguồn tham khảo** có số thứ tự và link.
- Callout: `> [!luu-y]`, `> [!meo]`.
- Bài đọc có nhiều khẳng định hơn video, nên **phải fact-check bài đọc** trước Cổng #2.
- Dấu nháp `[KIỂM]`, `[CẦN XÁC MINH]` và khối `<!-- ... TRẠNG THÁI: NHÁP ...-->` phải được bỏ trước khi đăng.

## 5. Lệnh xuất bản

Người dùng đặt `trang_thai = "duyet-2"` và ghi `duyet.ngay`, rồi chạy `npm run xuat-ban -- NNN`.

1. **Kiểm tra** (dừng nếu có lỗi):
   - manifest hợp lệ theo schema, và đã ở trạng thái `duyet-2` có ngày duyệt;
   - mọi file mà manifest trỏ tới đều tồn tại;
   - bài đọc không còn dấu nháp;
   - link nguồn trả về 200;
   - có chú thích Facebook.
   Nếu `co_canh_ai_that = true` thì bỏ qua bước đăng Facebook và nhắc người dùng đăng tay để bật nhãn nội dung AI.
2. **Video bản web**: dùng `npx remotion ffmpeg` (có sẵn trong Remotion) nén mp4 720×1280 H.264, `+faststart`, khoảng 3–6 MB, và tạo poster WebP.
3. **R2**: tải lên `video/NNN.mp4` và `poster/NNN.webp`.
4. **Facebook Reel**: gọi `POST /{page-id}/video_reels` theo ba pha start → upload → finish (`video_state=PUBLISHED`, mô tả lấy từ chú thích). Lệnh không đăng lại khi đã có `post_id`.
5. Ghi `da_dang` vào manifest, rồi `git commit` và `git push` riêng file đó. Cloudflare Pages tự build.
6. In chú thích và hashtag để dán khi đăng tay lên TikTok và YouTube.

- `--thu`: chỉ chạy bước 1 và in kế hoạch, không gọi API nào. Claude chỉ được chạy bản này.
- Lệnh chạy ở máy người dùng (vì mp4 ở máy), không chạy trên CI.
- Bí mật trong `.env`: `FB_PAGE_ID`, `FB_PAGE_TOKEN` (token System User của Business Manager), `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET`, `R2_PUBLIC_URL`.
- Quyền Graph API và cách đăng Reels có thể đổi: kiểm lại tài liệu Meta khi dựng bước 4.

## 6. Giao diện

### Nhận diện
Kế thừa `pipeline/remotion/src/theme.js` ("blueprint kỹ thuật + điện ảnh tối").

| Token | Tối (mặc định) | Sáng |
|---|---|---|
| Nền | `#0B1220` + lưới blueprint mờ bằng CSS | `#F6F4EF` |
| Bề mặt | `#101A2E`, `#16213A` | `#FFFFFF`, `#ECE8DF` |
| Chữ / phụ | `#F2F5FA` / `#9AA6B8` | `#121826` / `#4A5568` |
| Nét cơ chế | `#19B5FF` | hạ sáng cho đạt AA |
| Từ khóa | `#FFD23F` / `#FFB000` | hạ sáng cho đạt AA |
| Nhiệt / cảnh báo | `#FF4D1A` | hạ sáng cho đạt AA |

Mặc định theo `prefers-color-scheme`, và có nút đổi chế độ.

### Font
Tự host qua @fontsource, chỉ lấy subset `vietnamese` + `latin`, woff2, `font-display: swap`.
- **Be Vietnam Pro** 500/700: tiêu đề, giao diện.
- **Literata Variable**: thân bài, 18–19px, line-height 1.7, độ rộng dòng khoảng 68ch.
- **JetBrains Mono**: số liệu, nhãn kỹ thuật, số tập.
- Chỉ preload Be Vietnam Pro 700 và Literata. Tổng dung lượng font < 150 KB.

### Trang bài `/video/:slug`
- **Điện thoại**, từ trên xuống:
  - video dọc dạng facade (poster + nút phát; chỉ tải mp4 khi bấm);
  - hộp **Câu trả lời ngắn**;
  - mục lục thu gọn;
  - bài viết.
- **Máy tính**: hai cột, video dọc **dính** ở cột trái, bài viết ở cột phải.
- Cuối bài:
  - huy hiệu **"Đã kiểm chứng · ngày · N nguồn"**, dẫn tới `/cach-kiem-chung`;
  - mục **Nguồn tham khảo**;
  - câu hỏi thường gặp;
  - tập trước/sau trong cùng loạt;
  - link Facebook/TikTok/YouTube và nút chia sẻ.
- Breadcrumb, độ khó, thời gian đọc, thanh tiến độ đọc.

### Trang khác
- **Trang chủ**: tập mới nhất làm hero, các hàng theo loạt, lưới bài mới nhất.
- **Trang loạt**: các tập theo thứ tự xem đề xuất.
- **Trang thẻ**, **trang tìm kiếm**.
- **Giới thiệu** và **Cách chúng tôi kiểm chứng**.

### SEO và chia sẻ
- `lang="vi"`, meta, canonical.
- Ảnh OG `og-NNN.png` 1200×630 dựng bằng Remotion Still `OgNNN` từ `Cover.jsx`.
- JSON-LD `Article`, `VideoObject`, `BreadcrumbList`, `FAQPage`.
- `sitemap.xml`, `rss.xml`.

### Ngân sách tốc độ (Lighthouse mobile)
- LCP < 1.8 s, CLS < 0.05, JS trang bài < 90 KB gzip, điểm ≥ 95.
- Ảnh xử lý bằng sharp lúc build ra AVIF/WebP, có `srcset`.
- Không dùng thư viện UI nặng, chỉ CSS thuần + biến CSS.
- Đo lượt xem bằng Cloudflare Web Analytics (không dùng cookie).

## 7. Công cụ AI

- Skill `bai-doc`: viết bài đọc và nháp manifest (`trang_thai: nhap`) từ kịch bản đã qua Cổng #1, research và fact-check.
- Skill `xuat-ban`: chạy `--thu`, báo kết quả kiểm tra. Lệnh thật do người dùng chạy.
- Agent `site-reviewer` (chỉ đọc): rà UI/UX, khả năng tiếp cận, tương phản, ngân sách tốc độ.
- Hook `.claude/hooks/guard.mjs`:
  - chặn Claude ghi `"trang_thai": "duyet-2"` hoặc sửa khối `duyet`;
  - chặn đọc/sửa `.env`;
  - chặn chạy `xuat-ban` khi không có `--thu`.

## 8. Thứ tự làm

| Bước | Việc | Kiểm tra |
|---|---|---|
| 0 | Cập nhật CLAUDE.md, README, AGENTS.md, docs/00; viết tài liệu này | người dùng duyệt |
| 1 | Dựng `web/`: token, font, layout, trang bài, trang chủ, dữ liệu thật 003 + bài 009 (nháp, chỉ ở dev) | mở trang ở 375px và 1440px |
| 2 | Schema zod, `content.server`, Markdown → nguồn, test | `npm test` trong `web/` |
| 3 | Deploy Cloudflare Pages bản preview; SEO, OG, JSON-LD, sitemap, RSS, Pagefind | Lighthouse mobile ≥ 95; Facebook Sharing Debugger |
| 4 | Lệnh `xuat-ban`: kiểm tra → video web → R2 → Facebook | `--thu`; đăng thật một Reel thử; chạy lại không đăng trùng |
| 5 | Skill `bai-doc`, `xuat-ban`, agent `site-reviewer`, hook guard | Claude ghi `duyet-2` phải bị chặn |
| Sau | Bản tin email, bình luận, API YouTube/TikTok | chỉ làm khi có nhu cầu |

## 9. Việc người dùng cần chuẩn bị

- Tên miền (chưa kiểm tra tên còn trống).
- Tài khoản Cloudflare: Pages nối với repo GitHub, và một bucket R2 có domain công khai.
- Meta Business Manager: app, System User có quyền với Page, token với `pages_manage_posts`, `pages_read_engagement`, `pages_show_list`.
