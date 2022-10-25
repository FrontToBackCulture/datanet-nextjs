import confProd from './production'

type Domain = keyof typeof confProd

const domains = Object.keys(confProd) as Domain[]

domains.forEach((domain) => {
  const entities = confProd[domain].entities

  describe(`Domain: ${domain}`, () => {
    Object.keys(entities).forEach((entity) => {
      const variablesMetricsKeys = Object.keys(entities[entity].variablesMetrics)

      describe('All entity keys in navConfig shoud be defined', () => {
        confProd[domain].navConfig.forEach((navItem) => {
          expect(Object.keys(confProd[domain].entities)).toContain(navItem.code)
        })
      })

      describe(`Entity: ${entity}`, () => {
        test('All variable metrics listed in listFields should be defined', () => {
          Object.values(entities[entity].listFields).forEach(({ variablesMetrics }) => {
            expect(variablesMetricsKeys).toContain(variablesMetrics)
          })
        })

        test('All variable metrics listed in detailFields should be defined (overview table)', () => {
          Object.values(entities[entity].detailFields.overview.table).forEach(
            ({ variablesMetrics }) => {
              expect(variablesMetricsKeys).toContain(variablesMetrics)
            }
          )
        })

        if (entities[entity].detailFields.tab1?.table) {
          test('All variable metrics listed in detailFields should be defined (tab1 table)', () => {
            Object.values(entities[entity].detailFields.tab1.table).forEach(
              ({ variablesMetrics }) => {
                expect(variablesMetricsKeys).toContain(variablesMetrics)
              }
            )
          })
        }
      })
    })
  })
})
