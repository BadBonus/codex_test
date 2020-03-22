import React, { useState, useEffect } from "react";
import Sector from "./components/Sector";
import {drawLine, drawRect, fillFigure} from './functions/drawFunctions'
import {checkCountsWithLengthField, checkInputsRectangle} from './functions/checkFunctions'

import "./App.css";

function App() {
  const [command, setCommand] = useState("");
  const [pattern, setPattern] = useState("");
  const [field, setField] = useState([]);

  const existField = field.length !== 0; // test of existing of field

  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      setPattern(command.match(/[^\s]/)[0]);
    }
  };
  

  useEffect(() => {
    if (pattern === "C") {
      const x = command.match(/\d{1,}/g)[0] >= 0 ? command.match(/\d{1,}/g)[0] : 0;
      const y = command.match(/\d{1,}/g)[1] >= 0 ? command.match(/\d{1,}/g)[1] : 0;
      const fieldArray = [];
      const array = [];
      array.length = y;
      array.fill(" ");
      for (let i = 0; i < x; i++) {
        fieldArray.push([...array]);
      }
      setField(fieldArray);
      setPattern("");
    } else if (pattern === "L" && existField) {

      const x1 = command.match(/\d{1,}/g)[0] - 1 >= 0 ? command.match(/\d{1,}/g)[0] - 1 : 0;
      const y1 = command.match(/\d{1,}/g)[1] - 1 >= 0 ? command.match(/\d{1,}/g)[1] - 1 : 0;
      const x2 = command.match(/\d{1,}/g)[2] - 1 >= 0 ? command.match(/\d{1,}/g)[2] - 1 : 0;
      const y2 = command.match(/\d{1,}/g)[3] - 1 >= 0 ? command.match(/\d{1,}/g)[3] - 1 : 0;

      //test for correct inputs
      if (checkCountsWithLengthField(field, x1, x2, y1, y2)) 
      {
        setPattern("");
        return ()=>{}
      }

      const fieldArray = drawLine(field, x1, x2, y1, y2);
      setField(fieldArray);
      setPattern("");
    } else if (pattern === "R" && existField) {

      const x1 = command.match(/\d{1,}/g)[0] - 1 >= 0 ? command.match(/\d{1,}/g)[0] - 1 : 0;
      const y1 = command.match(/\d{1,}/g)[1] - 1 >= 0 ? command.match(/\d{1,}/g)[1] - 1 : 0;
      const x2 = command.match(/\d{1,}/g)[2] - 1 >= 0 ? command.match(/\d{1,}/g)[2] - 1 : 0;
      const y2 = command.match(/\d{1,}/g)[3] - 1 >= 0 ? command.match(/\d{1,}/g)[3] - 1 : 0;

      //test for correct inputs
      if (!(checkCountsWithLengthField(field, x1, x2, y1, y2) || checkInputsRectangle(x1, x2, y1, y2)))
      {
        setPattern("");
        return () => {}
      }

      const fieldArray = drawRect(field, x1, x2, y1, y2);
      setField(fieldArray);

      setPattern("");
    } else if (pattern === "B" && existField) {

      const x = command.match(/\d+/g)[0] - 1 >= 0 ? command.match(/\d+/g)[0] - 1 : 0;
      const y = command.match(/\d+/g)[1] - 1 >= 0 ? command.match(/\d+/g)[1] - 1 : 0;
      const bcg = command.match(/\w/g)[3];
      //#доработка добавить проверку на вождение в границы поля
      if (checkCountsWithLengthField)
      {
        setPattern("");
        return () => {}
      }
      //отсаженные
      const outseated = [];

      console.log(bcg);
      console.log(x);
      console.log(y);
      console.log('==== and now borders! ====');
      let borders = fillFigure(field, x, y);
      setPattern("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pattern]);

  return (
    <div className="App">
      <div className="mainInterface">
        <input onChange={e => setCommand(e.target.value)} value={command} onKeyPress={handleKeyPress}/>
        <button
          onClick={() => {
            setPattern(command.match(/[^\s]/)[0]);
          }}
        >
          compile
        </button>
      </div>

      <div className="mailField">
        {field.map((el, column) => (
          <div>
            {el.map((el2, cell) => (
              <Sector
                x={column}
                y={cell}
                bcg={el2}
                key={column + " " + cell + "sector"}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
