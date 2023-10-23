import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { closeAssign } from "../../features/project_formSlice";
import ClearIcon from "@mui/icons-material/Clear";
import UserBox from "../users/userbox";
import { Button } from "@mui/material";
import changeAssignee from "../../requests/change_assignee";



export default function Assignees(){
    let isOpen=useSelector((state)=>state.project_form.isAssignOpen)
    let sid=useSelector((state)=>state.project_Id.openedSubtaskId)
    let cid=useSelector((state)=>state.project_Id.openedCardId)
    const cur_pro=useSelector((state)=>state.project_info.project_info)
    let mem=cur_pro.project_members
    let dispatch=useDispatch()
    let changeReq=changeAssignee()
    // console.log(cur_pro.project_members)
    // console.log("kwwfjkwjkgrkg")
    if(!isOpen){
        return null
    }

    let handleClose=()=>{
       dispatch(closeAssign())
    }

    let handleAssign=(username)=>{
        let data={"username":username}
        changeReq(dispatch,sid,cid,data)
        dispatch(closeAssign())
    }

    return(
    <div style={{width:"100%",height:"100%",position:"absolute",zIndex:200,backgroundColor:'rgba(255, 255, 255, 0.7)'}}>
       <div style={{width:"600px",height:"500px",overflowY:"auto",backgroundColor:"lightgray",marginTop:"10%",marginLeft:"35%",borderRadius:"8px"}}>
       <div style={{width:"100%",height:"80px",paddingRight:"10px",paddingLeft:"20px",display:"flex",alignItems:"center",justifyContent:"flex-end",marginRight:"10px"}}>
            <ClearIcon onClick={handleClose}/>
           </div>
            <h2 style={{marginLeft:"10px",color:"gray"}}>{cur_pro.project_name} Members:</h2>
            {mem.map((item)=>(
                <div style={{display:"flex",marginLeft:"30px",marginBottom:"5px"}}>
                    <h3>{item.username}:</h3>
                    <Button variant="contained" size="small" color="success" style={{height:"30px",marginTop:"15px"}} onClick={()=>handleAssign(item.username)}>ASSIGN</Button>
                </div>
            ))}
       </div>
    </div>
    )
}