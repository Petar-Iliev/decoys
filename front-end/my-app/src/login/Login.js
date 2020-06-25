import React, { useEffect, useState } from 'react'

import axios from 'axios'
import Cookies from 'js-cookie'

import {useSelector,useDispatch,Selector} from 'react-redux'
import {log} from '../actions/index.js'



function Login(props){

  
    const [username,setUsername] =useState("");
    const [password,setPassword] =useState("");
    const [invalidInput,setInvalidInput] =useState("");

    const logged=useSelector(state=>state.log);
    const dispatcher=useDispatch();
 
    function handleSubmit(e){
        e.preventDefault();
        

        let data={
            username:username,
            password:password
        }
      
  
        axios({
            method:"post",
             url:"http://localhost:8050/login",
            data:JSON.stringify(data)
        })
      .then(resp=>{

            localStorage.setItem("logged",true);
            localStorage.setItem("user",username)
            Cookies.set("token",resp.headers.authorization);
           
                  dispatcher(log());
              
            props.history.push("/"); 
        }).catch(err=>{
            console.error(err);
          setInvalidInput("Invalid Username OR Password");
        })

         
    }

   function handleChange(event){

    if(event.target.name==="username"){
        setUsername(event.target.value)
    }else{
        setPassword(event.target.value)
    }
    }
  

    useEffect(()=>{
        
        if(logged){
            props.history.push("/");
        }
    },[]);


   
        return (
            <>  
           <div className="wrapper">
         <div className="form-wrapper">
          <h2 className="regH1">Login</h2>
          <form onSubmit={handleSubmit}>
              <div className="firstName">
                  <label htmlFor="username">Username</label>
                  <input type="text" className="" placeholder="Username" name="username" onChange={handleChange} value={username}/>
              </div>
              <div className="password">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="" placeholder="Password" name="password" onChange={handleChange} valu={password}/>
              </div>
              <div className="createAccount">
              {invalidInput.length>1 && (
                      <span className="errorMessage">{invalidInput}</span>
                  )}
                  <button type="submit">Login</button>
              </div>
            
          </form>

         </div>
           </div>
           </>
        );
    }


export default Login;

