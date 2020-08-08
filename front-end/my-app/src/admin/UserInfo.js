import React, { useState } from 'react'
import Orgasm from './Orgasm'

function UserInfo(props){

  
  

    const validRoles=["ROLE_ROOT","ROLE_ADMIN","ROLE_USER","ROLE_GUEST"];

       if(!props.username){
           return <></>
       }else{

        const usersRoles = props.roles.map(e=>e.authority);
  

    return(
 
        <div className="user-info">
           
      <span className="user-info-username">Username : {props.username} 
        <span className="desk-delete-org" onClick={()=>props.methods.delete(props.username,"user")}>DELETE</span>
        </span>
    
          <div className="user-roles">
            Roles:
      {validRoles.map(e=><span key={e} onClick={()=>props.methods.setRole(props.username,e)} className={`role-color ${usersRoles.includes(e) ? "green":"white"}`} >{e}</span>)}
          </div>
       
          <div className="user-orgasms">
         Orgasms:
         <pre className="pre-orgasms">
    {props.orgasms.map(e=><Orgasm  delete={props.methods.delete} key={e.title} setPending={props.methods.setPending} title={e.title} videoUrl={e.videoUrl} pending={e.pending}/>)}
         </pre>
          </div>
        </div>
    
    )}
    }

export default UserInfo;