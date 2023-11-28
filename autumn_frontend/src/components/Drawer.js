import React, { useEffect,useRef,useState } from 'react';
import { Drawer, Toolbar } from '@mui/material';
import ProjectList from '../extras/object_to_list';
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import { useSelector,useDispatch } from 'react-redux';
import { setisOpen } from '../features/drawerSlice';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import { openForm } from '../features/project_formSlice';
import CheckLogin from '../check_login';
import getprojects from '../requests/getprojects';
import GroupIcon from '@material-ui/icons/Group';
import { useNavigate } from 'react-router-dom';
import getallUsers from "../requests/allUsers";
import user_image from "../assets/user_image.png";
import Avatar from '@mui/material/Avatar';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { openPro,closePro,setSelectedFile } from '../features/profileDiv';
import update_profile_image from '../requests/update_profile';


const drawerWidth=240;
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));



  const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    }),
  );


  const DrawerHeader=styled("div")(({theme})=>({
        display:"flex",
        alignItems:"center",
        padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
  }));
  

export default function PageDrawer(props){
    const theme=useTheme();
  const dispatch=useDispatch();
  const request2=getprojects()
  const Render=props.component
  const navigate=useNavigate();
  const fileInputRef = useRef(null);
  let getallUser=getallUsers()
  let update_profile=update_profile_image();
  let isProDivopen=useSelector((state)=>state.profile_div.isOpen)
  const [selectedFile, setSelectedFile] = useState(null);
  console.log(Render)

  const username=useSelector((state)=>state.user.username)
  let profile_image=useSelector((state)=>state.user.profile_pic)
  if(profile_image==null){
    profile_image=user_image;
    console.log("NULLLLLL")
  }
  else{
    console.log(profile_image)
    profile_image='http://localhost:8000'+profile_image
    console.log(profile_image)
    console.log("whfaaaaa")
  }
  console.log(username)
  let is_open=useSelector((state)=>state.drawer.isOpen)
  let x=useSelector((state)=>state.project_form.isOpen)
  const handleDrawerOpen = () => {
       dispatch(setisOpen(true))
  }
  const handleDrawerClose=()=>{
    dispatch(setisOpen(false))
  }
  
const handleAddProject=()=>{
    dispatch(openForm())
    console.log(x)
}

const handleProfileDiv=()=>{
    if(isProDivopen){
      dispatch(closePro());
    }
    else{
      dispatch(openPro());
    }
}

let handleUsers=()=>{
    console.log("Hi")
    getallUser(dispatch)
    navigate("/users/")
}
useEffect(() => {
    // Dispatch an action to fetch the username (replace with your actual action)
    CheckLogin(dispatch)
    request2(dispatch)
  }, [dispatch]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload =(e) => {
       e.preventDefault();
       console.log("heloooo")
       const formData = {"profile_pic":selectedFile};
      //  formData.append('profile_pic',selectedFile);  
      //  formData.append('fileName', selectedFile.name);
       console.log(formData)
       update_profile(dispatch,formData,username)
  };

  const handleLabelClick = () => {
    fileInputRef.current.click();
  };


  
  
  return (
    <Box sx={{ display: 'flex' }}>
    <CssBaseline />
     <AppBar position="fixed" open={is_open}>
        <Toolbar>
        <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={{ mr: 2, ...(is_open && { display: 'none' }) }}
        >
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{marginRight:"70%"}}>
            Welcome {username}
          </Typography>
          <Button variant="contained" onClick={handleUsers} sx={{marginRight:"20px",backgroundColor:"grey"}}>ALL USERS</Button>
          <div style={{display:"flex",marginTop:"-45px",flexDirection:"column"}}>
           <Avatar src={profile_image} sx={{ width: 50, height: 50,position:"absolute",zIndex:-1}}/>
           <CameraAltIcon sx={{zIndex:20,position:"absolute",marginTop:"40px",color:"black"}} onClick={handleProfileDiv}/>
           {isProDivopen && <div style={{maxWidth:"15vw",paddingRight:"5px",paddingLeft:"5px",display:"flex",flexDirection:"column",backgroundColor:"black",position:"absolute",zIndex:20,marginTop:"60px",borderRadius:"5px",marginLeft:"-120px",color:"white"}}>
               <p>See profile picture</p>
               <div>
                 <p>Choose Profile Picture</p>
                 <input type="file" onChange={handleFileChange} name="fileInput" />
                 <button onClick={handleUpload}>Upload</button>
               </div>
           </div>}
          </div>
          {/* <img src={profile_image}/> */}
          
        </Toolbar>
      </AppBar>
      <Drawer
         sx={{
            width:drawerWidth,
            flexShrink:0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                overflowY: 'auto',
              },
         }}
         variant="persistent"
        anchor="left"
        open={is_open}
      >
         <DrawerHeader >
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <ProjectList/>

        <div style={{ position: 'relative',marginBottom:"10px",width:drawerWidth,justifyContent:'center' }}>
         <Button variant="contained" color="primary" onClick={handleAddProject}>
           ADD NEW PROJECT 
         </Button>
      </div>
      </Drawer>
      <Main open={is_open}>
        <DrawerHeader />
        <Render/>
      </Main>
    </Box>
  );
}





