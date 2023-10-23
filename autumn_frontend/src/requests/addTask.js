import BackendClient from "../back_client";
import getCard from "./getCard";


let req1=getCard()


const addTask=()=>{
    
    return async(dispatch,data,cid)=>{
        await BackendClient.post("card_sub/",data).then((res)=>{
            console.log("Hi")
            console.log(data)
            console.log(res)
            return res.data;
        }).then((data)=>{
            console.log(data)
            console.log("jkwdwdvjkerjv")
            req1(dispatch,cid)
        })
        
    };
};

export default addTask;
