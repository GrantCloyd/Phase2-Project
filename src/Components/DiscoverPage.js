import React, { useState, useEffect } from "react"
import DiscoverThumbnail from "./DiscoverThumbnail"

//useEffect that gets initial data of some specified type that renders first set of Lis
//subsequent searches will change intitial LIs to searched for Lis

export default function DiscoverPage() {
   const [shows, setShows] = useState([])
   const [querySearch, setQuerySearch] = useState("")

   let discoverArray = shows.map(discoverItem => {
      return <DiscoverThumbnail key={discoverItem.show.id} item={discoverItem.show} />
   })

   const getData = (query = "a") => {
      fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
         .then(res => res.json())
         .then(data => {
            setShows(data)
         })
   }

   useEffect(() => {
      getData()
   }, [])

   return (
      <div>
         <h2>Discover Your Next Show!</h2>
         <form
            onSubmit={e => {
               e.preventDefault()
               getData(querySearch)
            }}>
            <span>Search: </span>
            <input onChange={e => setQuerySearch(e.target.value)} type="text" value={querySearch} />
            <button>Submit</button>
         </form>
         <br />
         {discoverArray}
      </div>
   )
}
