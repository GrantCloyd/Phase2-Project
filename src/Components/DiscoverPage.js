import React, { useState, useEffect } from "react"
import DiscoverThumbnail from "./DiscoverThumbnail";

//useEffect that gets initial data of some specified type that renders first set of Lis
//subsequent searches will change intitial LIs to searched for Lis

export default function DiscoverPage() {
   const [shows, setShows] = useState([]);

   let discoverArray = shows.map(discoverItem => {
      return <DiscoverThumbnail key={discoverItem.show.id} item={discoverItem.show} />
  })

   useEffect(() => {
      fetch("https://api.tvmaze.com/search/shows?q=a")
          .then(res => res.json())
          .then(data => {
            setShows(data);
          });
  }, [])


   return (
      <div>
         <h2>Discover Your Next Show!</h2>

         <span>Search: </span>
         <input type="text" />
         {discoverArray}
      </div>
   )
}
