export interface PingOptions {
    serverURL: string;
    reqDelay: number;
}
export interface PingResultData {
    quantity: number;
    errors?: number;
}
export default function startPings({ serverURL, reqDelay }: PingOptions): Promise<unknown>;
//# sourceMappingURL=worker.d.ts.map