"use strict";

const amqp = require("amqplib");

const connectToRabbitMQ = async () => {
    try {
        const connection = await amqp.connect("amqp://guest:12345@localhost");
        if (!connection) throw new Error("No connection");

        const channel = await connection.createChannel();
        return { channel, connection };
    } catch (error) {}
};

const connectToRabbitMQForTest = async () => {
    try {
        const { channel, connection } = await connectToRabbitMQ();

        //publish message to a queue
        const queue = "test-queue";
        const message = "Hello";
        await channel.assertQueue(queue);
        await channel.sendToQueue(queue, Buffer.from(message));

        //close the connection
        await connection.disconnect();
    } catch (error) {
        console.error(`Failed to connect to RabbitMQ`, error);
    }
};

const consumerQueue = async (channel, queueName) => {
    try {
        //assert queue khởi tạo
        await channel.assertQueue(queueName, {
            durable: true,
        });
        console.log("Waiting for messages...");
        channel.consume(
            queueName,
            (msg) => {
                console.log(
                    `Received message: ${queueName}::`,
                    msg.content.toString()
                );
            },
            { noAck: true }
        );
    } catch (error) {
        console.error("Failed to receive message from server", error);
        throw error;
    }
};

module.exports = {
    connectToRabbitMQ,
    connectToRabbitMQForTest,
    consumerQueue,
};
