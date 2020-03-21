import React, {useState} from "react";
import Sector from "./components/Sector";
import "./App.css";

function App() {
  const [command, setCommand]=useState('');
  const [patterm, setPatterm]=useState('');



  return (
    <div className="App">
      <div className="mainInterface">
      <input onChange={(e)=>setCommand(e.target.value)} value={command}/>
      <button onClick={()=>{setPatterm(command.match(/[^\s]/)[0])}}>compire</button>
      </div>
      
      <div className="mailField">
        <Sector />
      </div>
      <mark style={{top:100+'px', position:'relative'}}>1 {patterm} 1</mark>
    </div>
    
  );
}

export default App;
