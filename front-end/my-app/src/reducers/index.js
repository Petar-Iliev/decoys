import {combineReducers} from 'redux'
import isLogged from './isLogged.js'



const allReducers = combineReducers({
    log:isLogged,
   
})

export default allReducers;