import { Config } from './configType'
import confFn from './development'
import confFnProd from './production'
import confFnProdTest from './productionTest'

export const selectConfig = (domain: string): Config => {
  switch (process.env.NEXT_PUBLIC_CONFIGURATION) {
    case 'development':
      return confFn[domain]
    case 'production':
      return confFnProd[domain]
    case 'productionTest':
      return confFnProdTest[domain]
  }
}
