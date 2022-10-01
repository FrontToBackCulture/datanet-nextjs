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

  const configSchema = configForm.general.schema;
  const configUischema = configForm.general.uischema;
  const configInitialData = configForm.general.data;
  const [configData, setConfigData] = useState(configInitialData);

  const clearCache = () => {
    console.log(clearCache());
  };

  // if form data change
  useEffect(() => {
    console.log(exampleData);
  }, [exampleData]);
  useEffect(() => {
    console.log(configData);
  }, [configData]);

  return (
    <Page title="Maintenance">
      <RootStyle>
        <Stack spacing={2} direction="row">
          <Button variant="contained" onClick={() => clearCache()}>
            Clear Cache
          </Button>
        </Stack>
        <br />
        <div className="App">
          CONFIG
          <br />
          <JsonForms
            schema={configSchema}
            uischema={configUischema}
            data={configData}
            renderers={materialRenderers}
            cells={materialCells}
            onChange={({ data, _errors }) => setConfigData(data)}
          />
        </div>
        <br />
        <br />
        <br />

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
