// react
import React, { PureComponent, useState, useEffect } from 'react';
// @mui
import { Grid, Button, Stack, Box, Typography } from '@mui/material';
// other library
import moment from 'moment';
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
// utils
import { fDate2 } from '../../utils/formatTime';
import { fNumber } from '../../utils/formatNumber';

export default function Example({ conf, chartData, uniqueChannels }) {
  const [dat, setDat] = useState([]);
  const [displayDat, setDisplayDat] = useState([]);
  const [displayToggleDat, setDisplayToggleDat] = useState([]);
  const [period, setPeriod] = useState(90);
  const [xAxis, setXAxis] = useState();
  const [yAxis, setYAxis] = useState();
  const [chartTitle, setChartTitle] = useState();
  const [uChannels, setUChannels] = useState([]);
  const [activeButton, setActiveButton] = useState([]);

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
      setActiveButton(uniqueChannels);
    }
  }, [uniqueChannels]);

  useEffect(() => {
    console.log('Active Button:', activeButton);
  }, [activeButton]);

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

  const renderLegend = (props) => {
    const { payload } = props;
    return (
      // <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
      <Grid item xs={12} md={12} lg={12} style={{ textAlign: 'center' }}>
        {payload.map((entry, index) => {
          // return (
          //   <Button
          //     variant="text"
          //     style={{ color: entry.color }}
          //     onClick={() => handleMouseEnter(entry)}
          //   >
          //     {entry.value}
          //   </Button>
          // );
          if (activeButton.includes(entry.value)) {
            return (
              <Button
                variant="text"
                style={{ color: entry.color }}
                onClick={() => handleMouseEnter(entry)}
              >
                {entry.value}
              </Button>
            );
          } else {
            return (
              <Button
                variant="text"
                style={{ color: '#AAAFB4' }}
                onClick={() => handleMouseEnter(entry)}
              >
                {entry.value}
              </Button>
            );
          }
        })}
        {/* </Stack> */}
      </Grid>
    );
  };

  const handleMouseEnter = (o) => {
    console.log(o);
    console.log(displayDat);
    let selectedLineKey = o.value;
    if (activeButton.includes(selectedLineKey)) {
      setActiveButton(activeButton.filter((item) => item !== selectedLineKey));
    } else {
      setActiveButton((oldArray) => [...oldArray, selectedLineKey]);
    }

    let foundIndex;
    foundIndex = displayDat.findIndex((x) => x.name == selectedLineKey);
    console.log(foundIndex);
    console.log(displayDat[foundIndex]);
    if (displayDat[foundIndex].data.length > 0) {
      setDisplayDat(
        Object.values({ ...displayDat, [foundIndex]: { ...displayDat[foundIndex], data: [] } })
      );
    }
    if (displayDat[foundIndex].data.length == 0) {
      let originalIndex = dat.findIndex((x) => x.name == selectedLineKey);
      let dataReInsert = dat[originalIndex].data;
      setDisplayDat(
        Object.values({
          ...displayDat,
          [foundIndex]: { ...displayDat[foundIndex], data: dataReInsert },
        })
      );
    }

    // let postRemovedDisplayDate = displayDat.filter((item) => item.name != removeLineKey);
    // setDisplayDat([]);
    // setDisplayDat(postRemovedDisplayDate);
  };

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
          <Legend onClick={handleMouseEnter} content={renderLegend} />
          {/* <Legend onClick={handleMouseEnter} /> */}
          {/* <Legend /> */}
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
