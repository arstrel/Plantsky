import React, { useEffect, useState } from 'react';

import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PlantDeleteDialog from 'components/PlantDeleteDialog';
import PlantDetailsDialog from 'components/PlantDetailsDialog';
import PlantEditDialog from 'components/PlantEditDialog';
import { computeStatus } from 'util/helpers/computePlantStatus';
import formatDistance from 'date-fns/formatDistance';

export default function PlantCardHeader({ plant, setCurrentPlant }) {
  const [status, setStatus] = useState(computeStatus(plant));
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEditDialogOpened, setIsEditDialogOpened] = useState(false);
  const [isDeleteDialogOpened, setIsDeleteDialogOpened] = useState(false);
  const [isDetailsDialogOpened, setIsDetailsDialogOpened] = useState(false);

  const isMenuOpen = Boolean(anchorEl);
  // Details
  const onDetailsDialogOpen = () => {
    setIsDetailsDialogOpened(true);
  };
  const onDetailsDialogClose = () => {
    setIsDetailsDialogOpened(false);
  };
  const onDetailsClick = () => {
    onDetailsDialogOpen();
    onMenuClose();
  };

  // Edit
  const onEditDialogOpen = () => {
    setIsEditDialogOpened(true);
  };
  const onEditDialogClose = () => {
    setIsEditDialogOpened(false);
  };
  const onEditClick = () => {
    onEditDialogOpen();
    onMenuClose();
  };

  //Delete
  const onDeleteDialogOpen = () => {
    setIsDeleteDialogOpened(true);
  };
  const onDeleteDialogClose = () => {
    setIsDeleteDialogOpened(false);
  };
  const onDeleteClick = () => {
    onDeleteDialogOpen();
    onMenuClose();
  };

  // Menu
  const onMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const onMenuClose = () => {
    setAnchorEl(null);
  };

  const wateredAgo = formatDistance(new Date(plant.lastWatered), new Date(), {
    addSuffix: true,
  });

  useEffect(() => {
    if (!plant) {
      return;
    }
    const updatedStatus = computeStatus(plant);
    setStatus(updatedStatus);

    let intervalId = null;
    if (!intervalId) {
      intervalId = setInterval(() => {
        const updatedStatus = computeStatus(plant);
        setStatus(updatedStatus);
        console.log('Plant status updated', { plant, updatedStatus });
      }, 1200_000); // 20 min
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plant]);

  return (
    <>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: status.color, width: 55, height: 55 }}
            aria-label="status"
          >
            {status.text}
          </Avatar>
        }
        action={
          <IconButton
            aria-label="settings"
            id="basic-button"
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={isMenuOpen ? 'true' : undefined}
            onClick={onMenuClick}
          >
            <MoreVertIcon />
          </IconButton>
        }
        title={plant.name}
        subheader={`Watered ${wateredAgo}`}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={onMenuClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={onDetailsClick}>Details</MenuItem>
        <MenuItem onClick={onEditClick}>Edit</MenuItem>
        <Divider />
        <MenuItem onClick={onDeleteClick} sx={{ color: 'error.main' }}>
          Delete
        </MenuItem>
      </Menu>
      <PlantEditDialog
        plant={plant}
        isOpened={isEditDialogOpened}
        onClose={onEditDialogClose}
        setCurrentPlant={setCurrentPlant}
      />
      <PlantDeleteDialog
        plant={plant}
        isOpened={isDeleteDialogOpened}
        onClose={onDeleteDialogClose}
        setCurrentPlant={setCurrentPlant}
      />
      <PlantDetailsDialog
        plant={plant}
        isOpened={isDetailsDialogOpened}
        onClose={onDetailsDialogClose}
      />
    </>
  );
}
