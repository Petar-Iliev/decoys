import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import './userorgasms.css';
import Orgasm from './Orgasm'
import CreateOrgasm from './CreateOrgasm'
import {ReactComponent as Thumb} from './orgmp/like.svg';
import {ReactComponent as ThumbDown} from './orgmp/dislike.svg';
import {ReactComponent as Person} from './orgmp/man.svg'

import {useSelector,useDispatch} from 'react-redux'
import {log} from '../actions/index.js';

function UserOrgasms(props){

    const[liked,setLiked]=useState([]);
    const[disliked,setDisliked]=useState([]);
    const[own,setOwn]=useState([]);
    const [create,setCreate]=useState(false);

    const logged=useSelector(state=>state.log);
    const dispatcher=useDispatch();

    useEffect( ()=>{

        async function init(){
            setOwn(await fetchData("all-own"));
            setLiked(await fetchData("all-liked"));
            setDisliked(await fetchData("all-disliked"));
        }

     init();
     
    },[]);


   async function fetchData(path){

       return await fetch(`http://localhost:8050/orgasm/find/users/${path}`,{
           method:"GET",
           headers:{
               "Authorization":Cookies.get("token")
           }
       })
        .then(resp=>{
            
            if(resp.status > 400){
                dispatcher(log());
                Cookies.remove("token");
                props.history.push("/login");
                throw Error("Not logged");
            } else{

            return resp;
            }
        })
        .then(resp=>resp.json())
        .catch(err=>console.error(err))
    }

    return(
        <>
  
        {create && <CreateOrgasm closeCreate={setCreate}/>}
        {logged &&
        <div className="orgasms-holder">
      <div className="user-liked-orgasms org-list">
          <Thumb title="pending"/> 
           {liked.map(e=><Orgasm key={e.id} title={e.title} videoUrl={e.videoUrl}/>)}</div>
      <div className="user-orgasms org-list">

          <Person className="metal-man"/>

       <div className="create-org-user" onClick={()=>setCreate(true)}>Create Orgasm</div> 
      {own.map(e=><Orgasm key={e.id} title={e.title} pending={e.pending} videoUrl={e.videoUrl}/>)}
      </div>

      <div className="user-disliked-orgasms org-list">
          <ThumbDown title="approved"/> 
          {disliked.map(e=><Orgasm key={e.id} title={e.title} videoUrl={e.videoUrl}/>)}</div>
        </div>
}
        </>
    )
}

export default UserOrgasms;