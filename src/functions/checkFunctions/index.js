export const checkCountsWithLengthField = (field, x1, x2, y1 ,y2) =>
{
  const lengthX = field.length;
  const lengthY = field[0].length;

  if((x1+1) > lengthX ||( x2+1) > lengthX || (y1+1) > lengthY || (y2+1) > lengthY)
  {
    alert('You inputed wrong numbers'); 
    return true
  }
  else
  {
    return false
  }
};

export const checkInputsRectangle =(x1, x2, y1, y2) => {
    if ((x1 > x2) || (y1 > y2) || (x1 === x2 || y1 === y2))
    {
        alert('You need make x1 or y1 less then x2 or y2');
        return false;
    }
    else
    {
        return true
    }
};