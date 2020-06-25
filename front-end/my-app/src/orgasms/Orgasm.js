import React, { useState, useRef, useEffect } from 'react'
import Tilt from 'react-parallax-tilt';
import clip from '../main/svgs/clapperboard(1).svg'
import {Link} from 'react-router-dom'
import {CSSTransition} from 'react-transition-group'

import {ReactComponent as Play} from './orgmp/play.svg'
import {ReactComponent as Pause} from './orgmp/pause.svg'
import {ReactComponent as Close} from './orgmp/close-button.svg'



function Orgasm(props){

    


    const [play,setPlay] =useState(false);
    const [isIn,setIn] =useState(false);
    const [videoUrl,setVideoUrl]=useState(props.videoUrl);
      const videoRef=useRef();
      

    

    async function playVideo(){
              if(!play){
        await videoRef.current.play();
            
        }else{
           await videoRef.current.pause();
          
        }
        setPlay(!play);
    }

   async function handleVideo(){

        // if(!this.videoRef.current.playing){
        // await this.videoRef.current.play();
        //     this.videoRef.current.playing=true;
        // }else{
        //    await this.videoRef.current.pause();
        //     this.videoRef.current.playing=false;
        // }

        setIn(!isIn);
       
    }
 

    // useEffect(()=>{


    // },[])
 

        return(
            <>
            <Tilt className="box"
            perspective={3000}
            glareEnable={true}
            glareMaxOpacity={0.8}
            scale={1}
            glarePosition={"all"}>   
 

         <div className="imgBx">

      <img src={props.img} ></img>
         </div>
       <div className="contentBx">
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
                
                 </div>
                 </div>
               
             </div>
             </div>
         </CSSTransition>
  </>
        )
    
}

export default Orgasm;