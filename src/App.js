import * as React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import PlantsList from './PlantsList';
import ProTip from './ProTip';
import Typography from '@mui/material/Typography';
import awsExports from './aws-exports';

// import Amplify, { API, graphqlOperation } from 'aws-amplify';


// Amplify.configure(awsExports);

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/caitlinboldt">
        Sincerely, Plantsky Caregiver
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Honey, Water the Plantsky!
        </Typography>
        <PlantsList />
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
