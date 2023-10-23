import React from "react";
import { useSelector,useDispatch } from "react-redux";
import ClearIcon from "@mui/icons-material/Clear";
import { closeCardForm } from "../../features/project_formSlice";
import { useForm, Controller,reset } from "react-hook-form";
import { TextField,Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import addCard from "../../requests/addCard";
import getproject_info from "../../requests/getproject";
import getLists from "../../requests/getlists";




export default function Card_Form(){
    let isopen=useSelector((state)=>state.project_form.isCardFormOpen)
    let lid=useSelector((state)=>state.project_Id.openedListId)
    let project=useSelector((state)=>state.project_info.project_info)
    let getListsreq=getLists()
    let dispatch=useDispatch()
    const { control, handleSubmit, reset } = useForm();
    let addCardreq=addCard()
    let getProject=getproject_info()
    

    const onSubmit = (data) => {
        console.log(data)
        data['lid']=lid;
        addCardreq(dispatch,data);
        dispatch(closeCardForm())
        getListsreq(dispatch,project.pk)
    };

    let handleCloseBig=()=>{
        dispatch(closeCardForm())
    }


    if(!isopen){
        return null
    }

    return(
        <div style={{width:"100%",height:"100%",position:"absolute",zIndex:300,backgroundColor:'rgba(255, 255, 255, 0.7)'}}>
          <div style={{width:"600px",height:"200px",overflowY:"auto",backgroundColor:"lightgray",marginTop:"10%",marginLeft:"35%",borderRadius:"8px"}}>
           <div style={{width:"100%",height:"80px",paddingRight:"10px",paddingLeft:"20px",display:"flex",alignItems:"center",}}>
             <ClearIcon onClick={handleCloseBig}/>
           </div>
           <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="card_name"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            style={{
                // height:"30px",
                borderRadius:"5px",
                marginRight:"10px",
                marginTop:"20px",
                width:"90%",
                marginLeft:"30px",
            }}
            label="ENTER CARD TITLE"
            variant="outlined"
            size="small"
            fullWidth
            {...field}
            InputProps={{
              endAdornment: (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{height:"30px",width:"30px"}}
                  startIcon={<AddIcon />}
                >
                </Button>
              ),
            }}
          />
        )}
      />
    </form>
           
        </div>
       </div>
    )
}