import React from "react";
import { useSelector,useDispatch } from "react-redux";
import ClearIcon from "@mui/icons-material/Clear"
import UserBox from "../users/userbox";
import { closemembers } from "../../features/open_memSlice";


export default function Show_member(){
    const is_open=useSelector((state)=>state.project_members.isOpen)
    const cur_pro=useSelector((state)=>state.project_info.project_info)
    let non_members=useSelector((state)=>state.project_members.non_members)
    const dispatch=useDispatch()
    console.log(non_members)
    console.log("njenfvijerfnjer")

    let handleClose=()=>{
        dispatch(closemembers())
    }
    
    if(!is_open){
        return null
    }

    return(
        <div style={{width:"100%",height:"100%",position:"absolute",zIndex:101,backgroundColor:'rgba(255, 255, 255, 0.7)'}}>
        <div style={{width:"600px",height:"500px",overflowY:"auto",backgroundColor:"lightgray",marginTop:"10%",marginLeft:"35%",borderRadius:"8px"}}>
          <div style={{width:"100%",height:"80px",paddingRight:"10px",paddingLeft:"20px",display:"flex",alignItems:"center",justifyContent:"flex-end",marginRight:"10px"}}>
              <ClearIcon onClick={handleClose}/>
           </div>
            <h2 style={{marginLeft:"10px",color:"gray"}}>{cur_pro.project_name} Members:</h2>
            <div style={{display:"flex",overflowX:"auto",marginLeft:"30px",marginRight:"30px",marginBottom:"40px"}}>
              {(cur_pro.project_members).map((item)=>(
                 <UserBox user_info={item} is_member={true}/>
             ))}
            </div>
            <h2 style={{marginLeft:"10px",color:"gray"}}>IMG Members:</h2>
            <div style={{display:"flex",overflowX:"auto",marginLeft:"30px",marginRight:"30px",marginBottom:"40px"}}>
            {(non_members).map((item)=>(
                 <UserBox user_info={item} is_member={false}/>
             ))}
            </div>
        </div>
        </div>
    )
}