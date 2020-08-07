import React, { useRef } from 'react'

import {ReactComponent as Cassette} from '../main/svgs/cassette.svg';
import {ReactComponent as Delete} from '../main/svgs/remove.svg';
import {ReactComponent as Checked} from '../main/svgs/success(1).svg';
import {ReactComponent as Unchecked} from '../main/svgs/success.svg';
import {ReactComponent as Donate} from './orgmp/donation.svg';
import Cookies from 'js-cookie'




function Orgasm(props){

    const audioRef=useRef();
   
    
   
    function playPause(){     
        !audioRef.current.paused ? audioRef.current.pause() : audioRef.current.play();
    }

    function deleteOrgasm(title){
        fetch(`http://localhost:8050/orgasm/delete/own/${title}`,{
            method:"DELETE",
            headers:{
                "Authorization":Cookies.get("token")
            },
            
        }).then(()=>{
            window.location.reload(false);
        }).catch(err=>console.error(err))
    }

    
   

        return(
            
           
           <div className="org-info-line">
               <span className="org-info-line-title">{props.title.length < 10 ? props.title : props.title.slice(0,7)+".." }</span>
            <Cassette className="casset-on-off" onClick={playPause}/>
               {props.userDon && <Donate className="cash-box" onClick={()=>props.donateInfo(props.userDon)}/>}
               {props.pending!==undefined &&
               <>
               {props.pending ? <Unchecked title="pending" className="check-mark"/> : <Checked title="approved" className="check-mark"/>}
                <Delete title="delete" className="delete-own" onClick={()=>deleteOrgasm(props.title)}/> 
                </>
              }
                <audio ref={audioRef} src={props.videoUrl}></audio>
               
                </div>  

         
        )
    
}




export default Orgasm;



