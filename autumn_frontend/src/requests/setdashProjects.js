import BackendClient from "../back_client";
import { setProjectList } from "../features/dash_slice";


const setdashProjects=()=>{
    
    return async(dispatch)=>{
        await BackendClient.get("loggedIn_projects/").then((res)=>{
            return res.data;
        }).then((data)=>{
            dispatch(setProjectList(data))
            console.log("DONENEFERGGREGRDG")
        })
    };
};

export default setdashProjects;
