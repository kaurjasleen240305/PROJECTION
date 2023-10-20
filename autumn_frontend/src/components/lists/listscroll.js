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



const drawerWidth=240
const horizontalScrollContainerStyle = {
    display: 'flex',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
  };
  


export default function ListScroll(){
    const dispatch=useDispatch()
    const getList_req=getLists()
    const pid=useSelector((state)=>state.project_Id.openedProjectId)
    let is_open=useSelector((state)=>state.drawer.isOpen)

    const handleListClick=()=>{
        dispatch(openListForm());
    }


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
        <List_Heading list_name={item.list_name}/>
    ))}
    <div style={{width:"200px", height:"50px",backgroundColor:"gray",borderRadius:"8px",display:"flex",alignItems:"center"}}>
       <AddIcon sx={{alignSelf:"center",backgroundColor:"lightgray",borderRadius:"12px",cursor: 'pointer',marginRight:"20px",marginLeft:"5px"}} onClick={handleListClick}/>
       <h3 sx={{color:"white"}}>ADD LIST</h3>
     </div>
  </div>
   )
}