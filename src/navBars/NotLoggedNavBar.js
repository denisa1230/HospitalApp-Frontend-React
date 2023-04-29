import React from "react"
import {Navbar,Nav} from "react-bootstrap"

function NotLoggedNavBar(){
    return(
        <Navbar expend="lg" bg="dark" variant="dark">
            <img src={require("../Images/icon.png")} alt="Logo" height="40" width="40" className="d-inline-block align-top" />
            <br/>
              <Nav className="mr-auto">
                 
                  <Nav.Link href="/Login">Home</Nav.Link>
                 


              </Nav>
        </Navbar>
    )
}

export default NotLoggedNavBar
