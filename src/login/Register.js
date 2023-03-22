import React from "react"
import {Form,FormGroup,Input,Label,Button,InputGroup} from "reactstrap"
import {Link} from "react-router-dom"
import { FaUser,FaLock } from "react-icons/fa";
import axios from "axios"
import isEmail from 'validator/lib/isEmail';
import BackgroundImg from "../Images/firstPage.png";
import Jumbotron from "react-bootstrap/Jumbotron";
import NotLoggedNavBar from "../navBars/NotLoggedNavBar";

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "100%",
    backgroundImage: `url(${BackgroundImg})`
};

class Register extends React.Component{

    constructor(props){
        super(props)
        this.state={
            username:"",
            password1:"",
            password2:"",
            firstName:"",
            lastName:"",
            phone:"",
            gender:"",
            address:"",
            email:"",
            birth:"",
            usernameExist:"false",
            usernameNotMail:"false",
            passwordError:"true",
            savedUser:{}
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleClick=this.handleClick.bind(this)

    }


    componentDidMount(){
    }

    handleClick(){
        if(isEmail(this.state.username)){
        this.setState({
            usernameNotMail:"false"
        })
        axios.get(`http://localhost:8080/account/getAccountByEmail/${this.state.username}`).then(response=>{
            if(response.data !== "") this.setState({
                usernameExist:"true"
            })
            else{
                this.setState({
                    usernameExist:"false"
                })
                if(this.state.password1===this.state.password2){
                    this.setState({
                        passwordError:"true"
                    })
                    axios.post(`http://localhost:8080/account/createPatientAccount`,{
                        email:this.state.username,
                        password:this.state.password1,
                        patient: {
                            firstName:this.state.firstName,
                            lastName:this.state.lastName,
                            address:this.state.address,
                            email:this.state.username,
                            phone:this.state.phone,
                            gender:this.state.gender,
                            birth:this.state.birth
                        }
                    }).then(response=>{
                            this.props.history.push("/")
                        })
                }
                else this.setState({
                    passwordError:"false"
                })
            }
        })}
        else this.setState({
            usernameNotMail:"true"
        })
    }

    handleChange(event){
        console.log(event.target.value)
        const {name,value}=event.target
        this.setState({
            [name]:value
        })
    }
    render(){
        return(
            <div className="body">
                <NotLoggedNavBar/>
                <Jumbotron fluid style={backgroundStyle}>
                <Form className="register-form">
                    <span>
                        <h3>Register</h3>
                    </span>
                    <FormGroup>
                        {this.state.usernameNotMail==="true" ?
                         <Label className="register-label">Not a valid email address*</Label> :
                        this.state.usernameExist==="false" ?
                                                <Label className="login-label">Email</Label>
                                                    :
                                                <Label className="register-label">Email already exist*</Label>}
                        <Input className="input" type="text"
                        name="username"
                        onChange={this.handleChange}
                        value={this.state.username}
                        placeholder="Username"
                        />
                    </FormGroup>
                    <FormGroup>
                        {this.state.passwordError==="true" ?
                                    <Label className="login-label">Password</Label>
                                                            :
                                    <Label className="register-label">Password*</Label>}
                        <Input className="input" type="password"
                        name="password1"
                        onChange={this.handleChange}
                        value={this.state.password1}
                        placeholder="Password"
                        />
                    </FormGroup>
                    <FormGroup>
                    {this.state.passwordError==="true" ?
                                    <Label className="login-label">Password</Label>
                                                            :
                                    <Label className="register-label">Password*</Label>}
                        <InputGroup className="trans">
                        <Input className="trans" type="password"
                        placeholder="Re-type password"
                        onChange={this.handleChange}
                        value={this.state.password2}
                        name="password2"
                        />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label className="login-label">First Name</Label>
                        <Input className="input" type="text"
                        name="firstName"
                        onChange={this.handleChange}
                        value={this.state.firstName}
                        placeholder="First name"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label className="login-label">Second Name</Label>
                        <Input className="input" type="text"
                        name="lastName"
                        onChange={this.handleChange}
                        value={this.state.lastName}
                        placeholder="Second name"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label className="login-label">Address</Label>
                        <Input className="input" type="text"
                        name="address"
                        onChange={this.handleChange}
                        value={this.state.address}
                        placeholder="Address"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label className="login-label">Phone</Label>
                        <Input className="input" type="text"
                        name="phone"
                        onChange={this.handleChange}
                        value={this.state.phone}
                        placeholder="Phone"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label className="login-label">Gender</Label>
                        <Input className="input" type="text"
                        name="gender"
                        onChange={this.handleChange}
                        value={this.state.gender}
                        placeholder="Gender"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label className="login-label">Birth</Label>
                        <Input className="input" type="text"
                        name="birth"
                        onChange={this.handleChange}
                        value={this.state.birth}
                        placeholder="Birth"
                        />
                    </FormGroup>
                    <Button className="btn-lg btn-dark btn-block"
                    onClick={this.handleClick}>Submit</Button>
                </Form>
                </Jumbotron>
            </div>
        )
    }
}

export default Register
