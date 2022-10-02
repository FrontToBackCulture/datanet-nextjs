// react
import React, { useState, useEffect, useRef } from 'react';
// @mui
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Grid,
  Stack,
} from '@mui/material';
// other library
import moment from 'moment';
import { aggregate, array } from 'cuttle';
// utils
import { fCurrency, fShortenNumber, fPercent, fNumber } from '../../utils/formatNumber';

export default function DenseTable({ job, conf, tabType }) {
  const [fullData, setFullData] = useState([]);
  const [fullDisplayData, setFullDisplayData] = useState([]);
  const [fullFinalDisplayData, setFullFinalDisplayData] = useState([]);
  const [item, setItem] = useState([]);
  const [unique, setUnique] = useState([]);
  const [trigger, setTrigger] = useState(false);
  //   console.log(conf);
  // console.log('DataTable Group Data', job);

  useEffect(() => {
    // console.log('1st useEffect', job, conf);
    if (job.length > 0 && conf) {
      const { dataSources, variablesMetrics, listFields, detailFields } = conf;
      const { staticSource, metricSource, trendSource } = dataSources;
      let dataSourceDef = dataSources[detailFields[tabType]['chart'].dataSource];
      const { valueKey, groupPeriodKey } = dataSourceDef;
      let newItemArray = [];
      job.forEach((item, index) => {
        let newItem = item;
        if (item.data.length > 0) {
          //! should be using aggregate.simpleAggregate but somehow returning 0 need to fix and this is doing the aggregate for Net Sales L3M
          let fields = [valueKey];
          let result = item.data.reduce((accumulator, row) => {
            for (let i = 0; i < fields.length; i++) {
              let value = 0;
              if (row[fields[i]]) {
                value = parseFloat(row[fields[i]]);
              }
              accumulator += value;
            }
            return accumulator;
          }, 0);
          // newItem.aggregateMetric = aggregate.simpleAggregate(item.data, [valueKey]);
          newItem.aggregateMetric = result;
          //! should be using aggregate.simpleAggregate but somehow returning 0 need to fix and this is doing the aggregate for Net Sales L3M

          //! should be using cuttle
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
            const secondLatestDate = item.data.sort(
              (a, b) => a[groupPeriodKey] - b[groupPeriodKey]
            )[item.data.length - 2];
            priorMetric = secondLatestDate[valueKey];
          } else {
            priorMetric = 0;
          }
          // calculate change metrics
          let changeMetric = latestMetric - priorMetric;
          let changeMetricPercent = (latestMetric - priorMetric) / priorMetric;
          newItem['latestMetric'] = latestMetric;
          newItem['priorMetric'] = priorMetric;
          newItem['changeMetric'] = changeMetric;
          newItem['changeMetricPercent'] = changeMetricPercent;
        }
        newItem.maxMetric = Math.max(...item.data.map((o) => o[valueKey]));
        newItem.minMetric = Math.min(...item.data.map((o) => o[valueKey]));
        //! should be using cuttle
        newItemArray.push(newItem);
        // setFullDisplayData((oldArray) => [...oldArray, item]);
      });
      setFullDisplayData(newItemArray);
    }
  }, [job, conf]);

  useEffect(() => {
    // console.log('FULL Entry', fullDisplayData);
    let arr = [];
    const { dataSources, variablesMetrics, listFields, detailFields } = conf;
    const { staticSource, metricSource, trendSource } = dataSources;
    let channelFields = detailFields[tabType]['table'];
    // console.log('FULL FINAL DAISPLAY', fullDisplayData);
    if (fullDisplayData.length > 0) {
      // console.log('FULL FINAL DAISPLAY Loop', fullDisplayData);
      fullDisplayData.forEach((entity) => {
        let arrFields = [];
        let value;
        for (let props in channelFields) {
          let variableMetric = conf['variablesMetrics'][channelFields[props].variablesMetrics];
          value = entity[variableMetric.sourceColumn];
          if (value) {
            switch (variableMetric.type) {
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
              name: variableMetric.headerName,
              value: value,
              headerName: variableMetric.headerName,
              condition: 'cellClassRules',
            });
          } else {
            arrFields.push({
              name: variableMetric.headerName,
              value: value,
              headerName: variableMetric.headerName,
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
      {fullFinalDisplayData.map((entity, index) => (
        <Grid key={'tableName' + entity.name + index} item xs={12} md={12} lg={12}>
          {entity.name}
          <Stack sx={{ marginTop: '10px' }} direction="row" spacing={2}>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableBody>
                  {entity.data.map((row) => (
                    <TableRow
                      key={'tableRowName' + row.name + row.value}
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
