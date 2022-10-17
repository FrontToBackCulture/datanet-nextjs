// react
import React, { PureComponent, useState, useEffect } from 'react'
// @mui
import { Button, Stack, Box, Typography } from '@mui/material'
// other library
import moment from 'moment'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Brush,
} from 'recharts'
// utils
import { fDate2 } from '../../utils/formatTime'
import { fNumber } from '../../utils/formatNumber'

export default function Example({ conf, chartData, tab }) {
  const [dat, setDat] = useState([])
  const [displayDat, setDisplayDat] = useState([])
  const [period, setPeriod] = useState(90)
  const [xAxis, setXAxis] = useState()
  const [yAxis, setYAxis] = useState()
  const [chartTitle, setChartTitle] = useState()

  useEffect(() => {
    const { dataSources, variablesMetrics, listFields, detailFields } = conf
    const { staticSource, metricSource, trendSource } = dataSources
    console.log('TabType', tab)
    console.log('ChartData', chartData)
    if (chartData.length > 0 && tab && conf) {
      setDat(chartData)
      setDisplayDat(chartData)

      let data, month, value
      if (detailFields[tab]['chart']) {
        let dataSourceDef = dataSources[detailFields[tab]['chart'].dataSource]
        const { groupKey, valueKey, title } = dataSourceDef
        console.log('What is this popuplating?', groupKey, valueKey, title)
        setChartTitle(title)
        // console.log('React Chart:', chartData);
        if (chartData && chartData.length > 0 && conf) {
          setXAxis(groupKey)
          setYAxis(valueKey)
          // console.log('React Chart Months:', month);
          // console.log('React Chart Value:', value);
        }
      }
    }
  }, [conf, chartData, tab])

  useEffect(() => {
    // console.log('SimpleArea:', displayDat);
  }, [displayDat])

  function formatXAxis(tickItem) {
    if (tickItem && chartData.length > 0) {
      console.log(`~ tickItem 2 ${tickItem}`)

      // If using moment.js
      // console.log(tickItem);
      // console.log(new Date(moment(tickItem).format('YYYY-MM-DD')));
      return fDate2(new Date(moment(tickItem).format('YYYY-MM-DD')))
    }
  }

  const DataFormater = (number) => {
    if (chartData.length > 0) {
      if (number > 1000000000) {
        return (number / 1000000000).toString() + 'B'
      } else if (number > 1000000) {
        return (number / 1000000).toString() + 'M'
      } else if (number > 1000) {
        return (number / 1000).toString() + 'K'
      } else {
        return number.toString()
      }
    }
  }

  const CustomTooltip = ({ active, payload, label }) => {
    console.log(`~ label ${label}`)
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
            <Typography gutterBottom>
              {`Date: ${fDate2(label)}`}
              <br />
              {`Day of Week: ${moment(label).format('dddd')}`}
              <br />
              {`Value: ${fNumber(payload[0].value)}`}
            </Typography>
          </Box>
        </div>
      )
    }

    return null
  }

  const handleClick = (period) => {
    let slicedData = dat.slice(Math.max(dat.length - period, 1))
    setPeriod(period)
    setDisplayDat(slicedData)
  }

  return (
    <>
      <div fontSize="14">{chartTitle}</div>
      <Stack spacing={2} direction="row">
        <Button variant={period == 7 ? 'contained' : 'outlined'} onClick={() => handleClick(7)}>
          Last 7 days
        </Button>
        <Button variant={period == 14 ? 'contained' : 'outlined'} onClick={() => handleClick(14)}>
          Last 14 days
        </Button>
        <Button variant={period == 30 ? 'contained' : 'outlined'} onClick={() => handleClick(30)}>
          Last 30 days
        </Button>
      </Stack>
      {chartData.length > 0 && (
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
                <stop offset="5%" stopColor="#0bb4ff" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#0bb4ff" stopOpacity={0} />
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
              stroke="#0bb4ff"
              // fill="#8884d8"
              // dot={{ stroke: 'purple', strokeWidth: 2 }}
              fillOpacity={1}
              fill="url(#yAxis)"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </>
  )
}
