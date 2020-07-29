import React, { useState } from 'react'


function CreateEvent(props){

    const [createEvent,setCreateEvent] = useState(false);
    const [info,setInfo]=useState("");
    const [type,setType]=useState("");
    const [location,setLocation]=useState("");
    const [date,setDate]=useState(null);

    function openClose(){
        setCreateEvent(!createEvent);
    }

    function submit(){

        

        fetch("http://localhost:8050/event/create",{
            method:"POST",
            headers:{
                "Authorization":props.token,
                "Content-Type":"application/json"
            },
            body:JSON.stringify({info,type,location,date})
        })
    }

    return(
        <>
        <div className="create-event">
          <span onClick={openClose}>CREATE EVENT</span>
     
        </div>
        {createEvent && 
        <div className="create-event-form">
            <p className="ev-in">Info</p>
            <input name="" value={info} onChange={(e)=>setInfo(e.target.value)}></input>
            <p className="ev-in">TYPE</p>
            <input name="" value={type} onChange={(e)=>setType(e.target.value)}></input>
            <p className="ev-in"  >LOCATION</p>
            <input name="" value={location} onChange={(e)=>setLocation(e.target.value)}></input>
            <p className="ev-in">DATE</p>
            <input name="" type="datetime-local"  onChange={(e)=>setDate(e.target.value)}></input>

            <span className="sub-event" onClick={submit}>SUBMIT</span>
            
        </div>
        } 
        </>
    )
}


export default CreateEvent;