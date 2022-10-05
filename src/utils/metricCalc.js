// other lbrary
import moment from 'moment'
import { array, merge, aggregate, calculate } from 'cuttle'
import { selectObject, selectLocalDataSource, selectDomain } from './selectScript'

export function performCalc(data, conf) {
  let result, filteredTrend
  const { dataSources, calculatedMetrics, variablesMetrics, listFields, detailFields } = conf
  const { staticSource, metricSource, trendSource } = dataSources
  const staticKey = dataSources['staticSource'].key
  const metricKey = dataSources['metricSource'].key
  const trendKey = dataSources['trendSource'].key
  const { mergeStaticMetric } = data
  console.log('Perform Calc ---------->')
  const filteredItemTrendData = mergeStaticMetric.map((item) => {
    Object.keys(calculatedMetrics).map(async (metric2Calc, index) => {
      let metricField = calculatedMetrics[metric2Calc].columnName
      switch (calculatedMetrics[metric2Calc].calcType) {
        case 'latest':
          filteredTrend = selectObject(data[trendSource.name], metricKey, trendKey, item[staticKey])
          if (filteredTrend.length > 0) {
            let latestMetric = 0
            let latestObject = array.mostRecentObject(filteredTrend, trendSource.groupKey)
            latestMetric = latestObject[trendSource.valueKey]

            item[metricField] = latestMetric
          }
          //   result = await getLatestTimeSeriesObject(data, conf, metric2Calc);
          break
        case '2ndLatest':
          filteredTrend = selectObject(data[trendSource.name], metricKey, trendKey, item[staticKey])
          // if data exists in the trend data for the item, start the calculating
          if (filteredTrend.length > 1) {
            let priorMetric = 0
            let secondLatestDate = array.most2ndRecentObject(filteredTrend, trendSource.groupKey)
            priorMetric = secondLatestDate[trendSource.valueKey]

            item[metricField] = priorMetric
          }
          //   result = await get2ndLatestTimeSeriesObject(data, conf, metric2Calc);
          break
        case 'formula':
          let formulaResult = 0
          let providedFormula = calculatedMetrics[metric2Calc].formula
          formulaResult = calculate.simpleFormula(item, { formula: providedFormula })
          item[metricField] = formulaResult
          //   result = await performFormula(data, conf, metric2Calc);
          break
        case 'weeklyTrend':
          let weeklyChangeTrend = aggregate.group2Weekly(
            filteredTrend,
            trendSource.groupKey,
            trendSource.valueKey
          )
          item[metricField] = weeklyChangeTrend
          break
        default:
          break
      }
    })
    return item
  })

  result = mergeStaticMetric
  return result
}
