import React from "react"
import {Form, FormGroup, Input, Label, Button, InputGroup, Col, Row, Media, Container} from "reactstrap"
import {Link} from "react-router-dom"
import { FaUser,FaLock } from "react-icons/fa";
import axios from "axios"
import isEmail from 'validator/lib/isEmail';
import AdminNavBar from "../navBars/AdminNavBar"
import BackgroundImg from "../Admin/doctor.jpg";


class AddDoctor extends React.Component{

    constructor(props){
        super(props)
        this.state={
            username:"",
            password1:"",
            password2:"",
            firstname:"",
            secondname:"",
            address:"",
            email:"",
            usernameExist:"false",
            usernameNotMail:"false",
            passwordError:"true",
            savedUser:{},
            hospitals:[],
            uniqueHospitals:[],
            hospitalsAddress:[],
            selectedCity:{},
            selectedHospital:"",
            selectedAddress:"",
            insertHospital:{},
            counties:[],
            selectedCities:[],
            city:""
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleClick=this.handleClick.bind(this)
        this.handleHospital=this.handleHospital.bind(this)
        this.handleHospitalAddress=this.handleHospitalAddress.bind(this)
        this.handleCounty=this.handleCounty.bind(this)
        this.handleCity=this.handleCity.bind(this)
    }

    

    

    handleClick(){
        if(isEmail(this.state.username)){
        this.setState({
            usernameNotMail:"false"
        })
        axios.get(`http://localhost:8080/user/getUser/${this.state.username}`).then(response=>{
            if(response.data.username!=="null") this.setState({
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
                    axios.post(`http://localhost:8080/user/saveUser`,{
                        username:this.state.username,
                        password:this.state.password1,
                        type:"doctor"
                    }).then(response=>{
                        console.log(response.data)
                        console.log(this.state.insertHospital)
                            axios.post(`http://localhost:8080/account/saveDoctor`,{
                                firstname:this.state.firstname,
                                secondname:this.state.secondname,
                                email:this.state.username,
                                address:this.state.address,
                                userId:response.data,
                                 hospital:this.state.insertHospital
                        }).then(response=>{
                            this.props.history.push("/AdminHome")
                        })
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
        const {name,value}=event.target
        this.setState({
            [name]:value
        })
    }

    handleHospital(event){
        console.log(event.target.value)
        var addressList=[]
        this.state.hospitals.forEach(hospital=>{
            if(hospital.name===event.target.value)
                addressList.push(hospital.address)
        })
        this.setState({
            hospitalsAddress:addressList,
            selectedHospital:event.target.value
        })
    }

    handleHospitalAddress(event){
        console.log(event.target.value)
        var newHospital
        this.state.hospitals.forEach(hospital=>{
            if(hospital.name===this.state.selectedHospital && hospital.address===event.target.value)
                newHospital=hospital
        })
        this.setState({
            insertHospital:newHospital
        })
    }

   
    handleCity(event){
        var selectedCity={}
        for(var i=0;i<this.state.cities.length;i++){
            if(this.state.cities[i].county===this.state.county && this.state.cities[i].name===event.target.value)
                selectedCity=this.state.cities[i]
        }
        this.setState({
            selectedCity:selectedCity
        })
        axios.get("http://localhost:8080/hospital/findAllHospital").then(response=>{
            console.log(response.data)
            var Hospitals=[]
            for(var i=0;i<response.data.length;i++){
                if(response.data[i].cityId.id===selectedCity.id){
                    var ok=0
                    for(var j=0;j<Hospitals.length;j++)
                        if(Hospitals[j]===response.data[i].name) ok=1
                    if(ok===0) Hospitals.push(response.data[i].name)
                }
            }
            console.log(Hospitals)
            this.setState({
               hospitals:response.data,
                uniqueHospitals:Hospitals
            })

        })


    }
    handleCounty(event){
        console.log(event.target.value)
        this.setState({
            county:event.target.value
        })
        var citiesByCounty=[]
        for(var i=0;i<this.state.cities.length;i++){
            if(this.state.cities[i].county===event.target.value) citiesByCounty.push(this.state.cities[i].name)
        }
        this.setState({
            selectedCities:citiesByCounty
        })
    }


    render(){
        return(
            <div className="body">
                <AdminNavBar
                notificationPage="false"/>
                <Container fluid >
                    <Media>
                <Media left href="#">
                    <Media src={BackgroundImg}   />
                </Media>
                <Form className="register-form">
                    <span>
                        <h3>Register Doctor</h3>
                    </span>
                    <Row form>
                        <Col md={6}>
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
                    </Col>
                    <Col md={6}>
                    <FormGroup>
                        <Label className="login-label">Address</Label>
                        <Input className="input" type="text"
                        name="address"
                        onChange={this.handleChange}
                        value={this.state.address}
                        placeholder="Address"
                        />
                    </FormGroup>
                    </Col>
                    </Row>
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
                        <Input className="input" type="password"
                        placeholder="Re-type password"
                        onChange={this.handleChange}
                        value={this.state.password2}
                        name="password2"
                        />
                    </FormGroup>
                    </Col>
                    </Row>
                    <Row>
                    <Col md={6}>
                    <FormGroup>
                        <Label className="login-label">First Name</Label>
                        <Input className="input" type="text"
                        name="firstname"
                        onChange={this.handleChange}
                        value={this.state.firstname}
                        placeholder="First name"
                        />
                    </FormGroup>
                    </Col>
                    <Col md={6}>
                    <FormGroup>
                        <Label className="login-label">Second Name</Label>
                        <Input className="input" type="text"
                        name="secondname"
                        onChange={this.handleChange}
                        value={this.state.secondname}
                        placeholder="Second name"
                        />
                    </FormGroup>
                    </Col>
                    </Row>
                    <FormGroup>
                            <Label className="login-label">County</Label>
                        <Input className="input" type="text" name="county"
                        onChange={this.handleChange}
                        value={this.state.county}
                        placeholder="County"
                        />  
                    </FormGroup>
                            <FormGroup>
                            <Label className="login-label">City</Label>
                        <Input className="input" type="text" name="city"
                        onChange={this.handleChange}
                        value={this.state.city}
                        placeholder="City"
                        />  
                    </FormGroup>
                            <FormGroup>
                                <Label >Hospital</Label>
                                <Input type="select"
                                name="hospital"
                                onChange={this.handleHospital}
                                >
                                    <option>Select Hospital</option>
                                {this.state.uniqueHospitals.map(hospital=>
                                    <option>{hospital}</option>)}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label >Address</Label>
                                <Input type="select"
                                name="hospital"
                                onChange={this.handleHospitalAddress}
                                >
                                    <option>Select hospital Address</option>
                                {this.state.hospitalsAddress.map(hospitalAddress=>
                                    <option>{hospitalAddress}</option>)}
                                </Input>
                            </FormGroup>

                    <Button className="btn-lg btn-dark btn-block"
                    onClick={this.handleClick}>Submit</Button>
                </Form>
                    </Media>
                </Container>
            </div>
        )
    }
}

export default AddDoctor
