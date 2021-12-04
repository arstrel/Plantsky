import '@aws-amplify/ui-react/styles.css';

import * as React from 'react';

import Amplify from 'aws-amplify';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Copyright from 'components/Copyright';
import PlantsList from 'components/PlantsList';
import ProTip from 'components/ProTip';
import TopNav from 'components/TopNav';
import Typography from '@mui/material/Typography';
import awsExports from './aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';

Amplify.configure(awsExports);

function App(props) {
  const { signOut, user } = props;

  return (
    <>
      <TopNav signOut={signOut} user={user} />
      <Container sx={{ minHeight: '90vh' }}>
        <Box sx={{ my: 4, height: '100%' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Honey, Water the Plantsky!
          </Typography>
          <PlantsList user={user} />
          <ProTip />
          <Copyright />
        </Box>
      </Container>
    </>
  );
}

export default withAuthenticator(App);
