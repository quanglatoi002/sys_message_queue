"use strict";

const {
    consumerToQueue,
    consumerToQueueFailed,
    consumerToQueueNormal,
} = require("./src/services/consumerQueue.service");

// const log = console.log;
// console.log = function () {
//     log.apply(console, [new Date()].concat(arguments));
// };

const queueName = "test-topic";

// consumerToQueue(queueName)
//     .then(() => {
//         console.log(`Message consumer started: ${queueName}`);
//     })
//     .catch((err) => {
//         console.error("Message Error: " + err.message);
//     });

consumerToQueueNormal(queueName)
    .then(() => {
        console.log(`Message consumerToQueueNormal started: ${queueName}`);
    })
    .catch((err) => {
        console.error("Message Error: " + err.message);
    });

consumerToQueueFailed(queueName)
    .then(() => {
        console.log(`Message consumerToQueueFailed started: ${queueName}`);
    })
    .catch((err) => {
        console.error("Message Error: " + err.message);
    });
