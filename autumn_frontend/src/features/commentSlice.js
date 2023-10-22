import {createSlice} from "@reduxjs/toolkit";


const commentSlice=createSlice({
   name:"card_comments",
   initialState:{
    value:null,
    commentData:[],
    isLoading:true,
    },
    reducers:{
        setcommentdata:(state,action)=>{
            state.commentData=action.payload
        },
        addComment:(state,action)=>{
            state.commentData.push(action.payload)
        }
    }
})



export const {addComment,setcommentdata}=commentSlice.actions;
export default commentSlice.reducer;