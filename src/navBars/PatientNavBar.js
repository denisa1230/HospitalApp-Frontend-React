import React from "react"

import {Navbar,Nav,NavDropdown} from "react-bootstrap"

function DoctorNavBar(){
    return(
        <Navbar expend="lg" bg="dark" variant="dark">
            <Nav className="mr-auto">
                <Nav.Link href="/PatientHome">Home</Nav.Link>
                <Nav.Link href="/ShowDoctor">ShowDoctor</Nav.Link>
                <Nav.Link href="/ViewConsultation">ViewConsultation</Nav.Link>
                <NavDropdown title="Appoiments">
                    <NavDropdown.Item href="/MakeAppoiments">MakeAppoiments</NavDropdown.Item>
                    <NavDropdown.Item href="/ViewAppoiments">ViewAppoiments</NavDropdown.Item>
                </NavDropdown>
                </Nav>
                    <Nav className="justify-content-end">
                        <Nav.Link href="/Reset">Reset Password</Nav.Link>
                        <Nav.Link href="/">Log Out</Nav.Link>
                    </Nav>
        </Navbar>
    )
}

export default DoctorNavBar
