import React from 'react';
import {loadStripe} from '@stripe/stripe-js';



import test from './svgs/test.png'
import {ReactComponent as Arrow} from './svgs/charity.svg'



const stripePromise = loadStripe("pk_test_VL50R6uhNM3XllsbamRE6nhp00zajtxJhN");

class Stripe extends React.Component{

    constructor(){
        super();
        
        this.handleClick=this.handleClick.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handleButtonClick=this.handleButtonClick.bind(this);

        const arr=[];
        const priceArr=[5,10,20,50,100];

        for(let i=0;i<5;i++){
            arr.push( <div  className="first-line don" onClick={this.handleButtonClick}> 
            <h2 className="mmm">{priceArr[i]}</h2><h2 className="dollar mmm">$</h2>
            </div>)
        }

      
        this.state={
            skus:["sku_HIRs1ze3jIKZp5","sku_HIRsKCY63qmaHv","sku_HIRtQX7VCcm4k5","sku_HIRtMyYqzUk2La","sku_HIRtfQKnKBxxJu"],
            index:0,
            prices:priceArr,
            checker:arr
            
        }


      
      
   

        
    }
   

     handleClick = async(event)=>{

        console.log("here")
        const stripe=await stripePromise;

        const {error}= await stripe.redirectToCheckout({
            items:[
                {sku:this.state.skus[this.state.index],quantity:1},
            
            ],
            successUrl:"http://localhost:3000/",
            cancelUrl:"http://localhost:3000/login"
        });
    }

    handleChange(e){


        this.setState({
            amount:e.target.value
        })
    }


    

  async  handleButtonClick(){


        let nextIndexPrice=(this.state.index)+1;
        if(nextIndexPrice===this.state.prices.length){
            nextIndexPrice=0;
        }
       
   
  
      
    this.setState({
        index:nextIndexPrice
 },function(){
     
 });
      
    }


   render(){

    return (
        <>
        <div className="donate-root">
         <div className="donation-holder">
       
   {/* <div  className="first-line don" onClick={this.handleButtonClick}> 
   <h2 className="mmm">{this.state.prices[this.state.index]}</h2><h2 className="dollar mmm">$</h2>
   </div> */}
        {this.state.checker[this.state.index]}
  
   <div className="don arr" >
      <Arrow className="arrow" onClick={this.handleClick}/>
      </div>
    </div>
         <div className="schema">
                <img src={test} className="bigger"/>
               </div>
          </div>     
          </>
    )
}}

export default Stripe;

