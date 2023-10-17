import BackendClient from "./back_client";
import { setUserData } from "./features/userSlice";
import { FRONTEND_HOST } from "./hosts";


export default function CheckLogin(dispatch){
 //   console.log(BackendClient)
    BackendClient.get("/web_api/check_login",{withCredentials:true}).then((res)=>{
        console.log(BackendClient.request);
        console.log(res.data);
        if(!(res.data.Logged_In)){
            window.location.href=`${FRONTEND_HOST}login`;
            console.log("Hello")
        }
        else{
            dispatch(setUserData(res.data.user))
        }
    })
}

