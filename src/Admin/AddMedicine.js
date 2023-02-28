import React from 'react';
import AdminNavBar from "../navBars/AdminNavBar"
import UpdateMedication from "./UpdateMedication"
import axios from "axios"
import Swal from 'sweetalert2';
import BackgroundImg from '../Admin/drug.jpg';
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
        super()
        this.state={
            medicine:{
                drugName:"",
                dosage:""
                
            }
        }
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    handleSubmit(value){
        console.log()
        
            axios.post("http://localhost:8080/drug/saveDrug",{
                drugName:value.drugName,
                dosage:value.dosage,
                status:"AVAILABLE"
            }).then(response=>{
                this.props.history.push("/Medicines")
                Swal.fire('Medicine added')
            })
                 
            
        
    }

    render(){
        return(
            <div>
                 <AdminNavBar
                notificationPage="false"/>
                <Jumbotron fluid style={backgroundStyle}>
                <UpdateMedication
                title="Create medicine"
                buttonName="Submit"
                medication={this.state.medicine}
                handleSubmit={this.handleSubmit}/>
                </Jumbotron>
            </div>
        )
    }
}

export default MedicineHome
