import { WithdrawStatus } from '../models/enums';
import { WithdrawItems } from '../models/atm/withdrawItems';

export interface AtmManagerInterface {
    refill(): void;
    getBalances(): WithdrawItems;
    getBalanceValue(): number;
    withDraw(requestedAmount: number): { status: WithdrawStatus, dispensed?: WithdrawItems };
}
