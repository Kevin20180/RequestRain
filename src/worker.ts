import fs from "fs";
import { parentPort } from "worker_threads";

export interface PingOptions {
    serverURL: string,
    reqDelay: number
}

export interface PingResultData {
    quantity: number,
    errors?: number
}

export default function startPings({ serverURL, reqDelay }: PingOptions) {
    let requests = 0;
    let errors = 0;
    let postMessageInterval = Math.max(1, 19 - Math.round((reqDelay - 1) * 9 / 48) * 2);
    fs.writeSync(2, "interval: " + postMessageInterval + "\n");
    
    setInterval(() => {
        fetch(serverURL)
        .catch((e) => {
            errors++;
        })
        
        requests++;
        
        if(requests % postMessageInterval === 0) {
            parentPort?.postMessage({
                quantity: requests,
                errors: errors > 0 ? errors : undefined
            })
            
            requests = 0;
            errors = 0;
        }
    }, reqDelay);
    
    return new Promise(() => {});
}