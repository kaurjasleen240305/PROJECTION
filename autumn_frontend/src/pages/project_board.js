import React, { useEffect } from 'react';
import PageDrawer from '../components/Drawer';
import { useParams } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { setOpenedProjectId } from '../features/projectIdSlice';
import ListScroll from '../components/lists/listscroll';
import ListForm from '../components/lists/listForm';
import Big_Card from '../components/cards/big_card';
import getproject_info from '../requests/getproject';
import Show_member from '../components/projects/members';
import getNonmembers from '../requests/get_n_mem';
import Assignees from '../components/cards/to_assign';
import Card_Form from '../components/cards/cardForm';
import CheckLogin from '../check_login';
import ProjectForm from "../components/projects/projectForm";
import ProfileImage from '../components/users/profile_image';


export default function ProjectBoard(){
    const dispatch=useDispatch()
    const pid=useParams().pid
    let req=getproject_info()
    let req2=getNonmembers()
    dispatch(setOpenedProjectId(pid))
    req(dispatch,pid)
    useEffect(()=>{
        req2(dispatch,pid)
        CheckLogin(dispatch)
    })
    return (
       <div style={{display:"flex",flexDirection:"column",height:"100vh",alignItems:"center"}}>
        
         <Big_Card/>
        <PageDrawer heading={`Welcome`}
           component={ListScroll}
           sx={{position:"absolute",
        }}
        />
        <ProjectForm sx={{position:"absolute",zIndex:"20"}}/>
        <ListForm sx={{position:"absolute",zIndex:"21"}}/>
        <Show_member/>
        <Card_Form/>
        <ProfileImage/>
        <Assignees/>
       </div>
    )
}