import React, { useEffect, useContext } from 'react'
import Cookies from 'js-cookie'
import LogContext from '../contexts/LogContext'
import { Redirect } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux';
import {log} from '../actions/index.js'

const Logout = ()=>{

   
    const logged=useSelector(state=>state.log);
    const dispatcher=useDispatch();

 

    function renderRedirect(value){

        return (value ?(<Redirect push to={value}/>) : <></>)
    }

    useEffect(()=>{
        console.log("IS SHTI FK")
       if(logged){
           dispatcher(log());
           fetch("http://localhost:8050/logout",{
               method:"POST",
               headers:{
                   "Content-Type":"application/json"
               },
               body:JSON.stringify(Cookies.get("token"))
           })
       }
        Cookies.remove("token");
        localStorage.clear();
        renderRedirect("/")
        
    })
    
        return(
            <>
            {renderRedirect()}
            </>
        )
    
}

export default Logout;