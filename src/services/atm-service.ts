import { AtmRequirement } from "../atm-requirements";
import { Atm } from "../models/atm";
import { WithdrawStatus } from "../models/enums";
import { WithdrawItem } from "../models/withdrawn";
import { SimpleWithdrawStrategy } from "../strategy/SimpleWithdrawStrategy";

export class AtmService implements AtmRequirement {
    private static Instance: Atm;

    constructor() {
        if (AtmService.Instance === undefined) {
            AtmService.Instance = new Atm(new SimpleWithdrawStrategy());
            AtmService.Instance.refill();
        }
    }

    refill(): void {
        AtmService.Instance.refill();
    }

    public getBalances(): WithdrawItem[] {
        return AtmService.Instance.getBalances();
    }

    public getBalanceValue(): number {
        return AtmService.Instance.getBalanceValue();
    }

    public withDraw(amount: number): { status: WithdrawStatus, dispensed?: WithdrawItem[] } {
        return AtmService.Instance.withDraw(amount);
    }

}