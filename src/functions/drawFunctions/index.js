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

const findBorders = (field, x, y, direction) => {
    let leftX = 0;
    let topY = 0;
    let rightX = 0;
    let bottomY = 0;
    const initialBcg = field[x][y];
    const lengthX = field[0].length;
    const lengthY = field[0][0].length;
    //Checks for size-out of field
    const checkLeftX = () => {
        return field[x - leftX] === undefined ? false : field[x - leftX][y];
    };
    const checkRightX = () => {
        return field[x + rightX] === undefined ? false : field[x + rightX][y];
    };
    const checkTopY = () => {
        return field[x][y - topY] === undefined ? false : field[x][y - topY];
    };
    const checkBottomY = () => {
        return field[x][y + bottomY] === undefined ? false : field[x][y + bottomY];
    };

    //find left border
    if (direction === 'all' || direction === 'left')
    {
        while (checkLeftX() === initialBcg) {
            leftX++;
        }
    }
    if (direction === 'all' || direction === 'right')
    {
        //find right border
        while (checkRightX() === initialBcg) {
            rightX++;
        }
    }
    //find top border
    if (direction === 'all' || direction === 'top')
    {
        while (checkTopY() === initialBcg) {
            topY++;
        }
    }

    //find bottom border
    if (direction === 'all' || direction === 'bottom')
    {
        while (checkBottomY() === initialBcg) {
            bottomY++;
        }
    }
    return {leftX: leftX - 1, topY: topY - 1, rightX: rightX - 1, bottomY: bottomY - 1} //-1 because algorithm
};

const markSectors = (borders, entryPoint, field) =>
{
    const verticalArray = [];
    const horizontalArray = [];
    const {x, y} = entryPoint;
    let localField = field;
    const {leftX: startX, rightX:endX, topY:startY, bottomY: endY} = borders;
    //vertical elements
    for (let i = x-startX; i <= x+endX; i++)
    {
        const {topY} = findBorders(localField, i, y, 'top');
        const {bottomY} = findBorders(localField, i, y, 'bottom');

        for (let topPoint = y-topY; topPoint <= y+bottomY; topPoint++)
        {
            verticalArray.push({x:i, y:topPoint, bcg: localField[i][topPoint]});
        }
    }
    //horizontal elements
    for (let i = y - startY; i <= y+endY; i++)
    {
        const {leftX} = findBorders(localField, x, i, 'left');
        const {rightX} = findBorders(localField, x, i, 'right');

        for (let leftPoint = x-leftX; leftPoint <= x+rightX; leftPoint++)
        {
            horizontalArray.push({x:leftPoint, y:i, bcg: localField[leftPoint][i]});
        }
    }
    return {verticalArray, horizontalArray};
};

const filterHorizAndVerticArrays = (summaryArray, anotherArray) => {
    return anotherArray.filter(el=>!summaryArray.some(sEl => (el.x === sEl.x && el.y === sEl.y)));
};

const particallyFilling = (localField, arrayOfElements, bcg) =>
{
    const updatedLocalField = [...localField];
    arrayOfElements.forEach(el=>{
        updatedLocalField[el.x][el.y] = bcg;
    });

    return updatedLocalField;
};
//#end helper fun-s for fillFigure

export const fillFigure = (field, startx, starty, bcg) => {

//array for another starts points from algorithm
    let points = [{x:startx, y:starty}];
    let conjunctionArray = [];
    let localField = [...field];

    while (points.length !== 0)
    {
        const {x, y} = points[0];
        //find border points
        let toBordersSteps = findBorders(field, x, y, 'all');
        const {verticalArray, horizontalArray}=markSectors(toBordersSteps, {x, y} ,localField);
        conjunctionArray = verticalArray.filter((elV)=>{
            return (horizontalArray.some((elH)=>{
                return (elV.x===elH.x && elV.y === elH.y)
            }));
        });

        let unicArray1 = filterHorizAndVerticArrays(conjunctionArray, verticalArray);
        let unicArray2 = filterHorizAndVerticArrays(conjunctionArray, horizontalArray);
        //Вот тут мы должны проверять поинты
        points = [...points,...unicArray1, ...unicArray2];

        // eslint-disable-next-line no-loop-func
        points = points.filter((point)=>{
            console.log(point);
            return !(conjunctionArray.some(el=> (el.x === point.x && el.y === point.y)));
        });

        localField = particallyFilling(localField, conjunctionArray, bcg);
    }





    return localField;
};