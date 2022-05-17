import { FileLogger } from '../logger/fileLogger';
import { Atm } from '../models/atm/atm';
import { EqualAmountsRefill } from '../strategy/refill/equalAmountsRefill';
import { MaxRefill } from '../strategy/refill/maxRefill';
import { RandomRefill } from '../strategy/refill/randomRefill';
import { Normalized } from '../strategy/withdraw/normalized';
import { OrderByDenominationValueDesc } from '../strategy/withdraw/orderByDenominationValueDesc';
import { OrderByTotalValueDesc } from '../strategy/withdraw/orderByTotalValueDesc';
import { WithdrawItems } from '../models/atm/withdrawItems';
import { WithdrawStatus } from '../models/enums';
import { AtmManagerInterface } from './atmManagerInterface';
import * as fs from 'fs';
import { FileStorageProvider } from '../state/fileStorageProvider';

export class AtmManager implements AtmManagerInterface {
    private static Instance: Atm;
    private _atmManagerFile = 'atmManagerFile.log';

    constructor() {
        if (AtmManager.Instance === undefined) {
            // no DI because of time constraints
            const withdrawStratety = new OrderByDenominationValueDesc(); // available: Normalized | OrderByDenominationValueDesc | OrderByTotalValueDesc
            const refillStrategy = new MaxRefill(); // available: RandomRefill | MaxRefill | EqualAmountsRefill

            AtmManager.Instance = new Atm(withdrawStratety,
                refillStrategy,
                new FileLogger(),
                this.getWorkingAtmId(),
                new FileStorageProvider());

            this.setWorkingAtmId(AtmManager.Instance.id);
        }
    }

    public refill(): void {
        AtmManager.Instance.refill();
    }

    public getBalances(): WithdrawItems {
        return AtmManager.Instance.getBalances();
    }

    public getBalanceValue(): number {
        return AtmManager.Instance.getBalanceValue();
    }

    public withDraw(requestedAmount: number): { status: WithdrawStatus; dispensed?: WithdrawItems; } {
        return AtmManager.Instance.withDraw(requestedAmount);
    }

    private getWorkingAtmId(): string {
        if (!fs.existsSync(this._atmManagerFile)) {
            fs.openSync(this._atmManagerFile, 'w');
        }

        let atmId = fs.readFileSync(this._atmManagerFile, 'utf8');
        atmId = atmId === undefined ? '' : atmId;
        return atmId.trim();
    }

    private setWorkingAtmId(id: string): void {
        if (this.getWorkingAtmId() !== id) {
            if (!fs.existsSync(this._atmManagerFile)) {
                fs.openSync(this._atmManagerFile, 'w');
            }
            fs.appendFileSync(this._atmManagerFile, id);
        }
    }

}
