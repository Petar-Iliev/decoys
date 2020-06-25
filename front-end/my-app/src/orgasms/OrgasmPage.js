import React, { useEffect, useState } from 'react'
import Orgasm from './Orgasm'
import Cookies from 'js-cookie'
import orgasmstlye from './orgasm.css'
import LogContext from '../contexts/LogContext'
import {ReactComponent as Robot} from '../main/svgs/robot.svg';

import {useSelector} from 'react-redux'


 const OrgasmPage=(props) =>{

   

    
  
    const [list,setList]=useState([]);
    const [error,setError]=useState("");

    const logged=useSelector(state=>state.log)
    
    useEffect(()=>{
        
        console.log("call Me");
        if(!logged){
            props.history.push("/register")
        }else{

        const token=Cookies.get("token");
       
        fetch("http://localhost:8050/orgasm/videos",{
            method:"GET",
            headers:{
                'Authorization':token,
            }
        }).then(resp=>
          resp.json()
        )
        .then(resp=>{
          
           const renderItems= resp.map(e=>{
                return <Orgasm title={e.title} content={e.content} img={e.imgUrl} videoUrl={e.videoUrl} key={e.title} in={false}></Orgasm>
           });
           setList(renderItems)
           
        }).catch(err=>{
           
            setError(<div className="org-err">
            <h1>Server Error</h1>
            <Robot className="robot"/>
            </div>);
          
        })
        ;

    }
    },[1]);
   
return(


            <>
            <div className="master">
                 <div className="containerOrg">
                     {list}
                     {error}
                 </div>
            </div>
         
        </>
        );
    
 }

export default OrgasmPage;

