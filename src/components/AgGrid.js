// next
import NextLink from 'next/link';
// routes
import Routes from '../../src/routes';

import React, { useCallback, useState, useEffect, useRef, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-enterprise/dist/styles/ag-grid.css';
import 'ag-grid-enterprise/dist/styles/ag-theme-balham-dark.css';
import 'ag-grid-enterprise/dist/styles/ag-theme-material.css';

// utils
import { fCurrency, fShortenNumber, fPercent } from '../utils/formatNumber';

export default function AGGrid({ rowD, type, fieldConf, fullConf, entity }) {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [gridApi, setGridApi] = useState();
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);
  const [entityConf, setEntityConf] = useState(fullConf);

  const onGridReady = (params) => {
    setGridApi(params);
    autoSizeAll(false);
  };

  const cellClassRules = {
    'cell-pass': (params) => params.value >= 0,
    'cell-fail': (params) => params.value < 0,
  };

  const onFirstDataRendered = useCallback((params) => {
    autoSizeAll(false);
  }, []);

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
    };
  }, []);

  function LinkComponent(props) {
    // console.log('Link: ', entity, entityConf);
    let link;
    if (props.value) {
      link = props.value.replace('/', '%2F');
    } else {
      link = '';
    }
    return (
      <NextLink
        // key={id}
        // as={Routes[type].job(link)}
        href={{
          // pathname: Routes[type].job('[id]'),
          pathname: Routes[type].job(link),
          query: { entity: entity },
        }}
        passHref
      >
        <a>{props.value}</a>
      </NextLink>
    );
  }

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
    };
  }, []);

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
    };
  }, []);

  const rowGroupPanelShow = 'always';

  function decimalFormatter(params) {
    if (params && params.value) {
      return fShortenNumber(params.value);
    } else {
      return 0;
    }
  }

  function currencyFormatter(params) {
    if (params && params.value) {
      return fCurrency(params.value);
    } else {
      return 0;
    }
  }

  function numberFormatter(params) {
    if (params && params.value) {
      return fShortenNumber(params.value);
    } else {
      return 0;
    }
  }

  function percentFormatter(params) {
    if (params && params.value) {
      return fPercent(params.value);
    } else {
      return 0;
    }
  }

  const autoSizeAll = useCallback((skipHeader) => {
    const allColumnIds = [];
    gridRef.current.columnApi.getColumns().forEach((column) => {
      allColumnIds.push(column.getId());
    });
    gridRef.current.columnApi.autoSizeColumns(allColumnIds, skipHeader);
  }, []);

  useEffect(() => {
    if (fullConf) {
      setEntityConf(fullConf);
    }
    if (rowD && fullConf && entity) {
      // console.log('AG GRID USE: ', fullConf, entity);
      if (rowD && rowD.length > 0) {
        let colDefs = [];
        if (fieldConf) {
          const fields2Show = Object.keys(fieldConf);
          fields2Show.forEach((field2Show) => {
            let colDefsObj = {};
            colDefsObj.field = fieldConf[field2Show].sourceColumn;
            if (fieldConf[field2Show].link) {
              colDefsObj.cellRenderer = LinkComponent;
              colDefsObj.pinned = 'left';
            }
            if (fieldConf[field2Show].sort) {
              colDefsObj.sort = fieldConf[field2Show].sort;
            }
            if (fieldConf[field2Show].headerName) {
              colDefsObj.headerName = fieldConf[field2Show].headerName;
            }
            if (fieldConf[field2Show].condition) {
              colDefsObj.cellClassRules = {
                'rag-green': 'x > 0',
                'rag-amber': 'x >= 20 && x < 25',
                'rag-red': 'x < 0',
              };
            }
            switch (fieldConf[field2Show].type) {
              case 'decimal':
                colDefsObj.valueFormatter = decimalFormatter;
                break;
              case 'currency':
                colDefsObj.valueFormatter = currencyFormatter;
                break;
              case 'number':
                colDefsObj.valueFormatter = numberFormatter;
                break;
              case 'percent':
                colDefsObj.valueFormatter = percentFormatter;
                break;
              default:
                break;
            }
            colDefs.push(colDefsObj);
          });
          setColumnDefs(colDefs);
        } else {
          const keys = Object.keys(rowD[0]);
          keys.forEach((key) => {
            if (key == 'ID') {
              colDefs.push({ field: key, cellRenderer: 'LinkComponent' });
            } else {
              colDefs.push({ field: key });
            }
          });
          setColumnDefs(colDefs);
        }
      }
      setRowData(rowD);
    }
  }, [rowD, type, fieldConf, fullConf, entity]);

  // useEffect(() => {
  //   console.log('AG GRID USE: ', rowD, type, fieldConf, fullConf, entity);
  // }, [rowD, type, fieldConf, fullConf, entity]);

  return (
    <div style={containerStyle}>
      {/* <div style={gridStyle} className="ag-theme-alpine"> */}
      <div id="myGrid" style={gridStyle} className="ag-theme-material">
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          statusBar={{ statusBar }}
          sideBar={sideBar}
          onGridReady={onGridReady}
          onFirstDataRendered={onFirstDataRendered}
          animateRows={true}
          domLayout={'autoHeight'}
          pagination={true}
          paginationPageSize={25}
          rowGroupPanelShow={rowGroupPanelShow}
          rowHeight={30}
          // frameworkComponents={{
          //   LinkComponent,
          // }}
        />
      </div>
    </div>
  );
}
