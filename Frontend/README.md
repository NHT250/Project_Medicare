# Medicare Authentication System

Trang đăng nhập và đăng ký cho hệ thống Medicare với tích hợp CAPTCHA bảo mật.

## 🚀 Tính năng

- **Đăng nhập**: Form đăng nhập với validation email và mật khẩu
- **Đăng ký**: Form đăng ký với validation đầy đủ thông tin
- **CAPTCHA**: Tích hợp Google reCAPTCHA v2 để bảo mật
- **Responsive**: Thiết kế responsive cho mọi thiết bị
- **Validation**: Validation real-time cho tất cả các trường
- **UI/UX**: Giao diện hiện đại, thân thiện với người dùng

## 📋 Yêu cầu hệ thống

- Trình duyệt web hiện đại (Chrome, Firefox, Safari, Edge)
- Kết nối internet (để load Google reCAPTCHA)
- Node.js (tùy chọn, để chạy development server)

## 🛠️ Cài đặt và chạy

### Cách 1: Chạy trực tiếp
1. Mở file `index.html` trong trình duyệt web
2. Trang web sẽ tự động load và sẵn sàng sử dụng

### Cách 2: Sử dụng development server
1. Cài đặt dependencies:
   ```bash
   npm install
   ```

2. Chạy development server:
   ```bash
   npm run dev
   ```
   hoặc
   ```bash
   npm start
   ```

3. Mở trình duyệt và truy cập `http://localhost:3000`

## 📁 Cấu trúc dự án

```
Frontend/
├── index.html          # File HTML chính
├── styles.css          # File CSS styling
├── script.js           # File JavaScript xử lý logic
├── package.json        # Cấu hình npm
└── README.md          # Tài liệu hướng dẫn
```

## 🎨 Thiết kế

### Màu sắc chủ đạo
- **Xanh dương**: #4f46e5 (Primary)
- **Xanh lá**: #10b981 (Success/Submit)
- **Xám**: #64748b (Text secondary)
- **Trắng**: #ffffff (Background)

### Layout
- **Header**: Logo và tên thương hiệu
- **Main Content**: 2 cột
  - Cột trái: Form đăng nhập/đăng ký
  - Cột phải: Thông tin quảng bá dịch vụ
- **Footer**: Thông tin bản quyền và mạng xã hội

## 🔐 Bảo mật

### CAPTCHA
- Sử dụng Google reCAPTCHA v2
- Site key: `6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI` (Test key)
- **Lưu ý**: Để sử dụng trong production, cần đăng ký site key thật từ Google

### Validation
- **Email**: Format validation
- **Mật khẩu**: Tối thiểu 8 ký tự, có chữ hoa, chữ thường và số
- **Số điện thoại**: Format validation
- **Xác nhận mật khẩu**: Kiểm tra khớp với mật khẩu

## 📱 Responsive Design

- **Desktop**: Layout 2 cột
- **Tablet**: Layout 2 cột với spacing điều chỉnh
- **Mobile**: Layout 1 cột, tối ưu cho màn hình nhỏ

## 🚀 Tính năng nâng cao

### Form Validation
- Real-time validation khi người dùng nhập liệu
- Hiển thị thông báo lỗi chi tiết
- Styling động cho các trường có lỗi

### User Experience
- Animation mượt mà khi chuyển tab
- Loading state khi submit form
- Hover effects và transitions

### Accessibility
- Labels rõ ràng cho tất cả input
- Keyboard navigation support
- Screen reader friendly

## 🔧 Tùy chỉnh

### Thay đổi màu sắc
Chỉnh sửa các biến CSS trong file `styles.css`:
```css
:root {
  --primary-color: #4f46e5;
  --success-color: #10b981;
  --text-secondary: #64748b;
}
```

### Thay đổi CAPTCHA
1. Đăng ký tại [Google reCAPTCHA](https://www.google.com/recaptcha/)
2. Thay thế site key trong file `index.html`:
```html
<div class="g-recaptcha" data-sitekey="YOUR_SITE_KEY"></div>
```

## 🐛 Troubleshooting

### CAPTCHA không hiển thị
- Kiểm tra kết nối internet
- Kiểm tra site key có đúng không
- Kiểm tra console để xem lỗi

### Form không submit được
- Kiểm tra validation errors
- Đảm bảo CAPTCHA đã được hoàn thành
- Kiểm tra console để xem lỗi JavaScript

## 📞 Hỗ trợ

Nếu gặp vấn đề, vui lòng:
1. Kiểm tra console browser để xem lỗi
2. Đảm bảo tất cả files được load đúng
3. Kiểm tra kết nối internet

## 📄 License

MIT License - Xem file LICENSE để biết thêm chi tiết.

## 👥 Đóng góp

Mọi đóng góp đều được chào đón! Vui lòng:
1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Tạo Pull Request

---

**Medicare Team** - *Your Health, Our Priority* 🏥



