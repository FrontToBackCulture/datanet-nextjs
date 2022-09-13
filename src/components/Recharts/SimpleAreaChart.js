import React, { PureComponent, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Brush,
} from 'recharts';
import { fDate2 } from '../../utils/formatTime';
import { fNumber } from '../../utils/formatNumber';
import moment from 'moment';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Example({ conf, chartData }) {
  const [dat, setDat] = useState([]);
  const [displayDat, setDisplayDat] = useState([]);
  const [period, setPeriod] = useState(30);
  const [xAxis, setXAxis] = useState();
  const [yAxis, setYAxis] = useState();
  const [chartTitle, setChartTitle] = useState();

  useEffect(() => {
    if (chartData.length > 0) {
      console.log('Re Chart: ', chartData);
      console.log('Re Chart: ', chartData.length);
      setDat(chartData);
      setDisplayDat(chartData);

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
      // console.log(tickItem);
      // console.log(new Date(moment(tickItem).format('YYYY-MM-DD')));
      return fDate2(new Date(moment(tickItem).format('YYYY-MM-DD')));
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

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <Box
            sx={{
              width: 150,
              height: 80,
              backgroundColor: 'white',
              opacity: [0.9, 0.8, 0.8],
            }}
          >
            <Typography variant="caption" gutterBottom>
              {`Date: ${fDate2(label)}`}
              <br />
              {`Day of Week: ${moment(label).format('dddd')}`}
              <br />
              {`Value: ${fNumber(payload[0].value)}`}
            </Typography>
            {/* <p className="label">{`${fDate2(label)} : ${fNumber(payload[0].value)}`}</p> */}
            {/* <p className="intro">{getIntroOfPage(label)}</p>
          <p className="desc">Anything you want can be displayed here.</p> */}
          </Box>
        </div>
      );
    }

    return null;
  };

  const handleClick = (period) => {
    let slicedData = dat.slice(Math.max(displayDat.length - period, 1));
    setPeriod(period);
    setDisplayDat(slicedData);
  };

  return (
    <>
      <tspan fontSize="14">{chartTitle}</tspan>
      <Stack spacing={2} direction="row">
        <Button variant={period == 30 ? 'contained' : 'outlined'} onClick={() => handleClick(30)}>
          Last 30 days
        </Button>
        <Button variant={period == 60 ? 'contained' : 'outlined'} onClick={() => handleClick(60)}>
          Last 60 days
        </Button>
        <Button variant={period == 90 ? 'contained' : 'outlined'} onClick={() => handleClick(90)}>
          Last 90 days
        </Button>
      </Stack>
      <ResponsiveContainer width="100%" height="100%" minHeight={400}>
        <AreaChart
          width={500}
          height={400}
          data={displayDat}
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
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey={yAxis}
            stroke="#8884d8"
            // fill="#8884d8"
            dot={{ stroke: 'purple', strokeWidth: 2 }}
            fillOpacity={1}
            fill="url(#yAxis)"
          />
          {/* <Brush tickFormatter={formatXAxis} startIndex={Math.round(displayDat.length * 0.45)} /> */}
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
}
