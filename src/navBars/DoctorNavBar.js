import React from "react"

import {Navbar,Nav,NavDropdown} from "react-bootstrap"

function DoctorNavBar(){
    return(
        <Navbar expend="lg" bg="dark" variant="dark">
            <Nav className="mr-auto">
                <Nav.Link href="/DoctorHome">Home</Nav.Link>
                <Nav.Link href="/AddMedicineDoctor">AddMedicine</Nav.Link>
                </Nav>
                    <Nav className="justify-content-end">
                        <Nav.Link href="/Reset">Reset Password</Nav.Link>
                        <Nav.Link href="/">Log Out</Nav.Link>
                    </Nav>
        </Navbar>
    )
}

export default DoctorNavBar
