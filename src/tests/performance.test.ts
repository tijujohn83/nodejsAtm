import { NullLogger } from "../logger/nullLogger";
import { Atm } from "../models/atm";
import { WithdrawStatus } from "../models/enums";
import { getRandomIntInclusive } from "../services/utils";
import { MaxRefill } from "../strategy/refill/maxRefill";
import { Normalized } from "../strategy/withdraw/normalized";
import { OrderByDenominationValueDesc } from "../strategy/withdraw/orderByDenominationValueDesc";
import { OrderByTotalValueDesc } from "../strategy/withdraw/orderByTotalValueDesc";


describe('performanceTest', () => {

    it('avg iterations test Normalized-MaxRefill', () => {
        expect(() => {
            var withdrawStratety = new Normalized();
            var refillStrategy = new MaxRefill();
            var atm = new Atm(withdrawStratety, refillStrategy, new NullLogger());
            atm.refill();
            var maxWithdraw = 100000;
            var withdrawCount = 0;
            var repeat = 10000;
            var i = repeat;

            while (i > 0) {
                while (true) {
                    var atmBalance = atm.getBalanceValue();
                    if (atmBalance === 0) {
                        break;
                    }
                    var amount = getRandomIntInclusive(0, atmBalance > maxWithdraw ? maxWithdraw : atmBalance);
                    var withdraw = atm.withDraw(amount);
                    if (withdraw.status == WithdrawStatus.Success) {
                        withdrawCount++;
                    }
                }
                i--;
                atm.refill();
            }
            console.log('avg withdrawls for Normalized-MaxRefill=' + Math.floor(withdrawCount / repeat));
        }).not.toThrow();
    });

    it('avg iterations test OrderByDenominationValueDesc-MaxRefill', () => {
        expect(() => {
            var withdrawStratety = new OrderByDenominationValueDesc();
            var refillStrategy = new MaxRefill();
            var atm = new Atm(withdrawStratety, refillStrategy, new NullLogger());
            atm.refill();
            var maxWithdraw = 100000;
            var withdrawCount = 0;
            var repeat = 10000;
            var i = repeat;

            while (i > 0) {
                while (true) {
                    var atmBalance = atm.getBalanceValue();
                    if (atmBalance === 0) {
                        break;
                    }
                    var amount = getRandomIntInclusive(0, atmBalance > maxWithdraw ? maxWithdraw : atmBalance);
                    var withdraw = atm.withDraw(amount);
                    if (withdraw.status == WithdrawStatus.Success) {
                        withdrawCount++;
                    }
                }
                i--;
                atm.refill();
            }
            console.log('avg withdrawls for OrderByDenominationValueDesc-MaxRefill=' + Math.floor(withdrawCount / repeat));
        }).not.toThrow();
    });

    it('avg iterations test OrderByTotalValueDesc-MaxRefill', () => {
        expect(() => {
            var withdrawStratety = new OrderByTotalValueDesc();
            var refillStrategy = new MaxRefill();
            var atm = new Atm(withdrawStratety, refillStrategy, new NullLogger());
            atm.refill();
            var maxWithdraw = 100000;
            var withdrawCount = 0;
            var repeat = 10000;
            var i = repeat;

            while (i > 0) {
                while (true) {
                    var atmBalance = atm.getBalanceValue();
                    if (atmBalance === 0) {
                        break;
                    }
                    var amount = getRandomIntInclusive(0, atmBalance > maxWithdraw ? maxWithdraw : atmBalance);
                    var withdraw = atm.withDraw(amount);
                    if (withdraw.status == WithdrawStatus.Success) {
                        withdrawCount++;
                    }
                }
                i--;
                atm.refill();
            }
            console.log('avg withdrawls for OrderByTotalValueDesc-MaxRefill=' + Math.floor(withdrawCount / repeat));
        }).not.toThrow();
    });

});