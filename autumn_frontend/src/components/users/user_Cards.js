import { useSelector,useDispatch } from "react-redux";
import Avatar from '@mui/material/Avatar';
import user_image from "../../assets/user_image.png";
import React, { useEffect } from "react";
import getallUsers from "../../requests/allUsers";
import { Button } from "@mui/material";
import BackendClient from "../../back_client";
// import getallUsers from "../../requests/allUsers";

export default function User_Cards(){
    const userdata=useSelector((state)=>state.all_users.userData)
    const dispatch=useDispatch()
    let is_admin=useSelector((state)=>state.user.is_admin)
    let getall=getallUsers()
    console.log(is_admin)
    // console.log(userdata)
    // useEffect=()=>{
    //    getallUser(dispatch)
    // ,[pid]}
    if(userdata.length==0){
        return null
    }

    let handlecloseactivity=(username)=>{
        let data={"is_active":false}
        BackendClient.put(`users/${username}/`,data).then((res)=>{
            return res.data;
        }).then((data)=>{
            console.log(data)
            getall(dispatch)
        })

    }
    let handleopenactivity=(username)=>{
        let data={"is_active":true}
        BackendClient.put(`users/${username}/`,data).then((res)=>{
            return res.data;
        }).then((data)=>{
            console.log(data)
            getall(dispatch)
        })

    }

    let handleMakeAdmin=(username)=>{
        let data={"is_superuser":true}
        BackendClient.put(`users/${username}/`,data).then((res)=>{
            return res.data;
        }).then((data)=>{
            console.log(data)
            getall(dispatch)
        })
    }
    return(
        <div style={{display:"flex",flexWrap:"wrap",overflowY:"auto",maxWidth:"100%"}}>
          {userdata.map((item)=>(
            <div style={{paddingRight:"20px",paddingRight:"40px",width:"400px",paddingLeft:"40px",border:"3px solid black",paddingTop:"40px",backgroundColor:"lightgray",margin:"20px",borderRadius:"8px",display:"flex",flexDirection:"column",alignItems:"center",}}>
                   {  ((item.profile_pic)==null?(
                   <Avatar
                   alt="User"
                   src={user_image} // Replace with your image URL
                   style={{
                     width: 100,
                     height:100,
                     marginLeft:25,
                     marginRight:25,
                   }}
                 ></Avatar>
                  ):(
                <Avatar
                alt="User"
                src={item.profile_pic} // Replace with your image URL
                style={{
                  width: 100,
                  height: 100,

                }}
       ></Avatar>
            ))}
                <h3 >{item.username}</h3>
                <h3>{item.email}</h3>
                {(is_admin)?(
                    <>
                    {(item.is_superuser)?(
                             <h3>ADMIN USER</h3>
                       ):(
                          <h3>NORMAL USER</h3>
                       )}
                    <div style={{display:"flex"}}>
                       {(item.is_active)?(
                           <Button variant="contained" onClick={()=>handlecloseactivity(item.username)} color="error" sx={{marginBottom:"20px",marginRight:"20px"}}>CLOSE ACTIVITY</Button>
                       ):(
                        <Button variant="contained" onClick={()=>handleopenactivity(item.username)} color="success" sx={{marginBottom:"20px",marginRight:"20px"}}>START ACTIVITY</Button>
                       )}
                        {(item.is_superuser)?(
                             <p></p>
                       ):(
                        <Button variant="contained" color="success" sx={{marginBottom:"20px"}}>MAKE ADMIN</Button>
                       )}
                    </div>
                    </>
                    ):(
                        <>
                        {(item.is_superuser)?(
                            <h3>ADMIN USER</h3>
                      ):(
                         <h3>NORMAL USER</h3>
                      )}
                      </>
                )}
              </div>
          ))}
        </div>
    )
}

{/* <div style={{display:"flex",flexWrap:"wrap",overflowY:"auto",maxWidth:"100%"}}>
             <div style={{width:"500px",height:"200px",backgroundColor:"red"}}></div>
        </div> */}