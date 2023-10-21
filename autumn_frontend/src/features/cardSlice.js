import {createSlice} from "@reduxjs/toolkit";


const cardSlice=createSlice({
   name:"all_cards",
   initialState:{
    value:null,
    cardData:{},
    isLoading:true,
    },
    reducers:{
        
        setcarddata:(state,action)=>{
            state.cardData=action.payload
        },
    }
})



export const {addCard,setcarddata}=cardSlice.actions;
export default cardSlice.reducer;