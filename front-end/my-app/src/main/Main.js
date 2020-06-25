import React from 'react'

import OpenSection from './sections/OpenSection'
import SecondSection from './sections/SecondSection'
import ThirdSection from './sections/ThirdSection'


class Main extends React.Component{

    render(){
        return(
          <>
         
          <main className="main-mother">
            <OpenSection/>
             <SecondSection/>
            <ThirdSection/> 
           </main>
           </>
        )
    }
}
export default Main;