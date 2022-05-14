import { ILogger } from './logger';

export class NullLogger implements ILogger {

    public logLine(str: string): void {
    // do nothing
    }
}
