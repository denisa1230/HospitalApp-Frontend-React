import React from "react";
import PatientNavBar from "../navBars/PatientNavBar";
import axios from "axios"
import { Button, Col, Container, Row } from "reactstrap";
import ReactTable from "react-table-6";
import { Card, CardBody, Jumbotron, ListGroup, ListGroupItem } from "reactstrap";
import image1 from "../Images/firstPage.png";
import { withRouter } from "react-router-dom";
import MakeAppoiments from "./MakeAppoiments";

const textStyle = { color: "#343434", fontWeight: "bold" };

const backgroundStyle = {
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  width: "100%",
  height: "100vh",
  marginTop: "0px",
  marginBottom: "0px",
  backgroundImage: `url(${image1})`,
};

class ViewAppoiments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      update: false,
      appointments: [],
      doctor:[],
      selectedPatient: null,
      idPatient:"",
      selected: 0
    };
    this.getAppointmentsByPacient = this.getAppointmentsByPacient.bind(this);
    this.getPatientByAccount = this.getPatientByAccount.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getPatientByAccount();
  }

  getPatientByAccount() {
    var username = localStorage.getItem("username");
    axios.get(`http://localhost:8080/patient/getPatientByAccount/${username}`)
      .then((response) => {
        this.setState({
          idPatient: response.data.idPatient
         
        },()=>{
            this.getAppointmentsByPacient();
        });
        console.log(this.state.idPatient);
      });
  }

  getAppointmentsByPacient() {
   
    axios.get(`http://localhost:8080/appointments/getByPatient/${this.state.idPatient}`)
      .then(response => {
        this.setState({
          appointments: response.data,
        });
        console.log(this.state.appointments)
        const appointments = this.state.appointments;
      appointments.forEach(appointment => {
        const doctor = appointment.doctor;
        console.log(doctor);
      });
      });
  }

  handleUpdate() {
    const selectedAppointment = this.state.appointments[this.state.selected];
    if (selectedAppointment.status !== 'PENDING') {
      alert("Appointment status is not PENDING!");
    } else {
      this.props.history.push({
        pathname: '/MakeAppoiments',
        state: {
          appointment: selectedAppointment
        }
      });
    }
  }
  
  
  handleDelete() {
    console.log(this.state.selected)
    axios.get(`http://localhost:8080/appointments/deleteAppointment/${this.state.appointments[this.state.selected].idAppoiment}` )
      .then((response) => {
        this.getAppointmentsByPacient();
      });
  }

  handleSubmit(appointments){
      
    axios.post("http://localhost:8080/appointments/updateAppointment",appointments
     ).then(response=>{
        this.getAppointmentsByPacient()
      this.setState({
        update:"false"
      })
  })
}
    render(){

        return(
            <div>
            <PatientNavBar notificationPage="false" /> 
            <Container fluid style={backgroundStyle}>
              <div className="c">
                <h1 className="display-3" style={textStyle}>
                  <center> View Appointment</center> </h1>
              </div>
              
              <div>
                <br></br>
                
                <Row>
                  <Col ssm="6" md={{ size: 8, offset: 3 }}>
                    <Card>
                      <CardBody>
                        <ReactTable
                          defaultPageSize={10}
                          data={this.state.appointments}
                          columns={[
                            {
                              Header: "",
                              accessor: "checkbox",
                              Cell: rowInfo => (
                                <div>
                                  <input
                                    type="checkbox"
                                    checked={this.state.selected === rowInfo.index}
                                    onChange={() =>
                                      this.setState({
                                        selected: rowInfo.index
                                      })
                                    }
                                  />
                                </div>
                              )
                            },
                            {
                              Header: "Doctor Name",
                              accessor: "doctor",
                              Cell: row => {
                                const doctor = row.value;
                                const doctorStr = `${doctor.firstName} ${doctor.lastName}`;
                                return <span>{doctorStr}</span>;
                              }
                            },                            
                            {
                              Header: "Appointment Date",
                              accessor: "date"
                            },
                            {
                              Header: "Appointment Hour",
                              accessor: "hour",
                              Cell: row => {
                                const hour = parseInt(row.value);
                                const hourStr = `${hour}:00-${hour+1}:00`;
                                return <span>{hourStr}</span>;
                              }
                            },
                            {
                              Header: "Appointment Status",
                              accessor: "status"
                            },
                          ]}
                          getTrProps={(state, rowInfo) => {
                            if (rowInfo && rowInfo.row) {
                              return {
                                onClick: (e) => {
                                  const index = rowInfo.index;
                                  const isSelected = this.state.selected === index;
                                  this.setState({
                                    selected: isSelected ? -1 : index
                                  });
                                },
                                style: {
                                  background: rowInfo.index === this.state.selected ? '#00afec' : "",
                                  color: rowInfo.index === this.state.selected ? 'white' : 'black'
                                }
                              };
                            } else {
                              return {};
                            }
                          }}
                        />
                        <br />
                        {this.state.selected >= 0 && (
                          <div className="container">
                           <button className="button3" onClick={this.handleUpdate}>Update</button>
                        </div>
                      
                        )}
                      </CardBody></Card></Col></Row> <br /><br />
                      </div>
               
            </Container>
          </div>
        );
    }
}
export default ViewAppoiments