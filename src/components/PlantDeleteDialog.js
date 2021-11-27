import React, { useState } from 'react';

import Button from '@mui/material/Button';
import { DataStore } from 'aws-amplify';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Plant } from 'models';

export default function PlantDeleteDialog({
  plant,
  isOpened,
  onClose,
  setCurrentPlant,
}) {
  const [deleteStatus, setDeleteStatus] = useState({
    success: false,
    text: '',
    show: false,
  });

  const onDeleteClick = async () => {
    try {
      const modelToDelete = await DataStore.query(Plant, plant.id);
      DataStore.delete(modelToDelete);
      setDeleteStatus({
        success: true,
        text: 'Plant deleted successfully',
        show: true,
      });

      setTimeout(setCurrentPlant({}), 4000);
    } catch (e) {
      setDeleteStatus({
        success: false,
        text: 'Something went wrong',
        show: true,
      });
    }
    setTimeout(onClose, 2000);
  };

  return (
    <div>
      <Dialog
        open={isOpened}
        onClose={onClose}
        aria-labelledby="delete-plant-title"
        aria-describedby="delete-plant-text"
      >
        {deleteStatus.show ? (
          <DialogTitle
            id="delete-plant-title"
            sx={{ color: deleteStatus.success ? 'success.main' : 'error.main' }}
          >
            {deleteStatus.text}
          </DialogTitle>
        ) : (
          <DialogTitle id="delete-plant-title" sx={{ color: 'error.main' }}>
            Delete {plant.name}
          </DialogTitle>
        )}
        <DialogContent>
          <DialogContentText id="delete-plant-text">
            Forever remove this plant from your list?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} autoFocus>
            Cancel
          </Button>
          <Button onClick={onDeleteClick} sx={{ color: 'error.main' }}>
            Delete plant
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
