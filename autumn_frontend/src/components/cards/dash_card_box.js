import { useSelector,useDispatch } from "react-redux";

export default function DashCards(props){
    let project_id=props.pk
    let card_info=props.card_info
    if(card_info.card_id.lid.pid!=project_id){
        return null
    }
    return(
        <div style={{display:"flex",borderRadius:"8px",flexDirection:"column",flexWrap:"wrap",backgroundColor:"lightgray",color:"black",padding:"10px",marginLeft:"10px",marginRight:"10px"}}>
            <p><b>TASK_NAME</b> : {card_info.task_name}</p>
            <p><b>UNDER_LIST</b> : {card_info.card_id.lid.list_name}</p>
            <p><b>UNDER CARD : </b>{card_info.card_id.card_name}</p>
            <p><b>DONE</b> : {(card_info.is_complete)?"True":"False"}</p>
        </div>
    )
}