import { AtmRequirement } from "../atmRequirements";
import { FileLogger } from "../logger/fileLogger";
import { Atm } from "../models/atm";
import { EqualAmountsRefill } from "../strategy/EqualAmountsRefill";
import { MaxRefill } from "../strategy/maxRefill";
import { OrderByDenominationValueDesc } from "../strategy/orderByDenominationValueDesc";
import { orderByTotalValueDesc } from "../strategy/orderByTotalValueDesc";
import { RandomRefill } from "../strategy/randomRefill";

export class AtmService  {
    private static Instance: Atm;

    constructor() {
        if (AtmService.Instance === undefined) {
            // AtmService.Instance = new Atm(new OrderByDenominationValueDesc(), new MaxRefill(), new FileLogger());
            // AtmService.Instance = new Atm(new orderByTotalValueDesc(), new MaxRefill(), new FileLogger());
            //AtmService.Instance = new Atm(new orderByTotalValueDesc(), new RandomRefill(), new FileLogger());
            AtmService.Instance = new Atm(new orderByTotalValueDesc(), new EqualAmountsRefill(), new FileLogger());
            AtmService.Instance.refill();
        }
    }

    getInstance(): AtmRequirement {
        return AtmService.Instance;
    } 

}