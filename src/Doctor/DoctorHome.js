import React from "react";
import {Card, CardBody, Jumbotron, ListGroup, ListGroupItem} from "reactstrap";
import axios from "axios";
import {FaEdit} from "react-icons/all";
import DoctorNavBar from "../navBars/DoctorNavBar";
import image1 from "../Images/c.png";
import UpdateDoctorProfile from "./UpdateDoctorProfile";

const backgroundStyle = {
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  width: "100%",
  height:'100%',
  marginTop:'0px',
  marginBottom:'0px',
  backgroundImage: `url(${image1})`,
 
};

class DoctorHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doctor: {
        idDoctor: "",
        firstname: "",
        lastname: "",
        email: "",
        specialization: "",
        section: "",
        phone: "",
        description: "",
        program: "",
      },
      selectedDoctor: "",
      update:"false"
      
    };
    this.getDoctor = this.getDoctor.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
 
  }

  componentDidMount() {
    this.getDoctor();
  }

  getDoctor() {

    var username= localStorage.getItem("username");
    axios.get(`http://localhost:8080/doctor/getDoctorByAccount/${username}`)
      .then((response) => {
        this.setState({
          selectedDoctor: response.data,
        });
      });
  }
  

  handleUpdate(){
    this.setState({
      update:"true"
    })
  }


 handleSubmit(doctors){
      
        axios.post("http://localhost:8080/doctor/updateDoctor",doctors
         ).then(response=>{
          this.getDoctor()
          this.setState({
            update:"false"
          })
      })
  }



  render() {
    return (
        <div className="body">
        <DoctorNavBar />
        <div className="logo-container-home">
                    <img className="imgg" src={require("../Images/pictures1.png")} alt="Logo"/>
                    
                
          
        {this.state.update==="false" ?
          <Card  className="cardW-doctor">
           <img className="imggg" src={require("../Images/doctor1.jpg")} alt="Logo"/>
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
              <ListGroupItem><b>Phone:</b> {/^0/.test(this.state.selectedDoctor.phone) ? this.state.selectedDoctor.phone : '0' + this.state.selectedDoctor.phone}
</ListGroupItem>
              <ListGroupItem><b>Description:</b> {this.state.selectedDoctor.description}
              </ListGroupItem>
              <ListGroupItem><b>Program:</b> {this.state.selectedDoctor.program}
              </ListGroupItem>
              <button className="button-33" style={{ textAlign: 'center' }} onClick={this.handleUpdate}>Update</button>
        </ListGroup>
        </CardBody>
        </Card>
       :
       <UpdateDoctorProfile
       title="Update Profile"
       buttonName="Update"
       doctor={this.state.selectedDoctor}
       handleSubmit={this.handleSubmit}/>}
        </div>
      </div>
    );
  }
}

export default DoctorHome;