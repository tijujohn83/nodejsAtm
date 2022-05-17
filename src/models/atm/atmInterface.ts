import { WithdrawStatus } from '../enums';
import { WithdrawItems } from './withdrawItems';

export interface AtmInterface {
    get id(): string;
    refill(): void;
    getBalances(): WithdrawItems;
    getBalanceValue(): number;
    withDraw(requestedAmount: number): { status: WithdrawStatus, dispensed?: WithdrawItems };
}