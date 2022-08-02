import "./chart.scss";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { useState, useEffect } from "react"

import { getTime } from '../../Functions/times-functions'



const Chart = ({ aspect, title }) => {

  const [data, setData] = useState([{}]);

  useEffect(async () => {

    setData([
      { name: '29/07', horas: 7.55 },
      { name: '28/07', horas: 8.10 },
      { name: '27/07', horas: 8.5 },
      { name: '26/07', horas: 9 },
      { name: '25/07', horas: 8.75 },
    ]);

    return;

  }, []);

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" height="100%" style={{ marginBottom: 10 }}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 15,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="horas" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;