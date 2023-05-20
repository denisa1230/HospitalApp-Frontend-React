import React from "react"
import {Form,FormGroup,Input,Label,Button,InputGroup} from "reactstrap"
import {Link} from "react-router-dom"
import { FaUser,FaLock } from "react-icons/fa";
import axios from "axios"
import AdminNavBar from "../navBars/AdminNavBar"
import NotLoggedNavBar from "../navBars/NotLoggedNavBar";
import BackgroundImg from "../Images/DOCTORS.png";
import Jumbotron from "react-bootstrap/Jumbotron";
import NotificationManager from 'react-notifications/lib/NotificationManager';
import { NotificationContainer } from "react-notifications";
import 'react-notifications/lib/notifications.css'

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "100%",
    backgroundImage: `url(${BackgroundImg})`
};
const textStyle = {color: 'black',  fontWeight: 'bold' };
const backgroundColor={
    background:"none"
}

class Reset extends React.Component{

    constructor(props){
        super(props)
        this.state={
            username:"",
            password1:"",
            password2:"",
            wrongPassword:"false",
            user:{}
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleClick=this.handleClick.bind(this)
    }

    componentDidMount(){
        axios.get(`http://localhost:8080/account/getAccountByEmail/${localStorage.getItem('username')}`).then(response=>{
            console.log(response.data)
            this.setState({
                user:response.data
            })
        })
    }

    handleClick(){
        const { password1, password2 } = this.state;
        if (password1 === "" || password2 === "") {
            NotificationManager.info("Vă rugăm completați toate câmpurile!");
       }
       else{
        const newUser={
            idAccount:this.state.user.idAccount,
            email:this.state.user.email,
            password:this.state.password1,
            type:this.state.user.type
        }
        console.log(newUser)
        if(this.state.password1===this.state.password2)
        axios.post("http://localhost:8080/account/updateAccount",newUser).then(response=>{
            this.setState({
                wrongPassword:"false",
            });
            this.props.history.push("/")

        })
        else
        this.setState({
            wrongPassword:"true"
        })
    }
    }

    handleChange(event){
        const {name,value}=event.target
        this.setState({
            [name]:value
        })
    }
    render(){
        return(
            <div className="body">
                <NotLoggedNavBar/>
                <NotificationContainer/>
                <Jumbotron fluid style={backgroundStyle}>
                    <h1 className="display-3" style={textStyle}><center>Reset Password</center></h1>
                <Form className="login-form">
                    <FormGroup>
                        <FaLock/>
                        {this.state.wrongPassword==="false" ?
                        <Label className="login-label">New Password</Label>:
                        <Label className="register-label">Wrong New Password*</Label>
                        }
                        <InputGroup clasName="trans">
                        <Input className="trans" type="password"
                        backgroundStyle={backgroundColor}
                        placeholder="Password"
                        onChange={this.handleChange}
                        value={this.state.password}
                        name="password1"
                        />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <FaLock/>
                        {this.state.wrongPassword==="false" ?
                        <Label className="login-label">New Password</Label>:
                        <Label className="register-label">Wrong New Password*</Label>
                        }
                        <InputGroup clasName="trans">
                        <Input className="trans" type="password"
                        backgroundStyle={backgroundColor}
                        placeholder="Re-type password"
                        onChange={this.handleChange}
                        value={this.state.password}
                        name="password2"
                        />
                        </InputGroup>
                    </FormGroup>

                    <FormGroup>
                </FormGroup>
                    <Button className="btn-lg btn-dark btn-block"
                    onClick={this.handleClick}>Update</Button>
                <FormGroup>
                </FormGroup>
                </Form>
                </Jumbotron>
            </div>
        )
    }
}

export default Reset
