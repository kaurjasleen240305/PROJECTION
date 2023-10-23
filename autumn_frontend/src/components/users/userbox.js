import React from "react";
import { useSelector } from "react-redux";
import user_image from "../../assets/user_image.png";
import Avatar from '@mui/material/Avatar';
import { Button } from "@mui/material";




export default function UserBox(props){

    let user=props.user_info
    let mem=props.is_member

    handleAdd=()=>{
      
    }
    handleRemove=()=>{

    }
    return(
         <div style={{paddingLeft:"30px",paddingRight:"30px",paddingTop:"20px",display:"flex",flexDirection:"column",alignItems:"center",border:"1px solid black",borderRadius:"5px"}}>
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
           {/* <Button variant="contained" sx="small" color="error" style={{height:"30px",marginBottom:"10px"}}>Remove</Button> */}
           {(mem)?(
                   <Button variant="contained" size="small" color="error" style={{height:"30px",marginBottom:"10px"}} onClick={handleRemove}>Remove</Button>
            ):(
                <Button variant="contained" size="small" color="success" style={{height:"30px",marginBottom:"10px"}} onClick={handleAdd}>ADD</Button>
            )

            }
         </div>
    )
}