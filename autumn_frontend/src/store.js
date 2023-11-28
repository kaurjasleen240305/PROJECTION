import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import projectReducer from "./features/projectslice";
import drawerReducer from "./features/drawerSlice";
import projectformReducer from "./features/project_formSlice";
import projectIdReducer from "./features/projectIdSlice"
import listReducer from "./features/listSlice";
import cardReducer from "./features/cardSlice";
import commentReducer from "./features/commentSlice";
import projectinfoReducer from "./features/project_info"
import memberReducer from "./features/open_memSlice"
import allUserReducer from "./features/all_users"
import profileReducer from "./features/profileDiv"



var rootreducer={
   user:userReducer,
   project:projectReducer,
   drawer:drawerReducer,
   project_form:projectformReducer,
   project_Id:projectIdReducer,
   lists:listReducer,
   cards:cardReducer,
   comments:commentReducer,
   project_info:projectinfoReducer,
   project_members:memberReducer,
   all_users:allUserReducer,
   profile_div:profileReducer,

}
const store=configureStore({
    reducer:rootreducer,
})

export default store;