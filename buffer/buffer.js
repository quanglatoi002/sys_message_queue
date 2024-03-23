const https = require("https");
const fs = require("fs");

const imageUrl =
    "https://down-vn.img.susercontent.com/file/099edde1ab31df35bc255912bab54a5e_tn";

// Tải hình ảnh từ URL
https
    .get(imageUrl, (response) => {
        // Sử dụng Buffer để lưu trữ dữ liệu nhị phân
        //create là Buffer rỗng
        let imageData = Buffer.alloc(0);

        console.log(imageData);

        // Khi nhận được dữ liệu từ response
        response.on("data", (chunk) => {
            // Gắn thêm dữ liệu mới vào Buffer
            imageData = Buffer.concat([imageData, chunk]);
            console.log(imageData);
        });

        // Khi kết thúc response
        response.on("end", () => {
            // Ghi Buffer vào file
            fs.writeFileSync("downloaded_image.jpg", imageData);

            console.log("Hình ảnh đã được tải và lưu thành công.");
        });
    })
    .on("error", (error) => {
        console.error(`Đã xảy ra lỗi: ${error.message}`);
    });
