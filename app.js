const express = require("express");
const cors = require("cors");
// Import Router quản lý các API liên quan đến contacts (danh bạ).
// File này chứa các route con, ví dụ: lấy danh sách, thêm, sửa, xóa contact.
const contactsRouter = require("./app/routes/contact.route");
// Tạo một ứng dụng Express.
// Biến app dùng để cấu hình middleware, khai báo route và khởi chạy server.
const app = express();
app.use(cors());
// Đăng ký middleware CORS cho toàn bộ ứng dụng.
// Giúp trình duyệt cho phép frontend gọi API backend khi khác origin.
app.use(express.json());
// Đăng ký middleware phân tích JSON trong request body.
// Ví dụ: frontend gửi { "name": "An" } thì có thể đọc bằng req.body.name.
app.get("/", (req, res) => {
    // Định nghĩa API GET tại đường dẫn gốc "/".
    // req: chứa thông tin request từ client.
    // res: dùng để gửi response về client.
    res.json({
        message: "Welcome to contact book application."
        // Nội dung thông báo trả về cho client.
    });
    // Kết thúc xử lý request bằng cách gửi response JSON.
});

// Gắn Router contacts vào tiền tố "/api/contacts".
// Các route được khai báo trong contactsRouter sẽ có tiền tố này.
app.use("/api/contacts", contactsRouter);

// Xuất ứng dụng Express để file khác có thể import và sử dụng.
// Ví dụ: file server.js có thể require("./app") rồi gọi app.listen(...).
module.exports = app;
