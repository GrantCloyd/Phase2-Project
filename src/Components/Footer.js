import React, { useState, useRef } from "react"
import { Popper, Button } from "@material-ui/core"

export default function Footer() {
   const ref1 = useRef()
   const ref2 = useRef()
   const [contactIsOpen, setContactIsOpen] = useState(false)
   const [aboutIsOpen, setAboutIsOpen] = useState(false)

   return (
      <div id="footerSection">
         <br />
         <Button
            className="footerButton"
            onClick={() => setContactIsOpen(!contactIsOpen)}
            ref={ref1}>
            Contact
         </Button>
         <Popper placement="bottom-end" open={contactIsOpen} anchorEl={ref1.current}>
            <div>Created by Anthony and Grant</div>
         </Popper>
         <Button className="footerButton" onClick={() => setAboutIsOpen(!aboutIsOpen)} ref={ref2}>
            About
         </Button>
         <Popper placement="bottom-start" open={aboutIsOpen} anchorEl={ref2.current}>
            <div>Phase 2 //Flatiron Project</div>
         </Popper>
         {/* <img id="footer" src="https://i.imgur.com/QBArIxc.png" alt="Flatflix logo"/> */}
      </div>
   )
}
