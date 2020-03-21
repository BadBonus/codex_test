import React, { useState, useEffect } from "react";
import Sector from "./components/Sector";
import "./App.css";

function App() {
  const [command, setCommand] = useState("");
  const [pattern, setPattern] = useState("");
  const [field, setField] = useState([]);

  const existField = field.length !== 0;

  useEffect(() => {
    if (pattern === "C") {
      const x = command.match(/\d{1,}/g)[0];
      const y = command.match(/\d{1,}/g)[1];
      const fieldArray = [];
      const array = [];
      array.length = y;
      array.fill(" ");
      for (let i = 0; i < x; i++) {
        fieldArray.push([...array]);
      }
      setField(fieldArray);
    } else if (pattern === "L" && existField) {
      const x1 = command.match(/\d{1,}/g)[0];
      const y1 = command.match(/\d{1,}/g)[1];
      const x2 = command.match(/\d{1,}/g)[2];
      const y2 = command.match(/\d{1,}/g)[3];

      const fieldArray = field;

      if (x1 === x2 && y1 !== y2) {
        //logick for vertical line
        const dominateY = y1 - y2;

        if (dominateY < 0 && existField) {
          for (let index = y1; index <= y2; index++) {
            fieldArray[x1][index] = "X";
          }
          console.log('сработал Y вниз');
        } else if (dominateY > 0 && existField) {
          for (let index = y2; index >= y1; index--) {
            fieldArray[x1][index] = "X";
          }
          console.log('сработал Y вверх');
        }
      } else if (x1 !== x2 && y1 === y2) {
        //logick for horizontal line
      } else if (x1 === x2 && y1 === y2) {
        //logick for point
      } else {
        console.log("error pattern L");
      }
      setField(fieldArray);
    } else if (pattern === "R") {
      console.log();
    } else if (pattern === "B") {
      console.log();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pattern]);

  useEffect(()=>{
    console.log('сработал field');
    console.log(field);

  },[field])

  return (
    <div className="App">
      <div className="mainInterface">
        <input onChange={e => setCommand(e.target.value)} value={command} />
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
            {el.map((el2, cell) => {
              if(pattern === "L")
              {
                console.log(el2);
              }
              return (
                <Sector
                  x={column}
                  y={cell}
                  bcg={el2}
                  key={column +' '+ cell + "sector"}
                />
              );
            })}
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
