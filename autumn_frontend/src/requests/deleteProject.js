import { de } from "date-fns/locale";
import BackendClient from "../back_client";
import getprojects from "./getprojects";

let req1=getprojects()
const deleteProject=()=>{
    return async(dispatch,pid)=>{
        
        await BackendClient.delete(`projects/${pid}/`).then((res)=>{
            return res.data;
        })
        .then((data)=>{
            req1(dispatch)
        })
    };
};

export default deleteProject;