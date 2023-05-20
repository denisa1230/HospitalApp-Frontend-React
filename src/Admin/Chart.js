import React from "react"
import {LineChart, ResponsiveContainer, Legend, Tooltip, Line, XAxis, YAxis, CartesianGrid} from 'recharts';
import axios from "axios";

class Chart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/consultation/countDiagnostic')
            .then((response) => {
                const diagnosticMap = response.data;
                const data = Object.keys(diagnosticMap).map(diagnosticName => ({
                    name: diagnosticName,
                    diagnostics: diagnosticMap[diagnosticName]
                }));
                this.setState({ data }, () => {
                    console.log(this.state.data);
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    
    render() {
        return (
            <div style={{width: '50%', height: '50%'}} className='alignChart'>
                <ResponsiveContainer width="100%" aspect={3}>
                    <LineChart data={this.state.data} margin={{right: 300}}>
                        <CartesianGrid/>
                        <XAxis dataKey="name" interval={'preserveStartEnd'}/>
                        <YAxis/>
                        <Legend/>
                        <Tooltip/>
                        <Line dataKey="diagnostics" stroke="#90EE90" activeDot={{r: 8}}/>
                    </LineChart>
                </ResponsiveContainer>
            </div>
        )
    }
}

export default Chart;
