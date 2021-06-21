import React from "react"
//useEffect that gets initial data of some specified type that renders first set of Lis
//subsequent searches will change intitial LIs to searched for Lis

export default function DiscoverPage() {
   return (
      <div>
         <h2>Discover Your Next Show!</h2>

         <span>Search: </span>
         <input type="text" />
         <ul>
            {/* useParams to create single pages for each show || Poppers from Material UI? */}
            <li>starting show/image/etc</li>
            <li>starting show/image/etc</li>
            <li>starting show/image/etc</li>
         </ul>
      </div>
   )
}
