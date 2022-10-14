import { Config } from '../configType'

const config: Config = {
  general: {
    companyName: '',
    companyDescription: '',
    logoLocation: '',
  },
  navConfig: [{ title: 'Products', code: 'product' }],
  entities: {
    product: {
      dataSources: {
        staticSource: {
          queryID: '82',
          domain: 'kctsoya',
          key: 'Stock ID',
          contentType: 'static',
          name: 'productStatic',
        },
        metricSource: {
          queryID: '85',
          domain: 'kctsoya',
          key: 'Stk ID',
          contentType: 'metric',
          name: 'productMetrics',
        },
        trendSource: {
          queryID: '84',
          domain: 'kctsoya',
          key: 'Stk ID',
          contentType: 'trend',
          name: 'productNetSalesTrend',
          valueKey: 'sum SGD Net Price',
          groupKey: 'Doc Date',
          title: 'Net Sales Trend',
        },
      },
      calculatedMetrics: {
        lastWorkingDayQtySales: {
          // dataSource: 'mergeStaticMetric',
          timeseriesSource: 'productNetSalesTrend',
          columnName: 'latestMetric',
          calcType: 'latest',
        },
        priorWorkingDayQtySales: {
          // dataSource: 'mergeStaticMetric',
          timeseriesSource: 'productNetSalesTrend',
          columnName: 'priorMetric',
          calcType: '2ndLatest',
        },
        changeWorkingDayQtySales: {
          // dataSource: 'mergeStaticMetric',
          columnName: 'changeMetric',
          calcType: 'formula',
          formula: 'latestMetric-priorMetric',
        },
        percentChangeWorkingDayQtySales: {
          // dataSource: 'mergeStaticMetric',
          columnName: 'changeMetricPercent',
          calcType: 'formula',
          formula: 'changeMetric/priorMetric',
        },
        weeklyTrend: {
          // dataSource: 'mergeStaticMetric',
          columnName: 'change',
          calcType: 'weeklyTrend',
        },
      },
      variablesMetrics: {
        productShortCode: {
          // dataSource: 'staticSource',
          sourceColumn: 'Stock ID',
          type: 'string',
          headerName: 'Stock ID',
          description: '',
        },
        productName: {
          // dataSource: 'staticSource',
          sourceColumn: 'Product Name',
          type: 'string',
          headerName: 'Name',
          description: '',
        },
        lastWorkingDaySales: {
          sourceColumn: 'latestMetric',
          type: 'currency',
          headerName: 'Last Working Day Sales',
        },
        priorWorkingDaySales: {
          sourceColumn: 'priorMetric',
          type: 'currency',
          headerName: 'Prior Working Day Sales',
        },
        workingDayNetSalesPercentChange: {
          sourceColumn: 'changeMetricPercent',
          type: 'percent',
          headerName: 'Daily Sales % Δ',
        },
        sumQuantity: {
          sourceColumn: 'sum Stk Qty',
          type: 'number',
          headerName: 'Qty Sold L3M',
        },
      },
      listFields: {
        name: {
          variablesMetrics: 'productName',
          link: true,
          maxWidth: 250,
        },
        latestMetric: {
          variablesMetrics: 'lastWorkingDaySales',
          maxWidth: 150,
        },
        percentChangeMetric: {
          variablesMetrics: 'workingDayNetSalesPercentChange',
          condition: 'cellClassRules',
          maxWidth: 150,
        },
        metric3: {
          variablesMetrics: 'sumQuantity',
          maxWidth: 150,
          sort: 'desc',
        },
      },
      detailFields: {
        overview: {
          name: 'Summary',
          chart: {
            dataSource: 'trendSource',
          },
          table: {
            metric1: {
              variablesMetrics: 'lastWorkingDaySales',
            },
            metric2: {
              variablesMetrics: 'priorWorkingDaySales',
            },
            metric3: {
              variablesMetrics: 'workingDayNetSalesPercentChange',
            },
            metric4: {
              variablesMetrics: 'sumQuantity',
            },
          },
        },
      },
    },
  },
}

export default config
