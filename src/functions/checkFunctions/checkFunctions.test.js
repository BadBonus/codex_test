import {checkCountsWithLengthField, checkInputsRectangle} from '.'

const testField = [['',''],['','']];

describe('check functions',()=>{
    test('checkCountsWithLengthField negative points', () => {
        expect(checkCountsWithLengthField(testField, -1, -1, -1, -1)).toEqual(true);
    });
    test('checkCountsWithLengthField over-points', () => {
        expect(checkCountsWithLengthField(testField, 100, 22, 41, 2)).toEqual(true);
    });

    test('checkInputsRectangle uncorrected x2', () => {
        expect(checkInputsRectangle(1, 1, 0, 2)).toEqual(false);
    });

});