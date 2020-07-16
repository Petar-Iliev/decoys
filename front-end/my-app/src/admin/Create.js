import React, { useState } from  'react'


function Create(props){

    const [title,setTitle]= useState("");

    return(
        <div className="create-orgasm-desk">
         
         <span>Title</span>
         <br/>
         <input type="text" placeholder="Orgasm Title..." value={title} onChange={e=>{
             setTitle(e.target.value);
         }}/>
         <div className="choose-file" onClick={props.handleFile}>CHOOSE FILE</div>

         <div className="desk-sub-org" onClick={async function(){
             await props.handleTitle(title);
             await props.submit();
         }}>SUBMIT</div>
        </div>
    )
}

export default Create;