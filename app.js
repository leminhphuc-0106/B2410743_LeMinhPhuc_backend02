const express = require("express");
const cors = require("cors");
// Import Router quản lý các API liên quan đến contacts (danh bạ). File này chứa các route con, ví dụ: lấy danh sách, thêm, sửa, xóa contact.
const contactsRouter = require("./app/routes/contact.route");

// Tạo một ứng dụng Express. Biến app dùng để cấu hình middleware, khai báo route và khởi chạy server.
const app = express();

//Tạo api xử lí lỗi
const ApiError = require("./app/api-error");


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
// Các route được khai báo trong contacts.route sẽ có tiền tố này.
app.use("/api/contacts", contactsRouter);

app.use((req, res, next) => {
    //Code ở đây được định nghĩa để xử lí lỗi khi route không tồn tại
    
    return next(new ApiError(404, "Resource not found")); 
});


// 2. Middleware xử lý lỗi tập trung (Phải định nghĩa cuối cùng, có đủ 4 tham số)
app.use((err, req, res, next) => {
    // Trong các đoạn code ở route, gọi next(error) sẽ chuyển về middleware này
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    return res.status(statusCode).json({
        message: message,
    });
});


// Xuất ứng dụng Express để file khác có thể import và sử dụng.
module.exports = app;
