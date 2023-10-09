import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";



var rootreducer={
   user:userReducer,
}
const store=configureStore({
    reducer:rootreducer,
})

export default store;