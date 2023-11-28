import BackendClient from "../back_client";
import { setCardList } from "../features/dash_slice";


const setdashCards=()=>{
    
    return async(dispatch)=>{
        await BackendClient.get("loggedIn_cards/").then((res)=>{
            return res.data;
        }).then((data)=>{
            dispatch(setCardList(data))
            console.log("DONENEFERGGREGRDG")
        })
    };
};

export default setdashCards;
