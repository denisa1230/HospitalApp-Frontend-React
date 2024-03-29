import React from 'react';
import AdminNavBar from "../navBars/AdminNavBar"
import UpdateMedication from "./UpdateMedication"
import axios from "axios"
import Swal from 'sweetalert2';
import Jumbotron from "react-bootstrap/Jumbotron";



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
                <div className="jumbotron" >
                <Jumbotron >
                <UpdateMedication
                title="Create medicine"
                buttonName="Submit"
                medication={this.state.medicine}
                handleSubmit={this.handleSubmit}/>
                </Jumbotron>
                </div>
            </div>
        )
    }
}

export default MedicineHome
