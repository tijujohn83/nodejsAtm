import { IStorageStateProvier, StorageStateProvier } from './storageStateProvider';
import * as fs from 'fs';

export class FileStorageProvider extends StorageStateProvier implements IStorageStateProvier {
    public saveState(o: object): void {
        if (!fs.existsSync(this._atmId)) {
            fs.openSync(this._atmId, 'w');
        }
        fs.writeFileSync(this._atmId, JSON.stringify(o));
    }

    public getState(): object {
        if (!fs.existsSync(this._atmId)) {
            fs.openSync(this._atmId, 'w');
        }

        const atmState = fs.readFileSync(this._atmId, 'utf8');
        if (atmState === undefined || atmState.trim().length === 0) {
            return {};
        }
        return JSON.parse(atmState);
    }

}
