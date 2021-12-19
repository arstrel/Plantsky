import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import React from 'react';
import formatDistance from 'date-fns/formatDistance';
import formatRelative from 'date-fns/formatRelative';

export default function PlantDetailsDialog({ plant, isOpened, onClose }) {
  const lastWatered = formatRelative(new Date(plant.lastWatered), new Date(), {
    addSuffix: true,
  });

  const nextWaterIn = formatDistance(new Date(plant.nextWater), new Date(), {
    addSuffix: true,
  });

  return (
    <div>
      <Dialog
        open={isOpened}
        onClose={onClose}
        aria-labelledby="details-plant-title"
        aria-describedby="delete-plant-text"
      >
        <DialogTitle id="details-plant-title">
          Details on {plant.name}
        </DialogTitle>

        <DialogContent>
          <Grid
            container
            rowSpacing={1}
            alignItems="start"
            justify="center"
            direction="column"
          >
            <Grid item sx={{ width: '100%', height: 'auto' }}>
              <img
                src={plant.imageURL}
                alt={plant.name}
                style={{
                  objectFit: 'contain',
                  width: '-webkit-fill-available',
                }}
              />
            </Grid>
            <Grid item sx={{ width: '100%' }}>
              {plant.detailsURL && (
                <Link href={plant.detailsURL} rel="noopener" target="_blank">
                  More info about {plant.name}
                </Link>
              )}
            </Grid>
            <Grid item sx={{ width: '100%' }}>
              <DialogContentText id="description-plant-text">
                Located at: {plant.location}
              </DialogContentText>
            </Grid>
            <Grid item sx={{ width: '100%' }}>
              <DialogContentText>Watered {lastWatered}</DialogContentText>
            </Grid>
            <Grid item sx={{ width: '100%' }}>
              <DialogContentText>
                <strong>{`Next water ${nextWaterIn}`}</strong>
              </DialogContentText>
            </Grid>
            <Grid item sx={{ width: '100%' }}>
              <DialogContentText>
                Watering interval {plant.waterIntervalDays} days
              </DialogContentText>
            </Grid>
            <Grid item sx={{ width: '100%' }}>
              <DialogContentText>{plant.description}</DialogContentText>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
