import React, { useState, useEffect } from "react";
import Sector from "./components/Sector";
import {drawLine} from './drawFunctions'
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
  }
  const checkCountsWithLengthField = (x1, x2, y1 ,y2) =>
  {
    const lengthX = field.length;
    const lengthY = field[0].length;

    if((x1+1) > lengthX ||( x2+1) > lengthX || (y1+1) > lengthY || (y2+1) > lengthY)
    {
      alert('You inputed wrong numbers'); 
      setPattern("");
      return true
    }
    else
    {
      return false
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
    } else if (pattern === "L") {

      if (!existField) return ()=>{}

      const x1 = command.match(/\d{1,}/g)[0] - 1 >= 0 ? command.match(/\d{1,}/g)[0] - 1 : 0;
      const y1 = command.match(/\d{1,}/g)[1] - 1 >= 0 ? command.match(/\d{1,}/g)[1] - 1 : 0;
      const x2 = command.match(/\d{1,}/g)[2] - 1 >= 0 ? command.match(/\d{1,}/g)[2] - 1 : 0;
      const y2 = command.match(/\d{1,}/g)[3] - 1 >= 0 ? command.match(/\d{1,}/g)[3] - 1 : 0;

      //test for correct numbers
      if (checkCountsWithLengthField(x1, x2, y1, y2)) return ()=>{};

      const fieldArray = drawLine(field, x1, x2, y1, y2);
      setField(fieldArray);
      setPattern("");
    } else if (pattern === "R") {

      if (existField) return ()=>{}

      const x1 = command.match(/\d{1,}/g)[0] - 1 >= 0 ? command.match(/\d{1,}/g)[0] - 1 : 0;
      const y1 = command.match(/\d{1,}/g)[1] - 1 >= 0 ? command.match(/\d{1,}/g)[1] - 1 : 0;
      const x2 = command.match(/\d{1,}/g)[2] - 1 >= 0 ? command.match(/\d{1,}/g)[2] - 1 : 0;
      const y2 = command.match(/\d{1,}/g)[3] - 1 >= 0 ? command.match(/\d{1,}/g)[3] - 1 : 0;

      //test for correct numbers
      if (checkCountsWithLengthField(x1, x2, y1, y2)) return ()=>{};

      setPattern("");
    } else if (pattern === "B") {
      console.log();
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
          compire
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
