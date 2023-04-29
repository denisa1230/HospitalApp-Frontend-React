import React from 'react';
import DoctorNavBar from "../navBars/DoctorNavBar"
import ViewMedicineDoctor from "./ViewMedicineDoctor"
import axios from "axios"
import Swal from 'sweetalert2';
import BackgroundImg from '../Images/pictures.jpg';
import Jumbotron from "react-bootstrap/Jumbotron";


const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "100%",
    backgroundImage: `url(${BackgroundImg})`
};


class MedicineHome extends React.Component{
    constructor(){
        super();
        this.state={
            medicine:{
                drugName:"",
                dosage:""
            }
        };
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    handleSubmit(value){
            axios.post("http://localhost:8080/drug/saveDrug",{
                drugName:value.drugName,
                dosage:value.dosage,
                status:"PENDING"
            })
            Swal.fire('Medicine added')
    }

    render(){
        return(
            <div>
                
                <DoctorNavBar/>
                <Jumbotron fluid style={backgroundStyle}>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <ViewMedicineDoctor
                title="Create medicine"
                buttonName="Submit"
                medication={this.state.medicine}
                handleSubmit={this.handleSubmit}/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                </Jumbotron>
                
            </div>
        )
    }
}

export default MedicineHome
