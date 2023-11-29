import { useSelector,useDispatch } from "react-redux"
import DashCards from "../cards/dash_card_box";

export default function DashProjects(){
    let projects=useSelector((state)=>state.dashReducer.projectList)
    let card_tasks=useSelector((state)=>state.dashReducer.cardList)
    console.log(projects);
    console.log("jwbfjkrgegnjkergnjnergj")
    return(
        <div style={{display:"flex",flexDirection:"column",padding:"30px",overflowY:true}}>
            {(projects).map((project)=>(
            <div style={{width:"100%",backgroundColor:"black",color:"white",display:"flex",flexDirection:"column",padding:"10px",alignItems:"center",marginBottom:"10px"}}>
                  <h1>{project.project_name}</h1>
                  <div style={{display:"flex"}}>
                   {(card_tasks).map((card)=>(
                       <DashCards card_info={card} pk={project.pk}/>
                   ))}
                  </div>
            </div>
            ))}
        </div>
    )
}