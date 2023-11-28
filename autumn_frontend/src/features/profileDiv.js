import {createSlice} from "@reduxjs/toolkit";


const profileSlice=createSlice({
   name:"profileDiv",
   initialState:{
       isOpen:false,
    },
    reducers:{
        openPro:(state)=>{
            state.isOpen=true
        },
        closePro:(state)=>{
            state.isOpen=false
        },
        
    }
})



export const {openPro,closePro}=profileSlice.actions;
export default profileSlice.reducer;