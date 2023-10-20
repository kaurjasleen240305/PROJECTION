import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import projectReducer from "./features/projectslice";
import drawerReducer from "./features/drawerSlice";
import projectformReducer from "./features/project_formSlice";
import projectIdReducer from "./features/projectIdSlice"
import listReducer from "./features/listSlice";
import cardReducer from "./features/cardSlice"



var rootreducer={
   user:userReducer,
   project:projectReducer,
   drawer:drawerReducer,
   project_form:projectformReducer,
   project_Id:projectIdReducer,
   lists:listReducer,
   cards:cardReducer,
}
const store=configureStore({
    reducer:rootreducer,
})

export default store;