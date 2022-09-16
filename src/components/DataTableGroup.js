import React, { useState, useEffect, useRef } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment';
import { Grid, Stack } from '@mui/material';

// utils
import { fCurrency, fShortenNumber, fPercent, fNumber } from '../utils/formatNumber';

export default function DenseTable({ job, conf }) {
  const [fullData, setFullData] = useState([]);
  const [fullDisplayData, setFullDisplayData] = useState([]);
  const [fullFinalDisplayData, setFullFinalDisplayData] = useState([]);
  const [item, setItem] = useState([]);
  const [unique, setUnique] = useState([]);
  const [trigger, setTrigger] = useState(false);
  //   console.log(conf);
  // console.log('DataTable Group Data', job);

  const simpleAggregate = (data, fields) => {
    let result = data.reduce((accumulator, row) => {
      for (let i = 0; i < fields.length; i++) {
        let value = 0;
        if (row[fields[i]]) {
          value = parseFloat(row[fields[i]]);
        }
        accumulator += value;
      }
      return accumulator;
    }, 0);
    return result;
  };

  useEffect(() => {
    // console.log('1st useEffect', job, conf);
    if (job.length > 0 && conf) {
      // console.log('Start Work');
      //   setFullData(job);
      const { valueKey, groupPeriodKey } = conf.channelPerformanceSource;
      let newItemArray = [];
      job.forEach((item, index) => {
        let newItem = item;
        newItem.aggregateMetric = simpleAggregate(item.data, [valueKey]);
        if (item.data.length > 0) {
          // get the the most recent date in the data set belonging to the selected item
          var mostRecentDate = new Date(
            Math.max.apply(
              null,
              item.data.map((e) => {
                let mrd = new Date(moment(e[groupPeriodKey]).format('YYYY-MM-DD'));
                return new Date(mrd);
              })
            )
          );
          let latestMetric = 0,
            priorMetric = 0;
          // get the the most recent date object in the trend data for the selected item
          var mostRecentObject = item.data.filter((e) => {
            let d = new Date(moment(e[groupPeriodKey]).format('YYYY-MM-DD'));
            return d.getTime() == mostRecentDate.getTime();
            // return d == mostRecentDate;
          })[0];
          latestMetric = mostRecentObject[valueKey];
          // if more than 1 rows of data exists in the trend data for the item, start the calculating
          if (item.data.length > 1) {
            // get the the 2nd recent date object in the trend data for the selected item
            // get the the 2nd recent date object in the trend data for the selected item
            const secondLatestDate = item.data.sort(
              (a, b) => a[groupPeriodKey] - b[groupPeriodKey]
            )[item.data.length - 2];
            priorMetric = secondLatestDate[valueKey];
          } else {
            priorMetric = 0;
          }
          // calculate change metrics
          let changeMetric = latestMetric - priorMetric;
          let changeMetricPercent = ((latestMetric - priorMetric) / priorMetric) * 100;
          newItem['latestMetric'] = latestMetric;
          newItem['priorMetric'] = priorMetric;
          newItem['changeMetric'] = changeMetric;
          newItem['changeMetricPercent'] = changeMetricPercent;
        }
        newItem.maxMetric = Math.max(...item.data.map((o) => o[valueKey]));
        newItem.minMetric = Math.min(...item.data.map((o) => o[valueKey]));
        newItemArray.push(newItem);
        // setFullDisplayData((oldArray) => [...oldArray, item]);
      });
      setFullDisplayData(newItemArray);
    }
  }, [job, conf]);

  useEffect(() => {
    // console.log('FULL Entry', fullDisplayData);
    let arr = [];
    let { channelFields } = conf;
    // console.log('FULL FINAL DAISPLAY', fullDisplayData);
    if (fullDisplayData.length > 0) {
      // console.log('FULL FINAL DAISPLAY Loop', fullDisplayData);
      fullDisplayData.forEach((entity) => {
        let arrFields = [];
        let value;
        for (let props in channelFields) {
          value = entity[channelFields[props].sourceColumn];
          if (value) {
            switch (channelFields[props].type) {
              case 'decimal':
                value = fShortenNumber(value);
                break;
              case 'currency':
                value = fCurrency(value);
                break;
              case 'number':
                value = fNumber(value);
                break;
              case 'percent':
                value = fPercent(value);
                break;
              default:
                break;
            }
          }
          if (channelFields[props].condition) {
            arrFields.push({
              name: channelFields[props].headerName,
              value: value,
              headerName: channelFields[props].headerName,
              condition: 'cellClassRules',
            });
          } else {
            arrFields.push({
              name: channelFields[props].headerName,
              value: value,
              headerName: channelFields[props].headerName,
            });
          }
        }

        arr.push({ name: entity.name, data: arrFields });
      });
      setFullFinalDisplayData(arr);
      // console.log('For Table Display Why Ah DUn refresh plsff again:', arr);
    }
  }, [fullDisplayData]);

  return (
    <>
      {fullFinalDisplayData.map((entity) => (
        <Grid item xs={12} md={12} lg={12}>
          {entity.name}
          <Stack sx={{ marginTop: '10px' }} direction="row" spacing={2}>
            <TableContainer component={Paper}>
              <Table size="small" aria-label="a dense table">
                <TableBody>
                  {entity.data.slice(0, 7).map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                        borderBottom: '1px solid lightgrey',
                      }}
                    >
                      <TableCell component="th" scope="row" style={{ color: '#7a7a7a' }}>
                        {row.headerName}
                      </TableCell>
                      {/* <TableCell align="right">{row.value}</TableCell> */}
                      {!row.condition && <TableCell align="right">{row.value}</TableCell>}
                      {row.condition && parseFloat(row.value) < 0 && (
                        <TableCell align="right" style={{ color: 'red' }}>
                          {row.value}
                        </TableCell>
                      )}
                      {row.condition && parseFloat(row.value) > 0 && (
                        <TableCell align="right" style={{ color: 'green' }}>
                          {row.value}
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TableContainer component={Paper}>
              <Table size="small" aria-label="a dense table">
                <TableBody>
                  {entity.data.slice(7, 14).map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                        borderBottom: '1px solid lightgrey',
                      }}
                    >
                      <TableCell component="th" scope="row" style={{ color: '#7a7a7a' }}>
                        {row.headerName}
                      </TableCell>
                      {/* <TableCell align="right">{row.value}</TableCell> */}
                      {!row.condition && <TableCell align="right">{row.value}</TableCell>}
                      {row.condition && parseFloat(row.value) < 0 && (
                        <TableCell align="right" style={{ color: 'red' }}>
                          {row.value}
                        </TableCell>
                      )}
                      {row.condition && parseFloat(row.value) > 0 && (
                        <TableCell align="right" style={{ color: 'green' }}>
                          {row.value}
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </Grid>
      ))}
    </>
  );
}
