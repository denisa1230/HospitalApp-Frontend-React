import React from "react";
import { Card, CardBody, Jumbotron, ListGroup, ListGroupItem } from "reactstrap";
import axios from "axios";
import { FaEdit } from "react-icons/all";
import PatientNavBar from "../navBars/PatientNavBar";
import image1 from "../Images/doctor1.jpg";
import { Button, Col, Container, Row } from "reactstrap";
import ReactTable from "react-table-6";
import { withRouter } from "react-router-dom";
import MakeAppointement from "./Calendar";

const backgroundStyle = {
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  width: "100%",
  height:'100vh',
  marginTop:'0px',
  marginBottom:'0px',
  backgroundImage: `url(${image1})`
};

class DoctorProfile extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedDoctor: {},
      };
     
    }
  
    componentDidMount() {
      var doctorId= localStorage.getItem("showProfile");
      console.log("TEST "+doctorId);
      axios.get(`http://localhost:8080/doctor/getDoctorById/${doctorId}`)
      .then(response => {
        console.log(response.data);
        this.setState({ selectedDoctor: response.data });
       
      })
      .catch(error => {
        console.log(error);
      });
      }

      handleUpdate() {
       this.props.history.push('/MakeAppoiments');
      }
    
  
    render() {
      return (
        <div className="body">
        <PatientNavBar />
        <Jumbotron fluid style={backgroundStyle}>
        
          <Card  className="cardW">
          <span>
             <h3 align="center">Doctor profile</h3>
           </span>
           <CardBody>
            <ListGroup flush>
              <ListGroupItem><b>First Name: </b> {this.state.selectedDoctor.firstName} 
              </ListGroupItem>
              <ListGroupItem><b>Last Name:</b> {this.state.selectedDoctor.lastName}
              </ListGroupItem>
              <ListGroupItem><b>Specialization:</b> {this.state.selectedDoctor.specialization}</ListGroupItem>
              <ListGroupItem><b>Email:</b> {this.state.selectedDoctor.email}</ListGroupItem>
              <ListGroupItem><b>Phone:</b> {this.state.selectedDoctor.phone}
              </ListGroupItem>
              <ListGroupItem><b>Description:</b> {this.state.selectedDoctor.description}
              </ListGroupItem>
              <ListGroupItem><b>Program:</b> {this.state.selectedDoctor.program}
              </ListGroupItem>
              <button className="button3" style={{ textAlign: 'center' }} onClick={() => this.handleUpdate()}>Make a Appointement</button>
        </ListGroup>
        </CardBody>
        </Card>
       
        </Jumbotron>
      </div>
    );
      }
  }
  
  export default DoctorProfile;
  