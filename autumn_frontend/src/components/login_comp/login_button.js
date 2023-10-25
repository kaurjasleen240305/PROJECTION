import React from 'react';
import omnilog from "../../assets/omnip.png";
import Button from "@mui/material/Button";
import {IconButton} from '@mui/material';
import {BACKEND_HOST} from '../../hosts';
import BackendClient from "../../back_client";
//import ImageIcon from "@material-ui/icons";


const buttonStyle = {
  backgroundColor: 'transparent',
  border: '2px solid #2196F3', // Border color
  color:"white",
  boxShadow: '0 0 10px rgba(33, 150, 243, 0.5)', // Glowing effect
  transition: 'box-shadow 0.3s', // Animation duration

  '&:hover': {
    boxShadow: '0 0 20px rgba(33, 150, 243, 0.8)', // Increase glow on hover
  },
  width:500,
  fontSize:20,
  fontWeight:"bold",
  alignSelf:'center',
  marginLeft:"20px",
};

const title={
  fontSize:"100px",
  fontFamily:"cursive",
  color:"lightBlue"
}


function LoginRequest(){
  window.location.href=`${BACKEND_HOST}login`;
}

function LoginButton(){
    // console.log(omnilog)
   return (
    <div sx={{display:"flex",flexDirection:"column",width:"100vw",height:"100vh"}}>
     <h1 style={title}>PROJECTION</h1>
     <Button
    sx={buttonStyle}
    variant="contained"
    color="grey"
    startIcon={
      <IconButton edge="start">
        <img src={omnilog} alt="My Image" width="50px" height="50px"/>
      </IconButton>
    }
    onClick={LoginRequest}
  >Login With Omniport</Button>
  </div>
   )
}
export default LoginButton;

