import React from 'react'
// import test from  '../pngs/center.png'
import test from  '../pngs/JefCenterTwo.png'

import {Link} from "react-router-dom";


 

const OpenSection = () => {
 
        return (
            <section className="open-section"> 
            <div className="title-holder">
            <h1 className="title-main-orgasm">ORGASM IS AN ART</h1>
            <div>
                <div className="are-you">
                <h2>ARE YOU AN ARTIST ?</h2>
             <h2 className="lets-talk">LET'S TALK ART !</h2>
                </div>
        
            </div>
              <div className="buttons">
          <Link to="/orgasms" ><button className="btn-content">Orgasms</button></Link>
          <Link to="/philosophy"><button className="btn-phi">Philosophy</button></Link>
         </div>
            </div>
            <div className="blue-img">
                <img src={test} alt="blue-purple-way" className="purple-img"></img>
            </div>
            </section>
       



        )
    
}

export default OpenSection;



