import React from 'react';
import { Paper, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import deleteProject from '../../requests/deleteProject';
import { useSelector,useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';



function Project_Title(props){
   let delreq=deleteProject();
   let dispatch=useDispatch()
   const navigate=useNavigate();

   let handleDelete=(pid)=>{
      console.log(pid)
      delreq(dispatch,pid);
   }

   return (
    <Paper elevation={3} style={{width:"200px",display:"flex",justifyContent: 'space-between', backgroundColor: '#26092f', padding: '20px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',background: 'linear-gradient(190deg,#808080,#C5C6D0)',marginBottom:"2px",textAlign:"center",alignItems:"center"}}>
    <Typography variant="h5" style={{ color: 'black',fontSize:"1.2rem",fontWeight:"bold" }} onClick={()=>navigate(`/project/${props.pk}`)}>
       {props.project_name}
    </Typography>
    <DeleteIcon onClick={()=>handleDelete(props.pk)}/>
   </Paper>
   );
}
export default Project_Title;