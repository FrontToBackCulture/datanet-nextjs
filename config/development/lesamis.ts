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
    product: {
      dataSources: {
        staticSource: {
          queryID: '235',
          domain: 'lesamis',
          key: 'Merchant_ItemID',
          contentType: 'static',
          name: 'productStatic',
        },
        metricSource: {
          queryID: '239',
          domain: 'lesamis',
          key: 'Merchant_ItemID',
          contentType: 'metric',
          name: 'productMetrics',
        },
        trendSource: {
          queryID: '240',
          domain: 'lesamis',
          key: 'Merchant_ItemID',
          contentType: 'trend',
          name: 'productNetQtySoldTrend',
          valueKey: 'sum Final Qty',
          groupKey: 'Serving Date',
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
        weeklyTrend: { columnName: 'change', calcType: 'weeklyTrend' },
      },
      variablesMetrics: {
        productShortCode: {
          sourceColumn: 'Merchant_ItemID',
          type: 'string',
          headerName: 'Product ID',
        },
        productName: { sourceColumn: 'Label', type: 'string', headerName: 'Name' },
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
          sourceColumn: 'sum Final Qty',
          type: 'number',
          headerName: 'Qty Sold L30D',
        },
        sumTotalL30D: {
          sourceColumn: 'sum Price before tax',
          type: 'currency',
          headerName: 'Net Sales L30D',
        },
        sumDiscountL30D: {
          sourceColumn: 'sum Discounts',
          type: 'currency',
          headerName: 'Discount L30D',
        },
      },
      listFields: {
        name: { variablesMetrics: 'productName', maxWidth: 250, link: true },
        latestMetric: { variablesMetrics: 'lastWorkingDayQtySales', maxWidth: 150 },
        percentChangeMetric: {
          variablesMetrics: 'workingDayNetQtyPercentChange',
          maxWidth: 150,
          condition: 'cellClassRules',
        },
        metric3: { variablesMetrics: 'sumQuantityL30D', maxWidth: 150, sort: 'desc' },
        metric4: { variablesMetrics: 'sumTotalL30D', maxWidth: 150 },
        metric5: { variablesMetrics: 'sumDiscountL30D', maxWidth: 150 },
      },
      detailFields: {
        overview: {
          name: 'Summary',
          chart: {
            dataSource: 'trendSource',
          },
          table: {
            metric1: { variablesMetrics: 'lastWorkingDayQtySales' },
            metric2: { variablesMetrics: 'priorWorkingDayQtySales' },
            metric3: {
              variablesMetrics: 'workingDayNetQtyPercentChange',
              condition: 'cellClassRules',
            },
            metric4: { variablesMetrics: 'sumQuantityL30D' },
            metric5: { variablesMetrics: 'sumTotalL30D' },
            metric6: { variablesMetrics: 'sumDiscountL30D' },
          },
        },
      },
    },
    promotion: {
      dataSources: {
        staticSource: {
          queryID: '241',
          domain: 'lesamis',
          key: 'Merchant_ItemID',
          contentType: 'static',
          name: 'promotionStatic',
        },
        metricSource: {
          queryID: '242',
          domain: 'lesamis',
          key: 'Merchant_ItemID',
          contentType: 'metric',
          name: 'promotionMetrics',
        },
        trendSource: {
          queryID: '243',
          domain: 'lesamis',
          key: 'Merchant_ItemID',
          contentType: 'trend',
          name: 'promotionNetQtyUsedTrend',
          valueKey: 'count ID',
          groupKey: 'Serving Date',
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
          sourceColumn: 'Merchant_ItemID',
          type: 'string',
          headerName: 'Product ID',
        },
        promotionName: { sourceColumn: 'Label', type: 'string', headerName: 'Name' },
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
        sumQuantityL30D: {
          sourceColumn: 'count ID',
          type: 'number',
          headerName: 'Promo Used Count L30D',
        },
        sumDiscountL30D: {
          sourceColumn: 'sum Discounts',
          type: 'currency',
          headerName: 'Discount L30D',
        },
      },
      listFields: {
        name: { variablesMetrics: 'promotionName', maxWidth: 250, link: true },
        latestMetric: { variablesMetrics: 'lastWorkingDayQtyUsed', maxWidth: 150 },
        percentChangeMetric: {
          variablesMetrics: 'workingDayNetQtyPercentChange',
          maxWidth: 150,
          condition: 'cellClassRules',
        },
        metric3: { variablesMetrics: 'sumQuantityL30D', maxWidth: 150, sort: 'desc' },
        metric4: { variablesMetrics: 'sumDiscountL30D', maxWidth: 150 },
      },
      detailFields: {
        overview: {
          name: 'Summary',
          chart: {
            dataSource: 'trendSource',
          },
          table: {
            metric1: { variablesMetrics: 'lastWorkingDayQtyUsed' },
            metric2: { variablesMetrics: 'priorWorkingDayQtyUsed' },
            metric3: {
              variablesMetrics: 'workingDayNetQtyPercentChange',
              condition: 'cellClassRules',
            },
            metric4: { variablesMetrics: 'sumQuantityL30D' },
            metric5: { variablesMetrics: 'sumDiscountL30D' },
          },
        },
      },
    },
  },
}

export default config
