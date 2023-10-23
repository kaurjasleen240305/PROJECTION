import { createSlice } from "@reduxjs/toolkit";

const memberSlice=createSlice({
    name:"members",
    initialState:{
        isOpen:false,
        members:[],
        non_members:[],

    },
    reducers:{
        openmembers:(state)=>{
            state.isOpen=true
        },
        closemembers:(state)=>{
            state.isOpen=false
        },
        setmemberSlice:(state,action)=>{
            state.members=action.payload
        },
        setNonmemberSlice:(state,action)=>{
            state.non_members=action.payload
        }
    }
})

export const {openmembers,closemembers,setmemberSlice,setNonmemberSlice}=memberSlice.actions
export default memberSlice.reducer