import { Config } from '../configType'

const config: Config = {
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
  entities: {
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
          title: 'Daily Net Sales Last 30D',
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
        outletSumNetSalesL30D: {
          sourceColumn: 'sum Net Sales',
          type: 'currency',
          headerName: 'Net Sales L30D',
        },
        maxNetSalesL30D: {
          sourceColumn: 'max Net Sales',
          type: 'currency',
          headerName: 'Daily Max Net Sales L30D',
        },
        minNetSalesL30D: {
          sourceColumn: 'min Net Sales',
          type: 'currency',
          headerName: 'Daily Min Net Sales L30D',
        },
        averageOrderValueL30D: {
          sourceColumn: 'average Average Order Value',
          type: 'currency',
          headerName: 'Average Order Value',
        },
        sumOrderCountL30D: {
          sourceColumn: 'sum Order Count',
          type: 'number',
          headerName: 'Order Count L30D',
        },
        averageDailyOrderCountL30D: {
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
          variablesMetrics: 'outletSumNetSalesL30D',
          maxWidth: 150,
          sort: 'desc',
        },
        metric4: {
          variablesMetrics: 'maxNetSalesL30D',
          maxWidth: 150,
        },
        metric5: {
          variablesMetrics: 'minNetSalesL30D',
          maxWidth: 150,
        },
        metric6: {
          variablesMetrics: 'averageOrderValueL30D',
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
              variablesMetrics: 'outletSumNetSalesL30D',
            },
            metric5: {
              variablesMetrics: 'maxNetSalesL30D',
            },
            metric6: {
              variablesMetrics: 'minNetSalesL30D',
            },
            metric7: {
              variablesMetrics: 'averageOrderValueL30D',
            },
            metric8: {
              variablesMetrics: 'sumOrderCountL30D',
            },
            metric9: {
              variablesMetrics: 'averageDailyOrderCountL30D',
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
              variablesMetrics: 'outletSumChannelNetSalesL30D',
            },
            metric5: {
              variablesMetrics: 'maxChannelNetSalesL30D',
            },
            metric6: {
              variablesMetrics: 'minChannelNetSalesL30D',
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
          groupKey: 'Transactiontime',
          title: 'Daily Qty Sold Last 30D',
        },
        tab1Chart: {
          queryID: '4120',
          domain: 'saladstop',
          key: 'Productid',
          contentType: 'channel',
          name: 'outletChannelTrend',
          valueKey: 'sum Quantity',
          groupKey: 'Store',
          groupPeriodKey: 'Transactiontime',
          title: 'Product Qty Sold Trend by Outlet',
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
          type: 'number',
          headerName: 'Last Working Day Qty Sold',
        },
        priorWorkingDayQtySales: {
          sourceColumn: 'priorMetric',
          type: 'number',
          headerName: 'Prior Working Day Qty Sold',
        },
        workingDayNetQtyPercentChange: {
          sourceColumn: 'changeMetricPercent',
          type: 'percent',
          headerName: 'Daily Qty Sold % Δ',
        },
        sumQuantityL30D: {
          sourceColumn: 'sum Quantity',
          type: 'number',
          headerName: 'Qty Sold L30D',
        },
        sumTotalL30D: {
          sourceColumn: 'sum Total',
          type: 'currency',
          headerName: 'Net Sales L30D',
        },
        sumDiscountL30D: {
          sourceColumn: 'sum Discount',
          type: 'currency',
          headerName: 'Discount L30D',
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
          variablesMetrics: 'sumQuantityL30D',
          maxWidth: 150,
          sort: 'desc',
        },
        metric4: {
          variablesMetrics: 'sumTotalL30D',
          maxWidth: 150,
        },
        metric5: {
          variablesMetrics: 'sumDiscountL30D',
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
              condition: 'cellClassRules',
            },
            metric4: {
              variablesMetrics: 'sumQuantityL30D',
            },
            metric5: {
              variablesMetrics: 'sumTotalL30D',
            },
            metric6: {
              variablesMetrics: 'sumDiscountL30D',
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
              variablesMetrics: 'outletSumChannelNetSalesL30D',
            },
            metric5: {
              variablesMetrics: 'maxChannelNetSalesL30D',
            },
            metric6: {
              variablesMetrics: 'minChannelNetSalesL30D',
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
          groupKey: 'Transactiontime',
          title: 'Daily Qty Promo Used Last 30D',
        },
      },
      calculatedMetrics: {
        lastWorkingDayQtyUsed: {
          timeseriesSource: 'promotionNetQtyUsedTrend',
          columnName: 'latestMetric',
          calcType: 'latest',
        },
        priorWorkingDayQtyUsed: {
          timeseriesSource: 'promotionNetQtyUsedTrend',
          columnName: 'priorMetric',
          calcType: '2ndLatest',
        },
        changeWorkingDayQtyUsed: {
          columnName: 'changeMetric',
          calcType: 'formula',
          formula: 'latestMetric-priorMetric',
        },
        percentChangeWorkingDayQtyUsed: {
          columnName: 'changeMetricPercent',
          calcType: 'formula',
          formula: 'changeMetric/priorMetric',
        },
        weeklyTrend: { columnName: 'change', calcType: 'weeklyTrend' },
      },
      variablesMetrics: {
        promotionShortCode: {
          sourceColumn: 'Storehub Product ID',
          type: 'string',
          headerName: 'Product ID',
        },
        promotionName: {
          sourceColumn: 'POS Button Storehub',
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
          variablesMetrics: 'priorWorkingDayQtyUsed',
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
          table: {},
        },
      },
    },
  },
}

export default config
