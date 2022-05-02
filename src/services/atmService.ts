import { AtmRequirement } from "../atmRequirements";
import { FileLogger } from "../logger/fileLogger";
import { Atm } from "../models/atm";
import { EqualAmountsRefill } from "../strategy/refill/equalAmountsRefill";
import { MaxRefill } from "../strategy/refill/maxRefill";
import { RandomRefill } from "../strategy/refill/randomRefill";
import { OrderByDenominationValueDesc } from "../strategy/withdraw/orderByDenominationValueDesc";
import { orderByTotalValueDesc } from "../strategy/withdraw/orderByTotalValueDesc";

export class AtmService  {
    private static Instance: Atm;

    constructor() {
        if (AtmService.Instance === undefined) {
            // AtmService.Instance = new Atm(new OrderByDenominationValueDesc(), new MaxRefill(), new FileLogger());
            // AtmService.Instance = new Atm(new orderByTotalValueDesc(), new MaxRefill(), new FileLogger());
            // AtmService.Instance = new Atm(new orderByTotalValueDesc(), new RandomRefill(), new FileLogger());
            AtmService.Instance = new Atm(new orderByTotalValueDesc(), new EqualAmountsRefill(), new FileLogger());
            AtmService.Instance.refill();
        }
    }

    getInstance(): AtmRequirement {
        return AtmService.Instance;
    } 

}