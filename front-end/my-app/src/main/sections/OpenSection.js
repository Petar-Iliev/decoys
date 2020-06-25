import React from 'react'
import test from  '../pngs/JefCenterTwo.png'
import styled,{keyframes} from 'styled-components';
import {
   
    Link
    
  } from "react-router-dom";


  const showUp=keyframes`
    
  from{
      left: -17%;
      opacity:0;
  }

  to{
      left: 0%;
  }

  `

const imgMove=keyframes`
  from{
      left: 30%;
      opacity:0.5;
  }
  to{
      left:0%;
  }
`


const StyledOpenSection=styled.section`
    height: 500px;
    width: 700px;
    margin-left: 80px;
    position: absolute;
`

const StyledIntroDiv=styled.div`
    position: relative;
    left: 17%;
    top: 25%;
    font-size: 23px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  
`

const StyledIntroTextDiv=styled.div`
 font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
   font-size: 22px;
   position: absolute;
   margin-top: 25px;
   animation: ${showUp} 1.3s ease 
`
  

  
const StyledImgOne=styled.div`
position: absolute;
animation:${imgMove} 1.2s ease

`
  
const StyledMainImg=styled.img`
    position: absolute;
    overflow-y: hidden;
    overflow-y: hidden;
    width: 1000px;
    left: 270px;
    top: -50px;

`
  


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

{/* <StyledOpenSection> 
<StyledIntroDiv>
<h1 className="title-main-orgasm">ORGASM IS AN ART</h1>
<StyledIntroTextDiv>
 <h2>ARE YOU AN ARTIST ?</h2>
 <h2>LET'S TALK ART !</h2>
</StyledIntroTextDiv>
  <div className="buttons">
<Link to="/orgasms" ><button className="btn-content">Orgasms</button></Link>
<Link to="/philosophy"><button className="btn-phi">Philosophy</button></Link>
</div>
</StyledIntroDiv>
<StyledImgOne>
    <StyledMainImg src={test} alt="blue-purple-way" ></StyledMainImg>
</StyledImgOne>
</StyledOpenSection> */}



