import React, { useState, useEffect } from 'react';
import {ReactComponent as Bitcoin} from './orgmp/bitcoin.svg';
import {ReactComponent as Patreon} from './orgmp/patreon.svg';
import Cookies from 'js-cookie'
import QrCode from 'qrcode.react';



function DonateProps(props){


    const [bitPop,setBitPop]=useState(false);
    const [patPop,setPatPop]=useState(false);
    const [ownProps,setOwnProps] = useState({})
    useEffect( ()=>{

        async function fetchData(){
           setOwnProps(await fetchUserProps());           
        }
      fetchData();
    },[])

    async function fetchUserProps(){
        return await fetch("http://localhost:8050/find/user/donate",{
            headers:{
                "Authorization":Cookies.get("token")
            }
        })
        .then(resp=>resp.json())
        .catch(err=>console.error(err));
    }

    function handlePatreonAd(link){
     setOwnProps({...ownProps,"patreonLink":link});
    }

   function handleBitcoinAd(address){
      setOwnProps({...ownProps,"bitcoinAddress":address})
    }

   async function handleSubmit(){

    fetch("http://localhost:8050/update/donate",{
        method:"PUT",
        headers:{
            "Authorization":Cookies.get("token"),
            "Content-Type":"application/json"
        },
        body:JSON.stringify(ownProps)
    }).catch(err=>console.error(err));

      props.close(true);
    }

    return(
        <>
        <div className="don-inf-per">
        RECIEVE DONATIONS
       
        <span className="don-set"><small>BTC ADDRESS</small> <Bitcoin  onClick={()=>setBitPop(!bitPop)}/></span>
        <span className="don-set"><small>PATREON</small> <Patreon onClick={()=>setPatPop(!patPop)}/></span>
        <div className="don-set-done" onClick={handleSubmit}>DONE</div>
        {bitPop && <BitcoinProp close={setBitPop} setBitcoin={handleBitcoinAd} bitcoinAdd={ownProps.bitcoinAddress}/>}
        {patPop && <PatreonProp close={setPatPop} setPatreon ={handlePatreonAd} patreonLink={ownProps.patreonLink}/>}
        </div>
      
        </>
    )
}

function PatreonProp(props){

    const oldAddress = props.patreonLink;
    const [input,setInput] = useState(props.patreonLink);

    function handleDone(){
      if(input != oldAddress){
          if(input.startsWith("https://www.patreon.com")){
            props.setPatreon(input);
          }
      }
      props.close();
    }

    return(
    <div className="btc-add-prop">
       PATREON LINK
       <input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="https://www.patreon.com..." type="text"/>
       <a href={oldAddress} target="__blank"><Patreon/></a>
       <div onClick={handleDone} className="set-btc-btn">OK</div>
    </div>
    )



}

function BitcoinProp(props){


    const oldAddress = props.bitcoinAdd;
    const [input,setInput] = useState(props.bitcoinAdd);

    function handleDone(){
      if(input != oldAddress){
         props.setBitcoin(input);
      }
      props.close();
    }

    return(
    <div className="btc-add-prop">
       BTC ADDRESS
       <input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="ENTER YOUR BTC ADDRESS" type="text"/>
       <QrCode value={oldAddress ? oldAddress : "NO ADDRESS"} size={100}/>

       <div onClick={handleDone} className="set-btc-btn">OK</div>
    </div>
    )
}


export default DonateProps;