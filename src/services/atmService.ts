import { AtmRequirement } from "../atmRequirements";
import { FileLogger } from "../logger/fileLogger";
import { Atm } from "../models/atm";
import { OrderByDenominationValueDescStrategy } from "../strategy/orderByDenominationValueDescStrategy";
import { orderByTotalValueDescStrategy } from "../strategy/orderByTotalValueDescStrategy";

export class AtmService  {
    private static Instance: Atm;

    constructor() {
        if (AtmService.Instance === undefined) {
            //AtmService.Instance = new Atm(new OrderByDenominationValueDescStrategy(), new FileLogger());
            AtmService.Instance = new Atm(new orderByTotalValueDescStrategy(), new FileLogger());
            AtmService.Instance.refill();
        }
    }

    getInstance(): AtmRequirement {
        return AtmService.Instance;
    } 

}