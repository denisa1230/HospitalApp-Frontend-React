import React from 'react';
import AdminNavBar from "../navBars/AdminNavBar"
import BackgroundImg from "../Images/admin.png";
import {Container, Media} from "reactstrap";
import {Form,FormGroup,Input,Label,Button} from "reactstrap"



const titluStyle = {color: '#48d1cc',  fontWeight: 'bold', align:'center' };
const textStyle = {color: '#48d1cc',   align:'center' };

class AdminHome extends React.Component{
    constructor(){
        super()
    }

    render(){
        return(
           
            <div>
               
                 <AdminNavBar
                notificationPage="false"/>
                 <div className="logo-container">
                   
                    <div className='align-text'><p>Manage The<p className='fancy'>Hospital</p></p></div>
                </div>
                       
                 <Form className='align-text-p'>
                 <img className="imgg" src={require("../Images/animation.gif")}></img>
                 </Form>
                 <img className="imgg-home" src={require("../Images/icon.png")} alt="Logo"/>
            </div>
        )
    }
}

export default AdminHome
