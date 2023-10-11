import { useDispatch } from "react-redux";
import CheckLogin from "../check_login";
import Button from "@mui/material/Button";
import { useEffect } from "react";


export default function Dashboard(){
    const dispatch=useDispatch();
    useEffect(()=>{
        console.log("Hi")
        CheckLogin(dispatch);
    },[dispatch]);
    return (
        <h1>Hee</h1>
    )

}
