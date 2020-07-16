import React from 'react'
import {ReactComponent as TerminalSVG} from '../main/svgs/command-line.svg';


function NavItem(props){

    return(
        <li className="side-item" onClick={()=>console.log("HELLO MUU F")}>
        <a href="#" className="admin-nav-link">
    <TerminalSVG className="admin-side-svg"/> <span className="admin-nav-text">{props.name}</span> 
       </a> 
         </li>
    )
}

export default NavItem;