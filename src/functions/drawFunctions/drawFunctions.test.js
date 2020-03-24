import {
    drawLine,
    drawRect,
    fillFigure
} from '.'

const testField = [['',''],['','']];

describe('draw functions', ()=>{
    // drawLine();
    test('drawLine', ()=>{
        expect(drawLine(testField, 0, 1, 0, 0)).toEqual([['X',''],['X','']]);
    });

    test('drawRect', ()=>{
        expect(drawRect(testField, 0, 1, 0, 1)).toEqual([['X','X'],['X','X']]);
    });

    test('fillFigure', ()=>{
        expect(fillFigure(testField, 0, 0, 'o')).toEqual([['o','o'],['o','o']]);
    });
});