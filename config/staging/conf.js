const config = {
  promotion: {
    staticSource: {
      queryID: '22',
      domain: 'dev',
      key: 'Storehub Product ID',
    },
    metricSource: {
      queryID: '23',
      domain: 'dev',
      key: 'Productid',
    },
    chartSource: {
      queryID: '24',
      domain: 'dev',
      key: 'Productid',
      valueKey: 'sum_usr_fddbbbeabfb_6',
      groupKey: 'Transactiontime',
      title: 'Qty by weeks',
    },
    listFields: {
      shortCode: { sourceColumn: 'Storehub Product ID', link: true, type: 'string' },
      name: { sourceColumn: 'POS Button Storehub', link: false, type: 'string' },
      metric1: { sourceColumn: 'SUM Quantity', link: false, type: 'currency' },
      // metric1PercentChange: {
      //   sourceColumn: 'Net Cash Day',
      //   link: false,
      //   type: 'decimal',
      // },
      // metric2: { sourceColumn: 'SUM Total', link: false, type: 'currency' },
      // metric3: { sourceColumn: 'SUM Discount', link: false, type: 'currency' },
      // metric4: { sourceColumn: 'SUM Total', link: false, type: 'decimal' },
      // metric5: { sourceColumn: 'YTD RENTAL RATIO', link: false, type: 'decimal' },
      // metric6: { sourceColumn: 'Count Storehub', link: false, type: 'decimal' },
    },
    detailFields: {
      metric1: { sourceColumn: 'SUM Quantity', link: false, type: 'currency' },
      // metric1PercentChange: {
      //   sourceColumn: 'Net Cash Day',
      //   link: false,
      //   type: 'decimal',
      // },
      // metric2: { sourceColumn: 'SUM Total', link: false, type: 'currency' },
      // metric3: { sourceColumn: 'SUM Discount', link: false, type: 'currency' },
      // metric4: { sourceColumn: 'SUM Total', link: false, type: 'decimal' },
      // metric5: { sourceColumn: 'YTD RENTAL RATIO', link: false, type: 'decimal' },
      // metric6: { sourceColumn: 'Count Storehub', link: false, type: 'decimal' },
    },
  },
  outlet: {
    staticSource: {
      queryID: '3472',
      domain: 'dev',
      key: 'Outlet',
    },
    metricSource: {
      queryID: '3473',
      domain: 'dev',
      key: 'Store Name',
    },
    chartSource: {
      queryID: '3474',
      domain: 'dev',
      key: 'Store',
      valueKey: 'sum_usr_afeafdf0fe0_1',
      groupKey: 'Month',
      title: 'Revenue by months',
    },
    listFields: {
      shortCode: { sourceColumn: 'Store Name', link: true, type: 'string' },
      name: { sourceColumn: 'Outlet Name', link: false, type: 'string' },
      metric1: { sourceColumn: 'Net Sales Day', link: false, type: 'currency' },
      // metric1PercentChange: {
      //   sourceColumn: 'Net Cash Day',
      //   link: false,
      //   type: 'decimal',
      // },
      metric2: { sourceColumn: 'Net Credit Day', link: false, type: 'currency' },
      metric3: { sourceColumn: 'Net Cash Day', link: false, type: 'currency' },
      // metric4: { sourceColumn: 'YTD SALES', link: false, type: 'decimal' },
      // metric5: { sourceColumn: 'YTD RENTAL RATIO', link: false, type: 'decimal' },
      // metric6: { sourceColumn: 'Count Storehub', link: false, type: 'decimal' },
    },
    detailFields: {
      metric1: { sourceColumn: 'Net Sales Day', link: false, type: 'currency' },
      // metric1PercentChange: {},
      metric2: { sourceColumn: 'Net Credit Day', link: false, type: 'currency' },
      metric3: { sourceColumn: 'Net Cash Day', link: false, type: 'currency' },
      // metric4: { sourceColumn: 'YTD SALES', link: false, type: 'decimal' },
      // metric5: { sourceColumn: 'YTD RENTAL RATIO', link: false, type: 'decimal' },
      // metric6: { sourceColumn: 'Count Storehub', link: false, type: 'decimal' },
    },
  },
  rawmaterial: {
    staticSource: {
      queryID: '16',
      domain: 'dev',
      key: 'Item description',
    },
    metricSource: {
      queryID: '17',
      domain: 'dev',
      key: 'Item description',
    },
    chartSource: {
      queryID: '18',
      domain: 'dev',
      key: 'Item description',
      valueKey: 'sum_usr_ad0de0fa0ebbaad_1',
      groupKey: 'Trans Date',
      title: 'Cost by weeks',
    },
    listFields: {
      shortCode: { sourceColumn: 'Item description', link: true, type: 'string' },
      name: { sourceColumn: 'Item description', link: false, type: 'string' },
      metric1: { sourceColumn: 'AVERAGE Unitprice', link: false, type: 'currency' },
      // metric1PercentChange: {
      //   sourceColumn: 'Net Cash Day',
      //   link: false,
      //   type: 'decimal',
      // },
      metric2: { sourceColumn: 'MIN Unitprice', link: false, type: 'currency' },
      metric3: { sourceColumn: 'MAX Unitprice', link: false, type: 'currency' },
      metric4: { sourceColumn: 'SUM Total', link: false, type: 'decimal' },
      // metric5: { sourceColumn: 'YTD RENTAL RATIO', link: false, type: 'decimal' },
      // metric6: { sourceColumn: 'Count Storehub', link: false, type: 'decimal' },
    },
    detailFields: {
      metric1: { sourceColumn: 'AVERAGE Unitprice', link: false, type: 'currency' },
      // metric1PercentChange: {
      //   sourceColumn: 'Net Cash Day',
      //   link: false,
      //   type: 'decimal',
      // },
      metric2: { sourceColumn: 'MIN Unitprice', link: false, type: 'currency' },
      metric3: { sourceColumn: 'MAX Unitprice', link: false, type: 'currency' },
      metric4: { sourceColumn: 'SUM Total', link: false, type: 'decimal' },
      // metric5: { sourceColumn: 'YTD RENTAL RATIO', link: false, type: 'decimal' },
      // metric6: { sourceColumn: 'Count Storehub', link: false, type: 'decimal' },
    },
  },
  product: {
    staticSource: {
      queryID: '19',
      domain: 'dev',
      key: 'Productid',
    },
    metricSource: {
      queryID: '20',
      domain: 'dev',
      key: 'Productid',
    },
    chartSource: {
      queryID: '21',
      domain: 'dev',
      key: 'Item Productid',
      valueKey: 'sum_usr_ad0de0fa0ebbaad_4',
      groupKey: 'Transactiontime',
      title: 'Revenue by weeks',
    },
    listFields: {
      shortCode: { sourceColumn: 'Productid', link: true, type: 'string' },
      name: { sourceColumn: 'Name', link: false, type: 'string' },
      metric1: { sourceColumn: 'SUM Quantity', link: false, type: 'currency' },
      // metric1PercentChange: {
      //   sourceColumn: 'Net Cash Day',
      //   link: false,
      //   type: 'decimal',
      // },
      metric2: { sourceColumn: 'SUM Total', link: false, type: 'currency' },
      metric3: { sourceColumn: 'SUM Discount', link: false, type: 'currency' },
      // metric4: { sourceColumn: 'SUM Total', link: false, type: 'decimal' },
      // metric5: { sourceColumn: 'YTD RENTAL RATIO', link: false, type: 'decimal' },
      // metric6: { sourceColumn: 'Count Storehub', link: false, type: 'decimal' },
    },
    detailFields: {
      metric1: { sourceColumn: 'SUM Quantity', link: false, type: 'currency' },
      // metric1PercentChange: {
      //   sourceColumn: 'Net Cash Day',
      //   link: false,
      //   type: 'decimal',
      // },
      metric2: { sourceColumn: 'SUM Total', link: false, type: 'currency' },
      metric3: { sourceColumn: 'SUM Discount', link: false, type: 'currency' },
      // metric4: { sourceColumn: 'SUM Total', link: false, type: 'decimal' },
      // metric5: { sourceColumn: 'YTD RENTAL RATIO', link: false, type: 'decimal' },
      // metric6: { sourceColumn: 'Count Storehub', link: false, type: 'decimal' },
    },
  },
  navConfig: [
    // { title: 'Home', path: '/', code: 'home' },
    // { title: 'Promotions', path: Routes.promotion.jobs, code: 'promotion' },
    // { title: 'Careers', path: Routes.career.jobs, code: 'career' },
    { title: 'Outlets', code: 'outlet' },
    { title: 'Raw Materials', code: 'rawmaterial' },
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
