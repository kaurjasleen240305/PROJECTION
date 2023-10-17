import { createSlice } from "@reduxjs/toolkit";

const projectSlice=createSlice({
    name:'projects',
    initialState:{
        value:null,
        projectData:[],
        isLoading:true,
    },
    reducers:{
        addProject:(state,action)=>{
            state.projectData.push(action.payload)
        },
        deleteProject:(state,action)=>{
            return state.filter((project)=>project.id!==action.payload)
        },
        setprojectdata:(state,action)=>{
            state.projectData=action.payload
        },
        changeLoadingStatus:(state,action)=>{
            state.isLoading=action.payload
        }
    }
})

export const {addProject,deleteProject,setprojectdata,changeLoadingStatus}=projectSlice.actions;
export default projectSlice.reducer;