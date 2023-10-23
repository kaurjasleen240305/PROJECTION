import { createSlice } from "@reduxjs/toolkit";

const projectInfoSlice=createSlice({
    name:"project_info",
    initialState:{project_info:{}},
    reducers:{
        setprojectinfo: (state, action) => {
            state.project_info = action.payload;
          },
    }
})

export const {setprojectinfo}=projectInfoSlice.actions
export default projectInfoSlice.reducer