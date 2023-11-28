import { createSlice } from "@reduxjs/toolkit";


export const dashSlice=createSlice({
    name:"dash",
    initialState:{
        projectList:[],
        cardList:[],
    },
    reducers:{
        setProjectList:(state,action)=>{
            state.projectList=action.payload
        },
        setCardList:(state,action)=>{
            state.cardList=action.payload
        }
    },
});

export const {setProjectList,setCardList}=dashSlice.actions
export default dashSlice.reducer