// react
import React, { useState, useEffect } from 'react';
// @mui
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
// utils
import { fCurrency, fShortenNumber, fPercent, fNumber } from '../../utils/formatNumber';

export default function DenseTable({ job, conf, tabType }) {
  const [item, setItem] = useState([]);
  //   console.log(conf);
  //   console.log(job);
  useEffect(() => {
    if (job.length > 0 && conf) {
      // console.log(job);
      let itemMetrics = [];
      const { dataSources, variablesMetrics, listFields, detailFields } = conf;
      const { staticSource, metricSource, trendSource } = dataSources;
      //   console.log(detailFields);
      itemMetrics = job.map((field) => {
        let fieldSetting = Object.keys(detailFields[tabType]['table']).filter(function (row) {
          let variableMetric =
            conf['variablesMetrics'][detailFields[tabType]['table'][row].variablesMetrics];
          if (variableMetric.headerName === field.name) {
            field.headerName = variableMetric.headerName;
            if (variableMetric.condition) {
              field.condition = 'cellClassRules';
            }
            return row;
          }
        });

        if (field.value) {
          switch (
            variablesMetrics[detailFields[tabType]['table'][fieldSetting[0]].variablesMetrics].type
          ) {
            case 'decimal':
              field.value = fShortenNumber(field.value);
              break;
            case 'currency':
              field.value = fCurrency(field.value);
              break;
            case 'number':
              field.value = fNumber(field.value);
              break;
            case 'percent':
              field.value = fPercent(field.value);
              break;
            default:
              break;
          }
        }
        // console.log(field);
        return field;
      });
      // console.log('To Display:', itemMetrics);
      setItem(itemMetrics);
    }
  }, [job, conf]);

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableBody>
          {item.map((row) => (
            <TableRow
              key={'tableRowNormalTable' + row.name}
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
  );
}
