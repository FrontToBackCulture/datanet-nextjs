import React, { useCallback, useRef, useContext } from 'react'
import NextLink from 'next/link'
import { TextField, Stack, Typography } from '@mui/material'
import { AgGridReact } from 'ag-grid-react'
import { DomainContext } from 'src/contexts/DomainProvider'
import 'ag-grid-enterprise'
import 'ag-grid-enterprise/dist/styles/ag-grid.css'
import 'ag-grid-enterprise/dist/styles/ag-theme-balham-dark.css'
import 'ag-grid-enterprise/dist/styles/ag-theme-material.css'
import { fCurrency, fShortenNumber, fPercent, fNumber } from '../../utils/formatNumber'

function LinkComponent({ linkKey, data, value, entity }) {
  const keyValue = data[linkKey]
  const selectedDomain = useContext(DomainContext)

  const link = keyValue ? keyValue.replace('/', '%2F') : ''

  const href = `/list/${selectedDomain}/${entity}/${link}`

  return (
    <NextLink href={{ pathname: href }} passHref>
      <a href={href}>{value}</a>
    </NextLink>
  )
}

const getFormatter = (type) => {
  switch (type) {
    case 'decimal':
      return fShortenNumber
    case 'currency':
      return fCurrency
    case 'number':
      return fNumber
    case 'percent':
      return fPercent
    default:
      return (x) => x
  }
}

export default function AGGrid({ rowData, conf, entity, title }) {
  const gridRef = useRef()
  let columnDefs = []

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(document.getElementById('filter-text-box').value)
  }, [])

  if (rowData && conf && entity) {
    const { dataSources, listFields } = conf
    const { trendSource } = dataSources

    if (listFields) {
      columnDefs = Object.keys(listFields).map((field2Show) => {
        const variableMetric = conf.variablesMetrics[listFields[field2Show].variablesMetrics]
        const colDefsObj = {
          field: variableMetric.sourceColumn,
          headerName: variableMetric.headerName,
          valueFormatter: (params) => getFormatter(variableMetric.type)(params.value),
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
        return colDefsObj
      })
      columnDefs.push({
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
    } else {
      columnDefs = Object.keys(rowData[0]).map((key) => ({
        field: key,
        cellRenderer: key === 'ID' ? 'LinkComponent' : undefined,
      }))
    }
  }

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
          defaultColDef={{
            enableValue: true,
            enableRowGroup: true,
            enablePivot: true,
            sortable: true,
            filter: true,
            resizable: true,
            wrapHeaderText: true,
          }}
          statusBar={{
            statusBar: {
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
            },
          }}
          animateRows
          rowHeight={25}
          cacheQuickFilter
        />
      </div>
    </Stack>
  )
}
