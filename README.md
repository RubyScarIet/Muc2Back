# Web Mức 2 - Backend (Lab 2TH2)

Đây là Backend nâng cao cho Lab 2TH2, sử dụng Express.js và MongoDB (thông qua Mongoose) để trả về dữ liệu. Phiên bản này chưa có các tính năng đăng nhập/bảo mật.

## Hướng dẫn chạy dự án

**Bước 1:** Cài đặt các thư viện phụ thuộc
```bash
npm install
```

**Bước 2:** Xử lý file cấu hình biến môi trường (.env)
Dự án yêu cầu một file `.env` ở thư mục gốc để chứa thông tin kết nối Database.
- Hiện tại, file `.env` đã được tạo sẵn và đi kèm theo code chứa sẵn đường link MongoDB của bạn. Bạn không cần làm gì thêm nếu tiếp tục dùng Database này.
- Nếu bạn tải về máy chưa có file `.env`, hãy đổi tên file `.env.example` thành `.env` và mở lên.
- Điền đường dẫn kết nối MongoDB của bạn vào biến `DB_URL`.
Ví dụ mẫu đã cấu hình:
`DB_URL=mongodb+srv://nguyentrungtinb23dcvt416_db_user:000569@cuoiki.ofendqh.mongodb.net/photo_sharing?appName=CuoiKi`

**Bước 3:** Nạp dữ liệu mẫu vào DB (Chỉ cần chạy 1 lần duy nhất)
```bash
npm run load-db
```

**Bước 4:** Khởi động máy chủ
```bash
npm start
```
*(Hoặc dùng lệnh `npm run dev` để tự động khởi động lại server khi sửa code).*

## Lưu ý khi chạy trên CodeSandbox
- Khi import vào CodeSandbox, bạn cần cung cấp thông tin biến môi trường.
- Đi tới mục **Server Control Panel** -> **Secret** và thêm 1 secret item với Name là `DB_URL` và Value là URL MongoDB của bạn.
- Sau đó, CodeSandbox sẽ tự động cài gói và chạy `npm start`.
