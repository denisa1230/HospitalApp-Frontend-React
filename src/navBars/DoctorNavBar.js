import React from "react"

import {Navbar,Nav,NavDropdown} from "react-bootstrap"

function DoctorNavBar(){
    return(
        <Navbar expend="lg" bg="dark" variant="dark">
            <img src={require("../Images/icon.png")} alt="Logo" height="30" width="30" className="d-inline-block align-top" />
            <Nav className="mr-auto">
                <Nav.Link href="/DoctorHome">Home</Nav.Link>
                <Nav.Link href="/AddMedicineDoctor">Add New Medicine</Nav.Link>
                <Nav.Link href="/AddDiagnosticDoctor">Add New Diagnostic</Nav.Link>
                <Nav.Link href="/AproveAppoiment">Aprove Appointment</Nav.Link>
                <Nav.Link href="/SeePatients">Make a consultation</Nav.Link>
                </Nav>
                    <Nav className="justify-content-end">
                    <Nav.Link href="/Reset">Reset Password</Nav.Link>
                        <Nav.Link href="/">Log Out</Nav.Link>
                        
                    </Nav>
        </Navbar>
    )
}

export default DoctorNavBar
