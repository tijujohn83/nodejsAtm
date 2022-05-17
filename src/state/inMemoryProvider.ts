import { IStorageStateProvier, StorageStateProvier } from './storageStateProvider';

export class InMemmoryProvider extends StorageStateProvier implements IStorageStateProvier {
    private stateObj: object;

    public saveState(o: object): void {
        this.stateObj = o;
    }
    public getState(): object {
        return this.stateObj;
    }

}
