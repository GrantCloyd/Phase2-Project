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
      .filter(featureShow => {
         if (featureShow._embedded.show.name !== null) {
            return (
               featured.filter(
                  showItem => showItem._embedded.show.name === featureShow._embedded.show.name
               ).length === 1
            )
            // } else if (featureShow._embedded.show.externals.tvrage !== null) {
            //    return (
            //       featured.filter(
            //          showItem =>
            //             showItem._embedded.show.externals.tvrage ===
            //             featureShow._embedded.show.externals.tvrage
            //       ).length === 1
            //    )
            // } else if (featureShow._embedded.show.externals.imdb !== null) {
            //    return (
            //       featured.filter(
            //          showItem =>
            //             showItem._embedded.show.externals.imdb ===
            //             featureShow._embedded.show.externals.imdb
            //       ).length === 1
            //    )
         }
         return true
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
