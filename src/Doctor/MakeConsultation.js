import React from "react";
import axios from "axios";
import DoctorNavBar from "../navBars/DoctorNavBar";
import "react-table-6/react-table.css";
import { Form, FormGroup, Input, Label, Button, Col, Row } from "reactstrap";
import BackgroundImg from "../Images/AddHospital.jpg";
import ReactTable from "react-table-6"
import "react-table-6/react-table.css"
import Card from "react-bootstrap/Card";
import CardBody from "reactstrap/es/CardBody";
import Swal from 'sweetalert2';

const textStyle = { color: "black", fontWeight: "bold" };
const backgroundStyle = {
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  width: "100%",
  height: "100%",
  backgroundImage: `url(${BackgroundImg})`,
};

class MakeConsultation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      consultation: {
        details : "",
        appointment: [],
        diagnostic: [],
        
      },
      consultationMedicine:{
      consultations:[],
      drug:[]
      },
      drugs: [],
      diagnosticList:[],
      selectedAppointment:[],
      selectedDiagnostic:[],
      table:"false", 
      createdConsultation:[],
      selectedRows:[],
      newConsultation: null
      
    };
    this.getDrug = this.getDrug.bind(this);
    this.getDiagnostic = this.getDiagnostic.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDrugs = this.handleDrugs.bind(this);
    this.handleDiagnostic=this.handleDiagnostic.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.getSelectedAppoiment=this.getSelectedAppoiment.bind(this);

  }

  componentDidMount() {

    this.getSelectedAppoiment();
    this.getDiagnostic();
    this.getDrug();
  }

  getSelectedAppoiment(){
    
    var idAppointment = localStorage.getItem("selectedAppointment");
    console.log(idAppointment)
    axios.get(`http://localhost:8080/appointments/getAppointmentById/${idAppointment}`).then(response => {
        this.setState({
          selectedAppointment:response.data,
        }, () => {
          console.log(this.state.selectedAppointment);
        });
    })
  }
  

  getDrug() {
    axios.get("http://localhost:8080/drug/findAllDrug").then((response) => {
      console.log(response.data);
      this.setState({
        drugs: response.data,
      });
    });
  }

  getDiagnostic() {
    axios.get("http://localhost:8080/diagnostic/findAllDiagnosis").then(response => {
      var findDiagnosis=[]
      for (var i=0;i<response.data.length;i++)
      {
        findDiagnosis.push(response.data[i])
      }
      console.log(findDiagnosis)
      this.setState({
        diagnosticList:findDiagnosis
      });
    });
    
  }

  handleSubmit() {
    this.setState({ 
      table: "true",
  });
  }

  handleDrugs() {
    const selectedDrugs=[]
    for (var i=0;i<this.state.selectedRows.length;i++)
    {
      selectedDrugs.push(this.state.drugs[this.state.selectedRows[i]])
    }
    axios.post("http://localhost:8080/consultationMedicine/saveConsultationMedicine" ,{
      consultation:{
      details: this.state.consultation.details,
      appointment: this.state.selectedAppointment,
      diagnostic: this.state.selectedDiagnosticObj
      },
      drugs: selectedDrugs
    }).then(response=>{
      Swal.fire('The consultation was completed successfully')
      this.props.history.push("/SeePatients")
  })
  }

  handleChange(event){
    const {name,value}=event.target
    this.setState(prevState=>({
        consultation:{
            ...prevState.consultation,
            [name]:value
        }
    }))
  }

  
  handleDiagnostic = event => {
    const selectedDiagnosticName = event.target.value;
    const selectedDiagnosticObj = this.state.diagnosticList.find(diagnostic => diagnostic.name === selectedDiagnosticName);
    this.setState({ 
      selectedDiagnostic: selectedDiagnosticName,
      selectedDiagnosticObj: selectedDiagnosticObj
    });
    console.log(selectedDiagnosticObj);
  };
  
render() {
    return (
    <div style={backgroundStyle}>
    <DoctorNavBar />
    <Form className="login-form">
    <img className="imgggg" src={require("../Images/consultation.gif")} alt="Logo"/>
    <br/>
    <br/>
    <h3>
    <span className="user-message">Make a Consultation</span>
    </h3>
    
    <FormGroup>
    <Label className="add-label">Consultation Details</Label>
    <Input
               className="input"
               value={this.state.consultation.detalis}
               type="text"
               name="details"
               onChange={this.handleChange}
               placeholder="Consultation Details"
             />
    </FormGroup>
    <FormGroup>
  <Label className="add-label">Diagnostic</Label>
  <Input
    type="select"
    name="diagnostic"
    value={this.state.selectedDiagnostic}
    onChange={this.handleDiagnostic}
  >
    <option>Select Diagnostic</option>
    {this.state.diagnosticList.map(diagnostic => (
  <option key={diagnostic.id}>{diagnostic.name}</option>
))}
  </Input>
</FormGroup>
    <Button className="button-33" onClick={this.handleSubmit}>Add Medicine</Button>
    </Form>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    {this.state.table==="true" ?
                <div><br/><br/><br></br>
                <Row><Col ssm="6" md={{ size: 8, offset: 3 }}><Card><CardBody>
                    <ReactTable
                        defaultPageSize={10}
                        data={this.state.drugs}
                        columns={[
                            {
                                Header: "",
                                accessor: "checkbox",
                                Cell: rowInfo => (
                                    <div>
                                        <input
                                            type="checkbox"
                                            checked={this.state.selectedRows.includes(rowInfo.index)}
                                            onChange={() => {
                                                const selectedRows = [...this.state.selectedRows];
                                                const index = selectedRows.indexOf(rowInfo.index);
                                                if (index !== -1) {
                                                    selectedRows.splice(index, 1);
                                                } else {
                                                    selectedRows.push(rowInfo.index);
                                                }
                                                this.setState({ selectedRows });
                                            }}
                                        />
                                    </div>
                                )
                            },
                            {
                                Header:"Name",
                                accessor:"drugName"
                            },
                            {
                                Header:"Dosage",
                                accessor:"dosage"
                            }
            
                        ]}
                        getTrProps={(state, rowInfo) => {
                            if (rowInfo && rowInfo.row) {
                                return {
                                    onClick: (e) => {
                                        const selectedRows = [...this.state.selectedRows];
                                        const index = selectedRows.indexOf(rowInfo.index);
                                        if (index !== -1) {
                                            selectedRows.splice(index, 1);
                                        } else {
                                            selectedRows.push(rowInfo.index);
                                        }
                                        this.setState({ selectedRows });
                                    },
                                    style: {
                                        background: this.state.selectedRows.includes(rowInfo.index) ? '#00afec' : "",
                                        color: this.state.selectedRows.includes(rowInfo.index) ? 'white' : 'black'
                                    }
                                }
                            }else{
                                return {}
                            }
                        }}
                    />
                    <button className="button-33" onClick={this.handleDrugs}>Make Consultation</button>
                </CardBody></Card></Col></Row><br/><br/>
            </div>
            
                    : null
           }
           
    </div>
    );
    }
    }
    
    export default MakeConsultation;
