import React from "react"
import axios from "axios"
import AdminNavBar from "../navBars/AdminNavBar"
import UpdateHospital from "./UpdateHospital"
import ReactTable from "react-table-6"
import "react-table-6/react-table.css"
import {Button, Col, Container, Row} from "reactstrap"
import Card from "react-bootstrap/Card";
import CardBody from "reactstrap/es/CardBody";
import BackgroundImg from '../Admin/AddHospital.jpg';

const textStyle = {color: 'black',  fontWeight: 'bold' };
const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "100%",
    backgroundImage: `url(${BackgroundImg})`
};


class Hospital extends React.Component{
    constructor(){
        super()
        this.state={
            update:"false",
            hospitals:[],
            selected:0
        }

        this.handleDelete=this.handleDelete.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
        this.handleUpdate=this.handleUpdate.bind(this)
    }

    componentDidMount(){
        this.getHospital()
    }


    getHospital(){
        axios.get("http://localhost:8080/hospital/findAllHospital").then(response=>{
            console.log(response.data)
            this.setState({
                hospitals:response.data
            })
        })
    }


    handleUpdate(){
      this.setState({
        update:"true"
      })
    }

    handleDelete(){
      axios.get(`http://localhost:8080/hospital/deleteHospital/${this.state.hospitals[this.state.selected].idHospital}`).then(response=>{
        this.getHospital()
    })
    }

    handleSubmit(hospital){
      
        axios.post("http://localhost:8080/hospital/updateHospital",hospital
         ).then(response=>{
          this.getHospital()
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
                    <div className="c"><h1 className=  "display-3" style={textStyle}  ><center> Update/Delete Hospital</center></h1></div>
                {this.state.update==="false" ?
                <div><br></br><br></br>
                    <Row><Col ssm="6" md={{ size: 8, offset: 3 }}><Card><CardBody>
               <ReactTable
               defaultPageSize={10}
               data={this.state.hospitals}
               columns={[
                   {
                       Header:"Name",
                       accessor:"name"
                   },
                   {
                       Header:"Address",
                       accessor:"address"
                   },
                   {
                       Header:"Locality",
                       accessor:"locality"
                   },
                   {
                    Header:"County",
                    accessor:"county"
                  },
                  {
                    Header:"Country",
                    accessor:"country"
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
            <UpdateHospital
            title="Update Hospital"
            buttonName="Update"
            hospital={this.state.hospitals[this.state.selected]}
            handleSubmit={this.handleSubmit}/>}
                </Container> </div>
        )
    }
}

export default Hospital
