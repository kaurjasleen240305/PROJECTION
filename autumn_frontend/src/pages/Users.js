import PageDrawer from '../components/Drawer';
import User_Cards from '../components/users/user_Cards';
import ListScroll from '../components/lists/listscroll';


export default function Users(){
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
