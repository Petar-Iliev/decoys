import React from 'react'





class NotFound extends React.Component{

    constructor(){
        super();
      
        this.state={
            text:"",
            index:0,
            message:"PAGE",
            curs:""
        }
  
        this.test=this.test.bind(this);
     
   
    }

    componentDidMount(){
     
   
        this.test();
       

        
    }

    test(){
      
      let ind=this.state.text.length;
      let msg="PAGE NOT FOUND";
      let current=this.state.text;

    

        if(ind<msg.length){
           
            current+=msg[ind];
            

            this.setState({
                text:current,
                index:this.state.index+1,
                curs:this.state.curs ? "" : "|"
            })

           
        
             setTimeout(()=> this.test.call(this),150);
               
        }
    }
  

   
    render(){

        return(
            <>
            <div>
        <h1 className="page-not-found">{this.state.text}{this.state.curs}</h1>
            </div>
            </>
        )
    }
}

export default NotFound;