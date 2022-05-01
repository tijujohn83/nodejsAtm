import { AtmRequirement } from "../atmRequirements";
import { FileLogger } from "../Logger/FileLogger";
import { Atm } from "../models/atm";
import { SimpleWithdrawStrategy } from "../strategy/simpleWithdrawStrategy";

export class AtmService  {
    private static Instance: Atm;

    constructor() {
        if (AtmService.Instance === undefined) {
            AtmService.Instance = new Atm(new SimpleWithdrawStrategy(), new FileLogger());
            AtmService.Instance.refill();
        }
    }

    getInstance(): AtmRequirement {
        return AtmService.Instance;
    } 

}