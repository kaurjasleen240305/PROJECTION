import { cs } from "date-fns/locale";
import ClearIcon from "@mui/icons-material/Clear"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BackendClient from "../../back_client";
import { useSelector,useDispatch } from "react-redux";
import getCard from "../../requests/getCard";
import {useForm,Controller} from "react-hook-form";
import AddIcon from '@mui/icons-material/Add';
import { TextField,Button } from "@mui/material";


export default function Card_Subtasks(props){
    let cs=props.card_subtasks
    const dispatch=useDispatch()
    let cid=props.cid
    console.log(cid+"hi")
    let req1=getCard()
    const { control, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
          if(data['task_name']==""){
            console.log("No work")
          }
          else{
             data["card_id"]=cid;
             BackendClient.post("card_sub/",data).then((res)=>{
                if(res.data=="NO ACCESS"){
                    console.log("No work")
                }
                else{
                    req1(dispatch,cid)
                }
             })
          }
      };

    let handlenotdone=(id)=>{
       let data={"bool":false}
       console.log('hi')
       BackendClient.put(`card_sub/${id}/`,data).then((res)=>{
          if(res.data=="NO ACCESS"){
                console.log("NO WORkk")
          }
          else{
              req1(dispatch,cid)
          }
       })
    }



    let handledone=(id)=>{
        let data={"bool":true}
       console.log('hi')
       BackendClient.put(`card_sub/${id}/`,data).then((res)=>{
          if(res.data=="NO ACCESS"){
                console.log("NO WORkk")
          }
          else{
              req1(dispatch,cid)
          }
       })
    }

    
    if(typeof(cs)=="undefined"){
        return null
    }
    return(
       <div style={{display:"flex",maxWidth:"100%",overflowX:"auto",marginTop:"20px"}}>
        {cs.map((item)=>(
            <div id={item.pk} style={{height:"30px",color:"white", marginTop:"20px",borderRadius:"5px",marginBottom:"15px",backgroundColor:(item.is_complete) ? "green":"red",display:"flex",alignItems:"center",justifyContent:"center",paddingLeft:"30px",paddingRight:'20px',marginLeft:"5px",marginRight:"5px",justifyContent:"space-between"}}>
                 <p style={{marginRight:"10px"}}>{item.task_name}</p>
                 {(item.is_complete) ? (
                    <ClearIcon color="white" onClick={()=>handlenotdone(item.pk)}/>
                    ) : (
                    <CheckCircleIcon color="white" onClick={()=>handledone(item.pk)}/>
                 )}
             </div>
        ))}
         <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="task_name"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            style={{
                // height:"30px",
                borderRadius:"5px",
                marginRight:"10px",
                marginTop:"20px",
                width:"200px",
            }}
            label="ADD TASK"
            variant="outlined"
            size="small"
            fullWidth
            {...field}
            InputProps={{
              endAdornment: (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{height:"30px",width:"30px"}}
                  startIcon={<AddIcon />}
                >
                </Button>
              ),
            }}
          />
        )}
      />
    </form>
        </div>

)}