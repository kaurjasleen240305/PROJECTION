import React from 'react';
import Dialog from '@mui/material/Dialog';
import Backdrop from '@mui/material/Backdrop';
import { makeStyles } from '@mui/styles';
import { useSelector,useDispatch } from 'react-redux';
import ClearIcon from "@mui/icons-material/Clear"
import { closebig } from '../../features/project_formSlice';
import BackendClient from '../../back_client';
import getCard from '../../requests/getCard';
import { useEffect } from 'react';
import { setcarddata } from '../../features/cardSlice';
import getprojects from '../../requests/getprojects';
import {format,parseISO} from 'date-fns';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 9,
      color: '#fff',
    },
  }));
 



export default function Big_Card(){
    const isOpen=useSelector((state)=>state.project_form.isBigOpen);
    const dispatch=useDispatch()
    let cid=useSelector((state)=>state.project_Id.openedCardId);
    const request1=getCard()
    console.log(cid)
    let req1=getCard()
    useEffect(()=>{
    if(cid!=null){
        console.log(cid)
        request1(dispatch,cid);
    }
    }, [cid])
    const card_Selected=useSelector((state)=>state.cards.cardData)
   
    // console.log(card_Selected)
    
    if(!isOpen){
        return null
    }
    const handleCloseBig=()=>{
        dispatch(closebig())
    }
    return(
       <div style={{width:"100%",height:"100%",position:"absolute",zIndex:100,backgroundColor:'rgba(255, 255, 255, 0.7)'}}>
       <div style={{width:"600px",height:"500px",overflowY:"auto",backgroundColor:"lightgray",marginTop:"10%",marginLeft:"35%",borderRadius:"8px"}}>
           <div style={{width:"100%",height:"80px",paddingRight:"10px",paddingLeft:"10px",display:"flex",alignItems:"center",}}>
              <ClearIcon onClick={handleCloseBig}/>
           </div>
           <div style={{marginLeft:"50px",marginRight:"50px",marginTop:"30px"}}>
               <h1>{card_Selected.card_name}</h1>
               <p style={{color:"grey"}}>Created By: {card_Selected.created_by}</p>
               <p style={{color:"grey"}}>Created Time:  {card_Selected.created_time}</p>
               <div style={{display:"flex",flexDirection:"column"}}>
                  <h2 style={{color:"grey"}}>Comments</h2>
                  {}
               </div>
           </div>
              
           </div>
       </div>
       
    )
}