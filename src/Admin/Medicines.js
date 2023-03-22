import React from "react"
import axios from "axios"
import AdminNavBar from "../navBars/AdminNavBar"
import UpdateMedication from "./UpdateMedication"
import ReactTable from "react-table-6"
import "react-table-6/react-table.css"
import {Button, Col, Container, Row} from "reactstrap"
import Card from "react-bootstrap/Card";
import CardBody from "reactstrap/es/CardBody";
import BackgroundImg from '../Images/drug.jpg';

const textStyle = {color: 'black',  fontWeight: 'bold' };
const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "100%",
    backgroundImage: `url(${BackgroundImg})`
};

class Medicine extends React.Component{
    constructor(){
        super()
        this.state={
            update:"false",
            medications:[],
            selected:0
        }
        this.handleUpdate=this.handleUpdate.bind(this)
        this.handleDelete=this.handleDelete.bind(this)
        this.getMedicines=this.getMedicines.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    componentDidMount(){
        this.getMedicines()
    }


    getMedicines(){
       axios.get("http://localhost:8080/drug/findAllDrug").then(response=>{
            console.log(response.data)
            var allMedicines=response.data
            var pendingMedicines=[]
            for(var i=0;i<allMedicines.length;i++){
                if(allMedicines[i].status==="AVAILABLE") 
                pendingMedicines.push(allMedicines[i])
            }
            this.setState({
                medications:pendingMedicines
            })
        })
       
           
    }
   


    handleDelete(){
        axios.get(`http://localhost:8080/drug/deleteDrug/${this.state.medications[this.state.selected].idDrug}`).then(response=>{
            this.getMedicines()
        })
    }

    handleUpdate(){
       this.setState({
           update:"true"
       })
    }

    handleSubmit(value){
        console.log(value)
       

            axios.post("http://localhost:8080/drug/updateDrug",value).then(response=>{
                this.getMedicines()
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
                <div className="c"><h1 className=  "display-3" style={textStyle}><center> Update/Delete Medicines</center></h1></div>
                {this.state.update==="false" ?
                <div><br/><br/><br></br>
                    <Row><Col ssm="6" md={{ size: 8, offset: 3 }}><Card><CardBody>
               <ReactTable
               defaultPageSize={10}
               data={this.state.medications}
               columns={[
                   {
                       Header:"Name",
                       accessor:"drugName"
                   },
                   {
                       Header:"Dosage",
                       accessor:"dosage"
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
            <UpdateMedication
            title="Update medicine"
            buttonName="Update"
            medication={this.state.medications[this.state.selected]}
            handleSubmit={this.handleSubmit}/>}
            </Container>   </div>
        )
    }
}

export default Medicine
