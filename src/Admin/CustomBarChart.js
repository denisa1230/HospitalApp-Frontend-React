import React, { PureComponent } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

class CustomBarChart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:8080/consultation/findConsultationByNrOfMonth')
      .then((response) => {
        const consultation = response.data;
        const data = Object.entries(consultation).map(([month, count]) => ({
          month,
          consultations: count,
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
      <div style={{ width: '40%', height: 300 }} className='alignBar'>
        <h2 style={{ textAlign: 'center' }}>Monthly Consultations</h2>
        <ResponsiveContainer>
          <BarChart data={this.state.data} margin={{ right: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Legend />
            <Tooltip />
            <Bar dataKey="consultations" fill="#90EE90" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default CustomBarChart;
