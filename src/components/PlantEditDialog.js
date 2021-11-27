import React, { useState } from 'react';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Button from '@mui/material/Button';
import { DataStore } from 'aws-amplify';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Plant } from 'models';
import TextField from '@mui/material/TextField';

const initialSaveStatusState = {
  success: false,
  text: '',
  show: false,
};

export default function PlantEditDialog({
  plant,
  isOpened,
  onClose,
  setCurrentPlant,
}) {
  const [saveStatus, setSaveStatus] = useState(initialSaveStatusState);
  const [formValues, setFormValues] = useState(plant);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleDateChange = (value) => {
    setFormValues({
      ...formValues,
      lastWatered: value.toISOString(),
    });
  };

  const clearStatus = () => {
    setSaveStatus(initialSaveStatusState);
  };

  const onSave = async (e) => {
    e.preventDefault();
    try {
      const original = await DataStore.query(Plant, plant.id);
      const updated = await DataStore.save(
        Plant.copyOf(original, (updated) => {
          updated.name = formValues.name;
          updated.location = formValues.location;
          updated.imageURL = formValues.imageURL;
          updated.detailsURL = formValues.detailsURL;
          updated.description = formValues.description;
          updated.lastWatered = formValues.lastWatered;
          updated.wateringPeriodHours = Number(formValues.wateringPeriodHours);
        })
      );
      setSaveStatus({
        success: true,
        text: 'Changes saved successfully',
        show: true,
      });
      setCurrentPlant(updated);
    } catch (e) {
      setSaveStatus({
        success: false,
        text: 'Something went wrong',
        show: true,
      });
    }
    setTimeout(() => {
      clearStatus();
      onClose();
    }, 2000);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div>
        <Dialog open={isOpened} onClose={onClose} fullWidth maxWidth="md">
          {saveStatus.show ? (
            <DialogTitle
              sx={{ color: saveStatus.success ? 'success.main' : 'error.main' }}
            >
              {saveStatus.text}
            </DialogTitle>
          ) : (
            <DialogTitle>Edit {plant.name}</DialogTitle>
          )}
          <DialogContent>
            <form onSubmit={onSave}>
              <Grid
                container
                alignItems="start"
                justify="center"
                direction="column"
                rowSpacing={3}
              >
                <Grid item sx={{ width: '100%' }}>
                  <DialogContentText>
                    To edit this plant, please enter updated info here.
                  </DialogContentText>
                </Grid>
                <Grid item sx={{ width: '100%' }}>
                  <TextField
                    id="name"
                    name="name"
                    label="Name"
                    type="text"
                    value={formValues.name}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid item sx={{ width: '100%' }}>
                  <TextField
                    id="location"
                    name="location"
                    label="Location"
                    type="text"
                    value={formValues.location}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid item sx={{ width: '100%' }}>
                  <TextField
                    id="description"
                    name="description"
                    label="Description"
                    type="text"
                    value={formValues.description}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item sx={{ width: '100%' }}>
                  <TextField
                    id="imageURL"
                    name="imageURL"
                    label="Image URL"
                    type="text"
                    value={formValues.imageURL}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid item sx={{ width: '100%' }}>
                  <TextField
                    id="detailsURL"
                    name="detailsURL"
                    label="External details page URL"
                    type="text"
                    value={formValues.detailsURL}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid item sx={{ width: '100%' }}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Last watered"
                    value={formValues.lastWatered}
                    onChange={handleDateChange}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="wateringPeriodHours"
                    name="wateringPeriodHours"
                    label="Water every __ hours"
                    type="number"
                    value={formValues.wateringPeriodHours}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onSave}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>
    </LocalizationProvider>
  );
}
