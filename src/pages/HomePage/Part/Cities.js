import React from 'react';
import Grid from '@mui/material/Grid';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import styles from '../HomeStyle.module.css';

function Cities() {
  const cityNames = [
    'Calicut',
    'Trivandram',
    'Kochi',
    'Malappuram',
    'Areecode',
    'Kondotty',
    'Parinthalmanna',
    'Kasarcode',
  ];

  return (
    <div className={styles.cityWrapper}>
      <h1 className={styles.secondHeading}>Cities That We Have Service</h1>
      <Grid container spacing={{ md: 4, sm: 3, xs: 2 }}>
        {cityNames.map((city, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <div className={styles.cityName}>
              <LocationOnIcon fontSize='medium' />
              <h3 className={styles.thirdHeading} style={{ fondWeight: 500 }}>
                {city}
              </h3>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Cities;
