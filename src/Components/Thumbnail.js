import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { Context } from "../context/Context"
import { Button, Card, CardContent, Grid } from "@material-ui/core"

export default function Thumbnail({
   item: { externals, name, image, genres, rating, runtime, summary },
   item,
}) {
   let pathname = ""

   const { favorites, handleFavorite } = useContext(Context)

   let favoriteStatus = favorites.find(favorite => favorite.id === item.id) === undefined

   externals.thetvdb
      ? (pathname = "show/" + externals.thetvdb)
      : externals.imdb
      ? (pathname = "show/" + externals.imdb)
      : externals.tvrage
      ? (pathname = "show/" + externals.tvrage)
      : (pathname = "error/404")

   return (
      <Grid item xs={4}>
         <Card>
            <CardContent>
               <Link to={`/${pathname}`}>
                  <img
                     className="showImage"
                     alt={name}
                     src={
                        image !== null
                           ? image.medium
                           : "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg"
                     }
                  />

                  <h4 className="name">{name}</h4>
               </Link>

               {rating.average ? <p>⭐️&nbsp;&nbsp;{rating.average}</p> : <p> ⭐️ Not Rated</p>}

               <Button variant="contained" color="primary" onClick={() => handleFavorite(item)}>
                  {favoriteStatus ? "♡ Favorite" : "♥ Remove"}
               </Button>
            </CardContent>
         </Card>
      </Grid>
   )
}
