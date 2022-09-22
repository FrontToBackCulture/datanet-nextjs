// config
import confFn from '../../config/development';
import confFnProd from '../../config/production';
import confFnProdTest from '../../config/productionTest';
// data
import outletData from '../../data/outlet';
import productData from '../../data/product';

export function selectConfig(URL, userDomain, code) {
  let result;

  if (URL.includes('localhost') && userDomain) {
    let config = confFn[userDomain].conf.getConfig(code);
    result = config;
  }
  if (URL.includes('screener.thinkval.io') && userDomain) {
    let config = confFnProd[userDomain].conf.getConfig(code);
    result = config;
  }
  if (URL.includes('screenertest.thinkval.io') && userDomain) {
    let config = confFnProdTest[userDomain].conf.getConfig(code);
    result = config;
  }

  return result;
}

export function selectObject(arr, checkKey, selectKey, item) {
  let result;

  if (Array.isArray(arr[0][checkKey])) {
    result = arr.filter((trend) => trend[selectKey][0] === item);
  } else {
    result = arr.filter((trend) => trend[selectKey] === item);
  }

  return result;
}

export function selectLocalDataSource(contentType, dataType) {
  let result;
  let outletJsonData;
  let productJsonData;
  let localJsonData;
  if (outletData[contentType]) {
    outletJsonData = outletData[contentType].getData();
  }
  if (productData[contentType]) {
    productJsonData = productData[contentType].getData();
  }
  switch (dataType) {
    case 'outlet':
      localJsonData = outletJsonData;
      break;
    case 'product':
      localJsonData = productJsonData;
      break;
    default:
      break;
  }
  result = localJsonData;

  return result;
}

export function selectDomain(domain) {
  let result;
  switch (domain) {
    case 'saladstop':
      result = 'saladstop';
      break;
    case 'thinkval':
      result = 'thinkval';
      break;
    case 'kctsoya':
      result = 'kctsoya';
      break;
    default:
      break;
  }
  return result;
}
