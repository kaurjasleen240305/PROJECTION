import BackendClient from "../back_client";
import { setNonmemberSlice } from "../features/open_memSlice";

const getNonmembers=()=>{
    return async(dispatch,pid)=>{
        
        await BackendClient.get(`projects/get_non_members/${pid}`).then((res)=>{
            return res.data;
        })
        .then((data)=>{
            console.log(data)
            console.log("erngjnerjgnng")
            dispatch(setNonmemberSlice(data));
        })
    };
};

export default getNonmembers;