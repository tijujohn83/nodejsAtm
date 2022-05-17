import { DenominationCapacity } from '../../models/denominations/denominationCapacity';

export interface RefillStrategy {
    Refill(atmState: { [key: string]: DenominationCapacity }, maxCapacities: { [key: string]: number }): void;
}
