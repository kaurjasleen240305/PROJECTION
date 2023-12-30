import { createSlice } from "@reduxjs/toolkit";

const searchSlice=createSlice({
    name:'projects',
    initialState:{
        searchType:'',
        searchquery:'',
    },
    reducers:{
        setprojectdata:(state,action)=>{
            state.projectData=action.payload
        },
    }
})

export const {addProject,deleteProject,setprojectdata,changeLoadingStatus}=projectSlice.actions;
export default projectSlice.reducer;