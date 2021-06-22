import React, {useContext} from "react"
import { Link } from "react-router-dom"
import { Context } from "../context/Context"

export default function Thumbnail({
   item: { externals, name, image, genres, rating, runtime, summary },
   item,
   // favorites,
   // handleFavorite,
}) {
   let pathname = ""

   const {favorites, handleFavorite} = useContext(Context)

   // console.log(context)

   let favoriteStatus = favorites.find(favorite => favorite.id === item.id) === undefined

   externals.thetvdb ? (pathname = "show/" + externals.thetvdb) : (pathname = "error/404")

   return (
      <div>
         <Link to={`/${pathname}`}>
            <img
               alt={name}
               src={
                  image !== null
                     ? image.medium
                     : "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg"
               }
            />
            <h4>{name}</h4>
            {rating.average ? <p>{rating.average}</p> : null}
         </Link>
         <button onClick={() => handleFavorite(item)}>
            {favoriteStatus ? "☆ Favorite" : "⭐️ Remove"}
         </button>
      </div>
   )
}
