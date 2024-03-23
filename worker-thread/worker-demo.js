const {
    Worker,
    isMainThread,
    parentPort,
    workerData,
} = require("worker_threads");

console.log("isMainThread:::", workerData);

// luồng chính tạo ra luồng worker và lắng nghe các tin nhắn từ nó và xử lý sự kiện lỗi. Luồng worker nhận dữ liệu ban đầu, xử lý nó và gửi 1 tin nhắn trả lại cho luồng chính.
if (isMainThread) {
    const worker = new Worker(__filename, { workerData: "hello" });
    worker.on("message", (msg) =>
        console.log(`Worker message received: ${msg}`)
    );
    worker.on("error", (err) => console.error(err));
    worker.on("exit", (code) =>
        console.log(`Worker exited with code ${code}.`)
    );
} else {
    const data = workerData;
    parentPort.postMessage(`You said \"${data}\".`);
}
