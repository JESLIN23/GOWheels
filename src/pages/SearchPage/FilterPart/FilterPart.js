import React, { useState } from 'react';
import styles from './FilterPart.module.css';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import ListSubheader from '@mui/material/ListSubheader';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import EvStationIcon from '@mui/icons-material/EvStation';
import CarCrashIcon from '@mui/icons-material/CarCrash';

function FilterPart(props) {
  const [state, setState] = useState(false);
  const [segment, setSegment] = useState([]);
  const [fuelType, setFuelType] = useState([]);
  const [transmission, setTransmission] = useState([]);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState(open);
  };

  const handleSegment = (value) => () => {
    const currentIndex = segment.indexOf(value);
    const newSegment = [...segment];

    if (currentIndex === -1) {
      newSegment.push(value);
    } else {
      newSegment.splice(currentIndex, 1);
    }

    setSegment(newSegment);
  };

  const handleFuelType = (value) => () => {
    const currentIndex = fuelType.indexOf(value);
    const newFuelType = [...fuelType];

    if (currentIndex === -1) {
      newFuelType.push(value);
    } else {
      newFuelType.splice(currentIndex, 1);
    }

    setFuelType(newFuelType);
  };

  const handleTransmission = (value) => () => {
    const currentIndex = transmission.indexOf(value);
    const newTransmission = [...transmission];

    if (currentIndex === -1) {
      newTransmission.push(value);
    } else {
      newTransmission.splice(currentIndex, 1);
    }

    setTransmission(newTransmission);
  };

  const resetHandler = () => {
    setSegment([]);
    setFuelType([]);
    setTransmission([]);
  };

  const filterSubmitHandler = () => {
    let filterValue = {
      segment: [...segment],
      fuelType: [...fuelType],
      transmission: [...transmission],
    };
    if (
      filterValue.segment.length !== 0 ||
      filterValue.fuelType.length !== 0 ||
      filterValue.transmission.length !== 0
    ) {
      props.filterHandler(filterValue);
    }
    return;
  };

  const list = (
    <Box
      className={styles.filter}
      role='presentation'
      // onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <div className={styles.filterHead}>
        <h3>Filter</h3>
        <Button onClick={resetHandler}>Reset</Button>
      </div>
      <List
        dense
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        subheader={<ListSubheader>Segment</ListSubheader>}
      >
        {['SUV', 'HatchBack', 'Sedan', 'MPV', 'Wagon', 'Convertable'].map((value) => {
          const labelId = { value };
          return (
            <ListItem
              key={value}
              secondaryAction={
                <Checkbox
                  sx={{
                    color: '#18776d',
                    '&.Mui-checked': {
                      color: '#43d7c8',
                    },
                  }}
                  edge='end'
                  onChange={handleSegment(value)}
                  checked={segment.indexOf(value) !== -1}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemAvatar>
                  <DirectionsCarIcon />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={value} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <List
        dense
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        subheader={<ListSubheader>Fuel</ListSubheader>}
      >
        {['Petrol', 'Diesel', 'Electric'].map((value) => {
          const labelId = { value };
          return (
            <ListItem
              key={value}
              secondaryAction={
                <Checkbox
                  sx={{
                    color: '#18776d',
                    '&.Mui-checked': {
                      color: '#43d7c8',
                    },
                  }}
                  edge='end'
                  onChange={handleFuelType(value)}
                  checked={fuelType.indexOf(value) !== -1}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemAvatar>
                  {value === 'Electric' ? <EvStationIcon /> : <LocalGasStationIcon />}
                </ListItemAvatar>
                <ListItemText id={labelId} primary={value} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <List
        dense
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        subheader={<ListSubheader>Transmission</ListSubheader>}
      >
        {['Manual', 'Automatic'].map((value) => {
          const labelId = { value };
          return (
            <ListItem
              key={value}
              secondaryAction={
                <Checkbox
                  sx={{
                    color: '#18776d',
                    '&.Mui-checked': {
                      color: '#43d7c8',
                    },
                  }}
                  edge='end'
                  onChange={handleTransmission(value)}
                  checked={fuelType.indexOf(value) !== -1}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemAvatar>
                  <CarCrashIcon />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={value} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <div className={styles.filterSubmit}>
        <Button
          onClick={() => {
            filterSubmitHandler, toggleDrawer(false);
          }}
        >
          Applay
        </Button>
      </div>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <Button onClick={toggleDrawer(true)}>
          <span className={styles.filterLabel}>filter </span>
          <FilterAltIcon />
        </Button>
        <Drawer anchor='right' open={state} onClose={toggleDrawer(false)}>
          {list}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

export default FilterPart;
