import React, { useState, useEffect } from 'react'
import QrCode from 'qrcode.react';
import Cookies from 'js-cookie'
import './userorgasms.css';
import Orgasm from './Orgasm'
import CreateOrgasm from './CreateOrgasm'
import DonateProps from './DonateProps';
import {ReactComponent as Thumb} from './orgmp/like.svg';
import {ReactComponent as ThumbDown} from './orgmp/dislike.svg';
import {ReactComponent as Person} from './orgmp/man.svg'
import {ReactComponent as CloseBtn} from './orgmp/close-button.svg'
import {ReactComponent as Bitcoin} from './orgmp/bitcoin.svg';
import {ReactComponent as Patreon} from './orgmp/patreon.svg';
import { CSSTransition } from 'react-transition-group'



import {useSelector,useDispatch} from 'react-redux'
import {log} from '../actions/index.js';


function UserOrgasms(props){

    const[liked,setLiked]=useState([]);
    const[disliked,setDisliked]=useState([]);
    const[own,setOwn]=useState([]);
    const [create,setCreate]=useState(false);
    const [donateProps,setDonateProps] = useState(false);
    const [donate,setDonate] = useState(false);
    const [donateTo,setDonateTo] = useState({});

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
       .then(resp=>{
         
           console.log(resp);
           return resp;
       }) 
       .catch(err=>console.error(err))
    }

    function openDonationPop(userInfo){
        setDonateTo(userInfo)  
        setDonate(true);
          
    }

  

    return(
        <>
  
        {create && <CreateOrgasm closeCreate={setCreate}/>}
        {logged &&
        <div className="orgasms-holder">
      <div className="user-liked-orgasms org-list">
          <Thumb title="pending"/> 
           {liked && liked.map(e=><Orgasm donateInfo={openDonationPop} key={e.id} userDon={e.user} title={e.title} videoUrl={e.videoUrl}/>)}</div>
      <div className="user-orgasms org-list">

          <Person className="metal-man" onClick={()=>setDonateProps(!donateProps)}/>

       <div className="create-org-user" onClick={()=>setCreate(true)}>Create Orgasm</div> 
      {own && own.map(e=><Orgasm key={e.id} title={e.title} pending={e.pending} videoUrl={e.videoUrl}/>)}
      </div>

      <div className="user-disliked-orgasms org-list">
          <ThumbDown title="approved"/> 
          {disliked && disliked.map(e=><Orgasm donateInfo={openDonationPop} key={e.id} userDon={e.user} title={e.title} videoUrl={e.videoUrl}/>)}</div>
        </div>
 
}
       <CSSTransition in={donateProps} timeout={400} unmountOnExit={true} classNames="don-inf-ani">
           <DonateProps close={()=>setDonateProps(false)} />
       </CSSTransition>

       {donate && <DonatePopUp info={donateTo} close={()=>setDonate(false)}/>}
        </>
    )
}


function DonatePopUp(props){

    return(
        <div className="donate-to">
            <div>SUPPORT THE ORGASAMIST</div>
        <span className="don-set"><Bitcoin /> &#x21E8; &#x21E8; &#x21E8; <QrCode value={props.info.bitcoinAddress} size={80}/></span>
        <span className="don-set"><small>PATREON</small>&#x21E8; &#x21E8; &#x21E8; <a href={props.info.patreonLink} target="__blank"><Patreon/></a></span>
        <CloseBtn className={"close-don"} onClick={props.close}/>
        </div>
    )
}



export default UserOrgasms;