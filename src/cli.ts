import path from "path";
import { Command } from "commander";

const program = new Command();

export let options = {
    serverURL: "",
    threads: 2,
    reqDelay: 20
}

const programName = process.argv[1] ? path.basename(process.argv[1]) : "reqrain";

program
    .name(programName)
    .version("0.1.0")
    .description("Sends multiple requests to an HTTP server.")

program
    .argument("<server-url>", "HTTP server URL.")
    .option("--threads <quant>", "Number of threads to be used. Default: " + options.threads)
    .option("--req-delay <ms>", "Delay in milliseconds for each request per thread. Default: " + options.reqDelay)
    .action(function(serverURL) {
        try {
            new URL(serverURL)
        }
        catch {
            this.error("Invalid URL: " + serverURL);
        }
        
        options.serverURL = serverURL;
        
        const opts = this.opts();
        
        if(opts.threads) {
            const threads = Number(opts.threads);
            if(Number.isNaN(threads) || threads < 1) this.error("Invalid number of threads: " + opts.threads);
            
            options.threads = threads;
        }
        
        if(opts.reqDelay) {
            const delay = Number(opts.reqDelay);
            if(Number.isNaN(delay) || delay < 1) this.error("Invalid delay: " + opts.reqDelay);
            
            options.reqDelay = delay;
        }
    })

program.parse();

import("./main.js");
