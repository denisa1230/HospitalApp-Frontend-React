import React from "react"
import {Form,FormGroup,Input,Label,Button,InputGroup, Row, Col} from "reactstrap"
import {Link} from "react-router-dom"
import { FaUser,FaLock } from "react-icons/fa";
import axios from "axios"
import isEmail from 'validator/lib/isEmail';
import BackgroundImg from '../Images/doctor_2.gif';
import Jumbotron from "react-bootstrap/Jumbotron";
import DatePicker from 'react-datepicker';
import NotLoggedNavBar from "../navBars/NotLoggedNavBar";
import 'react-datepicker/dist/react-datepicker.css';
import validator from 'validator' 


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
            usernameNotMail:false,
            passwordError:"true",
            phoneNumberValid:true,
            savedUser:{},
            birth: new Date(),
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleClick=this.handleClick.bind(this)
        this.handleDate=this.handleDate.bind(this)

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
    handleDate(date) {
        this.setState({
          birth: date,
        });
      }

    handleChange(event){
        console.log(event.target.value)
        const {name,value}=event.target
        this.setState({
            [name]:value
        })
        if (name === "username") {
            var isEmail = /\S+@\S+\.com+/.test(value);
            console.log(isEmail);
                this.setState({
                    usernameNotMail:isEmail
            })
        }
        if (name === "phone") {
            var isPhoneNumber = /^0\d{9}$/.test(value);
            console.log(isPhoneNumber);
            this.setState({
                phoneNumberValid: isPhoneNumber
            });
        }
        
    }
    render(){
        return(
            <div className="body">
                <NotLoggedNavBar/>
                
                <div className="logo-container-register">
              <img src={require("../Images/this.png")} alt="Logo"/>
              </div>

            
                <Form className="register-form" >
                    <span>
                        <h3>Register</h3>
                    </span>               
                    <FormGroup>
                        {!this.state.usernameNotMail ?
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
                    <Row form>
                    <Col md={6}>
                    
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
                    </Col>
                    <Col md={6}>
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
                    </Col>
                    </Row>
                    
                    <Row form>
                        <Col md={6}>
                    <FormGroup>
                        <Label className="login-label">First Name</Label>
                        <Input className="input" type="text"
                        name="firstName"
                        onChange={this.handleChange}
                        value={this.state.firstName}
                        placeholder="First name"
                        />
                    </FormGroup>
                    </Col>
                    <Col md={6}>
                    <FormGroup>
                        <Label className="login-label">Second Name</Label>
                        <Input className="input" type="text"
                        name="lastName"
                        onChange={this.handleChange}
                        value={this.state.lastName}
                        placeholder="Second name"
                        />
                    </FormGroup>
                    </Col>
                    </Row>
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
    {!this.state.phoneNumberValid ?
        <Label className="register-label">Not a valid phone number*</Label> :
        <Label className="login-label">Phone</Label>
    }
    <Input className="input" type="text"
        name="phone"
        onChange={this.handleChange}
        value={this.state.phone}
        placeholder="Phone"
    />
</FormGroup>
                    
                    <Form>
                    <FormGroup>
                    <Label className="login-label">Birth</Label>
                    
                     <DatePicker 
                    className="input"
                    selected={this.state.birth}
                    onChange={this.handleDate}
                     dateFormat="yyyy-MM-dd"
                     placeholder="Birth"
                     />
        </FormGroup>
        <Label className="login-label">Gender</Label>
    <FormGroup tag={Row}>
        <FormGroup tag={Col} md={6}>
            <FormGroup check>
                <Label check>
                    <Input type="radio" name="gender" value="Male" checked={this.state.gender === 'Male'} onChange={this.handleChange} />{' '}
                    Male
                </Label>
            </FormGroup>
        </FormGroup>
        <FormGroup tag={Col} md={6}>
            <FormGroup check>
                <Label check>
                    <Input type="radio" name="gender" value="Female" checked={this.state.gender === 'Female'} onChange={this.handleChange} />{' '}
                    Female
                </Label>
            </FormGroup>
        </FormGroup>
    </FormGroup>
</Form>         
                    <Button className="btn-lg btn-dark btn-block"
                    onClick={this.handleClick}>Submit</Button>
                </Form>
                </div>
           
        )
    }
}

export default Register
