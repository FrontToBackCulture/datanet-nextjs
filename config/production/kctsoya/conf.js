const config = {
  product: {
    staticSource: {
      queryID: '82',
      domain: 'kctsoya',
      key: 'Stock ID',
    },
    metricSource: {
      queryID: '85',
      domain: 'kctsoya',
      key: 'Stk ID',
    },
    chartSource: {
      queryID: '84',
      domain: 'kctsoya',
      key: 'Stk ID',
      valueKey: 'sum SGD Net Price',
      groupKey: 'Doc Date',
      title: 'Net Sales Trend',
    },
    change: {
      valueKey: 'sum SGD Net Price',
    },
    listFields: {
      shortCode: {
        sourceColumn: 'Stock ID',
        link: true,
        type: 'string',
        headerName: 'Stock ID',
        maxWidth: 150,
      },
      name: {
        sourceColumn: 'Product Name',
        link: false,
        type: 'string',
        headerName: 'Name',
      },
      latestMetric: {
        sourceColumn: 'latestMetric',
        link: false,
        type: 'number',
        headerName: 'Last Working Day  Net Price',
        maxWidth: 150,
      },
      percentChangeMetric: {
        sourceColumn: 'changeMetricPercent',
        link: false,
        type: 'percent',
        headerName: 'Daily  Net Price % Δ',
        condition: 'cellClassRules',
        maxWidth: 150,
      },
      metric1: {
        sourceColumn: 'sum Stk Qty',
        link: false,
        type: 'number',
        sort: 'desc',
        headerName: 'Qty Sold L3M',
        maxWidth: 150,
      },
    },
    detailFields: {
      latestMetric: {
        sourceColumn: 'latestMetric',
        link: false,
        type: 'number',
        headerName: 'Last Working Day  Net Price',
        maxWidth: 150,
      },
      percentChangeMetric: {
        sourceColumn: 'changeMetricPercent',
        link: false,
        type: 'percent',
        headerName: 'Daily  Net Price % Δ',
        condition: 'cellClassRules',
        maxWidth: 150,
      },
      metric1: {
        sourceColumn: 'sum Stk Qty',
        link: false,
        type: 'number',
        sort: 'desc',
        headerName: 'Qty Sold L3M',
        maxWidth: 150,
      },
    },
  },
  navConfig: [
    // { title: 'Home', path: '/', code: 'home' },
    { title: 'Products', code: 'product' },
  ],
}

function getConfig(code) {
  return config[code]
}

module.exports = {
  getConfig,
}
