import React from 'react';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import allReducers from './reducers/index.js';

import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  
} from "react-router-dom";
import Header from './header/Header'
import Philosophy from './staticPages/Philosophy'
import Orgasm from './orgasms/OrgasmPage'
import Main from './main/Main'
import Login from './login/Login'
import Register from './register/Register'
import NotFound from './staticPages/NotFound'
import Stripe from './stripe/Stripe'
import Admin from './admin/Admin'

import About from './about/About';


const App = ()=> {



      const store =createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

  return (
    <>
    <Router>
      <Provider store={store}>
    <Header/>
      <Switch>
        <Route exact path="/" component={Main}/>
        <Route  path="/login" component={Login}/>
        <Route  path="/register" component={Register} />
        <Route path="/orgasms" component={Orgasm}/>
        <Route path="/donate" component={Stripe}/>
        <Route path="/admin" component={Admin}/>
        <Route path="/philosophy" component={Philosophy}/>
        <Route path="/about" component={About}/>
     
        <Route component={NotFound}/>
      </Switch>
    
      </Provider>
    </Router>
    </>
  );
      
}

export default App;
