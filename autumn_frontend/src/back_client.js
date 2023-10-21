import axios from "axios"
import { BACKEND_HOST } from "./hosts" 



//axios.defaults.xsrfCookieName="csrftoken";
axios.defaults.headers.post["Content-Type"]="multipart/form-data";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";


const BackendClient=axios.create({
    baseURL:BACKEND_HOST,
    withCredentials:true,
    'Access-Control-Allow-Origin': '*',
})

export default BackendClient;
