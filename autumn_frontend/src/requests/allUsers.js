import BackendClient from "../back_client";
import { setallUserdata } from "../features/all_users";


const getallUsers=()=>{
    
    return async(dispatch)=>{
        await BackendClient.get("users/").then((res)=>{
            console.log("Hi")
            console.log(res)
            return res.data;
        }).then((data)=>{
            console.log(data)
            dispatch(setallUserdata(data))
        })
        
    };
};

export default getallUsers;
