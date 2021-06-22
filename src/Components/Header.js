import React, { useState, useRef } from "react"
//for use with Links
import { NavLink } from "react-router-dom"
import { Menu, MenuItem, Button } from "@material-ui/core"

export default function Header() {
   const [isOpen, setIsOpen] = useState(false)

   const ref = useRef()

   return (
      <header>
         <h1>FlatFlix</h1>
         <p>Design Logo Here</p>
         <nav>
            <Button
               ref={ref}
               aria-controls="simple-menu"
               aria-haspopup="true"
               onClick={() => setIsOpen(true)}>
               Open Menu
            </Button>
            <Menu
               id="simple-menu"
               anchorEl={ref.current}
               open={isOpen}
               onClose={() => setIsOpen(false)}>
               <MenuItem>
                  <NavLink to="/">Home</NavLink>
               </MenuItem>

               <MenuItem>
                  <NavLink to="/discover">Discover</NavLink>
               </MenuItem>
               <MenuItem>
                  <NavLink to="/favorites">Favorites</NavLink>
               </MenuItem>
            </Menu>
            <hr />
         </nav>
      </header>
   )
}
