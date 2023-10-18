import BackendClient from "../back_client";
import { setprojectdata,changeLoadingStatus } from "../features/projectslice";


const addproject=()=>{
    const config = {
        headers: {
          'Content-Type': 'application/json', // Set the content type as needed
        },
      };
    return async(dispatch,data)=>{
        await BackendClient.post("projects/",data,config).then((res)=>{
            console.log("Hi")
            dispatch(changeLoadingStatus(false));
            return res.data;
        })
        
    };
};

export default addproject;
