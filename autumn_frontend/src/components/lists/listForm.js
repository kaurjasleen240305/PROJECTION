import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear"
import { useForm, Controller,reset } from "react-hook-form";
import Input from "@mui/material";
import BackendClient from "../../back_client";
import { closeListForm,openListForm } from "../../features/project_formSlice";
import { addList } from "../../features/listSlice";


export default function ListForm(){
    const isOpen=useSelector((state)=>state.project_form.isListOpen)
    const dispatch=useDispatch()
    const pid=useSelector((state)=>state.project_Id.openedProjectId)
    console.log(isOpen)
    const bigdiv={
        width:"100vw",
        height:"100vh",
        alignItems:"center",
        justifyContent:"center",
        display:"flex",
      }
      const underlined_input={
        border: 'none',
      //  borderBottom: "1px solid black",/* Color and style of the underline */
        width: "90%",
        padding: "12px 15px", /* Adjust padding for better alignment */
        outline: "none" ,
        fontSize:'1.2rem',
        marginBottom:"50px"
        
      }
      const divStyle = {
        display:"flex",
        flexDirection:"column",
        backgroundColor:"white",
        color: 'darkblue',
        padding: '10px',
        width:"40vw",
        border: '2px solid black',
        borderRadius:"5px",
        backgroundColor:"lightgray"
      };
      const config = {
        headers: {
          'Content-Type': 'application/json', // Set the content type as needed
        },
      };
    const onSubmit=(data)=>{
        data['pid']=pid
        console.log(data)
        BackendClient.post("lists/",data,config).then((res)=>{
            console.log(res.data)
            dispatch(addList(res.data))
        })
    }
    const handleCloseList=()=>{
        console.log("Hi")
        dispatch(closeListForm())
    }
    const { control, handleSubmit,reset } = useForm();
    if(!isOpen){
        return null;
    }
    return(
        <div style={bigdiv}>
        <div style={divStyle}>
            <ClearIcon style={{ alignSelf: 'flex-end' }} onClick={handleCloseList}/>
           <h1 style={{color:"gray"}}>Add New List</h1>
           <br/>
           <form onSubmit={handleSubmit(onSubmit)} style={{width:"100%",display:"flex",flexDirection:"column"}}>
           <div >
             <Controller
               name="list_name" // Field name
               control={control}
               rules={{
                 required: 'List_Name is required', // Validation rules (optional)
        // Add more validation rules as needed
               }}
               render={({ field, fieldState }) => (
                <div>
                 <input {...field} placeholder="List Title" style={underlined_input}/>
                 {fieldState.error && (
                    <p>{fieldState.error.message}</p>
                   )}
                </div>
               )}
             />
             
              
           </div>

           {/* Add more form fields here */}
           <button type="submit" style={{
            alignSelf:"center",
            padding:"10px",
            backgroundColor:"#8080FF",
            color:"white",
            border:"2px solid white",
            borderRadius:"5px",
            alignSelf:"center"
           }}>ADD LIST</button>

           </form>
        </div>
        </div>
    )
}