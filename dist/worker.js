import fs from "fs";
import { parentPort } from "worker_threads";
export default function startPings({ serverURL, reqDelay }) {
    let requests = 0;
    let errors = 0;
    setInterval(() => {
        fetch(serverURL)
            .catch((e) => {
            errors++;
        });
        requests++;
        if (requests % 19 === 0) {
            parentPort?.postMessage({
                quantity: requests,
                errors: errors > 0 ? errors : undefined
            });
            requests = 0;
            errors = 0;
        }
    }, reqDelay);
    return new Promise(() => { });
}
