# tomsuhapbia's Geometry

Blog một trang, giao diện đen trắng, tag theo từng bài, tìm kiếm, giao diện sáng/tối và trình đọc PDF. Không có dữ liệu mẫu. Bài đầu tiên sử dụng nguyên bản PDF Feuerbach–Euler do tác giả cung cấp; logo và favicon được chuyển từ hinh305.pdf.

## Chạy tại máy

Dùng Node.js 22 trở lên:

```sh
npm ci
npm run build
npm run dev
```

Mở địa chỉ do server in ra, mặc định http://127.0.0.1:4173. Có thể đặt biến `PORT` để dùng cổng khác.

## Thêm bài viết và tag

1. Thêm nội dung Markdown vào `dist/posts/` nếu muốn hiển thị nội dung trên trang.
2. Nếu bài có PDF, thêm tài liệu vào `dist/pdf/`.
3. Thêm một đối tượng vào mảng `posts` trong `dist/content.js` gồm `id`, `title`, `author`, `date` theo dạng YYYY-MM-DD và `tags` (mảng chuỗi).
4. `description` là mô tả ngắn; `body` là đường dẫn Markdown; `pdf` là đường dẫn tài liệu. Với PDF, điền `pages`, `bytes` thực tế và `language`.

Tag được tạo tự động từ các bài, không cần khai báo danh mục riêng. Bấm tag trên bài để lọc; bấm **All posts** để xem tất cả. Link có tham số `?tag=...` hoặc `?q=...` giữ lại bộ lọc khi tải lại. Tiêu đề bài có liên kết cố định dạng `#post-id`.

Markdown hỗ trợ công thức `$...$` và `$$...$$`, khối mã có tô cú pháp, và các khối HTML với class `theorem`, `proof`, `note`. Nội dung được lọc bằng DOMPurify trước khi hiển thị.

Đây là blog tĩnh: thêm hoặc chỉnh bài trong các file rồi triển khai lại. Không có trang quản trị hoặc tài khoản đăng nhập.

## Tài liệu và logo gốc

- Bài duy nhất: `dist/pdf/feuerbach-euler-perpendicularity.pdf`, giữ nguyên nội dung file được cung cấp, 7 trang, 873738 byte. Ngày bài viết là 22/08/2026 theo tài liệu.
- `dist/posts/feuerbach-euler-perpendicularity.md` là phần giới thiệu ngắn dựa trên đề bài. Toàn bộ chứng minh và hình nằm trong PDF gốc.
- `dist/assets/hinh305.pdf` là nguồn logo. `logo.png` và `favicon.png` là bản render cho trình duyệt; CSS hiển thị đơn sắc phù hợp hai theme.
- Email và AoPS nằm trong `dist/index.html`.

## Triển khai

Toàn bộ website hoàn chỉnh nằm trong **dist/**, gồm các font và thư viện cục bộ. Không cần backend, API key hay CDN. Phải phục vụ qua HTTP(S), không mở index.html bằng file://.

- **Netlify:** import repository; `netlify.toml` đã khai báo build và thư mục xuất bản. Hoặc tải trực tiếp thư mục dist đã build.
- **Vercel:** import repository; dùng `vercel.json` kèm theo.
- **Cloudflare Pages:** build `npm run build`, output `dist`.
- **GitHub Pages / hosting tĩnh khác:** xuất bản nội dung dist. Đường dẫn tương đối hỗ trợ cả hosting dưới thư mục con.

Repository có sẵn workflow `.github/workflows/pages.yml`. Sau khi push lên GitHub, vào **Settings → Pages → Build and deployment → Source**, chọn **GitHub Actions**. Mỗi lần push nhánh `main`, GitHub sẽ build và xuất bản thư mục `dist` tự động.

Chỉ có một trang blog. Tài liệu mở trong hộp đọc PDF ngay trên trang hoặc tải về. Không cần cấu hình rewrite cho các trang con.

## Kiểm tra

`npm run build` chuẩn bị thư viện, font và giấy phép trong dist/vendor rồi kiểm tra JavaScript, công thức, tài liệu, số byte và đường dẫn. `npm run check` chạy lại phần kiểm tra. Không được để bài hoặc PDF không được tham chiếu trong các thư mục nội dung.

Thư viện được khóa phiên bản bằng package-lock.json. Giấy phép nằm trong `dist/vendor/THIRD_PARTY_NOTICES.txt`. Tìm kiếm và tag chạy tại trình duyệt; localStorage chỉ lưu theme. Không có analytics hay biểu mẫu gửi dữ liệu.
