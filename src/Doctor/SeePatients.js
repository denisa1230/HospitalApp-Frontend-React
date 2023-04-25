import React from "react";
import DoctorNavBar from "../navBars/DoctorNavBar";
import axios from "axios"
import { Button, Col, Container, Row } from "reactstrap";
import ReactTable from "react-table-6";
import { Card, CardBody, Jumbotron, ListGroup, ListGroupItem } from "reactstrap";
import image1 from "../Images/doctor1.jpg";

const textStyle = { color: "black", fontWeight: "bold" };

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
      idDoctor:"",
      selected: 0,
      selectedAppoiments:""
    };
    this.getAppoimentByDoctor=this.getAppoimentByDoctor.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleClickConsultation=this.handleClickConsultation.bind(this);
  }

  componentDidMount(){
    this.getDoctorByAccount()
}


getDoctorByAccount() {
    var username = localStorage.getItem("username");
    axios.get(`http://localhost:8080/doctor/getDoctorByAccount/${username}`)
      .then((response) => {
        this.setState({
          idDoctor: response.data.idDoctor
        },()=>{
          this.getAppoimentByDoctor()
        });
      });
  }

  getAppoimentByDoctor(){
        
    axios.get(`http://localhost:8080/appointments/getAppointmentByDoctor/${this.state.idDoctor}`)
    .then((response) => {
        var allAppointments=response.data
        var pendingAppoiments=[]
        for(var i=0;i<allAppointments.length;i++){
            if(allAppointments[i].status==="Approved Appointment" || allAppointments[i].status==="Canceled Appointment") 
            pendingAppoiments.push(allAppointments[i])
        }
        this.setState({
            appoiments:pendingAppoiments
        })

    })
}

  handleUpdate() {
    this.setState({
      update: true,
    });
    this.props.history.push("/MakeAppoiments");
  }

  handleSubmit(appointments){
      
    axios.post("http://localhost:8080/appointments/updateAppointment",appointments
     ).then(response=>{
        this.getAppointmentsByDoctor()
      this.setState({
        update:"false"
      })
  })
}
handleClickConsultation(index) {
  const selectedAppointment = this.state.appoiments[index].idAppointment;
  localStorage.setItem("selectedAppointment", selectedAppointment);
  console.log(selectedAppointment)
  this.props.history.push(`/MakeConsultation`);
}

    render(){

        return(
            <div>
            <DoctorNavBar notificationPage="false" /> 
            <Container fluid style={backgroundStyle}>
              <div className="c">
                <h1 className="display-3" style={textStyle}>
                  <center> View Patients</center> </h1>
              </div>
              
              <div>
                <br></br>
                <br></br>
                <Row>
                  <Col ssm="6" md={{ size: 8, offset: 3 }}>
                    <Card>
                      <CardBody>
                        <ReactTable
                          defaultPageSize={10}
                          data={this.state.appoiments}
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
                              Header: "Patient Name",
                              accessor: "patient",
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
                       <button className="button-33" onClick={() => this.handleClickConsultation(this.state.selected)} disabled={this.state.selected === -1}>Make A Consultation</button>
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