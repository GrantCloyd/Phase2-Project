import React from "react"
import Thumbnail from "./Thumbnail"

export default function FavoritesPage({ favorites, handleFavorite }) {
   console.log(favorites)
   const favThumbnails = favorites.map(favorite => (
      <Thumbnail
         key={favorite.id}
         favorites={favorites}
         item={favorite}
         handleFavorite={handleFavorite}
      />
   ))

   return (
      <div>
         <h2>Favorites</h2>
         <h4>Favorite Shows</h4>
         {favThumbnails}
         <h4>Breadown of characteristics of fav shows</h4>
         <p> Shows by categories</p>
         <p> Shows by released</p>
         <p> Shows by runtime</p>
      </div>
   )
}
