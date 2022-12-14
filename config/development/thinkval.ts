import { Config } from '../configType'

const config: Config = {
  general: {
    companyName: '',
    companyDescription: '',
    logoLocation: '',
  },
  navConfig: [
    // { title: 'Home', path: '/', code: 'home' },
    // { title: 'Outlets', code: 'outlet' },
    // { title: 'Products', code: 'product' },
    // { title: 'Promotions', code: 'promotion' },
  ],
  entities: {
    // outlet: {
    //   staticSource: {
    //     queryID: '4012',
    //     domain: 'saladstop',
    //     key: 'Outlet',
    //   },
    //   metricSource: {
    //     queryID: '4007',
    //     domain: 'saladstop',
    //     key: 'Store',
    //   },
    //   chartSource: {
    //     queryID: '4055',
    //     domain: 'saladstop',
    //     key: 'Store',
    //     valueKey: 'Net Sales',
    //     groupKey: 'Date',
    //     title: 'Daily Net Sales Last 3M',
    //   },
    //   change: {
    //     valueKey: 'Net Sales',
    //   },
    //   listFields: {
    //     shortCode: {
    //       sourceColumn: 'Outlet',
    //       link: true,
    //       type: 'string',
    //       headerName: 'Outlet',
    //       maxWidth: 150,
    //     },
    //     name: {
    //       sourceColumn: 'Outlet Name',
    //       link: false,
    //       type: 'string',
    //       headerName: 'Name',
    //     },
    //     latestMetric: {
    //       sourceColumn: 'latestMetric',
    //       link: false,
    //       type: 'currency',
    //       headerName: 'Last Working Day Net Sales',
    //       maxWidth: 150,
    //     },
    //     percentChangeMetric: {
    //       sourceColumn: 'changeMetricPercent',
    //       link: false,
    //       type: 'percent',
    //       headerName: 'Daily Net Sales % Δ',
    //       condition: 'cellClassRules',
    //       maxWidth: 150,
    //     },
    //     metric2: {
    //       sourceColumn: 'sum Net Sales',
    //       link: false,
    //       type: 'currency',
    //       sort: 'desc',
    //       headerName: 'Net Sales L3M',
    //       maxWidth: 150,
    //     },
    //     metric3: {
    //       sourceColumn: 'max Net Sales',
    //       link: false,
    //       type: 'currency',
    //       headerName: 'Daily Max Net Sales L3M',
    //       maxWidth: 150,
    //     },
    //     metric4: {
    //       sourceColumn: 'min Net Sales',
    //       link: false,
    //       type: 'currency',
    //       headerName: 'Daily Min Net Sales L3M',
    //       maxWidth: 150,
    //     },
    //     metric5: {
    //       sourceColumn: 'average Order Count',
    //       link: false,
    //       type: 'number',
    //       headerName: 'Average Order Count',
    //       maxWidth: 150,
    //     },
    //   },
    //   detailFields: {
    //     latestMetric: {
    //       sourceColumn: 'latestMetric',
    //       link: false,
    //       type: 'currency',
    //       headerName: 'Last Working Day Net Sales',
    //     },
    //     priorMetric: {
    //       sourceColumn: 'priorMetric',
    //       link: false,
    //       type: 'currency',
    //       headerName: 'Prior Working Day Net Sales',
    //     },
    //     metric1: {
    //       sourceColumn: 'changeMetricPercent',
    //       link: false,
    //       type: 'percent',
    //       headerName: 'Daily Net Sales % Δ',
    //       condition: 'cellClassRules',
    //     },
    //     metric2: {
    //       sourceColumn: 'sum Net Sales',
    //       link: false,
    //       type: 'currency',
    //       headerName: 'Net Sales L3M',
    //     },
    //     metric3: {
    //       sourceColumn: 'max Net Sales',
    //       link: false,
    //       type: 'currency',
    //       headerName: 'Daily Max Net Sales L3M',
    //     },
    //     metric4: {
    //       sourceColumn: 'min Net Sales',
    //       link: false,
    //       type: 'currency',
    //       headerName: 'Daily Min Net Sales L3M',
    //     },
    //     metric5: {
    //       sourceColumn: 'average Average Order Value',
    //       link: false,
    //       type: 'currency',
    //       headerName: 'Avg Order Value',
    //     },
    //     metric6: {
    //       sourceColumn: 'sum Order Count',
    //       link: false,
    //       type: 'number',
    //       headerName: 'Order Count L3M',
    //     },
    //     metric7: {
    //       sourceColumn: 'average Order Count',
    //       link: false,
    //       type: 'number',
    //       headerName: 'Avg Daily Order Count',
    //     },
    //   },
    //   channelPerformanceSource: {
    //     queryID: '4097',
    //     domain: 'saladstop',
    //     key: 'Store',
    //     valueKey: 'sum Net Sales',
    //     groupPeriodKey: 'Transaction Date',
    //     groupKey: 'Order Channel',
    //     title: 'Performance Trend by Channel',
    //   },
    //   channelFields: {
    //     latestMetric: {
    //       sourceColumn: 'latestMetric',
    //       link: false,
    //       type: 'currency',
    //       headerName: 'Last Working Day Net Sales',
    //     },
    //     priorMetric: {
    //       sourceColumn: 'priorMetric',
    //       link: false,
    //       type: 'currency',
    //       headerName: 'Prior Working Day Net Sales',
    //     },
    //     metric1: {
    //       sourceColumn: 'changeMetricPercent',
    //       link: false,
    //       type: 'percent',
    //       headerName: 'Daily Net Sales % Δ',
    //       condition: 'cellClassRules',
    //     },
    //     metric2: {
    //       sourceColumn: 'aggregateMetric',
    //       link: false,
    //       type: 'currency',
    //       headerName: 'Net Sales Last 3M',
    //     },
    //     metric3: {
    //       sourceColumn: 'maxMetric',
    //       link: false,
    //       type: 'currency',
    //       headerName: 'Max Daily Net Sales Last 3M',
    //     },
    //     metric4: {
    //       sourceColumn: 'minMetric',
    //       link: false,
    //       type: 'currency',
    //       headerName: 'Min Daily Net Sales Last 3M',
    //     },
    //   },
    // },
    // product: {
    //   staticSource: {
    //     queryID: '4015',
    //     domain: 'saladstop',
    //     key: 'ID',
    //   },
    //   metricSource: {
    //     queryID: '4019',
    //     domain: 'saladstop',
    //     key: 'Productid',
    //   },
    //   chartSource: {
    //     queryID: '4009',
    //     domain: 'saladstop',
    //     key: 'Productid',
    //     valueKey: 'sum Quantity',
    //     groupKey: 'Transactiontime',
    //     title: 'Daily Qty Sold Last 3M',
    //   },
    //   change: {
    //     valueKey: 'sum Quantity',
    //   },
    //   listFields: {
    //     shortCode: {
    //       sourceColumn: 'ID',
    //       link: true,
    //       type: 'string',
    //       headerName: 'Product ID',
    //       maxWidth: 150,
    //     },
    //     name: {
    //       sourceColumn: 'Name',
    //       link: false,
    //       type: 'string',
    //       headerName: 'Name',
    //     },
    //     latestMetric: {
    //       sourceColumn: 'latestMetric',
    //       link: false,
    //       type: 'number',
    //       headerName: 'Last Working Day Qty Sold',
    //       maxWidth: 150,
    //     },
    //     percentChangeMetric: {
    //       sourceColumn: 'changeMetricPercent',
    //       link: false,
    //       type: 'percent',
    //       headerName: 'Daily Qty Sold % Δ',
    //       condition: 'cellClassRules',
    //       maxWidth: 150,
    //     },
    //     metric1: {
    //       sourceColumn: 'sum Quantity',
    //       link: false,
    //       type: 'number',
    //       sort: 'desc',
    //       headerName: 'Qty Sold L3M',
    //       maxWidth: 150,
    //     },
    //     metric2: {
    //       sourceColumn: 'sum Total',
    //       link: false,
    //       type: 'currency',
    //       headerName: 'Net Sales L3M',
    //       maxWidth: 150,
    //     },
    //     metric3: {
    //       sourceColumn: 'sum Discount',
    //       link: false,
    //       type: 'currency',
    //       headerName: 'Discount L3M',
    //       maxWidth: 150,
    //     },
    //   },
    //   detailFields: {
    //     latestMetric: {
    //       sourceColumn: 'latestMetric',
    //       link: false,
    //       type: 'number',
    //       headerName: 'Last Working Day Qty Sold',
    //     },
    //     priorMetric: {
    //       sourceColumn: 'priorMetric',
    //       link: false,
    //       type: 'number',
    //       headerName: 'Prior Working Day Qty Sold',
    //     },
    //     metric1: {
    //       sourceColumn: 'changeMetricPercent',
    //       link: false,
    //       type: 'percent',
    //       headerName: 'Daily Qty Sold % Δ',
    //       condition: 'cellClassRules',
    //     },
    //     metric2: {
    //       sourceColumn: 'sum Quantity',
    //       link: false,
    //       type: 'number',
    //       headerName: 'Qty Sold L3M',
    //     },
    //     metric3: {
    //       sourceColumn: 'sum Total',
    //       link: false,
    //       type: 'currency',
    //       headerName: 'Net Sales L3M',
    //     },
    //     metric4: {
    //       sourceColumn: 'sum Discount',
    //       link: false,
    //       type: 'currency',
    //       headerName: 'Discount L3M',
    //     },
    //   },
    // },
    // promotion: {
    //   staticSource: {
    //     queryID: '4030',
    //     domain: 'saladstop',
    //     key: 'Storehub Product ID',
    //   },
    //   metricSource: {
    //     queryID: '4031',
    //     domain: 'saladstop',
    //     key: 'Productid',
    //   },
    //   chartSource: {
    //     queryID: '4032',
    //     domain: 'saladstop',
    //     key: 'Productid',
    //     valueKey: 'sum Quantity',
    //     groupKey: 'Transactiontime',
    //     title: 'Daily Qty Promo Used Last 3M',
    //   },
    //   change: {
    //     valueKey: 'sum Quantity',
    //   },
    //   listFields: {
    //     shortCode: {
    //       sourceColumn: 'Storehub Product ID',
    //       link: true,
    //       type: 'string',
    //       headerName: 'Promo ID',
    //       maxWidth: 150,
    //     },
    //     name: {
    //       sourceColumn: 'POS Button Storehub',
    //       link: false,
    //       type: 'string',
    //       headerName: 'Name',
    //     },
    //     latestMetric: {
    //       sourceColumn: 'latestMetric',
    //       link: false,
    //       type: 'number',
    //       headerName: 'Last Working Day Qty Used',
    //       maxWidth: 150,
    //     },
    //     percentChangeMetric: {
    //       sourceColumn: 'changeMetricPercent',
    //       link: false,
    //       type: 'percent',
    //       headerName: 'Daily Promo Used % Δ',
    //       condition: 'cellClassRules',
    //       maxWidth: 150,
    //     },
    //     metric1: {
    //       sourceColumn: 'sum Quantity',
    //       link: false,
    //       type: 'number',
    //       sort: 'desc',
    //       headerName: 'Promo Used Count L3M',
    //       maxWidth: 150,
    //     },
    //   },
    //   detailFields: {
    //     latestMetric: {
    //       sourceColumn: 'latestMetric',
    //       link: false,
    //       type: 'number',
    //       headerName: 'Last Working Day Promo Qty Used',
    //     },
    //     priorMetric: {
    //       sourceColumn: 'priorMetric',
    //       link: false,
    //       type: 'number',
    //       headerName: 'Prior Working Day Promo Qty Used',
    //     },
    //     metric1: {
    //       sourceColumn: 'changeMetricPercent',
    //       link: false,
    //       type: 'percent',
    //       headerName: 'Daily Qty Promo Used % Δ',
    //       condition: 'cellClassRules',
    //     },
    //     metric2: {
    //       sourceColumn: 'sum Quantity',
    //       link: false,
    //       type: 'number',
    //       headerName: 'Promo Used Count L3M',
    //     },
    //   },
    // },
  },
}

export default config
