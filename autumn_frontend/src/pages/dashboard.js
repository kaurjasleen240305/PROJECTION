import { useDispatch } from "react-redux";
import CheckLogin from "../check_login";
import {button} from "@mui/material";
import { useEffect } from "react";


export default function Dashboard(){
    const dispatch=useDispatch();
    useEffect(()=>{
        console.log("Hi")
        CheckLogin(dispatch);
    },[dispatch]);
    return (
        <button variant="container">Dashboard</button>
    )

}
