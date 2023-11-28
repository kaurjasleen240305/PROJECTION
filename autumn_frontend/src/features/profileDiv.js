import {createSlice} from "@reduxjs/toolkit";


const profileSlice=createSlice({
   name:"profileDiv",
   initialState:{
       isOpen:false,
       selectedFile:null,
    },
    reducers:{
        openPro:(state)=>{
            state.isOpen=true
        },
        closePro:(state)=>{
            state.isOpen=false
        },
        setSelectedFile:(state,file)=>{
            state.selectedFile=file
        }
        
    }
})



export const {openPro,closePro,setSelectedFile}=profileSlice.actions;
export default profileSlice.reducer;