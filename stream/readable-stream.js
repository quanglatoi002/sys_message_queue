const { Readable } = require("stream");
const fs = require("fs");

// Tạo một Readable Stream để mô phỏng dữ liệu từ người dùng
class UserActivityStream extends Readable {
    constructor(options) {
        super(options);
        this.activityData = []; // Lưu trữ dữ liệu hoạt động người dùng
    }

    // Phương thức _read sẽ được gọi khi có sự kiện 'data' được đăng ký
    _read(size) {
        // Đọc dữ liệu từ nguồn thực tế (chẳng hạn như logs hoạt động người dùng) và gửi đến Stream
        const newData = fs.readFileSync("./16.mp4");
        this.activityData.push(newData);
        this.push(newData);
    }
}

// Sử dụng Readable Stream
const userActivityStream = new UserActivityStream();

// Đăng ký lắng nghe sự kiện 'data' từ Stream
userActivityStream.on("data", (data) => {
    // Xử lý dữ liệu hoạt động người dùng ở đây
    console.log("User activity:", data);
});

// Bắt đầu đọc dữ liệu từ Stream (trong thực tế, có thể là logs, sự kiện click, v.v.)
userActivityStream.resume();
