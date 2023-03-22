import React from 'react';
import AdminNavBar from "../navBars/AdminNavBar"
import UpdateHospital from "./UpdateHospital"
import axios from "axios"
import BackgroundImg from '../Images/AddHospital.jpg';
import Jumbotron from "react-bootstrap/Jumbotron";

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "100%",
    backgroundImage: `url(${BackgroundImg})`
};

class AddHospital extends React.Component{
    constructor(){
        super()
        this.state={
            hospital:{
                name:"",
                address:"",
                locality:"",
                county:"",
                country:""
                
            }
        }
    
        this.handleSubmit=this.handleSubmit.bind(this)
    } 


    handleSubmit(hospital){
        
            axios.post("http://localhost:8080/hospital/saveHospital",{
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

    render(){
        return(
            <div>
                 <AdminNavBar
                notificationPage="false"/>
                <Jumbotron fluid style={backgroundStyle}>
                <UpdateHospital
                title="Create hospital"
                buttonName="Submit"
                hospital={this.state.hospital}
                handleSubmit={this.handleSubmit}/>
                </Jumbotron>
            </div>
        )
    }

}
export default AddHospital
