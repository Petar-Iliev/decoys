import React from 'react'
import UserInfo from './UserInfo'


function InfoRow(props){

    const filterText=props.filterText.toLowerCase();

    const filterType =props.filterType;
    const rows=[];

    console.log(filterText);
    console.log(filterType);

    props.users.forEach((user)=>{

        if(!filterType){
            if(user.username.toLowerCase().includes(filterText)){
                rows.push(<UserInfo key ={user.id}
                    methods= {{setPending:props.togglePending,delete:props.deleteObj,setRole:props.setRole}} 
                    username={user.username}
                   roles={user.roles} 
                   orgasms={user.orgasms}/>)
            }
        }else{

            user.orgasms.forEach((orgasm)=>{
                if(orgasm.title.toLowerCase().includes(filterText)){
                    rows.push(<UserInfo key ={user.id}
                        methods= {{setPending:props.togglePending,delete:props.deleteObj,setRole:props.setRole}} 
                        username={user.username}
                       roles={user.roles} 
                       orgasms={user.orgasms}/>)
                }
            })
        }

       
    })

    return(
        <>
        {rows}
       </>
    )

}


export default InfoRow;