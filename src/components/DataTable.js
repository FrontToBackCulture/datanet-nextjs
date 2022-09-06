import React, { useState, useEffect, useRef } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// utils
import { fCurrency, fShortenNumber } from '../utils/formatNumber';

export default function DenseTable({ job, conf }) {
  const [item, setItem] = useState([]);
  //   console.log(conf);
  //   console.log(job);
  useEffect(() => {
    if (job.length > 0 && conf) {
      let itemMetrics = [];
      let { detailFields } = conf;
      //   console.log(detailFields);
      itemMetrics = job.map((field) => {
        let fieldSetting = Object.keys(detailFields).filter(function (row) {
          return detailFields[row].sourceColumn === field.name;
        });
        if (field.value) {
          switch (detailFields[fieldSetting[0]].type) {
            case 'decimal':
              field.value = fShortenNumber(field.value);
              break;
            case 'currency':
              field.value = fCurrency(field.value);
              break;
            case 'number':
              field.value = fShortenNumber(field.value);
              break;
            default:
              break;
          }
        }
        // console.log(field);
        return field;
      });
      //   console.log('To Display:', itemMetrics);
      setItem(itemMetrics);
    }
  }, [job, conf]);

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableBody>
          {item.map((row) => (
            <TableRow
              key={row.name}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                borderBottom: '1px solid lightgrey',
              }}
            >
              <TableCell component="th" scope="row" style={{ color: '#7a7a7a' }}>
                {row.name}
              </TableCell>
              <TableCell align="right">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
