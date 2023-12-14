"use strict";

const { connectToRabbitMQ, consumerQueue } = require("../dbs/init.rabbit");

const messageService = {
    consumerToQueue: async (queueName) => {
        try {
            const { channel, connection } = await connectToRabbitMQ();
            await consumerQueue(channel, queueName);
        } catch (error) {
            console.error("Error consumerToQueue::", error);
        }
    },
    //case processing
    consumerToQueueNormal: async (queueName) => {
        try {
            const { channel, connection } = await connectToRabbitMQ();
            //queue 1
            const notifiQueue = "notificationQueueProcess";

            const timeExpired = 5000;
            // TTL
            // setTimeout(() => {
            //     channel.consume(notifiQueue, (msg) => {
            //         console.log(
            //             `Send notification successfully processed:`,
            //             msg.content.toString()
            //         );
            //         channel.ack(msg);
            //     });
            // }, timeExpired);

            //LOGIC
            channel.consume(notifiQueue, (msg) => {
                try {
                    const numberTest = Math.random();
                    console.log({ numberTest });
                    if (numberTest < 0.8) {
                        throw new Error("Send notification failed:: HOT FIX");
                    }
                    console.log(`Send notification successfully processed:`);
                    channel.ack(msg);
                } catch (error) {
                    // chỉ ra rằng ko xử lý thành công
                    // nack: sau khi xử lý ko thành công nó sẽ ko lưu lại vào queue ban đầu nữa mà chuyển sang queue bị lỗi
                    // tham số t3 là chỉ tin nhắn hiện tại này ms bị từ chối mà thôi
                    channel.nack(msg, false, false);
                }
            });
        } catch (error) {
            console.error(error);
        }
    },

    //TTL
    consumerToQueueFailed: async (queueName) => {
        try {
            const { channel, connection } = await connectToRabbitMQ();
            //exchange 2
            const notificationExchangeDLX = "notificationExDLX";
            const notificationRoutingDLX = "notificationRoutingKeyDLX";
            //queue2
            const notificationQueueHandler = "notificationQueueHotFix";

            //create exchange
            await channel.assertExchange(notificationExchangeDLX, "direct", {
                durable: true,
            });
            //create queue
            const queueResult = await channel.assertQueue(
                notificationQueueHandler,
                {
                    exclusive: false,
                }
            );
            console.log(queueResult);

            await channel.bindQueue(
                queueResult.queue,
                notificationExchangeDLX,
                notificationRoutingDLX
            );
            await channel.consume(
                queueResult.queue,
                (msgFailed) => {
                    console.log(
                        `this notification error:, pls hot fix::`,
                        msgFailed.content.toString()
                    );
                },
                {
                    noAck: true,
                }
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
};

module.exports = messageService;
