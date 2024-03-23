"use strict";
const amqp = require("amqplib");

async function sendMessageToQueue() {
    //connect
    const connection = await amqp.connect("amqp://guest:12345@localhost");
    //create channel
    const channel = await connection.createChannel();
    //create queue
    const queueName = "ordered-queue-message";
    await channel.assertQueue(queueName, {
        durable: true,
    });

    for (let i = 0; i < 10; i++) {
        const message = `ordered-queue-message:: ${i}`;
        console.log(`message: ${message}`);
        //tin nhắn được viết vào đĩa cứng của server rabbitmq tc khi gửi vào hàng đợi
        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
            persistent: true,
        });
        console.log(
            `[x] Sent message to ${queueName}: ${JSON.stringify(message)}`
        );
    }

    setTimeout(() => {
        // channel.close();
        connection.close();
    }, 1000);
}

sendMessageToQueue().catch((err) => console.error(err));
// module.exports = sendMessageToQueue;
