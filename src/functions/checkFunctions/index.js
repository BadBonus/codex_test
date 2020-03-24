export const checkCountsWithLengthField = (field, x1, x2, y1 = 0, y2 = 0) => {
    const lengthX = field.length;
    const lengthY = field[0].length;

    if ((x1) > lengthX || (x2) > lengthX || (y1) > lengthY || (y2) > lengthY) {
        alert('You inputed wrong numbers');
        return true
    } else if ((x1) < 0  || (x2) < 0 || (y1) < 0 || (y2) < 0) {
        alert('You inputed uncorrected numbers');
        return true
    } else {
        return false
    }
};

export const checkInputsRectangle = (x1, x2, y1, y2) => {
    if ((x1 > x2) || (y1 > y2) || (x1 === x2 || y1 === y2)) {
        alert('You need make x1 or y1 less then x2 or y2');
        return false;
    } else {
        return true
    }
};