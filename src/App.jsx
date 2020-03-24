import React, {useState, useEffect} from "react";
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
        if (event.key === 'Enter') {
            setPattern(command.match(/[^\s]/)[0]);
        }
    };


    useEffect(() => {
        if (pattern === "C") {
            const x = command.match(/-?\d{1,}/g)[0];
            const y = command.match(/-?\d{1,}/g)[1];

            console.log(x);
            console.log(y);

            if (x < 0 || y < 0) {
                alert('input not negative digits ');
                setPattern("");
                return () => {
                }
            }

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

            const x1 = command.match(/-?\d{1,}/g)[0];
            const y1 = command.match(/-?\d{1,}/g)[1];
            const x2 = command.match(/-?\d{1,}/g)[2];
            const y2 = command.match(/-?\d{1,}/g)[3];

            //test for correct inputs
            if (checkCountsWithLengthField(field, x1, x2, y1, y2)) {
                setPattern("");
                return () => {
                }
            }

            const fieldArray = drawLine(field, x1, x2, y1, y2);
            setField(fieldArray);
            setPattern("");
        } else if (pattern === "R" && existField) {

            const x1 = command.match(/-?\d{1,}/g)[0];
            const y1 = command.match(/-?\d{1,}/g)[1];
            const x2 = command.match(/-?\d{1,}/g)[2];
            const y2 = command.match(/-?\d{1,}/g)[3];

            //test for correct inputs
            if (!(checkCountsWithLengthField(field, x1, x2, y1, y2) || checkInputsRectangle(x1, x2, y1, y2))) {
                setPattern("");
                return () => {
                }
            }

            const fieldArray = drawRect(field, x1, x2, y1, y2);
            setField(fieldArray);

            setPattern("");
        } else if (pattern === "B" && existField) {

            const x = command.match(/\d+/g)[0];
            const y = command.match(/\d+/g)[1];
            let bcg = command.match(/\w+/g)[3];

            if (x < 0 || y < 0) {
                alert('input not negative digits ');
                setPattern("");
                return () => {
                }
            }

            if (bcg === undefined) {
                alert('input background pls, you can input any string expression');
                setPattern("");
                return () => {
                }
            }
            if (!checkCountsWithLengthField) {
                setPattern("");
                return () => {
                }
            }

            let updatedField = fillFigure(field, x, y, bcg);
            setField(updatedField);
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

            <div className="mailField"
                 style={{
                   width:field.length*24.5+'px',
                   height:field[0] !== undefined ? field[0].length*29+'px' : 0
                 }}>
                {field.map((el, column) => (
                    <div key={column  + "sector-div"}>
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
