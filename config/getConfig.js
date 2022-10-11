import confFn from './development'
import confFnProd from './production'
import confFnProdTest from './productionTest'

export const getConfig = () => {
  switch (process.env.NEXT_PUBLIC_CONFIGURATION) {
    case 'development':
      return confFn
    case 'production':
      return confFnProd
    case 'productionTest':
      return confFnProdTest
  }
}
