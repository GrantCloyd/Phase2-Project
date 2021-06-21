import React from "react";
import { Link } from "react-router-dom";

export default function Thumbnail({
   item: { externals, name, image, genres, rating, runtime, summary }
}) 
{
   let pathname = "";

   externals.thetvdb ? pathname = "show/" + externals.thetvdb : pathname = "error/404";
   
   return (
      <Link to={`/${pathname}`}>
         <div>
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
         </div>
      </Link>
      
   )
}
