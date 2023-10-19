import {createSlice} from "@reduxjs/toolkit";


const listSlice=createSlice({
   name:"all_lists",
   initialState:{
    value:null,
    listData:[],
    isLoading:true,
    },
    reducers:{
        addList:(state,action)=>{
            state.listData.push(action.payload)
        },
        setlistdata:(state,action)=>{
            state.listData=action.payload
        },
    }
})



export const {addList,setlistdata}=listSlice.actions;
export default listSlice.reducer;