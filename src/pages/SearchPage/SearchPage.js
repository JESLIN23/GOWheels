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
        <div className={styles.durationWrapper}></div>
        <div className={styles.carWrapper}></div>
      </div>

      <Footer />
    </div>
  );
}

export default SearchPage;
