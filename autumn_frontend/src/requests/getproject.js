import BackendClient from "../back_client";
import { setprojectinfo } from "../features/project_info";

const getproject_info=()=>{
    return async(dispatch,pid)=>{
        
        await BackendClient.get(`projects/${pid}`).then((res)=>{
            return res.data;
        })
        .then((data)=>{
            if(data=="NO ACCESS"){
                console.log("No work")
            }
            else{
            dispatch(setprojectinfo(data));
            }
        })
    };
};

export default getproject_info;