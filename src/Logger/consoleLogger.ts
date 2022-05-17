import { AtmLogger, ILogger } from './logger';

export class ConsoleLogger extends AtmLogger implements ILogger {

    public logLine(str: string): void {
        console.log(new Date().toISOString() + ' ' + str + '\n');
    }
}
