// routes
import Routes from '../../routes';
// config
import confFn from '../../../config/development/conf';
import confFnStage from '../../../config/staging/conf';
import confFnProd from '../../../config/production/conf';

let configNavConfig;
let URL = window.location.href;
if (URL.includes('localhost')) {
  configNavConfig = confFn.getConfig('navConfig');
}
if (URL.includes('melvinapps')) {
  configNavConfig = confFnStage.getConfig('navConfig');
}
if (URL.includes('screener')) {
  configNavConfig = confFnProd.getConfig('navConfig');
}

let configNavConfigArray = [];
configNavConfig.map((config) => {
  configNavConfigArray.push({
    title: config.title,
    path: Routes.list.jobs,
    code: config.code,
  });
});
export const navConfig = configNavConfigArray;
