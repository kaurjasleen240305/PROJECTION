import { createSlice } from "@reduxjs/toolkit";


export const drawerSlice=createSlice({
    name:"drawer",
    initialState:{
        isOpen:false,
    },
    reducers:{
        setisOpen:(state,action)=>{
            state.isOpen=action.payload;
        },
    },
});

export const {setisOpen}=drawerSlice.actions
export default drawerSlice.reducer