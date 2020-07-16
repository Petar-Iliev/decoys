import React, { useState, useRef } from 'react'
import Cookies from 'js-cookie'

function CreateOrgasm(){

     const [input,setInput] = useState("");
     const [err,setErr] = useState(false);
     const [file,setFile]=useState(null);
     const fileRef=useRef();

     function submitOrg(){

        console.log(file);
 
        if(input.length<1 || file===null){
          
         setErr(true);
        }else{
    

         const formData= new FormData();
         formData.append("file",fileRef.current.files[0]);
         fetch("http://localhost:8050/admin/test/up",{
             method:"POST",
             headers:{
              "Authorization":Cookies.get("token"),
            
             },
             body:formData
         })
        }
     }

     function validate(){

     }

    return(
        <div className="pop-up-create">
            {err &&
            <>
               <div className="pop-error">Title must be atleast 1 symbol</div>
            <div className="pop-error">File is required</div>
            </>
                 }
            <div className="pop-title">Title</div> 
         
            <input type="text" placeholder="Title..." value={input} onChange={(e)=>setInput(e.target.value)}/>
            
            <div className="pop-file" onClick={()=>fileRef.current.click()}>Choose File</div>
            <div  className="pop-submit" onClick={submitOrg}>SUBMIT</div>
            <input type="file" accept="audio/*,video/*" style={{display:"none"}}  ref={fileRef} onChange={()=>setFile(fileRef.current.files[0])}/>
            </div>
    )
}

export default CreateOrgasm;