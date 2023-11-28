import BackendClient from "../back_client";
import CheckLogin from "../check_login";



const   update_profile_image=()=>{
    return async(dispatch,data,username)=>{
        await BackendClient.put(`users/${username}/`,data,{headers: {
            'Content-Type': 'multipart/form-data',
        }},).then((res)=>{
       //     console.log(res.data)
            return res.data;
        })
        .then((data)=>{
            console.log(data.profile_pic)
            CheckLogin(dispatch)
        })
    };
};

export default update_profile_image;
