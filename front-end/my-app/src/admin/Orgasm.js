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
 
 
    return(
        <>
      <div className="inf-desk-hold">
      <span className="org-title-desk"> Title:{props.title}</span> <span className={props.pending.toString()==="true" ? "pending true" : "pending false"} onClick={()=>{
        props.setPending(props.title)
      }}>Pending:{props.pending.toString()}</span> 
       <Cassette onClick={playMe}/> <audio ref={audioRef} id="aud" src={props.videoUrl}></audio> 
       <div className="desk-delete-org" onClick={()=>props.delete("orgasm",props.title)}>DELETE</div>
     
       </div>
    </>
    )
    
}

export default Orgasm;