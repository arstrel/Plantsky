import React, { useEffect, useState } from 'react';

import { DataStore } from 'aws-amplify';
import Grid from '@mui/material/Grid';
import { Plant } from 'models';
import PlantCard from 'components/PlantCard';

export default function PlantsList({ user }) {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    (async () => {
      const plants = await DataStore.query(Plant, (p) =>
        p.belongsTo('eq', user.attributes.email)
      );
      setPlants(plants);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {plants?.map((plant) => (
        <PlantCard key={plant.id} plant={plant} />
      ))}
    </Grid>
  );
}
