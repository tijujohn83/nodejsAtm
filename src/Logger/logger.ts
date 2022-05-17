export interface ILogger {
    logLine(str: string): void;
}

export abstract class AtmLogger implements ILogger {
    protected _atmId: string;
    public setAtmId(atmId: string): void {
        this._atmId = atmId;
    }

    public logLine(str: string): void {
        // do nothing
    }
}
