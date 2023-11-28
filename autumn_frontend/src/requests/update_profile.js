import BackendClient from "../back_client";
const   update_profile_image=()=>{
    return async(dispatch,data,username)=>{
        await BackendClient.patch(`users/${username}/`,data,{headers: {
            'Content-Type': 'multipart/form-data',
        }},).then((res)=>{
            console.log(res.data)
            return res.data;
        })
        .then((data)=>{
            console.log(data)
        })
    };
};

export default remove_mem;
