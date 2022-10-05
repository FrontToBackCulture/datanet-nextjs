// config
import confFn from '../../config/development'
import confFnProd from '../../config/production'
import confFnProdTest from '../../config/productionTest'
// data
// import outletData from '../../data/outlet';
// import productData from '../../data/product';
import localData from '../../data'

export function selectConfig(URL, userDomain, code) {
  let result
  console.log('url: ', URL, 'domain: ', userDomain, 'type: ', code)

  if (URL.includes('localhost') && userDomain) {
    let config = confFn[userDomain].conf.getConfig(code)
    result = config
  }
  if (URL.includes('datanet.thinkval.io') && userDomain) {
    let config = confFnProd[userDomain].conf.getConfig(code)
    result = config
  }
  if (URL.includes('datanettest.thinkval.io') && userDomain) {
    let config = confFnProdTest[userDomain].conf.getConfig(code)
    result = config
  }

  return result
}

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
  let result
  let outletJsonData
  let productJsonData
  let localJsonData
  if (dataType == 'outlet' && localData[domain][dataType][contentType]) {
    // outletJsonData = outletData[contentType].getData();
    outletJsonData = localData[domain][dataType][contentType].getData()
  }
  if (dataType == 'product' && localData[domain][dataType][contentType]) {
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
  result = localJsonData

  return result
}

export function selectDomain(domain) {
  let result
  switch (domain) {
    case 'saladstop':
      result = 'saladstop'
      break
    case 'thinkval':
      result = 'thinkval'
      break
    case 'kctsoya':
      result = 'kctsoya'
      break
    case 'demo':
      result = 'demo'
      break
    default:
      break
  }
  return result
}
