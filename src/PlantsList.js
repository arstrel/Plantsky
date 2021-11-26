import React, { useEffect, useState } from 'react';

import { DataStore } from '@aws-amplify/datastore';
import Grid from '@mui/material/Grid';
import { Plant } from './models';
import PlantCard from './PlantCard';

export default function PlantsList() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    (async () => {
      const plants = await DataStore.query(Plant);
      // const res = await DataStore.save(
      //   new Plant({
      //     name: 'Hanging Succulents',
      //     location: 'Kitchen, next to dish rack',
      //     imageURL: 'https://source.unsplash.com/800x600/?nature,plant',
      //     lastWatered: '2021-11-25T12:30:23.999Z',
      //     wateringPeriodHours: 96,
      //   })
      // );
      // const modelToDelete = await DataStore.query(
      //   Plant,
      //   'badba2a9-4cf5-4bc2-9532-af2d31ae5874'
      // );
      // DataStore.delete(modelToDelete);
      console.log({ plants });
      setPlants(plants);
    })();
  }, []);

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {plants?.map((plant) => (
        <Grid key={plant.id} item xs={6}>
          <PlantCard plant={plant} />
        </Grid>
      ))}
    </Grid>
  );
}
