//react
import React, { useState, useEffect } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Stack } from '@mui/material';
// other lbrary
import { JsonForms } from '@jsonforms/react';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
// config
import { configForm, exampleForm } from '../../config/schema';
// api && lib
import { clearCache } from '../api/cache';
// layouts
import Layout from '../../src/layouts';
// components
import { Page, Image } from '../../src/components';

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
}));

// ----------------------------------------------------------------------

export default function MaintenancePage() {
  const exampleSchema = exampleForm.schema;
  const exampleUischema = exampleForm.uischema;
  const exampleInitialData = exampleForm.data;
  const [exampleData, setExampleData] = useState(exampleInitialData);

  const configGeneralSchema = configForm.general.schema;
  const configGeneralUischema = configForm.general.uischema;
  const configGeneralInitialData = configForm.general.data;
  const [configGeneralData, setConfigGeneralData] = useState(configGeneralInitialData);

  const configOutletSchema = configForm.outlet.schema;
  const configOutletUischema = configForm.outlet.uischema;
  const configOutletInitialData = configForm.outlet.data;
  const [configOutletData, setConfigOutletData] = useState(configOutletInitialData);

  const resetCache = async () => {
    console.log(await clearCache());
  };

  // if form data change
  useEffect(() => {
    console.log(exampleData);
  }, [exampleData]);
  useEffect(() => {
    console.log(configGeneralData);
  }, [configGeneralData]);
  useEffect(() => {
    console.log(configOutletData);
  }, [configOutletData]);

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
          CONFIG
          <br />
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
          OUTLET
          <br />
          <JsonForms
            schema={configOutletSchema}
            uischema={configOutletUischema}
            data={configOutletData}
            renderers={materialRenderers}
            cells={materialCells}
            onChange={({ data, _errors }) => setConfigOutletData(data)}
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
  );
}

// ----------------------------------------------------------------------

MaintenancePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
