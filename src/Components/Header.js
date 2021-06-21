import React from "react"
//for use with Links
import NavLink from "react-router-dom"

export default function Header() {
   return (
      <header>
         <h1>FlatFlix</h1>
         <p>Design Logo Here</p>
         <nav>
            <ul>
               <li>Home</li>
               <li>Discover</li>
               <li>Favorites</li>
            </ul>
            <hr />
         </nav>
      </header>
   )
}
