import React from "react";
import { Paper, Typography,Grid } from '@mui/material';
//import ImageIcon from "@material-ui/icons";


function List_Heading(props){
   return (
    <Paper elevation={3} style={{ padding: '20px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',background: 'linear-gradient(190deg,#F3EAD3,#FBFCFA)',width:"200px",height:"50px",marginBottom:"2px",marginRight:"50px",marginLeft:"50px",textAlign:"center",alignItems:"center",justifyContent:"center",display:"flex" }}>
      <Typography variant="h5" style={{ color: 'black',fontSize:"1.2rem",fontWeight:"bold" }}>
       {props.list_name}
      </Typography>
  </Paper>
   );
}
export default List_Heading;