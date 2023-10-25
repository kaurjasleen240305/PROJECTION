import PageDrawer from '../components/Drawer';
import User_Cards from '../components/users/user_Cards';
import ListScroll from '../components/lists/listscroll';
import CheckLogin from '../check_login';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import getallUsers from '../requests/allUsers';


export default function Users(){
    let dispatch=useDispatch()
    let req1=getallUsers()
    useEffect(()=>{
        CheckLogin(dispatch);
        req1(dispatch);
        // getallUsers_req(dispatch);
    },[dispatch]);
    return(
        <div style={{display:"flex",flexDirection:"column",height:"100vh",alignItems:"center"}}>
             <PageDrawer heading={`Welcome`}
           component={User_Cards}
           sx={{position:"absolute",
        }}
        />
        </div>
    )
}
