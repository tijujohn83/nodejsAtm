import { AtmLogger, ILogger } from './logger';
import * as fs from 'fs';

export class FileLogger extends AtmLogger implements ILogger {

    constructor() {
        super();
    }

    private get atmIdLogFile(): string {
        return this._atmId + '.log';
    }

    public override setAtmId(atmId: string): void {
        super.setAtmId(atmId);
        if (!fs.existsSync(this.atmIdLogFile)) {
            fs.openSync(this.atmIdLogFile, 'w');
        }
    }

    public logLine(str: string): void {
        fs.appendFileSync(this.atmIdLogFile, new Date().toISOString() + ' ' + str + '\n');
    }
}
