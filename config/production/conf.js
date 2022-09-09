const config = {
  outlet: {
    staticSource: {
      queryID: '4012',
      domain: 'saladstop',
      key: 'Outlet',
    },
    metricSource: {
      queryID: '4007',
      domain: 'saladstop',
      key: 'Store',
    },
    chartSource: {
      queryID: '4055',
      domain: 'saladstop',
      key: 'Store',
      valueKey: 'Net Sales',
      groupKey: 'Date',
      title: 'Daily Net Sales Last 3M',
    },
    change: {
      valueKey: 'Net Sales',
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
        sourceColumn: 'sum Net Sales',
        link: false,
        type: 'currency',
        sort: 'desc',
        headerName: 'Net Sales L3M',
      },
      metric3: {
        sourceColumn: 'max Net Sales',
        link: false,
        type: 'currency',
        headerName: 'Daily Max Net Sales L3M',
      },
      metric4: {
        sourceColumn: 'min Net Sales',
        link: false,
        type: 'currency',
        headerName: 'Daily Min Net Sales L3M',
      },
      metric5: {
        sourceColumn: 'average Order Count',
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
        sourceColumn: 'sum Net Sales',
        link: false,
        type: 'currency',
        headerName: 'Net Sales L3M',
      },
      metric3: {
        sourceColumn: 'max Net Sales',
        link: false,
        type: 'currency',
        headerName: 'Daily Max Net Sales L3M',
      },
      metric4: {
        sourceColumn: 'min Net Sales',
        link: false,
        type: 'currency',
        headerName: 'Daily Min Net Sales L3M',
      },
      metric5: {
        sourceColumn: 'average Average Order Value',
        link: false,
        type: 'currency',
        headerName: 'Avg Order Value',
      },
      metric6: {
        sourceColumn: 'sum Order Count',
        link: false,
        type: 'number',
        headerName: 'Order Count L3M',
      },
      metric7: {
        sourceColumn: 'average Order Count',
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
      key: 'sh582d2adc6fd60fae17556aeb80b219c5',
    },
    chartSource: {
      queryID: '4009',
      domain: 'saladstop',
      key: 'sh582d2adc6fd60fae17556aeb80b219c5',
      valueKey: 'sum_sh9bcafdf80f8756fa2d73444ea3dd0984',
      groupKey: 'sh7934c3bfee3ea2dc3b95c1c2662cf87b',
      title: 'Daily Qty Sold Last 3M',
    },
    change: {
      valueKey: 'sum_sh9bcafdf80f8756fa2d73444ea3dd0984',
    },
    listFields: {
      shortCode: {
        sourceColumn: 'general_record_id',
        link: true,
        type: 'string',
        headerName: 'Product ID',
      },
      name: {
        sourceColumn: 'shb068931cc450442b63f5b3d276ea4297',
        link: false,
        type: 'string',
        headerName: 'Name',
      },
      latestMetric: {
        sourceColumn: 'latestMetric',
        link: false,
        type: 'number',
        headerName: 'Last Working Day Qty Sold',
      },
      percentChangeMetric: {
        sourceColumn: 'changeMetricPercent',
        link: false,
        type: 'percent',
        headerName: 'Daily Net Sales % Δ',
        condition: 'cellClassRules',
      },
      metric1: {
        sourceColumn: 'sum_shb4375105ab5dd981a5cdc88f89d5fe90',
        link: false,
        type: 'number',
        sort: 'desc',
        headerName: 'Order Count L3M',
      },
      metric2: {
        sourceColumn: 'sum_shb4375105ab5dd981a5cdc88f89d5fe90',
        link: false,
        type: 'currency',
        headerName: 'Net Sales L3M',
      },
      metric3: {
        sourceColumn: 'sum_shb4375105ab5dd981a5cdc88f89d5fe90',
        link: false,
        type: 'currency',
        headerName: 'Discount L3M',
      },
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
    // { title: 'Promotions', code: 'promotion' },
  ],
};

function getConfig(code) {
  return config[code];
}

module.exports = {
  getConfig,
};
