const { createReadStream } = require("fs");
const { createServer } = require("http");

const server = createServer();

server.on("request", (req, res) => {
    const request = createReadStream("./16.mp4");
    request.pipe(res);
});

console.log(process.pid);
server.listen(3000);
