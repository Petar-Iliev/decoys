import React from 'react';
import img from './imgs/DSC_0009(1)(1).jpg'

const About = () =>{

    return(
        <div className="phi-master">
            <div className="phi-container">
                <h2>OrgasmicMakers 5000</h2>
                <p>NO!</p><p> We are not some door to door dildo sellers.<br/>
             We are small team based in Bulgaria dedicated to the cause.<br/>
             We've spent last 10 years studing orgasm.<br/>
             Found voice actors which have experienced orgasms on their own.<br/>
Hired biggest orgasmologist on the planet Dr. P.I.I.<br/>

<img alt="Dr. P.I.I" src={img} className="pesho-pic"/> <br/>

 </p>

 <h2>The Studio</h2>
 <p>This is where all the magic happens.<br/>
We spent our free time searching for the next orgasm.<br/>
Went to every single bar , disco ,fast food resturant,lightless street , church , shared taxi lifts just to find the next muse,<br/>
just to deliver next wet slappy Orgasm.<br/>
</p>
{/* <p>CONTACT US   +359877513153</p> */}
            </div>
        </div>
    )
}

export default About;