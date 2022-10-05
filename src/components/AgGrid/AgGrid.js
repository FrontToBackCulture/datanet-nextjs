// react
import React, { useCallback, useState, useEffect, useRef, useMemo } from 'react'
// next
import NextLink from 'next/link'
// @mui
import { Box, TextField, Stack, Typography } from '@mui/material'
// routes
import Routes from '../../../src/routes'
// other library
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-enterprise'
import 'ag-grid-enterprise/dist/styles/ag-grid.css'
import 'ag-grid-enterprise/dist/styles/ag-theme-balham-dark.css'
import 'ag-grid-enterprise/dist/styles/ag-theme-material.css'
// utils
import { fCurrency, fShortenNumber, fPercent, fNumber } from '../../utils/formatNumber'

export default function AGGrid({ rowD, type, conf, entity, title }) {
  const gridRef = useRef()
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), [])
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), [])
  const [gridApi, setGridApi] = useState()
  const [rowData, setRowData] = useState([])
  const [columnDefs, setColumnDefs] = useState([])
  const [entityConf, setEntityConf] = useState(conf)

  const onGridReady = (params) => {
    setGridApi(params)
    autoSizeAll(false)
  }

  const cellClassRules = {
    'cell-pass': (params) => params.value >= 0,
    'cell-fail': (params) => params.value < 0,
  }

  const onFirstDataRendered = useCallback((params) => {
    autoSizeAll(false)
    var padding = 20
    var height = headerHeightGetter() + padding
    gridRef.current.api.setHeaderHeight(height)
    gridRef.current.api.resetRowHeights()
  }, [])

  const defaultColDef = useMemo(() => {
    return {
      // allow every column to be aggregated
      enableValue: true,
      // allow every column to be grouped
      enableRowGroup: true,
      // allow every column to be pivoted
      enablePivot: true,
      sortable: true,
      filter: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeight: true,
    }
  }, [])

  const statusBar = useMemo(() => {
    return {
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
    }
  }, [])

  const sideBar = useMemo(() => {
    return {
      toolPanels: [
        {
          id: 'columns',
          labelDefault: 'Columns',
          labelKey: 'columns',
          iconKey: 'columns',
          toolPanel: 'agColumnsToolPanel',
          minWidth: 225,
          width: 225,
          maxWidth: 225,
        },
        {
          id: 'filters',
          labelDefault: 'Filters',
          labelKey: 'filters',
          iconKey: 'filter',
          toolPanel: 'agFiltersToolPanel',
          minWidth: 180,
          maxWidth: 400,
          width: 250,
        },
      ],
      position: 'right',
      defaultToolPanel: '',
    }
  }, [])

  const rowGroupPanelShow = 'always'

  const autoSizeAll = useCallback((skipHeader) => {
    const allColumnIds = []
    gridRef.current.columnApi.getColumns().forEach((column) => {
      allColumnIds.push(column.getId())
    })
    gridRef.current.columnApi.autoSizeColumns(allColumnIds, skipHeader)
  }, [])

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(document.getElementById('filter-text-box').value)
  }, [])

  function headerHeightGetter() {
    var columnHeaderTexts = [...document.querySelectorAll('.ag-header-cell-text')]
    var clientHeights = columnHeaderTexts.map((headerText) => headerText.clientHeight)
    var tallestHeaderTextHeight = Math.max(...clientHeights)

    return tallestHeaderTextHeight
  }

  const onBtShowLoading = useCallback(() => {
    gridRef.current.api.showLoadingOverlay()
  }, [])

  const onBtShowNoRows = useCallback(() => {
    gridRef.current.api.showNoRowsOverlay()
  }, [])

  function decimalFormatter(params) {
    if (params && params.value) {
      return fShortenNumber(params.value)
    } else {
      return 0
    }
  }

  function currencyFormatter(params) {
    if (params && params.value) {
      return fCurrency(params.value)
    } else {
      return 0
    }
  }

  function numberFormatter(params) {
    if (params && params.value) {
      return fNumber(params.value)
    } else {
      return 0
    }
  }

  function percentFormatter(params) {
    if (params && params.value) {
      return fPercent(params.value)
    } else {
      return 0
    }
  }

  function LinkComponent(props) {
    let { linkKey, data, value } = props
    let keyValue = data[linkKey]
    let link
    // replace special character to enable href to work
    if (keyValue) {
      link = keyValue.replace('/', '%2F')
    } else {
      link = ''
    }
    return (
      <NextLink
        href={{
          pathname: Routes[type].job(link),
          query: { entity: entity },
        }}
        passHref
      >
        <a>{value}</a>
      </NextLink>
    )
  }

  useEffect(() => {
    if (rowD && conf && entity) {
      setEntityConf(conf)
      const { dataSources, variablesMetrics, listFields, detailFields } = conf
      const { staticSource, metricSource, trendSource } = dataSources

      if (rowD && rowD.length > 0) {
        let colDefs = []
        if (listFields) {
          const fields2Show = Object.keys(listFields)
          fields2Show.forEach((field2Show) => {
            let colDefsObj = {}
            let variableMetric = conf['variablesMetrics'][listFields[field2Show].variablesMetrics]
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
                // set xKey and yKey to the keys which can be used to retrieve X and Y values from the supplied data
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
            if (key == 'ID') {
              colDefs.push({ field: key, cellRenderer: 'LinkComponent' })
            } else {
              colDefs.push({ field: key })
            }
          })
          setColumnDefs(colDefs)
        }
      }
      console.log('Columns:', columnDefs)
      console.log('Rows:', rowD)
      setRowData(rowD)
    }
  }, [rowD, type, conf, entity])

  return (
    <div style={containerStyle}>
      {/* <div style={gridStyle} className="ag-theme-alpine"> */}
      <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="filter-text-box"
            label="Search"
            color="secondary"
            onChange={onFilterTextBoxChanged}
            variant="outlined"
            size="small"
            focused
          />
        </Box>
      </Stack>
      <div id="myGrid" style={gridStyle} className="ag-theme-material">
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          statusBar={{ statusBar }}
          // sideBar={sideBar}
          sideBar={false}
          onGridReady={onGridReady}
          onFirstDataRendered={onFirstDataRendered}
          animateRows={true}
          domLayout={'autoHeight'}
          pagination={true}
          paginationPageSize={25}
          // rowGroupPanelShow={rowGroupPanelShow}
          rowGroupPanelShow={false}
          rowHeight={25}
          cacheQuickFilter={true}
          overlayLoadingTemplate={
            '<span class="ag-overlay-loading-center">This is a custom \'no rows\' overlay</span>'
          }
          overlayNoRowsTemplate={
            '<span style="padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow">Please wait while your data is loading</span>'
          }
          // frameworkComponents={{
          //   LinkComponent,
          // }}
        />
      </div>
    </div>
  )
}
