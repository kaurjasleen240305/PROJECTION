import axios from "axios"
import { BACKEND_HOST } from "./hosts" 



//axios.defaults.xsrfCookieName="csrftoken";
axios.defaults.headers.post["Content-Type"]="multipart/form-data";

const BackendClient=axios.create({
    baseURL:BACKEND_HOST,
    withCredentials:true,
})

export default BackendClient;
