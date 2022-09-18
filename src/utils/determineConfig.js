// config
import confFn from '../../config/development';
import confFnProd from '../../config/production';
import confFnProdTest from '../../config/productionTest';

export function determineConfig(URL, userDomain, code) {
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
