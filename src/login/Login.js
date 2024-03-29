import React from "react"
import {Form,FormGroup,Input,Label,Button,InputGroup} from "reactstrap"
import {Link} from "react-router-dom"
import { FaUser,FaLock } from "react-icons/fa";
import axios from "axios"
import NotLoggedNavBar from "../navBars/NotLoggedNavBar.js";
import BackgroundImg from '../Images/doctor_2.gif';
import BackgroundImg1 from '../Images/a.png';
import Jumbotron from "react-bootstrap/Jumbotron";


const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "100%",
    backgroundImage: `url(${BackgroundImg})`
   
};
const backgroundStylee = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "40%",
    backgroundImage: `url(${BackgroundImg1})`
   
};

const textStyle = {color: '#48d1cc',  fontWeight: 'bold' };
const backgroundColor={
    background:"none"
}


class LogIn extends React.Component{

    constructor(props){
        super(props)
        this.state={
            username:"",
            password:"",
            wrongUsername:"false",
            wrongPassword:"false"
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleClick=this.handleClick.bind(this)

    }
 
   

    handleClick(password){

        axios.get(`http://localhost:8080/account/getAccountByEmail/${this.state.username}`).then(
            response => {
                this.setState({
                            user:response.data,
                })

                if(response.data === ""){
                    this.setState({wrongUsername:"true"})
                }else{
                    this.setState({wrongUsername:"false"})
                }

                if(this.state.user.password !== this.state.password){
                    this.setState({wrongPassword:"true"})
                }else {
                    this.setState({
                        wrongPassword:"false",
                    })
                    localStorage.setItem("username", this.state.username)
                   
                    response.data.type==="admin" ? this.props.history.push("/AdminHome"):
                    response.data.type==="pacient" ? this.props.history.push("/PatientHome"):
                    this.props.history.push("/DoctorHome")
                }


                console.log("Pacientul autentificat:", this.state.user);

            });
    }


    handleChange(event){
        const {name,value}=event.target
        this.setState({
            [name]:value
        })
    }
    render(){
        return(
            <div className="appAside">
                <NotLoggedNavBar/>
                
                <div className="logo-container">
                    <img className="imgg" src={require("../Images/a.png")} alt="Logo"/>
                    <div className="login-header">
                        <p >Online Healthcare</p>
                        <p className="fancy">Consultation Services</p>
                    </div>
                </div>
               
               
                <Form className="login-form1" style={backgroundStyle}>
                        <span> <center> <h2>Login Here</h2></center></span>
                        <br/>
                        <br/>
                        <br/>
                    <FormGroup>
                        <FaUser/>
                        {this.state.wrongUsername==="false" ?
                        <Label className="login-label">Email</Label>:
                        <Label className="register-label">Wrong Email*</Label>
                        }
                        <Input className="input" type="text"
                        name="username"
                        onChange={this.handleChange}
                        value={this.state.username}
                        placeholder="Email"
                        />
                    </FormGroup>
                    <FormGroup>
                        <FaLock/>
                        {this.state.wrongPassword==="false" ?
                        <Label className="login-label">Password</Label>:
                        <Label className="register-label">Wrong Password*</Label>
                        }
                        <InputGroup clasName="trans">
                        <Input className="trans" type="password"
                        backgroundStyle={backgroundColor}
                        placeholder="Password"
                        onChange={this.handleChange}
                        value={this.state.password}
                        name="password"
                        />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                </FormGroup>
                    <Button className="btn-lg btbutton__boxn-dark btn-block"
                    onClick={this.handleClick}>Log In</Button>
                <FormGroup>
                    <Label className="login-label">Don't have an account yet?
                    <Link to="/Register"> Sign up
                    </Link>
                    </Label>
                </FormGroup>
                </Form>
               
                <div id="singInButton">
                </div>
               
               
               </div>
                
            
        )
    }
}

export default LogIn
