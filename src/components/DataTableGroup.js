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

export default function DenseTable({ job, conf, uniqueChannels }) {
  const [fullData, setFullData] = useState([]);
  const [fullDisplayData, setFullDisplayData] = useState([]);
  const [fullFinalDisplayData, setFullFinalDisplayData] = useState([]);
  const [item, setItem] = useState([]);
  const [unique, setUnique] = useState([]);
  //   console.log(conf);
  console.log('DataTable Group Data', job);
  console.log('DataTable Group Uniuq', uniqueChannels);

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

  useEffect(async () => {
    if (job.length > 0 && conf && uniqueChannels) {
      setUnique(uniqueChannels);
      setFullData(job);

      await fullData.forEach(async function (item, index) {
        item.aggregateMetric = await simpleAggregate(item.data, ['Net Sales']);

        if (item.data.length > 0) {
          // get the the most recent date in the data set belonging to the selected item
          var mostRecentDate = new Date(
            Math.max.apply(
              null,
              item.data.map((e) => {
                let mrd = new Date(moment(e['Date']).format('YYYY-MM-DD'));
                return new Date(mrd);
              })
            )
          );

          let latestMetric = 0,
            priorMetric = 0;
          // get the the most recent date object in the trend data for the selected item
          var mostRecentObject = item.data.filter((e) => {
            let d = new Date(moment(e['Date']).format('YYYY-MM-DD'));
            return d.getTime() == mostRecentDate.getTime();
            // return d == mostRecentDate;
          })[0];
          latestMetric = mostRecentObject['Net Sales'];

          // if more than 1 rows of data exists in the trend data for the item, start the calculating
          if (item.data.length > 1) {
            // get the the 2nd recent date object in the trend data for the selected item
            // get the the 2nd recent date object in the trend data for the selected item
            const secondLatestDate = item.data.sort((a, b) => a['Date'] - b['Date'])[
              item.data.length - 2
            ];
            priorMetric = secondLatestDate['Net Sales'];
          } else {
            priorMetric = 0;
          }

          // calculate change metrics
          let changeMetric = latestMetric - priorMetric;
          let changeMetricPercent = ((latestMetric - priorMetric) / priorMetric) * 100;

          item['latestMetric'] = latestMetric;
          item['priorMetric'] = priorMetric;
          item['changeMetric'] = changeMetric;
          item['changeMetricPercent'] = changeMetricPercent;
        }

        item.maxMetric = Math.max(...item.data.map((o) => o['Net Sales']));
        item.minMetric = Math.min(...item.data.map((o) => o['Net Sales']));

        setFullDisplayData((oldArray) => [...oldArray, item]);
      });
    }
  }, [job, conf, uniqueChannels]);

  useEffect(() => {
    let arr = [];
    let { channelFields } = conf;

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
        arrFields.push({
          name: channelFields[props].headerName,
          value: value,
          headerName: channelFields[props].headerName,
        });
      }
      arr.push({ name: entity.name, data: arrFields });
    });
    setFullFinalDisplayData(arr);
    console.log('For Table Display Why Ah DUn refresh pls:', arr);
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
