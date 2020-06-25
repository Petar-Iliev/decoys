
import Cookies from 'js-cookie'





 const  isLogged =  ( state=Cookies.get("token") ? true : false,action)=>{

    switch(action.type){
        case "LOG":
            return !state;
            default:
              
            return state;
    }
}

export default isLogged;