import '@aws-amplify/ui-react/styles.css';

import Amplify, { DataStore, syncExpression } from 'aws-amplify';
import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Copyright from 'components/Copyright';
import { Plant } from 'models';
import PlantsList from 'components/PlantsList';
import ProTip from 'components/ProTip';
import TopNav from 'components/TopNav';
import Typography from '@mui/material/Typography';
import awsExports from './aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';

Amplify.configure(awsExports);

function App(props) {
  const { signOut, user } = props;
  const [isDSActive, setDSActive] = useState(false);

  useEffect(() => {
    if (!user) {
      return;
    }

    (async () => {
      DataStore.configure({
        syncExpressions: [
          syncExpression(Plant, () => {
            return (plant) => plant.belongsTo('eq', user.attributes.email);
          }),
        ],
      });
      await DataStore.start();

      setDSActive(true);
    })();
  }, [user]);

  return (
    <>
      <TopNav signOut={signOut} user={user} />
      <Container sx={{ minHeight: '90vh' }}>
        <Box sx={{ my: 4, height: '100%' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Honey, Water the Plantsky!
          </Typography>
          {isDSActive ? <PlantsList user={user} /> : <CircularProgress />}
          <ProTip />
          <Copyright />
        </Box>
      </Container>
    </>
  );
}

export default withAuthenticator(App);
