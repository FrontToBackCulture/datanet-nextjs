import localData from '../../data'
import { getConfig } from '../../config/getConfig'

export const selectConfig = (domain) => getConfig()[domain]?.conf

export function selectObject(arr, checkKey, selectKey, item) {
  let result

  if (Array.isArray(arr[0][checkKey])) {
    result = arr.filter((trend) => trend[checkKey][0] === item)
    // result = arr.filter((trend) => trend[selectKey][0] === item);
  } else {
    result = arr.filter((trend) => trend[checkKey] === item)
    // result = arr.filter((trend) => trend[selectKey] === item);
  }

  return result
}

export function selectLocalDataSource(contentType, dataType, domain) {
  let outletJsonData
  let productJsonData
  let localJsonData
  if (dataType === 'outlet' && localData[domain][dataType][contentType]) {
    // outletJsonData = outletData[contentType].getData();
    outletJsonData = localData[domain][dataType][contentType].getData()
  }
  if (dataType === 'product' && localData[domain][dataType][contentType]) {
    // productJsonData = productData[contentType].getData();
    productJsonData = localData[domain][dataType][contentType].getData()
  }
  switch (dataType) {
    case 'outlet':
      localJsonData = outletJsonData
      break
    case 'product':
      localJsonData = productJsonData
      break
    default:
      break
  }
  return localJsonData
}
