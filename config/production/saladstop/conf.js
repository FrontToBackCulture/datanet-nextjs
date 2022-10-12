const config = {
  general: {
    companyName: '',
    companyDescription: '',
    logoLocation: '',
  },
  navConfig: [
    { title: 'Outlets', code: 'outlet' },
    { title: 'Products', code: 'product' },
    { title: 'Promotions', code: 'promotion' },
  ],
  outlet: {
    dataSources: {
      staticSource: {
        queryID: '4012',
        domain: 'saladstop',
        key: 'Outlet',
        contentType: 'static',
        name: 'outletStatic',
      },
      metricSource: {
        queryID: '4007',
        domain: 'saladstop',
        key: 'Store',
        contentType: 'metric',
        name: 'outletMetrics',
      },
      trendSource: {
        queryID: '4055',
        domain: 'saladstop',
        key: 'Store',
        contentType: 'trend',
        name: 'outletNetSalesTrend',
        valueKey: 'Net Sales',
        groupKey: 'Date',
        title: 'Daily Net Sales Last 3M',
      },
      tab1Chart: {
        queryID: '4097',
        domain: 'saladstop',
        key: 'Store',
        contentType: 'channel',
        name: 'outletChannelTrend',
        valueKey: 'sum Net Sales',
        groupPeriodKey: 'Transaction Date',
        groupKey: 'Order Channel',
        title: 'Performance Trend by Channel',
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
        sourceColumn: 'Outlet',
        type: 'string',
        headerName: 'Outlet',
      },
      outletName: {
        sourceColumn: 'Outlet Name',
        type: 'string',
        headerName: 'Outlet Name',
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
        sourceColumn: 'sum Net Sales',
        type: 'currency',
        headerName: 'Net Sales L3M',
      },
      maxNetSalesL3M: {
        sourceColumn: 'max Net Sales',
        type: 'currency',
        headerName: 'Daily Max Net Sales L3M',
      },
      minNetSalesL3M: {
        sourceColumn: 'min Net Sales',
        type: 'currency',
        headerName: 'Daily Min Net Sales L3M',
      },
      averageOrderCountL3M: {
        sourceColumn: 'average Average Order Value',
        type: 'number',
        headerName: 'Average Order Count',
      },
      sumOrderCountL3M: {
        sourceColumn: 'sum Order Count',
        type: 'number',
        headerName: 'Order Count L3M',
      },
      averageDailyOrderCountL3M: {
        sourceColumn: 'average Order Count',
        type: 'number',
        headerName: 'Avg Daily Order Count',
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
      outletSumChannelNetSalesL3M: {
        sourceColumn: 'aggregateMetric',
        type: 'currency',
        headerName: 'Net Sales L3M',
      },
      maxChannelNetSalesL3M: {
        sourceColumn: 'maxMetric',
        type: 'currency',
        headerName: 'Daily Max Net Sales L3M',
      },
      minChannelNetSalesL3M: {
        sourceColumn: 'minMetric',
        type: 'currency',
        headerName: 'Daily Min Net Sales L3M',
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
      tab1: {
        name: 'Channel Performance',
        chart: {
          dataSource: 'tab1Chart',
        },
        table: {
          metric1: {
            variablesMetrics: 'lastWorkingDayChannelNetSales',
          },
          metric2: {
            variablesMetrics: 'priorWorkingDayChannelNetSales',
          },
          metric3: {
            variablesMetrics: 'workingDayChannelNetSalesPercentChange',
            condition: 'cellClassRules',
          },
          metric4: {
            variablesMetrics: 'outletSumChannelNetSalesL3M',
          },
          metric5: {
            variablesMetrics: 'maxChannelNetSalesL3M',
          },
          metric6: {
            variablesMetrics: 'minChannelNetSalesL3M',
          },
        },
      },
    },
  },
  product: {
    dataSources: {
      staticSource: {
        queryID: '4015',
        domain: 'saladstop',
        key: 'ID',
        contentType: 'static',
        name: 'productStatic',
      },
      metricSource: {
        queryID: '4019',
        domain: 'saladstop',
        key: 'Productid',
        contentType: 'metric',
        name: 'productMetrics',
      },
      trendSource: {
        queryID: '4009',
        domain: 'saladstop',
        key: 'Productid',
        contentType: 'trend',
        name: 'productNetQtySoldTrend',
        valueKey: 'sum Quantity',
        groupKey: 'TransactionTime',
        title: 'Daily Qty Sold Last 30D',
      },
    },
    calculatedMetrics: {
      lastWorkingDayQtySales: {
        timeseriesSource: 'productNetQtySoldTrend',
        columnName: 'latestMetric',
        calcType: 'latest',
      },
      priorWorkingDayQtySales: {
        timeseriesSource: 'productNetQtySoldTrend',
        columnName: 'priorMetric',
        calcType: '2ndLatest',
      },
      changeWorkingDayQtySales: {
        columnName: 'changeMetric',
        calcType: 'formula',
        formula: 'latestMetric-priorMetric',
      },
      percentChangeWorkingDayQtySales: {
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
      productShortCode: {
        sourceColumn: 'ID',
        type: 'string',
        headerName: 'Product ID',
      },
      productName: {
        sourceColumn: 'Name',
        type: 'string',
        headerName: 'Name',
      },
      lastWorkingDayQtySales: {
        sourceColumn: 'latestMetric',
        type: 'currency',
        headerName: 'Last Working Day Qty Sold',
      },
      priorWorkingDayQtySales: {
        sourceColumn: 'priorMetric',
        type: 'currency',
        headerName: 'Prior Working Day Qty Sold',
      },
      workingDayNetQtyPercentChange: {
        sourceColumn: 'changeMetricPercent',
        type: 'percent',
        headerName: 'Daily Qty Sold % Δ',
      },
      sumQuantity: {
        sourceColumn: 'sum Quantity',
        type: 'number',
        headerName: 'Qty Sold L30D',
      },
      sumTotal: {
        sourceColumn: 'sum Total',
        type: 'currency',
        headerName: 'Net Sales L30D',
      },
      sumDiscount: {
        sourceColumn: 'sum Discount',
        type: 'currency',
        headerName: 'Discount L30D',
      },
    },
    listFields: {
      name: {
        variablesMetrics: 'productName',
        link: true,
        maxWidth: 250,
      },
      latestMetric: {
        variablesMetrics: 'lastWorkingDayQtySales',
        maxWidth: 150,
      },
      percentChangeMetric: {
        variablesMetrics: 'workingDayNetQtyPercentChange',
        condition: 'cellClassRules',
        maxWidth: 150,
      },
      metric3: {
        variablesMetrics: 'sumQuantity',
        maxWidth: 150,
        sort: 'desc',
      },
      metric4: {
        variablesMetrics: 'sumTotal',
        maxWidth: 150,
      },
      metric5: {
        variablesMetrics: 'sumDiscount',
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
            variablesMetrics: 'lastWorkingDayQtySales',
          },
          metric2: {
            variablesMetrics: 'priorWorkingDayQtySales',
          },
          metric3: {
            variablesMetrics: 'workingDayNetQtyPercentChange',
          },
          metric4: {
            variablesMetrics: 'sumQuantity',
          },
          metric5: {
            variablesMetrics: 'sumTotal',
          },
          metric6: {
            variablesMetrics: 'sumDiscount',
          },
        },
      },
    },
  },
  promotion: {
    dataSources: {
      staticSource: {
        queryID: '4030',
        domain: 'saladstop',
        key: 'Storehub Product ID',
        contentType: 'static',
        name: 'promotionStatic',
      },
      metricSource: {
        queryID: '4031',
        domain: 'saladstop',
        key: 'Productid',
        contentType: 'metric',
        name: 'promotionMetrics',
      },
      trendSource: {
        queryID: '4032',
        domain: 'saladstop',
        key: 'Productid',
        contentType: 'trend',
        name: 'promotionNetQtySoldTrend',
        valueKey: 'sum Quantity',
        groupKey: 'TransactionTime',
        title: 'Daily Qty Promo Used Last 30D',
      },
    },
    calculatedMetrics: {
      lastWorkingDayQtySales: {
        timeseriesSource: 'promotionNetQtySoldTrend',
        columnName: 'latestMetric',
        calcType: 'latest',
      },
      priorWorkingDayQtySales: {
        timeseriesSource: 'promotionNetQtySoldTrend',
        columnName: 'priorMetric',
        calcType: '2ndLatest',
      },
      changeWorkingDayQtySales: {
        columnName: 'changeMetric',
        calcType: 'formula',
        formula: 'latestMetric-priorMetric',
      },
      percentChangeWorkingDayQtySales: {
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
      promotionShortCode: {
        sourceColumn: 'ID',
        type: 'string',
        headerName: 'Product ID',
      },
      promotionName: {
        sourceColumn: 'Name',
        type: 'string',
        headerName: 'Name',
      },
      lastWorkingDayQtyUsed: {
        sourceColumn: 'latestMetric',
        type: 'number',
        headerName: 'Last Working Day Qty Used',
      },
      priorWorkingDayQtyUsed: {
        sourceColumn: 'priorMetric',
        type: 'number',
        headerName: 'Prior Working Day Qty Used',
      },
      workingDayNetQtyPercentChange: {
        sourceColumn: 'changeMetricPercent',
        type: 'percent',
        headerName: 'Daily Promo Used % Δ',
      },
      sumQuantity: {
        sourceColumn: 'sum Quantity',
        type: 'number',
        headerName: 'Promo Used Count L30D',
      },
    },
    listFields: {
      name: {
        variablesMetrics: 'promotionName',
        link: true,
        maxWidth: 250,
      },
      latestMetric: {
        variablesMetrics: 'lastWorkingDayQtyUsed',
        maxWidth: 150,
      },
      percentChangeMetric: {
        variablesMetrics: 'workingDayNetQtyPercentChange',
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
            variablesMetrics: 'lastWorkingDayQtyUsed',
          },
          metric2: {
            variablesMetrics: 'priorWorkingDayQtyUsed',
          },
          metric3: {
            variablesMetrics: 'workingDayNetQtyPercentChange',
          },
          metric4: {
            variablesMetrics: 'sumQuantity',
          },
        },
      },
    },
  },
}

function getConfig(code) {
  return config[code]
}

module.exports = {
  getConfig,
}
