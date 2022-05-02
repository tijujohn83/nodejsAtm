import { currentDenominations } from "../../models/denominations/currentDenominations";


describe('denominations', () => {    
    test('denomination count is correct', ()=> {
        expect(Object.keys(currentDenominations).length).toBe(10);
    });
});