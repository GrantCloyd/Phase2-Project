import React, { useState, useRef } from "react"
//for use with Links
import { NavLink, useHistory, Link } from "react-router-dom"
import { Icon, Menu, MenuItem, Button } from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"

export default function Header() {
   const [isOpen, setIsOpen] = useState(false)

   const ref = useRef()

   const headerHistory = useHistory()

   return (
      <header>
         <Link to="/">
            <img
               id="logo"
               onClick={() => headerHistory.push("/")}
               src="https://i.imgur.com/QBArIxc.png"
               alt="Flatflix logo"
            />{" "}
         </Link>
         <nav>
            <Button
               ref={ref}
               aria-controls="simple-menu"
               aria-haspopup="true"
               onClick={() => setIsOpen(true)}>
               <Icon>
                  <MenuIcon />
               </Icon>
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
