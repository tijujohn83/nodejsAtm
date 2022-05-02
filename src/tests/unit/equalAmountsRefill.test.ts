import { currentDenominations } from "../../models/denominations/currentDenominations";


describe('check test works', () => {    
    test('create new instance', ()=> {
        expect(Object.keys(currentDenominations).length).toBe(10);
    });
});