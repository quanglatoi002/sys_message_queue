const fs = require("fs");
const sharp = require("sharp");

// Đọc dữ liệu từ file nhị phân (ví dụ: 'downloaded_image.jpg')
const imageData = fs.readFileSync("downloaded_image.jpg");
console.log(imageData);

// Chuyển đổi dữ liệu từ Buffer thành hình ảnh và lưu vào file
sharp(imageData).toFile("output_image.jpg", (err, info) => {
    if (err) {
        console.error(err);
    } else {
        console.log("Hình ảnh đã được chuyển đổi và lưu thành công.");
    }
});
