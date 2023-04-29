import React from "react"
import axios from "axios"
import AdminNavBar from "../navBars/AdminNavBar"
import ReactTable from "react-table-6"
import "react-table-6/react-table.css"
import {Button, Col, Container, Row} from "reactstrap"
import Card from "react-bootstrap/Card";
import CardBody from "reactstrap/es/CardBody";
import BackgroundImg from '../Images/drug.jpg';

const textStyle = {color: '#343434',  fontWeight: 'bold' };
const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "100%",
    backgroundImage: `url(${BackgroundImg})`
};

class ApproveMedicine extends React.Component{
    constructor(){
        super()
        this.state={
            update:"false",
            medicationToBeUpdated:{},
            medications:[],
            selected:0
        }
        this.handleApprove=this.handleApprove.bind(this)
        this.getMedicines=this.getMedicines.bind(this)
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
                if(allMedicines[i].status==="PENDING") pendingMedicines.push(allMedicines[i])
            }
            this.setState({
                medications:pendingMedicines
            })
        })
    }

    handleApprove(status){
      var approvedMedicine=this.state.medications[this.state.selected]
      axios.post("http://localhost:8080/drug/updateDrug",{
        idDrug:approvedMedicine.idDrug,
        drugName:approvedMedicine.drugName,
        dosage:approvedMedicine.dosage,
        status:status
      }).then(response=>{
        this.getMedicines()
    })

    }

    render(){
        return(
            <div>
                <AdminNavBar
                notificationPage="true"/>
                <Container fluid style={backgroundStyle}>
                    <div className="c"><h1 className=  "display-3" style={textStyle}><center> Approve Medicine</center></h1></div>
                <div><br/><br/>
                    <Row><Col ssm="6" md={{ size: 8, offset: 3 }}><Card><CardBody>
               <ReactTable
               defaultPageSize={10}
               data={this.state.medications}
               columns={[
                   {
                       Header:"Name",
                       accessor:"drugName"
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
            <button className="button3" onClick={this.handleApprove.bind(this,'AVAILABLE')}>Approve</button>
            <button className="button2" onClick={this.handleApprove.bind(this,'UNAVAILABLE')}>Decline</button>
                    </CardBody></Card></Col></Row> </div>   <br/><br/>
                </Container>

            </div>
        )
    }
}

export default ApproveMedicine
