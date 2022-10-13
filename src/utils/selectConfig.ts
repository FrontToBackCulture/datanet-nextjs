import { getConfig } from '../../config/getConfig'
import { Config } from '../../config/configType'

export const selectConfig = (domain: string): Config => getConfig()[domain]?.conf
