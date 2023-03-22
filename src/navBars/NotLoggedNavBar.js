import React from "react"
import {Navbar,Nav} from "react-bootstrap"

function NotLoggedNavBar(){
    return(
        <Navbar expend="lg" bg="dark" variant="dark">
              <Nav className="mr-auto">
                 <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/Login">LogIn</Nav.Link>
                 


              </Nav>
        </Navbar>
    )
}

export default NotLoggedNavBar
