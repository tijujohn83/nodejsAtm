import { AtmLogger, ILogger } from './logger';

export class NullLogger extends AtmLogger implements ILogger {

    public logLine(str: string): void {
    // do nothing
    }
}
