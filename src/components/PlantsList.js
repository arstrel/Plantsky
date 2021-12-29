import React, { useEffect, useState } from 'react';

import { DataStore } from 'aws-amplify';
import Grid from '@mui/material/Grid';
import { Plant } from 'models';
import PlantCard from 'components/PlantCard';
import { computeStatus } from 'util/helpers/computePlantStatus';

export default function PlantsList({ user }) {
  const [plants, setPlants] = useState({});

  const getPlantsList = () => {
    const plantsList = Object.values(plants);
    const sorted = [...plantsList].sort((a, b) => {
      const { sortValue: sortValueA } = computeStatus(a);
      const { sortValue: sortValueB } = computeStatus(b);
      return sortValueA - sortValueB;
    });
    return sorted;
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    (async () => {
      const responsePlants = await DataStore.query(Plant, (p) =>
        p.belongsTo('eq', user.attributes.email)
      );

      if (responsePlants.length) {
        setPlants(
          responsePlants.reduce((acc, val) => ({ ...acc, [val.id]: val }), {})
        );
      }

      const subscription = DataStore.observe(Plant).subscribe((msg) => {
        const freshPlant = msg.element;

        if (
          !freshPlant._deleted &&
          freshPlant.belongsTo === user.attributes.email
        ) {
          setPlants((plants) => ({ ...plants, [freshPlant.id]: freshPlant }));
        }
      });

      return () => subscription.unsubscribe();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {getPlantsList().map((plant) => (
        <PlantCard key={plant.id} plant={plant} />
      ))}
    </Grid>
  );
}
