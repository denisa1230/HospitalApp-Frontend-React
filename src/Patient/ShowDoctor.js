import React from "react";
import { Card, CardBody, Jumbotron, ListGroup, ListGroupItem } from "reactstrap";
import axios from "axios";
import { FaEdit } from "react-icons/all";
import PatientNavBar from "../navBars/PatientNavBar";
import image1 from "../Images/showDoctor.jpg";
import { Button, Col, Container, Row } from "reactstrap";
import ReactTable from "react-table-6";
import { withRouter } from "react-router-dom";
import DoctorProfile from './DoctorProfile';


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
const textStyle = { color: "black", fontWeight: "bold" };
class ShowDoctor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      update: false,
      doctors: [],
      selected: 0,
      selectedDoctorId:""
    };
    this.getDoctor = this.getDoctor.bind(this);
    this.handleProfileClick = this.handleProfileClick.bind(this);
  }

  componentDidMount() {
    this.getDoctor();
  }

  getDoctor() {
    axios.get("http://localhost:8080/doctor/findAllDoctor").then((response) => {
      this.setState({
        doctors: response.data,
      });
    });
  }

 
  handleProfileClick(index) {
    const selectedDoctor = this.state.doctors[index];
    localStorage.setItem("showProfile", selectedDoctor.idDoctor);
    this.props.history.push(`/DoctorProfile`);
  }
 
    
    render(){
      return (
  <div>
    <PatientNavBar notificationPage="false" /> 
    <Container fluid style={backgroundStyle}>
      <div className="c">
        <h1 className="display-3" style={textStyle}>
          <center> Make an Appointement</center>
        </h1>
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
                  data={this.state.doctors}
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
                      Header: "First Name",
                      accessor: "firstName"
                    },
                    {
                      Header: "Last Name",
                      accessor: "lastName"
                    },
                    {
                      Header: "Specialization",
                      accessor: "specialization"
                    },
                    {
                      Header: "Section",
                      accessor: "section.name"
                    },
                    {
                      Header: "Description",
                      accessor: "description"
                    }
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
                  <button className="button-33" onClick={() => this.handleProfileClick(this.state.selected)} disabled={this.state.selected === -1}> View Profile</button>
                </div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <br />
        <br />
      </div>
    </Container>
  </div>
)

  }
    }

    export default withRouter(ShowDoctor);