import React, { useEffect, useState } from 'react';

import { DataStore } from 'aws-amplify';
import Grid from '@mui/material/Grid';
import { Plant } from 'models';
import PlantCard from 'components/PlantCard';

export default function PlantsList({ user }) {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    if (!user) {
      return;
    }
    (async () => {
      const responsePlants = await DataStore.query(Plant, (p) =>
        p.belongsTo('eq', user.attributes.email)
      );

      if (responsePlants.length) {
        setPlants(responsePlants);
        return;
      }

      const subscription = DataStore.observe(Plant).subscribe((msg) => {
        const freshPlant = msg.element;
        if (freshPlant.belongsTo === user.attributes.email) {
          setPlants((plants) => [...plants, msg.element]);
        }
      });

      return () => subscription.unsubscribe();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {plants?.map((plant) => (
        <PlantCard key={plant.id} plant={plant} />
      ))}
    </Grid>
  );
}
