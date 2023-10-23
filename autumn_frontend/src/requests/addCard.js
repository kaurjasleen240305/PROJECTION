import BackendClient from "../back_client";


const addCard=()=>{
    const config = {
        headers: {
          'Content-Type': 'application/json', // Set the content type as needed
        },
      };
    return async(dispatch,data)=>{
        await BackendClient.post("cards/",data,config).then((res)=>{
            return res.data;
        }).then((data)=>{
            console.log(data)
            console.log("ABCDEF")
        })
        
    };
};

export default addCard;
