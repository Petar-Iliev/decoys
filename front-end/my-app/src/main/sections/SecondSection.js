
import React from 'react'
import hip from '../svgs/hip.svg'
import love from '../svgs/blind-date.svg'
import butcher from '../svgs/butcher(1).svg'
import styled from 'styled-components'

const StyledSecondSection=styled.section`
  position: absolute;
  margin-top: 600px;
  margin-left: 80px;
  height: 300px;
  width: 800px;
`

const StyledIconsWrapper = styled.div`

  position: relative;
  display: flex;
  justify-content: center;
  left: 17%;
  z-index: 2;
`
const StyledIconItem= styled.div`
  z-index: 3;
  margin: 3rem;
  padding: 2rem;
  border: 5px solid black;
  background-color: #7158e2;
  border-radius: 50%;
`

// .svg{
//   width: 60px;
//   height: 60px;
// }


const StyledSvgImg = styled.img`
  width: 60px;
  height: 60px;
`

const SecondSection = () =>{

    return(
        
  
      <section className="second-section">
        <div className="icons-wrapper">
        <StyledIconItem>
        <StyledSvgImg src={love} alt="blind-love" />
        </StyledIconItem>
        <StyledIconItem>
        <StyledSvgImg src={hip} alt="hip" />
        </StyledIconItem>
        <StyledIconItem>
        <StyledSvgImg src={butcher} alt="butcher"/>
        </StyledIconItem>
      </div>
      </section>


      
    )
}

export default SecondSection;

{/* <StyledSecondSection>
<StyledIconsWrapper>
<StyledIconItem>
<StyledSvgImg src={love} alt="blind-love" />
</StyledIconItem>
<StyledIconItem>
<StyledSvgImg src={hip} alt="hip" />
</StyledIconItem>
<StyledIconItem>
<StyledSvgImg src={butcher} alt="butcher"/>
</StyledIconItem>
</StyledIconsWrapper>
</StyledSecondSection> */}
