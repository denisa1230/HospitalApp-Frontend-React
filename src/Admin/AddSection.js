import React from 'react';
import AdminNavBar from "../navBars/AdminNavBar"
import UpdateSection from "./UpdateSection"
import axios from "axios"
import Jumbotron from "react-bootstrap/Jumbotron";
import BackgroundImg from '../Images/section.jpg';

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
            })
            console.log(section)
           
          
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
            <div>
                 <AdminNavBar
                notificationPage="false"/>
                <div>
                <Jumbotron >
                <UpdateSection
                title="Create Section"
                buttonName="Submit"
                hospitals={this.state.hospitals}
                section={this.state.section}
                handleSubmit={this.handleSubmit}/>
                </Jumbotron>
                </div>
            </div>
        )
    }

}
export default AddSection
