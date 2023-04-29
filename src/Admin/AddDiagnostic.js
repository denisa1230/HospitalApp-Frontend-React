import React from 'react';
import AdminNavBar from "../navBars/AdminNavBar"
import UpdateDiagnostic from "./UpdateDiagnostic"
import axios from "axios"
import Swal from 'sweetalert2';
import BackgroundImg from '../Images/b.png';

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "100%",
    backgroundImage: `url(${BackgroundImg})`
  };



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
            <div style={backgroundStyle}>
                 <AdminNavBar
                notificationPage="false"/>
                <div >
               
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <UpdateDiagnostic
                title="Create Diagnostic"
                buttonName="Submit"
                diagnostic={this.state.diagnostic}
                handleSubmit={this.handleSubmit}/>
              
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                </div>
            </div>
        )
    }
}

export default AddDiagnostic
