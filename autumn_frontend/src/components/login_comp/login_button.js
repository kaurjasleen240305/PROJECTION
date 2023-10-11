import React from 'react';
import omnilog from "../../assets/omnip.png";
import Button from "@mui/material/Button";
import {IconButton} from '@mui/material';
import {BACKEND_HOST} from '../../hosts';
import BackendClient from "../../back_client";
//import ImageIcon from "@material-ui/icons";



function LoginRequest(){
  window.location.href=`${BACKEND_HOST}/web_api/login`;
  
}

function LoginButton(){
    console.log(omnilog)
   return (
    <Button
    sx={{
       width:500,
       fontSize:20,
       fontWeight:"bold",
       alignSelf:'center',
       borderWidth:"3px",
       boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0.2)',
       background: 'linear-gradient(to bottom, #fff, #e5e5e5)',
       transition: 'background-color 0.3s ease', // Transition effect
          '&:hover': {
            background: 'linear-gradient(to bottom, #f1f1f1, #e0e0e0)', // Hover effect
         },
    }}
    variant="outlined"
    color="primary"
    startIcon={
      <IconButton edge="start">
        <img src={omnilog} alt="My Image" width="50px" height="50px"/>
      </IconButton>
    }
    onClick={LoginRequest}
  >Login With Omniport</Button>
   )
}
export default LoginButton;

{/* <Button
        sx={{
           width:500,
           fontSize:20,
           fontWeight:"bold",
           alignSelf:'center',
           borderWidth:"3px",
           boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0.2)',
           background: 'linear-gradient(to bottom, #fff, #e5e5e5)',
           transition: 'background-color 0.3s ease', // Transition effect
              '&:hover': {
                background: 'linear-gradient(to bottom, #f1f1f1, #e0e0e0)', // Hover effect
             },
        }}
        variant="outlined"
        color="primary"
        startIcon={
          <IconButton edge="start">
            <img src={omnilog} alt="My Image" width="50px" height="50px"/>
          </IconButton>
        }
        onClick={LoginRequest}
      >Login With Omniport</Button> */}