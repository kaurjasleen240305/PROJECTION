import {createSlice} from "@reduxjs/toolkit";

export const userSlice=createSlice({
    name:"user",
    initialState:{
        name:"",
        year:2,
        username:"",
        email:"",
        enrolment_no:"",
        is_admin:false,
        is_active:true,
        profile_pic:null,
    },
    reducers:{
        setUserData:(state,action)=>{
            state.name=action.payload.name;
            state.year=action.payload.year;
            state.username=action.payload.username;
            state.email=action.payload.email;
            state.enrolment_no=action.payload.enrolment_no;
            state.is_admin=action.payload.is_superuser;
            state.is_active=action.payload.is_active;
            state.profile_pic=action.payload.profile_pic;
        }
    },

});

export const {setUserData}=userSlice.actions;
export default userSlice.reducer;