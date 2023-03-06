import React from "react"
import {Form,FormGroup,Input,Label,Button} from "reactstrap"
import axios from "axios"
import Jumbotron from "react-bootstrap/Jumbotron";

class UpdateSection extends React.Component{
    constructor(props){
        super()
        console.log(props)
        this.state={
            title:props.title,
            buttonName:props.buttonName,
            section:props.section,
            selectedHospital:props.section.hospital.name
            
            
        }
        this.handleChange=this.handleChange.bind(this)
        this.getHospital=this.getHospital.bind(this)
        
    }

    
     
    handleChange(event){
        const {name,value}=event.target
        this.setState(prevState=>({
           section:{
                ...prevState.section,
                [name]:value
            }
        }))
    }


    getHospital(event){
        const {name,value}=event.target
        var hospitals = this.props.hospitals
        var newHospital
        for(var i = 0; i < hospitals.length; i++) {
            if (value === hospitals[i].name) {
                newHospital=hospitals[i]
            }
        }
        this.setState(prevState=>({
            section:{
                 ...prevState.section,
                 [name]: newHospital
             },
             selectedHospital:newHospital.name
         }))
        console.log(this.state.section)
    }

   
    


    render(){
        return(
            <div className="jumbotron">
                <Jumbotron>
               <Form className="login-form">

                     <h3>
                        <span className="user-message">
                       {this.state.title}
                        </span>
                    </h3>
                    <FormGroup>
                        <Label className="add-label">Section Name</Label>
                        <Input className="input"
                         value={this.state.section.name}
                         type="text"
                         name="name"
                         onChange={this.handleChange}
                         placeholder="Section Name"
                          />
                    </FormGroup>
                    <FormGroup>
                                <Label className="add-label">Hospital</Label>
                                <Input type="select"
                                name="hospital"
                                value={this.state.selectedHospital}
                                onChange={this.getHospital}
                                >
                                    <option >Select Hospital</option>
                                {this.props.hospitals.map(hospital=>
                                    <option>{hospital.name}</option>)}
                                </Input>
                            </FormGroup>

                    <Button className="btn-lg btn-block btn-succes" 
                    onClick={this.props.handleSubmit.bind(this.props,this.state.section)}>{this.state.buttonName}</Button>
                </Form>
                </Jumbotron>
            </div>
        )
    }
}

export default UpdateSection
