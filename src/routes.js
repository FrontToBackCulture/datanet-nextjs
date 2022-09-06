// ----------------------------------------------------------------------

const Routes = {
  // Promotions:
  promotion: {
    landing: '/promotion',
    jobs: '/promotion/items',
    job: (id) => `/promotion/items/${id}`,
    posts: '/promotion/blog',
    post: (slug) => `/promotion/blog/${slug}`,
  },
  // Careers:
  career: {
    landing: '/career',
    jobs: '/career/items',
    job: (id) => `/career/items/${id}`,
    posts: '/career/blog',
    post: (slug) => `/career/blog/${slug}`,
  },
  list: {
    landing: '/list',
    jobs: '/list/items',
    job: (id) => `/list/items/${id}`,
    posts: '/list/blog',
    post: (slug) => `/list/blog/${slug}`,
  },
  // Common
  loginCover: '/auth/login-cover',
  registerCover: '/auth/register-cover',
  loginIllustration: '/auth/login-illustration',
  registerIllustration: '/auth/register-illustration',
  resetPassword: '/auth/reset-password',
  verifyCode: '/auth/verify-code',
  maintenance: '/maintenance',
  comingsoon: '/coming-soon',
  pricing01: '/pricing-01',
  pricing02: '/pricing-02',
  checkout: '/checkout',
  support: '/support',
  page404: '/404',
  page500: '/500',
  // Others
  pages: '/pages',
  componentsUI: '/components-ui',
  componentUI: (slug) => `/components-ui/${slug}`,
  muiComponents: 'https://mui.com/components',
  docs: 'https://zone-docs.vercel.app',
  license: 'https://material-ui.com/store/license/#i-standard-license',
  minimalDashboard: 'https://material-ui.com/store/items/minimal-dashboard',
  buyNow: 'https://material-ui.com/store/items/zone-landing-page',
  figmaPreview:
    'https://www.figma.com/file/iAnp6x4J6YNvbVzdBnGM8P/%5BPreview%5D-Zone-Web?node-id=0%3A1',
};

export default Routes;
