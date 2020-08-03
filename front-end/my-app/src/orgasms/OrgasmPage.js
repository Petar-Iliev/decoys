import React, { useEffect, useState, useRef } from 'react'

import Cookies from 'js-cookie'


import {useSelector} from 'react-redux'

import urlC from './orgmp/original.gif';
import {ReactComponent as QuestionMark} from './orgmp/question.svg';
import {ReactComponent as Thumb} from './orgmp/like.svg'
import {ReactComponent as ThumbDown} from './orgmp/dislike.svg'
import { CSSTransition } from 'react-transition-group'


 const OrgasmPage=(props) =>{

   

     const [tapeUrl,setTapeUrl]=useState("");
     const [diskInside,setDiskInside]=useState(false);
     const [likeDislike,setLikeDislike]=useState(false);
     const[like,setLike]=useState(false);
     const [dislike,setDislike]=useState(false);
     const [msg,setMsg]=useState("");
     const [msgIn,setMsgIn]=useState(false);
     const notFoundMsgs=["It seems you haven't liked anything yet!","Can't find any orgasms that you disliked ;)","Can't find any orgasms that you haven't liked/disliked"];
     
      
     const [title,setTitle]=useState("");

    const tapeRef=useRef();
    const logged=useSelector(state=>state.log)

    
    useEffect(()=>{
        
        if(!logged){
            props.history.push("/register")
        }
          
    },[1]);
    
    function playMe(){
       tapeRef.current.play();
      
    }
    
  async  function  getLiked(){
       if(msgIn!==""){
           setMsgIn(false);
       }
      refresh();
      refreshMetaProps();
         await fetch("http://localhost:8050/orgasm/find/liked",{
             method:"GET",
             headers:{
                 "Authorization":Cookies.get("token")
             }
         })
         .then(resp=>resp.json())
         .then(data=>{
            console.log(data.title);
             if(!data.videoUrl){
              setMsg(notFoundMsgs[0])
              setMsgIn(true);
             }else{
            setTapeUrl(data.videoUrl);
            setDiskInside(true);
            setTitle(data.title);
            setLikeDislike(true);
            setDislike(true);
            setLike(false);

           setMsg("");     
        }
         })
         .catch(err=>{
             console.error(err);
         })

          playMe();
      }
      async function  getDisliked(){
        if(msgIn!==""){
            setMsgIn(false);
        }
        refresh();
        refreshMetaProps();
       await fetch("http://localhost:8050/orgasm/find/disliked",{
            method:"GET",
            headers:{
                "Authorization":Cookies.get("token")
            }
        })
        .then(resp=>{
           
            return resp;
        })
        .then(resp=>resp.json())
        .then(data=>{
            if(!data.videoUrl){
               setMsg(notFoundMsgs[1]);
               setMsgIn(true);
            }else{
            
            setTapeUrl(data.videoUrl);
            setDiskInside(true);
            setTitle(data.title);
            setLikeDislike(true);
            setLike(true);
            setDislike(false);
            setMsg("");
            }
        })
        .catch(err=>{
            console.error(err);
        })
        playMe();
     }
   async  function  getRandom(){
    if(msgIn!==""){
        setMsgIn(false);
    }
    refresh();
    refreshMetaProps();
       await fetch("http://localhost:8050/orgasm/find/random",{
            method:"GET",
            headers:{
                "Authorization":Cookies.get("token")
            }
        })
        .then(resp=>resp.json())
        .then(data=>{
           
            if(!data.videoUrl){
                  setMsg(notFoundMsgs[2])
                  setMsgIn(true);
            }else{
       
            setTapeUrl(data.videoUrl);
            setDiskInside(true);
            setTitle(data.title);
            setLikeDislike(true);
            setLike(true);
            setDislike(true);

            setMsg("");
        }
            
        })
        .catch(err=>{
            console.error(err);
        })
         playMe();
     }

     
     function likeIt(){
       refresh();
       
          
       fetch(`http://localhost:8050/orgasm/like/${title}`,{
           method:"PUT",
           headers:{
               "Authorization":Cookies.get("token"),
           },
       })

     }
     function disLikeIt(){
       refresh();
        
        fetch(`http://localhost:8050/orgasm/dislike/${title}`,{
            method:"PUT",
            headers:{
                "Authorization":Cookies.get("token"),
              
            },
          
        })
     }

     function refresh(){
         setLikeDislike(false);
     }
     function refreshMetaProps(){

         setDiskInside(false);
         setMsg("");
         setTapeUrl("");
     }

return(
       <>
           
           {/* <div className="bg-1"></div>
           <div className="bg-2"></div> */}

           <div className="orgasm-page-master">
               <CSSTransition in={diskInside} timeout={800} classNames="tape-ani" unmountOnExit={true}>
               
               {/* <img src="https://data.whicdn.com/images/293015045/original.gif" className="casset"></img>   */}
               <img src={urlC} className="casset"></img>  
               </CSSTransition>
               <audio src={tapeUrl} ref={tapeRef}></audio>

                <CSSTransition in={msgIn} timeout={1000} classNames="not-found-ani" unmountOnExit={true}>
                <h1 className="not-found-org-msg">{msg}</h1>
                </CSSTransition>
         
              
            
 <div className="orgasm-page-holder">
 <CSSTransition in={likeDislike} timeout={800} classNames="like-dis-ani" unmountOnExit={true} onExited={()=>{
     setLike(false);
     setDislike(false);
 }}>

 <div className="push-button-holder">
     {like && 
 <div className="l-d-btn likes" onClick={likeIt}>
 <Thumb className="liked-btn"/>
 </div>
 }
 {dislike &&
 <div className="l-d-btn dislikes" onClick={disLikeIt}>
 <ThumbDown className="liked-btn"/>
 </div>
 }
 </div>

 </CSSTransition>

 <div className="option-buttons-holder">
     <div className="option-button">
     <QuestionMark className="random-btn" onClick={getRandom}/>
     </div>
     <div className="option-button">
     <Thumb className="liked-btn" onClick={getLiked}/>
     </div>
     <div className="option-button">
     <ThumbDown className="liked-btn" onClick={getDisliked}/>
     </div>

    
 </div>

</div>
 </div>

        </>
        );
    
 }

export default OrgasmPage;

