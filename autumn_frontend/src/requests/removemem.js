import BackendClient from "../back_client";
import getproject_info from "./getproject";
import getNonmembers from "./get_n_mem";

let req1=getNonmembers()
let req2=getproject_info()
const   remove_mem=()=>{
    return async(dispatch,data,pid)=>{
       
        await BackendClient.post(`projects/${pid}/remove_member/`,data).then((res)=>{
            console.log(res.data)
            return res.data;
        })
        .then((data)=>{
            if(data=="NO ACCESS"){
                console.log("No work")
            }
            else{
                req1(dispatch,pid)
                req2(dispatch,pid)
            }
        })
    };
};

export default remove_mem;
