import React, { useState } from 'react'


import {ReactComponent as Email} from './main/svgs/email(1).svg';
import {ReactComponent as Mail} from './main/svgs/mailbox.svg';
import {ReactComponent as Target} from './main/svgs/target.svg';

const exp=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
function Contact(props){


    const [subject,setSubject]=useState("");
    const [email,setEmail]=useState("");
    const [text,setText]=useState("");

    function changeSubject(e){
      setSubject(e.target.value);
    }
    function changeEmail(e){
        setEmail(e.target.value);
      }
      function changeText(e){
        setText(e.target.value);
      }

      function submitMail(){

       let exp=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
       if(email.trim!=="" && exp.test(email)===false || text.trim().length < 2){
           alert("invalid email");
       }else{

        const data={from:email,text:`${text}`,subject}
        fetch("http://localhost:8050/mail/send",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        }).then(e=>{

            props.history.push("/"); 
        }).catch(e=>{
            console.error(e);
        })
       }
      }

    return(
       <div className="container-contact">
         
           <div className="contact-form-wrapper">
             
             <form className="contact-form">

             <span className="contact-form-title"> Contact Us </span>
             <div className="form-input validate-input">


                 <Target className="label-input"/>
                 <input  className="contact-input" type="text" placeholder="Subject..." onChange={changeSubject}></input>
                 <span className="focus-input"></span>
             </div>
             <div className="form-input validate-input">
              
                   <Email className="label-input"/>
                 <input  className="contact-input" type="text" placeholder="Email..." onChange={changeEmail}></input>
                 <span className="focus-input"></span>
             </div>
             <div className="form-input validate-input">
                 {/* <span className="label-input">Name</span> */}
               
               <textarea rows="10" cols="40 " className="contact-input" placeholder="Type here..." onChange={changeText}></textarea>
             </div>
             <div className="form-input validate-input">
              
              <Mail className="contact-input mail" onClick={submitMail}/>
                
             </div>
             
             </form>

              
           </div>

       </div>
    )
}

export default Contact;


