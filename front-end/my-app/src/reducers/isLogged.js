
import Cookies from 'js-cookie'





 const  isLogged =  (  state=Cookies.get("token")!=undefined ? true : false,action)=>{



    switch(action.type){
        case "LOG":
            return !state;
            default:
              
            return state;
    }
}

export default isLogged;