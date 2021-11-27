import * as React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Copyright from 'components/Copyright';
import PlantsList from 'components/PlantsList';
import ProTip from 'components/ProTip';
import TopNav from 'components/TopNav';
import Typography from '@mui/material/Typography';
import awsExports from './aws-exports';

// import Amplify, { API, graphqlOperation } from 'aws-amplify';

// Amplify.configure(awsExports);

export default function App() {
  return (
    <>
      <TopNav />
      <Container maxWidth="md" sx={{ minHeight: '90vh' }}>
        <Box sx={{ my: 4, height: '100%' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Honey, Water the Plantsky!
          </Typography>
          <PlantsList />
          <ProTip />
          <Copyright />
        </Box>
      </Container>
    </>
  );
}
