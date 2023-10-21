import React from "react"
import { useSelector,useDispatch } from "react-redux";
import getLists from "../../requests/getlists";
import { useEffect } from "react";
import { styled, useTheme } from '@mui/material/styles';
import List_Heading from "./listhead";
import AddIcon from "@mui/icons-material/Add"
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { Input } from "@material-ui/core";
import { openListForm } from "../../features/project_formSlice";
import Small_Card from "../cards/small_card";



const drawerWidth=240
const horizontalScrollContainerStyle = {
    display: 'flex',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    maxWidth:"100vw",
   // marginLeft:"200px",
  };
  


export default function ListScroll(){
    const dispatch=useDispatch()
    const getList_req=getLists()
    const pid=useSelector((state)=>state.project_Id.openedProjectId)
    let is_open=useSelector((state)=>state.drawer.isOpen)

    const handleListClick=()=>{
        dispatch(openListForm());
    }
   
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      };


    useEffect(() => {
        // Make the request to fetch lists when pid changes
        if (pid) {
          getList_req(dispatch,pid)
        }
      }, [dispatch, pid]);
    
    const req_lists=useSelector((state)=>state.lists.listData) 
    console.log(req_lists)
        
   return(
    <div style={horizontalScrollContainerStyle}>
    {req_lists.map((item) => (
       <div sx={{display:"flex",flexDirection:"column"}}>
        <List_Heading list_name={item.list_name}/>
        {/* {(item.cards).map((card)=>{
            // <Small_Card card_name={card.card_name}/>
            <h1>Hello</h1>
        })} */}
        {(item.cards).map((card)=>(
            <Small_Card card_name={card.card_name} cid={card.pk}/>
        ))}
        
       </div>
    ))}
    <div style={{width:"200px", height:"50px",backgroundColor:"gray",borderRadius:"8px",display:"flex",alignItems:"center",marginRight:"20px"}}>
       <AddIcon sx={{alignSelf:"center",backgroundColor:"lightgray",borderRadius:"12px",cursor: 'pointer',marginRight:"20px",marginLeft:"5px"}} onClick={handleListClick}/>
       <h3 sx={{color:"white"}}>ADD LIST</h3>
     </div>
  </div>
   )
}