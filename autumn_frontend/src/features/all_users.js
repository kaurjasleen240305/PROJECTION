import { createSlice } from "@reduxjs/toolkit";

const allUserSlice=createSlice({
    name:'all_users',
    initialState:{
        value:null,
        userData:[],
        isLoading:true,
    },
    reducers:{
        setallUserdata:(state,action)=>{
            state.userData=action.payload
        },
        changeLoadingStatus:(state,action)=>{
            state.isLoading=action.payload
        }
    }
})

export const {setallUserdata,changeLoadingStatus}=allUserSlice.actions;
export default allUserSlice.reducer;