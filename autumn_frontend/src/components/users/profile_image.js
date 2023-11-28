import { useSelector,useDispatch } from "react-redux";
import Avatar from '@mui/material/Avatar';
import user_image from "../../assets/user_image.png";
import ClearIcon from "@mui/icons-material/Clear";
import { closeProfileImage } from "../../features/project_formSlice";

export default function ProfileImage(){
    let isOpen=useSelector((state)=>state.project_form.profile_image);
    let profile_image=useSelector((state)=>state.user.profile_pic)
    let dispatch=useDispatch()
    console.log(profile_image)
    if(profile_image==null){
      profile_image=user_image;
      console.log("NULLLLLL")
     }
    else{
      console.log(profile_image)
      profile_image='http://localhost:8000'+profile_image
      console.log(profile_image)
      console.log("whfaaaaa")
    }

    const bigdiv={
        position:"absolute",
        zIndex:"20",
        width:"100vw",
        height:"100vh",
        alignItems:"center",
        justifyContent:"center",
        display:"flex",
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for blur effect
        backdropFilter: 'blur(5px)', // Apply a blur effect to the background
      }

    if(!isOpen){
        return null;
    }
    return(
        <div style={bigdiv}>
            <div style={{display:"flex",flexDirection:"column"}}>
              <ClearIcon onClick={()=>{dispatch(closeProfileImage())}}/>
              <Avatar src={profile_image} sx={{ width: "30vw", height: "50vh"}}/>
            </div>
        </div>
       
    )
    
}