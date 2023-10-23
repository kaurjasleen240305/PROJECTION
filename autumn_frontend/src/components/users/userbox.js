import React from "react";
import { useSelector,useDispatch } from "react-redux";
import user_image from "../../assets/user_image.png";
import Avatar from '@mui/material/Avatar';
import { Button } from "@mui/material";
import BackendClient from "../../back_client";
import remove_mem from "../../requests/removemem";
import add_mem from "../../requests/addmem";





export default function UserBox(props){

    let user=props.user_info
    let mem=props.is_member
    let assign=props.assign
    const dispatch=useDispatch()
    let req_add=add_mem()
    let req_rem=remove_mem()
    const pid=useSelector((state)=>state.project_Id.openedProjectId)
    let handleAdd=(username)=>{
        let data={"username":username}
        req_add(dispatch,data,pid)
    }
    let handleRemove=(username)=>{
        let data={"username":username}
        req_rem(dispatch,data,pid)
    }
    let handleAssign=(username)=>{
        console.log(username)
    }
    return(
         <div style={{paddingLeft:"30px",paddingRight:"30px",marginRight:"20px",paddingTop:"20px",display:"flex",flexDirection:"column",alignItems:"center",border:"1px solid black",borderRadius:"5px"}}>
            {((user.profile_pic)==null)?(
                   <Avatar
                   alt="User"
                   src={user_image} // Replace with your image URL
                   style={{
                     width: 50,
                     height:50,
                   }}
          ></Avatar>
            ):(
                <Avatar
                alt="User"
                src={user.profile_pic} // Replace with your image URL
                style={{
                  width: 100,
                  height: 100,
                }}
       ></Avatar>
            )

            }
           <h3>{user.username}</h3>
           {
           (mem)?(
                   <Button variant="contained" size="small" color="error" style={{height:"30px",marginBottom:"10px"}} onClick={()=>handleRemove(user.username)}>Remove</Button>
            ):(
                <Button variant="contained" size="small" color="success" style={{height:"30px",marginBottom:"10px"}} onClick={()=>handleAdd(user.username)}>ADD</Button>
            )
            }
            {/* if (typeof(assign)!="undefined"){
                <Button variant="contained" size="small" color="success" style={{height:"30px",marginBottom:"10px"}} onClick={()=>handleAssign(user.username)}>ASSIGN</Button>
            } */}
            
         </div>
    )
}