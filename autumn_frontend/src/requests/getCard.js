import axios from "axios";
import BackendClient from "../back_client";
import { setcarddata } from "../features/cardSlice";

var config={
    headers: {
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
  //     'Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE'
      }
}

const getCard=()=>{
    return async(dispatch,cid)=>{
        
        await BackendClient.get(`cards/${cid}/`).then((res)=>{
            return res.data;
        })
        .then((data)=>{
            dispatch(setcarddata(data));
        })
    };
};

export default getCard;