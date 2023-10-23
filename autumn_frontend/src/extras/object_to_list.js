import React from 'react';
import { useSelector } from 'react-redux';
import { List, ListItem, ListItemText } from '@mui/material';
import Project_Title from '../components/projects/header';
import { FRONTEND_HOST } from '../hosts';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';


const ProjectList=()=>{
    const projects=useSelector((state)=>state.project.projectData);
    const navigate=useNavigate();
    
    
    return (
        <List>
            {projects.map((project)=>(
                <ListItem key={project.pk} onClick={()=>navigate(`/project/${project.pk}`)}>
                   <Project_Title project_name={project.project_name}/>
                   {/* <Link to={`project/${project.pk}`}>{project.project_name}</Link> */}
                </ListItem>
            ))}
        </List>
    )
}

export default ProjectList;