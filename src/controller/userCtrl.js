const Order = require("../models/orderModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const redis = require("redis");
const sendMessageToQueue = require("../tests/message_queue/rabbitmq/ordered.producer");
const redisClient = redis.createClient();
// *validation client side

//create User
const createOrder = asyncHandler(async (req, res) => {
    const {
        shoppingInfo,
        cartProductState,
        totalPrice,
        totalPriceAfterDiscount,
        paymentInfo,
    } = req.body;
    // console.log(req.body.shoppingInfo);
    const { _id } = req.user;
    validateMongoDbId(_id);

    try {
        const infoOrder = {
            user: _id,
            shippingInfo: shoppingInfo,
            orderItems: cartProductState,
            totalPrice,
            totalPriceAfterDiscount,
            paymentInfo,
        };

        // Kiểm tra lại 1 lần nữa nếu số lượng đặt hàng lớn hơn số lượng đang còn thì thông báo trả về/

        const order = await Order.create(infoOrder);
        // await sendMessageToQueue(infoOrder);
        // console.log("order 123", order);

        if (!order) throw new Error("Order not created");

        //giảm số lượng product
        await handleSuccessfulOrder(order._id);
        // publish để bên admin nhận info
        redisClient.publish(
            "newOrder",
            JSON.stringify({
                name:
                    order.shippingInfo.firstName +
                    " " +
                    order.shippingInfo.lastName,
            })
        );

        res.json({
            order,
            success: true,
        });
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = {
    createOrder,
};
