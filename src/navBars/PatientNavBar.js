import React from "react"

import {Navbar,Nav,NavDropdown} from "react-bootstrap"

function DoctorNavBar(){
    return(
        <Navbar expend="lg" bg="dark" variant="dark">
            <img src={require("../Images/icon.png")} alt="Logo" height="30" width="30" className="d-inline-block align-top" />
            <Nav className="mr-auto">
                <Nav.Link href="/PatientHome">Home</Nav.Link>
                <Nav.Link href="/ShowDoctor">Show Doctors</Nav.Link>
                <Nav.Link href="/ViewConsultation">View Consultation</Nav.Link>
                <NavDropdown title="Appointment">
                    <NavDropdown.Item href="/MakeAppoiments">Make Appointment</NavDropdown.Item>
                    <NavDropdown.Item href="/ViewAppoiments">View Appointments</NavDropdown.Item>
                </NavDropdown>
                </Nav>
                    <Nav className="justify-content-end">
                    <Nav.Link href="/">Reset Password</Nav.Link>
                        <Nav.Link href="/">Log Out</Nav.Link>
                        
                    </Nav>
        </Navbar>
    )
}

export default DoctorNavBar
