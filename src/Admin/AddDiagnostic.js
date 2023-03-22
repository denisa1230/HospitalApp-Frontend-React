import React from 'react';
import AdminNavBar from "../navBars/AdminNavBar"
import UpdateDiagnostic from "./UpdateDiagnostic"
import axios from "axios"
import Swal from 'sweetalert2';
import Jumbotron from "react-bootstrap/Jumbotron";



class AddDiagnostic extends React.Component{
    constructor(){
        super()
        this.state={
            diagnostic:{
                name:"",
                details:""   
            }
        }
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    handleSubmit(value){
        console.log(value)
        
            axios.post("http://localhost:8080/diagnostic/saveDiagnostic",{
                idDiagnostic:value.id,
                name:value.name,
                details:value.details,
                status:"AVAILABLE"
            }).then(response=>{
                this.props.history.push("/Diagnostic")
                Swal.fire('Diagnostic added')
            })
                 
            
        
    }

    render(){
        return(
            <div>
                 <AdminNavBar
                notificationPage="false"/>
                <div >
                <Jumbotron >
                <UpdateDiagnostic
                title="Create Diagnostic"
                buttonName="Submit"
                diagnostic={this.state.diagnostic}
                handleSubmit={this.handleSubmit}/>
                </Jumbotron>
                </div>
            </div>
        )
    }
}

export default AddDiagnostic
