import React, { useState } from 'react'
import Cookies from 'js-cookie'

 const LogContext=React.createContext();

 export const LogProvider = props => {

    const [logged,setLogged] =useState(localStorage.getItem("logged") ? "logged" : "not logged");

    return(
        <LogContext.Provider value={[logged,setLogged]}>
            {props.children}
        </LogContext.Provider>
    )
 }

export default LogContext;