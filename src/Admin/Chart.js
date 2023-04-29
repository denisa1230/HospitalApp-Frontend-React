import React from "react"
import {LineChart, ResponsiveContainer, Legend, Tooltip, Line, XAxis, YAxis, CartesianGrid} from 'recharts';

const pdata = [];

class Chart extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            consumption: props.consumption,
            axis: [],
            data:[]
        }

    }

    componentDidMount() {

        for (var j = 0; j < 24; j++) {
            let d = {
                name: j,
                hour: j,
                consumption: this.state.consumption[j]
            };
            pdata.push(d);
        }
    }

    render() {
        return (
            <div style={{width: '1000px', height: '1000px'}}>
                <ResponsiveContainer width="100%" aspect={3}>
                    <LineChart data={pdata} margin={{right: 300}}>
                        <CartesianGrid/>
                        <XAxis dataKey="name"
                               interval={'preserveStartEnd'}/>
                        <YAxis></YAxis>
                        <Legend/>
                        <Tooltip/>
                        <Line dataKey="hour"
                              stroke="black" activeDot={{r: 8}}/>
                        <Line dataKey="consumption"
                              stroke="red" activeDot={{r: 8}}/>
                    </LineChart>
                </ResponsiveContainer>
            </div>
        )
    }
}

export default Chart