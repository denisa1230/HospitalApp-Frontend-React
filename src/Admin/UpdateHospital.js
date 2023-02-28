import React from "react"
import {Form,FormGroup,Input,Label,Button} from "reactstrap"
import axios from "axios"

class UpdateHospital extends React.Component{
    constructor(props){
        super()
        console.log(props)
        this.state={
            title:props.title,
            buttonName:props.buttonName,
           hospital:props.hospital,
        }
        this.handleChange=this.handleChange.bind(this)

    }



    handleChange(event){
        const{name,value}=event.target
       
        this.setState(prevState=>({
            hospital:{
                ...prevState.hospital,
                [name]:value
            }
        }))
    }


    render(){
        return(
            <div>
                <Form className="login-form">

                    <h3>
                        <span className="user-message">
                       {this.state.title}
                        </span>
                    </h3>
                    <FormGroup>
                        <Label className="add-label">Hospital Name</Label>
                        <Input className="input"
                               value={this.state.hospital.name}
                               type="text"
                               name="name"
                               onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label className="add-label">Address</Label>
                        <Input className="input"
                               value={this.state.hospital.address}
                               type="text"
                               name="address"
                               onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label className="add-label">Locality</Label>
                        <Input className="input"
                               value={this.state.hospital.locality}
                               type="text"
                               name="locality"
                               onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label className="add-label">County</Label>
                        <Input className="input"
                               value={this.state.hospital.county}
                               type="text"
                               name="county"
                               onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label className="add-label">Country</Label>
                        <Input className="input"
                               value={this.state.hospital.country}
                               type="text"
                               name="country"
                               onChange={this.handleChange}
                        />
                    </FormGroup>

                    <Button className="btn-lg btn-block btn-succes"
                            onClick={this.props.handleSubmit.bind(this.props,this.state.hospital)}>{this.state.buttonName}</Button>
                </Form>

            </div>
        )
    }
}

export default UpdateHospital
