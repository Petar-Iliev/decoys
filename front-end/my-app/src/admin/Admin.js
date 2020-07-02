import React, { createRef } from 'react'
import Terminal from './Terminal'

import admin from './admin.css'
import Cookies from 'js-cookie'

import {CSSTransition, SwitchTransition, TransitionGroup} from 'react-transition-group'

import {ReactComponent as TerminalSVG} from '../main/svgs/command-line.svg';
import {ReactComponent as DesktopSVG} from '../main/svgs/desktop.svg';

class Admin extends React.Component{


    constructor(props){
        super(props)
        this.state={
            valid:false,
            title:"",
            content:"",
            img:"",
            video:"",
            imgUrl:"",
            videoUrl:"",
            uploadUrl:"",
            userPanel:false,
            orgasmPanel:false,
            terminal:false,
            desktop:false,
            option:true
            
        }

         this.imgRef=createRef();
         this.videoRef=createRef();
      
     
      
        this.handleContent=this.handleContent.bind(this);
        this.handleName=this.handleName.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleVideo=this.handleVideo.bind(this);
        this.handleImg=this.handleImg.bind(this);

        this.handleDesktop=this.handleDesktop.bind(this);
        this.handleTerminal=this.handleTerminal.bind(this);

        this.uploadImg=this.uploadImg.bind(this);
        this.uploadVideo=this.uploadVideo.bind(this);


        this.findTypeByName=this.findTypeByName.bind(this);
        this.setUserRole=this.setUserRole.bind(this);
        this.deleteType=this.deleteType.bind(this);
        this.help=this.help.bind(this);
        this.addOrgasm=this.addOrgasm.bind(this);
    }

    componentDidMount(){

        
        fetch("http://localhost:8050/admin/check",{
            method:"GET",
            headers:{
                "Authorization":Cookies.get("token")
            }
        })
        .then(function(resp){
      
            if(resp.status>399){
                this.props.history.push("/police/calling")
            }else{
                return resp.json();
            }
        })
     
        .then(resp=>{
          
            this.setState({valid:true})
            this.setState({
               uploadUrl:resp.url
            })
          
        })
     .catch(e=>{
            this.props.history.push("/police/calling")
        })

  
    }

    async uploadVideo(){
        const files=this.state.video;
        const data=new FormData();
        data.append("file",files[0]);
        data.append("upload_preset","pesho_api")
       
        const res=await fetch(this.state.uploadUrl+"video/upload",{
            method:"POST",
            body:data
        })

        const file= await res.json();

        this.setState({
            videoUrl:file.secure_url,
            
        })
 
    }

    async uploadImg(){
       
        const files=this.state.img;
        const data=new FormData();
        data.append("file",files[0]);
        data.append("upload_preset","pesho_api")
     

        const res=await fetch(this.state.uploadUrl+"image/upload",{
            method:"POST",
            body:data
        }).catch(e=>{
            console.log(e);
        })

        const file= await res.json();

        this.setState({
            imgUrl:file.secure_url
        })

    }

    handleImg(e){
        console.log(e.target.files);
        this.setState({
            img:e.target.files
        })
    }
    handleVideo(e){
        this.setState({
            video:e.target.files
        })
    }

    handleName(event){
    
        this.setState({title: event.target.value});
    }
    handleContent(event){
    
        this.setState({content: event.target.value});
    }
 
  


