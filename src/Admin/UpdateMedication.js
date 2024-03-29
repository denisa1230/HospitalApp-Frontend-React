import React from "react"
import {Form,FormGroup,Input,Label,Button} from "reactstrap"
import axios from "axios"
import { Jumbotron } from "react-bootstrap"

class UpdateMedication extends React.Component{
    constructor(props){
        super()
        console.log(props)
        this.state={
            title:props.title,
            buttonName:props.buttonName,
            medicine:props.medication,
        }
        this.handleChange=this.handleChange.bind(this)
    }

    
    handleChange(event){
        const {name,value}=event.target

        this.setState(prevState=>({
            medicine:{
                ...prevState.medicine,
                [name]:value
            }
        }))
       
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
                        <Label className="add-label">Medication Name</Label>
                        <Input className="input"
                         value={this.state.medicine.drugName}
                         type="text"
                         name="drugName"
                         onChange={this.handleChange}
                         placeholder="Medication Name"
                          />
                    </FormGroup>
                    <FormGroup>
                        <Label className="add-label">Dosage</Label>
                        <Input className="input"
                         value={this.state.medicine.dosage}
                         type="text"
                         name="dosage"
                         onChange={this.handleChange}
                         placeholder="Dosage"
                          />
                    </FormGroup>

                    <Button className="btn-lg btn-block btn-succes" 
                    onClick={this.props.handleSubmit.bind(this.props,this.state.medicine)}>{this.state.buttonName}</Button>
                </Form>
                </Jumbotron>
            </div>
        )
    }
}

export default UpdateMedication
