import React from "react"

export default function DiscoverThumbnail({
   item: { id, name, image, genres, rating, runtime, summary },
}) {
   return (
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
   )
}
