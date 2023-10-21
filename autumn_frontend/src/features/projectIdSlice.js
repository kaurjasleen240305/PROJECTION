import { createSlice } from "@reduxjs/toolkit";

const projectIdSlice=createSlice({
    name:"project_opened",
    initialState:{openedProjectId:null,openedCardId:null},
    reducers:{
        setOpenedProjectId: (state, action) => {
            state.openedProjectId = action.payload;
          },
        setOpenedCardId:(state,action)=>{
            state.openedCardId=action.payload
        }
    }
})

export const {setOpenedProjectId,setOpenedCardId}=projectIdSlice.actions
export default projectIdSlice.reducer