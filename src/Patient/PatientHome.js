import React from "react";
import {Card, CardBody, Jumbotron, ListGroup, ListGroupItem} from "reactstrap";
import axios from "axios";
import {FaEdit} from "react-icons/all";
import PatientNavBar from "../navBars/PatientNavBar";
import image1 from "../Images/patient.jpg";
import UpdatePatientProfile from "./UpdatePatientProfile";

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
class PatientHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patient: {
        idPatient: "",
        firstname: "",
        lastname: "",
        email: "",
        address: "",
        gender: "",
        phone: "",
        birth: "",
      },
      selectedPatient: "",
      update:"false"
      
    };
    this.getPatient = this.getPatient.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
 
  }

  componentDidMount() {
    this.getPatient();
  }

  getPatient() {

    var username= localStorage.getItem("username");
    axios.get(`http://localhost:8080/patient/getPatientByAccount/${username}`)
      .then((response) => {
        this.setState({
          selectedPatient: response.data,
        });
      });
  }
  

  handleUpdate(){
    this.setState({
      update:"true"
    })
  }


  handleSubmit(patients) {
    // verifică dacă numărul de telefon începe cu 0 și are 10 cifre
    if (/^0\d{9}$/.test(patients.phone)) {
      axios.post("http://localhost:8080/patient/updatePatient", patients).then((response) => {
        this.getPatient();
        this.setState({
          update: "false",
        });
      });
    } else {
      alert("Numărul de telefon trebuie să înceapă cu 0 și să aibă 10 cifre!");
    }
  }



  render() {
    return (
        <div className="body">
        <PatientNavBar />
        <div className="logo-container-home">
                    <img className="imgg" src={require("../Images/patient.jpg")} alt="Logo"/>
        
        {this.state.update==="false" ?
          <Card  className="cardW-Patient">
            <img className="imgPatient" src={require("../Images/patientProfile.jpg")} alt="Logo"/>
          <span>
             <h3 align="center">Patient profile</h3>
           </span>
           <CardBody>
            <ListGroup flush>
              <ListGroupItem><b>First Name: </b> {this.state.selectedPatient.firstName} 
              </ListGroupItem>
              <ListGroupItem><b>Last Name:</b> {this.state.selectedPatient.lastName}
              </ListGroupItem>
              <ListGroupItem><b>Adress:</b> {this.state.selectedPatient.address}</ListGroupItem>
              <ListGroupItem><b>Email:</b> {this.state.selectedPatient.email}</ListGroupItem>
              <ListGroupItem><b>Phone:</b> {this.state.selectedPatient.phone}
              </ListGroupItem>
              <ListGroupItem><b>Birth:</b> {this.state.selectedPatient.birth}
              </ListGroupItem>
              <ListGroupItem><b>Gender:</b> {this.state.selectedPatient.gender}
              </ListGroupItem>
              <button className="button-33" style={{ textAlign: 'center' }} onClick={this.handleUpdate}>Update</button>
        </ListGroup>
        </CardBody>
        </Card>
       :
       <UpdatePatientProfile
       title="Update Profile"
       buttonName="Update"
       patient={this.state.selectedPatient}
       handleSubmit={this.handleSubmit}/>}
        
        </div>
      </div>
    );
  }
}

export default PatientHome;