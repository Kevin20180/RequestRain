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
    .description("Envia muitos pings à um servidor HTTP.")

program
    .argument("<server-url>", "URL do servidor HTTP.")
    .option("--threads <quant>", "Quantidade de threads a serem usados. Padrão: " + options.threads)
    .option("--req-delay <ms>", "Delay em milisegundos para cada requisição. Padrão: " + options.reqDelay)
    .action(function(serverURL) {
        try {
            new URL(serverURL)
        }
        catch {
            this.error("URL inválida: " + serverURL);
        }
        
        options.serverURL = serverURL;
        
        const opts = this.opts();
        
        if(opts.threads) {
            const threads = Number(opts.threads);
            if(Number.isNaN(threads) || threads < 1) this.error("Quantidade de threads inválida: " + opts.threads);
            
            options.threads = threads;
        }
        
        if(opts.reqDelay) {
            const delay = Number(opts.reqDelay);
            if(Number.isNaN(delay) || delay < 1) this.error("Delay inválido: " + opts.reqDelay);
            
            options.reqDelay = delay;
        }
    })

program.parse();

import("./main.js");