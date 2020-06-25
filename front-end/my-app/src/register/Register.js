import React, { useState, useEffect } from 'react'

import {Link}  from "react-router-dom"

import styles from '../register/register.css';
import {useSelector,useDispatch} from 'react-redux';
import {log} from '../actions/index.js'




function Register(props){


    const [alreadyExists,setAlreadyExists]=useState("");
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [repeatPassword,setRepeatPassword]=useState("");
    const [usernameError,setUsernameError]=useState("");
    const [passwordError,setPasswordError]=useState("");
    const [repeatPasswordError,setRepeatPasswordError]=useState("");
    
    const logged=useSelector(state=>state.log);




   


     useEffect(()=>{
        
        if(logged){
            props.history.push("/");
        }
    },[]);

   function handleSubmit(e){
         e.preventDefault();

         
    
         if(usernameError.length>0 || passwordError.length>0 || repeatPasswordError.length>0 
            || password!==repeatPassword || username.length<6 || password.length<6){
     
         }else{

        let data=JSON.stringify({
            username:username,
            password:password,
            repeatPassword:repeatPassword
        });



      
            fetch("http://localhost:8050/register",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:data
            }).then(resp=>{
                if(resp.status>399){
                    setAlreadyExists("User already exists")
                    throw Error("invalid")
                }
            })
            .then(resp=>{
              
                props.history.push("/login")
            }).catch(err=>{
                console.log(err);
            })

       
       }

    }

    function handleUsername(e){

        const value=e.target.value;
        setUsername(value)
    
  
        if(value.length<6){
            setUsernameError("Username must be atleast 6 symblos")
          
        }else{
            setUsernameError("");
        }
  
    }
  function  handlePassword(e){
      
        const value=e.target.value;
     
        setPassword(value);

      if(value.length<6){
       
        setPasswordError("Password must be atleast 6 symblos");
      }else{
          setPasswordError("")
      }

      if(value === repeatPassword){
        
        setRepeatPasswordError("");
      }else{
        setRepeatPasswordError("Password does not match");
      }


   }
  function handleRepeatPassword(e){
    const value=e.target.value;
   
    setRepeatPassword(value);

    if(value !== password){
     
        setRepeatPasswordError("Password does not match");
    }else{
        setRepeatPasswordError("");
    }


   }

    return(

            <>
           <div className="wrapper">
         <div className="form-wrapper">
          <h2 className="regH1">Create Account</h2>
          <form onSubmit={handleSubmit}>
              <div className="firstName">
                  <label htmlFor="username">Username</label>
                  <input type="text" className="" placeholder="Username" name="username" onChange={handleUsername}/>
                  {usernameError.length>1 && (
                      <span className="errorMessage">{usernameError}</span>
                  )}
              </div>
           

              <div className="password">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="" placeholder="Password" name="password" onChange={handlePassword}/>
                  {passwordError.length>1 && (
                      <span className="errorMessage">{passwordError}</span>
                  )}
              </div>

              <div className="password">
                  <label htmlFor="repeatPassword">Repeat password</label>
                  <input type="password" className="" placeholder="Repeat password" name="repeatPassowrd" onChange={handleRepeatPassword}/>
                  {repeatPassword.length>1 && (
                      <span className="errorMessage">{repeatPasswordError}</span>
                  )}
              </div>

              <span className="errorMessage">{alreadyExists}</span>
              <div className="createAccount">
                  <button type="submit">Create Account</button>
                 
                  <Link to="/login"><small>Already Have an Account?</small></Link>
              </div>
          </form>

         </div>
           </div>
           </>
        );
    
 
}


export default Register;





