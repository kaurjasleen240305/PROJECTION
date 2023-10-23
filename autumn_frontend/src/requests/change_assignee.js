import BackendClient from "../back_client";
import getCard from "./getCard";

let req1=getCard()


const changeAssignee=()=>{
    return async(dispatch,sid,cid,data)=>{
        
        await BackendClient.post(`card_sub/${sid}/update_assignee/`,data).then((res)=>{
            return res.data;
        })
        .then((data)=>{
            console.log(data+"njkrsgergj")
             if(data=="NO ACCESS"){
                console.log("NO work")
             }
             else{
                req1(dispatch,cid)
                console.log("DONE")
             }
        })
    };
};

export default changeAssignee;