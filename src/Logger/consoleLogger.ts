import { ILogger } from "./logger";

export class ConsoleLogger implements ILogger {

    constructor() {
    }

    logLine(str: string): void {
        console.log(new Date().toISOString() + " " + str + "\n");
    }
}