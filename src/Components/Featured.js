import React, { useState, useEffect } from "react"
import Thumbnail from "./Thumbnail"
import { Grid } from "@material-ui/core"

export default function Featured() {
   const [featured, setFeatured] = useState([])

   // Add Date object to get today's date
   const myDate = new Date()
   let myDateString = ""

   myDate.setDate(myDate.getDate())

   myDateString =
      myDate.getFullYear() +
      "-" +
      ("0" + (myDate.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + myDate.getDate()).slice(-2)

   let featuredArray = featured
      .filter((featureShow, index) => {
         if (featureShow._embedded.show.name !== null) {
            let findIndex = -1;

            for (let i = 0; i < featured.length; i++) {
               if (featureShow._embedded.show.name === featured[i]._embedded.show.name) {
                  findIndex = i;
                  break;
               }
            }

            return findIndex === index;
         }
         return true;
      })

      .map(featureItem => {
         return <Thumbnail key={featureItem.id} item={featureItem._embedded.show} />
      })

   useEffect(() => {
      fetch(`http://api.tvmaze.com/schedule/web?date=${myDateString}&country=US`)
         .then(res => res.json())
         .then(data => {
            setFeatured(data)
         })
   }, [myDateString])

   return (
      <div>
         <h2>Featured Today</h2>
         <Grid container spacing={3}>
            {featuredArray}
         </Grid>
      </div>
   )
}
