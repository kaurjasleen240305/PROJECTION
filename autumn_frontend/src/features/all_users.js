import { createSlice } from "@reduxjs/toolkit";

const allUserSlice=createSlice({
    name:'all_users',
    initialState:{
        value:null,
        userData:[],
        isLoading:true,
    },
    reducers:{
        setUserdata:(state,action)=>{
            state.projectData=action.payload
        },
        changeLoadingStatus:(state,action)=>{
            state.isLoading=action.payload
        }
    }
})

export const {setUserdata,changeLoadingStatus}=allUserSlice.actions;
export default allUserSlice.reducer;