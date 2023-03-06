import React from "react"
import axios from "axios"
import AdminNavBar from "../navBars/AdminNavBar"
import ReactTable from "react-table-6"
import "react-table-6/react-table.css"
import {Button, Col, Container, Row} from "reactstrap"
import Card from "react-bootstrap/Card";
import CardBody from "reactstrap/es/CardBody";
import BackgroundImg from '../Admin/drug.jpg';
import UpdateSection from "./UpdateSection"

const textStyle = {color: 'black',  fontWeight: 'bold' };
const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "100%",
    backgroundImage: `url(${BackgroundImg})`
};

class Sections extends React.Component{
    constructor(){
        super()
        this.state={
            update:"false",
            sections:[],
            hospitals:[],
            selected:0
        }
        this.handleUpdate=this.handleUpdate.bind(this)
        this.handleDelete=this.handleDelete.bind(this)
        this.getSections=this.getSections.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
        this.getHospitals=this.getHospitals.bind(this)
    }

    componentDidMount(){
        this.getSections()
        this.getHospitals()
    }

    getHospitals(){
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


    getSections(){
       axios.get("http://localhost:8080/section/findAllSections").then(response=>{
            var allSections=response.data
            var pendingSection=[]
            for(var i=0;i<allSections.length;i++){
                 pendingSection.push(allSections[i])
            }
            this.setState({
                sections:pendingSection
            })
        })
    }

    handleDelete(){
        axios.get(`http://localhost:8080/section/deleteSection/${this.state.sections[this.state.selected].idSection}`).then(response=>{
            this.getSections()
        })
    }

    handleUpdate(){
       this.setState({
           update:"true"
       })
    }

    handleSubmit(value){
        console.log(value)
       

            axios.post("http://localhost:8080/section/updateSection",value).then(response=>{
                this.getSections()

                this.setState({
                    update:"false"
                })
            })
        
    }

    

    render(){
        return(
            <div>
                 <AdminNavBar
                notificationPage="false"/> <Container fluid style={backgroundStyle}>
                <div className="c"><h1 className=  "display-3" style={textStyle}><center> Update/Delete Sections</center></h1></div>
                {this.state.update==="false" ?
                <div><br/><br/>
                    <Row><Col ssm="6" md={{ size: 8, offset: 3 }}><Card><CardBody>
               <ReactTable
               defaultPageSize={10}
               data={this.state.sections}
               columns={[
                   {
                       Header:"Section Name",
                       accessor:"name"
                   },
                   {
                       Header:"Hospital",
                       accessor:"hospital.name"
                   }
               ]}
               getTrProps={(state, rowInfo) => {
                if (rowInfo && rowInfo.row) {
                  return {
                    onClick: (e) => {
                      this.setState({
                        selected: rowInfo.index
                      })
                    },
                    style: {
                      background: rowInfo.index === this.state.selected ? '#00afec' : "",
                      color: rowInfo.index === this.state.selected ? 'white' : 'black'
                    }
                  }
                }else{
                  return {}
                }
              }}
              />
            <button className="button3" onClick={this.handleUpdate}>Update</button>
            <button className="button2" onClick={this.handleDelete}>X</button>
                    </CardBody></Card></Col></Row><br/><br/>
            </div>
                    :
            <UpdateSection
            title="Update section"
            buttonName="Update"
            section={this.state.sections[this.state.selected]}
            hospitals={this.state.hospitals}
            handleSubmit={this.handleSubmit}/>}
            </Container>   </div>
        )
    }
}

export default Sections
