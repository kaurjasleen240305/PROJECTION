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





export default function Dashboard(){
    const dispatch=useDispatch();
    const request1=getprojects()

    getprojects(dispatch);
    const username=useSelector((state)=>state.user.username)
    const projects=useSelector((state)=>state.project.projectData)
    useEffect(()=>{
        CheckLogin(dispatch);
        request1(dispatch);
    },[dispatch]);
    return (
      <>
        <PageDrawer component={Project_Title}/>
        <ProjectForm/>
      </>
    )

}
