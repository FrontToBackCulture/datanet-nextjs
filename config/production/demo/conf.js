const config = {
  general: {
    companyName: '',
    companyDescription: '',
    logoLocation: '',
  },
  navConfig: [{ title: 'Outlets', code: 'outlet' }],
  outlet: {
    dataSources: {
      staticSource: {
        queryID: '119',
        domain: 'demo',
        key: 'ID',
        contentType: 'static',
        name: 'outletStatic',
      },
      metricSource: {
        queryID: '120',
        domain: 'demo',
        key: 'ID',
        contentType: 'metric',
        name: 'outletMetrics',
      },
      trendSource: {
        queryID: '121',
        domain: 'demo',
        key: 'Store',
        contentType: 'trend',
        name: 'outletNetSalesTrend',
        valueKey: 'Net Sales',
        groupKey: 'Date',
        title: 'Daily Net Sales Last 3M',
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
      weeklyTrend: {
        columnName: 'change',
        calcType: 'weeklyTrend',
      },
    },
    variablesMetrics: {
      outletShortCode: {
        sourceColumn: 'ID',
        type: 'string',
        headerName: 'Outlet',
        description: '',
      },
      outletName: {
        sourceColumn: 'Outlet Name',
        type: 'string',
        headerName: 'Outlet Name',
        description: '',
      },
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
      outletSumNetSalesL3M: {
        sourceColumn: 'SUM Net Sales',
        type: 'currency',
        headerName: 'Net Sales L3M',
        description: '',
      },
      maxNetSalesL3M: {
        sourceColumn: 'MAX Net Sales',
        type: 'currency',
        headerName: 'Daily Max Net Sales L3M',
        description: '',
      },
      minNetSalesL3M: {
        sourceColumn: 'MIN Net Sales',
        type: 'currency',
        headerName: 'Daily Min Net Sales L3M',
        description: '',
      },
      averageOrderCountL3M: {
        sourceColumn: 'AVERAGE Average Order Value',
        link: false,
        type: 'number',
        headerName: 'Average Order Count',
        description: '',
      },
      sumOrderCountL3M: {
        sourceColumn: 'SUM Order Count',
        link: false,
        type: 'number',
        headerName: 'Order Count L3M',
        description: '',
      },
      averageDailyOrderCountL3M: {
        sourceColumn: 'AVERAGE Order Count',
        link: false,
        type: 'number',
        headerName: 'Avg Daily Order Count',
        description: '',
      },
    },
    listFields: {
      name: {
        variablesMetrics: 'outletName',
        link: true,
        maxWidth: 250,
      },
      latestMetric: {
        variablesMetrics: 'lastWorkingDayNetSales',
        maxWidth: 150,
      },
      percentChangeMetric: {
        variablesMetrics: 'workingDayNetSalesPercentChange',
        condition: 'cellClassRules',
        maxWidth: 150,
      },
      metric3: {
        variablesMetrics: 'outletSumNetSalesL3M',
        maxWidth: 150,
        sort: 'desc',
      },
      metric4: {
        variablesMetrics: 'maxNetSalesL3M',
        maxWidth: 150,
      },
      metric5: {
        variablesMetrics: 'minNetSalesL3M',
        maxWidth: 150,
      },
      metric6: {
        variablesMetrics: 'averageOrderCountL3M',
        maxWidth: 150,
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
            variablesMetrics: 'lastWorkingDayNetSales',
          },
          metric2: {
            variablesMetrics: 'priorWorkingDayNetSales',
          },
          metric3: {
            variablesMetrics: 'workingDayNetSalesPercentChange',
            condition: 'cellClassRules',
          },
          metric4: {
            variablesMetrics: 'outletSumNetSalesL3M',
          },
          metric5: {
            variablesMetrics: 'maxNetSalesL3M',
          },
          metric6: {
            variablesMetrics: 'minNetSalesL3M',
          },
          metric7: {
            variablesMetrics: 'averageOrderCountL3M',
          },
          metric8: {
            variablesMetrics: 'sumOrderCountL3M',
          },
          metric9: {
            variablesMetrics: 'averageDailyOrderCountL3M',
          },
        },
      },
    },
  },
};

function getConfig(code) {
  return config[code];
}

module.exports = {
  getConfig,
};
