const { readFileSync } = require("fs");
const { createServer } = require("http");

const server = createServer();

server.on("request", (req, res) => {
    const request = readFileSync("./16.mp4");
    res.end(request);
});

console.log(process.pid);
server.listen(3000);
