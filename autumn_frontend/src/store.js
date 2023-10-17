import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import projectReducer from "./features/projectslice";
import drawerReducer from "./features/drawerSlice";
import projectformReducer from "./features/project_formSlice";



var rootreducer={
   user:userReducer,
   project:projectReducer,
   drawer:drawerReducer,
   project_form:projectformReducer,
}
const store=configureStore({
    reducer:rootreducer,
})

export default store;