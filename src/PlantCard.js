import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import React from 'react';
import Typography from '@mui/material/Typography';

export default function PlantCard({ plant }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={plant.imageURL}
        alt={plant.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {plant.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {plant.location}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {plant.lastWatered}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Water every {plant.wateringPeriodHours} hours
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Water Now</Button>
      </CardActions>
    </Card>
  );
}
