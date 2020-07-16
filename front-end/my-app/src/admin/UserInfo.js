import React from 'react'
import Orgasm from './Orgasm'

function UserInfo(props){

    const validRoles=["ROLE_ROOT","ROLE_ADMIN","ROLE_USER","ROLE_GUEST"];

    async function setUserRole(e){

        await props.methods.setRole(props.username,e.replace("ROLE_",""));
     
       }

       if(!props.username){
           return <></>
       }else{

    return(
 
        <div className="user-info">
      <span className="user-info-username">Username : {props.username}   <span className="desk-delete-org" onClick={()=>props.methods.delete("user",props.username)}>DELETE</span></span>
    
          <div className="user-roles">
            Roles:
      {validRoles.map(e=><span key={e} className={`role-color ${props.roles.includes(e) ? "green":"white"}`} onClick={()=>setUserRole(e)}>{e}</span>)}
          </div>
       
          <div className="user-orgasms">
         Orgasms:
         <pre className="pre-orgasms">
    {props.orgasms.map(e=><Orgasm username={props.username} delete={props.methods.delete} key={e.title} setPending={props.methods.setPending} title={e.title} videoUrl={e.videoUrl} pending={e.pending}/>)}
         </pre>
          </div>
        </div>
    
    )}
}

export default UserInfo;