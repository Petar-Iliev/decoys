import React, { useState, useContext } from 'react'


import {CSSTransition} from 'react-transition-group'

import {ReactComponent as Blind} from '../main/svgs/people.svg'
import {ReactComponent as Panties} from '../main/svgs/panties.svg'

import {ReactComponent as PiggyBank} from '../main/svgs/piggybank.svg'
import {ReactComponent as Smartphone} from '../main/svgs/smartphone.svg'


import {
    Link
  } from "react-router-dom";

import Cookies from 'js-cookie'

// import LogContext from '../contexts/LogContext'
import {useSelector,useDispatch} from 'react-redux'
import {log} from '../actions/index.js';



const Header =()=>{

  const logged=useSelector(state=>state.log)
  const dispatcher=useDispatch();
  
    console.log(logged);

    
 
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
  

        dispatcher(log())
      Cookies.remove("token");
      localStorage.clear();

     
    }
  }

  
    function Profile(props){

      const [open,setOpen] = useState(false)
      return(

        <li className="item four">
         <Link href={window.location.pathname} className="icon-button" onClick={()=>setOpen(!open)}>
      {props.icon}
      </Link>
      <CSSTransition in={open} timeout={500} unmountOnExit classNames="my-node"><DropdownMenu/></CSSTransition> 
        </li>


      );
    }

    function DropdownMenu(){

      return(
      
          <div className="drop-down">
           <Link to="/orgasms" className="prof-cont">
            <span className="drop-title">Your Orgasms</span>
          {<Panties className="prof-svg"/>}
            </Link>
            <Link to="/about" className="prof-cont">
            <span className="drop-title">Contact us</span>
          {<Smartphone className="prof-svg"/>}
            </Link>
              <Link to="/donate" className="prof-cont">
        <span className="drop-title">Donate</span>
        {<PiggyBank className="prof-svg"/>}
            </Link>
      
          
        </div>
     
      
      )

    }
   

      
        if(logged){

            return(
              <>
                <header>
                <nav className="nav">
                  <ul className="container">
                    <Link to="/" className="item one">LOGO</Link>
                    <Link to="/" className="item two">HOME</Link>   
                    <Link to="/about" className="item three">ABOUT</Link>
                     <Profile className="item four"  icon={<Blind/>}>
                  
                     </Profile>
                    <Link to="/orgasms" className="item six">ORGASMS</Link>
                    <Link to="/" onClick={logOut} className="item seven">Logout</Link>
        
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
      
        <Link to="/" className="item two">HOME</Link>
        <Link to="/about" className="item three">ABOUT</Link>
        <Link to="/login" className="item four">Login</Link>
        <Link to='/register' className='item five'>Register</Link>
      </ul>
    </nav>
    
  </header>

  </>
        )
        }
    }


export default Header;