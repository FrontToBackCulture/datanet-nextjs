import React, { PureComponent, useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { fDate2 } from '../../utils/formatTime';
import moment from 'moment';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function Example({ conf, chartData }) {
  const [dat, setDat] = useState([]);
  const [xAxis, setXAxis] = useState();
  const [yAxis, setYAxis] = useState();
  const [chartTitle, setChartTitle] = useState();

  useEffect(() => {
    if (chartData.length > 0) {
      console.log('Re Chart: ', chartData);
      console.log('Re Chart: ', chartData.length);
      setDat(chartData);

      let data, month, value;
      if (conf.chartSource) {
        const { chartSource } = conf;
        const { groupKey, valueKey, title, metricName } = chartSource;
        setChartTitle(title);
        // console.log('React Chart:', chartData);
        if (chartData && chartData.length > 0 && conf) {
          setXAxis(groupKey);
          setYAxis(valueKey);
          // console.log('React Chart Months:', month);
          // console.log('React Chart Value:', value);
        }
      }
    }
  }, [conf, chartData]);

  function formatXAxis(tickItem) {
    if (chartData.length > 0) {
      // If using moment.js
      console.log(tickItem);
      return fDate2(moment(tickItem).format('YYYY-M-DD'));
    }
  }

  const DataFormater = (number) => {
    if (chartData.length > 0) {
      if (number > 1000000000) {
        return (number / 1000000000).toString() + 'B';
      } else if (number > 1000000) {
        return (number / 1000000).toString() + 'M';
      } else if (number > 1000) {
        return (number / 1000).toString() + 'K';
      } else {
        return number.toString();
      }
    }
  };

  return (
    <>
      <tspan fontSize="14">{chartTitle}</tspan>
      <ResponsiveContainer width="100%" height="100%" minHeight={400}>
        <AreaChart
          width={500}
          height={400}
          data={dat}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="yAxis" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxis} tickFormatter={formatXAxis} tick={{ fontSize: 12 }} />
          <YAxis
            type="number"
            domain={['auto', 'auto']}
            tickFormatter={DataFormater}
            tick={{ fontSize: 12 }}
          />
          <Tooltip />
          <Area
            type="monotone"
            dataKey={yAxis}
            stroke="#8884d8"
            // fill="#8884d8"
            dot={{ stroke: 'purple', strokeWidth: 2 }}
            fillOpacity={1}
            fill="url(#yAxis)"
          />
        </AreaChart>
      </ResponsiveContainer>
      {/* <ResponsiveContainer width="100%" height="100%" minHeight={400}>
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer> */}
    </>
  );
}
