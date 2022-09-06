// routes
import Routes from '../../routes';
// _data
// import { _tours, _jobs, _courses } from '../../../_data/mock';
// _data
import confFn from '../../../config/conf';

// ----------------------------------------------------------------------

// export const PageLinks = [
//   {
//     order: '1',
//     subheader: 'Promotions',
//     items: [
//       { title: 'Landing', path: Routes.promotion.landing },
//       { title: 'Jobs', path: Routes.promotion.jobs },
//       { title: 'Job', path: Routes.promotion.job(_jobs[0].id) },
//       { title: 'Blog Posts', path: Routes.promotion.posts },
//       { title: 'Blog Post', path: Routes.promotion.post('post-01') },
//     ],
//   },
//   {
//     order: '5',
//     subheader: 'Common',
//     items: [
//       { title: 'Login', path: Routes.loginIllustration },
//       { title: 'Login Cover', path: Routes.loginCover },
//       { title: 'Register', path: Routes.registerIllustration },
//       { title: 'Register Cover', path: Routes.registerCover },
//       { title: 'Reset Password', path: Routes.resetPassword },
//       { title: 'Verify Code', path: Routes.verifyCode },
//       { title: '404 Error', path: Routes.page404 },
//       { title: '500 Error', path: Routes.page500 },
//       { title: 'Maintenance', path: Routes.maintenance },
//       { title: 'ComingSoon', path: Routes.comingsoon },
//       { title: 'Pricing 01', path: Routes.pricing01 },
//       { title: 'Pricing 02', path: Routes.pricing02 },
//       { title: 'Checkout', path: Routes.checkout },
//       { title: 'Support', path: Routes.support },
//     ],
//   },
// ];
let configNavConfig = confFn.getConfig('navConfig');
let configNavConfigArray = [];
configNavConfig.map((config) => {
  configNavConfigArray.push({
    title: config.title,
    path: Routes.list.jobs,
    code: config.code,
  });
});
export const navConfig = configNavConfigArray;

// export const navConfig = [
//   // { title: 'Home', path: '/', code: 'home' },
//   // { title: 'Promotions', path: Routes.promotion.jobs, code: 'promotion' },
//   // { title: 'Careers', path: Routes.career.jobs, code: 'career' },
//   { title: 'Outlets', path: Routes.list.jobs, code: 'outlet' },
//   { title: 'Promotions', path: Routes.list.jobs, code: 'promotion' },
//   { title: 'Raw Materials', path: Routes.list.jobs, code: 'rawmaterial' },
// ];
