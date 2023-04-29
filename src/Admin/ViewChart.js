import React from "react"
import {Button, Form, FormGroup, Jumbotron, Table} from "reactstrap";
import 'react-calendar/dist/Calendar.css';
import Chart from "./Chart";
import Calendar from "react-calendar";
import axios from "axios";

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: '100vh',
    marginTop: '0px',
    marginBottom: '0px',
    backgroundColor: 'whitesmoke'
};

class DailyEnergyConsumption extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email: localStorage.getItem('email'),
            data: new Date(),
            device: {},
            devList: [],
            localDate:{},
            graphicData: [],
            graphicConsumption: [],
            viewChart: "true",
            noChart: "true"
        }

        this.handleClick = this.handleClick.bind(this)
    }

    onChange = data => {
        this.setState({data})
        console.log(data)
    }

    handleClick() {

        var day = this.state.data.getDate()
        var month = this.state.data.getMonth() + 1
        console.log(month)
        this.state.localDate = this.state.data.getFullYear() + "-" + month
        if(day < 10)
            this.state.localDate = this.state.localDate + "-0" + day;
        else
            this.state.localDate = this.state.localDate + "-" + day;

        console.log(this.state.localDate)

        const timestampRequest = {
            timestamp: this.state.localDate,
            deviceId: this.state.device.id
        }

        axios.put('http://localhost:8090/DEC/getConsumption', timestampRequest).then(
            response => {
                if(response.data.length == 1)
                    this.setState({
                        noChart: "true",
                        viewChart: "false"
                    })
                else{
                    this.setState({
                        viewChart: "true",
                        graphicConsumption: response.data
                    })
                }
                console.log(response.data)
            })
    }

    

    handleChange(dev, e) {
        console.log(e.target.checked)
        this.setState({
            device: dev
        })
    }

    render() {
        return (
            <div className="body">
                
                <Jumbotron fluid style={backgroundStyle}>
                    <Form className="align">
                        

                        <FormGroup className="graphic">
                            {this.state.viewChart === "true" ?
                                <Chart
                                    consumption={this.state.graphicConsumption}
                                /> : null}
                            {this.state.noChart === "true" ?
                                <h1>No chart for this data</h1> : null}
                        </FormGroup>
                    </Form>
                </Jumbotron>
            </div>

        );
    }

}

export default DailyEnergyConsumption