import React from "react";


export default function Comments(props){
    let comments=props.comments
   if(typeof(comments)=="undefined"){
    return null
   }
   return(
    <div>
        {comments.map((item)=>(
                      <div style={{display:"flex",flexDirection:"column",marginLeft:"10px",marginBottom:"0px"}}>
                         <p><b>{item.sender}:</b>{item.comment}</p>
                       </div>
                    // <h1>Helo</h1>
        ))} 
    </div>
   )
}


{/* {(comments_cur).map((item)=>(
                      <div style={{display:"flex",flexDirection:"column",marginLeft:"10px",marginBottom:"0px"}}>
                         <p><b>{item.sender}:</b>{item.comment}</p>
                       </div>
                    // <h1>Helo</h1>
                  ))} */}
                  {/* {typeof(comments_cur)} */}