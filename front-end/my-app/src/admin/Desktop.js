import React, { useState, useEffect } from 'react';


import SearchBar from './SearchBar';
import Orgasm from './Orgasm';
import './admin.css'
import InfoRow from './InfoRow';

function Desktop(props){

 
    const [objIn,setObjIn]=useState(true);
    const [userProps,setUserProps] = useState({username:"",roles:[],orgasms:[]});
    const [orgasmProps,setOrgasmProps] = useState({});
    const [allPending,setAllPending] = useState([]);
    const [users,setAllUsers] = useState([]);
    const [filterText,setFilterText] = useState("");
    const [filterUser,setFilterUser] = useState(false);

    useEffect(()=>{

     async function init(){
      setAllUsers(await props.methods.allUsers());
     }
    
     init();

    },[])


    function handleFilterTextChange(filterText){
      setFilterText(filterText);
  }

  function handleFilterType(filter){
    setFilterUser(filter);
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
         setAllUsers(await props.methods.allUsers());
       }
      }

    async function deleteOrg(title){
      const resp= await props.methods.delete("orgasm",title);
      if(resp.msg){
        setAllPending(await props.methods.allPending());
        setOrgasmProps({})
        setAllUsers(await props.methods.allUsers());
      }
    }

    async function togglePending(title){
      const res = await props.methods.setPending(title);
      if(res.id){
        setAllPending(await props.methods.allPending());
        setAllUsers(await props.methods.allUsers());
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

    async function setRole(username,role){

     const res = await props.methods.setRole(username,role.replace("ROLE_",""));
     if(res.id){
 
       setAllUsers(await props.methods.allUsers());
     }

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
              <SearchBar filterText={filterText} filterUser={handleFilterType}  onFilterTextChange={handleFilterTextChange} />
            
            </div>
            <div className="info-admin">
           {objIn ? <InfoRow users={users} filterType={filterUser} filterText={filterText} togglePending={togglePending} deleteObj={deleteObj} setRole={setRole}/>
            :  allPending.map(e=> <Orgasm key={e.id} user={e.user} delete={deleteOrg} setPending={togglePending} pending={e.pending} title={e.title} videoUrl={e.videoUrl} />)}
            </div>        
           </div>
        </div>
    )
}

export default Desktop;






//SHHH
// {objIn ? users.map(e=> <UserInfo
//   methods= {{setPending:togglePending,delete:deleteObj,setRole:setRole}} 
//   username={e.username}
//  roles={e.roles} 
//  orgasms={e.orgasms}/>)
//  :  allPending.map(e=> <Orgasm key={e.id} user={e.user} delete={deleteOrg} setPending={togglePending} pending={e.pending} title={e.title} videoUrl={e.videoUrl} />)}
//SHH









// return(
//   <div className="desktop-master">     
//      <div className="main-admin">
//       <div className="admin-search">
//         <div className="optins-tye" onClick={changeOption}>
//          <span className="option-nav-ad">FIND</span><span className="option-nav-ad">PENDING</span>
//         </div>
//         <>
//         <div className={`find-${findType}`} onClick={toggleSearchType}>O</div>
//         <input type="text" placeholder="Search..." className="admin-search" value={input} onChange={handleInput} onKeyDown={(e)=>{
//           if(e.keyCode===13){
//            findObj();
//             setInput("");
//           }
//         }}/> 
//         </>
//       </div>
//       <div className="info-admin">
//       {objIn ? findType=== "user" ? <UserInfo
//        methods= {{setPending:togglePending,delete:deleteObj,setRole:setRole}} 
//        username={userProps.username}
//       roles={userProps.roles} 
//       orgasms={userProps.orgasms}/> 
//       : <Orgasm delete={deleteOrg} setPending={togglePending} pending={orgasmProps.pending} title={orgasmProps.title} videoUrl={orgasmProps.videoUrl}/> :
    
//       allPending.map(e=> <Orgasm key={e.id} user={e.user} delete={deleteOrg} setPending={togglePending} pending={e.pending} title={e.title} videoUrl={e.videoUrl} />)}
//       </div>        
//      </div>
//   </div>
// )





