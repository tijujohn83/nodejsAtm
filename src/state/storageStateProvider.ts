export interface IStorageStateProvier {
    saveState(o: object): void;
    getState(): object;
}

export abstract class StorageStateProvier implements IStorageStateProvier {
    protected _atmId: string;

    public abstract saveState(o: object): void;
    public abstract getState(): object;

    public setAtmId(atmId: string): void {
        this._atmId = atmId;
    }
}
