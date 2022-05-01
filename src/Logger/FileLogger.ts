import { ILogger } from "./ilogger";
import * as fs from 'fs';

export class FileLogger implements ILogger {
    private _logFile = "atmLog.log"

    constructor() {
        if(!fs.existsSync(this._logFile)) {
            fs.openSync(this._logFile, 'w');
        } 
    }

    logLine(str: string): void {
        fs.appendFileSync(this._logFile, new Date().toISOString() + " " + str + "\n");
    }
}