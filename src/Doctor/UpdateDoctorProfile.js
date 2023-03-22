import React from 'react'
import {Button, Form, FormGroup, Input, Jumbotron, Label} from "reactstrap";
import image1 from "../Images/doctor1.jpg";

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height:'100vh',
    marginTop:'0px',
    marginBottom:'0px',
    backgroundImage: `url(${image1})`
  };

class UpdateDoctorProfile extends React.Component{

    constructor(props){
        super()
        this.state={
            title:props.title,
            buttonName:props.buttonName,
            doctor:props.doctor
        }
        this.handleChange=this.handleChange.bind(this)

    }


    handleChange(event){
        const{name,value}=event.target
        this.setState(prevState=>({
           doctor:{
                ...prevState.doctor,
                [name]:value
            }
        }))
    }


    render(){
        return(
            <Jumbotron style={backgroundStyle}>
            <div>
                
                 <Form className="login-form">
                    <h3>
                        <span className="user-message">
                                 {this.state.title}
                        </span>
                    </h3>
                <FormGroup>
                 <Label className="add-label">First Name</Label>
                        <Input className="input"
                        value={this.state.doctor.firstName}
                        type="text"
                        name="firstName"
                        onChange={this.handleChange}
                        placeholder="First Name"
                        />
              </FormGroup>
              <FormGroup>
                 <Label className="add-label">Last Name</Label>
                        <Input className="input"
                        value={this.state.doctor.lastName}
                        type="text"
                        name="lastName"
                        onChange={this.handleChange}
                        placeholder="Last Name"
                        />
              </FormGroup>
              <FormGroup>
                 <Label className="add-label">Phone</Label>
                        <Input className="input"
                        value={this.state.doctor.phone}
                        type="text"
                        name="phone"
                        onChange={this.handleChange}
                        placeholder="Phone"
                        />
              </FormGroup>
              <FormGroup>
                 <Label className="add-label">Description</Label>
                        <Input className="input"
                        value={this.state.doctor.description}
                        type="text"
                        name="description"
                        onChange={this.handleChange}
                        placeholder="Description"
                        />
              </FormGroup>
              <FormGroup>
                 <Label className="add-label">Program</Label>
                        <Input className="input"
                        value={this.state.doctor.program}
                        type="text"
                        name="program"
                        onChange={this.handleChange}
                        placeholder="Program"
                        />
              </FormGroup>
              <Button className="btn-lg btn-block btn-succes"
                            onClick={this.props.handleSubmit.bind(this.props,this.state.doctor)}>{this.state.buttonName}</Button>
                            
                </Form>
               
            </div>
            </Jumbotron>
        )
    }
}

export default UpdateDoctorProfile
