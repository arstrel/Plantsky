import React, { useState } from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { DataStore } from 'aws-amplify';
import Grid from '@mui/material/Grid';
import { Plant } from 'models';
import PlantCardHeader from 'components/PlantCardHeader';
import Typography from '@mui/material/Typography';
import isEmpty from 'lodash/isEmpty';

export default function PlantCard({ plant }) {
  const [currentPlant, setCurrentPlant] = useState(plant);

  const onWaterClick = async (id) => {
    const original = await DataStore.query(Plant, id);
    const updated = await DataStore.save(
      Plant.copyOf(original, (updated) => {
        updated.lastWatered = new Date().toISOString();
      })
    );

    setCurrentPlant(updated);
  };

  if (isEmpty(currentPlant)) {
    return null;
  }

  return (
    <Grid item xs sx={{ display: 'flex' }} justifyContent="center">
      <Card
        sx={{
          width: 345,
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
        }}
      >
        <PlantCardHeader
          plant={currentPlant}
          setCurrentPlant={setCurrentPlant}
        />
        <CardMedia
          component="img"
          height="220"
          image={currentPlant.imageURL}
          alt={currentPlant.name}
          sx={{ objectFit: 'contain' }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {currentPlant.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Can be found in <i>{currentPlant.location}</i>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            To be watered every{' '}
            <strong>{currentPlant.waterIntervalDays}</strong> days
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => onWaterClick(currentPlant.id)}>
            Water Now
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
