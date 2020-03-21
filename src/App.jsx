import React, { useState, useEffect } from "react";
import Sector from "./components/Sector";
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

      const lengthX = field.length;
      const lengthY = field[0].length;

      const x1 = command.match(/\d{1,}/g)[0] - 1 >= 0 ? command.match(/\d{1,}/g)[0] - 1 : 0;
      const y1 = command.match(/\d{1,}/g)[1] - 1 >= 0 ? command.match(/\d{1,}/g)[1] - 1 : 0;
      const x2 = command.match(/\d{1,}/g)[2] - 1 >= 0 ? command.match(/\d{1,}/g)[2] - 1 : 0;
      const y2 = command.match(/\d{1,}/g)[3] - 1 >= 0 ? command.match(/\d{1,}/g)[3] - 1 : 0;

      //test for correct numbers
      if((x1+1) > lengthX ||( x2+1) > lengthX || (y1+1) > lengthY || (y2+1) > lengthY)
      {
        alert('You inputed wrong numbers'); 
        setPattern("");
        return ()=>{}
      }

      const fieldArray = field;

      if (x1 === x2 && y1 !== y2) {
        //logic for vertical line
        const dominateY = y1 - y2;


        if (dominateY < 0 && existField) {
          for (let index = y1; index <= y2; index++) {
            fieldArray[x1][index] = "X";
          }
        } else if (dominateY > 0 && existField) {
           
          for (let index = y1;  y2 <= index; index--) {
            fieldArray[x1][index] = "X";
          }
        }
      } else if (x1 !== x2 && y1 === y2) {
        //logic for horizontal line

        const dominateX = x1 - x2;

        if (dominateX < 0 && existField) {
          for (let index = x1; index <= x2; index++) {
            fieldArray[index][y1] = "X";
          }
        } else if (dominateX > 0 && existField) {
          for (let index = x1; index >= x2; index--) {
            fieldArray[index][y1] = "X";
          }
        }
      } else if (x1 === x2 && y1 === y2) {
        fieldArray[x1][y1] = "X";
      } else {
        console.log("error pattern L");
      }
      setField(fieldArray);
      setPattern("");
    } else if (pattern === "R") {
      console.log();
    } else if (pattern === "B") {
      console.log();
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
      <mark style={{ right: 1001 + "px", position: "relative" }}>
        1 {pattern} 1
      </mark>
    </div>
  );
}

export default App;
