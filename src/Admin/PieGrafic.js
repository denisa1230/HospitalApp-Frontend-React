import React, { PureComponent } from 'react';
import { ResponsiveContainer, PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';
import axios from "axios";

export default class PieGrafic extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          
            axis: [],
            data: []
        };
    }

    componentDidMount() {
        axios.get("http://localhost:8080/consultationMedicine/findNumberOfDrugs")
          .then((response) => {
            const drugs = response.data;
            const data = Object.entries(drugs).map(([drugName, drugQuantity]) => ({ name: drugName, value: drugQuantity }));
            this.setState({ data });
            
          })
          .catch((error) => {
            console.log(error);
          });
          console.log(this.state.data)
      }


    render() {
        return (
            <div style={{ width: '100%', height: 300 }} className='alignPie'>
                <ResponsiveContainer>
                <PieChart>
  <Tooltip />
  <Pie dataKey="value" data={this.state.data} label>
    {this.state.data.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
    ))}
  </Pie>
  <Legend />
</PieChart>
                </ResponsiveContainer>
            </div>
        );
    }

}