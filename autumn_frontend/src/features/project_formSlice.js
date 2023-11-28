import { createSlice } from "@reduxjs/toolkit";

const projectformSlice=createSlice({
    name:"project_form",
    initialState:{
        isOpen:false,
        isListOpen:false,
        isBigOpen:false,
        isAssignOpen:false,
        isCardFormOpen:false,
        profile_image:false,
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
        },
        openAssign:(state)=>{
            state.isAssignOpen=true
        },
        closeAssign:(state)=>{
            state.isAssignOpen=false
        },
        openCardForm:(state)=>{
            state.isCardFormOpen=true
        },
        closeCardForm:(state)=>{
            state.isCardFormOpen=false
        },
        openProfileImage:(state)=>{
            state.profile_image=true
        },
        closeProfileImage:(state)=>{
            state.profile_image=false
        }
    }
})

export const {openForm,closeForm,openListForm,closeListForm,openbig,closebig,openAssign,closeAssign,openCardForm,closeCardForm,openProfileImage,closeProfileImage}=projectformSlice.actions
export default projectformSlice.reducer