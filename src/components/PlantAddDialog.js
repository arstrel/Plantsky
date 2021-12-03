import { MailingList, Plant } from 'models';
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
import InputLabel from '@mui/material/InputLabel';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import add from 'date-fns/add';
import isEmpty from 'lodash/isEmpty';

const initialSaveStatusState = {
  success: false,
  text: '',
  show: false,
};

export default function PlantAddDialog({ user, isOpened, onClose }) {
  const [saveStatus, setSaveStatus] = useState(initialSaveStatusState);
  const [isSaveButtonActive, setIsSaveButtonActive] = useState(false);
  const [formValues, setFormValues] = useState({
    name: '',
    location: '',
    imageURL: '',
    detailsURL: '',
    description: '',
    lastWatered: new Date().toISOString(),
    waterIntervalDays: 7,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormValues = {
      ...formValues,
      [name]: value,
    };
    setFormValues(updatedFormValues);

    if (
      updatedFormValues.name === '' &&
      updatedFormValues.location === '' &&
      updatedFormValues.imageURL === '' &&
      updatedFormValues.detailsURL === '' &&
      updatedFormValues.description === ''
    ) {
      setIsSaveButtonActive(false);
    } else {
      setIsSaveButtonActive(true);
    }
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
      await DataStore.save(
        new Plant({
          ...formValues,
          waterIntervalDays: formValues.waterIntervalDays,
          belongsTo: user.attributes.email,
          nextWater: add(new Date(formValues.lastWatered), {
            days: formValues.waterIntervalDays,
          }).toISOString(),
        })
      );
      const existingMailingRecord = await DataStore.query(MailingList, (r) =>
        r.email('eq', user.attributes.email)
      );

      if (isEmpty(existingMailingRecord)) {
        await DataStore.save(
          new MailingList({
            email: user.attributes.email,
          })
        );
      }
      setSaveStatus({
        success: true,
        text: 'New Plant saved successfully',
        show: true,
      });
    } catch (e) {
      setSaveStatus({
        success: false,
        text: 'Something went wrong',
        show: true,
      });
      console.log(e);
    }
    setTimeout(() => {
      clearStatus();
      onClose();
      window.location.reload();
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
            <DialogTitle>Add new plant</DialogTitle>
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
                    To add new plant, please enter info here.
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
                    rows={5}
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
                    label="External details URL"
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
                  <InputLabel id="watering-interval-days">
                    Watering interval in days
                  </InputLabel>
                  <Select
                    name="waterIntervalDays"
                    labelId="watering-interval-days"
                    id="waterIntervalDays"
                    value={formValues.waterIntervalDays}
                    label="Watering interval in days"
                    onChange={handleInputChange}
                  >
                    {Array.from({ length: 30 }, (_, i) => i + 1).map((num) => (
                      <MenuItem key={num} value={num}>
                        {num}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onSave} disabled={!isSaveButtonActive}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </LocalizationProvider>
  );
}
