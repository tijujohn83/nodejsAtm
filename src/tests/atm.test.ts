import { NullLogger } from "../logger/nullLogger";
import { Atm } from "../models/atm";
import { WithdrawStatus } from "../models/enums";
import { getRandomIntInclusive } from "../services/utils";
import { EqualAmountsRefill } from "../strategy/refill/equalAmountsRefill";
import { MaxRefill } from "../strategy/refill/maxRefill";
import { RandomRefill } from "../strategy/refill/randomRefill";
import { Normalized } from "../strategy/withdraw/normalized";
import { OrderByDenominationValueDesc } from "../strategy/withdraw/orderByDenominationValueDesc";
import { OrderByTotalValueDesc } from "../strategy/withdraw/orderByTotalValueDesc";


describe('atmTest', () => {
    it('balance test', () => {
        var withdrawStratety = new Normalized();
        var refillStrategy = new RandomRefill();
        var atm = new Atm(withdrawStratety, refillStrategy, new NullLogger());
        atm.refill();

        var amount = Object.values(atm.atmState)
            .map(c => c.Denomination.value * c.BalanceItemCount)
            .reduce((prev, curr) => prev + curr, 0);

        expect(atm.getBalanceValue()).toBe(amount);

    });

    it('basic withdraw test', () => {
        var withdrawStratety = new Normalized();
        var refillStrategy = new RandomRefill();
        var atm = new Atm(withdrawStratety, refillStrategy, new NullLogger());
        atm.refill();

        var atmBalance = atm.getBalanceValue();
        var amount = 1000;
        var withdraw = atm.withDraw(amount);

        if (withdraw.status == WithdrawStatus.Success) {
            expect(atm.getBalanceValue()).toBe(atmBalance - amount);
        }
    });

    it('recursive withdraw test Normalized-RandomRefill', () => {
        var withdrawStratety = new Normalized();
        var refillStrategy = new RandomRefill();
        var atm = new Atm(withdrawStratety, refillStrategy, new NullLogger());
        atm.refill();
        var maxWithdraw = 100000;
        var recurse = 10;

        expect(() => {
            while (recurse > 0) {
                while (true) {
                    var atmBalance = atm.getBalanceValue();
                    if (atmBalance === 0) {
                        break;
                    }
                    atm.withDraw(getRandomIntInclusive(0, atmBalance > maxWithdraw ? maxWithdraw : atmBalance));
                }
                atm.refill();
                recurse--;
            }
        }).not.toThrow();
    });

    it('recursive withdraw test Normalized-MaxRefill', () => {
        var withdrawStratety = new Normalized();
        var refillStrategy = new MaxRefill();
        var atm = new Atm(withdrawStratety, refillStrategy, new NullLogger());
        atm.refill();
        var maxWithdraw = 100000;
        var recurse = 10;

        expect(() => {
            while (recurse > 0) {
                while (true) {
                    var atmBalance = atm.getBalanceValue();
                    if (atmBalance === 0) {
                        break;
                    }
                    atm.withDraw(getRandomIntInclusive(0, atmBalance > maxWithdraw ? maxWithdraw : atmBalance));
                }
                atm.refill();
                recurse--;
            }
        }).not.toThrow();
    });

    it('recursive withdraw test Normalized-EqualAmountsRefill', () => {
        var withdrawStratety = new Normalized();
        var refillStrategy = new EqualAmountsRefill();
        var atm = new Atm(withdrawStratety, refillStrategy, new NullLogger());
        atm.refill();
        var maxWithdraw = 100000;
        var recurse = 10;

        expect(() => {
            while (recurse > 0) {
                while (true) {
                    var atmBalance = atm.getBalanceValue();
                    if (atmBalance === 0) {
                        break;
                    }
                    atm.withDraw(getRandomIntInclusive(0, atmBalance > maxWithdraw ? maxWithdraw : atmBalance));
                }
                atm.refill();
                recurse--;
            }
        }).not.toThrow();
    });

    it('recursive withdraw test OrderByDenominationValueDesc-RandomRefill', () => {
        var withdrawStratety = new OrderByDenominationValueDesc();
        var refillStrategy = new RandomRefill();
        var atm = new Atm(withdrawStratety, refillStrategy, new NullLogger());
        atm.refill();
        var maxWithdraw = 100000;
        var recurse = 10;

        expect(() => {
            while (recurse > 0) {
                while (true) {
                    var atmBalance = atm.getBalanceValue();
                    if (atmBalance === 0) {
                        break;
                    }
                    atm.withDraw(getRandomIntInclusive(0, atmBalance > maxWithdraw ? maxWithdraw : atmBalance));
                }
                atm.refill();
                recurse--;
            }
        }).not.toThrow();
    });

    it('recursive withdraw test OrderByTotalValueDesc-RandomRefill', () => {
        var withdrawStratety = new OrderByTotalValueDesc();
        var refillStrategy = new RandomRefill();
        var atm = new Atm(withdrawStratety, refillStrategy, new NullLogger());
        atm.refill();
        var maxWithdraw = 100000;
        var recurse = 10;

        expect(() => {
            while (recurse > 0) {
                while (true) {
                    var atmBalance = atm.getBalanceValue();
                    if (atmBalance === 0) {
                        break;
                    }
                    atm.withDraw(getRandomIntInclusive(0, atmBalance > maxWithdraw ? maxWithdraw : atmBalance));
                }
                atm.refill();
                recurse--;
            }
        }).not.toThrow();
    });

});