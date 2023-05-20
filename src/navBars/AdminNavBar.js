import React from "react"
import {Navbar,Nav,NavDropdown} from "react-bootstrap"
import axios from "axios"



class AdminNavBar extends React.Component{
    constructor(props){
        super(props)
        this.state={
            showNotification:"true",
            numberOfNotifications:0,
            notificationPage:this.props.notificationPage
        }
        this.handleCheckBackend=this.handleCheckBackend.bind(this)
    }

    componentDidMount(){
        if(this.state.notificationPage==="false") 
            this.intervalId =setInterval(this.handleCheckBackend.bind(this),10000)
        else this.setState({
            showNotification:"false"
        })
    }

    handleCheckBackend(){
        axios.get("http://localhost:8080/drug/getDrug").then(response=>{
            console.log(response.data)
            var allMedicines=response.data
            var nr=0
            for(var i=0;i<allMedicines.length;i++){
                if(allMedicines[i].status==="PENDING")
                 nr=nr+1
            }
            console.log(nr)
            this.setState({
                numberOfNotifications:nr
            })
        })
    }

    render(){
    return(
        <Navbar expend="lg" bg="dark" variant="dark">
           <img src={require("../Images/icon.png")} alt="Logo" height="30" width="30" className="d-inline-block align-top" />
            <Nav className="mr-auto">
                <Nav.Link href="/AdminHome">Home</Nav.Link>
               
                <NavDropdown title="Medicine Operations">
                    <NavDropdown.Item href="/Medicines">Update/Delete</NavDropdown.Item>
                    <NavDropdown.Item href="/AddMedicine">Add Medicine</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Hospital Operations">
                    <NavDropdown.Item href="/Hospital">Update/Delete</NavDropdown.Item>
                    <NavDropdown.Item href="/AddHospital">Add Hospital</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Section">
                    <NavDropdown.Item href="/Sections">Update/Delete</NavDropdown.Item>
                    <NavDropdown.Item href="/AddSection">Add Section</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Diagnostic">
                    <NavDropdown.Item href="/Diagnostic">Update/Delete</NavDropdown.Item>
                    <NavDropdown.Item href="/AddDiagnostic">Add Diagnostic</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/AddDoctor">Add Doctor</Nav.Link>
                {(this.state.showNotification==="true" && this.state.numberOfNotifications!==0) ?
                <Nav.Link href="/ApproveMedicine">Approve Medicine<button className="buttonNotification">{this.state.numberOfNotifications}</button></Nav.Link>:
                <Nav.Link href="/ApproveMedicine">Approve Medicine</Nav.Link>
                }
				 <Nav.Link href="/ApproveDiagnostic">ApproveDiagnostic</Nav.Link>
                 <Nav.Link href="/ViewChart">Statistic</Nav.Link>
                </Nav>
                    <Nav className="justify-content-end">
                    <Nav.Link href="/">Reset Password</Nav.Link>
                        <Nav.Link href="/">Log Out</Nav.Link>
                       
                </Nav>
               
        </Navbar>    
    )}
}

export default AdminNavBar
