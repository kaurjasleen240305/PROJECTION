import BackendClient from "../back_client";
import { setlistdata } from "../features/listSlice";

const getLists=()=>{
    return async(dispatch,pid)=>{
        
        await BackendClient.get(`lists/pid/${pid}`).then((res)=>{
            return res.data;
        })
        .then((data)=>{
            dispatch(setlistdata(data));
        })
    };
};

export default getLists;