import BackendClient from "../back_client";
import { setprojectdata,changeLoadingStatus } from "../features/projectslice";


const getprojects=()=>{
    return async(dispatch)=>{
        dispatch(changeLoadingStatus(true));
        await BackendClient.get("/web_api/projects/").then((res)=>{
            dispatch(changeLoadingStatus(false));
            console.log(res.data)
            return res.data;
        })
        .then((data)=>{
            dispatch(setprojectdata(data));
        })
    };
};

export default getprojects;
