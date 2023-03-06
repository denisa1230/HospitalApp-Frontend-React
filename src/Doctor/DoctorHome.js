import React from 'react';
import DoctorNavBar from "../navBars/DoctorNavBar"
import {Form, FormGroup, Input, Label, Button, Container, Jumbotron} from "reactstrap"
import axios from "axios";
import Login from "../login/Login";
import { Media } from 'reactstrap';

import BackgroundImg from "../Doctor/pictures.jpg";



const titluStyle = {color: '#48d1cc',  fontWeight: 'bold' };
const textStyle = {color: '#48d1cc', };


class DoctorHome extends React.Component {

    render(){
        return(
            <div>
                <DoctorNavBar/>
                <Container fluid>
                <Media>
                    <Media left href="#">
                        <Media src={BackgroundImg}   />
                    </Media>
                    <Media body>
                        <Media heading><br/><br/><br/><br/>
                            <h1 className="display-3" style={titluStyle}><center>Pharmacist Home</center></h1>
                        </Media>
                        
                           
                        </Media>
                    </Media>
             </Container>
                </div>
        )
    }
}

export default DoctorHome
