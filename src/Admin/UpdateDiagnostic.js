import React from "react"
import {Form,FormGroup,Input,Label,Button} from "reactstrap"
import { Jumbotron } from "react-bootstrap"

class UpdateDiagnostic extends React.Component{
    constructor(props){
        super()
        this.state={
            title:props.title,
            buttonName:props.buttonName,
            diagnostic:props.diagnostic
        }
        this.handleChange=this.handleChange.bind(this)
    }

    
    handleChange(event){
        const {name,value}=event.target

        this.setState(prevState=>({
            diagnostic:{
                ...prevState.diagnostic,
                [name]:value
            }
        }))
       
    }



    render(){
        return(
            <div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
               <Form className="login-form">

                     <h3>
                        <span className="user-message">
                       {this.state.title}
                        </span>
                    </h3>
                    <FormGroup>
                        <Label className="add-label">Diagnostic Name</Label>
                        <Input className="input"
                         value={this.state.diagnostic.name}
                         type="text"
                         name="name"
                         onChange={this.handleChange}
                         placeholder="Diagnostic Name"
                          />
                    </FormGroup>
                    <FormGroup>
                        <Label className="add-label">Diagnostic Details</Label>
                        <Input className="input"
                         value={this.state.diagnostic.details}
                         type="text"
                         name="details"
                         onChange={this.handleChange}
                         placeholder="Details"
                          />
                    </FormGroup>

                    <Button className="btn-lg btn-block btn-succes" 
                    onClick={this.props.handleSubmit.bind(this.props,this.state.diagnostic)}>{this.state.buttonName}</Button>
                </Form>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        )
    }
}

export default UpdateDiagnostic
