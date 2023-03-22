import React from 'react';
import DoctorNavBar from "../navBars/DoctorNavBar"
import ViewDiagnosticDoctor from "./ViewDiagnosticDoctor"
import axios from "axios"
import Swal from 'sweetalert2';
import BackgroundImg from '../Images/viruss.png';
import Jumbotron from "react-bootstrap/Jumbotron";


const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "100%",
    backgroundImage: `url(${BackgroundImg})`
};


class DiagnosticHome extends React.Component{
    constructor(){
        super();
        this.state={
           diagnostic:{
                name:"",
                details:""
            }
        };
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    handleSubmit(value){
            axios.post("http://localhost:8080/diagnostic/saveDiagnostic",{
                name:value.name,
                details:value.details,
                status:"PENDING"
            })
            Swal.fire('Diagnostic added')
    }

    render(){
        return(
            <div>
                <DoctorNavBar/>
                <Jumbotron fluid style={backgroundStyle}>
                <ViewDiagnosticDoctor
                title="Create Diagnostic"
                buttonName="Submit"
                diagnostic={this.state.diagnostic}
                handleSubmit={this.handleSubmit}/>
                </Jumbotron>
            </div>
        )
    }
}

export default DiagnosticHome
