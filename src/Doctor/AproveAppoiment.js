import React from "react"
import axios from "axios"
import DoctorNavBar from "../navBars/DoctorNavBar"
import ReactTable from "react-table-6"
import "react-table-6/react-table.css"
import {Button, Col, Container, Row} from "reactstrap"
import Card from "react-bootstrap/Card";
import CardBody from "reactstrap/es/CardBody";
import BackgroundImg from '../Images/medicine.jpg';

const textStyle = {color: 'black',  fontWeight: 'bold' };
const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "100%",
    backgroundImage: `url(${BackgroundImg})`
};

class AproveAppoiment extends React.Component{
    constructor(props){
        super(props)
        this.state={
            update:"false",
            appoiments:[],
            selected:0,
            idDoctor:""
        }
        this.handleApprove=this.handleApprove.bind(this)
        this.getAppoimentByDoctor=this.getAppoimentByDoctor.bind(this)
    }

    componentDidMount(){
        this.getDoctorByAccount()
    }

    getDoctorByAccount() {
      var username = localStorage.getItem("username");
      axios.get(`http://localhost:8080/doctor/getDoctorByAccount/${username}`)
        .then((response) => {
          this.setState({
            idDoctor: response.data.idDoctor
          },()=>{
            this.getAppoimentByDoctor()
          });
          console.log(this.state.idDoctor);
        });
    }

    getAppoimentByDoctor(){
        
        axios.get(`http://localhost:8080/appointments/getAppointmentByDoctor/${this.state.idDoctor}`)
        .then((response) => {
            var allAppointments=response.data
            var pendingAppoiments=[]
            for(var i=0;i<allAppointments.length;i++){
                if(allAppointments[i].status==="PENDING") 
                pendingAppoiments.push(allAppointments[i])
            }
            this.setState({
                appoiments:pendingAppoiments
            })
            console.log(this.state.appoiments)
        })
    }

    handleApprove(status){
      var approvedAppoiments=this.state.appoiments[this.state.selected]
      axios.post("http://localhost:8080/appointments/updateAppointment",{
        idAppointment:approvedAppoiments.idAppointment,
        date:approvedAppoiments.date,
        hour:approvedAppoiments.hour,
        status:status
      }).then(response=>{
        this.getAppoimentByDoctor()
    })
      
    }

    render(){
        return(
            <div>
                <DoctorNavBar
                notificationPage="true"/>
                <Container fluid style={backgroundStyle}>
                    <div className="c"><h1 className=  "display-3" style={textStyle}><center> Approve Appoiment</center></h1></div>
                <div><br/><br/>
                    <Row><Col ssm="6" md={{ size: 8, offset: 3 }}><Card><CardBody>
               <ReactTable
               defaultPageSize={10}
               data={this.state.appoiments}
               columns={[
                {
                    Header: "Appointment Date",
                    accessor: "date"
                  },
                  {
                    Header: "Appointment Hour",
                    accessor: "hour",
                    Cell: row => {
                      const hour = parseInt(row.value);
                      const hourStr = `${hour}:00-${hour+1}:00`;
                      return <span>{hourStr}</span>;
                    }
              
                  },
                  {
                    Header: "Appointment Status",
                    accessor: "status"
                  },
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
            <button className="button3" onClick={this.handleApprove.bind(this,'Approved Appointment')}>Approve</button>
            <button className="button2" onClick={this.handleApprove.bind(this,'Canceled Appointment')}>Decline</button>
                    </CardBody></Card></Col></Row> </div>   <br/><br/>
                </Container>

            </div>
        )
    }
}

export default AproveAppoiment
