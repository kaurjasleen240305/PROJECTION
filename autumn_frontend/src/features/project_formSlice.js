import { createSlice } from "@reduxjs/toolkit";

const projectformSlice=createSlice({
    name:"project_form",
    initialState:{
        isOpen:false,
        isListOpen:false,
    },
    reducers:{
        openForm:(state)=>{
            state.isOpen=true
        },
        closeForm:(state)=>{
            state.isOpen=false
        },
        openListForm:(state)=>{
            state.isListOpen=true
        },
        closeListForm:(state)=>{
            state.isListOpen=false
        }
    }
})

export const {openForm,closeForm,openListForm,closeListForm}=projectformSlice.actions
export default projectformSlice.reducer