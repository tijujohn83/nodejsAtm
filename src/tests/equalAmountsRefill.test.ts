import { n100, n50 } from '../models/denominations/currentDenominations';
import { ItemCapacity } from '../models/itemCapacity';
import { EqualAmountsRefill } from '../strategy/refill/equalAmountsRefill';

describe('equalAmountsRefillTest', () => {
    test('create new instance', () => {
        const refill = new EqualAmountsRefill();
        const atmState: { [key: string]: ItemCapacity; } = {};
        const capacities: { [key: string]: number } = {};
        capacities[n100.id] = 10;
        capacities[n50.id] = 10;

        refill.Refill(atmState, capacities);
        expect(atmState[n100.id].BalanceItemCount).toBe(5);
        expect(atmState[n50.id].BalanceItemCount).toBe(10);
    });
});
