import React from "react"
import {Form, FormGroup, Input, Label, Button, InputGroup, Col, Row, Media, Container} from "reactstrap"
import axios from "axios"
import isEmail from 'validator/lib/isEmail';
import AdminNavBar from "../navBars/AdminNavBar"
import BackgroundImg from "../Images/doctor.jpg";
import Swal from 'sweetalert2';


class AddDoctor extends React.Component{


    constructor(props){
        super(props)
        this.state={
            password1:"",
            password2:"",
            firstname:"",
            lastname:"",
            email:"",
            specialization:"",
            section:"",
            phone:"",
            description:"",
            program:"",
            emailExist:"false",
            emailNotMail:"false",
            passwordError:"true",
            savedUser:{},
            hospitals:[],
            sections:[],
            uniqueHospitals:[],
            uniqueSections:[],
            selectedHospital:"",
            selectedSections:[],
            selectedSection:{},
            insertHospital:{},
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleClick=this.handleClick.bind(this)
        this.getSection=this.getSection.bind(this)
        this.getHospital=this.getHospital.bind(this)
        this.handleSelectedHospital=this.handleSelectedHospital.bind(this)
        this.handleSelectedSection = this.handleSelectedSection.bind(this)
    }

    componentDidMount(){
        this.getSection();
        this.getHospital();
    }

    handleClick(){
        if(isEmail(this.state.email)){
        this.setState({
            emailNotMail:"false"
        })
        axios.get(`http://localhost:8080/account/getAccountByEmail/${this.state.email}`).then(response=>{
            if(response.data!=="") this.setState({
                emailExist:"true"
            })
            else{
                this.setState({
                    emailExist:"false"
                })
                if(this.state.password1===this.state.password2){
                    this.setState({
                        passwordError:"true"
                    })
                    axios.post(`http://localhost:8080/account/createDoctorAccount`,{
                        email:this.state.email,
                        password:this.state.password1,
                        doctor:{
                            firstName:this.state.firstname,
                            lastName:this.state.lastname,
                            email:this.state.email,
                            specialization:this.state.specialization,
                            section:this.state.selectedSection,
                            phone:this.state.phone,
                            description:this.state.description,
                            program:this.state.program
                        }
                    }).then(response=>{
                       Swal.fire('Doctor added')
                       this.props.history.push("/AdminHome")
                    
                    })
                }
                else this.setState({
                    passwordError:"false"
                })

            }
        })}
        else this.setState({
            emailNotMail:"true"
        })
    }

    handleChange(event){
        const {name,value}=event.target
        this.setState({
            [name]:value
        })
    }

    getSection(){
        axios.get("http://localhost:8080/section/findAllSections").then(response=>{
            var sectionList=[]
        for(var i=0;i<response.data.length;i++){
           sectionList.push(response.data[i])
        }
        console.log(sectionList)
        this.setState({
            sections:sectionList
        })
    
        })
    }

    getHospital(){
        axios.get("http://localhost:8080/hospital/findAllHospital").then(response=>{
            var hospitalList=[]
        for(var i=0;i<response.data.length;i++){
           hospitalList.push(response.data[i])
        }
        console.log(hospitalList)
        this.setState({
            hospitals:hospitalList
        })
    
        })
    }

    handleSelectedHospital(event){
        const {name,value}=event.target
        var hospitals = this.state.hospitals
        var newHospital
        for(var i = 0; i < hospitals.length; i++) {
            if (value === hospitals[i].name) {
                newHospital=hospitals[i]
            }
        }
        this.setState({
             selectedHospital:newHospital.name
            }
         )
         var sections=this.state.sections
         var selectedSectionsByHospital=[]
        for (var i=0;i< sections.length;i++){
            if (newHospital.idHospital === sections[i].hospital.idHospital){
                selectedSectionsByHospital.push(sections[i])
            }
        }
        this.setState({
            selectedSections:selectedSectionsByHospital
        })
    }

    handleSelectedSection(event){
        const {name,value}=event.target
        var sections=this.state.selectedSections
        var section={}
        for (var i=0;i< sections.length;i++){
            if (value === sections[i].name){
                section=sections[i]
            }
        }
        this.setState({
            selectedSection:section
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
                        {this.state.emailNotMail==="true" ?
                         <Label className="register-label">Not a valid email address*</Label> :
                        this.state.emailExist==="false" ?
                                                <Label className="login-label">Email</Label>
                                                    :
                                                <Label className="register-label">Email already exist*</Label>}
                        <Input className="input" type="text"
                        name="email"
                        onChange={this.handleChange}
                        value={this.state.email}
                        placeholder="Email"
                        />
                    </FormGroup>
                    </Col>
                    <Col md={6}>
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
                        name="lastname"
                        onChange={this.handleChange}
                        value={this.state.lastname}
                        placeholder="Second name"
                        />
                    </FormGroup>
                    </Col>
                    </Row>
                    <FormGroup>
                            <Label className="login-label">Phone Number</Label>
                        <Input className="input" type="text" name="phone"
                        onChange={this.handleChange}
                        value={this.state.phone}
                        placeholder="Phone Number"
                        />  
                        </FormGroup>
                        <FormGroup>
                        <Label className="login-label">Program Available</Label>
                        <Input className="input" type="text" name="program"
                        onChange={this.handleChange}
                        value={this.state.program}
                        placeholder="Program Available"
                        />  
                        </FormGroup>
                            <FormGroup>
                            <Label className="login-label">Specialization</Label>
                        <Input className="input" type="text" name="specialization"
                        onChange={this.handleChange}
                        value={this.state.specialization}
                        placeholder="Specialization"
                        />  
                        </FormGroup>
                        <FormGroup>
                                <Label >Hospital</Label>
                                <Input type="select"
                                name="hospital"
                                value={this.state.selectedHospital}
                                onChange={this.handleSelectedHospital}
                                >
                                    <option >Select Hospital</option>
                                {this.state.hospitals.map(hospital=>
                                    <option>{hospital.name}</option>)}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label >Section</Label>
                                <Input type="select"
                                name="section"
                                value={this.state.selectedSection.name}
                                onChange={this.handleSelectedSection}
                                >
                                    <option>Select Section</option>
                                {this.state.selectedSections.map(section=>
                                    <option>{section.name}</option>)}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                        <Label className="login-label">Description</Label>
                        <Input className="input" type="text" name="description"
                        onChange={this.handleChange}
                        value={this.state.description}
                        placeholder="Description"
                        />  
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
