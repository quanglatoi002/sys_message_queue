const axios = require("axios");
const appID = "3505384079504775536";
const appSecret = "ugLBLJW1YN3G3SRhiO7H";
const accessToken = "YOUR_ACCESS_TOKEN"; // Lấy từ quy trình OAuth

// Hàm gọi API Tìm Kiếm Người Dùng Zalo
function searchNearbyUsers(location, distance) {
    const url = `https://openapi.zalo.me/v2.0/nearby/search?access_token=${accessToken}&location=${location}&distance=${distance}`;

    axios
        .get(url)
        .then((response) => {
            // Xử lý kết quả
            console.log(response.data);
        })
        .catch((error) => {
            // Xử lý lỗi
            console.error(error);
        });
}

// Ví dụ gọi hàm với vị trí và khoảng cách cụ thể
searchNearbyUsers("10.762622,106.660172", 1000); // Vị trí và khoảng cách tính bằng mét
