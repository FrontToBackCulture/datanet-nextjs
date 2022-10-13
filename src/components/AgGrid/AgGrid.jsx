import React, { useCallback, useState, useEffect, useRef, useMemo, useContext } from 'react'
import NextLink from 'next/link'
import { TextField, Stack, Typography } from '@mui/material'
import { AgGridReact } from 'ag-grid-react'
import { DomainContext } from 'src/contexts/DomainProvider'
import 'ag-grid-enterprise'
import 'ag-grid-enterprise/dist/styles/ag-grid.css'
import 'ag-grid-enterprise/dist/styles/ag-theme-balham-dark.css'
import 'ag-grid-enterprise/dist/styles/ag-theme-material.css'
import { fCurrency, fShortenNumber, fPercent, fNumber } from '../../utils/formatNumber'

function LinkComponent(props) {
  const { linkKey, data, value, entity } = props
  const keyValue = data[linkKey]
  const selectedDomain = useContext(DomainContext)

  let link
  if (keyValue) {
    link = keyValue.replace('/', '%2F')
  } else {
    link = ''
  }

  const href = `/list/${selectedDomain}/${entity}/${link}`

  return (
    <NextLink href={{ pathname: href }} passHref>
      <a href={href}>{value}</a>
    </NextLink>
  )
}

export default function AGGrid({ rowD, type, conf, entity, title }) {
  const gridRef = useRef()
  const [rowData, setRowData] = useState([])
  const [columnDefs, setColumnDefs] = useState([])

  const defaultColDef = useMemo(
    () => ({
      enableValue: true,
      enableRowGroup: true,
      enablePivot: true,
      sortable: true,
      filter: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeight: true,
    }),
    []
  )

  const statusBar = useMemo(
    () => ({
      statusPanels: [
        {
          statusPanel: 'agTotalAndFilteredRowCountComponent',
          align: 'left',
        },
        {
          statusPanel: 'agTotalRowCountComponent',
          align: 'center',
        },
        { statusPanel: 'agFilteredRowCountComponent' },
        { statusPanel: 'agSelectedRowCountComponent' },
        { statusPanel: 'agAggregationComponent' },
      ],
    }),
    []
  )

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(document.getElementById('filter-text-box').value)
  }, [])

  function decimalFormatter(params) {
    if (params && params.value) {
      return fShortenNumber(params.value)
    }
    return 0
  }

  function currencyFormatter(params) {
    if (params && params.value) {
      return fCurrency(params.value)
    }
    return 0
  }

  function numberFormatter(params) {
    if (params && params.value) {
      return fNumber(params.value)
    }
    return 0
  }

  function percentFormatter(params) {
    if (params && params.value) {
      return fPercent(params.value)
    }
    return 0
  }

  useEffect(() => {
    if (rowD && conf && entity) {
      const { dataSources, variablesMetrics, listFields, detailFields } = conf
      const { staticSource, metricSource, trendSource } = dataSources

      if (rowD && rowD.length > 0) {
        const colDefs = []
        if (listFields) {
          const fields2Show = Object.keys(listFields)
          fields2Show.forEach((field2Show) => {
            const colDefsObj = {}
            const variableMetric = conf.variablesMetrics[listFields[field2Show].variablesMetrics]
            colDefsObj.field = variableMetric.sourceColumn
            colDefsObj.headerName = variableMetric.headerName
            switch (variableMetric.type) {
              case 'decimal':
                colDefsObj.valueFormatter = decimalFormatter
                break
              case 'currency':
                colDefsObj.valueFormatter = currencyFormatter
                break
              case 'number':
                colDefsObj.valueFormatter = numberFormatter
                break
              case 'percent':
                colDefsObj.valueFormatter = percentFormatter
                break
              default:
                break
            }
            if (listFields[field2Show].link) {
              colDefsObj.cellRenderer = LinkComponent
              colDefsObj.cellRendererParams = {
                linkKey: conf.dataSources.staticSource.key,
                entity,
              }
              colDefsObj.pinned = 'left'
            }
            if (listFields[field2Show].sort) {
              colDefsObj.sort = listFields[field2Show].sort
            }
            if (listFields[field2Show].maxWidth) {
              colDefsObj.maxWidth = listFields[field2Show].maxWidth
            }
            if (listFields[field2Show].condition) {
              colDefsObj.cellClassRules = {
                'rag-green': 'x > 0',
                'rag-red': 'x < 0',
              }
            }
            colDefs.push(colDefsObj)
          })
          colDefs.push({
            field: 'change',
            cellRenderer: 'agSparklineCellRenderer',
            headerName: 'Weekly Trend',
            cellRendererParams: {
              sparklineOptions: {
                type: 'area',
                xKey: 'Week',
                yKey: trendSource.valueKey,
                marker: {
                  size: 3,
                },
              },
            },
          })
          setColumnDefs(colDefs)
        } else {
          const keys = Object.keys(rowD[0])
          keys.forEach((key) => {
            if (key === 'ID') {
              colDefs.push({ field: key, cellRenderer: 'LinkComponent' })
            } else {
              colDefs.push({ field: key })
            }
          })
          setColumnDefs(colDefs)
        }
      }
      setRowData(rowD)
    }
  }, [rowD, type, conf, entity])

  return (
    <Stack height={1} spacing={3}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4">{title}</Typography>
        <TextField label="Search" onChange={onFilterTextBoxChanged} size="small" focused />
      </Stack>
      <div id="myGrid" style={{ flexGrow: 1 }} className="ag-theme-material">
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          statusBar={{ statusBar }}
          sideBar={false}
          animateRows
          rowGroupPanelShow={false}
          rowHeight={25}
          cacheQuickFilter
          overlayLoadingTemplate={
            '<span class="ag-overlay-loading-center">This is a custom \'no rows\' overlay</span>'
          }
          overlayNoRowsTemplate={
            '<span style="padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow">Please wait while your data is loading</span>'
          }
        />
      </div>
    </Stack>
  )
}
