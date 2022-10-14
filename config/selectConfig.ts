import { Config } from './configType'
import confFn from './development'
import confFnProd from './production'
import confFnProdTest from './productionTest'

export const selectConfig = (domain: string): Config => {
    switch (process.env.NEXT_PUBLIC_CONFIGURATION) {
        case 'development':
            return confFn[domain]?.conf?.config
        case 'production':
            return confFnProd[domain]?.conf?.config
        case 'productionTest':
            return confFnProdTest[domain]?.conf?.config
    }
}

