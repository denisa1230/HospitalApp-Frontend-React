import React from "react"
import axios from "axios"
import AdminNavBar from "../navBars/AdminNavBar"
import UpdateDiagnostic from "./UpdateDiagnostic"
import ReactTable from "react-table-6"
import "react-table-6/react-table.css"
import {Button, Col, Container, Row} from "reactstrap"
import Card from "react-bootstrap/Card";
import CardBody from "reactstrap/es/CardBody";
import BackgroundImg from '../Images/b.png';

const textStyle = {color: '#343434',  fontWeight: 'bold' };
const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "100%",
    backgroundImage: `url(${BackgroundImg})`
};

class Diagnostic extends React.Component{
    constructor(){
        super()
        this.state={
            update:"false",
            diagnostic:[],
            selected:0
        }
        this.handleUpdate=this.handleUpdate.bind(this)
        this.handleDelete=this.handleDelete.bind(this)
        this.getDiagnostic=this.getDiagnostic.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    componentDidMount(){
        this.getDiagnostic()
    }


    getDiagnostic(){
       axios.get("http://localhost:8080/diagnostic/findAllDiagnosis").then(response=>{
            var allDiagnostic=response.data
            var pendingDiagnostics=[]
            for(var i=0;i<allDiagnostic.length;i++){
                if(allDiagnostic[i].status==="AVAILABLE") 
                pendingDiagnostics.push(allDiagnostic[i])
            }
            this.setState({
                diagnostic:pendingDiagnostics
            })
        })
       
           
    }
   


    handleDelete(){
        axios.get(`http://localhost:8080/diagnostic/deleteDiagnostic/${this.state.diagnostic[this.state.selected].idDiagnostic}`).then(response=>{
            this.getDiagnostic()
        })
    }

    handleUpdate(){
       this.setState({
           update:"true"
       })
    }

    handleSubmit(value){
            axios.post("http://localhost:8080/diagnostic/updateDiagnostic",value).then(response=>{
                this.getDiagnostic()
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
                <div className="c"><h1 className=  "display-3" style={textStyle}><center> Update/Delete Diagnostic</center></h1></div>
                {this.state.update==="false" ?
                <div><br/><br/><br></br>
                    <Row><Col ssm="6" md={{ size: 8, offset: 3 }}><Card><CardBody>
               <ReactTable
               defaultPageSize={10}
               data={this.state.diagnostic}
               columns={[
                   {
                       Header:"Name",
                       accessor:"name"
                   },
                   {
                       Header:"Details",
                       accessor:"details"
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
            <UpdateDiagnostic
            title="Update Diagnostic"
            buttonName="Update"
            diagnostic={this.state.diagnostic[this.state.selected]}
            handleSubmit={this.handleSubmit}/>}
            </Container>   </div>
        )
    }
}

export default Diagnostic
