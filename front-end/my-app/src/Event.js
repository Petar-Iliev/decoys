import React from 'react';
import {ReactComponent as Clock} from './main/svgs/clock.svg';
import {ReactComponent as Location} from './main/svgs/location.svg';
import {ReactComponent as Close} from './orgasms/orgmp/close-button.svg';
import {Link} from "react-router-dom";
import Cookies from 'js-cookie'

function Event (props){


  function deleteEvent(){

    fetch(`http://localhost:8050/event/delete/${id}`,{
      method:"DELETE",
      headers:{
        "Authorization":Cookies.get("token")
      }
    }).then(resp=>{
      resp.status<400 ? window.location.reload() : alert("Server Error")
    }).catch(err=>console.log(err));
  }
  


  const {date,info,location,type,icon,id,color} = props.sets;

  if(date===""){
    return (
      <div className="event">
        Wanna suggest something?
        Contact Us
        <Link to="/contact">Email</Link>
        <a href="tel:+359-877-513-153">+359 877-513-153</a>
        <div className="close-ev ev-s"><Close onClick={()=>props.close("")}/></div>
      </div>
    )
  }

    return(
      <div className={`event ${color}`}>
             
          <div className="type-ev ev-s">
            {icon}
          <span>{type}</span>
          </div>
          <div className="location-ev ev-s sixteen">
            <Location/>
          <span>{location}</span>
          </div>
         
          <div className="type-time ev-s">
          <Clock/>
          <span>{date.getHours()} : {date.getMinutes()}</span>
          </div>

          <div className="type-info ev-s sixteen">
          <span>{info}</span>
          </div>
          <div className="close-ev ev-s"><Close onClick={()=>props.close("")}/></div>

    
    {/* <span > {date.getHours()} : {date.getMinutes()}</span> */}
     
     
      {props.isAdmin && <div className="ev-s d-w sixteen" onClick={deleteEvent}>
        <span className="delete-ev">DELETE</span>
        </div>}
        </div>
   
    )
}

Event.defaultProps={
  sets:{info:""}
}

export default Event;