import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import './userorgasms.css';
import Orgasm from './Orgasm'
import CreateOrgasm from './CreateOrgasm'
import {ReactComponent as BlackHeart} from './orgmp/healthy.svg';
import {ReactComponent as Person} from './orgmp/man.svg'

function UserOrgasms(){

    const[liked,setLiked]=useState([]);
    const[disliked,setDisliked]=useState([]);
    const[own,setOwn]=useState([]);
    const [create,setCreate]=useState(false);
    useEffect(async ()=>{

        setOwn(await fetchData("all-own"));
        setLiked(await fetchData("all-liked"));
        setDisliked(await fetchData("all-disliked"));
     
    },[]);


   async function fetchData(path){

       return await fetch(`http://localhost:8050/orgasm/find/users/${path}`,{
           method:"GET",
           headers:{
               "Authorization":Cookies.get("token")
           }
       })
        .then(resp=>resp.json())
        .catch(err=>console.error(err))
    }

    return(
        <>
        {create && <CreateOrgasm/>}
        <div className="orgasms-holder">
      <div className="user-liked-orgasms org-list"><BlackHeart title="pending"/>  {liked.map(e=><Orgasm key={e.id} title={e.title} videoUrl={e.videoUrl}/>)}</div>
      <div className="user-orgasms org-list">

          <Person className="metal-man"/>

       <div className="create-org-user" onClick={()=>setCreate(true)}>Create Orgasm</div> 
      {own.map(e=><Orgasm key={e.id} title={e.title} pending={e.pending} videoUrl={e.videoUrl}/>)}
      </div>

      <div className="user-disliked-orgasms org-list">
          <BlackHeart title="approved"/> 
          {disliked.map(e=><Orgasm key={e.id} title={e.title} videoUrl={e.videoUrl}/>)}</div>
        </div>

        </>
    )
}

export default UserOrgasms;