import React, { useContext } from "react"
import Thumbnail from "./Thumbnail"
import { Context } from "../context/Context"
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts"

export default function FavoritesPage() {
   const { favorites, handleFavorite } = useContext(Context)
   const collectedGenresArray = [...favorites].map(favorite => favorite.genres)

   //genres Logic and render
   let catchGenresObj = {}
   for (let show of collectedGenresArray) {
      for (let genre of show) {
         catchGenresObj[genre] ? ++catchGenresObj[genre] : (catchGenresObj[genre] = 1)
      }
   }
   const generateGenres = () => {
      let arr = []
      for (let genre in catchGenresObj) {
         arr.push(<p key={genre}>{genre + ": " + catchGenresObj[genre]}</p>)
      }
      return arr
   }

   let runtimeArr = []
   let averageRatingArr = []

   if (favorites.length !== 0) {
      runtimeArr =
         favorites.map(favorite => favorite.runtime).reduce((a, b) => a + b) / favorites.length

      averageRatingArr =
         favorites.map(favorite => favorite.rating.average).reduce((a, b) => a + b) /
         favorites.length
   }

   // console.log(averageRatingArr)

   const favThumbnails = favorites.map(favorite => (
      <Thumbnail
         key={favorite.id}
         favorites={favorites}
         item={favorite}
         handleFavorite={handleFavorite}
      />
   ))

   let dataTest = [
      { name: "Horror", value: 5 },
      { name: "Drama", value: 3 },
   ]

   return (
      <div>
         <h2>Favorites</h2>
         <h3>Favorite Shows</h3>
         {favThumbnails}
         <h3>Breadown of characteristics of fav shows</h3>
         <h4> Genres</h4>
         <p>Your Favorites </p>
         {generateGenres()}
         <PieChart width={730} height={500}>
            <Pie
               data={dataTest}
               dataKey="value"
               nameKey="name"
               cx="50%"
               cy="50%"
               outerRadius={50}
               fill="#8884d8"
            />
         </PieChart>

         <p> Shows by released</p>
         <p> Your average show runtime: {runtimeArr} min</p>
         <p>Your average show's critical rating : {averageRatingArr}</p>
      </div>
   )
}
