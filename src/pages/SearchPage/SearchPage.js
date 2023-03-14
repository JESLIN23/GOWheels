import React, { useState } from 'react';
import styles from './SearchPage.module.css';
import Footer from '../../components/Footer/Footer';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import SettingsIcon from '@mui/icons-material/Settings';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import hondaCity from '../HomePage/IMG/Honda_Civic_White_background_Sedan_Grey_526338_1280x765.jpg';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Button from '@mui/material/Button';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import FilterPart from './FilterPart/FilterPart';

function SearchPage() {
  const [kilometers, setKilometers] = useState('150');
  const [sorting, setSorting] = useState('down');

  const handleKilometers = (event, newKilometers) => {
    if (newKilometers !== null) {
      setKilometers(newKilometers);
    }
  };
  const handleSorting = (event, sorting) => {
    if (sorting !== null) {
      setSorting(sorting);
    }
  };
  const handleMinKilometers = (event) => {
    setKilometers(event.target.value);
  };

  const carBookHandler = () => {};
  return (
    <div className={styles.container}>
      <div className={styles.filterWrapper}>
        <div className={styles.packageWrapper}>
          <h4 className={styles.label}>KM Package: </h4>
          <ToggleButtonGroup
            value={kilometers}
            color='primary'
            exclusive
            onChange={handleKilometers}
            aria-label='Platform'
          >
            <ToggleButton value='150' aria-label='left aligned'>
              150km/24hr
            </ToggleButton>
            <ToggleButton value='300' aria-label='centered'>
              300km/24hr
            </ToggleButton>
            <ToggleButton value='500' aria-label='right aligned'>
              500km/24hr
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className={styles.packageMinWrapper}>
          <FormControl sx={{ m: 1, minWidth: 100 }} size='small'>
            <InputLabel id='demo-select-small'>KM/24hr</InputLabel>
            <Select
              labelId='demo-select-small'
              id='demo-select-small'
              value={kilometers}
              label='KM/24hr'
              onChange={handleMinKilometers}
            >
              <MenuItem value={150}>150</MenuItem>
              <MenuItem value={300}>300</MenuItem>
              <MenuItem value={500}>500</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={styles.sortWrapper}>
          <h4 className={styles.label}>Sort by value: </h4>
          <ToggleButtonGroup
            value={sorting}
            color='primary'
            exclusive
            onChange={handleSorting}
            aria-label='Platform'
          >
            <ToggleButton value='down' aria-label='left aligned'>
              <ArrowDownwardIcon />
            </ToggleButton>
            <ToggleButton value='up' aria-label='centered'>
              <ArrowUpwardIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </div>

        <FilterPart />
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.durationWrapper}>
          <div className={styles.boodkingInfoFixed}>
            <div className={styles.bookingInfoWrapper}>
              <h3>Pick up information</h3>
              <div className={styles.bookingInfo}>
                <LocationOnIcon style={{ color: '#43d7c8', marginRight: 5 }} />
                <div className={styles.LOCinfo}>
                  <h4>Calicut International Airport, Calicut</h4>
                  <h6>Thu, 16 Mar 23, 12:00 AM</h6>
                </div>
              </div>
              <div className={styles.divider}></div>
              <h3>Drop off information</h3>
              <div className={styles.bookingInfo}>
                <LocationOnIcon style={{ color: 'red', marginRight: 5 }} />
                <div className={styles.LOCinfo}>
                  <h4>Calicut International Airport, Calicut</h4>
                  <h6>Thu, 16 Mar 23, 12:00 AM</h6>
                </div>
              </div>
            </div>
            <div className={styles.durationInfo}>
              <h4>Total travel duration</h4>
              <h4 style={{ color: 'white', marginTop: 5 }}>0 Day 4 Hours 0 Min</h4>
            </div>
          </div>
        </div>
        <div className={styles.findCarWrapper}>
          <div className={styles.selectCar}>
            <div className={styles.carInfo}>
              <div className={styles.carImage}>
                <img src={hondaCity} alt='' />
              </div>
              <div className={styles.carDetails}>
                <h3 style={{ marginBottom: '12px', fontWeight: 700 }}>Maruti Alto</h3>
                <div style={{ display: 'flex' }}>
                  <AirlineSeatReclineExtraIcon className={styles.info} />
                  <h5>5 seater</h5>
                </div>
                <div style={{ display: 'flex' }}>
                  <SettingsIcon className={styles.info} />
                  <h5>manual</h5>
                </div>
                <div style={{ display: 'flex' }}>
                  <LocalGasStationIcon className={styles.info} />
                  <h5>petrol</h5>
                </div>
              </div>
            </div>
            <div className={styles.bookCar}>
              <h3 style={{ marginBottom: '0.5rem' }}>
                <CurrencyRupeeIcon style={{ fontSize: 18 }} className={styles.info} />
                1500
              </h3>
              <h6 style={{ marginBottom: '1rem' }}>
                <CurrencyRupeeIcon style={{ fontSize: 10 }} />
                12/km(Exclude)
              </h6>
              <Button onClick={carBookHandler}>Book Now</Button>
            </div>
          </div>
          <div className={styles.selectCarMinWrapper} onClick={carBookHandler}>
            <div className={styles.carInfoMin}>
              <h3 style={{ marginBottom: '12px' }} className={styles.h3}>
                Maruti Alto
              </h3>
              <h5>5 seater, manual, petrol</h5>
              <h3 style={{ marginBottom: 5, marginTop: '1rem' }}>
                <CurrencyRupeeIcon style={{ fontSize: 18 }} className={styles.info} />
                1500
              </h3>
              <h6>
                <CurrencyRupeeIcon style={{ fontSize: 10 }} />
                12/km(Exclude)
              </h6>
            </div>
            <div className={styles.bookCarMin}>
              <div className={styles.carImage}>
                <img src={hondaCity} alt='' />
              </div>
              <div className={styles.arrow}>
                <KeyboardArrowRightIcon style={{ color: '#43d7c8', fontSize: 30 }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SearchPage;
