import React, { useState } from 'react'


import {CSSTransition} from 'react-transition-group'

import {ReactComponent as Blind} from '../main/svgs/people.svg'
import {ReactComponent as Panties} from '../main/svgs/panties.svg'

import {ReactComponent as PiggyBank} from '../main/svgs/piggybank.svg'
import {ReactComponent as Smartphone} from '../main/svgs/smartphone.svg'
import {ReactComponent as Admin} from '../main/svgs/laptop.svg';


import {
    Link
  } from "react-router-dom";

import Cookies from 'js-cookie'

// import LogContext from '../contexts/LogContext'

import {useSelector,useDispatch} from 'react-redux'
import {log} from '../actions/index.js';




const Header =()=>{
  const [isAdmin,setIsAdmin] = useState(false);
  const logged=useSelector(state=>state.log)
  const dispatcher=useDispatch();
  
    function logOut(){
      if(logged){

        const data={token:Cookies.get("token")};

        fetch("http://localhost:8050/logoff",{
          method:"POST",
          headers:{
              "Content-Type":"application/json",
              "Authorization":Cookies.get("token")
          },
          body:JSON.stringify(data)
      });
  
        setIsAdmin(false);
        dispatcher(log());
     
      Cookies.remove("token");
      localStorage.clear();

     
    }
  }

 async function adminCheck(){
   await fetch("http://localhost:8050/admin/check",{
      headers:{
        "Authorization":Cookies.get("token")
      }
    }).then(resp=>{
     
      if(resp.status===200){
        setIsAdmin(true);
      }
 
    }).catch(err=>console.error(err))

  }
  
    function Profile(props){

      const [open,setOpen] = useState(false)
      return(

        <li className="item four">
         <Link to="/" className="icon-button" onClick={(e)=>{ 
           e.preventDefault();
          setOpen(!open)
           }}>
      {props.icon}
      </Link>
      <CSSTransition in={open} timeout={500} unmountOnExit classNames="my-node">
        <DropdownMenu close={()=>setOpen(!open)}/>
        </CSSTransition> 
        </li>


      );
    }

    function DropdownMenu(props){

      return(
      
          <div className="drop-down">
           <Link to="/user/orgasms" className="prof-cont" onClick={props.close}>
            <span className="drop-title">Your Orgasms</span>
          {<Panties className="prof-svg"/>}
            </Link>
            <Link to="/contact" className="prof-cont" onClick={props.close}>
            <span className="drop-title">Contact us</span>
          {<Smartphone className="prof-svg"/>}
            </Link>
              <Link to="/donate" className="prof-cont" onClick={props.close}>
        <span className="drop-title">Donate</span>
        {<PiggyBank className="prof-svg"/>}
            </Link>
           {isAdmin &&  <Link to="/admin" className="prof-cont" onClick={props.close}>
        <span className="drop-title">Admin</span>
        {<Admin className="prof-svg"/>}
            </Link>}
          
        </div>
     
      
      )

    }
   

      
        if(logged){

          adminCheck();
            return(
              <>
                <header>
                <nav className="nav">
                  <ul className="container">
                    <Link to="/" className="item one">LOGO</Link>
                    <Link to="/calendar" className="item two">EVENTS</Link>   
                    <Link to="/about" className="item three">ABOUT</Link>
                     <Profile className="item four"  icon={<Blind/>}>
                  
                     </Profile>
                    <Link to="/orgasms" className="item six">ORGASMS</Link>
                    
                    <Link to="/" onClick={logOut} className="item seven">LOGOUT</Link>
        
                  </ul>
                </nav>
                
              </header>
           
              </>
            )
        }else{

        return(
          <>
            <header>
    <nav className="nav">
      <ul className="container">
        <Link to="/" className="item one">LOGO</Link>
      
        <Link to="/contact" className="item two">CONTACT</Link>
        <Link to="/about" className="item three">ABOUT</Link>
        <Link to="/login" className="item four">LOGIN</Link>
        <Link to='/register' className='item five'>REGISTER</Link>
      </ul>
    </nav>
    
  </header>

  </>
        )
        }
    }


export default Header;