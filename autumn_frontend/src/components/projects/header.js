import React from 'react';
import { Paper, Typography } from '@mui/material';
//import ImageIcon from "@material-ui/icons";


function Project_Title(props){
   return (
    <Paper elevation={3} style={{ backgroundColor: '#26092f', padding: '20px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',background: 'linear-gradient(190deg,#26092f,#d6b4e7)',width:"200px",height:"30px",marginBottom:"2px",textAlign:"center",alignItems:"center",justifyContent:"center",display:"flex" }}>
    <Typography variant="h5" style={{ color: 'white',fontSize:"1.2rem",fontWeight:"bold" }}>
       {props.project_name}
    </Typography>
  </Paper>
   );
}
export default Project_Title;