   async handleSubmit(e){
       if(e.preventDefault){
        e.preventDefault();
       }else{
           if(this.state.title==="" || this.state.video==="" || this.state.img){
               return "Invalid command: type help for list of valid commands"
           }
       }
      
    
        await this.uploadImg();
        await this.uploadVideo();


        const data={
            "title":this.state.title,
            "content":this.state.content,
            "imgUrl":this.state.imgUrl,
            "videoUrl":this.state.videoUrl

        }

var raw = JSON.stringify(data);
    const token=Cookies.get("token");
var requestOptions = {
  method: 'POST',
  headers: {
      'Authorization':token,
      "Content-Type":"application/json",
  
  },
  body: raw,
  
};

await fetch("http://localhost:8050/orgasm/create", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
    }


     handleTerminal() {
        
        this.setState({terminal:true,option:false})
        
    }

    handleDesktop(){
        this.setState({desktop:true,option:false})
    }

   async findTypeByName(e){

        const input=e.split(" ");
        if(input.length!==3 || input[1]!=='orgasm' && input[1]!=='user'){
            return "Invalid Command";
        }
        const type=input[1];
        const name=input[2];
      
        const result= await fetch(`http://localhost:8050/admin/find/${type}/${name}`,{
            method:"GET",
            headers:{
                "Authorization":Cookies.get("token")
            }
        })
        .then(resp=>resp.json())
        .then(data=>{
            return data;
        })
        .catch(err=>{
            console.log(err);
        })
        let res;
        if(type==='user'){
        if(!result.id){
          res="User doesn't exist";
        }else{
        res=`id: ${result.id} \n username: ${result.username} \n roles: ${result.authorities.join(",")}`;
        }
    }else{
        if(!result.title){
            res="Orgasm doesn't exist";
        }else{
            res=`id: ${result.id} \ntitle: ${result.title}\n videoUrl: ${result.videoUrl}\n img: ${result.imgUrl}`;
        }
    }
        return res;
       
    }

    async setUserRole(e){
         const validRoles=["ADMIN","GUEST","USER"]
         const input=e.split(" ");
         const username=input[1];
         const role=input[2];
         if(input.length!==3 || !validRoles.includes(role)){
             return "Invalid command: type help for list of valid commands";
         }

       const res= await fetch("http://localhost:8050/admin/set-role",{
             method:"PUT",
             headers:{
                 "Authorization":Cookies.get("token"),
                 "Content-Type":"application/json"
             },
             body:JSON.stringify({username,role})
         }).then(resp=>{
             if(resp.status>399){
                 return "Invalid User"
             }else{
                 return `${username} modified`
             }
         }).catch(err=>{
             console.log(err);
         })

         return res;
    }

    async deleteType(e){
        
        const input=e.split(" ");
     
        if(input.length!==2){
            return "Invalid command: type help for list of valid commands";
        }
        const type=input[0] ==="Duser" ? "user" : "orgasm";

     const res=await fetch(`http://localhost:8050/admin/delete/${type}?name=${input[1]}`,{
            method:"DELETE",
            headers:{
                "Authorization":Cookies.get("token")
            }
        })
        .then(resp=>{
            if(resp.status>399){
                return `Invalid ${type}`;
            }
            return `Successfully deleted ${type}`
        })
        .catch(err=>{
            console.log(err);
        });

        return res;
    }

    async addOrgasm(e){
        const input=e.split(" ");
        if(input.length<2){
            return "Invalid command: type help for list of valid commands";
        }

    

      const titlee=input[1];
      const contentt=input[2];
       await this.imgRef.current.click();
       await this.videoRef.current.click();
    

      

        this.setState({title:titlee,content:contentt});
     return "k"
    }

    help(e){
        console.log(this.state.pic);
        return `clear - cleans the terminal\n\n Duser [username] - delete user by username\n\n Dorgasm [title] - delete orgasm by title\n\n setRole [username] [role {ADMIN,GUEST,USER}]\n
        \n submit [title] [content {OPTIONAL}\n\n  (Choose File IMG) (Choose File VIDEO)\n\n create Orgasm AFTER ALL PROPS ARE FILLED\n\n`
    }
    render(){

        const allowedMethos={
         find:this.findTypeByName,
         setRole:this.setUserRole,
         Duser:this.deleteType,
         Dorgasm:this.deleteType,
         help:this.help,
         addOrgasm:this.addOrgasm,
         submit:this.handleSubmit
        }
        return(
           this.state.valid && 
           <>
           <div className="admin-page">

     
             <div className="view-option-wrapper">
                 <CSSTransition in={this.state.option} classNames="options" unmountOnExit={true} timeout={600} key="a">
                     <div>
                   
                 <TerminalSVG className="terminal" onClick={this.handleTerminal}/>
                 <DesktopSVG className="desktop" onClick={this.handleDesktop}/>
                 </div>
                 </CSSTransition>
               
             </div>

             <CSSTransition timeout={3000} in={this.state.terminal} classNames="terminal-ani" key="h" mountOnEnter={true} >
                 <Terminal methods={allowedMethos} validCommands={['help','clear','Duser','Dorgasm','find','setRole','addOrgasm',"submit"]}/>
             </CSSTransition>

             <input type="file" name="file" placeholder="Upload Img" className="fileUp" ref={this.imgRef} onChange={this.handleImg}/>
             <input type="file" name="file"  placeholder="Upload Video" className="fileUp" ref={this.videoRef}  onChange={this.handleVideo}/>
           </div>
           </>
        )
    }
}

export default Admin;




// <form onSubmit={this.handleSubmit} className="admin-form">
//                <label>
//           Name:
//           <input type="text" value={this.state.title} onChange={this.handleName} />
//           </label>
//                 Content
//                 <input value={this.state.content}  onChange={this.handleContent}/>
                
//                 <label>IMG</label>
//                      <input type="file" name="file" placeholder="Upload Img"  onChange={this.handleImg}/>
//                      <label>Video</label>
//                      <input type="file" name="video-file" placeholder="Upload Video"  onChange={this.handleVideo}/>
                   
//                      <img src={this.state.imgUrl}/>
                   
//                 <video src={this.state.videoUrl}/>
//                 <button type="submit">Submit</button>
   
//             </form>


