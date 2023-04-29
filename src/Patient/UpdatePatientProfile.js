import React from 'react'
import {Button, Form, FormGroup, Input, Jumbotron, Label} from "reactstrap";
import image1 from "../Images/patient.jpg";

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

class UpdatePatientProfile extends React.Component{

    constructor(props){
        super()
        this.state={
            title:props.title,
            buttonName:props.buttonName,
            patient:props.patient
        }
        this.handleChange=this.handleChange.bind(this)

    }


    handleChange(event){
        const { name, value } = event.target;
    
        if (name === "phone") {
            if (value.length === 0 || value[0] !== "0" || value.length !== 10) {
                // Afiseaza un mesaj de eroare
                alert("Numarul de telefon trebuie sa inceapa cu 0 si sa aiba 10 cifre!");
                return;
            }
        }
    
        this.setState(prevState => ({
            patient: {
                ...prevState.patient,
                [name]: value
            }
        }));
    }

    render(){
        return(
            
            <div className="login-form-doctor">
                
                 <Form >
                    <h3>
                        <span className="user-message">
                                 {this.state.title}
                        </span>
                    </h3>
                <FormGroup>
                 <Label className="add-label">First Name</Label>
                        <Input className="input"
                        value={this.state.patient.firstName}
                        type="text"
                        name="firstname"
                        onChange={this.handleChange}
                        placeholder="First Name"
                        />
              </FormGroup>
              <FormGroup>
                 <Label className="add-label">Last Name</Label>
                        <Input className="input"
                        value={this.state.patient.lastName}
                        type="text"
                        name="lastName"
                        onChange={this.handleChange}
                        placeholder="Last Name"
                        />
              </FormGroup>
              <FormGroup>
                 <Label className="add-label">Addres</Label>
                        <Input className="input"
                        value={this.state.patient.address}
                        type="text"
                        name="address"
                        onChange={this.handleChange}
                        placeholder="Addres"
                        />
              </FormGroup>
              <FormGroup>
                 <Label className="add-label">Phone</Label>
                        <Input className="input"
                        value={this.state.patient.phone}
                        type="text"
                        name="phone"
                        onChange={this.handleChange}
                        placeholder="Phone"
                        />
              </FormGroup>
              <FormGroup>
                 <Label className="add-label">Birth</Label>
                        <Input className="input"
                        value={this.state.patient.birth}
                        type="text"
                        name="birth"
                        onChange={this.handleChange}
                        placeholder="Birth"
                        />
              </FormGroup>
              <FormGroup>
                 <Label className="add-label">Gneder</Label>
                        <Input className="input"
                        value={this.state.patient.gender}
                        type="text"
                        name="gender"
                        onChange={this.handleChange}
                        placeholder="Gneder"
                        />
              </FormGroup>
              <Button className="btn-lg btn-block btn-succes"
                            onClick={this.props.handleSubmit.bind(this.props,this.state.patient)}>{this.state.buttonName}</Button>
                            
                </Form>
               
            </div>
           
        )
    }
}

export default UpdatePatientProfile
