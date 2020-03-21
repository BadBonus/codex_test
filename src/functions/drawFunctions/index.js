
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
           
          for (let index = y1;  y2 <= index; index--) {
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
}


export const drawRect = (field, x1, x2, y1, y2) => {
    const fieldArray = field;

      if (x1 === x2 && y1 !== y2) {
        //logic for vertical line
        const dominateY = y1 - y2;

        if (dominateY < 0) {
          for (let index = y1; index <= y2; index++) {
            fieldArray[x1][index] = "X";
          }
        } else if (dominateY > 0) {
           
          for (let index = y1;  y2 <= index; index--) {
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
}
