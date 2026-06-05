# Web Mức 2 - Backend (Lab 2TH2)

Đây là Backend nâng cao cho Lab 2TH2, sử dụng Express.js và MongoDB (thông qua Mongoose) để trả về dữ liệu. Phiên bản này chưa có các tính năng đăng nhập/bảo mật.

## Hướng dẫn chạy dự án

**Bước 1:** Cài đặt các thư viện phụ thuộc
```bash
npm install
```

**Bước 2:** Cấu hình Cơ sở dữ liệu (Database)
- Đổi tên file `.env.example` thành `.env`
- Mở file `.env` và điền đường dẫn kết nối MongoDB của bạn vào biến `DB_URL`.
Ví dụ: `DB_URL=mongodb+srv://nguyentrungtinb23dcvt416_db_user:000569@cuoiki.ofendqh.mongodb.net/photo_sharing?appName=CuoiKi`

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
