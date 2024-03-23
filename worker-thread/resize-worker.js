const { parentPort, workerData } = require("worker_threads");
const sharp = require("sharp");

const { src, width, height } = workerData;
console.log("width:::", width, "height:::", height, "src:::", src);
const [filename, ext] = src.split(".");

console.log("ext:::", ext);
console.log(`Resizing ${src} to ${width}px wide`);

const resize = async () => {
    await sharp(src)
        .resize(width, height, { fit: "cover" })
        .toFile(`${src}-${width}.${ext}`);
};

resize();
