import React from 'react';
import AdminNavBar from "../navBars/AdminNavBar"
import UpdateSection from "./UpdateSection"
import axios from "axios"
import BackgroundImg from '../Images/firstPage.png';
import Swal from 'sweetalert2';

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "100%",
    backgroundImage: `url(${BackgroundImg})`
  };


class AddSection extends React.Component{
    constructor(){
        super()
        this.state={
           section:{
                name:"" ,
                hospital:{}
            },
            hospitals:[]

        }
    
        this.handleSubmit=this.handleSubmit.bind(this)
        this.getHospital=this.getHospital.bind(this)
       
    }

   componentDidMount(){

    this.getHospital()
   }

    handleSubmit(section){
        
            axios.post("http://localhost:8080/section/saveSection",section
            ).then(response=>{
              this.props.history.push("/Sections")
            }).then(response=>{
                Swal.fire('Section added')
                this.props.history.push("/Sections")
              
            })
           
          
    }
    getHospital(){
        axios.get("http://localhost:8080/hospital/findAllHospital").then(response=>{
            var hospitalList=[]
        for(var i=0;i<response.data.length;i++){
           hospitalList.push(response.data[i])
        }
        console.log(hospitalList)
        this.setState({
            hospitals:hospitalList
        })
    
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
                <UpdateSection
                title="Create Section"
                buttonName="Submit"
                hospitals={this.state.hospitals}
                section={this.state.section}
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
export default AddSection
