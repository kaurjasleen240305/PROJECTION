import { useDispatch } from "react-redux";
import CheckLogin from "../check_login";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import getprojects from "../requests/getprojects";
import getLists from "../requests/getlists";
import Project_Title from "../components/projects/header";
import PageDrawer from "../components/Drawer";
import ProjectForm from "../components/projects/projectForm";
import getCard from "../requests/getCard";
import getallUsers from "../requests/allUsers";
// import getallUsers from "../requests/allUsers";




export default function Dashboard(){
    const dispatch=useDispatch();
    const request1=getprojects();
    const getallUsers_req=getallUsers();

    getprojects(dispatch);
    const username=useSelector((state)=>state.user.username)
    const projects=useSelector((state)=>state.project.projectData)
    useEffect(()=>{
        CheckLogin(dispatch);
        // request1(dispatch);
        // getallUsers_req(dispatch);
    },[dispatch]);
    return (
      <div sx={{position:"relative"}}>
        <PageDrawer sx={{position:"absolute"}} component={Project_Title}/>
        <ProjectForm sx={{position:"absolute",zIndex:"20"}}/>
      </div>
    )

}
