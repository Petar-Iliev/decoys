import React, { createRef } from 'react';
import Terminal from './Terminal';
import Desktop from './Desktop';


import admin from './admin.css';
import Cookies from 'js-cookie';

import {CSSTransition} from 'react-transition-group';

import {ReactComponent as TerminalSVG} from '../main/svgs/command-line.svg';
import {ReactComponent as DesktopSVG} from '../main/svgs/desktop.svg';

class Admin extends React.Component{


    constructor(props){
        super(props)
        this.state={
            valid:false,
            title:"",
          
            video:"",
            videoUrl:"",
            uploadUrl:"",
            userPanel:false,
            terminal:false,
            desktop:false,
            option:true,
            listOrg:[],
            listRole:[],
            username:"",
            userid:"",
            orgasm:{title:"",videoUrl:"",pending:""},
            validUsr:false
            
        }
   
    

     
         this.videoRef=createRef();
      
     
      
     
        this.handleName=this.handleName.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleVideo=this.handleVideo.bind(this);
        this.handleOrgasmTitle=this.handleOrgasmTitle.bind(this);
        this.handleOrgasmFile=this.handleOrgasmFile.bind(this);       

        this.handleDesktop=this.handleDesktop.bind(this);
        this.handleTerminal=this.handleTerminal.bind(this);

      
        this.uploadBackup=this.uploadBackup.bind(this);


        this.findUser=this.findUser.bind(this);
        this.findOrgasm=this.findOrgasm.bind(this);
        this.setUserRole=this.setUserRole.bind(this);
        this.deleteType=this.deleteType.bind(this);
    
        this.setPending=this.setPending.bind(this);
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

    async uploadBackup(){
        const files=this.state.video;
        const data=new FormData();
        data.append("file",files[0]);
        data.append("upload_preset","pesho_api")
       
        const res=await fetch("https://api.cloudinary.com/v1_1/twisteddd/video/upload",{
            method:"POST",
            body:data
        })
        .catch(err=>{
            console.error(err);
        })
    

        const file= await res.json();

        this.setState({
            videoUrl:file.secure_url,
            
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
  
 
  


   async handleSubmit(e){
      
           if(this.state.title==="" || this.state.video===""){
               return "Invalid Props"
           }

        const videoType=this.state.video[0].type;
       
           if(videoType!=="audio/mpeg" && videoType!=="video/mp4"){
                  return "Invalid MIME TYPE";
           }
        const files=this.state.video;
        const data=new FormData();
        data.append("file",files[0]);

      return  await fetch(`http://localhost:8050/orgasm/create/${this.state.title}`,{
            method:"POST",
            headers:{
                "Authorization":Cookies.get("token")
            },
            body:data
        })
        .then(resp=>resp.json())
        .then(data=>{
     
            if(data.ex){
                return data.ex;
            }
            return "Created"
        })
        .catch(err=>{
            console.error(err);
        })
         
    }


     handleTerminal() {
        
        this.setState({terminal:true,option:false})
        
    }

    handleDesktop(){
        this.setState({desktop:true,option:false})
    }

   async findUser(name){
       
        const result= await fetch(`http://localhost:8050/admin/find/user/${name}`,{
            method:"GET",
            headers:{
                "Authorization":Cookies.get("token")
            }
        })
        .then(resp=>resp.json())
        .then(data=>{
           if(!data.ex){
                this.setState({listRole:data.authorities,listOrg:data.orgasms,username:data.username,validUsr:true})     
           }else{
            this.setState({listRole:[],listOrg:[],username:"",validUsr:false})
           }
            return data;
        })
        .catch(err=>{
            console.error(err);
        })


        return result;
       
    }

    async findOrgasm(title){

      return await fetch(`http://localhost:8050/admin/find/orgasm/${title}`,{
            method:"GET",
            headers:{
                "Authorization":Cookies.get("token")
            }
        })
        .then(resp=>resp.json())
        .catch(err=>console.error(err));
    }
  

    async setUserRole(username,role){
         const validRoles=["ADMIN","GUEST","USER"] ;
        if(!validRoles.includes(role)){
            return "INVALID ROLE";
        }

       const res= await fetch("http://localhost:8050/admin/set-role",{
             method:"PUT",
             headers:{
                 "Authorization":Cookies.get("token"),
                 "Content-Type":"application/json"
             },
             body:JSON.stringify({username,role})
         }).then(resp=>resp.json())
         .then(data=>{
            
           
            if(data.ex){
            return "Invalid User"
            }
            this.setState({listRole:data.authorities})
        })
         .catch(err=>{
             console.log(err);
         })

         return res;
    }

    async deleteType(type,name){
        
     const res=await fetch(`http://localhost:8050/admin/delete/${type}?name=${name}`,{
            method:"DELETE",
            headers:{
                "Authorization":Cookies.get("token")
            }
        })
        .then(resp=>{
            if(resp.status>399){
                return `Invalid ${type}`;
            }
            if(type==="orgasm"){
                let tempLOrg=this.state.listOrg.filter(e=>e.title!==name);
                this.setState({listOrg:tempLOrg})
            }else{
               this.setState({listOrg:[],listRole:[],username:"",userid:""})
            }      
            return `Successfully deleted ${type}`
        })
        .catch(err=>{
            console.log(err);
        });

        return res;
    }

    async handleVideo(){
        this.setState({video:this.videoRef.current.files})
    }

    async handleOrgasmTitle(title){
        this.setState({title:title});
         return "";
    }
    async handleOrgasmFile(){
        await this.videoRef.current.click();

        return "";
    }
    async addOrgasm(titlee){
     
     
       await this.videoRef.current.click();
  
       console.log(this.videoRef.current.files);

        this.setState({title:titlee});
     return "Loading..."
    }

    async setPending(title){

      const res= await  fetch(`http://localhost:8050/admin/modi/pending?title=${title}`,{
            method:"PUT",
            headers:{
                "Authorization":Cookies.get("token")
            }
        })
        .then(e=>e.json())
        .then(data=>{
          
        if(data.error){
            return "Invalid Orgasm";
        }
            let orgs=[...this.state.listOrg];
            let inx=this.state.listOrg.map(function(e){
                return e.title;
            }).indexOf(title);

            let org=orgs[inx];
            org.pending= data.pending;
            orgs[inx]=org;   
            this.setState({listOrg:orgs});
         
            return "Modified"
        })
        .catch(err=>{
            console.error(err);
        })

        return res;
    }

  
    render(){

        const allowedMethos={
         find:this.findUser,
         findOrgasm:this.findOrgasm,
         setRole:this.setUserRole,
         delete:this.deleteType,
         addOrgasm:this.addOrgasm,
         submit:this.handleSubmit,
         setOrgasmTitle:this.handleOrgasmTitle,
         setOrgasmFile:this.handleOrgasmFile,
         setPending:this.setPending,
         handleVideo:this.handleVideo
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

           
           
             <input type="file" name="file"  placeholder="Upload Video" className="fileUp" ref={this.videoRef}  onChange={this.handleVideo}/>
             <CSSTransition timeout={2000} in={this.state.desktop} classNames="desktop-ani" key="d" mountOnEnter={true} >
                 <Desktop methods={allowedMethos} orgasm={this.state.orgasm} validUsr={this.state.validUsr} orgasms={this.state.listOrg} roles={this.state.listRole} username={this.state.username}/>
             </CSSTransition>

             <CSSTransition timeout={3000} in={this.state.terminal} classNames="terminal-ani" key="h" mountOnEnter={true} >
                 <Terminal methods={allowedMethos} validCommands={['help','clear','Duser','Dorgasm','find','setRole','addOrgasm',"submit"]}/>
             </CSSTransition>

           </div>
           </>
        )
    }
}

export default Admin;









