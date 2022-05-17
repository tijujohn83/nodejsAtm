import { AtmInterface } from './atmInterface';
import { AtmLogger } from '../../logger/logger';
import { WithdrawStatus } from '../enums';
import { DenominationCapacity } from '../denominations/denominationCapacity';
import { WithdrawItems } from './withdrawItems';
import { n1000, n500, n200, n100, n50, c20, c10, c5, c2, c1, currentDenominations } from '../denominations/currentDenominations';
import { RefillStrategy } from '../../strategy/refill/refillStrategy';
import { WithdrawStrategy } from '../../strategy/withdraw/withdrawStrategy';
import { getNewAtmId } from '../../services/utils';
import * as fs from 'fs';
import { StorageStateProvier } from '../../state/storageStateProvider';
import { InMemmoryProvider } from '../../state/inMemoryProvider';

export class Atm implements AtmInterface {
    private _id: string;
    public get id(): string {
        return this._id;
    }

    private _atmState: { [key: string]: DenominationCapacity; } = {};
    public get atmState(): { [key: string]: DenominationCapacity; } {
        // return copy
        const returnObj: { [key: string]: DenominationCapacity; } = {};
        Object.entries(this._atmState)
            .forEach(e => returnObj[e[0]] = new DenominationCapacity(e[1].Denomination, e[1].MaxCapacity, e[1].BalanceItemCount));
        return returnObj;
    }

    private _strategy: WithdrawStrategy;
    private _logger: AtmLogger;
    private _storageStateProvider: StorageStateProvier;
    private _refillStrategy: RefillStrategy;
    private _atmMaxCapacities: { [key: string]: number } = {};

    constructor(strategy: WithdrawStrategy, refillStrategy: RefillStrategy, logger: AtmLogger, id?: string, storageStateProvider?: StorageStateProvier) {
        if (id !== undefined && id.trim() !== '') {
            this._id = id;
        } else {
            this._id = getNewAtmId();
        }

        this._logger = logger;
        this._logger.setAtmId(this._id);

        this._strategy = strategy;
        this._refillStrategy = refillStrategy;

        this._storageStateProvider = storageStateProvider === undefined ? new InMemmoryProvider() : storageStateProvider;
        this._storageStateProvider.setAtmId(this._id);

        this.init();
        this.loadSavedAtmState();
    }

    public refill(): void {
        this._atmState = {};
        this._refillStrategy.Refill(this._atmState, this._atmMaxCapacities);
        this.saveAtmState();

        const logContent = 'refilled to amount:' + this.getBalanceValue() + '; ' +
            JSON.stringify(Object.values(this._atmState)
                .sort((a, b) => b.Denomination.value - a.Denomination.value)
                .map(i => i.Denomination.id + '[' + i.BalanceItemCount + ']'));

        this._logger.logLine(logContent);
    }

    public getBalances(): WithdrawItems {
        const returnVal: WithdrawItems = {};
        Object.values(this._atmState).forEach(i => {
            returnVal[i.Denomination.id] = i.BalanceItemCount;
        });
        return returnVal;
    }

    public getBalanceValue(): number {
        return Object.values(this._atmState)
            .map(i => i.Denomination.value * i.BalanceItemCount)
            .reduce((prev, curr) => prev + curr, 0);
    }

    public withDraw(requestedAmount: number): { status: WithdrawStatus, dispensed?: WithdrawItems } {
        if (this.getBalanceValue() >= requestedAmount) {
            const withdrawnItems = this._strategy.getOptimumCombination(requestedAmount, this.atmState);
            if (this.validateAmount(requestedAmount, withdrawnItems)) {
                Object.keys(withdrawnItems).forEach(id => {
                    this._atmState[id].BalanceItemCount -= withdrawnItems[id];
                });
                const successObj = { status: WithdrawStatus.Success, dispensed: withdrawnItems };
                this._logger.logLine('amount:' + requestedAmount + '; balance:' + this.getBalanceValue() + '; ' + JSON.stringify(successObj));
                this.saveAtmState();
                return successObj;
            }
        }
        const logContent = 'amount:' + requestedAmount + '; balance:' + this.getBalanceValue() + '; Failed';
        this._logger.logLine(logContent);
        return { status: WithdrawStatus.Failure };
    }

    private validateAmount(requestedAmount: number, withdrawnItems: WithdrawItems): boolean {
        const returnedAmount = Object.keys(withdrawnItems)
            .map(k => currentDenominations[k].value * withdrawnItems[k])
            .reduce((prev, curr) => prev + curr, 0);
        return returnedAmount === requestedAmount;
    }

    private init(): void {
        this._atmMaxCapacities[n1000.id] = 10;
        this._atmMaxCapacities[n500.id] = 10;
        this._atmMaxCapacities[n200.id] = 10;
        this._atmMaxCapacities[n100.id] = 100;
        this._atmMaxCapacities[n50.id] = 100;
        this._atmMaxCapacities[c20.id] = 10000;
        this._atmMaxCapacities[c10.id] = 10000;
        this._atmMaxCapacities[c5.id] = 10000;
        this._atmMaxCapacities[c2.id] = 10000;
        this._atmMaxCapacities[c1.id] = 10000;

        Object.keys(this._atmMaxCapacities).forEach(c => {
            this._atmState[c] = new DenominationCapacity(currentDenominations[c], this._atmMaxCapacities[c], 0);
        });
    }

    private loadSavedAtmState(): void {
        const atmState = this._storageStateProvider.getState();
        Object.keys(atmState).forEach(denomination => {
            this._atmState[denomination].BalanceItemCount = atmState[denomination]._balanceItemCount;
        });

    }

    private saveAtmState(): void {
        this._storageStateProvider.saveState(this.atmState);
    }
}