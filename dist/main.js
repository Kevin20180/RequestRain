import { options } from "./cli.js";
import path from "path";
import { MessageChannel } from "worker_threads";
import { Piscina } from "piscina";
const { serverURL, threads, reqDelay } = options;
const pool = new Piscina({
    filename: path.resolve(process.argv[1], "../worker.js"),
    minThreads: threads, maxThreads: threads
});
const messageChannel = new MessageChannel();
let requests = 0;
let errorCount = 0;
let lastRequests = requests;
pool.on("message", (data) => {
    let quant = data.quantity;
    if (data.errors) {
        errorCount += data.errors;
    }
    requests += quant;
});
setInterval(() => {
    if (requests === lastRequests)
        return;
    process.stdout.write(`\x1b[0G\x1b[2K${requests} requesições. ${errorCount} erros.`);
    lastRequests = requests;
}, 50);
for (let i = 0; i < threads; i++) {
    pool.run({ serverURL, reqDelay });
}
//# sourceMappingURL=main.js.map