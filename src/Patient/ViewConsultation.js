import React from "react";
import { Card, CardBody, Row, Col,Modal,Container, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import axios from "axios";
import { FaEdit } from "react-icons/all";
import PatientNavBar from "../navBars/PatientNavBar";
import ReactTable from "react-table-6";
import image1 from "../Images/section.jpg";


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

class ViewConsultation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      consultation: [],
      consultationMedicine: [],
      email: "",
      selectedRows: [],
      table: false,
      selectedRow:" ",
      modal:false
    };
    this.getPatient = this.getPatient.bind(this);
    this.getConsultation = this.getConsultation.bind(this);
    this.getDrugsByConsultation = this.getDrugsByConsultation.bind(this);
    this.handleViewMedicine = this.handleViewMedicine.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    this.getPatient();
  }

  getPatient() {
    var username = localStorage.getItem("username");
    axios
      .get(`http://localhost:8080/patient/getPatientByAccount/${username}`)
      .then((response) => {
        this.setState(
          {
            email: response.data.account.email,
          },
          () => {
            console.log(this.state.email);
            this.getConsultation();
          }
        );
      });
  }

  getConsultation() {
    axios.get(`http://localhost:8080/consultation/getConsultationByUsername/${this.state.email}`)
      .then((response) => {
        this.setState(
          {
            consultation: response.data,
          },
          () => {
            console.log(this.state.consultation);
            
          }
        );
      });
  }

  getDrugsByConsultation() {
    axios.post(`http://localhost:8080/consultationMedicine/getDrugConsultation/`,this.state.selectedConsultation)
      .then((response) => {
        this.setState({
          consultationMedicine: response.data,
        });
        console.log(this.state.consultationMedicine);
      });
  }

  handleViewMedicine(row) {
    var selectedRow = row; // salvați întregul obiect "row"
    console.log(selectedRow);
    this.setState({ selectedConsultation: selectedRow }, () => {
      this.getDrugsByConsultation();
    });
    this.setState({ table: true,
      modal:true
     });
  }

  toggleModal() {
    this.setState({ modal: !this.state.modal });
  }

  render() {
    const { consultationMedicine, table } = this.state;
  
    return (
      <div fluid style={backgroundStyle}>
        <PatientNavBar />
        <Container fluid >
          <div>
        <br/>
        <Row>
          <Col ssm="6" md={{ size: 8, offset: 3 }}>
            <Card >
              <CardBody>
                <ReactTable
                  defaultPageSize={10}
                  data={this.state.consultation}
                  columns={[
                    {
                      Header: "Details",
                      accessor: "details"
                    },
                    {
                      Header: "Date Consultation",
                      accessor: "appointment.date"
                    },
                    {
                      Header: "Doctor Name",
                      accessor: "appointment.doctor",
                      Cell: row => {
                        const doctor = row.value;
                        const doctorStr = `${doctor.firstName} ${doctor.lastName}`;
                        return <span>{doctorStr}</span>;
                      }
                    },  
                    {
                      Header: "View Medicine",
                      id: "viewMedicine",
                      Cell: row => (
                        <div>
                          <button
                            className="button-33"
                            onClick={() => this.handleViewMedicine(row.original)}
                          >
                            View Medicine
                          </button>
                        </div>
                      )
                    }
                  ]}
                  getTrProps={(state, rowInfo) => {
                    if (rowInfo && rowInfo.row) {
                      return {
                        onClick: () => {
                          this.setState({ selectedRow: rowInfo.index });
                        },
                        style: {
                          background:
                            this.state.selectedRow === rowInfo.index
                              ? "#00afec"
                              : "",
                          color:
                            this.state.selectedRow === rowInfo.index
                              ? "white"
                              : "black"
                        }
                      };
                    } else {
                      return {};
                    }
                  }}
                />
                <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Medicine</ModalHeader>
                <ModalBody>
                  {this.state.consultationMedicine.map((medicine) => (
                    <div key={medicine.id}>
                      <h5>{medicine}</h5>
                    </div>
                  ))}
                </ModalBody>
                <ModalFooter>
                  <Button color="secondary" onClick={this.toggleModal}>Close</Button>
                </ModalFooter>
              </Modal>
              </CardBody>
            </Card>
          </Col>
        </Row>
        </div>
        </Container>
  
      </div>
    );
  }
}
export default ViewConsultation