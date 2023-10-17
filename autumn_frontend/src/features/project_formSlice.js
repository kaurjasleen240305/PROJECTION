import { createSlice } from "@reduxjs/toolkit";

const projectformSlice=createSlice({
    name:"project_form",
    initialState:{isOpen:false},
    reducers:{
        openForm:(state)=>{
            state.isOpen=true
        },
        closeForm:(state)=>{
            state.isOpen=false
        }
    }
})

export const {openForm,closeForm}=projectformSlice.actions
export default projectformSlice.reducer