import { WithdrawStatus } from '../enums';
import { WithdrawItems } from './withdrawItems';

export interface AtmInterface {
    refill(): void;
    getBalances(): WithdrawItems;
    getBalanceValue(): number;
    withDraw(requestedAmount: number): { status: WithdrawStatus, dispensed?: WithdrawItems };
}
