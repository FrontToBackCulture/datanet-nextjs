import React from 'react'
import { Divider, Paper, Stack, Typography } from '@mui/material'
import { fCurrency, fShortenNumber, fPercent, fNumber } from '../../utils/formatNumber'

export default function DenseTable({ job, conf, tabType }) {
  let rows = []

  if (conf) {
    const { dataSources, variablesMetrics, listFields, detailFields } = conf
    const { staticSource, metricSource, trendSource } = dataSources
    rows = job.map((field) => {
      let fieldSetting = Object.keys(detailFields[tabType]['table']).filter(function (row) {
        let variableMetric =
          conf['variablesMetrics'][detailFields[tabType]['table'][row].variablesMetrics]
        if (variableMetric.headerName === field.name) {
          field.headerName = variableMetric.headerName
          if (detailFields[tabType]['table'][row].condition) {
            field.condition = 'cellClassRules'
          }
          return row
        }
      })

      if (field.value) {
        switch (
          variablesMetrics[detailFields[tabType]['table'][fieldSetting[0]].variablesMetrics].type
        ) {
          case 'decimal':
            field.value = fShortenNumber(field.value)
            break
          case 'currency':
            field.value = fCurrency(field.value)
            break
          case 'number':
            field.value = fNumber(field.value)
            break
          case 'percent':
            field.value = fPercent(field.value)
            break
          default:
            break
        }
      }
      return field
    })
  }

  const computeValueColor = (row) => {
    if (row.condition) {
      if (parseFloat(row.value) > 0) return 'green'
      if (parseFloat(row.value) < 0) return 'red'
    }
    return 'inherit'
  }

  return (
    <Paper sx={{ width: 1 }}>
      <Stack divider={<Divider />}>
        {rows.map((row) => (
          <Stack key={row.name} direction="row" justifyContent="space-between" px={2} py={1}>
            <Typography>{row.headerName}</Typography>
            <Typography color={computeValueColor(row)}>{row.value}</Typography>
          </Stack>
        ))}
      </Stack>
    </Paper>
  )
}
