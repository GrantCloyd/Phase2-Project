import React, { useContext } from "react"
import Thumbnail from "./Thumbnail"
import { Context } from "../context/Context"
import { PieChart, Pie, Legend, Cell, Tooltip, ResponsiveContainer } from "recharts"
import { Grid } from "@material-ui/core"

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

   let dataTest = []

   for (let genre in catchGenresObj) {
      dataTest.push({
         name: genre,
         value: catchGenresObj[genre],
      })
   }

   // const generateGenres = () => {
   //    let arr = []
   //    for (let genre in catchGenresObj) {
   //       arr.push(<p key={genre}>{genre + ": " + catchGenresObj[genre]}</p>)
   //    }
   //    return arr
   // }

   let runtimeArr = []
   let averageRatingArr = []

   if (favorites.length !== 0) {
      let filteredRuntime = favorites.filter(item => item.runtime)

      runtimeArr =
         filteredRuntime.map(favorite => favorite.runtime).reduce((a, b) => a + b) /
         filteredRuntime.length

      let filteredRating = favorites.filter(item => item.rating.average)

      averageRatingArr =
         filteredRating.map(favorite => favorite.rating.average).reduce((a, b) => a + b) /
         filteredRating.length
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

   const COLORS = [
      "#0088FE",
      "#00C49F",
      "#FFBB28",
      "#FF8042",
      "#F1948A",
      "#BFC9CA",
      "#BB8FCE",
      "#E74C3C",
   ]

   const RADIAN = Math.PI / 180
   const renderCustomizedLabel = ({
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      percent,
      name,
      index,
   }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5
      const x = cx + radius * Math.cos(-midAngle * RADIAN)
      const y = cy + radius * Math.sin(-midAngle * RADIAN)

      return (
         <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
         </text>
      )
   }

   return (
      <div>
         <h2>Favorites</h2>
         <h3>Favorite Shows</h3>
         <Grid container spacing={3}>
            {favThumbnails}
         </Grid>
         <h3>Breakdown of characteristics of your favorite shows</h3>
         <h4> Genres</h4>
         <ResponsiveContainer width="97%" height={475}>
            <PieChart width={400} height={400}>
               <Pie
                  data={dataTest}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={200}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name">
                  {dataTest.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
               </Pie>
               <Tooltip />
               <Legend layout="vertical" verticalAlign="middle" align="right" height={36} />
            </PieChart>
         </ResponsiveContainer>

         {/* <PieChart width={730} height={500}>
            <Pie
               data={dataTest}
               dataKey="value"
               nameKey="name"
               cx="50%"
               cy="50%"
               outerRadius={50}
               fill="#8884d8"
            />
         </PieChart> */}

         {/* <h4> Shows by released</h4> */}
         <h4>
            {" "}
            Your average show runtime: {runtimeArr.length !== 0 ? runtimeArr.toFixed(0) : null} min
         </h4>
         <h4>
            Your average show's critical rating :{" "}
            {averageRatingArr.length !== 0 ? "⭐️ " + averageRatingArr.toFixed(1) : null}
         </h4>
      </div>  
   )
}
