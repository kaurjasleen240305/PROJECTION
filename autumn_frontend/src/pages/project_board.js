import React from 'react';
import PageDrawer from '../components/Drawer';
import { useParams } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { setOpenedProjectId } from '../features/projectIdSlice';
import ListScroll from '../components/lists/listscroll';


export default function ProjectBoard(){
    const dispatch=useDispatch()
    const pid=useParams().pid
    dispatch(setOpenedProjectId(pid))
    return (
       <>
        <PageDrawer heading={`Welcome`}
           component={ListScroll}
        />
       </>
    )
}