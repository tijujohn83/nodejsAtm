import { WithdrawStatus } from "./models/enums";
import { WithdrawItem } from "./models/withdrawn";

export interface AtmRequirement {
    refill(): void;
    getBalances(): WithdrawItem[];
    getBalanceValue(): number;
    withDraw(amount: number): { status: WithdrawStatus, dispensed?: WithdrawItem[] }
}