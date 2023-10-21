import React, { useEffect } from "react";
import { Paper, Typography,Grid } from '@mui/material';
import { useSelector,useDispatch } from "react-redux";
//import ImageIcon from "@material-ui/icons";
import { setOpenedCardId } from "../../features/projectIdSlice";
import { openbig } from "../../features/project_formSlice";
import getCard from "../../requests/getCard";





function Small_Card(props){
    const dispatch=useDispatch()
    const cid=useSelector((state)=>state.project_Id.openedCardId)
    const handleClick=(event)=>{
        const id = event.currentTarget.getAttribute('data-id');
        dispatch(setOpenedCardId(id))
        dispatch(openbig())
    }
    useEffect(()=>{
        console.log(cid)
        console.log("Hi")
    })
    


   return (
    <Paper elevation={3} style={{ backgroundColor: '', padding: '20px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',background: 'linear-gradient(190deg,#FFFF00,#8F00FF)',width:"200px",height:"60px",marginTop:"10px",marginBottom:"10px",marginRight:"50px",marginLeft:"50px",textAlign:"center",alignItems:"center",justifyContent:"center",display:"flex" }}
      onClick={handleClick} data-id={props.cid}
    >
      <Typography variant="h5" style={{ color: 'black',fontSize:"1.2rem",fontWeight:"bold" }}>
       {props.card_name}
      </Typography>
  </Paper>
   );
}
export default Small_Card;