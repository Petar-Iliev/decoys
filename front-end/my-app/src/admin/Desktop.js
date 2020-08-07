import React, { useState, useEffect } from 'react';


import UserInfo from './UserInfo';
import Create from './Create';
import Orgasm from './Orgasm';
import './admin.css'

function Desktop(props){

    const [input,setInput]=useState("");
    const [objIn,setObjIn]=useState(true);
    const [findType,setType] = useState("user");
    const [userProps,setUserProps] = useState({username:"",roles:[],orgasms:[]});
    const [orgasmProps,setOrgasmProps] = useState({});
    const [allPending,setAllPending] = useState([]);

 
    function handleInput(e){
      setInput(e.target.value);
    }

   async function findObj(){
      if(findType==="user"){
        const res=await props.methods.find(input);
      
        setUserProps({
          username:res.username,
          roles:res.authorities,
          orgasms:res.orgasms
        })
  
      }else{
        const res= await props.methods.findOrgasm(input);
         setOrgasmProps({...res});
      }

    }

    async function deleteObj(name,type){
       const resp= await props.methods.delete(type,name);
       if(resp.msg){
     
        if(type==="orgasm"){
          setAllPending(await props.methods.allPending());
          const arrs=userProps.orgasms.filter(e=>e.title!==name);
       
           setUserProps({...userProps,orgasms:arrs});
         }else{
           setUserProps({})
         }
       }
      }

    async function deleteOrg(title){
      const resp= await props.methods.delete("orgasm",title);
      if(resp.msg){
        setAllPending(await props.methods.allPending());
        setOrgasmProps({})

      }
    }

    async function togglePending(title){
      const res = await props.methods.setPending(title);
      if(res.id){
        setAllPending(await props.methods.allPending());
        if(orgasmProps.title===res.title){
          setOrgasmProps({...orgasmProps,pending:res.pending})
        }
          const orgasms= userProps.orgasms;
          const index = orgasms.map(e=>e.title).indexOf(title);
          if(index!==-1){
            orgasms[index].pending= res.pending;
            setUserProps({...userProps,orgasms:orgasms});
          }
      }

    }

    async function setRole(role){

     const res = await props.methods.setRole(userProps.username,role.replace("ROLE_",""));
     if(res.id){
       setUserProps({...userProps,roles:res.authorities})
     }

    }
    function toggleSearchType(){
      setType(findType==="user" ? "orgasm " : "user");
    }
  
    async function findAllPending(){
      setAllPending(await props.methods.allPending());
    }

   function changeOption(e){
    const val=e.target.innerHTML;
    if(val==="FIND"){
      setObjIn(true);
    }else if(val==="PENDING"){
      setObjIn(false);
      findAllPending();
    }
   }

    return(
        <div className="desktop-master">     
           <div className="main-admin">
            <div className="admin-search">
              <div className="optins-tye" onClick={changeOption}>
               <span className="option-nav-ad">FIND</span><span className="option-nav-ad">PENDING</span>
              </div>
              <>
              <div className={`find-${findType}`} onClick={toggleSearchType}>O</div>
              <input type="text" placeholder="Search..." className="admin-search" value={input} onChange={handleInput} onKeyDown={(e)=>{
                if(e.keyCode===13){
                 findObj();
                  setInput("");
                }
              }}/> 
              </>
            </div>
            <div className="info-admin">
            {objIn ? findType=== "user" ? <UserInfo
             methods= {{setPending:togglePending,delete:deleteObj,setRole:setRole}} 
             username={userProps.username}
            roles={userProps.roles} 
            orgasms={userProps.orgasms}/> 
            : <Orgasm delete={deleteOrg} setPending={togglePending} pending={orgasmProps.pending} title={orgasmProps.title} videoUrl={orgasmProps.videoUrl}/> :
          
            allPending.map(e=> <Orgasm key={e.id} user={e.user} delete={deleteOrg} setPending={togglePending} pending={e.pending} title={e.title} videoUrl={e.videoUrl} />)}
            </div>        
           </div>
        </div>
    )
}

export default Desktop;
















