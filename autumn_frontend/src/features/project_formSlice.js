import { createSlice } from "@reduxjs/toolkit";

const projectformSlice=createSlice({
    name:"project_form",
    initialState:{
        isOpen:false,
        isListOpen:false,
        isBigOpen:false,
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
        },
        openbig:(state)=>{
            state.isBigOpen=true
        },
        closebig:(state)=>{
            state.isBigOpen=false
        }
    }
})

export const {openForm,closeForm,openListForm,closeListForm,openbig,closebig}=projectformSlice.actions
export default projectformSlice.reducer