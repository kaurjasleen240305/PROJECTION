import React from 'react';
import PageDrawer from '../components/Drawer';
import { useParams } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { setOpenedProjectId } from '../features/projectIdSlice';
import ListScroll from '../components/lists/listscroll';
import ListForm from '../components/lists/listForm';
import Big_Card from '../components/cards/big_card';


export default function ProjectBoard(){
    const dispatch=useDispatch()
    const pid=useParams().pid
    dispatch(setOpenedProjectId(pid))
    return (
       <div style={{display:"flex",flexDirection:"column",height:"100vh",alignItems:"center"}}>
        
         <Big_Card/>
        <PageDrawer heading={`Welcome`}
           component={ListScroll}
           sx={{position:"absolute",
        }}
        />
        <ListForm/>
       </div>
    )
}