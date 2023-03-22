import React from "react"
import axios from "axios"
import AdminNavBar from "../navBars/AdminNavBar"
import ReactTable from "react-table-6"
import "react-table-6/react-table.css"
import {Button, Col, Container, Row} from "reactstrap"
import Card from "react-bootstrap/Card";
import CardBody from "reactstrap/es/CardBody";
import BackgroundImg from '../Images/virus.png';

const textStyle = {color: 'black',  fontWeight: 'bold' };
const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "100%",
    backgroundImage: `url(${BackgroundImg})`
};

class ApproveDiagnostic extends React.Component{
    constructor(){
        super()
        this.state={
            update:"false",
            diagnosticToBeUpdated:{},
            diagnostic:[],
            selected:0
        }
        this.handleApprove=this.handleApprove.bind(this)
        this.getDiagnostic=this.getDiagnostic.bind(this)
    }

    componentDidMount(){
        this.getDiagnostic()
    }


    getDiagnostic(){
        axios.get("http://localhost:8080/diagnostic/findAllDiagnosis").then(response=>{
            console.log(response.data)
            var allDiagnosis=response.data
            var pendingDiagnostic=[]
            for(var i=0;i<allDiagnosis.length;i++){
                if(allDiagnosis[i].status==="PENDING") pendingDiagnostic.push(allDiagnosis[i])
            }
            this.setState({
                diagnostic:pendingDiagnostic
            })
        })
    }

    handleApprove(status){
      var approvedDiagnostic=this.state.diagnostic[this.state.selected]
      axios.post("http://localhost:8080/diagnostic/updateDiagnostic",{
        idDiagnostic:approvedDiagnostic.idDiagnostic,
        name:approvedDiagnostic.name,
        status:status
      }).then(response=>{
        this.getDiagnostic()
    })

    }

    render(){
        return(
            <div>
                <AdminNavBar
                notificationPage="true"/>
                <Container fluid style={backgroundStyle}>
                    <div className="c"><h1 className=  "display-3" style={textStyle}><center> Approve Diagnostic</center></h1></div>
                <div><br/><br/>
                    <Row><Col ssm="6" md={{ size: 8, offset: 3 }}><Card><CardBody>
               <ReactTable
               defaultPageSize={10}
               data={this.state.diagnostic}
               columns={[
                   {
                       Header:"Name",
                       accessor:"name"
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

export default ApproveDiagnostic
