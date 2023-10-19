import { createSlice } from "@reduxjs/toolkit";

const projectIdSlice=createSlice({
    name:"project_opened",
    initialState:{openedProjectId:null},
    reducers:{
        setOpenedProjectId: (state, action) => {
            state.openedProjectId = action.payload;
          },
    }
})

export const {setOpenedProjectId}=projectIdSlice.actions
export default projectIdSlice.reducer