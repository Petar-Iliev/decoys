import React, { useState, useRef, useEffect } from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Tilt from 'react-parallax-tilt';
import clip from '../main/svgs/clapperboard(1).svg'
import {CSSTransition} from 'react-transition-group'

import {ReactComponent as Play} from './orgmp/play.svg'
import {ReactComponent as Pause} from './orgmp/pause.svg'
import {ReactComponent as Close} from './orgmp/close-button.svg'
import {ReactComponent as BlackHeart} from './orgmp/healthy.svg';
import {ReactComponent as RedHeart} from './orgmp/healthy(1).svg';



function Orgasm(props){

    


    const [play,setPlay] =useState(false);
    const [isIn,setIn] =useState(false);
    const [videoUrl,setVideoUrl]=useState(props.videoUrl);
    const [favorite,setFavorite]=useState(props.favorite);
    const videoRef=useRef();
    const cardRef=useRef();  

    

    async function playVideo(){
              if(!play){
        await videoRef.current.play();
            
        }else{
           await videoRef.current.pause();
          
        }
        setPlay(!play);
    }

   async function handleVideo(){
        setIn(!isIn);  
     
        
    }
 

    function favoriteVideo(){

        setFavorite(!favorite);
        const token=Cookies.get("token");
        const orgasm=props.title;
        fetch("http://localhost:8050/orgasm/update/favorite",{
            method:'POST',
            headers:{
                "Authorization":token,
                "Content-Type":"application/json"
            },
            body:JSON.stringify({title:orgasm})
        })

    }
 

        return(
            <>
            <Tilt className="box"
            perspective={3000}
            glareEnable={true}
            glareMaxOpacity={0.8}
            scale={1}
            glarePosition={"all"}
           >   
 

         <div className="imgBx" >

      <img src={props.img} ></img>
         </div>
       <div className="contentBx"  >
        <h2>{props.title}</h2>
        <p>{props.content}</p>
        <Link to="#" onClick={handleVideo}><img src={clip} className="clapper"/>
        
        {/* <audio src={this.state.videoUrl} ref={this.videoRef}/> */}
        </Link>
  </div>
 
  </Tilt>     

         <CSSTransition in={isIn} timeout={500} unmountOnExit classNames="movie">
             <div className="full-screen">

            
             <div className="movie-wrapper">
                 <div className="movie-content">
                 <video src={videoUrl} ref={videoRef} className="org-video"/>
                 <div className="video-nav">
                
                <div className="toggle-play"  onClick={playVideo}>
                {play ? <Pause/> : <Play/>}
                </div>
                <div className="close-video">
                     <Close onClick={handleVideo}/>
                </div>
                <div className="favorite-video" onClick={favoriteVideo}>
                   {favorite ? <RedHeart/> : <BlackHeart/>}
                </div>
                
                 </div>
                 </div>
               
             </div>
             </div>
         </CSSTransition>
  </>
        )
    
}

export default Orgasm;