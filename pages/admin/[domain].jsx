import React, { useState, useEffect } from 'react'
import { Button, Stack, Container } from '@mui/material'
import { JsonForms } from '@jsonforms/react'
import { materialRenderers, materialCells } from '@jsonforms/material-renderers'
import { useRouter } from 'next/router'
import { configForm, exampleForm } from '../../config/schema'
import { clearCache } from '../api/cache'
import { Page } from '../../src/components'
import Header from '../../src/layouts/header/Header'
import { DomainContext, ROOT_DOMAIN, useUserDomain } from '../../src/contexts/DomainProvider'

export default function MaintenancePage() {
  const router = useRouter()

  const { domain } = router.query

  const userDomain = useUserDomain()

  const selectedDomain = userDomain === ROOT_DOMAIN ? domain : userDomain

  const exampleSchema = exampleForm.schema
  const exampleUischema = exampleForm.uischema
  const exampleInitialData = exampleForm.data
  const [exampleData, setExampleData] = useState(exampleInitialData)

  const configGeneralSchema = configForm.general.schema
  const configGeneralUischema = configForm.general.uischema
  const configGeneralInitialData = configForm.general.data
  const [configGeneralData, setConfigGeneralData] = useState(configGeneralInitialData)

  const configMDSSchema = configForm.outlet.mandatoryDataSources.schema
  const configMDSUischema = configForm.outlet.mandatoryDataSources.uischema
  const configMDSInitialData = configForm.outlet.mandatoryDataSources.data
  const [configMDSData, setConfigMDSData] = useState(configMDSInitialData)

  const configATDSSchema = configForm.outlet.additionalTabDataSources.schema
  const configATDSUischema = configForm.outlet.additionalTabDataSources.uischema
  const configATDSInitialData = configForm.outlet.additionalTabDataSources.data
  const [configATDSData, setConfigATDSData] = useState(configATDSInitialData)

  const resetCache = async () => {
    console.log(await clearCache())
  }

  // if form data change
  useEffect(() => {
    console.log(exampleData)
  }, [exampleData])
  useEffect(() => {
    console.log(configGeneralData)
  }, [configGeneralData])
  useEffect(() => {
    console.log(configMDSData)
  }, [configMDSData])
  useEffect(() => {
    console.log(configATDSData)
  }, [configATDSData])

  return (
    <DomainContext.Provider value={selectedDomain}>
      <Stack height={1}>
        <Header />
        <Page title="Maintenance">
          <Container>
            <Stack spacing={2} direction="row">
              <Button variant="contained" onClick={() => resetCache()}>
                Clear Cache
              </Button>
            </Stack>
            <br />
            <div className="App">
              <JsonForms
                schema={configGeneralSchema}
                uischema={configGeneralUischema}
                data={configGeneralData}
                renderers={materialRenderers}
                cells={materialCells}
                onChange={({ data, _errors }) => setConfigGeneralData(data)}
              />
            </div>
            <br />
            <div className="App">
              <JsonForms
                schema={configMDSSchema}
                uischema={configMDSUischema}
                data={configMDSData}
                renderers={materialRenderers}
                cells={materialCells}
                onChange={({ data, _errors }) => setConfigMDSData(data)}
              />
            </div>
            <br />
            <div className="App">
              <JsonForms
                schema={configATDSSchema}
                uischema={configATDSUischema}
                data={configATDSData}
                renderers={materialRenderers}
                cells={materialCells}
                onChange={({ data, _errors }) => setConfigATDSData(data)}
              />
            </div>
          </Container>
        </Page>
      </Stack>
    </DomainContext.Provider>
  )
}
