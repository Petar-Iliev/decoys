import React, { useState } from 'react';
import {CSSTransition, SwitchTransition, TransitionGroup} from 'react-transition-group'



function CommandLine(params){

    return(
    <div className="command-line">{params.line}</div>
    )
}


function  Terminal(props) {
    
    const [command,setCommand]=useState("");
    const [board,setBoard] =useState(["Terminal V1 - for help type help"])
    const [lines,setLines]=useState([]);
    const listOfCommands=['help','clear','D-user','D-orgasm','f-user','f-orgasm','set-role','add-orgasm']
  

    function executeCommand(e){

        

    }
    

 async function executeLine(e){
      if(e.keyCode===13){

       
        const trimmedCommand=command.trim();
        if(trimmedCommand=="clear"){
            
            setLines([]);
            
        }else{
            
        let retMsg="Invalid command: type help for list of valid commands";
        const cmd=trimmedCommand.split(" ")[0];
    
     
       const exist=props.validCommands.find(e=>e===cmd);
  
       if(exist){
          
        retMsg=await props.methods[cmd](trimmedCommand);
       }
      await  setLines([...lines,{
            id:lines.length,
            value:retMsg,
            
        }])
    }

        setCommand("");

      }
  }
  
    return(
      
        <pre className="pre-terminal">
        {/* <textarea className="the-terminal" ><p>Hello</p></textarea> */}
        <p className="terminal-intro">Terminal V1 </p>
    {lines.map(e=>(<div key={e.id} className="command-line"> {e.value} </div>))}
       <div className="current-command-line">Admin:<textarea rows={1} cols={1} onChange={(e)=>setCommand(e.target.value)} onKeyDown={executeLine} value={command}></textarea></div> 
        </pre>

       
    )
}

export default Terminal;