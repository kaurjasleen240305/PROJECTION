import BackendClient from "./back_client";
import { setUserData } from "./features/userSlice";
import { FRONTEND_HOST } from "./hosts";
import getprojects from "./requests/getprojects";
import getallUsers from "./requests/allUsers";
import setdashCards from "./requests/setdashCards";
import setdashProjects from "./requests/setdashProjects";


let req3=setdashCards()
let req4=setdashProjects()

export default function CheckLogin(dispatch){
 //   console.log(BackendClient)
    BackendClient.get("check_login",{withCredentials:true}).then((res)=>{
        console.log(BackendClient.request);
        console.log(res.data);
        if(!(res.data.Logged_In)){
            window.location.href=`${FRONTEND_HOST}/login`;
            console.log("Hello")
        }
        else{
            dispatch(setUserData(res.data.data))
            req3(dispatch)
            req4(dispatch)
        }
    })
}

