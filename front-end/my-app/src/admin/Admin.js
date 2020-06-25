import React from 'react'
import admin from './admin.css'
import Cookies from 'js-cookie'
class Admin extends React.Component{


    constructor(props){
        super(props)
        this.state={
            title:"",
            content:"",
            img:"",
            video:"",
            imgUrl:"",
            videoUrl:"",
            uploadUrl:""
            
        }

     
      
        this.handleContent=this.handleContent.bind(this);
        this.handleName=this.handleName.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleVideo=this.handleVideo.bind(this);
        this.handleImg=this.handleImg.bind(this);

        this.uploadImg=this.uploadImg.bind(this);
        this.uploadVideo=this.uploadVideo.bind(this);
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
        e.preventDefault();

      
    
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


    render(){

        return(
            <form onSubmit={this.handleSubmit} className="admin-form">
               <label>
          Name:
          <input type="text" value={this.state.title} onChange={this.handleName} />
          </label>
                Content
                <input value={this.state.content}  onChange={this.handleContent}/>
                
                <label>IMG</label>
                     <input type="file" name="file" placeholder="Upload Img"  onChange={this.handleImg}/>
                     <label>Video</label>
                     <input type="file" name="video-file" placeholder="Upload Video"  onChange={this.handleVideo}/>
                   
                     <img src={this.state.imgUrl}/>
                   
                <video src={this.state.videoUrl}/>
                <button type="submit">Submit</button>
   
            </form>
        )
    }
}

export default Admin;






