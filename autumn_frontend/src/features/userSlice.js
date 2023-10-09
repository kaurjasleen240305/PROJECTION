import {createSlice} from "@reduxjs/toolkit";

export const userSlice=createSlice({
    name:"user",
    initialState:{
        name:"",
        year:2,
        username:"",
        email:"",
        enrolment_no:"",
        is_admin:"",
    },
    reducers:{
        setUserData:(state,action)=>{
            state.name=action.payload.name;
            state.year=action.payload.year;
            state.username=action.payload.username;
            state.email=action.payload.email;
            state.enrolment_no=action.payload.enrolment_no;
            state.is_admin=action.payload.is_admin;
        }
    },

});

export const {setUserData}=userSlice.actions;
export default userSlice.reducer;