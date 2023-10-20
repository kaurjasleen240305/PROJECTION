import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { closeForm } from "../../features/project_formSlice";
import { Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear"
import { useForm, Controller,reset } from "react-hook-form";
import Input from "@mui/material";
import BackendClient from "../../back_client";
import addproject from "../../requests/addproject";
import getprojects from "../../requests/getprojects";
import { addProject } from "../../features/projectslice";
//import * as yup from yup;

export default function ProjectForm(){
    const isOpen=useSelector((state)=>state.project_form.isOpen)
    const project_list=useSelector((state)=>state.project.projectData)
    const dispatch=useDispatch()
    const handleCloseProject=()=>{
        dispatch(closeForm())
    }
    const config = {
        headers: {
          'Content-Type': 'application/json', // Set the content type as needed
        },
      };
    const { control, handleSubmit,reset } = useForm();
    const onSubmit=(data)=>{
        BackendClient.post("projects/",data,config).then((res)=>{
            console.log(res.data)
            dispatch(addProject(res.data))
        })
    }
    if (!isOpen) {
        return null; // Do not render the form if it's closed
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
      };
      const bigdiv={
        position:"absolute",
        zIndex:"20",
        width:"100vw",
        height:"100vh",
        alignItems:"center",
        justifyContent:"center",
        display:"flex",
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for blur effect
        backdropFilter: 'blur(5px)', // Apply a blur effect to the background
      }
      const underlined_input={
        border: 'none',
        borderBottom: "1px solid black",/* Color and style of the underline */
        width: "90%",
        padding: "5px 0", /* Adjust padding for better alignment */
        outline: "none" ,
        fontSize:'1.2rem',
        marginBottom:"50px"
      }
    

    return (
        <div style={bigdiv}>
        <div style={divStyle}>
            <ClearIcon style={{ alignSelf: 'flex-end' }} onClick={handleCloseProject}/>
           <h1 style={{color:"gray"}}>Add New Project</h1>
           <br/>
           <form onSubmit={handleSubmit(onSubmit)} style={{width:"100%",display:"flex",flexDirection:"column"}}>
           <div >
             <Controller
               name="project_name" // Field name
               control={control}
               rules={{
                 required: 'Project_Name is required', // Validation rules (optional)
        // Add more validation rules as needed
               }}
               render={({ field, fieldState }) => (
                <div>
                 <input {...field} placeholder="Project Title" style={underlined_input}/>
                 {fieldState.error && (
                    <p>{fieldState.error.message}</p>
                   )}
                </div>
               )}
             />
             <Controller
               name="wiki" // Field name
               control={control}
               rules={{
                 required: 'A small description is required', // Validation rules (optional)
        // Add more validation rules as needed
               }}
               render={({ field, fieldState }) => (
                <div>
                 <input {...field} placeholder="Add Wiki" style={underlined_input}/>
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
           }}>ADD PROJECT</button>

           </form>
        </div>
        </div>
    )
}