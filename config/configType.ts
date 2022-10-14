export type Config = {
  general?: General
  navConfig: NavItem[]
  entities: Record<string, EntityConfig>
}

type General = {
  companyName: string
  companyDescription: string
  logoLocation: string
}

type NavItem = {
  title: string
  code: string
}

type SourceConfig = {
  queryID: string
  domain: string
  key: string
  contentType: string
  name: string
  valueKey?: string
  groupPeriodKey?: string
  groupKey?: string
  title?: string
}

type CalculatedMetricsConfig = {
  timeseriesSource?: string
  columnName: string
  calcType: 'latest' | '2ndLatest' | 'formula' | 'weeklyTrend' | 'min' | 'max' | 'avg'
  formula?: string
}

type VariablesMetricsConfig = {
  sourceColumn: string
  type: string
  headerName: string
  description?: string
  link?: boolean
}

type ListFieldsConfig = {
  variablesMetrics: string
  link?: boolean
  maxWidth: number
  condition?: string
  sort?: 'asc' | 'desc'
}

type TableConfig = Record<
  string,
  {
    variablesMetrics: string
    condition?: string
  }
>

type DetailFieldsConfig = {
  name: string
  chart: { dataSource: string }
  table: TableConfig
}

type EntityConfig = {
  dataSources: {
    staticSource: SourceConfig
    metricSource: SourceConfig
    trendSource: SourceConfig
    tab1Chart?: SourceConfig
  }
  calculatedMetrics: Record<string, CalculatedMetricsConfig>
  variablesMetrics: Record<string, VariablesMetricsConfig>
  listFields: Record<string, ListFieldsConfig>
  detailFields: {
    overview: DetailFieldsConfig
    tab1?: DetailFieldsConfig
  }
}
