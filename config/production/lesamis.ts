import { Config } from '../configType'

const config: Config = {
  general: {
    companyName: '',
    companyDescription: '',
    logoLocation: '',
  },
  navConfig: [
    { title: 'Outlets', code: 'outlet' },
    // { title: 'Products', code: 'product' },
    // { title: 'Promotions', code: 'promotion' },
  ],
  entities: {
    outlet: {
      dataSources: {
        staticSource: {
          queryID: '236',
          domain: 'lesamis',
          key: 'Outlet',
          contentType: 'static',
          name: 'outletStatic',
        },
        metricSource: {
          queryID: '236',
          domain: 'lesamis',
          key: 'Outlet',
          contentType: 'metric',
          name: 'outletMetrics',
        },
        trendSource: {
          queryID: '237',
          domain: 'lesamis',
          key: 'Outlet',
          contentType: 'trend',
          name: 'outletNetSalesTrend',
          valueKey: 'sum Totals before tax(Merchant)',
          groupKey: 'Serving Date',
          title: 'Daily Net Sales Last 30D',
        },
        tab1Chart: {
          queryID: '238',
          domain: 'lesamis',
          key: 'Outlet',
          contentType: 'channel',
          name: 'outletChannelTrend',
          valueKey: 'sum Totals before tax(Merchant)',
          groupKey: 'Source Label',
          groupPeriodKey: 'Serving Date',
          title: 'Outlet Performance Trend by Channel 30D',
        },
      },
      calculatedMetrics: {
        lastWorkingDayNetSales: {
          timeseriesSource: 'outletNetSalesTrend',
          columnName: 'latestMetric',
          calcType: 'latest',
        },
        priorWorkingDayNetSales: {
          timeseriesSource: 'outletNetSalesTrend',
          columnName: 'priorMetric',
          calcType: '2ndLatest',
        },
        changeWorkingDayNetSales: {
          columnName: 'changeMetric',
          calcType: 'formula',
          formula: 'latestMetric-priorMetric',
        },
        percentChangeWorkingDayNetSales: {
          columnName: 'changeMetricPercent',
          calcType: 'formula',
          formula: 'changeMetric/priorMetric',
        },
        weeklyTrend: { columnName: 'change', calcType: 'weeklyTrend' },
      },
      variablesMetrics: {
        outletShortCode: { sourceColumn: 'Outlet', type: 'string', headerName: 'Outlet' },
        outletName: { sourceColumn: 'Outlet', type: 'string', headerName: 'Outlet Name' },
        lastWorkingDayNetSales: {
          sourceColumn: 'latestMetric',
          type: 'currency',
          headerName: 'Last Working Day Net Sales',
        },
        priorWorkingDayNetSales: {
          sourceColumn: 'priorMetric',
          type: 'currency',
          headerName: 'Prior Working Day Net Sales',
        },
        workingDayNetSalesPercentChange: {
          sourceColumn: 'changeMetricPercent',
          type: 'percent',
          headerName: 'Daily Net Sales % Δ',
        },
        outletSumNetSalesL30D: {
          sourceColumn: 'sum Totals before tax(Merchant)',
          type: 'currency',
          headerName: 'Net Sales L30D',
        },
        averageOrderValueL30D: {
          sourceColumn: 'average Totals before tax(Merchant)',
          type: 'currency',
          headerName: 'Average Order Value',
        },
        sumOrderCountL30D: {
          sourceColumn: 'count ID',
          type: 'number',
          headerName: 'Order Count L30D',
        },
        lastWorkingDayChannelNetSales: {
          sourceColumn: 'latestMetric',
          type: 'currency',
          headerName: 'Last Working Day Net Sales',
        },
        priorWorkingDayChannelNetSales: {
          sourceColumn: 'priorMetric',
          type: 'currency',
          headerName: 'Prior Working Day Net Sales',
        },
        workingDayChannelNetSalesPercentChange: {
          sourceColumn: 'changeMetricPercent',
          type: 'percent',
          headerName: 'Daily Net Sales % Δ',
        },
        outletSumChannelNetSalesL30D: {
          sourceColumn: 'aggregateMetric',
          type: 'currency',
          headerName: 'Net Sales L30D',
        },
        maxChannelNetSalesL30D: {
          sourceColumn: 'maxMetric',
          type: 'currency',
          headerName: 'Daily Max Net Sales L30D',
        },
        minChannelNetSalesL30D: {
          sourceColumn: 'minMetric',
          type: 'currency',
          headerName: 'Daily Min Net Sales L30D',
        },
      },
      listFields: {
        name: { variablesMetrics: 'outletName', maxWidth: 250, link: true },
        latestMetric: { variablesMetrics: 'lastWorkingDayNetSales', maxWidth: 150 },
        percentChangeMetric: {
          variablesMetrics: 'workingDayNetSalesPercentChange',
          maxWidth: 150,
          condition: 'cellClassRules',
        },
        metric3: { variablesMetrics: 'outletSumNetSalesL30D', maxWidth: 150, sort: 'desc' },
        metric6: { variablesMetrics: 'averageOrderValueL30D', maxWidth: 150 },
      },
      detailFields: {
        overview: {
          name: 'Summary',
          chart: {
            dataSource: 'trendSource',
          },
          table: {
            metric1: { variablesMetrics: 'lastWorkingDayNetSales' },
            metric2: { variablesMetrics: 'priorWorkingDayNetSales' },
            metric3: {
              variablesMetrics: 'workingDayNetSalesPercentChange',
              condition: 'cellClassRules',
            },
            metric4: { variablesMetrics: 'outletSumNetSalesL30D' },
            metric5: { variablesMetrics: 'averageOrderValueL30D' },
            metric6: { variablesMetrics: 'sumOrderCountL30D' },
          },
        },
        tab1: {
          name: 'Channel Performance',
          chart: {
            dataSource: 'tab1Chart',
          },
          table: {
            metric1: { variablesMetrics: 'lastWorkingDayChannelNetSales' },
            metric2: { variablesMetrics: 'priorWorkingDayChannelNetSales' },
            metric3: {
              variablesMetrics: 'workingDayChannelNetSalesPercentChange',
              condition: 'cellClassRules',
            },
            metric4: { variablesMetrics: 'outletSumChannelNetSalesL30D' },
            metric5: { variablesMetrics: 'maxChannelNetSalesL30D' },
            metric6: { variablesMetrics: 'minChannelNetSalesL30D' },
          },
        },
      },
    },
  },
}

export default config
