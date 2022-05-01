import { Atm } from "../models/atm";
import { SimpleWithdrawStrategy } from "../strategy/SimpleWithdrawStrategy";

export class AtmService  {
    private static Instance: Atm;

    constructor() {
        if (AtmService.Instance === undefined) {
            AtmService.Instance = new Atm(new SimpleWithdrawStrategy());
            AtmService.Instance.refill();
        }
    }

    getInstance(): Atm {
        return AtmService.Instance;
    } 

}