import React, { useState } from  'react'
import Loader from '../Loader';

function Create(props){

    const [title,setTitle]= useState("");
    const [load,setLoad] = useState(false);
    const [msg,setMsg]=useState("");

    return(
        <>
        <div className="create-orgasm-desk">
         
         <span>Title</span>
         <br/>
         <input type="text" placeholder="Orgasm Title..." value={title} onChange={e=>{
             setTitle(e.target.value);
         }}/>
         <div className="choose-file" onClick={props.handleFile}>CHOOSE FILE</div>

         <div className="desk-sub-org" onClick={async function(){
             setLoad(true);
             await props.handleTitle(title);
           const resp=  await props.submit();
            setLoad(false);
           setMsg(resp);
         }}>SUBMIT</div>
        </div>
        <div className="desk-msg-resp">{msg}</div>
      {load && <Loader/>}
        </>
    )
}

export default Create;