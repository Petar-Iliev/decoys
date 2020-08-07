import React, { useState } from 'react'


const validEventTypes=["DRINKING",
    "MOVIE",
    "THEATRE",
    "READING",
    "SPORTS",
    "PSS_ITS_A_SECRET",
    "STUDIO_DAY",
    "SCREAMING_RANDOM_NON_SENSE",
    "ACT_RUDE_TO_PEOPLE_AND_PIGEONS",
    "ACT_POLITE_TO_RUDE_PIGEONS",
    "EATING",
    "COFFEE",
    "BENCH_PARTY",
    "DISCO",
    "LETTER_BOX",
    "CLEANING"]

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

        if(!validEventTypes.includes(type)){
            alert("Invalid Event Type valid types -> "+validEventTypes);
           return;
        }
        

        fetch("http://localhost:8050/event/create",{
            method:"POST",
            headers:{
                "Authorization":props.token,
                "Content-Type":"application/json"
            },
            body:JSON.stringify({info,type,location,date})
        }).then(resp=>{
            resp.status === 201 ? window.location.reload(true) : alert("NO Location OR DATE IS IN THE PAST");
        }).catch(err=>console.error(err));
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