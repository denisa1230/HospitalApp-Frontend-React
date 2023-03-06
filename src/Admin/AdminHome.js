import React from 'react';
import AdminNavBar from "../navBars/AdminNavBar"


import BackgroundImg from "../Admin/admin.png";
import {Container, Media} from "reactstrap";




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
                         <Container fluid>
                    <Media>
                        <Media left  href="#">
                            <Media  src={BackgroundImg}   />
                        </Media>
                        <Media body>
                            <Media heading ><br/><br/>
                                <h1 className="display-3" style={titluStyle}><center>Admin Home</center></h1>
                            </Media >
                            <p style={textStyle} ><br/><br/>
                                <h2>1. Register different hospitals specifying the location</h2>
                                <br></br>
                                <h2>2. Register new medicines</h2>
                                <br></br>
                                <h2>3. Delete / Update or add details about existing medicines and hospitals in the platform</h2>
                                <br></br>
                                <h2>4. You are notified every time a doctor proposes new medicines to validate them</h2>
                                <br></br>
                                <h2>5. Create doctor accounts</h2>
                                <br></br>
                               
                            </p>
                        </Media>
                    </Media>
                </Container>
            </div>
        )
    }
}

export default AdminHome
