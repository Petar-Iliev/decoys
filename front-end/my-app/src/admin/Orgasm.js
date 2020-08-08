import React, { useRef } from 'react';
import {ReactComponent as Cassette} from '../main/svgs/cassette.svg';

function Orgasm(props){


    const audioRef=useRef();
   
    function playMe(){

    if(audioRef.current.paused){
      
        audioRef.current.play();
      }else{
        audioRef.current.pause();
      }
    }
 
 
    if(!props.title){
       return <></>
    }
    return(
        <>
      <div className="inf-desk-hold">
    <span className="org-title-desk"> 
    Title:{props.title}</span> <span className={props.pending.toString()==="true" ? "pending true" : "pending false"} onClick={(e)=>{
        props.setPending(props.title)
        // const target = e.target;
        // const className= target.className;
        // target.className = className === "pending true" ? "pending false" : "pending true";
        // target.innerHTML = className === "pending true" ? "Pending: false" : "Pending: true";
      }}>Pending:{props.pending.toString()}
      </span> 
    <span className="user-org-ad">{props.user ? `USER: ${props.user.username}` : ""}</span>
       <Cassette onClick={playMe}/> 
       <audio ref={audioRef} id="aud" src={props.videoUrl}></audio> 
       <div className="desk-delete-org" onClick={()=>props.delete(props.title,"orgasm")}>DELETE</div>
     
    
       </div>
    </>
    )
    
}

export default Orgasm;