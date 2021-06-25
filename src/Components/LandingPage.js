import React from "react"
import Featured from "./Featured"
import Thumbnail from "./Thumbnail"
import { Grid } from "@material-ui/core"
//maybe getData() from weblisttoday endpoint

export default function LandingPage({ viewed }) {
   let recentHistory = [...JSON.parse(localStorage.getItem("viewed"))]

   const historyArray = recentHistory.map(historyItem => <Thumbnail key={historyItem.id} item={historyItem}/>)

   return (
      <div>
         <h2>Home</h2>
         {recentHistory.length > 0 ? <h3>Recently viewed shows</h3> : null}
         <Grid container spacing={3}>
            {historyArray}
         </Grid>
         {recentHistory.length > 0 ? <br/> : null}
         <Featured />
      </div>
   )
}
