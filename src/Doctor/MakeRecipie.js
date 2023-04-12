import React from "react"
import axios from "axios"
import DoctorNavBar from "../navBars/DoctorNavBar"
import ReactTable from "react-table-6"
import "react-table-6/react-table.css"
import {Button, Col, Container, Row} from "reactstrap"
import Card from "react-bootstrap/Card";
import CardBody from "reactstrap/es/CardBody";
import BackgroundImg from '../Images/medicine.jpg';

const textStyle = {color: 'black',  fontWeight: 'bold' };
const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "100%",
    backgroundImage: `url(${BackgroundImg})`
};

class MakeRecipie extends React.Component{
    constructor(props){
        super(props)
        this.state={
            update:"false",
            appoiments:[],
            drugs:[],
            diagnosis:[],
            selected:0,
            idDoctor:""
        }
        this.getDrug=this.getDrug.bind(this)
        this.getDiagnostic=this.getDiagnostic.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    componentDidMount() {
        console.log(localStorage.getItem("selectedAppoiment"));
        const selectedAppoiment = JSON.parse(localStorage.getItem("selectedAppoiment"));
        console.log(selectedAppoiment);
      }
      getDrug(){
        axios.get("http://localhost:8080/drug/findAllDrug").then(response=>{
            console.log(response.data)
            this.setState({
                drugs:response.data
            })
        })
    }
    getDiagnostic(){
        axios.get("http://localhost:8080/diagnostic/findAllDiagnosis").then(response=>{
            console.log(response.data)
            this.setState({
                diagnosis:response.data
            })
        })
    }
    
    handleSubmit(hospital){
        
        axios.post("http://localhost:8080/consultation/saveConsultation",{
          id:hospital.id,
          name:hospital.name,
          address:hospital.address,
          locality:hospital.locality,
          county:hospital.county,
          country:hospital.country
        }).then(response=>{
          this.props.history.push("/Hospital")
        })
       
      
}
}
export default MakeRecipie
