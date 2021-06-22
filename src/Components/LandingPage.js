import React from "react"
import Featured from "./Featured"
//maybe getData() from weblisttoday endpoint

export default function LandingPage({ handleFavorite, favorites }) {
   return (
      <div>
         <h2>Welcome!</h2>
         <Featured favorites={favorites} handleFavorite={handleFavorite} />
         <h4>Recently viewed shows</h4>
         <p>Recently viewed item</p>
         <p>Recently viewed item</p>
      </div>
   )
}
