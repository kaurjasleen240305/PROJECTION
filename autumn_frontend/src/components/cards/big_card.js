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
import { WEBSOCKET_HOST } from '../../hosts';
import { setcommentdata } from '../../features/commentSlice';
import {useForm,Controller} from "react-hook-form"
import Comments from './comments';
import { TextField } from '@mui/material';
import { addComment } from '../../features/commentSlice';

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
    // let comments=useSelector((state)=>state.comments.commentData)
    // // let web_socket=new WebSocket("")
    const request1=getCard()
    console.log(cid)
    let  card_Selected=useSelector((state)=>state.cards.cardData)
    console.log(card_Selected)
    console.log("BigCard")
            
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm({
        defaultValues: {
          comment: "",
        },
      });

      const onSubmit = (data) => {
        data['card_id']=cid;
        console.log(data)
        BackendClient.post("comments/",data).then((res)=>{
            console.log(res.data)
            let json_data=JSON.stringify(res.data);
            web_socket.send(json_data);
        })
        reset()
      };


      let web_socket=new WebSocket("ws://"
        + WEBSOCKET_HOST
        + '/ws/cards/'
        + cid
        + '/comments/');
    
     web_socket.onopen = (event) => {
        console.log("connected");
      };
     
     web_socket.onclose = (event) => {
        console.log("disconnected");
      };

      web_socket.onmessage=(event)=>{
          console.log(event.data)
          request1(dispatch,cid)
      }


    useEffect(()=>{
       
      if(cid!=null){
        console.log(cid)
        console.log("useeffect")
        request1(dispatch,cid);
        // dispatch(setcommentdata(card_Selected.comments))
        // console.log(comments
    }
    },[dispatch,cid])
    const handleCloseBig=()=>{
        dispatch(closebig())
    }
    // let comments_cur=card_Selected.comments
    // console.log(card_Selected)
    // console.log(comments_cur)
    // console.log("Hi")
    if(!isOpen){
        return null
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
                  <Comments comments={card_Selected.comments}/>
                  <form onSubmit={handleSubmit(onSubmit)}>
                      <Controller
                        name="comment"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <TextField
                            variant="outlined"
                            label="Message"
                            size="small"
                            margin="normal"
                            color="primary"
                            sx={{
                              width: "90%",
                              input: {
                                color: "black",
                              },
                              borderColor:"white"
                            }}
                            {...field}
                          />
                        )}
                      />
                      <input
                        type="submit"
                        value="Send"
                        style={{
                          backgroundColor: "lightblue",
                          color:"black",
                          border:"none",
                          marginLeft:"2px",
                          marginTop:"15px",
                          height:"40px"
                        }}
                      />
                      {errors.location && (
                        <div className="error">This field is required</div>
                      )}
                    </form>
               </div>
           </div>
           
           </div>
       </div>
       
    )
}




