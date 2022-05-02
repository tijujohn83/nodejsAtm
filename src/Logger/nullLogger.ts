import { ILogger } from "./logger";

export class NullLogger implements ILogger {

    constructor() {
    }

    logLine(str: string): void {
        
    }
}