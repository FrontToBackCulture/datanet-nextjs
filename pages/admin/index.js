//react
import React, { useState, useEffect } from 'react'
// next
import NextLink from 'next/link'
// @mui
import { styled } from '@mui/material/styles'
import { Button, Typography, Stack } from '@mui/material'
// other lbrary
import { JsonForms } from '@jsonforms/react'
import { materialRenderers, materialCells } from '@jsonforms/material-renderers'
// config
import { configForm, exampleForm } from '../../config/schema'
// api && lib
import { clearCache } from '../api/cache'
// layouts
import Layout from '../../src/layouts'
// components
import { Page, Image } from '../../src/components'

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  // display: 'flex',
  // alignItems: 'center',
  // justifyContent: 'center',
  // textAlign: 'center',
  padding: theme.spacing(15, 2.5),
  [theme.breakpoints.up('sm')]: {
    height: '100vh',
  },
}))

// ----------------------------------------------------------------------

export default function MaintenancePage() {
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
    <Page title="Maintenance">
      <RootStyle>
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

        {/* <div className="App">
          EXAMPLE
          <br />
          <JsonForms
            schema={exampleSchema}
            uischema={exampleUischema}
            data={exampleData}
            renderers={materialRenderers}
            cells={materialCells}
            onChange={({ data, _errors }) => setExampleData(data)}
          />
        </div> */}
      </RootStyle>
    </Page>
  )
}

// ----------------------------------------------------------------------

MaintenancePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
