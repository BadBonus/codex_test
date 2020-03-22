export const drawLine = (field, x1, x2, y1, y2) => {
    const fieldArray = field;
    if (x1 === x2 && y1 !== y2) {
        //logic for vertical line
        const dominateY = y1 - y2;

        if (dominateY < 0) {
            for (let index = y1; index <= y2; index++) {
                fieldArray[x1][index] = "X";
            }
        } else if (dominateY > 0) {

            for (let index = y1; y2 <= index; index--) {
                fieldArray[x1][index] = "X";
            }
        }
    } else if (x1 !== x2 && y1 === y2) {
        //logic for horizontal line

        const dominateX = x1 - x2;

        if (dominateX < 0) {
            for (let index = x1; index <= x2; index++) {
                fieldArray[index][y1] = "X";
            }
        } else if (dominateX > 0) {
            for (let index = x1; index >= x2; index--) {
                fieldArray[index][y1] = "X";
            }
        }
    } else if (x1 === x2 && y1 === y2) {
        fieldArray[x1][y1] = "X";
    } else {
        alert('sorry, but you can draw only horizontal or vertical lines')
    }
    return fieldArray;
};


export const drawRect = (field, x1, x2, y1, y2) => {
    console.log('drawRect start');
    const fieldArray = field;
    //draw vertical lines
    for (let i = y1; i <= y2; i++) {
        console.log('drawRect vertical');

        fieldArray[x1][i] = 'X';
        fieldArray[x2][i] = 'X';
    }
    //draw horizontal lines
    for (let i = x1; i <= x2; i++) {
        console.log('drawRect horizontal');

        fieldArray[i][y1] = 'X';
        fieldArray[i][y2] = 'X';
    }
    console.log(fieldArray);
    return fieldArray;
};

//#start helper fun-s for fillFigure
const findBorders = (field, x, y) => {
    let leftX = 0;
    let topY = 0;
    let rightX = 0;
    let bottomY = 0;
    const initialBcg = field[x][y];
    //#доделка сделать проверку на размеры поля

    //find left border
    while (field[x - leftX][y] === initialBcg) {
        leftX++;
    }
    //find right border
    while (field[x + rightX][y] === initialBcg) {
        rightX++;
    }
    //find top border
    while (field[x][y - topY] === initialBcg) {
        topY++;
    }
    //find bottom border
    while (field[x][y + bottomY] === initialBcg) {
        bottomY++;
    }

    return {leftX: leftX - 1, topY: topY - 1, rightX: rightX - 1, bottomY: bottomY - 1} //-1 because algorithm
};
//#end helper fun-s for fillFigure

export const fillFigure = (field, x, y, bcg) => {
    //find border points
    const {
        leftX,
        topY,
        rightX,
        bottomY
    } = findBorders(field, x, y);

    console.log(leftX);
    console.log(topY);
  console.log(rightX);
  console.log(bottomY);
};