import React, { useState, useRef } from 'react'
import Cookies from 'js-cookie'
import Loader from '../Loader'
import {ReactComponent as CloseBtn} from './orgmp/close-button.svg'
function CreateOrgasm(props){

     const [input,setInput] = useState("");
     const [err,setErr] = useState(false);
     const [file,setFile]=useState(null);
     const[errMsg,setErrMsg]=useState("");
     const [load,setLoad]=useState(false);
     const fileRef=useRef();
     

    async function submitOrg(){

    uploadOrgasmToServer();     
     }

     async function uploadOrgasmToServer(){
         
        if(input.length<1){
            setErrMsg("Title must be atleast 1 character");
            setErr(true);
        }else if(file===null || file.type !== "audio/mpeg"
         && file.type !=="video/mpeg" && file.type!=="video/mp4" && file.type!=="audio/mp3" 
         && file.type!=="video/mp3"
         && file.type !== "audio/wav"){
            setErrMsg("Invalid File");
            setErr(true);
        }else{
            setLoad(true);
            const data=new FormData();
            data.append("file",file);
        
            fetch(`http://localhost:8050/orgasm/create/${input}`,{
                method:"POST",
                headers:{
                    "Authorization":Cookies.get("token")
                },
                body:data
            })
            .then(resp=>resp.json())
            .then(data=>{
                if(data.ex){
                    setErrMsg(data.ex);
                    setErr(true);
                    setLoad(false);
                }else{
                window.location.reload(true);
                }
            })
            .catch(err=>{
                console.error(err);
            })
        }
     }


    return(
        <>
        <div className="pop-up-create">
            {err &&
            <>
               <div className="pop-error">{errMsg}</div>
            {/* <div className="pop-error">File is required</div> */}
            </>
                 }
            <div className="pop-title">Title</div> 
         
            <input type="text" placeholder="Title..." value={input} onChange={(e)=>setInput(e.target.value)}/>
            
            <div className="pop-file" onClick={()=>fileRef.current.click()}>Choose File</div>
            <div  className="pop-submit" onClick={submitOrg}>SUBMIT</div>
            <input type="file" accept="audio/*,video/*" style={{display:"none"}}  ref={fileRef} onChange={()=>setFile(fileRef.current.files[0])}/>
            <div className="close-create-btn"><CloseBtn onClick={()=>props.closeCreate(false)}/></div>
            </div>  
        {load && <Loader/>}
    </>
    )
}

export default CreateOrgasm;