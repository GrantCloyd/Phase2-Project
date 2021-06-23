import React, { useState, useEffect } from "react"
import Thumbnail from "./Thumbnail"

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
      ("0" + myDate.getDate()).slice(-2);

   console.log(myDateString);

   let featuredArray = featured.map(featureItem => {
      return (
         <Thumbnail
            key={featureItem.id}
            item={featureItem._embedded.show}
         />
      )
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
         <h4>Featured Today</h4>
         {featuredArray}
         <p>Show component here</p>
         <p>Show component here</p>
      </div>
   )
}
