import React, { useRef, useState } from 'react';

import SideNav from './SideNav';
import UserInfo from './UserInfo';
import Create from './Create'

import './admin.css'



function Desktop(props){

    
   
    const [input,setInput]=useState("");
    const [usrIn,setUsrIn]=useState(true);
   

    const [createIn,setCreateIn]=useState(false);
    
    function handleInput(e){

    
      setInput(e.target.value);
    }

  
  function changeOption(e){
    const val=e.target.innerHTML;
    if(val==="FIND"){
      setUsrIn(true);
    }else if(val==="CREATE"){
      setUsrIn(false);
    }
  }


    return(
        <div className="desktop-master">
     
    
         
           <div className="main-admin">
            <div className="admin-search">
              <div className="optins-tye" onClick={changeOption}>
               <span className="option-nav-ad">FIND</span><span className="option-nav-ad">CREATE</span>
              </div>
              {usrIn &&
              <input type="text" placeholder="Search..." className="admin-search" value={input} onChange={handleInput} onKeyDown={(e)=>{
                
                if(e.keyCode===13){
                  props.methods.find(input);
                  setInput("");
                }
              }}/>
            }
            </div>
            
            <div className="info-admin">
            {usrIn ? 
              
              <UserInfo 
              username={props.username} 
              orgasms={props.orgasms}
               videoUrl={props.videoUrl} 
               pending={props.pending}
               roles={props.roles}
               methods={
                 {delete:props.methods.delete
                  ,setPending:props.methods.setPending
                , setRole:props.methods.setRole}
                 }/>
                 : <Create submit={props.methods.submit} handleTitle={props.methods.setOrgasmTitle} handleFile={props.methods.setOrgasmFile}/>}
            </div> 
            
           </div>
    
        </div>
  
    )
}

export default Desktop;


