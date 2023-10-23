import { createSlice } from "@reduxjs/toolkit";

const projectIdSlice=createSlice({
    name:"project_opened",
    initialState:{openedProjectId:null,openedCardId:null,openedSubtaskId:null,openedListId:null},
    reducers:{
        setOpenedProjectId: (state, action) => {
            state.openedProjectId = action.payload;
          },
        setOpenedCardId:(state,action)=>{
            state.openedCardId=action.payload
        },
        setOpenedSubtaskId:(state,action)=>{
            state.openedSubtaskId=action.payload
        },
        setopenedListId:(state,action)=>{
            state.openedListId=action.payload
        }
    }
})

export const {setOpenedProjectId,setOpenedCardId,setOpenedSubtaskId,setopenedListId}=projectIdSlice.actions
export default projectIdSlice.reducer