import React, { PureComponent, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {
  LineChart,
  Line,
  Legend,
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

export default function Example({ conf, chartData, uniqueChannels }) {
  const [dat, setDat] = useState([]);
  const [displayDat, setDisplayDat] = useState([]);
  const [displayToggleDat, setDisplayToggleDat] = useState([]);
  const [period, setPeriod] = useState(90);
  const [xAxis, setXAxis] = useState();
  const [yAxis, setYAxis] = useState();
  const [chartTitle, setChartTitle] = useState();
  const [uChannels, setUChannels] = useState([]);

  const color = [
    '#e60049',
    '#0bb4ff',
    '#50e991',
    '#e6d800',
    '#9b19f5',
    '#ffa300',
    '#dc0ab4',
    '#b3d4ff',
    '#00bfa0',
  ];
  useEffect(() => {
    if (chartData.length > 0) {
      // console.log('Re Chart: ', chartData);
      // console.log('Re Chart: ', chartData.length);
      setDat(chartData);
      setDisplayDat(chartData);
      setDisplayToggleDat(chartData);

      let data, month, value;
      if (conf.channelPerformanceSource) {
        const { channelPerformanceSource } = conf;
        const { groupKey, valueKey, title, metricName, groupPeriodKey } = channelPerformanceSource;
        setChartTitle(title);
        // console.log('React Chart:', chartData);
        if (chartData && chartData.length > 0 && conf) {
          // setXAxis(groupKey);
          setYAxis(valueKey);
          // console.log('React Chart Months:', month);
          // console.log('React Chart Value:', value);
        }
      }
    }
  }, [conf, chartData]);

  useEffect(() => {
    console.log(uniqueChannels);
    if (uniqueChannels && uniqueChannels.length > 0) {
      setUChannels(uniqueChannels);
    }
  }, [uniqueChannels]);

  function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
  }

  function formatXAxis(tickItem) {
    if (chartData.length > 0) {
      // If using moment.js
      // console.log(new Date(moment(tickItem).format('YYYY-MM-DD')));
      // return moment(tickItem).format('YYYY-MM-DD');
      if (isValidDate(new Date(moment(tickItem).format('YYYY-MM-DD')))) {
        return fDate2(new Date(moment(tickItem).format('YYYY-MM-DD')));
      }
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
              width: 180,
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
              {payload.map((item, index) => (
                <p key={index} style={{ color: item.color }}>
                  {item.name}: ${fNumber(item.value)}
                  <br />
                </p>
              ))}
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

  // const handleMouseEnter = (o) => {
  //   console.log(o);
  //   console.log(displayDat);
  //   let removeLineKey = o.value;
  //   let foundIndex = displayDat.findIndex((x) => x.name == removeLineKey);
  //   console.log(foundIndex);
  //   console.log(displayDat[foundIndex]);
  //   // let postRemovedDisplayDate = displayDat.filter((item) => item.name != removeLineKey);
  //   // setDisplayDat([]);
  //   // setDisplayDat(postRemovedDisplayDate);
  // };

  const handleClick = (period) => {
    let reducedData = [];
    console.log(uChannels);
    uChannels.forEach(function (item, index) {
      let channelData = dat.find((element) => element.name == item);
      let slicedData = channelData['data'].slice(Math.max(channelData['data'].length - period, 1));
      reducedData.push({ name: item, data: slicedData });
    });
    console.log('FilteredData', reducedData);
    setPeriod(period);
    setDisplayDat(reducedData);
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
        <LineChart
          width={500}
          height={400}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="DateNumber"
            type="number"
            domain={['dataMin', 'dataMax']}
            tickFormatter={formatXAxis}
            allowDuplicatedCategory={false}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            dataKey={yAxis}
            type="number"
            domain={['auto', 'auto']}
            tickFormatter={DataFormater}
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          {/* <Tooltip /> */}
          {/* <Legend onClick={handleMouseEnter} /> */}
          <Legend />
          {displayDat.map((s, index) => (
            <Line
              dataKey={yAxis}
              data={s.data}
              name={s.name}
              key={s.name}
              stroke={color[index]}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
