import React from 'react';
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


  const DrawerHeader=styled("div")(({theme})=>({
        display:"flex",
        alignItems:"center",
        padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
  }));
  

export default function PageDrawer(){
    const theme=useTheme();
  const dispatch=useDispatch();
  const username=useSelector((state)=>state.user.username)
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
          <Typography variant="h6" noWrap component="div">
            Welcome {username}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
         sx={{
            width:drawerWidth,
            flexShrink:0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
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

        <div style={{ position: 'absolute', bottom: 0,marginBottom:"10px",width:drawerWidth,justifyContent:'center' }}>
         <Button variant="contained" color="primary" onClick={handleAddProject}>
           ADD NEW PROJECT 
         </Button>
      </div>
      </Drawer>
    </Box>
  );
}





