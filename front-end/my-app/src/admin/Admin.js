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
        this.makeRequest=this.makeRequest.bind(this);
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

   async makeRequest(url,methodType,data,contentType){

       return await fetch(url,{
            method:methodType,
            headers:{
                "Authorization":Cookies.get("token"),
                "Content-Type":contentType
            },
            body:data
        })
        .then(resp=>resp.json());
       
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
           return "FILE SIZE TOO BIG";
        })
         
    }


     handleTerminal() {
        
        this.setState({terminal:true,option:false})
        
    }

    handleDesktop(){
        this.setState({desktop:true,option:false})
    }

   async findUser(name){
       
        const url =`http://localhost:8050/admin/find/user/${name}`
       return await this.makeRequest(url);
       
    }

    async findOrgasm(title){
        const url=`http://localhost:8050/admin/find/orgasm/${title}`;
       return await this.makeRequest(url);
    }
  

    async setUserRole(username,role){
         const validRoles=["ADMIN","GUEST","USER"] ;
        if(!validRoles.includes(role)){
            return "INVALID ROLE";
        }
        const url ="http://localhost:8050/admin/set-role";
        const method="PUT";
        const contentType="application/json";
        const body=JSON.stringify({username,role});

      return  await this.makeRequest(url,method,body,contentType)
      
    }

    async deleteType(type,name){
       const url =`http://localhost:8050/admin/delete/${type}?name=${name}`;
      return await this.makeRequest(url,"DELETE");

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
  
       

        this.setState({title:titlee});
     return "Loading..."
    }

    async setPending(title){

        const url =`http://localhost:8050/admin/modi/pending?title=${title}`;
        const method="PUT";
        return await this.makeRequest(url,method);
   
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









