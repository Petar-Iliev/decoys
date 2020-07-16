import React from 'react'

import NavItem from './NavItem';

function SideNav(props){


    return(
        <div className="side-nav-admin">
        <ul className="side-ul">
         <NavItem onClick={(e)=>console.log("SOETH")} name="Find"/>
         <NavItem name="Create"/>
        </ul>
      </div>

    )
}

export default SideNav;