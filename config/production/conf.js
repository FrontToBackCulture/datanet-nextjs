const config = {
  promotion: {
    staticSource: {
      queryID: '4015',
      domain: 'saladstop',
      key: 'general_record_id',
    },
    metricSource: {
      queryID: '4019',
      domain: 'saladstop',
      key: 'Productid',
    },
    chartSource: {
      queryID: '4009',
      domain: 'saladstop',
      key: 'Productid',
      valueKey: 'sum_usr_fddbbbeabfb_6',
      groupKey: 'Transactiontime',
      title: 'Qty by weeks',
    },
    change: {
      valueKey: 'usr_0dc0dfcfbcc0_3',
    },
    listFields: {
      shortCode: { sourceColumn: 'Sku', link: true, type: 'string', headerName: 'Outlet' },
      name: { sourceColumn: 'shb068931cc450442b63f5b3d276ea4297', link: false, type: 'string' },
    },
    detailFields: {
      latestMetric: {
        sourceColumn: 'latestMetric',
        link: false,
        type: 'currency',
        headerName: 'Last Working Day Net Sales',
      },
    },
  },
  outlet: {
    staticSource: {
      queryID: '4012',
      domain: 'saladstop',
      key: 'Outlet',
    },
    metricSource: {
      queryID: '4007',
      domain: 'saladstop',
      key: 'expenses_store',
    },
    chartSource: {
      queryID: '4055',
      domain: 'saladstop',
      key: 'expenses_store',
      valueKey: 'usr_0dc0dfcfbcc0_3',
      groupKey: 'log_date',
      title: 'Daily Net Sales Last 3M',
    },
    change: {
      valueKey: 'usr_0dc0dfcfbcc0_3',
    },
    listFields: {
      shortCode: { sourceColumn: 'Outlet', link: true, type: 'string', headerName: 'Outlet' },
      name: { sourceColumn: 'Outlet Name', link: false, type: 'string', headerName: 'Name' },
      latestMetric: {
        sourceColumn: 'latestMetric',
        link: false,
        type: 'currency',
        headerName: 'Last Working Day Net Sales',
      },
      percentChangeMetric: {
        sourceColumn: 'changeMetricPercent',
        link: false,
        type: 'percent',
        headerName: 'Daily Net Sales % Δ',
        condition: 'cellClassRules',
      },
      metric2: {
        sourceColumn: 'sum_usr_0dc0dfcfbcc0_3',
        link: false,
        type: 'currency',
        sort: 'desc',
        headerName: 'Net Sales L3M',
      },
      metric3: {
        sourceColumn: 'max_usr_0dc0dfcfbcc0_3',
        link: false,
        type: 'currency',
        headerName: 'Daily Max Net Sales L3M',
      },
      metric4: {
        sourceColumn: 'min_usr_0dc0dfcfbcc0_3',
        link: false,
        type: 'currency',
        headerName: 'Daily Min Net Sales L3M',
      },
      metric5: {
        sourceColumn: 'average_usr_fc0dfcbade0ee0a0',
        link: false,
        type: 'number',
        headerName: 'Average Order Count',
      },
    },
    detailFields: {
      latestMetric: {
        sourceColumn: 'latestMetric',
        link: false,
        type: 'currency',
        headerName: 'Last Working Day Net Sales',
      },
      priorMetric: {
        sourceColumn: 'priorMetric',
        link: false,
        type: 'currency',
        headerName: 'Prior Working Day Net Sales',
      },
      metric1: {
        sourceColumn: 'changeMetricPercent',
        link: false,
        type: 'percent',
        headerName: 'Daily Net Sales % Δ',
        condition: 'cellClassRules',
      },
      metric2: {
        sourceColumn: 'sum_usr_0dc0dfcfbcc0_3',
        link: false,
        type: 'currency',
        headerName: 'Net Sales L3M',
      },
      metric3: {
        sourceColumn: 'max_usr_0dc0dfcfbcc0_3',
        link: false,
        type: 'currency',
        headerName: 'Daily Max Net Sales L3M',
      },
      metric4: {
        sourceColumn: 'min_usr_0dc0dfcfbcc0_3',
        link: false,
        type: 'currency',
        headerName: 'Daily Min Net Sales L3M',
      },
      metric5: {
        sourceColumn: 'average_usr_ffbba0b0ddcf00c0',
        link: false,
        type: 'currency',
        headerName: 'Avg Order Value',
      },
      metric6: {
        sourceColumn: 'sum_usr_fc0dfcbade0ee0a0',
        link: false,
        type: 'number',
        headerName: 'Order Count L3M',
      },
      metric7: {
        sourceColumn: 'average_usr_fc0dfcbade0ee0a0',
        link: false,
        type: 'number',
        headerName: 'Avg Daily Order Count',
      },
    },
  },
  product: {
    staticSource: {
      queryID: '4015',
      domain: 'saladstop',
      key: 'general_record_id',
    },
    metricSource: {
      queryID: '4019',
      domain: 'saladstop',
      key: 'Productid',
    },
    chartSource: {
      queryID: '4009',
      domain: 'saladstop',
      key: 'Productid',
      valueKey: 'sum_usr_fddbbbeabfb_6',
      groupKey: 'Transactiontime',
      title: 'Qty by weeks',
    },
    change: {
      valueKey: 'usr_0dc0dfcfbcc0_3',
    },
    listFields: {
      shortCode: { sourceColumn: 'Sku', link: true, type: 'string', headerName: 'Outlet' },
      name: { sourceColumn: 'shb068931cc450442b63f5b3d276ea4297', link: false, type: 'string' },
    },
    detailFields: {
      latestMetric: {
        sourceColumn: 'latestMetric',
        link: false,
        type: 'currency',
        headerName: 'Last Working Day Net Sales',
      },
    },
  },
  navConfig: [
    // { title: 'Home', path: '/', code: 'home' },
    { title: 'Outlets', code: 'outlet' },
    { title: 'Products', code: 'product' },
    { title: 'Promotions', code: 'promotion' },
  ],
};

function getConfig(code) {
  return config[code];
}

module.exports = {
  getConfig,
};
