import { WithdrawStatus } from "./models/enums";
import { WithdrawItems } from "./models/withdrawn";

export interface AtmRequirement {
    refill(): void;
    getBalances(): WithdrawItems;
    getBalanceValue(): number;
    withDraw(amount: number): { status: WithdrawStatus, dispensed?: WithdrawItems }
}