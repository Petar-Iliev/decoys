import React, { useState } from 'react';







function  Terminal(props) {
    
    const [command,setCommand]=useState("");
    const [lines,setLines]=useState([]);
 
  

  function help(){
       
        return `clear - cleans the terminal\n\n Duser [username] - delete user by username\n\n Dorgasm [title] - delete orgasm by title\n\n setRole [role {ADMIN,GUEST,USER}] [username]\n\n
 setPending [orgasmTitle] - toggle pending state of an Orgasm\n\n findO [name] - find Orgasm by name\n\n findU [username] - find User by username\n
 allPending - finds all orgasms in pending stage\n
        \n setOrgasmTitle [title] \n\n setOrgasmFile (Choose File Audio/Video)\n\n submit - creates Orgasm AFTER ALL PROPS ARE FILLED (Title & File)\n\n `
    }
    

 async function executeLine(e){
      if(e.keyCode===13){

        const trimmedCommand=command.trim();

        if(trimmedCommand==="clear"){
            setLines([]);
        }else{
        
        const input = trimmedCommand.split(" ");
        const cmd=input[0];
     
        let name;
        let data
       let retMsg="Invalid command type help for more info";
        switch(cmd){
            case "findU":
             name=trimmedCommand.slice(6);
          data = await props.methods.find(name);
          console.log(data);
             if(!data.id){
                retMsg=`${name} doesn't exists`
             }else{    
                 const roles = data.roles.map(e=>e.authority);
                 retMsg=`ID: ${data.id}\nUsername: ${data.username}\nRoles: ${roles.join(", ")}\nOrgasms:\n`
                 data.orgasms.forEach(e=>{ retMsg+= `ID: ${e.id}\n Title: ${e.title}\n Pending: ${e.pending}\n${e.videoUrl}\n`})
             }  
            break;

            case "findO":
                name=trimmedCommand.slice(6);
                 data = await props.methods.findOrgasm(name);
                if(!data.id){
                   retMsg=`${name} doesn't exists`
                }else{    
                    retMsg=`ID: ${data.id}\nTitle:${data.title}\nVideoUrl:${data.videoUrl}\nPending:${data.pending.toString()}`
                }  
            break;

            case "Duser":
                  name=trimmedCommand.slice(6);
                 data=await props.methods.delete("user",name);
                 data.msg ? retMsg=data.msg : retMsg=data.ex
                break;
            case "Dorgasm":
                name=trimmedCommand.slice(8);
                data=await props.methods.delete("orgasm",name);
                data.msg ? retMsg=data.msg : retMsg=data.ex
                break;
            case "setRole":
                    let role= input[1];
                    let pos= trimmedCommand.indexOf(role);

                    name=trimmedCommand.slice(pos+role.length+1);
               
                    data=await props.methods.setRole(name,role);
                    data.id ? retMsg="Modified" : retMsg=data.ex
                break;
            case "setPending":
                  name=trimmedCommand.replace(cmd+" ","");
               data = await props.methods.setPending(name);
               data.id ? retMsg=`Pending: ${data.pending}`: retMsg=data.ex
               
                
            break;
            case "setOrgasmTitle":
            
                    let title = input[1];
                   
                    retMsg=await props.methods.setOrgasmTitle(title);
                   
               break;

               case "setOrgasmFile":
                   retMsg=await props.methods.setOrgasmFile();
               break;

               case "allPending":
                   
                data = await props.methods.allPending();
                
               retMsg = data.map(e=> `Title: ${e.title}\nUrl: ${e.videoUrl}\nUser: ${e.user.username}\n\n`)
               
               break;

               case "findAllU":

               data = await props.methods.allUsers();

               console.log("HELLO "+data);
               retMsg = data.map(e=> `Username : ${e.username}\n
               Roles: ${e.roles.map(r=>r.authority)}
               \n${e.orgasms.map(o=> `Title: ${o.title}\nUrl: ${o.videoUrl}\nPending: ${o.pending}\n`)}\n\n`)
            
                
               break;

            case "submit":
                     retMsg=await props.methods.submit();
               break;

            case "help":         
            retMsg= help();            
                break;
                
        }

      
        setLines([...lines,{
            id:lines.length,
            value:retMsg,
            
        }])

     
    }
    setCommand("");
      }
   
  }
  
    return(
      <>
        <pre className="pre-terminal">
       
        <p className="terminal-intro">Terminal V1 </p>
    {lines.map(e=>(<div key={e.id} className="command-line"> {e.value} </div>))}
       <div className="current-command-line">Admin:<textarea rows={1} cols={1} onChange={(e)=>setCommand(e.target.value)} onKeyDown={executeLine} value={command}></textarea></div> 
        </pre>
           

       </>
    )
}

export default Terminal;