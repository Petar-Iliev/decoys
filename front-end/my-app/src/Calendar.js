import React, { useState, useEffect } from 'react';
import Event from './Event';
import CreateEvent from './CreateEvent'
import Cookies from 'js-cookie'

import {ReactComponent as Panties} from './main/svgs/panties.svg'
import {ReactComponent as Clock} from './main/svgs/clock.svg';
import {ReactComponent as Location} from './main/svgs/location.svg';
import {ReactComponent as Hotdog} from './main/svgs/hotdog.svg';
import {ReactComponent as Sport} from './main/svgs/basketball.svg';
import {ReactComponent as Secret} from './main/svgs/secret.svg';
import {ReactComponent as Book} from './main/svgs/book.svg';
import {ReactComponent as Bench} from './main/svgs/bench.svg';
import {ReactComponent as Beer} from './main/svgs/beer.svg';
import {ReactComponent as Disco} from './main/svgs/mirror-ball.svg';
import {ReactComponent as MiddleFinger} from './main/svgs/middle-finger.svg';
import {ReactComponent as Megaphone} from './main/svgs/megaphone.svg';
import {ReactComponent as LetterBox} from './main/svgs/mail-box.svg';
import {ReactComponent as Coffe} from './main/svgs/coffee-cup.svg';
import {ReactComponent as Broom} from './main/svgs/broom.svg';
import {ReactComponent as Theather} from './main/svgs/theater.svg';
import {ReactComponent as Microphone} from './main/svgs/microphone.svg';
import {ReactComponent as Pigeon} from './main/svgs/pigeon.svg';
import {ReactComponent as Cinema} from './main/svgs/director-chair.svg';

let today= new Date();
 let currentMonth = (today.getMonth())%12;


let currentYear= today.getFullYear();

let months= ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];


const icons={
    "EATING":{icon:Hotdog,color:"reds"},
    "BENCH_PARTY":{icon:Bench,color:"artics"},
    "ACT_POLITE_TO_RUDE_PIGEONS":{icon:Pigeon,color:"blues"},
    "ACT_RUDE_TO_PEOPLE_AND_PIGEONS":{icon:MiddleFinger,color:"jet"},
    "COFFEE":{icon:Coffe,color:"pinks"},
   "DISCO":{icon:Disco,color:"verdis"},
    "LETTER_BOX":{icon:LetterBox,color:"purps"},
    "CLEANING":{icon:Broom,color:"libertys"},
    "DRINKING":{icon:Beer,color:"plats"},
    "MOVIE":{icon:Cinema,color:"jet"},
    "THEATRE":{icon:Theather,color:"prus"},
    "READING":{icon:Book,color:"purps"},
    "SPORTS":{icon:Sport,color:"grays"},
    "PSS_ITS_A_SECRET":{icon:Secret,color:"selyels"},
    "STUDIO_DAY":{icon:Microphone,color:"yellows"},
    "SCREAMING_RANDOM_NON_SENSE":{icon:Megaphone,color:"purps"},
    
}

function Calendar(props){


    const [nextPrev,setNextPrev] = useState(0);
    const [fullMonth,setFullMonth]=useState([]);
    const [realMonth,setRealMonth] = useState(currentMonth);

    const [infoProps,setInfoProps] =useState("");
 
    const [isAdmin,setIsAdmin] =useState(false);

    const [loader,setLoader] = useState(true);
    
    useEffect( ()=>{

       async function init(){
          const eves= await initEvents();
          eves !== undefined ? dates(eves) : setFullMonth("SERVER ERROR")
             await isAdminCheck();
        }
        init();
    },[])



    async function isAdminCheck(){
        await fetch("http://localhost:8050/admin/check",{
            method:"GET",
            headers:{
                "Authorization":Cookies.get("token")
            }
        })
        .then(resp=>{
            resp.status === 200 && setIsAdmin(true);
        })
        .catch(err=>{
            console.log(err);
        })

    }

  async function initEvents(){
   
  
      return await fetch("http://localhost:8050/event/get/upcoming",{
            headers:{
                "Authorization":Cookies.get("token")
            }
        })
        .then(resp=>resp.json())
        .then( data=>{
            const res = data.map(e=>{
                const dateF= convertDate(e.date);
                e.date=dateF;
                return e;
            })

            return res;
              
        })
        .catch(err=>console.log(err));
   }

    function convertDate(plainDate){
       
                const partOne=plainDate.split("-");
                const year= partOne[0];
                const month= partOne[1];

                const secondPart=partOne[2].split("T");
                const day = secondPart[0];

                const partThree= secondPart[1].split(":");
                const hour= partThree[0];
                const minute = partThree[1];

                // console.log(`YEAR ${year} MONTH ${month} DAY ${day} HOUR ${hour} MINUTE ${minute}`)

                const fixedDate = new Date();
                fixedDate.setFullYear(year);
                fixedDate.setMonth(month-1)
                fixedDate.setDate(day);
                fixedDate.setUTCHours(hour);
                fixedDate.setHours(hour);
                fixedDate.setMinutes(minute);

                return fixedDate
    }

    function daysInMonth(month,year){
        let daysInMonth = 32 - new Date(year,month,32).getDate();  
        return daysInMonth;     
    }

   

    function dates(evList){
       let cal=[];
       let days= [daysInMonth(currentMonth,currentYear),daysInMonth(currentMonth+1,currentYear)];

       for(let row=0;row<days.length;row++){
        const events = evList.filter(e=>e.date.getMonth()===currentMonth+row);
        const eventDaysInMonth = events.map(e=>e.date.getDate());
       
        cal.push([]);
        for(let i=1;i<days[row]+1;i++){
           
            if(eventDaysInMonth.includes(i)){
                
                const element=events[eventDaysInMonth.indexOf(i)];
           

                const elLi=icons[element.type];
                 const Icon = elLi.icon;
                 const color=elLi.color;
                 const elemntAtrClass= `cal-day special-event ${color}`;
                cal[row].push(<span id={element.id} 
                    onClick={()=>
                        setInfoProps({
                            info:element.info,
                            location:element.location,
                            name:element.name,
                            type:element.type,
                            date:element.date,
                            id:element.id,
                            color:color,
                            icon:<Icon/>

                           
                    })} 
                  
                    className={elemntAtrClass} key={i}>{i}{<Icon/>}</span>);
            }else{
                cal[row].push(<span id="n"  onClick={()=>
                    setInfoProps({
                        date:""
                })}  className="cal-day" key={i}>{i}</span>);
            }
       }
    }

    
        setFullMonth(cal);
           
    }
     
    return(
        <>
        {/* {loader === false && (()=>dates(0))} */}
      
        <div className="calendar-container">
        
            <h2 className="cal-tit">{months[realMonth]}</h2>
           <div className="dates">{fullMonth.length>1 && fullMonth[nextPrev]}</div>
           <div className="cal-btns-cont">
    <span className="next-prev-cal" onClick={async ()=>{
        const n = nextPrev === 0 ? 1 : 0
        setRealMonth((currentMonth+n)%12)
        setNextPrev(n);
       

    }}>{nextPrev===0 ?"NEXT" : "PREV"}</span>
 {isAdmin && <CreateEvent token={Cookies.get("token")}/>}
    </div>
    
        </div>
     {infoProps !=="" && <Event close={setInfoProps} isAdmin={isAdmin} sets={infoProps}/>}

        </>
    )
}

export default Calendar;










